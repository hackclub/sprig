# Assembling your Sprig

Your Sprig console is a piece of open source hardware and can also be used as a hardware development kit (all the unused GPIO pins are broken out!). We made it into a game console and invite you to enjoy it as such. But we encourage you to make it something else.

Below are instructions for assembling your Sprig console.

## Contents

![Parts of game console laid out on a wooden table](https://cloud-6po09tv9d-hack-club-bot.vercel.app/4everything.jpg)

| Quantity | Item                                                                      |
| -------- | ------------------------------------------------------------------------- |
| 1        | Sprig PCB                                                                 |
| 1        | LCD screen                                                                |
| 1        | Raspberry Pi Pico                                                         |
| 4        | clear backings (2 with D-pad cutouts, 2 solid)                            |
| 1        | bag of 10 tactile button switches                                         |
| 1        | bag of hardware for screen (2 spacers, 2 M2\*14mm bolts, 2 hex nuts)\*    |
| 1        | bag of hardware for backings (8 M2\*10mm bolts, 8 hex nuts, allen key)\* |
| 1        | adapter or micro-USB cable                                                |
| 1        | bag of 2 AAA batteries                                                    |

> [!NOTE]
> Extra hardware may be included - it's all packed by hand. If you're missing a part, [DM `@graham` on the Hack Club Slack](https://hackclub.slack.com/team/U04QH1TTMBP) or email graham<img src="https://upload.wikimedia.org/wikipedia/commons/8/88/At_sign.svg" height=15px alt="@"></img>hackclub.com. 

## Instructions

1. Slide the LCD screen into the socket on the top of the board.

![Photo of a PCB with LCD attached](https://cloud-6po09tv9d-hack-club-bot.vercel.app/2lcd-no-spacers.jpg)

> [!CAUTION]
> Make sure that there are no pins floating out on either end! Misalignments can cause bad things to happen. 

2. Slide one of the two plastic spacers (long tubes) under one of the two holes in the display. Slide one of the longer bolts through the screen, spacer, and circuit board and screw one of the nuts onto the other end. Use the allen key to tighten it. Repeat for the display's other hole.

![Photo of an LCD assembled with screws and spacers](https://cloud-6po09tv9d-hack-club-bot.vercel.app/1screws-through-spacers.jpg)

3. Put the buttons in the corresponding holes on the front of the board - 4 on each side. You'll have 2 extra buttons.

![Photo of a single button on a PCB](https://cloud-6po09tv9d-hack-club-bot.vercel.app/0singlebutton.jpg)

![Photo of a PCB with an LCD and 8 buttons](https://cloud-obltnnp51-hack-club-bot.vercel.app/5all-buttons.jpg)

> [!NOTE]
> Don't worry about soldering the buttons in. The bends in the buttons' leads help them stay in the PCB!

4. Grab the clear backing plates. You should have four of them - two with a plus-shaped cutout, and two without.
> [!NOTE]
> If any of the plates have what look like circular scores where holes should be, use a bolt to push the piece through.

Peel the plastic film off both sides of each piece.
![Photo of a protective plastic film being peeled off of an acrylic piece](https://cloud-6po09tv9d-hack-club-bot.vercel.app/3peel-plastic.jpg)

Now flip over your Sprig and stack two plates on one side of the board - first one with the plus-shaped cutout for the D-pad, then one of the solid ones. 
![Photo of a piece of plastic with a D-pad cutout on a PCB](https://cloud-obltnnp51-hack-club-bot.vercel.app/4backing1.jpg)
![Photo of two plastic pieces stacked atop a PCB](https://cloud-obltnnp51-hack-club-bot.vercel.app/3backing2.jpg)

> [!TIP]
> If it's hard to get the plates to stay lined up, you can put one bolt through the plates first, then put the bolt in the corresponding hole in the PCB.

5. Put the shorter bolts in the plates' holes and add nuts on the top side of the board. Tighten using the allen key provided. Repeat steps 4 and 5 for the plates on the other side.

![Four bolts securing 2 pieces of plastic to a PCB](https://cloud-obltnnp51-hack-club-bot.vercel.app/2backing-withscrews.jpg)

6. Put the Raspberry Pi Pico into the socket on the back. The USB port should face the top of the board (where the black speaker is). It might need a bit of force, but the black plastic on the Pico will be flat against the socket when it's all the way in.

![Photo of a PCB](https://cloud-obltnnp51-hack-club-bot.vercel.app/0pico.jpg)

> [!CAUTION]
> Make sure that the ends of the Pico's rows of pins align with the ends of the sockets! Misalignments can cause bad things to happen. 

7. Put in the 2 AAA batteries. The negative (-) side of each battery goes against the spring at one end of the slot.

![Photo of an assembled handheld game console](https://cloud-93zuth77c-hack-club-bot.vercel.app/0img_1613.jpg)

**Now you can start uploading games to your Sprig! See the [upload guide](UPLOAD.md) for instructions on how to set up your Raspberry Pi Pico.** ➡️
