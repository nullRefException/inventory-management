import { LucideIcon } from "lucide-react";
import React from "react";

type StatDetails = {
  title: string;
  amount: string;
  changePercentage: number;
  IconComponent: LucideIcon;
};

type StatCardProp = {
  title: string;
  primaryIcon: JSX.Element;
  details: StatDetails[];
  dateRange: string;
};

const StatCard = ({ title, primaryIcon, details, dateRange }: StatCardProp) => {
  const formatPercent = (value: number) => {
    const signal = value >= 0 ? "+" : "";
    return `${signal}${value.toFixed()}%`;
  };
  const getChangeColor = (value: number) =>
    value >= 0 ? "text-green-500" : "text-red-500";

  return (
    <div className="md:row-span-1 xl:row-span-2 bg-white flex flex-col justify-between col-span-1 rounded-xl shadow-2xl">
      <div>
        <div className=" flex justify-between items-center mb-2 px-5 pt-4">
          <h2 className="font-semibold text-lg text-gray-700">{title}</h2>
          <span className="text-xs text-gray-400">{dateRange}</span>
        </div>
        <hr />
      </div>

      <div className="flex justify-around items-center gap-4 mb-6 px-5">
        <div className="rounded-full p-5 bg-blue-50 border-sky-500 border-[1px]">
          {primaryIcon}
        </div>
        <div className="flex-1">
          {details.map((detail, index) => (
            <React.Fragment key={index}>
              <div className="flex justify-between items-center my-3">
                <span className="text-gray-500">{detail.title}</span>{" "}
                <span className="font-bold text-gray-800">{detail.amount}</span>
                <div className="flex items-center">
                  <detail.IconComponent
                    className={`w-4 h-4 mr-1 ${getChangeColor(
                      detail.changePercentage
                    )}`}
                  />
                  <span
                    className={`font-medium ${getChangeColor(
                      detail.changePercentage
                    )}`}
                  >
                    {formatPercent(detail.changePercentage)}
                  </span>
                </div>
              </div>
              {index < details.length - 1 && <hr />}
            </React.Fragment>
          ))}
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default StatCard;
