// Import Dependencies
import {
  ComponentPropsWithoutRef,
  CSSProperties,
  forwardRef,
  ForwardedRef,
  ReactNode,
} from "react";
import clsx from "clsx";

// Local Imports
import { ColorType } from "@/constants/app";
import { setThisClass } from "@/utils/setThisClass";

// ----------------------------------------------------------------------

type Variant = "default" | "soft";

export type ProgressProps = {
  children?: ReactNode;
  value?: number;
  showRail?: boolean;
  isActive?: boolean;
  isIndeterminate?: boolean;
  unstyled?: boolean;
  color?: ColorType;
  variant?: Variant;
  className?: string;
  classNames?: {
    root?: string;
    bar?: string;
  };
  animationDuration?: CSSProperties["animationDuration"];
  style?: CSSProperties;
  rootProps?: Record<string, any>;
} & ComponentPropsWithoutRef<"div">;

const Progress = forwardRef(
  (props: ProgressProps, ref: ForwardedRef<HTMLDivElement>) => {
    const {
      children,
      value = 0,
      showRail = true,
      isActive = false,
      isIndeterminate = false,
      unstyled = false,
      color = "neutral",
      variant = "default",
      className,
      classNames,
      animationDuration,
      style = {},
      rootProps = {},
      ...rest
    } = props;

    return (
      <div
        {...rootProps}
        className={clsx(
          "progress-rail",
          showRail &&
            !unstyled && [
              color === "neutral" || variant !== "soft"
                ? "bg-gray-150 dark:bg-dark-500"
                : [setThisClass(color), "bg-this/[.15] dark:bg-this-light/25"],
            ],
          className,
          classNames?.root,
        )}
      >
        <div
          ref={ref}
          {...rest}
          className={clsx(
            "progress relative rounded-full transition-[width] ease-out",
            !unstyled && [
              color === "neutral"
                ? "dark:bg-dark-400 bg-gray-500"
                : [setThisClass(color), "bg-this dark:bg-this-light"],
            ],
            isActive && "is-active",
            isIndeterminate
              ? "is-indeterminate"
              : "flex items-center justify-end leading-none",
            classNames?.bar,
          )}
          style={{
            width: isIndeterminate ? "100%" : `${value}%`,
            animationDuration,
            ...style,
          }}
        >
          {children}
        </div>
      </div>
    );
  },
);

Progress.displayName = "Progress";

export { Progress };
