"use client";
import loading from "@/components/loading/loading";
import { Button, Form, FormInstance } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
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

  useEffect(() => {
    if (incomes.length > 0) {
      setIncomesTemp(incomes);
    }
  }, [incomes]);

  useEffect(() => {
    console.log("im-render on date change");
    if (loading.dateChange) {
      setIncomesTemp([]);
    }
  }, [loading.dateChange]);

  return (
    <>
      <div className="flex flex-col" key={`incom-day-${dateSelect.getDate()}`}>
        <SummaryOfDay
          date={dateSelect}
          dayIndex={dateSelect.getDate()}
          incomeOfday={_incomes}
        ></SummaryOfDay>

        {loading.pageLoad ? (
          <div className="h-56 flex justify-center items-center">
            <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
          </div>
        ) : (
          <div className="">
            <div>
              <div className="w-full flex justify-between items-center p-2">
                <Button></Button>
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
                  <Button
                    onClick={
                      loading.waitActioning == false
                        ? action?.setDraft
                        : () => {}
                    }
                  >
                    + เพิ่มข้อมูลวันที่ {dateSelect.getDate()}
                  </Button>
                </div>
              </div>
            </div>

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
              <div className="flex flex-col-reverse px-2 ">
                {_incomes.map((im, jindex) => {
                  return (
                    <div key={`incom-${dateSelect.getDate()}-${jindex}`}>
                      {/* sheetsIndex:{JSON.stringify(im.sheetsIndex)} */}
                      <IncomeElement
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
