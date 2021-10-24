import type { Component } from "solid-js";
import styles from "./App.module.css";
import CashIndex from "./cash";

const App: Component = () =>
    <div class={styles.App}>
        <header>MPR Dashboard</header>
        <div class={styles.chart}>
            <CashIndex/>
        </div>
    </div>;

export default App;
