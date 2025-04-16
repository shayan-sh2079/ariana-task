import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "#/services/auth.ts";
import Cookies from "js-cookie";
import { ACCESS_TKN_KEY } from "#/constants/auth.ts";
import { z } from "zod";
import { useCallback } from "react";

const schema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required " }),
});

type Inputs = z.infer<typeof schema>;

export default function useSignIn() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = useCallback(
    async (data: Inputs) => {
      const token = await signIn(data);
      if (token) {
        Cookies.set(ACCESS_TKN_KEY, token, { expires: 1 / 24 });
        navigate("/dashboard");
      }
    },
    [navigate],
  );

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
  };
}
