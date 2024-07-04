import React, { useEffect, useState } from "react";
import LayoutIncomeItem from "./layout/layout-income";
import { Button } from "antd";
import { IoMdRemove } from "react-icons/io";
import { IconsModelList } from "@/utils/models/icons";
import DraftInput from "./form/draft-input";
import RenderDetail from "./form/render-input/box-detail";
import RenderIncomeCard from "./form/render-input";
import ButtomSheets from "@/components/common/buttomSheets";
import Category from "@/components/pages/category";

interface IncomeListProps {
  income: IIncome;
  dayRender?: boolean;
  master: IMasterDataImcomes;
  itemIndex: number;
  lockAction: boolean;
  icons?: IconsModelList;
  deleteOnClient?: (index: number) => void;
  deleteOnServer?: (sheetsIndex: number, listIndex: number) => void;
  removeCommnet?: (income: IIncome, index: number) => void;
  onSelectEdit?: (index: number) => void;
}

const IncomeElement: React.FC<IncomeListProps> = ({
  income,
  master,
  removeCommnet,
  itemIndex,
  lockAction = false,
  deleteOnClient,
  deleteOnServer,
  onSelectEdit,
  icons,
}) => {
  const isDraft = income.draft;
  const loading = income.fetching || lockAction;
  const isDelete = income.delete;

  const [deleteAll, setDeleteAll] = useState<boolean>(false);
  const [buttom, setButtom] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("T00");

  const [onDetail, setDetail] = useState<boolean>(false);
  const colorTheme: ColorTheme =
    income._priceType === "Expenses"
      ? {
          priceType: "Expenses",
          background: "bg-white/70",
          color: "#ff5c5c",
          text: "text-gray-700",
        }
      : {
          priceType: "Revenue",
          background: "bg-white/70",
          color: "#3dc940",
          text: "text-gray-700",
        };

  const onClickIncomeHandel = () => {
    setDetail(!onDetail);
  };

  const onCategorySelect = (value: IIncomeTypes) => {
    setCategory(value.typeId);
    setButtom(false);
  };

  const debug = (
    <>
      <div className="flex gap-3 divide-y  border font-bold">
        <div className={`${loading ? "text-red-500" : "text-green-500"}`}>
          fetching: {JSON.stringify(loading)}
        </div>
        <div className={`${income.draft ? "text-red-500" : "text-green-500"}`}>
          draft: {JSON.stringify(income.draft)}
        </div>
        <div className={`${income.delete ? "text-red-500" : "text-green-500"}`}>
          delete: {JSON.stringify(income.delete)}
        </div>
        <div>itemIndex: {itemIndex}</div>
        <div className={`${onDetail ? "text-red-500" : "text-green-500"}`}>
          onDetail: {JSON.stringify(onDetail)}
        </div>
        <div
          className={`${
            income.sheetsIndex ? "text-red-500" : "text-green-500"
          }`}
        >
          sheetsIndex: {JSON.stringify(income.sheetsIndex)}
        </div>
      </div>
    </>
  );

  useEffect(() => {
    if (isDelete) {
      setTimeout(() => setDeleteAll(true), 500);
    }
  }, [isDelete]);

  useEffect(() => {
    setCategory(income.types);
  }, [income]);

  if (deleteAll) {
    return <> </>;
  }

  return (
    <>
      <ButtomSheets
        onClose={() => {
          setButtom(false);
        }}
        isOpen={buttom}
      >
        <Category
          onSelectCate={onCategorySelect}
          selectValue={category}
          options={master.typesOfItems}
        ></Category>
      </ButtomSheets>
      <div
        className={`w-full overflow-hidden flex items-center gap-1    ${
          income.delete ? "py-0 pb-0" : isDraft ? "py-1" : "pb-1"
        } duration-300`}
      >
        <LayoutIncomeItem
          colorTheme={colorTheme}
          actionTop={
            isDraft === true && (
              <Button
                size="small"
                onClick={() => {
                  setTimeout(() => {
                    deleteOnClient?.(itemIndex);
                  }, 100);
                }}
                disabled={loading}
                icon={<IoMdRemove className="text-lg"></IoMdRemove>}
                className="!bg-red-500 !text-white scale-75"
              ></Button>
            )
          }
          initIncome={income}
        >
          {isDraft === true ? (
            <DraftInput
              categorySelected={category}
              onOpenCategory={() => setButtom(true)}
              income={income}
              index={itemIndex}
              master={master}
              onRemoveNote={removeCommnet}
            ></DraftInput>
          ) : (
            <RenderIncomeCard
              income={income}
              isDraft={isDraft}
              icons={icons}
              master={master}
              colorTheme={colorTheme}
              loading={loading}
              onClick={onClickIncomeHandel}
            ></RenderIncomeCard>
          )}
          {!isDraft && !loading && (
            <RenderDetail
              open={onDetail}
              index={itemIndex}
              income={income}
              onClickDelete={deleteOnServer}
            ></RenderDetail>
          )}
        </LayoutIncomeItem>
      </div>
    </>
  );
};

export default IncomeElement;
