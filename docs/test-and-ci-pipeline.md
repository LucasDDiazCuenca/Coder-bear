# Test Suite and Continuous Integration Pipeline

This repository includes a pipeline designed to automate the testing and building process whenever changes are pushed to the repository.

## Test Suite

### Testing Frameworks
- [Vitest](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

### Running Tests

To run tests manually, execute the following command:

```sh
npm run test
```

### Adding Unit Tests
It's recommended to continuously create unit tests as more components are added to the application. Currently, Three.js-related components are not tested. For other components, create individual test files inside the `tests/components` folder named as follows:

**ComponentName.test.js**
 
Follow a similar structure for testing new elements added to the application in the `tests` folder, mirroring the structure of the `src` folder.

## Pipeline Workflow

The pipeline is triggered by any push events to the repository.

### Steps
1. Checkout Code: Fetches the latest code from the repository.
2. Setup Node.js Environment: Configures the environment with Node.js version 20.
3. Install Dependencies and Run Tests: Installs all dependencies and runs the tests. Ensure that all tests pass before proceeding to the next step.
4. Build Application: Compiles the code to ensure the integrity of any new features and keep the app ready for deployment.

### Handling Failures
If any of the tests fail or errors occur during the build process, appropriate notifications are sent to the development team for further investigation.

## Dependency Management
Dependencies are managed using npm for package installation. Ensure consistent dependency versions to maintain stability across environments.