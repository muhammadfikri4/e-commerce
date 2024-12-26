export function getEstimated(timeString: string) {
  const timeUnit = timeString.slice(-1); // Ambil unit waktu ('d', 'h', 'm', 's')
  const timeValue = parseInt(timeString.slice(0, -1), 10); // Ambil nilai waktu
  const now = Date.now(); // Timestamp saat ini

  switch (timeUnit) {
    case "d": // Hari
      return now + timeValue * 24 * 60 * 60 * 1000;
    case "h": // Jam
      return now + timeValue * 60 * 60 * 1000;
    case "m": // Menit
      return now + timeValue * 60 * 1000;
    case "s": // Detik
      return now + timeValue * 1000;
    default:
      throw new Error(
        "Invalid time format. Use d (days), h (hours), m (minutes), or s (seconds)."
      );
  }
}
