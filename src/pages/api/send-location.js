export default function handler(req, res) {
    if (req.method === "POST") {
      const { latitude, longitude } = req.body;
  
      console.log("Received Location:", latitude, longitude); // 🛠 Logs in Vercel
  
      // 🔹 Send to your email (Optional)
      // You can use SendGrid, Mailgun, or another service here.
  
      res.status(200).json({ message: "Location received!" });
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  }
  