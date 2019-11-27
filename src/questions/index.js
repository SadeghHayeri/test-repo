import React from 'react'
import Question from "./question";
import Answer from './answer';
import './style.css'
import ProgressBar from "./progress-bar";

class Questions extends React.Component {
    constructor(props) {
        super(props);
        this.answers = {};
        this.state = {
            percentage: 0,
            questions: [
                {
                    id: 1,
                    title: 'هدف از این طرح غربالگری اولیه‌ی کودکان مبتلا به اتیسم، پیش از تشخیص متخصص می‌باشد؟',
                }, {
                    id: 2,
                    title: 'هدف از این طرح غربالگری اولیه‌ی کودکان مبتلا؟',
                }, {
                    id: 3,
                    title: 'هدف از این طرح غربالگری اولیه‌ی کودکان مبتلا به اتیسم؟',
                }, {
                    id: 4,
                    title: 'هدف از این طرح غربالگری اولیه‌ی کودکان مبتلا به اتیسم، پیش از؟',
                }, {
                    id: 5,
                    title: 'هدف از این طرح غربالگری اولیه‌ی کودکان مبتلا به اتیسم، پیش از تشخیص متخصص می‌باشد؟',
                }, {
                    id: 6,
                    title: 'هدف از این طرح غربالگری اولیه‌ی کودکان مبتلا؟',
                }, {
                    id: 7,
                    title: 'هدف از این طرح غربالگری اولیه‌ی کودکان مبتلا به اتیسم؟',
                }, {
                    id: 8,
                    title: 'هدف از این طرح غربالگری اولیه‌ی کودکان مبتلا به اتیسم، پیش از؟',
                }, {
                    id: 9,
                    title: 'هدف از این طرح غربالگری اولیه‌ی کودکان مبتلا به اتیسم، پیش از تشخیص متخصص می‌باشد؟',
                }, {
                    id: 10,
                    title: 'هدف از این طرح غربالگری اولیه‌ی کودکان مبتلا؟',
                }, {
                    id: 11,
                    title: 'هدف از این طرح غربالگری اولیه‌ی کودکان مبتلا به اتیسم؟',
                }, {
                    id: 12,
                    title: 'هدف از این طرح غربالگری اولیه‌ی کودکان مبتلا به اتیسم، پیش از؟',
                }, {
                    id: 13,
                    title: 'هدف از این طرح غربالگری اولیه‌ی کودکان مبتلا به اتیسم، پیش از تشخیص متخصص می‌باشد؟',
                }, {
                    id: 14,
                    title: 'هدف از این طرح غربالگری اولیه‌ی کودکان مبتلا؟',
                }, {
                    id: 15,
                    title: 'هدف از این طرح غربالگری اولیه‌ی کودکان مبتلا به اتیسم؟',
                }, {
                    id: 16,
                    title: 'هدف از این طرح غربالگری اولیه‌ی کودکان مبتلا به اتیسم، پیش از؟',
                }
            ],
        }
    }

    updatePercentage() {
        const totalCount = this.state.questions.length;
        const answeredQuestions = Object.keys(this.answers).length;
        this.setState({percentage: Math.floor(answeredQuestions / totalCount * 100)})
    }

    answerItem(id, answer) {
        if (answer === null) {
            delete this.answers[id];
        } else {
            this.answers[id] = answer;
        }
        this.updatePercentage();
    }

    render() {
        const questions = this.state.questions.map((question, i) => (
            <div className='question-item' key={question.id}>
                <Question
                    id={question.id}
                    title={question.title}
                />
                <Answer onChange={(answer) => this.answerItem(question.id, answer)}/>
            </div>
        ));

        return(
            <div>
                <ProgressBar percentage={this.state.percentage}/>
                {questions}
            </div>
        );
    }
}

export default Questions