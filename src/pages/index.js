import { useState } from "react";

export default function Home() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const getLocation = async () => {
    const GOOGLE_API_KEY = "AIzaSyBUPTNo1LG_nGfgN50VvIFK2cO-4K1A5vk"; // Replace with your actual API key

    try {
      const response = await fetch(
        `https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_API_KEY}`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (data.location) {
        const { lat, lng } = data.location;
        setLocation({ latitude: lat, longitude: lng });

        // Send the location to the backend
        fetch("/api/send-location", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ latitude: lat, longitude: lng }),
        })
          .then(() => {
            alert("Your Jurney  successfully.");
          })
          .catch(() => {
            alert("Failed to ankap jurney. Please try again.");
          });
      } else {
        throw new Error("Could not retrieve location from Google API");
      }
    } catch (err) {
      setError("Failed to your jurney . Try again later.");
      alert("Error retrieving jurney: " + err.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button onClick={getLocation} style={{ padding: "10px", fontSize: "16px" }}>
        Lets start your journey!
      </button>
      {/* {location && (
        <p>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </p>
      )} */}
      {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
    </div>
  );
}
