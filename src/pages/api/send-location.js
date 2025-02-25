export default function handler(req, res) {
  if (req.method === "POST") {
    const { latitude, longitude } = req.body;

    if (
      latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180
    ) {
      return res.status(400).json({ message: "Invalid location data" });
    }

    console.log("Received Location:", latitude, longitude);

    res.status(200).json({ message: "Location received successfully!" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
