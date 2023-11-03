import { useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useOnClickedOutsideRef(ref: any, onOutsideClick: () => void) {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
