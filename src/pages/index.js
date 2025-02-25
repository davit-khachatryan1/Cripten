import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);

  const getPreciseLocation = async () => {
    const apiKey = "YOUR_GOOGLE_MAPS_API_KEY"; // 🔥 Replace with your real API Key

    setLoading(true);

    if (!navigator.geolocation) {
      console.error("❌ Geolocation is not supported by this browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        console.log(`📍 GPS Location: Latitude: ${latitude}, Longitude: ${longitude} (Accuracy: ${accuracy}m)`);

        if (accuracy > 5) {
          console.log("⚠️ GPS is not precise enough. Trying Google API...");
          getGoogleLocation(apiKey);
          return;
        }

        await getAddressFromCoordinates(latitude, longitude, apiKey);
      },
      (error) => {
        console.error("❌ GPS Error:", error);
        console.log("⚠️ GPS failed! Trying Google API...");
        getGoogleLocation(apiKey);
      },
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 0 }
    );
  };

  const getGoogleLocation = async (apiKey) => {
    try {
      const response = await fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      const data = await response.json();

      if (data.location) {
        const { lat, lng } = data.location;
        console.log(`📍 Google API Location: Latitude: ${lat}, Longitude: ${lng}`);
        await getAddressFromCoordinates(lat, lng, apiKey);
      }
    } catch (error) {
      console.error("❌ Google API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAddressFromCoordinates = async (latitude, longitude, apiKey) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
      );

      const data = await response.json();
      if (data.results.length > 0) {
        const address = data.results[0].formatted_address;
        console.log(`📍 Address Found: ${address}`);
        await sendLocation(latitude, longitude, address);
      }
    } catch (error) {
      console.error("❌ Reverse Geocoding API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const sendLocation = async (latitude, longitude, address) => {
    try {
      await fetch("/api/send-location", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latitude, longitude, address }),
      });
      console.log("✅ Location sent successfully!");
    } catch (error) {
      console.error("❌ API Error:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button onClick={getPreciseLocation} style={{ padding: "10px", fontSize: "16px" }} disabled={loading}>
        {loading ? "Processing..." : "Start"}
      </button>
    </div>
  );
}
