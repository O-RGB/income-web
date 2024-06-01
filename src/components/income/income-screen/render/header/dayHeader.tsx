import React from "react";

interface DayHeaderProps {
  date: Date;
  dayIndex: number;
}

const DayHeader: React.FC<DayHeaderProps> = ({ date, dayIndex }) => {
  let renderDayNumber = (str: React.ReactNode) => (
    <div className="py-2 sticky top-0 bg-white">
      <div className="relative">
        <div className="-z-1 absolute w-full top-1/2">
          <hr
            style={{ color: "gray", backgroundColor: "gray", opacity: 0.4 }}
          />
        </div>
        <div className="relative z-10 flex justify-center text-white font-bold w-full">
          <div className="border px-1.5 w-fit rounded-md bg-gray-300 text-xs">
            {str}
          </div>
        </div>
      </div>
    </div>
  );

  let dayNumber = <></>;
  if (dayIndex === date.getDate()) {
    dayNumber = renderDayNumber(
      <div className="text-center">
        <div>วันนี้</div>
        <div>
          {dayIndex}/{date.getMonth()}/{date.getFullYear()}
        </div>
      </div>
    );
    return dayNumber;
  } else if (dayIndex > date.getDate()) {
    return undefined;
  } else {
    dayNumber = renderDayNumber(
      `${dayIndex}/${date.getMonth()}/${date.getFullYear()}`
    );
    return dayNumber;
  }
};

export default DayHeader;
