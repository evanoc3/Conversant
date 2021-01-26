import { describe, it, expect } from "@jest/globals";
import { mount } from "enzyme";
import LandingHeader from "./index";


describe("<LandingHeader> Component", () => {

	it("Mounts & Unmounts without crashing", () => {
		expect(() => {
			const wrapper = mount(<LandingHeader />);
			wrapper.unmount();
		}).not.toThrow();
	});

});
