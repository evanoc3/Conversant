import { describe, it, expect } from "@jest/globals";
import { mount } from "enzyme";
import TitleBar from "./index";


describe("<TitleBar> (lesson page) Component", () => {

	it("Mounts & Unmounts without crashing", () => {
		expect(() => {
			const wrapper = mount(<TitleBar lessonTitle={""} lessonTopic={""} sidebarOpen={false} toggleSidebarOpen={() => {}} />);
			wrapper.unmount();
		}).not.toThrow();
	});

});
