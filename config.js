"use strict";

module.exports = {
    mongo_address: function() {
        return process.env.mongo_address === "localhost" ? "mongodb://localhost:27017/test" : "mongodb://db/test";
    }
};
