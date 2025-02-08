import jwt from "jsonwebtoken";

export default class Helper {

    generateAccessToken(payload: object) {
        return jwt.sign(payload, process.env.JWT_SECRET as string || "JWT_KEY", { expiresIn: '30min' });
    }

    generateRefreshToken(payload: object) {
        return jwt.sign(payload, process.env.JWT_SECRET as string || "JWT_KEY", { expiresIn: '7d' });
    }

}