<script setup>
import { Mail, Github, ArrowUpRight, ExternalLink } from 'lucide-vue-next'
import { profile } from '../data/portfolio'
</script>

<template>
  <section id="contact" class="section contact-section">
    <div class="container contact-inner reveal">
      <span class="section-kicker">05 / CONTACT ME</span>
      <h2>함께 고민하고<br>
        <span class="gradient-text">더 좋은 시스템을 만들고 싶습니다.</span>
      </h2>
<!--      <p>기술적인 고민이나 새로운 기회에 대해 편하게 이야기 나누고 싶습니다.</p>-->
      <div class="contact-buttons">
        <a class="btn primary" :href="'mailto:' + profile.email">
          <Mail :size="19"/> Email Me <ArrowUpRight :size="17"/>
        </a>
        <a class="btn secondary" :href="profile.github" target="_blank" rel="noopener noreferrer">
          <Github :size="19"/> GitHub <ExternalLink :size="16"/>
        </a>
      </div>
    </div>
  </section>
</template>
