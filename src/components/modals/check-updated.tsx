"use client"
import { Config } from "@/utils/models/config";
import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";

interface CheckForUpdateProps {
  isVersionOld: boolean;
  loading: boolean;
  onClickUpdate?: () => void;
  verionsConfig?: Config[];
}

const CheckForUpdate: React.FC<CheckForUpdateProps> = ({
  isVersionOld,
  loading,
  onClickUpdate,
  verionsConfig,
}) => {
  const [version, setVersion] = useState<string>();
  useEffect(() => {
    const res = verionsConfig?.find((value) => value.name === "version");
    if (res) {
      setVersion(res.value);
    }
  }, [verionsConfig]);
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
          ตรวจพบเวอร์ชันใหม่ {version}
          <Button type="primary" loading={loading} onClick={onClickUpdate}>
            อัปเดต
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default CheckForUpdate;
