const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

const corsOptions = {
	origin: '*',
	credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
	console.log(req.method, req.path);
	next();
});

app.use('/api/shopping-list', require('./routes/shopping-list.routes'));
app.use('/api/users', require('./routes/user.routes'));

app.listen(port, () => console.log(`Server listen on port ${port}`));
