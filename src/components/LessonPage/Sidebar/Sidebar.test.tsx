import { describe, it, expect } from "@jest/globals";
import { mount } from "enzyme";
import Sidebar from "./index";


describe("<Sidebar> (lesson page) Component", () => {

	it("Mounts & Unmounts without crashing", () => {
		expect(() => {
			const wrapper = mount(<Sidebar />);
			wrapper.unmount();
		}).not.toThrow();
	});

});
