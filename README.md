# SMEME-Server

![image](https://user-images.githubusercontent.com/55437339/212035544-1d89cb8f-c0c3-4c9e-b0a0-087fc925b7cd.png)


### 🛠 Used Stacks
 ![Typescript](https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
 ![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
 ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
 ![PRISMA](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=Prisma&logoColor=white) 
 ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

<br/>

## 👥 팀별 역할 분담

|                **🌏 [김소현](https://github.com/thguss)**                 |                **🌏 [최윤한](https://github.com/unanchoi)**                 |
  |:-----------------------------------:|:-----------------------------------:|
| <img src="https://user-images.githubusercontent.com/81692211/210775327-2b1f663d-4f55-46dd-881a-34c978aa621f.jpg" width="300" height="300" /> |<img src ="https://avatars.githubusercontent.com/u/81692211?v=4" width="300" height="300" /> |
|                                 서버 개발자                                  |                                 서버 개발자                                 |
|        프로젝트 세팅<br />서버 배포<br />DB 설계<br /> Diary, Category, Scrap API 작성<br /> Test Code 작성 <br />        |        프로젝트 세팅<br />서버 배포<br />DB 설계<br >User, Auth, Diary  API 작성<br /> Test Code 작성        |

<br/>

## 📏 Code Convention
- Airbnb의 자바스크립트 style guide를 따른다.
[Airbnb Github](https://github.com/airbnb/javascript)

- husky를 이용하여, commit시에 formatting

<br/>

## 🌴 Commit Convention
- Header를 이용하여 최대한 변경사항을 설명하고, 필요시에 body에 변경사항에 대한 상세 내용을 적는다.

| 태그 이름 | 설명 |
| --- | --- |
| [CHORE] | 코드 수정, 내부 파일 수정 |
| [FEAT] | 새로운 기능 구현 |
| [ADD] | FEAT 이외의 부수적인 코드 추가, 라이브러리 추가, 새로운 파일 생성 |
| [HOTFIX] | issue나 QA에서 급한 버그 수정에 사용 |
| [FIX] | 버그, 오류 해결 |
| [DEL] | 쓸모 없는 코드 삭제 |
| [DOCS] | README나 WIKI 등의 문서 개정 |
| [CORRECT] | 주로 문법의 오류나 타입의 변경, 이름 변경에 사용 |
| [MOVE] | 프로젝트 내 파일이나 코드의 이동 |
| [RENAME] | 파일 이름 변경이 있을 때 사용 |
| [IMPROVE] | 향상이 있을 때 사용 |
| [REFACTOR] | 전면 수정이 있을 때 사용 |

<br/>

## ✨ Branch Strategy

📌 브랜치 단위 <br />
- 브랜치 단위 = 이슈 단위 = PR단위
- 작업이 완료된 브랜치는 develop 브랜치로 merge 한다.
- 서버 배포는 develop에서 main으로 merge후 main에서 진행한다. 

📌 브랜치명
- 브랜치는 뷰 단위로 생성합니다.
- 브랜치 규칙 → name_#이슈번호
- ex) unan_#1, sohyeon_#2

<br/>

## 📃 API 명세서 초안
[API 명세서 Notion](https://carnation-hearing-eb3.notion.site/API-d7387bba98474e63a5085843188e537f )

#### API 로직 구현 진척도 : 100%

<br/>

## 🥫 ERD

<img width="802" src="https://user-images.githubusercontent.com/81692211/210778101-46a8c449-cb02-4879-838e-5c1828af5747.png">

<br/>

## 🗂 프로젝트 폴더 구조

```
3-Layer Architecture 기반

📁 src
|_ 📁 config
|_ 📁 controllers
|_ 📁 interfaces
|_ 📁 modules
|_ 📁 routes
|_ 📁 services
|_ 📁 test
|_ index.ts

```

<br/>

## 🌴 Dependencies Module
<b>package.ts</b>
```
{
  "name": "seminar4",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "dev": "nodemon",
    "build": "tsc",
    "postinstall": "prisma generate",
    "lint": "./node_modules/.bin/eslint .",
    "lint-staged": "lint-staged",
    "start:dev": "node dist/index.js",
    "prepare": "husky install",
    "test": "yarn mocha test/* -r ts-node/register --timeout 10000 -exit"
  },
  "devDependencies": {
    "@types/chai": "^4.3.4",
    "@types/express": "^4.17.14",
    "@types/jsonwebtoken": "^9.0.0",
    "@types/mocha": "^10.0.1",
    "@types/node": "^18.11.9",
    "@types/supertest": "^2.0.12",
    "@typescript-eslint/eslint-plugin": "^5.47.1",
    "@typescript-eslint/parser": "^5.47.1",
    "chai": "^4.3.7",
    "eslint": "^8.30.0",
    "mocha": "^10.2.0",
    "nodemon": "^2.0.20",
    "supertest": "^6.3.3",
    "ts-node": "^10.9.1"
  },
  "dependencies": {
    "@prisma/client": "^4.8.1",
    "axios": "^1.2.2",
    "dayjs": "^1.11.7",
    "dotenv": "^16.0.3",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-prettier": "^4.2.1",
    "express": "^4.18.2",
    "express-validator": "^6.14.2",
    "husky": "^8.0.2",
    "jsonwebtoken": "^9.0.0",
    "lint-staged": "^13.1.0",
    "prettier": "^2.8.1",
    "prisma": "^4.8.1",
    "typescript": "^4.9.4"
  },
  "lint-staged": {
    "*.ts": [
      "eslint --fix"
    ]
  }
}

```

<br/>

## 🏗 Server Architecture
<img width="999" alt="image" src="https://user-images.githubusercontent.com/55437339/211804011-138c6277-bd5c-4832-a9bd-04b8fb670a4c.png">
