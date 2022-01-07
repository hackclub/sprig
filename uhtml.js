const __default = (_) => ({
  get: (key) => _.get(key),
  set: (key, value) => (_.set(key, value), value),
});
const attr = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/;
const empty =
  /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;
const node = /<[a-z][^>]+$/i;
const notNode = />[^<>]*$/;
const selfClosing = /<([a-z]+[a-z0-9:._-]*)([^>]*?)(\/>)/gi;
const trimEnd = /\s+$/;
const isNode = (template, i) =>
  0 < i-- &&
  (node.test(template[i]) ||
    (!notNode.test(template[i]) && isNode(template, i)));
const regular = (original, name, extra) =>
  empty.test(name)
    ? original
    : `<${name}${extra.replace(trimEnd, "")}></${name}>`;
const __default1 = (template, prefix, svg) => {
  const text = [];
  const { length } = template;
  for (let i = 1; i < length; i++) {
    const chunk = template[i - 1];
    text.push(
      attr.test(chunk) && isNode(template, i)
        ? chunk.replace(
            attr,
            (_, $1, $2) => `${prefix}${i - 1}=${$2 || '"'}${$1}${$2 ? "" : '"'}`
          )
        : `${chunk}<!--${prefix}${i - 1}-->`
    );
  }
  text.push(template[length - 1]);
  const output = text.join("").trim();
  return svg ? output : output.replace(selfClosing, regular);
};
const { isArray } = Array;
const { indexOf, slice } = [];
const remove = ({ firstChild, lastChild }) => {
  const range = document.createRange();
  range.setStartAfter(firstChild);
  range.setEndAfter(lastChild);
  range.deleteContents();
  return firstChild;
};
const diffable = (node1, operation) =>
  node1.nodeType === 111
    ? 1 / operation < 0
      ? operation
        ? remove(node1)
        : node1.lastChild
      : operation
      ? node1.valueOf()
      : node1.firstChild
    : node1;
