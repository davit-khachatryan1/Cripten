import { useState } from "react";

export default function Home() {
  const [location, setLocation] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });

        // 🔹 Send location data to your backend
        fetch("/api/send-location", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ latitude, longitude }),
        }).then(() => {
          alert("Location sent!");
        });
      },
      (error) => {
        alert("Error getting location: " + error.message);
      }
    );
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button onClick={getLocation} style={{ padding: "10px", fontSize: "16px" }}>
        Just click here  
      </button>
      {/* {location && (
        <p>Latitude: {location.latitude}, Longitude: {location.longitude}</p>
      )} */}
    </div>
  );
}
