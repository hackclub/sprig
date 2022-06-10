export function getTag(name, node, syntax, doc) {
  if (node.name !== "TaggedTemplateExpression") return;

  const identifier = syntax.resolve(node.from, 1);
  if (identifier?.name !== "VariableName") return;
  const identifierName = doc.sliceString(identifier.from, identifier.to);
  if (identifierName !== name) return;

  const templateString = identifier.nextSibling;
  if (templateString?.name !== "TemplateString") return;
  const templateStringText = doc.sliceString(templateString.from, templateString.to);
  if (!templateStringText.endsWith('`')) return;

  return {
    text: templateStringText.slice(1, -1),
    nameFrom: identifier.from,
    nameTo: identifier.to,
    textFrom: templateString.from + 1,
    textTo: templateString.to - 1
  };
}