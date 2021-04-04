import { describe, it, expect } from "@jest/globals";
import { mount } from "enzyme";
import "@mocks/next/router";
import TopicPage from "@pages/topic/[topicId]";


describe("<TopicPage> Route", () => {

	it("Mounts & Unmounts without crashing", () => {
		expect(() => {
			const wrapper = mount(<TopicPage />);
			wrapper.unmount();
		}).not.toThrow();
	});

});
