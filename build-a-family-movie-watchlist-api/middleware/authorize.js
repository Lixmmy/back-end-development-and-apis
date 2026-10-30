export function authorizeModification(req, res, next) {
    const userRole = req.user?.role;
    const userId = req.user?.id;
    const targetUserId = req.params?.userId;

    if (userRole === "parent") {
        return next();
    }

    if (userRole === "child" && String(userId) === String(targetUserId)) {
        return next();
    }

    return res.status(403).json({ error: "Access denied" });
}