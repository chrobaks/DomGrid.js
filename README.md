# DomGrid.js

```sh
yarn
yarn build
yarn serve
```

### Singlepage Javascript framework

Small Javascript object settings for personalized Web-Applications.

### Requirements

- Experience in Javascript (min. 1 year)
- Experience in OOP (Javascript, min. 1 year)

### Where to use

DomGrid is NOT like angular or react, you have to write much more code, if you start with.

You can build your own version cycle up to the requirements of your Application, not of the Framework you are using.

### Structure

- config
  - test.js
- src
  - component
    - ComponentName
      - ComponentName.js
      - ComponentName.scss (optional)
  - element
      - ElementName
          - ElementName.js
          - ElementName.scss (optional)
  - service
      - ServiceName
          - ServiceName.js
          - ServiceName.scss (optional)
  - index.js // entrypoint of the app 
- index.html
- webpack.config.js
- 
### Documentation 

#### DomGrid.js 
- Instantiate GridModal
- Load and instantiate component/element
- Ajax-Request methods

#### GridModal.js
- Show dynamic modal views
- Load Templates and Scripts into modal view
- Form Handling and js service integration

#### GridComponent.js
Core component class extend by component

#### GridElement.js
Core element class extend by element

#### GridUi.js
Small Sample of helper functions

### Demoversion
https://netcodev.de/domgrid/
