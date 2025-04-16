import { Link } from "react-router";
import { memo } from "react";

interface Props {
  isLoginPage?: boolean;
}

export default memo(function AuthToggle(props: Props) {
  return (
    <div className={"flex w-full justify-center gap-1 text-sm"}>
      <p>
        {props.isLoginPage
          ? "Don’t have an account?"
          : "Already have an account?"}
      </p>
      <Link
        to={props.isLoginPage ? "/auth/sign-up" : "/auth/login"}
        className={"underline"}
      >
        {props.isLoginPage ? "Sign up" : "Sign in"}
      </Link>
    </div>
  );
});
