# :leaves: Hack Club Sprig :leaves: 

**[💻 Online Editor: Make a game](https://editor.sprig.hackclub.com)** | **[👀 Gallery: Find games](https://sprig.hackclub.com/gallery)** | **[🕸 Website](https://sprig.hackclub.com)** | **[📺 Hackathon Video](https://www.youtube.com/watch?v=PnK4gzO6S3Q)** | **[<img width="16" alt="Screen Shot 2022-08-22 at 4 02 04 PM" src="https://assets.hackclub.com/icon-rounded.svg"> Hack Club](https://hackclub.com)**

[Sprig](https://sprig.hackclub.com) is a game console where **every user is a creator**. It can only be obtained by building a tile-based game in the [web-based game editor](https://editor.sprig.hackclub.com) and shipping it in the [community gallery](https://sprig.hackclub.com/gallery).

<p align="left">
<a>
<img width="500" alt="Screen Shot 2022-08-22 at 4 02 04 PM" src="https://user-images.githubusercontent.com/27078897/186769641-5b1181b4-9969-4276-9fa0-9f15140e4a9b.jpg">
</a>
</p>

You should be able to get started in Sprig with very little programming experience. Even if you're an expert, you should still be able to have fun. Sprig games are designed to be shared and hacked on with friends. Every game submitted is easily viewable and editable in our gallery allowing people to learn from and build off each other. 

## Sprig is a

**custom handheld game console** built by Hack Club. Fall of 2022, we are giving a Sprig (valued at over $100 in components alone) to every teenage hacker that successfully shares a game they create in our [community gallery](https://sprig.hackclub.com/gallery).

<p align="left">
<a>
<img width="500" alt="Screen Shot 2022-08-22 at 4 02 04 PM" src="https://sprig.hackclub.com/stories-tiny/sprig-back.jpeg">
</a>
</p>

**[web-based game editor](https://editor.sprig.hackclub.com)** that transforms learning to code from studying language syntax to making small creative projects. The Sprig game engine exposes a small construction kit for making tile-based games. This construction kit helps you focus on being creative instead of learning big APIs. The games are just JavaScript and we built a custom system to run that same JavaScript on the microcontroller!

<p align="left">
<a href="https://editor.sprig.hackclub.com">
<img width="500" alt="Screen Shot 2022-08-22 at 4 04 08 PM" src="https://user-images.githubusercontent.com/27078897/186008909-cc9ea9d5-5843-487e-ac3a-29330496eed1.png">
</a>
</p>

**[hardware development kit](https://github.com/hackclub/sprig/blob/main/docs/ASSEMBLY.md)**. It’s not just for gaming! The Sprig console is designed to be assembled and disassembled. Each kit includes parts needed for getting started with hardware engineering and embedded systems programming. This includes a Raspberry Pi Pico, a TFT7735 screen, a MAX98357A I2S class D audio amplifier, a whole bunch of buttons, LEDs, a speaker, and a carrier board which wires all these components together while exposing the remaining pins on the microcontroller. It’s a complete system for generating graphics, sound, and handling tactile inputs which is reprogrammable at the touch of a button.

<p align="left">
<a href="https://sprig.hackclub.com">
<img width="500" alt="Screen Shot 2022-08-22 at 4 04 08 PM" src="https://user-images.githubusercontent.com/27078897/186015708-860df540-6c41-4400-aed5-d0fe8c9d31aa.jpg">
</a>
</p>

## Fully open source

**Sprig is open source**. Shipping a game to the Sprig Gallery is contributing to an open-source project. Everything about Sprig is transparent and editable. That includes the [hardware designs](https://github.com/hackclub/sprig-hardware), the game engine for the web (this repo), the [embedded game engine for the RP2040 chip](https://github.com/hackclub/kaluma), the web-editor itself (this repo), and [even the gallery and intro pages](https://github.com/hackclub/sprig-gallery)! We did some fun engineering to get Sprig to work and to make your games run the same on your desktop computer and a $4 microcontroller. That involved custom JS runtimes with optimizations in C and even PIO assembly. We also documented some [behind-the-scenes](https://github.com/hackclub/sprig/tree/main/docs).

## You Ship, We Ship

Make a game 
&rarr; Share it with the community 
&rarr; Receive your device 
&rarr; Play Sprig games on it 
&rarr; Hack on the device for more projects

***Only teenagers and younger can receive Sprigs!*** All are welcome to submit to the [gallery](https://sprig.hackclub.com/gallery) though.

[Make your first Sprig game!](https://editor.sprig.hackclub.com/?file=https://raw.githubusercontent.com/hackclub/sprig/main/games/getting_started.js)
## Philosophy

People learn best when they make things that they care about, which they can then share with others. This type of learning philosophy is called constructionism, and Sprig is a type of microworld. A microworld is an environment where you can discover programming by using it to express yourself. 

## Development

Join the `#sprig` channel on the [Hack Club Slack](https://hackclub.com/slack/) where you can join the development discussion and ask for help, and to learn more about how to make games with Sprig check out the [docs](https://github.com/hackclub/sprig/tree/main/docs).

We use [vite](https://vitejs.dev/) for development.

Clone repo:

```
$ git clone https://github.com/hackclub/sprig/
```

To run:

```
cd sprig
yarn
yarn dev
```

Visit <http://localhost:3000> in your web browser and it should work!

## Acknowledgements 

The Sprig was developed by a team at Hack Club with assistance from Brian Silverman (who helped develop Scratch and the precursor to Lego Mindstorms), Vadim Gerasimov (engineer at Google who helped create Tetris when he was 15), and Quentin Bolsée (researcher at MIT and Vrije University Brussels), and dozens contributions from teenage open-source developers!

We're also grateful for amazing open-source projects that make this possible like [Kaluma](https://kalumajs.org/), [JerryScript](https://jerryscript.net/), [uhtml](https://github.com/WebReflection/uhtml), and [CodeMirror](https://codemirror.net/).

## License

The Hack Club Sprig is open source and licensed under the [MIT License](./LICENSE). Fork, remix, and make it your own! Pull requests and other contributions greatly appreciated.
