import express from 'express'
import bodyParser from 'body-parser'
import fetch from 'node-fetch'
import cors from 'cors';
// Setting up PORT
const port = process.env.PORT || 3400;

const app = express();
app.use(cors('*'));
app.use(bodyParser.urlencoded({ extend: true }));
app.use(bodyParser.json());

app.get('/getInfo/:package', async (req, res) => {
    const response = await fetch(`https://registry.npmjs.org/${req.params.package}/latest`, {
        method: 'GET'
    });
    const result = await response.json();
    if (result === 'Not Found') {
      res.json({ success: false })
    }
    else {
      res.send({ success: true, response: result })
    }
})

app.listen(port, err => {
  if (err) throw err;
  console.log(`Server successfully initialized on PORT ${port}`);
});