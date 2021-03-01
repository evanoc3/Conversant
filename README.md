# Conversant

This repository contains the frontend, and backend serverless functions for [getconversant.io](https://getconversant.io), my 4BCT final year project.

## Technology Stack

The vast majority of this project is written in Typescript, which is a statically-typed syntactical superset of Javascript. The benefit of static type analysis is that it helps to avoid run-time bugs in the app by making them compile-time errors instead. This way, almost all bugs are caught in the development phase, instead of making it through to the production environment and causing havoc with real users there.

React.js is a declarative, composable, client-side UI framework. It is written in Javascript, making it easily compatible with the Typescript configuration I had already been using. Next.js is a higher-level framework built on top of React. It handles the client-side routing and static rendering of the app to an output bundle of HTML, javascript, and CSS. On its own, React usually results in the app's resulting routing architecture being a SPA _(Single Page App)_, but by using Next.js, it instead produces a statically-rendered HTML page for every page of the client-side router object, allowing for better responsivity.

As a project grows, CSS stylsheets quickly become unwieldy to read and to ensure there are no selector name overlaps. Sass and CSS Modules are both used to help reduce the complexity of the project's stylesheets. Sass allows the nesting of styles, and commonly used values can be extracted into variables or mixins in a separate file which can then be imported wherever they are needed. CSS Modules is a technology intended to prevent name overlaps in CSS selectors causing unintended styles to be applied. It does this by transforming the source file, adding a hash to the end of each selector in the output so that there will never be an overlap, regardless of if two source files use the exact same name.

This project is structured as a PWA _(Progressive Web App)_, which allows it to be installed on the users device and provides several of the benefits of being installed as a native app. To do this, a combination of things need to be done:
* Several `<meta />` tags need to be added to each page,
* A `manifest.json` file needs to be served through the `/public` directory,
* Icons in various sizes for the PWA need to be available,
* A service worker is created automatically for each build by workbox (via next-pwa) which caches files for offline use,
* The app needs to be served over HTTPS

Once these conditions have been met, most modern browsers will recognise the website as a PWA, and allow some mechanism for installing it locally, for example, on iOS, a PWA can be added to the home screen and looks indistinguishable from a native app. Even though it is still run in a web browser, it can run in a separate window and the UI of the browser can be hidden, allowing the app complete control over the UI.


**TL;DR:**  
| Purpose | Technology |
|-|-|
| UI | React |
| Routing & Static Rendering | Next.js |
| Deployment & Hosting (CI/CD) | Vercel |
| Type Analysis | Typescript |
| CSS Preprocessor | Sass, CSS Modules |
| Persistence (Database) | MySQL |
| Testing | Jest |
| Service Worker | Workbox (via next-pwa) |