// Import Dependencies
import {
  ElementType,
  ReactNode,
  CSSProperties,
  forwardRef,
  ForwardedRef,
} from "react";
import clsx from "clsx";

// Local Imports
import { colorFromText } from "@/utils/colorFromText";
import { setThisClass } from "@/utils/setThisClass";
import { ColorType } from "@/constants/app";
import {
  PolymorphicComponentProps,
  PolymorphicRef,
} from "@/@types/polymorphic";

// ----------------------------------------------------------------------

type AvatarOwnProps<T extends ElementType = "div"> = {
  component?: T;
  imgComponent?: ElementType;
  alt?: string;
  loading?: React.ImgHTMLAttributes<HTMLImageElement>["loading"];
  imgProps?: React.ComponentPropsWithoutRef<"img">;
  src?: React.ImgHTMLAttributes<HTMLImageElement>["src"] | null;
  srcSet?: React.ImgHTMLAttributes<HTMLImageElement>["srcSet"] | null;
  name?: string;
  initialColor?: ColorType | "auto";
  initialVariant?: "filled" | "soft";
  initialProps?: Record<string, unknown>;
  classNames?: {
    root?: string;
    display?: string;
    image?: string;
    initial?: string;
  };
  children?: ReactNode;
  size?: number;
  style?: CSSProperties;
  indicator?: ReactNode;
};

export type AvatarProps<E extends ElementType = "div"> =
  PolymorphicComponentProps<E, AvatarOwnProps<E>>;

const variants = {
  filled: "bg-this text-white",
  soft: "text-this-darker bg-this-darker/10 dark:text-this-lighter dark:bg-this-lighter/10",
};

const neutralVariants = {
  filled: "bg-gray-200 text-gray-700 dark:bg-surface-2 dark:text-dark-100",
  soft: "bg-gray-200/30 text-gray-700 dark:bg-surface-2/30 dark:text-dark-100",
};

export const AvatarInner = forwardRef(
  <T extends ElementType = "div">(props: any, ref: ForwardedRef<any>) => {
    const {
      component: Component = "div" as T,
      imgComponent: ImgComponent = "img",
      alt,
      loading = "lazy",
      imgProps,
      src,
      srcSet,
      name,
      initialColor = "neutral",
      initialVariant = "filled",
      initialProps,
      className,
      classNames = {},
      children,
      size = 12,
      style,
      indicator,
      ...rest
    } = props as AvatarProps<T>;

    const chars =
      name
        ?.match(/\b(\w)/g)
        ?.slice(0, 2)
        .join("") || "";

    const resolvedColor: ColorType =
      initialColor === "auto"
        ? colorFromText(chars)
        : (initialColor ?? "neutral");

    return (
      <Component
        className={clsx(
          "avatar relative inline-flex shrink-0",
          className,
          classNames?.root,
        )}
        style={{ height: `${size / 4}rem`, width: `${size / 4}rem`, ...style }}
        ref={ref}
        {...(rest as any)}
      >
        {src || srcSet ? (
          <ImgComponent
            className={clsx(
              "avatar-image avatar-display before:bg-gray-150 dark:before:bg-dark-600 relative h-full w-full before:absolute before:inset-0 before:rounded-[inherit]",
              classNames?.display,
              classNames?.image,
            )}
            src={src}
            srcSet={srcSet}
            alt={alt || name || "avatar"}
            loading={loading}
            {...imgProps}
          />
        ) : (
          <div
            className={clsx(
              "avatar-initial avatar-display flex h-full w-full items-center justify-center font-medium uppercase select-none",
              resolvedColor !== "neutral"
                ? [setThisClass(resolvedColor), variants[initialVariant]]
                : neutralVariants[initialVariant],
              classNames?.display,
              classNames?.initial,
            )}
            {...initialProps}
          >
            {name ? chars : children}
          </div>
        )}

        {indicator}
      </Component>
    );
  },
);

type AvatarComponent = (<E extends ElementType = "div">(
  props: AvatarProps<E> & { ref?: PolymorphicRef<E> },
) => ReactNode) & { displayName?: string };

const Avatar = AvatarInner as AvatarComponent;
Avatar.displayName = "Avatar";

export { Avatar };
