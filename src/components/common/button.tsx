import React from "react";

interface ButtonCommonProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  color?: string;
  textColor?: string;
  padding?: string;
}

const ButtonCommon: React.FC<ButtonCommonProps> = ({
  icon,
  children,
  color = "bg-white/70",
  textColor = "",
  padding = "p-1.5 px-2",
  ...props
}) => {
  return (
    <>
      <div
        {...props}
        className={`${color} ${padding} text-sm w-fit rounded-md flex gap-1.5 items-center cursor-pointer`}
      >
        {icon && <div className="text-xs">{icon}</div>}
        {children && (
          <div className={`text-nowrap ${textColor}`}>{children}</div>
        )}
      </div>
    </>
  );
};

export default ButtonCommon;
