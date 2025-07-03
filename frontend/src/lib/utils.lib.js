export function formatMessageTime(dateInput) {
  const date = new Date(dateInput);

  const locale =
    typeof navigator !== "undefined" ? navigator.language : "en-US";

  return date.toLocaleString(locale, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
