// Add Enzyme React Adapter
// See https://enzymejs.github.io/enzyme/docs/installation/react-16.html#working-with-react-16
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({
	adapter: new Adapter()
});


// Setup JSDom
// See https://enzymejs.github.io/enzyme/docs/guides/jsdom.html
import { JSDOM } from "jsdom";
const jsdom = new JSDOM("<!DOCTYPE html><html><body></body></html>", {
	url: "http://localhost:8080"
});


// @ts-ignore
global.window = jsdom.window;
global.document = jsdom.window.document;

Object.defineProperties(global, {
	...Object.getOwnPropertyDescriptors(window),
	...Object.getOwnPropertyDescriptors(global),
});
