import React from "react";

interface IRadioProps {
  url?: string;
  select: boolean;
  onSelect?: (value?: string) => void;
}

const IRadio: React.FC<IRadioProps> = ({ url, select, onSelect }) => {
  return (
    <>
      <div
        onClick={() => {
          onSelect?.(url ?? undefined);
        }}
        className={`border p-2 cursor-pointer rounded-md ${
          select ? "border-blue-500" : ""
        }`}
      >
        {url !== "" && (
          <img src={url} className=" w-full h-28 object-cover" alt="" />
        )}
      </div>
    </>
  );
};

export default IRadio;
