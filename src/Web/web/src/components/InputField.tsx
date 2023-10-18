import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const InputField = styled(TextField)(({ width }: { width: string }) => ({
  width: width,
  padding: "5px",
  margin: "4px",
  "& .MuiFormLabel-root": {
    color: "black",
    paddingLeft: "8px",
  },
  "& .MuiFormLabel-root.Mui-focused": {
    color: "black",
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
}));
