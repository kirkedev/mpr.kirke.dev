import type { Component } from "solid-js";
import CashIndex from "./cash";
import styles from "./App.module.css";

const App: Component = () =>
    <div class={styles.App}>
        <h1>MPR Dashboard</h1>

        <div class={styles.reports}>
            <CashIndex/>
        </div>
    </div>;

export default App;
