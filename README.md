# 🍃 Hack Club Sprig 🍃

**[💻 Online Editor: Make a game](https://sprig.hackclub.com/editor)** | **[👀 Gallery: Find games](https://sprig.hackclub.com/gallery)** | **[🕸 Landing Page](https://sprig.hackclub.com)** | **[🎮 Firmware](https://github.com/hackclub/spade)** | **[👾 Engine](https://github.com/hackclub/sprig-engine)**

[Sprig](https://sprig.hackclub.com) is a game console where **every user is a creator**. It can only be obtained by building a tile-based game in the [web-based game editor](https://sprig.hackclub.com/editor) and shipping it in the [community gallery](https://sprig.hackclub.com/gallery). It's made by [Hack Club](https://hackclub.com).

<p align="left">
<a>
<img width="500" alt="Screen Shot 2022-08-22 at 4 02 04 PM" src="https://user-images.githubusercontent.com/27078897/186769641-5b1181b4-9969-4276-9fa0-9f15140e4a9b.jpg">
</a>
</p>

You should be able to get started in Sprig with very little programming experience. Even if you're an expert, you should still be able to have fun. Sprig games are designed to be shared and hacked on with friends. Every game submitted is easily viewable and editable in our gallery allowing people to learn from and build off each other. 

## Sprig is a...

...**custom handheld game console** built by Hack Club. Fall of 2022, we are giving a Sprig (valued at over $100 in components alone) to every teenage hacker that successfully shares a game they create in our [community gallery](https://sprig.hackclub.com/gallery).

<p align="left">
<a>
<img width="500" alt="Screen Shot 2022-08-22 at 4 02 04 PM" src="https://sprig.hackclub.com/stories-tiny/sprig-back.jpeg">
</a>
</p>

...**[web-based game editor](https://sprig.hackclub.com/editor)** that transforms learning to code from studying language syntax to making small creative projects. The Sprig game engine exposes a small construction kit for making tile-based games. This construction kit helps you focus on being creative instead of learning big APIs. The games are just JavaScript and we built a custom system to run that same JavaScript on the microcontroller!

<p align="left">
<a href="https://sprig.hackclub.com/editor">
<img width="500" alt="Screen Shot 2022-03-07 at 6 21 27 PM" src="https://cloud-l94lfbasw-hack-club-bot.vercel.app/0image.png">
</a>
</p>

...**[hardware development kit](https://github.com/hackclub/sprig/blob/main/docs/ASSEMBLY.md)**. It’s not just for gaming! The Sprig console is designed to be assembled and disassembled. Each kit includes parts needed for getting started with hardware engineering and embedded systems programming. This includes a Raspberry Pi Pico, a TFT7735 screen, a MAX98357A I2S class D audio amplifier, a whole bunch of buttons, LEDs, a speaker, and a carrier board which wires all these components together while exposing the remaining pins on the microcontroller. It’s a complete system for generating graphics, sound, and handling tactile inputs which is reprogrammable at the touch of a button.

<p align="left">
<a href="https://sprig.hackclub.com">
<img width="500" alt="Screen Shot 2022-08-22 at 4 04 08 PM" src="https://user-images.githubusercontent.com/27078897/186015708-860df540-6c41-4400-aed5-d0fe8c9d31aa.jpg">
</a>
</p>

## Fully open source

**Sprig is open source**. Shipping a game to the Sprig Gallery is contributing to an open-source project. Everything about Sprig is transparent and editable. That includes the [hardware designs](https://github.com/hackclub/sprig-hardware), the [game engine](https://github.com/hackclub/sprig-engine), the [embedded game engine for the RP2040 chip](https://github.com/hackclub/spade), and the editor and website itself (this repo)!

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
- `#sprig-emulator`: Development of emulator.
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

Sprig's editor and site pages are built with [Astro](https://astro.build/) using [Preact](https://preactjs.com/) for rendering. Perhaps somewhat unusually, we predominantly use [Preact Signals](https://preactjs.com/guide/v10/signals/) for state management. The project structure is as follows:

- `src/pages/` contains all the site's main pages and API routes. In general, `.ts` files are API routes and `.astro` files are pages. All pages are server-side rendered on demand and can make database calls and such.
- `src/components/` contains all the components used in the editor and site pages. Most components will have accompanying `.module.css` files which contain vanilla CSS stylesheets which are scoped to the component. These "CSS modules" can be imported as a JS object containing referencable class names.
- `src/lib/` contains all the support code. Currently this is a mix of server and client code.
- `src/legacy/` has a bunch of old code from the v1 version of the editor which is kept for ease of porting the home and Get a Sprig pages. Since Astro lets us combine multiple frameworks, we're also using old Svelte code in some places.
- `docs/` contains documentation on how to use Sprig, including `docs.md` which contains the help file embedded in the editor.
- `public/` contains static assets which are directly served.
- `src/global.css` and `src/components/standard-head.astro` contain code that's generally shared across all pages.

Everything pushed to GitHub and all pull requests are automatically deployed on [Vercel](https://vercel.com/hackclub).

### Prerequisites

Things you'll want installed:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)

We use Firebase as a database. To develop login/saving related features locally, you'll likely want to [create a Firebase project](https://console.firebase.google.com/) for yourself. Then, create a service account, download the JSON file, and convert the contents to base64 ([link to a tool to easily do this](https://gchq.github.io/CyberChef/#recipe=JSON_Minify()To_Base64('A-Za-z0-9%2B/%3D'))).

We recommend [Visual Studio Code](https://code.visualstudio.com/) as a code editor. You should be automatically prompted to install some recommended extensions when you open the project.

### Project Setup

In a terminal, clone the repo and install packages:

```
git clone https://github.com/hackclub/sprig/
cd sprig
yarn install
```

Next, you'll want to give Sprig access to the Firebase credentials you created. Make a `.env` file in the root of the project and enter `FIREBASE_CREDENTIAL=` followed by the base64 string you generated.

To start the dev server, run `yarn dev` and visit <http://localhost:3000> in your web browser! Please create a GitHub issue if you cannot get something to work properly.

### Engine Development

All *engine code* (responsible for running games, playing tunes, etc.) is in a different repo: <https://github.com/hackclub/sprig-engine/>.

If you want to work on the engine and test out your changes in the context of this repo, you'll want to use a feature called linking.

First set up the engine repo:

```
git clone https://github.com/hackclub/sprig-engine/
cd sprig-engine
yarn install
yarn link
```

Then, in this website's repo:

```
yarn link sprig
```

Now, run `yarn dev` in the engine repo to start the TypeScript build process.

## Acknowledgements 

The Sprig was developed by a team at Hack Club with assistance from Brian Silverman (who helped develop Scratch and the precursor to Lego Mindstorms), Vadim Gerasimov (engineer at Google who helped create Tetris when he was 15), and Quentin Bolsée (researcher at MIT and Vrije University Brussels), and dozens contributions from teenage open-source developers!

We're also grateful for amazing open-source projects that make this possible like [Kaluma](https://kalumajs.org/), [JerryScript](https://jerryscript.net/), [uhtml](https://github.com/WebReflection/uhtml), and [CodeMirror](https://codemirror.net/).

## Responsibilities

Please refer to [this document](./RESPONSIBILITIES.md) for a list of current team members who are accountable for maintaining certain aspects of the Sprig platform.

## License

The Hack Club Sprig is open source and licensed under the [MIT License](./LICENSE). Fork, remix, and make it your own! Pull requests and other contributions greatly appreciated.
