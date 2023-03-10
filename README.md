# SMEME-Server

![image](https://user-images.githubusercontent.com/55437339/212035544-1d89cb8f-c0c3-4c9e-b0a0-087fc925b7cd.png)


### ๐  Used Stacks
 ![Typescript](https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
 ![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
 ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
 ![PRISMA](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=Prisma&logoColor=white) 
 ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

<br/>

## ๐ฅ ํ๋ณ ์ญํ  ๋ถ๋ด

|                **๐ [๊น์ํ](https://github.com/thguss)**                 |                **๐ [์ต์คํ](https://github.com/unanchoi)**                 |
  |:-----------------------------------:|:-----------------------------------:|
| <img src="https://user-images.githubusercontent.com/81692211/210775327-2b1f663d-4f55-46dd-881a-34c978aa621f.jpg" width="300" height="300" /> |<img src ="https://avatars.githubusercontent.com/u/81692211?v=4" width="300" height="300" /> |
|                                 ์๋ฒ ๊ฐ๋ฐ์                                  |                                 ์๋ฒ ๊ฐ๋ฐ์                                 |
|        ํ๋ก์ ํธ ์ธํ<br />์๋ฒ ๋ฐฐํฌ<br />DB ์ค๊ณ<br /> Diary, Category, Scrap API ์์ฑ<br /> Test Code ์์ฑ <br />        |        ํ๋ก์ ํธ ์ธํ<br />์๋ฒ ๋ฐฐํฌ<br />DB ์ค๊ณ<br >User, Auth, Diary  API ์์ฑ<br /> Test Code ์์ฑ        |

<br/>

## ๐ Code Convention
- Airbnb์ ์๋ฐ์คํฌ๋ฆฝํธ style guide๋ฅผ ๋ฐ๋ฅธ๋ค.
[Airbnb Github](https://github.com/airbnb/javascript)

- husky๋ฅผ ์ด์ฉํ์ฌ, commit์์ formatting

<br/>

## ๐ด Commit Convention
- Header๋ฅผ ์ด์ฉํ์ฌ ์ต๋ํ ๋ณ๊ฒฝ์ฌํญ์ ์ค๋ชํ๊ณ , ํ์์์ body์ ๋ณ๊ฒฝ์ฌํญ์ ๋ํ ์์ธ ๋ด์ฉ์ ์ ๋๋ค.

| ํ๊ทธ ์ด๋ฆ | ์ค๋ช |
| --- | --- |
| [CHORE] | ์ฝ๋ ์์ , ๋ด๋ถ ํ์ผ ์์  |
| [FEAT] | ์๋ก์ด ๊ธฐ๋ฅ ๊ตฌํ |
| [ADD] | FEAT ์ด์ธ์ ๋ถ์์ ์ธ ์ฝ๋ ์ถ๊ฐ, ๋ผ์ด๋ธ๋ฌ๋ฆฌ ์ถ๊ฐ, ์๋ก์ด ํ์ผ ์์ฑ |
| [HOTFIX] | issue๋ QA์์ ๊ธํ ๋ฒ๊ทธ ์์ ์ ์ฌ์ฉ |
| [FIX] | ๋ฒ๊ทธ, ์ค๋ฅ ํด๊ฒฐ |
| [DEL] | ์ธ๋ชจ ์๋ ์ฝ๋ ์ญ์  |
| [DOCS] | README๋ WIKI ๋ฑ์ ๋ฌธ์ ๊ฐ์  |
| [CORRECT] | ์ฃผ๋ก ๋ฌธ๋ฒ์ ์ค๋ฅ๋ ํ์์ ๋ณ๊ฒฝ, ์ด๋ฆ ๋ณ๊ฒฝ์ ์ฌ์ฉ |
| [MOVE] | ํ๋ก์ ํธ ๋ด ํ์ผ์ด๋ ์ฝ๋์ ์ด๋ |
| [RENAME] | ํ์ผ ์ด๋ฆ ๋ณ๊ฒฝ์ด ์์ ๋ ์ฌ์ฉ |
| [IMPROVE] | ํฅ์์ด ์์ ๋ ์ฌ์ฉ |
| [REFACTOR] | ์ ๋ฉด ์์ ์ด ์์ ๋ ์ฌ์ฉ |

<br/>

## โจ Branch Strategy

๐ ๋ธ๋์น ๋จ์ <br />
- ๋ธ๋์น ๋จ์ = ์ด์ ๋จ์ = PR๋จ์
- ์์์ด ์๋ฃ๋ ๋ธ๋์น๋ develop ๋ธ๋์น๋ก merge ํ๋ค.
- ์๋ฒ ๋ฐฐํฌ๋ develop์์ main์ผ๋ก mergeํ main์์ ์งํํ๋ค. 

๐ ๋ธ๋์น๋ช
- ๋ธ๋์น๋ ๋ทฐ ๋จ์๋ก ์์ฑํฉ๋๋ค.
- ๋ธ๋์น ๊ท์น โ name_#์ด์๋ฒํธ
- ex) unan_#1, sohyeon_#2

<br/>

## ๐ API ๋ช์ธ์ ์ด์
[API ๋ช์ธ์ Notion](https://carnation-hearing-eb3.notion.site/API-d7387bba98474e63a5085843188e537f )

#### API ๋ก์ง ๊ตฌํ ์ง์ฒ๋ : 100%

<br/>

## ๐ฅซ ERD

<img width="802" src="https://user-images.githubusercontent.com/81692211/210778101-46a8c449-cb02-4879-838e-5c1828af5747.png">

<br/>

## ๐ ํ๋ก์ ํธ ํด๋ ๊ตฌ์กฐ

```
3-Layer Architecture ๊ธฐ๋ฐ

๐ src
|_ ๐ config
|_ ๐ controllers
|_ ๐ interfaces
|_ ๐ modules
|_ ๐ routes
|_ ๐ services
|_ ๐ test
|_ index.ts

```

<br/>

## ๐ด Dependencies Module
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

## ๐ Server Architecture
<img width="999" alt="image" src="https://user-images.githubusercontent.com/55437339/211804011-138c6277-bd5c-4832-a9bd-04b8fb670a4c.png">
