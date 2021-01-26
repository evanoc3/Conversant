import { describe, it, expect } from "@jest/globals";
import { shallow } from "enzyme";
import LandingPage from "pages/index";


describe("<LandingPage> Component", () => {

	it("Mounts & Unmounts without crashing", () => {
		expect(() => {
			const wrapper = shallow(<LandingPage />);
			wrapper.unmount();
		}).not.toThrow();
	});

});