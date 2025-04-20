import { AxiosError } from "axios";
import { toast } from "react-toastify";
import withTokenAxios from "#/services/withTokenAxios.tsx";
import { COUNT_PER_PAGE } from "#/constants/general.ts";
import { TweetRes, TweetsRes } from "#/types/responses";

interface TweetReq {
  text: string;
}

const dashboardBase = "/tweet";

export const getTweets = async (search: string = "", page: number = 1) => {
  try {
    const res = await withTokenAxios.get<TweetsRes>(dashboardBase + "/", {
      params: { search, page, count_per_page: COUNT_PER_PAGE },
    });
    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      toast.error(e.message || "Something went wrong");
    }
  }
};

export const postTweet = async (data: TweetReq) => {
  try {
    await withTokenAxios.post<TweetRes>(dashboardBase + "/", data);
    return true;
  } catch (e) {
    if (e instanceof AxiosError) {
      toast.error(e.message || "Something went wrong");
    }
    return false;
  }
};

export const deleteTweet = async (id: number) => {
  try {
    await withTokenAxios.delete<TweetRes>(dashboardBase + `/${id}/`);
    return true;
  } catch (e) {
    if (e instanceof AxiosError) {
      toast.error(e.message || "Something went wrong");
    }
    return false;
  }
};
