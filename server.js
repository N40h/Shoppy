const express = require('express');
const cors = require('cors');
const connectDB = require('./Backend/config/db');
const dotenv = require('dotenv').config();
const path = require('path');
const port = process.env.PORT || 5000;

connectDB();

const app = express();

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('Frontend/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, '../Frontend', 'build', 'index.html'));
	});
}

const corsOptions = {
	origin: 'https://shoppy-live.netlify.app',
	credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
	console.log(req.method, req.path);
	next();
});

app.use('/api/shopping-list', require('./Backend/routes/shopping-list.routes'));
app.use('/api/users', require('./Backend/routes/user.routes'));

app.listen(port, () => console.log(`Server listen on port ${port}`));
