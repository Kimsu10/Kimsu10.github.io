---
layout: single
title: "console창의 에러 코드 지우기"
categories: Error
tag: [err, react]
sidebar_main: true
toc: true
toc_sticky: true
author_profile: true
---

# 404 에러반환시 콘솔이 찍히는 문제

북마크 여부를 확인하는 함수를 작성하였는데 문제점이 생겼다.  
다음 문제 또는 이전 문제를 불러 올 때마다 북마크된 문제가 아니라면 404에러가 브라우저의 콘솔에 찍히는 것..

```js
useEffect(() => {
  const fetchBookmarkStatus = async () => {
    try {
      if (!questionId) return;

      const res = await axiosConfig.get("/bookmarks", {
        params: { questionId },
      });

      if (res.status === 200) {
        setIsBookmarked(true);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setIsBookmarked(false);
          return;
        } else {
          console.error(
            "북마크 GET 요청 404 이외의 에러:",
            error.response.data
          );
        }
      } else {
        console.error("북마크를 조회 실패:", error.message);
      }
    }
  };

  fetchBookmarkStatus();
}, [questionId]);
```

![](/assets/images/Error/404console.png)

어떤 사용자가 브라우저를 열어보겠어 싶지만 확률은 낮을거같다.  
axios의 응답 설정을 바꾸거나 백에서 코드르 수정해야할거같은데  
좀 더 간단한 해결법은 없을까 검색해봤다.

## 해결 : console.clear()

onsole.clear()는 JavaScript의 console 객체의 메서드로, 브라우저의 콘솔에서 현재 표시되고 있는 모든 로그를 지워준다.  
 이 메서드를 호출하면 콘솔에 출력된 로그, 경고, 에러 등이 모두 삭제되어, 사용자가 새로 출력된 로그를 더 쉽게 볼 수 있다.

![](/assets/images/Error/console-clear.png)

깔끔해졌다.
