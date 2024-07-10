import { CalculatorContext } from "@/contexts/calculator.context";
import { useContext } from "react";

export const useCalculator = () => useContext(CalculatorContext);
