import CardActions from "#/pages/dashboard/components/CardActions.tsx";
import { formatTimeAgo } from "#/utils/general.ts";
import { memo } from "react";

interface Props {
  name: string;
  img: string;
  date: string;
  text: string;
  isOwner: boolean;
  id: number;
  onDelete: () => void;
}

const PostCard = memo(
  function PostCard(props: Props) {
    return (
      <article
        className={"bg-quaternary/5 flex w-full flex-col gap-3 rounded-lg p-4"}
      >
        <div className={"flex items-center gap-2.5"}>
          <img
            width={32}
            height={32}
            className={"overflow-hidden rounded-full"}
            src={props.img}
            alt={props.name}
            loading="lazy"
          />
          <div className={"mr-auto flex flex-col"}>
            <p
              className={
                "font-roboto text-xs leading-4 font-medium tracking-[0.5px]"
              }
            >
              {props.name}
            </p>
            <p
              className={
                "font-roboto text-xs leading-4 font-light font-medium tracking-[0.5px] text-gray-500"
              }
            >
              {formatTimeAgo(props.date)}
            </p>
          </div>
          {props.isOwner && (
            <CardActions id={props.id} onDelete={props.onDelete} />
          )}
        </div>
        <p
          className={
            "font-roboto text-xs leading-4 font-light font-medium tracking-[0.4px]"
          }
        >
          {props.text}
        </p>
      </article>
    );
  },
  () => true,
);

export default PostCard;
