import axios from "axios";
import config from "../config";

export const slack = async (message: string) => {
  try {
    await axios.post(config.slackUrl, { text: message });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const slackMessage = (
  method: string,
  path: string,
  error: any,
  userId?: number,
) => {
  return `[ERROR] [${method}] ${path} ${
    userId ? `[user]: ${userId}` : "no user"
  } ${JSON.stringify(error)}`;
};
