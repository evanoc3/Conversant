export class AuthManager {


	public isLoggedIn(): boolean {
		if(typeof window !== undefined) {
			if("localStorage" in window) {
				return localStorage.getItem("auth_token") !== null;
			}
			if("sessionStorage" in window) {
				return sessionStorage.getItem("auth_token") !== null;
			}
		}
		return false;
	}


	public logout(): void {
		if(typeof window !== undefined) {
			if("localStorage" in window) {
				localStorage.removeItem("auth_token");
			}
			if("sessionStorage" in window) {
				sessionStorage.removeItem("auth_token");
			}
		}
	}


	public setLogin(token: string, persist: boolean): void {
		if(typeof window === undefined) {
			return;
		}

		if(persist) {
			if(!("localStorage" in window)) {
				console.error("Could not save token in localStorage");
				return;
			}

			console.debug("Storing login token in localStorage");
			localStorage.setItem("auth_token", token);
			return;
		}
		else {
			if(!("sessionStorage" in window)) {
				console.error("Could not save token in localStorage");
				return;
			}

			console.debug("Storing auth_token in sessionStorage");
			sessionStorage.setItem("auth_token", token);
		}
	}
}

export default new AuthManager();