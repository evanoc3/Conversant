import { describe, it, expect } from "@jest/globals";
import { mount } from "enzyme";
import SearchInput from "./index";


describe("<SearchInput> (landing page) Component", () => {

	it("Mounts & Unmounts without crashing", () => {
		expect(() => {
			const wrapper = mount(<SearchInput placeholder="" />);
			wrapper.unmount();
		}).not.toThrow();
	});

});
