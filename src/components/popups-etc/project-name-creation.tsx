import { useState } from "preact/hooks";
import styles from "./project-name-creator.module.css";
import Button from "../design-system/button";


export default function ProjectNameCreator() {
	const [stateName, setStateName] = useState("");
	const [loading, setLoading] = useState(false);

	return <div class={styles.container}>
		<div></div>
		<div class={styles.containerInner}>
		
			<form class={styles.inner} onSubmit={(e) => {
				e.preventDefault();
				setLoading(true)
                                window.location.href= `/~/new?name=${stateName}`;
			}}>
				<h1 class={styles.header}>Create Game</h1>
				<p>Please input a game name</p>
				<input type={"text"} class={styles.input} autofocus={true} value={stateName} placeholder="Untitled" onInput={(e)=>{setStateName((e.target as HTMLTextAreaElement)?.value )}}/>
				<div class={styles.buttonContainer}>
					<Button type="submit" disabled={loading || stateName.length===0} accent class={styles.done}><span>{!loading ? "Create" : "Creating..."}</span></Button>
				</div>
			</form>
		</div>
		
	</div>;
}