const persistent = (fragment) => {
  const { childNodes } = fragment;
  const { length } = childNodes;
  if (length < 2) return length ? childNodes[0] : fragment;
  const nodes = slice.call(childNodes, 0);
  const firstChild = nodes[0];
  const lastChild = nodes[length - 1];
  return {
    ELEMENT_NODE: 1,
    nodeType: 111,
    firstChild,
    lastChild,
    valueOf() {
      if (childNodes.length !== length) {
        let i = 0;
        while (i < length) fragment.appendChild(nodes[i++]);
      }
      return fragment;
    },
  };
};
const __default2 = (parentNode, a, b, get, before) => {
  const bLength = b.length;
  let aEnd = a.length;
  let bEnd = bLength;
  let aStart = 0;
  let bStart = 0;
  let map = null;
  while (aStart < aEnd || bStart < bEnd) {
    if (aEnd === aStart) {
      const node1 =
        bEnd < bLength
          ? bStart
            ? get(b[bStart - 1], -0).nextSibling
            : get(b[bEnd - bStart], 0)
          : before;
      while (bStart < bEnd) parentNode.insertBefore(get(b[bStart++], 1), node1);
    } else if (bEnd === bStart) {
      while (aStart < aEnd) {
        if (!map || !map.has(a[aStart]))
          parentNode.removeChild(get(a[aStart], -1));
        aStart++;
      }
    } else if (a[aStart] === b[bStart]) {
      aStart++;
      bStart++;
    } else if (a[aEnd - 1] === b[bEnd - 1]) {
      aEnd--;
      bEnd--;
    } else if (a[aStart] === b[bEnd - 1] && b[bStart] === a[aEnd - 1]) {
      const node1 = get(a[--aEnd], -1).nextSibling;
      parentNode.insertBefore(
        get(b[bStart++], 1),
        get(a[aStart++], -1).nextSibling
      );
      parentNode.insertBefore(get(b[--bEnd], 1), node1);
      a[aEnd] = b[bEnd];
    } else {
      if (!map) {
        map = new Map();
        let i = bStart;
        while (i < bEnd) map.set(b[i], i++);
      }
      if (map.has(a[aStart])) {
        const index = map.get(a[aStart]);
        if (bStart < index && index < bEnd) {
          let i = aStart;
          let sequence = 1;
          while (++i < aEnd && i < bEnd && map.get(a[i]) === index + sequence)
            sequence++;
          if (sequence > index - bStart) {
            const node1 = get(a[aStart], 0);
            while (bStart < index)
              parentNode.insertBefore(get(b[bStart++], 1), node1);
          } else {
            parentNode.replaceChild(get(b[bStart++], 1), get(a[aStart++], -1));
          }
        } else aStart++;
      } else parentNode.removeChild(get(a[aStart++], -1));
    }
  }
  return b;
};
let useForeign = false;
class Foreign {
  constructor(handler, value) {
    useForeign = true;
    this._ = (...args) => handler(...args, value);
  }
}
const foreign1 = (handler1, value1) => new Foreign(handler1, value1);
const aria = (node1) => (values) => {
  for (const key in values) {
    const name = key === "role" ? key : `aria-${key}`;
    const value1 = values[key];
    if (value1 == null) node1.removeAttribute(name);
    else node1.setAttribute(name, value1);
  }
};
const attribute = (node1, name) => {
  let oldValue,
    orphan = true;
  const attributeNode = document.createAttributeNS(null, name);
  return (newValue) => {
    if (oldValue !== newValue) {
      oldValue = newValue;
      if (oldValue == null) {
        if (!orphan) {
          node1.removeAttributeNode(attributeNode);
          orphan = true;
        }
      } else {
        const value1 =
          useForeign && newValue instanceof Foreign
            ? newValue._(node1, name)
            : newValue;
        if (value1 == null) {
          if (!orphan) node1.removeAttributeNode(attributeNode);
          orphan = true;
        } else {
          attributeNode.value = value1;
          if (orphan) {
            node1.setAttributeNodeNS(attributeNode);
            orphan = false;
          }
        }
      }
    }
  };
};
const __boolean = (node1, key, oldValue) => (newValue) => {
  if (oldValue !== !!newValue) {
    if ((oldValue = !!newValue)) node1.setAttribute(key, "");
    else node1.removeAttribute(key);
  }
};
const data =
  ({ dataset }) =>
  (values) => {
    for (const key in values) {
      const value1 = values[key];
      if (value1 == null) delete dataset[key];
      else dataset[key] = value1;
    }
  };
const event = (node1, name) => {
  let oldValue,
    lower,
    type = name.slice(2);
  if (!(name in node1) && (lower = name.toLowerCase()) in node1)
    type = lower.slice(2);
  return (newValue) => {
    const info = isArray(newValue) ? newValue : [newValue, false];
    if (oldValue !== info[0]) {
      if (oldValue) node1.removeEventListener(type, oldValue, info[1]);
      if ((oldValue = info[0])) node1.addEventListener(type, oldValue, info[1]);
    }
  };
};
const ref1 = (node1) => {
  let oldValue;
  return (value1) => {
    if (oldValue !== value1) {
      oldValue = value1;
      if (typeof value1 === "function") value1(node1);
      else value1.current = node1;
    }
  };
};
const setter = (node1, key) =>
  key === "dataset"
    ? data(node1)
    : (value1) => {
        node1[key] = value1;
      };
const text = (node1) => {
  let oldValue;
  return (newValue) => {
    if (oldValue != newValue) {
      oldValue = newValue;
      node1.textContent = newValue == null ? "" : newValue;
    }
  };
};
const reducePath = ({ childNodes }, i) => childNodes[i];
const diff = (comment, oldNodes, newNodes) =>
  __default2(comment.parentNode, oldNodes, newNodes, diffable, comment);
