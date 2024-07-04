import { Button, Form } from "antd";
import React from "react";
import ImageRadio from "./image-radio";
import { RxValueNone } from "react-icons/rx";

const image = [
  "",
//   "/wallpaper/test3.jpg",
//   "/wallpaper/test4.jpg",
  "/wallpaper/test5.jpg",
  "/wallpaper/test6.jpg",
  "/wallpaper/test7.jpg",
  "/wallpaper/test8.jpg",
//   "/wallpaper/test9.jpg",
  "/wallpaper/test10.jpg",
//   "/wallpaper/test11.jpg",
//   "/wallpaper/test12.jpg",
  "/wallpaper/test13.jpg",
  "/wallpaper/test14.jpg",
  "/wallpaper/test15.jpg",
];

interface WallpaperFormProps {
  onChangeWallpaper?: (value?: string) => void;
}

const WallpaperForm: React.FC<WallpaperFormProps> = ({ onChangeWallpaper }) => {
  return (
    <>
      <Form
        onFieldsChange={(e: any) => {
          onChangeWallpaper?.(e[0].value);
        }}
      >
        <div className="relative">
          <Form.Item name={"wallpaper"} label={"เปลี่ยนพื้นหลัง"}>
            <ImageRadio url={image}></ImageRadio>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default WallpaperForm;
