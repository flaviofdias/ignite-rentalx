import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error("Token missing");
  }

  // Desestruturando o authHeader
  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, "742acbb5e4e75f9f0fa4a4e12a0b8b4c");
    console.log(decoded);
  } catch {
    throw new Error("Invalid token!");
  }
}
