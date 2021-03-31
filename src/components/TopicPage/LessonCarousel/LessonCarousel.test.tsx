import { describe, it, expect } from "@jest/globals";
import { mount } from "enzyme";
import LessonCarousel from "./index";


describe("<LessonCarousel> (topic page) Component", () => {

	it("Mounts & Unmounts without crashing", () => {
		expect(() => {
			const wrapper = mount(<LessonCarousel />);
			wrapper.unmount();
		}).not.toThrow();
	});

});
