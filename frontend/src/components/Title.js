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
        textAlign: "center"
      }}
    >
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
  <Box
    component="h1"
    sx={{
      fontSize: { xs: "2.5rem", md: "4rem" },
      fontWeight: 800,
      fontFamily: "'Montserrat', sans-serif",
      background: "radial-gradient(circle,rgb(11, 57, 127),rgb(51, 192, 239),rgb(22, 98, 175))",
      backgroundSize: "300% 300%",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      animation: "gradientMove 6s ease infinite",
      lineHeight: 1,
      mb: 0.3,
      textAlign: "left", // keeps text left-aligned
    }}
  >
    Entertain<span style={{ color: "#4caf50" }}>Me</span>
  </Box>

  <Box
    sx={{
      mt: 0,
      width: "80px",
      height: "4px",
      borderRadius: "2px",
      background: "radial-gradient(circle,rgb(71, 119, 251), #081c15)",
      boxShadow: "0 0 12px #4caf50",
      animation: "pulse 2.5s infinite ease-in-out",
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
            0% { transform: scaleX(1); opacity: 1; }
            50% { transform: scaleX(1.1); opacity: 0.6; }
            100% { transform: scaleX(1); opacity: 1; }
          }
        `}
      </style>
    </MotionBox>
  );
};

export { Title };
