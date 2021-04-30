// mocks
import "@mocks/next/router";
import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();
import "@mocks/scrollIntoView";
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
