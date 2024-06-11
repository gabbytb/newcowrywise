module.exports = () => {

    const db = require("./models");
    const mongoose = require("mongoose");
    const { emoji } = process.env;


    try {
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // DATABASE:- Connection
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        const alpha = emoji || " ", beta = db.url ? db.url : " ";
        const URI = alpha+beta;
        mongoose.set("strictQuery", false);
        mongoose.connect(URI);
        console.log("***********************************************",
                    "\n*********     DATABASE CONNECTION     *********",
                    `\n\nConnected to: ${beta}`);
    } catch(error) {
        console.log("Could not connect to database!", error);
    }


    // mongoose.connect(DB_URI)
    // .then(() => console.log("DATABASE:", db.url + "\n***********************************************\n***********************************************\n\n"))
    // .catch((err) => console.error(err));
    // db.mongoose.connection.on('connected', () => {
    //     console.log("DATABASE:", db.url);
    // });
    // db.mongoose.connection.on('open', () => console.log('CONNECTION: Open\n***********************************************\n***********************************************'));
    // db.mongoose.connection.on('disconnected', () => console.log('DATABASE CONNECTION: Disconnected'));
    // db.mongoose.connection.on('reconnected', () => console.log('DATABASE CONNECTION: Reconnected'));
    // db.mongoose.connection.on('disconnecting', () => console.log('DATABASE CONNECTION: Disconnecting'));
    // db.mongoose.connection.on('close', () => console.log('DATABASE CONNECTION: Closed'));
    // db.mongoose.connect(DB_URI);
    // ////////////////////////////////////////////////////////////////////////////////////////////////////////////

};
