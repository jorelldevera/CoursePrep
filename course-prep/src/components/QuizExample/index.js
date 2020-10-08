import React from 'react';
import '../QuizExample/Quiz.css';
import Question from '../QuizExample/Question.js'


const QuizExample = () => (
<div className="quiz-container">
			<header>
				<h1 className="quiz-header-text">This is a quiz</h1>
			</header>
			<br />

			<div className="questions-container">
				<Question />
				<Question />
				<Question />
				<Question />
				<Question />
				<Question />
				<Question />
				<Question />
				<Question />
				<Question />
				<Question />
			</div>
		</div>
);

export default QuizExample;