const handleAnything = (comment) => {
  let oldValue,
    text1,
    nodes = [];
  const anyContent = (newValue) => {
    switch (typeof newValue) {
      case "string":
      case "number":
      case "boolean":
        if (oldValue !== newValue) {
          oldValue = newValue;
          if (!text1) text1 = document.createTextNode("");
          text1.data = newValue;
          nodes = diff(comment, nodes, [text1]);
        }
        break;
      case "object":
      case "undefined":
        if (newValue == null) {
          if (oldValue != newValue) {
            oldValue = newValue;
            nodes = diff(comment, nodes, []);
          }
          break;
        }
        if (isArray(newValue)) {
          oldValue = newValue;
          if (newValue.length === 0) nodes = diff(comment, nodes, []);
          else if (typeof newValue[0] === "object")
            nodes = diff(comment, nodes, newValue);
          else anyContent(String(newValue));
          break;
        }
        if (oldValue !== newValue && "ELEMENT_NODE" in newValue) {
          oldValue = newValue;
          nodes = diff(
            comment,
            nodes,
            newValue.nodeType === 11
              ? slice.call(newValue.childNodes)
              : [newValue]
          );
        }
        break;
      case "function":
        anyContent(newValue(comment));
        break;
    }
  };
  return anyContent;
};
const handleAttribute = (node1, name) => {
  switch (name[0]) {
    case "?":
      return __boolean(node1, name.slice(1), false);
    case ".":
      return setter(node1, name.slice(1));
    case "@":
      return event(node1, "on" + name.slice(1));
    case "o":
      if (name[1] === "n") return event(node1, name);
  }
  switch (name) {
    case "ref":
      return ref1(node1);
    case "aria":
      return aria(node1);
  }
  return attribute(node1, name);
};
function handlers(options) {
  const { type, path } = options;
  const node1 = path.reduceRight(reducePath, this);
  return type === "node"
    ? handleAnything(node1)
    : type === "attr"
    ? handleAttribute(node1, options.name)
    : text(node1);
}
var createContent = (function (document) {
  "use strict";
  var FRAGMENT = "fragment";
  var TEMPLATE = "template";
  var HAS_CONTENT = "content" in create(TEMPLATE);
  var createHTML = HAS_CONTENT
    ? function (html) {
        var template = create(TEMPLATE);
        template.innerHTML = html;
        return template.content;
      }
    : function (html) {
        var content = create(FRAGMENT);
        var template = create(TEMPLATE);
        var childNodes = null;
        if (/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(html)) {
          var selector = RegExp.$1;
          template.innerHTML = "<table>" + html + "</table>";
          childNodes = template.querySelectorAll(selector);
        } else {
          template.innerHTML = html;
          childNodes = template.childNodes;
        }
        append(content, childNodes);
        return content;
      };
  return function createContent1(markup, type) {
    return (type === "svg" ? createSVG : createHTML)(markup);
  };
  function append(root, childNodes) {
    var length = childNodes.length;
    while (length--) root.appendChild(childNodes[0]);
  }
  function create(element) {
    return element === FRAGMENT
      ? document.createDocumentFragment()
      : document.createElementNS("http://www.w3.org/1999/xhtml", element);
  }
  function createSVG(svg) {
    var content = create(FRAGMENT);
    var template = create("div");
    template.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg">' + svg + "</svg>";
    append(content, template.firstChild.childNodes);
    return content;
  }
})(document);
const isImportNodeLengthWrong = document.importNode.length != 1;
const createFragment = isImportNodeLengthWrong
  ? (text1, type, normalize) =>
      document.importNode(createContent(text1, type, normalize), true)
  : createContent;
const createWalker = isImportNodeLengthWrong
  ? (fragment) => document.createTreeWalker(fragment, 1 | 128, null, false)
  : (fragment) => document.createTreeWalker(fragment, 1 | 128);
