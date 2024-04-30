mkdir -p src/build

ls src/shared/sprig_engine/engine.js game.js | entr -s "echo 'building...' \
	&& uglifyjs src/shared/sprig_engine/engine.js -o src/build/engine.min.js \
	&& ./tools/cstringify.py src/build/engine.min.js > src/build/engine.min.js.cstring \
	&& ./tools/cstringify.py src/shared/sprig_engine/engine.js > src/build/engine.js.cstring \
	&& uglifyjs game.js -o game.min.js"