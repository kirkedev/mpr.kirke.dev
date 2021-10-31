import type { Component } from "solid-js";
import CashIndex from "./cash";
import Cutout from "./cutout";
import Primals from "./primals";
import styles from "./App.module.css";

const App: Component = () =>
    <div class={styles.App}>
        <div class={styles.reports}>
            <CashIndex/>
            <Cutout/>
            <Primals/>
        </div>
    </div>;

export default App;
