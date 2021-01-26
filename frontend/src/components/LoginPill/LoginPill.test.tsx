import { describe, it, expect } from "@jest/globals";
import { mount } from "enzyme";
import LoginPill from "./index";


describe("<LoginPill> Component", () => {

	it("Mounts & Unmounts without crashing", () => {
		expect(() => {
			const wrapper = mount(<LoginPill />);
			wrapper.unmount();
		}).not.toThrow();
	});

});
