export function isLogined() { 
  return Boolean(sessionStorage.getItem("session"))
}