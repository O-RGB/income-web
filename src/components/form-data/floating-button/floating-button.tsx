import React from "react";
import { FaPlus } from "react-icons/fa6";

interface FloatingButtonProps {}

const FloatingButton: React.FC<FloatingButtonProps> = ({}) => {
  return (
    <>
      <div className="fixed z-50 bottom-8 right-8">
        <div className="w-12 h-12  bg-sky-500 shadow-md hover:bg-sky-500/80 duration-300 rounded-full flex items-center justify-center text-white cursor-pointer ">
          <FaPlus className="text-lg"></FaPlus>
        </div>
      </div>
    </>
  );
};

export default FloatingButton;
