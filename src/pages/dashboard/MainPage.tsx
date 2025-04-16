import { Icon } from "@iconify/react";

export function Component() {
  return (
    <div className={"flex grow items-center justify-center"}>
      <Icon
        icon="mdi:desktop-classic"
        className={"text-gray-300"}
        width={280}
        height={280}
      />
    </div>
  );
}
