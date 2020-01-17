import React from 'react'
import Question from "./question";
import Answer from './answer';
import './style.css'
import ProgressBar from "./progress-bar";
import QuestionManger from "../../util/questionManager";


const EVERY_PAGE_QUESTIONS = 5;

class Questions extends React.Component {
    constructor(props) {
        super(props);
        this.questionManager = new QuestionManger(0, 'male', false);
        this.state = {
            percentage: 0,
            page: 0,
        };
    }

    updatePercentage() {
        const answeredQuestions = this.questionManager.getAnsweredQuestionsCount();
        const tatalQuestions = this.questionManager.getCount();
        this.setState({percentage: Math.floor( answeredQuestions / tatalQuestions * 100)})
    }

    answerItem(id, answer) {
        if (answer === null) {
            this.questionManager.unAnswerQuestion(id);
        } else {
            this.questionManager.answerQuestion(id, answer);
        }
        this.updatePercentage();
    }

    nextPage() {
        this.setState({page: this.state.page + 1});
        window.scroll({top: 820, left: 0, behavior: 'smooth' })
    }

    previousPage() {
        this.setState({page: this.state.page - 1});
    }

    end() {
        alert('سرور کو؟')
    }

    render() {
        console.log(this.questionManager.getCount() - 1);
        const startOfPage = this.state.page * EVERY_PAGE_QUESTIONS;
        const endOfPage = Math.min(startOfPage + EVERY_PAGE_QUESTIONS - 1, this.questionManager.getCount() - 1);
        const isFirstPage = this.state.page === 0;
        const isLastPage = this.state.page === Math.ceil(this.questionManager.getCount() / EVERY_PAGE_QUESTIONS) - 1;

        const thisPageQuestions = this.questionManager.getQuestionRange(startOfPage, endOfPage);
        const questions = thisPageQuestions.map((question, i) => (
            <div className='question-item' key={question.id}>
                <Question
                    id={question.id}
                    title={question.text}
                />
                <Answer onChange={(answer) => this.answerItem(question.id, answer)} defaultAnswer={this.questionManager.getAnswer(question.id)}/>
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