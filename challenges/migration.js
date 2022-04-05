for await (const { name: path, isFile } of Deno.readDir("./"))
  (async () => {
    let [, index, name] = path.match(/([0-9]+)-(.+)\.json$/) ?? [];
    if (name === undefined) return;
    index = +index;

    const content = JSON.parse(await Deno.readTextFile(path));
    content.version = "0.2.3";
    content.name = name.replace(/-/g, " ");
    await Deno.remove(path);
    await Deno.writeTextFile(
      `${(""+index).padStart(2, 0)}-${name}.json`,
      JSON.stringify(content, null, 2)
    );
  })();
