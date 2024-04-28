import Button from '../design-system/button';
import styles from './key-bindings-modal.module.css';
import { useState } from 'preact/hooks';
import { showKeyBinding } from '../../lib/state';
import { JSX } from 'preact/jsx-runtime';

const getCookie = (name: any) => {
	if (typeof document !== 'undefined') {
		const matches = document.cookie.match(
			new RegExp(`(^| )${name}=([^;]+)`)
		);
		return matches ? decodeURIComponent(matches[2] || '') as string : null;
	}
	return null;
};

const setCookie = (name: any, value: string | number | boolean, days: number) => {
	const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
	document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
};

export default function KeyBindingsModal() {
	const defaultBindings = getCookie('keyBindings')
		? JSON.parse(getCookie('keyBindings') as string)
		: { W: '', A: '', S: '', D: '', I: '', J: '', K: '', L: '' };

	const [bindings, setBindings] = useState<{ [key: string]: string }>(defaultBindings);

	const handleChange = (key: string, e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
		const input = e.target as HTMLInputElement;
		if (input) {
			setBindings((prev: any) => ({ ...prev, [key]: input.value }));
		}
	};

	const handleSave = () => {
		setCookie('keyBindings', JSON.stringify(bindings), 365);
		console.log('Updated key bindings:', bindings);
		showKeyBinding.value = false;
	};

	return (
		<div className={`${styles.overlay} ${showKeyBinding.value ? styles.show : ''}`}>
			<div className={styles.modal}>
				<h2 className={styles.modalTitle}>Change Key Bindings</h2>

				<p className={styles.modalDescription}>
					Adjust the key bindings to your preferences. Click a text field to enter a new key. Make sure the keys don't conflict with other important functions.
				</p>

				<div className={styles.bindingsContainer}>
					{Object.entries(bindings).map(([key, value]) => (
						<div className={styles.binding} key={key}>
							<label className={styles.label}>Key {key}:</label>
							<input
								className={styles.input}
								type="text"
								value={value}
								onChange={(e) => handleChange(key, e)}
								placeholder={value || 'Enter new key'}
							/>
						</div>
					))}
				</div>

				<div className={styles.buttonContainer}>
					<Button onClick={handleSave} >Save Changes</Button>
					<Button onClick={() => (showKeyBinding.value = false)}>Cancel</Button>
				</div>
			</div>
		</div>
	);
}