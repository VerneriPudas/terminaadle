import { useState } from "react";
import "./styles/App.css";
import "./styles/guesses.css";

import testImg from "./assets/test_img.jpg";

interface GuessProps {
  issue: number;
  releaseYear: number;
  hint?: string[];
}

interface Answer {
  issue: number;
  releaseYear: number;
  imgData: unknown;
}

function Hint({ hint }: { hint?: string }) {
  return (
    <>
      <span>{hint}</span>
    </>
  );
}

function Guess({ issue, releaseYear, hints }: GuessProps) {
  return (
    <div>
      {issue}
      <Hint />/{releaseYear}
      <Hint />
    </div>
  );
}

function App() {
  const testResponseData = {
    issue: 2,
    releaseYear: 1995,
    img: testImg,
  };

  const [guesses, setGuesses] = useState<GuessProps[]>([]);
  type Hint = { issue: string; releaseYear: string };

  function checkAnswer(guess: GuessProps, answer: Answer): Hint {
    const hint: Hint = {
      issue: "",
      releaseYear: "",
    };

    hint.issue =
      guess.issue > answer.issue
        ? "isompi"
        : guess.issue < answer.issue
        ? "pienempi"
        : "";

    hint.releaseYear =
      guess.releaseYear > answer.releaseYear
        ? "isompi"
        : guess.releaseYear < answer.releaseYear
        ? "pienempi"
        : "";

    return hint;
  }

  function onFormSubmit(formData: FormData): void {
    const guessObject: GuessProps = {
      issue: formData.get("issue") as unknown as number,
      releaseYear: formData.get("release_year") as unknown as number,
    };
    setGuesses((prev) => [...prev, guessObject]);
  }

  return (
    <div id="app">
      <h1>Terminaadle</h1>
      <div id="img-container">
        <img id="terminaali-page" src={testResponseData.img} />
        <div id="guesses">
          <div className="guesses-content">
            <h3>Arvaukset</h3>
            {guesses.map((obj, index) => (
              <Guess
                key={index}
                issue={obj.issue}
                releaseYear={obj.releaseYear}
              />
            ))}
          </div>
          <footer id="guesses-footer">Arvaukset jäljellä: 5</footer>
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
                required
              />
              <span className="space-span">-</span>
              <input
                name="release_year"
                type="number"
                inputMode="numeric"
                className="guess-input"
                placeholder="Vuosi"
                required
              />
              <div className="submit-button-container">
                <input type="submit" className="submit-button" value="Submit" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
