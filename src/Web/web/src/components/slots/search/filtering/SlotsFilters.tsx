import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { slotsFilterState } from "../../../../state/slots/slotsFilterState";
import { isValidDate } from "../../../../utils/dates";
import { InputField } from "../../../InputField";
import { ApplyFiltersButton } from "./ApplyFiltersButton";

export function SlotsFilters(): JSX.Element {
  const [fromFilterInputValue, setFromFilterInputValue] = useState(
    useRecoilValue(slotsFilterState).from,
  );
  const [toFilterInputValue, setToFilterInputValue] = useState(useRecoilValue(slotsFilterState).to);

  const [areFiltersValid, setAreFiltersValid] = useState(true);

  const setSlotsFilter = useSetRecoilState(slotsFilterState);

  // const inputReference = useRef<HTMLInputElement>(null);
  // useLayoutEffect(() => {
  //   inputReference?.current?.focus();
  // }, []);

  useEffect(() => {
    if (isValidDate(fromFilterInputValue) && isValidDate(toFilterInputValue)) {
      setAreFiltersValid(true);
    }

    if (new Date(fromFilterInputValue) > new Date(toFilterInputValue)) {
      setAreFiltersValid(false);
    }
  }, [fromFilterInputValue, toFilterInputValue]);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <InputField
        width="20%"
        label="from"
        onChange={(e) => {
          setFromFilterInputValue(e.target.value);
          if (!isValidDate(e.target.value)) {
            setAreFiltersValid(false);
          }
        }}
        value={fromFilterInputValue}
        //inputRef={inputReference}
      />
      <InputField
        width="20%"
        label="to"
        onChange={(e) => {
          setToFilterInputValue(e.target.value);
          if (!isValidDate(e.target.value)) {
            setAreFiltersValid(false);
          }
        }}
        value={toFilterInputValue}
        //inputRef={inputReference}
      />
      <ApplyFiltersButton
        label="Apply filters"
        disabled={!areFiltersValid}
        onClick={() => {
          setSlotsFilter({ from: fromFilterInputValue, to: toFilterInputValue });
        }}
      />
    </div>
  );
}
