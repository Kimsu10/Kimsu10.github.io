<script setup>
import { computed, nextTick, ref, onMounted, onBeforeUnmount } from 'vue'
import { ChevronLeft, ChevronRight, X } from 'lucide-vue-next'

const props = defineProps({
  work: { type: Object, required: true },
})
const emit = defineEmits(['close'])
const dialog = ref(null)
const content = ref(null)
const pageContent = ref(null)
const scrollPosition = ref(0)
const scrollLimit = ref(0)
const scrollProgress = computed(() => {
  const position = scrollPosition.value
  const limit = scrollLimit.value
  if (limit <= 0 || position <= 0) return 6

  // Scroll dimensions are rounded, while scrollTop can contain fractional pixels.
  if (limit - position <= 1) return 100

  return 6 + 94 * position / limit
})
const previousArrow = ref(null)
const nextArrow = ref(null)
const currentIndex = ref(0)
const process = computed(() => props.work.process)
const sections = computed(() => process.value.sections
  ? [{ description: process.value.summary }, ...process.value.sections]
  : [
      { title: '주요 구현 기능', description: process.value.summary },
      { title: '개발 시 고려 사항', description: props.work.rationale },
      { title: '설계 및 구현', description: process.value.implementation },
      { title: '오류 및 해결 과정', description: process.value.troubleshooting ?? '기록된 오류 및 해결 사례가 없습니다.' },
      { title: '구현 결과', description: process.value.outcome },
    ])
const pages = computed(() => [
  sections.value.slice(0, 2),
  ...sections.value.slice(2).map(section => [section]),
])
const page = computed(() => pages.value[currentIndex.value])
let previousOverflow
let touchStart
let scrollObserver

function syncScroll() {
  const viewport = content.value
  scrollLimit.value = viewport.scrollHeight - viewport.clientHeight
  scrollPosition.value = viewport.scrollTop
}

async function move(offset) {
  const nextIndex = currentIndex.value + offset
  if (nextIndex < 0 || nextIndex >= pages.value.length) return

  const focusedArrow = document.activeElement
  const focusTarget = nextIndex === 0 && focusedArrow === previousArrow.value
    ? nextArrow
    : nextIndex === pages.value.length - 1 && focusedArrow === nextArrow.value
      ? previousArrow
      : null

  currentIndex.value = nextIndex
  content.value.scrollTop = 0
  await nextTick()
  syncScroll()
  if (focusTarget) {
    focusTarget.value?.focus()
  }
}

function startSwipe(event) {
  touchStart = event.touches.length === 1 ? event.touches[0] : null
}

function endSwipe(event) {
  const start = touchStart
  touchStart = null
  if (!start || event.touches.length) return

  const end = event.changedTouches[0]
  const horizontal = end.clientX - start.clientX
  const vertical = end.clientY - start.clientY
  if (Math.abs(horizontal) >= 50 && Math.abs(horizontal) > Math.abs(vertical)) {
    move(horizontal < 0 ? 1 : -1)
  }
}

onMounted(() => {
  previousOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  dialog.value.showModal()
  scrollObserver = new ResizeObserver(syncScroll)
  scrollObserver.observe(content.value)
  scrollObserver.observe(pageContent.value)
  syncScroll()
})
onBeforeUnmount(() => {
  scrollObserver?.disconnect()
  dialog.value?.close()
  document.body.style.overflow = previousOverflow
})
</script>

<template>
  <Teleport to="body">
    <dialog
      ref="dialog"
      class="cam-detail-dialog"
      aria-labelledby="cam-detail-title"
      @close="emit('close')"
      @click.self="dialog.close()"
      @keydown.left.prevent="move(-1)"
      @keydown.right.prevent="move(1)"
    >
      <div class="modal cam-detail-panel">
        <button class="modal-close icon-button" type="button" aria-label="구현 과정 닫기" autofocus @click="dialog.close()">
          <X :size="22" aria-hidden="true" />
        </button>
        <div
          ref="content"
          class="cam-detail-content"
          @scroll.passive="syncScroll"
          @touchstart.passive="startSwipe"
          @touchend.passive="endSwipe"
          @touchcancel="touchStart = null"
        >
          <h2 id="cam-detail-title">{{ process.title ?? work.title }}</h2>
          <p v-if="process.periodLabel" class="cam-detail-period"><strong>{{ process.periodLabel }}</strong> {{ work.period }}</p>
          <p class="cam-detail-technologies">
            <template v-if="process.technologyLabel">{{ process.technologyLabel }} </template>
            {{ (process.technologies ?? work.technologies).join(process.technologyLabel ? ', ' : ' · ') }}
          </p>
          <div ref="pageContent" aria-live="polite">
            <Transition name="cam-slide">
              <div :key="currentIndex" class="cam-process-page">
                <div v-for="section in page" :key="section.title ?? 'intro'" class="cam-process-section">
                  <h3 v-if="section.title">{{ section.title }}</h3>
                  <p v-for="paragraph in [section.description].flat().filter(Boolean)" :key="paragraph" class="cam-process-paragraph">{{ paragraph }}</p>
                  <component v-if="section.items" :is="section.numbered ? 'ol' : 'ul'" class="project-contributions">
                    <li v-for="item in section.items" :key="item">{{ item }}</li>
                  </component>
                  <ol v-if="section.issues" class="cam-process-issues">
                    <li v-for="issue in section.issues" :key="issue.title">
                      <strong>{{ issue.title }}</strong>
                      <p v-if="!issue.solution"><strong>{{ issue.problemLabel ?? '문제' }}</strong></p>
                      <p v-for="(paragraph, index) in [issue.problem].flat()" :key="paragraph">
                        <strong v-if="issue.solution && index === 0">문제:</strong> {{ paragraph }}
                      </p>
                      <p v-if="issue.solution"><strong>해결:</strong> {{ issue.solution }}</p>
                      <p v-else-if="issue.solutionItems"><strong>해결</strong></p>
                      <ul v-if="issue.solutionItems" class="project-contributions">
                        <li v-for="item in issue.solutionItems" :key="item">{{ item }}</li>
                      </ul>
                      <p v-if="issue.outcome">{{ issue.outcome }}</p>
                    </li>
                  </ol>
                </div>
              </div>
            </Transition>
          </div>
        </div>
        <button v-if="currentIndex > 0" ref="previousArrow" type="button" class="icon-button cam-page-arrow cam-page-arrow-prev" aria-label="이전 페이지" @click="move(-1)">
          <ChevronLeft :size="20" aria-hidden="true" />
        </button>
        <button v-if="currentIndex < pages.length - 1" ref="nextArrow" type="button" class="icon-button cam-page-arrow cam-page-arrow-next" aria-label="다음 페이지" @click="move(1)">
          <ChevronRight :size="20" aria-hidden="true" />
        </button>
        <footer class="cam-page-count">
          <input
            v-if="scrollLimit > 0"
            class="cam-scroll-slider"
            type="range"
            aria-label="본문 스크롤 위치"
            min="0"
            :max="scrollLimit"
            :value="scrollPosition"
            :style="{ '--cam-scroll-progress': scrollProgress + '%' }"
            @input="content.scrollTop = $event.target.valueAsNumber"
            @keydown.left.stop
            @keydown.right.stop
          />
          {{ currentIndex + 1 }} / {{ pages.length }}
        </footer>
      </div>
    </dialog>
  </Teleport>
