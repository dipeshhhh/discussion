const mongoose = require('mongoose');

const DB_Name = 'Discussion'

/*

Local link and Atlas for mongoDB connection

mongodb+srv://nitin_sain:kSKtOVn6IDhkUw6k@cluster0.in5oyac.mongodb.net 

mongodb://0.0.0.0:27017/Discussion

${process.env.DATABASE}
*/
// 

const connectDb = async ()=>{
    try {
        await mongoose.connect(`${process.env.DATABASE}`).then((resp)=>{
            console.log('connected',resp.connection.host)
        })
       
    } catch (error) {
        console.error('Error',error)
        process.exit(1)
    }
}

module.exports = connectDb

// const db = 'mongodb+srv://discussion:Nitinsain@2004@cluster0.e7euu.mongodb.net/ICARChat?retryWrites=true&w=majority';
// mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
// console.log('Db connceted suffuly')
// }).catch((err)=>{console.log('err',err.message)});