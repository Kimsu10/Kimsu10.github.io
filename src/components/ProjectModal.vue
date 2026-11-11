<script setup>
import { onMounted, onUnmounted } from 'vue'
import { X } from 'lucide-vue-next'

const props = defineProps({ project: { type: Object, default: null } })
const emit = defineEmits(['close'])
function onKeydown(event) {
  if (event.key === 'Escape' && props.project) emit('close')
}
onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div v-if="project" class="modal-backdrop" @click.self="emit('close')">
    <div class="modal" role="dialog" aria-modal="true" :aria-label="project.title">
      <button class="modal-close icon-button" aria-label="닫기" @click="emit('close')">
        <X :size="22"/>
      </button>
      <span class="section-kicker">PROJECT {{project.num}} / DETAILS</span>
      <h2>{{project.title}}</h2>
      <h3>{{project.subtitle}}</h3>
      <p>{{project.description}}</p>
      <div class="modal-divider">
      </div>
      <h4>KEY CONTRIBUTIONS</h4>
      <ul>
        <li v-for="detail in project.details" :key="detail">{{detail}}</li>
      </ul>
      <div class="tag-list">
        <span v-for="tag in project.tags" :key="tag" class="tag">{{tag}}</span>
      </div>
    </div>
  </div>
</template>
