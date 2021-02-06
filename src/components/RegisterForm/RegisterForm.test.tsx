import { describe, it, expect } from "@jest/globals";
import { mount } from "enzyme";
import RegisterForm from "./index";


describe("<RegisterForm> Component", () => {

	it("Mounts & Unmounts without crashing", () => {
		expect(() => {
			const wrapper = mount(<RegisterForm />);
			wrapper.unmount();
		}).not.toThrow();
	});

});
