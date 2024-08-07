export const getStoreNameByDate = (dateSelected: Date) => {
  const month = dateSelected.getMonth();
  const year = dateSelected.getFullYear();
  return `${month}-${year}`;
};


