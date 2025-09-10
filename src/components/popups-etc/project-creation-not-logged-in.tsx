import styles from "./project-name-creator.module.css";
import Button from "../design-system/button";
import LinkButton from '../design-system/link-button';
import { defaultExampleCode } from "../../lib/examples";

export default function ProjectNameCreatorNotLoggedIn() {

    return (
        <div class={styles.container}>
            <div></div>
            <div class={styles.containerInner}>
                <div class={styles.inner}>
                    <h1 class={styles.header}>Create Game</h1>
                    <p>You already have a game stored, but it hasn't been saved to an account. You can either log in to save it and create a new game, or open your existing game.</p>
                    <div class={styles.buttonContainer}>
                        <Button type="submit" accent class={styles.done} onClick={()=>{
                            window.location.href= `/login?to=/~/new-game`;
                        }}><span>Log In</span></Button>
                        <Button type="submit" accent class={styles.done} onClick={()=>{
                            window.location.href= `/editor`;
                        }}><span>Open Your Game</span></Button>
                    </div>
                    <div class={[styles.buttonContainer, styles.muted].join(' ')}>
                        <LinkButton
                            onClick={() => {
                                localStorage.setItem("sprigMemory", defaultExampleCode);
                                window.location.href= `/editor`;
                            }}
                        >or, delete your old game and start from scratch</LinkButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
