import app from "../src/index";
import req from "supertest";
import dotenv from "dotenv";
import config from "../src/config";
import diaryId from "./diary.spec";

dotenv.config();

let scrapId;

describe("Scrap Test", () => {
  it("구문 스크랩 성공", (done) => {
    req(app)
      .post("/api/v1/scraps")
      .set("Content-Type", "application/json")
      .set({ Authorization: `Bearer ${config.testAccessToken}` })
      .send({
        diaryId: diaryId,
        paragraph: "paragraph test",
      })
      .expect(201)
      .expect("Content-Type", /json/)
      .then((res) => {
        scrapId = res.body.data.scrapId;
        done();
      })
      .catch((err) => {
        console.error("=== Error === \n", err);
        done(err);
      });
  });
});
