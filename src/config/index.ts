import dotenv from "dotenv";
dotenv.config();

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT as string, 10) as number,

  /**
   * JWT
   */
  jwtSecret: process.env.JWT_SECRET as string,
  jwtAlgo: process.env.JWT_ALGORITHM as string,

  /**
   * Slack
   */
  slackUrl: process.env.SLACK_URL as string,

  /**
   * Test
   */
  testAccessToken: process.env.TEST_ACCESS_TOKEN as string,
};
