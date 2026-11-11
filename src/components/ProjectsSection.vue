<script setup>
import CamProject from '../projects/cam/CamProject.vue'
import MedistreamProject from '../projects/medistream/MedistreamProject.vue'
import TagByCompanyProject from '../projects/tagByCompany/TagByCompanyProject.vue'
</script>

<template>
  <section id="projects" class="section container">
    <div class="projects-heading reveal">
      <div>
        <span class="section-kicker">04 / SELECTED WORK</span>
        <h2 class="section-title">참여 <span class="gradient-text">프로젝트</span></h2>
<!--        <p class="section-subtitle">설계와 구현에 참여한 주요 업무를 소개합니다.</p>-->
      </div>
<!--      <span class="project-count">03 PROJECTS</span>-->
    </div>

    <CamProject />
    <MedistreamProject />
    <TagByCompanyProject />
  </section>
</template>
