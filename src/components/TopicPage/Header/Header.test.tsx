import { describe, it, expect } from "@jest/globals";
import { mount } from "enzyme";
import Header from "./index";


describe("<Header> (topic page) Component", () => {

	it("Mounts & Unmounts without crashing", () => {
		expect(() => {
			const wrapper = mount(<Header title="Topic" />);
			wrapper.unmount();
		}).not.toThrow();
	});

});
