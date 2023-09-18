import styles from "../../styles.module.css";
import { MenuItems } from "./MenuItems";
import { MenuTitle } from "./MenuTitle";

export function Menu(): JSX.Element {
  return (
    <div
      className={styles.appWidth}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "auto",
        height: "60px",
      }}
    >
      <MenuTitle />
      <MenuItems />
    </div>
  );
}
