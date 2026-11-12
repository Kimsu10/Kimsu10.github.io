import { ShieldCheck, Terminal, Server, Cloud } from 'lucide-vue-next'

export const profile = {
  name: '김수정',
  role: 'DevOps',
  intro: '안전한 기술로 더 나은 사용자 경험을 만드는 개발자',
  description: 'Spring Boot와 Vue3를 사용하여 클라우드 IAM, SSO/Federation, 인프라 접근 제어 시스템을 개발하였습니다. 사용자 편의성과 보안을 함께 고민합니다.',
  email: 'betnwjd25@gmail.com',
  github: 'https://github.com/Kimsu10',
}
export const navigation = ['About', 'Skills', 'Experience', 'Projects', 'Contact']
export const skillGroups = [
  { name: 'Backend', skills: ['Java', 'Spring Boot', 'REST API', 'Spring Scheduler', 'MyBatis', 'MySQL', 'PostgreSQL'] },
  { name: 'Frontend', skills: ['JavaScript', 'TypeScript', 'Vue 3', 'Pinia', 'React', 'HTML / CSS'] },
  { name: 'Cloud & Identity', skills: ['AWS', 'GCP', 'Azure', 'OCI', 'Keycloak', 'SAML 2.0', 'IAM'] },
  { name: 'Infrastructure', skills: ['Git', 'Linux', 'SSH', 'Jenkins', 'Kubernetes', 'Argo CD' ] },
]
export const experiences = [
  { date: '2025.06 — 2027.12.31 (퇴사 예정)',
    role: '삼성 SDS 클라우드 접근 관리 시스템 개발',
    company: '와글와이즈 · DevOps',
    description: 'Vue 3와 Spring Boot 기반 관리 플랫폼 개발 및 멀티 클라우드 접근제어 시스템 구현',
    details: [
      'Vue 3·Spring Boot 기반 관리자 페이지 및 REST API 개발',
      'GCP·OCI 콘솔 SSO/Federation 및 리소스 접근 제어 시스템 구축',
      'SSH 터널링 및 계정 관리 자동화를 통한 Multi-Enrollment 기능 개발',
    ],
    tags: ['Spring Boot', 'Vue3', 'AWS', 'Azure', 'GCP', 'SCP', 'OCI', 'Linux', 'SSH', 'Jenkins', 'Kubernetes', 'Git', 'Argo CD', 'MyBatis', 'MySQL', 'PostgresSQL' ] },
  {
    date: '2023.08 · 1개월',
    role: '한의사용 에디터 플러그인 고도화',
    company: '메디스트림 · 임시직/프리랜서',
    description: 'Vue.js와 ProseMirror를 사용한 사내 에디터 고도화',
    details: [
      '확장성과 유지보수성을 고려한 모듈화 및 스키마 설계',
      '사용자가 직관적으로 헤더 크기 및 스타일을 조정할 수 있도록 UI와 동작 방식 개선',
      '다양한 에디터 사용 환경에서도 텍스트 스타일(색상/굵기/크기 등)이 일관되게 적용되도록 기능 구현 및 QA 완료',
    ],
    tags: ['Vue.js', 'ProseMirror'],
  },
  {
    date: '2022.01 · 1개월',
    role: '인플루언서 광고 모니터링 업무 자동화',
    company: '태그바이컴퍼니 · 임시직/프리랜서',
    description: 'Node.js와 MySQL을 활용한 사무 업무 자동화 시스템',
    details: [
      '관리자 기능 API 구현',
      '스케줄러와 Puppeteer를 사용한 크롤링 API 개발',
      'Docker와 AWS EC2를 활용한 프로젝트 배포',
    ],
    tags: ['Node.js', 'MySQL', 'Puppeteer', 'Docker', 'AWS EC2'],
  },
]
export const projects = [
  { num: '01', category: 'IDENTITY & SECURITY', title: 'Multi-Cloud SSO & Federation', subtitle: '클라우드 통합 인증 및 접근 제어', description: 'OCI, GCP 등 클라우드와 Keycloak 기반 SAML Federation을 연동하고, 중앙에서 콘솔 접근을 제어하는 기능을 개발했습니다.', tags: ['Java', 'Spring Boot', 'Keycloak', 'SAML 2.0'], icon: ShieldCheck, accent: 'violet', details: ['CSP별 IAM 및 Federation 설정 자동화', 'SP-Initiated SAML SSO 인증 흐름 구현', '사용자 및 리소스 접근 권한 중앙 관리'] },
  { num: '02', category: 'INFRASTRUCTURE', title: 'Secure Resource Access', subtitle: 'SSH 터널링 기반 인프라 접근 제어', description: 'Jump Host와 Bastion Server를 활용해 Compute 및 DB 자원에 대한 접근 경로를 구성하고, 실시간 권한 검증을 구현했습니다.', tags: ['Java', 'SSH', 'Bastion', 'IAM'], icon: Terminal, accent: 'blue', details: ['접근 요청 시 사용자 권한 실시간 검증', '포트 포워딩 기반 안전한 연결 구성', '접속 자격 증명 및 비밀번호 갱신 처리'] },
  { num: '03', category: 'WEB PLATFORM', title: 'Admin Management Platform', subtitle: 'Vue 3 기반 관리자 플랫폼', description: '운영 관리 화면과 실시간 공지 기능을 구현하고, 첨부파일 미리보기 및 다운로드 기능을 개발했습니다.', tags: ['Vue 3', 'Spring Boot', 'JavaScript', 'REST API'], icon: Server, accent: 'cyan', details: ['관리자 페이지 UI 및 API 구현', '실시간 공지 알림 기능', '이미지·파일 업로드, 미리보기, 다운로드'] },
  { num: '04', category: 'CLOUD PLATFORM', title: 'Cloud IAM Operations', subtitle: '멀티 클라우드 권한 관리 및 유지보수', description: 'AWS와 Azure의 IAM 및 리소스 접근 관리 기능을 유지보수하고, 운영 중 발생하는 인증 및 권한 이슈를 개선했습니다.', tags: ['AWS', 'Azure', 'IAM', 'Java'], icon: Cloud, accent: 'orange', details: ['IAM 및 리소스 접근 기능 유지보수', '클라우드 인증·권한 이슈 분석', '멀티 클라우드 운영 기능 개선'] },
]

