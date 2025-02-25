export default function handler(req, res) {
  if (req.method === "POST") {
    const { latitude, longitude, address } = req.body;

    if (!latitude || !longitude || latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
      return res.status(400).json({ message: "Invalid data" });
    }

    console.log("✅ Location received:", { latitude, longitude, address });

    return res.status(200).json({ message: "Success" });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
