const rateLimit = require("express-rate-limit");

// limiting each IP to 10 requests per minute 
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10, // limiting each IP to 10 requests per windowMs
    message: {
        status: 429,
        message: "Too many requests. Please try again later.",
    },
    headers: true, // Show rate limit info in headers
});

module.exports = limiter;
