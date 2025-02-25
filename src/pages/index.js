import { useState } from "react";

export default function Home() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getPreciseLocation = async () => {
    const apiKey = "AIzaSyBUPTNo1LG_nGfgN50VvIFK2cO-4K1A5vk"; // 🔥 Replace with your actual API key

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (data.location) {
        const { lat, lng } = data.location;
        console.log("📍 Super Accurate Location:", lat, lng);

        setLocation({ latitude: lat, longitude: lng });

        await fetch("/api/send-location", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ latitude: lat, longitude: lng }),
        });

        alert("Super accurate location received!");
      } else {
        throw new Error("Google API failed to retrieve location.");
      }
    } catch (error) {
      console.error("❌ Google API Error:", error);
      setError("Failed to get precise location. Check API key and permissions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button onClick={getPreciseLocation} style={{ padding: "10px", fontSize: "16px" }} disabled={loading}>
        {loading ? "Getting Super Accurate Location..." : "Get Super Accurate Location"}
      </button>
      
      {location && (
        <p>
          <strong>Latitude:</strong> {location.latitude}, <strong>Longitude:</strong> {location.longitude}
        </p>
      )}
      
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
