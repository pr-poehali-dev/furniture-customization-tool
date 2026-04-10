export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "");

  let normalized = digits;
  if (normalized.startsWith("8")) {
    normalized = "7" + normalized.slice(1);
  }
  if (!normalized.startsWith("7") && normalized.length > 0) {
    normalized = "7" + normalized;
  }

  const d = normalized.slice(1);

  let result = "+7";
  if (d.length === 0) return result;
  result += " (" + d.slice(0, 3);
  if (d.length < 3) return result;
  result += ") " + d.slice(3, 6);
  if (d.length < 6) return result;
  result += "-" + d.slice(6, 8);
  if (d.length < 8) return result;
  result += "-" + d.slice(8, 10);
  return result;
}
