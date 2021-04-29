// mocks
import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();
// imports
import { describe, it, expect } from "@jest/globals";
import { mount } from "enzyme";
import EndOfLessonBanner from "./index";


describe("<EndOfLessonBanner> (lesson page) Component", () => {

	it("Mounts & Unmounts without crashing", () => {
		expect(() => {
			const wrapper = mount(<EndOfLessonBanner topic="" topicShortLabel="" nextLesson={0} />);
			wrapper.unmount();
		}).not.toThrow();
	});

});
