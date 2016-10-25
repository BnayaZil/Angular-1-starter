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

