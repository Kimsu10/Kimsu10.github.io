<script setup>
import { ChevronDown } from 'lucide-vue-next'
import { medistreamProject } from './medistream'
import proseMirrorImage from '../../images/proseMirror.png'
</script>

<template>
  <article class="project-story reveal">
    <span class="project-story-number" aria-hidden="true">02</span>
    <details class="project-story-content">
      <summary class="project-story-summary">
        <div class="project-story-intro">
          <div class="project-story-meta">
            <span>프론트엔드 · 에디터 플러그인</span>
            <span class="project-story-client">/ medistream · 2023.07 ~ 2023.08</span>
          </div>
          <h3>medistream · ProseMirror 에디터 플러그인 고도화</h3>
          <p>제목·본문 스타일 중심의 기존 에디터에 세부 글자 크기 선택 기능을 추가하고, 일반 텍스트와 테이블 셀에서 일관된 편집 경험을 제공하는 플러그인을 개발했습니다.</p>
          <div class="tag-list">
            <span v-for="tag in medistreamProject.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
          <div class="project-collapsed-overview">
            <ul class="project-overview-list">
              <li v-for="phase in medistreamProject.phases" :key="phase.period">
                <span class="project-overview-period">{{ phase.period }}</span>
                <span class="project-overview-separator" aria-hidden="true">|</span>
                <span class="project-overview-title">{{ phase.title }}</span>
              </li>
            </ul>
          </div>
        </div>
        <span class="project-story-toggle">
          <span>상세 보기</span>
          <ChevronDown :size="18" />
        </span>
      </summary>
      <div class="project-story-details">
        <section class="project-story-block" aria-labelledby="medistream-contributions">
          <h4 id="medistream-contributions">담당 업무와 기여</h4>
          <ol class="project-work-list">
            <li v-for="work in medistreamProject.sections" :key="work.title" class="project-work">
              <div class="project-work-heading"><h5>{{ work.title }}</h5></div>
              <ul class="project-contributions medistream-work-details">
                <li v-for="detail in work.details" :key="detail">{{ detail }}</li>
              </ul>
            </li>
          </ol>
        </section>
        <section class="project-story-block" aria-labelledby="medistream-technologies">
          <h4 id="medistream-technologies">사용 기술</h4>
          <p class="project-technologies">{{ medistreamProject.tags.join(' · ') }}</p>
        </section>
        <figure class="project-story-figure">
          <img
            :src="proseMirrorImage"
            alt="ProseMirror 에디터에서 테이블 셀의 글자 크기를 변경하고 개발자 도구로 font-size 적용을 확인하는 화면"
            width="735"
            height="459"
            loading="lazy"
          />
          <figcaption>ProseMirror 글자 크기 플러그인 적용 및 확인 화면</figcaption>
        </figure>
      </div>
    </details>
  </article>
</template>

<style scoped>
.medistream-work-details { margin-top: 14px; }
</style>
