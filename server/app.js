const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router');

app.use(cors());
app.use(express.json())

const port =3000;

app.use('/api', router)

app.get('/',(req, res)=>{
    res.status(200).json({
        massage: 'data get successfully',
    })
})

app.listen(port, ()=>{
    console.log('server is ruing');
})