import { describe, it, expect } from "@jest/globals";
import { mount } from "enzyme";
import LessonList from "./index";


describe("<LessonList> (home page) Component", () => {

	it("Mounts & Unmounts without crashing", () => {
		expect(() => {
			const wrapper = mount(<LessonList />);
			wrapper.unmount();
		}).not.toThrow();
	});

});
