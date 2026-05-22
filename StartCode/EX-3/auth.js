const VALID_API_TOKEN = "xyz123";

const authenticate = (req, res, next) => {
    const { token } = req.query;

    if (!token || token !== VALID_API_TOKEN) {
        return res.status(401).json({
            error: "Unauthorized: Missing or invalid API token"
        });
    }

    next();
};

export default authenticate;