import { useState } from "react";
import { motion } from "framer-motion";
// import Flow from "../../public/flow.png"; 

export default function WomensDay() {
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
      // backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay for visibility
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
            Click to Celebrate
          </button>
        ) : (
          <motion.img
            src="/flow.png" // Place your flower image in the public folder
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
