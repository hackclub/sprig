
for await (const { name: path, isFile } of Deno.readDir("./"))
  (async () => {
    let [, index, name] = path.match(/([0-9]+)-(.+)\.json$/) ?? [];
    if (name === undefined) return;
    index = +index;
    name = name.replace(/-/g, " ");

    const content = JSON.parse(await Deno.readTextFile(path));
    content.version = "0.2.3";
    content.name = name;
    await Deno.writeTextFile(path, JSON.stringify(content, null, 2));
  })();
