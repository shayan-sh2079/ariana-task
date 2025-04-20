import Button from "#/components/ui/Button.tsx";
import queryClient from "#/services/queryClient.ts";
import { ProfileRes } from "#/types/responses";
import { postTweet } from "#/services/dashboard.ts";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { memo } from "react";

const schema = z.object({
  text: z.string().min(1, { message: "Text is required" }),
});

type Inputs = z.infer<typeof schema>;

const PostInput = memo(
  function PostInput() {
    const profile: ProfileRes | undefined = queryClient.getQueryData([
      "profile",
    ]);

    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset,
    } = useForm({
      resolver: zodResolver(schema),
      defaultValues: {
        text: "",
      },
    });

    const onSubmit = async (data: Inputs) => {
      const isSuccessful = await postTweet({ text: data.text });
      if (isSuccessful) {
        toast.success("Tweet posted successfully.");
        reset();
      }
    };

    return (
      <div className={"flex w-full flex-col gap-1"}>
        <form
          className={
            "relative flex min-h-30 w-full gap-3.5 rounded-lg border border-gray-400 p-4"
          }
          onSubmit={handleSubmit(onSubmit)}
        >
          <img
            className={"h-10 w-10 overflow-hidden rounded-full"}
            width={40}
            height={40}
            src={profile?.avatar}
            alt={"avatar"}
          />
          <textarea
            className={
              "font-roboto grow resize-none text-sm leading-5 font-semibold tracking-[0.1px] outline-none placeholder:text-gray-600"
            }
            {...register("text")}
            placeholder={"What ‘s Happening ?"}
          />
          <Button
            className={"absolute right-4 bottom-4 w-20"}
            isLoading={isSubmitting}
            type={"submit"}
          >
            Post
          </Button>
        </form>
        {errors.text?.message && (
          <p
            className={
              "text-destructive mt-1 font-sans text-sm leading-5 font-medium"
            }
          >
            {errors.text.message}
          </p>
        )}
      </div>
    );
  },
  () => true,
);

export default PostInput;
