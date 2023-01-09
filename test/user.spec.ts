import app from "../src/index";
import req from "supertest";
import dotenv from "dotenv";
import config from "../src/config";

dotenv.config();

describe("User Test", () => {
  it("회원가입 성공", (done) => {
    req(app)
      .patch("/api/v1/users")
      .set("Content-Type", "application/json")
      .set({ Authorization: `Bearer ${config.testAccessToken}` })
      .send({
        username: "스밈",
        bio: "스밈에 스며들다",
      })
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

  it("마이페이지 조회 성공", (done) => {
    req(app)
      .get("/api/v1/users")
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

  it("내 일기 리스트 조회 성공", (done) => {
    req(app)
      .get("/api/v1/users/diaries")
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

  it("내 일기 상세 조회 성공", (done) => {
    const diaryId = 0;
    req(app)
      .get(`/api/v1/users/diaries/${diaryId}`)
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
