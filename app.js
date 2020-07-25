const expres = require('express');
const bodyParser = require('body-parser');
const {graphqlHTTP}  = require('express-graphql');
const {buildSchema} = require('graphql');

const app = expres();

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
    type RootQuery {
       events: [Event!]!
    }

    type RootMutation {
        createEvent(name: String!): String
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
 `),
 rootValue: {
     events: () => {
         return ['All night coding', 'Night in the stars', 'Unleash the coder in you!']
     },

     createEvent: (args) => {
         const eventName = args.name;
         return eventName;
     }
 },
 graphiql: true
}))
app.listen(3000, () => {
    console.log('Server running');
})