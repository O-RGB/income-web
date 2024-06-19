import React from "react";

interface RenderCommentProps {
  comment: string;
  _priceType?: priceType;
}

const RenderComment: React.FC<RenderCommentProps> = ({
  comment,
  _priceType = "Expenses",
}) => {
  return (
    <>
      {comment && comment.trim().length > 0 && (
        <div
          // className={`flex ${
          //   _priceType == "Expenses" ? "pl-[5px]" : "pr-[5px] justify-end"
          // } `}
        >
          <div
          // className={`${
          //   _priceType === "Expenses" ? "bg-red-400" : "bg-green-500"
          // } text-xs p-1 border text-white  w-fit rounded-md`}
          >
            {comment}
          </div>
        </div>
      )}
    </>
  );
};

export default RenderComment;
