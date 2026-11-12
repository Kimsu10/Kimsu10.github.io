<script setup>
import { experiences } from '../data/portfolio'
</script>

<template>
  <section id="experience" class="section section-alt">
    <div class="container">
      <div class="reveal">
        <span class="section-kicker">03 / EXPERIENCE</span>
        <h2 class="section-title">업무<span class="gradient-text"> 경험</span>
        </h2>
      </div>
      <div class="timeline">
        <article v-for="job in experiences" :key="job.date" class="timeline-entry reveal">
          <div class="timeline-date">{{job.date}}</div>
          <div class="timeline-content">
            <span class="timeline-point">
            </span>
            <h3>{{job.role}}</h3>
            <div class="timeline-company">{{job.company}}</div>
            <p>{{job.description}}</p>
            <ul v-if="job.details?.length" class="timeline-details">
              <li v-for="detail in job.details" :key="detail">{{ detail }}</li>
            </ul>
            <div class="tag-list">
              <span v-for="tag in job.tags" :key="tag" class="tag">{{tag}}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
