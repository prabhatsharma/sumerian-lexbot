var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient({
    region: 'us-west-2'
});

exports.handler = (event) => {
    const intent = event.currentIntent.name;
    var slotname = '';
    for (var slot in event.currentIntent.slots) {
        slotname = slot;
    }
    const slotvalue = event.currentIntent.slots[slotname];

    var params = {
        TableName: 'sumerianfaq',
        FilterExpression: 'intent = :this_intent AND slotname=:this_slotname AND slotvalue=:this_slotvalue',
        ExpressionAttributeValues: {
            ':this_intent': intent,
            ':this_slotname': slotname,
            ':this_slotvalue': slotvalue,
        },
    };

    var response = {
        "sessionAttributes": {},
        "dialogAction": {
            "type": "Close",
            "fulfillmentState": "Fulfilled",
            "message": {
                "contentType": "PlainText",
                "content": "Could not find values in dynamodb for intent: " + intent + ", slot: " + slotname + ', slotvalue: ' + slotvalue
            }
        }
    }

    return new Promise((resolve, reject) => {
        docClient.scan(params, (err, data) => {
            if (err) {
                console.log(err)
                response.dialogAction.message.content = err
            } else if(data.Count !== 0){
                console.log(data)
                response.dialogAction.message.content = data.Items[0].answer
            }
            resolve(response)
        });
    })
};