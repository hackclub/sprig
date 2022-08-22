# :leaves: [Hack Club SPRIG](https://sprig.hackclub.dev) :leaves: 

Sprig is a web-based environment for creating tile games. These games run in the browser and on the Sprig Console, a game console where every user is a creator. The only way to obtain a Sprig console is to make a game for it and share it in the [Sprig Gallery](https://sprig-gallery.hackclub.dev).

You should be able to get started in Sprig with very little experience in programming. Even if you're an expert, you should still be able to have fun. We hope you enjoy Sprig, and we can't wait to see what you make.

![PXL_20220822_200106565](https://user-images.githubusercontent.com/27078897/186008810-470bf457-e38e-466d-8c79-3f9586485db3.jpg)

**Sprig is a custom handheld game console** built by Hack Club. Fall of 2022, we are giving a Sprig (valued at over $100 in components alone) to every teenaged hacker that successfully shares a game they create in our community gallery.

<img width="861" alt="Screen Shot 2022-08-22 at 4 02 04 PM" src="https://user-images.githubusercontent.com/27078897/186008635-47f58392-4d5f-4b5e-a4d8-63c7b96d99fb.png">

**Sprig is a web-based game editor** that transforms learning to code from studying language syntax to making small creative projects. The Sprig game engine exposes a small construction kit for making tile-based games. This construction kit helps you focus on being creative instead of learning big APIs.

<img width="1547" alt="Screen Shot 2022-08-22 at 4 04 08 PM" src="https://user-images.githubusercontent.com/27078897/186008909-cc9ea9d5-5843-487e-ac3a-29330496eed1.png">

Sprig games are designed to be shared and hacked on with friends. Every game submitted is easily viewable and editable in our gallery allowing people to learn from and build off each other. 

**Sprig is a hardware development kit**. It’s not just for gaming! The Sprig console is designed to be assembled and disassembled. Each kit includes parts needed for getting started with hardware engineering and embedded systems programming. This includes a Raspberry Pi Pico, a TFT7735 screen, a MAX98357A I2S class D audio amplifier, a whole bunch of buttons, LEDs, a speaker, and a carrier board which wires all these components together while exposing the remaining pins on the microcontroller. It’s a complete system for generating graphics, sound, and handling tactile inputs which is reprogrammable at the touch of a button.

<!-- [image of components laid out nicely] -->

**Sprig is open source**. Shipping a game to the Sprig Gallery is contributing to an open-source project. Everything about Sprig is transparent and editable. That includes the hardware designs, the game engine for the web, the embedded game engine for the RP2040 chip, the web-editor itself, and even the gallery and intro pages!

## You Ship, We Ship

Make a game 
-> share it with the community 
-> receive your device 
-> play Sprig games on it 
-> hack on the device for more projects

## Philosophy

As we have said previously, people learn best when they make things that they care about, which they can then share with others. This type of learning philosophy is called constructionism, and Sprig is a type of microworld. A microworld is an environment where you can discover programming by using it to express yourself. 

This creative expression takes place in Sprig through game development, allowing users to become creators and make their own games or remix an existing one.

## Development

Join the `#sprig` channel on the [Hack Club Slack](https://hackclub.com/slack/) where you can join the development discussion and ask for help, and to learn more about how to make games with Sprig check out the [docs](https://github.com/hackclub/sprig/tree/main/docs).

We use vite for development.

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

The Sprig was developed by a team at Hack Club with assistance from Brian Silverman (who helped develop Scratch and the precursor to Lego Mindstorms), Vadim Gerasimov (engineer at Google who helped create Tetris when he was 15), and Quentin Bolseé (researcher at MIT and Vrije University), and dozens contributions from teenage open-source developers!

## License

The Hack Club Sprig is open source and licensed under the [MIT License](./LICENSE). Fork, remix, and make it your own! Pull requests and other contributions greatly appreciated.







