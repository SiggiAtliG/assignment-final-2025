import React from "react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "../pages/index";
import axios from "axios";

// Mock axios
vi.mock("axios");
// Mock next/router
vi.mock("next/router", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("Home Page", () => {
  it("renders the title", () => {
    render(<Home />);
    expect(screen.getByText(/Tic Tac Toe/i)).toBeInTheDocument();
  });

  it("renders the form with input fields and button", () => {
    render(<Home />);
    expect(screen.getByPlaceholderText(/Your Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Opponent Name/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Start Game/i })).toBeInTheDocument();
  });

  it("shows error when player 1 name is missing", async () => {
    render(<Home />);
    
    // Fill only player 2 name
    fireEvent.change(screen.getByPlaceholderText(/Opponent Name/i), {
      target: { value: "Player 2" },
    });
    
    // Remove the required attribute to allow form submission
    const input = screen.getByPlaceholderText(/Your Name/i);
    input.removeAttribute('required');
    
    // Submit the form
    fireEvent.submit(screen.getByRole("form"));
    
    // Should show error message
    await waitFor(() => {
      expect(screen.getByText(/Player 1 name is required/i)).toBeInTheDocument();
    });
  });

  it("shows error when player 2 name is missing", async () => {
    render(<Home />);
    
    // Fill only player 1 name
    fireEvent.change(screen.getByPlaceholderText(/Your Name/i), {
      target: { value: "Player 1" },
    });
    
    // Remove the required attribute to allow form submission
    const input = screen.getByPlaceholderText(/Opponent Name/i);
    input.removeAttribute('required');
    
    // Submit the form
    fireEvent.submit(screen.getByRole("form"));
    
    // Should show error message
    await waitFor(() => {
      expect(screen.getByText(/Player 2 name is required/i)).toBeInTheDocument();
    });
  });

  it("creates a new game when form is submitted with both player names", async () => {
    // Mock axios.post response
    const mockGameId = "test-game-id";
    (axios.post as any).mockResolvedValueOnce({ data: { id: mockGameId } });
    
    render(<Home />);
    
    // Fill player names
    fireEvent.change(screen.getByPlaceholderText(/Your Name/i), {
      target: { value: "Player 1" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Opponent Name/i), {
      target: { value: "Player 2" },
    });
    
    // Submit the form
    fireEvent.submit(screen.getByRole("form"));
    
    // Should call axios.post with player names
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("/api/new", {
        playerName: "Player 1",
        secondPlayerName: "Player 2",
      });
    });
  });
});
