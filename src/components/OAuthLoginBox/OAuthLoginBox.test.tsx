import { describe, it, expect } from "@jest/globals";
import { mount } from "enzyme";
import OAuthLoginBox from "./index";


describe("<OAuthLoginBox> Component", () => {

	it("Mounts & Unmounts without crashing", () => {
		// With the open=true prop
		expect(() => {
			const wrapper = mount(<OAuthLoginBox open={true} />);
			wrapper.unmount();
		});

		// With the open=false prop
		expect(() => {
			const wrapper = mount(<OAuthLoginBox open={false} />);
			wrapper.unmount();
		}).not.toThrow();
	});

});
