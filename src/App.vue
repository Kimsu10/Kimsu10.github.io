<script setup>
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'
import { useTheme } from './composables/useTheme'
import { useScrollEffects } from './composables/useScrollEffects'

const { dark, toggleTheme } = useTheme()
const { scrollProgress } = useScrollEffects()
</script>

<template>
  <div class="progress" :style="{ width: scrollProgress + '%' }"></div>
  <SiteHeader :dark="dark" @toggle-theme="toggleTheme" />
  <main>
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <ExperienceSection />
    <ProjectsSection />
    <ContactSection />
  </main>
  <SiteFooter />
</template>
