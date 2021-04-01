// mocks
import "@mocks/next/router";
import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks(); 
// imports
import { describe, it, expect } from "@jest/globals";
import { mount } from "enzyme";
import LandingPage from "@pages/index";


describe("<LandingPage> Route", () => {

	it("Mounts & Unmounts without crashing", () => {
		expect(() => {
			const wrapper = mount(<LandingPage />);
			wrapper.unmount();
		}).not.toThrow();
	});

});