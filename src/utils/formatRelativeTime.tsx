export function formatRelativeTime(timestamp: string): string {
  if (!timestamp) return '시간 없음';

  const postTime = new Date(timestamp);
  if (isNaN(postTime.getTime())) return '잘못된 시간';

  const now = new Date();
  const diff = Math.floor((now.getTime() - postTime.getTime()) / 1000); // 초 단위

  if (diff < 60) return `${diff}초 전`;
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  return `${Math.floor(diff / 86400)}일 전`;
}