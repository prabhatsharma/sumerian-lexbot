var Excel = require('exceljs');
var AWS = require("aws-sdk");

const filename = './Lexbot.xlsx';
var docClient = new AWS.DynamoDB.DocumentClient({region:'us-west-2'});

console.log("Importing excel" + filename + " into DynamoDB. Please wait.");

// read from a file
var workbook = new Excel.Workbook();
workbook.xlsx.readFile(filename)
    .then(function () {
        const worksheet = workbook.getWorksheet('Sheet1');
        const data = worksheet.getSheetValues();
        const columns = [data[1][1], data[1][2], data[1][3], data[1][4], data[1][5], data[1][6], data[1][7]]

        // console.log(columns)
        for (var i = 2; i <= 100; i++) {
            var item = {
                "id": data[i][1],
                "intent": data[i][2],
                "slotname": data[i][3],
                "slotvalue": data[i][4],
                "question": data[i][5],
                "answer": data[i][6],
                "slidetext": data[i][7],
            }
            var params = {
                TableName: "sumerianfaq",
                Item: item
            };

            // console.log(item)

            docClient.put(params, (error, data) => {
                if (error) {
                    console.log("Error occured: ", error)
                } else {
                    console.log("Stored successfully: ", data)
                }
            })
        }
    });