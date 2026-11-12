<script setup>
import { skillGroups } from '../data/portfolio'
import {
  Coffee, Leaf, Network, CalendarClock, Layers, Database, FileCode2,
  Braces, Triangle, Package, Atom, PanelsTopLeft, Cloud, KeyRound,
  ShieldCheck, Users, GitBranch, Terminal, LockKeyhole, Workflow,
  Container, RefreshCw, Code2,
} from 'lucide-vue-next'

const skillIcons = {
  Java: Coffee,
  'Spring Boot': Leaf,
  'REST API': Network,
  'Spring Scheduler': CalendarClock,
  MyBatis: Layers,
  MySQL: Database,
  PostgreSQL: Database,
  JavaScript: Braces,
  TypeScript: FileCode2,
  'Vue 3': Triangle,
  Pinia: Package,
  React: Atom,
  'HTML / CSS': PanelsTopLeft,
  AWS: Cloud,
  GCP: Cloud,
  Azure: Cloud,
  OCI: Cloud,
  Keycloak: KeyRound,
  'SAML 2.0': ShieldCheck,
  IAM: Users,
  Git: GitBranch,
  Linux: Terminal,
  SSH: LockKeyhole,
  Jenkins: Workflow,
  Kubernetes: Container,
  'Argo CD': RefreshCw,
}
</script>

<template>
  <section id="skills" class="section container">
    <div class="reveal">
      <span class="section-kicker">02 / TECH STACK</span>
      <h2 class="section-title"> 기술 <span class="gradient-text"> 스택</span>
      </h2>
<!--      <p class="section-subtitle">현재까지 사용해본 기술들</p>-->
    </div>
    <div class="skills-grid">
      <article v-for="(group, i) in skillGroups" :key="group.name" class="skill-card reveal">
        <div class="skill-index">0{{i+1}} / {{group.name.toUpperCase()}}</div>
        <h3>{{group.name}}</h3>
        <div class="tag-list">
          <span v-for="skill in group.skills" :key="skill" class="tag skill-tag">
            <component :is="skillIcons[skill] || Code2" :size="15" :stroke-width="1.8" aria-hidden="true" />
            {{ skill }}
          </span>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.skill-tag {
  position: relative;
  align-items: center;
  gap: 7px;
  transform-origin: center;
  transition: transform .2s ease, border-color .2s ease, color .2s ease, box-shadow .2s ease;
}
.skill-tag svg { flex-shrink: 0; color: var(--accent); }
@media (hover: hover) {
  .skill-tag:hover {
    z-index: 1;
    transform: scale(1.08);
    color: var(--text);
    border-color: var(--accent);
    box-shadow: 0 3px 10px color-mix(in srgb, var(--accent) 12%, transparent);
  }
}
</style>
