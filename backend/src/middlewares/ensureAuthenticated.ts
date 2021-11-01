import { verify } from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const access_token = request.headers.authorization // -> Bearer {token}

  if (!access_token) {
    return response.status(401).json({ error: "token.required" })
  }

  const [, token] = access_token.split(" ") // -> {token}

  try {
    const { sub } = verify(token, process.env.JWT_SECRET_KEY)

    request.user_id = sub

    return next()
  } catch (error) {
    return response.status(401).json({ error: "token.invalid" })
  }
}
