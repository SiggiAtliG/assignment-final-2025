import React from "react";
import styles from "../styles/Cell.module.css";
import { EMOJI, Sign } from "../utils/constants";

type Props = {
  onClick: () => void;
  number: number;
  value: Sign | string;
  readOnly?: boolean;
};

export default function Cell({ onClick, number, value, readOnly }: Props) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Add keyboard accessibility
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div 
      className={readOnly ? styles.miniCell : styles.cell} 
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={`Cell ${number + 1}, ${value ? (value === Sign.X ? 'X' : 'O') : 'empty'}`}
    >
      {value === Sign.X && EMOJI[Sign.X]}
      {value === Sign.O && EMOJI[Sign.O]}
    </div>
  );
}
