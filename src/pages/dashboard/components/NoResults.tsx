import noResultsImg from "#/assets/no-results.png";

interface Props {
  search: string;
}

export default function NoResults(props: Props) {
  return (
    <div className={"flex grow flex-col items-center justify-center gap-10"}>
      <img src={noResultsImg} alt={"no results"} />
      <p className={"font-geist text-base leading-6 font-thin"}>
        {props.search ? (
          <>
            No results found for{" "}
            <span className={"font-bold"}>“{props.search}”</span>. Try checking
            your spelling or using different keywords.
          </>
        ) : (
          "No results found."
        )}
      </p>
    </div>
  );
}
