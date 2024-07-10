import { useState } from "react";

interface ButtonCommonProps {}

const Calculator: React.FC<ButtonCommonProps> = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("0");

  const handleClick = (value: string) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
    setResult("0");
  };

  const handleCalculate = () => {
    try {
      const calculation = eval(input);
      setResult(calculation);
    } catch (error) {
      setResult("Error");
    }
  };

  const handleDelete = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const CalculatorButtonClass =
    "bg-blue-100 hover:bg-blue-700 border-black text-black p-2 rounded-lg flex items-center justify-center text-xl";

  const OperatorButtonClass =
    "bg-orange-500 hover:bg-orange-700 text-white p-2 rounded-lg flex items-center justify-center";

  const FunctionButtonClass =
    "bg-gray-300 hover:bg-gray-500 text-black p-2 rounded-lg flex items-center justify-center";

  function CalculatorButton({
    label,
    operator,
    onClick,
    className,
  }: {
    label: string;
    operator?: string;
    onClick?: () => void;
    className?: string;
  }) {
    return (
      <button
        onClick={() =>
          onClick ? onClick() : handleClick(operator ? operator : label)
        }
        className={`${CalculatorButtonClass} ${className}`}
      >
        {label}
      </button>
    );
  }

  return (
    <div className="bg-white/70 p-4 rounded-lg shadow-lg w-72 mx-auto mt-10">
      <div className="bg-gray-300/70 p-4 rounded-lg mb-4 border-2 h-[106px] flex flex-col">
        <div className="text-right mb-2 text-xl border-b border-gray-300 h-full">
          {input}
        </div>
        <div className="text-right font-bold text-2xl h-full">{result}</div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <CalculatorButton
          label={"AC"}
          onClick={handleClear}
          className={`${FunctionButtonClass}`}
        />
        <CalculatorButton label={"⌫"} onClick={handleDelete} />
        <CalculatorButton label={"%"} className={FunctionButtonClass} />
        <CalculatorButton
          label={"÷"}
          operator="/"
          className={OperatorButtonClass}
        />
        <CalculatorButton label={"7"} />
        <CalculatorButton label={"8"} />
        <CalculatorButton label={"9"} />
        <CalculatorButton label={"×"} className={OperatorButtonClass} />
        <CalculatorButton label={"4"} />
        <CalculatorButton label={"5"} />
        <CalculatorButton label={"6"} />
        <CalculatorButton label={"-"} className={OperatorButtonClass} />
        <CalculatorButton label={"1"} />
        <CalculatorButton label={"2"} />
        <CalculatorButton label={"3"} />
        <CalculatorButton label={"+"} className={OperatorButtonClass} />
        <CalculatorButton label={"0"} className="col-span-2" />
        <CalculatorButton label={"."} />
        <button onClick={handleCalculate} className={OperatorButtonClass}>
          =
        </button>
      </div>
    </div>
  );
};

export default Calculator;
