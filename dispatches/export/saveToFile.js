export function saveToFile(name, content) {
  const blob = new Blob([content], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${name}`;


  link.click();
  URL.revokeObjectURL(link);

  // dispatch("NOTIFICATION", {
  //   message:
  //     "Your file has just been downloaded! Just drag it into the editor to load from your save",
  //   open: true,
  // });
}