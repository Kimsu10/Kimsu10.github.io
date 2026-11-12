// 굵게 표시할 문구 목록. HTML 대신 텍스트로 관리합니다.
const highlightedPhrases = [
  "GCP 계정 간 신뢰관계 구성 및 Keycloak/SingleID 기반 SAML SSO 페더레이션 자동 연동",
  "Multi-Enrollment 방식으로 확장",
  "PEM과 Password를 사용하여 관리자 계정을 자동으로 생성하고 접근 권한을 부여",
  "JumpHost → Bastion → Target 서버 간 포트 포워딩 및 터널링",
  "Linux 명령어를 활용한 관리자 계정 생성, 비밀번호 변경 및 사용자 권한 관리 자동화",
  "사용자 계정 기반 수동 등록 기능 추가",
  "지원하는 CSP 확장 및 코드 통일화",
  "DB와 Vue의 CodeStore를 사용해 관리자가 CSP 등록 및 접속 방식을 설정할 수 있는 기능 개발",
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
