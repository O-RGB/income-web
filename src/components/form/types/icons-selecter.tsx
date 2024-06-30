import { IconsModel, IconsModelList } from "@/utils/models/icons";
import React, { useEffect } from "react";

interface IconsSelecterProps {
  value?: string;
  onChange?: (value: string) => void;
  onSelectIcon?: (value: IconsModel) => void;
  disabled?: boolean;
}

const IconsSelecter: React.FC<IconsSelecterProps> = ({
  value,
  onChange,
  onSelectIcon,
  disabled,
}) => {
  const icons = new IconsModelList();
  const render = icons.getAllIcons();
  useEffect(() => {
    if (value) {
      let render = icons.getIconById(value);
      if (render) {
        onSelectIcon?.(render);
      }
    }
  }, [value]);
  return (
    <>
      <div className="grid grid-cols-8 gap-1">
        {render.map((data, index) => {
          return (
            <React.Fragment key={`icon-selecter-${index}`}>
              <div
                onClick={() => {
                  if (!disabled) {
                    onChange?.(data.name);
                    onSelectIcon?.(data);
                  }
                }}
                className={`${
                  String(value) === data.name ? "border border-blue-500" : ""
                } w-9 h-9 shadow-md p-1 rounded-md flex items-center justify-center`}
              >
                {data.render}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export default IconsSelecter;
