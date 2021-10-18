const path = require("path");
const dotenv = require("dotenv");
const server = require("../mpr/server");

dotenv.config({ path: path.join(__dirname, ".env") });

module.exports = async function() {
    global.__MPR__ = await server(3001);
};
