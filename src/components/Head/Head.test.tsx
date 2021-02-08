import { describe, it, expect } from "@jest/globals";
import { mount } from "enzyme";
import Head from "./index";


describe("<Head> Component", () => {

	it("Mounts & Unmounts without crashing", () => {
		expect(() => {
			const wrapper = mount(<Head />);
			wrapper.unmount();
		}).not.toThrow();
	});

});
