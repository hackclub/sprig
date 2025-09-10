# Sourcing!

Sprig is a physical game console designed by Hack Club where you write your **own** [games](https://sprig.hackclub.com/editor)! With any hardware device, it’s obvious you need to buy parts and have the board built. So all I need to do: is to find parts, buy parts, find a manufacturer, and boom! We get Sprigs. Yeah, no.

Sourcing parts today is no task for the faint of heart. *[Have](https://cloud-7qmksvucf-hack-club-bot.vercel.app/0screen_shot_2022-09-22_at_3.07.15_pm.png)  [you](https://cloud-1dg3e6nm9-hack-club-bot.vercel.app/0screen_shot_2022-09-22_at_3.07.42_pm.png)  [seen](https://cloud-1eysvgt04-hack-club-bot.vercel.app/0screen_shot_2022-09-22_at_3.20.50_pm.png)  [these](https://cloud-4i20ywhg7-hack-club-bot.vercel.app/0screen_shot_2022-09-22_at_3.23.10_pm.png)  [bloody](https://cloud-bpjpduoo0-hack-club-bot.vercel.app/0screen_shot_2022-09-22_at_3.23.48_pm.png)  [shortages](https://cloud-m5x11st40-hack-club-bot.vercel.app/0screen_shot_2022-09-22_at_3.24.33_pm.png)?*

Indeed. Many of the common parts used by hobbyists around the world are out of stock. Oh, and lead times are projected to be several months, sometimes even more than a year before restocking- then bots scalp and seize the stock, once they are restocked.

While this is partially attributed to a supply issue (ships getting stuck in canals, wars, COVID, geopolitical tensions), where insufficient raw materials are available, another issue is demand. Demand has shot up, to keep up with the surge in electronic device production during the pandemic.

The Raspberry Pi folks were not immune to this. You can either find Raspberry Pis out of stock or just five times their selling rate. We couldn’t find enough Raspberry Pi’s to prototype with, not to say deliver hundreds of Sprig kits around the world. Raspberry Pi’s are SBCs(Single Board Computers) with 64-bit ARM processors. They can run Linux with a desktop environment comfortably, and the new ones support two 4K displays. Cool, right? Yeah, they just cost $250 a pop now.

## Main Board

We have a few options for the controller.

1.  We could build our own SBC, with an NXP IMX6 Series Application Processor or shady Chinese CPU.
    
2.  We could design our own board with an MCU
    
3.  We could use a preexisting board- such as the Raspberry Pi Pico
      
The first one was extremely complicated. Chinese chips aren't ideal, and the NXP chip has 289 pins. Yeah. And as mentioned earlier, we don’t have any chips in stock, other than the RP2040. So at that point, it was more cost-efficient to buy a Pico for $5 than it was to design our own board, which had prototyping costs. An additional advantage of a pluggable control board was the freedom to use Sprig as a hardware development kit as well.

We chose the RP2040, which is a Raspberry Pi-designed, 32-bit dual-core ARM microcontroller with a maximum clock speed of 133MHz. Pimoroni had a [really nice board](https://shop.pimoroni.com/products/pimoroni-pico-lipo?variant=39386149093459) that was a bit over double the price but had battery charging for lithium-ion/polymer. We were also going to use lithium, but shipping regulations on lithium mail are really strict and would make international exports nearly impossible. Additionally, the Pimoroni board has a higher voltage requirement (3.3V->5V), compared to the 1.8->5 on the Pico. There are only two AAA batteries on the sprig, connected in series, so using the pimoroni board would require an additional battery, and we didn’t have space for that.

Pico it is! We got the Pico with headers from [pishop.us](https://www.pishop.us/product/raspberry-pi-pico-h/) (the only place that had them in stock in bulk.)

Coupled with the Pico for board attachment, we used two 20-pin 2.54mm generic female headers.

A game console requires several things- controls, display, audio, and power.

## Controls

Sprig’s control interface consists of eight twelve-millimeter through-hole tactile switches. We got them from [Adafruit](https://www.adafruit.com/product/1119). We also played around with smaller buttons and surface mount buttons.

Our first prototype used [six-millimeter surface mount soft switches](https://www.adafruit.com/product/3983) which we couldn’t find much stock of. During PCB assembly, the parts must be on an entire reel, and Adafruit cut theirs in strips of 10, and we couldn’t find enough - most people had maybe only a few hundred. They also weren’t too sensitive and you had to press all the way down to register a press.

We tried a replacement Omron six-millimeter surface mount [semi-soft low-profile switch](https://www.digikey.com/en/products/detail/omron-electronics-inc-emc-div/B3FS-1000P/277812), which sucked. 0/10. We also tried another six-millimeter surface mount tactile switch which wasn’t pleasant either.

We finally settled on the current switch we have now. Yay!

## Slide Switch
  
Sprig receives power from a dual battery pack soldered to the board, so we wanted a manual power switch that could be used. We originally went with a [switch](https://www.digikey.com/en/products/detail/w%C3%BCrth-elektronik/450404015514/9950812) from Wurth Electronik, which was pretty pricey but very low profile. The slider would be exposed off the board. Unfortunately, that was weak and half of them broke in transit (with cushioning!) The other half broke during normal use. No go. We switched to a [switch from C&K](https://www.digikey.com/en/products/detail/c-k/JS202011SCQN/2094299). It’s mounted upright and it seems much higher quality. Unfortunately, C&K didn’t get an import clearance from China, so we couldn’t exactly order our parts to ship to China. Somehow, our fab company could make them do it if they ordered. I’m still not sure why that is.
  
## Power
  
We’ve tested several battery holders- both single and double-cell AA and AAA. Through-hole parts have leads that can poke you, so we wanted a surface mount holder. After finalizing the board outline, we decided on a [surface mount dual AAA holder](https://www.digikey.com/en/products/detail/keystone-electronics/1022/2137859) from Keystone. This was great: we tried using two single AAA holders, but they had limited stock. The holder had two variants - one with springs, and one with tabs. The spring one didn’t hold the batteries well and they could fall out with a bit of shaking, unlike the tabbed one, which we went with.
  
## Audio
  
The Sprig uses a [MAX98357AETE+T](https://www.maximintegrated.com/en/products/analog/audio/MAX98357A.html) from Maxim Integrated. It’s a small form factor PCM Class D Amplifier, but with Class A/B performance. It’s hooked up to a CUI Devices [CVS-1508](https://www.digikey.com/en/products/detail/cui-devices/CVS-1508/2791828) speaker.
  
## Display
  
We chose a display breakout from Adafruit- a [1.8” TFT](https://www.adafruit.com/product/358). It has a resolution of 160x128, 18-bit color, and an ST7735R Display Driver. We asked adafruit to solder these with short male headers. They’re coupled with a low-profile “short” female header.
  
Do you know how hard it is to find one of these headers? Samtec had some that were fake short headers, and the adafruit spec sheets showed the companies were from over a decade ago, somewhere in Asia. We just bought Adafruit [Itsy Bitsy Short Header](https://www.adafruit.com/product/4174) sets, and I just cut them myself with a plier. I think I did fine and had an error rate of 5%.
  
## PCB
  
Sprig’s PCBs were ordered from JLCPCB and ALLPCB. JLC is cheaper and significantly faster (the DHL service they used consistently arrived ahead of schedule), but the quality is terrible. ALLPCB had nice PCBs, if not slightly more expensive, but they were prone to delays- it wasn’t rare to wait almost an extra week for them.
  
JLC’s assembly was also much cheaper. For a batch of 5 Sprigs, it would cost me $100 at JLC, and $500+ at ALLPCB. We usually ordered JLC for rush prototypes and ALLPCB for prototype validation.

Matte Black solder mask is any hardware designer's best friend, but green always has a fun classic look. So we went with both. I also loved the gold color of ENIG. With testing for substrate thicknesses of 1.6mm, 2.0mm, and 2.4mm, we concluded that 1.6mm was the easiest for buttons to be installed in. Ordering information: 1.6mm, 140x65mm, Matte Black/Glossy Green, ENIG. Everything else is standard.
  
## Reverse Polarity Protection
  
After some harsh lessons, we learned that the Pico did not have reverse power protection. This meant that if the Sprig was connected to the battery and USB simultaneously, the USB power would flow through to the battery. We originally prevented this by adding a 1N4001 diode, and later, a more efficient [Schottky diode.](https://www.digikey.com/en/products/detail/kyocera-avx/SD1206T020S1R0/3749511)
  
## Other passives and LEDs
  
Everything else is fairly generic. You can either get them from the US or China. There are several capacitors and resistors as well as two status LEDs. These parts can be found with any parts distributor.
