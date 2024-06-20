import { useState, useEffect } from 'preact/hooks';
import Button from '../design-system/button';
import styles from './key-bindings-modal.module.css';
import { showKeyBinding } from '../../lib/state';

interface KeyBindings {
    [key: string]: string;
}

const cookieName = 'keyBindings';
const defaultKeyBindings: KeyBindings = { w: 'w', a: 'a', s: 's', d: 'd', i: 'i', j: 'j', k: 'k', l: 'l' };

const getCookie = (name: string): string | null => {
    if (typeof document !== 'undefined') {
        const cookieValue = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
        return cookieValue ? decodeURIComponent(cookieValue[2] || '') : null;
    }
    return null;
};

const setCookie = (name: string, value: string, days: number): void => {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
};

export default function KeyBindingsModal() {
    useEffect(() => {
        const bindings = getCookie(cookieName);
        if (!bindings) {
            setCookie(cookieName, JSON.stringify(defaultKeyBindings), 365);
        }
    }, []);

    const initialBindings = JSON.parse(getCookie(cookieName) || JSON.stringify(defaultKeyBindings));
    const [bindings, setBindings] = useState<KeyBindings>(initialBindings);

    const handleKeyDown = (key: string, event: KeyboardEvent) => {
        const { key: pressedKey } = event;
        if (pressedKey.length === 1 || pressedKey === 'Backspace') {
            setBindings((prev) => ({ ...prev, [key]: pressedKey }));
        }
    };

    const handleSave = () => {
        setCookie(cookieName, JSON.stringify(bindings), 365);
        console.log('Updated key bindings:', bindings);
        showKeyBinding.value = false;
    };

    return (
        <div className={`${styles.overlay} ${showKeyBinding.value ? styles.show : ''}`}>
            <div className={styles.modal}>
                <h2 className={styles.modalTitle}>Change Key Bindings</h2>
                <div className={styles.bindingsContainer}>
                    {Object.entries(bindings).map(([key, value]) => (
                        <div className={styles.binding} key={key}>
                            <label className={styles.label}>Key {key}:</label>
                            <input
                                className={styles.input}
                                type="text"
                                value={value}
                                onKeyDown={(e) => handleKeyDown(key, e)}
                                readOnly
                            />
                        </div>
                    ))}
                </div>
                <div className={styles.buttonContainer}>
                    <Button onClick={handleSave}>Save Changes</Button>
                    <Button onClick={() => (showKeyBinding.value = false)}>Cancel</Button>
                </div>
            </div>
        </div>
    );
}