import { useState, useEffect } from "preact/hooks";
import { loadThumbnailUrl } from "../../lib/thumbnail";
import { GameMetadata } from "../../lib/game-saving/gallery";
import Button from "../../components/design-system/button";
import Input from "../../components/design-system/input";
import { IoCaretDown, IoSearch } from "react-icons/io5";
import "./gallery.css";

enum SortOrder {
	TUTORIALS_AND_CHRONOLOGICAL,
	CHRONOLOGICAL,
	ASCENDING,
	DESCENDING
}
type GalleryGameMetadata = GameMetadata & { show: boolean };
type Filter = {
	query: string,
	tags: string[],
	sort: SortOrder
}

export default function Gallery({ games, tags }: { games: GameMetadata[], tags: string[] }) {
	const [gamesState, setGamesState] = useState<GalleryGameMetadata[]>([]);
	const [filter, setFilter] = useState<Filter>({ query: "", sort: SortOrder.TUTORIALS_AND_CHRONOLOGICAL, tags: [] })
	const [tagCount, setTagCount] = useState<{ [tags: string]: number }>({})

	useEffect(() => {
		const lowerCaseQuery = filter.query.toLowerCase();

		// label the newest games first
		const filteredGames = games.sort((a, b) => Date.parse(b.addedOn) - Date.parse(a.addedOn))
			.slice(0, 10)
			.map(game => ({ ...game, isNew: true }) as GameMetadata)
			.concat(games.slice(10));

		const _games = filteredGames.filter(
			game => game.lowerCaseTitle.includes(lowerCaseQuery) ||
				game.lowerCaseAuthor.includes(lowerCaseQuery)
		) // filter by query
			.filter(game => { // filter by tags
				for (const tag of filter.tags) {
					if (game.tags.indexOf(tag) === -1) return false;
				}
				return true;
			});
		setGamesState(sortGames(_games, filter.sort).map(game => ({ ...game, show: true })) as GalleryGameMetadata[]);

		// set filtering text
		const tagSelect = document.getElementById("tag-select") as HTMLSelectElement;
		if (filter.tags.length > 1) {
			tagSelect.selectedIndex = 2 // set filtering to multiple text
		} else {
			tagSelect.selectedIndex = filter.tags.length // set text accordingly
		}

		countTags(_games)
	}, [filter]);

	function sortGames(games: GameMetadata[], order: SortOrder): GameMetadata[] {

		switch (order) {
			case SortOrder.CHRONOLOGICAL: {
				games.sort((a, b) => Date.parse(b.addedOn) - Date.parse(a.addedOn));
				break;
			}
			case SortOrder.TUTORIALS_AND_CHRONOLOGICAL: {
				games = games.sort((a, b) => 
					isNaN(Date.parse(b.addedOn)) ? -1 : isNaN(Date.parse(a.addedOn)) ? 1 : Date.parse(b.addedOn) - Date.parse(a.addedOn)
				);

				// put tutorials first
				games.sort((a, _) => a.tags.includes("tutorial") ? -1 : 1);
				break;
			}
			case SortOrder.ASCENDING: {
				games.sort((a, b) => a.lowerCaseTitle > b.lowerCaseTitle ? 1 : -1);
				break;
			}
			case SortOrder.DESCENDING: {
				games.sort((a, b) => b.lowerCaseTitle > a.lowerCaseTitle ? 1 : -1);
				break;
			}
		}
		return games;
	}

	function countTags(games: GameMetadata[]) {
		const tags: { [tags: string]: number } = games.reduce<{ [tags: string]: number }>((acc, game) => {
			game.tags.forEach(tag => acc[tag] ? acc[tag]++ : acc[tag] = 1)
			return acc
		}, {})

		setTagCount(tags)
	}

	useEffect(() => {
		sortGames(gamesState, SortOrder.TUTORIALS_AND_CHRONOLOGICAL);

		interface GameCard {
			element: HTMLLIElement;
			filename: string;
			title: string;
			author: string;
			tags: string[];
			isNew: boolean;
		}
		for (const element of document.querySelectorAll("#games > .game")) {
			element.querySelector("img")?.setAttribute("data-loaded", "false");
		}

		const loadImage = async (gameCard: GameCard): Promise<void> => {
			const img = gameCard.element.querySelector(
				"img"
			) as HTMLImageElement;
			if (["loading", "true"].includes(img.dataset.loaded!)) return;
			img.dataset.loaded = "loading";
			const thumbnail = await loadThumbnailUrl(gameCard.filename);
			img.src = thumbnail;
			img.dataset.loaded = "true";
		};

		const gameCards: GameCard[] = [];
		for (const _element of document.querySelectorAll(
			"#games > .game"
		)) {
			const element = _element as HTMLLIElement;
			const gameCard = {
				element,
				filename: element.dataset.filename!,
				title: element.dataset.title!,
				author: element.dataset.author!,
				tags: element.dataset.tags!.split(","),
				isNew: element.dataset.isNew === "true",
			};

			gameCards.push(gameCard);
			new IntersectionObserver((_update) => {
				const update = (_update[0] ||
					_update) as IntersectionObserverEntry;
				if (update.isIntersecting) loadImage(gameCard);
			}).observe(element);
		}

		setTimeout(() => {
			for (const gameCard of gameCards) loadImage(gameCard);
		}, 500);
	}, [gamesState]);

	return (
		<div>
			<div class="info-split">
				<div class="search-container">
					<p>
						We currently have {games.length} games made by Hack Clubbers.
						Click on any to play in the browser and hack on the code
						in our editor!
					</p>

					<div class="search-controls">
						<div class="select">
							<select onChange={(event) => {
								const target = (event.target! as HTMLSelectElement).value;

								// do not filter if empty string or duplicate
								if (target != "" && !filter.tags.includes(target)) setFilter(_filter => ({ ..._filter, tags: [...filter.tags, target] }));
							}} id="tag-select">
								<option value="">Filter by tag(s)...</option>
								<option value="" hidden>Filtering by tag {filter.tags[0]}...</option>
								<option value="" hidden>Filtering by tags...</option>
								{
									tags.map((tag) =>
										<option value={tag}>#{tag} ({tagCount[tag] || 0})</option>
									)
								}
								<option value="_new">Recently added</option>
							</select>

							<IoCaretDown aria-hidden="true" />
						</div>

						<div class="select">
							<select
								value={SortOrder[filter.sort]}
								onChange={(event) => {
									console.log(" filter -> ", SortOrder[(event.target! as HTMLSelectElement).value! as keyof typeof SortOrder]);
									setFilter(_filter => ({ ..._filter, sort: SortOrder[(event.target! as HTMLSelectElement).value! as keyof typeof SortOrder] }));
								}}>
								<option value="">Sort by...</option>
								<option value="CHRONOLOGICAL">Release date</option>
								<option value="TUTORIALS_AND_CHRONOLOGICAL">Default</option>
								<option value="ASCENDING">A-Z</option>
								<option value="DESCENDING">Z-A</option>
							</select>

							<IoCaretDown aria-hidden="true" />
						</div>

						<div class="search">
							<IoSearch aria-hidden="true" />
							<Input
								value={filter.query}
								onChange={event => {
									setFilter(_filter => ({ ..._filter, query: event.target.value }));
								}}
								id="search-input"
								placeholder="Search gallery"
							/>
						</div>
					</div>
				</div>
				<div class="join-container">
					<p>
						Add your game to the gallery and get your very own Sprig
						console.
					</p>
					<a href="/get"><Button accent>Add your game</Button></a>
				</div>
			</div>

			<div class="filter-tags">
				{filter.tags.map(tag =>
					<span
						class="tag-span"
						onClick={() => {
							setFilter(filter => ({
								...filter,
								tags: filter.tags.filter(_tag => _tag != tag)
							}));
						}}
					>#{tag} <span class="tag-close">&#10006;</span></span>
				)}

				{filter.tags.length > 1 && <span class="tag-span tag-clear" onClick={() => {
					setFilter(filter => ({ ...filter, tags: [] }))
				}}>clear tags</span>}
			</div>

			<div id="games">
				{
					gamesState.map((game: GalleryGameMetadata) => (
						<div
							style={`display:${game.show ? "block" : "none"}`}
							class="game"
							href={`/gallery/${game.filename}`}
							onClick={() => window.open(`/gallery/${game.filename}`, '_blank')}
							data-filename={game.filename}
							data-title={game.title}
							data-author={game.author}
							data-tags={game.tags.join(",")}
							data-is-new={String(game.isNew)}
						>
							{game.tags.includes("tutorial") ? (
								<span class="badge tutorial">Tutorial</span>
							) : game.isNew ? (
								<span class="badge new">New</span>
							) : null}

							<img
								alt={`preview of ${game.filename}.js`}
							/>
							<h3>{game.title}</h3>
							<p class="author">by @{game.author}</p>
							<p class="tags" onClick={(e) => e.stopPropagation()}>

								{game.tags.map((tag) =>
									<span class="game-tag" onClick={() => setFilter(_filter => ({ ..._filter, tags: [...filter.tags, tag] }))}>#{tag} </span>
								)}
							</p>
						</div>
					))
				}
			</div>
		</div>
	)
}
