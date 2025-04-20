import PostCard from "#/pages/dashboard/components/PostCard.tsx";
import SearchInput from "#/components/ui/SearchInput.tsx";
import PostInput from "#/pages/dashboard/components/PostInput.tsx";
import queryClient from "#/services/queryClient.ts";
import { getTweets } from "#/services/dashboard.ts";
import NoResults from "#/pages/dashboard/components/NoResults.tsx";
import useMainPage from "#/pages/dashboard/hooks/useMainPage.ts";

export function Component() {
  const { tweets, handleSearch, handleDelete, search, showPostInput } =
    useMainPage();

  return (
    <div
      className={
        "mx-auto flex w-168 grow flex-col items-center gap-5.5 px-1 py-6"
      }
    >
      <SearchInput onSearch={handleSearch} />
      {showPostInput && <PostInput />}
      {tweets.length === 0 ? (
        <NoResults search={search} />
      ) : (
        <div className={"flex w-full flex-col gap-3"}>
          {tweets.map((tweet) => (
            <PostCard
              key={tweet.id}
              name={tweet.author.first_name + " " + tweet.author.last_name}
              img={tweet.author.avatar}
              date={tweet.created_at}
              text={tweet.text}
              isOwner={tweet.has_edit_permission}
              id={tweet.id}
              onDelete={() => handleDelete(tweet.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export const loader = async () => {
  const tweets = await queryClient.fetchQuery({
    queryKey: ["tweets", "", 1],
    queryFn: async () => await getTweets(),
  });

  return tweets;
};
