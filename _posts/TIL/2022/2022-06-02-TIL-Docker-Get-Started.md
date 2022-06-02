---
layout: post
title: Docker - Get Started 정리(Part 1 ~ 8)
tags: [Docker]
excerpt: "Docker Document - Get Started 정리"
date: 2022-06-02
feature: https://images.velog.io/images/ragnarok_code/post/2e1dae94-5de0-4724-93d0-bb8eb0692b7a/docker_icon.png
comments: true
---

## Docker - Get Started 정리(Part 1 ~ 8)

> [Docker Document - Get Started](https://docs.docker.com/get-started/)

## Part 1: Getting Started

1. Docker 다운로드, 인스톨
2. 튜토리얼 시작, 아래 커맨드 실행

```jsx
docker run -d -p 80:80 docker/getting-started
```

-   실행하면 Docker Dashboard(Mac, Windows 지원)에 새로운 컨테이너가 랜덤한 이름으로 추가됨
    -   `-d` detached mode(백그라운드)로 컨테이너 실행
    -   `-p 80:80` - 호스트의 80포트를 컨테이너의 80포트와 맵핑
        -   `-dp` 로 합쳐서 옵션 사용 가능
    -   `docker/getting-started` - 사용할 이미지

![docker01](https://github.com/younggeun0/younggeun0.github.io/blob/master/_posts/img/docker/01.png?raw=true)

**컨테이너란?**

-   **호스트 기기의 다른 프로세스들과는 분리된 sandboxed 프로세스**로 이미지의 실행가능한 인스턴스
    -   DockerAPI 또는 CLI를 사용해서 컨테이너를 create, start, stop, move, delete할 수 있음
    -   로컬 머신, 가상 머신, 배포된 클라우드 어디서든 실행가능
    -   OS 상관없이 실행 가능(portable)
    -   컨테이너들은 각각 분리돼 컨테이너 스스로의 소프트웨어, 바이너리, 설정 등을 갖고 실행됨

**컨테이너 이미지란?**

-   컨테이너를 실행하면 분리된 파일시스템을 사용하는데 이 **커스텀 파일시스템을 제공하는게 컨테이너 이미지.**
    -   이미지는 컨테이너의 파일 시스템을 제공하기 때문에 이미지는 앱을 실행하기 위한 모든 정보를 담고 있어야 함(모든 dependency들과 설정(configuration), 스크립트, 바이너리 등)
    -   또한 이미지는 환경변수, 기본 실행 커맨드, 다른 메타데이터 등 컨테이너를 위한 다른 설정 정보도 포함함

## Part 2: Sample Application

1\. app clone - [https://github.com/docker/getting-started/tree/master/app](https://github.com/docker/getting-started/tree/master/app)

2-1. 앱의 컨테이너 이미지 빌드

-   앱을 빌드하기 위해선 `Dockerfile`이 필요
    -   Dockerfile은 컨테이너를 생성하기 위한 텍스트기반 설명 스크립트
    -   package.json과 동일한 위치에 `Dockerfile` 생성(확장자 없음)

```docker
# syntax=docker/dockerfile:1
FROM node:12-alpine
RUN apk add --no-cache python2 g++ make
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["node", "src/index.js"]
EXPOSE 3000
```

2-2. `Dockerfile`을 이용해 새 컨테이너 이미지를 만들기 위해 아래 명령어를 실행

```docker
docker build -t getting-started .
```

-   현재 기기엔 node:12-alpine 이미지가 없기 때문에 실행 시 많은 “layers” 다운로드가 수행됨
    -   위 Dockerfile에 명세한 대로 이미지가 다운되면 앱경로로 카피되고 `yarn` dependencies 설치가 수행되고, 이미지로 컨테이너를 실행할 때 실행되는 기본 명령어 CMD가 실행됨
    -   `-t` 는 빌드하는 이미지의 태그를 설정
        -   컨테이너를 실행할 때 이미지를 지칭하기 위함
    -   마지막 `.` 은 현재 디렉토리에서 `Dockerfile` 을 찾으라는 의미

3\. 앱 컨테이너 시작

```docker
docker run -dp 3000:3000 getting-started
```

-   `docker run` 커맨드 뒤에 실행할 이미지를 명시
-   localhost:3000에 접속 시 Todo Node 앱이 배포된 것을 확인할 수 있음

![docker02](https://github.com/younggeun0/younggeun0.github.io/blob/master/_posts/img/docker/02.png?raw=true)

## Part3: Update the application

위 앱에서 경고 메시지를 바꿔 적용시키고자 하는 경우…

1.소스 코드 수정

2.빌드 커맨드 재실행

```bash
docker build -t getting-started .
```

3.새로운 이미지로 컨테이너 실행

```bash
docker run -dp 3000:3000 getting-started
```

-   하면 아래와 같은 에러가 발생
    ⇒ 3000포트에서 실행중인 이전 컨테이너를 제거하고 실행해야 함

```bash
docker: Error response from daemon: driver failed programming external connectivity on endpoint trusting_swartz (11c5faf9edcdb4c48f3513f08e05a4270b432cb5c97c0d440a04815a40af25c3): Bind for 0.0.0.0:3000 failed: port is already allocated.
```

**Old Container 제거**

-   제거하기 위해선 컨테이너를 우선 정지시켜야 함
    -   정지 시키는 방법
        1. CLI를 이용하는 방법
        2. Docker Dashboard를 사용하는 방법

**CLI를 이용한 컨테이너 제거**

1\. `docker ps` 커맨드로 사용중인 컨테이너의 아이디를 조회

```bash
docker ps
```

2\. `docker stop` 커맨드로 컨테이너를 정지시킴

```bash
docker stop <the-container-id>
```

3\. `docker rm` 커맨드로 컨테이너 제거

```bash
docker rm <the-container-id>
```

-   참고로 force 플래그로 **정지, 제거**를 한번에 수행가능

```bash
docker rm -f <the-container-id>
```

**Docker Dashboard를 이용한 컨테이너 제거**

-   Dashboard 컨테이너 우측 휴지통 버튼을 선택해서 컨테이너 제거

## Part4: Share the application

-   만들어진 Docker 이미지는 Docker Hub와 같은 Docker registry를 사용해서 이미지 공유가 가능

1. Docker Hub에 배포 시 로그인 후 레포지토리 생성(이름 getting-started, visiblity: public)
2. (이미지) 태그를 레포지토리에 push하는 커맨드가 표시됨

```bash
docker push <docker-hub-id>/getting-started:tagname
```

**이미지 Push 하기**

1\. 현재 이미지 리스트 확인

```bash
docker image ls
```

2\. DockerHub 로그인

```bash
docker login -u <docker-hub-id>
```

3\. `docker tag` 커맨드로 `getting-started` 이미지에 새 이름을 설정

```bash
docker tag getting-started <docker-hub-id>/getting-started
```

4\. `docker push` 커맨드로 푸시 - Docker Hub에서 값을 카피하는 경우 tagname은 생략가능, 이미지명에 tag를 추가하지 않은 경우 자동으로 `latest`란 태그가 붙음

```bash
docker push <docker-hub-id>/getting-started
```

### 새 인스턴스로 이미지 실행

1\. [https://labs.play-with-docker.com/](https://labs.play-with-docker.com/) 페이지에서 Docker 로그인, `ADD NEW INSTANCE` 클릭
2\. Docker Hub에 올렸던 getting-started 이미지 실행

```bash
docker run -dp 3000:3000 <docker-hub-id>/getting-started
```

3\. 3000버튼 선택, 이미지 실행 페이지가 표시되는걸 확인

**이렇게 이미지를 만들고 Registry에 푸시해서 production 환경이 최신 이미지를 사용하는게 일반적인 CI Pipeline**

## Part5: Persist the DB

**각 컨테이너의 파일시스템(Scartch space, 임시 유저 데이터 저장공간)은 분리돼 있어 동일 이미지 다른 컨테이너엔 영향이 없음**

-   이미지로 실행한 Todo 앱 컨테이너에 기존 Todo 데이터가 유지안되는 이유
-   위 예를 들기 위해 우분투 컨테이너 두개를 실행, 1-10000 사이 난수를 생성해서 /data.txt 로 저장

```bash
docker run -d ubuntu bash -c "shuf -i 1-10000 -n 1 -o /data.txt && tail -f /dev/null"
```

-   실행된 컨테이너에 명령어 실행, cat 명령어로 내용 확인 시 두 컨테이너의 데이터가 다른걸 확인 가능

```bash
docker exec <container-id> cat /data.txt
```

![docker03](https://github.com/younggeun0/younggeun0.github.io/blob/master/_posts/img/docker/03.png?raw=true)

-   그리고 다른 ubuntu 컨테이너를 실행해서 파일시스템이 /data.txt가 있는지 확인해보면 없음

```bash
docker run -it ubuntu ls /
```

**Container Volumes**

![volumes](https://docs.docker.com/storage/images/types-of-mounts-volume.png)

-   **Volumes는 컨테이너 호스트 기기의 특정 파일시스템 경로에 접속하는 기능을 제공**
    -   위 Todo 앱에선 컨테이너 파일시스템 안에 SQLite 데이터베이스(`/etc/todos/todo.db`)를 생성해서 데이터를 저장
        -   SQLite는 데이터를 단일 파일로 저장하는 RDB
    -   SQLite를 사용해 DB가 단일 파일로 관리되므로 이 파일이 호스트에서 유지되면 여러 컨테이너들이 실행돼도 데이터가 유지될 수 있음
-   **두 가지 볼륨**
    -   **named volumes**
        -   named volumes은 단순한 데이터 버켓
        -   도커가 호스트 디스크 내 물리적 위치를 유지(데이터가 저장될 위치를 신경안써도 됨)
    -   **bind mounts**
        -   컨테이너끼리 공유할 호스트의 정확한 마운트 위치를 설정

**named volume 생성, 사용하기**

1\. `docker volume create` 커맨드 실행

```bash
docker volume create todo-db
```

2\. 기존 Todo 앱 컨테이너 제거

3\. `-v` 플래그로 마운트할 볼륨 지정, Todo 앱 컨테이너 실행 - named volume을 `/etc/todos` 에 마운트하고 해당 경로에 생성되는 파일의 변화는 캡쳐됨

```bash
docker run -dp 3000:3000 -v todo-db:/etc/todos getting-started
```

4\. 컨테이너 실행 후 Todo 추가, 다시 컨테이너 제거

5\. 새 컨테이너 실행해도 Todo 내용이 유지되는 것을 확인

**volume 정보 확인**

```bash
docker volume inspect <named 볼륨명>
```

## Part6: Use bind mounts

**bind mounts로 호스트의 정확한 마운트포인트를 설정할 수 있음**

-   데이터를 유지할 뿐만 아니라 추가적인 데이터를 컨테이너에 제공해줄 수 있음
-   **bind mount를 사용하여 소스코드를 컨테이너에 마운트하면 소스의 변경 내용이 컨테이너에 바로 반영됨**
    -   때문에 Local 개발 환경 설정에서 매우 자주 사용됨
    -   노드 기반 앱일 경우 파일 변화가 발생하면 앱을 재시작하는 nodemon을 같이 사용 가능

|                                | Named Volumes             | Bind Mounts                   |
| ------------------------------ | ------------------------- | ----------------------------- |
| Host 위치                      | 도커가 선택               | 유저가 설정                   |
| Mount 예(using -v)             | my-volume:/usr/local/data | /path/to/data:/usr/local/data |
| 컨테이너 내용으로 새 볼륨 추가 | Yes                       | No                            |
| 볼륨 드라이버 지원 여부        | Yes                       | No                            |

**dev-mode 컨테이너 시작하기**

1\. bind mounts를 사용해 소스코드를 컨테이너에 마운트

2\. dependencies 설치(dev dependendies 포함)

3\. 파일 변화를 바로 반영하기 위해 노드몬 실행

```bash
docker run -dp 3000:3000 \
     -w /app -v "$(pwd):/app" \
     node:12-alpine \
     sh -c "yarn install && yarn run dev"
```

-   `-dp 3000:3000` - 백그라운드 실행, 포트 맵핑
-   `-w /app` - 커맨드가 실행될 “작업 폴더(Working Directory)” 또는 현재 디렉토리 설정
-   `-v "$(pwd):/app"` - bind mount, 호스트의 현재 디렉토리를 컨테이너 `/app` 디렉토리와 마운트
    -   호스트의 코드 변경사항이 컨테이너의 /app 에 바로 반영이 됨
-   `node:12-alpine` - 사용할 이미지(Dockerfile에 작성된 앱의 기반 이미지)
-   `sc -c "yarn install && yarn run dev"` - sh를 사용해서 쉘 실행(alpine은 bash가 없음), yarn install로 모든 dependencies 설치, yarn run dev로 package.json에 명시된 nodemon 실행

```bash
# 컨테이너 로그 보기
docker logs -f <container-id>
```

4\. host의 src 내용을 변경하고 [localhost:3000](http://localhost:3000) 페이지를 새로고침을 하면 바로 변경된 내용이 반영됨

## Part7: Multi-container apps

Todo앱에 MySQL을 추가할 때 같은 컨테이너를 사용해야 하나?

**⇒ 컨테이너는 하나의 작업(프로세스) 수행에 적합함**

![두 개의 컨테이너가 동일 네트워크에서 통신](https://docs.docker.com/get-started/images/multi-app-architecture.png)

두 개의 컨테이너가 동일 네트워크에서 통신

**컨테이너 네트워킹**

-   컨테이너들은 개별로 분리돼 있기 때문에 통신 설정(네트워킹)을 해야 함
    -   단, 컨테이너들은 동일 네트워크에 있어야함
-   컨테이너에 네트워크를 설정하는 두 가지 방법
    1. 시작할 때 네트워크 설정
    2. 기존 컨테이너에 네트워크 설정

**MySQL 실행**

1\. 네트워크 생성

```bash
docker network create todo-app
```

2\. 네트워크를 설정하고 MySQL 컨테이너 실행 - `-e` - 환경변수 설정 - `-v todo-mysql-data:/var/lib/mysql` - `todo-mysql-data` 란 볼륨을 사용, MySQL 데이터가 저장될 위치를 `/var/lib/mysql` 로 마운팅 - `docker volume create` 를 수행하지 않더라도 named volume을 사용하면 자동으로 도커가 생성해줌

```bash
docker run -d \
     --network todo-app --network-alias mysql \
     -v todo-mysql-data:/var/lib/mysql \
     -e MYSQL_ROOT_PASSWORD=secret \
     -e MYSQL_DATABASE=todos \
     mysql:5.7
```

3\. 데이터베이스가 실행중인지 확인하기 위해 접속

```bash
docker exec -it <mysql-container-id> mysql -u root -p
```

-   MySQL 쉘에서 `SHOW DATABASES` 를 입력해서 생성된 DB 확인

![docker04](https://github.com/younggeun0/younggeun0.github.io/blob/master/_posts/img/docker/04.png?raw=true)

**MySQL 연결**

-   각 컨테이너는 다른 IP address를 가짐, 이를 확인하기 위해 nicolaka/netshoot 컨테이너를 사용할 것(네트워크 이슈 troubleshooting, debugging 용 컨테이너)

1\. [nicolaka/netshoot](https://github.com/nicolaka/netshoot) 이미지를 이용한 새 컨테이너를 같은 네트워크에 실행

```bash
docker run -it --network todo-app nicolaka/netshoot
```

2\. `dig` 커맨드를 사용해서 `mysql` 을 호스트명으로 갖는 IP 주소를 찾음

```bash
dig mysql
```

![docker04](https://github.com/younggeun0/younggeun0.github.io/blob/master/_posts/img/docker/04.png?raw=true)

-   ANSWER SECTION에 `A` 레코드에 IP주소가 표시됨
    -   `mysql` 은 valid한 호스트명이 아님
        -   도커는 network alias를 갖는 컨테이너의 IP 주소를 알 수 있기 때문에 MySQL 컨테이너 생성할 때 `--network-alias` 를 설정한 것
    -   == network alias로 설정한 `mysql` 란 호스트명으로 앱간 통신이 가능하다는 의미

**Todo 앱과 MySQL 실행**

-   Todo 앱을 MySQL과 연결하기 위해선 몇가지 환경변수 설정이 필요함
    -   `MYSQL_HOST` - 실행중인 MySQL 서버의 호스트명
    -   `MYSQL_USER` - 연결을 위한 유저명
    -   `MYSQL_PASSWORD` - 연결을 위한 비밀번호
    -   `MYSQL_DB` - 연결되면 사용할 DB
    -   [연결을 위한 환경변수 설정은 개발할 땐 괜찮지만 production 앱을 실행할 땐 권장되지 않음](https://diogomonica.com/2017/03/27/why-you-shouldnt-use-env-variables-for-secret-data/)
        -   일반적으로 컨테이너가 실행하며 사용될 private한 정보들은 파일로 관리됨(파일로부터 데이터를 읽어 환경 변수가 설정되는 방식)

1\. 환경변수를 설정하고 Todo 앱 컨테이너 실행, Todo 앱에 항목 추가 실행

```bash
docker run -dp 3000:3000 \
   -w /app -v "$(pwd):/app" \
   --network todo-app \
   -e MYSQL_HOST=mysql \
   -e MYSQL_USER=root \
   -e MYSQL_PASSWORD=secret \
   -e MYSQL_DB=todos \
   node:12-alpine \
   sh -c "yarn install && yarn run dev"
```

2\. Todo앱에 추가한 데이터가 MySQL에 들어갔는지 확인

```bash
docker exec -it <mysql-container-id> mysql -p todos
```

![docker06](https://github.com/younggeun0/younggeun0.github.io/blob/master/_posts/img/docker/06.png?raw=true)

## Part8: Use Docker Compose

Docker Compose는 멀티 컨테이너 앱의 정의와 공유를 돕기위해 개발된 툴로 단일 YAML 파일로 서비스들을 정의할 수 있고 단일 커맨드로 모든 작업을 한번에 실행하거나 종료할 수 있음

-   컴포즈의 장점은 앱의 스택을 단일 파일로 정의 가능

**Docker Compose 설치**

-   Mac이나 Windows에서 Docker Desktop/Toolbax를 설치했다면 이미 Docker Compose가 설치돼 있음, Linux는 설치가 필요([https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/))

```bash
# Docker Compose 버전 확인
docker-compose version
```

**Compose 파일 생성**

1\. app 프로젝트의 루트 경로에 `docker-compose.yml` 파일 추가
2\. 스키마 버전을 정의하며 시작(가장 최신 버전을 사용하는게 좋음)

```bash
verison: "3.7"
```

3\. 앱의 부분으로 실행될 서비스나 컨테이너들을 정의

```bash
version: "3.7"

services:
```

**app 서비스 정의**

-   기존 Todo 앱 컨테이너 실행 커맨드를 컴포즈 파일의 서비스로 옮길 것

```bash
# 이전에 Todo 앱 컨테이너 실행 시 사용했던 명령어
docker run -dp 3000:3000 \
  -w /app -v "$(pwd):/app" \
  --network todo-app \
  -e MYSQL_HOST=mysql \
  -e MYSQL_USER=root \
  -e MYSQL_PASSWORD=secret \
  -e MYSQL_DB=todos \
  node:12-alpine \
  sh -c "yarn install && yarn run dev"
```

1\. 우선 서비스 항목과 컨테이너 이미지를 정의 - 서비스명은 설정 가능, 서비스명은 자동적으로 network alias가 됨

```yaml
version: "3.7"

services:
	app:
		image: node:12-alpine
```

2\. 순서는 상관없지만 보통 `image` 정의 뒤에 `command` 를 정의

```yaml
version: "3.7"

services:
	app:
		image: node:12-alpine
		command: sh -c "yarn install && yarn run dev"
```

3\. 포트 맵핑은 서비스의 `port` 로 정의 - 여기선 단축 문법(Short Syntax, `HOST:CONTAINER`)를 썼지만 긴 문법(Long Syntax)도 사용 가능 - [https://docs.docker.com/compose/compose-file/compose-file-v3/#short-syntax-1](https://docs.docker.com/compose/compose-file/compose-file-v3/#short-syntax-1)

```yaml
version: "3.7"

services:
	app:
		image: node:12-alpine
		command: sh -c "yarn install && yarn run dev"
		ports:
			- 3000:3000
```

4\. 작업 폴더(`working_dir`)와 볼륨 맵핑(`volumes`) 정의 - 볼륨도 단축 문법(`[SOURCE:]TARGET[:MODE]`), 긴 문법이 있음(여기선 단축문법 사용) - `SOURCE`는 호스트 경로 또는 볼륨명 - `TARGET` 은 볼륨이 마운트 될 컨테이너 경로 - 기본 모드들은 read-only의 `ro` 와 read-write `rw` (default) - [https://docs.docker.com/compose/compose-file/compose-file-v3/#short-syntax-3](https://docs.docker.com/compose/compose-file/compose-file-v3/#short-syntax-3)

```yaml
version: "3.7"

services:
	app:
		image: node:12-alpine
		command: sh -c "yarn install && yarn run dev"
		ports:
			- 3000:3000
		working_dir: /app
		volumes:
			- ./:/app
```

5\. 마지막으로 환경변수를 `environment` 에 정의

```yaml
version: "3.7"

 services:
   app:
     image: node:12-alpine
     command: sh -c "yarn install && yarn run dev"
     ports:
       - 3000:3000
     working_dir: /app
     volumes:
       - ./:/app
     environment:
       MYSQL_HOST: mysql
       MYSQL_USER: root
       MYSQL_PASSWORD: secret
       MYSQL_DB: todos
```

**MySQL 서비스 정의**

```bash
# 기존 MySQL 컨테이너 실행 커맨드
docker run -d \
  --network todo-app --network-alias mysql \
  -v todo-mysql-data:/var/lib/mysql \
  -e MYSQL_ROOT_PASSWORD=secret \
  -e MYSQL_DATABASE=todos \
  mysql:5.7
```

1\. 새로운 서비스와 이름 정의, 정의한 서비스명 `mysql` 은 자동으로 network alias가 됨, 그 뒤 사용할 이미지 정의

```yaml
version: "3.7"

 services:
   app:
     # The app service definition
   mysql:
     image: mysql:5.7
```

2\. 다음으로 볼륨 맵핑, `docker run` 커맨드로 named volume 사용 시 생성되지 않은 볼륨은 자동생성 됐지만 컴포즈로 실행할 땐 생략할 수 없고 볼륨을 top-level `volumes` 에 정의해줘야 함 - 볼륨을 정의하고 마운트포인트를 설정할 수 있지만 볼륨명만 쓰면 기본 옵션이 적용됨 - 기타 볼륨 옵션 - [https://docs.docker.com/compose/compose-file/compose-file-v3/#volume-configuration-reference](https://docs.docker.com/compose/compose-file/compose-file-v3/#volume-configuration-reference)

```yaml
version: "3.7"

 services:
   app:
     # The app service definition
   mysql:
     image: mysql:5.7
     volumes:
       - todo-mysql-data:/var/lib/mysql

 volumes:
   todo-mysql-data:
```

3\. 환경변수 추가

```yaml
version: "3.7"

 services:
   app:
     # The app service definition
   mysql:
     image: mysql:5.7
     volumes:
       - todo-mysql-data:/var/lib/mysql
     environment:
       MYSQL_ROOT_PASSWORD: secret
       MYSQL_DATABASE: todos

 volumes:
   todo-mysql-data:
```

최종 `docker-compose.yml` 의 모습

```yaml
version: "3.7"

services:
    app:
        image: node:12-alpine
        command: sh -c "yarn install && yarn run dev"
        ports:
            - 3000:3000
        working_dir: /app
        volumes:
            - ./:/app
        environment:
            MYSQL_HOST: mysql
            MYSQL_USER: root
            MYSQL_PASSWORD: secret
            MYSQL_DB: todos

    mysql:
        image: mysql:5.7
        volumes:
            - todo-mysql-data:/var/lib/mysql
        environment:
            MYSQL_ROOT_PASSWORD: secret
            MYSQL_DATABASE: todos

volumes:
    todo-mysql-data:
```

**앱 스택 실행**

`docker-compose.yml` 을 앱 root 경로에 두고 아래 커맨드 실행

-   실행 전에 기존 컨테이너 앱들 종료(`docker ps`, `docker rm -f <ids>`)
-   커맨드를 실행하면 네트워크가 자동으로 생성됨(network를 따로 정의하지 않은 이유)

```bash
docker-compose up -d
```

![docker07](https://github.com/younggeun0/younggeun0.github.io/blob/master/_posts/img/docker/07.png?raw=true)

```bash
# 도커 컴포즈 로그보기
docker-compose logs -f
```

-   서비스들의 로그를 단일 스트림으로 확인 가능
    -   이는 타이밍 관련 이슈를 확인할 때 굉장히 유용

![docker08](https://github.com/younggeun0/younggeun0.github.io/blob/master/_posts/img/docker/08.png?raw=true)

```bash
# 특정 서비스의 로그만 보고 싶으면 마지막에 서비스명을 추가
docker-compose logs -f app
```

**앱을 실행할 때 DB 실행 대기**

-   도커는 어떤 컨테이너가 시작되기 전에 다른 컨테이너가 완전히 로드돼 실행될 때까지 기다리는 built-in 기능은 지원하지 않음
    -   예제는 노드 https://github.com/dwmkerr/wait-port dependency를 사용해 DB가 로드될때까지 대기하도록 돼 있음

**Docker Dashboard에서 앱 스택 보기**

-   기본으로 docker-compose.yml이 있는 디렉토리명이 프로젝트명이 됨
    -   스택 내 이름들은 `<project-name>_<service-name>_<replica-number>` 형태로 표시됨

![docker09](https://github.com/younggeun0/younggeun0.github.io/blob/master/_posts/img/docker/09.png?raw=true)

Docker Dashboard에 표시된 app stack

**Docker compose 종료하기**

```bash
docker-compose down
```

-   명령어 실행 시 컨테이너들은 정지되고 네트워크는 제거됨
    -   기본으로 컴포즈가 사용한 named volumes는 제거되지 않음, 볼륨을 제거하고자 한다면 `--volume` 플래그를 추가해 줘야 함
        -   Docker Dashboard 휴지통 버튼으로 앱 스택을 종료한 경우, 볼륨은 제거되지 않음
