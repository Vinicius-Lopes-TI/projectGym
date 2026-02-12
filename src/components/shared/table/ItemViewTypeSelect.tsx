import { Table } from "@tanstack/react-table";
import { TbList } from "react-icons/tb";
import { TbGridDots } from "react-icons/tb";
import clsx from "clsx";
import invariant from "tiny-invariant";

import { Button } from "@/components/ui";
import { createScopedKeydownHandler } from "@/utils/dom/createScopedKeydownHandler";

export type ItemViewType = "list" | "grid";

export function ItemViewTypeSelect({ table }: { table: Table<any> }) {
  const setViewType = table.options.meta?.setViewType;
  const viewType = table.getState()?.viewType;

  invariant(setViewType, "setViewType is not defined");

  return (
    <div
      data-tab
      className="text-xs-plus dark:bg-dark-700 dark:text-dark-200 flex rounded-md bg-gray-200 px-1 py-1 text-gray-800"
    >
      <Button
        data-tooltip
        data-tooltip-content="List View"
        data-tab-item
        className={clsx(
          "shrink-0 rounded-sm px-1.5 py-1 font-medium whitespace-nowrap",
          viewType === "list"
            ? "dark:bg-dark-500 dark:text-dark-100 bg-white shadow-sm"
            : "dark:hover:text-dark-100 dark:focus:text-dark-100 hover:text-gray-900 focus:text-gray-900",
        )}
        unstyled
        onKeyDown={createScopedKeydownHandler({
          siblingSelector: "[data-tab-item]",
          parentSelector: "[data-tab]",
          activateOnFocus: true,
          loop: false,
          orientation: "horizontal",
        })}
        onClick={() => setViewType("list")}
      >
        <TbList className="size-4.5" />
      </Button>

      <Button
        data-tooltip
        data-tooltip-content="Grid View"
        data-tab-item
        className={clsx(
          "shrink-0 rounded-sm px-1.5 py-1 font-medium whitespace-nowrap",
          viewType === "grid"
            ? "dark:bg-dark-500 dark:text-dark-100 bg-white shadow-sm"
            : "dark:hover:text-dark-100 dark:focus:text-dark-100 hover:text-gray-900 focus:text-gray-900",
        )}
        unstyled
        onKeyDown={createScopedKeydownHandler({
          siblingSelector: "[data-tab-item]",
          parentSelector: "[data-tab]",
          activateOnFocus: true,
          loop: false,
          orientation: "horizontal",
        })}
        onClick={() => setViewType("grid")}
      >
        <TbGridDots className="size-4.5" />
      </Button>
    </div>
  );
}
