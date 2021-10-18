module.exports = async function() {
    await new Promise(resolve => global.__MPR__.close(resolve));
};
