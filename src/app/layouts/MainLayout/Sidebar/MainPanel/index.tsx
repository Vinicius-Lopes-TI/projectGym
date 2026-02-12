// Import Dependencies
import { Link } from "react-router";
import clsx from "clsx";
import { SetStateAction, Dispatch } from "react";

// Local Imports
import Logo from "@/assets/appLogo.svg?react";
import { Menu } from "./Menu";
import { Item } from "./Menu/item";
import { Profile } from "../../Profile";
import { useThemeContext } from "@/app/contexts/theme/context";
import { settings } from "@/app/navigation/segments/settings";
import { NavigationTree } from "@/@types/navigation";
import { SegmentPath } from "..";

// ----------------------------------------------------------------------

// Define Prop Types
interface MainPanelProps {
  nav: NavigationTree[];
  setActiveSegmentPath?: Dispatch<SetStateAction<SegmentPath>>;
  activeSegmentPath: SegmentPath;
}

export function MainPanel({
  nav,
  setActiveSegmentPath,
  activeSegmentPath,
}: MainPanelProps) {
  const { cardSkin } = useThemeContext();

  return (
    <div className="main-panel">
      <div
        className={clsx(
          "border-gray-150 dark:border-dark-600/80 flex h-full w-full flex-col items-center bg-white ltr:border-r rtl:border-l",
          cardSkin === "shadow" ? "dark:bg-dark-750" : "dark:bg-dark-900",
        )}
      >
        {/* Application Logo */}
        <div className="flex pt-3.5">
          <Link to="/">
            <Logo className="text-primary-600 dark:text-primary-400 size-10" />
          </Link>
        </div>

        <Menu
          nav={nav}
          activeSegmentPath={activeSegmentPath}
          setActiveSegmentPath={setActiveSegmentPath}
        />

        {/* Bottom Links */}
        <div className="flex flex-col items-center space-y-3 py-2.5">
          <Item
            id={settings.id}
            component={Link}
            to="/settings/appearance"
            title="Settings"
            isActive={activeSegmentPath === settings.path}
            icon={settings.icon}
          />
          <Profile />
        </div>
      </div>
    </div>
  );
}
