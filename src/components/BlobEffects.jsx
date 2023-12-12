import { motion } from "framer-motion";

export function BlobEffect({ position, style }) {
  const circleStyles = {
    "style-1": styleJadeBlue,
    "style-2": styleRedBlue,
  };

  return (
    <motion.div
      animate={{
        x: [0, 100, 0],
        rotate: [0, 350], // Rotate from 0 to 350 degrees (and continue)
        skewX: [-10, 0, -10], // SkewX from -10 to 0 and back
      }}
      transition={{ repeat: Infinity, duration: 30, ease: "linear" }} // Adjust duration for a full rotation
      style={circleStyles[style] || styleRedBlue}
      className={`rounded-full fixed -z-10 ${position}`}
    />
  );
}

const styleJadeBlue = {
  background: "linear-gradient(180deg, #1ED79F 0%, #6495B7 100%)",
  filter: "blur(200.25px)",
  width: "41.125rem",
  height: "36.6875rem",
};

const styleRedBlue = {
  background: "linear-gradient(180deg, #27A7FF 0%, #FF3F3F 100%)",
  filter: "blur(120.849998474121094px)",
  width: "54.75rem",
  height: "57.625rem",
};