const createPath = (node1) => {
  const path = [];
  let { parentNode } = node1;
  while (parentNode) {
    path.push(indexOf.call(parentNode.childNodes, node1));
    node1 = parentNode;
    parentNode = node1.parentNode;
  }
  return path;
};
const prefix = "isµ";
const cache = __default(new WeakMap());
const textOnly = /^(?:plaintext|script|style|textarea|title|xmp)$/i;
const createCache = () => ({
  stack: [],
  entry: null,
  wire: null,
});
const createEntry = (type, template) => {
  const { content, updates } = mapUpdates(type, template);
  return {
    type,
    template,
    content,
    updates,
    wire: null,
  };
};
const mapTemplate = (type, template) => {
  const text1 = __default1(template, prefix, type === "svg");
  const content = createFragment(text1, type);
  const tw = createWalker(content);
  const nodes = [];
  const length = template.length - 1;
  let i = 0;
  let search = `${prefix}${i}`;
  while (i < length) {
    const node1 = tw.nextNode();
    if (!node1) throw `bad template: ${text1}`;
    if (node1.nodeType === 8) {
      if (node1.data === search) {
        nodes.push({
          type: "node",
          path: createPath(node1),
        });
        search = `${prefix}${++i}`;
      }
    } else {
      while (node1.hasAttribute(search)) {
        nodes.push({
          type: "attr",
          path: createPath(node1),
          name: node1.getAttribute(search),
        });
        node1.removeAttribute(search);
        search = `${prefix}${++i}`;
      }
      if (
        textOnly.test(node1.tagName) &&
        node1.textContent.trim() === `<!--${search}-->`
      ) {
        node1.textContent = "";
        nodes.push({
          type: "text",
          path: createPath(node1),
        });
        search = `${prefix}${++i}`;
      }
    }
  }
  return {
    content,
    nodes,
  };
};
const mapUpdates = (type, template) => {
  const { content, nodes } =
    cache.get(template) || cache.set(template, mapTemplate(type, template));
  const fragment = document.importNode(content, true);
  const updates = nodes.map(handlers, fragment);
  return {
    content: fragment,
    updates,
  };
};
const unroll = (info, { type, template, values }) => {
  const { length } = values;
  unrollValues(info, values, length);
  let { entry } = info;
  if (!entry || entry.template !== template || entry.type !== type)
    info.entry = entry = createEntry(type, template);
  const { content, updates, wire } = entry;
  for (let i = 0; i < length; i++) updates[i](values[i]);
  return wire || (entry.wire = persistent(content));
};
const unrollValues = ({ stack }, values, length) => {
  for (let i = 0; i < length; i++) {
    const hole = values[i];
    if (hole instanceof Hole1)
      values[i] = unroll(stack[i] || (stack[i] = createCache()), hole);
    else if (isArray(hole))
      unrollValues(stack[i] || (stack[i] = createCache()), hole, hole.length);
    else stack[i] = null;
  }
  if (length < stack.length) stack.splice(length);
};
function Hole1(type, template, values) {
  this.type = type;
  this.template = template;
  this.values = values;
}
const { create, defineProperties } = Object;
const tag = (type) => {
  const keyed = __default(new WeakMap());
  const fixed =
    (cache1) =>
    (template, ...values) =>
      unroll(cache1, {
        type,
        template,
        values,
      });
  return defineProperties(
    (template, ...values) => new Hole1(type, template, values),
    {
      for: {
        value(ref, id) {
          const memo = keyed.get(ref) || keyed.set(ref, create(null));
          return memo[id] || (memo[id] = fixed(createCache()));
        },
      },
      node: {
        value: (template, ...values) =>
          unroll(createCache(), {
            type,
            template,
            values,
          }).valueOf(),
      },
    }
  );
};
const cache1 = __default(new WeakMap());
const render1 = (where, what) => {
  const hole = typeof what === "function" ? what() : what;
  const info = cache1.get(where) || cache1.set(where, createCache());
  const wire = hole instanceof Hole1 ? unroll(info, hole) : hole;
  if (wire !== info.wire) {
    info.wire = wire;
    where.textContent = "";
    where.appendChild(wire.valueOf());
  }
  return where;
};
const html1 = tag("html");
const svg1 = tag("svg");
export {
  Hole1 as Hole,
  render1 as render,
  html1 as html,
  svg1 as svg,
  foreign1 as foreign,
};
