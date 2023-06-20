const express = require('express');
const connectToMongo = require("./db");
connectToMongo();
var cors = require('cors')

const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contacts');

const app = express();
app.use(cors())
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', contactRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
