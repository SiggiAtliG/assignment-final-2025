import React from "react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BoardHeader } from "../components/BoardHeader";
import { Sign } from "../utils/constants";
import * as gameUtils from "../utils/gameUtils";

// Mock the getRandomPepTalk function to return a consistent message
vi.mock("../utils/gameUtils", async () => {
  const actual = await vi.importActual("../utils/gameUtils");
  return {
    ...actual,
    getRandomPepTalk: () => "Make your move!",
  };
});

describe("BoardHeader Component", () => {
  it("displays winner announcement when there is a winner", () => {
    const game = {
      id: "test-id",
      player1_name: "Player 1",
      player2_name: "Player 2",
      moves: [
        Sign.X, Sign.X, Sign.X,
        Sign.O, Sign.O, "",
        "", "", ""
      ],
    };
    
    render(<BoardHeader game={game} />);
    
    // Should display the winner announcement
    expect(screen.getByText(/Won/i)).toBeInTheDocument();
    expect(screen.getByText(/Player 1/i)).toBeInTheDocument();
  });
  
  it("displays draw announcement when there is a draw", () => {
    const game = {
      id: "test-id",
      player1_name: "Player 1",
      player2_name: "Player 2",
      moves: [
        Sign.X, Sign.O, Sign.X,
        Sign.O, Sign.X, Sign.O,
        Sign.O, Sign.X, Sign.O
      ],
    };
    
    render(<BoardHeader game={game} />);
    
    // Should display the draw announcement
    expect(screen.getByText(/Game Over/i)).toBeInTheDocument();
    expect(screen.getByText(/Draw/i)).toBeInTheDocument();
  });
  
  it("displays next turn when game is in progress", () => {
    const game = {
      id: "test-id",
      player1_name: "Player 1",
      player2_name: "Player 2",
      moves: [
        Sign.X, "", "",
        "", "", "",
        "", "", ""
      ],
    };
    
    render(<BoardHeader game={game} />);
    
    // Should display turn information
    expect(screen.getByText(/Make your move!/i)).toBeInTheDocument();
    expect(screen.getByText(/Player 2/i)).toBeInTheDocument();
  });
}); 