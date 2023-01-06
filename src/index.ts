import express, { Request, Response } from "express";
import config from "./config";
import router from "./routers";

const app = express();
const PORT = config.port;

app.use(express.json());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("서버 연결 (CD TEST)");
});

app.listen(PORT, () => {
  console.log(`
        #############################################
            🛡️ Server listening on port: ${PORT} 🛡️
        #############################################
    `);
});

export default app;
