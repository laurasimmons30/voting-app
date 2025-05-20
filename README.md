# Voting app

## Documentation

## Technical Decisions

For my architecture design, I considered the pros and cons of building all my views in React and keeping the Rails side as a pure API, but as there was no specific requirement for this to behave like a SPA, I chose instead to build this like a traditional Rails app where it is managing the views. The views are driven by what reactivity is required per feature to be intentional about when to leverage React and when not to.

- I built the login form in a traditional rails.html.erb format as there was no specified requirement for the view to load async, which also simplified routing, as I could manage my screen rendering mostly through the rails router.
- The Vote and Results pages are both react and responsive with updating results based on logged in user and votes for candidates.

If the requirements were to make a react SPA, I would have made the rails application API only and started versioning my API endpoint now.

## Improvements

If I was going to continue building out this project, some features I would improve:

- Improve sessions management and implement logout (and true authentication with the password)

- Create a `Festival` table that manages the candidates collection. This would allow the limit to be flexible if the voting app was used at different events, rather than needing to update the constant on the `Candidate` class. A Festival model could also have start and end date timeframes which could allow for user votes to be expired if they attended a different festival in the future and wanted to vote again. The association would go:

  A Festival can have up to 10 candidates. A User can vote once per candidate per festival.

- Improved error handling on response and messaging to the users. Given the timeframe for this assignment, I kept this minimal on implementation.

# How To Use

```sh
bundle install # Install dependencies
yarn install # Install javascript dependencies
bundle exec rails s # Run the server
./bin/shakapacker-dev-server # Run in separate terminal for assest live reloading

http://localhost:3000 or http://localhost:3000/login
http://localhost:3000/results

```

From here you have two options, Hitting the base endpoint, the `/login` endpoint or the `/results` endpoint. Results will be empty at first if no candidates exist and no votes have been cast.

http://localhost:3000 or http://localhost:3000/login
Once you have logged in (sign up and registration use the same form, I chose to not differentiate in order to get to other requirements since it was stated that secure authentication was not a concern), you will be redirected to the `/votes` endpoint where you can add a candidate or cast a vote.

After you vote, you will be redirected to the Results page.

Because logout was out of scope, you can return to the login page to either Login as an existing user, or register a new user, and test the workflow once again.

To reset the Database and try again, use:

```
rake db:reset
```

## Testing

## React/Jest Tests

### To Make tests:

```
// initial setup console:
yarn add jest @testing-library/react @testing-library/jest-dom

yarn add --dev @testing-library/react @testing-library/dom

yarn add -D jest-environment-jsdom
```

### Known issue:

`import '@testing-library/jest-dom';`

Causes the following compiling error running the app, but is needed to run the tests:

`ERROR in ./node_modules/@testing-library/jest-dom/node_modules/supports-color/browser.js`

- Workaround for exercise - I did not have enough time to debug a solution, so for the purposes of the demo, uncomment the above testing-library line to run the React tests, and comment out again to run application. The import is required in every react test.

### To run:

`yarn jest app/javascript`

## Ruby Tests:

### To run:

`bundle exec rspec spec`
