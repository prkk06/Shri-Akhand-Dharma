export type CountryCode = {
  code: string;
  label: string;
  iso: string;
  /** Minimum number of national digits (excluding the dial code). */
  min: number;
  /** Maximum number of national digits (excluding the dial code). */
  max: number;
  /** Example national number, shown as the input placeholder. */
  example: string;
};

export const COUNTRY_CODES: CountryCode[] = [
  { iso: "IN", code: "+91", label: "India", min: 10, max: 10, example: "9876543210" },
  { iso: "GB", code: "+44", label: "United Kingdom", min: 10, max: 10, example: "7400123456" },
  { iso: "US", code: "+1", label: "United States / Canada", min: 10, max: 10, example: "2015550123" },
  { iso: "AE", code: "+971", label: "United Arab Emirates", min: 9, max: 9, example: "501234567" },
  { iso: "AU", code: "+61", label: "Australia", min: 9, max: 9, example: "412345678" },
  { iso: "SG", code: "+65", label: "Singapore", min: 8, max: 8, example: "81234567" },
  { iso: "NP", code: "+977", label: "Nepal", min: 10, max: 10, example: "9812345678" },
  { iso: "LK", code: "+94", label: "Sri Lanka", min: 9, max: 9, example: "712345678" },
  { iso: "BD", code: "+880", label: "Bangladesh", min: 10, max: 10, example: "1712345678" },
  { iso: "PK", code: "+92", label: "Pakistan", min: 10, max: 10, example: "3012345678" },
  { iso: "MY", code: "+60", label: "Malaysia", min: 9, max: 10, example: "123456789" },
  { iso: "ZA", code: "+27", label: "South Africa", min: 9, max: 9, example: "821234567" },
  { iso: "KE", code: "+254", label: "Kenya", min: 9, max: 9, example: "712345678" },
  { iso: "SA", code: "+966", label: "Saudi Arabia", min: 9, max: 9, example: "512345678" },
  { iso: "QA", code: "+974", label: "Qatar", min: 8, max: 8, example: "33123456" },
  { iso: "OM", code: "+968", label: "Oman", min: 8, max: 8, example: "92123456" },
  { iso: "KW", code: "+965", label: "Kuwait", min: 8, max: 8, example: "50123456" },
  { iso: "DE", code: "+49", label: "Germany", min: 10, max: 11, example: "15123456789" },
  { iso: "FR", code: "+33", label: "France", min: 9, max: 9, example: "612345678" },
  { iso: "NL", code: "+31", label: "Netherlands", min: 9, max: 9, example: "612345678" },
  { iso: "IT", code: "+39", label: "Italy", min: 9, max: 10, example: "3123456789" },
  { iso: "ES", code: "+34", label: "Spain", min: 9, max: 9, example: "612345678" },
  { iso: "CH", code: "+41", label: "Switzerland", min: 9, max: 9, example: "781234567" },
  { iso: "IE", code: "+353", label: "Ireland", min: 9, max: 9, example: "851234567" },
  { iso: "NZ", code: "+64", label: "New Zealand", min: 8, max: 10, example: "211234567" },
  { iso: "JP", code: "+81", label: "Japan", min: 10, max: 10, example: "9012345678" },
  { iso: "CN", code: "+86", label: "China", min: 11, max: 11, example: "13123456789" },
  { iso: "HK", code: "+852", label: "Hong Kong", min: 8, max: 8, example: "51234567" },
  { iso: "TH", code: "+66", label: "Thailand", min: 9, max: 9, example: "812345678" },
  { iso: "ID", code: "+62", label: "Indonesia", min: 9, max: 12, example: "81234567890" },
  { iso: "MU", code: "+230", label: "Mauritius", min: 8, max: 8, example: "52512345" },
  { iso: "FJ", code: "+679", label: "Fiji", min: 7, max: 7, example: "7012345" },
];

export const DEFAULT_COUNTRY_ISO = "IN";

export function findCountry(iso: string): CountryCode {
  return COUNTRY_CODES.find((c) => c.iso === iso) ?? COUNTRY_CODES[0]!;
}

/** Strips everything except digits. */
export function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * Validates a national mobile number for the given country.
 * Returns an error message, or null when valid.
 */
export function validateNationalNumber(iso: string, raw: string): string | null {
  const country = findCountry(iso);
  const digits = digitsOnly(raw);
  if (!digits) return "Please enter your mobile number";
  if (digits.startsWith("0")) return "Remove the leading 0 — the country code is already selected";
  const dial = country.code.replace("+", "");
  if (digits.startsWith(dial) && digits.length > country.max) {
    return `Remove the country code — enter only the ${country.max}-digit number`;
  }
  if (digits.length < country.min || digits.length > country.max) {
    return country.min === country.max
      ? `${country.label} numbers must be ${country.min} digits`
      : `${country.label} numbers must be ${country.min}–${country.max} digits`;
  }
  return null;
}

/** Full E.164 number, e.g. +919876543210. */
export function toE164(iso: string, raw: string): string {
  return `${findCountry(iso).code}${digitsOnly(raw)}`;
}
