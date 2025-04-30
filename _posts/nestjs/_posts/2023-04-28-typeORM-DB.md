---
layout: single
title: "TypeORM으로 DB연결"
categories: Nestjs
author_profile: true
sidebar_main: true
toc: true
toc_sticky: true
---

새로운 프로젝트를 시작하게되었다. (사실 아직 기획중이지만..)  
초기설정만 해두는건 괜찮지않을까하고 초기설정을 해보았다.  
nest의 document가 굉장히 잘되어있어 생각보다 쉽게 연결하였다.

> [NestJs Database Documentation](https://docs.nestjs.com/techniques/database)

아래처럼 공식문서에서 나온대로 설정했을때 DB가 잘 연결되는것을 확인하였다.

![](https://velog.velcdn.com/images/kimsu10/post/b0a28afc-1bc1-480b-9aa5-84bb3402f77f/image.png)

그런데 env설정을 하고 연결하니 에러가 났다.

![](https://velog.velcdn.com/images/kimsu10/post/b06b1624-f1d0-49bb-b995-846457664be8/image.png)

이미지에는 process.env.host라고 소문자로 되어있어서 저게 문제같지만 저때는 env에 소문자로 적어두어서 저게 문제가 아니다.

![](https://velog.velcdn.com/images/kimsu10/post/6f845029-5e23-468c-8d8e-d9ee35c70301/image.png)

이게 무슨에러일까 검색해보았다.

> **Error: connect ECONNREFUSED IP주소:3306 at TCPConnectWrap.afterConnect [as oncomplete]**
> 지정된 IP주소나 PORT에 연결이 거부되거나 사용할 수 없다는 에러이다.

## 찾아본 해결책

> 1 .대상 서버가 실행 중인지 확인: 이 오류는 포트 3306의 IP 주소에 대한 연결이 거부되었음을 나타냅니다. 연결하려는 서버가 활성 상태로 실행 중이고 특정 포트에서 수신 대기 중인지 확인하십시오.
>
> 2. 방화벽 제한이 있는지 확인: 시스템 또는 네트워크의 방화벽 또는 보안 구성이 지정된 IP 주소 및 포트에 대한 연결을 차단하고 있을 수 있습니다. 방화벽이나 보안 조치를 일시적으로 비활성화하고 오류가 지속되는지 확인하십시오.
>
> 3. 올바른 IP 주소 및 포트 확인: 연결하려는 IP 주소 및 포트가 정확한지 다시 확인하십시오. 원격 서버에 연결하는 경우 올바른 IP 주소 또는 호스트 이름을 사용하고 있는지 확인하십시오.
>
> 4. 충돌하는 프로세스 조사: 다른 프로세스나 서비스가 이미 지정된 포트를 사용하여 연결이 거부되었을 수 있습니다. netstat또는 같은 도구를 사용하여 lsof해당 포트에서 충돌하는 프로세스가 있는지 확인하고 필요한 경우 프로세스를 종료하거나 재구성하십시오.
>
> 5. 서버 로그 검토: 서버 로그에 액세스할 수 있는 경우 관련 오류 메시지나 연결 거부 이유에 대한 표시가 있는지 검사하십시오. 서버 로그는 근본적인 문제에 대한 추가 통찰력을 제공할 수 있습니다.

노우우우.. 놀라울정도로 전부 여기에 해당하지 않았다.  
결국 하나씩 하나씩 바꿔가면서 원인을 찾아보았다.  
원인은 pakage.json의 scripts에 env파일의 경로와 실제 경로가 달라서였다.  
(스크린샷을 찍어놓았는데 다 지워버렸는지 없다ㅜ)  
아무튼 경로를 바꾸고 나니 잘 실행되었다.

![](https://velog.velcdn.com/images/kimsu10/post/a992e22f-6688-4121-971a-09e619ea2c41/image.png)

~~초록색글자가득뜰때 너무 좋음^^~~

이렇게 DB를 연결하는데 4일이 걸렸다. 이거 맞아..?

## 📝 느낀점

프로젝트를 하기전에 연습삼아 nestjs폴더의 초기설정을 가져와서 작업을 했더니 경로가 다르게 설정되었다는 것을 몰랐다.
분명히 다맞게썼는데 왜 에러가 뜨는지 모를때는 package.json파일을 먼저 확인해보자.
