import React from 'react'
import Question from "./question";
import Answer from './answer';
import './style.css'
import ProgressBar from "./progress-bar";


const EVERY_PAGE_QUESTIONS = 6;

class Questions extends React.Component {
    constructor(props) {
        super(props);
        this.answers = {};
        this.state = {
            percentage: 0,
            page: 0,
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
                    title: 'هدف از این غربالگری اولیه‌ی کودکان مبتلا؟',
                }, {
                    id: 7,
                    title: 'هدف از این طرح غربالگری اولیه‌ی کودکان مبتلا به؟',
                }, {
                    id: 8,
                    title: 'هدف از این طرح غربالگری اولیه‌ی کودکان مبتلا به، پیش از؟',
                }, {
                    id: 9,
                    title: 'هدف از این طرح اولیه‌ی کودکان مبتلا به اتیسم، پیش از تشخیص متخصص می‌باشد؟',
                }, {
                    id: 10,
                    title: 'هدف از این طرح اولیه‌ی کودکان مبتلا؟',
                }, {
                    id: 11,
                    title: 'هدف از این طرح غربالگری اولیه‌ی کودکان مبتلا به اتیسم؟',
                }, {
                    id: 12,
                    title: 'هدف از این طرح غربالگری کودکان مبتلا به اتیسم، پیش از؟',
                }, {
                    id: 13,
                    title: 'هدف از این طرح غربالگری اولیه‌ی کودکان به اتیسم، پیش از تشخیص متخصص می‌باشد؟',
                }, {
                    id: 14,
                    title: 'هدف از این طرح اولیه‌ی کودکان مبتلا؟',
                }, {
                    id: 15,
                    title: 'هدف از این طرح غربالگری اولیه‌ی کودکان مبتلا؟',
                }, {
                    id: 16,
                    title: 'هدف از این طرح غربالگری اولیه‌ی به اتیسم، پیش از؟',
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

    nextPage() {
        this.setState({page: this.state.page + 1});
        window.scroll({top: 670, left: 0, behavior: 'smooth' })
    }

    previousPage() {
        this.setState({page: this.state.page - 1});
    }

    end() {
        alert('سرور کو؟')
    }

    render() {
        const startOfPage = this.state.page * EVERY_PAGE_QUESTIONS;
        const endOfPage = Math.min(startOfPage + EVERY_PAGE_QUESTIONS, this.state.questions.length);
        const isFirstPage = this.state.page === 0;
        const isLastPage = this.state.page === Math.ceil(this.state.questions.length / EVERY_PAGE_QUESTIONS) - 1;

        const thisPageQuestions = this.state.questions.slice(startOfPage, endOfPage);
        const questions = thisPageQuestions.map((question, i) => (
            <div className='question-item' key={question.id}>
                <Question
                    id={question.id}
                    title={question.title}
                />
                <Answer onChange={(answer) => this.answerItem(question.id, answer)} defaultAnswer={this.answers[question.id]}/>
            </div>
        ));

        return(
            <div>
                <ProgressBar percentage={this.state.percentage}/>
                {questions}
                <div className='buttons'>
                    {!isLastPage && <div className="button next" onClick={() => this.nextPage()}>بعدی</div>}
                    {isLastPage && <div className="button end" onClick={() => this.end()}>پایان</div>}
                    {!isFirstPage && <div className="button previous" onClick={() => this.previousPage()}>قبلی</div>}
                </div>
            </div>
        );
    }
}

export default Questions