export const tagByCompanyProject = {
  "title": "TagByCompany · 인플루언서 광고 모니터링 자동화",
  "period": "2022.12.09 ~ 2023.01.08",
  "team": "FE 2명 · BE 2명",
  "position": "Backend",
  "description": "계약된 인플루언서의 광고가 인기 순위에 노출되는지 정기적으로 확인하고, 스크린샷을 남기는 반복 업무를 자동화하여 담당 직원의 업무 효율을 높이기 위한 서비스입니다.",
  "tags": [
    "Node.js",
    "Express",
    "MySQL",
    "Puppeteer",
    "AWS"
  ],
  "sections": [
    {
      "title": "토큰 인증·인가 API 구현",
      "details": [
        "관리자 서버에서 받은 토큰을 검증하고 인증·인가를 처리하는 API 구현"
      ],
      "period": "2022.12.09 ~ 2022.12.15"
    },
    {
      "title": "스케줄러 기반 업무 자동화",
      "details": [
        "node-cron과 schedule을 활용하여 정해진 시간마다 모니터링 작업 실행",
        "DB에서 스케줄러의 실행 여부와 상태를 확인하고, 상태가 working인 경우 작업 수행",
        "작업 완료 후 스케줄러 정보를 업데이트하는 실행 흐름 구현"
      ],
      "period": "2022.12.16 ~ 2022.12.22"
    },
    {
      "title": "크롤링 및 광고 스크린샷·S3 저장 API 구현",
      "details": [
        "Puppeteer와 Cheerio를 활용하여 인스타그램과 네이버 데이터 크롤링",
        "수집한 데이터에 광고주와 계약된 인플루언서가 포함되어 있는지 확인",
        "계약된 인플루언서가 수집 데이터에서 확인되면 스크린샷을 촬영하는 API 구현",
        "촬영한 스크린샷을 AWS S3에 저장하여 광고 노출 확인 자료로 보관"
      ],
      "period": "2022.12.23 ~ 2022.12.29"
    },
    {
      "title": "서비스 배포",
      "details": [
        "Docker와 AWS EC2를 활용한 서비스 배포"
      ],
      "period": "2022.12.30 ~ 2023.01.05"
    }
  ],
  "technologies": [
    "JavaScript",
    "Node.js",
    "MySQL",
    "RESTful API",
    "Express",
    "node-cron",
    "schedule",
    "Puppeteer",
    "Cheerio",
    "AWS EC2",
    "AWS S3",
    "Docker"
  ],
  "tools": [
    "Notion",
    "Trello",
    "DB Diagram",
    "Slack",
    "GitHub"
  ]
}
