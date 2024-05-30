import React from "react";

interface RenderDetailProps {
  open?: boolean;
  action?: () => void
}

const RenderDetail: React.FC<RenderDetailProps> = ({ open, action }) => {
  if (open) {
    return <div onClick={action}>click to delete</div>;
  } else {
    return <></>;
  }
};

export default RenderDetail;
