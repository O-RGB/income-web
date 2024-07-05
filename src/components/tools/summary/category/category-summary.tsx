import { useMaster } from "@/hooks/master-hooks";
import { NumberFormat } from "@/libs/number";
import React, { ReactNode, useEffect, useState } from "react";
import "./remove-scrollbar.css";
import { IconsModelList } from "@/utils/models/icons";
import CategoryIcons from "./render-icons";

interface CategoryAnalytics {
  typeId: string;
  render?: React.ReactNode;
  price: number;
}

interface CategorySummaryProps {}

const CategorySummary: React.FC<CategorySummaryProps> = ({}) => {
  const { Facility } = useMaster();
  const [analytics, setAnalytics] = useState<CategoryAnalytics[]>([]);

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
