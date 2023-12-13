import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";

export default function ToggleSwitch({ state, toggleHandler }) {
  const [enabled, setEnabled] = useState(state);

  useEffect(() => {
    setEnabled(state);
  }, [state]);

  function handleToggle() {
    toggleHandler();
    setEnabled(!enabled);
  }

  return (
    <div>
      <Switch
        checked={enabled}
        onChange={handleToggle}
        className={`${enabled ? "bg-light-jade" : "bg-light-gray"}
          relative inline-flex h-[25px] w-[50px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
      >
        <span
          aria-hidden='true'
          className={`${
            enabled
              ? "translate-x-6 -translate-y-0.5"
              : "-translate-x-0.5 -translate-y-0.5"
          }
            pointer-events-none inline-block h-[25px] w-[25px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  );
}
