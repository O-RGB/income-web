"use client";
import { NumberFormat } from "@/libs/number";
import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

interface TagSummaryProps {
  icon?: React.ReactNode;
  title: string;
  price: number;
  color: string;
  iconColor?: string;
  loading?: boolean;
}

const TagSummary: React.FC<TagSummaryProps> = ({
  icon,
  title,
  price,
  color,
  iconColor,
  loading,
}) => {
  return (
    <>
      <div
        className={`p-2 text-sm  border-gray-500 rounded-md font-bold flex gap-2 items-center ${color}`}
      >
        <div
          className={`w-5 h-5 ${iconColor} rounded-full flex items-center justify-center`}
        >
          {loading ? (
            <AiOutlineLoading className="animate-spin font-bold text-white"></AiOutlineLoading>
          ) : (
            icon
          )}
        </div>

        <div className="flex gap-1 ">
          {title}:{" "}
          <div
            className={`${
              loading ? "max-w-0" : "max-w-[500px]"
            } transition-all duration-1000 overflow-hidden`}
          >
            {loading ? (
              <span className="text-nowrap">กำลังโหลด</span>
            ) : (
              NumberFormat(price)
            )}
          </div>{" "}
          ฿
        </div>
      </div>
    </>
  );
};

export default TagSummary;
