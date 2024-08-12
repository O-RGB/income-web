import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaPlus } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { IoMdMove } from "react-icons/io";
import { IoGridSharp } from "react-icons/io5";
import { TbSum } from "react-icons/tb";
import ButtonSpeedDial from "./button";


const SpeedDial: React.FC<SpeedDialProps> = ({
  onClickCalculator,
  onClickMove,
  cancelEvent,
  disabled = false,
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
      if (onAction || open === false) {
        return;
      }

      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
        cancelEvent?.();
      }
    },
    [onAction, cancelEvent, open]
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

  const onSetFucntion = (fucn?: () => void) => {
    if (open) {
      setOpen(false);
      fucn?.();
      setButFocus({
        color: ActionBut.color,
        icons: IconExit(<ImExit className="text-lg" />),
      });
      setOnAction(true);
    }
  };

  return (
    <div
      ref={ref}
      className={`fixed ${
        onAction ? "bottom-8 z-50" : "bottom-[5.5rem] z-30"
      }  right-[2rem] flex flex-col items-center space-y-2 transition-all duration-300`}
    >
      <div className="relative z-30">
        <ButtonSpeedDial
          open={open}
          icon={<IoMdMove className="text-lg" />}
          label="สลับตำแหน่ง"
          onClick={() => {
            onSetFucntion(onClickMove);
          }}
        ></ButtonSpeedDial>
        <ButtonSpeedDial
          bottom="bottom-14"
          delay="delay-100"
          open={open}
          icon={<TbSum className="text-lg" />}
          label="รวมราคา"
          onClick={() => {
            onSetFucntion(onClickCalculator);
          }}
        ></ButtonSpeedDial>

        <button
          type="button"
          disabled={disabled}
          onClick={() => {
            if (disabled) {
              return;
            }
            if (onAction) {
              setButFocus(ActionBut);
              cancelEvent?.();
              setOpen(false);
              setOnAction(false);
            } else {
              setOpen(!open);
            }
          }}
          className={`${
            disabled ? "bg-gray-300" : butFocus.color
          } text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg transform transition-transform duration-300`}
        >
          {butFocus.icons}
        </button>
      </div>
    </div>
  );
};

export default SpeedDial;
