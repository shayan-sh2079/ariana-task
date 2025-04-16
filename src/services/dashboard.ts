import { ProfileRes } from "#/types/responses";
import baseAxios from "#/services/baseAxios.ts";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const getProfile = async (token: string) => {
  try {
    const res = await baseAxios.get<ProfileRes>("/current_user/", {
      headers: { Authorization: `Token ${token}` },
    });
    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      toast.error(e.response?.data.message || "Something went wrong");
    }
  }
};
