# Inventory-Management

[![Build Status](https://travis-ci.com/SeonHyungJo/YourHome.svg?branch=dev)](https://travis-ci.com/SeonHyungJo/YourHome) [![GitHub issues](https://img.shields.io/github/issues/SeonHyungJo/YourHome.svg)](https://github.com/SeonHyungJo/YourHome/issues)
[![GitHub stars](https://img.shields.io/github/stars/SeonHyungJo/YourHome.svg)](https://github.com/SeonHyungJo/YourHome/stargazers)
[![GitHub license](https://img.shields.io/github/license/SeonHyungJo/YourHome.svg)](https://github.com/SeonHyungJo/YourHome/blob/master/LICENSE)

Inventory Management for ImHome developed with React and Express

## Branch 관리

Main branch

-   master
    -   server : express 용
    -   front : react 용
    -   docs : main 문서 작성용
    -   issue : issue 처리용

Sub branch : 자신의 이름(Id)로 한다.

ex)

```cmd
// front 작업을 할 경우
> git checkout front // front branch로 이동
> git branch -v // 브랜치 이동 확인
> git checkout -b your_name || your_id //자신의 이름 또는 아이디로 생성

... // 작업

> git commit -m "comments" // commit
> git push origin your_name || your_id// push

//이후 merge작업은 회의후 진행
```

[pull request 방법](https://wayhome25.github.io/git/2017/07/08/git-first-pull-request-story/)

## 커밋 메시지 작성법

commit 은 무조건 title 별로 한다.

```md
:house: Your_name / Type / Detail Comment

ex) :house: seonhyungjo / docs / 형상관리 테스트 진행
```

### Type 정의

-   feat: 새로운 기능을 추가할 경우
-   fix: 버그를 고친 경우
-   docs: 문서 수정한 경우
-   style: 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우
-   refactor: 프로덕션 코드 리팩터링
-   test: 테스트 추가, 테스트 리팩터링 (프로덕션 코드 변경 없음)

## Front 기본 셋팅 진행(2018-10-16)

-   CRA v2 진행(즉 babel7 이 적용되었음 또한 브라우저 지정가능)
-   package.json 내부 eslint 설정 (airbnb-eslint 적용)
-   sass 적용 : 우리가 사용하는 것은 엄밀히 따지면 scss
-   gitignore : build 폴더 추가

## Server 기본 셋팅 진행(2018-10-17)

-   Express 로 진행
-   package.json 및 Heroku 설정 진행
-   Heroku 에서 Node.js 와 MongoDB 설치 => https://poiemaweb.com/nodejs-heroku

### Heroku server 올리기

1. [Heroku CLI 설치하기](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)
2. 로그인하기

```cmd
heroku login
Email : email
password : password
```

3. remote 생성

```cmd
// ./server 내부에서
git remote add heroku https://git.heroku.com/imhome-server.git
```

1. add & commit(위와 동일하게 진행)
2. push

```cmd
// ./server 내부에서
git push heroku master
```

6. 열어보기

```cmd
heroku open
```

### 브랜치 관리 방법 공유

깃허브 - master, dev
master : 언제든 배포가능한 수준의 완벽한 소스만 머지
dev : 각자 작업한 소스를 여기에 바로 커밋

작업 순서 :

1. dev브랜치를 받고 본인의 로컬 브랜치를 만든다.
2. 각자 로컬 브랜치에서 작업한다
3. 작업이 끝나면 dev브랜치로 다시 이동
4. git rebase 자신의 브랜치
5. git push origin dev


## Issue 등록하기

1. github내에 있는 issue에 등록 진행
2. 형식에 맞게 작성하고 등록하기 
3. 우측에 위치한 할당자, 라벨 같이 등록하기

## Issue 처리하기

이슈처리 브랜치 형식 :point_right: 예시 `YH-01`

1. 이슈에 있는 번호에 맞는 브랜치를 만든다

```cmd
git checkout -b YH-Number
```

2. 이슈 처리하기
3. 커밋하기
4. dev에 머지 시키기
   
```cmd
git checkout dev
git merge YH-Number --no-ff 
git push origin dev
```

머지를 하되 브랜치 구분을 위해서 `--no-ff` 옵션추가


