const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/autism', {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {console.log('successfully connect to database')});

const Message = mongoose.model('message', {
    from: { type: String, required: true, index: true },
    to: { type: String, required: true, index: true },
    text: { type: String, required: true,},
    time: { type: Date, required: true, default: Date.now }
});

module.exports = Message;