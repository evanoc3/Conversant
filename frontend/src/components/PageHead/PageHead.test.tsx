import { describe, it, expect } from "@jest/globals";
import { mount } from "enzyme";
import PageHead from "./index";


describe("<PageHead> Component", () => {

	it("Mounts & Unmounts without crashing", () => {
		expect(() => {
			const wrapper = mount(<PageHead />);
			wrapper.unmount();
		}).not.toThrow();
	});

});
