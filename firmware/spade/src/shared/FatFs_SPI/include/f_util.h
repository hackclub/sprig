/* f_util.h
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
#include "../ff15/source/ff.h"

#ifdef __cplusplus
extern "C" {
#endif

    const char *FRESULT_str(FRESULT i);
    FRESULT delete_node (
        TCHAR* path,    /* Path name buffer with the sub-directory to delete */
        UINT sz_buff,   /* Size of path name buffer (items) */
        FILINFO* fno    /* Name read buffer */
    );

#ifdef __cplusplus
}
#endif
