export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { latitude, longitude, address } = req.body;

  if (!latitude || !longitude || latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    console.error("❌ Invalid location data received:", req.body);
    return res.status(400).json({ message: "Invalid data" });
  }

  // 🛠️ Log to Console (Use `vercel logs` to see this in production)
  console.log("✅ Location Received:", { latitude, longitude, address });

  // 🛠️ Save logs in Vercel's temporary storage (Use `vercel ssh` to check)
  try {
    const logMessage = `\nLocation: ${latitude}, ${longitude} | Address: ${address}\n`;
    await require("fs").promises.appendFile("/tmp/location-logs.txt", logMessage);
  } catch (error) {
    console.error("❌ Error writing logs to file:", error);
  }

  return res.status(200).json({ message: "Success" });
}
