import type { Component } from "solid-js";
import CashIndex from "./cash";
import styles from "./App.module.css";

const App: Component = () =>
    <div class={styles.App}>
        <div class={styles.reports}>
            <CashIndex/>
        </div>
    </div>;

export default App;
