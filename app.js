const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./models/index');
const expressValidator = require('express-validator');

require('dotenv').config();



db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

const authRoutes = require('./routes/auth');
const stocksRoutes = require('./routes/stock');



app.use(express.json({
  extended: false
}));

//middlewares
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cors());

//routes middlewares
app.use('/api', authRoutes);
app.use('/api/stocks', stocksRoutes);



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server starts on  ${PORT}`));