</template>

<style scoped>
.cam-detail-dialog { width: min(610px, calc(100% - 40px)); max-width: none; max-height: 90dvh; margin: auto; padding: 0; border: 0; background: transparent; color: var(--text); overflow: visible; }
.cam-detail-dialog::backdrop { background: #030612d9; backdrop-filter: blur(8px); }
.cam-detail-panel { --cam-arrow-gutter: clamp(40px, 9vw, 52px); display: flex; flex-direction: column; width: 100%; height: min(615px, 90dvh); max-height: 90dvh; padding: 24px 0 12px; overflow: hidden; }
.cam-detail-panel .modal-close { top: 12px; right: 12px; z-index: 1; border: 0; background: transparent; }
.cam-detail-content { flex: 1; min-height: 0; margin-inline: var(--cam-arrow-gutter); overflow-x: hidden; overflow-y: auto; scrollbar-width: none; overscroll-behavior: contain; touch-action: pan-y pinch-zoom; }
.cam-detail-content::-webkit-scrollbar { display: none; }
.cam-detail-panel h2 { margin: 0 16px 8px 0; font-size: clamp(18px, 4vw, 25px); line-height: 1.4; overflow-wrap: anywhere; }
.cam-detail-period { margin: 0 0 8px; }
.cam-detail-panel .cam-detail-technologies { margin: 0 0 20px; color: var(--accent); }
.cam-process-page { padding: 12px 0 16px; border-top: 1px solid var(--border); }
.cam-process-section + .cam-process-section { margin-top: 16px; }
.cam-process-page h3 { margin: 0 0 10px; }
.cam-process-page p, .cam-process-page ul, .cam-process-issues { margin: 0; }
.cam-process-paragraph + .cam-process-paragraph { margin-top: 8px; }
.cam-process-issues { padding-left: 20px; }
.cam-process-issues > li + li { margin-top: 12px; }
.cam-process-issues p { margin-top: 4px; }
.cam-process-issues ul { margin-top: 6px; }
.cam-process-issues strong { color: var(--text); }
.cam-page-arrow { position: absolute; top: 50%; transform: translateY(-50%); width: calc(var(--cam-arrow-gutter) - 8px); max-width: 39px; border: 0; background: transparent; }
.cam-page-arrow-prev { left: 4px; }
.cam-page-arrow-next { right: 4px; }
.cam-page-count { position: relative; flex-shrink: 0; padding-top: 10px; border-top: 1px solid var(--border); color: var(--muted); font-size: 13px; text-align: center; }
.cam-page-count:has(.cam-scroll-slider) { border-top-color: transparent; }
.cam-scroll-slider { --cam-scroll-track: linear-gradient(to right, var(--accent) var(--cam-scroll-progress), transparent var(--cam-scroll-progress)); position: absolute; inset-inline: 0; top: -8px; width: 100%; height: 15px; margin: 0; padding: 0; border: 0; appearance: none; background: transparent; cursor: pointer; }
.cam-scroll-slider::-webkit-slider-runnable-track { height: 6px; border: 0; border-radius: 0; background: var(--cam-scroll-track); }
.cam-scroll-slider::-webkit-slider-thumb { width: 12px; height: 15px; margin-top: -4.5px; border: 0; appearance: none; background: transparent; }
.cam-scroll-slider::-moz-range-track { height: 6px; border: 0; border-radius: 0; background: var(--cam-scroll-track); }
.cam-scroll-slider::-moz-range-thumb { width: 12px; height: 15px; border: 0; background: transparent; }
.cam-slide-enter-active { transition: transform .2s ease, opacity .2s ease; }
.cam-slide-enter-from { transform: translateX(16px); opacity: 0; }
</style>
