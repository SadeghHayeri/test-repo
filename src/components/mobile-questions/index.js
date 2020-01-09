import React from 'react'
import './style.css'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import {Howler, Howl} from 'howler';
import nextImg from './images/next.png'
import backImg from './images/back.png'
import menu from './images/menu.png'
import soundImg from './images/sound.png'

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import PersianView from "../commons/persian-view";
import QuestionManger from '../../util/questionManager';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';

class MobileQuestsion extends React.Component {
    targetRef = React.createRef();
    targetElement = null;

    constructor(props) {
        super(props);
        this.questionManager = new QuestionManger(0, 'male', false);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.targetElement = document.querySelector('#main');
        this.audio = null;

        this.state = {
            width: 0,
            height: 0,
            menu: false,
            drawer: false,
            currentQuestion: this.questionManager.getQuestion(0),
            showSignUp: true,
            sex: 'female',
            otherPersonHasAutism: 'false',
        };
    }

    componentDidMount() {
        this.targetElement = this.targetRef.current;
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        // disableBodyScroll(this.targetElement);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
        clearAllBodyScrollLocks();
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    onButton(item) {
        this.questionManager.answerQuestion(this.state.currentQuestion.id, item);
        this.forceUpdate();

        setTimeout(() => {
            this.nextQuestion();
        }, 300)
    }

    toggleMenu() {
        this.setState({menu: !this.state.menu});
    }

    changeLanguage(lan) {
        this.questionManager.changeLanguage(lan);
        this.setState(
            {currentQuestion: this.questionManager.getQuestion(this.state.currentQuestion.number)},
            () => this.play()
        );
    }

    toPersianLanguageName() {
        switch (this.questionManager.isMute() || this.questionManager.getLanguage()) {
            case 'fa':
                return 'فارسی';
            case 'tr':
                return 'ترکی';
            default:
                return 'خاموش';
        }
    }

    play() {
        if (this.audio) {
            this.audio.pause();
        }

        const audioUrl = this.state.currentQuestion.sound;
        if (audioUrl) {
            this.audio = new Howl({src: [audioUrl]});
            this.audio.play();
        }
    }

    nextQuestion() {
        if (this.state.currentQuestion.number < this.questionManager.getCount() - 1) {
            const nextQuestion = this.questionManager.getQuestion(this.state.currentQuestion.number + 1);
            this.setState({currentQuestion: nextQuestion}, () => this.play());
        }
    }

    prevQuestion() {
        if (this.state.currentQuestion.number > 0) {
            const prevQuestion = this.questionManager.getQuestion(this.state.currentQuestion.number - 1);
            this.setState({currentQuestion: prevQuestion}, () => this.play());
        }
    }

    toggleDrawer() {
        this.setState({drawer: !this.state.drawer});
    }

    onStart() {
        this.setState({showSignUp: false});
        this.play();
    }

    render() {
        const { currentQuestion } = this.state;

        const signupView = (
          <div>
              <form noValidate autoComplete="off" dir='rtl' className='mobile-form'>
                  <Typography variant="subtitle1">نام کودک خودتان را وارد کنید:</Typography>
                  <TextField id="standard-basic" label="نام کودک" dir='rtl' onChange={event => {this.setState({name: event.target.value})}}/>

                  <Typography className='withMargin' variant="subtitle1">بازه‌ی سن کودک خود را انتخاب کنید:</Typography>
                  <Select
                      id="demo-simple-select"
                      value={0}
                      onChange={event => {this.setState({age: event.target.value})}}
                  >
                      <MenuItem value={0}>۱۸ماه تا ۲سال</MenuItem>
                      <MenuItem value={1}>بین ۲ تا ۳ سال</MenuItem>
                      <MenuItem value={2}>بین ۳ تا ۴ سال</MenuItem>
                      <MenuItem value={3}>بین ۴ تا ۵ سال</MenuItem>
                      <MenuItem value={4}>بالای ۵ سال</MenuItem>
                  </Select>


                  <Typography className='withMargin' variant="subtitle1">جنسیت کودک خود را انتخاب کنید:</Typography>
                  <RadioGroup row value={this.state.sex} onChange={event => {this.setState({sex: event.target.value})}}>
                      <FormControlLabel value="female" control={<Radio />} label="دختر" />
                      <FormControlLabel value="male" control={<Radio />} label="پسر" />
                  </RadioGroup>


                  <Typography variant="subtitle1">آیا سابقه بیماری اتیسم در خانواده وجود دارد؟</Typography>
                  <RadioGroup row value={this.state.otherPersonHasAutism} onChange={event => {this.setState({otherPersonHasAutism: event.target.value})}}>
                      <FormControlLabel value='false' control={<Radio />} label="خیر" />
                      <FormControlLabel value='true' control={<Radio />} label="بله" />
                  </RadioGroup>


                  <Typography className='withMargin' variant="subtitle1">شماره موبایل خود را وارد کنید:</Typography>
                  <Typography variant="body2">نتیجه غربالگری به صورت مستقیم به این شماره ارسال می‌شود</Typography>
                  <TextField id="standard-basic" label="شماره موبایل" dir='rtl' onChange={event => {this.setState({phone: event.target.value})}} />

                  <Button onClick={() => this.onStart()} className='withMargin' variant="contained" color="primary">شروع تست</Button>
              </form>
          </div>
        );

        const sideList = (
            <div
                className='drawer'
                role="presentation"
                onClick={() => this.toggleDrawer()}
                onKeyDown={() => this.toggleDrawer()}
            >
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </div>
        );

        return(
            <div className={'mobile-questions'} ref={this.targetRef} id={'main'}>
                <Drawer anchor="right" open={this.state.drawer} onClose={() => this.toggleDrawer()}>
                    {sideList}
                </Drawer>
                <div className='questions-header'>
                    <img onClick={() => this.toggleDrawer()} src={menu} alt="" className='questions-menu-icon'/>
                    {!this.state.showSignUp &&
                    <div onClick={() => this.toggleMenu()} className="left-menu">
                        <div className='language'>{this.toPersianLanguageName()}</div>
                        <div className="sound">
                            <img className='sound-images' src={soundImg} alt=""/>
                        </div>

                        <div className={'hidden-sound-menu ' + (!this.state.menu ? 'hidden-menu' : '')}>
                            <div onClick={() => this.changeLanguage('fa')} className="hidden-item">فارسی</div>
                            <div onClick={() => this.changeLanguage('tr')} className="hidden-item">ترکی</div>
                            <div onClick={() => this.changeLanguage(null)} className="hidden-item">خاموش</div>
                        </div>
                    </div>
                    }
                </div>
                {!this.state.showSignUp &&
                    <div className='mob-main-questions'>
                        <div onClick={() => this.nextQuestion()} className="next-button"><img className='arrow-img'
                                                                                              src={nextImg} alt=""/></div>
                        <div onClick={() => this.prevQuestion()} className="back-button"><img className='arrow-img'
                                                                                              src={backImg} alt=""/></div>
                        <div className='main-questions-header'>
                            <div className='main-number'><PersianView text={currentQuestion.number + 1}/></div>
                            <div className='main-all-number'>/ <PersianView text={this.questionManager.getCount()}/></div>
                        </div>
                        <div className='main-line'/>
                        <div className='mob-main-question'>{currentQuestion.text}</div>
                    </div>
                }
                {!this.state.showSignUp &&
                    <div className='mob-answers'>
                        <div onClick={() => this.onButton(+2)}
                             className={'mob-button butt1 ' + (this.questionManager.getAnswer(currentQuestion.id) === +2 ? 'selected' : '')}>کاملا
                            موافق
                        </div>
                        <div onClick={() => this.onButton(+1)}
                             className={'mob-button butt2 ' + (this.questionManager.getAnswer(currentQuestion.id) === +1 ? 'selected' : '')}>موافق
                        </div>
                        <div onClick={() => this.onButton(-1)}
                             className={'mob-button butt3 ' + (this.questionManager.getAnswer(currentQuestion.id) === -1 ? 'selected' : '')}>مخالف
                        </div>
                        <div onClick={() => this.onButton(-2)}
                             className={'mob-button butt4 ' + (this.questionManager.getAnswer(currentQuestion.id) === -2 ? 'selected' : '')}>کاملا
                            مخالف
                        </div>
                    </div>
                }
                {this.state.showSignUp && signupView}
            </div>
        );
    }
}

export default MobileQuestsion