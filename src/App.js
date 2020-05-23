import React, { useState } from 'react';
import parsePrompt from './parsePrompt/parsePrompt';
import './App.css';

const useInput = (initialState) => {
  const [value, setValue] = useState(initialState);
  const handleChange = (event) => setValue(event.target.value);
  return [value, handleChange];
}

function App() {
  const [promptConfig, setPromptConfig] = useInput('');

  const handleSubmit = () => {
    console.log('You don’t need to do that');
  };

  return (
    <main className="main">
      <h1 className="title">zsh prompt</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label for="input" className="label">
          Enter config string
        </label>
        <span className="input-context">PS1=“</span>
        <input type="text" className="input" value={promptConfig} onChange={setPromptConfig} />
        <span className="input-context">”</span>
      </form>
      <code className="terminal">
        <p className="terminal-text">
          {(promptConfig)
            ? parsePrompt(promptConfig)
            : '$ '
          }
          cd somewhere
        </p>
      </code>
    </main>
  );
}

export default App;
