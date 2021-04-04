import { describe, it, expect } from "@jest/globals";
import { mount } from "enzyme";
import YesNoChoiceMessage from "./index";


describe("<YesNoChoiceMessage> (lesson page) Component", () => {

	it("Mounts & Unmounts without crashing", () => {
		expect(() => {
			const wrapper = mount(<YesNoChoiceMessage message="Hello, World!" />);
			wrapper.unmount();
		}).not.toThrow();
	});

});
