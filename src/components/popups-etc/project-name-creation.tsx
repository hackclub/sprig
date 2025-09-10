import { useState, useEffect } from "preact/hooks";
import styles from "./project-name-creator.module.css";
import Button from "../design-system/button";

export default function ProjectNameCreator() {
    const [stateName, setStateName] = useState("");
    const [loading, setLoading] = useState(false);
    const [remixId, setRemixId] = useState<string | null>(null);

    useEffect(() => {
        // Get remix parameter from URL
        const urlParams = new URLSearchParams(window.location.search);
        const remix = urlParams.get('remix');
        if (remix) {
            setRemixId(remix);
            // Set default name to "Remix of [original game]"
            setStateName(`Remix of ${remix}`);
        }
    }, []);

	return <div class={styles.container}>
		<div></div>
		<div class={styles.containerInner}>
		
			<form class={styles.inner} onSubmit={(e) => {
				e.preventDefault();
				setLoading(true);
				const url = new URL('/~/new', window.location.origin);
				url.searchParams.set('name', stateName);
				if (remixId) {
					url.searchParams.set('remix', remixId);
				}
				window.location.href = url.toString();
			}}>
				<h1 class={styles.header}>{remixId ? 'Remix Game' : 'Create Game'}</h1>
				<p>Please input a game name</p>
				<input type={"text"} class={styles.input} autofocus={true} value={stateName} placeholder="Untitled" onInput={(e)=>{setStateName((e.target as HTMLTextAreaElement)?.value )}}/>
				<div class={styles.buttonContainer}>
					<Button type="submit" disabled={loading || stateName.length===0} accent class={styles.done}><span>{!loading ? (remixId ? "Remix" : "Create") : (remixId ? "Remixing..." : "Creating...")}</span></Button>
				</div>
			</form>
		</div>
		
	</div>;
}
