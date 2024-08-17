import { getLocalByKey, setLocal } from "@/libs/local";
import { Form, Button } from "antd";
import React, { useEffect, useState } from "react";
import InputCommon from "../common/input";

interface GoogleSheetsUrlProps {
  onFinish?: ((values: any) => void) | undefined;
  first?: boolean;
}

const GoogleSheetsUrl: React.FC<GoogleSheetsUrlProps> = ({
  onFinish,
  first = true,
}) => {
  const [form] = Form.useForm();
  const [oninput, setInput] = useState<boolean>(false);

  const initSetting = async () => {
    const data = await getLocalByKey("google_sheets");
    if (data) {
      form.setFieldValue("google_sheets", data);
    }
  };

  useEffect(() => {
    initSetting();
  }, []);
  return (
    <>
      <Form
        onFieldsChange={() => {
          setInput(true);
        }}
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <div className="flex gap-2">
          <Form.Item
            className="w-full"
            required
            rules={[{ required: true, message: "บังคับกรอก" }]}
            name={"google_sheets"}
            label={
              <div className="pb-1">
                Google Sheets Key {first && <>{"(ครั้งแรกเท่านั้น)"}</>}
              </div>
            }
          >
            <InputCommon size="middle"></InputCommon>
          </Form.Item>
          {!first && (
            <div className="pt-[26px]">
              <Button disabled={!oninput} type="primary" htmlType="submit">
                บันทึก
              </Button>
            </div>
          )}
        </div>
        {first && (
          <div className="flex justify-end">
            <Button disabled={!oninput} type="primary" htmlType="submit">
              บันทึก
            </Button>
          </div>
        )}
      </Form>
    </>
  );
};

export default GoogleSheetsUrl;
