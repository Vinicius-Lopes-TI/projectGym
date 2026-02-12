import { NavigationTree } from "@/@types/navigation";

/**
 * Object containing the base navigation items for the application.
 * This object serves as a centralized configuration for main navigation elements.
 */
export const baseNavigationObj: Record<string, NavigationTree> = {
  dashboards: {
    id: "dashboards",
    type: "item",
    path: "/dashboards",
    title: "Dashboards",
    transKey: "nav.dashboards.dashboards",
    icon: "dashboards",
  },
};

/**
 * Array of navigation items derived from baseNavigationObj.
 * This array format is used for rendering the navigation menu in the application.
 */
export const baseNavigation: NavigationTree[] = Array.from(
  Object.values(baseNavigationObj),
);
