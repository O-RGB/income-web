export const GenOption = (
  labelKey: string | number,
  valueKey: string | number,
  lists: any
): RadioOptions[] => {
  return lists.map((data: any, index: number): RadioOptions => {
    return {
      label: data[labelKey],
      value: data[valueKey],
    };
  });
};
