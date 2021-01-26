import { describe, it, expect } from "@jest/globals";
import { shallow } from "enzyme";
import LogoutPage from "pages/logout";


describe("<LogoutPage> Component", () => {

	it("Mounts & Unmounts without crashing", () => {
		expect(() => {
			const wrapper = shallow(<LogoutPage />);
			wrapper.unmount();
		}).not.toThrow();
	});

});