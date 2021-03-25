import { describe, it, expect } from "@jest/globals";
import { mount } from "enzyme";
import UserMessage from "./index";


describe("<UserMessage> (lesson page) Component", () => {

	it("Mounts & Unmounts without crashing", () => {
		expect(() => {
			const wrapper = mount(<UserMessage message="Hello, World!" />);
			wrapper.unmount();
		}).not.toThrow();
	});

});
