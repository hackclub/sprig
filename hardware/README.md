## The Sprig Console

You can find KiCAD 6 files for the PCB of Sprig, a BOM, and CAD models for the acrylic back covers here.

- `hardware/` contains the KiCAD files and Bill of Materials for the PCB
- `back_covers/` contains the CAD models for the acrylic back covers

The main [Sprig Repo is available here](https://www.github.com/hackclub/sprig).

<img width="500" alt="Assembled Green Sprig, Front View" src="https://cloud-8at89q6ay-hack-club-bot.vercel.app/1sprig_green_front_assembled.jpg">

<img width="500" alt="Assembled Green Sprig, Rear View" src="https://cloud-8at89q6ay-hack-club-bot.vercel.app/0sprig_green_back_assembled.jpg">

# Description

The Sprig console is a custom-designed, limited edition game console powered by the Raspberry Pi Pico. It has a 1.8" 160x128 LCD display, as well as eight tactile buttons for input. It uses two AAA batteries for power, and has a MAX98357A audio amplifier with an 8 ohm, 300mW Speaker.

The Sprig console is a custom-designed, limited edition game console built to run games written with the Sprig game editor.

It's powered by a Raspberry Pi RP2040, which is clocked at 125MHz, with 264kB SRAM and 2MB external QSPI flash. Four unused GPIO pins are exposed to the rear of the console.

The Sprig is powered by two AAA batteries. There is also a high efficiency schottky diode to prevent power flow to the batteries when connected to USB power.

In addition, there is a MAX98357A class D audio amplifier from Maxim Integrated, connected to a CUI Devices CVS-1508 8 ohm, 300mW speaker.

There are two LEDs for status, a power switch for batteries, as well as eight tactile buttons to control input.
