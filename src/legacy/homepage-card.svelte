<script>
	import { onMount } from 'svelte';
	export let title = undefined;
	export let filename = undefined;
	export let tags = undefined;
	export let author = undefined;
	export let id = undefined;
	export let imgURL = undefined;
	export let isNew = false;

	const load = async () => {
		if (imgURL) return;
		imgURL = loadImageUrl(title);
	};

	let box;
	onMount(() => {
		new IntersectionObserver((update) => {
			update = update[0] || update;
			if (!update.isIntersecting) return;
			load();
		}).observe(box);
		setTimeout(load, 500);
	});
</script>

<div class="gallery-item" bind:this={box} {id}>
	<a
		href={id
			? 'https://sprig.hackclub.com'
			: `/gallery/${encodeURIComponent(filename)}`}
		target="_blank"
		rel="noopener noreferrer"
	>
		<div class="image-box">
			{#if !id}
				{#if tags.includes('tutorial')}
					<span class="tag">Tutorial</span>
				{:else if isNew}
					<span class="tag new">New</span>
				{/if}

				{#if imgURL}
					<img src={imgURL} class="gallery-image" alt="game preview" />
				{/if}
			{/if}

			{#if id}
				<div class="gallery-image">
					<span>Start<br />From<br />Scratch</span>
				</div>
			{/if}
		</div>
		<div class="text">
			<h3>
				{title}<br />
				<span>by {author}</span><br />
				<span>{tags?.map((tag) => `#${tag}`)?.join(', ') || '--'}</span>
			</h3>
		</div>
	</a>
</div>

<style lang="scss">
	@import './_variables.scss';
	@import './_fonts.scss';

	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	a {
		text-decoration: none;
	}

	.gallery-item {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 14rem;
		background: $gallery-background;
		border-style: solid;
		border-width: 4px;
		box-sizing: border-box;
		border-image-repeat: stretch;
		border-image-slice: 3;
		border-image-width: 3;
		border-image-source: url('data:image/svg+xml;utf8,<?xml version="1.0" encoding="UTF-8" ?><svg version="1.1" width="8" height="8" xmlns="http://www.w3.org/2000/svg"><path d="M3 1 h1 v1 h-1 z M4 1 h1 v1 h-1 z M2 2 h1 v1 h-1 z M5 2 h1 v1 h-1 z M1 3 h1 v1 h-1 z M6 3 h1 v1 h-1 z M1 4 h1 v1 h-1 z M6 4 h1 v1 h-1 z M2 5 h1 v1 h-1 z M5 5 h1 v1 h-1 z M3 6 h1 v1 h-1 z M4 6 h1 v1 h-1 z" fill="' + $gallery-border-dark + '" /></svg>');
		border-image-outset: 2;

		// backdrop-filter: blur(0.2rem);
		box-shadow: 0 8px 8px rgba(0, 0, 0, 0.2);

		&:hover {
			transform: scale(1.05);
			background: $gallery-background-hover;
		}

		a {
			border-style: solid;
			border-width: 4px;
			padding: 0.6rem 0.6rem 0 0.6rem;
			border-image-repeat: stretch;
			border-image-slice: 3;
			border-image-width: 3;
			border-image-source: url('data:image/svg+xml;utf8,<?xml version="1.0" encoding="UTF-8" ?><svg version="1.1" width="8" height="8" xmlns="http://www.w3.org/2000/svg"><path d="M3 1 h1 v1 h-1 z M4 1 h1 v1 h-1 z M2 2 h1 v1 h-1 z M5 2 h1 v1 h-1 z M1 3 h1 v1 h-1 z M6 3 h1 v1 h-1 z M1 4 h1 v1 h-1 z M6 4 h1 v1 h-1 z M2 5 h1 v1 h-1 z M5 5 h1 v1 h-1 z M3 6 h1 v1 h-1 z M4 6 h1 v1 h-1 z" fill="' + $gallery-border-light + '" /></svg>');
			border-image-outset: 2;
		}

		.text {
			font-family: $pixel-text-font;
			display: flex;
			flex: 60% 40%;
			flex-wrap: wrap;
			h3 {
				text-transform: lowercase;
				white-space: nowrap;
				text-overflow: ellipsis;
				width: 100%;
				overflow: hidden;
				color: white;
				margin: 0.8rem 0 0.8rem 0;
				font-size: 1.4rem;
				font-weight: 400;
				span {
					font-weight: 300;
					font-size: 1.1rem;
					color: rgb(151, 166, 187);
					padding: 0;
				}
			}
		}

		.image-box {
			width: 100%;
			padding-bottom: calc(100% - 8px);
			border: 4px solid $gallery-border-dark;
			margin: 0;
			position: relative;
			box-shadow: 0 4px 0px rgba(0, 0, 0, 0.1);

			&::after,
			&::before {
				content: '';
				position: absolute;
				top: 0;
				height: 100%;
				width: 8px;
				background-image: linear-gradient($gallery-border-light 5px, $gallery-border-light 5px),
					linear-gradient($gallery-border-light 5px, $gallery-border-light 5px);
				background-size: 8px 8px;
				background-position: top center, bottom center;
				background-repeat: no-repeat;
				z-index: 2;
			}

			&::before {
				left: 0;
			}

			&::after {
				right: 0;
			}
		}

		&#start-from-scratch {
			background: $gallery-highlight-background;
			border-image-source: url('data:image/svg+xml;utf8,<?xml version="1.0" encoding="UTF-8" ?><svg version="1.1" width="8" height="8" xmlns="http://www.w3.org/2000/svg"><path d="M3 1 h1 v1 h-1 z M4 1 h1 v1 h-1 z M2 2 h1 v1 h-1 z M5 2 h1 v1 h-1 z M1 3 h1 v1 h-1 z M6 3 h1 v1 h-1 z M1 4 h1 v1 h-1 z M6 4 h1 v1 h-1 z M2 5 h1 v1 h-1 z M5 5 h1 v1 h-1 z M3 6 h1 v1 h-1 z M4 6 h1 v1 h-1 z" fill="' + $gallery-highlight-border-dark + '" /></svg>');

			a {
				border-image-source: url('data:image/svg+xml;utf8,<?xml version="1.0" encoding="UTF-8" ?><svg version="1.1" width="8" height="8" xmlns="http://www.w3.org/2000/svg"><path d="M3 1 h1 v1 h-1 z M4 1 h1 v1 h-1 z M2 2 h1 v1 h-1 z M5 2 h1 v1 h-1 z M1 3 h1 v1 h-1 z M6 3 h1 v1 h-1 z M1 4 h1 v1 h-1 z M6 4 h1 v1 h-1 z M2 5 h1 v1 h-1 z M5 5 h1 v1 h-1 z M3 6 h1 v1 h-1 z M4 6 h1 v1 h-1 z" fill="' + $gallery-highlight-border-light + '" /></svg>');
			}
			.text {
				visibility: hidden;
			}

			&:hover {
				background: $gallery-highlight-background-hover;
			}

			.image-box {
				border: 4px solid $gallery-highlight-border-light;

				&::after,
				&::before {
					background-image: linear-gradient($gallery-highlight-border-xlight 5px, $gallery-highlight-border-xlight 5px),
						linear-gradient($gallery-highlight-border-xlight 5px, $gallery-highlight-border-xlight 5px);
				}
			}
		}
	}
	.gallery-image {
		position: absolute; /* Take your picture out of the flow */
		top: 0;
		bottom: 0;
		left: 0;
		object-fit: contain;
		object-position: center;
		image-rendering: pixelated;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		background: white;

		span {
			font-family: $pixel-text-font;
			color: black;
			font-size: 1.6rem;
			text-transform: lowercase;
			display: block;
			padding: 0.4rem;
		}
	}

	.tag {
		font-family: $pixel-text-font;
		font-weight: 300;
		text-transform: lowercase;
		position: absolute;
		top: 0.8rem;
		right: 0.8rem;
		z-index: 3;
		padding: 0 0.4rem;
		font-size: 1.2rem;
		text-align: center;
		color: $tag-color;
		background: $tag-background;
		box-shadow: 0 0.3em $tag-background, 0 -0.3em $tag-background, 0.3em 0 $tag-background, -0.3em 0 $tag-background,
			0 0.5em 0 rgba(0, 0, 0, 0.2);
	}

	.tag.new {
		background: $new-tag-background;
		box-shadow: 0 0.3em $new-tag-background, 0 -0.3em $new-tag-background, 0.3em 0 $new-tag-background,
			-0.3em 0 $new-tag-background, 0 0.5em 0 rgba(0, 0, 0, 0.2);
	}

	@media (max-width: 1050px) {
		.gallery {
			&-item {
				width: 12rem;
			}
		}
	}

	@media (resolution: 1.5dppx) {
		.gallery-item {
			width: 14rem;
		}

		h3 {
			font-size: 1.2rem;
		}

		.text span {
			font-size: 0.8rem;
		}
	}

	@media (max-width: 500px) {
		.gallery-item {
			width: 100%;

			.image-box {
				width: 70%;
				padding-bottom: 70%;
				margin: 0 auto;
			}

			&#start-from-scratch {
				a {
					padding: 0.6rem;
				}

				.text {
					display: none;
				}
			}
		}
	}
</style>
