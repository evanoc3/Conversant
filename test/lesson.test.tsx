// @ts-nocheck
import { describe, it, expect } from "@jest/globals";
import { mount } from "enzyme";
import "../mocks/next/router";
import LessonPage from "pages/lesson";


describe("<LessonPage> Component", () => {

	it("Mounts & Unmounts without crashing", () => {
		expect(() => {
			const wrapper = mount<LessonPage>(<LessonPage />);
			wrapper.unmount();
		}).not.toThrow();
	});

});
