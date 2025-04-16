import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "#/services/auth.ts";
import Cookies from "js-cookie";
import { ACCESS_TKN_KEY } from "#/constants/auth.ts";
import { requiredField } from "#/utils/validations.ts";
import { z } from "zod";

const schema = z
  .object({
    firstName: requiredField,
    lastName: requiredField,
    username: requiredField,
    pass: requiredField,
    confirmPass: requiredField,
    avatar: z
      .custom<File>()
      .refine((file) => !!file, { message: "Field is required" }),
  })
  .refine((data) => data.pass === data.confirmPass, {
    message: "Passwords don't match",
    path: ["confirmPass"],
  });

type Inputs = z.infer<typeof schema>;

export default function useSignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Inputs) => {
    const formData = new FormData();
    formData.append("first_name", data.firstName);
    formData.append("last_name", data.lastName);
    formData.append("username", data.username);
    formData.append("password", data.pass);
    formData.append("confirm_password", data.confirmPass);
    formData.append("avatar", data.avatar);

    const token = await signUp(formData);
    if (token) {
      Cookies.set(ACCESS_TKN_KEY, token, { expires: 1 / 24 });
      navigate("/dashboard");
    } else {
      setError("username", { message: "This username is already taken." });
    }
  };

  const allValues = Object.values(watch());

  const isAnyFieldEmpty =
    allValues.length === 0 ||
    allValues.some((value) => {
      return !value;
    });

  return {
    isAnyFieldEmpty,
    handleSubmit: handleSubmit(onSubmit),
    register,
    control,
    errors,
    isSubmitting,
  };
}
