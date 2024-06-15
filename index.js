const dialogflow = require('@google-cloud/dialogflow');
const { WebhookClient, Suggestion } = require('dialogflow-fulfillment');
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 7000;

app.post("/webhook", async (req, res) => {
    const agent = new WebhookClient({ request: req, response: res });

    function hi(agent) {
        console.log(`intent => hi`);
        agent.add("Hi from server side!");
    }

    function fallback(agent) {
        console.log(`intent => fallback`);
        agent.add("fallback from server side!");
    }

    function reservation(agent) {
        const { age, budget, name, email, phonenumber  } = agent.parameters;
        
        
          agent.add(`Your booking of a cow, approximately ${age} years old, with a budget of ${budget} has been placed. It will be delivered to under the name of ${name}. Confirmation message has been sent to your email ${email} and your phone number ${phonenumber}. Thanks for buying. `)

    }

    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', hi);
    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('reservation', reservation);
    agent.handleRequest(intentMap);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
