# crowdstreet-react

This is a pure react project that tries to emulate the react portion of the Crowdstreet assignment.

Due to time constraints, the dynamic resizing of the 3 tables is not finished.

## Delpoy

This GitHub project is linked to Travis CI which is linked to AWS Elastic Beanstalk.

Pushes to the master branch of this repo will trigger Travis CI to build and test a docker container, and
if that passes, will push it to AWS Elastic Beanstalk and do a deploy, so the entire process is automated.

The URL to access the app is [here](http://dockercrowdstreetreact-env.eba-dphaz6jp.us-west-2.elasticbeanstalk.com/)

## Available Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
