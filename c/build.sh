mkdir -p build
cd build

# zig build-lib \
#   -O Debug \
#   -rdynamic \
#   -dynamic -target wasm32-freestanding ../base_engine.c

clang \
  --target=wasm32 \
  -O3 \
  -fvisibility=default \
  -flto \
  -nostdlib \
  -Wl,--export-all \
  -Wl,--no-entry \
  -Wl,--lto-O3 \
  -Wl,--allow-undefined \
  -Wall \
  -mbulk-memory \
  -o base_engine.wasm \
  ../base_engine.c

# ../wasm_sourcemap.py \
#   main.wasm \
#   --dwarfdump /usr/local/opt/llvm/bin/llvm-dwarfdump \
#   -s \
#   -w main.wasm \
#   -u main.wasm.map \
#   -o main.wasm.map
