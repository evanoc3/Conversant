import { describe, it, expect } from "@jest/globals";
import { mount } from "enzyme";
import IsTypingMessageBubble from "./index";


describe("<IsTypingMessageBubble> (lesson page) Component", () => {

	it("Mounts & Unmounts without crashing", () => {
		expect(() => {
			const wrapper = mount(<IsTypingMessageBubble />);
			wrapper.unmount();
		}).not.toThrow();
	});

});
