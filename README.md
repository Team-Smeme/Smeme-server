# SMEME-Server

## ERD

<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/02764e2e-0034-4e8c-9da9-fff6bb087e80/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230104T114646Z&X-Amz-Expires=86400&X-Amz-Signature=1c78092ee2106f68c230736897b18decb1db749da1915148bae29ec4dc46cc63&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject" />

# 팀별 역할 분담

|                **🌏 [김소현](https://github.com/thguss)**                 |                **🌏 [최윤한](https://github.com/unanchoi)**                 |
  |:-----------------------------------:|:-----------------------------------:|
| [![FVCproductions](https://avatars.githubusercontent.com/u/55437339?v=4)]() |[![FVCproductions](https://avatars.githubusercontent.com/u/81692211?v=4)]() |
|                                 서버 개발자                                 |                                 서버 개발자                                 |
|        프로젝트 세팅<br />서버 배포<br />DB 설계<br /> Diary, Category, Scrap API 작성<br /> Test Code 작성 <br />        |        프로젝트 세팅<br />서버 배포<br />DB 설계<br >User, Auth, Diary  API 작성<br /> Test Code 작성        |

# 🗂 프로젝트 폴더 구조

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
# Code Convention
- Airbnb의 자바스크립트 style guide를 따른다.
[Airbnb Github](https://github.com/airbnb/javascript)

- husky를 이용하여, commit시에 formatting

# Commit Convention
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

# ✨ Branch Strategy

🌴 브랜치 <br />

📌 브랜치 단위 <br />
- 브랜치 단위 = 이슈 단위 = PR단위
- 작업이 완료된 브랜치는 develop 브랜치로 merge 한다.
- 서버 배포는 develop에서 main으로 merge후 main에서 진행한다. 

📌 브랜치명
- 브랜치는 뷰 단위로 생성합니다.
- 브랜치 규칙 → name_#이슈번호
- ex) unan_#1, sohyeon_#2


## API 명세서 초안
[API 명세서 Notion](https://carnation-hearing-eb3.notion.site/API-d7387bba98474e63a5085843188e537f )

#### API 로직 구현 진척도 : 0%