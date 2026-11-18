import { ShieldCheck, Terminal, Server, Cloud } from 'lucide-vue-next'

export const profile = {
  name: '김수정',
  role: 'DevOps',
  intro: '기존 시스템의 구조를 이해하고 개선하는 개발자',
  description: '다양한 클라우드 SDK를 활용하고 SSO/Federation을 연동하여, 리소스 등록 및 접근 제어 기능을 개발했습니다.\n단순한 기능 구현을 넘어 코드의 가독성과 유지보수성을 고려하며, 변화에 유연하게 대응할 수 있는 구조를 고민합니다.',
  email: 'betnwjd25@gmail.com',
  github: 'https://github.com/Kimsu10',
}
export const navigation = ['About', 'Skills', 'Experience', 'Projects', 'Contact']
export const skillGroups = [
  { name: 'Backend', skills: ['Java', 'Spring Boot', 'Node.js', 'Express', 'MyBatis', 'MySQL', 'PostgreSQL'] },
  { name: 'Frontend', skills: ['JavaScript', 'TypeScript', 'Vue 3', 'Pinia', 'React', 'HTML / CSS'] },
  { name: 'Cloud & Identity', skills: ['AWS', 'GCP', 'Azure', 'OCI', 'Keycloak'] },
  { name: 'Infrastructure', skills: ['Git', 'Linux', 'SSH', 'Jenkins', 'Docker', 'Kubernetes', 'Argo CD', 'Helm' ] },
]
export const experiences = [
  { date: '2025.06 ~ 현재',
    role: '삼성SDS 클라우드 접근 관리 시스템 개발',
    company: '와글와이즈 · 정규직/풀스택',
    description: 'Spring Boot와 Vue 3 기반 클라우드 접근 관리 시스템 개발 및 고도화',
    details: [
      'Spring Boot와 Vue 3 기반 공지사항 및 게시판 기능 구현 및 고도화',
      'GCP·OCI SSO/Federation 연동 및 IAM·리소스 접근 제어 기능 구현',
      'AWS·Azure 리소스 접근 제어 및 계정 관리 기능 고도화 및 유지보수',
      '이중 SSH 터널링과 계정 관리 자동화를 통한 멀티 클라우드 리소스 접근 기능 개발',
    ],
    tags: ['Spring Boot', 'Vue 3', 'AWS', 'Azure', 'GCP', 'SCP', 'OCI', 'Linux', 'SSH', 'Jenkins', 'Kubernetes', 'Git', 'Argo CD', 'MyBatis', 'MySQL', 'PostgreSQL' ] },
  {
    date: '2023.07 ~ 2023.08',
    role: '한의사용 에디터 플러그인 고도화',
    company: '메디스트림 · 임시직/프론트엔드',
    description: 'Vue.js와 ProseMirror를 사용한 사내 에디터 고도화',
    details: [
      '확장성과 유지보수성을 고려한 모듈화 및 스키마 설계',
      '사용자가 직관적으로 글자 크기를 조정할 수 있도록 UI와 동작 방식 개선',
      '일반 텍스트와 테이블 셀에서 글자 크기 변경 및 내부·외부 복사·붙여넣기 동작 구현과 QA 수행',
    ],
    tags: ['Vue 3', 'ProseMirror'],
  },
  {
    date: '2022.12.09 ~ 2023.01.08',
    role: '인플루언서 광고 모니터링 업무 자동화',
    company: '태그바이컴퍼니 · 임시직/백엔드',
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
  "title": "클라우드 접근 관리 시스템 (SingleID CAM)",
  "category": "클라우드",
  "client": "삼성SDS 프로젝트",
  "description": "여러 클라우드의 콘솔과 리소스 접근을 관리하는 CAM 시스템에서 관리자 페이지, SSO 페더레이션, 자원 접근 제어 및 계정 관리 기능을 개발했습니다.",
  "tags": [
    "Spring Boot",
    "Vue 3",
    "MyBatis",
    "PostgresSQL",
    "MySQL",
    "AWS",
    "Azure",
    "GCP",
    "SCP",
    "OCI",
    "Linux",
    "Git",
    "JUnit",
    "Jenkins",
    "Docker",
    "Kubernetes",
    "SAML 2.0",
    "SSH",
  ],
  "contributions": [
    {
      "title": "공지사항 및 게시판 기능 개발·고도화",
      "period": "2025.06 ~ 2025.08",
      "process": {
        "title": "공지사항 및 게시판 기능 개발·고도화",
        "technologies": ["Vue 3", "Spring Boot", "MyBatis", "PostgreSQL"],
        "summary": "기존 시스템의 아키텍처와 설계 패턴, 사용자 역할별 접근 권한 및 데이터베이스 구조를 분석한 뒤, 공지사항과 게시판의 CRUD 기능을 개발하고 실시간 알림 기능을 고도화했습니다.",
        "sections": [
          {
            "title": "주요 구현 기능",
            "items": [
              "관리자 공지사항 작성 및 실시간 알림 기능 개발",
              "게시판 CRUD 및 이미지·첨부파일 미리보기 기능 구현",
              "댓글·대댓글 CRUD 기능 개발"
            ]
          },
          {
            "title": "개발 시 고려 사항",
            "items": [
              "로그인한 사용자의 역할에 따른 기능 및 데이터 접근 권한 제어",
              "공지사항 등록 시 사용자 화면에 실시간으로 알림을 전달하는 방식",
              "게시글 작성 및 수정 화면의 Form 컴포넌트 재사용",
              "이미지·파일 업로드 시 허용 확장자, 파일 크기 및 저장 경로 관리"
            ]
          },
          {
            "title": "문제 및 해결 과정",
            "issues": [
              {
                "title": "공통 모듈에 포함된 게시판 SQL 수정의 제약",
                "problem": "게시판 관련 Mapper가 공통 LEGO 모듈에 포함되어 있어 CAM 프로젝트의 요구사항에 맞게 SQL을 수정하기 어려웠습니다.",
                "solution": "게시판 관련 Mapper를 CAM 프로젝트로 분리하고, CAM 내부 Mapper를 참조하도록 변경하여 프로젝트별 요구사항에 맞게 SQL을 관리할 수 있도록 개선했습니다."
              },
              {
                "title": "공지사항 등록 후 실시간 알림 반영 문제",
                "problem": "관리자가 공지사항을 등록해도 사용자 화면에 알림이 즉시 반영되지 않았습니다.",
                "solution": "SSE(Server-Sent Events)를 활용하여 서버에서 사용자 브라우저로 알림 이벤트를 전달하고, Vue 3의 Pinia Store를 통해 알림 상태를 관리하여 화면에 반영했습니다."
              }
            ]
          },
          {
            "title": "구현 결과",
            "items": [
              "관리자와 일반 사용자 역할에 따라 게시글 작성 화면 및 사용 가능한 기능을 구분",
              "관리자가 공지사항의 작성·수정·삭제, 알림 여부 및 게시 기간을 설정할 수 있도록 구현",
              "업로드된 이미지와 첨부파일을 2개 Pod에 각각 저장하도록 구성",
              "관리자가 여러 게시글을 선택하여 일괄 삭제할 수 있는 기능 구현",
              "공지사항 등록 시 사용자에게 실시간 알림을 제공하고, 첨부 이미지 미리보기 기능 지원",
              "Q&A 및 FAQ 게시판에서 댓글·대댓글을 통한 관리자와 사용자 간 질의응답 기능 구현"
            ]
          }
        ]
      },
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
      "process": {
        "technologies": ["Vue 3", "Spring Boot", "MyBatis", "PostgreSQL", "Google Cloud SDK", "Keycloak", "SingleID", "SAML 2.0", "Jenkins"],
        "summary": [
          "기존 CAM 시스템의 아키텍처와 인증·인가 구조를 분석하고, AWS 중심으로 구현되어 있던 클라우드 접근 관리 기능을 GCP 환경으로 확장했습니다.",
          "GCP의 프로젝트 및 조직 구조, 도메인 검증, 서비스 계정 기반 프로젝트 간 접근 권한, IAM 권한 관리 단위와 SSO/Federation 구성 방식을 분석하여 GCP 콘솔 및 리소스 접근 제어 기능을 개발했습니다."
        ],
        "sections": [
          {
            "title": "주요 구현 기능",
            "items": [
              "서비스 계정 기반 Cross-Project IAM 권한 설정 및 Target 프로젝트 리소스 접근 기능 개발",
              "GCP SDK를 활용한 IAM 권한 관리, 커스텀 역할 및 정책 설정, 리소스 조회·관리 기능 구현",
              "Keycloak 및 SAML 2.0 기반 GCP SSO/Federation 연동과 Realm·사용자 관리 기능 개발",
              "GCP 감사 로그 조회 및 사용자 활동 추적 기능 구현",
              "JUnit 기반 테스트 수행 및 Jenkins를 활용한 배포·운영 환경 검증"
            ]
          },
          {
            "title": "개발 시 고려 사항",
            "numbered": true,
            "items": [
              "GCP의 조직·프로젝트 구조와 Federation 및 IAM 권한 관리 단위 분석",
              "CAM 서비스 계정에 필요한 Target 프로젝트 권한과 사용자별 최소 권한 범위 검토",
              "GCP SDK 클라이언트 생성 및 API 호출 과정의 중복 로직 최소화",
              "도메인 검증, SSO 연동 및 Keycloak·GCP 인증 정보의 검증 로직 공통화 검토",
              "IAM 정책 생성 시 복잡한 JSON 입력을 최소화하고 잘못된 정책 등록을 방지하는 방법",
              "사용자 활동 추적 및 보안 감사에 필요한 로그 수집 범위 검토"
            ]
          },
          {
            "title": "문제 및 해결 과정",
            "issues": [
              {
                "title": "GCP와 Keycloak 간 SSO 연동 과정에서 SAML 검증 오류 발생",
                "problem": [
                  "GCP와 Keycloak 간 SAML Federation 구성 후 SSO 로그인 과정에서 SAML 검증 오류가 발생했습니다.",
                  "기존 AWS 연동 방식에서는 CAM에서 Keycloak을 활용해 AWS에 전달할 SAML Response를 생성하는 흐름을 사용했습니다. 반면 GCP의 SP-initiated SSO에서는 GCP가 생성한 SAML AuthnRequest에 대한 응답이 필요했기 때문에 기존 인증 처리 방식을 그대로 적용하기 어려웠습니다."
                ],
                "solutionItems": [
                  "GCP를 Service Provider(SP), Keycloak을 Identity Provider(IdP)로 구성",
                  "GCP에서 생성한 SAML AuthnRequest를 Keycloak의 SAML 처리 엔드포인트로 전달",
                  "Keycloak과 SingleID 간 별도의 SP·IdP 연동을 구성하여 사용자 인증 처리",
                  "인증 완료 후 Keycloak이 GCP의 요청에 대응하는 SAML Response를 반환하도록 인증 흐름 구성"
                ],
                "outcome": "이를 통해 GCP와 Keycloak, SingleID 간 SAML 기반 SSO 인증 흐름을 연동했습니다."
              },
              {
                "title": "복잡한 IAM 정책 JSON 입력으로 인한 설정 오류",
                "problem": "사용자가 IAM 정책을 JSON 형식으로 직접 작성하는 과정에서 잘못된 구조나 값이 입력될 가능성이 있었습니다.",
                "solutionItems": [
                  "JSON을 직접 작성하지 않아도 필요한 권한 정보를 입력하면 IAM 정책 요청 형식으로 변환하도록 개선",
                  "GCP에서 제공하는 정책 검증 기능을 활용하여 유효하지 않은 정책 요청을 검증",
                  "잘못된 정책이 전달되면 오류를 반환하도록 처리"
                ],
                "outcome": "이를 통해 사용자의 정책 작성 부담을 줄이고 잘못된 설정 요청을 방지할 수 있도록 개선했습니다."
              }
            ]
          },
          {
            "title": "구현 결과",
            "items": [
              "CAM의 서비스 계정을 활용하여 Target GCP 프로젝트의 IAM 권한 및 리소스 관리 기능 구현",
              "사용자별 역할과 권한에 따른 GCP VM 접근 및 계정 관리 기능 개발",
              "GCP 감사 로그를 활용한 사용자 활동 조회 기능 구현",
              "GCP SSO/Federation 연동을 통해 SingleID 기반 인증 흐름 구성",
              "IAM 정책 입력 방식 개선을 통한 정책 관리 편의성 향상"
            ]
          }
        ]
      },
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
      "title": "AWS EC2·RDS 자원 접근 제어와 계정 관리 기능 고도화",
      "period": "2026.01 ~ 2026.03",
      "process": {
        "title": "AWS·Azure 클라우드 리소스 등록 및 접근 제어 기능 고도화",
        "technologies": ["Java", "Spring Boot", "Vue 3", "SSHJ", "Azure SDK", "Linux", "PostgreSQL", "MyBatis", "JUnit"],
        "technologyLabel": "기술 스택:",
        "summary": [
          "기존 비밀번호 기반 관리자 인증에 PEM형식의 SSH 개인키 인증을 추가하고, 이중 경유 SSH 터널링과 계정 관리 자동화를 구현했습니다.",
          "또한 단건 리소스 등록 방식을 다중 리소스 등록 방식(Multi-Enrollment)로 확장하고, 사용자가 브라우저에서 여러 리소스를 등록할 수 있도록 UI를 개선했습니다."
        ],
        "sections": [
          {
            "title": "주요 구현 기능",
            "items": [
              "AWS 및 Azure VM 리소스 등록과 CAM 관리자 계정 관리 기능 개발",
              "PEM 키 기반 SSH 인증 및 KMS를 활용한 인증 키 암호화 저장 기능 구현",
              "SSHJ 기반 단일·이중 경유 SSH 터널링 및 포트 포워딩 기능 개발",
              "Linux 명령어 기반 관리자·사용자 계정 생성 및 권한 관리 자동화",
              "Vue 3 기반 Multi-Enrollment 및 동적 리소스 등록 UI 개발",
              "Azure VM 인바운드·아웃바운드 네트워크 규칙 자동 설정 기능 개발"
            ]
          },
          {
            "title": "개발 시 고려 사항",
            "items": [
              "기존 AWS 리소스 등록 구조를 Azure로 확장할 때 공통화할 수 있는 기능과 CSP별로 분리해야 할 기능",
              "비밀번호 및 PEM 키를 이용한 SSH 인증 방식의 차이와 인증 정보의 안전한 저장·관리",
              "JumpHost와 Bastion을 경유하는 네트워크 환경에서 Target 서버에 접근하기 위한 SSH 터널링 구조",
              "관리자 계정 생성 이후 사용자 역할과 권한에 따른 Target 서버 계정 생성 및 접근 제어 방식",
              "여러 리소스를 동시에 등록할 때 사용자 입력 편의성과 리소스별 진행 상태 표시 방법",
              "동적 리소스 등록·삭제 과정에서 각 입력 항목의 고유 식별자를 유지하는 방법"
            ]
          },
          {
            "title": "문제 및 해결 과정",
            "issues": [
              {
                "title": "비밀번호 기반 인증 방식의 제약",
                "problem": "기존에는 리소스 등록 시 root 계정과 비밀번호를 이용한 인증 방식만 지원했습니다. PEM 키를 사용하는 VM에서는 기존 방식으로 관리자 계정을 등록하기 어려웠습니다.",
                "solutionItems": [
                  "PEM 키 기반 SSH 인증 방식을 추가하여 비밀번호 또는 PEM 키를 선택적으로 사용할 수 있도록 개선",
                  "PEM 키 정보를 관리하기 위한 별도 데이터베이스 테이블 설계 및 생성",
                  "KMS를 활용하여 PEM 키를 암호화한 뒤 저장하도록 구현",
                  "SSHJ를 이용하여 인증 방식에 따라 SSH 연결을 생성하도록 기능 확장"
                ]
              },
              {
                "title": "다중 경유 SSH 연결 및 계정 관리 자동화",
                "problemLabel": "구현 과제",
                "problem": "Target 서버에 직접 접근할 수 없는 네트워크 환경에서도 JumpHost와 Bastion을 경유하여 리소스에 접근할 수 있어야 했습니다.",
                "solutionItems": [
                  "SSHJ를 활용하여 JumpHost → Target 연결을 위한 SSH 터널링 구현",
                  "JumpHost → Bastion → Target 구조의 이중 경유 SSH 터널링 구현",
                  "입력받은 초기 관리자 계정 정보를 사용하여 Bastion 및 Target 서버에 CAM 전용 관리자 계정 생성",
                  "이후 CAM 관리자 계정을 통해 사용자 권한을 확인하고, Target VM에 접근 계정을 생성하도록 자동화"
                ]
              },
              {
                "title": "Multi-Enrollment 등록 방식의 사용자 편의성 개선",
                "problem": [
                  "기존에는 AWS 리소스를 한 건씩 등록할 수 있었습니다. 여러 VM을 등록하려면 반복적인 입력 작업이 필요했습니다.",
                  "초기에는 Excel 파일을 활용한 일괄 등록 방식을 구현했으나, 사용자가 파일을 작성하고 업로드해야 하는 번거로움이 있었습니다."
                ],
                "solutionItems": [
                  "Excel 기반 등록 방식에서 브라우저 기반 다중 등록 방식으로 변경",
                  "Vue 3에서 사용자가 리소스를 추가할 때마다 등록 템플릿을 동적으로 생성하도록 구현",
                  "리소스별 등록 진행 상태를 STANDBY, SUCCESS, ERROR, FAILED로 구분하여 화면에 표시"
                ]
              },
              {
                "title": "동적 리소스 등록 UI의 ID 중복 문제",
                "problem": [
                  "Multi-Enrollment 화면에서 리소스 등록 성공 또는 삭제 후 새로운 리소스를 추가하는 과정에서 ID가 중복되는 문제가 발생했습니다.",
                  "이로 인해 동적으로 생성한 리소스 항목을 고유하게 식별하기 어려웠습니다."
                ],
                "solutionItems": [
                  "기존 리소스 항목의 ID 생성 방식을 UUID 기반으로 변경",
                  "각 등록 템플릿 생성 시 고유한 UUID를 부여하도록 개선",
                  "리소스 추가·삭제 이후에도 항목별 고유 식별자를 유지하도록 처리"
                ]
              }
            ]
          },
          {
            "title": "구현 결과",
            "items": [
              "AWS 중심의 리소스 등록 기능을 Azure VM까지 확장",
              "비밀번호 및 PEM 키 기반 SSH 인증 방식 지원",
              "KMS를 활용한 PEM 키 암호화 저장 기능 구현",
              "JumpHost·Bastion 경유 SSH 터널링 및 CAM 관리자 계정 생성 자동화",
              "사용자 역할과 권한에 따른 Target VM 계정 생성 및 접근 관리 기능 구현",
              "단건 등록에서 브라우저 기반 Multi-Enrollment 방식으로 확장",
              "UUID 적용을 통한 동적 리소스 등록 UI의 ID 중복 문제 해결"
            ]
          }
        ]
      },
      "rationale": "여러 클라우드 자원을 등록할 때도 자원별 사용자 권한을 확인할 수 있도록 등록 절차와 접속 시점의 권한 검증을 함께 다뤘습니다. 대상 서버에 직접 연결하기 어려운 환경을 고려해 JumpHost와 Bastion을 거치는 SSH 터널링을 구현했습니다.",
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
        "자원 등록 및 접속 시 PEM 키 또는 비밀번호로 서버에 인증한 뒤, 관리자 계정 생성 및 접근 권한 부여를 자동화",
        "SSH 기반 JumpHost → Bastion → Target 서버 간 포트 포워딩 및 터널링 기능 고도화",
        "Linux 서버에서 명령어를 활용한 관리자 계정 생성, 비밀번호 변경 및 사용자 권한 관리 자동화",
        "자원 연결 시 사용자 역할 및 권한 검증 기능 고도화",
        "JUnit 기반 단위 테스트 작성"
      ]
    },
    {
      "title": "멀티 클라우드 리소스 등록 및 접근 제어 시스템 고도화",
      "period": "2026.04 ~ 2026.08",
      "process": {
        "technologyLabel": "기술 스택:",
        "technologies": ["Java", "Spring Boot", "Vue 3", "Azure SDK", "SSH", "Linux", "Apache Guacamole", "PostgreSQL", "MyBatis"],
        "summary": [
          "기존 Multi-Enrollment 시스템의 구조를 분석하고, AWS 중심의 리소스 등록 및 접근 제어 기능을 Azure, GCP, SCP_V1 및 온프레미스 환경까지 확장했습니다.",
          "기존 Linux 자원 및 CAM 관리자 계정 자동 생성 방식에 Windows 자원과 사용자 계정 기반 수동 등록 기능을 추가하고, Apache Guacamole를 활용한 Web Terminal 접속 방식을 구현했습니다.",
          "또한 지원 CSP와 리소스 및 접속 방식이 증가함에 따라, 코드에서 관리하던 설정을 DB 기반으로 전환하고 테넌트별로 허용할 리소스와 접속 방식을 관리할 수 있는 기능을 개발했습니다."
        ],
        "sections": [
          {
            "title": "주요 구현 기능",
            "items": [
              "Azure SDK를 활용한 NSG(Network Security Group) 인바운드·아웃바운드 보안 규칙 자동 생성 기능 개발",
              "Multi-Enrollment 지원 환경을 AWS, Azure, GCP, SCP_V1 및 온프레미스로 확대하고 Windows 자원 등록 기능 추가",
              "기존 CAM 관리자 계정 자동 생성 방식에 사용자가 보유한 계정을 활용하는 수동 Resource Enrollment 기능 추가",
              "라우팅 테이블 및 로드밸런서 환경을 고려한 Bastion·Target VM의 IP 및 Port 변경 기능 개발",
              "Apache Guacamole 기반 Web Terminal을 추가하여 브라우저에서 Linux 및 Windows 자원에 접근할 수 있도록 개선",
              "테넌트별 CSP, Resource Type, Connection Type 관리 기능 및 REST API 개발",
              "Resource Enrollment 관련 270가지 테스트 시나리오 검증 및 Azure 운영 VOC 대응"
            ]
          },
          {
            "title": "개발 시 고려 사항",
            "numbered": true,
            "items": [
              "기존 Multi-Enrollment 구조를 여러 CSP 및 온프레미스 환경으로 확장할 때 공통화할 기능과 환경별로 분리해야 할 기능",
              "CAM 관리자 계정 자동 생성 방식과 사용자가 보유한 계정을 활용하는 수동 등록 방식의 차이",
              "라우팅 테이블 및 로드밸런서 등 다양한 네트워크 환경에서 실제 리소스 접속에 필요한 IP와 Port 관리 방식",
              "Linux 및 Windows 자원에 대한 PuTTY·Web Terminal 접속 방식의 차이와 지원 범위",
              "테넌트별 DB 접근 권한이 제한된 환경에서 CSP·리소스·접속 유형을 유연하게 관리할 수 있는 구조",
              "CSP, 리소스 유형, 등록 방식 및 접속 환경에 따른 다양한 Resource Enrollment 시나리오 검증"
            ]
          },
          {
            "title": "문제 및 해결 과정",
            "issues": [
              {
                "title": "기존 자동 계정 생성 방식의 제약",
                "problem": [
                  "기존 Resource Enrollment는 CAM에서 관리자 계정을 자동으로 생성하고 관리하는 방식을 중심으로 구현되어 있었습니다.",
                  "그러나 이미 운영 중인 리소스에 사용자가 보유한 계정을 그대로 활용해야 하는 경우에는 기존 등록 방식만으로 대응하기 어려웠습니다."
                ],
                "solutionItems": [
                  "CAM 관리자 계정 자동 생성 방식 외에 기존 사용자 계정을 활용하는 수동 등록 기능 추가",
                  "Resource Enrollment 과정에서 자동 등록과 수동 등록 방식을 지원하도록 기능 확장",
                  "AWS 외에도 Azure, GCP, SCP_V1 및 온프레미스 환경에서 다양한 리소스를 등록할 수 있도록 지원 범위 확대"
                ]
              },
              {
                "title": "라우팅 테이블 및 로드밸런서 환경에서의 리소스 접속 정보 관리",
                "problem": [
                  "기존에는 Resource Enrollment 과정에서 입력한 Public IP와 Private IP를 VM에 등록된 IP 정보와 비교하고 DB에 저장했습니다.",
                  "그러나 등록 이후 VM의 IP가 변경되거나 라우팅 테이블 및 로드밸런서를 경유하여 접속하는 환경에서는 실제 접속에 필요한 IP와 Port가 기존 등록 정보와 달라질 수 있었습니다."
                ],
                "solutionItems": [
                  "Resource Enrollment 완료 이후에도 Bastion 및 Target VM의 IP와 Port를 변경할 수 있는 기능 개발",
                  "등록된 리소스의 네트워크 환경에 따라 실제 접속에 사용할 IP와 Port를 수정할 수 있도록 개선",
                  "다양한 네트워크 환경에서도 리소스 접속 정보를 유연하게 설정할 수 있도록 기능 확장"
                ]
              },
              {
                "title": "기존 PuTTY 기반 접속 방식의 제약",
                "problem": [
                  "기존에는 PuTTY를 활용한 Linux 자원 접속 방식을 지원했습니다.",
                  "Windows 자원에 대한 원격 관리 기능을 추가하고, 별도의 PuTTY 클라이언트 없이 브라우저에서 직접 리소스에 접근할 수 있는 접속 방식이 필요했습니다."
                ],
                "solutionItems": [
                  "Apache Guacamole 기반 Web Terminal 접속 방식 추가",
                  "기존 PuTTY 접속 방식을 유지하면서 Web Terminal을 선택할 수 있도록 기능 확장",
                  "Linux 및 Windows 자원을 브라우저에서 원격으로 관리할 수 있도록 접속 기능 추가"
                ]
              },
              {
                "title": "지원 CSP 및 접속 방식 증가에 따른 설정 관리의 어려움",
                "problem": [
                  "지원 CSP와 Resource Type, Connection Type이 증가하면서 코드에서 허용 가능한 유형을 관리하는 방식이 복잡해졌습니다.",
                  "또한 개발 환경 외 다른 테넌트의 DB에 직접 접근할 권한이 없어, 테넌트별 지원 환경이나 접속 방식을 변경할 때 운영상 제약이 있었습니다."
                ],
                "solutionItems": [
                  "기존 코드 기반 설정 관리 방식을 DB 기반 관리 구조로 변경",
                  "콘솔 접근 제어용 CSP Type과 리소스 접근 제어용 CSP Type을 분리하여 관리",
                  "테넌트별로 허용할 Resource Type(Compute/DB)과 Connection Type(PuTTY/Web Terminal)을 설정할 수 있도록 DB 구조 구성",
                  "관리자가 테넌트별 지원 CSP, 리소스 유형 및 접속 방식을 관리할 수 있는 REST API와 관리자 페이지 개발"
                ],
                "outcome": "이를 통해 새로운 CSP나 접속 방식이 추가될 때 코드에 고정된 설정에 대한 의존도를 줄이고, 테넌트별 설정을 관리할 수 있도록 개선했습니다."
              },
              {
                "title": "Azure Client Secret 만료로 인한 리소스 등록 오류",
                "problem": [
                  "Azure Resource Enrollment 과정에서 Azure 계정이 정상적으로 등록되지 않는 문제가 발생했습니다.",
                  "원인을 분석한 결과, Azure 연동에 사용되는 상위 관리 계정의 Client Secret이 만료되어 인증 요청이 실패하고 있었습니다.",
                  "당시 사용 중이던 Azure Client Secret은 90일의 만료 기간으로 설정되어 있었으며, 만료 이후에는 기존 인증 정보를 사용한 Azure SDK 요청이 정상적으로 처리되지 않았습니다."
                ],
                "solutionItems": [
                  "Azure 계정 등록 실패 원인을 분석하여 상위 관리 계정의 Client Secret 만료 문제 확인",
                  "인증 정보의 만료 기간과 재발급 필요 여부 확인",
                  "상위 관리 계정에 대한 직접적인 관리 권한이 없어 담당자에게 Client Secret 재발급 요청",
                  "인증 정보 갱신을 통한 Azure 연동 정상화 대응"
                ]
              }
            ]
          },
          {
            "title": "구현 결과",
            "items": [
              "Multi-Enrollment 지원 환경을 AWS·Azure·GCP·SCP_V1·온프레미스로 확대",
              "기존 Linux 중심의 리소스 등록 기능에 Windows 자원 지원 추가",
              "CAM 관리자 계정 자동 생성 및 기존 사용자 계정 기반 수동 등록 방식 지원",
              "등록 완료된 Bastion·Target VM의 IP 및 Port 변경 기능을 통한 다양한 네트워크 환경 대응",
              "PuTTY 외에 Apache Guacamole 기반 Web Terminal 접속 방식 추가",
              "코드 기반 CSP·리소스·접속 유형 설정을 DB 기반 테넌트별 관리 구조로 개선",
              "관리자 페이지 및 REST API를 통한 테넌트별 허용 CSP·Resource Type·Connection Type 관리 기능 구현",
              "Resource Enrollment 관련 270가지 테스트 시나리오 검증",
              "Azure NSG 보안 규칙 자동 생성 기능 개발 및 Client Secret 만료로 인한 리소스 등록 오류 원인 분석·VOC 대응"
            ]
          }
        ]
      },
      "rationale": "환경에 따라 자동 등록에 필요한 권한이나 접속 도구를 사용하기 어려울 수 있어 선택지를 넓혔습니다. 기존 사용자 계정을 활용한 수동 등록을 추가하고, 브라우저에서 Linux 자원에 접속할 수 있도록 Web Terminal을 도입했습니다.",
      "technologies": [
        "Java",
        "Spring Boot",
        "Vue 3",
        "SSH",
        "Linux",
        "Guacamole"
      ],
      "details": [
        "기존 CAM 관리자 계정 자동 생성 방식에 사용자 보유 계정을 활용한 수동 Resource Enrollment 기능 추가",
        "Multi-Enrollment 지원 환경을 AWS·Azure·GCP·SCP_V1·온프레미스로 확대하고 Windows 자원 지원",
        "Azure SDK를 활용한 NSG 인바운드·아웃바운드 보안 규칙 자동 생성 및 Client Secret 만료 관련 VOC 대응",
        "코드 기반 CSP·리소스·접속 유형 설정을 DB 기반 테넌트별 관리 구조로 개선하고 관리자 페이지 및 REST API 개발",
        "Resource Enrollment 관련 270가지 테스트 시나리오 검증 및 브랜치 통합·관리"
      ]
    },
    {
      "title": "OCI 콘솔 및 리소스 접근 제어 시스템 구축",
      "period": "2026.10 ~ 진행중",
      "rationale": "기존 클라우드 인증 구조와의 일관성, SAML 인증 요청 및 응답의 무결성, 사용자 편의성을 고려했습니다.",
      "process": {
        "technologies": ["Java", "Spring Boot", "OCI Java SDK", "Keycloak", "SingleID", "SAML 2.0", "IAM"],
        "technologyLabel": "기술 스택:",
        "summary": [
          "기존 CAM 시스템의 클라우드 인증·인가 및 리소스 접근 제어 구조를 분석하고, OCI 환경을 지원하도록 기능을 확장했습니다.",
          "OCI의 Tenancy, Compartment, Identity Domain 구조와 IAM 권한 관리 체계를 분석하여 클라우드 리소스 및 사용자 관리 기능을 개발했습니다.",
          "또한 OCI Cross-Tenancy Policy의 권한 제약을 해결하기 위한 인증 구조를 구성하고, Keycloak과 SingleID를 활용하여 Identity Domain별 SAML SSO 인증 및 접근 제어 기능을 구현했습니다."
        ],
        "sections": [
          {
            "title": "주요 구현 기능",
            "items": [
              "OCI Java SDK를 활용한 Tenancy·Compartment·Identity Domain 조회 및 관리 기능 개발",
              "OCI Group·User·Policy 생성 및 IAM 권한 부여 자동화",
              "Target Tenancy의 API Key 인증을 활용한 OCI 리소스 관리 기능 구현",
              "OCI Identity Domain별 Keycloak SAML Client 및 Role Mapping을 통한 접근 권한 관리",
              "Keycloak·SingleID 기반 SAML 2.0 SSO/Federation 연동",
              "Keycloak Custom Browser Flow를 활용한 SSO 로그인 과정 개선",
              "CAM 프로젝트별 Identity Domain 및 사용자 관리 기능 개발"
            ]
          },
          {
            "title": "개발 시 고려 사항",
            "numbered": true,
            "items": [
              "OCI Tenancy·Compartment·Identity Domain의 계층 구조와 IAM 권한 관리 범위",
              "Cross-Tenancy Policy를 통한 Target Tenancy 리소스 관리 가능 범위 및 권한 제약",
              "Target Tenancy의 인증 정보를 안전하게 구성하고 OCI SDK 요청에 활용하는 방법",
              "여러 Identity Domain을 관리할 때 Keycloak Realm을 분리할지, Client·Role 기반으로 접근 권한을 구분할지에 대한 설계",
              "OCI Identity Domain의 SAML Metadata 및 Entity ID를 활용한 Federation 구성 방식",
              "SSO 로그인 시 불필요한 계정 설정 및 비밀번호 입력을 제거하기 위한 Keycloak 인증 흐름 구성"
            ]
          },
          {
            "title": "문제 및 해결 과정",
            "issues": [
              {
                "title": "OCI Cross-Tenancy Policy를 통한 Target Tenancy 관리 권한 제약",
                "problem": [
                  "OCI 공식 문서의 Cross-Tenancy Policy를 참고하여 Source Tenancy와 Target Tenancy 간 Endorse·Admit 정책을 구성했습니다.",
                  "그러나 Source Tenancy의 사용자 인증 정보로 Target Tenancy의 Identity Domain 관련 API를 호출하거나 일부 리소스 생성·관리 작업을 수행할 때 권한 오류가 발생했습니다.",
                  "Target Tenancy의 로컬 사용자 인증 정보를 사용한 요청은 정상적으로 처리되어, Cross-Tenancy Policy만으로는 필요한 관리 작업을 수행하기 어렵다는 점을 확인했습니다."
                ],
                "solutionItems": [
                  "Source Tenancy의 CAM 사용자에 대한 API Key 공개 키·개인 키 쌍 생성",
                  "Target Tenancy의 관리자에게 공개 키를 전달하여 Default Identity Domain에 CAM 전용 Group 및 User 구성",
                  "Target Tenancy의 CAM 사용자에게 필요한 IAM 권한 부여 및 공개 키 등록",
                  "Target Tenancy 사용자 인증 정보를 기반으로 OCI SDK 요청을 수행하도록 인증 구조 변경"
                ],
                "outcome": "이를 통해 Cross-Tenancy Policy에 의존하던 방식에서 Target Tenancy의 로컬 사용자 인증을 활용하는 방식으로 변경하여 필요한 리소스 관리 기능을 구현했습니다."
              },
              {
                "title": "여러 OCI Identity Domain에 대한 Keycloak Federation 관리 구조 설계",
                "problem": [
                  "OCI는 하나의 Tenancy 내에서 여러 Identity Domain을 생성할 수 있으며, CAM 프로젝트별로 별도의 Identity Domain을 사용하는 구조가 필요했습니다.",
                  "초기에는 Identity Domain마다 Keycloak Realm을 생성하여 사용자와 Federation을 분리하는 방식을 검토했습니다.",
                  "그러나 Realm별로 SingleID와의 Federation 및 Keycloak SAML IdP 설정을 구성해야 하므로, Identity Domain이 증가할수록 설정 및 운영 관리가 복잡해질 수 있었습니다."
                ],
                "solutionItems": [
                  "Identity Domain별 Realm 생성 대신 Keycloak Client·Role을 활용한 접근 제어 구조 설계",
                  "OCI Identity Domain의 SAML Metadata에서 Entity ID를 확인하고, 이를 기준으로 Keycloak SAML Client 구성",
                  "Identity Domain별 접근 권한을 구분하기 위한 Client Role 생성",
                  "사용자에게 해당 Client Role을 Mapping하여 접근 가능한 Identity Domain을 구분",
                  "OCI·Keycloak·SingleID 간 SAML 2.0 Federation을 구성하여 SSO 인증 흐름 연동"
                ],
                "outcome": "이를 통해 Keycloak Realm을 Identity Domain마다 생성하지 않고도, Client와 Role을 활용하여 도메인별 접근 권한을 관리할 수 있도록 구성했습니다."
              },
              {
                "title": "SSO 로그인 과정에서 추가 계정 설정 및 비밀번호 입력 발생",
                "problem": [
                  "OCI와 Keycloak, SingleID 간 SSO 인증 흐름을 구성하는 과정에서 사용자가 최초 로그인 시 Keycloak의 계정 정보 설정 화면이나 비밀번호 입력 화면으로 이동하는 문제가 발생했습니다.",
                  "CAM 및 SingleID에서 이미 인증된 사용자가 다시 계정을 설정하거나 비밀번호를 입력해야 하는 상황이었습니다."
                ],
                "solutionItems": [
                  "Keycloak Authentication 설정에서 Custom Browser Flow 구성",
                  "Identity Provider Redirector 및 인증 흐름 설정 검토",
                  "SAML 인증 이후 불필요한 계정 설정 및 비밀번호 입력 과정을 거치지 않도록 인증 흐름 변경",
                  "기존 CAM·SingleID 인증 정보를 활용하여 OCI SSO 로그인을 진행할 수 있도록 구성"
                ],
                "outcome": "이를 통해 사용자가 추가적인 Keycloak 계정 설정 및 비밀번호 입력 없이 SSO 인증을 진행할 수 있도록 개선했습니다."
              }
            ]
          },
          {
            "title": "구현 결과",
            "items": [
              "OCI Tenancy·Compartment·Identity Domain 기반 리소스 및 IAM 관리 기능 구현",
              "Target Tenancy의 API Key 인증을 활용한 리소스 생성·관리 기능 개발",
              "CAM 프로젝트별 Identity Domain 및 사용자 관리 기능 구현",
              "Keycloak Client·Role Mapping 기반 Identity Domain별 접근 권한 관리 구조 구성",
              "OCI·Keycloak·SingleID 간 SAML 2.0 SSO/Federation 연동",
              "Keycloak Custom Browser Flow를 통한 최초 로그인 과정 개선",
              "OCI Java SDK 기반 Group·User·Policy 생성 및 권한 관리 자동화"
            ]
          }
        ]
      },
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
        "OCI Compartment, Identity Domain, 사용자 및 정책 관리 기능 개발",
        "OCI Group, User, Policy 생성을 통한 IAM 권한 관리 자동화 (진행중)"
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
    "Jenkins 기반 애플리케이션 배포"
  ]
}
