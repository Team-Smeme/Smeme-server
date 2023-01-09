import app from "../src/index";
import req from "supertest";
import dotenv from "dotenv";
import config from "../src/config";

dotenv.config();

let diaryId = -1;

describe("Diary Test", () => {
  it("일기 작성 성공", (done) => {
    req(app)
      .post("/api/v1/diaries")
      .set("Content-Type", "application/json")
      .set({ Authorization: `Bearer ${config.testAccessToken}` })
      .send({
        content: "Hello, I'm a server developer of the smeme!",
        targetLang: "en",
        topicId: 0,
        isPublic: true,
      })
      .expect(201)
      .expect("Content-Type", /json/)
      .then((res) => {
        diaryId = res.body.data.diaryId;
        done();
      })
      .catch((err) => {
        console.error("=== Error === \n", err);
        done(err);
      });
  });

  it("게시판 조회 성공", (done) => {
    req(app)
      .get("/api/v1/diaries")
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

  it("게시판 일기 상세 조회 성공", (done) => {
    req(app)
      .get(`/api/v1/diaries/${diaryId}`)
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

  it("일기 수정 성공", (done) => {
    req(app)
      .put(`/api/v1/diaries/${diaryId}`)
      .set("Content-Type", "application/json")
      .set({ Authorization: `Bearer ${config.testAccessToken}` })
      .send({
        content: "Hi, I'm a server developer of the smeme!",
        targetLang: "en",
        topicId: 0,
        isPublic: false,
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

  it("일기 좋아요 성공", (done) => {
    req(app)
      .post("/api/v1/diaries/like")
      .set("Content-Type", "application/json")
      .set({ Authorization: `Bearer ${config.testAccessToken}` })
      .send({
        diaryId: diaryId,
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

  it("게시판 삭제 성공", (done) => {
    req(app)
      .delete(`/api/v1/diaries/${diaryId}`)
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

export default {
  diaryId,
};
