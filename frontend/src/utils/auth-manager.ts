export class AuthManager {

	public isLoggedIn(): boolean {
		return (window.localStorage && localStorage.getItem("auth_token") !== null) || (window.sessionStorage && sessionStorage.getItem("auth_token") !== null);
	}

	public logout(): void {
		if(window.localStorage && localStorage.getItem("auth_token") !== null) {
			localStorage.removeItem("auth_token");
		}
		if(window.sessionStorage && sessionStorage.getItem("auth_token") !== null) {
			sessionStorage.removeItem("auth_token");
		}
	}

	public setLogin(token: string, persist: boolean): void {
		if(persist) {
			if(!("localStorage" in window)) {
				console.error("Could not save token in localStorage");
				return;
			}

			console.debug("Storing login token in localStorage");
			localStorage.setItem("auth_token", token);
			return
		}

		if(!("sessionStorage" in window)) {
			console.error("Could not save token in localStorage");
			return;
		}

		console.debug("Storing auth_token in sessionStorage");
		sessionStorage.setItem("auth_token", token);
	}

}

const authManager = new AuthManager();
export default authManager;