import { CircularProgress } from "@mui/material";
import BaseViewPaper from "./BaseViewPaper";

export function Loader(): JSX.Element {
  return (
    <BaseViewPaper>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          height: "100%",
        }}
      >
        <CircularProgress size={200}></CircularProgress>
      </div>
    </BaseViewPaper>
  );
}
