export default function formatTime(time) {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
}
