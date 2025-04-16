import Title from "#/components/ui/Title.tsx";
import Input from "#/components/ui/Input.tsx";
import Button from "#/components/ui/Button.tsx";
import AuthToggle from "#/pages/auth/components/AuthToggle.tsx";
import useSignIn from "#/pages/auth/hooks/useSignIn.ts";

export function Component() {
  const { handleSubmit, register, errors, isSubmitting } = useSignIn();

  return (
    <div className={"flex flex-col"}>
      <Title
        title={"Login"}
        desc={"Enter your username and password to login to your account."}
      />
      <form className={"mt-6 flex flex-col gap-4"} onSubmit={handleSubmit}>
        <Input
          label={"Username"}
          {...register("username")}
          placeholder={"Please enter username"}
          error={errors.username?.message}
        />
        <Input
          label={"Password"}
          {...register("password")}
          placeholder={"Please enter password"}
          error={errors.password?.message}
          type={"password"}
        />
        <Button className={"mt-2"} type={"submit"} isLoading={isSubmitting}>
          Login
        </Button>
        <AuthToggle isLoginPage />
      </form>
    </div>
  );
}
