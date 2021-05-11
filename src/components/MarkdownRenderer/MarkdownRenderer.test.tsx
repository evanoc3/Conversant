import { describe, it, expect } from "@jest/globals";
import { mount } from "enzyme";
import MarkdownRenderer from "./index";


describe("<MarkdownRenderer> Component", () => {

	it("Mounts & Unmounts without crashing", () => {
		expect(() => {
			const wrapper = mount(<MarkdownRenderer children="Hello, World!"></MarkdownRenderer>);
			wrapper.unmount();
		}).not.toThrow();
	});

});
