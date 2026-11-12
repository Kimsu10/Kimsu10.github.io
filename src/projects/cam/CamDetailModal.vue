<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { X } from 'lucide-vue-next'

defineProps({ explanation: { type: Object, required: true } })
const emit = defineEmits(['close'])
const dialog = ref(null)
let previousOverflow

onMounted(() => {
  previousOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  dialog.value.showModal()
})
onBeforeUnmount(() => {
  dialog.value?.close()
  document.body.style.overflow = previousOverflow
})
</script>

<template>
  <Teleport to="body">
    <dialog
      ref="dialog"
      class="cam-detail-dialog"
      :aria-labelledby="explanation.id + '-title'"
      :aria-describedby="explanation.id + '-description'"
      @close="emit('close')"
      @click.self="dialog.close()"
    >
      <div class="modal cam-detail-panel">
        <button class="modal-close icon-button" type="button" aria-label="상세 설명 닫기" autofocus @click="dialog.close()">
          <X :size="22" aria-hidden="true" />
        </button>
        <span class="section-kicker">CAM / 상세 설명</span>
        <h2 :id="explanation.id + '-title'">{{ explanation.title }}</h2>
        <p :id="explanation.id + '-description'">{{ explanation.description }}</p>
      </div>
    </dialog>
  </Teleport>
</template>

<style scoped>
.cam-detail-dialog { width: min(580px, calc(100% - 40px)); max-width: none; max-height: 90dvh; margin: auto; padding: 0; border: 0; background: transparent; color: var(--text); overflow: visible; }
.cam-detail-dialog::backdrop { background: #030612d9; backdrop-filter: blur(8px); }
.cam-detail-panel { width: 100%; max-height: 90dvh; }
.cam-detail-panel h2 { padding-right: 24px; font-size: 25px; line-height: 1.4; overflow-wrap: anywhere; }
</style>
