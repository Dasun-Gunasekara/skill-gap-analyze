export const adminOnly = (req, res, next) => {
    const role = req.headers["x-role"];

    if (role !== "admin") {
        return res.status(403).json({
            message: "Access denied. Admins only."
        });
    }

    next();
};