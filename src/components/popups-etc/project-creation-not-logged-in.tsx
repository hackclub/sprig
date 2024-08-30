import styles from "./project-name-creator.module.css";
import Button from "../design-system/button";
import { defaultExampleCode } from "../../lib/examples";

export default function ProjectNameCreator() {

    return (
        <div class={styles.container}>
            <div></div>
            <div class={styles.containerInner}>
                <div class={styles.inner}>
                    <h1 class={styles.header}>Create Game</h1>
                    <p>If you create a new game, the game you were working on will be lost because you are not logged in.</p>
                    <div class={styles.buttonContainer}>
                        <Button type="submit" accent class={styles.done} onClick={()=>{
                            localStorage.setItem("sprigMemory", defaultExampleCode);
                            window.location.href= `/editor`;
                        }}><span>Create a New Game</span></Button>
                    </div>
                    <div class={styles.buttonContainer}>
                        <Button type="submit" accent class={styles.done} onClick={()=>{
                            window.location.href= `/login?to=/~/new-game`;
                        }}><span>Log In</span></Button>
                        <Button type="submit" accent class={styles.done} onClick={()=>{
                            window.location.href= `/editor`;
                        }}><span>Open Your Game</span></Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
