export function saveToken(token) {
  localStorage.setItem("token", token);
  const payload = JSON.parse(atob(token.split('.')[1]));
  localStorage.setItem("role", payload.role); // Save role
}

export function getToken() {
  return localStorage.getItem("token");
}

export function getUserRole() {
  return localStorage.getItem("role");
}
