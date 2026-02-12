import clsx from "clsx";
import { forwardRef, ForwardedRef } from "react";
import { Spinner, SpinnerProps } from "./Spinner";

const GhostSpinner = forwardRef((
  props: Omit<SpinnerProps, "color">,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const { variant = "default", className, ...rest } = props;

  return (
    <Spinner
      unstyled
      className={clsx(
        "ghost-spinner",
        {
          "border-white border-r-transparent": variant === "default",
          "border-white/30 border-r-white": variant === "soft",
          "text-white": variant === "innerDot",
        },
        className,
      )}
      variant={variant}
      ref={ref}
      {...rest}
    />
  );
});

GhostSpinner.displayName = "GhostSpinner";

export { GhostSpinner };
