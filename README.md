# 스위치 웹애플리케이션 프로젝트<br>제작 기간 - 2020.12.24~2021.01.17
 
### swichee Backend 레포입니다.(김가은👧🏻,김윤직🧑🏻)
### swichee Frontend 레포 👉🏻 https://github.com/rovin0805/Swichee_Frontend.git
### EC2환경에서 제작 / RDS(MySQL) 사용 / 이미지 서버로 S3 사용 / Domain Route53 이용 <br> 백언어 node.js(express 이용) / 프로트언어 react,CSS / 협업 관리 git 



### 🎅21.01.09
- 댓글 완료
- 홈화면 댓글contents table 컬럼 댓글개수 추가
- Trending 추가(today_views 증가)<br>->1시간 동안의 조회수로 인기TOP 12 선정 후 데이터 전송.
- 대댓글 완료
- 사이드바 완료<br>

### 😎21.01.10
- 카테고리 추천 수정(자기 자신은 추천 안하도록->URL의 파라미터 id도 추가)
- 분실된 데이터 수정(댓글의 blue)
- 댓글 테이블에 대댓글 개수 컬럼 추가

현재 cronjob 진행중🦍

<b>[구현된 홈화면]</b>

![web_home](https://user-images.githubusercontent.com/31676033/104091185-2f41ba80-52bf-11eb-8120-f79e630cf744.png)


