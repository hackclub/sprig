// Written by @joshwcomeau

/**
 * Generates a random number between 2 bounds
 * @param {number} min Inclusive Minimum Number
 * @param {number} max Exclusive Maximum Number
 * @returns random number between min-1 and max
 */

export default async function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}