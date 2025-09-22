import { useState } from "react";
import "./styles/App.css";

function App() {
  function onFormSubmit(formData: FormData): void {
    console.log("Submited", formData);
  }

  return (
    <div id="app">
      <h1>Terminaadle</h1>
      <div id="img-container">
        <div id="terminaali-page"></div>
      </div>
      <div id="form-container">
        <form action={onFormSubmit} id="guess-form">
          <div className="input-wrapper">
            <div>
              <input
                name="issue"
                type="number"
                className="guess-input"
                placeholder="Painos"
              />
              <span className="space-span">-</span>
              <input
                name="release_year"
                type="number"
                className="guess-input"
                placeholder="Vuosi"
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
