<script>
	import { onMount } from 'svelte';
	import VanillaTilt from 'vanilla-tilt';
	import * as gridEngine from "../../../engine/engine.js"
	import { palette } from "../../../palette.js"

	onMount(() => {
		VanillaTilt.init(document.querySelectorAll('.gallery-item'), {
			max: 15,
			scale: 1.05
		});
	});

	import { apiData, Data, imgData, Img } from '../data';

	async function drawGames(games) {
		const imgs = [];

		for (const game of games) {
			if (game.name.split('.').pop() != 'js') continue;
			const src = await fetch(game.download_url).then(x => x.text());

			let screen, bitmaps;
			const setScreenSize = (w, h) => screen = new ImageData(w, h);
			const { api, state } = gridEngine.init({
				palette,
				setBitmaps: bm => bitmaps = bm,
				setScreenSize,
			});
			api.setScreenSize = setScreenSize;
			api.afterInput = () => {};
			api.onInput = () => {};

			try {
				new Function(...Object.keys(api), src)(...Object.values(api));

				if (!screen) throw new Error("never set screen size");
				if (!bitmaps) throw new Error("never set legend");
			} catch(e) {
				console.error(`couldn't run ${game.name}: ${e}`);
				continue;
			}

			screen.data.fill(255);
			drawTiles(state, api, screen, bitmaps);
			const canvas = document.createElement("canvas");
			canvas.width = canvas.height = Math.max(screen.width, screen.height);
			canvas.imageSmoothingEnabled = false;
			canvas.getContext("2d").putImageData(screen, 0, 0);
			console.log(canvas);
			imgs.push({ name: game.name, download_url: canvas.toDataURL() });
		}

		console.log(imgs);
		imgData.set(imgs);

		function blitSprite(screen, sprite, tx, ty) {
			const [_, { imageData: { data: bitmap } }] = sprite;
			for (let x = 0; x < 16; x++)
				for (let y = 0; y < 16; y++) {
					const sx = tx*16 + x;
					const sy = ty*16 + y;

					if (bitmap[(y*16 + x)*4 + 3] < 255) continue;

					screen.data[(sy*screen.width + sx)*4 + 0] = bitmap[(y*16 + x)*4 + 0];
					screen.data[(sy*screen.width + sx)*4 + 1] = bitmap[(y*16 + x)*4 + 1];
					screen.data[(sy*screen.width + sx)*4 + 2] = bitmap[(y*16 + x)*4 + 2];
					screen.data[(sy*screen.width + sx)*4 + 3] = bitmap[(y*16 + x)*4 + 3];
				}
		}

		function drawTiles(state, api, screen, bitmaps) {
			const { dimensions, legend } = state;
			const { width, height, maxTileDim } = dimensions;

			const grid = api.getGrid();

			for (const cell of grid) {
				const zOrder = legend.map(x => x[0]);
				cell.sort((a, b) => zOrder.indexOf(a.type) - zOrder.indexOf(b.type));

				for (const { x, y, type } of cell) {
					blitSprite(screen, bitmaps.find(x => x[0] == type), x, y);
				}
			}
		}
	}

	onMount(async () => {
		fetch('https://api.github.com/repos/hackclub/puzzlelab/contents/games?recursive=1')
			.then((res) => res.json())
			.then((data) => {
				apiData.set(data);
				drawGames(data);
			})
			.catch((error) => {
				console.log(error);
				return [];
			});

		// var iframe = document.getElementsByTagName('iframe');
		// for (let i = 0; i < iframe.length; i++) {
		// 	var elmnt = iframe.contentWindow.document.getElementsByClassName('run')[0];
		// }
		// console.log('element:' + elmnt);
	});
</script>

