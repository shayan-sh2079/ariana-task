import { useLoaderData } from "react-router";
import { TweetRes, TweetsRes } from "#/types/responses";
import { useCallback, useEffect, useRef, useState } from "react";
import queryClient from "#/services/queryClient.ts";
import { getTweets } from "#/services/dashboard.ts";
import Cookies from "js-cookie";
import { ACCESS_TKN_KEY } from "#/constants/auth.ts";

export default function useMainPage() {
  const initialData = useLoaderData() as TweetsRes;
  const [tweets, setTweets] = useState<TweetRes[]>(initialData.results);
  const prevSearch = useRef("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const isLoading = useRef(false);
  const hasNextPage = useRef(!!initialData.next);

  const showPostInput = (() => {
    if (prevSearch.current && search) return false;
    if (prevSearch.current && !search) return !isLoading.current;

    if (!prevSearch.current && search) return isLoading.current;
    else return true;
  })();

  const handleScroll = useCallback(() => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight - 10;
    if (bottom && !isLoading.current && hasNextPage.current) {
      isLoading.current = true;
      setPage((prev) => prev + 1);
    }
  }, []);

  const handleSearch = (searchTxt: string) => {
    isLoading.current = true;
    prevSearch.current = search;
    setSearch(searchTxt);
    if (page !== 1) setPage(1);
    else fetchTweets(searchTxt);
  };

  const handleDelete = (id: number) => {
    setTweets((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  };

  const fetchTweets = useCallback(
    async (searchTxt?: string) => {
      isLoading.current = true;
      const tweets = await queryClient.fetchQuery({
        queryKey: ["tweets", searchTxt ?? search, page],
        queryFn: async () => await getTweets(searchTxt ?? search, page),
      });
      isLoading.current = false;
      if (tweets) {
        if (page === 1) {
          setTweets(tweets.results);
        } else
          setTweets((prev) => {
            const newTweets = [...prev];
            tweets.results.forEach((tweet) => {
              if (!newTweets.some((item) => item.id === tweet.id)) {
                newTweets.push(tweet);
              }
            });
            return newTweets;
          });

        hasNextPage.current = !!tweets.next;
      }
    },
    [page, search],
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    fetchTweets();
  }, [page]);

  useEffect(() => {
    const ws = new WebSocket(
      `wss://mock.arianalabs.io/ws/tweet/feed/?token=${Cookies.get(ACCESS_TKN_KEY)}`,
    );

    ws.onopen = () => {
      console.log("WebSocket Connection Opened");
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setTweets((prev) => [message, ...prev]);
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    return () => {
      ws.close();
    };
  }, []);

  return { tweets, handleSearch, handleDelete, search, showPostInput };
}
