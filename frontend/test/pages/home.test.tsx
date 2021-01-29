import { describe, it, expect } from "@jest/globals";
import { mount, ReactWrapper } from "enzyme";
import { act } from "react-dom/test-utils";
import "../mocks/next/router";
import "../mocks/utils/auth-manager";
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
