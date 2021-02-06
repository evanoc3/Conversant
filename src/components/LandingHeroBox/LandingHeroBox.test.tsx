import { describe, it, expect } from "@jest/globals";
import { mount } from "enzyme";
import LandingHeroBox from "./index";


describe("<LandingHeroBox> Component", () => {

	it("Mounts & Unmounts without crashing", () => {
		expect(() => {
			const wrapper = mount(<LandingHeroBox />);
			wrapper.unmount();
		}).not.toThrow();
	});

});
