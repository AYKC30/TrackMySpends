const errorHandler = (err, req, res, next)=>{
    const statusCode = res.statusCode === 200?500:res.statusCode; // 500 is default
    res.status(statusCode); // set the status code

    res.json({
        message: err.message,
        stack: err.stack,
    });
};
module.exports = errorHandler;