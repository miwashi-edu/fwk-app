# fwk-app

> When you are using `npm run build` on fwk-app, the variables
> are read and hardcoded into ./dist
> 
> To deliver to different environments:
> add one build process for every target, DEV, TEST, STAGE, PRE_STAGE, PROD
> set github secret with the environment variables in .env
> 
> Add the environment variables to the github action.

## .env

> React requires a prefix of REACT_APP_  
> Vite requires a prefix of VITE_

```
REACT_APP_BACKEND_URL=http://localhost:3000/  
VITE_BACKEND_URL=https://api-mrpqeu5oeq-uc.a.run.app/
```

## config.js

> React are read through process.env.REACT_APP_BACKEND_URL  
> Vite are read through import.meta.env.VITE_BACKEND_URL  
> This config works with both.

```js
let reactEnv;
try {
    reactEnv = process?.env?.REACT_APP_BACKEND_URL;
} catch (e) {
    reactEnv = undefined;
}

const viteEnv = typeof import.meta !== 'undefined' && import.meta.env;

const config = {
    BACKEND_URL:
        reactEnv ||
        (viteEnv ? import.meta.env.VITE_BACKEND_URL : undefined) ||
        'http://localhost:3000',
};

export default config;

```

## Github Action

```yml
name: Deploy to Firebase Hosting on merge

on:
  push:
    branches:
      - main
    paths:
      - 'package.json'

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      # Step 1: Check out the code
      - uses: actions/checkout@v4

      # Step 2: Check for version change in package.json
      - name: Check for version change
        id: version_changed
        uses: EndBug/version-check@v2
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          diff-search: true # Search for changes in the last commit

      # Step 3: Set environment variables from GitHub Secrets
      - name: Set up environment variables
        run: |
          echo "REACT_APP_BACKEND_URL=${{ secrets.REACT_APP_BACKEND_URL }}" >> $GITHUB_ENV
          echo "VITE_BACKEND_URL=${{ secrets.VITE_BACKEND_URL }}" >> $GITHUB_ENV

      # Step 4: Install dependencies and build the project only if the version changed
      - name: Install dependencies and build
        if: steps.version_changed.outputs.changed == 'true'
        run: npm ci && npm run build

      # Step 5: Deploy to Firebase Hosting only if the version changed
      - name: Deploy to Firebase Hosting
        if: steps.version_changed.outputs.changed == 'true'
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT_FWK_APP }}
          channelId: live
          projectId: fwk-app
```
