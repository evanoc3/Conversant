import { describe, it, expect } from "@jest/globals";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import "./__mocks__/next-router";
import "./__mocks__/auth-manager";
import HomePage from "pages/home";


describe("<HomePage> Component", () => {

	it("Mounts & Unmounts without crashing", () => {
		expect(() => {
			act(() => {
				const wrapper = mount(<HomePage />);
				wrapper.unmount();
			});

		}).not.toThrow();
	});
});
