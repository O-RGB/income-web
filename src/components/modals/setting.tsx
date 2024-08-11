import { Modal } from "antd";
import React from "react";
import WallpaperForm from "../form/wallpaper/wallpaper-form";
import GoogleSheetsUrl from "../form/google-sheets-url";
import CacheLocal from "../form/cache";

interface SettingModalProps {
  open?: boolean;
  close?: () => void;
  onChangeWallpaper?: (url?: string) => void;
  onChangeGoogleSheetKey?: (url: any) => void;
}

const SettingModal: React.FC<SettingModalProps> = ({
  open,
  close,
  onChangeWallpaper,
  onChangeGoogleSheetKey,
}) => {
  return (
    <Modal
      footer={<></>}
      destroyOnClose
      open={open}
      onCancel={close}
      onClose={close}
      onOk={close}
      title="ตั้งค่า"
    >
      <WallpaperForm onChangeWallpaper={onChangeWallpaper}></WallpaperForm>
      <GoogleSheetsUrl
        first={false}
        onFinish={onChangeGoogleSheetKey}
      ></GoogleSheetsUrl>
      <CacheLocal></CacheLocal>
    </Modal>
  );
};

export default SettingModal;
