import os
import sys
import glob
import shutil
from math import ceil

def split_files_into_batches(src_dir, dest_dir, total_batches):
    if not os.path.exists(dest_dir):
        os.makedirs(dest_dir)

    js_files = glob.glob(os.path.join(src_dir, "*.js"))
    total_files = len(js_files)
    batch_size = ceil(total_files / total_batches)

    print(f"Total files: {total_files}")
    print(f"Batch size: {batch_size}")
    print(f"Total batches: {total_batches}")

    for i in range(total_batches):
        batch_files = js_files[i * batch_size:(i + 1) * batch_size]
        batch_dir = os.path.join(dest_dir, f"batch_{i + 1}")
        
        if not os.path.exists(batch_dir):
            os.makedirs(batch_dir)
        
        for file in batch_files:
            shutil.copy(file, batch_dir)
            print(f"Copied {file} to {batch_dir}")

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python split_into_batches.py <src_dir> <dest_dir> <total_batches>")
        sys.exit(1)

    src_dir = sys.argv[1]
    dest_dir = sys.argv[2]
    total_batches = int(sys.argv[3])

    print(f"Source directory: {src_dir}")
    print(f"Destination directory: {dest_dir}")
    print(f"Total batches: {total_batches}")

    split_files_into_batches(src_dir, dest_dir, total_batches)