import os
import sys
import glob
import shutil

def split_files_into_batches(src_dir, dest_dir, batch_size=10):
    if not os.path.exists(dest_dir):
        os.makedirs(dest_dir)

    js_files = glob.glob(os.path.join(src_dir, "*.js"))
    total_files = len(js_files)
    
    for i in range(0, total_files, batch_size):
        batch_files = js_files[i:i + batch_size]
        batch_dir = os.path.join(dest_dir, f"batch_{i // batch_size + 1}")
        
        if not os.path.exists(batch_dir):
            os.makedirs(batch_dir)
        
        for file in batch_files:
            shutil.copy(file, batch_dir)
            print(f"Copied {file} to {batch_dir}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python split_into_batches.py <src_dir> <dest_dir>")
        sys.exit(1)

    src_dir = sys.argv[1]
    dest_dir = sys.argv[2]

    split_files_into_batches(src_dir, dest_dir)