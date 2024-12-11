---
sidebar_position: 7
---

# How to Grow a Sprig

This is a write up on what goes into making a Sprig. It doesn't cover every detail of the design, prototyping, and manufacturing a complete Sprig device but it will give you a good idea of the skills and tools used to do such a project. It's mostly written in a tutorial style with a scaled-down Sprig project used as an illlustrative example.

## The Hardware

### Electrical

When you design a Printed Circuit Board (PCB) the first step is to create a schematic.

![](https://paper-attachments.dropbox.com/s_0511BA4B191598753ECBC49567C0623B4E6F1551BAE3832CD8B8B2EDAF26FAB6_1662571780776_Screen+Shot+2022-09-07+at+1.12.57+PM.png)


The schematic basically tells you how things are logically connected but it’s just an abstract representation of the board. In order to turn this into a circuit board you can hold you have to create a wiring diagram. 

![](https://paper-attachments.dropbox.com/s_0511BA4B191598753ECBC49567C0623B4E6F1551BAE3832CD8B8B2EDAF26FAB6_1662572071397_Screen+Shot+2022-09-07+at+1.34.21+PM.png)


The wiring diagram shows us how things are physically laid out and wired together. Here you’ll find the footprints, or the real life shapes, of the components we picked out in the schematic. 

The Sprig has a number of components. The bill of materials is:

| Name                            | Quantity | Function                          |
| ------------------------------- | -------- | --------------------------------- |
| Raspberry Pi Pico (RP2040)      | 1        | Microcontroller                   |
| Adafruit_TFT_ST7735             | 1        | Screen                            |
| MAX98357AETE+                   | 1        | Audio Chip                        |
| CVS-1508                        | 1        | Speaker                           |
| Slideswitch                     | 1        | Power Switch                      |
| 12mm square tactile buttons     | 8        | Buttons                           |
| 1020 battery holder             | 1        | Holds Batteries                   |
| 10uF Capacitor 1206             | 1        | Passive Component                 |
| 1uF Capacitor 1206              | 2        | Passive Component                 |
| 0.1uF Capacitor 1206            | 1        | Passive Component                 |
| 1M Resistor 1206                | 1        | Passive Component                 |
| 1k Resistor 1206                | 2        | Passive Component                 |
| LED 1206                        | 2        | Passive Component                 |
| 100V 1A Schotky Diode Mini SMA  | 1        | Works as Power Gate for Batteries |
| 1x10 5mm (short) female header  | 1        | Attaching Screen                  |
| 1x20 7mm (regular) female header| 2        | Attaching Pico                    |


The Sprig also uses some additional hardware.


| Name                                        | Quantity | Function                                 |
| ------------------------------------------- | -------- | ---------------------------------------- |
| acrylic back covers                         | 4        | to protect your fingers from pointy bits |
| m2 10mm socket head screw                   | 8        | fastens backcovers to board              |
| m2 14mm socket head screw                   | 2        | for attaching screen                     |
| m2 nuts                                     | 10       | for keeping screws on                    |
| 7.4mm black acetal spacers                  | 2        | for lifting the screen                   |
| micro usb cable                             | 1        |                                          |
| 1.5mm allen key                             | 1        |                                          |
| aaa batteries                               | 2        |                                          |
| carrying box                                | 1        |                                          |
| adapter from male micro usb to female usb c | 1        |                                          |


We’ll talk about designing and making some of these mechanical parts in a moment but for now let’s focus on the electrical portion.

Boards are normally designed in Electronic Design Automation (EDA) programs. We used an open-source tool called [KiCad](https://kicad.org) to design the Sprig. Let’s get to know KiCad a bit by designing a simple board with a microcontroller, an input (button), and an output (LED).

First create a new project and save that project in a folder.


![](https://paper-attachments.dropbox.com/s_0511BA4B191598753ECBC49567C0623B4E6F1551BAE3832CD8B8B2EDAF26FAB6_1664549279449_Screen+Shot+2022-09-30+at+10.47.37+AM.png)


After that you’ll see project files like those below:

![](https://paper-attachments.dropbox.com/s_0511BA4B191598753ECBC49567C0623B4E6F1551BAE3832CD8B8B2EDAF26FAB6_1664549333596_Screen+Shot+2022-09-30+at+10.48.44+AM.png)

The "\_pcb" file is the layout and the "\_sch" is the schematic. 

Let’s import some symbols and footprints we can use in our design. In our project folder we can add some components which we will then reference in our symbol and footprint libraries. I often use components from an inventory for a digital fabrication class called how to make (almost) anything.


![](https://paper-attachments.dropbox.com/s_0511BA4B191598753ECBC49567C0623B4E6F1551BAE3832CD8B8B2EDAF26FAB6_1664549607489_Screen+Shot+2022-09-30+at+10.52.34+AM.png)


Next let’s go to preference and “Manage Symbol Libraries”.

![](https://paper-attachments.dropbox.com/s_0511BA4B191598753ECBC49567C0623B4E6F1551BAE3832CD8B8B2EDAF26FAB6_1664549684429_Screen+Shot+2022-09-30+at+10.54.35+AM.png)


You’ll be presented with this menu:

![](https://paper-attachments.dropbox.com/s_0511BA4B191598753ECBC49567C0623B4E6F1551BAE3832CD8B8B2EDAF26FAB6_1664549842790_Screen+Shot+2022-09-30+at+10.55.55+AM.png)


In the above shot I’ve already got the sprig library. If you don’t you can add it by clicking the “+” button. Then filling out the new entry.

![](https://paper-attachments.dropbox.com/s_0511BA4B191598753ECBC49567C0623B4E6F1551BAE3832CD8B8B2EDAF26FAB6_1664549927831_Screen+Shot+2022-09-30+at+10.56.58+AM.png)


You can link the symbols by clicking the directory when you edit the line

![](https://paper-attachments.dropbox.com/s_0511BA4B191598753ECBC49567C0623B4E6F1551BAE3832CD8B8B2EDAF26FAB6_1664549961219_Screen+Shot+2022-09-30+at+10.57.06+AM.png)


And then navigating to the “fab.kicad_sym” file in the fab directory.

![](https://paper-attachments.dropbox.com/s_0511BA4B191598753ECBC49567C0623B4E6F1551BAE3832CD8B8B2EDAF26FAB6_1664549976289_Screen+Shot+2022-09-30+at+10.56.34+AM.png)


Next let’s do the same for footprints.


![](https://paper-attachments.dropbox.com/s_0511BA4B191598753ECBC49567C0623B4E6F1551BAE3832CD8B8B2EDAF26FAB6_1664553115869_Screen+Shot+2022-09-30+at+11.03.19+AM.png)


In this case we will select the “fab.pretty” folder.

![](https://paper-attachments.dropbox.com/s_0511BA4B191598753ECBC49567C0623B4E6F1551BAE3832CD8B8B2EDAF26FAB6_1664553171206_Screen+Shot+2022-09-30+at+11.52.13+AM.png)


Seen here

![](https://paper-attachments.dropbox.com/s_0511BA4B191598753ECBC49567C0623B4E6F1551BAE3832CD8B8B2EDAF26FAB6_1664553163146_Screen+Shot+2022-09-30+at+11.52.27+AM.png)


Do the same with the sprig library to get a few more components specific to our use case. Now let’s make our schematic!

Go back to the project and select “Schematic”

![](https://paper-attachments.dropbox.com/s_0511BA4B191598753ECBC49567C0623B4E6F1551BAE3832CD8B8B2EDAF26FAB6_1664553223864_Screen+Shot+2022-09-30+at+11.53.26+AM.png)


We’ll be presented with a window like this

![](https://paper-attachments.dropbox.com/s_0511BA4B191598753ECBC49567C0623B4E6F1551BAE3832CD8B8B2EDAF26FAB6_1664553248310_Screen+Shot+2022-09-30+at+11.53.57+AM.png)


We can add components with the tool that looks like a triangle with some symbols written on it (it’s an op-amp). It’s the top symbol in the image below.

![](https://paper-attachments.dropbox.com/s_0511BA4B191598753ECBC49567C0623B4E6F1551BAE3832CD8B8B2EDAF26FAB6_1664553334081_Screen+Shot+2022-09-30+at+11.55.26+AM.png)


Next we have to choose the component we want to add.


![](https://paper-attachments.dropbox.com/s_0511BA4B191598753ECBC49567C0623B4E6F1551BAE3832CD8B8B2EDAF26FAB6_1665078779506_Screen+Shot+2022-10-06+at+1.52.48+PM.png)


Search for a pico, this is a wonderful microcontroller made by Raspberry Pi and its the heart of our device. Here is the symbolic representation once we’ve placed it.

![](https://paper-attachments.dropbox.com/s_0511BA4B191598753ECBC49567C0623B4E6F1551BAE3832CD8B8B2EDAF26FAB6_1665078912600_Screen+Shot+2022-10-06+at+1.54.21+PM.png)


Next let’s get our button and our LED, we’ll also need a resistor for our LED. When placing components you can press “r” to rotate them. All together the symbols look like this:

![](https://paper-attachments.dropbox.com/s_0511BA4B191598753ECBC49567C0623B4E6F1551BAE3832CD8B8B2EDAF26FAB6_1665079069027_Screen+Shot+2022-10-06+at+1.57.32+PM.png)


The 1206 in “LED_1206” means it’s a surface mount device (SMD) of a certain size.

Now that we have our components we need to wire them together logically. We can do that in a few different ways. 

We can drag our components to overlap connection points.


![](https://paper-attachments.dropbox.com/s_0511BA4B191598753ECBC49567C0623B4E6F1551BAE3832CD8B8B2EDAF26FAB6_1665081126721_Screen+Shot+2022-10-06+at+2.31.52+PM.png)


We can draw wires.

![](https://paper-attachments.dropbox.com/s_0511BA4B191598753ECBC49567C0623B4E6F1551BAE3832CD8B8B2EDAF26FAB6_1665081155892_Screen+Shot+2022-10-06+at+2.32.27+PM.png)
![](https://paper-attachments.dropbox.com/s_0511BA4B191598753ECBC49567C0623B4E6F1551BAE3832CD8B8B2EDAF26FAB6_1664554034825_Screen+Shot+2022-09-30+at+12.06.55+PM.png)


Or we can add labels.


![](https://paper-attachments.dropbox.com/s_0511BA4B191598753ECBC49567C0623B4E6F1551BAE3832CD8B8B2EDAF26FAB6_1665081189396_Screen+Shot+2022-10-06+at+2.33.00+PM.png)
![](https://paper-attachments.dropbox.com/s_0511BA4B191598753ECBC49567C0623B4E6F1551BAE3832CD8B8B2EDAF26FAB6_1664554164649_Screen+Shot+2022-09-30+at+12.09.03+PM.png)


Let’s see the whole board wired together.

![](https://paper-attachments.dropbox.com/s_0511BA4B191598753ECBC49567C0623B4E6F1551BAE3832CD8B8B2EDAF26FAB6_1665082300542_Screen+Shot+2022-10-06+at+2.51.28+PM.png)


Now that we have a complete schematic let’s do the layout.

Go back to the project menu and select “PCB Editor”

![](https://paper-attachments.dropbox.com/s_0511BA4B191598753ECBC49567C0623B4E6F1551BAE3832CD8B8B2EDAF26FAB6_1665081627948_Screen+Shot+2022-10-06+at+2.40.18+PM.png)


That will open up this screen.

![](https://paper-attachments.dropbox.com/s_0511BA4B191598753ECBC49567C0623B4E6F1551BAE3832CD8B8B2EDAF26FAB6_1665081693738_Screen+Shot+2022-10-06+at+2.41.24+PM.png)


To bring in footprints from the schematic press the button you see below.

![](https://paper-attachments.dropbox.com/s_0511BA4B191598753ECBC49567C0623B4E6F1551BAE3832CD8B8B2EDAF26FAB6_1665081930986_Screen+Shot+2022-10-06+at+2.45.05+PM.png)

![](https://paper-attachments.dropbox.com/s_0511BA4B191598753ECBC49567C0623B4E6F1551BAE3832CD8B8B2EDAF26FAB6_1665081936069_Screen+Shot+2022-10-06+at+2.45.16+PM.png)


 You will now have the components but they’ll be un-routed (not wired).

![](https://paper-attachments.dropbox.com/s_0511BA4B191598753ECBC49567C0623B4E6F1551BAE3832CD8B8B2EDAF26FAB6_1665081992937_Screen+Shot+2022-10-06+at+2.46.24+PM.png)


To start routing click the “Route Tracks” button.

![](https://paper-attachments.dropbox.com/s_0511BA4B191598753ECBC49567C0623B4E6F1551BAE3832CD8B8B2EDAF26FAB6_1665082159490_Screen+Shot+2022-10-06+at+2.48.54+PM.png)


After routing our board it looks like this.

![](https://paper-attachments.dropbox.com/s_0511BA4B191598753ECBC49567C0623B4E6F1551BAE3832CD8B8B2EDAF26FAB6_1665082400721_Screen+Shot+2022-10-06+at+2.52.55+PM.png)


We need to add some edge cuts to define the outline of our board. Let’s use the rectangle tool.

![](https://paper-attachments.dropbox.com/s_0511BA4B191598753ECBC49567C0623B4E6F1551BAE3832CD8B8B2EDAF26FAB6_1665082947050_Screen+Shot+2022-10-06+at+3.01.56+PM.png)


Then select the rectangle and move it to the “Edge.Cuts” layer. 

First right click, select “Properties”.

![](https://paper-attachments.dropbox.com/s_0511BA4B191598753ECBC49567C0623B4E6F1551BAE3832CD8B8B2EDAF26FAB6_1665083108087_Screen+Shot+2022-10-06+at+3.04.44+PM.png)

Then select the right layer in the menu and hit okay.

![](https://paper-attachments.dropbox.com/s_0511BA4B191598753ECBC49567C0623B4E6F1551BAE3832CD8B8B2EDAF26FAB6_1665083148114_Screen+Shot+2022-10-06+at+3.04.20+PM.png)

You can see the final result below.

![Screen Shot 2022-10-06 at 3 19 32 PM](https://user-images.githubusercontent.com/27078897/194400337-fe6d60cc-f94d-486c-86d1-afc7c729e8fb.png)

### Mechanical

The back covers of the Sprig are laser cut. To produce them we designed the components in a parametric CAD program, [Fusion 360](https://www.autodesk.com/products/fusion-360/overview?term=1-YEAR&tab=subscription), and then export them to a format suitable for laser cutting.

When we open up Fusion we are confronted with a blank project.

<img width="1502" alt="Screen Shot 2022-10-19 at 10 43 37 AM" src="https://user-images.githubusercontent.com/27078897/196723858-a0de57a8-0654-4a74-b01e-00327531ba66.png"/>

Let's insert a reference image of the Sprig into the program.

<img width="1502" alt="Screen Shot 2022-10-19 at 10 48 31 AM" src="https://user-images.githubusercontent.com/27078897/196725066-005cfafb-1918-4f85-9a0e-0e28ddf94543.png"/>

We have to set the proper scale of the reference image. I do this by first drawing a reference rectangle to scale.

<img width="924" alt="Screen Shot 2022-10-19 at 12 08 59 PM" src="https://user-images.githubusercontent.com/27078897/196745856-9a200c58-3a86-4852-856c-d9eebb0f1d3b.png"/>

Then scale the canvas to fit inside the rectangle.

<img width="895" alt="Screen Shot 2022-10-19 at 12 10 26 PM" src="https://user-images.githubusercontent.com/27078897/196746140-6d726315-74d9-4b82-9acc-bab0b4d375ab.png"/>

We can now sketch out the backplate.

<img width="1502" alt="Screen Shot 2022-10-19 at 12 18 30 PM" src="https://user-images.githubusercontent.com/27078897/196747972-aca06797-1b54-485b-a472-10b36307187e.png"/>

Then extrude it.

<img width="1502" alt="Screen Shot 2022-10-19 at 12 19 10 PM" src="https://user-images.githubusercontent.com/27078897/196748056-4b09f584-510f-41dd-89f5-de400e6c728f.png"/>

Add some fillets so we don't cut our fingers.

<img width="1502" alt="Screen Shot 2022-10-19 at 12 19 55 PM" src="https://user-images.githubusercontent.com/27078897/196748245-515a38e0-9007-4e48-bdc2-57e8e0cbb5b1.png"/>

And mirror it to have the complimentary piece.

<img width="1502" alt="Screen Shot 2022-10-19 at 12 20 26 PM" src="https://user-images.githubusercontent.com/27078897/196748389-c3d8f499-fabe-4873-897b-0ec491fcedae.png"/>

## The Firmware

For the firmware we're using a modified version of [Kaluma](https://kalumajs.org/). Kaluma is a JavaScript runtime which can fit on a RP2040. To create SprigOS we added the ability to draw to the screen, make music efficiently, and the Sprig game engine.

To load firmware onto the Pico depress the white button on the Pico and plug it into your computer while holding the button down. This will put the Pico in Bootload mode.

![PXL_20221019_142858245](https://user-images.githubusercontent.com/27078897/196720476-4bbf0c88-cee0-429f-8cf7-890ec68986d5.jpg)

The Pico will show up as a USB device.

<img width="94" alt="Screen Shot 2022-10-19 at 10 30 47 AM" src="https://user-images.githubusercontent.com/27078897/196720590-a6f986ed-9c6d-4e2a-b514-baffa38864a2.png"/>

Download the UF2 of our [SprigOS from GitHub](https://github.com/hackclub/sprig/blob/main/pico-os.uf2) and drop it onto the RPI-RP2.

We can now load games onto our Pico from the serial port.

## The Manufacturing

We manufactured our board by sending Gerber files to a PCB fabrication house along with information about how to "stuff" the board (or add components to it). Hugo Hu helped coordinate the production and did a nice [write up](SOURCING.md) on some of the sourcing details which you can find here.

---

<!--
 
# BELOW IS A WIP

## The Game Engine

Lots of what makes Sprig "Sprig" is the game engine, which helps you to make charming, tile-based games.

This engine evolved from a more traditional "game-engine" we called Game Lab. 

Game Lab had a physics engine that handled moving things with velocity and collisions between objects.

We found that people would make one game mechanic but never finish games, so we decided to develop a simplified engine.

We made everything tile-based. That means everything moves discretely on a grid. This accommodates making puzzle games.

## The Web Editor

It's really important to be able to see what you are doing.

It's just programming in the sense that the entire game can be represented as a text file.

The editor adds tools for graphically editing with embedded asset editors.

## Asset Editors

Use CodeMirror. Analyzing the syntax tree.

## other things to mention

custom footprints 

-->

