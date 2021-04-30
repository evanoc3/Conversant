// mocks
import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();
import "@mocks/scrollIntoView";
// imports
import { describe, it, expect } from "@jest/globals";
import { mount } from "enzyme";
import ConversationArea from "./index";


describe("<ConversationArea> (lesson page) Component", () => {

	it("Mounts & Unmounts without crashing", () => {
		expect(() => {
			const wrapper = mount(<ConversationArea messages={[]} isTyping={false} hasReachedEnd={false} />);
			wrapper.unmount();
		}).not.toThrow();
	});

});
