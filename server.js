const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();

const PORT = 1200;

app.use(bodyParser.json());

app.use(cors());

app.get('/', (req, res) => {

    res.send('Server Running');

});

app.post('/submit-application', async (req, res) => {

    console.log(req.body);

    const data = req.body;

console.log(data);

    try {

        const data = req.body;

        const sql = `
INSERT INTO register
(Name,rollnumber,Branch,Year,Email,Contact,Preference,Interest)
VALUES(?,?,?,?,?,?,?,?)
`;

await db.execute(sql,[

    data.name,
    data.rollnumber,
    data.branch,
    data.year,
    data.email,
    data.contact,
    data.preference,
    data.reason

]);

        res.status(200).json({

            status: 200,

            message: 'Application Submitted Successfully'

        });

    }

   catch (err) {

    console.log("========== DATABASE ERROR ==========");
    console.log(err);

    res.status(500).json({
        status: 500,
        message: err.message
    });

}
});

app.get('/getApplications', async (req, res) => {

    try {

        const [rows] = await db.execute(
            "SELECT * FROM register"
        );

        res.status(200).json({
            status: 200,
            data: rows
        });

    } catch (err) {

        console.log("========== DATABASE ERROR ==========");
        console.log(err);

        res.status(500).json({
            status: 500,
            message: "Database Error"
        });

    }

});



db.execute("SELECT 1")
.then(() => console.log("✅ Database Connected"))
.catch(err => console.log(err));
app.listen(PORT, () => {

    console.log('Server running on localhost:' + PORT);

});