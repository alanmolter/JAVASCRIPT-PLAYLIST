const mongoose = require('mongoose');

const musicShema = new mongoose.Schema({

    name: {
        type: 'string',
        require: true,
    },

    author: {
        type: 'string',
        require: true,
    },

    linkImage: {
        type: 'string',
        require: true,
    },

    linkMusic: {
        type: 'string',
        require: true,
    }


});

module.exports = mongoose.model("Music", musicShema);