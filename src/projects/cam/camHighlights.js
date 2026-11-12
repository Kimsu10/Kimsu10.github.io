// 굵게 표시할 문구 목록. HTML 대신 텍스트로 관리합니다.
const highlightedPhrases = [
  "GCP 계정 간 신뢰관계 구성 및 Keycloak/SingleID 기반 SAML SSO 페더레이션 자동 연동",
  "Multi-Enrollment 방식으로 확장",
  "PEM 키 또는 비밀번호로 서버에 인증한 뒤, 관리자 계정 생성 및 접근 권한 부여를 자동화",
  "JumpHost → Bastion → Target 서버 간 포트 포워딩 및 터널링",
  "Linux 서버에서 명령어를 활용한 관리자 계정 생성, 비밀번호 변경 및 사용자 권한 관리 자동화",
  "사용자 계정 기반 수동 등록 기능 추가",
  "지원 범위를 확대하고, 공통 처리 로직 정비",
  "DB의 설정 정보와 Vue 기반 관리자 화면의 CodeStore를 연동하여 테넌트별 CSP 등록·접속 방식 설정 기능 구현",
  "OCI 테넌시 간 신뢰관계 구축 및 Keycloak/SingleID 기반 SAML SSO 페더레이션 연동"
]

export function splitCamDetail(text) {
  const phrase = highlightedPhrases.find(phrase => text.includes(phrase))
  if (!phrase) return [{ text, bold: false }]

  const start = text.indexOf(phrase)
  return [
    { text: text.slice(0, start), bold: false },
    { text: phrase, bold: true },
    { text: text.slice(start + phrase.length), bold: false },
  ].filter(part => part.text)
}
