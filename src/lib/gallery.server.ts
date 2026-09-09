const GATEWAY = "https://connector-gateway.lovable.dev/google_drive/drive/v3";

export type DrivePhoto = {
  id: string;
  name: string;
  mimeType: string;
  width?: number;
  height?: number;
};

export type DriveEvent = {
  id: string;
  name: string;
  coverId: string | null;
  photoCount: number;
  modifiedTime?: string;
};

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

export async function driveFetch(path: string, params: Record<string, string>) {
  const lovableKey = requireEnv("LOVABLE_API_KEY");
  const connectionKey = requireEnv("GOOGLE_DRIVE_API_KEY");
  const url = new URL(`${GATEWAY}${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": connectionKey,
    },
  });
  return res;
}

async function driveJson<T>(path: string, params: Record<string, string>): Promise<T> {
  const res = await driveFetch(path, params);
  if (!res.ok) {
    const body = await res.text();
    console.error(`Google Drive request failed [${res.status}]: ${body}`);
    throw new Error(`Google Drive request failed [${res.status}]: ${body}`);
  }
  return (await res.json()) as T;
}

export function getGalleryFolderId(): string {
  return requireEnv("GALLERY_DRIVE_FOLDER_ID");
}

const IMAGE_FIELDS = "files(id,name,mimeType,imageMediaMetadata(width,height))";

export async function listEventPhotos(folderId: string): Promise<DrivePhoto[]> {
  const data = await driveJson<{ files?: Array<Record<string, any>> }>("/files", {
    q: `'${folderId}' in parents and trashed = false and mimeType contains 'image/'`,
    fields: IMAGE_FIELDS,
    orderBy: "name",
    pageSize: "200",
    supportsAllDrives: "true",
    includeItemsFromAllDrives: "true",
  });
  return (data.files ?? []).map((f) => ({
    id: f.id as string,
    name: f.name as string,
    mimeType: f.mimeType as string,
    width: f.imageMediaMetadata?.width,
    height: f.imageMediaMetadata?.height,
  }));
}

export async function listEvents(): Promise<DriveEvent[]> {
  const parentId = getGalleryFolderId();
  const data = await driveJson<{ files?: Array<Record<string, any>> }>("/files", {
    q: `'${parentId}' in parents and trashed = false and mimeType = 'application/vnd.google-apps.folder'`,
    fields: "files(id,name,modifiedTime)",
    orderBy: "name",
    pageSize: "200",
    supportsAllDrives: "true",
    includeItemsFromAllDrives: "true",
  });

  const folders = data.files ?? [];
  return Promise.all(
    folders.map(async (folder) => {
      const photos = await listEventPhotos(folder.id as string);
      const cover =
        photos.find((p) => p.name.toLowerCase().replace(/\.[^.]+$/, "") === "cover") ??
        photos.find((p) => p.name.toLowerCase().startsWith("cover")) ??
        photos[0];
      return {
        id: folder.id as string,
        name: folder.name as string,
        modifiedTime: folder.modifiedTime as string | undefined,
        coverId: cover?.id ?? null,
        photoCount: photos.filter((p) => p !== cover || photos.length === 1).length,
      };
    }),
  );
}
