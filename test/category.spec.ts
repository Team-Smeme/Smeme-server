import app from "../src/index";
import req from "supertest";
import dotenv from "dotenv";
import config from "../src/config";

dotenv.config();

describe("Category Test", () => {
  it("랜덤 주제 조회 성공", (done) => {
    req(app)
      .get("/api/v1/categories/topic")
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

  it("카테고리 전체 조회 성공", (done) => {
    req(app)
      .get("/api/v1/categories")
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
