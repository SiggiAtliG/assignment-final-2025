import axios from "axios";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { EMOJI, Sign } from "../utils/constants";

const Home: NextPage = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [secondPlayerName, setSecondPlayerName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  async function createGame() {
    try {
      // Validate player names
      if (!playerName.trim()) {
        setErrorMessage("Player 1 name is required");
        return null;
      }
      if (!secondPlayerName.trim()) {
        setErrorMessage("Player 2 name is required");
        return null;
      }
      
      setErrorMessage("");
      const { data } = await axios.post("/api/new", {
        playerName,
        secondPlayerName,
      });
      return data.id;
    } catch (error) {
      throw error;
    }
  }

  return (
    <>
      <h1 className={styles.title}>Tic Tac Toe #️⃣</h1>
      <div className={styles.grid}>
        <form
          role="form"
          className={styles.form}
          onSubmit={async (event) => {
            event.preventDefault();
            setIsCreating(true);
            try {
              const id = await createGame();
              if (id) {
                router.push("/game/" + id);
              }
            } catch (error) {
              console.log("failed to create ", error);
              setErrorMessage("Failed to create game. Please try again.");
            } finally {
              setIsCreating(false);
            }
          }}
        >
          <input
            className={styles.input}
            value={playerName}
            placeholder={`${EMOJI[Sign.X]} Your Name`}
            onChange={(event) => setPlayerName(event.target.value)}
            required
          />
          <input
            className={styles.input}
            value={secondPlayerName}
            placeholder={`${EMOJI[Sign.O]} Opponent Name`}
            onChange={(event) => setSecondPlayerName(event.target.value)}
            required
          />
          
          {errorMessage && (
            <div className={styles.error}>{errorMessage}</div>
          )}

          <button
            className={styles.startButton}
            disabled={isCreating}
            type="submit"
          >
            Start Game
          </button>
        </form>
        <Link href="/game/list">See all games</Link>
      </div>
    </>
  );
};

export default Home;
