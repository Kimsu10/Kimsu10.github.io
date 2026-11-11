import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollEffects() {
  const scrollProgress = ref(0)
  let observer

  function updateScroll() {
    const max = document.documentElement.scrollHeight - window.innerHeight
    scrollProgress.value = max > 0 ? (window.scrollY / max) * 100 : 0
  }

  onMounted(() => {
    updateScroll()
    window.addEventListener('scroll', updateScroll, { passive: true })
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.08 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', updateScroll)
    observer?.disconnect()
  })

  return { scrollProgress }
}
