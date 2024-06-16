"use client";
import loading from "@/components/loading/loading";
import { Button, Form, FormInstance } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaPen, FaPlus } from "react-icons/fa6";
import IncomeElement from "../../income-element/element";
import { DynamicKeysToArray, hanndelInputIncome } from "./im-lib";
import SummaryOfDay from "./summary/summaryOfDay";

interface IncomeRenderProps {
  master: IMasterDataImcomes;
  dateSelect: Date;
  incomes: IIncome[];
  loading: ILoading;
  action?: IActionDayIncomesLists;
  headForm: FormInstance<any>;
  draftCount: number;
}

const IncomeRender: React.FC<IncomeRenderProps> = ({
  master,
  dateSelect,
  incomes,
  loading,
  action,
  headForm,
  draftCount,
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
                    <Button
                      onClick={() => {
                        headForm.submit();
                      }}
                      className="!bg-blue-500 !text-white flex justify-center items-center"
                      icon={<FaPlus />}
                    >
                      บันทึก
                    </Button>
                  )}
                  {!onClickEdit ? (
                    <Button
                      onClick={
                        loading.waitActioning == false
                          ? action?.setDraft
                          : () => {}
                      }
                    >
                      + เพิ่มข้อมูลวันที่ {dateSelect.getDate()}
                    </Button>
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
              <div className="text-xs text-gray-300 flex w-full justify-center items-center h-40">
                ไม่มีข้อมูล
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
                  const dat = hanndelInputIncome(
                    data,
                    master.typesOfItems,
                    dateSelect
                  );
                  yt.push(dat);
                });

                if (action) {
                  action.setFetchingDraft();
                  action.setAdd?.(yt);
                }
                // onSaveIncomes?.(yt);
              }}
            >
              <div className="flex flex-col-reverse  ">
                {_incomes.map((im, jindex) => {
                  return (
                    <div key={`incom-${dateSelect.getDate()}-${jindex}`}>
                      <IncomeElement
                        edit={onClickEdit}
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
