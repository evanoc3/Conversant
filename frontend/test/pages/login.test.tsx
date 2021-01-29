import { describe, it, expect } from "@jest/globals";
import { mount } from "enzyme";
import LoginPage from "pages/login";


describe("<LoginPage> Component", () => {

	it("Mounts & Unmounts without crashing", () => {
		expect(() => {
			const wrapper = mount(<LoginPage />);
			wrapper.unmount();
		}).not.toThrow();
	});

});