export const camProject = {
  "title": "SingleID CAM · 클라우드 접근 관리",
  "category": "클라우드",
  "client": "삼성SDS 프로젝트",
  "description": "여러 클라우드의 콘솔과 리소스 접근을 관리하는 CAM 시스템에서 관리자 페이지, SSO 페더레이션, 자원 접근 제어 및 계정 관리 기능을 개발했습니다.",
  "tags": [
    "Spring Boot",
    "Vue 3",
    "MyBatis",
    "SAML 2.0",
    "SSH"
  ],
  "contributions": [
    {
      "title": "관리자 페이지 및 QnA, FAQ, 공지사항 API 및 화면 구현",
      "period": "2025.07 ~ 2025.08",
      "technologies": [
        "Vue 3",
        "Spring Boot",
        "MyBatis"
      ],
      "details": [
        "Radix Vue 기반 관리자 페이지 UI 및 Spring Boot 백엔드 기능 개발",
        "QnA, FAQ, 공지사항 기능 및 REST API 구현",
        "이미지/파일 업로드, 미리보기 및 다운로드 기능 구현",
        "Kubernetes 및 Argo CD를 활용한 서비스 배포 및 운영 관리"
      ]
    },
    {
      "title": "GCP 콘솔 및 리소스 접근 제어 시스템 구축",
      "period": "2025.09 ~ 2025.12",
      "technologies": [
        "GCP SDK",
        "Keycloak SDK",
        "SingleID",
        "SAML 2.0",
        "MyBatis",
        "JUnit",
        "Jenkins"
      ],
      "details": [
        "GCP 계정 간 신뢰관계 구성 및 Keycloak/SingleID 기반 SAML SSO 페더레이션 자동 연동",
        "GCP SDK와 API를 활용한 콘솔 및 리소스 접근 제어 기능 개발",
        "프로젝트·정책·사용자 생성 및 권한 부여 기능 개발",
        "Spring Scheduler를 사용한 정기 작업 구현",
        "JUnit 기반 단위 테스트 작성 및 Jenkins를 활용한 배포"
      ]
    },
    {
      "title": "AWS EC2/RDS와 Azure의 VM 서버 접근 제어 및 계정 관리 기능 고도화",
      "period": "2026.01 ~ 2026.02",
      "technologies": [
        "Java",
        "Spring Boot",
        "SSH",
        "Azure SDK",
        "MS Graph",
        "Linux",
        "JUnit"
      ],
      "details": [
        "기존 단건 등록 방식의 자원 접근 제어 기능을 여러 클라우드를 등록할 수 있는 Multi-Enrollment 방식으로 확장",
        "자원 등록 및 접속 시 PEM과 Password를 사용하여 관리자 계정을 자동으로 생성하고 접근 권한을 부여하는 기능 구현",
        "SSH 기반 JumpHost → Bastion → Target 서버 간 포트 포워딩 및 터널링 기능 개발",
        "Linux 명령어를 활용한 관리자 계정 생성, 비밀번호 변경 및 사용자 권한 관리 자동화",
        "자원 연결시 사용자 역할 및 권한 검증 기능 개발",
        "JUnit 기반 단위 테스트 작성"
      ]
    },
    {
      "title": "Multi-Enrollment 기반 CSP 자원 등록 및 접근 기능 확장",
      "period": "2026.03 ~ 2026.07",
      "technologies": [
        "Java",
        "Spring Boot",
        "Vue 3",
        "SSH",
        "Linux",
        "Guacamole"
      ],
      "details": [
        "기존 Linux 명령어 기반 Compute 및 DB 자원 자동 등록 방식에 사용자 계정 기반 수동 등록 기능 추가",
        "AWS, Azure, GCP, SCP_V1, OnPremises 환경으로 지원하는 CSP 확장 및 코드 통일화, Windows 자원 지원 추가",
        "기존 PuTTY 기반 Linux 접속 방식에 Guacamole 기반 Web Terminal 추가"
      ]
    },
    {
      "title": "CodeStore 기반 클라우드 자원 관리 기능 개발",
      "period": "2026.08",
      "technologies": [
        "Vue 3",
        "Spring Boot",
        "MyBatis"
      ],
      "details": [
        "DB와 Vue의 CodeStore를 사용해 관리자가 CSP 등록 및 접속 방식을 설정할 수 있는 기능 개발",
        "허용 가능한 클라우드 자원 유형을 관리하는 REST API 및 관리자 화면 구현"
      ]
    },
    {
      "title": "OCI 콘솔 및 리소스 접근 제어 시스템 구축",
      "period": "2026.09 ~ 2026.12 (진행중)",
      "technologies": [
        "Spring Boot",
        "OCI Java SDK",
        "SingleID",
        "Keycloak",
        "SAML 2.0"
      ],
      "details": [
        "OCI 테넌시 간 신뢰관계 구축 및 Keycloak/SingleID 기반 SAML SSO 페더레이션 연동",
        "OCI Java SDK를 활용한 클라우드 콘솔 및 리소스 접근 제어 기능 개발",
        "프로젝트·정책·사용자 생성 및 권한 부여 기능 개발",
        "Spring Scheduler를 사용한 정기 작업 구현",
        "OCI Compartment, Identity Domain, 사용자 및 정책 관리 기능 개발",
        "OCI Group, User, Policy 생성을 통한 IAM 권한 관리 자동화"
      ]
    }
  ],
  "technologies": [
    "Vue 3",
    "Spring Boot",
    "MyBatis",
    "GCP SDK",
    "Keycloak SDK",
    "SAML 2.0",
    "JUnit",
    "Jenkins",
    "Java",
    "Reflection",
    "SSH",
    "Azure SDK",
    "MS Graph",
    "Linux",
    "Guacamole",
    "OCI Java SDK",
    "Keycloak"
  ],
  "additionalExperience": [
    "커스텀 어노테이션(@EncryptTarget, @DecryptTarget)을 활용한 개인정보 암·복호화 처리",
    "사내 데이터베이스 v1.3.0 → v1.4.0 마이그레이션 수행",
    "Jenkins를 사용한 배포 경험"
  ]
}
