"use client"
import { Modal } from "antd";
import React from "react";
import GoogleSheetsUrl from "../form/google-sheets-url";
import { setLocal } from "@/libs/local";

interface LoginProps {
  googleKey?: string;
}

const Login: React.FC<LoginProps> = ({ googleKey }) => {
  return (
    <>
      <Modal
        title="ลงชื่อเข้าใช้ระบบ"
        closable={false}
        open={googleKey == ""}
        footer={<></>}
      >
        <GoogleSheetsUrl
          onFinish={(e) => {
            const res = setLocal("google_sheets", e.google_sheets);
            if (res) {
              window.location.reload();
            }
          }}
        ></GoogleSheetsUrl>
      </Modal>
    </>
  );
};

export default Login;
