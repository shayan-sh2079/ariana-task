import { ComponentProps } from "react";

interface Props extends ComponentProps<"button"> {
  variant?: ButtonVariants;
  color?: ButtonColors;
  isLoading?: boolean;
}

const getClasses = (variant: ButtonVariants, color: ButtonColors) => {
  const baseClasses =
    "h-10 font-sans font-medium text-sm leading-6 rounded-md cursor-pointer disabled:border-none disabled:bg-secondary disabled:text-primary disabled:cursor-default ";
  switch (variant) {
    case "outlined":
      return baseClasses + "border border-gray-400 text-primary";
    case "contained":
    default:
      switch (color) {
        case "destructive":
          return baseClasses + "bg-destructive text-primary-foreground";
        case "primary":
        default:
          return baseClasses + "bg-primary text-primary-foreground";
      }
  }
};

export default function Button({
  variant = "contained",
  className,
  type = "button",
  color = "primary",
  isLoading = false,
  disabled,
  children,
  ...props
}: Props) {
  return (
    <button
      className={
        getClasses(variant, color) + (className ? " " + className : "")
      }
      type={type}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}
