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

:house: Your_name / Type / Detail Comment

ex) :house: seonhyungjo / docs / 형상관리 테스트 진행

```

### Type 정의

- feat: 새로운 기능을 추가할 경우
- fix: 버그를 고친 경우
- docs: 문서 수정한 경우
- style: 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우
- refactor: 프로덕션 코드 리팩터링
- test: 테스트 추가, 테스트 리팩터링 (프로덕션 코드 변경 없음)
