import { JwtTokens } from "../interfaces";

export const signIn = async (
  email: string,
  password: string
): Promise<JwtTokens> => {
  return {
    accessToken: "fd",
    refreshToken: "fd",
  };
};
