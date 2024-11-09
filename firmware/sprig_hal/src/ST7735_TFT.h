// --------------------------------------------------------------------------
// ST7735
//
// This code is based on work from Bernhard Bablok
// 
// The code is also based on work from Gavin Lyons, see
// https://github.com/gavinlyonsrepo/pic_16F18346_projects
//
// https://github.com/bablokb/pic-st7735
// --------------------------------------------------------------------------

#define SPI_TFT_PORT spi0
#define SPI_TFT_CS   20
#define SPI_TFT_DC   22
#define SPI_TFT_RST  26

#define SPI_PORT spi0
#define SPI_RX   16
#define SPI_TX   19
#define SPI_SCK  18

#define ST7735_NOP     0x00
#define ST7735_SWRESET 0x01
#define ST7735_RDDID   0x04
#define ST7735_RDDST   0x09
#define ST7735_SLPIN   0x10
#define ST7735_SLPOUT  0x11
#define ST7735_PTLON   0x12
#define ST7735_NORON   0x13
#define ST7735_INVOFF  0x20
#define ST7735_INVON   0x21
#define ST7735_DISPOFF 0x28
#define ST7735_DISPON  0x29
#define ST7735_CASET   0x2A
#define ST7735_RASET   0x2B
#define ST7735_RAMWR   0x2C
#define ST7735_RAMRD   0x2E
#define ST7735_PTLAR   0x30
#define ST7735_VSCRDEF 0x33
#define ST7735_COLMOD  0x3A
#define ST7735_MADCTL  0x36
#define ST7735_MADCTL_MY 0x80
#define ST7735_MADCTL_MX 0x40
#define ST7735_MADCTL_MV 0x20
#define ST7735_MADCTL_ML 0x10
#define ST7735_MADCTL_RGB 0x00
#define ST7735_VSCRSADD 0x37
#define ST7735_FRMCTR1 0xB1
#define ST7735_FRMCTR2 0xB2
#define ST7735_FRMCTR3 0xB3
#define ST7735_INVCTR  0xB4
#define ST7735_DISSET5 0xB6
#define ST7735_PWCTR1  0xC0
#define ST7735_PWCTR2  0xC1
#define ST7735_PWCTR3  0xC2
#define ST7735_PWCTR4  0xC3
#define ST7735_PWCTR5  0xC4
#define ST7735_VMCTR1  0xC5
#define ST7735_RDID1   0xDA
#define ST7735_RDID2   0xDB
#define ST7735_RDID3   0xDC
#define ST7735_RDID4   0xDD
#define ST7735_PWCTR6  0xFC
#define ST7735_GMCTRP1 0xE0
#define ST7735_GMCTRN1 0xE1

// Color definitions
#define   ST7735_BLACK   0x0000
#define   ST7735_BLUE    0x001F
#define   ST7735_RED     0xF800
#define   ST7735_GREEN   0x07E0
#define   ST7735_CYAN    0x07FF
#define   ST7735_MAGENTA 0xF81F
#define   ST7735_YELLOW  0xFFE0
#define   ST7735_WHITE   0xFFFF


#define tft_cs_low()               asm volatile("nop \n nop \n nop"); \
                                   gpio_put(SPI_TFT_CS,0); \
                                   asm volatile("nop \n nop \n nop")
#define tft_cs_high()              asm volatile("nop \n nop \n nop"); \
                                   gpio_put(SPI_TFT_CS,1); \
                                   asm volatile("nop \n nop \n nop")

#define tft_dc_low()               asm volatile("nop \n nop \n nop"); \
                                   gpio_put(SPI_TFT_DC,0); \
                                   asm volatile("nop \n nop \n nop")
#define tft_dc_high()              asm volatile("nop \n nop \n nop"); \
                                   gpio_put(SPI_TFT_DC,1); \
                                   asm volatile("nop \n nop \n nop")

#define tft_rst_low()              asm volatile("nop \n nop \n nop"); \
                                   gpio_put(SPI_TFT_RST,0); \
                                   asm volatile("nop \n nop \n nop")
#define tft_rst_high()             asm volatile("nop \n nop \n nop"); \
                                   gpio_put(SPI_TFT_RST,1); \
                                   asm volatile("nop \n nop \n nop")

#include "pico/stdlib.h"
#include "hardware/spi.h"

static void spi_command(uint8_t x) {
  tft_dc_low();
  spi_write_blocking(SPI_TFT_PORT, &x, sizeof(x)); 
}
#define spi_data(...) {                                  \
  tft_dc_high();                                         \
  uint8_t data[] = { __VA_ARGS__ };                      \
  spi_write_blocking(SPI_TFT_PORT, data, sizeof(data)); }

// todo: consolidate spi_command and spi_data, use everywhere
static void write_command(uint8_t cmd_){
  tft_dc_low();
  tft_cs_low();
  spi_write_blocking(SPI_TFT_PORT, &cmd_, 1);
  tft_cs_high();
}
static void write_data(uint8_t data_){
  tft_dc_high();
  tft_cs_low();
  spi_write_blocking(SPI_TFT_PORT, &data_, 1);
  tft_cs_high();
}

