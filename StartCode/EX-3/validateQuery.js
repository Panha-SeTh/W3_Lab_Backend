const validateQuery = (req, res, next) => {
    const { minCredits, maxCredits } = req.query;
    let parsedMin, parsedMax;

    if (minCredits !== undefined) {
        parsedMin = Number(minCredits);
        if (!Number.isInteger(parsedMin)) {
            return res.status(400).json({
                error: "Bad Request: 'minCredits' must be a valid integer"
            });
        }
    }

    if (maxCredits !== undefined) {
        parsedMax = Number(maxCredits);
        if (!Number.isInteger(parsedMax)) {
            return res.status(400).json({
                error: "Bad Request: 'maxCredits' must be a valid integer"
            });
        }
    }

    if (parsedMin !== undefined && parsedMax !== undefined) {
        if (parsedMin > parsedMax) {
            return res.status(400).json({
                error: "Bad Request: 'minCredits' cannot be greater than 'maxCredits'"
            });
        }
    }

    next();
};

export default validateQuery;