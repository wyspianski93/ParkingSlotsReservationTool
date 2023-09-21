import { Paper } from "@mui/material";
import { ReactNode } from "react";
import styles from "../styles.module.css";

export default function BaseViewPaper({ children }: { children: ReactNode }): JSX.Element {
  return (
    <Paper
      elevation={5}
      className={styles.appWidth}
      sx={{
        backgroundColor: "#ea9b84",
        height: "80%",
        margin: "auto",
        marginTop: "10px",
        overflowY: "auto",
      }}
    >
      {children}
    </Paper>
  );
}
