import { ref, onMounted } from 'vue'

export function useTheme() {
  const dark = ref(false)

  function applyTheme() {
    document.documentElement.dataset.theme = dark.value ? 'dark' : 'light'
  }

  function toggleTheme() {
    dark.value = !dark.value
    applyTheme()
  }

  onMounted(() => {
    applyTheme()
  })

  return { dark, toggleTheme }
}
