import { describe, it, expect } from "@jest/globals";
import { mount } from "enzyme";
import "@mocks/next/router";
import HomePage from "@pages/home";


describe("<HomePage> Route", () => {

	it("Mounts & Unmounts without crashing", () => {
		expect(() => {
			const wrapper = mount(<HomePage />);
			wrapper.unmount();
		}).not.toThrow();
	});
});
