const dotenv=require('dotenv');

dotenv.config({
    path: './config.env'
});
const mongoose= require('mongoose');
process.on('uncaughtException',err=>{
    console.log(err.name, err.message);
    console.log("Unhandled Rejection! Shutting down server");
    process.exit(1);
})
const app=require('./app');

console.log(process.env.NODE_ENVIRO);
// console.log(app.get('env'));
mongoose.connect(process.env.CONN_STR,{
}).then((conn)=>{
    console.log("DB connection successful")
})


//Create Server
const port= process.env.port || 3000;

const server=app.listen(port,()=>{
    console.log("Server has started");
})


process.on('unhandledRejection',err=>{
    console.log(err.name, err.message);
    console.log("Unhandled Rejection! Shutting down server");
    server.close(()=>{
        process.exit(1);
    })
})
