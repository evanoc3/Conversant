import { describe, it, expect } from "@jest/globals";
import { mount } from "enzyme";
import SearchResults from "./index";


describe("<SearchResults> Component", () => {

	it("Mounts & Unmounts without crashing", () => {
		expect(() => {
			const wrapper = mount(<SearchResults onResultSelected={() => {}} results={[]} />);
			wrapper.unmount();
		}).not.toThrow();
	});

});
