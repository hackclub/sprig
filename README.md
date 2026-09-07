# 🍃 Hack Club Sprig 🍃

**[💻 Online Editor: Make a game](https://sprig.hackclub.com/editor)** | **[👀 Gallery: Find games](https://sprig.hackclub.com/gallery)** | **[🕸 Landing Page](https://sprig.hackclub.com)** | **[🎮 Firmware](https://github.com/hackclub/sprig/tree/main/firmware/spade)** | **[👾 Engine](https://github.com/hackclub/sprig-engine)**

[Sprig](https://sprig.hackclub.com) is a game console where **every user is a creator**. It can only be obtained by building a tile-based game in the [web-based game editor](https://sprig.hackclub.com/editor) and shipping it in the [community gallery](https://sprig.hackclub.com/gallery). It's made by [Hack Club](https://hackclub.com).

<p align="left">
<a>
<img width="500" alt="Screen Shot 2022-08-22 at 4 02 04 PM" src="https://user-images.githubusercontent.com/27078897/186769641-5b1181b4-9969-4276-9fa0-9f15140e4a9b.jpg">
</a>
</p>

You should be able to get started in Sprig with very little programming experience. Even if you're an expert, you should still be able to have fun. Sprig games are designed to be shared and hacked on with friends. Every game submitted is easily viewable and editable in our gallery allowing people to learn from and build off each other. 

## Sprig is a...

...**custom handheld game console** built by Hack Club. we are giving a Sprig to every teenage hacker that successfully shares a game they create in our [community gallery](https://sprig.hackclub.com/gallery).

<p align="left">
<a>
<img width="500" alt="Screen Shot 2022-08-22 at 4 02 04 PM" src="https://sprig.hackclub.com/stories-tiny/sprig-back.jpeg">
</a>
</p>

...**[web-based game editor](https://sprig.hackclub.com/editor)** that transforms learning to code from studying language syntax to making small creative projects. The Sprig game engine exposes a small construction kit for making tile-based games. This construction kit helps you focus on being creative instead of learning big APIs. The games are just JavaScript and we built a custom system to run that same JavaScript on the microcontroller!

<p align="left">
<a href="https://sprig.hackclub.com/editor">
<img width="500" alt="Screen Shot 2022-03-07 at 6 21 27 PM" src="https://cdn.hackclub.com/rescue?url=https://cloud-l94lfbasw-hack-club-bot.vercel.app/0image.png">
</a>
</p>

...**[hardware development kit](https://github.com/hackclub/sprig/blob/main/docs/ASSEMBLY.md)**. It's not just for gaming! The Sprig console is designed to be assembled and disassembled. Each kit includes parts needed for getting started with hardware engineering and embedded systems programming. This includes a Raspberry Pi Pico, a TFT7735 screen, a MAX98357A I2S class D audio amplifier, a whole bunch of buttons, LEDs, a speaker, and a carrier board which wires all these components together while exposing the remaining pins on the microcontroller. It's a complete system for generating graphics, sound, and handling tactile inputs which is reprogrammable at the touch of a button.

<p align="left">
<a href="https://sprig.hackclub.com">
<img width="500" alt="Screen Shot 2022-08-22 at 4 04 08 PM" src="https://user-images.githubusercontent.com/27078897/186015708-860df540-6c41-4400-aed5-d0fe8c9d31aa.jpg">
</a>
</p>

## Fully open source

**Sprig is open source**. Shipping a game to the Sprig Gallery is contributing to an open-source project. Everything about Sprig is transparent and editable. That includes the [hardware designs](https://github.com/hackclub/sprig/tree/main/hardware), the [game engine](https://github.com/hackclub/sprig/tree/main/engine), the [embedded game engine for the RP2040 chip](https://github.com/hackclub/sprig/tree/main/firmware/spade), and the editor and website itself in this repo!

We did some fun engineering to get Sprig to work and to make your games run the same on your desktop computer and a $4 microcontroller. That involved custom JS runtimes with optimizations in C and even PIO assembly. We also documented some [behind-the-scenes](https://github.com/hackclub/sprig/tree/main/docs).

## You Ship, We Ship

Make a game
&rarr; Share it with the community
&rarr; Receive your device
&rarr; Play Sprig games on it
&rarr; Hack on the device for more projects

***Only teenagers and younger can receive Sprigs!*** All are welcome to submit to the [gallery](https://sprig.hackclub.com/gallery) though.

## Philosophy

People learn best when they make things that they care about, which they can then share with others. This type of learning philosophy is called constructionism, and Sprig is a type of microworld. A microworld is an environment where you can discover programming by using it to express yourself. 

## Tutorials

To get started you can follow [this challenge in the editor](https://sprig.hackclub.com/gallery/getting_started), check out some [Sprig workshops](https://workshops.hackclub.com#sprig) or [Sprig jams](https://jams.hackclub.com/batch/sprig).

## Development

Join the `#sprig` channel on the [Hack Club Slack](https://hackclub.com/slack/) where you can join the development discussion and ask for help. We also have other channels for Sprig specific stuff:

- `#sprig-platform`: For discussion of development of the Sprig platform as a whole. 
- `#sprig-gaming-controller`: Building a case for the Sprig console to make it a portable gaming controller.
- `#sprig-emulator`: Development of a Gameboy emulator for Sprig.
- `#sprig-multiplayer`: Development of multiplayer support.
- `#sprig-lora`: Development of Sprig-Lora communicator.
- `#sdsprig`: Development of Sprig loading from an SD Card.
- `#sprig-minecraft`: Development of Minecraft for Sprig.
- `#sprig-ios-app`: Development of iOS app.
- `#sprig-engagement`: Development of a bot to post every new game to `#sprig`.
- `#vs-sprig`: Development of Sprig extension for VS Code.
- `#stationary-sprig`: Making Sprig a home console.
- `#spriggy-doom`: Development of a clone of Doom.
- `#sprigos-development`: Development of the sprigOS, the sprig game that acts like an operating system.
- `#spade`: For discussions of Spade firmware/OS of the Sprig.
- `#spaint`: Make art with your sprig with sPaint and share.

Learn more about how to make games with Sprig check out the [docs](https://github.com/hackclub/sprig/tree/main/docs).

### Tech Stack

Sprig's editor and site pages are built with [Astro](https://astro.build/) (SSR via `@astrojs/node`) using [Preact](https://preactjs.com/) for rendering. Perhaps somewhat unusually, we predominantly use [Preact Signals](https://preactjs.com/guide/v10/signals/) for state management. The code editor uses [CodeMirror](https://codemirror.net/). There is one legacy [Svelte](https://svelte.dev/) component on the homepage. The database is [Firebase](https://firebase.google.com/). Everything pushed to GitHub and all pull requests are automatically deployed on [Vercel](https://vercel.com/hackclub).

### Repo Structure

```tree
sprig/
├── src/                        # Astro website + editor
│   ├── pages/                  # Pages (.astro) and API routes (.ts), all SSR
│   ├── components/             # Preact (TSX) UI components + CSS modules
│   ├── lib/                    # Shared support code (server + client)
│   ├── legacy/                 # Old Svelte code kept for the homepage
│   ├── layouts/                # Astro layout templates
│   ├── integrations/           # Custom Astro integrations
│   ├── translations/           # i18n strings
│   ├── global.css              # Global styles
│   └── middleware.ts           # Astro middleware
│
├── engine/                     # Sprig game engine (separate package)
├── games/                      # Community-submitted game files (.js)
├── public/                     # Static assets (game metadata, images, fonts)
├── firmware/                   # RP2040 embedded firmware (Spade runtime + HAL)
├── hardware/                   # PCB designs + 3D-printable console cases
├── docs/                       # Documentation (assembly, getting started, runbooks)
├── scripts/                    # Python admin tools (plagiarism check, review, etc.)
├── bin/                        # lint-sprig game linter
├── tests/                      # Fuzzy tests for the engine
├── yjs-client/                 # Yjs WebRTC client for collaborative editing
├── yjs-signaling-server/       # Yjs signaling server (separate deploy)
├── font-things/                # Font manipulation script
└── sprig-hax/                  # Community hardware mods (gyro, etc.)
```

Key source directories explained:

- `src/pages/` contains all the site's main pages and API routes. In general, `.ts` files are API routes and `.astro` files are pages. All pages are server-side rendered on demand and can make database calls and such.
- `src/components/` contains all the components used in the editor and site pages. Most components will have accompanying `.module.css` files which contain vanilla CSS stylesheets which are scoped to the component. These "CSS modules" can be imported as a JS object containing referencable class names.
- `src/lib/` contains all the support code. Currently this is a mix of server and client code.
- `src/legacy/` has a bunch of old code from the v1 version of the editor which is kept for ease of porting the home and Get a Sprig pages. Since Astro lets us combine multiple frameworks, we're also using old Svelte code in some places.
- `docs/` contains documentation on how to use Sprig, including `docs.md` which contains the help file embedded in the editor.
- `public/` contains static assets which are directly served.
- `src/global.css` and `src/components/standard-head.astro` contain code that's generally shared across all pages.

### Prerequisites

Things you'll want installed:

- [Git](https://git-scm.com/)
- [Bun](https://bun.sh/)

We use Firebase as a database. To develop login/saving related features locally, you'll likely want to [create a Firebase project](https://console.firebase.google.com/) for yourself. Then, create a service account, download the JSON file, and convert the contents to base64 ([link to a tool to easily do this](https://gchq.github.io/CyberChef/#recipe=JSON_Minify()To_Base64('A-Za-z0-9%2B/%3D'))).

We recommend [Visual Studio Code](https://code.visualstudio.com/) as a code editor. You should be automatically prompted to install some recommended extensions when you open the project.

### Project Setup

In a terminal, clone the repo and install packages:

```bash
git clone https://github.com/hackclub/sprig/
cd sprig
bun install
```

Next, you'll want to give Sprig access to the Firebase credentials, as well as some extra credentials that you can request from the @creds team on Slack. Complete the `.env.example` file with those credentials and rename it to `.env`.

To start the dev server, run `bun dev` and visit <http://localhost:4321> in your web browser! Please create a GitHub issue if you cannot get something to work properly.

### Running Tests

```bash
bun test          # fuzzy engine tests
bun run test:unit # vitest unit tests
```

### Docker

```bash
docker compose up
```

This starts the Astro site (port 9996), yjs-client, and yjs-signaling-server.

### Engine Development

All *engine code* (responsible for running games, playing tunes, etc.) is in a different repo: <https://github.com/hackclub/sprig-engine/>.

If you want to work on the engine and test out your changes in the context of this repo, you'll want to use a feature called linking.

First set up the engine repo:

```bash
git clone https://github.com/hackclub/sprig-engine/
cd sprig-engine
bun install
bun link
```

Then, in this website's repo:

```bash
bun link sprig
```

Now, run `bun dev` in the engine repo to start the TypeScript build process.

## Acknowledgements

The Sprig was developed by a team at Hack Club with assistance from Brian Silverman (who helped develop Scratch and the precursor to Lego Mindstorms), Vadim Gerasimov (engineer at Google who helped create Tetris when he was 15), and Quentin Bolsée (researcher at MIT and Vrije University Brussels), and dozens contributions from teenage open-source developers!

We're also grateful for amazing open-source projects that make this possible like [Kaluma](https://kalumajs.org/), [JerryScript](https://jerryscript.net/), [uhtml](https://github.com/WebReflection/uhtml), and [CodeMirror](https://codemirror.net/).

## Responsibilities

Please refer to [this document](./RESPONSIBILITIES.md) for a list of current team members who are accountable for maintaining certain aspects of the Sprig platform.

## License

The Hack Club Sprig is open source and licensed under the [MIT License](./LICENSE). Fork, remix, and make it your own! Pull requests and other contributions greatly appreciated.


## 🌐 Web Resources & Interactive Index
- [CAR VS ZOMBIES](https://eduquestses.pages.dev/car-vs-zombies.html)
- [SIEGE BREAK](https://eduquestses.pages.dev/siege-break.html)
- [FLIGHT PILOT AIRPLANE GAMES 24](https://eduquestses.pages.dev/flight-pilot-airplane-games-24.html)
- [CATEGORY 1 PLAYER139](https://brainquestskr.pages.dev/category-1-player139.html)
- [PRIVACY](https://frskillcrafts.pages.dev/privacy.html)
- [ZOMBIES BATTLE FOR SURVIVAL](https://learnaction.netlify.app/zombies-battle-for-survival.html)
- [MERGEST KINGDOM](https://welearnaction.onrender.com/mergest-kingdom.html)
- [TOY CLAW SIMULATOR](https://eduquestses.pages.dev/toy-claw-simulator.html)
- [CATEGORY ESCAPE 2](https://learnaction.github.io/category-escape-2.html)
- [MAGIC SOLITAIRE](https://welearnaction.onrender.com/magic-solitaire.html)
- [MUSHROOM BLOCKS](https://eduquestses.pages.dev/mushroom-blocks.html)
- [FREE THE BALL](https://eduquestses.pages.dev/free-the-ball.html)
- [CATEGORY CAN T STOP PLAYING212](https://learnaction.netlify.app/category-can-t-stop-playing212.html)
- [SHANGHAI TOWN](https://eduquestkr.pages.dev/shanghai-town.html)
- [CATEGORY DRESS UP 2](https://eduquestkr.pages.dev/category-dress-up-2.html)
- [TERMS](https://frskillcrafts.pages.dev/terms.html)
- [BLOCK PIXEL GUN APOCALYPSE 3](https://learnaction.github.io/block-pixel-gun-apocalypse-3.html)
- [BOWMASTERS](https://brainquests.pages.dev/bowmasters.html)
- [COMBINATIONS DAILY](https://welearnaction.onrender.com/combinations-daily.html)
- [INDEX17](https://learnaction.netlify.app/index17.html)
- [BUBBLE RUSH](https://learnaction.netlify.app/bubble-rush.html)
- [CATEGORY BIKE 3](https://eduquestkr.pages.dev/category-bike-3.html)
- [KOKO LOCO BLOCK BLAST](https://learnaction.netlify.app/koko-loco-block-blast.html)
- [INDEX32](https://eduquestkr.pages.dev/index32.html)
- [ARROW SHIFT LOGIC TREE](https://eduquestses.pages.dev/arrow-shift-logic-tree.html)
- [ITALIAN BRAINROT OBBY PARKOUR](https://eduquests.pages.dev/italian-brainrot-obby-parkour.html)
- [ONLINE PORTAL](https://brainquests.github.io/)
- [CATEGORY SURVIVAL](https://brainquests.pages.dev/category-survival.html)
- [MOTO ROAD RASH 3D 2](https://eduquests.pages.dev/moto-road-rash-3d-2.html)
- [TRICKY CHALLENGES MINI GAMES](https://eduquestses.pages.dev/tricky-challenges-mini-games.html)
- [CANDY COLOR SORT PUZZLE](https://eduquestses.pages.dev/candy-color-sort-puzzle.html)
- [MAHJONG MASTERS](https://eduquestses.pages.dev/mahjong-masters.html)
- [GUIVOIO](https://eduquestsfr.pages.dev/guivoio.html)
- [SUPER BRAIN](https://eduquestses.pages.dev/super-brain.html)
- [FASHION WEEK 2025](https://eduquests.pages.dev/fashion-week-2025.html)
- [TOY CLAW SIMULATOR](https://eduquests.netlify.app/toy-claw-simulator.html)
- [KING OF THE HILL](https://eduquests.github.io/king-of-the-hill.html)
- [THUMBPINBALL](https://eduquestses.pages.dev/thumbpinball.html)
- [AIRPORT SECURITY](https://ieduquests.web.app/airport-security.html)
- [INDEX21](https://learnaction.netlify.app/index21.html)
- [CATEGORY SCHOOL](https://eduquests.github.io/category-school.html)
- [GEOMETRY VERTICAL](https://ieduquests.web.app/geometry-vertical.html)
- [CATEGORY FLASH 2](https://eduquests.github.io/category-flash-2.html)
- [MERMAIDCORE MAKEUP](https://eduquests.pages.dev/mermaidcore-makeup.html)
- [ONU LIVE](https://eduquests.netlify.app/onu-live.html)
- [TRIPLE CUPS](https://eduquestsfr.pages.dev/triple-cups.html)
- [CATEGORY BATTLE](https://eduquestkr.pages.dev/category-battle.html)
- [PARIS KISS](https://eduquests.onrender.com/paris-kiss.html)
- [MR THROW](https://eduquests.pages.dev/mr-throw.html)
- [HOLE DIGGER](https://eduquestkr.pages.dev/hole-digger.html)
- [BLOCK BLAST 2048](https://eduquests.netlify.app/block-blast-2048.html)
- [TINY BAKER OCEAN JELLY CAKE](https://ieduquests.web.app/tiny-baker-ocean-jelly-cake.html)
- [CAKE LINK MASTER](https://ieduquests.web.app/cake-link-master.html)
- [CATEGORY BIKE](https://learnaction.github.io/category-bike.html)
- [FARMING LIFE](https://eduquestsfr.pages.dev/farming-life.html)
- [CATEGORY MAHJONG 3](https://eduquestses.pages.dev/category-mahjong-3.html)
- [CATEGORY DEFENSE](https://eduquestsfr.pages.dev/category-defense.html)
- [DINO RANCH](https://eduquests.onrender.com/dino-ranch.html)
- [MATE IN CHESS](https://eduquests.onrender.com/mate-in-chess.html)
- [TOW N GO](https://eduquestsfr.pages.dev/tow-n-go.html)
- [CRUSH THE EGGS](https://learnaction.netlify.app/crush-the-eggs.html)
- [CATEGORY HERO72](https://eduquestses.pages.dev/category-hero72.html)
- [BLUE HEDGEHOG HILL DASH RIDE](https://ieduquests.web.app/blue-hedgehog-hill-dash-ride.html)
- [CONTAINER SORT PUZZLE](https://eduquestses.pages.dev/container-sort-puzzle.html)
- [CATEGORY MOUSE1 697](https://eduquestkr.pages.dev/category-mouse1-697.html)
- [SHOT CAN WILD](https://learnaction.netlify.app/shot-can-wild.html)
- [IDLE MARKET TYCOON](https://welearnaction.onrender.com/idle-market-tycoon.html)
- [OBBY PINATA PARTY](https://ieduquests.web.app/obby-pinata-party.html)
- [BUBBITS](https://ieduquests.web.app/bubbits.html)
- [ROOTLINGS SECRETS OF THE DEPTHS](https://eduquestses.pages.dev/rootlings-secrets-of-the-depths.html)
- [SORT TILES](https://ieduquests.web.app/sort-tiles.html)
- [CATEGORY BATTLE GAMES](https://eduquestkr.pages.dev/category-battle-games.html)
- [HIDE BALL](https://ieduquests.web.app/hide-ball.html)
- [SNAKE PUZZLE ESCAPE](https://welearnaction.onrender.com/snake-puzzle-escape.html)
- [CHROMA TREK](https://eduquests.netlify.app/chroma-trek.html)
- [DUNK CHALLENGE](https://learnaction.netlify.app/dunk-challenge.html)
- [BEAT BLADER 3D](https://ieduquests.web.app/beat-blader-3d.html)
- [CATEGORY STICKMAN175](https://eduquestkr.pages.dev/category-stickman175.html)
- [CITY BANANA MAN AGENT](https://brainquests.pages.dev/city-banana-man-agent.html)
- [BASKET SPORT STARS](https://eduquests.netlify.app/basket-sport-stars.html)
- [CATEGORY CONTROLLER](https://eduquests.github.io/category-controller.html)
- [ESCAPE FROM TUNG TUNG SAHUR](https://eduquestspt.pages.dev/escape-from-tung-tung-sahur.html)
- [FUN TOWN PARKING](https://eduquestsfr.pages.dev/fun-town-parking.html)
- [PRISM MATCH 3D](https://ieduquests.web.app/prism-match-3d.html)
- [HALLOWEEN FRUIT SLICE](https://brainquests.pages.dev/halloween-fruit-slice.html)
- [CAT EVOLUTION](https://eduquests.pages.dev/cat-evolution.html)
- [CATEGORY CARE](https://eduquests.github.io/category-care.html)
- [ZOMBIE CHASE](https://ieduquests.web.app/zombie-chase.html)
- [ONLINE PORTAL](https://themindzone.pages.dev/)
- [100 ROOMS ESCAPE](https://eduquestses.pages.dev/100-rooms-escape.html)
- [ROPE STITCH PUZZLE](https://eduquestspt.pages.dev/rope-stitch-puzzle.html)
- [ACOX RUNNER](https://learnaction.netlify.app/acox-runner.html)
- [CATEGORY MAHJONG CONNECT](https://eduquestspt.pages.dev/category-mahjong-connect.html)
- [BOBB S WORLD](https://eduquestsfr.pages.dev/bobb-s-world.html)
- [FASHION PRINCESS DRESS UP](https://brainquests.pages.dev/fashion-princess-dress-up.html)
- [CATEGORY ESCAPE](https://eduquestses.pages.dev/category-escape.html)
- [SOFT GIRLS WINTER AESTHETICS](https://eduquestsfr.pages.dev/soft-girls-winter-aesthetics.html)
- [CATEGORY DRESS UP](https://eduquestspt.pages.dev/category-dress-up.html)
- [GEOMETRY DASH MAZE MAPS](https://learnaction.netlify.app/geometry-dash-maze-maps.html)
- [COIN BLITZ](https://eduquests.pages.dev/coin-blitz.html)
- [CRAZY BUBBLE BREAKER](https://brainquests.pages.dev/crazy-bubble-breaker.html)
- [CAPYBARA SKEWER MATCH](https://ieduquests.web.app/capybara-skewer-match.html)
- [SITEMAP](https://learnaction.netlify.app/sitemap.html)
- [MINI GAMES RELAX COLLECTION 2](https://learnaction.netlify.app/mini-games-relax-collection-2.html)
- [ELLIE AND FRIENDS ART BLOOM AESTHETIC](https://eduquests.onrender.com/ellie-and-friends-art-bloom-aesthetic.html)
- [GEOMETRY DASH MAZE MAPS V2](https://eduquestsfr.pages.dev/geometry-dash-maze-maps-v2.html)
- [ITALIAN BRAINROT PUZZLE BATTLE](https://eduquests.pages.dev/italian-brainrot-puzzle-battle.html)
- [CHEERFUL PLUMBER](https://eduquests.pages.dev/cheerful-plumber.html)
- [CATEGORY MAGIC46](https://ieduquests.web.app/category-magic46.html)
- [NETQUEL COM](https://eduquests.netlify.app/netquel-com.html)
- [RUN N SHOOT](https://eduquestses.pages.dev/run-n-shoot.html)
- [PRINCESSES AT HORROR SCHOOL](https://eduquests.pages.dev/princesses-at-horror-school.html)
- [CATEGORY RACING DRIVING 2](https://ieduquests.web.app/category-racing-driving-2.html)
- [BARBEE SUMMER VACATION](https://learnaction.netlify.app/barbee-summer-vacation.html)
- [EMILYS HOTEL SOLITAIRE](https://eduquests.onrender.com/emilys-hotel-solitaire.html)
- [END OF WORLD](https://eduquestsfr.pages.dev/end-of-world.html)
- [CATEGORY CONTROLLER59](https://learnaction.github.io/category-controller59.html)
- [BUILDING MODS FOR MINECRAFT](https://ieduquests.web.app/building-mods-for-minecraft.html)
- [CATEGORY INCREMENTAL388](https://ieduquests.web.app/category-incremental388.html)
- [MARBLE SORT](https://eduquestspt.pages.dev/marble-sort.html)
- [CATEGORY SNAKE40](https://ieduquests.web.app/category-snake40.html)
- [MURDER MYSTERY](https://eduquestsfr.pages.dev/murder-mystery.html)
- [Z STICK DUEL FIGHTING](https://eduquestsfr.pages.dev/z-stick-duel-fighting.html)
- [OFF ROAD OVERDRIVE](https://learnaction.netlify.app/off-road-overdrive.html)
- [CATEGORY ONE BUTTON](https://eduquestkr.pages.dev/category-one-button.html)
- [REAL PARKOUR SIMULATOR](https://eduquestsfr.pages.dev/real-parkour-simulator.html)
- [CATEGORY SHOOTER 2](https://brainquests.pages.dev/category-shooter-2.html)
- [BUBBLY LAB](https://eduquests.pages.dev/bubbly-lab.html)
- [TERMS](https://learnquester.github.io/terms.html)
- [SWAT FORCE VS TERRORISTS](https://brainquests.pages.dev/swat-force-vs-terrorists.html)
