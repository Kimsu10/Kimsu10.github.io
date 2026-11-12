<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { X } from 'lucide-vue-next'

defineProps({ certificate: { type: Object, required: true } })
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
      class="certificate-dialog"
      :aria-labelledby="certificate.id + '-modal-title'"
      @close="emit('close')"
      @click.self="dialog.close()"
    >
      <div class="certificate-panel">
        <div class="certificate-modal-heading">
          <h2 :id="certificate.id + '-modal-title'">{{ certificate.name }} 자격증</h2>
          <button type="button" class="icon-button" aria-label="자격증 이미지 닫기" autofocus @click="dialog.close()">
            <X :size="22" aria-hidden="true" />
          </button>
        </div>
        <img :src="certificate.image" :alt="certificate.fullName + ' 김수정 자격증'" />
      </div>
    </dialog>
  </Teleport>
</template>

<style scoped>
.certificate-dialog { width: min(1000px, calc(100% - 32px)); max-width: none; max-height: 92dvh; padding: 0; margin: auto; border: 0; background: transparent; color: var(--text); overflow: visible; }
.certificate-dialog::backdrop { background: #030612d9; backdrop-filter: blur(8px); }
.certificate-panel { max-height: 92dvh; overflow: auto; padding: 22px; border: 1px solid var(--border); border-radius: 16px; background: var(--surface); }
.certificate-modal-heading { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 18px; }
.certificate-modal-heading h2 { margin: 0; font-size: 20px; }
.certificate-modal-heading button { flex-shrink: 0; }
.certificate-panel img { display: block; width: 100%; height: auto; }
@media(max-width:720px) { .certificate-panel { padding: 14px; } }
</style>
