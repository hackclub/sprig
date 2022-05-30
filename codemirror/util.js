export function getTemplateFunctionText(name, node, syntax, doc) {
  if (node.name !== "CallExpression") return;

  const identifier = syntax.resolve(node.from, 1);
  if (identifier?.name !== "VariableName") return;
  const identifierName = doc.sliceString(identifier.from, identifier.to);
  if (identifierName !== name) return;

  const argList = identifier.parent.getChild("ArgList");
  if (!argList) return;
  const templateString = argList.firstChild.nextSibling;
  if (templateString?.name !== "TemplateString") return;

  const templateStringText = doc.sliceString(templateString.from, templateString.to);
  if (!templateStringText.endsWith('`')) return;

  return {
    text: templateStringText.slice(1, -1),
    from: templateString.from + 1,
    to: templateString.to - 1
  };
}