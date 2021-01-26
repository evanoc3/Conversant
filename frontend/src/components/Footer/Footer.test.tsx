import { describe, it, expect } from "@jest/globals";
import { mount } from "enzyme";
import Footer from "./index";


describe("<Footer> Component", () => {

	it("Mounts & Unmounts without crashing", () => {
		expect(() => {
			const wrapper = mount(<Footer />);
			wrapper.unmount();
		}).not.toThrow();
	});

});
