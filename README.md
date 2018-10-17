# Inventory-Management

Inventory Management for ImHome developed with React and Express

## Branch관리

Main branch

- master
    - server : express용
    - front : react용
    - docs : main문서 작성용
    - issue : issue처리용

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

commit은 무조건 titile별로 한다.

```md

> Your_name / Type / Detail Comment

ex) seonhyungjo / docs / 형상관리 테스트 진행

```

### Type 정의

- feat: 새로운 기능을 추가할 경우
- fix: 버그를 고친 경우
- docs: 문서 수정한 경우
- style: 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우
- refactor: 프로덕션 코드 리팩터링
- test: 테스트 추가, 테스트 리팩터링 (프로덕션 코드 변경 없음)

## Front 기본 셋팅 진행(2018-10-16)

- CRA v2 진행(즉 babel7이 적용되었음 또한 브라우저 지정가능)
- package.json 내부 eslint설정 (airbnb-eslint 적용)
- sass 적용 : 우리가 사용하는 것은 엄밀히 따지면 scss
- gitignore : build 폴더 추가

## Server 기본 셋팅 진행(2018-10-17)

- Express로 진행
- package.json 및 Heroku 설정 진행
- Heroku에서 Node.js와 MongoDB설치 => https://poiemaweb.com/nodejs-heroku

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
