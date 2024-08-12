interface IconSpeed {
  icons: React.ReactNode;
  color: string;
}

interface SpeedDialProps {
  onClickCalculator?: () => void;
  onClickMove?: () => void;
  cancelEvent?: () => void;
  disabled?: boolean;
}
