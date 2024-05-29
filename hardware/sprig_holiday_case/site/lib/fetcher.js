/**
 * useSWR() fetcher
 * @param  {...any} args fetcher for useSWR()
 */

export default async function Fetcher(...args) {
    const res = await fetch(...args);
    return res.json();
}