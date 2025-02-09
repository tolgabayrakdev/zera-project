import jwt from "jsonwebtoken";

export default class Helper {

    generateAccessToken(payload: object) {
        return jwt.sign(payload, process.env.JWT_SECRET as string || "JWT_KEY", { expiresIn: '30min' });
    }

    generateRefreshToken(payload: object) {
        return jwt.sign(payload, process.env.JWT_SECRET as string || "JWT_KEY", { expiresIn: '7d' });
    }

    decodeToken(token: string) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET as string || "JWT_KEY");
        } catch (error) {
            throw new Error('Error!, Token has not decoded!');

        }
    }

}