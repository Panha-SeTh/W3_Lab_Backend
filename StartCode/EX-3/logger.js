const logger = (req, res, next) => {

    const method = req.method;
    const path = req.path;
    const queryParams = req.query;
    const timestamp = new Date().toISOString();

    console.log(`[${timestamp}] ${method} ${path}`);
    console.log('Query Parameters:', queryParams);
    console.log('---');

    next();
};

export default logger;