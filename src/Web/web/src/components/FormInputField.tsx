import { TextField, styled } from "@mui/material";

export function FormInputField({
  label,
  value,
  onChange,
  type,
}: {
  label: string;
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  type?: string;
}): JSX.Element {
  return <StyledTextField label={label} value={value} type={type} onChange={onChange} />;
}

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "40%",
  padding: "5px",
  margin: "4px",
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
}));
