import { createServerFn } from "@tanstack/react-start";

export type Funder = {
  id: string;
  name: string;
  amount: string;
};

const DRIVE = "https://connector-gateway.lovable.dev/google_drive/drive/v3";
const FUNDERS_SHEET_ID_DEFAULT = "116COIMzyGOGNGEV7uu76unfXhFcU77d9ZYAEV3sO-NM";

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') q = false;
      else cell += c;
    } else if (c === '"') q = true;
    else if (c === ",") { row.push(cell); cell = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(cell); rows.push(row); row = []; cell = "";
    } else cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

// Reads the "Funders" Google Sheet from the foundation's Drive.
// Columns: Name, Amount, Location, IsVisible. Only IsVisible = Yes rows are returned.
export const getFunders = createServerFn({ method: "GET" }).handler(async (): Promise<Funder[]> => {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const driveKey = process.env.GOOGLE_DRIVE_API_KEY;
  if (!lovableKey || !driveKey) throw new Error("Google Drive is not connected");
  const headers = { Authorization: `Bearer ${lovableKey}`, "X-Connection-Api-Key": driveKey };

  let sheetId: string | undefined = process.env.FUNDERS_SHEET_ID || FUNDERS_SHEET_ID_DEFAULT;
  if (!sheetId) {
    const url = new URL(`${DRIVE}/files`);
    url.searchParams.set(
      "q",
      "name = 'Funders' and mimeType = 'application/vnd.google-apps.spreadsheet' and trashed = false",
    );
    url.searchParams.set("fields", "files(id)");
    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error(`Drive search failed [${res.status}]: ${await res.text()}`);
    const data = (await res.json()) as { files: { id: string }[] };
    sheetId = data.files[0]?.id;
    if (!sheetId) return [];
  }

  const res = await fetch(`${DRIVE}/files/${sheetId}/export?mimeType=text/csv`, { headers });
  if (!res.ok) throw new Error(`Sheet export failed [${res.status}]: ${await res.text()}`);
  const rows = parseCsv(await res.text());
  if (!rows.length) return [];

  const head = rows[0].map((h) => h.trim().toLowerCase());
  const iName = head.indexOf("name");
  const iAmount = head.indexOf("amount");
  const iVisible = head.indexOf("isvisible");
  if (iName < 0 || iVisible < 0) return [];

  return rows
    .slice(1)
    .filter((r) => (r[iVisible] ?? "").trim().toLowerCase() === "yes" && (r[iName] ?? "").trim())
    .map((r, i) => ({
      id: String(i),
      name: r[iName].trim(),
      amount: iAmount >= 0 ? (r[iAmount] ?? "").trim() : "",
    }));
});
