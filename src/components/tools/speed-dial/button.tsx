import React from "react";

interface ButtonSpeedDialProps {
  open: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  label?: string;
  bottom?: string;
  delay?: string;
}

const ButtonSpeedDial: React.FC<ButtonSpeedDialProps> = ({
  open,
  onClick,
  icon,
  label,
  bottom = "bottom-28",
  delay = "delay-200",
}) => {
  const color = "bg-gray-500 group-hover:bg-gray-400";
  return (
    <>
      <div
        className={`absolute ${bottom} flex gap-2 group ${
          open
            ? `opacity-100 translate-y-0 ${delay} pointer-events-auto`
            : "opacity-0 translate-y-8 delay-0 pointer-events-none "
        } transition-all  ease-in-out transform cursor-pointer`}
      >
        {/* <div className="z-0 absolute right-0 w-[30vh] h-full bg-black/70 blur-3xl"></div> */}
        <div className="relative">
          <div
            className={`absolute right-14 p-1 px-2 top-2.5 rounded-md ${color} text-white text-nowrap text-sm duration-300`}
          >
            {label}
          </div>
          <button
            onClick={onClick}
            className={` ${color} text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg duration-300`}
          >
            {icon}
          </button>
        </div>
      </div>
    </>
  );
};

export default ButtonSpeedDial;