<body>
	<div class="info-outer">
		<div class="info-inner">
			<div class="title">
				<h1>PuzzleLab Gallery</h1>
				<p>
					The best way to learn is by making things you care about and sharing them with others.
					Check out games by other Hack Clubbers!
				</p>
			</div>
			<div>
				<a href="https://puzzle.hackclub.com" class="button big-button">Create Your Own</a>
				<a href="/share" class="button big-button">Share your game</a>
			</div>
		</div>
	</div>
	<a class="logo" href="https://hackclub.com"
		><img src="https://assets.hackclub.com/flag-orpheus-top.svg" alt="hack club logo" /></a
	>
	<a href="https://github.com/hackclub/puzzlelab" target="_blank"
		><img src="./github.svg" alt="github logo" class="github-logo" /></a
	>
	<div class="gallery-outer">
		<div class="gallery-inner">
			{#each $Data as data}
				{#if data.name == '.DS_Store'}
					<h1 style="display: none;">hi</h1>
					<!--hacky temp solution-->
				{:else if data.name == 'img'}
					<h1 style="display: none;">hi</h1>
					<!--hacky temp solution-->
				{:else}
					<div class="gallery-item">
						<a href={`https://puzzlelab.hackclub.dev/?file=https://hackclub.github.io/puzzlelab/games/${data.name}`}>
							{#each $Img as img}
								{#if img.name == data.name}
									<div class="image-box">
										<img src={img.download_url} class="image" alt="game preview" />
									</div>
								{/if}
							{/each}
							<div class="text">
								<h3>
									{data.name
										.replace('.js', '')
										.replace('_', ' ')
										.replace('-', ' ')
										.replace('.', '')}
								</h3>
								<a
									href={`https://puzzlelab.hackclub.dev/?file=${data.html_url}`}
									target="_blank"
									class="button">Play &#9658;</a
								>
							</div>
						</a>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</body>

<style>
	@import url('https://fonts.googleapis.com/css2?family=B612+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');

	:root {
		--pcb-lighter: #04a356;
		--pcb-base: #016e3d;
		--pcb-trace: #014a27;
		--pcb-darker: #03321b;
	}

	body {
		font-family: 'B612 Mono', monospace;
		font-weight: 400;
		color: white;
		margin: auto;
	}

	h1::selection,
	h3::selection,
	p::selection,
	a::selection {
		color: var(--pcb-trace);
		background-color: white;
	}

	h1 {
		font-size: 24px;
		margin: 0;
	}

	h3 {
		margin: 0;
		text-transform: capitalize;
		color: white;
		margin-top: 10px;
		font-size: 15px;
		transform: translateZ(20px);
	}

	a {
		text-decoration: none;
	}

	p {
		font-size: 13px;
	}

	.info-outer {
		background-color: var(--pcb-base);
		background-image: url(https://puzzlelab.hackclub.dev/assets/bg.12a2b49c.svg);
		padding: 10vh 0;
		width: 100vw;
	}

	.info-inner {
		width: 85%;
		margin: auto;
	}

	.title {
		margin-bottom: 50px;
	}
	.gallery-outer {
		width: 100vw;
		background-color: #014a27;
		height: fit-content;
		min-height: 100vh;
		padding: 40px 0;
	}
	.gallery-inner {
		width: 85vw;
		margin: auto;
		display: grid;
		column-gap: 30px;
		row-gap: 30px;
	}

	.gallery-item {
		background-color: var(--pcb-base);
		padding: 15px 13px;
		border-radius: 5px;
		border-bottom: var(--pcb-darker) 10px solid;
		transition-duration: 0.5s;
		transform-style: preserve-3d;
		transform: perspective(1000px);
	}

	.gallery-item:hover {
		transform: scale(1.08) rotate(-1.5deg);
		cursor: pointer;
	}

	.button {
		background-color: var(--pcb-trace);
		padding: 5px 10px;
		font-size: 0.8em;
		color: var(--pcb-lighter);
		text-decoration: none;
		font-weight: 700;
		border-radius: 3px;
		margin-left: auto;
		transition-duration: 0.5s;
		margin-top: 10px;
		transform: translateZ(20px);
	}

	.button:hover {
		transform: scale(1.12) rotate(3deg);
	}

	.big-button {
		position: relative;
		font-size: 16px;
		background-color: transparent;
		color: white;
		border: white 2px dotted;
	}

	.big-button:hover {
		background-color: white;
		color: var(--pcb-base);
		border: white 2px solid;
	}

	.text {
		padding: 10px 0;
		display: flex;
		flex: 60% 40%;
		flex-wrap: wrap;
	}

	.github-logo {
		color: white;
		position: absolute;
		right: 30px;
		top: 30px;
		fill: white;
		width: 24px;
		transition-duration: 0.5s;
	}

	.github-logo:hover {
		transform: rotate(9deg);
	}

	.image-box {
		width: 100%;
		height: 250px;
		overflow: hidden;
		transform: translateZ(20px);
	}

	.image {
		width: 100%;
		height: 100%;
		border-radius: 3px;
		object-fit: cover;
		transform: translateZ(20px);
	}

	.logo {
		position: absolute;
		top: 0;
		left: 30px;
		background-size: contain;
		cursor: pointer;
		flex-shrink: 0;
		z-index: 333;
		transition: cubic-bezier(0.375, 0, 0.675, 1) transform;
		transform-origin: top left;
	}

	.logo img {
		width: 112px;
		height: auto;
	}

	.logo:hover,
	.logo:focus {
		animation: waveFlag 0.5s linear infinite alternate;
	}

	@keyframes waveFlag {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(-5deg);
		}
	}

	@media (min-width: 320px) {
		.gallery-inner {
			grid-template-columns: 1fr;
		}

		.github-logo {
			width: 24px;
		}
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 26px;
		}

		h3 {
			font-size: 18px;
		}

		p {
			font-size: 14px;
		}

		.gallery-inner {
			grid-template-columns: 1fr 1fr;
		}

		.github-logo {
			width: 36px;
		}

		.big-button {
			position: relative;
			font-size: 20px;
		}

		.image-box {
			height: 200px;
		}
	}

	@media (min-width: 760px) {
		h1 {
			font-size: 42px;
		}

		h3 {
			font-size: 20px;
		}

		.gallery-inner {
			grid-template-columns: 1fr 1fr 1fr;
		}

		.github-logo {
			width: 38px;
		}

		.big-button {
			position: relative;
			font-size: 20px;
		}

		.image-box {
			height: 200px;
		}
	}

	@media (min-width: 920px) {
		h1 {
			font-size: 54px;
		}

		p {
			font-size: 18px;
		}

		.gallery-item {
			padding: 30px 25px;
		}

		.logo img {
			width: 128px;
			height: auto;
		}
	}
</style>
