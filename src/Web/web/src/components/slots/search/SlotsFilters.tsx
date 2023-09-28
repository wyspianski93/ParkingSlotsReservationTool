import { useLayoutEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { slotsFilterState } from "../../../state/slots/slotsFilterState";
import { isValidDate } from "../../../utils/dates";
import { FormInputField } from "../../form/FormInputField";

export function SlotsFilters(): JSX.Element {
  const [fromFilterInputValue, setFromFilterInputValue] = useState(
    useRecoilValue(slotsFilterState).from,
  );
  const [toFilterInputValue, setToFilterInputValue] = useState(useRecoilValue(slotsFilterState).to);

  const setSlotsFilter = useSetRecoilState(slotsFilterState);

  const inputReference = useRef<HTMLInputElement>(null);
  useLayoutEffect(() => {
    inputReference?.current?.focus();
  }, []);

  return (
    <>
      <FormInputField
        label="from"
        onChange={(e) => {
          setFromFilterInputValue(e.target.value);
          if (isValidDate(e.target.value) && isValidDate(toFilterInputValue)) {
            setSlotsFilter(({ from, to }) => ({ from: e.target.value, to }));
          }
        }}
        value={fromFilterInputValue}
        inputRef={inputReference}
      />
      <FormInputField
        label="to"
        onChange={(e) => {
          setToFilterInputValue(e.target.value);
          if (isValidDate(e.target.value) && isValidDate(fromFilterInputValue)) {
            setSlotsFilter(({ from, to }) => ({ from, to: e.target.value }));
          }
        }}
        value={toFilterInputValue}
        inputRef={inputReference}
      />
    </>
  );
}
