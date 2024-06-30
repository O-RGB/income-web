import React from "react";

interface ButtonCommonProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  icon?: React.ReactNode;
}

const ButtonCommon: React.FC<ButtonCommonProps> = ({
  icon,
  children,
  ...props
}) => {
  return (
    <>
      <div
        {...props}
        className="bg-white/70 p-1.5 px-2 text-sm w-fit rounded-md  flex gap-1.5 items-center"
      >
        {icon && <div className="text-xs">{icon}</div>}
        <div className="text-nowrap ">{children}</div>
      </div>
    </>
  );
};

export default ButtonCommon;
