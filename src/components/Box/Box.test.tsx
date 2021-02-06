import { describe, it, expect } from "@jest/globals";
import { mount } from "enzyme";
import Box from "./index";


describe("<Box> Component", () => {

	it("Mounts & Unmounts without crashing", () => {
		expect(() => {
			const wrapper = mount(<Box />);
			wrapper.unmount();
		}).not.toThrow();
	});

});
