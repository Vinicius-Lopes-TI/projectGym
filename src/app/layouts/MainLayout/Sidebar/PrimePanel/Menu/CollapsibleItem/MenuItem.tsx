// Import Dependencies
import clsx from "clsx";
import { NavLink, useRouteLoaderData } from "react-router";
import { useTranslation } from "react-i18next";

// Local Imports
import { useBreakpointsContext } from "@/app/contexts/breakpoint/context";
import { useSidebarContext } from "@/app/contexts/sidebar/context";
import { Badge } from "@/components/ui";
import { NavigationTree } from "@/@types/navigation";

// ----------------------------------------------------------------------

export function MenuItem({ data }: { data: NavigationTree }) {
  const { transKey, path, id } = data;
  const { lgAndDown } = useBreakpointsContext();
  const { close } = useSidebarContext();
  const { t } = useTranslation();

  const title = transKey ? t(transKey) : data.title;
  const info = useRouteLoaderData("root")?.[id]?.info;

  const handleMenuItemClick = () => {
    if (lgAndDown) close();
  };

  return (
    <NavLink
      to={path as string}
      onClick={handleMenuItemClick}
      id={id}
      className={({ isActive }) =>
        clsx(
          "text-xs-plus flex items-center justify-between px-2 tracking-wide outline-hidden transition-[color,padding-left,padding-right] duration-300 ease-in-out hover:ltr:pl-4 hover:rtl:pr-4",
          isActive
            ? "text-primary-600 dark:text-primary-400 font-medium"
            : "dark:text-dark-200 dark:hover:text-dark-50 dark:focus:text-dark-50 text-gray-600 hover:text-gray-900 focus:text-gray-900",
        )
      }
    >
      {({ isActive }) => (
        <div
          data-menu-active={isActive}
          className="flex min-w-0 items-center justify-between"
          style={{ height: "34px" }}
        >
          <div className="flex min-w-0 items-center space-x-2 rtl:space-x-reverse">
            <div
              className={clsx(
                isActive
                  ? "bg-primary-600 dark:bg-primary-400 opacity-80"
                  : "opacity-50 transition-all",
                "size-1.5 rounded-full border border-current",
              )}
            ></div>
            <span className="truncate">{title}</span>
          </div>
          {info && info.val && (
            <Badge
              color={info.color}
              className="h-5 min-w-[1.25rem] shrink-0 rounded-full p-[5px]"
            >
              {info.val}
            </Badge>
          )}
        </div>
      )}
    </NavLink>
  );
}
