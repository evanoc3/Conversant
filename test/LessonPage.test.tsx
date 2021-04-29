// mocks
import "@mocks/next/router";
import "jest-fetch-mock";
// imports
import { describe, it, expect } from "@jest/globals";
import { withRouter } from "next/router";
import { mount } from "enzyme";
import LessonPage from "@pages/lesson/[lessonId]";


describe("<LessonPage> Route", () => {

	it("Mounts & Unmounts without crashing", () => {
		expect(() => {
			const LessonPageComponent = withRouter(LessonPage);
			const wrapper = mount(<LessonPageComponent />);
			wrapper.unmount();
		}).not.toThrow();
	});

});
