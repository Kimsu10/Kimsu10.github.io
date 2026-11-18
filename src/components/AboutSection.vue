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
        <h2>기존 구조를 이해하고,<br>
          <span class="muted-heading">확장성을 고려해 설계합니다</span>
        </h2>
      </div>
      <div class="about-copy">

        <p><strong>구조를 이해하고 확장성을 고려해 개발합니다</strong></p>

        <p>
          Spring Boot와 Vue 3를 기반으로 클라우드 인증·인가,
          SSO 페더레이션, 리소스 접근 제어 및 업무 자동화 기능을 개발하였습니다.<br>
          기존 시스템의 아키텍처를 분석하고, 일관성과 확장성을 갖춘 코드 구조를
          만들기 위해 다음과 같은 설계 원칙을 적용했습니다.
        </p>

        <p>
          기존 AWS 기반 시스템의 <strong>아키텍처와 인증 흐름을 분석</strong>한 뒤,
          GCP와 OCI 환경으로 기능을 확장했습니다.
        </p>

        <p>
          개발 과정에서는 <strong>Factory 패턴</strong>을 활용해
          <strong>CSP별 SDK 클라이언트 생성 책임을 분리</strong>하고,
          공통 로직의 재사용성을 높였습니다.
        </p>

        <p>
          또한 인증, 리소스 관리, 데이터 접근 등
          <strong>기능별 책임을 분리</strong>하여
          변경에 따른 영향을 줄이고 유지보수가 용이한 구조를 만들고자 했습니다.
        </p>

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
            <h2>
              흐름을 이해하고,<br>
              <span class="muted-heading">개선은 신중하게</span>
            </h2>
          </div>

          <div class="about-copy">

            <p>
              <strong>
                변화의 영향을 고려하고, 경험과 배움을 나누는 개발자
              </strong>
            </p>

            <p>
              새로운 기능을 구현하거나 기존 코드를 변경하기 전에
              <strong>시스템의 흐름과 설계 의도</strong>를
              먼저 파악하려고 노력합니다.
            </p>

            <p>
              변경 사항이 <strong>다른 기능과 시스템에 미칠 영향</strong>을
              검토하고, 안정성과 유지보수성을 함께 고려합니다.
            </p>

            <p>
              또한 혼자만의 판단에 의존하기보다 동료들과
              <strong>경험과 의견을 공유</strong>하며
              더 나은 해결책을 찾는 과정을 중요하게 생각합니다.
            </p>

            <p>
              명확한 의사소통과 지속적인 학습을 통해
              <strong>함께 성장하는 개발자</strong>가 되고자 합니다.
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
