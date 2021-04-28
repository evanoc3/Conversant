import { describe, it, expect } from "@jest/globals";
import { mount } from "enzyme";
import UserInfoBox from "./index";


describe("<UserInfoBox> (home page) Component", () => {

	it("Mounts & Unmounts without crashing", () => {
		expect(() => {
			const wrapper = mount(<UserInfoBox />);
			wrapper.unmount();
		}).not.toThrow();
	});

});
