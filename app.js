const express = require('express');
const app = express();

const path = require('path');

const fs = require('fs');
const Record = require('./Record.js');


app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));

app.listen(8080, () => {
    console.log('TimeRecorder running on port 8080...');
    // Do startup checks, file exists, opening and processing...
    checkOnStartup();
});

app.get('/', (req,res) => {
    //UI.displayRecords();

    res.render(__dirname+'/views/index', {"data":[
        {"clockIn": "8:00", "clockOut":"16:00"},
        {"clockIn": "8:00", "clockOut":"16:00"}
    ]});

});

let datetime = new Date();
console.log(`${datetime.getFullYear()}-${datetime.getMonth()+1}-${datetime.getDate()}`);


function checkOnStartup(){
    console.log('Checking if database exists locally.')
    let dbPath = __dirname+'/DB/database.JSON';
    fs.access(dbPath, (err) => {
        if (err){
            // CREATE NEW DATABASE FILE
            console.log('No Database found, creating a new one...')
            createNewDatabaseFile(dbPath);
            return;
        }
        else{
            console.log('Database found. Processing data.');
            processDatabaseFile(dbPath);
            return;
        }
    });
}

function createNewDatabaseFile(path){
    fs.writeFile(path,'data', (err) => {
        if(err) throw err;
        console.log('Database file created succesfully.');
    });
}

function processDatabaseFile(path){
    fs.readFile(path, (err, data) =>{
        if (err) throw err;
        let body = JSON.parse(data);
        console.log(body);
        console.log(body["2019"]);
    })
}

// UI Class : Handle UI tasks
class UI {
    static displayRecords() {
        const StoredRecords = [
            {
                recordDate: "2019-01-10",
                clockIn: "7:40",
                clockOut: "16:00"
            },
            {
                recordDate: "2019-01-11",
                clockIn: "7:40",
                clockOut: "16:00"
            }
        ];

        const createdRecords = StoredRecords;
        
        //createdRecords.forEach((record) => UI.addRecordToList(record));  
        for (let i = 1; i <= 31; i++) {
            let record = new Record(`2019-01-${i}`, '8:00', '16:00');
            //UI.addRecordToList(record);
            //UI.submitEdit();
            console.log(JSON.stringify(record));
        } //*/
    }

    static addRecordToList(record) {
        const list = document.querySelector('#record-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${record.recordDate}</td>
            <td contenteditable='true' id="cellIn">${record.clockIn}</td>
            <td contenteditable='true' id="cellOut">${record.clockOut}</td>
            <td>TODO:Calculate</td>
            <td>TODO:Calculate</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row); // Add row container element to HTML 
        UI.submitEdit(row);
    }

    static clearFields() {
        document.querySelector('#date').value = '';
        document.querySelector('#in').value = '';
        document.querySelector('#out').value = '';
    }

    static clearRecord(target) {
            target.parentElement.parentElement.children[1].innerHTML = '';
            target.parentElement.parentElement.children[2].innerHTML = '';
            target.parentElement.parentElement.children[3].innerHTML = '';
            target.parentElement.parentElement.children[4].innerHTML = '';
    };

    static submitEdit(targetContainer) {
        // Recalculate Gross and Net presence time
        const localRecord = new Record(targetContainer.children[0].innerHTML,targetContainer.children[1].innerHTML,targetContainer.children[2].innerHTML);
        targetContainer.children[3].innerHTML = `${localRecord.getHourDiff()}`;
        targetContainer.children[4].innerHTML = `${localRecord.getNetDiff()}`;
        console.log('Submit Event');
    };
}
// Store class: Handles storage

// Event: Display stuff
//document.addEventListener('DOMContentLoaded', UI.displayRecords);

// Event: Add record
// document.querySelector('#record-form').addEventListener('submit', (e) => {
//     e.preventDefault();

//     //Get form values
//     const date = document.querySelector('#date').value;
//     const intime = document.querySelector('#in').value;
//     const outtime = document.querySelector('#out').value;

//     // Instantiate Record();
//     const record = new Record(date, intime, outtime);

//     // Add record to list
//     UI.addRecordToList(record);

//     // Clear fields
//     UI.clearFields();
// });

// Event: Edit record
// document.querySelector('#record-form').addEventListener('keypress', (e) => {
//     if (e.which === 13) {
//         e.preventDefault();
//         UI.submitEdit(e.target.parentElement);
//     };
// })
// // Event: Clear record [X]
// document.querySelector('#record-list').addEventListener('click', (e) => {
//     e.preventDefault();
//     if (e.target.classList.contains('delete')) {
//         UI.clearRecord(e.target);
//     };
//     console.log(e.target);
// })



