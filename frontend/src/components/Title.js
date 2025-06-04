import { Box } from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const Title = () => {
  return (
    <MotionBox
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-center",
        userSelect: "none",
        textAlign: "center",
        mt: -3 // negative margin to pull it up
      }}
    >
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
  <Box
    component="h1"
    sx={{
      fontSize: { xs: "3.5rem", md: "6rem" },
      fontWeight: 800,
      fontFamily: "'Montserrat', sans-serif",
      background: "radial-gradient(at center bottom, rgb(253, 224, 71), rgb(120, 53, 15))",
      backgroundSize: "200% 200%",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      animation: "gradientMove 6s ease infinite",
      lineHeight: 1,
      mb: 0.3,
      textAlign: "center",
      width: "100%",
      letterSpacing: "0.05em",
      textShadow: "0 0 20px rgba(253, 224, 71, 0.5)",
      position: "relative",
      "& span": {
        background: "inherit",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundSize: "inherit",
        animation: "inherit",
        textShadow: "inherit"
      }
    }}
  >
    Entertain<span>Me</span>
  </Box>

  <Box
    sx={{
      mt: 2,
      width: "450px",
      height: "3px",
      borderRadius: "2px",
      background: "linear-gradient(90deg, transparent, rgba(253, 224, 71, 0.7), transparent)",
      animation: "pulse 1.5s infinite ease-in-out",
    }}
  />
</Box>

      <style>
        {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes pulse {
            0% { transform: scaleX(1); opacity: 0.7; }
            50% { transform: scaleX(1.2); opacity: 1; }
            100% { transform: scaleX(1); opacity: 0.7; }
        `}
      </style>
    </MotionBox>
  );
};

export { Title };
