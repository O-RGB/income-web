"use client";
import loading from "@/components/loading/loading";
import { Button, Form, FormInstance } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaPen, FaPlus } from "react-icons/fa6";
import IncomeElement from "../../income-element/element";
import { DynamicKeysToArray, hanndelInputIncome } from "./im-lib";
import SummaryOfDay from "./summary/summaryOfDay";
import { FaSave } from "react-icons/fa";

import { BiLayerPlus } from "react-icons/bi";
import FloatingButton from "@/components/common/floating-button";
import { IconsModelList } from "@/utils/models/icons";

interface IncomeRenderProps {
  master: IMasterDataImcomes;
  dateSelect: Date;
  incomes: IIncome[];
  loading: ILoading;
  action?: IActionDayIncomesLists;
  headForm: FormInstance<any>;
  icons: IconsModelList;
  draftCount: number;
  fetchNewType?: () => Promise<void>;
}

const IncomeRender: React.FC<IncomeRenderProps> = ({
  master,
  dateSelect,
  incomes,
  loading,
  action,
  headForm,
  draftCount,
  icons,
  fetchNewType,
}) => {
  //not re render
  const [_incomes, setIncomesTemp] = useState<IIncome[]>([]);
  const [_date, setDate] = useState(new Date());
  const [onClickEdit, setClickEdit] = useState<boolean>(false);

  useEffect(() => {
    if (incomes.length > 0 || dateSelect !== _date) {
      setIncomesTemp(incomes);
      setDate(dateSelect);
    }
  }, [incomes]);

  return (
    <>
      <div className="flex flex-col " key={`incom-day-${dateSelect.getDate()}`}>
        {loading.pageLoad ? (
          <div className="h-56 flex justify-center items-center">
            <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div>
              <div className="w-full flex justify-between items-center ">
                {/* {draftCount <= 0 && (
                  <Button
                    onClick={() => {
                      setClickEdit(!onClickEdit);
                    }}
                  >
                    <div className="flex gap-2 justify-center items-center">
                      <FaPen className="text-xs"></FaPen> <div>เลือก</div>
                    </div>
                  </Button>
                )} */}
                <div></div>
                <div className="flex gap-2">
                  {draftCount > 0 && (
                    // <Button
                    //   onClick={() => {
                    //     headForm.submit();
                    //   }}
                    //   className="!bg-blue-500 !text-white flex justify-center items-center"
                    //   icon={<FaSave />}
                    // >
                    //   บันทึก
                    // </Button>
                    <FloatingButton
                      noti={draftCount > 0 ? String(draftCount) : undefined}
                      color="bg-amber-500"
                      hoverColor="hover:bg-amber-500/50"
                      icon={<FaSave className="text-lg"></FaSave>}
                      right="6rem"
                      onClick={() => {
                        headForm.submit();
                      }}
                    ></FloatingButton>
                  )}
                  {!onClickEdit ? (
                    // <Button
                    //   onClick={
                    //     loading.waitActioning == false
                    //       ? action?.setDraft
                    //       : () => {}
                    //   }
                    // >
                    //   + เพิ่มข้อมูลวันที่ {dateSelect.getDate()}
                    // </Button>
                    <FloatingButton
                      icon={
                        draftCount > 0 ? (
                          <BiLayerPlus className="text-xl"></BiLayerPlus>
                        ) : (
                          <FaPlus className="text-lg"></FaPlus>
                        )
                      }
                      onClick={
                        loading.waitActioning == false
                          ? action?.setDraft
                          : () => {}
                      }
                    ></FloatingButton>
                  ) : (
                    <Button
                      onClick={
                        loading.waitActioning == false
                          ? action?.setDraft
                          : () => {}
                      }
                    >
                      ลบทั้งหมด
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {_incomes.length === 0 && (
              <div className="text-xs  flex w-full justify-center items-center h-40">
                <div className="p-3 rounded-md bg-white/50 text-gray-800">
                  ไม่มีข้อมูล
                </div>
              </div>
            )}

            <Form
              form={headForm}
              layout="vertical"
              onFinish={(e) => {
                console.log("real name", e);
                const d = DynamicKeysToArray(e);
                var yt: IIncome[] = [];
                d.map((data) => {
                  const dat = hanndelInputIncome(data, dateSelect);
                  yt.push(dat);
                });

                if (action) {
                  action.setFetchingDraft();
                  action.setAdd?.(yt);
                }
                // onSaveIncomes?.(yt);
              }}
            >
              <div className="flex flex-col-reverse  pb-32 ">
                {_incomes.map((im, jindex) => {
                  return (
                    <div key={`incom-${dateSelect.getDate()}-${jindex}`}>
                      <IncomeElement
                        fetchNewType={fetchNewType}
                        icons={icons}
                        edit={onClickEdit}
                        removeCommnet={(income, index) => {
                          headForm.setFieldValue("comment_" + index, undefined);
                        }}
                        deleteOnClient={action?.setDeleteOnClient}
                        deleteOnServer={action?.setDelete}
                        multipleLoading={
                          loading.waitActioning ? loading.waitActioning : false
                        }
                        master={master}
                        itemIndex={jindex}
                        income={im}
                      ></IncomeElement>
                    </div>
                  );
                })}
              </div>
            </Form>
          </div>
        )}
      </div>
    </>
  );
};

export default IncomeRender;
