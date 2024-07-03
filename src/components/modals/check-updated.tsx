import { Button, Modal } from "antd";
import React from "react";

interface CheckForUpdateProps {
  isVersionOld: boolean;
  loading: boolean;
  onClickUpdate?: () => void;
}

const CheckForUpdate: React.FC<CheckForUpdateProps> = ({
  isVersionOld,
  loading,
  onClickUpdate,
}) => {
  return (
    <>
      <Modal
        title="ตรวจพบเวอร์ชันใหม่"
        closable={false}
        open={isVersionOld}
        footer={<></>}
      >
        <div className="flex flex-col gap-2 items-center justify-center">
          <img src="/update.png" className="w-20 h-20 " alt="" />
          <Button type="primary" loading={loading} onClick={onClickUpdate}>
            อัปเดต
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default CheckForUpdate;
