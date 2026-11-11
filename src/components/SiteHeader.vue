<script setup>
import { ref } from 'vue'
import { Sun, Moon, Menu, X } from 'lucide-vue-next'
import { navigation } from '../data/portfolio'
import { useSectionNavigation } from '../composables/useSectionNavigation'

defineProps({ dark: Boolean })
const emit = defineEmits(['toggle-theme'])
const mobileOpen = ref(false)
const { goTo: scrollToSection } = useSectionNavigation()
function goTo(id) {
  mobileOpen.value = false
  scrollToSection(id)
}
function toggleTheme() {
  emit('toggle-theme')
}
</script>

<template>
  <header class="nav-wrap">
    <nav class="nav container">
      <a class="brand" href="#home" @click.prevent="goTo('home')">
        <span class="brand-mark">&lt;/&gt;</span>SUJEONG KIM<span class="brand-dot">  / Developer</span>
      </a>
      <div class="nav-links">
        <a v-for="item in navigation" :key="item" :href="'#' + item.toLowerCase()" @click.prevent="goTo(item.toLowerCase())">{{ item }}</a>
      </div>
      <div class="nav-actions">
        <button class="icon-button" :aria-label="dark ? '라이트 모드' : '다크 모드'" @click="toggleTheme">
          <Sun v-if="dark" :size="19"/>
          <Moon v-else :size="19"/>
        </button>
        <button class="icon-button mobile-menu" aria-label="메뉴" @click="mobileOpen = !mobileOpen">
          <X v-if="mobileOpen" :size="22"/>
          <Menu v-else :size="22"/>
        </button>
      </div>
    </nav>
    <div v-if="mobileOpen" class="mobile-links">
      <a v-for="item in navigation" :key="item" @click="goTo(item.toLowerCase())">{{ item }}</a>
    </div>
  </header>
</template>
