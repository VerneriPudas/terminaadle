import { useState } from "react";
import "./styles/App.css";
import "./styles/guesses.css";

interface GuessProps {
  issue: number | null;
  releaseYear: number | null;
  hint?: string;
}

function Guess({ issue, releaseYear, hint }: GuessProps) {
  return (
    <div>
      {issue} - {releaseYear}
      <span>{hint}</span>
    </div>
  );
}

function App() {
  const [guesses, setGuesses] = useState<GuessProps[]>([]);

  function onFormSubmit(formData: FormData): void {
    console.log("Submited", formData);
    console.log(guesses);

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
        <div id="terminaali-page"></div>
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
