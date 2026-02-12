// Import Dependencies
import clsx from "clsx";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

// Local Imports
import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "@/components/ui";
import { useLocaleContext } from "@/app/contexts/locale/context";
import { MenuItem } from "./MenuItem";
import { NavigationTree } from "@/@types/navigation";

// ----------------------------------------------------------------------

export function CollapsibleItem({ data }: { data: NavigationTree }) {
  const { id, path, childs, transKey } = data;
  const { t } = useTranslation();
  const { isRtl } = useLocaleContext();
  const title = transKey ? t(transKey) : data.title;

  const Icon = isRtl ? ChevronLeftIcon : ChevronRightIcon;

  if (!childs) {
    throw "The collapsible item must have childs";
  }

  return (
    <AccordionItem value={path ?? id}>
      {({ open }: { open: boolean }) => (
        <>
          <AccordionButton
            className={clsx(
              "text-xs-plus flex w-full min-w-0 cursor-pointer items-center justify-between gap-1 py-2 text-start tracking-wide outline-hidden transition-[color,padding-left,padding-right] duration-300 ease-in-out",
              open
                ? "dark:text-dark-50 font-semibold text-gray-800"
                : "dark:text-dark-200 dark:hover:text-dark-50 dark:focus:text-dark-50 text-gray-600 hover:text-gray-800 focus:text-gray-800",
            )}
          >
            <span className="truncate">{title}</span>
            <Icon
              className={clsx(
                "dark:text-dark-200 size-4 text-gray-400 transition-transform ease-in-out",
                open && [isRtl ? "-rotate-90" : "rotate-90"],
              )}
            />
          </AccordionButton>
          <AccordionPanel>
            {childs.map((i) => (
              <MenuItem key={i.path} data={i} />
            ))}
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
}
