/* my_debug.c
Copyright 2021 Carl John Kugler III

Licensed under the Apache License, Version 2.0 (the License); you may not use 
this file except in compliance with the License. You may obtain a copy of the 
License at

   http://www.apache.org/licenses/LICENSE-2.0 
Unless required by applicable law or agreed to in writing, software distributed 
under the License is distributed on an AS IS BASIS, WITHOUT WARRANTIES OR 
CONDITIONS OF ANY KIND, either express or implied. See the License for the 
specific language governing permissions and limitations under the License.
*/
#include <stdio.h>
#include <stdarg.h>
#include "my_debug.h"

void my_printf(const char *pcFormat, ...) {
    char pcBuffer[256] = {0};
    va_list xArgs;
    va_start(xArgs, pcFormat);
    vsnprintf(pcBuffer, sizeof(pcBuffer), pcFormat, xArgs);
    va_end(xArgs);
    printf("%s", pcBuffer);
    fflush(stdout);
}


void my_assert_func(const char *file, int line, const char *func,
                    const char *pred) {
    printf("assertion \"%s\" failed: file \"%s\", line %d, function: %s\n",
           pred, file, line, func);
    fflush(stdout);
    __asm volatile("cpsid i" : : : "memory"); /* Disable global interrupts. */
    while (1) {
        __asm("bkpt #0");
    };  // Stop in GUI as if at a breakpoint (if debugging, otherwise loop
        // forever)
}
