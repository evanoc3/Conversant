class AuthManager {
	isLoggedIn(): boolean {
		return (window.localStorage && localStorage.getItem("auth_token") !== null) || (window.sessionStorage && sessionStorage.getItem("auth_token") !== null);
	}

	logout(): void {
		if(window.localStorage && localStorage.getItem("auth_token") !== null) {
			localStorage.removeItem("auth_token");
		}
		if(window.sessionStorage && sessionStorage.getItem("auth_token") !== null) {
			sessionStorage.removeItem("auth_token");
		}
	}
}

const authManager = new AuthManager();
export default authManager;