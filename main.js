const lambda = require('./index');

const event = {
    "currentIntent": {
      "slots": {
        "what": "sumerian"
      },
      "name": "WhatSumerian",
      "confirmationStatus": "None"
    },
    "bot": {
      "alias": "$LATEST",
      "version": "$LATEST",
      "name": "SumerianFAQ"
    },
    "userId": "John",
    "invocationSource": "DialogCodeHook",
    "outputDialogMode": "Text",
    "messageVersion": "1.0",
    "sessionAttributes": {}
  }

lambda.handler(event)