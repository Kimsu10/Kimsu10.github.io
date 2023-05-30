---
layout: single
title: "기업협업 회고"
categories: wecode
sidebar_main: true
toc: true
toc_sticky: true
---

# 1. 프로젝트 소개

프로젝트 기간: 2022.12.08 ~ 2023.01.04
팀명: MSG
구성원: Front: 2명 /Back: 2명
목적: 정해진 기간동안 일정 시간마다 회사에 등록된 인플루언서의 광고를 키워드로 검색하여 순위권에있는지 확인하고, 그 스크린샷을 찍어 저장하는 API를 만들어 수동으로 하던 시스템을 자동화 하는것.

# 2. 프로젝트 기획

![](https://velog.velcdn.com/images/kimsu10/post/f0610363-8a4e-4154-a5a7-4b234778b072/image.png)

<iframe width="560" height="315" src="https://www.youtube.com/embed/fE8sFzykrQs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

# 3. 프로젝트 결과물

<iframe width="560" height="315" src="https://www.youtube.com/embed/5fKkO2Yhv9o" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

# 4. 맡은 역할

## 크롤링하고 스크린샷 찍기

1. puppeteer를 사용하여 브라우저를 실행하고 새 페이지를 생성

```js
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const { uploadFile, unlinkFile } = require('../utils/s3');
const { uploadPicture, updateCaptureCount } = require('../models/schedulerDao');

const start = async (campaign_idx, searchParam, sns_type, job_idx, posting_url) => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();

  await page.setViewport({
    width: 1366,
    height: 6000,
  });
```

2. 입력받은 광고의 url이 인스타그램인지 네이버블로그인지에따라 검색 파라미터를 처리하고 해당하는 URL을 반환.

```js
const urlResult = (sns_type) => {
  const paramArr = searchParam.split(",");
  const url = paramArr.map((param) => {
    const encodedParam = encodeURI(param);
    if (sns_type === "BLOG") {
      return {
        uri: `https://search.naver.com/search.naver?where=view&sm=tab_jum&query=${encodedParam}`,
        keyword: param,
      };
    } else {
      return {
        uri: `https://www.instagram.com/explore/tags/${encodedParam}/`,
        keyword: param,
      };
    }
  });

  return url;
};
```

3. naverCrawling 함수와 instagramCrawling 함수를 사용하여 각각 네이버 블로그와 인스타그램에서 웹 페이지를 파싱하여 정보를 추출한다.

   반환된 결과를 sns_type에 따라 적절한 파싱 함수를 선택하여 결과를 반환하는 crawlingResult 함수를 작성하였다.

```js
const naverCrawling = async ($) => {
  const lists = $("li.bx._svp_item");
  let result = [];
  await lists.each((i, list) => {
    // const influencer = $(list).find('a.name').text().trim();
    const blogUrl = $(list)
      .find("div.total_wrap.api_ani_send > div > a")
      .attr("href");
    result.push({ i, blogUrl });
  });
  return result;
};

const instagramCrawling = async ($) => {
  const lists = $("div._aabd._aa8k._aanf");
  let result = [];
  await lists.each((i, list) => {
    const url = $(list).find("a").attr("href");
    const blogUrl = `https://www.instagram.com${url}`;
    result.push({ i, blogUrl });
  });
  return result;
};

