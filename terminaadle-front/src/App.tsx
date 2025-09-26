import { useEffect, useState } from "react";
import "./styles/App.css";
import "./styles/guesses.css";

import { fetchImage } from "./services/imageService";
import ImageDisplay from "./components/ImageDisplay";

type Hint = { issue: string; releaseYear: string };
type GameState = "Voitit pelin" | "Hävisit pelin" | "";

interface GuessProps {
  issue: number;
  releaseYear: number;
  hint?: Hint;
}

interface Answer {
  issue: number;
  releaseYear: number;
  imgData: unknown;
}

function isCorrect(hint?: Hint): boolean[] {
  return [hint?.issue ? false : true, hint?.releaseYear ? false : true];
}

function HintComponent({ hint }: { hint?: string }) {
  return (
    <>
      <span className={`hint ${hint ? "show" : ""}`}>
        {hint ? `(${hint})` : ""}
      </span>
    </>
  );
}

type SubmitProps = {
  gameState: GameState;
  reset: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
function SubmitButton({ gameState, reset }: SubmitProps) {
  const Reset = () => (
    <button className="submit-button" onClick={(e) => reset(e)}>
      Pelaa uudestaan?
    </button>
  );

  const Submit = () => (
    <input type="submit" className="submit-button" value="Submit" />
  );

  return (
    <>
      <div className="submit-button-container">
        {gameState ? <Reset /> : <Submit />}
      </div>
    </>
  );
}

function Guess({ issue, releaseYear, hint }: GuessProps) {
  return (
    <div>
      <span
        id="guess-issue"
        className={isCorrect(hint)[0] ? "correct" : "incorrect"}
      >
        {issue}
        <HintComponent hint={hint?.issue} />
      </span>
      <span id="guess-dash">-</span>
      <span
        id="guess-release-year"
        className={isCorrect(hint)[1] ? "correct" : "incorrect"}
      >
        {releaseYear}
        <HintComponent hint={hint?.releaseYear} />
      </span>
    </div>
  );
}

function App() {
  const MAX_GUESSES = 5;

  const [responseData, setResponseData] = useState<Answer>();
  const [responseImage, setResponseImage] = useState("");
  const [gameState, setGameState] = useState<GameState>("");
  const [guessesLeft, setGuessesLeft] = useState(MAX_GUESSES);
  const [guesses, setGuesses] = useState<GuessProps[]>([]);

  const [inputDisabled, setInputDisabled] = useState<boolean>(false);

  function checkAnswer(guess: GuessProps, answer: Answer): GuessProps {
    const hint: Hint = {
      issue: "",
      releaseYear: "",
    };

    hint.issue =
      guess.issue > answer.issue
        ? "pienempi"
        : guess.issue < answer.issue
        ? "isompi"
        : "";

    hint.releaseYear =
      guess.releaseYear > answer.releaseYear
        ? "pienempi"
        : guess.releaseYear < answer.releaseYear
        ? "isompi"
        : "";

    guess.hint = hint;
    return guess;
  }

  function onFormSubmit(formData: FormData): void {
    let guessObject: GuessProps = {
      issue: formData.get("issue") as unknown as number,
      releaseYear: formData.get("release_year") as unknown as number,
    };

    const updatedGuessesLeft =
      guessesLeft - 1 < 0 ? guessesLeft : guessesLeft - 1;

    guessObject = checkAnswer(guessObject, responseData);

    const isWin = (): boolean => {
      // Don't ask this is stupid but at this point I don't want to nor have time
      // to refactor this shit in smarter solution
      const guessList = isCorrect(guessObject.hint);
      return guessList[0] && guessList[1];
    };

    if (isWin()) {
      setGameState("Voitit pelin");
      setInputDisabled(true);
    } else if (updatedGuessesLeft <= 0) {
      setGameState("Hävisit pelin");
      setInputDisabled(true);
    }

    setGuessesLeft(updatedGuessesLeft);
    setGuesses((prev) => [...prev, guessObject]);
  }

  function resetGame(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log("Game reseted");

    setGuessesLeft(MAX_GUESSES);
    setGuesses([]);
    setGameState("");
    setInputDisabled(false);

    // fetch new image data upon game reset
    fetchImage()
      .then((data) => {
        handleFetchData(data);
      })
      .catch((err) => {
        console.log("Failed to fetch data", err);
      });
  }

  function handleFetchData(data) {
    const tmpData: Answer = {
      issue: data.answer_data.edition,
      releaseYear: data.answer_data.year,
      imgData: data.image_base64,
    };

    console.log(tmpData);
    setResponseData(tmpData);
    setResponseImage(data.image_base64);
  }

  useEffect(() => {
    fetchImage()
      .then((data) => {
        handleFetchData(data);
      })
      .catch((err) => {
        console.log("Failed to fetch data", err);
      });
  }, []);

  return (
    <div id="app">
      <h1>Terminaadle</h1>
      <div id="img-container">
        <ImageDisplay base64Image={responseImage} />
        <div id="guesses">
          <div className="guesses-content">
            <h3>Arvaukset</h3>
            {guesses.map((obj, index) => (
              <Guess
                key={index}
                issue={obj.issue}
                releaseYear={obj.releaseYear}
                hint={obj.hint}
              />
            ))}
          </div>
          <footer id="guesses-footer">
            <div
              id="game-state-div"
              className={
                gameState === "Voitit pelin"
                  ? "win"
                  : gameState === "Hävisit pelin"
                  ? "lose"
                  : ""
              }
            >
              {gameState}
            </div>
            <div>Arvaukset jäljellä: {guessesLeft}</div>
          </footer>
        </div>
      </div>
      <div id="form-container">
        <form action={onFormSubmit} id="guess-form">
          <div className="input-wrapper">
            <div>
              <input
                name="issue"
                type="number"
                inputMode="numeric"
                className="guess-input"
                placeholder="Painos"
                disabled={inputDisabled}
                required
              />
              <span className="space-span">-</span>
              <input
                name="release_year"
                type="number"
                inputMode="numeric"
                className="guess-input"
                placeholder="Vuosi"
                disabled={inputDisabled}
                required
              />
              <SubmitButton gameState={gameState} reset={(e) => resetGame(e)} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
