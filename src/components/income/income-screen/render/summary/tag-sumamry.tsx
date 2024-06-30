"use client";
import { NumberFormat } from "@/libs/number";
import React from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { BiBath } from "react-icons/bi";
import { FaBahtSign } from "react-icons/fa6";

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
        className={`p-1.5 text-sm w-full   rounded-md  flex gap-2 items-center ${color}`}
      >
        {/* <div
          className={`w-5 h-5 ${iconColor} rounded-full flex items-center justify-center`}
        > */}

        {loading ? (
          <AiOutlineLoading
            className={`animate-spin  ${iconColor}`}
          ></AiOutlineLoading>
        ) : (
          icon
        )}

        {/* </div> */}

        <div className="flex gap-1 justify-center items-center">
          <div>{title}</div>:{" "}
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
        </div>
      </div>
    </>
  );
};

export default TagSummary;
