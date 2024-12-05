#ifndef C_SCAFFOLD_COMMON_H
#define C_SCAFFOLD_COMMON_H

#define SCREEN_SIZE_X (160)
#define SCREEN_SIZE_Y (128)

#define TEXT_CHARS_MAX_X (20)
#define TEXT_CHARS_MAX_Y (16)

#define ARR_LEN(arr) (sizeof(arr) / sizeof(arr[0]))

uint8_t flip_endianness(uint8_t in) {
    in = ((in & 0x0F) << 4) | ((in & 0xF0) >> 4);
    in = ((in & 0b00110011) << 2) | ((in & 0b11001100) >> 2);
    in = ((in & 0b01010101) << 1) | ((in & 0b10101010) >> 1);
    return in;
}

uint16_t color16(uint8_t r, uint8_t g, uint8_t b) {
    // arrange bits in 5-6-5 (BBBBBGGG GGGRRRRR)
    uint16_t result = ((b & 0b11111000) << 8) | ((g & 0b11111100) << 3) | (r >> 3);

    // swap bytes to conform to display endianness
    return ((result & 0x00FF) << 8) | ((result & 0xFF00) >> 8);
}


#endif //C_SCAFFOLD_COMMON_H