---
layout: single
title: "REST API와 RESTFUL API"
categories: Basic
sidebar_main: true
toc: true
toc_sticky: true
---

면접을 보고왔는데 REST API와 RESTful API에대한 질문을 받았다.
이제까지 프로젝트를 REST API로 설계했기떄문에 HTTP 메소드를 통해 자원을 처리하는것이라고 대답하였는데
RESTAPI와 RESTFULAPI가 조금 다르다는 말을 들었다.
뭐가 다른걸까?

# 1. REST API(Representational State Transfer API)

- REST API는 Representational State Transfer의 약자로, 네트워크 아키텍처 원칙을 기반으로 한 API 스타일입니다.
- 자원(Resource)을 URI로 표현하고, HTTP 메서드(GET, POST, PUT, DELETE 등)를 통해 자원을 조작하는 방식을 따릅니다.
- REST API는 클라이언트와 서버 간의 통신을 위한 규칙을 제공하며, 데이터 포맷으로는 주로 JSON이나 XML을 사용합니다.

# 2. RESTful API

- RESTful API는 REST API를 따르는 API 디자인의 원칙을 지킨 API를 의미합니다.
- 자원을 URI로 표현하고, HTTP 메서드를 사용해 CRUD(Create, Read, Update, Delete) 기능을 구현합니다.
- URI는 자원을 명확하게 표현해야 하며, 명사 형태로 표현되어야 합니다.
- HTTP 상태 코드를 이용하여 요청의 성공, 실패를 표현합니다.
  간단히 말해, REST API는 웹 서비스를 개발하는 데 사용되는 디자인 원칙을 의미하며, 이를 준수하여 만든 API가 RESTful API라고 할 수 있습니다.

## HATEOAS

`Hypermedia As The Engine Of Application Stata`는 RESTful API의 중요한 원칙 중 하나로, 클라이언트가 API를 통해 가능한 다음 단계를 자동으로 파악할 수 있도록 하여 애플리케이션 상태 전이를 단순화하는 기능을 제공하는것을 말한다.
각 요청의 응답에, 가용한 다른 요청들의 정보를 포함시키는것이다.
이는 보내는데이터에 연계된 다른 정보들을 함꼐 보냄으로써, 개발자는 API 문서들을 다 뒤져보지 않더라도 다음에 어떤 요청을 보낼수 있는지 살펴 볼 수 있고

```json
{
  "id": 1,
  "name": "John Doe",
  "age": 30,
  "links": [
    {
      "rel": "self",
      "href": "https://api.example.com/users/1"
    },
    {
      "rel": "update",
      "href": "https://api.example.com/users/1",
      "method": "PUT",
      "type": "application/json",
      "description": "Update this user's information"
    },
    {
      "rel": "delete",
      "href": "https://api.example.com/users/1",
      "method": "DELETE",
      "description": "Delete this user"
    }
  ]
}
```

위의 예제는 links 배열은 각각의 링크가 해당 자원에 대해 어떤 동작을 수행할 수 있는지를 설명합니다.
self 링크는 자원 자체를 가리키며, 이를 통해 자원의 식별과 접근이 가능합니다.
update 링크는 PUT 메서드를 통해 해당 자원을 업데이트할 수 있는 URL을 제공합니다.
delete 링크는 DELETE 메서드를 통해 해당 자원을 삭제할 수 있는 URL을 제공합니다.
이 예제는 클라이언트가 자원을 특정할 수 있는 URL을 제공하고, 해당 자원에 대해 가능한 동작을 설명함으로써 HATEOAS 원칙을 준수하고 있습니다.

## Status Code
