const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router');
const { default: mongoose } = require('mongoose');

app.use(cors());
app.use(express.json())

const port = process.env.PORT || 3000;

mongoose.connect(process.env.DB_URL)
    .then(() => console.log('database connect successfully'))
    .catch((err) => console.log(err))

app.use('/api', router)

app.get('/', (req, res) => {
    res.status(200).json({
        massage: 'data get successfully',
    })
})

app.listen(port, () => {
    console.log('server is ruing');
})