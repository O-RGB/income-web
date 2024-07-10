import React from "react";
import { FaPlus } from "react-icons/fa6";

interface FloatingButtonProps {
  onClick?: () => void;
  right?: string;
  icon?: React.ReactNode;
  color?: string;
  hoverColor?: string;
  noti?: string;
  disabled?: boolean;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  onClick,
  right = "2rem",
  icon,
  color = "bg-sky-500",
  hoverColor = "hover:bg-sky-400",
  noti,
  disabled,
}) => {
  const commonStyle =
    "shadow-md  duration-300 rounded-full flex items-center justify-center text-white cursor-pointer";
  return (
    <>
      <div className="fixed z-30 bottom-8" style={{ right }}>
        <div
          onClick={disabled ? () => {} : onClick}
          className={`w-12 h-12 relative ${
            disabled ? "bg-gray-300" : color
          } ${hoverColor} ${commonStyle}`}
        >
          {noti && (
            <div className="absolute -top-1 -right-1 w-5 h-5 font-bold rounded-full bg-red-500 text-white flex items-center justify-center text-xs">
              {noti}
            </div>
          )}
          {icon}
        </div>
      </div>
    </>
  );
};

export default FloatingButton;
