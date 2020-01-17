const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/autism', {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {console.log('successfully connect to database')});

const User = mongoose.model('user', {
    username: { type: String, index: true, unique: true },
    name: { type: String },
    email: { type: String, index: true, unique: true },
    password: { type: String },
});

const adminUser = new User({username: 'admin', email: 'admin@autism.com', password: '123456'});
adminUser.save()
    .then(() => console.log('admin user created'))
    .catch(() => {});

module.exports = User;