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

    docClient.scan(params, (err, data) => {
        console.log(data)
        return data
        // return new Promise((resolve, reject) => {
        //     if(err){
        //         reject(err)
        //     } else {
        //         resolve(data)
        //     }  
        // })
    });
};