import freetype

import freetype
import numpy as np


def get_glyph_bitmap(face, char, size=8):
    # Load the glyph
    face.set_pixel_sizes(size, size)
    face.load_char(char)
    bitmap = face.glyph.bitmap

    # Extract original glyph bitmap
    rows, cols = bitmap.rows, bitmap.width
    glyph_pixels = np.array(bitmap.buffer, dtype=np.uint8).reshape(rows, cols)

    # Create an empty 8x8 grid
    canvas = np.zeros((size, size), dtype=np.uint8)

    # --- Horizontal centering ---
    x_offset = (size - cols) // 2 if cols < size else 0

    # --- Vertical clamping (align to bottom) ---
    y_offset = size - rows

    # Paste glyph into the 8x8 grid
    canvas[y_offset:y_offset+rows, x_offset:x_offset+cols] = glyph_pixels

    return canvas


# Usage
face = freetype.Face("font.ttf")
a_bitmap = get_glyph_bitmap(face, "a")
b_bitmap = get_glyph_bitmap(face, "b")


def to_bytes_array(char_bitmap):
    arr = ''
    for row in char_bitmap:
        thing = "".join([str(i//255) for i in row])
        nh = format(int(thing, 2), 'X')
        nh = '0x' + f"{'0' if len(nh) == 1 else ''}{nh}"

        arr += nh + ', '

    return arr


def print_bitmap(arr):
    for row in arr:
        print("".join("#" if val > 0 else "." for val in row))
    print()


font_map = ''

for i in range(0, 256):
    char = chr(i)
    # print(char)
    bytes_arr = to_bytes_array(get_glyph_bitmap(face, char))
    # print_bitmap(get_glyph_bitmap(face, char))
    # print(bytes_arr)
    font_map += bytes_arr
    font_map += rf"// {format(i, 'X')} "
    font_map += '\n'

print(font_map)


"""
print("a:")
print_bitmap(a_bitmap)

print("b:")
print_bitmap(b_bitmap)
"""