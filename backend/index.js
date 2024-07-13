import express from 'express';
const app = express();

app.get('/', (req,res)=>{
    res.send('Hello World');
});

const port = process.env.PORT || 3001;
app.listen(port,()=>{
    console.log('Connected BE to 3001');
});