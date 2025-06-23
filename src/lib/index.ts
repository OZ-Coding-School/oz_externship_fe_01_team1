export const formatDate = (isoString: string) => {
  const date = new Date(isoString)
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
}
