// Import Dependencies
import { ReactNode, forwardRef, ForwardedRef, ComponentPropsWithoutRef } from "react";
import clsx from "clsx";

// Local Imports
import { setThisClass } from "@/utils/setThisClass";
import { ColorType } from "@/constants/app";

// ------------------------------------------------------------------------

export type AvatarDotProps = {
  color?: ColorType;
  isPing?: boolean;
  children?: ReactNode;
} & ComponentPropsWithoutRef<"div">;

const AvatarDot = forwardRef<HTMLDivElement, AvatarDotProps>(({
  color = "neutral",
  isPing,
  className,
  children,
  ...rest
}, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <div
      className={clsx(
        "avatar-dot absolute rounded-full",
        color === "neutral"
          ? "bg-gray-300 dark:bg-dark-200"
          : [setThisClass(color), "bg-this dark:bg-this-light"],
        className,
      )}
      {...rest}
      ref={ref}
    >
      {isPing && (
        <span className="absolute inset-0 inline-flex h-full w-full animate-ping rounded-full bg-inherit opacity-80" />
      )}
      {children}
    </div>
  );
});

AvatarDot.displayName = "AvatarDot";

export { AvatarDot };
