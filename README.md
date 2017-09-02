# Udacity's Neighborhood Map Project
Welcome! This is one of the final projects for Udacity's FEND (Front End Developer Nanodegree) program. The idea behind the project is to demonstrate ability in learning a new framework and then use it to build something using the framework's best practices, in this case **knockout.js** and it's **MVVM** design pattern. To get a better idea please look at the `app/js/main.js` file.

## Installation and Running
`cd` to the project directory and run `npm install` to install all dependencies, then`gulp`to launch the app in your browser. For a production ready version, use `gulp build`. Example:

```
cd ~/Development/project-name
npm install
gulp
```
For the production ready build, use:
```
gulp build
```

You can visit the live site by going to <a href="https://edarioq.github.io/neighborhood-map/app/" target="_blank">https://edarioq.github.io/neighborhood-map/app/</a>

## Features
This project showcases some popular Coworking office spaces in Medellin, Colombia around the area known as Parque Lleras in El Poblado. Some things to note (from a technical perpsective) are:

1. Built using [Knockout.js ] (http://knockoutjs.com/)
2. Integrated with third-party data from Foursquareto using an asynchronous request (displaying the name, address, and description)
3. A responsive UX experience with custom navigation filters (using Materialize CSS)
4. A search filter and clickable list, these are bound to the data model using Knockout MVVM
5. Google Map markers bound to the data model
