<script setup>
import { ShieldCheck, Cloud, Terminal, PanelsTopLeft, Shield } from 'lucide-vue-next'
import { profile } from '../data/portfolio'
import { useSectionNavigation } from '../composables/useSectionNavigation'

const { goTo } = useSectionNavigation()
</script>

<template>
  <section id="home" class="hero container">
    <div class="hero-grid">
    </div>
    <div class="hero-content">
      <div class="availability">
        <span class="live-dot">
        </span> 구직중 </div>
      <div class="eyebrow">안녕하세요, 개발자 김수정 입니다</div>
      <h1>보안은 견고하게,<br>
        <span class="gradient-text">접근은 간편하게.</span>
      </h1>
      <h2>{{ profile.intro }}</h2>
      <p class="hero-description">{{ profile.description }}</p>
      <div class="hero-buttons">
        <button class="btn primary" @click="goTo('projects')">프로젝트 보기
        </button>
        <button class="btn secondary" @click="goTo('contact')">연락하기
        </button>
      </div>
      <div class="hero-meta">
        <span>
          <span class="meta-dot">
          </span> JAVA & SPRING BOOT</span>
        <span>
          <span>
          <span class="meta-dot">
          </span> JavaScript & Vue 3</span>
        </span>
        <span>
          <span class="meta-dot">
          </span> CLOUD IAM</span>
        <span>
          <span class="meta-dot">
          </span> SSO / FEDERATION</span>
      </div>
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
      <div class="float-label float-a">
        <ShieldCheck :size="17"/> Identity & SSO</div>
      <div class="float-label float-b">
        <Cloud :size="17"/> Cloud Access Control</div>
      <div class="float-label float-c">
        <Terminal :size="17"/> Scalable Backend</div>
      <div class="float-label float-d">
        <PanelsTopLeft :size="17"/> Intuitive UI</div>
    </div>
<!--    <button class="scroll-hint" @click="goTo('about')">-->
<!--      <ArrowDown :size="16"/> SCROLL TO EXPLORE</button>-->
  </section>
</template>
