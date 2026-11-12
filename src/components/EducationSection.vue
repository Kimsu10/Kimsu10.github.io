<script setup>
import { ref } from 'vue'
import { GraduationCap, Award, CircleAlert, ChevronDown } from 'lucide-vue-next'
import { education, certifications } from '../data/education'
import CertificateModal from './CertificateModal.vue'

const activeCertificate = ref(null)
</script>

<template>
  <section id="education" class="section section-alt education-section">
    <div class="container reveal">
      <details class="education-disclosure" open>
        <summary class="education-summary">
          <div>
            <span class="section-kicker">05 / EDUCATION & CERTIFICATIONS</span>
            <h2 class="section-title">학력 및 <span class="gradient-text">자격증</span></h2>
          </div>
          <span class="education-toggle">
            <span class="show-label">펼쳐 보기</span><span class="hide-label">접기</span>
            <ChevronDown :size="22" aria-hidden="true" />
          </span>
        </summary>
        <div class="education-grid">
          <section class="education-column" aria-labelledby="education-title">
            <h3 id="education-title" class="education-column-title"><GraduationCap :size="20" aria-hidden="true" />학력 및 교육과정</h3>
            <ul class="education-list">
              <li v-for="course in education" :key="course.school + course.period" class="education-entry">
                <span class="education-date">{{ course.period }}</span>
                <div class="education-entry-body">
                  <h4>{{ course.school }}</h4>
                  <p>{{ course.details.join(' · ') }}</p>
                  <span class="education-status">{{ course.status }}</span>
                </div>
              </li>
            </ul>
          </section>
          <section class="education-column" aria-labelledby="certifications-title">
            <h3 id="certifications-title" class="education-column-title"><Award :size="20" aria-hidden="true" />자격증</h3>
            <ul class="education-list">
              <li v-for="certificate in certifications" :key="certificate.id" class="education-entry">
                <span class="education-date">{{ certificate.date }}</span>
                <div class="education-entry-body">
                  <div class="certificate-name">
                    <h4>{{ certificate.name }}</h4>
                    <button
                      type="button"
                      class="certificate-preview"
                      :aria-label="certificate.name + ' 자격증 이미지 보기'"
                      aria-haspopup="dialog"
                      @click="activeCertificate = certificate"
                    ><CircleAlert :size="17" aria-hidden="true" /></button>
                  </div>
                  <p>{{ certificate.fullName }}</p>
                </div>
              </li>
            </ul>
          </section>
        </div>
      </details>
    </div>
  </section>
  <CertificateModal v-if="activeCertificate" :certificate="activeCertificate" @close="activeCertificate = null" />
</template>

<style scoped>
.education-section { padding: 48px 0; }
.education-summary { display: flex; align-items: center; justify-content: space-between; gap: 20px; cursor: pointer; list-style: none; border-radius: 6px; }
.education-summary::-webkit-details-marker { display: none; }
.education-summary:focus-visible { outline: 2px solid var(--accent); outline-offset: 8px; }
.education-summary .section-title { margin-bottom: 0; }
.education-toggle { display: flex; flex-shrink: 0; align-items: center; gap: 10px; color: var(--muted); font-size: 12px; }
.education-toggle svg { transition: transform .2s; }
.hide-label { display: none; }
.education-disclosure[open] .show-label { display: none; }
.education-disclosure[open] .hide-label { display: inline; }
.education-disclosure[open] .education-toggle svg { transform: rotate(180deg); }
.education-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 48px; margin-top: 32px; }
.education-column { min-width: 0; }
.education-column-title { display: flex; align-items: center; gap: 8px; margin: 0 0 22px; font-size: 17px; }
.education-column-title svg { color: var(--accent); }
.education-list { list-style: none; padding: 0; margin: 0; }
.education-entry { position: relative; display: grid; grid-template-columns: 138px minmax(0, 1fr); gap: 20px; padding-bottom: 20px; }
.education-entry:last-child { padding-bottom: 0; }
.education-entry::before { content: ''; position: absolute; top: 9px; bottom: -9px; left: 147px; width: 1px; background: var(--border); }
.education-entry:last-child::before { display: none; }
.education-entry::after { content: ''; position: absolute; left: 143px; top: 6px; width: 9px; height: 9px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 0 4px var(--surface2); }
.education-date { font-size: 11px; line-height: 1.9; color: var(--muted); font-variant-numeric: tabular-nums; }
.education-entry-body { min-width: 0; padding-left: 8px; }
.education-entry h4 { margin: 0; font-size: 14px; line-height: 1.6; }
.education-entry p { font-size: 12px; line-height: 1.8; color: var(--muted); margin: 3px 0; }
.education-status { display: block; font-size: 11px; line-height: 1.7; color: var(--muted); }
.certificate-name { display: flex; align-items: center; gap: 5px; }
.certificate-preview { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; width: 26px; height: 26px; margin: -2px 0; padding: 0; border: 0; border-radius: 50%; background: transparent; color: var(--accent); }
.certificate-preview:hover { background: color-mix(in srgb, var(--accent) 12%, transparent); }
.certificate-preview:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
@media(max-width:900px) {
  .education-grid { gap: 28px; }
  .education-entry { grid-template-columns: minmax(0, 1fr); gap: 3px; padding-left: 20px; }
  .education-entry::before { left: 4px; }
  .education-entry::after { left: 0; }
  .education-entry-body { padding-left: 0; }
}
@media(max-width:720px) {
  .education-section { padding: 36px 0; }
  .education-grid { grid-template-columns: 1fr; gap: 28px; }
  .education-toggle { gap: 6px; }
}
</style>
