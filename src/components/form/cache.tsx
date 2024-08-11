import { deleteAllStores } from "@/database/db";
import { Button, Form } from "antd";
import React from "react";

interface CacheLocalProps {}

const CacheLocal: React.FC<CacheLocalProps> = ({}) => {
  return (
    <div className="flex flex-col gap-1">
      <label>Cache</label>
      <div>
        <Button
          onClick={async () => {
            await deleteAllStores();
            window.location.reload();
          }}
        >
          ล้าง Cache
        </Button>
      </div>
    </div>
  );
};

export default CacheLocal;
