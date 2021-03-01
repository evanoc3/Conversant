import { describe, it, expect } from "@jest/globals";
import { mount } from "enzyme";
import SendMessageForm from "./index";


describe("<SendMessageForm> (lesson page) Component", () => {

	it("Mounts & Unmounts without crashing", () => {
		expect(() => {
			const wrapper = mount(<SendMessageForm />);
			wrapper.unmount();
		}).not.toThrow();
	});

});
