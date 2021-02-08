import { describe, it, expect } from "@jest/globals";
import { mount } from "enzyme";
import Header from "./index";


describe("<Header> (landing page) Component", () => {

	it("Mounts & Unmounts without crashing", () => {
		expect(() => {
			const wrapper = mount(<Header />);
			wrapper.unmount();
		}).not.toThrow();
	});

});
