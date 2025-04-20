import EllipsisIcon from "#/components/icons/EllipsisIcon.tsx";
import DeleteIcon from "#/components/icons/DeleteIcon.tsx";
import useCardActions from "#/pages/dashboard/hooks/useCardActions.ts";

interface Props {
  id: number;
  onDelete: () => void;
}

export default function CardActions(props: Props) {
  const {
    handleDelete,
    popperRef,
    isLoading,
    ellipsisBtn,
    handleOpen,
    isActionsOpen,
  } = useCardActions(props.id, props.onDelete);

  return (
    <div className={"relative"}>
      <button
        onClick={handleOpen}
        className={"cursor-pointer"}
        ref={ellipsisBtn}
      >
        <EllipsisIcon />
      </button>
      {isActionsOpen && (
        <button
          className={
            "absolute -left-1 -mt-2 flex w-55 cursor-pointer items-center gap-2 rounded border border-gray-400 bg-white p-3 shadow-md"
          }
          ref={popperRef}
          onClick={handleDelete}
        >
          <DeleteIcon />
          <p className={"font-sans text-sm leading-5 font-normal text-red-500"}>
            {isLoading ? "Loading ..." : "Delete Post"}
          </p>
        </button>
      )}
    </div>
  );
}