static void st7735_fill_start() {
  tft_cs_low();

  spi_command(ST7735_CASET);
  spi_data(0x00, 0x00, 0x00, 0x7F);

  spi_command(ST7735_RASET);
  spi_data(0x00, 0x00, 0x00, 0x9F);

  spi_command(ST7735_RAMWR);
  tft_dc_high(); // (no data)
}

static void st7735_fill_send(uint16_t pixel) {
  spi_write_blocking(SPI_TFT_PORT, (uint8_t *)&pixel, sizeof(uint16_t));
}

static void st7735_fill_finish(void) {
  tft_cs_high();
}

static void st7735_reset() {
  tft_rst_high() ;
  sleep_ms(10);
  tft_rst_low();
  sleep_ms(10);
  tft_rst_high() ;
  sleep_ms(10);
}

static void st7735_init() {
  // enable backlight
  {
    gpio_init(17);
    gpio_set_dir(17, GPIO_OUT);
    gpio_put(17, 1);
  }

  // init SPI, gpio
  {
    // baud rate:
    spi_init(SPI_PORT, 30000000);

    gpio_set_function(SPI_RX, GPIO_FUNC_SPI);
    gpio_set_function(SPI_SCK,GPIO_FUNC_SPI);
    gpio_set_function(SPI_TX, GPIO_FUNC_SPI);

    // enable SPI
    gpio_init(SPI_TFT_CS);
    gpio_set_dir(SPI_TFT_CS, GPIO_OUT);
    gpio_put(SPI_TFT_CS, 1);                        // Chip select is active-low

    gpio_init(SPI_TFT_DC);
    gpio_set_dir(SPI_TFT_DC, GPIO_OUT);
    gpio_put(SPI_TFT_DC, 0);                        // Chip select is active-low

    gpio_init(SPI_TFT_RST);
    gpio_set_dir(SPI_TFT_RST, GPIO_OUT);
    gpio_put(SPI_TFT_RST, 0);
  }

  st7735_reset();

  tft_dc_low();

  // read screen data sheet to understand
  {
    write_command(ST7735_SWRESET);
    sleep_ms(150);
    write_command(ST7735_SLPOUT);
    sleep_ms(500);
    write_command(ST7735_FRMCTR1);
    write_data(0x01);
    write_data(0x2C);
    write_data(0x2D);
    write_command(ST7735_FRMCTR2);
    write_data(0x01);
    write_data(0x2C);
    write_data(0x2D);
    write_command(ST7735_FRMCTR3);
    write_data(0x01); write_data(0x2C); write_data(0x2D);
    write_data(0x01); write_data(0x2C); write_data(0x2D);
    write_command(ST7735_INVCTR);
    write_data(0x07);
    write_command(ST7735_PWCTR1);
    write_data(0xA2);
    write_data(0x02);
    write_data(0x84);
    write_command(ST7735_PWCTR2);
    write_data(0xC5);
    write_command(ST7735_PWCTR3);
    write_data(0x0A);
    write_data(0x00);
    write_command(ST7735_PWCTR4);
    write_data(0x8A);
    write_data(0x2A);
    write_command(ST7735_PWCTR5);
    write_data(0x8A);
    write_data(0xEE);
    write_command(ST7735_VMCTR1);
    write_data(0x0E);
    write_command(ST7735_INVOFF);
    write_command(ST7735_MADCTL);
    write_data(0x40 | 0x10 | 0x08);// 0xC8);
    write_command(ST7735_COLMOD);
    write_data(0x05); 
  }

  { // initializes red version
    write_command(ST7735_CASET);
    write_data(0x00); write_data(0x00);
    write_data(0x00); write_data(0x7F);
    write_command(ST7735_RASET);
    write_data(0x00); write_data(0x00);
    write_data(0x00); write_data(0x9F);
  }

  {
    write_command(ST7735_GMCTRP1);
    write_data(0x02); write_data(0x1C); write_data(0x07); write_data(0x12);
    write_data(0x37); write_data(0x32); write_data(0x29); write_data(0x2D);
    write_data(0x29); write_data(0x25); write_data(0x2B); write_data(0x39);
    write_data(0x00); write_data(0x01); write_data(0x03); write_data(0x10);
    write_command(ST7735_GMCTRN1);
    write_data(0x03); write_data(0x1D); write_data(0x07); write_data(0x06);
    write_data(0x2E); write_data(0x2C); write_data(0x29); write_data(0x2D);
    write_data(0x2E); write_data(0x2E); write_data(0x37); write_data(0x3F);
    write_data(0x00); write_data(0x00); write_data(0x02); write_data(0x10);
    write_command(ST7735_NORON);
    sleep_ms(10);
    write_command(ST7735_DISPON);
    sleep_ms(100);
  }
}
