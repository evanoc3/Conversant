import { describe, it, expect } from "@jest/globals";
import { mount } from "enzyme";
import LessonHeader from "./index";


describe("<LessonHeader> Component", () => {

	it("Mounts & Unmounts without crashing", () => {
		expect(() => {
			const wrapper = mount(<LessonHeader />);
			wrapper.unmount();
		}).not.toThrow();
	});

});
