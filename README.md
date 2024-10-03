# fwk-app

> When using `npm run build` on fwk-app, the variables
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