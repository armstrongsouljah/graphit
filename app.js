require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const {graphqlHTTP}  = require('express-graphql');
const {buildSchema} = require('graphql');
const mongoose = require('mongoose');
const {Event} = require('./models/event')

const app = express();
const events = [];
const {DATABASE_URL} = process.env
app.use(bodyParser.json());

// app.get('/', (req, res, next) => res.json({message: 'Welcome'}))

app.use('/graphql', graphqlHTTP({
 schema: buildSchema(`
    type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
    }

    input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String
    }

    type RootQuery {
       events: [Event!]!
    }

    type RootMutation {
        createEvent(eventInput: EventInput!): Event
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
 `),
 rootValue: {
     events: async () => {
         return await Event.find().exec();
     },

     createEvent: async (args) => {
        //  const event = {
        //      _id: Math.random().toString(),
        //      title: args.eventInput.title,
        //      description: args.eventInput.description,
        //      price: args.eventInput.price,
        //      date: args.eventInput.date
        //  }
        // console.log('Event added ', event);
        // console.log('args ', args)

        const event = new Event({
            title: args.eventInput.title,
             description: args.eventInput.description,
             price: args.eventInput.price,
             date: new Date(args.eventInput.date)
        })

         await event.save()
         return event
     }
 },
 graphiql: true
}))

mongoose.connect(DATABASE_URL, 
        { 
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(app.listen(3000, () => {
            console.log('Server running ');
        }))
        .catch(err => console.error(err));

