import { JwtTokens } from "../interfaces";

export const signUp = async (
  email: string,
  password: string
): Promise<JwtTokens> => {
  return {
    accessToken: "",
    refreshToken: "",
  };
};
