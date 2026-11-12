<script setup>
import { ref } from 'vue'

const activePage = ref(0)
</script>

<template>
  <section id="about" class="section section-alt about-section">
    <div
      class="container about-carousel reveal"
      role="region"
      aria-roledescription="캐러셀"
      aria-label="자기소개"
      @keydown.right.prevent="activePage = 1"
      @keydown.left.prevent="activePage = 0"
    >
      <div id="about-pages" class="about-pages">
        <div
          class="about-page about-layout"
          :class="{ 'is-active': activePage === 0 }"
          :style="{ '--page-offset': activePage === 0 ? '0%' : '-100%' }"
          :aria-hidden="activePage !== 0"
          :inert="activePage !== 0"
          role="group"
          aria-roledescription="슬라이드"
          aria-label="1 / 2: 아키텍처와 시스템 설계"
        >
      <div class="section-intro">
        <span class="section-kicker">01 / ABOUT ME</span>
        <h2>아키텍처 분석과 설계부터<br>
          <span class="muted-heading">확장 가능한 시스템 구현까지</span>
        </h2>
      </div>
      <div class="about-copy">
        <p><strong>보안과 지속 가능한 시스템을 생각하고 개발합니다</strong></p>
        <p>지난 1년 6개월간 Spring Boot와 Vue 3를 기반으로 클라우드 인증·인가, SSO 페더레이션, 리소스 접근 제어 및 업무 자동화 기능을 개발하였습니다.<br>기존 시스템의 아키텍처를 분석하고 이해하는 것을 시작으로, 일관성과 확장성을 갖춘 코드 구조를 설계하고 구현하기 위해 아래와 같이 코드를 구현하였습니다.</p>
        <p><strong>Factory Pattern을 활용하여 CSP별 SDK 클라이언트 및 인증 객체 생성 책임을 분리</strong>하고, 요청별 인증 정보의 독립성을 고려한 구조를 설계했습니다.</p>
        <p><strong>SSO, IAM, Resource 등 기능별로 책임을 분리 </strong>하여 새로운 클라우드 환경과 기능을 유연하게 확장할 수 있는 구조를 만들었습니다.</p>
        <p><strong>Command/Query 책임 분리</strong>를 통해 데이터 변경 및 조회 로직의 역할을 분리했습니다.</p>
        <p><strong>Repository 패턴을 활용하여 데이터 접근 책임을 분리</strong>하고, 공통 로직의 재사용성과 유지보수성을 개선했습니다.</p>
      </div>
        </div>
        <div
          class="about-page about-layout"
          :class="{ 'is-active': activePage === 1 }"
          :style="{ '--page-offset': activePage === 1 ? '0%' : '100%' }"
          :aria-hidden="activePage !== 1"
          :inert="activePage !== 1"
          role="group"
          aria-roledescription="슬라이드"
          aria-label="2 / 2: 아키텍처와 협업"
        >
          <div class="section-intro">
            <span class="section-kicker">01 / ABOUT ME</span>
            <h2>명확한 아키텍처 설계로<br><span class="muted-heading">소통의 질을 높입니다</span></h2>
          </div>
          <div class="about-copy">
            <p><strong>명확한 아키텍처로, 더 나은 소통을 지향합니다</strong></p>
            <p>
              저는 <strong>명확한 아키텍처는 코드의 이해를 돕고, 개발자 간 소통의 질을 높인다</strong>고 생각합니다.
              <br>
              아무리 잘 작성된 코드라도 혼자만의 시각으로는 개선에 한계가 있습니다.</p>
            <p><strong>명확한 아키텍처와 일관된 설계 원칙</strong>을 바탕으로 작성된 코드는 동료의 이해를 돕고, 다양한 의견과 새로운 관점을 나눌 수 있는 출발점이 됩니다.
            </p>
            <p>
            저는 이러한 협업을 통해 함께 이해하고 개선하며,<strong>지속적으로 확장할 수 있는 시스템을 만드는 개발자</strong>가 되고자 합니다.
            </p>
          </div>
        </div>
      </div>
      <div class="about-page-dots" role="group" aria-label="자기소개 페이지 선택">
        <button
          v-for="page in 2"
          :key="page"
          type="button"
          class="about-page-dot"
          :class="{ 'is-active': activePage === page - 1 }"
          :aria-label="`${page}번째 자기소개 보기`"
          :aria-pressed="activePage === page - 1"
          aria-controls="about-pages"
          @click="activePage = page - 1"
        >
          <span aria-hidden="true"></span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section { padding-bottom: 40px; }
.about-layout { column-gap: 48px; }
.section-intro h2 {
  font-size: clamp(30px, 3.8vw, 48px);
  line-height: 1.35;
  letter-spacing: -1.5px;
}
.about-pages { display: grid; overflow: hidden; }
.about-page {
  grid-area: 1 / 1;
  min-width: 0;
  opacity: 0;
  visibility: hidden;
  transform: translateX(var(--page-offset));
  transition: transform .4s ease, opacity .4s ease, visibility .4s;
}
.about-page.is-active { opacity: 1; visibility: visible; }
.about-page-dots { display: flex; justify-content: center; gap: 4px; margin-top: 56px; }
.about-page-dot { display: grid; place-items: center; width: 32px; height: 32px; padding: 0; border: 0; background: transparent; }
.about-page-dot span { width: 9px; height: 9px; border-radius: 50%; background: #475569; opacity: .25; transition: opacity .2s, transform .2s; }
.about-page-dot.is-active span { opacity: 1; transform: scale(1.15); }
.about-page-dot:hover span { opacity: .7; }
.about-page-dot:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; border-radius: 50%; }
@media (max-width: 720px) {
  .about-section { padding-bottom: 28px; }
  .about-page-dots { margin-top: 40px; }
}
</style>
