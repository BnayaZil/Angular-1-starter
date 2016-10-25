# Angular-1-starter - (In progress).
A simple starter for angular 1 with Webpack configuration(ES6, Less, Fonts and etc).

## File Structure
We use a `every thing is a component` approach to make the app most ready to migration for angular 2, Here's how it looks:
```
src
⋅⋅app/
⋅⋅⋅⋅app.drv.js * app entry file
⋅⋅⋅⋅app.config.js * app configurition file
⋅⋅⋅⋅app.tpl.html * app template
⋅⋅⋅⋅shared/ * functionality pertinent to several components propagate into this directory
......shared.js * shared entry file
⋅⋅⋅⋅components/ * where components live
⋅⋅⋅⋅⋅⋅components.js * components entry file
⋅⋅⋅⋅⋅⋅header/ * header component
⋅⋅⋅⋅⋅⋅⋅⋅home.js * home entry file (component configurition and controller)
⋅⋅⋅⋅⋅⋅⋅⋅home.less * home less file
⋅⋅⋅⋅⋅⋅⋅⋅home.tpl.html * home template
```

# Getting started
## Dependencies
To run the app you will need globaly install of `webpack` and `gulp`:
`npm i -g webpack gulp`

## Install
* `fork` this repository.
* `clone` your fork repository.
* `npm i -g gulp webpack` install global cli [Dependencies](#dependencies).
* `npm i` to install all project dependencies.

## Commands
### NPM
Here list of npm commands:
* `npm start` will serve the app on port 8080.
* `npm webpack` will bundle the app to dist folder.

### GULP
Here list of gulp commands:
* `gulp server` will serve the app on port 8080.
* `gulp bundle` will bundle the app to dist folder.
* `gulp version` will add patch to version number in the package.json.
* `gulp install` will install all package.json dependencies.
* `gulp lint` Soon.
* `gulp test` Soon.
