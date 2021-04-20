const express = require('express');
const fs = require('fs');
const path = require('path');
const htmlRoutes = require('./routes/htmlRoutes')  
const apiRoutes = require('./routes/apiRoutes') 

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use('/', htmlRoutes);
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});