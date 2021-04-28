import { describe, it, expect } from "@jest/globals";
import { mount } from "enzyme";
import InfoBox from "./index";


describe("<InfoBox> (topic page) Component", () => {

	it("Mounts & Unmounts without crashing", () => {
		expect(() => {
			const wrapper = mount(<InfoBox description="" lessonCount={0} />);
			wrapper.unmount();
		}).not.toThrow();
	});

});
