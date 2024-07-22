import { IncomesContext } from "@/contexts/incomes.context";
import { useContext } from "react";

export const useIncomes = () => useContext(IncomesContext);
