import { describe, it, expect } from "@jest/globals";
import { mount } from "enzyme";
import Background from "./index";


describe("<Background> Component", () => {

	it("Mounts & Unmounts without crashing", () => {
		expect(() => {
			const wrapper = mount(<Background />);
			wrapper.unmount();
		}).not.toThrow();
	});

});