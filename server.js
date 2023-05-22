/* eslint-disable camelcase */
const express = require('express');
const fileUpload = require('express-fileupload');
const xlsx = require('xlsx');
const bodyParser = require('body-parser');
const cors = require('cors');

const Base_url=process.env.Base_url;

const app = express();
const port = process.env.Base_url || 8000;
app.use(fileUpload());

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const excelFile = req.files.file;
  const workbook = xlsx.read(excelFile.data, { type: 'buffer' });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

  res.json({ data: jsonData });
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});