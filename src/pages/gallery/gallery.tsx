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
};
export default function Gallery({ games, tags }: { games: GameMetadata[], tags: string[] }) {
	const [gamesState, setGamesState] = useState<GalleryGameMetadata[]>([]);
	const [filter, setFilter] = useState<Filter>({query: "", sort: SortOrder.TUTORIALS_AND_CHRONOLOGICAL, tags: [] })

	useEffect(() => {
		const lowerCaseQuery = filter.query.toLowerCase();
		const _games = games.filter(
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

	}, [filter]);

	function sortGames(games: GameMetadata[], order: SortOrder): GameMetadata[] {

		// mark the newest games first
		let _games = games.sort((a, b) => Date.parse(b.addedOn) - Date.parse(a.addedOn))
			.slice(0, 10)
			.map(game => ({ ...game, isNew: true }) as GameMetadata)
			.concat(games.slice(10));

		switch (order) {
			case SortOrder.CHRONOLOGICAL: {
				 _games.sort((a, b) => Date.parse(b.addedOn) - Date.parse(a.addedOn));
				break;	
			}
			case SortOrder.TUTORIALS_AND_CHRONOLOGICAL: {
				_games =  _games.sort((a, b) => Date.parse(b.addedOn) - Date.parse(a.addedOn));

				// put tutorials first
				_games.sort((a, _) => a.tags.includes("tutorial") ? -1 : 1);
				break;
			}
			case SortOrder.ASCENDING: {
				_games.sort((a, b) => a.lowerCaseTitle > b.lowerCaseTitle ? 1 : -1);
				break;
			}
			case SortOrder.DESCENDING: {
				_games.sort((a, b) => b.lowerCaseTitle > a.lowerCaseTitle ? 1 : -1);
				break;
			}
		}
		return _games;
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
			img.src = await loadThumbnailUrl(gameCard.filename);
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
								setFilter(_filter => ({ ..._filter, tags: [ ...filter.tags, (event.target! as HTMLSelectElement).value] }))
							}} id="tag-select">
								<option value="">Filter by tag...</option>
								{
									tags.map((tag) => (
										<option value={tag}>#{tag}</option>
									))
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
					>{tag} x</span>
				)}
			</div>

			<div id="games">
				{
					gamesState.map((game: GalleryGameMetadata) => (						
						<a
							style={`display:${game.show ? "block" : "none"}`}
							class="game"
							href={`/gallery/${game.filename}`}
							target="_blank"
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
								src={`gallery/${game.img}`}
								alt={`preview of ${game.filename}.js`}
							/>
							<h3>{game.title}</h3>
							<p class="author">by @{game.author}</p>
							<p class="tags">
								{game.tags.map((tag) => `#${tag}`).join(", ")}
							</p>
						</a>
					))
				}
			</div>
		</div>
	)
}