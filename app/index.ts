import "./index.css";
import App from "./App.svelte";

const app = new App({
    target: document.body.querySelector("main") as HTMLElement
});

export default app;
