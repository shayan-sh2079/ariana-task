import { ComponentProps } from "react";

interface Props extends ComponentProps<"input"> {
  error?: string;
  label: string;
}

const Input = ({ error, label, className, ...props }: Props) => {
  return (
    <label className={"font-geist text-foreground flex flex-col"}>
      <p className={"mb-2 text-sm leading-5 font-medium"}>{label}</p>
      <input
        className={
          "placeholder:text-muted-foreground h-10 rounded-md border border-gray-400 px-3 py-2.5 text-sm outline-none " +
          className
        }
        type="text"
        {...props}
      />
      {error && (
        <p
          className={
            "text-destructive mt-1 font-sans text-sm leading-5 font-medium"
          }
        >
          {error}
        </p>
      )}
    </label>
  );
};

export default Input;
