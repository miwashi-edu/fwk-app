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
