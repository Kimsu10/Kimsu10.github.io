<script setup>
import { ChevronDown } from 'lucide-vue-next'
import { camProject } from '../../data/portfolio'
import singleIdImage from '../../images/singleId.png'
</script>

<template>
  <article class="project-story reveal">
    <span class="project-story-number" aria-hidden="true">01</span>
    <details class="project-story-content">
      <summary class="project-story-summary">
        <div class="project-story-intro">
          <div class="project-story-meta">
            <span>{{ camProject.category }}</span>
            <span class="project-story-client">/ {{ camProject.client }}</span>
          </div>
          <h3>{{ camProject.title }}</h3>
          <p>{{ camProject.description }}</p>
          <div class="tag-list">
            <span v-for="tag in camProject.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
          <div class="project-collapsed-overview">
            <ul class="project-overview-list">
              <li v-for="work in camProject.contributions" :key="work.title">
                <span class="project-overview-period">{{ work.period }}</span>
                <span class="project-overview-separator" aria-hidden="true">|</span>
                <span class="project-overview-title">{{ work.title }}</span>
              </li>
            </ul>
            <h4 class="project-additional-heading">그 외 경험</h4>
            <ul class="project-contributions">
              <li v-for="experience in camProject.additionalExperience" :key="experience">
                {{ experience }}
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
        <section class="project-story-block" aria-labelledby="cam-contributions">
          <h4 id="cam-contributions">담당 업무와 기여</h4>
          <ol class="project-work-list">
            <li v-for="work in camProject.contributions" :key="work.title" class="project-work">
              <div class="project-work-heading">
                <h5>{{ work.title }}</h5>
                <span v-if="work.period" class="project-work-period">{{ work.period }}</span>
              </div>
              <p class="project-work-technologies">{{ work.technologies.join(' · ') }}</p>
              <ul class="project-contributions">
                <li v-for="detail in work.details" :key="detail">{{ detail }}</li>
              </ul>
            </li>
          </ol>
        </section>
        <section class="project-story-block" aria-labelledby="cam-technologies">
          <h4 id="cam-technologies">사용 기술</h4>
          <p class="project-technologies">{{ camProject.technologies.join(' · ') }}</p>
        </section>
        <figure class="project-story-figure">
          <img
            :src="singleIdImage"
            alt="삼성SDS SingleID 서비스 구성도: 통합인증, 계정관리, 복합인증, 인증이상행위탐지 및 CAM 클라우드 접근 관리"
            width="1143"
            height="600"
            loading="lazy"
          />
          <figcaption>삼성SDS SingleID 서비스 구성도</figcaption>
        </figure>
      </div>
    </details>
  </article>
</template>
