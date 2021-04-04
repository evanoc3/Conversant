// mocks
import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();
// imports
import { describe, it, expect } from "@jest/globals";
import { mount } from "enzyme";
import ConversationArea from "./index";


describe("<ConversationArea> (lesson page) Component", () => {

	it("Mounts & Unmounts without crashing", () => {
		expect(() => {
			const wrapper = mount(<ConversationArea content={[]} currentStep={0} />);
			wrapper.unmount();
		}).not.toThrow();
	});

});
