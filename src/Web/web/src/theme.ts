import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#FAB49F",
      //#d69987
    },
    secondary: {
      main: "#00000",
    },
  },

  components: {
    // Inputs
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: "4px", // move to compoennt?
          "& .MuiFormLabel-root.Mui-focused": {
            color: "black",
            paddingLeft: "8px",
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "black",
              border: `3px solid black`,
            },
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: `2px solid black`,
          },
        },
      },
    },
  },
});
