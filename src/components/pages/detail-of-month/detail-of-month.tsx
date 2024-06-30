import CalendarCommon from "@/components/common/calendar";
import { DateFormat } from "@/libs/date-lib";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdCalendarMonth } from "react-icons/md";

interface DetailOfMonthProps {
  incomes?: IIncome[];
  onDateChange?: (date: Date) => void;
  date: Date;
  master: IMasterDataImcomes;
}

const DetailOfMonth: React.FC<DetailOfMonthProps> = ({
  incomes,
  onDateChange,
  date,
  master,
}) => {
  const [openDate, setOpenDate] = useState<boolean>(false);

  useEffect(() => {}, [date]);
  return (
    <>
      <div className="flex flex-col gap-3 select-none">
        <div className="flex justify-center items-center pt-5 w-full  relative">
          <div className="flex items-center justify-center  w-fit ">
            <div
              onClick={() => {
                let cloneDate = new Date(date);
                cloneDate.setDate(cloneDate.getDate() - 1);
                onDateChange?.(cloneDate);
              }}
              className="p-2 flex items-center justify-center cursor-pointer hover:text-blue-500 duration-300"
            >
              <IoIosArrowBack></IoIosArrowBack>
            </div>
            <div className="text-lg">{DateFormat(date)}</div>
            {new Date().getUTCDate() > date.getUTCDate() && (
              <div
                onClick={() => {
                  let cloneDate = new Date(date);
                  cloneDate.setDate(cloneDate.getDate() + 1);
                  onDateChange?.(cloneDate);
                }}
                className="p-2 flex items-center justify-center cursor-pointer hover:text-blue-500 duration-300"
              >
                <IoIosArrowForward></IoIosArrowForward>
              </div>
            )}
          </div>
          <Button
            size="small"
            icon={<MdCalendarMonth />}
            className="absolute right-0"
            onClick={() => {
              setOpenDate(!openDate);
            }}
            type="text"
          ></Button>
        </div>
        <div
          className={`${
            openDate ? "max-h-[400px]" : "max-h-0 overflow-hidden"
          } transition-all duration-300`}
        >
          <CalendarCommon
            date={date}
            sumLists={master.IGetDisplayCal?.calendar}
            onDateChange={onDateChange}
          ></CalendarCommon>
        </div>
      </div>
    </>
  );
};

export default DetailOfMonth;
