const errorHandler = (err, req, res, next) => {
    console.error(err.stack);///we will see any eeror occur
    res.status(500).json({ error: 'Internal Server Error' });
};

module.exports = errorHandler;
