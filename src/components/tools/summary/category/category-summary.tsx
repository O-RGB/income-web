import { useMaster } from "@/hooks/master-hooks";
import React, { useEffect, useState } from "react";
import "./remove-scrollbar.css";
import CategoryIcons from "./render-icons";

interface CategoryAnalytics {
  typeId: string;
  render?: React.ReactNode;
  price: number;
}

interface CategorySummaryProps extends Pick<IPanelAction, "onClickCategory"> {}

const CategorySummary: React.FC<CategorySummaryProps> = ({
  onClickCategory,
}) => {
  const { Facility } = useMaster();
  const [analytics, setAnalytics] = useState<CategoryAnalytics[]>([]);
  const [onActive, setActive] = useState<number>(-1);

  useEffect(() => {
    let cal: CategoryAnalytics[] = [];
    Facility.analytics?.types.map((data) => {
      if (data.type !== "T00") {
        let render = Facility.iconModel?.getIconById(data.iconId);
        let price = data.plot
          .map((p) => p.expenses)
          .reduce((reslut, price) => reslut + price);

        cal.push({
          typeId: data.type,
          price: price,
          render: render?.render,
        });
      }
    });
    setAnalytics(cal);
  }, [Facility.analytics]);

  return (
    <>
      <div className="flex gap-3 w-full overflow-y-hidden overflow-x-auto h-[72px] hide-scrollbar ">
        {analytics.length === 0 &&
          Array(9)
            .fill(1)
            .map((data, index) => (
              <React.Fragment key={`week-ana-${index}`}>
                <CategoryIcons loading></CategoryIcons>
              </React.Fragment>
            ))}
        {analytics.map((data, index) => {
          return (
            <React.Fragment key={`week-ana-${index}`}>
              <CategoryIcons
                onClick={() => {
                  if (index === onActive) {
                    setActive(-1);
                    onClickCategory?.();
                  } else {
                    setActive(index);
                    onClickCategory?.(data.typeId);
                  }
                }}
                active={onActive === index}
                price={data.price}
                render={data.render}
              ></CategoryIcons>
            </React.Fragment>
          ); //
        })}
      </div>
    </>
  );
};

export default CategorySummary;