const crawlingResult = async (sns_type, $) => {
  const bodyBuilder = {
    BLOG: naverCrawling,
    INSTAGRAM: instagramCrawling,
  };
  const body = await bodyBuilder[sns_type]($);
  return body;
};
```

4.인플루언서가 게시한 글의 url이 결과에 있는지 확인하고, 포함된 경우 순위와 url주소를 반환한다.

```js
const includePostingURL = async (sliceResult) => {
  const urlArr = posting_url.split(",");
  let result = [];
  for (j of urlArr) {
    if (sliceResult.includes(j)) {
      result.push({ rank: urlArr.indexOf(j) + 1, url: j });
    }
  }
  return result;
};
```

5.  그 밖의 설정들

        페이지에 이동하고 3초간 대기, 및 위에 만든 함수들을 실행되게 하였다.

    urlResult(sns_type)를 통해 페이지안의 글들을 순회하면서 정보를 찾고
    원하는 값이 있을 경우 전체스크린샷을 찍어 S3에 스크린샷을 업로드하고 데이터베이스에 정보를 저장한다.
    스크린샷은 campaign_idx와 현재 날짜 및 시간을 기반으로 파일 이름이 지정하였다.
    스크린샷이 업로드된 후에는 로컬의 파일을 삭제한다.

```js
for (i of urlResult(sns_type)) {
    await updateCaptureCount(job_idx);
    await page.goto(i.uri);
    await page.waitForTimeout(3000);
    const content = await page.content();
    const $ = await cheerio.load(content);
    const result = await crawlingResult(sns_type, $);

    const sliceResult = await result.slice(0, 20).map((e) => e.blogUrl);
    const postingUrl = await includePostingURL(sliceResult);

    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    let koreaNow = new Date(new Date().getTime() + KR_TIME_DIFF);

    if (postingUrl[0]) {
      let filename = `${campaign_idx}_${koreaNow
        .toISOString()
        .substr(0, 19)}.png`;

      let screenshot = await page.screenshot({
        fullpage: true,
        path: `../backend/uploads/${filename}`,
      });

      let s3UploadImage = await uploadFile(
        screenshot,
        filename,
        koreaNow.getFullYear(),
        campaign_idx
      );

      await uploadPicture(
        job_idx,
        i.keyword,
        s3UploadImage.key,
        filename,
        s3UploadImage.Location,
        JSON.stringify(postingUrl)
      );

      await unlinkFile(filename);
    }
  }

  browser.close();
};

