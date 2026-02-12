// Import Dependencies
import { useLocation } from "react-router";
import { useLayoutEffect, useRef, useState } from "react";
import SimpleBar from "simplebar-react";

// Local Imports
import { useDidUpdate } from "@/hooks";
import { navigation } from "@/app/navigation";
import { Accordion } from "@/components/ui";
import { isRouteActive } from "@/utils/isRouteActive";
import { Group } from "./Group";

// ----------------------------------------------------------------------

export function Menu() {
  const { pathname } = useLocation();
  const ref = useRef<HTMLDivElement | null>(null);

  const activeGroup = navigation.find((item) => {
    if (item.path) return isRouteActive(item.path, pathname);
  });

  const activeCollapsible = activeGroup?.childs?.find((item) => {
    if (item.path) return isRouteActive(item.path, pathname);
  });

  const [expanded, setExpanded] = useState<string | null>(
    activeCollapsible?.path || null,
  );

  useDidUpdate(() => {
    if (activeCollapsible?.path !== expanded)
      setExpanded(activeCollapsible?.path || null);
  }, [activeCollapsible?.path]);

  useLayoutEffect(() => {
    const activeItem = ref.current?.querySelector("[data-menu-active=true]");
    activeItem?.scrollIntoView({ block: "center" });
  }, []);

  return (
    <SimpleBar
      scrollableNodeProps={{ ref }}
      className="h-full overflow-x-hidden pb-6"
    >
      <Accordion value={expanded} onChange={setExpanded} className="space-y-1">
        {navigation.map((nav) => (
          <Group key={nav.id} data={nav} />
        ))}
      </Accordion>
    </SimpleBar>
  );
}
