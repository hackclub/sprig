/* my_debug.h
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
#pragma once

#include <stdio.h>

#ifdef __cplusplus
extern "C" {
#endif

    void my_printf(const char *pcFormat, ...) __attribute__((format(__printf__, 1, 2)));

    void my_assert_func(const char *file, int line, const char *func,
                        const char *pred);

#ifdef __cplusplus
}
#endif


#ifdef NDEBUG           /* required by ANSI standard */
# define DBG_PRINTF(fmt, args...) {} /* Don't do anything in release builds*/
#else
# define DBG_PRINTF my_printf
#endif

#ifdef NDEBUG           /* required by ANSI standard */
# define myASSERT(__e) ((void)0)
#else
# define myASSERT(__e) \
    ((__e) ? (void)0 : my_assert_func(__FILE__, __LINE__, __func__, #__e))
#endif