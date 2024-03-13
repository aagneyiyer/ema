const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Set up multer for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      const machineId = getMachineId(); // Get the machine ID
      console.log(originalname);
      const originalname = file.originalname.replace(/\s+/g, '-').toLowerCase(); // Normalize filename
      const filename = `${originalname}-${Date.now()}-${machineId}${path.extname(file.originalname)}`;
      console.log(filename);
      cb(null, filename);
    }
  });
  

const upload = multer({ storage: storage });

function getMachineId() {
    
    let machineId = localStorage.getItem('MachineId');
    
    if (!machineId) {
        machineId = 'fail';
    }

    return machineId;
}

// Define a route to handle file uploads
app.post('/uploads', upload.single('audio'), (req, res) => {
  // File has been uploaded, do something with it (save to server, etc.)
  res.send('File uploaded successfully.');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
  
