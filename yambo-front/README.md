# Yambo Flashcards

Yambo Flashcards: Flashcards for people

## Branching Policy

main
- Production ready code. DO NOT COMMIT DIRECTLY

staging
- Fully tested development code. Development environment code will be merged after a user test. Ready for acceptance testing by clients (to trial new features). DO NOT COMMIT DIRECTLY

develop
- Automated tests must pass to be pushed. Can merge feature branches in

## Development Approach

Test-Driven Development(TDD)
1. Brainstorm feature
2. Write expected behavior in test description
3. Write tests
4. Ensure tests fail
5. Write code to make tests pass

## Setup

1. Clone the project into your preferred folder
`git clone https://github.com/mwhitman189/yambo-flashcards.git`

2. cd into the front-end folder and install depenencies
```
cd yambo-front &&
npm i
```

3. (TODO: Create backend)
```
cd ../yambo-api &&
npm i &&
cd ../
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
