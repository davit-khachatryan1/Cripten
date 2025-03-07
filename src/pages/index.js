import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {  // Changed from WomensDay to Home
  const [showFlower, setShowFlower] = useState(false);

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
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    button: {
      padding: "12px 24px",
      fontSize: "18px",
      backgroundColor: "red", // Red button background
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background-color 0.3s ease",
    },
    flowerImage: {
      // width: "200px",
      transition: "opacity 1s ease, transform 1s ease",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        {!showFlower ? (
          <button
            onClick={() => setShowFlower(true)}
            style={styles.button}
            className="hover:bg-red-600"
          >
           Happy Women's Day
          </button>
        ) : (
          <motion.img
            src="/flow.png"  // Correct image path (direct access from public folder)
            alt="Flower"
            style={styles.flowerImage}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          />
        )}
      </div>
    </div>
  );
}
