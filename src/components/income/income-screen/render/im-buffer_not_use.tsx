// import React, { useEffect, useLayoutEffect, useState } from "react";
// import IncomeElement from "../../income-element/element";
// import { FormInstance } from "antd";

// interface IncomeGroupOfDayProps {
//   incomeOfday?: IIncome[];
//   date: Date;
//   IncomeTypesOptions: RadioOptions[];
//   // actionApi: IActionDayIncomesLists;
//   // multipleDraft?: boolean;
//   multipleLoading: boolean;
//   onDraftClickDelete?: (index: number) => void;
// }

// const IncomeGroupOfDay: React.FC<IncomeGroupOfDayProps> = ({
//   incomeOfday = [],
//   date,
//   IncomeTypesOptions,
//   // actionApi,
//   // multipleDraft,
//   multipleLoading,
//   onDraftClickDelete,
// }) => {
//   const [IncomeOfDayTemp, setIncomeOfDayTemp] = useState<IIncome[]>();
//   useEffect(() => {
//     if (incomeOfday) {
//       setIncomeOfDayTemp(incomeOfday);
//     }
//   }, []);

//   return (
//     <div className="flex flex-col-reverse transition-all duration-300 p-4">
//       {IncomeOfDayTemp?.length == 0 && (
//         <div className="h-20 flex justify-center items-center text-gray-300 text-sm">
//           ไม่มีข้อมูล
//         </div>
//       )}
//       {IncomeOfDayTemp?.map((im, jindex) => {
//         return (
//           <div key={`incom-${date.getDate()}-${jindex}`}>
//             {im ? (
//               <IncomeElement
//                 multipleLoading={multipleLoading}
//                 IncomeTypesOptions={IncomeTypesOptions}
//                 itemIndex={jindex}
//                 // actionApi={actionApi}
//                 income={im}
//                 onDraftClickDelete={onDraftClickDelete}
//                 // multipleDraft={multipleDraft}
//               ></IncomeElement>
//             ) : (
//               <>No data</>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default IncomeGroupOfDay;
