export default function handler(req, res) {
  if (req.method === "POST") {
    const { latitude, longitude } = req.body;

    // Check if the latitude and longitude are valid
    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
      return res.status(400).json({ message: "Invalid location data" });
    }

    // Proceed with storing/sending the location (for example, send it by email)
    console.log("Received Location:", latitude, longitude); // You can store it or use it as needed.

    res.status(200).json({ message: "Location received successfully!" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
