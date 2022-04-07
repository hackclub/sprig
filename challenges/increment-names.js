for await (const { name: path, isFile } of Deno.readDir("./"))
  (async () => {
    let [, index, name] = path.match(/^([0-9]+)-(.+)\.json$/) ?? [];
    if (name === undefined) return;
    index = +index;

    if (index >= Deno.args[0])
      await Deno.rename(
        path,
        `${(index+1+"").padStart(2, 0)}-${name}.json`
      );
  })();
