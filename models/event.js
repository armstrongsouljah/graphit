const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema =  new Schema ({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    date: {type: Date }
});

const Event = mongoose.model('Event', eventSchema, 'events')

module.exports = {
    Event
}