module.exports = {
    randomOrder: function () {
        return new Date().getTime() + Math.round(Math.random() * 10000);
    }
};
