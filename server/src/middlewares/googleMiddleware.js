import { OAuth2Client } from "google-auth-library";

export const GoogleProtect = async (req, res, next) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      const error = new Error("Google ID token is required");
      error.statusCode = 401;
      return next(error);
    }

    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload?.email || !payload?.sub) {
      const error = new Error("Invalid Google account");
      error.statusCode = 401;
      return next(error);
    }

    req.googleUser = {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      imageUrl: payload.picture,
    };

    next();
  } catch (error) {
    console.error("Google verification failed:", error.message);

    const err = new Error("Invalid Google token");
    err.statusCode = 401;
    next(err);
  }
};