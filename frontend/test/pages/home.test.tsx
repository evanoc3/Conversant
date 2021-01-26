import { describe, it, expect } from "@jest/globals";
import { shallow } from "enzyme";
import HomePage from "pages/home";


describe("<HomePage> Component", () => {

	it("Mounts & Unmounts without crashing", () => {
		expect(() => {
			const wrapper = shallow(<HomePage />);
			wrapper.unmount();
		}).not.toThrow();
	});

});
