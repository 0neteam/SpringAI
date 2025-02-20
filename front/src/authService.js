// 📂 src/services/authService.js
export const isAuthenticated = () => {
    return localStorage.getItem("token") !== null;
};

export const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/"; // 로그아웃 후 홈페이지로 리디렉션
};
