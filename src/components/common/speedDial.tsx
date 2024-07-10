import React, { useState, useEffect, useRef, useCallback } from "react";
import { BiExit } from "react-icons/bi";
import { FaPlus, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { IoGridSharp } from "react-icons/io5";
import { TbCalculatorFilled } from "react-icons/tb";

interface IconSpeed {
  icons: React.ReactNode;
  color: string;
}

interface SpeedDialProps {
  onClickCalculator?: () => void;
  cancelEvent?: () => void;
}

const SpeedDial: React.FC<SpeedDialProps> = ({
  onClickCalculator,
  cancelEvent,
}) => {
  const [open, setOpen] = useState(false);
  const [onAction, setOnAction] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const IconExit = (icon: React.ReactNode) => (
    <div className="relative">
      <div className="absolute -top-3.5 -right-3.5 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
        <FaPlus className="rotate-45 text-xs"></FaPlus>
      </div>
      {icon}
    </div>
  );

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (onAction) {
        return;
      }

      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
        cancelEvent?.();
      }
    },
    [onAction, cancelEvent]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const ActionBut: IconSpeed = {
    color: "bg-orange-500 hover:bg-orange-400",
    icons: (
      <IoGridSharp
        className={`${
          open ? "rotate-45" : "rotate-0"
        } transition-all duration-300 `}
      />
    ),
  };

  const [butFocus, setButFocus] = useState<IconSpeed>(ActionBut);

  return (
    <div
      ref={ref}
      className="fixed z-30 bottom-[5.5rem] right-[2rem] flex flex-col items-center space-y-2"
    >
      <div className="relative">
        <button
          onClick={() => {
            if (open) {
              setOpen(false);
              onClickCalculator?.();
              setButFocus({
                color: ActionBut.color,
                icons: IconExit(<ImExit className="text-lg" />),
              });
              setOnAction(true);
            }
          }}
          className={`absolute bottom-14 bg-gray-500 hover:bg-gray-400 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 ease-in-out transform cursor-pointer ${
            open
              ? "opacity-100 translate-y-0 delay-100 pointer-events-auto"
              : "opacity-0 translate-y-8 delay-0 pointer-events-none "
          }`}
        >
          <TbCalculatorFilled className="text-lg" />
        </button>

        <button
          onClick={() => {
            if (onAction) {
              console.log(onAction, "onbut");
              setButFocus(ActionBut);
              cancelEvent?.();
              setOpen(false);
              setOnAction(false);
            } else {
              setOpen(!open);
            }
          }}
          className={`${butFocus.color} text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg transform transition-transform duration-300`}
        >
          {butFocus.icons}
        </button>
      </div>
    </div>
  );
};

export default SpeedDial;
