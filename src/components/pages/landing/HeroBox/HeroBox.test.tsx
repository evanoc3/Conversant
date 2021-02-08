import { describe, it, expect } from "@jest/globals";
import { mount } from "enzyme";
import HeroBox from "./index";


describe("<HeroBox> (landing page) Component", () => {

	it("Mounts & Unmounts without crashing", () => {
		expect(() => {
			const wrapper = mount(<HeroBox />);
			wrapper.unmount();
		}).not.toThrow();
	});

});
