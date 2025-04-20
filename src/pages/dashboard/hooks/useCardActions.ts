import { useRef, useState } from "react";
import useClickOutside from "#/hooks/useClickOutside.tsx";
import { deleteTweet } from "#/services/dashboard.ts";
import { toast } from "react-toastify";

export default function useCardActions(id: number, onDelete: () => void) {
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const ellipsisBtn = useRef<HTMLButtonElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const popperRef = useClickOutside<HTMLButtonElement>((event) => {
    if (!ellipsisBtn.current!.contains(event.target as Node)) {
      setIsActionsOpen(false);
    }
  });

  const handleDelete = async () => {
    setIsLoading(true);
    const isSuccessful = await deleteTweet(id);
    if (isSuccessful) {
      onDelete();
      toast.success("Tweet deleted successfully.");
    }
    setIsLoading(false);
  };

  const handleOpen = () => {
    setIsActionsOpen(true);
  };

  return {
    handleDelete,
    popperRef,
    isLoading,
    ellipsisBtn,
    handleOpen,
    isActionsOpen,
  };
}
