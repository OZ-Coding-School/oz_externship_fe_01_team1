export const formatDate = (isoString: string) => {
  const date = new Date(isoString)
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
}

export const URLCopy = async () => {
  const currentUrl = window.location.href
  try {
    await navigator.clipboard.writeText(currentUrl)
    return true
  } catch {
    return false
  }
}
