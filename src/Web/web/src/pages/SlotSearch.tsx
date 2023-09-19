import { useEffect, useState } from "react";
import { BaseViewPaper } from "../components/BaseViewPaper";
import { Slot, getSlots } from "../services/getSlots";

export function SlotSearch(): JSX.Element {
  const [slots, setSlots] = useState([] as Slot[]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getSlots();

      setSlots(result.slots);
    };

    fetchData();
  }, []);

  return (
    <BaseViewPaper>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {slots.map((slot) => (
          <SlotView name={slot.name}></SlotView>
        ))}
      </div>
    </BaseViewPaper>
  );
}

function SlotView({ name }: { name: string }): JSX.Element {
  return (
    <div>
      <span>{name}</span>
    </div>
  );
}
