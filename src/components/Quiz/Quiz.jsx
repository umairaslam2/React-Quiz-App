import { useRef, useState } from 'react';
import './Quiz.css';
import { data } from '../../assets/data';

const Quiz = () => {
    let [index, setIndex] = useState(0);
    let [lock, setLock] = useState(false);
    let [score, setScore] = useState(0);
    let [result, setResult] = useState(false);

    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);
    
    let option_array = [Option1, Option2, Option3, Option4];
    let question = data[index]; // Accessing the question directly

    const checkAnswer = (e, ans) => {
        if (!lock) {
            if (question.ans === ans) {
                e.target.classList.add("correct");
                setScore((prev) => prev + 1);
            } else {
                e.target.classList.add("wrong");
                option_array[question.ans - 1].current.classList.add("correct");
            }
            setLock(true);
        }
    };

    const next = () => {
        if (lock) {
            if (index === data.length - 1) {
                setResult(true);
            } else {
                setIndex(index + 1);
                setLock(false);
                option_array.forEach((option) => {
                    option.current.classList.remove("wrong");
                    option.current.classList.remove("correct");
                });
            }
        }
    };

    const reset = () => {
        setIndex(0);
        setScore(0);
        setLock(false);
        setResult(false);
    };

    return (
        <div className="container">
            <h1>Quiz App</h1>
            <hr />
            {!result ? (
                <>
                    <h2>{index + 1}. {question.question}</h2>
                    <ul>
                        {['option1', 'option2', 'option3', 'option4'].map((option, idx) => (
                            <li
                                key={idx}
                                ref={option_array[idx]}
                                onClick={(e) => checkAnswer(e, idx + 1)}
                            >
                                {question[option]}
                            </li>
                        ))}
                    </ul>
                    <button onClick={next}>Next</button>
                    <div className="index">
                        {index + 1} of {data.length} questions
                    </div>
                </>
            ) : (
                <>
                    <h2 className="result">You Scored {score} out of {data.length}</h2>
                    <button onClick={reset}>Reset</button>
                </>
            )}
        </div>
    );
};

export default Quiz;
