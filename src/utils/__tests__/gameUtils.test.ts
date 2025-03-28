import { describe, expect, it } from "vitest";
import { calculateWinner, isDraw } from "../gameUtils";
import { Sign } from "../constants";

describe("Game Utility Functions", () => {
  describe("calculateWinner", () => {
    it("should return winner if there is a horizontal winning line", () => {
      const squares = [
        Sign.X, Sign.X, Sign.X,
        "", "", "",
        "", "", ""
      ];
      expect(calculateWinner(squares)).toBe(Sign.X);
    });

    it("should return winner if there is a vertical winning line", () => {
      const squares = [
        Sign.O, "", "",
        Sign.O, "", "",
        Sign.O, "", ""
      ];
      expect(calculateWinner(squares)).toBe(Sign.O);
    });

    it("should return winner if there is a diagonal winning line", () => {
      const squares = [
        Sign.X, "", "",
        "", Sign.X, "",
        "", "", Sign.X
      ];
      expect(calculateWinner(squares)).toBe(Sign.X);
    });

    it("should return null if there is no winner", () => {
      const squares = [
        Sign.X, Sign.O, Sign.X,
        Sign.O, Sign.X, Sign.O,
        Sign.O, Sign.X, ""
      ];
      expect(calculateWinner(squares)).toBe(null);
    });
  });

  describe("isDraw", () => {
    it("should return true if the game is a draw", () => {
      const squares = [
        Sign.X, Sign.O, Sign.X,
        Sign.O, Sign.X, Sign.O,
        Sign.O, Sign.X, Sign.O
      ];
      expect(isDraw(squares)).toBe(true);
    });

    it("should return false if there is a winner", () => {
      const squares = [
        Sign.X, Sign.X, Sign.X,
        Sign.O, Sign.O, "",
        "", "", ""
      ];
      expect(isDraw(squares)).toBe(false);
    });

    it("should return false if the game is not finished yet", () => {
      const squares = [
        Sign.X, Sign.O, Sign.X,
        Sign.O, Sign.X, Sign.O,
        Sign.O, Sign.X, ""
      ];
      expect(isDraw(squares)).toBe(false);
    });
  });
});
