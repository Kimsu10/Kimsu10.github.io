<script setup>
import { ChevronDown } from 'lucide-vue-next'
import { tagByCompanyProject as project } from './tagByCompany'
</script>

<template>
  <article class="project-story reveal">
    <span class="project-story-number" aria-hidden="true">03</span>
    <details class="project-story-content">
      <summary class="project-story-summary">
        <div class="project-story-intro">
          <div class="project-story-meta">
            <span>백엔드 · 업무 자동화</span>
            <span class="project-story-client">/ TagByCompany · {{ project.period }}</span>
          </div>
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>
<!--          <p class="project-team">팀 구성: {{ project.team }} · 담당 역할: {{ project.position }}</p>-->
          <div class="tag-list">
            <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
          <div class="project-collapsed-overview">
            <ul class="project-overview-list">
              <li v-for="work in project.sections" :key="work.title">
                <span class="project-overview-period">{{ work.period }}</span>
                <span class="project-overview-separator" aria-hidden="true">|</span>
                <span class="project-overview-title">{{ work.title }}</span>
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
        <section class="project-story-block" aria-labelledby="tagbycompany-contributions">
          <h4 id="tagbycompany-contributions">담당 업무와 기여</h4>
          <ol class="project-work-list">
            <li v-for="work in project.sections" :key="work.title" class="project-work">
              <div class="project-work-heading">
                <h5>{{ work.title }}</h5>
                <span class="project-work-period">{{ work.period }}</span>
              </div>
              <ul class="project-contributions tagbycompany-work-details">
                <li v-for="detail in work.details" :key="detail">{{ detail }}</li>
              </ul>
            </li>
          </ol>
        </section>
        <section class="project-story-block" aria-labelledby="tagbycompany-technologies">
          <h4 id="tagbycompany-technologies">사용 기술</h4>
          <p class="project-technologies">{{ project.technologies.join(' · ') }}</p>
        </section>
        <section class="project-story-block" aria-labelledby="tagbycompany-tools">
          <h4 id="tagbycompany-tools">협업 도구</h4>
          <p class="project-technologies">{{ project.tools.join(' · ') }}</p>
        </section>
      </div>
    </details>
  </article>
</template>

<style scoped>
.tagbycompany-work-details { margin-top: 14px; }
.project-team { font-weight: 600; }
</style>
