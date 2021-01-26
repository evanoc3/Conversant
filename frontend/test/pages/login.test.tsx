import { describe, it, expect } from "@jest/globals";
import { shallow } from "enzyme";
import LoginPage from "pages/login";


describe("<LoginPage> Component", () => {

	it("Mounts & Unmounts without crashing", () => {
		expect(() => {
			const wrapper = shallow(<LoginPage />);
			wrapper.unmount();
		}).not.toThrow();
	});

});