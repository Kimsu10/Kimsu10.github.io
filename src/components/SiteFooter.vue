<script setup>
import { profile } from '../data/portfolio'
</script>

<template>
  <footer class="footer container">
    <span>© {{new Date().getFullYear()}} {{profile.name}}. All rights reserved.</span>
    <span>BUILT WITH VUE 3 <span class="footer-heart">♥</span>
    </span>
  </footer>
</template>
