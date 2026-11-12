<script setup>
import { ShieldCheck, Cloud, Terminal, PanelsTopLeft, Shield } from 'lucide-vue-next'
import { profile } from '../data/portfolio'
import { useSectionNavigation } from '../composables/useSectionNavigation'

const { goTo } = useSectionNavigation()

const specialties = [
  { label: 'Identity & SSO', icon: ShieldCheck, angle: '-140deg', counterAngle: '140deg' },
  { label: 'Cloud Access Control', icon: Cloud, angle: '-30deg', counterAngle: '30deg' },
  { label: 'Scalable Backend', icon: Terminal, angle: '140deg', counterAngle: '-140deg' },
  { label: 'Intuitive UI', icon: PanelsTopLeft, angle: '60deg', counterAngle: '-60deg' },
]
</script>

<template>
  <section id="home" class="hero container">
    <div class="hero-grid">
    </div>
    <div class="hero-content">
      <div class="availability">
        <span class="live-dot">
        </span> 구직중 </div>
      <div class="eyebrow">안녕하세요, 개발자 김수정입니다</div>
      <h1>구조를 이해하고<br>
        <span class="gradient-text">변화를 만듭니다</span>
      </h1>
      <h2>{{ profile.intro }}</h2>
      <p class="hero-description">{{ profile.description }}</p>
      <div class="hero-buttons">
        <button class="btn primary" @click="goTo('projects')">프로젝트 보기
        </button>
        <button class="btn secondary" @click="goTo('contact')">연락하기
        </button>
      </div>
<!--      <div class="hero-meta">-->
<!--        <span>-->
<!--          <span class="meta-dot">-->
<!--          </span> JAVA & SPRING BOOT</span>-->
<!--        <span>-->
<!--          <span>-->
<!--          <span class="meta-dot">-->
<!--          </span> JavaScript & Vue 3</span>-->
<!--        </span>-->
<!--        <span>-->
<!--          <span class="meta-dot">-->
<!--          </span> CLOUD IAM</span>-->
<!--        <span>-->
<!--          <span class="meta-dot">-->
<!--          </span> SSO / FEDERATION</span>-->
<!--      </div>-->
    </div>
    <div class="hero-art" aria-hidden="true">
      <div class="orbit orbit-one">
      </div>
      <div class="orbit orbit-two">
      </div>
      <div class="art-center">
        <div class="art-logo"><Shield :size="68" :stroke-width="1.4" /></div>
        <span>BUILD WITH CLARITY</span>
      </div>
      <div
        v-for="specialty in specialties"
        :key="specialty.label"
        class="specialty-orbit"
        :style="{ '--start-angle': specialty.angle, '--counter-angle': specialty.counterAngle }"
      >
        <div class="specialty-position">
          <div class="specialty-counter">
            <div class="specialty-level">
              <div class="float-label orbit-label">
                <component :is="specialty.icon" :size="17" />
                {{ specialty.label }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
<!--    <button class="scroll-hint" @click="goTo('about')">-->
<!--      <ArrowDown :size="16"/> SCROLL TO EXPLORE</button>-->
  </section>
</template>

<style scoped>
.hero-content { width: 100%; max-width: 755px; }
.hero-description { max-width: 100%; white-space: pre-line; }
.hero-art { transform: scale(.85); transform-origin: right center; }
.specialty-orbit {
  position: absolute;
  inset: 0;
  pointer-events: none;
  animation: specialty-revolve 24s linear infinite paused;
}
.specialty-position {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: rotate(var(--start-angle)) translateX(205px);
}
.specialty-counter { transform: rotate(var(--counter-angle)); }
.specialty-level { animation: specialty-revolve 24s linear infinite reverse paused; }
.hero-art .orbit-label {
  position: relative;
  width: max-content;
  transform: translate(-50%, -50%);
  animation: none;
}
.hero-art:has(.art-center:hover) .specialty-orbit,
.hero-art:has(.art-center:hover) .specialty-level {
  animation-play-state: running;
}
@keyframes specialty-revolve {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
