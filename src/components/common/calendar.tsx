import { Calendar, ConfigProvider, theme } from "antd";
import React from "react";

import locale from "antd/locale/th_TH";
import dayjs from "dayjs";

import "dayjs/locale/th";
import moment from "moment";
import { CalendarType } from "antd/es/calendar";

dayjs.locale("th");

interface CalendarCommonProps {
  onDateChange?: (date: Date) => void;
  datelist?: Date[];
}

const CalendarCommon: React.FC<CalendarCommonProps> = ({
  onDateChange,
  datelist = [new Date("May 19, 2024")],
}) => {
  const { token } = theme.useToken();

  const wrapperStyle: React.CSSProperties = {
    width: "100%",
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  const calPriceByDate = () => {

  }

  const disabledDate = (current: any) => {
    const today = new Date(); // Get today's date

    // datelist = [new Date("May 19, 2024")];

    // // Function to check if a date is in the datelist
    // const isDateInList = (date: Date) =>
    //   datelist
    //     ? datelist.some((d) => d.toDateString() === date.toDateString())
    //     : false;

    // Disable future dates except those in datelist
    // return (
    //   current && (current.toDate() > today || !isDateInList(current.toDate()))
    // );
    return current && current.toDate() > today;
  };

  return (
    <>
      <ConfigProvider locale={locale}>
        <div style={wrapperStyle}>
          <Calendar
            // cellRender={(date) => {
            //   const time = disabledDate(date);
            //   if (!time) {
            //     return (
            //       <div className="px-2 rounded-md text-xs border bg-green-400 text-white">
            //         234
            //       </div>
            //     );
            //   }
            // }}
            disabledDate={disabledDate}
            fullscreen={false}
            onChange={(date) => {
              onDateChange?.(date.toDate());
            }}
          />
        </div>
      </ConfigProvider>
    </>
  );
};

export default CalendarCommon;
