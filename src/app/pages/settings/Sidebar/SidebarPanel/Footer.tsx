// Import Dependencies
import { Radio, RadioGroup } from "@headlessui/react";
import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

// Local Imports
import { Button } from "@/components/ui";
import { useThemeContext } from "@/app/contexts/theme/context";
import { Fragment } from "react/jsx-runtime";

// ----------------------------------------------------------------------

export function Footer() {
  const { themeMode, setThemeMode } = useThemeContext();

  return (
    <div className="flex px-4 py-3">
      <RadioGroup
        value={themeMode}
        onChange={setThemeMode}
        className="dark:bg-dark-700 dark:text-dark-200 flex w-max min-w-full rounded-lg bg-gray-200 px-1.5 py-1 text-gray-600"
      >
        <Radio value="system" as={Fragment}>
          {({ checked }) => (
            <Button
              className={clsx(
                "flex-1 shrink-0 rounded-lg px-3 py-1.5 font-medium whitespace-nowrap",
                checked
                  ? "dark:bg-dark-500 dark:text-dark-100 bg-white shadow-sm"
                  : "dark:hover:text-dark-100 dark:focus:text-dark-100 hover:text-gray-800 focus:text-gray-800",
              )}
              unstyled
            >
              <ComputerDesktopIcon className="size-5" />
            </Button>
          )}
        </Radio>
        <Radio value="light" as={Fragment}>
          {({ checked }) => (
            <Button
              unstyled
              className={clsx(
                "flex-1 shrink-0 rounded-lg px-3 py-1.5 font-medium whitespace-nowrap",
                checked
                  ? "dark:bg-dark-500 dark:text-dark-100 bg-white shadow-sm"
                  : "dark:hover:text-dark-100 dark:focus:text-dark-100 hover:text-gray-800 focus:text-gray-800",
              )}
            >
              <SunIcon className="size-5" />
            </Button>
          )}
        </Radio>
        <Radio value="dark" as={Fragment}>
          {({ checked }) => (
            <Button
              unstyled
              className={clsx(
                "flex-1 shrink-0 rounded-lg px-3 py-1.5 font-medium whitespace-nowrap",
                checked
                  ? "dark:bg-dark-500 dark:text-dark-100 bg-white shadow-sm"
                  : "dark:hover:text-dark-100 dark:focus:text-dark-100 hover:text-gray-800 focus:text-gray-800",
              )}
            >
              <MoonIcon className="size-5" />
            </Button>
          )}
        </Radio>
      </RadioGroup>
    </div>
  );
}
