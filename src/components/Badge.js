import Chip from "@material-ui/core/Chip";

// reusable badge component
export default function ({ label, bgColor }) {
  return (
    <>
      <Chip 
        label={label}
        variant="outlined"
        color="primary"
        style={{ 
          display: "flex",
          color: "white",
          backgroundColor: bgColor,
        }}
      />
    </>
  );
}
