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
  master: IMasterDataImcomes;
  itemIndex: number;
  lockAction: boolean;
  focusMode?: boolean;
  icons?: IconsModelList;
  deleteOnClient?: (index: number) => void;
  deleteOnServer?: (sheetsIndex: number, listIndex: number) => void;
  removeCommnet?: (income: IIncome, index: number) => void;
  onSelectEdit?: (index: number) => void;
  onFocus?: (focus: boolean, income: IIncome) => void;
  onMoving?: boolean;
}

const IncomeElement: React.FC<IncomeListProps> = ({
  income,
  master,
  focusMode = false,
  removeCommnet,
  itemIndex,
  lockAction = false,
  deleteOnClient,
  deleteOnServer,
  onSelectEdit,
  icons,
  onFocus,
  onMoving,
}) => {
  const isDraft = income.draft;
  const loading = income.fetching;
  const isDelete = income.delete;
  const active = onMoving;

  const [deleteAll, setDeleteAll] = useState<boolean>(false);
  const [buttom, setButtom] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("T00");
  const [focus, setFocus] = useState<boolean>(false);

  const [onDetail, setDetail] = useState<boolean>(false);
  const colorTheme: ColorTheme =
    income._priceType === "Expenses"
      ? {
          priceType: "Expenses",
          background: "bg-white/70",
          color: "#ff5c5c",
          text: "text-gray-700",
          className: focus ? "!bg-red-900/20" : "",
        }
      : {
          priceType: "Revenue",
          background: "bg-white/70",
          color: "#3dc940",
          text: "text-gray-700",
          className: focus ? "!bg-red-900/20" : "",
        };

  const onClickIncomeHandel = () => {
    if (focusMode) {
      onFocus?.(!focus, income);
      setFocus(!focus);
      return;
    }

    if (!lockAction) {
      setDetail(!onDetail);
    } else {
      setDetail(false);
    }
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

  useEffect(() => {
    if (loading) {
      setDetail(false);
    }
  }, [loading]);

  useEffect(() => {
    if (focusMode) {
      setDetail(false);
    } else {
      setFocus(false);
    }
  }, [focusMode]);

  if (deleteAll) {
    return <></>;
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
          onMoving={onMoving}
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
            <div className={`${lockAction ? "pointer-events-none" : ""}`}>
              <RenderDetail
                open={onDetail && !lockAction}
                index={itemIndex}
                income={income}
                onClickDelete={deleteOnServer}
              ></RenderDetail>
            </div>
          )}
        </LayoutIncomeItem>
      </div>
    </>
  );
};

export default IncomeElement;
