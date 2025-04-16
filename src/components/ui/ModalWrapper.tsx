interface Props {
  children: React.ReactNode;
  onClose: () => void;
}

export default function ModalWrapper(props: Props) {
  return (
    <div role={"presentation"} className={"z-50"}>
      <div className={"fixed inset-0 bg-black/50"} onClick={props.onClose} />
      <div
        className={
          "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md border border-gray-400 bg-white shadow-lg"
        }
      >
        {props.children}
      </div>
    </div>
  );
}
