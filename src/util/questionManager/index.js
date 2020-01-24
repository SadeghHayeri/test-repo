const {server} = require("../../config");
const persianTexts = require('./text');
const selectionByAge = require('./selections');
const { toast } = require('react-toastify');

const axios = require('axios').create({
    baseURL: server,
    headers: { 'Content-Type': 'application/json' }
});

class QuestionGenerator {
    constructor(age, sex, hasAutism, name, phone) {
        this.name = name;
        this.phone = phone;
        this.age = age;
        this.sex = sex;
        this.hasAutism = hasAutism;
        this.language = 'fa';
        this.questions = selectionByAge[age];
        this.mute = false;
        this.answers = {};
    }

    changeLanguage(language) {
        if (language) {
            this.language = language;
            this.mute = false;
        } else {
            this.mute = true;
        }
    }

    getLanguage() {
        return this.language;
    }


    isMute() {
        return this.mute;
    }

    getCount() {
        return this.questions.length;
    }

    getQuestionRange(startIndex, endIndex) {
        const result = [];
        for (let i = startIndex; i <= endIndex; i++) {
            result.push(this.getQuestion(i))
        }
        return result;
    }

    getQuestion(index) {
        this.preFetchSounds(index + 1);
        const questionNumber = this.questions[index];
        switch (this.language) {
            case 'fa':
                return {
                    id: questionNumber,
                    number: index,
                    text: persianTexts[questionNumber],
                    sound: !this.mute && require(`./sounds/persian/q${questionNumber+1}.mp3`),
                };
            case 'tr':
                return {
                    id: questionNumber,
                    number: index,
                    text: persianTexts[questionNumber],
                    sound: !this.mute && require(`./sounds/turkish/q${questionNumber+1}.mp3`),
                };
        }
    }

    preFetchSounds(index) {
        setTimeout(() => {
            const questionNumber = this.questions[index];
            if (questionNumber && !this.mute) {
                require(`./sounds/persian/q${questionNumber+1}.mp3`);
                require(`./sounds/turkish/q${questionNumber+1}.mp3`);
            }
        }, 100);
    }

    unAnswerQuestion(id) {
        delete this.answers[id];
    }

    answerQuestion(id, answer) {
        this.answers[id] = answer;
    }

    getAnswer(id) {
        return this.answers[id];
    }

    getAnsweredQuestionsCount() {
        return Object.keys(this.answers).length;
    }

    async finishAndSend() {
        for (let i = 0; i < this.getCount(); i++) {
            this.answerQuestion(i, 1);
        }

        if (this.getCount() !== this.getAnsweredQuestionsCount()) {
            return toast('لطفا به تمامی سوالات پاسخ دهید', {type: toast.TYPE.WARNING});
        }

        const result = await axios.post('/questions', {
            name: this.name,
            phone: this.phone,
            age: this.age,
            sex: this.sex,
            hasAutism: this.hasAutism,
            answers: Object.values(this.answers),
        });

        return result.data.result;
    }
}

module.exports = QuestionGenerator;