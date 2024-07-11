import { useEffect, useRef, useState } from "preact/hooks";
import { Game } from "../../lib/game-saving/account";
import InlineInput from "../design-system/inline-input";
import styles from "./project-name-creator.module.css";
import Button from "../design-system/button";

interface ModalCreator{
	game:Game;
}

export default function ProjectNameCreator({game}:ModalCreator) {
	const [stateName, setStateName] = useState(game.name);
	

	return <div class={styles.container}>
		<div class={styles.inner}>
			<h1 class={styles.header}>Name your game</h1>
			<div class={styles.input}>
				<InlineInput autofocus={true} value={stateName} placeholder="Untitled" onChange={setStateName}/>
			</div>

			{/* <button style={styles.button} onClick={()=>{}}>
				Done
			</button> */}
			<div class={styles.buttonContainer}>
				<Button accent class={styles.done} onClick={()=>{
					fetch("/api/games/rename", {method:"POST", body:JSON.stringify({
						gameId: game.id,
						newName:stateName
					})}).then(res=>res.json()).then(data=>{

						window.location.reload();
					})
				}}><span>Done</span></Button>
				<Button class={styles.cancel}
				onClick={()=>{
					fetch("/api/games/rename", {method:"POST", body:JSON.stringify({
						gameId: game.id,
						newName:game.name
					})}).then(res=>res.json()).then(data=>{

						window.location.reload();
					})
				}}
				>Cancel</Button>
			</div>
		</div>

	</div>;
}
