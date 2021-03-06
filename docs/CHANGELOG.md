# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

- __Added__ for new features.
- __Changed__ for changes in existing functionality.
- __Deprecated__ for soon-to-be removed features.
- __Removed__ for now removed features.
- __Fixed__ for any bug fixes.
- __Security__ in case of vulnerabilities.

## [0.9.0] - 7-07-2019
###Added
- still adding styles for responsive layouts all devices done except, iphone, 5/6/7/8 and + versions X/XS/XRXS MAX Kindle Fire

## [0.9.0] - 4-07-2019
###Removed
- modal for mobile devices with a screen width less than 850px

## [0.9.0] - 2-07-2019 & 4-07-2019
###Changed
- lightbox/modal pagination next/previous is now functional
- css for modal
- moved css styling around to specific components where its needed rather than universally accessed

###Added
- pagination component and css styling

## [0.8.0] - 2-07-2019
###Added
- WIP lightbox/modal next previos buttons not 100% functional/buggy

## [0.8.0] - 30-06-2019
###Changed
- mobile device CSS layouts
- mobile device CSS layouts ipad, Pixel 3
- updated mosaic css layout so images fit better into grid layout

###Added
- preloading pixelation to image initial loading 

##Removed
- removed findUrl function

## [0.8.0] - 29-06-2019
##Removed
- parrallax style sheet and renamed to landing-parrallax

###Changed
- still changing mobile layouts
- form css styling and particle colour

###Added 
- contact form and connected it to [Airtable](https://airtable.com/) to collect contact details Locations still not recording in table other fields are
- particle canvas to go behinde contact form, still not sure on colors and pattern will review
- airtable package
- details to env and updated env.example
- email validation to contact form

## [0.7.1] - 26-06-2019
##Removed
- infinite scroll component

###Changed
- layout change icon will not be available for screens smaller than 667px wide

###Added 
- started responsive layout for devices iphone, iwatch, ipad, galaxy, galaxy tab, google pixel 
- Markdown to html parser, this was added for rendering content on the contact page, unsure if it will stay. [react-markdown](https://github.com/rexxars/react-markdown) 
- footer component
- contact page

## [0.7.0] - 26-06-2019
###Removed
- infinite scroll, was not really needed for this content and became very difficult to implement nicley with contentful

###Changed
- Location of array randomizer to the gallery-image component to randomize rendering images.
- updated Readme.MD

## [0.7.0] - 25-06-2019
###Changed
- how the data is collected only using one fetch now, this has broken the infinite scroll for now

###Added
- A Second Page for showing differnet style of photography 
- a main routes page to handle dynamically added pages and content from contenful
- further updates to Css and refining Css code
- links to navBar component to navigate new pages

## [0.6.0] - 24-06-2019
###Changed
- WIP chnaging and adjusting css for gallery layout options

###Added
- New font PT Sans Narrow
- WIP nav bar options 

## [0.5.0] - 24-06-2019
###Changed
- WIP updated css layout for gallery layout options

## [0.5.0] - 19-06-2019
###Changed
- fetch data added fetch for image array

###Added
- working functionality to reusable infinite scroll component

###Removed
- nested mappings in gallery

## [0.4.0] - 18-06-2019
###Changed
- updated and consolodated some css styles
- context menue

###Added
- infinite scroll component (not functioning)
- lazy loading for imges

###Removed
- some css style files

## [0.4.0] - 17-06-2019
###Changed
- page routes to render rather than component
- moved state to app
- updated some css styles

###Added
- started to add content to [Contenful](https://www.contentful.com/) 
- fetch data component to get data from contentful

###Removed
- state from gallery
- local image for landing page

## [0.3.0] - 11-06-2019
###Changed
- infinite scroll now functioning correctly
- css layout options for gallery
- preloader colours
- css has been refined removed unused + duplicate styles

###Added
- custom context menu
- navbar place holder
- getScrollLocation function
- NoMatch page for if the url is incorrect
- added GalleryImage to the modal to reuse that component

## [0.1.0] - 11-06-2019
###Changed
- routing

###Added
- icons and one of my own images for landing page
- infinite scroll WIP

## [0.1.0] - 06-06-2019

###Added
- Ability to test components
- CSS
- README
- Initial commit.

