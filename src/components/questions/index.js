import React from 'react'
import Question from "./question";
import Answer from './answer';
import './style.css'
import ProgressBar from "./progress-bar";
import QuestionManger from "../../util/questionManager";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from '@material-ui/core/FormControl';
import loadingImages from './images/loading.gif'

const EVERY_PAGE_QUESTIONS = 6;

function ResultView(result) {
    return (
        <div>
            <div className='result-title'>{!result ? 'در حال تحلیل پاسخ‌ سوالات، لطفا چند لحظه صبر کنید...' : result}</div>
            {
                !result && <img className='loading-image' src={loadingImages} />
            }
        </div>
    )
}

class Questions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            percentage: 0,
            page: 0,
            started: false,
            age: 0,
            sex: null,
            otherPersonHasAutism: null,
            phone: null,
            finished: false,
            result: null,
        };
        this.questionManager = new QuestionManger(0, 'male', false, '', '');
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

    async end() {
        this.setState({finished: true});
        const result = await this.questionManager.finishAndSend();
        if (!result) {
            this.setState({finished: false});
        } else {
            this.setState({result});
        }
    }

    onStart() {
        this.questionManager = new QuestionManger(
            this.state.age - 1,
            this.state.sex,
            this.state.otherPersonHasAutism,
            this.state.name,
            this.state.phone
        );
        this.setState({started: true});
        window.scroll({top: 820, left: 0, behavior: 'smooth' })
    }

    render() {
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

        const formView = (
            <div className='form-view'>
                <FormControl fullWidth className='mobile-form'>
                    <TextField variant="outlined" className='withMargin' id="standard-basic" label="نام کودک" dir='rtl' onChange={event => {this.setState({name: event.target.value})}}/>

                    <Select
                        labelId="age-label"
                        id="demo-simple-select"
                        value={this.state.age}
                        label="بازه‌ی سنی کودک"
                        variant="outlined"
                        className='withMargin'
                        onChange={event => {this.setState({age: event.target.value})}}
                    >
                        <MenuItem value={0}>
                            <em>بازه‌ی سنی کودک خود را وارد کنید</em>
                        </MenuItem>
                        <MenuItem value={1}>۱۸ماه تا ۲سال</MenuItem>
                        <MenuItem value={2}>بین ۲ تا ۳ سال</MenuItem>
                        <MenuItem value={3}>بین ۳ تا ۴ سال</MenuItem>
                        <MenuItem value={4}>بین ۴ تا ۵ سال</MenuItem>
                        <MenuItem value={5}>بالای ۵ سال</MenuItem>
                    </Select>


                    <FormLabel component="legend" className='withMargin' variant="subtitle1">جنسیت کودک خود را انتخاب کنید:</FormLabel>
                    <RadioGroup row value={this.state.sex} onChange={event => {this.setState({sex: event.target.value})}}>
                        <FormControlLabel value="female" control={<Radio />} label="دختر" />
                        <FormControlLabel value="male" control={<Radio />} label="پسر" />
                    </RadioGroup>

                    <FormLabel component="legend" className='withMargin' variant="subtitle1">آیا سابقه بیماری اتیسم در خانواده وجود دارد؟</FormLabel>
                    <RadioGroup row value={this.state.otherPersonHasAutism} onChange={event => {this.setState({otherPersonHasAutism: event.target.value})}}>
                        <FormControlLabel value='false' control={<Radio />} label="خیر" />
                        <FormControlLabel value='true' control={<Radio />} label="بله" />
                    </RadioGroup>

                    <TextField className='withMargin' variant="outlined" id="standard-basic" label="شماره موبایل" dir='rtl' onChange={event => {this.setState({phone: event.target.value})}} />

                    <Button onClick={() => this.onStart()} className='withMargin form-button' variant="contained" color="primary">شروع تست</Button>
                </FormControl>
            </div>
        );

        const questionsView = (
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

        return(
            <div>
                {this.state.finished ? ResultView(this.state.result) : (this.state.started ? questionsView: formView)}
            </div>
        );
    }
}

export default Questions