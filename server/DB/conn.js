const mongoose = require('mongoose');

const DB =process.env.DATABASE;

console.log(DB);
mongoose.connect(DB)
    .then(() => {
        console.log('connected')
    }).catch((e) => {
        console.log(e)
    })

// const db = 'mongodb+srv://discussion:Nitinsain@2004@cluster0.e7euu.mongodb.net/ICARChat?retryWrites=true&w=majority';
// mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
// console.log('Db connceted suffuly')
// }).catch((err)=>{console.log('err',err.message)});