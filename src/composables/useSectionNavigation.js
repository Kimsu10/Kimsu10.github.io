export function useSectionNavigation() {
  function goTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return { goTo }
}
