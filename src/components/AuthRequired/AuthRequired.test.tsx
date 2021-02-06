import { describe, it, expect } from "@jest/globals";
import { mount } from "enzyme";
import "../../../test/mocks/next/router";
import AuthRequired from "./index";


describe("<AuthRequired> Component", () => {

	it("Mounts & Unmounts without crashing", () => {
		expect(() => {
			const wrapper = mount(<AuthRequired></AuthRequired>);
			wrapper.unmount();
		}).not.toThrow();
	});

});