# Udacity's Neighborhood Map Project
Welcome! This is one of the final projects for Udacity's FEND (Front End Developer Nanodegree) program.

## Installation and Running
`cd` to the project directory and run `npm install` to install all dependencies, then`gulp`to launch the app in your browser. For a production ready version, use `gulp build`. Example:

```
cd ~/Development/project-name
npm install
gulp
```
Then to have a production ready build, use:
```
gulp build
```

You can visit the live site by going to <a href="https://edarioq.github.io/neighborhood-map/app/">https://edarioq.github.io/neighborhood-map/app/</a>

## Features
This project showcases some popular areas in Medellin, Colombia. It includes:

1. Local attractions
2. Third-party data to showcase these attractions
3. A great UX experience with custom navigation filters


# Udacity Project Specification
The following is the project rubric.

### Interface Design
1. All application components render on-screen in a responsive manner.

2. All application components are usable across modern desktop, tablet, and phone browsers.

### App Functionality
1. Includes a text input field or dropdown menu that filters the map markers and list items to locations matching the text input or selection. Filter function runs error-free.

2. A list-view of location names is provided which displays all locations by default, and displays the filtered subset of locations when a filter is applied.
Clicking a location on the list displays unique information about the location, and animates its associated map marker (e.g. bouncing, color change.) List functionality is responsive and runs error free.

3. Map displays all location markers by default, and displays the filtered subset of location markers when a filter is applied.

* Clicking a marker displays unique information about a location in either an infoWindow or DOM element.
* Markers should animate when clicked (e.g. bouncing, color change.)
* Any additional custom functionality provided in the app functions error-free.

### App Architecture
Code is properly separated based upon `Knockout` best practices (follow an `MVVM` pattern, avoid updating the `DOM` manually with `jQuery` or `JS`, use `observables` rather than forcing refreshes manually, etc). `Knockout` should not be used to handle the `Google Map API`.

* There are at least 5 locations in the model. These may be hard-coded or retrieved from a data API.

### Asynchronous Data Usage
1. Application utilizes the Google Maps API and at least one non-Google third-party API. Refer to <a href="https://developers.google.com/maps/documentation/javascript/tutorial" target="_blank">this documentation</a>.

2. All data requests are retrieved in an asynchronous manner.

3. Data requests that fail are handled gracefully using common fallback techniques (i.e. `AJAX` erro` or fail methods). 'Gracefully' means the user isn’t left wondering why a component isn’t working. If an `API` doesn’t load there should be some visible indication on the page (an alert box is ok) that it didn’t load. ***Note***: You do not need to handle cases where the user goes offline.

### Location Details Functionality
1. Functionality providing additional data about a location is provided and sourced from a 3rd party API. Information can be provided either in the marker’s `infoWindow`, or in an `HTML` element in the `DOM` (a sidebar, the list view, etc.)

2. Provide attribution for the source of additional data. For example, if using Foursquare, indicate somewhere in your UI and in your README that you are using Foursquare data.

3. Application runs without errors.

4. Functionality is presented in a usable and responsive manner.

### Documentation
1. A `README` file is included detailing all steps required to successfully run the application.

2. Comments are present and effectively explain longer code procedures.

3. Code is formatted with consistent, logical, and easy-to-read formatting as described in the <a href="http://udacity.github.io/frontend-nanodegree-styleguide/javascript.html" target="_blank">Udacity JavaScript Style Guide</a>.

4. If build tools (such as Gulp or Grunt) are used, both source and production code are submitted in the same repository in separate directories. These directories are usually named `src` and `dist` respectively.

