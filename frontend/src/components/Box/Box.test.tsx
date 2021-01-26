import { describe, it, expect } from "@jest/globals";
import { mount } from "enzyme";
import Box from "./index";


describe("<Box> Component", () => {

	it("Mounts & Unmounts correctly", () => {
		const wrapper = mount(<Box />);
	
		expect(() => {
			wrapper.unmount();
		}).not.toThrow();
	});

});
