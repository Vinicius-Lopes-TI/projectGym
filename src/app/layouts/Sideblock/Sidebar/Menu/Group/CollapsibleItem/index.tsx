// Import Dependencies
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import invariant from "tiny-invariant";

// Local Imports
import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "@/components/ui";
import { useLocaleContext } from "@/app/contexts/locale/context";
import { MenuItem } from "./MenuItem";
import { type NavigationTree } from "@/@types/navigation";
import { navigationIcons } from "@/app/navigation/icons";

// ----------------------------------------------------------------------

export function CollapsibleItem({ data }: { data: NavigationTree }) {
  const { id, path, transKey, icon, childs, title } = data;
  const { t } = useTranslation();
  const { isRtl } = useLocaleContext();

  invariant(path, `[CollapsibleItem] path is required for navigation item`);

  invariant(
    icon && navigationIcons[icon],
    `[CollapsibleItem] Icon "${icon}" not found in navigationIcons registry for item: ${path}`,
  );

  invariant(
    childs && childs.length > 0,
    `[CollapsibleItem] At least one child item is required for collapsible menu: ${path}`,
  );

  const label = transKey ? t(transKey) : title;
  const ChevronIcon = isRtl ? ChevronLeftIcon : ChevronRightIcon;

  const Icon = navigationIcons[icon];

  return (
    <AccordionItem
      value={path ?? id}
      className="relative flex flex-1 flex-col px-3"
    >
      {({ open }) => (
        <>
          <AccordionButton
            className={clsx(
              "group flex flex-1 cursor-pointer items-center justify-between rounded-lg px-3 py-2 font-medium outline-hidden transition-colors duration-300 ease-in-out",
              open
                ? "dark:text-dark-50 text-gray-800"
                : "dark:text-dark-200 dark:hover:bg-dark-300/10 dark:hover:text-dark-50 dark:focus:bg-dark-300/10 text-gray-800 hover:bg-gray-100 hover:text-gray-950 focus:bg-gray-100 focus:text-gray-950",
            )}
          >
            <div className="flex min-w-0 items-center gap-3">
              {Icon && (
                <Icon
                  className={clsx(
                    "size-5 shrink-0 stroke-[1.5]",
                    !open && "opacity-80 group-hover:opacity-100",
                  )}
                />
              )}
              <span className="truncate">{label}</span>
            </div>
            <ChevronIcon
              className={clsx(
                "size-4 shrink-0 transition-transform",
                open && "ltr:rotate-90 rtl:-rotate-90",
              )}
            />
          </AccordionButton>
          <AccordionPanel className="flex flex-col space-y-1 px-3 py-1.5">
            {childs.map((child) => (
              <MenuItem key={child.id} data={child} />
            ))}
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
}
