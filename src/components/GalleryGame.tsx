import { useEffect, useState, useRef } from "preact/hooks";
import { loadThumbnailUrl } from "../lib/thumbnail";

type GalleryGameProps = {
	filename: string
	title: string
	author: string
	tags: string[]
	isNew: boolean
	show: boolean
	filter: any,
	setFilter: Function
}

export default function GalleryGame({ setFilter, filter, show, filename, title, author, tags, isNew }: GalleryGameProps) {
	const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
	const gameRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(entries => {
			entries.forEach(async entry => {
				if (entry.isIntersecting) {
					const thumbnail = await loadThumbnailUrl(filename)
					setThumbnailUrl(thumbnail);
				}
			})
		}, { threshold: 0.1 });

		observer.observe(gameRef.current!);
		return () => {
			observer.unobserve(gameRef.current!);
		}
	}, []);

	if (!show) return null;
	return (
		<div
			ref={gameRef}
			className="game"
			onClick={() => window.open(`/gallery/${filename}`, '_blank')}
		>
			{tags.includes("tutorial") ? (
				<span class="badge tutorial">Tutorial</span>
			) : isNew ? (
				<span class="badge new">New</span>
			) : null}

			{thumbnailUrl && <img src={thumbnailUrl} alt="thumbnail" data-loaded='true' /> }

			<h3>{title}</h3>
			<p class="author">by @{author}</p>
			<p class="tags" onClick={(e) => e.stopPropagation()}>

				{tags.map((tag) =>
					<span class="game-tag" onClick={() => setFilter((_filter: any) => ({ ..._filter, tags: [...filter.tags, tag] }))}>#{tag} </span>
				)}
			</p>
		</div>
	)
}