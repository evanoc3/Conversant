import { describe, it, expect } from "@jest/globals";
import { mount } from "enzyme";
import RegularLoginBox from "./index";


describe("<RegularLoginBox> Component", () => {

	it("Mounts & Unmounts without crashing", () => {
		// With the open=true prop
		expect(() => {
			const wrapper = mount(<RegularLoginBox open={true} />);
			wrapper.unmount();
		}).not.toThrow();

		// With the open=false prop
		expect(() => {
			const wrapper = mount(<RegularLoginBox open={false} />);
			wrapper.unmount();
		}).not.toThrow();
	});

});