```

---

# 좋았던 점

## 1.처음으로 DOCS를 읽고 새로운것을 만들어 봄

일정시간마다 함수가 작동하여 페이지의 내용들을 긁어와서 비교하고 스크린샷을 찍으라는 업무를 배정받았을때 뭐가 뭔지 몰랐다.
인터넷에서 검색하니 그것을 크롤링이라 하는것을 알았다.
우선 간단한 크롤링만들기에 cheerio를 사용하면된다고해서 cheerio로 만들어보았는데 원하는 기능을 구현하기위해서는 pupperteer를 사용해야했다.
크롤링을 할때 원하는 정보를 가져오기위해서 html의 태그들을 파고 들어가야했는데 이 작업도 어려웠지만 원하는 정보를 가져와서 터미널에 띄울때 정말이지 희열을 느꼈다.

## 2. 실무에대해 많은 것을 배웠다

이번 3차프로젝트는 실제로 기업에서 업무를 배분받고 작업을 하였다.
첫 날 시간 회사와 학원간의 시간착오로 인해 급하게 회사와 업무에대한 설명을 받았지만 CTO님께서 많은것을 알려주시려하는것을 느꼈다.
이후 프로젝트에대한 기획을 하였는데, 설명을 듣고 기획을 하였음에도 불구하고 CTO님께서 생각한 것과 팀이 생각한 것이 달랐다.
잘 모르겠는 부분들은 슬랙을 통해서 질문하고, 조언을 받으면서 기획을 진행했는데 거의 2주가 걸렸다.
학원에서는 이미 만들어진 사이트를 모델링하거나 조금 변형하는 정도여서 기획이 이렇게 어려운 것인줄 몰랐고, 사용자의 입장을 고려한 생각을정말 많이해야한다는 것을 느꼈다.

# 부족한 점

## 1. 자바스크립트 실력

크롤링을 하면서 제일 어려웠던 점이 어떻게 브라우저에서 입력된 복수의 키워드들을 하나씩 돌려가면서 검색하게 하는가였다.
하나씩 키워드를 하나에 하나의 창으로 열 수는 있었으나 한페이지에서 돌려가면서 검색하는 방법을 모르겠었다.
팀원분께 어떻게 해야할지 물어보았더니 map 함수를 쓰면 된다고 공부해보라는 조언을 받았다.
map함수를 돌려서 작동하는것을 볼때는 정말 신기했다.

```
자바스크립트 문법 공부 및 프로그래머스 꼭 풀자.
```

## 2. 안되는것을 빨리 말하지 않은것

실제 CTO님께서 맡기신 업무는 원하는 광고가 표시될때 스크린샷을찍고 그 광고가 있는 위치에 빨간색 체크 박스로 표시를 해서 이미지를 저장하는 것이였다.  
node canvas를 사용해서 그림을 그릴수 있다는 것을 알았고 그리는 법까지는 알았으나, 어떻게 자동적으로 찍힌 스크린샷에서 어디에 원하는 광고의 위치가 있는지 찾아서 그림을 그려야하는지를 알지 못했다.
이 문제로 끙끙앓고 있었는데 또다시 이때문에 시간을 많이 끌렸다.

결국 1주일을 시도하다가 CTO님께 말씀드리니 그럴때(못하겠는것)는 빨리 말해야한다고 말씀하셨다.
이 기능은 필수가 아닌 추가로 해주었으면 좋겠다고 생각하셨던 거라서 스크린샷만 찍을 수 있으면 안해도 된다고 하셨다.

```
못하겠는것은 일단 말씀 드리고 자문을 구하자.
```

## 3. 소극적인 커뮤니케이션

위의 캔버스작업이 제외되고 남은 기간은 6일 정도였다.
이후 작업을 하면서 가장 헷갈렸던 부분은 내가 크롤링한 부분을 어떻게 스케듈러로 돌리는지였다.
이걸 다른 백엔드분께 물어봤어야했는데, 데이터를 주고받는 방식을 모른다고
실망하실까 혼자 스케듈러도 만들어보면서 떨어져 작업을 했던것이 문제가되었다.
결국 프로젝트가 끝날때쯤에는 이해하고 만들었으나 다른 백엔드분이 이미 스케듈러를돌리고 남은 부분들을 다 하셨다.
프로젝트가 끝나고 미안한 마음에 발표를하고 밤늦게까지 얘기를 나눴다.
막바지에 이르러서 같이 작업하지않고 따로 떨어져서 한게 아쉬움, 그냥 물어봤으면 화좀 내도 알려줬을것, 그래도 만들었으니까 좀더 자신감을 가지라는 말을 들었다.

나는 팀원분들을 실망시키고 싶지않아서 책임감을 가지고 해야한다며 한 결과가 오히려 팀원분들이 아쉬움을 느끼게했다
이 프로젝트를 하면서 가장 후회하는 선택이다.

```
혼날까 실망시킬까 두려워도 끊임없이 물어보자
```

# 프로젝트를 마치고..

처음에 팀배정이 되었을때 내가 가고싶었던 기업에 뽑힌점, 함께 작업하고 싶다고 생각했던 분과 팀이 된점, 학원내에서 잘하시는 분들과 팀이되서 너무 좋았다.
초중반까지는 같이 의논하고 작업하고 간식도 먹고 같이혼나고 또 의논하고 재밌었다.
CTO님께 이쁨받는다고(난 동의하지않지만) 대표로 질문도 했었는데..
왜 마지막에 나는 혼자하는 선택을 한건지 후회스럽다.

프로젝트가 끝나고 다음날, CTO님과의 티타임회의였는데 여기서도 소통의 중요성을 강조하셨다.
질문을 더 많이 해야한다고, 어디까지 진행되고있는지도 알려줘야한다고하셨다.
프로젝트가 끝나고 나서야 서로의 생각을 솔직하게 말했는데 이걸 프로젝트중에 말했다면 더 좋은 과정과 결과물이 있었을거라는 생각이 들었다.

이전에도 느꼈던 소통이 중요하다고 느꼈지만, 이번 프로젝트에서 정말 뼈저리게 느꼈다.
