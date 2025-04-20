import baseAxios from "#/services/baseAxios.ts";
import { AxiosError } from "axios";
import { AuthRes, ProfileRes } from "#/types/responses";
import { toast } from "react-toastify";

interface SignInReq {
  username: string;
  password: string;
}

const authBase = "/staff";

export const signUp = async (data: FormData) => {
  try {
    const res = await baseAxios.post<AuthRes>(authBase + "/register/", data);
    return res.data.token;
  } catch (e) {
    if (e instanceof AxiosError && e.status === 400) {
      return false;
    }
  }
};

export const signIn = async (data: SignInReq) => {
  try {
    const res = await baseAxios.post<AuthRes>(authBase + "/auth/", data);
    return res.data.token;
  } catch (e) {
    if (e instanceof AxiosError) {
      toast.error(
        e.response?.data.non_field_errors[0] || "Something went wrong",
      );
    }
  }
};

export const signOut = async (token: string) => {
  try {
    await baseAxios.delete(authBase + "/auth/", {
      headers: { Authorization: `Token ${token}` },
    });
    return true;
  } catch (e) {
    if (e instanceof AxiosError) {
      toast.error(e.response?.data.message || "Something went wrong");
    }
    return false;
  }
};

export const getProfile = async (token: string) => {
  try {
    const res = await baseAxios.get<ProfileRes>(authBase + "/current_user/", {
      headers: { Authorization: `Token ${token}` },
    });
    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      toast.error(e.response?.data.message || "Something went wrong");
    }
  }
};
