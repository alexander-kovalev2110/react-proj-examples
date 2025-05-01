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

const Result = ({ correct, length }) => {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>You guessed {correct} answers out of {length} </h2>
      <a href="/">
        <button >Try again</button>
      </a>
    </div>
  );
}

const Game = ({ question, onClickVariant }) => {
  const { title, variants } = question;

  return (
    <>
      <h1>{title}</h1>
      <ul>
        { variants.map((text, index) => (
          <li onClick={() => onClickVariant(index)} key={index}>{text}</li>
        ))}
      </ul>
    </>
  );
}

const App = () => {
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
        <>
          {/* Progress bar */}
          <div className="progress">
            <div 
              style={{ width: `${Math.round((step / questions.length) * 100)}%` }} 
              className="progress__inner">
            </div>
          </div>
          <Game question={question} onClickVariant={onClickVariant}/>
        </>
      ) : (
        <Result correct={correct} length={questions.length}/>
      )}
    </div>
  );
}

export default App;
