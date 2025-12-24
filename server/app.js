const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const router = require('./router');
const { default: mongoose } = require('mongoose');

app.use(cors());
app.use(express.json())

const port = process.env.PORT || 3000;

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('Database connected successfully');
        app.listen(port, () => {
            console.log('Server is running on', port);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection failed:', err);
    });


app.use('/api', router)

app.get('/', (req, res) => {
    res.status(200).json({
        massage: 'data get successfully',
    })
})

