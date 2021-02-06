import { jest } from "@jest/globals";


class MockAuthManager {
	private _isLoggedIn = true;

	public isLoggedIn = jest.fn(() => {
		return this._isLoggedIn
	})

	public logout = jest.fn(() => {
		this._isLoggedIn = false;
	})
}


jest.doMock("utils/auth-manager", () => {
	return {
		__esModule: true,
		AuthManager: MockAuthManager,
		default: new MockAuthManager()
	};
});