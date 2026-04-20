export function getToday() {
  return new Date().toISOString().split("T")[0]; // YYYY-MM-DD
}

export function getYesterday() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
}
