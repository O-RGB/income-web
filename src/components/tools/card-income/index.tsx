import React, { useEffect, useState } from "react";
import LayoutIncomeItem from "./layout/layout-income";
import { Button } from "antd";
import { IconsModelList } from "@/utils/models/icons";
import DraftInput from "./form/draft-input";
import RenderDetail from "./form/render-input/box-detail";
import RenderIncomeCard from "./form/render-input";
import ButtomSheets from "@/components/common/buttomSheets";
import Category from "@/components/pages/category";
import { BiExit } from "react-icons/bi";
import { FaSave } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";

interface IncomeListProps extends ICardIncomes, ICardIncomesConfigs {
  income: IIncome;
  itemIndex: number;
  lockAction: boolean;
  master: IMasterDataImcomes;
  icons?: IconsModelList;
}

const IncomeElement: React.FC<IncomeListProps> = ({
  onCommentChange,
  onFocusChange,
  closeExpanded,
  onExitEdit,
  onSaveEdit,
  onSelectEdit,
  onClickDelete,
  onClickEdit,
  income,
  master,
  itemIndex,
  icons,
  moving,
  expanded,
  focus: fucus = false,
  lockAction = false,
  disabled = false,
}) => {
  const isDraft = income.draft || income.edit;
  const loading = income.fetching;
  const isDelete = income.delete;
  const active = moving;
  const isDisabled = disabled;
  const edit = income.edit;

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
    if (fucus) {
      onFocusChange?.(income, !focus);
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
        <div className={`${income.edit ? "text-red-500" : "text-green-500"}`}>
          edit: {JSON.stringify(income.edit)}
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
    if (fucus) {
      setDetail(false);
    } else {
      setFocus(false);
    }
  }, [fucus]);

  useEffect(() => {
    setDetail(false);
  }, [expanded]);

  if (deleteAll) {
    return <></>;
  }

  return (
    <>
      {/* {debug} */}

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
        className={`w-full overflow-hidden flex items-center gap-1 ${
          income.delete ? "py-0 pb-0" : isDraft ? "py-1" : "pb-1"
        } duration-300`}
      >
        <LayoutIncomeItem
          isDisabled={isDisabled}
          onMoving={moving}
          colorTheme={colorTheme}
          actionTop={
            isDraft === true && edit == false ? (
              <div className="flex gap-1">
                <Button
                  size="small"
                  onClick={() => {
                    setTimeout(() => {
                      onClickDelete?.(
                        {
                          listIndex: itemIndex,
                          sheetsIndex: 0,
                        },
                        "CLIENT"
                      );
                    }, 100);
                  }}
                  disabled={loading}
                  icon={
                    <RiDeleteBin2Line className="text-lg"></RiDeleteBin2Line>
                  }
                  className={`!bg-red-500 !text-white `}
                ></Button>
              </div>
            ) : edit ? (
              <>
                <Button
                  size="small"
                  onClick={() => {
                    onSaveEdit?.({
                      listIndex: itemIndex,
                      sheetsIndex: income.sheetsIndex,
                    });
                  }}
                  icon={<FaSave className="text-"></FaSave>}
                  className={`!bg-green-500 !text-white  flex items-center `}
                >
                  <div className="text-xs">แก้ไข</div>
                </Button>
                <Button
                  size="small"
                  onClick={() => {
                    onExitEdit?.({ listIndex: itemIndex });
                    let index: IClientIndex = {
                      sheetsIndex: 0,
                      listIndex: -1,
                    };
                    let obj: IClientSelectEdit = { income };
                    closeExpanded();
                    onSelectEdit?.(index, obj);
                  }}
                  icon={<BiExit className="text-lg"></BiExit>}
                  className={`!bg-orange-500 !text-white  flex items-center `}
                >
                  <div className="text-xs">ปิด</div>
                </Button>
              </>
            ) : (
              <></>
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
              onRemoveNote={onCommentChange}
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
                onClickDelete={onClickDelete}
                onClickEdit={(index) => {
                  closeExpanded();
                  onClickEdit?.(index, income);
                }}
              ></RenderDetail>
            </div>
          )}
        </LayoutIncomeItem>
      </div>
    </>
  );
};

export default IncomeElement;
