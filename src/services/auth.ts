import baseAxios from "#/services/baseAxios.ts";
import { AxiosError } from "axios";
import { AuthRes } from "#/types/responses";
import { toast } from "react-toastify";

interface SignInReq {
  username: string;
  password: string;
}

export const signUp = async (data: FormData) => {
  try {
    const res = await baseAxios.post<AuthRes>("/register/", data);
    return res.data.token;
  } catch (e) {
    if (e instanceof AxiosError && e.status === 400) {
      return false;
    }
  }
};

export const signIn = async (data: SignInReq) => {
  try {
    const res = await baseAxios.post<AuthRes>("/auth/", data);
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
    await baseAxios.delete("/auth/", {
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
