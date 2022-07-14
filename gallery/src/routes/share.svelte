<script>
	import { onMount } from 'svelte';

	onMount(() => {
		fetch('https://puzzlelab.hackclub.dev/?file=https://hackclub.github.io/puzzlelab/games/maze.js')
			.then((resp) => resp.text())
			.then((d) => {
				console.log('d:' + d);
			});
	});

	import VanillaTilt from 'vanilla-tilt';

	onMount(() => {
		VanillaTilt.init(document.querySelectorAll('.media'), {
			max: 15,
			scale: 1.05
		});
	});
</script>

<body>
	<a class="logo" href="https://hackclub.com"
		><img src="https://assets.hackclub.com/flag-orpheus-top.svg" alt="hack club logo" /></a
	>
	<a href="https://github.com/hackclub/puzzlelab" target="_blank"
		><img src="./github.svg" alt="github logo" class="github-logo" /></a
	>
	<div class="outer">
		<div class="heading-outer">
			<div class="heading-inner">
				<h1>Share your game</h1>
				<p>
					After you <a href="https://puzzlelab.hackclub.dev/" target="_blank" class="link"
						>create your own game</a
					>, we'd love for you to <a href="/" class="link">share it with other makers</a> on the internet!
				</p>
			</div>
		</div>
		<div class="inner">
			<div class="step">
				<div>
					<p class="step-number">Step 1:</p>
					<h2>Name your game</h2>
					<p>Add the following comment.</p>
				</div>
				<code class="media"
					>/*
					<br />
					@title: your_game <br />
					@author: your name
					<br />
					*/
				</code>
			</div>
			<div class="step">
				<div>
					<p class="step-number">Step 2:</p>
					<h2>Download your game file</h2>
					<p>Select export then js. Your download should begin immediately.</p>
				</div>
				<img
					class="media"
					src="https://cloud-hemofvnr5-hack-club-bot.vercel.app/0download.png"
					alt="screenshot of where to export game file"
				/>
			</div>
			<div class="step">
				<div>
					<p class="step-number">Step 3:</p>
					<h2>
						Fork the <a
							href="https://github.com/hackclub/puzzlelab/fork"
							target="_blank"
							class="link">PuzzleLab Repository</a
						>
					</h2>
					<ul>
						<li>Click on the link above</li>
						<li>Select "Create Fork"</li>
					</ul>
				</div>
				<img
					class="media"
					src="https://cloud-jps0pn7d1-hack-club-bot.vercel.app/0screenshot_2022-07-07_at_11.40.19_pm.png"
					alt="screenshot of where to fork repository"
				/>
			</div>
			<div class="step">
				<div>
					<p class="step-number">Step 4:</p>
					<h2>Upload your game to the your fork of the PuzzleLab Repository</h2>
					<ul>
						<li>Open the "Games" folder within your fork</li>
						<li>Click "Add File"</li>
						<li>Select "Upload File"</li>
						<li>Add a file name and click "Commit File"</li>
					</ul>
				</div>
				<img
					class="media"
					src="https://cloud-a7l5tmw39-hack-club-bot.vercel.app/0screenshot_2022-07-07_at_11.51.32_pm.png"
					alt="screenshot of where to upload game file option is"
				/>
			</div>
			<div class="step">
				<div>
					<p class="step-number">Step 5:</p>
					<h2>Add your gallery image</h2>
					<ul>
						<li>Take a screenshot of your game</li>
						<li>Click back to the gallery folder</li>
						<li>Open the img folder in gallery</li>
						<li>Click "Add File"</li>
						<li>Select "Upload File"</li>
						<li>Name your image file the file name for your game</li>
						<li>Click "Commit File"</li>
					</ul>
				</div>
				<img
					class="media"
					src="https://cloud-af1r71tvz-hack-club-bot.vercel.app/0screenshot_2022-07-07_at_11.52.55_pm.png"
					alt="screenshot of gallery image upload"
				/>
			</div>
			<div class="step">
				<div>
					<p class="step-number">Step 6:</p>
					<h2>Create Pull Request</h2>
					<ul>
						<li>Click on contribute</li>
						<li>Select "Open Pull Request"</li>
						<li>Click "Create Pull Request"</li>
						<li>Name your pull request with the name of your game</li>
						<li>Click "Create Pull Request"</li>
					</ul>
					<p>Once we approve it! Your game will appear in the gallery :)</p>
				</div>
				<img
					class="media"
					src="https://cloud-af1r71tvz-hack-club-bot.vercel.app/0screenshot_2022-07-07_at_11.52.55_pm.png"
					alt="screenshot of pull request page"
				/>
			</div>
			<a href="/" class="button big-button">Check out the gallery</a>
		</div>
	</div>
</body>

<style>
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
		min-height: 100vh;
		width: 100vw;
		background-color: #014a27;
		height: fit-content;
		padding: 40px 0;
		color: white;
		padding: 0;
		margin: 0;
	}

	code {
		display: block;
		background-color: var(--pcb-darker);
		padding: 20px 30px;
		border-radius: 5px;
		width: 65%;
		margin: auto;
	}

	img {
		width: 100%;
		margin: auto;
		height: auto;
	}

	li {
		line-height: 1.5em;
	}

	h2 {
		margin: 0 0 20px 0;
	}

	.link {
		color: white;
		background-color: var(--pcb-darker);
		padding: 2px 4px;
		border-radius: 2px;
		text-decoration: none;
		white-space: nowrap;
	}

	.inner {
		width: 85vw;
		margin: auto;
		padding-bottom: 5vh;
	}

	.heading-outer {
		padding: 10vh 0;
		width: 100vw;
		margin: 0;
		margin-bottom: 5vh;
		background: var(--pcb-base);
		background-image: url(https://puzzlelab.hackclub.dev/assets/bg.12a2b49c.svg);
	}

	.heading-inner {
		width: 85%;
		margin: auto;
	}

	.step {
		display: grid;
		grid-template-columns: 1fr;
		padding-bottom: 7vh;
	}

	.step-number {
		margin: 0;
	}

	.big-button {
		position: relative;
		font-size: 16px;
		padding: 5px 10px;
		font-size: 0.8em;
		font-weight: 700;
		border-radius: 3px;
		background-color: transparent;
		color: white;
		border: white 2px dotted;
		text-decoration: none;
	}

	.big-button:hover {
		background-color: white;
		color: var(--pcb-base);
		border: white 2px solid;
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

	.logo {
		/* background-image: url(https://assets.hackclub.com/flag-orpheus-top.svg); */
		/* background-repeat: no-repeat; */
		/* background-position: top left; */
		position: absolute;
		top: 0;
		left: 30px;
		background-size: contain;
		cursor: pointer;
		flex-shrink: 0;
		z-index: 333;
		transition: cubic-bezier(0.375, 0, 0.675, 1) transform;
		/* transition: ${3 / 16}s cubic-bezier(0.375, 0, 0.675, 1) transform; */
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

	@media (min-width: 760px) {
		h1 {
			font-size: 42px;
		}

		.step {
			grid-template-columns: 0.8fr 1.2fr;
		}

		@media (min-width: 920px) {
			h1 {
				font-size: 54px;
			}
		}

		img {
			width: 80%;
		}

		.big-button {
			position: relative;
			font-size: 20px;
		}
	}
</style>
