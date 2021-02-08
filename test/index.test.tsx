import { describe, it, expect } from "@jest/globals";
import { mount } from "enzyme";
import LandingPage from "@pages/index";


describe("<LandingPage> Component", () => {

	it("Mounts & Unmounts without crashing", () => {
		expect(() => {
			const wrapper = mount(<LandingPage />);
			wrapper.unmount();
		}).not.toThrow();
	});

});