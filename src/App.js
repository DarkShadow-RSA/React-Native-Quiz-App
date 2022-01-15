import React, { useState } from 'react';
import question from './data.json';

export default function App() {

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [result, setResult] = useState('');
	const [correctAns, setcorrectAns] = useState(0);
	//attempts
	const [incorrectAns, setIncorrectAns] = useState(3);
	//Generate new random array
	const [newQuiz, setNewQuiz] = useState(true)

	if (newQuiz){
		question.sort(() => Math.random() - 0.5)
		setNewQuiz(false)
	}

	//Make quiz random


	const nextQuestion = () => {
		if (currentQuestion + 1 < 10) {
			setCurrentQuestion(currentQuestion + 1);
			setIncorrectAns(3)
		} else {
			setResult(true);
		}
	}



	//reset quize
	const handleRestartClick = () => {
	setCurrentQuestion(0)
	setIncorrectAns(3)
	setcorrectAns(0)
	setResult(false)
	setNewQuiz(false)
	setNewQuiz(true)
	};

	const handleAnswerOptionClick = (correctAnsQuize) => {
		if (correctAnsQuize === true) {
			setcorrectAns(correctAns + 1);
			nextQuestion()
		}else {
			setIncorrectAns(incorrectAns-1);
				if(incorrectAns === 1){
				nextQuestion()
			}
		}
	};

	return (<>
		<div className='container'>
			{result ? (
				<results>
					<h3>You got <b>{correctAns*10} out of 100</b></h3>
					<button className='skipORagain' onClick={() => handleRestartClick()}>Try Again</button>

				</results>
			) : (
				<article>
					<h1>Question {currentQuestion + 1}/{question.length}</h1>
					<div className=''>{question[currentQuestion].quiz_question}</div>
					<p>Attempts left {incorrectAns}/3</p>
					{question[currentQuestion].possibleAnswers.map((possibleAnswers) => (
						<button key={possibleAnswers.id} onClick={() => handleAnswerOptionClick(possibleAnswers.correctAnsQuize)}>{possibleAnswers.answer}</button>							
					))}
					<button className='skipORagain' onClick={() => nextQuestion()}>Skip Question</button>

				</article>
			)}
		
		</div>
		</>

	);
}
