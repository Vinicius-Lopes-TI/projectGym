// Import Dependencies
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import invariant from "tiny-invariant";

// Local Imports
import { Collapse } from "@/components/ui";
import { useDisclosure } from "@/hooks";
import { useThemeContext } from "@/app/contexts/theme/context";
import { CollapsibleItem } from "./CollapsibleItem";
import { MenuItem } from "./MenuItem";
import { type NavigationTree } from "@/@types/navigation";

// ----------------------------------------------------------------------

export function Group({ data }: { data: NavigationTree }) {
  const [isOpened, { toggle }] = useDisclosure(true);
  const { t } = useTranslation();
  const { cardSkin } = useThemeContext();

  invariant(
    data.childs && data.childs.length > 0,
    "[Group] Group menu must have at least one child",
  );

  return (
    <div className="pt-3">
      <div
        className={clsx(
          "sticky top-0 z-10 bg-white px-6",
          cardSkin === "bordered" ? "dark:bg-dark-900" : "dark:bg-dark-750",
        )}
      >
        <button
          onClick={toggle}
          className="dark:text-dark-300 dark:hover:text-dark-50 dark:focus:text-dark-50 mb-2 flex cursor-pointer items-center gap-3 pt-2 text-xs font-medium tracking-wider text-gray-500 uppercase outline-hidden hover:text-gray-900 focus:text-gray-900"
        >
          <span>{data.transKey ? t(data.transKey) : data.title}</span>
        </button>
        <div
          className={clsx(
            "pointer-events-none absolute inset-x-0 -bottom-3 h-3 bg-linear-to-b from-white to-transparent",
            cardSkin === "bordered"
              ? "dark:from-dark-900"
              : "dark:from-dark-750",
          )}
        ></div>
      </div>
      {data.childs && data.childs.length > 0 && (
        <Collapse in={isOpened}>
          <div className="flex flex-col space-y-1.5">
            {data.childs.map((item) => {
              switch (item.type) {
                case "collapse":
                  return <CollapsibleItem key={item.path} data={item} />;
                case "item":
                  return <MenuItem key={item.path} data={item} />;
                default:
                  return null;
              }
            })}
          </div>
        </Collapse>
      )}
    </div>
  );
}
