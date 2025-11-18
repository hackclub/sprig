/* Copyright (c) 2022 Pico
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

#ifndef __NATIVE_MAGIC_STRINGS_H
	#define __NATIVE_MAGIC_STRINGS_H

	#define MSTR_NATIVE_setMap "setMap"
	#define MSTR_NATIVE_setBackground "setBackground"
	#define MSTR_NATIVE_getFirst "getFirst"
	#define MSTR_NATIVE_clearTile "clearTile"
	#define MSTR_NATIVE_addSprite "addSprite"
	#define MSTR_NATIVE_getTile "getTile"
	#define MSTR_NATIVE_getGrid "getGrid"
	#define MSTR_NATIVE_tilesWith "tilesWith"
	#define MSTR_NATIVE_text_add "text_add"
	#define MSTR_NATIVE_text_clear "text_clear"

	#define MSTR_NATIVE_width "width"
	#define MSTR_NATIVE_height "height"
	#define MSTR_NATIVE_getAll "getAll"

	#define MSTR_NATIVE_button_check "button_check"

	#define MSTR_NATIVE_map_clear_deltas "map_clear_deltas"

	#define MSTR_NATIVE_solids_push "solids_push"
	#define MSTR_NATIVE_solids_clear "solids_clear"

	#define MSTR_NATIVE_push_table_set "push_table_set"
	#define MSTR_NATIVE_push_table_clear "push_table_clear"

	#define MSTR_NATIVE_legend_doodle_set "legend_doodle_set"
	#define MSTR_NATIVE_legend_clear "legend_clear"
	#define MSTR_NATIVE_legend_prepare "legend_prepare"

	#define MSTR_NATIVE_press_cb "press_cb"
	#define MSTR_NATIVE_frame_cb "frame_cb"

	#define MSTR_NATIVE_piano_queue_song "piano_queue_song"
	#define MSTR_NATIVE_piano_unqueue_song "piano_unqueue_song"
	#define MSTR_NATIVE_piano_is_song_queued "piano_is_song_queued"
#endif
