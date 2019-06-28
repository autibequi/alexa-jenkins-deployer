/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

//======================================================================
// CONFIGURE THIS
//======================================================================
const APP_ID = "";
const JENKINSTOKEN = "";
const JOBNAME = "AlexaDeployer";

'use strict';
const Alexa = require('alexa-sdk');
const Axios = require('axios');
const client = Axios.create({
    baseURL: '',
  });

//======================================================================
// AUX
//======================================================================
const isValid = function (slots) {
    for (var key in slots) {
        if(slots[key]['value'] == undefined){
            return false
        }
    };
    return true;
}

//======================================================================
// Intent Handlers
//======================================================================

const handlers = {
    'LaunchRequest': function () {
        this.emit(":delegate");
    },
    'deploy': function () {
        // Check all values are okay
        if (!isValid(this.event.request.intent.slots)){
            // Request lacking information
            this.emit(":delegate");
        }

        // Everything is okay
        // Make a request to deploy on jenkins
        const branchtext = this.event.request.intent.slots.STORY_ID.value;
        const typetext = this.event.request.intent.slots.TYPE.resolutions.resolutionsPerAuthority[0].values[0].value.name;
        const envtext = this.event.request.intent.slots.ENV.resolutions.resolutionsPerAuthority[0].values[0].value.name;

        client.get('/buildWithParameters', {
            params: {
                job: JOBNAME,
                token: JENKINSTOKEN,
                BRANCH: this.event.request.intent.slots.STORY_ID.value,
                TYPE: this.event.request.intent.slots.TYPE.resolutions.resolutionsPerAuthority[0].values[0].value.id,
                ENV: this.event.request.intent.slots.ENV.resolutions.resolutionsPerAuthority[0].values[0].value.id,
            }
        })
        .then((data) => {
            console.log("HERE WE GO");
            console.log(data);
            this.response.speak(`All Done! Running a ${typetext} deploy of the story ${branchtext} on ${envtext}`);
            this.emit(':responseReady');
        })
        .catch((err) => {
            console.log("DEU RUIM");
            console.log(err.response);

            this.response.speak("Sorry, Jenkins seems to be out of reach. That bastard.");
            this.emit(':responseReady');
        })
    },
    'AMAZON.HelpIntent': function () {
        this.response.speak("Sure, what do you need?");
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak("Are you sure?");
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak("Okay! Done!");
        this.emit(':responseReady');
    },
};

//======================================================================
// Lambda Function Export
//======================================================================

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
