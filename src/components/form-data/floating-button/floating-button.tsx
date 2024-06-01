import React from "react";
import { FaPlus } from "react-icons/fa6";

interface FloatingButtonProps {
  onClick?: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick }) => {
  return (
    <>
      <div className="fixed z-50 bottom-8 right-8">
        <div
          onClick={onClick}
          className="w-12 h-12  bg-sky-500 shadow-md hover:bg-sky-500/80 duration-300 rounded-full flex items-center justify-center text-white cursor-pointer "
        >
          <FaPlus className="text-lg"></FaPlus>
        </div>
      </div>
    </>
  );
};

export default FloatingButton;
