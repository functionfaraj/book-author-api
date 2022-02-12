import mongoose from "mongoose";
require('dotenv').config();
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${encodeURIComponent(process.env.DB_PASSWORD)}@${process.env.DB_HOST}/${process.env.DB_NAME}`;
let connectionInitialized = false;
function connect() {
    mongoose.connect(uri, {
        auto_reconnect: true,
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
}
function initMongoConnection() {
    return new Promise((resolve) => {
        if (mongoose.connection.readyState === 1) {
            return resolve();
        }
        connect();
        mongoose.connection.on('connected', function () {
        });
        mongoose.connection.on('error', function (error) {
            console.log(`Error connecting to ${uri}`, error);
        });
        mongoose.connection.once('open', function () {
            connectionInitialized = true;
            resolve();
        });
        mongoose.connection.on('reconnected', function () {
        });
        mongoose.connection.on('disconnected', function () {
            console.log('MongoDB disconnected!');
            if (!connectionInitialized) {
                setTimeout(() => connect(), 3000);
            }
        });
    });
}
function closetMongoConnection() {
    return new Promise((resolve, reject) => {
        if (mongoose.connection.readyState) {
            mongoose.connection.close((error) => {
                if (error) {
                    console.log(`Error closing mongo connection`, error)
                    return reject(error);
                }
            });
        }
        console.log('Mongo connection closed!');
        resolve();
    });
}
export default { closetMongoConnection, initMongoConnection };