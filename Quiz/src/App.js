import { useState } from 'react';
import './index.scss';

const questions = [
  {
    title: 'React is... ?',
    variants: ['library', 'framework', 'application'],
    correct: 0,
  },
  {
    title: 'The component is...',
    variants: ['application', 'part of an application or page', "what I don't know what is"],
    correct: 1,
  },
  {
    title: 'What is JSX?',
    variants: [
      'This is pure HTML',
      'This is a function',
      'This is the same HTML, but with the ability to execute JS code',
    ],
    correct: 2,
  },
];

function Result({ correct }) {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>You guessed {correct} answers out of {questions.length} </h2>
      <a href="/">
        <button >Try again</button>
      </a>
    </div>
  );
}

function Game({ step, question, onClickVariant }) {
  const { title, variants } = question;
  const percentage = Math.round((step / questions.length) * 100);

  return (
    <>
      <div className="progress">
        <div style={{ width: `${percentage}%` }} className="progress__inner"></div>
      </div>
      <h1>{title}</h1>
      <ul>
        { variants.map((text, index) => (
          <li onClick={() => onClickVariant(index)} key={index}>{text}</li>
        ))}
      </ul>
    </>
  );
}

function App() {
const [step, setStep] = useState(0);
const [correct, setCorrect] = useState(0);

const question = questions[step];

const onClickVariant = (index) => {
  setStep(step + 1);

  if (index === question.correct) {
    setCorrect(correct + 1);
  }
};

  return (
    <div className="App">
      {step !== questions.length ? (
        <Game step={step} question={question} onClickVariant={onClickVariant}/>
      ) : (
        <Result correct={correct}/>
      )}
    </div>
  );
}

export default App;
