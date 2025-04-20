import SearchIcon from "#/components/icons/SearchIcon.tsx";
import CloseIcon from "#/components/icons/CloseIcon.tsx";
import { useEffect, useRef, useState } from "react";

interface Props {
  onSearch: (searchTxt: string) => void;
}

export default function SearchInput(props: Props) {
  const [text, setText] = useState("");
  const debouncedText = useRef("");

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    if (debouncedText.current !== text)
      timeout = setTimeout(() => {
        debouncedText.current = text;
        props.onSearch(text);
      }, 500);

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [text]);

  return (
    <div className={"relative w-full"}>
      <SearchIcon className={"absolute top-3.5 left-3"} />
      <input
        className={
          "text-foreground w-full rounded-lg border border-gray-400 px-9 py-3 font-sans text-sm leading-5 font-normal outline-none"
        }
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={"Search..."}
      />
      <button
        className={"absolute top-3.5 right-4 cursor-pointer"}
        onClick={() => {
          props.onSearch("");
          setText("");
          debouncedText.current = "";
        }}
      >
        <CloseIcon />
      </button>
    </div>
  );
}
