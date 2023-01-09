import app from "../src/index";
import req from "supertest";
import dotenv from "dotenv";
import config from "../src/config";
import diary from "./diary.spec";

dotenv.config();

let scrapId = -1;

describe("Scrap Test", () => {
  it("구문 스크랩 성공", (done) => {
    req(app)
      .post("/api/v1/scraps")
      .set("Content-Type", "application/json")
      .set({ Authorization: `Bearer ${config.testAccessToken}` })
      .send({
        diaryId: diary.diaryId,
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

  it("구문 스크랩 리스트 조회 성공", (done) => {
    req(app)
      .get("/api/v1/scraps")
      .set("Content-Type", "application/json")
      .set({ Authorization: `Bearer ${config.testAccessToken}` })
      .expect(200)
      .expect("Content-Type", /json/)
      .then(() => {
        done();
      })
      .catch((err) => {
        console.error("=== Error === \n", err);
        done(err);
      });
  });

  it("구문 스크랩 삭제 성공", (done) => {
    req(app)
      .delete(`/api/v1/scraps/${scrapId}`)
      .set("Content-Type", "application/json")
      .set({ Authorization: `Bearer ${config.testAccessToken}` })
      .expect(200)
      .expect("Content-Type", /json/)
      .then(() => {
        done();
      })
      .catch((err) => {
        console.error("=== Error === \n", err);
        done(err);
      });
  });
});
