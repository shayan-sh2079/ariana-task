import Title from "#/components/ui/Title.tsx";
import Button from "#/components/ui/Button.tsx";
import Input from "#/components/ui/Input.tsx";
import AuthToggle from "#/pages/auth/components/AuthToggle.tsx";
import ImageUploader from "#/components/ui/ImageUploader.tsx";
import { Controller } from "react-hook-form";
import useSignUp from "#/pages/auth/hooks/useSignUp.ts";

export function Component() {
  const {
    isAnyFieldEmpty,
    handleSubmit,
    register,
    control,
    errors,
    isSubmitting,
  } = useSignUp();

  return (
    <div className={"flex flex-col"}>
      <Title
        title={"Sign Up"}
        desc={"Enter your information to create an account."}
      />
      <form className={"mt-6 flex flex-col gap-4"} onSubmit={handleSubmit}>
        <Controller
          name="avatar"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <ImageUploader onChange={(file) => field.onChange(file)} />
          )}
        />
        <Input
          label={"First name"}
          {...register("firstName")}
          placeholder={"Please enter your first name"}
          error={errors.firstName?.message}
        />
        <Input
          label={"Last name"}
          {...register("lastName")}
          placeholder={"Please enter your last name"}
          error={errors.lastName?.message}
        />
        <Input
          label={"Username"}
          {...register("username")}
          placeholder={"Please enter username"}
          error={errors.username?.message}
        />
        <Input
          label={"Password"}
          {...register("pass")}
          placeholder={"Please enter password"}
          error={errors.pass?.message}
          type={"password"}
        />
        <Input
          label={"Confirm Password"}
          {...register("confirmPass")}
          placeholder={"Please re-enter your password"}
          error={errors.confirmPass?.message}
          type={"password"}
        />
        <Button
          className={"mt-2"}
          type={"submit"}
          disabled={isAnyFieldEmpty}
          isLoading={isSubmitting}
        >
          Register
        </Button>
        <AuthToggle />
      </form>
    </div>
  );
}
