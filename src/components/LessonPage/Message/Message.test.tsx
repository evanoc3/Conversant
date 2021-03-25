import { describe, it, expect } from "@jest/globals";
import { mount } from "enzyme";
import Message from "./index";


describe("<Message> (lesson page) Component", () => {

	it("Mounts & Unmounts without crashing", () => {
		expect(() => {
			const wrapper = mount(<Message message="Hello, World!" />);
			wrapper.unmount();
		}).not.toThrow();
	});

});
