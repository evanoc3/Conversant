import { describe, it, expect } from "@jest/globals";
import { mount } from "enzyme";
import UserBadge from "./index";


describe("<UserBadge> Component", () => {

	it("Mounts & Unmounts without crashing", () => {
		expect(() => {
			const wrapper = mount(<UserBadge />);
			wrapper.unmount();
		}).not.toThrow();
	});

});
