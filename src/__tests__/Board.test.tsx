import React from "react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Board from "../components/Board";
import { EMOJI, Sign } from "../utils/constants";

describe("Board Component", () => {
  it("renders a 3x3 grid of cells", () => {
    const moves = Array(9).fill("");
    const onMove = vi.fn();
    
    render(<Board moves={moves} onMove={onMove} />);
    
    // Should have 9 cells
    const cells = screen.getAllByRole("button");
    expect(cells).toHaveLength(9);
  });
  
  it("displays X and O in the correct cells", () => {
    const moves = [
      Sign.X, Sign.O, "",
      "", Sign.X, "",
      "", "", Sign.O
    ];
    const onMove = vi.fn();
    
    render(<Board moves={moves} onMove={onMove} />);
    
    // Check X positions
    expect(screen.getAllByText(EMOJI[Sign.X])).toHaveLength(2);
    // Check O positions
    expect(screen.getAllByText(EMOJI[Sign.O])).toHaveLength(2);
  });
  
  it("calls onMove with updated moves when an empty cell is clicked", () => {
    const moves = Array(9).fill("");
    const onMove = vi.fn();
    
    render(<Board moves={moves} onMove={onMove} />);
    
    // Click the first cell
    fireEvent.click(screen.getAllByRole("button")[0]);
    
    // Should call onMove with updated moves
    const expectedMoves = [...moves];
    expectedMoves[0] = Sign.X;
    expect(onMove).toHaveBeenCalledWith(expectedMoves);
  });
  
  it("does not allow clicking an already occupied cell", () => {
    const moves = [
      Sign.X, "", "",
      "", "", "",
      "", "", ""
    ];
    const onMove = vi.fn();
    
    render(<Board moves={moves} onMove={onMove} />);
    
    // Try to click the first cell (already has X)
    fireEvent.click(screen.getAllByRole("button")[0]);
    
    // Should not call onMove
    expect(onMove).not.toHaveBeenCalled();
  });
  
  it("allows then prevents moves when there is a winner", () => {
    // First, test that a move leading to a win works
    const moves = [
      Sign.X, Sign.X, "",
      Sign.O, Sign.O, "",
      "", "", ""
    ];
    const onMove = vi.fn();
    
    const { rerender } = render(<Board moves={moves} onMove={onMove} />);
    
    // Get all buttons
    const buttons = screen.getAllByRole("button");
    
    // Click the third cell to complete the X win
    fireEvent.click(buttons[2]);
    
    // Should call onMove with X in position 2
    expect(onMove).toHaveBeenCalled();
    const expectedMoves = [...moves];
    expectedMoves[2] = Sign.X;
    expect(onMove).toHaveBeenCalledWith(expectedMoves);
    
    // Now test that after a win, no more moves are allowed
    // Update moves to have a winner (X wins in top row)
    const movesWithWinner = [
      Sign.X, Sign.X, Sign.X,
      Sign.O, Sign.O, "",
      "", "", ""
    ];
    
    // Reset mock before checking next interactions
    onMove.mockReset();
    
    // Re-render with the winning state
    rerender(<Board moves={movesWithWinner} onMove={onMove} />);
    
    // Try to click an empty cell
    fireEvent.click(buttons[5]);
    
    // Should not call onMove because there's a winner
    expect(onMove).not.toHaveBeenCalled();
  });
  
  it("does not allow moves when there is a draw", () => {
    const movesWithDraw = [
      Sign.X, Sign.O, Sign.X,
      Sign.O, Sign.X, Sign.O,
      Sign.O, Sign.X, Sign.O
    ];
    const onMove = vi.fn();
    
    render(<Board moves={movesWithDraw} onMove={onMove} />);
    
    // Try to click any cell
    fireEvent.click(screen.getAllByRole("button")[0]);
    
    // Should not call onMove because it's a draw
    expect(onMove).not.toHaveBeenCalled();
  });
  
  it("does not allow moves when readOnly is true", () => {
    const moves = Array(9).fill("");
    const onMove = vi.fn();
    
    render(<Board moves={moves} onMove={onMove} readOnly={true} />);
    
    // Try to click the first cell
    fireEvent.click(screen.getAllByRole("button")[0]);
    
    // Should not call onMove because it's readOnly
    expect(onMove).not.toHaveBeenCalled();
  });
}); 