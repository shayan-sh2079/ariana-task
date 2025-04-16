import ModalWrapper from "#/components/ui/ModalWrapper.tsx";
import { Icon } from "@iconify/react";
import Button from "#/components/ui/Button.tsx";

interface Props {
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

export default function SignOutModal(props: Props) {
  return (
    <ModalWrapper onClose={props.onClose}>
      <div
        className={"relative flex w-105 flex-col items-center px-6 pt-8.5 pb-4"}
      >
        <button
          className={"absolute top-5 right-5 cursor-pointer"}
          onClick={props.onClose}
        >
          <Icon
            icon="mdi:close"
            width={16}
            height={16}
            className={"text-primary"}
          />
        </button>
        <Icon
          icon="mdi:alert-circle"
          className={"text-black"}
          height={33}
          width={33}
        />
        <p className={"font-segoe my-2 text-sm font-semibold"}>Log out</p>
        <p className={"font-segoe text-sm text-gray-100"}>
          Are you sure you want to sign out of your account?
        </p>
        <div className={"mt-10 grid w-full grid-cols-2 gap-4"}>
          <Button
            variant={"outlined"}
            isLoading={props.isLoading}
            onClick={props.onConfirm}
          >
            Log out
          </Button>
          <Button disabled={props.isLoading}>Cancel</Button>
        </div>
      </div>
    </ModalWrapper>
  );
}
