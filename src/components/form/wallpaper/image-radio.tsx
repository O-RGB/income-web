import React, { useEffect } from "react";
import IRadio from "./i-radio";

interface ImageRadioProps {
  url: string[];
  value?: string;
  onChange?: (value?: string) => void;
}

const ImageRadio: React.FC<ImageRadioProps> = ({ url, value, onChange }) => {
  useEffect(() => {}, [value]);

  return (
    <div className="grid grid-cols-4 gap-3">
      {url.map((data, key) => {
        return (
          <React.Fragment key={`i-radio-image-${key}`}>
            <IRadio
              url={data}
              onSelect={onChange}
              select={value === data}
            ></IRadio>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ImageRadio;
