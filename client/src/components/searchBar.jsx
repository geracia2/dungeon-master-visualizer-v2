import { Box, Paper, TextField } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";


export default function CustomizedInputBase({
  section,
  handleSearch,
  input,
  handleChange,
}) {


  return (
    <>
      <Box sx={{ p: 1, display: "flex", justifyContent: "center" }}>
        <Box
          component="form"
          onSubmit={handleSearch}
          sx={{
            width: 500,
            maxWidth: '100%',
          }}
        >
          <TextField fullWidth label={`${section}`} id="fullWidth" value={input} onChange={handleChange} />
        </Box>
      </Box>
    </>
  );
}
