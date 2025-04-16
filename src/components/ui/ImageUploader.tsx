import { useState } from "react";
import { Icon } from "@iconify/react";

interface Props {
  onChange: (file: File) => void;
}

export default function ImageUploader(props: Props) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    props.onChange(file);
  };

  return (
    <div
      className={
        "flex items-center justify-between rounded-md border border-gray-400 px-3 py-2.5"
      }
    >
      <div
        className={
          "bg-secondary flex h-12 w-12 items-center justify-center overflow-hidden rounded-full"
        }
      >
        {preview ? (
          <img src={preview} alt={"avatar"} />
        ) : (
          <Icon
            icon="mdi:account"
            className={"text-gray-300"}
            width={24}
            height={24}
          />
        )}
      </div>
      <label
        className={
          "text-primary flex cursor-pointer items-center rounded-md border border-gray-400 px-3 py-1.5 font-sans text-sm leading-6 font-medium"
        }
      >
        <p className={"mr-1"}>Upload</p>
        <Icon icon="mdi:plus" width={16} height={16} />
        <input
          type={"file"}
          accept={"image/*"}
          onChange={handleFileChange}
          className={"sr-only"}
        />
      </label>
    </div>
  );
}
