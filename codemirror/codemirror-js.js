(() => {
  // ../text/src/char.ts
  var extend = "lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17,3,3b,f,,w,1j,,,,4,8,4,,3,7,a,2,t,,1m,,,,2,4,8,,9,,a,2,q,,2,2,1l,,4,2,4,2,2,3,3,,u,2,3,,b,2,1l,,4,5,,2,4,,k,2,m,6,,,1m,,,2,,4,8,,7,3,a,2,u,,1n,,,,c,,9,,14,,3,,1l,3,5,3,,4,7,2,b,2,t,,1m,,2,,2,,3,,5,2,7,2,b,2,s,2,1l,2,,,2,4,8,,9,,a,2,t,,20,,4,,2,3,,,8,,29,,2,7,c,8,2q,,2,9,b,6,22,2,r,,,,,,1j,e,,5,,2,5,b,,10,9,,2u,4,,6,,2,2,2,p,2,4,3,g,4,d,,2,2,6,,f,,jj,3,qa,3,t,3,t,2,u,2,1s,2,,7,8,,2,b,9,,19,3,3b,2,y,,3a,3,4,2,9,,6,3,63,2,2,,1m,,,7,,,,,2,8,6,a,2,,1c,h,1r,4,1c,7,,,5,,14,9,c,2,w,4,2,2,,3,1k,,,2,3,,,3,1m,8,2,2,48,3,,d,,7,4,,6,,3,2,5i,1m,,5,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,p,2,5,,47,2,q,i,d,,12,8,p,b,1a,3,1c,,2,4,2,2,13,,1v,6,2,2,2,2,c,,8,,1b,,1f,,,3,2,2,5,2,,,16,2,8,,6m,,2,,4,,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,ar,2,49,b,4w,,1i,f,1k,3,1d,4,2,2,1x,3,10,5,,8,1q,,c,2,1g,9,a,4,2,,2n,3,2,,,2,6,,4g,,3,8,l,2,1l,2,,,,,m,,e,7,3,5,5f,8,2,3,,,n,,29,,2,6,,,2,,,2,,2,6j,,2,4,6,2,,2,r,2,2d,8,2,,,2,2y,,,,2,6,,,2t,3,2,4,,5,77,9,,2,6t,,a,2,,,4,,40,4,2,2,4,,w,a,14,6,2,4,8,,9,6,2,3,1a,d,,2,ba,7,,6,,,2a,m,2,7,,2,,2,3e,6,3,,,2,,7,,,20,2,3,,,,9n,2,f0b,5,1n,7,t4,,1r,4,29,,f5k,2,43q,,,3,4,5,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,79,7,c5,4,15s,7,31,7,240,5,gx7k,2o,3k,6o".split(",").map((s) => s ? parseInt(s, 36) : 1);
  for (let i = 1; i < extend.length; i++)
    extend[i] += extend[i - 1];
  function isExtendingChar(code) {
    for (let i = 1; i < extend.length; i += 2)
      if (extend[i] > code)
        return extend[i - 1] <= code;
    return false;
  }
  function isRegionalIndicator(code) {
    return code >= 127462 && code <= 127487;
  }
  var ZWJ = 8205;
  function findClusterBreak(str, pos, forward = true) {
    return (forward ? nextClusterBreak : prevClusterBreak)(str, pos);
  }
  function nextClusterBreak(str, pos) {
    if (pos == str.length)
      return pos;
    if (pos && surrogateLow(str.charCodeAt(pos)) && surrogateHigh(str.charCodeAt(pos - 1)))
      pos--;
    let prev = codePointAt(str, pos);
    pos += codePointSize(prev);
    while (pos < str.length) {
      let next = codePointAt(str, pos);
      if (prev == ZWJ || next == ZWJ || isExtendingChar(next)) {
        pos += codePointSize(next);
        prev = next;
      } else if (isRegionalIndicator(next)) {
        let countBefore = 0, i = pos - 2;
        while (i >= 0 && isRegionalIndicator(codePointAt(str, i))) {
          countBefore++;
          i -= 2;
        }
        if (countBefore % 2 == 0)
          break;
        else
          pos += 2;
      } else {
        break;
      }
    }
    return pos;
  }
  function prevClusterBreak(str, pos) {
    while (pos > 0) {
      let found = nextClusterBreak(str, pos - 2);
      if (found < pos)
        return found;
      pos--;
    }
    return 0;
  }
  function surrogateLow(ch) {
    return ch >= 56320 && ch < 57344;
  }
  function surrogateHigh(ch) {
    return ch >= 55296 && ch < 56320;
  }
  function codePointAt(str, pos) {
    let code0 = str.charCodeAt(pos);
    if (!surrogateHigh(code0) || pos + 1 == str.length)
      return code0;
    let code1 = str.charCodeAt(pos + 1);
    if (!surrogateLow(code1))
      return code0;
    return (code0 - 55296 << 10) + (code1 - 56320) + 65536;
  }
  function fromCodePoint(code) {
    if (code <= 65535)
      return String.fromCharCode(code);
    code -= 65536;
    return String.fromCharCode((code >> 10) + 55296, (code & 1023) + 56320);
  }
  function codePointSize(code) {
    return code < 65536 ? 1 : 2;
  }

  // ../text/src/column.ts
  function countColumn(string2, n, tabSize) {
    for (let i = 0; i < string2.length; ) {
      if (string2.charCodeAt(i) == 9) {
        n += tabSize - n % tabSize;
        i++;
      } else {
        n++;
        i = findClusterBreak(string2, i);
      }
    }
    return n;
  }
  function findColumn(string2, n, col, tabSize) {
    for (let i = 0; i < string2.length; ) {
      if (n >= col)
        return {offset: i, leftOver: 0};
      n += string2.charCodeAt(i) == 9 ? tabSize - n % tabSize : 1;
      i = findClusterBreak(string2, i);
    }
    return {offset: string2.length, leftOver: col - n};
  }

  // ../text/src/text.ts
  var Tree;
  (function(Tree6) {
    Tree6[Tree6["BranchShift"] = 5] = "BranchShift";
    Tree6[Tree6["Branch"] = 32] = "Branch";
  })(Tree || (Tree = {}));
  var Open;
  (function(Open2) {
    Open2[Open2["From"] = 1] = "From";
    Open2[Open2["To"] = 2] = "To";
  })(Open || (Open = {}));
  var _Text = class {
    lineAt(pos) {
      if (pos < 0 || pos > this.length)
        throw new RangeError(`Invalid position ${pos} in document of length ${this.length}`);
      return this.lineInner(pos, false, 1, 0);
    }
    line(n) {
      if (n < 1 || n > this.lines)
        throw new RangeError(`Invalid line number ${n} in ${this.lines}-line document`);
      return this.lineInner(n, true, 1, 0);
    }
    replace(from, to, text) {
      let parts = [];
      this.decompose(0, from, parts, 2);
      if (text.length)
        text.decompose(0, text.length, parts, 1 | 2);
      this.decompose(to, this.length, parts, 1);
      return TextNode.from(parts, this.length - (to - from) + text.length);
    }
    append(other) {
      return this.replace(this.length, this.length, other);
    }
    slice(from, to = this.length) {
      let parts = [];
      this.decompose(from, to, parts, 0);
      return TextNode.from(parts, to - from);
    }
    eq(other) {
      if (other == this)
        return true;
      if (other.length != this.length || other.lines != this.lines)
        return false;
      let a = new RawTextCursor(this), b = new RawTextCursor(other);
      for (; ; ) {
        a.next();
        b.next();
        if (a.lineBreak != b.lineBreak || a.done != b.done || a.value != b.value)
          return false;
        if (a.done)
          return true;
      }
    }
    iter(dir = 1) {
      return new RawTextCursor(this, dir);
    }
    iterRange(from, to = this.length) {
      return new PartialTextCursor(this, from, to);
    }
    toString() {
      return this.sliceString(0);
    }
    toJSON() {
      let lines = [];
      this.flatten(lines);
      return lines;
    }
    constructor() {
    }
    static of(text) {
      if (text.length == 0)
        throw new RangeError("A document must have at least one line");
      if (text.length == 1 && !text[0])
        return _Text.empty;
      return text.length <= 32 ? new TextLeaf(text) : TextNode.from(TextLeaf.split(text, []));
    }
  };
  var Text = _Text;
  Symbol.iterator;
  if (typeof Symbol != "undefined")
    Text.prototype[Symbol.iterator] = function() {
      return this.iter();
    };
  var TextLeaf = class extends Text {
    constructor(text, length = textLength(text)) {
      super();
      this.text = text;
      this.length = length;
    }
    get lines() {
      return this.text.length;
    }
    get children() {
      return null;
    }
    lineInner(target, isLine, line, offset) {
      for (let i = 0; ; i++) {
        let string2 = this.text[i], end = offset + string2.length;
        if ((isLine ? line : end) >= target)
          return new Line(offset, end, line, string2);
        offset = end + 1;
        line++;
      }
    }
    decompose(from, to, target, open) {
      let text = from <= 0 && to >= this.length ? this : new TextLeaf(sliceText(this.text, from, to), Math.min(to, this.length) - Math.max(0, from));
      if (open & 1) {
        let prev = target.pop();
        let joined = appendText(text.text, prev.text.slice(), 0, text.length);
        if (joined.length <= 32) {
          target.push(new TextLeaf(joined, prev.length + text.length));
        } else {
          let mid = joined.length >> 1;
          target.push(new TextLeaf(joined.slice(0, mid)), new TextLeaf(joined.slice(mid)));
        }
      } else {
        target.push(text);
      }
    }
    replace(from, to, text) {
      if (!(text instanceof TextLeaf))
        return super.replace(from, to, text);
      let lines = appendText(this.text, appendText(text.text, sliceText(this.text, 0, from)), to);
      let newLen = this.length + text.length - (to - from);
      if (lines.length <= 32)
        return new TextLeaf(lines, newLen);
      return TextNode.from(TextLeaf.split(lines, []), newLen);
    }
    sliceString(from, to = this.length, lineSep = "\n") {
      let result = "";
      for (let pos = 0, i = 0; pos <= to && i < this.text.length; i++) {
        let line = this.text[i], end = pos + line.length;
        if (pos > from && i)
          result += lineSep;
        if (from < end && to > pos)
          result += line.slice(Math.max(0, from - pos), to - pos);
        pos = end + 1;
      }
      return result;
    }
    flatten(target) {
      for (let line of this.text)
        target.push(line);
    }
    static split(text, target) {
      let part = [], len = -1;
      for (let line of text) {
        part.push(line);
        len += line.length + 1;
        if (part.length == 32) {
          target.push(new TextLeaf(part, len));
          part = [];
          len = -1;
        }
      }
      if (len > -1)
        target.push(new TextLeaf(part, len));
      return target;
    }
  };
  var TextNode = class extends Text {
    constructor(children, length) {
      super();
      this.children = children;
      this.length = length;
      this.lines = 0;
      for (let child of children)
        this.lines += child.lines;
    }
    lineInner(target, isLine, line, offset) {
      for (let i = 0; ; i++) {
        let child = this.children[i], end = offset + child.length, endLine = line + child.lines - 1;
        if ((isLine ? endLine : end) >= target)
          return child.lineInner(target, isLine, line, offset);
        offset = end + 1;
        line = endLine + 1;
      }
    }
    decompose(from, to, target, open) {
      for (let i = 0, pos = 0; pos <= to && i < this.children.length; i++) {
        let child = this.children[i], end = pos + child.length;
        if (from <= end && to >= pos) {
          let childOpen = open & ((pos <= from ? 1 : 0) | (end >= to ? 2 : 0));
          if (pos >= from && end <= to && !childOpen)
            target.push(child);
          else
            child.decompose(from - pos, to - pos, target, childOpen);
        }
        pos = end + 1;
      }
    }
    replace(from, to, text) {
      if (text.lines < this.lines)
        for (let i = 0, pos = 0; i < this.children.length; i++) {
          let child = this.children[i], end = pos + child.length;
          if (from >= pos && to <= end) {
            let updated = child.replace(from - pos, to - pos, text);
            let totalLines = this.lines - child.lines + updated.lines;
            if (updated.lines < totalLines >> 5 - 1 && updated.lines > totalLines >> 5 + 1) {
              let copy = this.children.slice();
              copy[i] = updated;
              return new TextNode(copy, this.length - (to - from) + text.length);
            }
            return super.replace(pos, end, updated);
          }
          pos = end + 1;
        }
      return super.replace(from, to, text);
    }
    sliceString(from, to = this.length, lineSep = "\n") {
      let result = "";
      for (let i = 0, pos = 0; i < this.children.length && pos <= to; i++) {
        let child = this.children[i], end = pos + child.length;
        if (pos > from && i)
          result += lineSep;
        if (from < end && to > pos)
          result += child.sliceString(from - pos, to - pos, lineSep);
        pos = end + 1;
      }
      return result;
    }
    flatten(target) {
      for (let child of this.children)
        child.flatten(target);
    }
    static from(children, length = children.reduce((l, ch) => l + ch.length + 1, -1)) {
      let lines = 0;
      for (let ch of children)
        lines += ch.lines;
      if (lines < 32) {
        let flat = [];
        for (let ch of children)
          ch.flatten(flat);
        return new TextLeaf(flat, length);
      }
      let chunk = Math.max(32, lines >> 5), maxChunk = chunk << 1, minChunk = chunk >> 1;
      let chunked = [], currentLines = 0, currentLen = -1, currentChunk = [];
      function add2(child) {
        let last;
        if (child.lines > maxChunk && child instanceof TextNode) {
          for (let node of child.children)
            add2(node);
        } else if (child.lines > minChunk && (currentLines > minChunk || !currentLines)) {
          flush();
          chunked.push(child);
        } else if (child instanceof TextLeaf && currentLines && (last = currentChunk[currentChunk.length - 1]) instanceof TextLeaf && child.lines + last.lines <= 32) {
          currentLines += child.lines;
          currentLen += child.length + 1;
          currentChunk[currentChunk.length - 1] = new TextLeaf(last.text.concat(child.text), last.length + 1 + child.length);
        } else {
          if (currentLines + child.lines > chunk)
            flush();
          currentLines += child.lines;
          currentLen += child.length + 1;
          currentChunk.push(child);
        }
      }
      function flush() {
        if (currentLines == 0)
          return;
        chunked.push(currentChunk.length == 1 ? currentChunk[0] : TextNode.from(currentChunk, currentLen));
        currentLen = -1;
        currentLines = currentChunk.length = 0;
      }
      for (let child of children)
        add2(child);
      flush();
      return chunked.length == 1 ? chunked[0] : new TextNode(chunked, length);
    }
  };
  Text.empty = new TextLeaf([""], 0);
  function textLength(text) {
    let length = -1;
    for (let line of text)
      length += line.length + 1;
    return length;
  }
  function appendText(text, target, from = 0, to = 1e9) {
    for (let pos = 0, i = 0, first = true; i < text.length && pos <= to; i++) {
      let line = text[i], end = pos + line.length;
      if (end >= from) {
        if (end > to)
          line = line.slice(0, to - pos);
        if (pos < from)
          line = line.slice(from - pos);
        if (first) {
          target[target.length - 1] += line;
          first = false;
        } else
          target.push(line);
      }
      pos = end + 1;
    }
    return target;
  }
  function sliceText(text, from, to) {
    return appendText(text, [""], from, to);
  }
  var RawTextCursor = class {
    constructor(text, dir = 1) {
      this.dir = dir;
      this.done = false;
      this.lineBreak = false;
      this.value = "";
      this.nodes = [text];
      this.offsets = [dir > 0 ? 0 : text instanceof TextLeaf ? text.text.length : text.children.length];
    }
    next(skip = 0) {
      for (; ; ) {
        let last = this.nodes.length - 1;
        if (last < 0) {
          this.done = true;
          this.value = "";
          this.lineBreak = false;
          return this;
        }
        let top2 = this.nodes[last], offset = this.offsets[last];
        let size = top2 instanceof TextLeaf ? top2.text.length : top2.children.length;
        if (offset == (this.dir > 0 ? size : 0)) {
          this.nodes.pop();
          this.offsets.pop();
        } else if (!this.lineBreak && offset != (this.dir > 0 ? 0 : size)) {
          this.lineBreak = true;
          if (skip == 0) {
            this.value = "\n";
            return this;
          }
          skip--;
        } else if (top2 instanceof TextLeaf) {
          let next = top2.text[offset - (this.dir < 0 ? 1 : 0)];
          this.offsets[last] = offset += this.dir;
          this.lineBreak = false;
          if (next.length > Math.max(0, skip)) {
            this.value = skip == 0 ? next : this.dir > 0 ? next.slice(skip) : next.slice(0, next.length - skip);
            return this;
          }
          skip -= next.length;
        } else {
          let next = top2.children[this.dir > 0 ? offset : offset - 1];
          this.offsets[last] = offset + this.dir;
          this.lineBreak = false;
          if (skip > next.length) {
            skip -= next.length;
          } else {
            this.nodes.push(next);
            this.offsets.push(this.dir > 0 ? 0 : next instanceof TextLeaf ? next.text.length : next.children.length);
          }
        }
      }
    }
  };
  var PartialTextCursor = class {
    constructor(text, start, end) {
      this.value = "";
      this.cursor = new RawTextCursor(text, start > end ? -1 : 1);
      if (start > end) {
        this.skip = text.length - start;
        this.limit = start - end;
      } else {
        this.skip = start;
        this.limit = end - start;
      }
    }
    next(skip = 0) {
      if (this.limit <= 0) {
        this.limit = -1;
      } else {
        let {value, lineBreak, done} = this.cursor.next(this.skip + skip);
        this.skip = 0;
        this.value = value;
        let len = lineBreak ? 1 : value.length;
        if (len > this.limit)
          this.value = this.cursor.dir > 0 ? value.slice(0, this.limit) : value.slice(len - this.limit);
        if (done || this.value.length == 0)
          this.limit = -1;
        else
          this.limit -= this.value.length;
      }
      return this;
    }
    get lineBreak() {
      return this.cursor.lineBreak;
    }
    get done() {
      return this.limit < 0;
    }
  };
  var Line = class {
    constructor(from, to, number2, text) {
      this.from = from;
      this.to = to;
      this.number = number2;
      this.text = text;
    }
    get length() {
      return this.to - this.from;
    }
  };

  // ../state/src/change.ts
  var DefaultSplit = /\r\n?|\n/;
  var MapMode;
  (function(MapMode2) {
    MapMode2[MapMode2["Simple"] = 0] = "Simple";
    MapMode2[MapMode2["TrackDel"] = 1] = "TrackDel";
    MapMode2[MapMode2["TrackBefore"] = 2] = "TrackBefore";
    MapMode2[MapMode2["TrackAfter"] = 3] = "TrackAfter";
  })(MapMode || (MapMode = {}));
  var ChangeDesc = class {
    constructor(sections) {
      this.sections = sections;
    }
    get length() {
      let result = 0;
      for (let i = 0; i < this.sections.length; i += 2)
        result += this.sections[i];
      return result;
    }
    get newLength() {
      let result = 0;
      for (let i = 0; i < this.sections.length; i += 2) {
        let ins = this.sections[i + 1];
        result += ins < 0 ? this.sections[i] : ins;
      }
      return result;
    }
    get empty() {
      return this.sections.length == 0 || this.sections.length == 2 && this.sections[1] < 0;
    }
    iterGaps(f) {
      for (let i = 0, posA = 0, posB = 0; i < this.sections.length; ) {
        let len = this.sections[i++], ins = this.sections[i++];
        if (ins < 0) {
          f(posA, posB, len);
          posB += len;
        } else {
          posB += ins;
        }
        posA += len;
      }
    }
    iterChangedRanges(f, individual = false) {
      iterChanges(this, f, individual);
    }
    get invertedDesc() {
      let sections = [];
      for (let i = 0; i < this.sections.length; ) {
        let len = this.sections[i++], ins = this.sections[i++];
        if (ins < 0)
          sections.push(len, ins);
        else
          sections.push(ins, len);
      }
      return new ChangeDesc(sections);
    }
    composeDesc(other) {
      return this.empty ? other : other.empty ? this : composeSets(this, other);
    }
    mapDesc(other, before = false) {
      return other.empty ? this : mapSet(this, other, before);
    }
    mapPos(pos, assoc = -1, mode = 0) {
      let posA = 0, posB = 0;
      for (let i = 0; i < this.sections.length; ) {
        let len = this.sections[i++], ins = this.sections[i++], endA = posA + len;
        if (ins < 0) {
          if (endA > pos)
            return posB + (pos - posA);
          posB += len;
        } else {
          if (mode != 0 && endA >= pos && (mode == 1 && posA < pos && endA > pos || mode == 2 && posA < pos || mode == 3 && endA > pos))
            return null;
          if (endA > pos || endA == pos && assoc < 0 && !len)
            return pos == posA || assoc < 0 ? posB : posB + ins;
          posB += ins;
        }
        posA = endA;
      }
      if (pos > posA)
        throw new RangeError(`Position ${pos} is out of range for changeset of length ${posA}`);
      return posB;
    }
    touchesRange(from, to = from) {
      for (let i = 0, pos = 0; i < this.sections.length && pos <= to; ) {
        let len = this.sections[i++], ins = this.sections[i++], end = pos + len;
        if (ins >= 0 && pos <= to && end >= from)
          return pos < from && end > to ? "cover" : true;
        pos = end;
      }
      return false;
    }
    toString() {
      let result = "";
      for (let i = 0; i < this.sections.length; ) {
        let len = this.sections[i++], ins = this.sections[i++];
        result += (result ? " " : "") + len + (ins >= 0 ? ":" + ins : "");
      }
      return result;
    }
    toJSON() {
      return this.sections;
    }
    static fromJSON(json) {
      if (!Array.isArray(json) || json.length % 2 || json.some((a) => typeof a != "number"))
        throw new RangeError("Invalid JSON representation of ChangeDesc");
      return new ChangeDesc(json);
    }
  };
  var ChangeSet = class extends ChangeDesc {
    constructor(sections, inserted) {
      super(sections);
      this.inserted = inserted;
    }
    apply(doc2) {
      if (this.length != doc2.length)
        throw new RangeError("Applying change set to a document with the wrong length");
      iterChanges(this, (fromA, toA, fromB, _toB, text) => doc2 = doc2.replace(fromB, fromB + (toA - fromA), text), false);
      return doc2;
    }
    mapDesc(other, before = false) {
      return mapSet(this, other, before, true);
    }
    invert(doc2) {
      let sections = this.sections.slice(), inserted = [];
      for (let i = 0, pos = 0; i < sections.length; i += 2) {
        let len = sections[i], ins = sections[i + 1];
        if (ins >= 0) {
          sections[i] = ins;
          sections[i + 1] = len;
          let index = i >> 1;
          while (inserted.length < index)
            inserted.push(Text.empty);
          inserted.push(len ? doc2.slice(pos, pos + len) : Text.empty);
        }
        pos += len;
      }
      return new ChangeSet(sections, inserted);
    }
    compose(other) {
      return this.empty ? other : other.empty ? this : composeSets(this, other, true);
    }
    map(other, before = false) {
      return other.empty ? this : mapSet(this, other, before, true);
    }
    iterChanges(f, individual = false) {
      iterChanges(this, f, individual);
    }
    get desc() {
      return new ChangeDesc(this.sections);
    }
    filter(ranges) {
      let resultSections = [], resultInserted = [], filteredSections = [];
      let iter = new SectionIter(this);
      done:
        for (let i = 0, pos = 0; ; ) {
          let next = i == ranges.length ? 1e9 : ranges[i++];
          while (pos < next || pos == next && iter.len == 0) {
            if (iter.done)
              break done;
            let len = Math.min(iter.len, next - pos);
            addSection(filteredSections, len, -1);
            let ins = iter.ins == -1 ? -1 : iter.off == 0 ? iter.ins : 0;
            addSection(resultSections, len, ins);
            if (ins > 0)
              addInsert(resultInserted, resultSections, iter.text);
            iter.forward(len);
            pos += len;
          }
          let end = ranges[i++];
          while (pos < end) {
            if (iter.done)
              break done;
            let len = Math.min(iter.len, end - pos);
            addSection(resultSections, len, -1);
            addSection(filteredSections, len, iter.ins == -1 ? -1 : iter.off == 0 ? iter.ins : 0);
            iter.forward(len);
            pos += len;
          }
        }
      return {
        changes: new ChangeSet(resultSections, resultInserted),
        filtered: new ChangeDesc(filteredSections)
      };
    }
    toJSON() {
      let parts = [];
      for (let i = 0; i < this.sections.length; i += 2) {
        let len = this.sections[i], ins = this.sections[i + 1];
        if (ins < 0)
          parts.push(len);
        else if (ins == 0)
          parts.push([len]);
        else
          parts.push([len].concat(this.inserted[i >> 1].toJSON()));
      }
      return parts;
    }
    static of(changes, length, lineSep) {
      let sections = [], inserted = [], pos = 0;
      let total = null;
      function flush(force = false) {
        if (!force && !sections.length)
          return;
        if (pos < length)
          addSection(sections, length - pos, -1);
        let set = new ChangeSet(sections, inserted);
        total = total ? total.compose(set.map(total)) : set;
        sections = [];
        inserted = [];
        pos = 0;
      }
      function process2(spec) {
        if (Array.isArray(spec)) {
          for (let sub of spec)
            process2(sub);
        } else if (spec instanceof ChangeSet) {
          if (spec.length != length)
            throw new RangeError(`Mismatched change set length (got ${spec.length}, expected ${length})`);
          flush();
          total = total ? total.compose(spec.map(total)) : spec;
        } else {
          let {from, to = from, insert: insert2} = spec;
          if (from > to || from < 0 || to > length)
            throw new RangeError(`Invalid change range ${from} to ${to} (in doc of length ${length})`);
          let insText = !insert2 ? Text.empty : typeof insert2 == "string" ? Text.of(insert2.split(lineSep || DefaultSplit)) : insert2;
          let insLen = insText.length;
          if (from == to && insLen == 0)
            return;
          if (from < pos)
            flush();
          if (from > pos)
            addSection(sections, from - pos, -1);
          addSection(sections, to - from, insLen);
          addInsert(inserted, sections, insText);
          pos = to;
        }
      }
      process2(changes);
      flush(!total);
      return total;
    }
    static empty(length) {
      return new ChangeSet(length ? [length, -1] : [], []);
    }
    static fromJSON(json) {
      if (!Array.isArray(json))
        throw new RangeError("Invalid JSON representation of ChangeSet");
      let sections = [], inserted = [];
      for (let i = 0; i < json.length; i++) {
        let part = json[i];
        if (typeof part == "number") {
          sections.push(part, -1);
        } else if (!Array.isArray(part) || typeof part[0] != "number" || part.some((e, i2) => i2 && typeof e != "string")) {
          throw new RangeError("Invalid JSON representation of ChangeSet");
        } else if (part.length == 1) {
          sections.push(part[0], 0);
        } else {
          while (inserted.length < i)
            inserted.push(Text.empty);
          inserted[i] = Text.of(part.slice(1));
          sections.push(part[0], inserted[i].length);
        }
      }
      return new ChangeSet(sections, inserted);
    }
  };
  function addSection(sections, len, ins, forceJoin = false) {
    if (len == 0 && ins <= 0)
      return;
    let last = sections.length - 2;
    if (last >= 0 && ins <= 0 && ins == sections[last + 1])
      sections[last] += len;
    else if (len == 0 && sections[last] == 0)
      sections[last + 1] += ins;
    else if (forceJoin) {
      sections[last] += len;
      sections[last + 1] += ins;
    } else
      sections.push(len, ins);
  }
  function addInsert(values, sections, value) {
    if (value.length == 0)
      return;
    let index = sections.length - 2 >> 1;
    if (index < values.length) {
      values[values.length - 1] = values[values.length - 1].append(value);
    } else {
      while (values.length < index)
        values.push(Text.empty);
      values.push(value);
    }
  }
  function iterChanges(desc, f, individual) {
    let inserted = desc.inserted;
    for (let posA = 0, posB = 0, i = 0; i < desc.sections.length; ) {
      let len = desc.sections[i++], ins = desc.sections[i++];
      if (ins < 0) {
        posA += len;
        posB += len;
      } else {
        let endA = posA, endB = posB, text = Text.empty;
        for (; ; ) {
          endA += len;
          endB += ins;
          if (ins && inserted)
            text = text.append(inserted[i - 2 >> 1]);
          if (individual || i == desc.sections.length || desc.sections[i + 1] < 0)
            break;
          len = desc.sections[i++];
          ins = desc.sections[i++];
        }
        f(posA, endA, posB, endB, text);
        posA = endA;
        posB = endB;
      }
    }
  }
  function mapSet(setA, setB, before, mkSet = false) {
    let sections = [], insert2 = mkSet ? [] : null;
    let a = new SectionIter(setA), b = new SectionIter(setB);
    for (let posA = 0, posB = 0; ; ) {
      if (a.ins == -1) {
        posA += a.len;
        a.next();
      } else if (b.ins == -1 && posB < posA) {
        let skip = Math.min(b.len, posA - posB);
        b.forward(skip);
        addSection(sections, skip, -1);
        posB += skip;
      } else if (b.ins >= 0 && (a.done || posB < posA || posB == posA && (b.len < a.len || b.len == a.len && !before))) {
        addSection(sections, b.ins, -1);
        while (posA > posB && !a.done && posA + a.len < posB + b.len) {
          posA += a.len;
          a.next();
        }
        posB += b.len;
        b.next();
      } else if (a.ins >= 0) {
        let len = 0, end = posA + a.len;
        for (; ; ) {
          if (b.ins >= 0 && posB > posA && posB + b.len < end) {
            len += b.ins;
            posB += b.len;
            b.next();
          } else if (b.ins == -1 && posB < end) {
            let skip = Math.min(b.len, end - posB);
            len += skip;
            b.forward(skip);
            posB += skip;
          } else {
            break;
          }
        }
        addSection(sections, len, a.ins);
        if (insert2)
          addInsert(insert2, sections, a.text);
        posA = end;
        a.next();
      } else if (a.done && b.done) {
        return insert2 ? new ChangeSet(sections, insert2) : new ChangeDesc(sections);
      } else {
        throw new Error("Mismatched change set lengths");
      }
    }
  }
  function composeSets(setA, setB, mkSet = false) {
    let sections = [];
    let insert2 = mkSet ? [] : null;
    let a = new SectionIter(setA), b = new SectionIter(setB);
    for (let open = false; ; ) {
      if (a.done && b.done) {
        return insert2 ? new ChangeSet(sections, insert2) : new ChangeDesc(sections);
      } else if (a.ins == 0) {
        addSection(sections, a.len, 0, open);
        a.next();
      } else if (b.len == 0 && !b.done) {
        addSection(sections, 0, b.ins, open);
        if (insert2)
          addInsert(insert2, sections, b.text);
        b.next();
      } else if (a.done || b.done) {
        throw new Error("Mismatched change set lengths");
      } else {
        let len = Math.min(a.len2, b.len), sectionLen = sections.length;
        if (a.ins == -1) {
          let insB = b.ins == -1 ? -1 : b.off ? 0 : b.ins;
          addSection(sections, len, insB, open);
          if (insert2 && insB)
            addInsert(insert2, sections, b.text);
        } else if (b.ins == -1) {
          addSection(sections, a.off ? 0 : a.len, len, open);
          if (insert2)
            addInsert(insert2, sections, a.textBit(len));
        } else {
          addSection(sections, a.off ? 0 : a.len, b.off ? 0 : b.ins, open);
          if (insert2 && !b.off)
            addInsert(insert2, sections, b.text);
        }
        open = (a.ins > len || b.ins >= 0 && b.len > len) && (open || sections.length > sectionLen);
        a.forward2(len);
        b.forward(len);
      }
    }
  }
  var SectionIter = class {
    constructor(set) {
      this.set = set;
      this.i = 0;
      this.next();
    }
    next() {
      let {sections} = this.set;
      if (this.i < sections.length) {
        this.len = sections[this.i++];
        this.ins = sections[this.i++];
      } else {
        this.len = 0;
        this.ins = -2;
      }
      this.off = 0;
    }
    get done() {
      return this.ins == -2;
    }
    get len2() {
      return this.ins < 0 ? this.len : this.ins;
    }
    get text() {
      let {inserted} = this.set, index = this.i - 2 >> 1;
      return index >= inserted.length ? Text.empty : inserted[index];
    }
    textBit(len) {
      let {inserted} = this.set, index = this.i - 2 >> 1;
      return index >= inserted.length && !len ? Text.empty : inserted[index].slice(this.off, len == null ? void 0 : this.off + len);
    }
    forward(len) {
      if (len == this.len)
        this.next();
      else {
        this.len -= len;
        this.off += len;
      }
    }
    forward2(len) {
      if (this.ins == -1)
        this.forward(len);
      else if (len == this.ins)
        this.next();
      else {
        this.ins -= len;
        this.off += len;
      }
    }
  };

  // ../state/src/selection.ts
  var RangeFlag;
  (function(RangeFlag2) {
    RangeFlag2[RangeFlag2["BidiLevelMask"] = 3] = "BidiLevelMask";
    RangeFlag2[RangeFlag2["AssocBefore"] = 4] = "AssocBefore";
    RangeFlag2[RangeFlag2["AssocAfter"] = 8] = "AssocAfter";
    RangeFlag2[RangeFlag2["Inverted"] = 16] = "Inverted";
    RangeFlag2[RangeFlag2["GoalColumnOffset"] = 5] = "GoalColumnOffset";
    RangeFlag2[RangeFlag2["NoGoalColumn"] = 33554431] = "NoGoalColumn";
  })(RangeFlag || (RangeFlag = {}));
  var SelectionRange = class {
    constructor(from, to, flags) {
      this.from = from;
      this.to = to;
      this.flags = flags;
    }
    get anchor() {
      return this.flags & 16 ? this.to : this.from;
    }
    get head() {
      return this.flags & 16 ? this.from : this.to;
    }
    get empty() {
      return this.from == this.to;
    }
    get assoc() {
      return this.flags & 4 ? -1 : this.flags & 8 ? 1 : 0;
    }
    get bidiLevel() {
      let level = this.flags & 3;
      return level == 3 ? null : level;
    }
    get goalColumn() {
      let value = this.flags >> 5;
      return value == 33554431 ? void 0 : value;
    }
    map(change, assoc = -1) {
      let from = change.mapPos(this.from, assoc), to = change.mapPos(this.to, assoc);
      return from == this.from && to == this.to ? this : new SelectionRange(from, to, this.flags);
    }
    extend(from, to = from) {
      if (from <= this.anchor && to >= this.anchor)
        return EditorSelection.range(from, to);
      let head = Math.abs(from - this.anchor) > Math.abs(to - this.anchor) ? from : to;
      return EditorSelection.range(this.anchor, head);
    }
    eq(other) {
      return this.anchor == other.anchor && this.head == other.head;
    }
    toJSON() {
      return {anchor: this.anchor, head: this.head};
    }
    static fromJSON(json) {
      if (!json || typeof json.anchor != "number" || typeof json.head != "number")
        throw new RangeError("Invalid JSON representation for SelectionRange");
      return EditorSelection.range(json.anchor, json.head);
    }
  };
  var EditorSelection = class {
    constructor(ranges, mainIndex = 0) {
      this.ranges = ranges;
      this.mainIndex = mainIndex;
    }
    map(change, assoc = -1) {
      if (change.empty)
        return this;
      return EditorSelection.create(this.ranges.map((r) => r.map(change, assoc)), this.mainIndex);
    }
    eq(other) {
      if (this.ranges.length != other.ranges.length || this.mainIndex != other.mainIndex)
        return false;
      for (let i = 0; i < this.ranges.length; i++)
        if (!this.ranges[i].eq(other.ranges[i]))
          return false;
      return true;
    }
    get main() {
      return this.ranges[this.mainIndex];
    }
    asSingle() {
      return this.ranges.length == 1 ? this : new EditorSelection([this.main]);
    }
    addRange(range, main = true) {
      return EditorSelection.create([range].concat(this.ranges), main ? 0 : this.mainIndex + 1);
    }
    replaceRange(range, which = this.mainIndex) {
      let ranges = this.ranges.slice();
      ranges[which] = range;
      return EditorSelection.create(ranges, this.mainIndex);
    }
    toJSON() {
      return {ranges: this.ranges.map((r) => r.toJSON()), main: this.mainIndex};
    }
    static fromJSON(json) {
      if (!json || !Array.isArray(json.ranges) || typeof json.main != "number" || json.main >= json.ranges.length)
        throw new RangeError("Invalid JSON representation for EditorSelection");
      return new EditorSelection(json.ranges.map((r) => SelectionRange.fromJSON(r)), json.main);
    }
    static single(anchor, head = anchor) {
      return new EditorSelection([EditorSelection.range(anchor, head)], 0);
    }
    static create(ranges, mainIndex = 0) {
      if (ranges.length == 0)
        throw new RangeError("A selection needs at least one range");
      for (let pos = 0, i = 0; i < ranges.length; i++) {
        let range = ranges[i];
        if (range.empty ? range.from <= pos : range.from < pos)
          return normalized(ranges.slice(), mainIndex);
        pos = range.to;
      }
      return new EditorSelection(ranges, mainIndex);
    }
    static cursor(pos, assoc = 0, bidiLevel, goalColumn) {
      return new SelectionRange(pos, pos, (assoc == 0 ? 0 : assoc < 0 ? 4 : 8) | (bidiLevel == null ? 3 : Math.min(2, bidiLevel)) | (goalColumn ?? 33554431) << 5);
    }
    static range(anchor, head, goalColumn) {
      let goal = (goalColumn ?? 33554431) << 5;
      return head < anchor ? new SelectionRange(head, anchor, 16 | goal) : new SelectionRange(anchor, head, goal);
    }
  };
  function normalized(ranges, mainIndex = 0) {
    let main = ranges[mainIndex];
    ranges.sort((a, b) => a.from - b.from);
    mainIndex = ranges.indexOf(main);
    for (let i = 1; i < ranges.length; i++) {
      let range = ranges[i], prev = ranges[i - 1];
      if (range.empty ? range.from <= prev.to : range.from < prev.to) {
        let from = prev.from, to = Math.max(range.to, prev.to);
        if (i <= mainIndex)
          mainIndex--;
        ranges.splice(--i, 2, range.anchor > range.head ? EditorSelection.range(to, from) : EditorSelection.range(from, to));
      }
    }
    return new EditorSelection(ranges, mainIndex);
  }
  function checkSelection(selection, docLength) {
    for (let range of selection.ranges)
      if (range.to > docLength)
        throw new RangeError("Selection points outside of document");
  }

  // ../state/src/facet.ts
  var nextID = 0;
  var Facet = class {
    constructor(combine, compareInput, compare2, isStatic, extensions) {
      this.combine = combine;
      this.compareInput = compareInput;
      this.compare = compare2;
      this.isStatic = isStatic;
      this.extensions = extensions;
      this.id = nextID++;
      this.default = combine([]);
    }
    static define(config2 = {}) {
      return new Facet(config2.combine || ((a) => a), config2.compareInput || ((a, b) => a === b), config2.compare || (!config2.combine ? sameArray : (a, b) => a === b), !!config2.static, config2.enables);
    }
    of(value) {
      return new FacetProvider([], this, Provider.Static, value);
    }
    compute(deps, get) {
      if (this.isStatic)
        throw new Error("Can't compute a static facet");
      return new FacetProvider(deps, this, Provider.Single, get);
    }
    computeN(deps, get) {
      if (this.isStatic)
        throw new Error("Can't compute a static facet");
      return new FacetProvider(deps, this, Provider.Multi, get);
    }
    from(field, get) {
      if (!get)
        get = (x) => x;
      return this.compute([field], (state) => get(state.field(field)));
    }
  };
  function sameArray(a, b) {
    return a == b || a.length == b.length && a.every((e, i) => e === b[i]);
  }
  var Provider;
  (function(Provider2) {
    Provider2[Provider2["Static"] = 0] = "Static";
    Provider2[Provider2["Single"] = 1] = "Single";
    Provider2[Provider2["Multi"] = 2] = "Multi";
  })(Provider || (Provider = {}));
  var FacetProvider = class {
    constructor(dependencies, facet, type, value) {
      this.dependencies = dependencies;
      this.facet = facet;
      this.type = type;
      this.value = value;
      this.id = nextID++;
    }
    dynamicSlot(addresses) {
      let getter = this.value;
      let compare2 = this.facet.compareInput;
      let idx = addresses[this.id] >> 1, multi = this.type == 2;
      let depDoc = false, depSel = false, depAddrs = [];
      for (let dep of this.dependencies) {
        if (dep == "doc")
          depDoc = true;
        else if (dep == "selection")
          depSel = true;
        else if (((addresses[dep.id] ?? 1) & 1) == 0)
          depAddrs.push(addresses[dep.id]);
      }
      return (state, tr) => {
        if (!tr || tr.reconfigured) {
          state.values[idx] = getter(state);
          return SlotStatus.Changed;
        } else {
          let depChanged = depDoc && tr.docChanged || depSel && (tr.docChanged || tr.selection) || depAddrs.some((addr) => (ensureAddr(state, addr) & SlotStatus.Changed) > 0);
          if (!depChanged)
            return 0;
          let newVal = getter(state), oldVal = tr.startState.values[idx];
          if (multi ? compareArray(newVal, oldVal, compare2) : compare2(newVal, oldVal))
            return 0;
          state.values[idx] = newVal;
          return SlotStatus.Changed;
        }
      };
    }
  };
  function compareArray(a, b, compare2) {
    if (a.length != b.length)
      return false;
    for (let i = 0; i < a.length; i++)
      if (!compare2(a[i], b[i]))
        return false;
    return true;
  }
  function dynamicFacetSlot(addresses, facet, providers) {
    let providerAddrs = providers.map((p) => addresses[p.id]);
    let providerTypes = providers.map((p) => p.type);
    let dynamic = providerAddrs.filter((p) => !(p & 1));
    let idx = addresses[facet.id] >> 1;
    return (state, tr) => {
      let oldAddr = !tr ? null : tr.reconfigured ? tr.startState.config.address[facet.id] : idx << 1;
      let changed = oldAddr == null;
      for (let dynAddr of dynamic) {
        if (ensureAddr(state, dynAddr) & SlotStatus.Changed)
          changed = true;
      }
      if (!changed)
        return 0;
      let values = [];
      for (let i = 0; i < providerAddrs.length; i++) {
        let value = getAddr(state, providerAddrs[i]);
        if (providerTypes[i] == 2)
          for (let val of value)
            values.push(val);
        else
          values.push(value);
      }
      let newVal = facet.combine(values);
      if (oldAddr != null && facet.compare(newVal, getAddr(tr.startState, oldAddr)))
        return 0;
      state.values[idx] = newVal;
      return SlotStatus.Changed;
    };
  }
  function maybeIndex(state, id) {
    let found = state.config.address[id];
    return found == null ? null : found >> 1;
  }
  var initField = Facet.define({static: true});
  var StateField = class {
    constructor(id, createF, updateF, compareF, spec) {
      this.id = id;
      this.createF = createF;
      this.updateF = updateF;
      this.compareF = compareF;
      this.spec = spec;
      this.provides = void 0;
    }
    static define(config2) {
      let field = new StateField(nextID++, config2.create, config2.update, config2.compare || ((a, b) => a === b), config2);
      if (config2.provide)
        field.provides = config2.provide(field);
      return field;
    }
    create(state) {
      let init = state.facet(initField).find((i) => i.field == this);
      return (init?.create || this.createF)(state);
    }
    slot(addresses) {
      let idx = addresses[this.id] >> 1;
      return (state, tr) => {
        if (!tr || tr.reconfigured && maybeIndex(tr.startState, this.id) == null) {
          state.values[idx] = this.create(state);
          return SlotStatus.Changed;
        }
        let oldVal, changed = 0;
        if (tr.reconfigured) {
          let oldIdx = maybeIndex(tr.startState, this.id);
          oldVal = tr.startState.values[oldIdx];
          changed = SlotStatus.Changed;
        } else {
          oldVal = tr.startState.values[idx];
        }
        let value = this.updateF(oldVal, tr);
        if (!changed && !this.compareF(oldVal, value))
          changed = SlotStatus.Changed;
        if (changed)
          state.values[idx] = value;
        return changed;
      };
    }
    init(create) {
      return [this, initField.of({field: this, create})];
    }
    get extension() {
      return this;
    }
  };
  var Prec_ = {fallback: 3, default: 2, extend: 1, override: 0};
  function prec(value) {
    return (ext) => new PrecExtension(ext, value);
  }
  var Prec = {
    fallback: prec(Prec_.fallback),
    default: prec(Prec_.default),
    extend: prec(Prec_.extend),
    override: prec(Prec_.override)
  };
  var PrecExtension = class {
    constructor(inner, prec2) {
      this.inner = inner;
      this.prec = prec2;
    }
  };
  var Compartment = class {
    of(ext) {
      return new CompartmentInstance(this, ext);
    }
    reconfigure(content2) {
      return Compartment.reconfigure.of({compartment: this, extension: content2});
    }
    get(state) {
      return state.config.compartments.get(this);
    }
  };
  var CompartmentInstance = class {
    constructor(compartment, inner) {
      this.compartment = compartment;
      this.inner = inner;
    }
  };
  var Configuration = class {
    constructor(base2, compartments, dynamicSlots, address, staticValues) {
      this.base = base2;
      this.compartments = compartments;
      this.dynamicSlots = dynamicSlots;
      this.address = address;
      this.staticValues = staticValues;
      this.statusTemplate = [];
      while (this.statusTemplate.length < dynamicSlots.length)
        this.statusTemplate.push(SlotStatus.Uninitialized);
    }
    staticFacet(facet) {
      let addr = this.address[facet.id];
      return addr == null ? facet.default : this.staticValues[addr >> 1];
    }
    static resolve(base2, compartments, oldState) {
      let fields = [];
      let facets = Object.create(null);
      let newCompartments = new Map();
      for (let ext of flatten(base2, compartments, newCompartments)) {
        if (ext instanceof StateField)
          fields.push(ext);
        else
          (facets[ext.facet.id] || (facets[ext.facet.id] = [])).push(ext);
      }
      let address = Object.create(null);
      let staticValues = [];
      let dynamicSlots = [];
      for (let field of fields) {
        address[field.id] = dynamicSlots.length << 1;
        dynamicSlots.push((a) => field.slot(a));
      }
      for (let id in facets) {
        let providers = facets[id], facet = providers[0].facet;
        if (providers.every((p) => p.type == 0)) {
          address[facet.id] = staticValues.length << 1 | 1;
          let value = facet.combine(providers.map((p) => p.value));
          let oldAddr = oldState ? oldState.config.address[facet.id] : null;
          if (oldAddr != null) {
            let oldVal = getAddr(oldState, oldAddr);
            if (facet.compare(value, oldVal))
              value = oldVal;
          }
          staticValues.push(value);
        } else {
          for (let p of providers) {
            if (p.type == 0) {
              address[p.id] = staticValues.length << 1 | 1;
              staticValues.push(p.value);
            } else {
              address[p.id] = dynamicSlots.length << 1;
              dynamicSlots.push((a) => p.dynamicSlot(a));
            }
          }
          address[facet.id] = dynamicSlots.length << 1;
          dynamicSlots.push((a) => dynamicFacetSlot(a, facet, providers));
        }
      }
      return new Configuration(base2, newCompartments, dynamicSlots.map((f) => f(address)), address, staticValues);
    }
  };
  function flatten(extension, compartments, newCompartments) {
    let result = [[], [], [], []];
    let seen = new Map();
    function inner(ext, prec2) {
      let known = seen.get(ext);
      if (known != null) {
        if (known >= prec2)
          return;
        let found = result[known].indexOf(ext);
        if (found > -1)
          result[known].splice(found, 1);
        if (ext instanceof CompartmentInstance)
          newCompartments.delete(ext.compartment);
      }
      seen.set(ext, prec2);
      if (Array.isArray(ext)) {
        for (let e of ext)
          inner(e, prec2);
      } else if (ext instanceof CompartmentInstance) {
        if (newCompartments.has(ext.compartment))
          throw new RangeError(`Duplicate use of compartment in extensions`);
        let content2 = compartments.get(ext.compartment) || ext.inner;
        newCompartments.set(ext.compartment, content2);
        inner(content2, prec2);
      } else if (ext instanceof PrecExtension) {
        inner(ext.inner, ext.prec);
      } else if (ext instanceof StateField) {
        result[prec2].push(ext);
        if (ext.provides)
          inner(ext.provides, prec2);
      } else if (ext instanceof FacetProvider) {
        result[prec2].push(ext);
        if (ext.facet.extensions)
          inner(ext.facet.extensions, prec2);
      } else {
        let content2 = ext.extension;
        if (!content2)
          throw new Error(`Unrecognized extension value in extension set (${ext}). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.`);
        inner(content2, prec2);
      }
    }
    inner(extension, Prec_.default);
    return result.reduce((a, b) => a.concat(b));
  }
  var SlotStatus;
  (function(SlotStatus3) {
    SlotStatus3[SlotStatus3["Uninitialized"] = 0] = "Uninitialized";
    SlotStatus3[SlotStatus3["Changed"] = 1] = "Changed";
    SlotStatus3[SlotStatus3["Computed"] = 2] = "Computed";
    SlotStatus3[SlotStatus3["Computing"] = 4] = "Computing";
  })(SlotStatus || (SlotStatus = {}));
  function ensureAddr(state, addr) {
    if (addr & 1)
      return 2;
    let idx = addr >> 1;
    let status = state.status[idx];
    if (status == 4)
      throw new Error("Cyclic dependency between fields and/or facets");
    if (status & 2)
      return status;
    state.status[idx] = 4;
    let changed = state.config.dynamicSlots[idx](state, state.applying);
    return state.status[idx] = 2 | changed;
  }
  function getAddr(state, addr) {
    return addr & 1 ? state.config.staticValues[addr >> 1] : state.values[addr >> 1];
  }

  // ../state/src/extension.ts
  var languageData = Facet.define();
  var allowMultipleSelections = Facet.define({
    combine: (values) => values.some((v) => v),
    static: true
  });
  var lineSeparator = Facet.define({
    combine: (values) => values.length ? values[0] : void 0,
    static: true
  });
  var changeFilter = Facet.define();
  var transactionFilter = Facet.define();
  var transactionExtender = Facet.define();

  // ../state/src/transaction.ts
  var Annotation = class {
    constructor(type, value) {
      this.type = type;
      this.value = value;
    }
    static define() {
      return new AnnotationType();
    }
  };
  var AnnotationType = class {
    of(value) {
      return new Annotation(this, value);
    }
  };
  var StateEffectType = class {
    constructor(map) {
      this.map = map;
    }
    of(value) {
      return new StateEffect(this, value);
    }
  };
  var _StateEffect = class {
    constructor(type, value) {
      this.type = type;
      this.value = value;
    }
    map(mapping) {
      let mapped = this.type.map(this.value, mapping);
      return mapped === void 0 ? void 0 : mapped == this.value ? this : new _StateEffect(this.type, mapped);
    }
    is(type) {
      return this.type == type;
    }
    static define(spec = {}) {
      return new StateEffectType(spec.map || ((v) => v));
    }
    static mapEffects(effects, mapping) {
      if (!effects.length)
        return effects;
      let result = [];
      for (let effect of effects) {
        let mapped = effect.map(mapping);
        if (mapped)
          result.push(mapped);
      }
      return result;
    }
  };
  var StateEffect = _StateEffect;
  StateEffect.reconfigure = _StateEffect.define();
  StateEffect.appendConfig = _StateEffect.define();
  var _Transaction = class {
    constructor(startState, changes, selection, effects, annotations, scrollIntoView2) {
      this.startState = startState;
      this.changes = changes;
      this.selection = selection;
      this.effects = effects;
      this.annotations = annotations;
      this.scrollIntoView = scrollIntoView2;
      this._doc = null;
      this._state = null;
      if (selection)
        checkSelection(selection, changes.newLength);
      if (!annotations.some((a) => a.type == _Transaction.time))
        this.annotations = annotations.concat(_Transaction.time.of(Date.now()));
    }
    get newDoc() {
      return this._doc || (this._doc = this.changes.apply(this.startState.doc));
    }
    get newSelection() {
      return this.selection || this.startState.selection.map(this.changes);
    }
    get state() {
      if (!this._state)
        this.startState.applyTransaction(this);
      return this._state;
    }
    annotation(type) {
      for (let ann of this.annotations)
        if (ann.type == type)
          return ann.value;
      return void 0;
    }
    get docChanged() {
      return !this.changes.empty;
    }
    get reconfigured() {
      return this.startState.config != this.state.config;
    }
  };
  var Transaction = _Transaction;
  Transaction.time = Annotation.define();
  Transaction.userEvent = Annotation.define();
  Transaction.addToHistory = Annotation.define();
  Transaction.remote = Annotation.define();
  function joinRanges(a, b) {
    let result = [];
    for (let iA = 0, iB = 0; ; ) {
      let from, to;
      if (iA < a.length && (iB == b.length || b[iB] >= a[iA])) {
        from = a[iA++];
        to = a[iA++];
      } else if (iB < b.length) {
        from = b[iB++];
        to = b[iB++];
      } else
        return result;
      if (!result.length || result[result.length - 1] < from)
        result.push(from, to);
      else if (result[result.length - 1] < to)
        result[result.length - 1] = to;
    }
  }
  function mergeTransaction(a, b, sequential) {
    let mapForA, mapForB, changes;
    if (sequential) {
      mapForA = b.changes;
      mapForB = ChangeSet.empty(b.changes.length);
      changes = a.changes.compose(b.changes);
    } else {
      mapForA = b.changes.map(a.changes);
      mapForB = a.changes.mapDesc(b.changes, true);
      changes = a.changes.compose(mapForA);
    }
    return {
      changes,
      selection: b.selection ? b.selection.map(mapForB) : a.selection?.map(mapForA),
      effects: StateEffect.mapEffects(a.effects, mapForA).concat(StateEffect.mapEffects(b.effects, mapForB)),
      annotations: a.annotations.length ? a.annotations.concat(b.annotations) : b.annotations,
      scrollIntoView: a.scrollIntoView || b.scrollIntoView
    };
  }
  function resolveTransactionInner(state, spec, docSize) {
    let sel = spec.selection;
    return {
      changes: spec.changes instanceof ChangeSet ? spec.changes : ChangeSet.of(spec.changes || [], docSize, state.facet(lineSeparator)),
      selection: sel && (sel instanceof EditorSelection ? sel : EditorSelection.single(sel.anchor, sel.head)),
      effects: asArray(spec.effects),
      annotations: asArray(spec.annotations),
      scrollIntoView: !!spec.scrollIntoView
    };
  }
  function resolveTransaction(state, specs, filter) {
    let s = resolveTransactionInner(state, specs.length ? specs[0] : {}, state.doc.length);
    if (specs.length && specs[0].filter === false)
      filter = false;
    for (let i = 1; i < specs.length; i++) {
      if (specs[i].filter === false)
        filter = false;
      let seq = !!specs[i].sequential;
      s = mergeTransaction(s, resolveTransactionInner(state, specs[i], seq ? s.changes.newLength : state.doc.length), seq);
    }
    let tr = new Transaction(state, s.changes, s.selection, s.effects, s.annotations, s.scrollIntoView);
    return extendTransaction(filter ? filterTransaction(tr) : tr);
  }
  function filterTransaction(tr) {
    let state = tr.startState;
    let result = true;
    for (let filter of state.facet(changeFilter)) {
      let value = filter(tr);
      if (value === false) {
        result = false;
        break;
      }
      if (Array.isArray(value))
        result = result === true ? value : joinRanges(result, value);
    }
    if (result !== true) {
      let changes, back;
      if (result === false) {
        back = tr.changes.invertedDesc;
        changes = ChangeSet.empty(state.doc.length);
      } else {
        let filtered = tr.changes.filter(result);
        changes = filtered.changes;
        back = filtered.filtered.invertedDesc;
      }
      tr = new Transaction(state, changes, tr.selection && tr.selection.map(back), StateEffect.mapEffects(tr.effects, back), tr.annotations, tr.scrollIntoView);
    }
    let filters = state.facet(transactionFilter);
    for (let i = filters.length - 1; i >= 0; i--) {
      let filtered = filters[i](tr);
      if (filtered instanceof Transaction)
        tr = filtered;
      else if (Array.isArray(filtered) && filtered.length == 1 && filtered[0] instanceof Transaction)
        tr = filtered[0];
      else
        tr = resolveTransaction(state, asArray(filtered), false);
    }
    return tr;
  }
  function extendTransaction(tr) {
    let state = tr.startState, extenders = state.facet(transactionExtender), spec = tr;
    for (let i = extenders.length - 1; i >= 0; i--) {
      let extension = extenders[i](tr);
      if (extension && Object.keys(extension).length)
        spec = mergeTransaction(tr, resolveTransactionInner(state, extension, tr.changes.newLength), true);
    }
    return spec == tr ? tr : new Transaction(state, tr.changes, tr.selection, spec.effects, spec.annotations, spec.scrollIntoView);
  }
  var none = [];
  function asArray(value) {
    return value == null ? none : Array.isArray(value) ? value : [value];
  }

  // ../state/src/charcategory.ts
  var CharCategory;
  (function(CharCategory3) {
    CharCategory3[CharCategory3["Word"] = 0] = "Word";
    CharCategory3[CharCategory3["Space"] = 1] = "Space";
    CharCategory3[CharCategory3["Other"] = 2] = "Other";
  })(CharCategory || (CharCategory = {}));
  var nonASCIISingleCaseWordChar = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
  var wordChar;
  try {
    wordChar = new RegExp("[\\p{Alphabetic}\\p{Number}_]", "u");
  } catch (_) {
  }
  function hasWordChar(str) {
    if (wordChar)
      return wordChar.test(str);
    for (let i = 0; i < str.length; i++) {
      let ch = str[i];
      if (/\w/.test(ch) || ch > "\x80" && (ch.toUpperCase() != ch.toLowerCase() || nonASCIISingleCaseWordChar.test(ch)))
        return true;
    }
    return false;
  }
  function makeCategorizer(wordChars) {
    return (char) => {
      if (!/\S/.test(char))
        return 1;
      if (hasWordChar(char))
        return 0;
      for (let i = 0; i < wordChars.length; i++)
        if (char.indexOf(wordChars[i]) > -1)
          return 0;
      return 2;
    };
  }

  // ../state/src/state.ts
  var _EditorState = class {
    constructor(config2, doc2, selection, tr = null) {
      this.config = config2;
      this.doc = doc2;
      this.selection = selection;
      this.applying = null;
      this.status = config2.statusTemplate.slice();
      if (tr && tr.startState.config == config2) {
        this.values = tr.startState.values.slice();
      } else {
        this.values = config2.dynamicSlots.map((_) => null);
        if (tr)
          for (let id in config2.address) {
            let cur2 = config2.address[id], prev = tr.startState.config.address[id];
            if (prev != null && (cur2 & 1) == 0)
              this.values[cur2 >> 1] = getAddr(tr.startState, prev);
          }
      }
      this.applying = tr;
      if (tr)
        tr._state = this;
      for (let i = 0; i < this.config.dynamicSlots.length; i++)
        ensureAddr(this, i << 1);
      this.applying = null;
    }
    field(field, require2 = true) {
      let addr = this.config.address[field.id];
      if (addr == null) {
        if (require2)
          throw new RangeError("Field is not present in this state");
        return void 0;
      }
      ensureAddr(this, addr);
      return getAddr(this, addr);
    }
    update(...specs) {
      return resolveTransaction(this, specs, true);
    }
    applyTransaction(tr) {
      let conf = this.config, {base: base2, compartments} = conf;
      for (let effect of tr.effects) {
        if (effect.is(Compartment.reconfigure)) {
          if (conf) {
            compartments = new Map();
            conf.compartments.forEach((val, key) => compartments.set(key, val));
            conf = null;
          }
          compartments.set(effect.value.compartment, effect.value.extension);
          this;
        } else if (effect.is(StateEffect.reconfigure)) {
          conf = null;
          base2 = effect.value;
        } else if (effect.is(StateEffect.appendConfig)) {
          conf = null;
          base2 = asArray(base2).concat(effect.value);
        }
      }
      new _EditorState(conf || Configuration.resolve(base2, compartments, this), tr.newDoc, tr.newSelection, tr);
    }
    replaceSelection(text) {
      if (typeof text == "string")
        text = this.toText(text);
      return this.changeByRange((range) => ({
        changes: {from: range.from, to: range.to, insert: text},
        range: EditorSelection.cursor(range.from + text.length)
      }));
    }
    changeByRange(f) {
      let sel = this.selection;
      let result1 = f(sel.ranges[0]);
      let changes = this.changes(result1.changes), ranges = [result1.range];
      let effects = asArray(result1.effects);
      for (let i = 1; i < sel.ranges.length; i++) {
        let result = f(sel.ranges[i]);
        let newChanges = this.changes(result.changes), newMapped = newChanges.map(changes);
        for (let j = 0; j < i; j++)
          ranges[j] = ranges[j].map(newMapped);
        let mapBy = changes.mapDesc(newChanges, true);
        ranges.push(result.range.map(mapBy));
        changes = changes.compose(newMapped);
        effects = StateEffect.mapEffects(effects, newMapped).concat(StateEffect.mapEffects(asArray(result.effects), mapBy));
      }
      return {
        changes,
        selection: EditorSelection.create(ranges, sel.mainIndex),
        effects
      };
    }
    changes(spec = []) {
      if (spec instanceof ChangeSet)
        return spec;
      return ChangeSet.of(spec, this.doc.length, this.facet(_EditorState.lineSeparator));
    }
    toText(string2) {
      return Text.of(string2.split(this.facet(_EditorState.lineSeparator) || DefaultSplit));
    }
    sliceDoc(from = 0, to = this.doc.length) {
      return this.doc.sliceString(from, to, this.lineBreak);
    }
    facet(facet) {
      let addr = this.config.address[facet.id];
      if (addr == null)
        return facet.default;
      ensureAddr(this, addr);
      return getAddr(this, addr);
    }
    toJSON(fields) {
      let result = {
        doc: this.sliceDoc(),
        selection: this.selection.toJSON()
      };
      if (fields)
        for (let prop in fields) {
          let value = fields[prop];
          if (value instanceof StateField)
            result[prop] = value.spec.toJSON(this.field(fields[prop]), this);
        }
      return result;
    }
    static fromJSON(json, config2 = {}, fields) {
      if (!json || typeof json.doc != "string")
        throw new RangeError("Invalid JSON representation for EditorState");
      let fieldInit = [];
      if (fields)
        for (let prop in fields) {
          let field = fields[prop], value = json[prop];
          fieldInit.push(field.init((state) => field.spec.fromJSON(value, state)));
        }
      return _EditorState.create({
        doc: json.doc,
        selection: EditorSelection.fromJSON(json.selection),
        extensions: config2.extensions ? fieldInit.concat([config2.extensions]) : fieldInit
      });
    }
    static create(config2 = {}) {
      let configuration = Configuration.resolve(config2.extensions || [], new Map());
      let doc2 = config2.doc instanceof Text ? config2.doc : Text.of((config2.doc || "").split(configuration.staticFacet(_EditorState.lineSeparator) || DefaultSplit));
      let selection = !config2.selection ? EditorSelection.single(0) : config2.selection instanceof EditorSelection ? config2.selection : EditorSelection.single(config2.selection.anchor, config2.selection.head);
      checkSelection(selection, doc2.length);
      if (!configuration.staticFacet(allowMultipleSelections))
        selection = selection.asSingle();
      return new _EditorState(configuration, doc2, selection);
    }
    get tabSize() {
      return this.facet(_EditorState.tabSize);
    }
    get lineBreak() {
      return this.facet(_EditorState.lineSeparator) || "\n";
    }
    phrase(phrase) {
      for (let map of this.facet(_EditorState.phrases))
        if (Object.prototype.hasOwnProperty.call(map, phrase))
          return map[phrase];
      return phrase;
    }
    languageDataAt(name2, pos) {
      let values = [];
      for (let provider of this.facet(languageData)) {
        for (let result of provider(this, pos)) {
          if (Object.prototype.hasOwnProperty.call(result, name2))
            values.push(result[name2]);
        }
      }
      return values;
    }
    charCategorizer(at) {
      return makeCategorizer(this.languageDataAt("wordChars", at).join(""));
    }
    wordAt(pos) {
      let {text, from, length} = this.doc.lineAt(pos);
      let cat = this.charCategorizer(pos);
      let start = pos - from, end = pos - from;
      while (start > 0) {
        let prev = findClusterBreak(text, start, false);
        if (cat(text.slice(prev, start)) != CharCategory.Word)
          break;
        start = prev;
      }
      while (end < length) {
        let next = findClusterBreak(text, end);
        if (cat(text.slice(end, next)) != CharCategory.Word)
          break;
        end = next;
      }
      return start == end ? EditorSelection.range(start + from, end + from) : null;
    }
  };
  var EditorState = _EditorState;
  EditorState.allowMultipleSelections = allowMultipleSelections;
  EditorState.tabSize = Facet.define({
    combine: (values) => values.length ? values[0] : 4
  });
  EditorState.lineSeparator = lineSeparator;
  EditorState.phrases = Facet.define();
  EditorState.languageData = languageData;
  EditorState.changeFilter = changeFilter;
  EditorState.transactionFilter = transactionFilter;
  EditorState.transactionExtender = transactionExtender;
  Compartment.reconfigure = StateEffect.define();

  // ../state/src/config.ts
  function combineConfig(configs, defaults3, combine = {}) {
    let result = {};
    for (let config2 of configs)
      for (let key of Object.keys(config2)) {
        let value = config2[key], current = result[key];
        if (current === void 0)
          result[key] = value;
        else if (current === value || value === void 0) {
        } else if (Object.hasOwnProperty.call(combine, key))
          result[key] = combine[key](current, value);
        else
          throw new Error("Config merge conflict for field " + key);
      }
    for (let key in defaults3)
      if (result[key] === void 0)
        result[key] = defaults3[key];
    return result;
  }

  // ../node_modules/style-mod/src/style-mod.js
  var C = "\u037C";
  var COUNT = typeof Symbol == "undefined" ? "__" + C : Symbol.for(C);
  var SET = typeof Symbol == "undefined" ? "__styleSet" + Math.floor(Math.random() * 1e8) : Symbol("styleSet");
  var top = typeof globalThis != "undefined" ? globalThis : typeof window != "undefined" ? window : {};
  var StyleModule = class {
    constructor(spec, options) {
      this.rules = [];
      let {finish} = options || {};
      function splitSelector(selector) {
        return /^@/.test(selector) ? [selector] : selector.split(/,\s*/);
      }
      function render(selectors, spec2, target, isKeyframes) {
        let local = [], isAt = /^@(\w+)\b/.exec(selectors[0]), keyframes = isAt && isAt[1] == "keyframes";
        if (isAt && spec2 == null)
          return target.push(selectors[0] + ";");
        for (let prop in spec2) {
          let value = spec2[prop];
          if (/&/.test(prop)) {
            render(prop.split(/,\s*/).map((part) => selectors.map((sel) => part.replace(/&/, sel))).reduce((a, b) => a.concat(b)), value, target);
          } else if (value && typeof value == "object") {
            if (!isAt)
              throw new RangeError("The value of a property (" + prop + ") should be a primitive value.");
            render(splitSelector(prop), value, local, keyframes);
          } else if (value != null) {
            local.push(prop.replace(/_.*/, "").replace(/[A-Z]/g, (l) => "-" + l.toLowerCase()) + ": " + value + ";");
          }
        }
        if (local.length || keyframes) {
          target.push((finish && !isAt && !isKeyframes ? selectors.map(finish) : selectors).join(", ") + " {" + local.join(" ") + "}");
        }
      }
      for (let prop in spec)
        render(splitSelector(prop), spec[prop], this.rules);
    }
    getRules() {
      return this.rules.join("\n");
    }
    static newName() {
      let id = top[COUNT] || 1;
      top[COUNT] = id + 1;
      return C + id.toString(36);
    }
    static mount(root, modules) {
      (root[SET] || new StyleSet(root)).mount(Array.isArray(modules) ? modules : [modules]);
    }
  };
  var adoptedSet = null;
  var StyleSet = class {
    constructor(root) {
      if (!root.head && root.adoptedStyleSheets && typeof CSSStyleSheet != "undefined") {
        if (adoptedSet) {
          root.adoptedStyleSheets = [adoptedSet.sheet].concat(root.adoptedStyleSheets);
          return root[SET] = adoptedSet;
        }
        this.sheet = new CSSStyleSheet();
        root.adoptedStyleSheets = [this.sheet].concat(root.adoptedStyleSheets);
        adoptedSet = this;
      } else {
        this.styleTag = (root.ownerDocument || root).createElement("style");
        let target = root.head || root;
        target.insertBefore(this.styleTag, target.firstChild);
      }
      this.modules = [];
      root[SET] = this;
    }
    mount(modules) {
      let sheet = this.sheet;
      let pos = 0, j = 0;
      for (let i = 0; i < modules.length; i++) {
        let mod = modules[i], index = this.modules.indexOf(mod);
        if (index < j && index > -1) {
          this.modules.splice(index, 1);
          j--;
          index = -1;
        }
        if (index == -1) {
          this.modules.splice(j++, 0, mod);
          if (sheet)
            for (let k = 0; k < mod.rules.length; k++)
              sheet.insertRule(mod.rules[k], pos++);
        } else {
          while (j < index)
            pos += this.modules[j++].rules.length;
          pos += mod.rules.length;
          j++;
        }
      }
      if (!sheet) {
        let text = "";
        for (let i = 0; i < this.modules.length; i++)
          text += this.modules[i].getRules() + "\n";
        this.styleTag.textContent = text;
      }
    }
  };

  // ../rangeset/src/rangeset.ts
  var RangeValue = class {
    eq(other) {
      return this == other;
    }
    range(from, to = from) {
      return new Range(from, to, this);
    }
  };
  RangeValue.prototype.startSide = RangeValue.prototype.endSide = 0;
  RangeValue.prototype.point = false;
  RangeValue.prototype.mapMode = MapMode.TrackDel;
  var Range = class {
    constructor(from, to, value) {
      this.from = from;
      this.to = to;
      this.value = value;
    }
  };
  function cmpRange(a, b) {
    return a.from - b.from || a.value.startSide - b.value.startSide;
  }
  var C2;
  (function(C3) {
    C3[C3["ChunkSize"] = 250] = "ChunkSize";
    C3[C3["BigPointSize"] = 500] = "BigPointSize";
    C3[C3["Far"] = 1e9] = "Far";
  })(C2 || (C2 = {}));
  var Chunk = class {
    constructor(from, to, value, maxPoint) {
      this.from = from;
      this.to = to;
      this.value = value;
      this.maxPoint = maxPoint;
    }
    get length() {
      return this.to[this.to.length - 1];
    }
    findIndex(pos, end, side = end * 1e9, startAt = 0) {
      if (pos <= 0)
        return startAt;
      let arr = end < 0 ? this.to : this.from;
      for (let lo = startAt, hi = arr.length; ; ) {
        if (lo == hi)
          return lo;
        let mid = lo + hi >> 1;
        let diff = arr[mid] - pos || (end < 0 ? this.value[mid].startSide : this.value[mid].endSide) - side;
        if (mid == lo)
          return diff >= 0 ? lo : hi;
        if (diff >= 0)
          hi = mid;
        else
          lo = mid + 1;
      }
    }
    between(offset, from, to, f) {
      for (let i = this.findIndex(from, -1), e = this.findIndex(to, 1, void 0, i); i < e; i++)
        if (f(this.from[i] + offset, this.to[i] + offset, this.value[i]) === false)
          return false;
    }
    map(offset, changes) {
      let value = [], from = [], to = [], newPos = -1, maxPoint = -1;
      for (let i = 0; i < this.value.length; i++) {
        let val = this.value[i], curFrom = this.from[i] + offset, curTo = this.to[i] + offset, newFrom, newTo;
        if (curFrom == curTo) {
          let mapped = changes.mapPos(curFrom, val.startSide, val.mapMode);
          if (mapped == null)
            continue;
          newFrom = newTo = mapped;
        } else {
          newFrom = changes.mapPos(curFrom, val.startSide);
          newTo = changes.mapPos(curTo, val.endSide);
          if (newFrom > newTo || newFrom == newTo && val.startSide > 0 && val.endSide <= 0)
            continue;
        }
        if ((newTo - newFrom || val.endSide - val.startSide) < 0)
          continue;
        if (newPos < 0)
          newPos = newFrom;
        if (val.point)
          maxPoint = Math.max(maxPoint, newTo - newFrom);
        value.push(val);
        from.push(newFrom - newPos);
        to.push(newTo - newPos);
      }
      return {mapped: value.length ? new Chunk(from, to, value, maxPoint) : null, pos: newPos};
    }
  };
  var _RangeSet = class {
    constructor(chunkPos, chunk, nextLayer = _RangeSet.empty, maxPoint) {
      this.chunkPos = chunkPos;
      this.chunk = chunk;
      this.nextLayer = nextLayer;
      this.maxPoint = maxPoint;
    }
    get length() {
      let last = this.chunk.length - 1;
      return last < 0 ? 0 : Math.max(this.chunkEnd(last), this.nextLayer.length);
    }
    get size() {
      if (this == _RangeSet.empty)
        return 0;
      let size = this.nextLayer.size;
      for (let chunk of this.chunk)
        size += chunk.value.length;
      return size;
    }
    chunkEnd(index) {
      return this.chunkPos[index] + this.chunk[index].length;
    }
    update(updateSpec) {
      let {add: add2 = [], sort = false, filterFrom = 0, filterTo = this.length} = updateSpec;
      let filter = updateSpec.filter;
      if (add2.length == 0 && !filter)
        return this;
      if (sort)
        add2.slice().sort(cmpRange);
      if (this == _RangeSet.empty)
        return add2.length ? _RangeSet.of(add2) : this;
      let cur2 = new LayerCursor(this, null, -1).goto(0), i = 0, spill = [];
      let builder = new RangeSetBuilder();
      while (cur2.value || i < add2.length) {
        if (i < add2.length && (cur2.from - add2[i].from || cur2.startSide - add2[i].value.startSide) >= 0) {
          let range = add2[i++];
          if (!builder.addInner(range.from, range.to, range.value))
            spill.push(range);
        } else if (cur2.rangeIndex == 1 && cur2.chunkIndex < this.chunk.length && (i == add2.length || this.chunkEnd(cur2.chunkIndex) < add2[i].from) && (!filter || filterFrom > this.chunkEnd(cur2.chunkIndex) || filterTo < this.chunkPos[cur2.chunkIndex]) && builder.addChunk(this.chunkPos[cur2.chunkIndex], this.chunk[cur2.chunkIndex])) {
          cur2.nextChunk();
        } else {
          if (!filter || filterFrom > cur2.to || filterTo < cur2.from || filter(cur2.from, cur2.to, cur2.value)) {
            if (!builder.addInner(cur2.from, cur2.to, cur2.value))
              spill.push(new Range(cur2.from, cur2.to, cur2.value));
          }
          cur2.next();
        }
      }
      return builder.finishInner(this.nextLayer == _RangeSet.empty && !spill.length ? _RangeSet.empty : this.nextLayer.update({add: spill, filter, filterFrom, filterTo}));
    }
    map(changes) {
      if (changes.length == 0 || this == _RangeSet.empty)
        return this;
      let chunks = [], chunkPos = [], maxPoint = -1;
      for (let i = 0; i < this.chunk.length; i++) {
        let start = this.chunkPos[i], chunk = this.chunk[i];
        let touch = changes.touchesRange(start, start + chunk.length);
        if (touch === false) {
          maxPoint = Math.max(maxPoint, chunk.maxPoint);
          chunks.push(chunk);
          chunkPos.push(changes.mapPos(start));
        } else if (touch === true) {
          let {mapped, pos} = chunk.map(start, changes);
          if (mapped) {
            maxPoint = Math.max(maxPoint, mapped.maxPoint);
            chunks.push(mapped);
            chunkPos.push(pos);
          }
        }
      }
      let next = this.nextLayer.map(changes);
      return chunks.length == 0 ? next : new _RangeSet(chunkPos, chunks, next, maxPoint);
    }
    between(from, to, f) {
      if (this == _RangeSet.empty)
        return;
      for (let i = 0; i < this.chunk.length; i++) {
        let start = this.chunkPos[i], chunk = this.chunk[i];
        if (to >= start && from <= start + chunk.length && chunk.between(start, from - start, to - start, f) === false)
          return;
      }
      this.nextLayer.between(from, to, f);
    }
    iter(from = 0) {
      return HeapCursor.from([this]).goto(from);
    }
    static iter(sets, from = 0) {
      return HeapCursor.from(sets).goto(from);
    }
    static compare(oldSets, newSets, textDiff, comparator, minPointSize = -1) {
      let a = oldSets.filter((set) => set.maxPoint >= 500 || set != _RangeSet.empty && newSets.indexOf(set) < 0 && set.maxPoint >= minPointSize);
      let b = newSets.filter((set) => set.maxPoint >= 500 || set != _RangeSet.empty && oldSets.indexOf(set) < 0 && set.maxPoint >= minPointSize);
      let sharedChunks = findSharedChunks(a, b);
      let sideA = new SpanCursor(a, sharedChunks, minPointSize);
      let sideB = new SpanCursor(b, sharedChunks, minPointSize);
      textDiff.iterGaps((fromA, fromB, length) => compare(sideA, fromA, sideB, fromB, length, comparator));
      if (textDiff.empty && textDiff.length == 0)
        compare(sideA, 0, sideB, 0, 0, comparator);
    }
    static spans(sets, from, to, iterator, minPointSize = -1) {
      let cursor = new SpanCursor(sets, null, minPointSize).goto(from), pos = from;
      let open = cursor.openStart;
      for (; ; ) {
        let curTo = Math.min(cursor.to, to);
        if (cursor.point) {
          iterator.point(pos, curTo, cursor.point, cursor.activeForPoint(cursor.to), open);
          open = cursor.openEnd(curTo) + (cursor.to > curTo ? 1 : 0);
        } else if (curTo > pos) {
          iterator.span(pos, curTo, cursor.active, open);
          open = cursor.openEnd(curTo);
        }
        if (cursor.to > to)
          break;
        pos = cursor.to;
        cursor.next();
      }
      return open;
    }
    static of(ranges, sort = false) {
      let build = new RangeSetBuilder();
      for (let range of ranges instanceof Range ? [ranges] : sort ? ranges.slice().sort(cmpRange) : ranges)
        build.add(range.from, range.to, range.value);
      return build.finish();
    }
  };
  var RangeSet = _RangeSet;
  RangeSet.empty = new _RangeSet([], [], null, -1);
  RangeSet.empty.nextLayer = RangeSet.empty;
  var RangeSetBuilder = class {
    constructor() {
      this.chunks = [];
      this.chunkPos = [];
      this.chunkStart = -1;
      this.last = null;
      this.lastFrom = -1e9;
      this.lastTo = -1e9;
      this.from = [];
      this.to = [];
      this.value = [];
      this.maxPoint = -1;
      this.setMaxPoint = -1;
      this.nextLayer = null;
    }
    finishChunk(newArrays) {
      this.chunks.push(new Chunk(this.from, this.to, this.value, this.maxPoint));
      this.chunkPos.push(this.chunkStart);
      this.chunkStart = -1;
      this.setMaxPoint = Math.max(this.setMaxPoint, this.maxPoint);
      this.maxPoint = -1;
      if (newArrays) {
        this.from = [];
        this.to = [];
        this.value = [];
      }
    }
    add(from, to, value) {
      if (!this.addInner(from, to, value))
        (this.nextLayer || (this.nextLayer = new RangeSetBuilder())).add(from, to, value);
    }
    addInner(from, to, value) {
      let diff = from - this.lastTo || value.startSide - this.last.endSide;
      if (diff <= 0 && (from - this.lastFrom || value.startSide - this.last.startSide) < 0)
        throw new Error("Ranges must be added sorted by `from` position and `startSide`");
      if (diff < 0)
        return false;
      if (this.from.length == 250)
        this.finishChunk(true);
      if (this.chunkStart < 0)
        this.chunkStart = from;
      this.from.push(from - this.chunkStart);
      this.to.push(to - this.chunkStart);
      this.last = value;
      this.lastFrom = from;
      this.lastTo = to;
      this.value.push(value);
      if (value.point)
        this.maxPoint = Math.max(this.maxPoint, to - from);
      return true;
    }
    addChunk(from, chunk) {
      if ((from - this.lastTo || chunk.value[0].startSide - this.last.endSide) < 0)
        return false;
      if (this.from.length)
        this.finishChunk(true);
      this.setMaxPoint = Math.max(this.setMaxPoint, chunk.maxPoint);
      this.chunks.push(chunk);
      this.chunkPos.push(from);
      let last = chunk.value.length - 1;
      this.last = chunk.value[last];
      this.lastFrom = chunk.from[last] + from;
      this.lastTo = chunk.to[last] + from;
      return true;
    }
    finish() {
      return this.finishInner(RangeSet.empty);
    }
    finishInner(next) {
      if (this.from.length)
        this.finishChunk(false);
      if (this.chunks.length == 0)
        return next;
      let result = new RangeSet(this.chunkPos, this.chunks, this.nextLayer ? this.nextLayer.finishInner(next) : next, this.setMaxPoint);
      this.from = null;
      return result;
    }
  };
  function findSharedChunks(a, b) {
    let inA = new Map();
    for (let set of a)
      for (let i = 0; i < set.chunk.length; i++)
        if (set.chunk[i].maxPoint < 500)
          inA.set(set.chunk[i], set.chunkPos[i]);
    let shared = new Set();
    for (let set of b)
      for (let i = 0; i < set.chunk.length; i++)
        if (inA.get(set.chunk[i]) == set.chunkPos[i])
          shared.add(set.chunk[i]);
    return shared;
  }
  var LayerCursor = class {
    constructor(layer, skip, minPoint, rank = 0) {
      this.layer = layer;
      this.skip = skip;
      this.minPoint = minPoint;
      this.rank = rank;
    }
    get startSide() {
      return this.value ? this.value.startSide : 0;
    }
    get endSide() {
      return this.value ? this.value.endSide : 0;
    }
    goto(pos, side = -1e9) {
      this.chunkIndex = this.rangeIndex = 0;
      this.gotoInner(pos, side, false);
      return this;
    }
    gotoInner(pos, side, forward) {
      while (this.chunkIndex < this.layer.chunk.length) {
        let next = this.layer.chunk[this.chunkIndex];
        if (!(this.skip && this.skip.has(next) || this.layer.chunkEnd(this.chunkIndex) < pos || next.maxPoint < this.minPoint))
          break;
        this.chunkIndex++;
        forward = false;
      }
      let rangeIndex = this.chunkIndex == this.layer.chunk.length ? 0 : this.layer.chunk[this.chunkIndex].findIndex(pos - this.layer.chunkPos[this.chunkIndex], -1, side);
      if (!forward || this.rangeIndex < rangeIndex)
        this.rangeIndex = rangeIndex;
      this.next();
    }
    forward(pos, side) {
      if ((this.to - pos || this.endSide - side) < 0)
        this.gotoInner(pos, side, true);
    }
    next() {
      for (; ; ) {
        if (this.chunkIndex == this.layer.chunk.length) {
          this.from = this.to = 1e9;
          this.value = null;
          break;
        } else {
          let chunkPos = this.layer.chunkPos[this.chunkIndex], chunk = this.layer.chunk[this.chunkIndex];
          let from = chunkPos + chunk.from[this.rangeIndex];
          this.from = from;
          this.to = chunkPos + chunk.to[this.rangeIndex];
          this.value = chunk.value[this.rangeIndex];
          if (++this.rangeIndex == chunk.value.length) {
            this.chunkIndex++;
            if (this.skip) {
              while (this.chunkIndex < this.layer.chunk.length && this.skip.has(this.layer.chunk[this.chunkIndex]))
                this.chunkIndex++;
            }
            this.rangeIndex = 0;
          }
          if (this.minPoint < 0 || this.value.point && this.to - this.from >= this.minPoint)
            break;
        }
      }
    }
    nextChunk() {
      this.chunkIndex++;
      this.rangeIndex = 0;
      this.next();
    }
    compare(other) {
      return this.from - other.from || this.startSide - other.startSide || this.to - other.to || this.endSide - other.endSide;
    }
  };
  var HeapCursor = class {
    constructor(heap) {
      this.heap = heap;
    }
    static from(sets, skip = null, minPoint = -1) {
      let heap = [];
      for (let i = 0; i < sets.length; i++) {
        for (let cur2 = sets[i]; cur2 != RangeSet.empty; cur2 = cur2.nextLayer) {
          if (cur2.maxPoint >= minPoint)
            heap.push(new LayerCursor(cur2, skip, minPoint, i));
        }
      }
      return heap.length == 1 ? heap[0] : new HeapCursor(heap);
    }
    get startSide() {
      return this.value ? this.value.startSide : 0;
    }
    goto(pos, side = -1e9) {
      for (let cur2 of this.heap)
        cur2.goto(pos, side);
      for (let i = this.heap.length >> 1; i >= 0; i--)
        heapBubble(this.heap, i);
      this.next();
      return this;
    }
    forward(pos, side) {
      for (let cur2 of this.heap)
        cur2.forward(pos, side);
      for (let i = this.heap.length >> 1; i >= 0; i--)
        heapBubble(this.heap, i);
      if ((this.to - pos || this.value.endSide - side) < 0)
        this.next();
    }
    next() {
      if (this.heap.length == 0) {
        this.from = this.to = 1e9;
        this.value = null;
        this.rank = -1;
      } else {
        let top2 = this.heap[0];
        this.from = top2.from;
        this.to = top2.to;
        this.value = top2.value;
        this.rank = top2.rank;
        if (top2.value)
          top2.next();
        heapBubble(this.heap, 0);
      }
    }
  };
  function heapBubble(heap, index) {
    for (let cur2 = heap[index]; ; ) {
      let childIndex = (index << 1) + 1;
      if (childIndex >= heap.length)
        break;
      let child = heap[childIndex];
      if (childIndex + 1 < heap.length && child.compare(heap[childIndex + 1]) >= 0) {
        child = heap[childIndex + 1];
        childIndex++;
      }
      if (cur2.compare(child) < 0)
        break;
      heap[childIndex] = cur2;
      heap[index] = child;
      index = childIndex;
    }
  }
  var SpanCursor = class {
    constructor(sets, skip, minPoint) {
      this.minPoint = minPoint;
      this.active = [];
      this.activeTo = [];
      this.activeRank = [];
      this.minActive = -1;
      this.point = null;
      this.pointFrom = 0;
      this.pointRank = 0;
      this.to = -1e9;
      this.endSide = 0;
      this.openStart = -1;
      this.cursor = HeapCursor.from(sets, skip, minPoint);
    }
    goto(pos, side = -1e9) {
      this.cursor.goto(pos, side);
      this.active.length = this.activeTo.length = this.activeRank.length = 0;
      this.minActive = -1;
      this.to = pos;
      this.endSide = side;
      this.openStart = -1;
      this.next();
      return this;
    }
    forward(pos, side) {
      while (this.minActive > -1 && (this.activeTo[this.minActive] - pos || this.active[this.minActive].endSide - side) < 0)
        this.removeActive(this.minActive);
      this.cursor.forward(pos, side);
    }
    removeActive(index) {
      remove(this.active, index);
      remove(this.activeTo, index);
      remove(this.activeRank, index);
      this.minActive = findMinIndex(this.active, this.activeTo);
    }
    addActive(trackOpen) {
      let i = 0, {value, to, rank} = this.cursor;
      while (i < this.activeRank.length && this.activeRank[i] <= rank)
        i++;
      insert(this.active, i, value);
      insert(this.activeTo, i, to);
      insert(this.activeRank, i, rank);
      if (trackOpen)
        insert(trackOpen, i, this.cursor.from);
      this.minActive = findMinIndex(this.active, this.activeTo);
    }
    next() {
      let from = this.to;
      this.point = null;
      let trackOpen = this.openStart < 0 ? [] : null, trackExtra = 0;
      for (; ; ) {
        let a = this.minActive;
        if (a > -1 && (this.activeTo[a] - this.cursor.from || this.active[a].endSide - this.cursor.startSide) < 0) {
          if (this.activeTo[a] > from) {
            this.to = this.activeTo[a];
            this.endSide = this.active[a].endSide;
            break;
          }
          this.removeActive(a);
          if (trackOpen)
            remove(trackOpen, a);
        } else if (!this.cursor.value) {
          this.to = this.endSide = 1e9;
          break;
        } else if (this.cursor.from > from) {
          this.to = this.cursor.from;
          this.endSide = this.cursor.startSide;
          break;
        } else {
          let nextVal = this.cursor.value;
          if (!nextVal.point) {
            this.addActive(trackOpen);
            this.cursor.next();
          } else {
            this.point = nextVal;
            this.pointFrom = this.cursor.from;
            this.pointRank = this.cursor.rank;
            this.to = this.cursor.to;
            this.endSide = nextVal.endSide;
            if (this.cursor.from < from)
              trackExtra = 1;
            this.cursor.next();
            if (this.to > from)
              this.forward(this.to, this.endSide);
            break;
          }
        }
      }
      if (trackOpen) {
        let openStart = 0;
        while (openStart < trackOpen.length && trackOpen[openStart] < from)
          openStart++;
        this.openStart = openStart + trackExtra;
      }
    }
    activeForPoint(to) {
      if (!this.active.length)
        return this.active;
      let active = [];
      for (let i = 0; i < this.active.length; i++) {
        if (this.activeRank[i] > this.pointRank)
          break;
        if (this.activeTo[i] > to || this.activeTo[i] == to && this.active[i].endSide > this.point.endSide)
          active.push(this.active[i]);
      }
      return active;
    }
    openEnd(to) {
      let open = 0;
      while (open < this.activeTo.length && this.activeTo[open] > to)
        open++;
      return open;
    }
  };
  function compare(a, startA, b, startB, length, comparator) {
    a.goto(startA);
    b.goto(startB);
    let endB = startB + length;
    let pos = startB, dPos = startB - startA;
    for (; ; ) {
      let diff = a.to + dPos - b.to || a.endSide - b.endSide;
      let end = diff < 0 ? a.to + dPos : b.to, clipEnd = Math.min(end, endB);
      if (a.point || b.point) {
        if (!(a.point && b.point && (a.point == b.point || a.point.eq(b.point))))
          comparator.comparePoint(pos, clipEnd, a.point, b.point);
      } else {
        if (clipEnd > pos && !sameValues(a.active, b.active))
          comparator.compareRange(pos, clipEnd, a.active, b.active);
      }
      if (end > endB)
        break;
      pos = end;
      if (diff <= 0)
        a.next();
      if (diff >= 0)
        b.next();
    }
  }
  function sameValues(a, b) {
    if (a.length != b.length)
      return false;
    for (let i = 0; i < a.length; i++)
      if (a[i] != b[i] && !a[i].eq(b[i]))
        return false;
    return true;
  }
  function remove(array, index) {
    for (let i = index, e = array.length - 1; i < e; i++)
      array[i] = array[i + 1];
    array.pop();
  }
  function insert(array, index, value) {
    for (let i = array.length - 1; i >= index; i--)
      array[i + 1] = array[i];
    array[index] = value;
  }
  function findMinIndex(value, array) {
    let found = -1, foundPos = 1e9;
    for (let i = 0; i < array.length; i++)
      if ((array[i] - foundPos || value[i].endSide - value[found].endSide) < 0) {
        found = i;
        foundPos = array[i];
      }
    return found;
  }

  // ../view/src/browser.ts
  var [nav, doc] = typeof navigator != "undefined" ? [navigator, document] : [{userAgent: "", vendor: "", platform: ""}, {documentElement: {style: {}}}];
  var ie_edge = /Edge\/(\d+)/.exec(nav.userAgent);
  var ie_upto10 = /MSIE \d/.test(nav.userAgent);
  var ie_11up = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(nav.userAgent);
  var ie = !!(ie_upto10 || ie_11up || ie_edge);
  var gecko = !ie && /gecko\/(\d+)/i.test(nav.userAgent);
  var chrome = !ie && /Chrome\/(\d+)/.exec(nav.userAgent);
  var webkit = "webkitFontSmoothing" in doc.documentElement.style;
  var safari = !ie && /Apple Computer/.test(nav.vendor);
  var browser_default = {
    mac: /Mac/.test(nav.platform),
    ie,
    ie_version: ie_upto10 ? doc.documentMode || 6 : ie_11up ? +ie_11up[1] : ie_edge ? +ie_edge[1] : 0,
    gecko,
    gecko_version: gecko ? +(/Firefox\/(\d+)/.exec(nav.userAgent) || [0, 0])[1] : 0,
    chrome: !!chrome,
    chrome_version: chrome ? +chrome[1] : 0,
    ios: safari && (/Mobile\/\w+/.test(nav.userAgent) || nav.maxTouchPoints > 2),
    android: /Android\b/.test(nav.userAgent),
    webkit,
    safari,
    webkit_version: webkit ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1] : 0,
    tabSize: doc.documentElement.style.tabSize != null ? "tab-size" : "-moz-tab-size"
  };

  // ../view/src/dom.ts
  function getSelection(root) {
    return root.getSelection ? root.getSelection() : document.getSelection();
  }
  function selectionCollapsed(domSel) {
    let collapsed = domSel.isCollapsed;
    if (collapsed && browser_default.chrome && domSel.rangeCount && !domSel.getRangeAt(0).collapsed)
      collapsed = false;
    return collapsed;
  }
  function contains(dom, node) {
    return node ? dom.contains(node.nodeType != 1 ? node.parentNode : node) : false;
  }
  function hasSelection(dom, selection) {
    if (!selection.anchorNode)
      return false;
    try {
      return contains(dom, selection.anchorNode);
    } catch (_) {
      return false;
    }
  }
  function clientRectsFor(dom) {
    if (dom.nodeType == 3)
      return textRange(dom, 0, dom.nodeValue.length).getClientRects();
    else if (dom.nodeType == 1)
      return dom.getClientRects();
    else
      return [];
  }
  function isEquivalentPosition(node, off, targetNode, targetOff) {
    return targetNode ? scanFor(node, off, targetNode, targetOff, -1) || scanFor(node, off, targetNode, targetOff, 1) : false;
  }
  function domIndex(node) {
    for (var index = 0; ; index++) {
      node = node.previousSibling;
      if (!node)
        return index;
    }
  }
  function scanFor(node, off, targetNode, targetOff, dir) {
    for (; ; ) {
      if (node == targetNode && off == targetOff)
        return true;
      if (off == (dir < 0 ? 0 : maxOffset(node))) {
        if (node.nodeName == "DIV")
          return false;
        let parent = node.parentNode;
        if (!parent || parent.nodeType != 1)
          return false;
        off = domIndex(node) + (dir < 0 ? 0 : 1);
        node = parent;
      } else if (node.nodeType == 1) {
        node = node.childNodes[off + (dir < 0 ? -1 : 0)];
        off = dir < 0 ? maxOffset(node) : 0;
      } else {
        return false;
      }
    }
  }
  function maxOffset(node) {
    return node.nodeType == 3 ? node.nodeValue.length : node.childNodes.length;
  }
  var Rect0 = {left: 0, right: 0, top: 0, bottom: 0};
  function flattenRect(rect, left) {
    let x = left ? rect.left : rect.right;
    return {left: x, right: x, top: rect.top, bottom: rect.bottom};
  }
  function windowRect(win) {
    return {
      left: 0,
      right: win.innerWidth,
      top: 0,
      bottom: win.innerHeight
    };
  }
  var ScrollSpace = 5;
  function scrollRectIntoView(dom, rect) {
    let doc2 = dom.ownerDocument, win = doc2.defaultView;
    for (let cur2 = dom.parentNode; cur2; ) {
      if (cur2.nodeType == 1) {
        let bounding, top2 = cur2 == document.body;
        if (top2) {
          bounding = windowRect(win);
        } else {
          if (cur2.scrollHeight <= cur2.clientHeight && cur2.scrollWidth <= cur2.clientWidth) {
            cur2 = cur2.parentNode;
            continue;
          }
          let rect2 = cur2.getBoundingClientRect();
          bounding = {
            left: rect2.left,
            right: rect2.left + cur2.clientWidth,
            top: rect2.top,
            bottom: rect2.top + cur2.clientHeight
          };
        }
        let moveX = 0, moveY = 0;
        if (rect.top < bounding.top)
          moveY = -(bounding.top - rect.top + ScrollSpace);
        else if (rect.bottom > bounding.bottom)
          moveY = rect.bottom - bounding.bottom + ScrollSpace;
        if (rect.left < bounding.left)
          moveX = -(bounding.left - rect.left + ScrollSpace);
        else if (rect.right > bounding.right)
          moveX = rect.right - bounding.right + ScrollSpace;
        if (moveX || moveY) {
          if (top2) {
            win.scrollBy(moveX, moveY);
          } else {
            if (moveY) {
              let start = cur2.scrollTop;
              cur2.scrollTop += moveY;
              moveY = cur2.scrollTop - start;
            }
            if (moveX) {
              let start = cur2.scrollLeft;
              cur2.scrollLeft += moveX;
              moveX = cur2.scrollLeft - start;
            }
            rect = {
              left: rect.left - moveX,
              top: rect.top - moveY,
              right: rect.right - moveX,
              bottom: rect.bottom - moveY
            };
          }
        }
        if (top2)
          break;
        cur2 = cur2.assignedSlot || cur2.parentNode;
      } else if (cur2.nodeType == 11) {
        cur2 = cur2.host;
      } else {
        break;
      }
    }
  }
  var DOMSelection = class {
    constructor() {
      this.anchorNode = null;
      this.anchorOffset = 0;
      this.focusNode = null;
      this.focusOffset = 0;
    }
    eq(domSel) {
      return this.anchorNode == domSel.anchorNode && this.anchorOffset == domSel.anchorOffset && this.focusNode == domSel.focusNode && this.focusOffset == domSel.focusOffset;
    }
    set(domSel) {
      this.anchorNode = domSel.anchorNode;
      this.anchorOffset = domSel.anchorOffset;
      this.focusNode = domSel.focusNode;
      this.focusOffset = domSel.focusOffset;
    }
  };
  var preventScrollSupported = null;
  function focusPreventScroll(dom) {
    if (dom.setActive)
      return dom.setActive();
    if (preventScrollSupported)
      return dom.focus(preventScrollSupported);
    let stack = [];
    for (let cur2 = dom; cur2; cur2 = cur2.parentNode) {
      stack.push(cur2, cur2.scrollTop, cur2.scrollLeft);
      if (cur2 == cur2.ownerDocument)
        break;
    }
    dom.focus(preventScrollSupported == null ? {
      get preventScroll() {
        preventScrollSupported = {preventScroll: true};
        return true;
      }
    } : void 0);
    if (!preventScrollSupported) {
      preventScrollSupported = false;
      for (let i = 0; i < stack.length; ) {
        let elt = stack[i++], top2 = stack[i++], left = stack[i++];
        if (elt.scrollTop != top2)
          elt.scrollTop = top2;
        if (elt.scrollLeft != left)
          elt.scrollLeft = left;
      }
    }
  }
  var scratchRange;
  function textRange(node, from, to = from) {
    let range = scratchRange || (scratchRange = document.createRange());
    range.setEnd(node, to);
    range.setStart(node, from);
    return range;
  }

  // ../view/src/contentview.ts
  var Dirty;
  (function(Dirty2) {
    Dirty2[Dirty2["Not"] = 0] = "Not";
    Dirty2[Dirty2["Child"] = 1] = "Child";
    Dirty2[Dirty2["Node"] = 2] = "Node";
  })(Dirty || (Dirty = {}));
  var DOMPos = class {
    constructor(node, offset, precise = true) {
      this.node = node;
      this.offset = offset;
      this.precise = precise;
    }
    static before(dom, precise) {
      return new DOMPos(dom.parentNode, domIndex(dom), precise);
    }
    static after(dom, precise) {
      return new DOMPos(dom.parentNode, domIndex(dom) + 1, precise);
    }
  };
  var none2 = [];
  var ContentView = class {
    constructor() {
      this.parent = null;
      this.dom = null;
      this.dirty = 2;
    }
    get editorView() {
      if (!this.parent)
        throw new Error("Accessing view in orphan content view");
      return this.parent.editorView;
    }
    get overrideDOMText() {
      return null;
    }
    get posAtStart() {
      return this.parent ? this.parent.posBefore(this) : 0;
    }
    get posAtEnd() {
      return this.posAtStart + this.length;
    }
    posBefore(view) {
      let pos = this.posAtStart;
      for (let child of this.children) {
        if (child == view)
          return pos;
        pos += child.length + child.breakAfter;
      }
      throw new RangeError("Invalid child in posBefore");
    }
    posAfter(view) {
      return this.posBefore(view) + view.length;
    }
    coordsAt(_pos, _side) {
      return null;
    }
    sync(track) {
      if (this.dirty & 2) {
        let parent = this.dom, pos = null;
        for (let child of this.children) {
          if (child.dirty) {
            let next2 = pos ? pos.nextSibling : parent.firstChild;
            if (next2 && !child.dom && !ContentView.get(next2))
              child.reuseDOM(next2);
            child.sync(track);
            child.dirty = 0;
          }
          if (track && track.node == parent && pos != child.dom)
            track.written = true;
          syncNodeInto(parent, pos, child.dom);
          pos = child.dom;
        }
        let next = pos ? pos.nextSibling : parent.firstChild;
        if (next && track && track.node == parent)
          track.written = true;
        while (next)
          next = rm(next);
      } else if (this.dirty & 1) {
        for (let child of this.children)
          if (child.dirty) {
            child.sync(track);
            child.dirty = 0;
          }
      }
    }
    reuseDOM(_dom) {
      return false;
    }
    localPosFromDOM(node, offset) {
      let after;
      if (node == this.dom) {
        after = this.dom.childNodes[offset];
      } else {
        let bias = maxOffset(node) == 0 ? 0 : offset == 0 ? -1 : 1;
        for (; ; ) {
          let parent = node.parentNode;
          if (parent == this.dom)
            break;
          if (bias == 0 && parent.firstChild != parent.lastChild) {
            if (node == parent.firstChild)
              bias = -1;
            else
              bias = 1;
          }
          node = parent;
        }
        if (bias < 0)
          after = node;
        else
          after = node.nextSibling;
      }
      if (after == this.dom.firstChild)
        return 0;
      while (after && !ContentView.get(after))
        after = after.nextSibling;
      if (!after)
        return this.length;
      for (let i = 0, pos = 0; ; i++) {
        let child = this.children[i];
        if (child.dom == after)
          return pos;
        pos += child.length + child.breakAfter;
      }
    }
    domBoundsAround(from, to, offset = 0) {
      let fromI = -1, fromStart = -1, toI = -1, toEnd = -1;
      for (let i = 0, pos = offset; i < this.children.length; i++) {
        let child = this.children[i], end = pos + child.length;
        if (pos < from && end > to)
          return child.domBoundsAround(from, to, pos);
        if (end >= from && fromI == -1) {
          fromI = i;
          fromStart = pos;
        }
        if (end >= to && end != pos && toI == -1) {
          toI = i;
          toEnd = end;
          break;
        }
        pos = end + child.breakAfter;
      }
      return {
        from: fromStart,
        to: toEnd < 0 ? offset + this.length : toEnd,
        startDOM: (fromI ? this.children[fromI - 1].dom.nextSibling : null) || this.dom.firstChild,
        endDOM: toI < this.children.length - 1 && toI >= 0 ? this.children[toI + 1].dom : null
      };
    }
    markDirty(andParent = false) {
      if (this.dirty & 2)
        return;
      this.dirty |= 2;
      this.markParentsDirty(andParent);
    }
    markParentsDirty(childList) {
      for (let parent = this.parent; parent; parent = parent.parent) {
        if (childList)
          parent.dirty |= 2;
        if (parent.dirty & 1)
          return;
        parent.dirty |= 1;
        childList = false;
      }
    }
    setParent(parent) {
      if (this.parent != parent) {
        this.parent = parent;
        if (this.dirty)
          this.markParentsDirty(true);
      }
    }
    setDOM(dom) {
      this.dom = dom;
      dom.cmView = this;
    }
    get rootView() {
      for (let v = this; ; ) {
        let parent = v.parent;
        if (!parent)
          return v;
        v = parent;
      }
    }
    replaceChildren(from, to, children = none2) {
      this.markDirty();
      for (let i = from; i < to; i++)
        this.children[i].parent = null;
      this.children.splice(from, to - from, ...children);
      for (let i = 0; i < children.length; i++)
        children[i].setParent(this);
    }
    ignoreMutation(_rec) {
      return false;
    }
    ignoreEvent(_event) {
      return false;
    }
    childCursor(pos = this.length) {
      return new ChildCursor(this.children, pos, this.children.length);
    }
    childPos(pos, bias = 1) {
      return this.childCursor().findPos(pos, bias);
    }
    toString() {
      let name2 = this.constructor.name.replace("View", "");
      return name2 + (this.children.length ? "(" + this.children.join() + ")" : this.length ? "[" + (name2 == "Text" ? this.text : this.length) + "]" : "") + (this.breakAfter ? "#" : "");
    }
    static get(node) {
      return node.cmView;
    }
  };
  ContentView.prototype.breakAfter = 0;
  function rm(dom) {
    let next = dom.nextSibling;
    dom.parentNode.removeChild(dom);
    return next;
  }
  function syncNodeInto(parent, after, dom) {
    let next = after ? after.nextSibling : parent.firstChild;
    if (dom.parentNode == parent)
      while (next != dom)
        next = rm(next);
    else
      parent.insertBefore(dom, next);
  }
  var ChildCursor = class {
    constructor(children, pos, i) {
      this.children = children;
      this.pos = pos;
      this.i = i;
      this.off = 0;
    }
    findPos(pos, bias = 1) {
      for (; ; ) {
        if (pos > this.pos || pos == this.pos && (bias > 0 || this.i == 0 || this.children[this.i - 1].breakAfter)) {
          this.off = pos - this.pos;
          return this;
        }
        let next = this.children[--this.i];
        this.pos -= next.length + next.breakAfter;
      }
    }
  };

  // ../view/src/inlineview.ts
  var none3 = [];
  var InlineView = class extends ContentView {
    become(_other) {
      return false;
    }
    getSide() {
      return 0;
    }
  };
  InlineView.prototype.children = none3;
  var MaxJoinLen = 256;
  var TextView = class extends InlineView {
    constructor(text) {
      super();
      this.text = text;
    }
    get length() {
      return this.text.length;
    }
    createDOM(textDOM) {
      this.setDOM(textDOM || document.createTextNode(this.text));
    }
    sync(track) {
      if (!this.dom)
        this.createDOM();
      if (this.dom.nodeValue != this.text) {
        if (track && track.node == this.dom)
          track.written = true;
        this.dom.nodeValue = this.text;
      }
    }
    reuseDOM(dom) {
      if (dom.nodeType != 3)
        return false;
      this.createDOM(dom);
      return true;
    }
    merge(from, to, source) {
      if (source && (!(source instanceof TextView) || this.length - (to - from) + source.length > MaxJoinLen))
        return false;
      this.text = this.text.slice(0, from) + (source ? source.text : "") + this.text.slice(to);
      this.markDirty();
      return true;
    }
    slice(from) {
      return new TextView(this.text.slice(from));
    }
    localPosFromDOM(node, offset) {
      return node == this.dom ? offset : offset ? this.text.length : 0;
    }
    domAtPos(pos) {
      return new DOMPos(this.dom, pos);
    }
    domBoundsAround(_from, _to, offset) {
      return {from: offset, to: offset + this.length, startDOM: this.dom, endDOM: this.dom.nextSibling};
    }
    coordsAt(pos, side) {
      return textCoords(this.dom, pos, side);
    }
  };
  var MarkView = class extends InlineView {
    constructor(mark, children = [], length = 0) {
      super();
      this.mark = mark;
      this.children = children;
      this.length = length;
      for (let ch of children)
        ch.setParent(this);
    }
    createDOM() {
      let dom = document.createElement(this.mark.tagName);
      if (this.mark.class)
        dom.className = this.mark.class;
      if (this.mark.attrs)
        for (let name2 in this.mark.attrs)
          dom.setAttribute(name2, this.mark.attrs[name2]);
      this.setDOM(dom);
    }
    sync(track) {
      if (!this.dom)
        this.createDOM();
      super.sync(track);
    }
    merge(from, to, source, openStart, openEnd) {
      if (source && (!(source instanceof MarkView && source.mark.eq(this.mark)) || from && openStart <= 0 || to < this.length && openEnd <= 0))
        return false;
      mergeInlineChildren(this, from, to, source ? source.children : none3, openStart - 1, openEnd - 1);
      this.markDirty();
      return true;
    }
    slice(from) {
      return new MarkView(this.mark, sliceInlineChildren(this.children, from), this.length - from);
    }
    domAtPos(pos) {
      return inlineDOMAtPos(this.dom, this.children, pos);
    }
    coordsAt(pos, side) {
      return coordsInChildren(this, pos, side);
    }
  };
  function textCoords(text, pos, side) {
    let length = text.nodeValue.length;
    if (pos > length)
      pos = length;
    let from = pos, to = pos, flatten2 = 0;
    if (pos == 0 && side < 0 || pos == length && side >= 0) {
      if (!(browser_default.chrome || browser_default.gecko)) {
        if (pos) {
          from--;
          flatten2 = 1;
        } else {
          to++;
          flatten2 = -1;
        }
      }
    } else {
      if (side < 0)
        from--;
      else
        to++;
    }
    let rects = textRange(text, from, to).getClientRects();
    if (!rects.length)
      return Rect0;
    let rect = rects[(flatten2 ? flatten2 < 0 : side >= 0) ? 0 : rects.length - 1];
    if (browser_default.safari && !flatten2 && rect.width == 0)
      rect = Array.prototype.find.call(rects, (r) => r.width) || rect;
    return flatten2 ? flattenRect(rect, flatten2 < 0) : rect;
  }
  var WidgetView = class extends InlineView {
    constructor(widget, length, side) {
      super();
      this.widget = widget;
      this.length = length;
      this.side = side;
    }
    static create(widget, length, side) {
      return new (widget.customView || WidgetView)(widget, length, side);
    }
    slice(from) {
      return WidgetView.create(this.widget, this.length - from, this.side);
    }
    sync() {
      if (!this.dom || !this.widget.updateDOM(this.dom)) {
        this.setDOM(this.widget.toDOM(this.editorView));
        this.dom.contentEditable = "false";
      }
    }
    getSide() {
      return this.side;
    }
    merge(from, to, source, openStart, openEnd) {
      if (source && (!(source instanceof WidgetView) || !this.widget.compare(source.widget) || from > 0 && openStart <= 0 || to < this.length && openEnd <= 0))
        return false;
      this.length = from + (source ? source.length : 0) + (this.length - to);
      return true;
    }
    become(other) {
      if (other.length == this.length && other instanceof WidgetView && other.side == this.side) {
        if (this.widget.constructor == other.widget.constructor) {
          if (!this.widget.eq(other.widget))
            this.markDirty(true);
          this.widget = other.widget;
          return true;
        }
      }
      return false;
    }
    ignoreMutation() {
      return true;
    }
    ignoreEvent(event) {
      return this.widget.ignoreEvent(event);
    }
    get overrideDOMText() {
      if (this.length == 0)
        return Text.empty;
      let top2 = this;
      while (top2.parent)
        top2 = top2.parent;
      let view = top2.editorView, text = view && view.state.doc, start = this.posAtStart;
      return text ? text.slice(start, start + this.length) : Text.empty;
    }
    domAtPos(pos) {
      return pos == 0 ? DOMPos.before(this.dom) : DOMPos.after(this.dom, pos == this.length);
    }
    domBoundsAround() {
      return null;
    }
    coordsAt(pos, side) {
      let rects = this.dom.getClientRects(), rect = null;
      if (!rects.length)
        return Rect0;
      for (let i = pos > 0 ? rects.length - 1 : 0; ; i += pos > 0 ? -1 : 1) {
        rect = rects[i];
        if (pos > 0 ? i == 0 : i == rects.length - 1 || rect.top < rect.bottom)
          break;
      }
      return pos == 0 && side > 0 || pos == this.length && side <= 0 ? rect : flattenRect(rect, pos == 0);
    }
  };
  var CompositionView = class extends WidgetView {
    domAtPos(pos) {
      return new DOMPos(this.widget.text, pos);
    }
    sync() {
      if (!this.dom)
        this.setDOM(this.widget.toDOM());
    }
    localPosFromDOM(node, offset) {
      return !offset ? 0 : node.nodeType == 3 ? Math.min(offset, this.length) : this.length;
    }
    ignoreMutation() {
      return false;
    }
    get overrideDOMText() {
      return null;
    }
    coordsAt(pos, side) {
      return textCoords(this.widget.text, pos, side);
    }
  };
  function mergeInlineChildren(parent, from, to, elts, openStart, openEnd) {
    let cur2 = parent.childCursor();
    let {i: toI, off: toOff} = cur2.findPos(to, 1);
    let {i: fromI, off: fromOff} = cur2.findPos(from, -1);
    let dLen = from - to;
    for (let view of elts)
      dLen += view.length;
    parent.length += dLen;
    let {children} = parent;
    if (fromI == toI && fromOff) {
      let start = children[fromI];
      if (elts.length == 1 && start.merge(fromOff, toOff, elts[0], openStart, openEnd))
        return;
      if (elts.length == 0) {
        start.merge(fromOff, toOff, null, openStart, openEnd);
        return;
      }
      let after = start.slice(toOff);
      if (after.merge(0, 0, elts[elts.length - 1], 0, openEnd))
        elts[elts.length - 1] = after;
      else
        elts.push(after);
      toI++;
      openEnd = toOff = 0;
    }
    if (toOff) {
      let end = children[toI];
      if (elts.length && end.merge(0, toOff, elts[elts.length - 1], 0, openEnd)) {
        elts.pop();
        openEnd = 0;
      } else {
        end.merge(0, toOff, null, 0, 0);
      }
    } else if (toI < children.length && elts.length && children[toI].merge(0, 0, elts[elts.length - 1], 0, openEnd)) {
      elts.pop();
      openEnd = 0;
    }
    if (fromOff) {
      let start = children[fromI];
      if (elts.length && start.merge(fromOff, start.length, elts[0], openStart, 0)) {
        elts.shift();
        openStart = 0;
      } else {
        start.merge(fromOff, start.length, null, 0, 0);
      }
      fromI++;
    } else if (fromI && elts.length) {
      let end = children[fromI - 1];
      if (end.merge(end.length, end.length, elts[0], openStart, 0)) {
        elts.shift();
        openStart = 0;
      }
    }
    while (fromI < toI && elts.length && children[toI - 1].become(elts[elts.length - 1])) {
      elts.pop();
      toI--;
      openEnd = 0;
    }
    while (fromI < toI && elts.length && children[fromI].become(elts[0])) {
      elts.shift();
      fromI++;
      openStart = 0;
    }
    if (!elts.length && fromI && toI < children.length && openStart && openEnd && children[toI].merge(0, 0, children[fromI - 1], openStart, openEnd))
      fromI--;
    if (elts.length || fromI != toI)
      parent.replaceChildren(fromI, toI, elts);
  }
  function sliceInlineChildren(children, from) {
    let result = [], off = 0;
    for (let elt of children) {
      let end = off + elt.length;
      if (end > from)
        result.push(off < from ? elt.slice(from - off) : elt);
      off = end;
    }
    return result;
  }
  function inlineDOMAtPos(dom, children, pos) {
    let i = 0;
    for (let off = 0; i < children.length; i++) {
      let child = children[i], end = off + child.length;
      if (end == off && child.getSide() <= 0)
        continue;
      if (pos > off && pos < end && child.dom.parentNode == dom)
        return child.domAtPos(pos - off);
      if (pos <= off)
        break;
      off = end;
    }
    for (; i > 0; i--) {
      let before = children[i - 1].dom;
      if (before.parentNode == dom)
        return DOMPos.after(before);
    }
    return new DOMPos(dom, 0);
  }
  function joinInlineInto(parent, view, open) {
    let last, {children} = parent;
    if (open > 0 && view instanceof MarkView && children.length && (last = children[children.length - 1]) instanceof MarkView && last.mark.eq(view.mark)) {
      joinInlineInto(last, view.children[0], open - 1);
    } else {
      children.push(view);
      view.setParent(parent);
    }
    parent.length += view.length;
  }
  function coordsInChildren(view, pos, side) {
    for (let off = 0, i = 0; i < view.children.length; i++) {
      let child = view.children[i], end = off + child.length;
      if (end == off && child.getSide() <= 0)
        continue;
      if (side <= 0 || end == view.length ? end >= pos : end > pos)
        return child.coordsAt(pos - off, side);
      off = end;
    }
    return (view.dom.lastChild || view.dom).getBoundingClientRect();
  }

  // ../view/src/attributes.ts
  function combineAttrs(source, target) {
    for (let name2 in source) {
      if (name2 == "class" && target.class)
        target.class += " " + source.class;
      else if (name2 == "style" && target.style)
        target.style += ";" + source.style;
      else
        target[name2] = source[name2];
    }
    return target;
  }
  function attrsEq(a, b) {
    if (a == b)
      return true;
    if (!a || !b)
      return false;
    let keysA = Object.keys(a), keysB = Object.keys(b);
    if (keysA.length != keysB.length)
      return false;
    for (let key of keysA) {
      if (keysB.indexOf(key) == -1 || a[key] !== b[key])
        return false;
    }
    return true;
  }
  function updateAttrs(dom, prev, attrs) {
    if (prev) {
      for (let name2 in prev)
        if (!(attrs && name2 in attrs))
          dom.removeAttribute(name2);
    }
    if (attrs) {
      for (let name2 in attrs)
        if (!(prev && prev[name2] == attrs[name2]))
          dom.setAttribute(name2, attrs[name2]);
    }
  }

  // ../view/src/decoration.ts
  var WidgetType = class {
    eq(_widget) {
      return false;
    }
    updateDOM(_dom) {
      return false;
    }
    compare(other) {
      return this == other || this.constructor == other.constructor && this.eq(other);
    }
    get estimatedHeight() {
      return -1;
    }
    ignoreEvent(_event) {
      return true;
    }
    get customView() {
      return null;
    }
  };
  var Side;
  (function(Side2) {
    Side2[Side2["BigInline"] = 1e8] = "BigInline";
    Side2[Side2["BigBlock"] = 2e8] = "BigBlock";
  })(Side || (Side = {}));
  var BlockType;
  (function(BlockType2) {
    BlockType2[BlockType2["Text"] = 0] = "Text";
    BlockType2[BlockType2["WidgetBefore"] = 1] = "WidgetBefore";
    BlockType2[BlockType2["WidgetAfter"] = 2] = "WidgetAfter";
    BlockType2[BlockType2["WidgetRange"] = 3] = "WidgetRange";
  })(BlockType || (BlockType = {}));
  var Decoration = class extends RangeValue {
    constructor(startSide, endSide, widget, spec) {
      super();
      this.startSide = startSide;
      this.endSide = endSide;
      this.widget = widget;
      this.spec = spec;
    }
    get heightRelevant() {
      return false;
    }
    static mark(spec) {
      return new MarkDecoration(spec);
    }
    static widget(spec) {
      let side = spec.side || 0;
      if (spec.block)
        side += (2e8 + 1) * (side > 0 ? 1 : -1);
      return new PointDecoration(spec, side, side, !!spec.block, spec.widget || null, false);
    }
    static replace(spec) {
      let block = !!spec.block;
      let {start, end} = getInclusive(spec);
      let startSide = block ? -2e8 * (start ? 2 : 1) : 1e8 * (start ? -1 : 1);
      let endSide = block ? 2e8 * (end ? 2 : 1) : 1e8 * (end ? 1 : -1);
      return new PointDecoration(spec, startSide, endSide, block, spec.widget || null, true);
    }
    static line(spec) {
      return new LineDecoration(spec);
    }
    static set(of, sort = false) {
      return RangeSet.of(of, sort);
    }
    hasHeight() {
      return this.widget ? this.widget.estimatedHeight > -1 : false;
    }
  };
  Decoration.none = RangeSet.empty;
  var MarkDecoration = class extends Decoration {
    constructor(spec) {
      let {start, end} = getInclusive(spec);
      super(1e8 * (start ? -1 : 1), 1e8 * (end ? 1 : -1), null, spec);
      this.tagName = spec.tagName || "span";
      this.class = spec.class || "";
      this.attrs = spec.attributes || null;
    }
    eq(other) {
      return this == other || other instanceof MarkDecoration && this.tagName == other.tagName && this.class == other.class && attrsEq(this.attrs, other.attrs);
    }
    range(from, to = from) {
      if (from >= to)
        throw new RangeError("Mark decorations may not be empty");
      return super.range(from, to);
    }
  };
  MarkDecoration.prototype.point = false;
  var LineDecoration = class extends Decoration {
    constructor(spec) {
      super(-1e8, -1e8, null, spec);
    }
    eq(other) {
      return other instanceof LineDecoration && attrsEq(this.spec.attributes, other.spec.attributes);
    }
    range(from, to = from) {
      if (to != from)
        throw new RangeError("Line decoration ranges must be zero-length");
      return super.range(from, to);
    }
  };
  LineDecoration.prototype.mapMode = MapMode.TrackBefore;
  LineDecoration.prototype.point = true;
  var PointDecoration = class extends Decoration {
    constructor(spec, startSide, endSide, block, widget, isReplace) {
      super(startSide, endSide, widget, spec);
      this.block = block;
      this.isReplace = isReplace;
      this.mapMode = !block ? MapMode.TrackDel : startSide < 0 ? MapMode.TrackBefore : MapMode.TrackAfter;
    }
    get type() {
      return this.startSide < this.endSide ? 3 : this.startSide < 0 ? 1 : 2;
    }
    get heightRelevant() {
      return this.block || !!this.widget && this.widget.estimatedHeight >= 5;
    }
    eq(other) {
      return other instanceof PointDecoration && widgetsEq(this.widget, other.widget) && this.block == other.block && this.startSide == other.startSide && this.endSide == other.endSide;
    }
    range(from, to = from) {
      if (this.isReplace && (from > to || from == to && this.startSide > 0 && this.endSide < 0))
        throw new RangeError("Invalid range for replacement decoration");
      if (!this.isReplace && to != from)
        throw new RangeError("Widget decorations can only have zero-length ranges");
      return super.range(from, to);
    }
  };
  PointDecoration.prototype.point = true;
  function getInclusive(spec) {
    let {inclusiveStart: start, inclusiveEnd: end} = spec;
    if (start == null)
      start = spec.inclusive;
    if (end == null)
      end = spec.inclusive;
    return {start: start || false, end: end || false};
  }
  function widgetsEq(a, b) {
    return a == b || !!(a && b && a.compare(b));
  }
  function addRange(from, to, ranges, margin = 0) {
    let last = ranges.length - 1;
    if (last >= 0 && ranges[last] + margin > from)
      ranges[last] = Math.max(ranges[last], to);
    else
      ranges.push(from, to);
  }

  // ../view/src/blockview.ts
  var LineView = class extends ContentView {
    constructor() {
      super(...arguments);
      this.children = [];
      this.length = 0;
      this.prevAttrs = void 0;
      this.attrs = null;
      this.breakAfter = 0;
    }
    merge(from, to, source, takeDeco, openStart, openEnd) {
      if (source) {
        if (!(source instanceof LineView))
          return false;
        if (!this.dom)
          source.transferDOM(this);
      }
      if (takeDeco)
        this.setDeco(source ? source.attrs : null);
      mergeInlineChildren(this, from, to, source ? source.children : none4, openStart, openEnd);
      return true;
    }
    split(at) {
      let end = new LineView();
      end.breakAfter = this.breakAfter;
      if (this.length == 0)
        return end;
      let {i, off} = this.childPos(at);
      if (off) {
        end.append(this.children[i].slice(off), 0);
        this.children[i].merge(off, this.children[i].length, null, 0, 0);
        i++;
      }
      for (let j = i; j < this.children.length; j++)
        end.append(this.children[j], 0);
      while (i > 0 && this.children[i - 1].length == 0) {
        this.children[i - 1].parent = null;
        i--;
      }
      this.children.length = i;
      this.markDirty();
      this.length = at;
      return end;
    }
    transferDOM(other) {
      if (!this.dom)
        return;
      other.setDOM(this.dom);
      other.prevAttrs = this.prevAttrs === void 0 ? this.attrs : this.prevAttrs;
      this.prevAttrs = void 0;
      this.dom = null;
    }
    setDeco(attrs) {
      if (!attrsEq(this.attrs, attrs)) {
        if (this.dom) {
          this.prevAttrs = this.attrs;
          this.markDirty();
        }
        this.attrs = attrs;
      }
    }
    append(child, openStart) {
      joinInlineInto(this, child, openStart);
    }
    addLineDeco(deco) {
      let attrs = deco.spec.attributes;
      if (attrs)
        this.attrs = combineAttrs(attrs, this.attrs || {});
    }
    domAtPos(pos) {
      return inlineDOMAtPos(this.dom, this.children, pos);
    }
    sync(track) {
      if (!this.dom) {
        this.setDOM(document.createElement("div"));
        this.dom.className = "cm-line";
        this.prevAttrs = this.attrs ? null : void 0;
      }
      if (this.prevAttrs !== void 0) {
        updateAttrs(this.dom, this.prevAttrs, this.attrs);
        this.dom.classList.add("cm-line");
        this.prevAttrs = void 0;
      }
      super.sync(track);
      let last = this.dom.lastChild;
      if (!last || last.nodeName != "BR" && ContentView.get(last) instanceof WidgetView) {
        let hack = document.createElement("BR");
        hack.cmIgnore = true;
        this.dom.appendChild(hack);
      }
    }
    measureTextSize() {
      if (this.children.length == 0 || this.length > 20)
        return null;
      let totalWidth = 0;
      for (let child of this.children) {
        if (!(child instanceof TextView))
          return null;
        let rects = clientRectsFor(child.dom);
        if (rects.length != 1)
          return null;
        totalWidth += rects[0].width;
      }
      return {
        lineHeight: this.dom.getBoundingClientRect().height,
        charWidth: totalWidth / this.length
      };
    }
    coordsAt(pos, side) {
      return coordsInChildren(this, pos, side);
    }
    match(_other) {
      return false;
    }
    get type() {
      return BlockType.Text;
    }
    static find(docView, pos) {
      for (let i = 0, off = 0; ; i++) {
        let block = docView.children[i], end = off + block.length;
        if (end >= pos) {
          if (block instanceof LineView)
            return block;
          if (block.length)
            return null;
        }
        off = end + block.breakAfter;
      }
    }
  };
  var none4 = [];
  var BlockWidgetView = class extends ContentView {
    constructor(widget, length, type) {
      super();
      this.widget = widget;
      this.length = length;
      this.type = type;
      this.breakAfter = 0;
    }
    merge(from, to, source, _takeDeco, openStart, openEnd) {
      if (source && (!(source instanceof BlockWidgetView) || !this.widget.compare(source.widget) || from > 0 && openStart <= 0 || to < this.length && openEnd <= 0))
        return false;
      this.length = from + (source ? source.length : 0) + (this.length - to);
      return true;
    }
    domAtPos(pos) {
      return pos == 0 ? DOMPos.before(this.dom) : DOMPos.after(this.dom, pos == this.length);
    }
    split(at) {
      let len = this.length - at;
      this.length = at;
      return new BlockWidgetView(this.widget, len, this.type);
    }
    get children() {
      return none4;
    }
    sync() {
      if (!this.dom || !this.widget.updateDOM(this.dom)) {
        this.setDOM(this.widget.toDOM(this.editorView));
        this.dom.contentEditable = "false";
      }
    }
    get overrideDOMText() {
      return this.parent ? this.parent.view.state.doc.slice(this.posAtStart, this.posAtEnd) : Text.empty;
    }
    domBoundsAround() {
      return null;
    }
    match(other) {
      if (other instanceof BlockWidgetView && other.type == this.type && other.widget.constructor == this.widget.constructor) {
        if (!other.widget.eq(this.widget))
          this.markDirty(true);
        this.widget = other.widget;
        this.length = other.length;
        this.breakAfter = other.breakAfter;
        return true;
      }
      return false;
    }
    ignoreMutation() {
      return true;
    }
    ignoreEvent(event) {
      return this.widget.ignoreEvent(event);
    }
  };

  // ../view/src/buildview.ts
  var T;
  (function(T3) {
    T3[T3["Chunk"] = 512] = "Chunk";
  })(T || (T = {}));
  var ContentBuilder = class {
    constructor(doc2, pos, end) {
      this.doc = doc2;
      this.pos = pos;
      this.end = end;
      this.content = [];
      this.curLine = null;
      this.breakAtStart = 0;
      this.openStart = -1;
      this.openEnd = -1;
      this.text = "";
      this.textOff = 0;
      this.cursor = doc2.iter();
      this.skip = pos;
    }
    posCovered() {
      if (this.content.length == 0)
        return !this.breakAtStart && this.doc.lineAt(this.pos).from != this.pos;
      let last = this.content[this.content.length - 1];
      return !last.breakAfter && !(last instanceof BlockWidgetView && last.type == BlockType.WidgetBefore);
    }
    getLine() {
      if (!this.curLine)
        this.content.push(this.curLine = new LineView());
      return this.curLine;
    }
    addWidget(view) {
      this.curLine = null;
      this.content.push(view);
    }
    finish() {
      if (!this.posCovered())
        this.getLine();
    }
    wrapMarks(view, active) {
      for (let i = active.length - 1; i >= 0; i--)
        view = new MarkView(active[i], [view], view.length);
      return view;
    }
    buildText(length, active, openStart) {
      while (length > 0) {
        if (this.textOff == this.text.length) {
          let {value, lineBreak, done} = this.cursor.next(this.skip);
          this.skip = 0;
          if (done)
            throw new Error("Ran out of text content when drawing inline views");
          if (lineBreak) {
            if (!this.posCovered())
              this.getLine();
            if (this.content.length)
              this.content[this.content.length - 1].breakAfter = 1;
            else
              this.breakAtStart = 1;
            this.curLine = null;
            length--;
            continue;
          } else {
            this.text = value;
            this.textOff = 0;
          }
        }
        let take = Math.min(this.text.length - this.textOff, length, 512);
        this.getLine().append(this.wrapMarks(new TextView(this.text.slice(this.textOff, this.textOff + take)), active), openStart);
        this.textOff += take;
        length -= take;
        openStart = 0;
      }
    }
    span(from, to, active, openStart) {
      this.buildText(to - from, active, openStart);
      this.pos = to;
      if (this.openStart < 0)
        this.openStart = openStart;
    }
    point(from, to, deco, active, openStart) {
      let len = to - from;
      if (deco instanceof PointDecoration) {
        if (deco.block) {
          let {type} = deco;
          if (type == BlockType.WidgetAfter && !this.posCovered())
            this.getLine();
          this.addWidget(new BlockWidgetView(deco.widget || new NullWidget("div"), len, type));
        } else {
          let widget = this.wrapMarks(WidgetView.create(deco.widget || new NullWidget("span"), len, deco.startSide), active);
          this.getLine().append(widget, openStart);
        }
      } else if (this.doc.lineAt(this.pos).from == this.pos) {
        this.getLine().addLineDeco(deco);
      }
      if (len) {
        if (this.textOff + len <= this.text.length) {
          this.textOff += len;
        } else {
          this.skip += len - (this.text.length - this.textOff);
          this.text = "";
          this.textOff = 0;
        }
        this.pos = to;
      }
      if (this.openStart < 0)
        this.openStart = openStart;
    }
    static build(text, from, to, decorations2) {
      let builder = new ContentBuilder(text, from, to);
      builder.openEnd = RangeSet.spans(decorations2, from, to, builder);
      if (builder.openStart < 0)
        builder.openStart = builder.openEnd;
      builder.finish();
      return builder;
    }
  };
  var NullWidget = class extends WidgetType {
    constructor(tag) {
      super();
      this.tag = tag;
    }
    eq(other) {
      return other.tag == this.tag;
    }
    toDOM() {
      return document.createElement(this.tag);
    }
    updateDOM(elt) {
      return elt.nodeName.toLowerCase() == this.tag;
    }
  };

  // ../view/src/extension.ts
  var none5 = [];
  var clickAddsSelectionRange = Facet.define();
  var dragMovesSelection = Facet.define();
  var mouseSelectionStyle = Facet.define();
  var exceptionSink = Facet.define();
  var updateListener = Facet.define();
  var inputHandler = Facet.define();
  function logException(state, exception, context) {
    let handler = state.facet(exceptionSink);
    if (handler.length)
      handler[0](exception);
    else if (window.onerror)
      window.onerror(String(exception), context, void 0, void 0, exception);
    else if (context)
      console.error(context + ":", exception);
    else
      console.error(exception);
  }
  var editable = Facet.define({combine: (values) => values.length ? values[0] : true});
  var PluginFieldProvider = class {
    constructor(field, get) {
      this.field = field;
      this.get = get;
    }
  };
  // isFieldProvider;
  var _PluginField = class {
    from(get) {
      return new PluginFieldProvider(this, get);
    }
    static define() {
      return new _PluginField();
    }
  };
  var PluginField = _PluginField;
  PluginField.decorations = _PluginField.define();
  PluginField.scrollMargins = _PluginField.define();
  var nextPluginID = 0;
  var viewPlugin = Facet.define();
  var ViewPlugin = class {
    constructor(id, create, fields) {
      this.id = id;
      this.create = create;
      this.fields = fields;
      this.extension = viewPlugin.of(this);
    }
    static define(create, spec) {
      let {eventHandlers, provide, decorations: decorations2} = spec || {};
      let fields = [];
      if (provide)
        for (let provider of Array.isArray(provide) ? provide : [provide])
          fields.push(provider);
      if (eventHandlers)
        fields.push(domEventHandlers.from((value) => ({plugin: value, handlers: eventHandlers})));
      if (decorations2)
        fields.push(PluginField.decorations.from(decorations2));
      return new ViewPlugin(nextPluginID++, create, fields);
    }
    static fromClass(cls, spec) {
      return ViewPlugin.define((view) => new cls(view), spec);
    }
  };
  var domEventHandlers = PluginField.define();
  var _PluginInstance = class {
    constructor(spec) {
      this.spec = spec;
      this.mustUpdate = null;
      this.value = null;
    }
    takeField(type, target) {
      for (let {field, get} of this.spec.fields)
        if (field == type)
          target.push(get(this.value));
    }
    update(view) {
      if (!this.value) {
        try {
          this.value = this.spec.create(view);
        } catch (e) {
          logException(view.state, e, "CodeMirror plugin crashed");
          return _PluginInstance.dummy;
        }
      } else if (this.mustUpdate) {
        let update = this.mustUpdate;
        this.mustUpdate = null;
        if (!this.value.update)
          return this;
        try {
          this.value.update(update);
        } catch (e) {
          logException(update.state, e, "CodeMirror plugin crashed");
          if (this.value.destroy)
            try {
              this.value.destroy();
            } catch (_) {
            }
          return _PluginInstance.dummy;
        }
      }
      return this;
    }
    destroy(view) {
      if (this.value?.destroy) {
        try {
          this.value.destroy();
        } catch (e) {
          logException(view.state, e, "CodeMirror plugin crashed");
        }
      }
    }
  };
  var PluginInstance = _PluginInstance;
  PluginInstance.dummy = new _PluginInstance(ViewPlugin.define(() => ({})));
  var editorAttributes = Facet.define({
    combine: (values) => values.reduce((a, b) => combineAttrs(b, a), {})
  });
  var contentAttributes = Facet.define({
    combine: (values) => values.reduce((a, b) => combineAttrs(b, a), {})
  });
  var decorations = Facet.define();
  var styleModule = Facet.define();
  var UpdateFlag;
  (function(UpdateFlag2) {
    UpdateFlag2[UpdateFlag2["Focus"] = 1] = "Focus";
    UpdateFlag2[UpdateFlag2["Height"] = 2] = "Height";
    UpdateFlag2[UpdateFlag2["Viewport"] = 4] = "Viewport";
    UpdateFlag2[UpdateFlag2["LineGaps"] = 8] = "LineGaps";
    UpdateFlag2[UpdateFlag2["Geometry"] = 16] = "Geometry";
  })(UpdateFlag || (UpdateFlag = {}));
  var ChangedRange = class {
    constructor(fromA, toA, fromB, toB) {
      this.fromA = fromA;
      this.toA = toA;
      this.fromB = fromB;
      this.toB = toB;
    }
    join(other) {
      return new ChangedRange(Math.min(this.fromA, other.fromA), Math.max(this.toA, other.toA), Math.min(this.fromB, other.fromB), Math.max(this.toB, other.toB));
    }
    addToSet(set) {
      let i = set.length, me = this;
      for (; i > 0; i--) {
        let range = set[i - 1];
        if (range.fromA > me.toA)
          continue;
        if (range.toA < me.fromA)
          break;
        me = me.join(range);
        set.splice(i - 1, 1);
      }
      set.splice(i, 0, me);
      return set;
    }
    static extendWithRanges(diff, ranges) {
      if (ranges.length == 0)
        return diff;
      let result = [];
      for (let dI = 0, rI = 0, posA = 0, posB = 0; ; dI++) {
        let next = dI == diff.length ? null : diff[dI], off = posA - posB;
        let end = next ? next.fromB : 1e9;
        while (rI < ranges.length && ranges[rI] < end) {
          let from = ranges[rI], to = ranges[rI + 1];
          let fromB = Math.max(posB, from), toB = Math.min(end, to);
          if (fromB <= toB)
            new ChangedRange(fromB + off, toB + off, fromB, toB).addToSet(result);
          if (to > end)
            break;
          else
            rI += 2;
        }
        if (!next)
          return result;
        new ChangedRange(next.fromA, next.toA, next.fromB, next.toB).addToSet(result);
        posA = next.toA;
        posB = next.toB;
      }
    }
  };
  var ViewUpdate = class {
    constructor(view, state, transactions = none5) {
      this.view = view;
      this.state = state;
      this.transactions = transactions;
      this.flags = 0;
      this.startState = view.state;
      this.changes = ChangeSet.empty(this.startState.doc.length);
      for (let tr of transactions)
        this.changes = this.changes.compose(tr.changes);
      let changedRanges = [];
      this.changes.iterChangedRanges((fromA, toA, fromB, toB) => changedRanges.push(new ChangedRange(fromA, toA, fromB, toB)));
      this.changedRanges = changedRanges;
      let focus = view.hasFocus;
      if (focus != view.inputState.notifiedFocused) {
        view.inputState.notifiedFocused = focus;
        this.flags |= 1;
      }
      if (this.docChanged)
        this.flags |= 2;
    }
    get viewportChanged() {
      return (this.flags & 4) > 0;
    }
    get heightChanged() {
      return (this.flags & 2) > 0;
    }
    get geometryChanged() {
      return this.docChanged || (this.flags & (16 | 2)) > 0;
    }
    get focusChanged() {
      return (this.flags & 1) > 0;
    }
    get docChanged() {
      return this.transactions.some((tr) => tr.docChanged);
    }
    get selectionSet() {
      return this.transactions.some((tr) => tr.selection);
    }
    get empty() {
      return this.flags == 0 && this.transactions.length == 0;
    }
  };

  // ../view/src/docview.ts
  var DocView = class extends ContentView {
    constructor(view) {
      super();
      this.view = view;
      this.compositionDeco = Decoration.none;
      this.decorations = [];
      this.minWidth = 0;
      this.minWidthFrom = 0;
      this.minWidthTo = 0;
      this.impreciseAnchor = null;
      this.impreciseHead = null;
      this.setDOM(view.contentDOM);
      this.children = [new LineView()];
      this.children[0].setParent(this);
      this.updateInner([new ChangedRange(0, 0, 0, view.state.doc.length)], this.updateDeco(), 0);
    }
    get root() {
      return this.view.root;
    }
    get editorView() {
      return this.view;
    }
    get length() {
      return this.view.state.doc.length;
    }
    update(update) {
      let changedRanges = update.changedRanges;
      if (this.minWidth > 0 && changedRanges.length) {
        if (!changedRanges.every(({fromA, toA}) => toA < this.minWidthFrom || fromA > this.minWidthTo)) {
          this.minWidth = 0;
        } else {
          this.minWidthFrom = update.changes.mapPos(this.minWidthFrom, 1);
          this.minWidthTo = update.changes.mapPos(this.minWidthTo, 1);
        }
      }
      if (this.view.inputState.composing < 0)
        this.compositionDeco = Decoration.none;
      else if (update.transactions.length)
        this.compositionDeco = computeCompositionDeco(this.view, update.changes);
      let forceSelection = (browser_default.ie || browser_default.chrome) && !this.compositionDeco.size && update && update.state.doc.lines != update.startState.doc.lines;
      let prevDeco = this.decorations, deco = this.updateDeco();
      let decoDiff = findChangedDeco(prevDeco, deco, update.changes);
      changedRanges = ChangedRange.extendWithRanges(changedRanges, decoDiff);
      let pointerSel = update.transactions.some((tr) => tr.annotation(Transaction.userEvent) == "pointerselection");
      if (this.dirty == Dirty.Not && changedRanges.length == 0 && !(update.flags & (UpdateFlag.Viewport | UpdateFlag.LineGaps)) && update.state.selection.main.from >= this.view.viewport.from && update.state.selection.main.to <= this.view.viewport.to) {
        this.updateSelection(forceSelection, pointerSel);
        return false;
      } else {
        this.updateInner(changedRanges, deco, update.startState.doc.length, forceSelection, pointerSel);
        return true;
      }
    }
    updateInner(changes, deco, oldLength, forceSelection = false, pointerSel = false) {
      this.updateChildren(changes, deco, oldLength);
      this.view.observer.ignore(() => {
        this.dom.style.height = this.view.viewState.domHeight + "px";
        this.dom.style.minWidth = this.minWidth ? this.minWidth + "px" : "";
        let track = browser_default.chrome ? {node: getSelection(this.view.root).focusNode, written: false} : void 0;
        this.sync(track);
        this.dirty = Dirty.Not;
        if (track?.written)
          forceSelection = true;
        this.updateSelection(forceSelection, pointerSel);
        this.dom.style.height = "";
      });
    }
    updateChildren(changes, deco, oldLength) {
      let cursor = this.childCursor(oldLength);
      for (let i = changes.length - 1; ; i--) {
        let next = i >= 0 ? changes[i] : null;
        if (!next)
          break;
        let {fromA, toA, fromB, toB} = next;
        let {content: content2, breakAtStart, openStart, openEnd} = ContentBuilder.build(this.view.state.doc, fromB, toB, deco);
        let {i: toI, off: toOff} = cursor.findPos(toA, 1);
        let {i: fromI, off: fromOff} = cursor.findPos(fromA, -1);
        this.replaceRange(fromI, fromOff, toI, toOff, content2, breakAtStart, openStart, openEnd);
      }
    }
    replaceRange(fromI, fromOff, toI, toOff, content2, breakAtStart, openStart, openEnd) {
      let before = this.children[fromI], last = content2.length ? content2[content2.length - 1] : null;
      let breakAtEnd = last ? last.breakAfter : breakAtStart;
      if (fromI == toI && !breakAtStart && !breakAtEnd && content2.length < 2 && before.merge(fromOff, toOff, content2.length ? last : null, fromOff == 0, openStart, openEnd))
        return;
      let after = this.children[toI];
      if (toOff < after.length || after.children.length && after.children[after.children.length - 1].length == 0) {
        if (fromI == toI) {
          after = after.split(toOff);
          toOff = 0;
        }
        if (!breakAtEnd && last && after.merge(0, toOff, last, true, 0, openEnd)) {
          content2[content2.length - 1] = after;
        } else {
          if (toOff || after.children.length && after.children[0].length == 0)
            after.merge(0, toOff, null, false, 0, openEnd);
          content2.push(after);
        }
      } else if (after.breakAfter) {
        if (last)
          last.breakAfter = 1;
        else
          breakAtStart = 1;
      }
      toI++;
      before.breakAfter = breakAtStart;
      if (fromOff > 0) {
        if (!breakAtStart && content2.length && before.merge(fromOff, before.length, content2[0], false, openStart, 0)) {
          before.breakAfter = content2.shift().breakAfter;
        } else if (fromOff < before.length || before.children.length && before.children[before.children.length - 1].length == 0) {
          before.merge(fromOff, before.length, null, false, openStart, 0);
        }
        fromI++;
      }
      while (fromI < toI && content2.length) {
        if (this.children[toI - 1].match(content2[content2.length - 1]))
          toI--, content2.pop();
        else if (this.children[fromI].match(content2[0]))
          fromI++, content2.shift();
        else
          break;
      }
      if (fromI < toI || content2.length)
        this.replaceChildren(fromI, toI, content2);
    }
    updateSelection(force = false, fromPointer = false) {
      if (!(fromPointer || this.mayControlSelection()))
        return;
      let main = this.view.state.selection.main;
      let anchor = this.domAtPos(main.anchor);
      let head = main.empty ? anchor : this.domAtPos(main.head);
      if (browser_default.gecko && main.empty && betweenUneditable(anchor)) {
        let dummy = document.createTextNode("");
        this.view.observer.ignore(() => anchor.node.insertBefore(dummy, anchor.node.childNodes[anchor.offset] || null));
        anchor = head = new DOMPos(dummy, 0);
        force = true;
      }
      let domSel = getSelection(this.root);
      if (force || !domSel.focusNode || browser_default.gecko && main.empty && nextToUneditable(domSel.focusNode, domSel.focusOffset) || !isEquivalentPosition(anchor.node, anchor.offset, domSel.anchorNode, domSel.anchorOffset) || !isEquivalentPosition(head.node, head.offset, domSel.focusNode, domSel.focusOffset)) {
        this.view.observer.ignore(() => {
          if (main.empty) {
            if (browser_default.gecko) {
              let nextTo = nextToUneditable(anchor.node, anchor.offset);
              if (nextTo && nextTo != (NextTo.Before | NextTo.After)) {
                let text = nearbyTextNode(anchor.node, anchor.offset, nextTo == NextTo.Before ? 1 : -1);
                if (text)
                  anchor = new DOMPos(text, nextTo == NextTo.Before ? 0 : text.nodeValue.length);
              }
            }
            domSel.collapse(anchor.node, anchor.offset);
            if (main.bidiLevel != null && domSel.cursorBidiLevel != null)
              domSel.cursorBidiLevel = main.bidiLevel;
          } else if (domSel.extend) {
            domSel.collapse(anchor.node, anchor.offset);
            domSel.extend(head.node, head.offset);
          } else {
            let range = document.createRange();
            if (main.anchor > main.head)
              [anchor, head] = [head, anchor];
            range.setEnd(head.node, head.offset);
            range.setStart(anchor.node, anchor.offset);
            domSel.removeAllRanges();
            domSel.addRange(range);
          }
        });
      }
      this.impreciseAnchor = anchor.precise ? null : new DOMPos(domSel.anchorNode, domSel.anchorOffset);
      this.impreciseHead = head.precise ? null : new DOMPos(domSel.focusNode, domSel.focusOffset);
    }
    enforceCursorAssoc() {
      let cursor = this.view.state.selection.main;
      let sel = getSelection(this.root);
      if (!cursor.empty || !cursor.assoc || !sel.modify)
        return;
      let line = LineView.find(this, cursor.head);
      if (!line)
        return;
      let lineStart = line.posAtStart;
      if (cursor.head == lineStart || cursor.head == lineStart + line.length)
        return;
      let before = this.coordsAt(cursor.head, -1), after = this.coordsAt(cursor.head, 1);
      if (!before || !after || before.bottom > after.top)
        return;
      let dom = this.domAtPos(cursor.head + cursor.assoc);
      sel.collapse(dom.node, dom.offset);
      sel.modify("move", cursor.assoc < 0 ? "forward" : "backward", "lineboundary");
    }
    mayControlSelection() {
      return this.view.state.facet(editable) ? this.root.activeElement == this.dom : hasSelection(this.dom, getSelection(this.root));
    }
    nearest(dom) {
      for (let cur2 = dom; cur2; ) {
        let domView = ContentView.get(cur2);
        if (domView && domView.rootView == this)
          return domView;
        cur2 = cur2.parentNode;
      }
      return null;
    }
    posFromDOM(node, offset) {
      let view = this.nearest(node);
      if (!view)
        throw new RangeError("Trying to find position for a DOM position outside of the document");
      return view.localPosFromDOM(node, offset) + view.posAtStart;
    }
    domAtPos(pos) {
      let {i, off} = this.childCursor().findPos(pos, -1);
      for (; i < this.children.length - 1; ) {
        let child = this.children[i];
        if (off < child.length || child instanceof LineView)
          break;
        i++;
        off = 0;
      }
      return this.children[i].domAtPos(off);
    }
    coordsAt(pos, side) {
      for (let off = this.length, i = this.children.length - 1; ; i--) {
        let child = this.children[i], start = off - child.breakAfter - child.length;
        if (pos > start || pos == start && (child.type == BlockType.Text || !i || this.children[i - 1].breakAfter))
          return child.coordsAt(pos - start, side);
        off = start;
      }
    }
    measureVisibleLineHeights() {
      let result = [], {from, to} = this.view.viewState.viewport;
      let minWidth = Math.max(this.view.scrollDOM.clientWidth, this.minWidth) + 1;
      for (let pos = 0, i = 0; i < this.children.length; i++) {
        let child = this.children[i], end = pos + child.length;
        if (end > to)
          break;
        if (pos >= from) {
          result.push(child.dom.getBoundingClientRect().height);
          let width = child.dom.scrollWidth;
          if (width > minWidth) {
            this.minWidth = minWidth = width;
            this.minWidthFrom = pos;
            this.minWidthTo = end;
          }
        }
        pos = end + child.breakAfter;
      }
      return result;
    }
    measureTextSize() {
      for (let child of this.children) {
        if (child instanceof LineView) {
          let measure = child.measureTextSize();
          if (measure)
            return measure;
        }
      }
      let dummy = document.createElement("div"), lineHeight, charWidth;
      dummy.className = "cm-line";
      dummy.textContent = "abc def ghi jkl mno pqr stu";
      this.view.observer.ignore(() => {
        this.dom.appendChild(dummy);
        let rect = clientRectsFor(dummy.firstChild)[0];
        lineHeight = dummy.getBoundingClientRect().height;
        charWidth = rect ? rect.width / 27 : 7;
        dummy.remove();
      });
      return {lineHeight, charWidth};
    }
    childCursor(pos = this.length) {
      let i = this.children.length;
      if (i)
        pos -= this.children[--i].length;
      return new ChildCursor(this.children, pos, i);
    }
    computeBlockGapDeco() {
      let deco = [], vs = this.view.viewState;
      for (let pos = 0, i = 0; ; i++) {
        let next = i == vs.viewports.length ? null : vs.viewports[i];
        let end = next ? next.from - 1 : this.length;
        if (end > pos) {
          let height = vs.lineAt(end, 0).bottom - vs.lineAt(pos, 0).top;
          deco.push(Decoration.replace({widget: new BlockGapWidget(height), block: true, inclusive: true}).range(pos, end));
        }
        if (!next)
          break;
        pos = next.to + 1;
      }
      return Decoration.set(deco);
    }
    updateDeco() {
      return this.decorations = [
        this.computeBlockGapDeco(),
        this.view.viewState.lineGapDeco,
        this.compositionDeco,
        ...this.view.state.facet(decorations),
        ...this.view.pluginField(PluginField.decorations)
      ];
    }
    scrollPosIntoView(pos, side) {
      let rect = this.coordsAt(pos, side);
      if (!rect)
        return;
      let mLeft = 0, mRight = 0, mTop = 0, mBottom = 0;
      for (let margins of this.view.pluginField(PluginField.scrollMargins))
        if (margins) {
          let {left, right, top: top2, bottom} = margins;
          if (left != null)
            mLeft = Math.max(mLeft, left);
          if (right != null)
            mRight = Math.max(mRight, right);
          if (top2 != null)
            mTop = Math.max(mTop, top2);
          if (bottom != null)
            mBottom = Math.max(mBottom, bottom);
        }
      scrollRectIntoView(this.dom, {
        left: rect.left - mLeft,
        top: rect.top - mTop,
        right: rect.right + mRight,
        bottom: rect.bottom + mBottom
      });
    }
  };
  function betweenUneditable(pos) {
    return pos.node.nodeType == 1 && pos.node.firstChild && (pos.offset == 0 || pos.node.childNodes[pos.offset - 1].contentEditable == "false") && (pos.offset < pos.node.childNodes.length || pos.node.childNodes[pos.offset].contentEditable == "false");
  }
  var BlockGapWidget = class extends WidgetType {
    constructor(height) {
      super();
      this.height = height;
    }
    toDOM() {
      let elt = document.createElement("div");
      this.updateDOM(elt);
      return elt;
    }
    eq(other) {
      return other.height == this.height;
    }
    updateDOM(elt) {
      elt.style.height = this.height + "px";
      return true;
    }
    get estimatedHeight() {
      return this.height;
    }
  };
  function computeCompositionDeco(view, changes) {
    let sel = getSelection(view.root);
    let textNode = sel.focusNode && nearbyTextNode(sel.focusNode, sel.focusOffset, 0);
    if (!textNode)
      return Decoration.none;
    let cView = view.docView.nearest(textNode);
    let from, to, topNode = textNode;
    if (cView instanceof InlineView) {
      while (cView.parent instanceof InlineView)
        cView = cView.parent;
      from = cView.posAtStart;
      to = from + cView.length;
      topNode = cView.dom;
    } else if (cView instanceof LineView) {
      while (topNode.parentNode != cView.dom)
        topNode = topNode.parentNode;
      let prev = topNode.previousSibling;
      while (prev && !ContentView.get(prev))
        prev = prev.previousSibling;
      from = to = prev ? ContentView.get(prev).posAtEnd : cView.posAtStart;
    } else {
      return Decoration.none;
    }
    let newFrom = changes.mapPos(from, 1), newTo = Math.max(newFrom, changes.mapPos(to, -1));
    let text = textNode.nodeValue, {state} = view;
    if (newTo - newFrom < text.length) {
      if (state.sliceDoc(newFrom, Math.min(state.doc.length, newFrom + text.length)) == text)
        newTo = newFrom + text.length;
      else if (state.sliceDoc(Math.max(0, newTo - text.length), newTo) == text)
        newFrom = newTo - text.length;
      else
        return Decoration.none;
    } else if (state.sliceDoc(newFrom, newTo) != text) {
      return Decoration.none;
    }
    return Decoration.set(Decoration.replace({widget: new CompositionWidget(topNode, textNode)}).range(newFrom, newTo));
  }
  var CompositionWidget = class extends WidgetType {
    constructor(top2, text) {
      super();
      this.top = top2;
      this.text = text;
    }
    eq(other) {
      return this.top == other.top && this.text == other.text;
    }
    toDOM() {
      return this.top;
    }
    ignoreEvent() {
      return false;
    }
    get customView() {
      return CompositionView;
    }
  };
  function nearbyTextNode(node, offset, side) {
    for (; ; ) {
      if (node.nodeType == 3)
        return node;
      if (node.nodeType == 1 && offset > 0 && side <= 0) {
        node = node.childNodes[offset - 1];
        offset = maxOffset(node);
      } else if (node.nodeType == 1 && offset < node.childNodes.length && side >= 0) {
        node = node.childNodes[offset];
        offset = 0;
      } else {
        return null;
      }
    }
  }
  var NextTo;
  (function(NextTo2) {
    NextTo2[NextTo2["Before"] = 1] = "Before";
    NextTo2[NextTo2["After"] = 2] = "After";
  })(NextTo || (NextTo = {}));
  function nextToUneditable(node, offset) {
    if (node.nodeType != 1)
      return 0;
    return (offset && node.childNodes[offset - 1].contentEditable == "false" ? 1 : 0) | (offset < node.childNodes.length && node.childNodes[offset].contentEditable == "false" ? 2 : 0);
  }
  var DecorationComparator = class {
    constructor() {
      this.changes = [];
    }
    compareRange(from, to) {
      addRange(from, to, this.changes);
    }
    comparePoint(from, to) {
      addRange(from, to, this.changes);
    }
  };
  function findChangedDeco(a, b, diff) {
    let comp = new DecorationComparator();
    RangeSet.compare(a, b, diff, comp);
    return comp.changes;
  }

  // ../view/src/bidi.ts
  var Direction;
  (function(Direction2) {
    Direction2[Direction2["LTR"] = 0] = "LTR";
    Direction2[Direction2["RTL"] = 1] = "RTL";
  })(Direction || (Direction = {}));
  var LTR = 0;
  var RTL = 1;
  var T2;
  (function(T3) {
    T3[T3["L"] = 1] = "L";
    T3[T3["R"] = 2] = "R";
    T3[T3["AL"] = 4] = "AL";
    T3[T3["EN"] = 8] = "EN";
    T3[T3["AN"] = 16] = "AN";
    T3[T3["ET"] = 64] = "ET";
    T3[T3["CS"] = 128] = "CS";
    T3[T3["NI"] = 256] = "NI";
    T3[T3["NSM"] = 512] = "NSM";
    T3[T3["Strong"] = 7] = "Strong";
    T3[T3["Num"] = 24] = "Num";
  })(T2 || (T2 = {}));
  function dec(str) {
    let result = [];
    for (let i = 0; i < str.length; i++)
      result.push(1 << +str[i]);
    return result;
  }
  var LowTypes = dec("88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008");
  var ArabicTypes = dec("4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333");
  var Brackets = Object.create(null);
  var BracketStack = [];
  for (let p of ["()", "[]", "{}"]) {
    let l = p.charCodeAt(0), r = p.charCodeAt(1);
    Brackets[l] = r;
    Brackets[r] = -l;
  }
  var Bracketed;
  (function(Bracketed2) {
    Bracketed2[Bracketed2["OppositeBefore"] = 1] = "OppositeBefore";
    Bracketed2[Bracketed2["EmbedInside"] = 2] = "EmbedInside";
    Bracketed2[Bracketed2["OppositeInside"] = 4] = "OppositeInside";
    Bracketed2[Bracketed2["MaxDepth"] = 189] = "MaxDepth";
  })(Bracketed || (Bracketed = {}));
  function charType(ch) {
    return ch <= 247 ? LowTypes[ch] : 1424 <= ch && ch <= 1524 ? 2 : 1536 <= ch && ch <= 1785 ? ArabicTypes[ch - 1536] : 1774 <= ch && ch <= 2220 ? 4 : 8192 <= ch && ch <= 8203 ? 256 : ch == 8204 ? 256 : 1;
  }
  var BidiRE = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
  var BidiSpan = class {
    constructor(from, to, level) {
      this.from = from;
      this.to = to;
      this.level = level;
    }
    get dir() {
      return this.level % 2 ? RTL : LTR;
    }
    side(end, dir) {
      return this.dir == dir == end ? this.to : this.from;
    }
    static find(order, index, level, assoc) {
      let maybe = -1;
      for (let i = 0; i < order.length; i++) {
        let span = order[i];
        if (span.from <= index && span.to >= index) {
          if (span.level == level)
            return i;
          if (maybe < 0 || (assoc != 0 ? assoc < 0 ? span.from < index : span.to > index : order[maybe].level > span.level))
            maybe = i;
        }
      }
      if (maybe < 0)
        throw new RangeError("Index out of range");
      return maybe;
    }
  };
  var types = [];
  function computeOrder(line, direction) {
    let len = line.length, outerType = direction == LTR ? 1 : 2, oppositeType = direction == LTR ? 2 : 1;
    if (!line || outerType == 1 && !BidiRE.test(line))
      return trivialOrder(len);
    for (let i = 0, prev = outerType, prevStrong = outerType; i < len; i++) {
      let type = charType(line.charCodeAt(i));
      if (type == 512)
        type = prev;
      else if (type == 8 && prevStrong == 4)
        type = 16;
      types[i] = type == 4 ? 2 : type;
      if (type & 7)
        prevStrong = type;
      prev = type;
    }
    for (let i = 0, prev = outerType, prevStrong = outerType; i < len; i++) {
      let type = types[i];
      if (type == 128) {
        if (i < len - 1 && prev == types[i + 1] && prev & 24)
          type = types[i] = prev;
        else
          types[i] = 256;
      } else if (type == 64) {
        let end = i + 1;
        while (end < len && types[end] == 64)
          end++;
        let replace = i && prev == 8 || end < len && types[end] == 8 ? prevStrong == 1 ? 1 : 8 : 256;
        for (let j = i; j < end; j++)
          types[j] = replace;
        i = end - 1;
      } else if (type == 8 && prevStrong == 1) {
        types[i] = 1;
      }
      prev = type;
      if (type & 7)
        prevStrong = type;
    }
    for (let i = 0, sI = 0, context = 0, ch, br, type; i < len; i++) {
      if (br = Brackets[ch = line.charCodeAt(i)]) {
        if (br < 0) {
          for (let sJ = sI - 3; sJ >= 0; sJ -= 3) {
            if (BracketStack[sJ + 1] == -br) {
              let flags = BracketStack[sJ + 2];
              let type2 = flags & 2 ? outerType : !(flags & 4) ? 0 : flags & 1 ? oppositeType : outerType;
              if (type2)
                types[i] = types[BracketStack[sJ]] = type2;
              sI = sJ;
              break;
            }
          }
        } else if (BracketStack.length == 189) {
          break;
        } else {
          BracketStack[sI++] = i;
          BracketStack[sI++] = ch;
          BracketStack[sI++] = context;
        }
      } else if ((type = types[i]) == 2 || type == 1) {
        let embed = type == outerType;
        context = embed ? 0 : 1;
        for (let sJ = sI - 3; sJ >= 0; sJ -= 3) {
          let cur2 = BracketStack[sJ + 2];
          if (cur2 & 2)
            break;
          if (embed) {
            BracketStack[sJ + 2] |= 2;
          } else {
            if (cur2 & 4)
              break;
            BracketStack[sJ + 2] |= 4;
          }
        }
      }
    }
    for (let i = 0; i < len; i++) {
      if (types[i] == 256) {
        let end = i + 1;
        while (end < len && types[end] == 256)
          end++;
        let beforeL = (i ? types[i - 1] : outerType) == 1;
        let afterL = (end < len ? types[end] : outerType) == 1;
        let replace = beforeL == afterL ? beforeL ? 1 : 2 : outerType;
        for (let j = i; j < end; j++)
          types[j] = replace;
        i = end - 1;
      }
    }
    let order = [];
    if (outerType == 1) {
      for (let i = 0; i < len; ) {
        let start = i, rtl = types[i++] != 1;
        while (i < len && rtl == (types[i] != 1))
          i++;
        if (rtl) {
          for (let j = i; j > start; ) {
            let end = j, l = types[--j] != 2;
            while (j > start && l == (types[j - 1] != 2))
              j--;
            order.push(new BidiSpan(j, end, l ? 2 : 1));
          }
        } else {
          order.push(new BidiSpan(start, i, 0));
        }
      }
    } else {
      for (let i = 0; i < len; ) {
        let start = i, rtl = types[i++] == 2;
        while (i < len && rtl == (types[i] == 2))
          i++;
        order.push(new BidiSpan(start, i, rtl ? 1 : 2));
      }
    }
    return order;
  }
  function trivialOrder(length) {
    return [new BidiSpan(0, length, 0)];
  }
  var movedOver = "";
  function moveVisually(line, order, dir, start, forward) {
    let startIndex = start.head - line.from, spanI = -1;
    if (startIndex == 0) {
      if (!forward || !line.length)
        return null;
      if (order[0].level != dir) {
        startIndex = order[0].side(false, dir);
        spanI = 0;
      }
    } else if (startIndex == line.length) {
      if (forward)
        return null;
      let last = order[order.length - 1];
      if (last.level != dir) {
        startIndex = last.side(true, dir);
        spanI = order.length - 1;
      }
    }
    if (spanI < 0)
      spanI = BidiSpan.find(order, startIndex, start.bidiLevel ?? -1, start.assoc);
    let span = order[spanI];
    if (startIndex == span.side(forward, dir)) {
      span = order[spanI += forward ? 1 : -1];
      startIndex = span.side(!forward, dir);
    }
    let indexForward = forward == (span.dir == dir);
    let nextIndex = findClusterBreak(line.text, startIndex, indexForward);
    movedOver = line.text.slice(Math.min(startIndex, nextIndex), Math.max(startIndex, nextIndex));
    if (nextIndex != span.side(forward, dir))
      return EditorSelection.cursor(nextIndex + line.from, indexForward ? -1 : 1, span.level);
    let nextSpan = spanI == (forward ? order.length - 1 : 0) ? null : order[spanI + (forward ? 1 : -1)];
    if (!nextSpan && span.level != dir)
      return EditorSelection.cursor(forward ? line.to : line.from, forward ? -1 : 1, dir);
    if (nextSpan && nextSpan.level < span.level)
      return EditorSelection.cursor(nextSpan.side(!forward, dir) + line.from, forward ? 1 : -1, nextSpan.level);
    return EditorSelection.cursor(nextIndex + line.from, forward ? -1 : 1, span.level);
  }

  // ../view/src/cursor.ts
  function groupAt(state, pos, bias = 1) {
    let categorize = state.charCategorizer(pos);
    let line = state.doc.lineAt(pos), linePos = pos - line.from;
    if (line.length == 0)
      return EditorSelection.cursor(pos);
    if (linePos == 0)
      bias = 1;
    else if (linePos == line.length)
      bias = -1;
    let from = linePos, to = linePos;
    if (bias < 0)
      from = findClusterBreak(line.text, linePos, false);
    else
      to = findClusterBreak(line.text, linePos);
    let cat = categorize(line.text.slice(from, to));
    while (from > 0) {
      let prev = findClusterBreak(line.text, from, false);
      if (categorize(line.text.slice(prev, from)) != cat)
        break;
      from = prev;
    }
    while (to < line.length) {
      let next = findClusterBreak(line.text, to);
      if (categorize(line.text.slice(to, next)) != cat)
        break;
      to = next;
    }
    return EditorSelection.range(from + line.from, to + line.from);
  }
  function getdx(x, rect) {
    return rect.left > x ? rect.left - x : Math.max(0, x - rect.right);
  }
  function getdy(y, rect) {
    return rect.top > y ? rect.top - y : Math.max(0, y - rect.bottom);
  }
  function yOverlap(a, b) {
    return a.top < b.bottom - 1 && a.bottom > b.top + 1;
  }
  function upTop(rect, top2) {
    return top2 < rect.top ? {top: top2, left: rect.left, right: rect.right, bottom: rect.bottom} : rect;
  }
  function upBot(rect, bottom) {
    return bottom > rect.bottom ? {top: rect.top, left: rect.left, right: rect.right, bottom} : rect;
  }
  function domPosAtCoords(parent, x, y) {
    let closest, closestRect, closestX, closestY;
    let above, below, aboveRect, belowRect;
    for (let child = parent.firstChild; child; child = child.nextSibling) {
      let rects = clientRectsFor(child);
      for (let i = 0; i < rects.length; i++) {
        let rect = rects[i];
        if (closestRect && yOverlap(closestRect, rect))
          rect = upTop(upBot(rect, closestRect.bottom), closestRect.top);
        let dx = getdx(x, rect), dy = getdy(y, rect);
        if (dx == 0 && dy == 0)
          return child.nodeType == 3 ? domPosInText(child, x, y) : domPosAtCoords(child, x, y);
        if (!closest || closestY > dy || closestY == dy && closestX > dx) {
          closest = child;
          closestRect = rect;
          closestX = dx;
          closestY = dy;
        }
        if (dx == 0) {
          if (y > rect.bottom && (!aboveRect || aboveRect.bottom < rect.bottom)) {
            above = child;
            aboveRect = rect;
          } else if (y < rect.top && (!belowRect || belowRect.top > rect.top)) {
            below = child;
            belowRect = rect;
          }
        } else if (aboveRect && yOverlap(aboveRect, rect)) {
          aboveRect = upBot(aboveRect, rect.bottom);
        } else if (belowRect && yOverlap(belowRect, rect)) {
          belowRect = upTop(belowRect, rect.top);
        }
      }
    }
    if (aboveRect && aboveRect.bottom >= y) {
      closest = above;
      closestRect = aboveRect;
    } else if (belowRect && belowRect.top <= y) {
      closest = below;
      closestRect = belowRect;
    }
    if (!closest)
      return {node: parent, offset: 0};
    let clipX = Math.max(closestRect.left, Math.min(closestRect.right, x));
    if (closest.nodeType == 3)
      return domPosInText(closest, clipX, y);
    if (!closestX && closest.contentEditable == "true")
      return domPosAtCoords(closest, clipX, y);
    let offset = Array.prototype.indexOf.call(parent.childNodes, closest) + (x >= (closestRect.left + closestRect.right) / 2 ? 1 : 0);
    return {node: parent, offset};
  }
  function domPosInText(node, x, y) {
    let len = node.nodeValue.length;
    let closestOffset = -1, closestDY = 1e9, generalSide = 0;
    for (let i = 0; i < len; i++) {
      let rects = textRange(node, i, i + 1).getClientRects();
      for (let j = 0; j < rects.length; j++) {
        let rect = rects[j];
        if (rect.top == rect.bottom)
          continue;
        if (!generalSide)
          generalSide = x - rect.left;
        let dy = (rect.top > y ? rect.top - y : y - rect.bottom) - 1;
        if (rect.left - 1 <= x && rect.right + 1 >= x && dy < closestDY) {
          let right = x >= (rect.left + rect.right) / 2, after = right;
          if (browser_default.chrome || browser_default.gecko) {
            let rectBefore = textRange(node, i).getBoundingClientRect();
            if (rectBefore.left == rect.right)
              after = !right;
          }
          if (dy <= 0)
            return {node, offset: i + (after ? 1 : 0)};
          closestOffset = i + (after ? 1 : 0);
          closestDY = dy;
        }
      }
    }
    return {node, offset: closestOffset > -1 ? closestOffset : generalSide > 0 ? node.nodeValue.length : 0};
  }
  function posAtCoords(view, {x, y}, bias = -1) {
    let content2 = view.contentDOM.getBoundingClientRect(), block;
    let halfLine = view.defaultLineHeight / 2;
    for (let bounced = false; ; ) {
      block = view.blockAtHeight(y, content2.top);
      if (block.top > y || block.bottom < y) {
        bias = block.top > y ? -1 : 1;
        y = Math.min(block.bottom - halfLine, Math.max(block.top + halfLine, y));
        if (bounced)
          return -1;
        else
          bounced = true;
      }
      if (block.type == BlockType.Text)
        break;
      y = bias > 0 ? block.bottom + halfLine : block.top - halfLine;
    }
    let lineStart = block.from;
    if (lineStart < view.viewport.from)
      return view.viewport.from == 0 ? 0 : null;
    if (lineStart > view.viewport.to)
      return view.viewport.to == view.state.doc.length ? view.state.doc.length : null;
    x = Math.max(content2.left + 1, Math.min(content2.right - 1, x));
    let root = view.root, element = root.elementFromPoint(x, y);
    let node, offset = -1;
    if (element && view.contentDOM.contains(element) && !(view.docView.nearest(element) instanceof WidgetView)) {
      if (root.caretPositionFromPoint) {
        let pos = root.caretPositionFromPoint(x, y);
        if (pos)
          ({offsetNode: node, offset} = pos);
      } else if (root.caretRangeFromPoint) {
        let range = root.caretRangeFromPoint(x, y);
        if (range) {
          ;
          ({startContainer: node, startOffset: offset} = range);
          if (browser_default.safari && isSuspiciousCaretResult(node, offset, x))
            node = void 0;
        }
      }
    }
    if (!node || !view.docView.dom.contains(node)) {
      let line = LineView.find(view.docView, lineStart);
      ({node, offset} = domPosAtCoords(line.dom, x, y));
    }
    return view.docView.posFromDOM(node, offset);
  }
  function isSuspiciousCaretResult(node, offset, x) {
    let len;
    if (node.nodeType != 3 || offset != (len = node.nodeValue.length))
      return false;
    for (let next = node.nextSibling; next; next = node.nextSibling)
      if (next.nodeType != 1 || next.nodeName != "BR")
        return false;
    return textRange(node, len - 1, len).getBoundingClientRect().left > x;
  }
  function moveToLineBoundary(view, start, forward, includeWrap) {
    let line = view.state.doc.lineAt(start.head);
    let coords = !includeWrap || !view.lineWrapping ? null : view.coordsAtPos(start.assoc < 0 && start.head > line.from ? start.head - 1 : start.head);
    if (coords) {
      let editorRect = view.dom.getBoundingClientRect();
      let pos = view.posAtCoords({
        x: forward == (view.textDirection == Direction.LTR) ? editorRect.right - 1 : editorRect.left + 1,
        y: (coords.top + coords.bottom) / 2
      });
      if (pos != null)
        return EditorSelection.cursor(pos, forward ? -1 : 1);
    }
    let lineView = LineView.find(view.docView, start.head);
    let end = lineView ? forward ? lineView.posAtEnd : lineView.posAtStart : forward ? line.to : line.from;
    return EditorSelection.cursor(end, forward ? -1 : 1);
  }
  function moveByChar(view, start, forward, by) {
    let line = view.state.doc.lineAt(start.head), spans = view.bidiSpans(line);
    for (let cur2 = start, check = null; ; ) {
      let next = moveVisually(line, spans, view.textDirection, cur2, forward), char = movedOver;
      if (!next) {
        if (line.number == (forward ? view.state.doc.lines : 1))
          return cur2;
        char = "\n";
        line = view.state.doc.line(line.number + (forward ? 1 : -1));
        spans = view.bidiSpans(line);
        next = EditorSelection.cursor(forward ? line.from : line.to);
      }
      if (!check) {
        if (!by)
          return next;
        check = by(char);
      } else if (!check(char)) {
        return cur2;
      }
      cur2 = next;
    }
  }
  function byGroup(view, pos, start) {
    let categorize = view.state.charCategorizer(pos);
    let cat = categorize(start);
    return (next) => {
      let nextCat = categorize(next);
      if (cat == CharCategory.Space)
        cat = nextCat;
      return cat == nextCat;
    };
  }
  function moveVertically(view, start, forward, distance) {
    let startPos = start.head, dir = forward ? 1 : -1;
    if (startPos == (forward ? view.state.doc.length : 0))
      return EditorSelection.cursor(startPos);
    let startCoords = view.coordsAtPos(startPos);
    if (startCoords) {
      let rect = view.dom.getBoundingClientRect();
      let goal2 = start.goalColumn ?? startCoords.left - rect.left;
      let resolvedGoal = rect.left + goal2;
      let dist = distance ?? view.defaultLineHeight >> 1;
      for (let startY = dir < 0 ? startCoords.top : startCoords.bottom, extra = 0; extra < 50; extra += 10) {
        let pos = posAtCoords(view, {x: resolvedGoal, y: startY + (dist + extra) * dir}, dir);
        if (pos == null)
          break;
        if (pos != startPos)
          return EditorSelection.cursor(pos, void 0, void 0, goal2);
      }
    }
    let {doc: doc2} = view.state, line = doc2.lineAt(startPos), tabSize = view.state.tabSize;
    let goal = start.goalColumn, goalCol = 0;
    if (goal == null) {
      for (const iter = doc2.iterRange(line.from, startPos); !iter.next().done; )
        goalCol = countColumn(iter.value, goalCol, tabSize);
      goal = goalCol * view.defaultCharacterWidth;
    } else {
      goalCol = Math.round(goal / view.defaultCharacterWidth);
    }
    if (dir < 0 && line.from == 0)
      return EditorSelection.cursor(0);
    else if (dir > 0 && line.to == doc2.length)
      return EditorSelection.cursor(line.to);
    let otherLine = doc2.line(line.number + dir);
    let result = otherLine.from;
    let seen = 0;
    for (const iter = doc2.iterRange(otherLine.from, otherLine.to); seen >= goalCol && !iter.next().done; ) {
      const {offset, leftOver} = findColumn(iter.value, seen, goalCol, tabSize);
      seen = goalCol - leftOver;
      result += offset;
    }
    return EditorSelection.cursor(result, void 0, void 0, goal);
  }

  // ../view/src/input.ts
  var InputState = class {
    constructor(view) {
      this.lastKeyCode = 0;
      this.lastKeyTime = 0;
      this.lastIOSEnter = 0;
      this.lastIOSBackspace = 0;
      this.lastSelectionOrigin = null;
      this.lastSelectionTime = 0;
      this.lastEscPress = 0;
      this.scrollHandlers = [];
      this.registeredEvents = [];
      this.customHandlers = [];
      this.composing = -1;
      this.compositionEndedAt = 0;
      this.mouseSelection = null;
      for (let type in handlers) {
        let handler = handlers[type];
        view.contentDOM.addEventListener(type, (event) => {
          if (type == "keydown" && this.keydown(view, event))
            return;
          if (!eventBelongsToEditor(view, event) || this.ignoreDuringComposition(event))
            return;
          if (this.mustFlushObserver(event))
            view.observer.forceFlush();
          if (this.runCustomHandlers(type, view, event))
            event.preventDefault();
          else
            handler(view, event);
        });
        this.registeredEvents.push(type);
      }
      this.notifiedFocused = view.hasFocus;
      this.ensureHandlers(view);
    }
    setSelectionOrigin(origin) {
      this.lastSelectionOrigin = origin;
      this.lastSelectionTime = Date.now();
    }
    ensureHandlers(view) {
      let handlers2 = this.customHandlers = view.pluginField(domEventHandlers);
      for (let set of handlers2) {
        for (let type in set.handlers)
          if (this.registeredEvents.indexOf(type) < 0 && type != "scroll") {
            this.registeredEvents.push(type);
            view.contentDOM.addEventListener(type, (event) => {
              if (!eventBelongsToEditor(view, event))
                return;
              if (this.runCustomHandlers(type, view, event))
                event.preventDefault();
            });
          }
      }
    }
    runCustomHandlers(type, view, event) {
      for (let set of this.customHandlers) {
        let handler = set.handlers[type], handled = false;
        if (handler) {
          try {
            handled = handler.call(set.plugin, event, view);
          } catch (e) {
            logException(view.state, e);
          }
          if (handled || event.defaultPrevented) {
            if (browser_default.android && type == "keydown" && event.keyCode == 13)
              view.observer.flushSoon();
            return true;
          }
        }
      }
      return false;
    }
    runScrollHandlers(view, event) {
      for (let set of this.customHandlers) {
        let handler = set.handlers.scroll;
        if (handler) {
          try {
            handler.call(set.plugin, event, view);
          } catch (e) {
            logException(view.state, e);
          }
        }
      }
    }
    keydown(view, event) {
      this.lastKeyCode = event.keyCode;
      this.lastKeyTime = Date.now();
      if (this.screenKeyEvent(view, event))
        return;
      if (browser_default.ios && (event.keyCode == 13 || event.keyCode == 8) && !(event.ctrlKey || event.altKey || event.metaKey) && !event.synthetic) {
        this[event.keyCode == 13 ? "lastIOSEnter" : "lastIOSBackspace"] = Date.now();
        return true;
      }
      return false;
    }
    ignoreDuringComposition(event) {
      if (!/^key/.test(event.type))
        return false;
      if (this.composing > 0)
        return true;
      if (browser_default.safari && event.timeStamp - this.compositionEndedAt < 500) {
        this.compositionEndedAt = 0;
        return true;
      }
      return false;
    }
    screenKeyEvent(view, event) {
      let protectedTab = event.keyCode == 9 && Date.now() < this.lastEscPress + 2e3;
      if (event.keyCode == 27)
        this.lastEscPress = Date.now();
      else if (modifierCodes.indexOf(event.keyCode) < 0)
        this.lastEscPress = 0;
      return protectedTab;
    }
    mustFlushObserver(event) {
      return event.type == "keydown" && event.keyCode != 229 || event.type == "compositionend" && !browser_default.ios;
    }
    startMouseSelection(view, event, style) {
      if (this.mouseSelection)
        this.mouseSelection.destroy();
      this.mouseSelection = new MouseSelection(this, view, event, style);
    }
    update(update) {
      if (this.mouseSelection)
        this.mouseSelection.update(update);
      this.lastKeyCode = this.lastSelectionTime = 0;
    }
    destroy() {
      if (this.mouseSelection)
        this.mouseSelection.destroy();
    }
  };
  var modifierCodes = [16, 17, 18, 20, 91, 92, 224, 225];
  var MouseSelection = class {
    constructor(inputState, view, startEvent, style) {
      this.inputState = inputState;
      this.view = view;
      this.startEvent = startEvent;
      this.style = style;
      let doc2 = view.contentDOM.ownerDocument;
      doc2.addEventListener("mousemove", this.move = this.move.bind(this));
      doc2.addEventListener("mouseup", this.up = this.up.bind(this));
      this.extend = startEvent.shiftKey;
      this.multiple = view.state.facet(EditorState.allowMultipleSelections) && addsSelectionRange(view, startEvent);
      this.dragMove = dragMovesSelection2(view, startEvent);
      this.dragging = isInPrimarySelection(view, startEvent) ? null : false;
      if (this.dragging === false) {
        startEvent.preventDefault();
        this.select(startEvent);
      }
    }
    move(event) {
      if (event.buttons == 0)
        return this.destroy();
      if (this.dragging !== false)
        return;
      this.select(event);
    }
    up(event) {
      if (this.dragging == null)
        this.select(this.startEvent);
      if (!this.dragging)
        event.preventDefault();
      this.destroy();
    }
    destroy() {
      let doc2 = this.view.contentDOM.ownerDocument;
      doc2.removeEventListener("mousemove", this.move);
      doc2.removeEventListener("mouseup", this.up);
      this.inputState.mouseSelection = null;
    }
    select(event) {
      let selection = this.style.get(event, this.extend, this.multiple);
      if (!selection.eq(this.view.state.selection) || selection.main.assoc != this.view.state.selection.main.assoc)
        this.view.dispatch({
          selection,
          annotations: Transaction.userEvent.of("pointerselection"),
          scrollIntoView: true
        });
    }
    update(update) {
      if (update.docChanged && this.dragging)
        this.dragging = this.dragging.map(update.changes);
      this.style.update(update);
    }
  };
  function addsSelectionRange(view, event) {
    let facet = view.state.facet(clickAddsSelectionRange);
    return facet.length ? facet[0](event) : browser_default.mac ? event.metaKey : event.ctrlKey;
  }
  function dragMovesSelection2(view, event) {
    let facet = view.state.facet(dragMovesSelection);
    return facet.length ? facet[0](event) : browser_default.mac ? !event.altKey : !event.ctrlKey;
  }
  function isInPrimarySelection(view, event) {
    let {main} = view.state.selection;
    if (main.empty)
      return false;
    let sel = getSelection(view.root);
    if (sel.rangeCount == 0)
      return true;
    let rects = sel.getRangeAt(0).getClientRects();
    for (let i = 0; i < rects.length; i++) {
      let rect = rects[i];
      if (rect.left <= event.clientX && rect.right >= event.clientX && rect.top <= event.clientY && rect.bottom >= event.clientY)
        return true;
    }
    return false;
  }
  function eventBelongsToEditor(view, event) {
    if (!event.bubbles)
      return true;
    if (event.defaultPrevented)
      return false;
    for (let node = event.target, cView; node != view.contentDOM; node = node.parentNode)
      if (!node || node.nodeType == 11 || (cView = ContentView.get(node)) && cView.ignoreEvent(event))
        return false;
    return true;
  }
  var handlers = Object.create(null);
  var brokenClipboardAPI = browser_default.ie && browser_default.ie_version < 15 || browser_default.ios && browser_default.webkit_version < 604;
  function capturePaste(view) {
    let parent = view.dom.parentNode;
    if (!parent)
      return;
    let target = parent.appendChild(document.createElement("textarea"));
    target.style.cssText = "position: fixed; left: -10000px; top: 10px";
    target.focus();
    setTimeout(() => {
      view.focus();
      target.remove();
      doPaste(view, target.value);
    }, 50);
  }
  function doPaste(view, input) {
    let {state} = view, changes, i = 1, text = state.toText(input);
    let byLine = text.lines == state.selection.ranges.length;
    let linewise = lastLinewiseCopy && state.selection.ranges.every((r) => r.empty) && lastLinewiseCopy == text.toString();
    if (linewise) {
      let lastLine = -1;
      changes = state.changeByRange((range) => {
        let line = state.doc.lineAt(range.from);
        if (line.from == lastLine)
          return {range};
        lastLine = line.from;
        let insert2 = state.toText((byLine ? text.line(i++).text : input) + state.lineBreak);
        return {
          changes: {from: line.from, insert: insert2},
          range: EditorSelection.cursor(range.from + insert2.length)
        };
      });
    } else if (byLine) {
      changes = state.changeByRange((range) => {
        let line = text.line(i++);
        return {
          changes: {from: range.from, to: range.to, insert: line.text},
          range: EditorSelection.cursor(range.from + line.length)
        };
      });
    } else {
      changes = state.replaceSelection(text);
    }
    view.dispatch(changes, {
      annotations: Transaction.userEvent.of("paste"),
      scrollIntoView: true
    });
  }
  handlers.keydown = (view, event) => {
    view.inputState.setSelectionOrigin("keyboardselection");
  };
  var lastTouch = 0;
  function mouseLikeTouchEvent(e) {
    return e.touches.length == 1 && e.touches[0].radiusX <= 1 && e.touches[0].radiusY <= 1;
  }
  handlers.touchstart = (view, e) => {
    if (!mouseLikeTouchEvent(e))
      lastTouch = Date.now();
    view.inputState.setSelectionOrigin("pointerselection");
  };
  handlers.touchmove = (view) => {
    view.inputState.setSelectionOrigin("pointerselection");
  };
  handlers.mousedown = (view, event) => {
    view.observer.flush();
    if (lastTouch > Date.now() - 2e3)
      return;
    let style = null;
    for (let makeStyle of view.state.facet(mouseSelectionStyle)) {
      style = makeStyle(view, event);
      if (style)
        break;
    }
    if (!style && event.button == 0)
      style = basicMouseSelection(view, event);
    if (style) {
      if (view.root.activeElement != view.contentDOM)
        view.observer.ignore(() => focusPreventScroll(view.contentDOM));
      view.inputState.startMouseSelection(view, event, style);
    }
  };
  function rangeForClick(view, pos, bias, type) {
    if (type == 1) {
      return EditorSelection.cursor(pos, bias);
    } else if (type == 2) {
      return groupAt(view.state, pos, bias);
    } else {
      let visual = LineView.find(view.docView, pos), line = view.state.doc.lineAt(visual ? visual.posAtEnd : pos);
      let from = visual ? visual.posAtStart : line.from, to = visual ? visual.posAtEnd : line.to;
      if (to < view.state.doc.length && to == line.to)
        to++;
      return EditorSelection.range(from, to);
    }
  }
  var insideY = (y, rect) => y >= rect.top && y <= rect.bottom;
  var inside = (x, y, rect) => insideY(y, rect) && x >= rect.left && x <= rect.right;
  function findPositionSide(view, pos, x, y) {
    let line = LineView.find(view.docView, pos);
    if (!line)
      return 1;
    let off = pos - line.posAtStart;
    if (off == 0)
      return 1;
    if (off == line.length)
      return -1;
    let before = line.coordsAt(off, -1);
    if (before && inside(x, y, before))
      return -1;
    let after = line.coordsAt(off, 1);
    if (after && inside(x, y, after))
      return 1;
    return before && insideY(y, before) ? -1 : 1;
  }
  function queryPos(view, event) {
    let pos = view.posAtCoords({x: event.clientX, y: event.clientY});
    if (pos == null)
      return null;
    return {pos, bias: findPositionSide(view, pos, event.clientX, event.clientY)};
  }
  var BadMouseDetail = browser_default.ie && browser_default.ie_version <= 11;
  var lastMouseDown = null;
  var lastMouseDownCount = 0;
  function getClickType(event) {
    if (!BadMouseDetail)
      return event.detail;
    let last = lastMouseDown;
    lastMouseDown = event;
    return lastMouseDownCount = !last || last.timeStamp > Date.now() - 400 && Math.abs(last.clientX - event.clientX) < 2 && Math.abs(last.clientY - event.clientY) < 2 ? (lastMouseDownCount + 1) % 3 : 1;
  }
  function basicMouseSelection(view, event) {
    let start = queryPos(view, event), type = getClickType(event);
    let startSel = view.state.selection;
    let last = start, lastEvent = event;
    return {
      update(update) {
        if (update.changes) {
          if (start)
            start.pos = update.changes.mapPos(start.pos);
          startSel = startSel.map(update.changes);
        }
      },
      get(event2, extend2, multiple) {
        let cur2;
        if (event2.clientX == lastEvent.clientX && event2.clientY == lastEvent.clientY)
          cur2 = last;
        else {
          cur2 = last = queryPos(view, event2);
          lastEvent = event2;
        }
        if (!cur2 || !start)
          return startSel;
        let range = rangeForClick(view, cur2.pos, cur2.bias, type);
        if (start.pos != cur2.pos && !extend2) {
          let startRange = rangeForClick(view, start.pos, start.bias, type);
          let from = Math.min(startRange.from, range.from), to = Math.max(startRange.to, range.to);
          range = from < range.from ? EditorSelection.range(from, to) : EditorSelection.range(to, from);
        }
        if (extend2)
          return startSel.replaceRange(startSel.main.extend(range.from, range.to));
        else if (multiple)
          return startSel.addRange(range);
        else
          return EditorSelection.create([range]);
      }
    };
  }
  handlers.dragstart = (view, event) => {
    let {selection: {main}} = view.state;
    let {mouseSelection} = view.inputState;
    if (mouseSelection)
      mouseSelection.dragging = main;
    if (event.dataTransfer) {
      event.dataTransfer.setData("Text", view.state.sliceDoc(main.from, main.to));
      event.dataTransfer.effectAllowed = "copyMove";
    }
  };
  handlers.drop = (view, event) => {
    if (!event.dataTransfer || !view.state.facet(editable))
      return;
    let dropPos = view.posAtCoords({x: event.clientX, y: event.clientY});
    let text = event.dataTransfer.getData("Text");
    if (dropPos == null || !text)
      return;
    event.preventDefault();
    let {mouseSelection} = view.inputState;
    let del = mouseSelection && mouseSelection.dragging && mouseSelection.dragMove ? {from: mouseSelection.dragging.from, to: mouseSelection.dragging.to} : null;
    let ins = {from: dropPos, insert: text};
    let changes = view.state.changes(del ? [del, ins] : ins);
    view.focus();
    view.dispatch({
      changes,
      selection: {anchor: changes.mapPos(dropPos, -1), head: changes.mapPos(dropPos, 1)},
      annotations: Transaction.userEvent.of("drop")
    });
  };
  handlers.paste = (view, event) => {
    if (!view.state.facet(editable))
      return;
    view.observer.flush();
    let data = brokenClipboardAPI ? null : event.clipboardData;
    let text = data && data.getData("text/plain");
    if (text) {
      doPaste(view, text);
      event.preventDefault();
    } else {
      capturePaste(view);
    }
  };
  function captureCopy(view, text) {
    let parent = view.dom.parentNode;
    if (!parent)
      return;
    let target = parent.appendChild(document.createElement("textarea"));
    target.style.cssText = "position: fixed; left: -10000px; top: 10px";
    target.value = text;
    target.focus();
    target.selectionEnd = text.length;
    target.selectionStart = 0;
    setTimeout(() => {
      target.remove();
      view.focus();
    }, 50);
  }
  function copiedRange(state) {
    let content2 = [], ranges = [], linewise = false;
    for (let range of state.selection.ranges)
      if (!range.empty) {
        content2.push(state.sliceDoc(range.from, range.to));
        ranges.push(range);
      }
    if (!content2.length) {
      let upto = -1;
      for (let {from} of state.selection.ranges) {
        let line = state.doc.lineAt(from);
        if (line.number > upto) {
          content2.push(line.text);
          ranges.push({from: line.from, to: Math.min(state.doc.length, line.to + 1)});
        }
        upto = line.number;
      }
      linewise = true;
    }
    return {text: content2.join(state.lineBreak), ranges, linewise};
  }
  var lastLinewiseCopy = null;
  handlers.copy = handlers.cut = (view, event) => {
    let {text, ranges, linewise} = copiedRange(view.state);
    if (!text)
      return;
    lastLinewiseCopy = linewise ? text : null;
    let data = brokenClipboardAPI ? null : event.clipboardData;
    if (data) {
      event.preventDefault();
      data.clearData();
      data.setData("text/plain", text);
    } else {
      captureCopy(view, text);
    }
    if (event.type == "cut" && view.state.facet(editable))
      view.dispatch({
        changes: ranges,
        scrollIntoView: true,
        annotations: Transaction.userEvent.of("cut")
      });
  };
  handlers.focus = handlers.blur = (view) => {
    setTimeout(() => {
      if (view.hasFocus != view.inputState.notifiedFocused)
        view.update([]);
    }, 10);
  };
  handlers.beforeprint = (view) => {
    view.viewState.printing = true;
    view.requestMeasure();
    setTimeout(() => {
      view.viewState.printing = false;
      view.requestMeasure();
    }, 2e3);
  };
  function forceClearComposition(view) {
    if (view.docView.compositionDeco.size)
      view.update([]);
  }
  handlers.compositionstart = handlers.compositionupdate = (view) => {
    if (view.inputState.composing < 0) {
      if (view.docView.compositionDeco.size) {
        view.observer.flush();
        forceClearComposition(view);
      }
      view.inputState.composing = 0;
    }
  };
  handlers.compositionend = (view) => {
    view.inputState.composing = -1;
    view.inputState.compositionEndedAt = Date.now();
    setTimeout(() => {
      if (view.inputState.composing < 0)
        forceClearComposition(view);
    }, 50);
  };

  // ../view/src/heightmap.ts
  var wrappingWhiteSpace = ["pre-wrap", "normal", "pre-line"];
  var HeightOracle = class {
    constructor() {
      this.doc = Text.empty;
      this.lineWrapping = false;
      this.direction = Direction.LTR;
      this.heightSamples = {};
      this.lineHeight = 14;
      this.charWidth = 7;
      this.lineLength = 30;
      this.heightChanged = false;
    }
    heightForGap(from, to) {
      let lines = this.doc.lineAt(to).number - this.doc.lineAt(from).number + 1;
      if (this.lineWrapping)
        lines += Math.ceil((to - from - lines * this.lineLength * 0.5) / this.lineLength);
      return this.lineHeight * lines;
    }
    heightForLine(length) {
      if (!this.lineWrapping)
        return this.lineHeight;
      let lines = 1 + Math.max(0, Math.ceil((length - this.lineLength) / (this.lineLength - 5)));
      return lines * this.lineHeight;
    }
    setDoc(doc2) {
      this.doc = doc2;
      return this;
    }
    mustRefresh(lineHeights, whiteSpace, direction) {
      let newHeight = false;
      for (let i = 0; i < lineHeights.length; i++) {
        let h = lineHeights[i];
        if (h < 0) {
          i++;
        } else if (!this.heightSamples[Math.floor(h * 10)]) {
          newHeight = true;
          this.heightSamples[Math.floor(h * 10)] = true;
        }
      }
      return newHeight || wrappingWhiteSpace.indexOf(whiteSpace) > -1 != this.lineWrapping || this.direction != direction;
    }
    refresh(whiteSpace, direction, lineHeight, charWidth, lineLength, knownHeights) {
      let lineWrapping = wrappingWhiteSpace.indexOf(whiteSpace) > -1;
      let changed = Math.round(lineHeight) != Math.round(this.lineHeight) || this.lineWrapping != lineWrapping || this.direction != direction;
      this.lineWrapping = lineWrapping;
      this.direction = direction;
      this.lineHeight = lineHeight;
      this.charWidth = charWidth;
      this.lineLength = lineLength;
      if (changed) {
        this.heightSamples = {};
        for (let i = 0; i < knownHeights.length; i++) {
          let h = knownHeights[i];
          if (h < 0)
            i++;
          else
            this.heightSamples[Math.floor(h * 10)] = true;
        }
      }
      return changed;
    }
  };
  var MeasuredHeights = class {
    constructor(from, heights) {
      this.from = from;
      this.heights = heights;
      this.index = 0;
    }
    get more() {
      return this.index < this.heights.length;
    }
  };
  var BlockInfo = class {
    constructor(from, length, top2, height, type) {
      this.from = from;
      this.length = length;
      this.top = top2;
      this.height = height;
      this.type = type;
    }
    get to() {
      return this.from + this.length;
    }
    get bottom() {
      return this.top + this.height;
    }
    join(other) {
      let detail = (Array.isArray(this.type) ? this.type : [this]).concat(Array.isArray(other.type) ? other.type : [other]);
      return new BlockInfo(this.from, this.length + other.length, this.top, this.height + other.height, detail);
    }
  };
  var QueryType;
  (function(QueryType2) {
    QueryType2[QueryType2["ByPos"] = 0] = "ByPos";
    QueryType2[QueryType2["ByHeight"] = 1] = "ByHeight";
    QueryType2[QueryType2["ByPosNoHeight"] = 2] = "ByPosNoHeight";
  })(QueryType || (QueryType = {}));
  var Flag;
  (function(Flag2) {
    Flag2[Flag2["Break"] = 1] = "Break";
    Flag2[Flag2["Outdated"] = 2] = "Outdated";
    Flag2[Flag2["SingleLine"] = 4] = "SingleLine";
  })(Flag || (Flag = {}));
  var Epsilon = 1e-4;
  var HeightMap = class {
    constructor(length, height, flags = 2) {
      this.length = length;
      this.height = height;
      this.flags = flags;
    }
    get outdated() {
      return (this.flags & 2) > 0;
    }
    set outdated(value) {
      this.flags = (value ? 2 : 0) | this.flags & ~2;
    }
    setHeight(oracle, height) {
      if (this.height != height) {
        if (Math.abs(this.height - height) > Epsilon)
          oracle.heightChanged = true;
        this.height = height;
      }
    }
    replace(_from, _to, nodes) {
      return HeightMap.of(nodes);
    }
    decomposeLeft(_to, result) {
      result.push(this);
    }
    decomposeRight(_from, result) {
      result.push(this);
    }
    applyChanges(decorations2, oldDoc, oracle, changes) {
      let me = this;
      for (let i = changes.length - 1; i >= 0; i--) {
        let {fromA, toA, fromB, toB} = changes[i];
        let start = me.lineAt(fromA, 2, oldDoc, 0, 0);
        let end = start.to >= toA ? start : me.lineAt(toA, 2, oldDoc, 0, 0);
        toB += end.to - toA;
        toA = end.to;
        while (i > 0 && start.from <= changes[i - 1].toA) {
          fromA = changes[i - 1].fromA;
          fromB = changes[i - 1].fromB;
          i--;
          if (fromA < start.from)
            start = me.lineAt(fromA, 2, oldDoc, 0, 0);
        }
        fromB += start.from - fromA;
        fromA = start.from;
        let nodes = NodeBuilder.build(oracle, decorations2, fromB, toB);
        me = me.replace(fromA, toA, nodes);
      }
      return me.updateHeight(oracle, 0);
    }
    static empty() {
      return new HeightMapText(0, 0);
    }
    static of(nodes) {
      if (nodes.length == 1)
        return nodes[0];
      let i = 0, j = nodes.length, before = 0, after = 0;
      for (; ; ) {
        if (i == j) {
          if (before > after * 2) {
            let split = nodes[i - 1];
            if (split.break)
              nodes.splice(--i, 1, split.left, null, split.right);
            else
              nodes.splice(--i, 1, split.left, split.right);
            j += 1 + split.break;
            before -= split.size;
          } else if (after > before * 2) {
            let split = nodes[j];
            if (split.break)
              nodes.splice(j, 1, split.left, null, split.right);
            else
              nodes.splice(j, 1, split.left, split.right);
            j += 2 + split.break;
            after -= split.size;
          } else {
            break;
          }
        } else if (before < after) {
          let next = nodes[i++];
          if (next)
            before += next.size;
        } else {
          let next = nodes[--j];
          if (next)
            after += next.size;
        }
      }
      let brk = 0;
      if (nodes[i - 1] == null) {
        brk = 1;
        i--;
      } else if (nodes[i] == null) {
        brk = 1;
        j++;
      }
      return new HeightMapBranch(HeightMap.of(nodes.slice(0, i)), brk, HeightMap.of(nodes.slice(j)));
    }
  };
  HeightMap.prototype.size = 1;
  var HeightMapBlock = class extends HeightMap {
    constructor(length, height, type) {
      super(length, height);
      this.type = type;
    }
    blockAt(_height, _doc, top2, offset) {
      return new BlockInfo(offset, this.length, top2, this.height, this.type);
    }
    lineAt(_value, _type, doc2, top2, offset) {
      return this.blockAt(0, doc2, top2, offset);
    }
    forEachLine(_from, _to, doc2, top2, offset, f) {
      f(this.blockAt(0, doc2, top2, offset));
    }
    updateHeight(oracle, offset = 0, _force = false, measured) {
      if (measured && measured.from <= offset && measured.more)
        this.setHeight(oracle, measured.heights[measured.index++]);
      this.outdated = false;
      return this;
    }
    toString() {
      return `block(${this.length})`;
    }
  };
  var HeightMapText = class extends HeightMapBlock {
    constructor(length, height) {
      super(length, height, BlockType.Text);
      this.collapsed = 0;
      this.widgetHeight = 0;
    }
    replace(_from, _to, nodes) {
      let node = nodes[0];
      if (nodes.length == 1 && (node instanceof HeightMapText || node instanceof HeightMapGap && node.flags & 4) && Math.abs(this.length - node.length) < 10) {
        if (node instanceof HeightMapGap)
          node = new HeightMapText(node.length, this.height);
        else
          node.height = this.height;
        if (!this.outdated)
          node.outdated = false;
        return node;
      } else {
        return HeightMap.of(nodes);
      }
    }
    updateHeight(oracle, offset = 0, force = false, measured) {
      if (measured && measured.from <= offset && measured.more)
        this.setHeight(oracle, measured.heights[measured.index++]);
      else if (force || this.outdated)
        this.setHeight(oracle, Math.max(this.widgetHeight, oracle.heightForLine(this.length - this.collapsed)));
      this.outdated = false;
      return this;
    }
    toString() {
      return `line(${this.length}${this.collapsed ? -this.collapsed : ""}${this.widgetHeight ? ":" + this.widgetHeight : ""})`;
    }
  };
  var HeightMapGap = class extends HeightMap {
    constructor(length) {
      super(length, 0);
    }
    lines(doc2, offset) {
      let firstLine = doc2.lineAt(offset).number, lastLine = doc2.lineAt(offset + this.length).number;
      return {firstLine, lastLine, lineHeight: this.height / (lastLine - firstLine + 1)};
    }
    blockAt(height, doc2, top2, offset) {
      let {firstLine, lastLine, lineHeight} = this.lines(doc2, offset);
      let line = Math.max(0, Math.min(lastLine - firstLine, Math.floor((height - top2) / lineHeight)));
      let {from, length} = doc2.line(firstLine + line);
      return new BlockInfo(from, length, top2 + lineHeight * line, lineHeight, BlockType.Text);
    }
    lineAt(value, type, doc2, top2, offset) {
      if (type == 1)
        return this.blockAt(value, doc2, top2, offset);
      if (type == 2) {
        let {from: from2, to} = doc2.lineAt(value);
        return new BlockInfo(from2, to - from2, 0, 0, BlockType.Text);
      }
      let {firstLine, lineHeight} = this.lines(doc2, offset);
      let {from, length, number: number2} = doc2.lineAt(value);
      return new BlockInfo(from, length, top2 + lineHeight * (number2 - firstLine), lineHeight, BlockType.Text);
    }
    forEachLine(from, to, doc2, top2, offset, f) {
      let {firstLine, lineHeight} = this.lines(doc2, offset);
      for (let pos = Math.max(from, offset), end = Math.min(offset + this.length, to); pos <= end; ) {
        let line = doc2.lineAt(pos);
        if (pos == from)
          top2 += lineHeight * (line.number - firstLine);
        f(new BlockInfo(line.from, line.length, top2, lineHeight, BlockType.Text));
        top2 += lineHeight;
        pos = line.to + 1;
      }
    }
    replace(from, to, nodes) {
      let after = this.length - to;
      if (after > 0) {
        let last = nodes[nodes.length - 1];
        if (last instanceof HeightMapGap)
          nodes[nodes.length - 1] = new HeightMapGap(last.length + after);
        else
          nodes.push(null, new HeightMapGap(after - 1));
      }
      if (from > 0) {
        let first = nodes[0];
        if (first instanceof HeightMapGap)
          nodes[0] = new HeightMapGap(from + first.length);
        else
          nodes.unshift(new HeightMapGap(from - 1), null);
      }
      return HeightMap.of(nodes);
    }
    decomposeLeft(to, result) {
      result.push(new HeightMapGap(to - 1), null);
    }
    decomposeRight(from, result) {
      result.push(null, new HeightMapGap(this.length - from - 1));
    }
    updateHeight(oracle, offset = 0, force = false, measured) {
      let end = offset + this.length;
      if (measured && measured.from <= offset + this.length && measured.more) {
        let nodes = [], pos = Math.max(offset, measured.from);
        if (measured.from > offset)
          nodes.push(new HeightMapGap(measured.from - offset - 1).updateHeight(oracle, offset));
        while (pos <= end && measured.more) {
          let len = oracle.doc.lineAt(pos).length;
          if (nodes.length)
            nodes.push(null);
          let line = new HeightMapText(len, measured.heights[measured.index++]);
          line.outdated = false;
          nodes.push(line);
          pos += len + 1;
        }
        if (pos <= end)
          nodes.push(null, new HeightMapGap(end - pos).updateHeight(oracle, pos));
        oracle.heightChanged = true;
        return HeightMap.of(nodes);
      } else if (force || this.outdated) {
        this.setHeight(oracle, oracle.heightForGap(offset, offset + this.length));
        this.outdated = false;
      }
      return this;
    }
    toString() {
      return `gap(${this.length})`;
    }
  };
  var HeightMapBranch = class extends HeightMap {
    constructor(left, brk, right) {
      super(left.length + brk + right.length, left.height + right.height, brk | (left.outdated || right.outdated ? 2 : 0));
      this.left = left;
      this.right = right;
      this.size = left.size + right.size;
    }
    get break() {
      return this.flags & 1;
    }
    blockAt(height, doc2, top2, offset) {
      let mid = top2 + this.left.height;
      return height < mid || this.right.height == 0 ? this.left.blockAt(height, doc2, top2, offset) : this.right.blockAt(height, doc2, mid, offset + this.left.length + this.break);
    }
    lineAt(value, type, doc2, top2, offset) {
      let rightTop = top2 + this.left.height, rightOffset = offset + this.left.length + this.break;
      let left = type == 1 ? value < rightTop || this.right.height == 0 : value < rightOffset;
      let base2 = left ? this.left.lineAt(value, type, doc2, top2, offset) : this.right.lineAt(value, type, doc2, rightTop, rightOffset);
      if (this.break || (left ? base2.to < rightOffset : base2.from > rightOffset))
        return base2;
      let subQuery = type == 2 ? 2 : 0;
      if (left)
        return base2.join(this.right.lineAt(rightOffset, subQuery, doc2, rightTop, rightOffset));
      else
        return this.left.lineAt(rightOffset, subQuery, doc2, top2, offset).join(base2);
    }
    forEachLine(from, to, doc2, top2, offset, f) {
      let rightTop = top2 + this.left.height, rightOffset = offset + this.left.length + this.break;
      if (this.break) {
        if (from < rightOffset)
          this.left.forEachLine(from, to, doc2, top2, offset, f);
        if (to >= rightOffset)
          this.right.forEachLine(from, to, doc2, rightTop, rightOffset, f);
      } else {
        let mid = this.lineAt(rightOffset, 0, doc2, top2, offset);
        if (from < mid.from)
          this.left.forEachLine(from, mid.from - 1, doc2, top2, offset, f);
        if (mid.to >= from && mid.from <= to)
          f(mid);
        if (to > mid.to)
          this.right.forEachLine(mid.to + 1, to, doc2, rightTop, rightOffset, f);
      }
    }
    replace(from, to, nodes) {
      let rightStart = this.left.length + this.break;
      if (to < rightStart)
        return this.balanced(this.left.replace(from, to, nodes), this.right);
      if (from > this.left.length)
        return this.balanced(this.left, this.right.replace(from - rightStart, to - rightStart, nodes));
      let result = [];
      if (from > 0)
        this.decomposeLeft(from, result);
      let left = result.length;
      for (let node of nodes)
        result.push(node);
      if (from > 0)
        mergeGaps(result, left - 1);
      if (to < this.length) {
        let right = result.length;
        this.decomposeRight(to, result);
        mergeGaps(result, right);
      }
      return HeightMap.of(result);
    }
    decomposeLeft(to, result) {
      let left = this.left.length;
      if (to <= left)
        return this.left.decomposeLeft(to, result);
      result.push(this.left);
      if (this.break) {
        left++;
        if (to >= left)
          result.push(null);
      }
      if (to > left)
        this.right.decomposeLeft(to - left, result);
    }
    decomposeRight(from, result) {
      let left = this.left.length, right = left + this.break;
      if (from >= right)
        return this.right.decomposeRight(from - right, result);
      if (from < left)
        this.left.decomposeRight(from, result);
      if (this.break && from < right)
        result.push(null);
      result.push(this.right);
    }
    balanced(left, right) {
      if (left.size > 2 * right.size || right.size > 2 * left.size)
        return HeightMap.of(this.break ? [left, null, right] : [left, right]);
      this.left = left;
      this.right = right;
      this.height = left.height + right.height;
      this.outdated = left.outdated || right.outdated;
      this.size = left.size + right.size;
      this.length = left.length + this.break + right.length;
      return this;
    }
    updateHeight(oracle, offset = 0, force = false, measured) {
      let {left, right} = this, rightStart = offset + left.length + this.break, rebalance = null;
      if (measured && measured.from <= offset + left.length && measured.more)
        rebalance = left = left.updateHeight(oracle, offset, force, measured);
      else
        left.updateHeight(oracle, offset, force);
      if (measured && measured.from <= rightStart + right.length && measured.more)
        rebalance = right = right.updateHeight(oracle, rightStart, force, measured);
      else
        right.updateHeight(oracle, rightStart, force);
      if (rebalance)
        return this.balanced(left, right);
      this.height = this.left.height + this.right.height;
      this.outdated = false;
      return this;
    }
    toString() {
      return this.left + (this.break ? " " : "-") + this.right;
    }
  };
  function mergeGaps(nodes, around) {
    let before, after;
    if (nodes[around] == null && (before = nodes[around - 1]) instanceof HeightMapGap && (after = nodes[around + 1]) instanceof HeightMapGap)
      nodes.splice(around - 1, 3, new HeightMapGap(before.length + 1 + after.length));
  }
  var relevantWidgetHeight = 5;
  var NodeBuilder = class {
    constructor(pos, oracle) {
      this.pos = pos;
      this.oracle = oracle;
      this.nodes = [];
      this.lineStart = -1;
      this.lineEnd = -1;
      this.covering = null;
      this.writtenTo = pos;
    }
    get isCovered() {
      return this.covering && this.nodes[this.nodes.length - 1] == this.covering;
    }
    span(_from, to) {
      if (this.lineStart > -1) {
        let end = Math.min(to, this.lineEnd), last = this.nodes[this.nodes.length - 1];
        if (last instanceof HeightMapText)
          last.length += end - this.pos;
        else if (end > this.pos || !this.isCovered)
          this.nodes.push(new HeightMapText(end - this.pos, -1));
        this.writtenTo = end;
        if (to > end) {
          this.nodes.push(null);
          this.writtenTo++;
          this.lineStart = -1;
        }
      }
      this.pos = to;
    }
    point(from, to, deco) {
      if (from < to || deco.heightRelevant) {
        let height = deco.widget ? Math.max(0, deco.widget.estimatedHeight) : 0;
        let len = to - from;
        if (deco.block) {
          this.addBlock(new HeightMapBlock(len, height, deco.type));
        } else if (len || height >= relevantWidgetHeight) {
          this.addLineDeco(height, len);
        }
      } else if (to > from) {
        this.span(from, to);
      }
      if (this.lineEnd > -1 && this.lineEnd < this.pos)
        this.lineEnd = this.oracle.doc.lineAt(this.pos).to;
    }
    enterLine() {
      if (this.lineStart > -1)
        return;
      let {from, to} = this.oracle.doc.lineAt(this.pos);
      this.lineStart = from;
      this.lineEnd = to;
      if (this.writtenTo < from) {
        if (this.writtenTo < from - 1 || this.nodes[this.nodes.length - 1] == null)
          this.nodes.push(this.blankContent(this.writtenTo, from - 1));
        this.nodes.push(null);
      }
      if (this.pos > from)
        this.nodes.push(new HeightMapText(this.pos - from, -1));
      this.writtenTo = this.pos;
    }
    blankContent(from, to) {
      let gap = new HeightMapGap(to - from);
      if (this.oracle.doc.lineAt(from).to == to)
        gap.flags |= 4;
      return gap;
    }
    ensureLine() {
      this.enterLine();
      let last = this.nodes.length ? this.nodes[this.nodes.length - 1] : null;
      if (last instanceof HeightMapText)
        return last;
      let line = new HeightMapText(0, -1);
      this.nodes.push(line);
      return line;
    }
    addBlock(block) {
      this.enterLine();
      if (block.type == BlockType.WidgetAfter && !this.isCovered)
        this.ensureLine();
      this.nodes.push(block);
      this.writtenTo = this.pos = this.pos + block.length;
      if (block.type != BlockType.WidgetBefore)
        this.covering = block;
    }
    addLineDeco(height, length) {
      let line = this.ensureLine();
      line.length += length;
      line.collapsed += length;
      line.widgetHeight = Math.max(line.widgetHeight, height);
      this.writtenTo = this.pos = this.pos + length;
    }
    finish(from) {
      let last = this.nodes.length == 0 ? null : this.nodes[this.nodes.length - 1];
      if (this.lineStart > -1 && !(last instanceof HeightMapText) && !this.isCovered)
        this.nodes.push(new HeightMapText(0, -1));
      else if (this.writtenTo < this.pos || last == null)
        this.nodes.push(this.blankContent(this.writtenTo, this.pos));
      let pos = from;
      for (let node of this.nodes) {
        if (node instanceof HeightMapText)
          node.updateHeight(this.oracle, pos);
        pos += node ? node.length : 1;
      }
      return this.nodes;
    }
    static build(oracle, decorations2, from, to) {
      let builder = new NodeBuilder(from, oracle);
      RangeSet.spans(decorations2, from, to, builder, 0);
      return builder.finish(from);
    }
  };
  function heightRelevantDecoChanges(a, b, diff) {
    let comp = new DecorationComparator2();
    RangeSet.compare(a, b, diff, comp, 0);
    return comp.changes;
  }
  var DecorationComparator2 = class {
    constructor() {
      this.changes = [];
    }
    compareRange() {
    }
    comparePoint(from, to, a, b) {
      if (from < to || a && a.heightRelevant || b && b.heightRelevant)
        addRange(from, to, this.changes, 5);
    }
  };

  // ../view/src/viewstate.ts
  function visiblePixelRange(dom, paddingTop) {
    let rect = dom.getBoundingClientRect();
    let left = Math.max(0, rect.left), right = Math.min(innerWidth, rect.right);
    let top2 = Math.max(0, rect.top), bottom = Math.min(innerHeight, rect.bottom);
    for (let parent = dom.parentNode; parent; ) {
      if (parent.nodeType == 1) {
        if ((parent.scrollHeight > parent.clientHeight || parent.scrollWidth > parent.clientWidth) && window.getComputedStyle(parent).overflow != "visible") {
          let parentRect = parent.getBoundingClientRect();
          left = Math.max(left, parentRect.left);
          right = Math.min(right, parentRect.right);
          top2 = Math.max(top2, parentRect.top);
          bottom = Math.min(bottom, parentRect.bottom);
        }
        parent = parent.parentNode;
      } else if (parent.nodeType == 11) {
        parent = parent.host;
      } else {
        break;
      }
    }
    return {
      left: left - rect.left,
      right: right - rect.left,
      top: top2 - (rect.top + paddingTop),
      bottom: bottom - (rect.top + paddingTop)
    };
  }
  var VP;
  (function(VP2) {
    VP2[VP2["Margin"] = 1e3] = "Margin";
    VP2[VP2["MinCoverMargin"] = 10] = "MinCoverMargin";
    VP2[VP2["MaxCoverMargin"] = 250] = "MaxCoverMargin";
    VP2[VP2["MaxDOMHeight"] = 7e6] = "MaxDOMHeight";
  })(VP || (VP = {}));
  var LineGap = class {
    constructor(from, to, size) {
      this.from = from;
      this.to = to;
      this.size = size;
    }
    static same(a, b) {
      if (a.length != b.length)
        return false;
      for (let i = 0; i < a.length; i++) {
        let gA = a[i], gB = b[i];
        if (gA.from != gB.from || gA.to != gB.to || gA.size != gB.size)
          return false;
      }
      return true;
    }
    draw(wrapping) {
      return Decoration.replace({widget: new LineGapWidget(this.size, wrapping)}).range(this.from, this.to);
    }
  };
  var LineGapWidget = class extends WidgetType {
    constructor(size, vertical) {
      super();
      this.size = size;
      this.vertical = vertical;
    }
    eq(other) {
      return other.size == this.size && other.vertical == this.vertical;
    }
    toDOM() {
      let elt = document.createElement("div");
      if (this.vertical) {
        elt.style.height = this.size + "px";
      } else {
        elt.style.width = this.size + "px";
        elt.style.height = "2px";
        elt.style.display = "inline-block";
      }
      return elt;
    }
    get estimatedHeight() {
      return this.vertical ? this.size : -1;
    }
  };
  var LG;
  (function(LG2) {
    LG2[LG2["Margin"] = 1e4] = "Margin";
    LG2[LG2["HalfMargin"] = 5e3] = "HalfMargin";
    LG2[LG2["MinViewPort"] = 15e3] = "MinViewPort";
  })(LG || (LG = {}));
  var ViewState = class {
    constructor(state) {
      this.state = state;
      this.pixelViewport = {left: 0, right: window.innerWidth, top: 0, bottom: 0};
      this.inView = true;
      this.paddingTop = 0;
      this.paddingBottom = 0;
      this.contentWidth = 0;
      this.heightOracle = new HeightOracle();
      this.scaler = IdScaler;
      this.scrollTo = null;
      this.printing = false;
      this.visibleRanges = [];
      this.mustEnforceCursorAssoc = false;
      this.heightMap = HeightMap.empty().applyChanges(state.facet(decorations), Text.empty, this.heightOracle.setDoc(state.doc), [new ChangedRange(0, 0, 0, state.doc.length)]);
      this.viewport = this.getViewport(0, null);
      this.updateForViewport();
      this.lineGaps = this.ensureLineGaps([]);
      this.lineGapDeco = Decoration.set(this.lineGaps.map((gap) => gap.draw(false)));
      this.computeVisibleRanges();
    }
    updateForViewport() {
      let viewports = [this.viewport], {main} = this.state.selection;
      for (let i = 0; i <= 1; i++) {
        let pos = i ? main.head : main.anchor;
        if (!viewports.some(({from, to}) => pos >= from && pos <= to)) {
          let {from, to} = this.lineAt(pos, 0);
          viewports.push(new Viewport(from, to));
        }
      }
      this.viewports = viewports.sort((a, b) => a.from - b.from);
      this.scaler = this.heightMap.height <= 7e6 ? IdScaler : new BigScaler(this.heightOracle.doc, this.heightMap, this.viewports);
    }
    update(update, scrollTo2 = null) {
      let prev = this.state;
      this.state = update.state;
      let newDeco = this.state.facet(decorations);
      let contentChanges = update.changedRanges;
      let heightChanges = ChangedRange.extendWithRanges(contentChanges, heightRelevantDecoChanges(update.startState.facet(decorations), newDeco, update ? update.changes : ChangeSet.empty(this.state.doc.length)));
      let prevHeight = this.heightMap.height;
      this.heightMap = this.heightMap.applyChanges(newDeco, prev.doc, this.heightOracle.setDoc(this.state.doc), heightChanges);
      if (this.heightMap.height != prevHeight)
        update.flags |= UpdateFlag.Height;
      let viewport = heightChanges.length ? this.mapViewport(this.viewport, update.changes) : this.viewport;
      if (scrollTo2 && (scrollTo2.head < viewport.from || scrollTo2.head > viewport.to) || !this.viewportIsAppropriate(viewport))
        viewport = this.getViewport(0, scrollTo2);
      if (!viewport.eq(this.viewport)) {
        this.viewport = viewport;
        update.flags |= UpdateFlag.Viewport;
      }
      this.updateForViewport();
      if (this.lineGaps.length || this.viewport.to - this.viewport.from > 15e3)
        update.flags |= this.updateLineGaps(this.ensureLineGaps(this.mapLineGaps(this.lineGaps, update.changes)));
      this.computeVisibleRanges();
      if (scrollTo2)
        this.scrollTo = scrollTo2;
      if (!this.mustEnforceCursorAssoc && update.selectionSet && update.view.lineWrapping && update.state.selection.main.empty && update.state.selection.main.assoc)
        this.mustEnforceCursorAssoc = true;
    }
    measure(docView, repeated) {
      let dom = docView.dom, whiteSpace = "", direction = Direction.LTR;
      if (!repeated) {
        let style = window.getComputedStyle(dom);
        whiteSpace = style.whiteSpace, direction = style.direction == "rtl" ? Direction.RTL : Direction.LTR;
        this.paddingTop = parseInt(style.paddingTop) || 0;
        this.paddingBottom = parseInt(style.paddingBottom) || 0;
      }
      let pixelViewport = this.printing ? {top: -1e8, bottom: 1e8, left: -1e8, right: 1e8} : visiblePixelRange(dom, this.paddingTop);
      let dTop = pixelViewport.top - this.pixelViewport.top, dBottom = pixelViewport.bottom - this.pixelViewport.bottom;
      this.pixelViewport = pixelViewport;
      this.inView = this.pixelViewport.bottom > this.pixelViewport.top && this.pixelViewport.right > this.pixelViewport.left;
      if (!this.inView)
        return 0;
      let lineHeights = docView.measureVisibleLineHeights();
      let refresh = false, bias = 0, result = 0, oracle = this.heightOracle;
      if (!repeated) {
        let contentWidth = docView.dom.clientWidth;
        if (oracle.mustRefresh(lineHeights, whiteSpace, direction) || oracle.lineWrapping && Math.abs(contentWidth - this.contentWidth) > oracle.charWidth) {
          let {lineHeight, charWidth} = docView.measureTextSize();
          refresh = oracle.refresh(whiteSpace, direction, lineHeight, charWidth, contentWidth / charWidth, lineHeights);
          if (refresh) {
            docView.minWidth = 0;
            result |= UpdateFlag.Geometry;
          }
        }
        if (this.contentWidth != contentWidth) {
          this.contentWidth = contentWidth;
          result |= UpdateFlag.Geometry;
        }
        if (dTop > 0 && dBottom > 0)
          bias = Math.max(dTop, dBottom);
        else if (dTop < 0 && dBottom < 0)
          bias = Math.min(dTop, dBottom);
      }
      oracle.heightChanged = false;
      this.heightMap = this.heightMap.updateHeight(oracle, 0, refresh, new MeasuredHeights(this.viewport.from, lineHeights));
      if (oracle.heightChanged)
        result |= UpdateFlag.Height;
      if (!this.viewportIsAppropriate(this.viewport, bias) || this.scrollTo && (this.scrollTo.head < this.viewport.from || this.scrollTo.head > this.viewport.to)) {
        let newVP = this.getViewport(bias, this.scrollTo);
        if (newVP.from != this.viewport.from || newVP.to != this.viewport.to) {
          this.viewport = newVP;
          result |= UpdateFlag.Viewport;
        }
      }
      this.updateForViewport();
      if (this.lineGaps.length || this.viewport.to - this.viewport.from > 15e3)
        result |= this.updateLineGaps(this.ensureLineGaps(refresh ? [] : this.lineGaps));
      this.computeVisibleRanges();
      if (this.mustEnforceCursorAssoc) {
        this.mustEnforceCursorAssoc = false;
        docView.enforceCursorAssoc();
      }
      return result;
    }
    get visibleTop() {
      return this.scaler.fromDOM(this.pixelViewport.top, 0);
    }
    get visibleBottom() {
      return this.scaler.fromDOM(this.pixelViewport.bottom, 0);
    }
    getViewport(bias, scrollTo2) {
      let marginTop = 0.5 - Math.max(-0.5, Math.min(0.5, bias / 1e3 / 2));
      let map = this.heightMap, doc2 = this.state.doc, {visibleTop, visibleBottom} = this;
      let viewport = new Viewport(map.lineAt(visibleTop - marginTop * 1e3, QueryType.ByHeight, doc2, 0, 0).from, map.lineAt(visibleBottom + (1 - marginTop) * 1e3, QueryType.ByHeight, doc2, 0, 0).to);
      if (scrollTo2) {
        if (scrollTo2.head < viewport.from) {
          let {top: newTop} = map.lineAt(scrollTo2.head, QueryType.ByPos, doc2, 0, 0);
          viewport = new Viewport(map.lineAt(newTop - 1e3 / 2, QueryType.ByHeight, doc2, 0, 0).from, map.lineAt(newTop + (visibleBottom - visibleTop) + 1e3 / 2, QueryType.ByHeight, doc2, 0, 0).to);
        } else if (scrollTo2.head > viewport.to) {
          let {bottom: newBottom} = map.lineAt(scrollTo2.head, QueryType.ByPos, doc2, 0, 0);
          viewport = new Viewport(map.lineAt(newBottom - (visibleBottom - visibleTop) - 1e3 / 2, QueryType.ByHeight, doc2, 0, 0).from, map.lineAt(newBottom + 1e3 / 2, QueryType.ByHeight, doc2, 0, 0).to);
        }
      }
      return viewport;
    }
    mapViewport(viewport, changes) {
      let from = changes.mapPos(viewport.from, -1), to = changes.mapPos(viewport.to, 1);
      return new Viewport(this.heightMap.lineAt(from, QueryType.ByPos, this.state.doc, 0, 0).from, this.heightMap.lineAt(to, QueryType.ByPos, this.state.doc, 0, 0).to);
    }
    viewportIsAppropriate({from, to}, bias = 0) {
      let {top: top2} = this.heightMap.lineAt(from, QueryType.ByPos, this.state.doc, 0, 0);
      let {bottom} = this.heightMap.lineAt(to, QueryType.ByPos, this.state.doc, 0, 0);
      let {visibleTop, visibleBottom} = this;
      return (from == 0 || top2 <= visibleTop - Math.max(10, Math.min(-bias, 250))) && (to == this.state.doc.length || bottom >= visibleBottom + Math.max(10, Math.min(bias, 250))) && (top2 > visibleTop - 2 * 1e3 && bottom < visibleBottom + 2 * 1e3);
    }
    mapLineGaps(gaps, changes) {
      if (!gaps.length || changes.empty)
        return gaps;
      let mapped = [];
      for (let gap of gaps)
        if (!changes.touchesRange(gap.from, gap.to))
          mapped.push(new LineGap(changes.mapPos(gap.from), changes.mapPos(gap.to), gap.size));
      return mapped;
    }
    ensureLineGaps(current) {
      let gaps = [];
      if (this.heightOracle.direction != Direction.LTR)
        return gaps;
      this.heightMap.forEachLine(this.viewport.from, this.viewport.to, this.state.doc, 0, 0, (line) => {
        if (line.length < 1e4)
          return;
        let structure = lineStructure(line.from, line.to, this.state);
        if (structure.total < 1e4)
          return;
        let viewFrom, viewTo;
        if (this.heightOracle.lineWrapping) {
          if (line.from != this.viewport.from)
            viewFrom = line.from;
          else
            viewFrom = findPosition(structure, (this.visibleTop - line.top) / line.height);
          if (line.to != this.viewport.to)
            viewTo = line.to;
          else
            viewTo = findPosition(structure, (this.visibleBottom - line.top) / line.height);
        } else {
          let totalWidth = structure.total * this.heightOracle.charWidth;
          viewFrom = findPosition(structure, this.pixelViewport.left / totalWidth);
          viewTo = findPosition(structure, this.pixelViewport.right / totalWidth);
        }
        let sel = this.state.selection.main;
        if (sel.from <= viewFrom && sel.to >= line.from)
          viewFrom = sel.from;
        if (sel.from <= line.to && sel.to >= viewTo)
          viewTo = sel.to;
        let gapTo = viewFrom - 1e4, gapFrom = viewTo + 1e4;
        if (gapTo > line.from + 5e3)
          gaps.push(find(current, (gap) => gap.from == line.from && gap.to > gapTo - 5e3 && gap.to < gapTo + 5e3) || new LineGap(line.from, gapTo, this.gapSize(line, gapTo, true, structure)));
        if (gapFrom < line.to - 5e3)
          gaps.push(find(current, (gap) => gap.to == line.to && gap.from > gapFrom - 5e3 && gap.from < gapFrom + 5e3) || new LineGap(gapFrom, line.to, this.gapSize(line, gapFrom, false, structure)));
      });
      return gaps;
    }
    gapSize(line, pos, start, structure) {
      if (this.heightOracle.lineWrapping) {
        let height = line.height * findFraction(structure, pos);
        return start ? height : line.height - height;
      } else {
        let ratio = findFraction(structure, pos);
        return structure.total * this.heightOracle.charWidth * (start ? ratio : 1 - ratio);
      }
    }
    updateLineGaps(gaps) {
      if (!LineGap.same(gaps, this.lineGaps)) {
        this.lineGaps = gaps;
        this.lineGapDeco = Decoration.set(gaps.map((gap) => gap.draw(this.heightOracle.lineWrapping)));
        return UpdateFlag.LineGaps;
      }
      return 0;
    }
    computeVisibleRanges() {
      let deco = this.state.facet(decorations);
      if (this.lineGaps.length)
        deco = deco.concat(this.lineGapDeco);
      let ranges = [];
      RangeSet.spans(deco, this.viewport.from, this.viewport.to, {
        span(from, to) {
          ranges.push({from, to});
        },
        point() {
        }
      }, 20);
      this.visibleRanges = ranges;
    }
    lineAt(pos, editorTop) {
      editorTop += this.paddingTop;
      return scaleBlock(this.heightMap.lineAt(pos, QueryType.ByPos, this.state.doc, editorTop, 0), this.scaler, editorTop);
    }
    lineAtHeight(height, editorTop) {
      editorTop += this.paddingTop;
      return scaleBlock(this.heightMap.lineAt(this.scaler.fromDOM(height, editorTop), QueryType.ByHeight, this.state.doc, editorTop, 0), this.scaler, editorTop);
    }
    blockAtHeight(height, editorTop) {
      editorTop += this.paddingTop;
      return scaleBlock(this.heightMap.blockAt(this.scaler.fromDOM(height, editorTop), this.state.doc, editorTop, 0), this.scaler, editorTop);
    }
    forEachLine(from, to, f, editorTop) {
      editorTop += this.paddingTop;
      return this.heightMap.forEachLine(from, to, this.state.doc, editorTop, 0, this.scaler.scale == 1 ? f : (b) => f(scaleBlock(b, this.scaler, editorTop)));
    }
    get contentHeight() {
      return this.domHeight + this.paddingTop + this.paddingBottom;
    }
    get domHeight() {
      return this.scaler.toDOM(this.heightMap.height, this.paddingTop);
    }
  };
  var Viewport = class {
    constructor(from, to) {
      this.from = from;
      this.to = to;
    }
    eq(b) {
      return this.from == b.from && this.to == b.to;
    }
  };
  function lineStructure(from, to, state) {
    let ranges = [], pos = from, total = 0;
    RangeSet.spans(state.facet(decorations), from, to, {
      span() {
      },
      point(from2, to2) {
        if (from2 > pos) {
          ranges.push({from: pos, to: from2});
          total += from2 - pos;
        }
        pos = to2;
      }
    }, 20);
    if (pos < to) {
      ranges.push({from: pos, to});
      total += to - pos;
    }
    return {total, ranges};
  }
  function findPosition({total, ranges}, ratio) {
    if (ratio <= 0)
      return ranges[0].from;
    if (ratio >= 1)
      return ranges[ranges.length - 1].to;
    let dist = Math.floor(total * ratio);
    for (let i = 0; ; i++) {
      let {from, to} = ranges[i], size = to - from;
      if (dist <= size)
        return from + dist;
      dist -= size;
    }
  }
  function findFraction(structure, pos) {
    let counted = 0;
    for (let {from, to} of structure.ranges) {
      if (pos <= to) {
        counted += pos - from;
        break;
      }
      counted += to - from;
    }
    return counted / structure.total;
  }
  function find(array, f) {
    for (let val of array)
      if (f(val))
        return val;
    return void 0;
  }
  var IdScaler = {
    toDOM(n) {
      return n;
    },
    fromDOM(n) {
      return n;
    },
    scale: 1
  };
  var BigScaler = class {
    constructor(doc2, heightMap, viewports) {
      let vpHeight = 0, base2 = 0, domBase = 0;
      this.viewports = viewports.map(({from, to}) => {
        let top2 = heightMap.lineAt(from, QueryType.ByPos, doc2, 0, 0).top;
        let bottom = heightMap.lineAt(to, QueryType.ByPos, doc2, 0, 0).bottom;
        vpHeight += bottom - top2;
        return {from, to, top: top2, bottom, domTop: 0, domBottom: 0};
      });
      this.scale = (7e6 - vpHeight) / (heightMap.height - vpHeight);
      for (let obj of this.viewports) {
        obj.domTop = domBase + (obj.top - base2) * this.scale;
        domBase = obj.domBottom = obj.domTop + (obj.bottom - obj.top);
        base2 = obj.bottom;
      }
    }
    toDOM(n, top2) {
      n -= top2;
      for (let i = 0, base2 = 0, domBase = 0; ; i++) {
        let vp = i < this.viewports.length ? this.viewports[i] : null;
        if (!vp || n < vp.top)
          return domBase + (n - base2) * this.scale + top2;
        if (n <= vp.bottom)
          return vp.domTop + (n - vp.top) + top2;
        base2 = vp.bottom;
        domBase = vp.domBottom;
      }
    }
    fromDOM(n, top2) {
      n -= top2;
      for (let i = 0, base2 = 0, domBase = 0; ; i++) {
        let vp = i < this.viewports.length ? this.viewports[i] : null;
        if (!vp || n < vp.domTop)
          return base2 + (n - domBase) / this.scale + top2;
        if (n <= vp.domBottom)
          return vp.top + (n - vp.domTop) + top2;
        base2 = vp.bottom;
        domBase = vp.domBottom;
      }
    }
  };
  function scaleBlock(block, scaler, top2) {
    if (scaler.scale == 1)
      return block;
    let bTop = scaler.toDOM(block.top, top2), bBottom = scaler.toDOM(block.bottom, top2);
    return new BlockInfo(block.from, block.length, bTop, bBottom - bTop, Array.isArray(block.type) ? block.type.map((b) => scaleBlock(b, scaler, top2)) : block.type);
  }

  // ../view/src/theme.ts
  var theme = Facet.define({combine: (strs) => strs.join(" ")});
  var darkTheme = Facet.define({combine: (values) => values.indexOf(true) > -1});
  var baseThemeID = StyleModule.newName();
  var baseLightID = StyleModule.newName();
  var baseDarkID = StyleModule.newName();
  var lightDarkIDs = {"&light": "." + baseLightID, "&dark": "." + baseDarkID};
  function buildTheme(main, spec, scopes) {
    return new StyleModule(spec, {
      finish(sel) {
        return /&/.test(sel) ? sel.replace(/&\w*/, (m) => {
          if (m == "&")
            return main;
          if (!scopes || !scopes[m])
            throw new RangeError(`Unsupported selector: ${m}`);
          return scopes[m];
        }) : main + " " + sel;
      }
    });
  }
  var baseTheme = buildTheme("." + baseThemeID, {
    "&": {
      position: "relative !important",
      boxSizing: "border-box",
      "&.cm-focused": {
        outline: "1px dotted #212121"
      },
      display: "flex !important",
      flexDirection: "column"
    },
    ".cm-scroller": {
      display: "flex !important",
      alignItems: "flex-start !important",
      fontFamily: "monospace",
      lineHeight: 1.4,
      flexGrow: 2,
      overflowX: "auto",
      position: "relative",
      zIndex: 0
    },
    ".cm-content": {
      margin: 0,
      flexGrow: 2,
      minHeight: "100%",
      display: "block",
      whiteSpace: "pre",
      wordWrap: "normal",
      boxSizing: "border-box",
      padding: "4px 0",
      outline: "none"
    },
    ".cm-lineWrapping": {
      whiteSpace: "pre-wrap",
      overflowWrap: "anywhere"
    },
    "&light .cm-content": {caretColor: "black"},
    "&dark .cm-content": {caretColor: "white"},
    ".cm-line": {
      display: "block",
      padding: "0 2px 0 4px"
    },
    ".cm-selectionLayer": {
      zIndex: -1,
      contain: "size style"
    },
    ".cm-selectionBackground": {
      position: "absolute"
    },
    "&light .cm-selectionBackground": {
      background: "#d9d9d9"
    },
    "&dark .cm-selectionBackground": {
      background: "#222"
    },
    "&light.cm-focused .cm-selectionBackground": {
      background: "#d7d4f0"
    },
    "&dark.cm-focused .cm-selectionBackground": {
      background: "#233"
    },
    ".cm-cursorLayer": {
      zIndex: 100,
      contain: "size style",
      pointerEvents: "none"
    },
    "&.cm-focused .cm-cursorLayer": {
      animation: "steps(1) cm-blink 1.2s infinite"
    },
    "@keyframes cm-blink": {"0%": {}, "50%": {visibility: "hidden"}, "100%": {}},
    "@keyframes cm-blink2": {"0%": {}, "50%": {visibility: "hidden"}, "100%": {}},
    ".cm-cursor": {
      position: "absolute",
      borderLeft: "1.2px solid black",
      marginLeft: "-0.6px",
      pointerEvents: "none",
      display: "none"
    },
    "&dark .cm-cursor": {
      borderLeftColor: "#444"
    },
    "&.cm-focused .cm-cursor": {
      display: "block"
    },
    "&light .cm-activeLine": {backgroundColor: "#f3f9ff"},
    "&dark .cm-activeLine": {backgroundColor: "#223039"},
    "&light .cm-specialChar": {color: "red"},
    "&dark .cm-specialChar": {color: "#f78"},
    ".cm-tab": {
      display: "inline-block",
      overflow: "hidden",
      verticalAlign: "bottom"
    },
    ".cm-placeholder": {
      color: "#888",
      display: "inline-block"
    },
    ".cm-button": {
      verticalAlign: "middle",
      color: "inherit",
      fontSize: "70%",
      padding: ".2em 1em",
      borderRadius: "3px"
    },
    "&light .cm-button": {
      backgroundImage: "linear-gradient(#eff1f5, #d9d9df)",
      border: "1px solid #888",
      "&:active": {
        backgroundImage: "linear-gradient(#b4b4b4, #d0d3d6)"
      }
    },
    "&dark .cm-button": {
      backgroundImage: "linear-gradient(#393939, #111)",
      border: "1px solid #888",
      "&:active": {
        backgroundImage: "linear-gradient(#111, #333)"
      }
    },
    ".cm-textfield": {
      verticalAlign: "middle",
      color: "inherit",
      fontSize: "70%",
      border: "1px solid silver",
      padding: ".2em .5em"
    },
    "&light .cm-textfield": {
      backgroundColor: "white"
    },
    "&dark .cm-textfield": {
      border: "1px solid #555",
      backgroundColor: "inherit"
    }
  }, lightDarkIDs);

  // ../view/src/domobserver.ts
  var observeOptions = {
    childList: true,
    characterData: true,
    subtree: true,
    characterDataOldValue: true
  };
  var useCharData = browser_default.ie && browser_default.ie_version <= 11;
  var DOMObserver = class {
    constructor(view, onChange, onScrollChanged) {
      this.view = view;
      this.onChange = onChange;
      this.onScrollChanged = onScrollChanged;
      this.active = false;
      this.ignoreSelection = new DOMSelection();
      this.delayedFlush = -1;
      this.queue = [];
      this.scrollTargets = [];
      this.intersection = null;
      this.intersecting = false;
      this.parentCheck = -1;
      this.dom = view.contentDOM;
      this.observer = new MutationObserver((mutations) => {
        for (let mut of mutations)
          this.queue.push(mut);
        if ((browser_default.ie && browser_default.ie_version <= 11 || browser_default.ios && view.composing) && mutations.some((m) => m.type == "childList" && m.removedNodes.length || m.type == "characterData" && m.oldValue.length > m.target.nodeValue.length))
          this.flushSoon();
        else
          this.flush();
      });
      if (useCharData)
        this.onCharData = (event) => {
          this.queue.push({
            target: event.target,
            type: "characterData",
            oldValue: event.prevValue
          });
          this.flushSoon();
        };
      this.onSelectionChange = this.onSelectionChange.bind(this);
      this.start();
      this.onScroll = this.onScroll.bind(this);
      window.addEventListener("scroll", this.onScroll);
      if (typeof IntersectionObserver == "function") {
        this.intersection = new IntersectionObserver((entries) => {
          if (this.parentCheck < 0)
            this.parentCheck = setTimeout(this.listenForScroll.bind(this), 1e3);
          if (entries[entries.length - 1].intersectionRatio > 0 != this.intersecting) {
            this.intersecting = !this.intersecting;
            if (this.intersecting != this.view.inView)
              this.onScrollChanged(document.createEvent("Event"));
          }
        }, {});
        this.intersection.observe(this.dom);
      }
      this.listenForScroll();
    }
    onScroll(e) {
      if (this.intersecting) {
        this.flush();
        this.onScrollChanged(e);
      }
    }
    onSelectionChange(event) {
      let {view} = this, sel = getSelection(view.root);
      if (view.state.facet(editable) ? view.root.activeElement != this.dom : !hasSelection(view.dom, sel))
        return;
      let context = sel.anchorNode && view.docView.nearest(sel.anchorNode);
      if (context && context.ignoreEvent(event))
        return;
      if (browser_default.ie && browser_default.ie_version <= 11 && !view.state.selection.main.empty && sel.focusNode && isEquivalentPosition(sel.focusNode, sel.focusOffset, sel.anchorNode, sel.anchorOffset))
        this.flushSoon();
      else
        this.flush();
    }
    listenForScroll() {
      this.parentCheck = -1;
      let i = 0, changed = null;
      for (let dom = this.dom; dom; ) {
        if (dom.nodeType == 1) {
          if (!changed && i < this.scrollTargets.length && this.scrollTargets[i] == dom)
            i++;
          else if (!changed)
            changed = this.scrollTargets.slice(0, i);
          if (changed)
            changed.push(dom);
          dom = dom.assignedSlot || dom.parentNode;
        } else if (dom.nodeType == 11) {
          dom = dom.host;
        } else {
          break;
        }
      }
      if (i < this.scrollTargets.length && !changed)
        changed = this.scrollTargets.slice(0, i);
      if (changed) {
        for (let dom of this.scrollTargets)
          dom.removeEventListener("scroll", this.onScroll);
        for (let dom of this.scrollTargets = changed)
          dom.addEventListener("scroll", this.onScroll);
      }
    }
    ignore(f) {
      if (!this.active)
        return f();
      try {
        this.stop();
        return f();
      } finally {
        this.start();
        this.clear();
      }
    }
    start() {
      if (this.active)
        return;
      this.observer.observe(this.dom, observeOptions);
      this.dom.ownerDocument.addEventListener("selectionchange", this.onSelectionChange);
      if (useCharData)
        this.dom.addEventListener("DOMCharacterDataModified", this.onCharData);
      this.active = true;
    }
    stop() {
      if (!this.active)
        return;
      this.active = false;
      this.observer.disconnect();
      this.dom.ownerDocument.removeEventListener("selectionchange", this.onSelectionChange);
      if (useCharData)
        this.dom.removeEventListener("DOMCharacterDataModified", this.onCharData);
    }
    clearSelection() {
      this.ignoreSelection.set(getSelection(this.view.root));
    }
    clear() {
      this.observer.takeRecords();
      this.queue.length = 0;
      this.clearSelection();
    }
    flushSoon() {
      if (this.delayedFlush < 0)
        this.delayedFlush = window.setTimeout(() => {
          this.delayedFlush = -1;
          this.flush();
        }, 20);
    }
    forceFlush() {
      if (this.delayedFlush >= 0) {
        window.clearTimeout(this.delayedFlush);
        this.delayedFlush = -1;
        this.flush();
      }
    }
    flush() {
      if (this.delayedFlush >= 0)
        return;
      let records = this.queue;
      for (let mut of this.observer.takeRecords())
        records.push(mut);
      if (records.length)
        this.queue = [];
      let selection = getSelection(this.view.root);
      let newSel = !this.ignoreSelection.eq(selection) && hasSelection(this.dom, selection);
      if (records.length == 0 && !newSel)
        return;
      let from = -1, to = -1, typeOver = false;
      for (let record of records) {
        let range = this.readMutation(record);
        if (!range)
          continue;
        if (range.typeOver)
          typeOver = true;
        if (from == -1) {
          ;
          ({from, to} = range);
        } else {
          from = Math.min(range.from, from);
          to = Math.max(range.to, to);
        }
      }
      let startState = this.view.state;
      if (from > -1 || newSel)
        this.onChange(from, to, typeOver);
      if (this.view.state == startState) {
        if (this.view.docView.dirty) {
          this.ignore(() => this.view.docView.sync());
          this.view.docView.dirty = Dirty.Not;
        }
        this.view.docView.updateSelection();
      }
      this.clearSelection();
    }
    readMutation(rec) {
      let cView = this.view.docView.nearest(rec.target);
      if (!cView || cView.ignoreMutation(rec))
        return null;
      cView.markDirty();
      if (rec.type == "childList") {
        let childBefore = findChild(cView, rec.previousSibling || rec.target.previousSibling, -1);
        let childAfter = findChild(cView, rec.nextSibling || rec.target.nextSibling, 1);
        return {
          from: childBefore ? cView.posAfter(childBefore) : cView.posAtStart,
          to: childAfter ? cView.posBefore(childAfter) : cView.posAtEnd,
          typeOver: false
        };
      } else {
        return {from: cView.posAtStart, to: cView.posAtEnd, typeOver: rec.target.nodeValue == rec.oldValue};
      }
    }
    destroy() {
      this.stop();
      if (this.intersection)
        this.intersection.disconnect();
      for (let dom of this.scrollTargets)
        dom.removeEventListener("scroll", this.onScroll);
      window.removeEventListener("scroll", this.onScroll);
      clearTimeout(this.parentCheck);
    }
  };
  function findChild(cView, dom, dir) {
    while (dom) {
      let curView = ContentView.get(dom);
      if (curView && curView.parent == cView)
        return curView;
      let parent = dom.parentNode;
      dom = parent != cView.dom ? parent : dir > 0 ? dom.nextSibling : dom.previousSibling;
    }
    return null;
  }

  // ../view/src/domchange.ts
  function applyDOMChange(view, start, end, typeOver) {
    let change, newSel;
    let sel = view.state.selection.main, bounds;
    if (start > -1 && (bounds = view.docView.domBoundsAround(start, end, 0))) {
      let {from, to} = bounds;
      let selPoints = view.docView.impreciseHead || view.docView.impreciseAnchor ? [] : selectionPoints(view.contentDOM, view.root);
      let reader = new DOMReader(selPoints, view);
      reader.readRange(bounds.startDOM, bounds.endDOM);
      newSel = selectionFromPoints(selPoints, from);
      let preferredPos = sel.from, preferredSide = null;
      if (view.inputState.lastKeyCode === 8 && view.inputState.lastKeyTime > Date.now() - 100 || browser_default.android && reader.text.length < to - from) {
        preferredPos = sel.to;
        preferredSide = "end";
      }
      let diff = findDiff(view.state.sliceDoc(from, to), reader.text, preferredPos - from, preferredSide);
      if (diff)
        change = {
          from: from + diff.from,
          to: from + diff.toA,
          insert: view.state.toText(reader.text.slice(diff.from, diff.toB))
        };
    } else if (view.hasFocus || !view.state.facet(editable)) {
      let domSel = getSelection(view.root);
      let {impreciseHead: iHead, impreciseAnchor: iAnchor} = view.docView;
      let head = iHead && iHead.node == domSel.focusNode && iHead.offset == domSel.focusOffset || !contains(view.contentDOM, domSel.focusNode) ? view.state.selection.main.head : view.docView.posFromDOM(domSel.focusNode, domSel.focusOffset);
      let anchor = iAnchor && iAnchor.node == domSel.anchorNode && iAnchor.offset == domSel.anchorOffset || !contains(view.contentDOM, domSel.anchorNode) ? view.state.selection.main.anchor : selectionCollapsed(domSel) ? head : view.docView.posFromDOM(domSel.anchorNode, domSel.anchorOffset);
      if (head != sel.head || anchor != sel.anchor)
        newSel = EditorSelection.single(anchor, head);
    }
    if (!change && !newSel)
      return;
    if (!change && typeOver && !sel.empty && newSel && newSel.main.empty)
      change = {from: sel.from, to: sel.to, insert: view.state.doc.slice(sel.from, sel.to)};
    else if (change && change.from >= sel.from && change.to <= sel.to && (change.from != sel.from || change.to != sel.to) && sel.to - sel.from - (change.to - change.from) <= 4)
      change = {
        from: sel.from,
        to: sel.to,
        insert: view.state.doc.slice(sel.from, change.from).append(change.insert).append(view.state.doc.slice(change.to, sel.to))
      };
    if (change) {
      let startState = view.state;
      if (browser_default.android && (change.from == sel.from && change.to == sel.to && change.insert.length == 1 && change.insert.lines == 2 && dispatchKey(view, "Enter", 13) || change.from == sel.from - 1 && change.to == sel.to && change.insert.length == 0 && dispatchKey(view, "Backspace", 8) || change.from == sel.from && change.to == sel.to + 1 && change.insert.length == 0 && dispatchKey(view, "Delete", 46)) || browser_default.ios && (view.inputState.lastIOSEnter > Date.now() - 225 && change.insert.lines > 1 && dispatchKey(view, "Enter", 13) || view.inputState.lastIOSBackspace > Date.now() - 225 && !change.insert.length && dispatchKey(view, "Backspace", 8)))
        return;
      let text = change.insert.toString();
      if (view.state.facet(inputHandler).some((h) => h(view, change.from, change.to, text)))
        return;
      if (view.inputState.composing >= 0)
        view.inputState.composing++;
      let tr;
      if (change.from >= sel.from && change.to <= sel.to && change.to - change.from >= (sel.to - sel.from) / 3 && (!newSel || newSel.main.empty && newSel.main.from == change.from + change.insert.length)) {
        let before = sel.from < change.from ? startState.sliceDoc(sel.from, change.from) : "";
        let after = sel.to > change.to ? startState.sliceDoc(change.to, sel.to) : "";
        tr = startState.replaceSelection(view.state.toText(before + change.insert.sliceString(0, void 0, view.state.lineBreak) + after));
      } else {
        let changes = startState.changes(change);
        tr = {
          changes,
          selection: newSel && !startState.selection.main.eq(newSel.main) && newSel.main.to <= changes.newLength ? startState.selection.replaceRange(newSel.main) : void 0
        };
      }
      view.dispatch(tr, {scrollIntoView: true, annotations: Transaction.userEvent.of("input")});
    } else if (newSel && !newSel.main.eq(sel)) {
      let scrollIntoView2 = false, annotations;
      if (view.inputState.lastSelectionTime > Date.now() - 50) {
        if (view.inputState.lastSelectionOrigin == "keyboardselection")
          scrollIntoView2 = true;
        else
          annotations = Transaction.userEvent.of(view.inputState.lastSelectionOrigin);
      }
      view.dispatch({selection: newSel, scrollIntoView: scrollIntoView2, annotations});
    }
  }
  function findDiff(a, b, preferredPos, preferredSide) {
    let minLen = Math.min(a.length, b.length);
    let from = 0;
    while (from < minLen && a.charCodeAt(from) == b.charCodeAt(from))
      from++;
    if (from == minLen && a.length == b.length)
      return null;
    let toA = a.length, toB = b.length;
    while (toA > 0 && toB > 0 && a.charCodeAt(toA - 1) == b.charCodeAt(toB - 1)) {
      toA--;
      toB--;
    }
    if (preferredSide == "end") {
      let adjust = Math.max(0, from - Math.min(toA, toB));
      preferredPos -= toA + adjust - from;
    }
    if (toA < from && a.length < b.length) {
      let move = preferredPos <= from && preferredPos >= toA ? from - preferredPos : 0;
      from -= move;
      toB = from + (toB - toA);
      toA = from;
    } else if (toB < from) {
      let move = preferredPos <= from && preferredPos >= toB ? from - preferredPos : 0;
      from -= move;
      toA = from + (toA - toB);
      toB = from;
    }
    return {from, toA, toB};
  }
  var DOMReader = class {
    constructor(points, view) {
      this.points = points;
      this.view = view;
      this.text = "";
      this.lineBreak = view.state.lineBreak;
    }
    readRange(start, end) {
      if (!start)
        return;
      let parent = start.parentNode;
      for (let cur2 = start; ; ) {
        this.findPointBefore(parent, cur2);
        this.readNode(cur2);
        let next = cur2.nextSibling;
        if (next == end)
          break;
        let view = ContentView.get(cur2), nextView = ContentView.get(next);
        if ((view ? view.breakAfter : isBlockElement(cur2)) || (nextView ? nextView.breakAfter : isBlockElement(next)) && !(cur2.nodeName == "BR" && !cur2.cmIgnore))
          this.text += this.lineBreak;
        cur2 = next;
      }
      this.findPointBefore(parent, end);
    }
    readNode(node) {
      if (node.cmIgnore)
        return;
      let view = ContentView.get(node);
      let fromView = view && view.overrideDOMText;
      let text;
      if (fromView != null)
        text = fromView.sliceString(0, void 0, this.lineBreak);
      else if (node.nodeType == 3)
        text = node.nodeValue;
      else if (node.nodeName == "BR")
        text = node.nextSibling ? this.lineBreak : "";
      else if (node.nodeType == 1)
        this.readRange(node.firstChild, null);
      if (text != null) {
        this.findPointIn(node, text.length);
        this.text += text;
        if (browser_default.chrome && this.view.inputState.lastKeyCode == 13 && !node.nextSibling && /\n\n$/.test(this.text))
          this.text = this.text.slice(0, -1);
      }
    }
    findPointBefore(node, next) {
      for (let point of this.points)
        if (point.node == node && node.childNodes[point.offset] == next)
          point.pos = this.text.length;
    }
    findPointIn(node, maxLen) {
      for (let point of this.points)
        if (point.node == node)
          point.pos = this.text.length + Math.min(point.offset, maxLen);
    }
  };
  function isBlockElement(node) {
    return node.nodeType == 1 && /^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(node.nodeName);
  }
  var DOMPoint = class {
    constructor(node, offset) {
      this.node = node;
      this.offset = offset;
      this.pos = -1;
    }
  };
  function selectionPoints(dom, root) {
    let result = [];
    if (root.activeElement != dom)
      return result;
    let {anchorNode, anchorOffset, focusNode, focusOffset} = getSelection(root);
    if (anchorNode) {
      result.push(new DOMPoint(anchorNode, anchorOffset));
      if (focusNode != anchorNode || focusOffset != anchorOffset)
        result.push(new DOMPoint(focusNode, focusOffset));
    }
    return result;
  }
  function selectionFromPoints(points, base2) {
    if (points.length == 0)
      return null;
    let anchor = points[0].pos, head = points.length == 2 ? points[1].pos : anchor;
    return anchor > -1 && head > -1 ? EditorSelection.single(anchor + base2, head + base2) : null;
  }
  function dispatchKey(view, name2, code) {
    let options = {key: name2, code: name2, keyCode: code, which: code, cancelable: true};
    let down = new KeyboardEvent("keydown", options);
    down.synthetic = true;
    view.contentDOM.dispatchEvent(down);
    let up = new KeyboardEvent("keyup", options);
    up.synthetic = true;
    view.contentDOM.dispatchEvent(up);
    return down.defaultPrevented || up.defaultPrevented;
  }

  // ../view/src/editorview.ts
  var UpdateState;
  (function(UpdateState2) {
    UpdateState2[UpdateState2["Idle"] = 0] = "Idle";
    UpdateState2[UpdateState2["Measuring"] = 1] = "Measuring";
    UpdateState2[UpdateState2["Updating"] = 2] = "Updating";
  })(UpdateState || (UpdateState = {}));
  var _EditorView = class {
    constructor(config2 = {}) {
      this.plugins = [];
      this.editorAttrs = {};
      this.contentAttrs = {};
      this.bidiCache = [];
      this.updateState = 2;
      this.measureScheduled = -1;
      this.measureRequests = [];
      this.contentDOM = document.createElement("div");
      this.scrollDOM = document.createElement("div");
      this.scrollDOM.tabIndex = -1;
      this.scrollDOM.className = "cm-scroller";
      this.scrollDOM.appendChild(this.contentDOM);
      this.announceDOM = document.createElement("div");
      this.announceDOM.style.cssText = "position: absolute; top: -10000px";
      this.announceDOM.setAttribute("aria-live", "polite");
      this.dom = document.createElement("div");
      this.dom.appendChild(this.announceDOM);
      this.dom.appendChild(this.scrollDOM);
      this._dispatch = config2.dispatch || ((tr) => this.update([tr]));
      this.dispatch = this.dispatch.bind(this);
      this.root = config2.root || document;
      this.viewState = new ViewState(config2.state || EditorState.create());
      this.plugins = this.state.facet(viewPlugin).map((spec) => new PluginInstance(spec).update(this));
      this.observer = new DOMObserver(this, (from, to, typeOver) => {
        applyDOMChange(this, from, to, typeOver);
      }, (event) => {
        this.inputState.runScrollHandlers(this, event);
        this.measure();
      });
      this.inputState = new InputState(this);
      this.docView = new DocView(this);
      this.mountStyles();
      this.updateAttrs();
      this.updateState = 0;
      ensureGlobalHandler();
      this.requestMeasure();
      if (config2.parent)
        config2.parent.appendChild(this.dom);
    }
    get state() {
      return this.viewState.state;
    }
    get viewport() {
      return this.viewState.viewport;
    }
    get visibleRanges() {
      return this.viewState.visibleRanges;
    }
    get inView() {
      return this.viewState.inView;
    }
    get composing() {
      return this.inputState.composing > 0;
    }
    dispatch(...input) {
      this._dispatch(input.length == 1 && input[0] instanceof Transaction ? input[0] : this.state.update(...input));
    }
    update(transactions) {
      if (this.updateState != 0)
        throw new Error("Calls to EditorView.update are not allowed while an update is in progress");
      let redrawn = false, update;
      let state = this.state;
      for (let tr of transactions) {
        if (tr.startState != state)
          throw new RangeError("Trying to update state with a transaction that doesn't start from the previous state.");
        state = tr.state;
      }
      if (state.facet(EditorState.phrases) != this.state.facet(EditorState.phrases))
        return this.setState(state);
      update = new ViewUpdate(this, state, transactions);
      try {
        this.updateState = 2;
        let scrollTo2 = transactions.some((tr) => tr.scrollIntoView) ? state.selection.main : null;
        this.viewState.update(update, scrollTo2);
        this.bidiCache = CachedOrder.update(this.bidiCache, update.changes);
        if (!update.empty)
          this.updatePlugins(update);
        redrawn = this.docView.update(update);
        if (this.state.facet(styleModule) != this.styleModules)
          this.mountStyles();
        this.updateAttrs();
        this.showAnnouncements(transactions);
      } finally {
        this.updateState = 0;
      }
      if (redrawn || scrollTo || this.viewState.mustEnforceCursorAssoc)
        this.requestMeasure();
      if (!update.empty)
        for (let listener of this.state.facet(updateListener))
          listener(update);
    }
    setState(newState) {
      if (this.updateState != 0)
        throw new Error("Calls to EditorView.setState are not allowed while an update is in progress");
      this.updateState = 2;
      try {
        for (let plugin of this.plugins)
          plugin.destroy(this);
        this.viewState = new ViewState(newState);
        this.plugins = newState.facet(viewPlugin).map((spec) => new PluginInstance(spec).update(this));
        this.docView = new DocView(this);
        this.inputState.ensureHandlers(this);
        this.mountStyles();
        this.updateAttrs();
        this.bidiCache = [];
      } finally {
        this.updateState = 0;
      }
      this.requestMeasure();
    }
    updatePlugins(update) {
      let prevSpecs = update.startState.facet(viewPlugin), specs = update.state.facet(viewPlugin);
      if (prevSpecs != specs) {
        let newPlugins = [];
        for (let spec of specs) {
          let found = prevSpecs.indexOf(spec);
          if (found < 0) {
            newPlugins.push(new PluginInstance(spec));
          } else {
            let plugin = this.plugins[found];
            plugin.mustUpdate = update;
            newPlugins.push(plugin);
          }
        }
        for (let plugin of this.plugins)
          if (plugin.mustUpdate != update)
            plugin.destroy(this);
        this.plugins = newPlugins;
        this.inputState.ensureHandlers(this);
      } else {
        for (let p of this.plugins)
          p.mustUpdate = update;
      }
      for (let i = 0; i < this.plugins.length; i++)
        this.plugins[i] = this.plugins[i].update(this);
    }
    measure() {
      if (this.measureScheduled > -1)
        cancelAnimationFrame(this.measureScheduled);
      this.measureScheduled = -1;
      let updated = null;
      try {
        for (let i = 0; ; i++) {
          this.updateState = 1;
          let changed = this.viewState.measure(this.docView, i > 0);
          let measuring = this.measureRequests;
          if (!changed && !measuring.length && this.viewState.scrollTo == null)
            break;
          this.measureRequests = [];
          if (i > 5) {
            console.warn("Viewport failed to stabilize");
            break;
          }
          let measured = measuring.map((m) => {
            try {
              return m.read(this);
            } catch (e) {
              logException(this.state, e);
              return BadMeasure;
            }
          });
          let update = new ViewUpdate(this, this.state);
          update.flags |= changed;
          if (!updated)
            updated = update;
          else
            updated.flags |= changed;
          this.updateState = 2;
          if (!update.empty)
            this.updatePlugins(update);
          this.updateAttrs();
          if (changed)
            this.docView.update(update);
          for (let i2 = 0; i2 < measuring.length; i2++)
            if (measured[i2] != BadMeasure) {
              try {
                measuring[i2].write(measured[i2], this);
              } catch (e) {
                logException(this.state, e);
              }
            }
          if (this.viewState.scrollTo) {
            this.docView.scrollPosIntoView(this.viewState.scrollTo.head, this.viewState.scrollTo.assoc);
            this.viewState.scrollTo = null;
          }
          if (!(changed & UpdateFlag.Viewport) && this.measureRequests.length == 0)
            break;
        }
      } finally {
        this.updateState = 0;
      }
      this.measureScheduled = -1;
      if (updated && !updated.empty)
        for (let listener of this.state.facet(updateListener))
          listener(updated);
    }
    get themeClasses() {
      return baseThemeID + " " + (this.state.facet(darkTheme) ? baseDarkID : baseLightID) + " " + this.state.facet(theme);
    }
    updateAttrs() {
      let editorAttrs = combineAttrs(this.state.facet(editorAttributes), {
        class: "cm-editor cm-wrap" + (this.hasFocus ? " cm-focused " : " ") + this.themeClasses
      });
      updateAttrs(this.dom, this.editorAttrs, editorAttrs);
      this.editorAttrs = editorAttrs;
      let contentAttrs = combineAttrs(this.state.facet(contentAttributes), {
        spellcheck: "false",
        contenteditable: String(this.state.facet(editable)),
        class: "cm-content",
        style: `${browser_default.tabSize}: ${this.state.tabSize}`,
        role: "textbox",
        "aria-multiline": "true"
      });
      updateAttrs(this.contentDOM, this.contentAttrs, contentAttrs);
      this.contentAttrs = contentAttrs;
    }
    showAnnouncements(trs) {
      let first = true;
      for (let tr of trs)
        for (let effect of tr.effects)
          if (effect.is(_EditorView.announce)) {
            if (first)
              this.announceDOM.textContent = "";
            first = false;
            let div = this.announceDOM.appendChild(document.createElement("div"));
            div.textContent = effect.value;
          }
    }
    mountStyles() {
      this.styleModules = this.state.facet(styleModule);
      StyleModule.mount(this.root, this.styleModules.concat(baseTheme).reverse());
    }
    readMeasured() {
      if (this.updateState == 2)
        throw new Error("Reading the editor layout isn't allowed during an update");
      if (this.updateState == 0 && this.measureScheduled > -1)
        this.measure();
    }
    requestMeasure(request) {
      if (this.measureScheduled < 0)
        this.measureScheduled = requestAnimationFrame(() => this.measure());
      if (request) {
        if (request.key != null)
          for (let i = 0; i < this.measureRequests.length; i++) {
            if (this.measureRequests[i].key === request.key) {
              this.measureRequests[i] = request;
              return;
            }
          }
        this.measureRequests.push(request);
      }
    }
    pluginField(field) {
      let result = [];
      for (let plugin of this.plugins)
        plugin.update(this).takeField(field, result);
      return result;
    }
    plugin(plugin) {
      for (let inst of this.plugins)
        if (inst.spec == plugin)
          return inst.update(this).value;
      return null;
    }
    blockAtHeight(height, docTop) {
      this.readMeasured();
      return this.viewState.blockAtHeight(height, ensureTop(docTop, this.contentDOM));
    }
    visualLineAtHeight(height, docTop) {
      this.readMeasured();
      return this.viewState.lineAtHeight(height, ensureTop(docTop, this.contentDOM));
    }
    viewportLines(f, docTop) {
      let {from, to} = this.viewport;
      this.viewState.forEachLine(from, to, f, ensureTop(docTop, this.contentDOM));
    }
    visualLineAt(pos, docTop = 0) {
      return this.viewState.lineAt(pos, docTop);
    }
    get contentHeight() {
      return this.viewState.contentHeight;
    }
    moveByChar(start, forward, by) {
      return moveByChar(this, start, forward, by);
    }
    moveByGroup(start, forward) {
      return moveByChar(this, start, forward, (initial) => byGroup(this, start.head, initial));
    }
    moveToLineBoundary(start, forward, includeWrap = true) {
      return moveToLineBoundary(this, start, forward, includeWrap);
    }
    moveVertically(start, forward, distance) {
      return moveVertically(this, start, forward, distance);
    }
    scrollPosIntoView(pos) {
      this.viewState.scrollTo = EditorSelection.cursor(pos);
      this.requestMeasure();
    }
    domAtPos(pos) {
      return this.docView.domAtPos(pos);
    }
    posAtDOM(node, offset = 0) {
      return this.docView.posFromDOM(node, offset);
    }
    posAtCoords(coords) {
      this.readMeasured();
      return posAtCoords(this, coords);
    }
    coordsAtPos(pos, side = 1) {
      this.readMeasured();
      let rect = this.docView.coordsAt(pos, side);
      if (!rect || rect.left == rect.right)
        return rect;
      let line = this.state.doc.lineAt(pos), order = this.bidiSpans(line);
      let span = order[BidiSpan.find(order, pos - line.from, -1, side)];
      return flattenRect(rect, span.dir == Direction.LTR == side > 0);
    }
    get defaultCharacterWidth() {
      return this.viewState.heightOracle.charWidth;
    }
    get defaultLineHeight() {
      return this.viewState.heightOracle.lineHeight;
    }
    get textDirection() {
      return this.viewState.heightOracle.direction;
    }
    get lineWrapping() {
      return this.viewState.heightOracle.lineWrapping;
    }
    bidiSpans(line) {
      if (line.length > MaxBidiLine)
        return trivialOrder(line.length);
      let dir = this.textDirection;
      for (let entry of this.bidiCache)
        if (entry.from == line.from && entry.dir == dir)
          return entry.order;
      let order = computeOrder(line.text, this.textDirection);
      this.bidiCache.push(new CachedOrder(line.from, line.to, dir, order));
      return order;
    }
    get hasFocus() {
      return document.hasFocus() && this.root.activeElement == this.contentDOM;
    }
    focus() {
      this.observer.ignore(() => {
        focusPreventScroll(this.contentDOM);
        this.docView.updateSelection();
      });
    }
    destroy() {
      for (let plugin of this.plugins)
        plugin.destroy(this);
      this.inputState.destroy();
      this.dom.remove();
      this.observer.destroy();
      if (this.measureScheduled > -1)
        cancelAnimationFrame(this.measureScheduled);
    }
    static domEventHandlers(handlers2) {
      return ViewPlugin.define(() => ({}), {eventHandlers: handlers2});
    }
    static theme(spec, options) {
      let prefix = StyleModule.newName();
      let result = [theme.of(prefix), styleModule.of(buildTheme(`.${prefix}`, spec))];
      if (options && options.dark)
        result.push(darkTheme.of(true));
      return result;
    }
    static baseTheme(spec) {
      return Prec.fallback(styleModule.of(buildTheme("." + baseThemeID, spec, lightDarkIDs)));
    }
  };
  var EditorView = _EditorView;
  EditorView.styleModule = styleModule;
  EditorView.inputHandler = inputHandler;
  EditorView.exceptionSink = exceptionSink;
  EditorView.updateListener = updateListener;
  EditorView.editable = editable;
  EditorView.mouseSelectionStyle = mouseSelectionStyle;
  EditorView.dragMovesSelection = dragMovesSelection;
  EditorView.clickAddsSelectionRange = clickAddsSelectionRange;
  EditorView.decorations = decorations;
  EditorView.contentAttributes = contentAttributes;
  EditorView.editorAttributes = editorAttributes;
  EditorView.lineWrapping = _EditorView.contentAttributes.of({"class": "cm-lineWrapping"});
  EditorView.announce = StateEffect.define();
  var MaxBidiLine = 4096;
  function ensureTop(given, dom) {
    return given == null ? dom.getBoundingClientRect().top : given;
  }
  var registeredGlobalHandler = false;
  var resizeDebounce = -1;
  function ensureGlobalHandler() {
    if (registeredGlobalHandler)
      return;
    window.addEventListener("resize", () => {
      if (resizeDebounce == -1)
        resizeDebounce = setTimeout(handleResize, 50);
    });
  }
  function handleResize() {
    resizeDebounce = -1;
    let found = document.querySelectorAll(".cm-content");
    for (let i = 0; i < found.length; i++) {
      let docView = ContentView.get(found[i]);
      if (docView)
        docView.editorView.requestMeasure();
    }
  }
  var BadMeasure = {};
  var CachedOrder = class {
    constructor(from, to, dir, order) {
      this.from = from;
      this.to = to;
      this.dir = dir;
      this.order = order;
    }
    static update(cache, changes) {
      if (changes.empty)
        return cache;
      let result = [], lastDir = cache.length ? cache[cache.length - 1].dir : Direction.LTR;
      for (let i = Math.max(0, cache.length - 10); i < cache.length; i++) {
        let entry = cache[i];
        if (entry.dir == lastDir && !changes.touchesRange(entry.from, entry.to))
          result.push(new CachedOrder(changes.mapPos(entry.from, 1), changes.mapPos(entry.to, -1), entry.dir, entry.order));
      }
      return result;
    }
  };

  // ../node_modules/w3c-keyname/index.es.js
  var base = {
    8: "Backspace",
    9: "Tab",
    10: "Enter",
    12: "NumLock",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    44: "PrintScreen",
    45: "Insert",
    46: "Delete",
    59: ";",
    61: "=",
    91: "Meta",
    92: "Meta",
    106: "*",
    107: "+",
    108: ",",
    109: "-",
    110: ".",
    111: "/",
    144: "NumLock",
    145: "ScrollLock",
    160: "Shift",
    161: "Shift",
    162: "Control",
    163: "Control",
    164: "Alt",
    165: "Alt",
    173: "-",
    186: ";",
    187: "=",
    188: ",",
    189: "-",
    190: ".",
    191: "/",
    192: "`",
    219: "[",
    220: "\\",
    221: "]",
    222: "'",
    229: "q"
  };
  var shift = {
    48: ")",
    49: "!",
    50: "@",
    51: "#",
    52: "$",
    53: "%",
    54: "^",
    55: "&",
    56: "*",
    57: "(",
    59: ":",
    61: "+",
    173: "_",
    186: ":",
    187: "+",
    188: "<",
    189: "_",
    190: ">",
    191: "?",
    192: "~",
    219: "{",
    220: "|",
    221: "}",
    222: '"',
    229: "Q"
  };
  var chrome2 = typeof navigator != "undefined" && /Chrome\/(\d+)/.exec(navigator.userAgent);
  var safari2 = typeof navigator != "undefined" && /Apple Computer/.test(navigator.vendor);
  var gecko2 = typeof navigator != "undefined" && /Gecko\/\d+/.test(navigator.userAgent);
  var mac = typeof navigator != "undefined" && /Mac/.test(navigator.platform);
  var ie2 = typeof navigator != "undefined" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
  var brokenModifierNames = chrome2 && (mac || +chrome2[1] < 57) || gecko2 && mac;
  for (var i = 0; i < 10; i++)
    base[48 + i] = base[96 + i] = String(i);
  for (var i = 1; i <= 24; i++)
    base[i + 111] = "F" + i;
  for (var i = 65; i <= 90; i++) {
    base[i] = String.fromCharCode(i + 32);
    shift[i] = String.fromCharCode(i);
  }
  for (var code in base)
    if (!shift.hasOwnProperty(code))
      shift[code] = base[code];
  function keyName(event) {
    var ignoreKey = brokenModifierNames && (event.ctrlKey || event.altKey || event.metaKey) || (safari2 || ie2) && event.shiftKey && event.key && event.key.length == 1;
    var name2 = !ignoreKey && event.key || (event.shiftKey ? shift : base)[event.keyCode] || event.key || "Unidentified";
    if (name2 == "Esc")
      name2 = "Escape";
    if (name2 == "Del")
      name2 = "Delete";
    if (name2 == "Left")
      name2 = "ArrowLeft";
    if (name2 == "Up")
      name2 = "ArrowUp";
    if (name2 == "Right")
      name2 = "ArrowRight";
    if (name2 == "Down")
      name2 = "ArrowDown";
    return name2;
  }

  // ../view/src/keymap.ts
  var currentPlatform = typeof navigator == "undefined" ? "key" : /Mac/.test(navigator.platform) ? "mac" : /Win/.test(navigator.platform) ? "win" : /Linux|X11/.test(navigator.platform) ? "linux" : "key";
  function normalizeKeyName(name2, platform) {
    const parts = name2.split(/-(?!$)/);
    let result = parts[parts.length - 1];
    if (result == "Space")
      result = " ";
    let alt, ctrl, shift2, meta2;
    for (let i = 0; i < parts.length - 1; ++i) {
      const mod = parts[i];
      if (/^(cmd|meta|m)$/i.test(mod))
        meta2 = true;
      else if (/^a(lt)?$/i.test(mod))
        alt = true;
      else if (/^(c|ctrl|control)$/i.test(mod))
        ctrl = true;
      else if (/^s(hift)?$/i.test(mod))
        shift2 = true;
      else if (/^mod$/i.test(mod)) {
        if (platform == "mac")
          meta2 = true;
        else
          ctrl = true;
      } else
        throw new Error("Unrecognized modifier name: " + mod);
    }
    if (alt)
      result = "Alt-" + result;
    if (ctrl)
      result = "Ctrl-" + result;
    if (meta2)
      result = "Meta-" + result;
    if (shift2)
      result = "Shift-" + result;
    return result;
  }
  function modifiers(name2, event, shift2) {
    if (event.altKey)
      name2 = "Alt-" + name2;
    if (event.ctrlKey)
      name2 = "Ctrl-" + name2;
    if (event.metaKey)
      name2 = "Meta-" + name2;
    if (shift2 !== false && event.shiftKey)
      name2 = "Shift-" + name2;
    return name2;
  }
  var handleKeyEvents = EditorView.domEventHandlers({
    keydown(event, view) {
      return runHandlers(getKeymap(view.state), event, view, "editor");
    }
  });
  var keymap = Facet.define({enables: handleKeyEvents});
  var Keymaps = new WeakMap();
  function getKeymap(state) {
    let bindings = state.facet(keymap);
    let map = Keymaps.get(bindings);
    if (!map)
      Keymaps.set(bindings, map = buildKeymap(bindings.reduce((a, b) => a.concat(b), [])));
    return map;
  }
  function runScopeHandlers(view, event, scope) {
    return runHandlers(getKeymap(view.state), event, view, scope);
  }
  var storedPrefix = null;
  var PrefixTimeout = 4e3;
  function buildKeymap(bindings, platform = currentPlatform) {
    let bound = Object.create(null);
    let isPrefix = Object.create(null);
    let checkPrefix = (name2, is) => {
      let current = isPrefix[name2];
      if (current == null)
        isPrefix[name2] = is;
      else if (current != is)
        throw new Error("Key binding " + name2 + " is used both as a regular binding and as a multi-stroke prefix");
    };
    let add2 = (scope, key, command2, preventDefault) => {
      let scopeObj = bound[scope] || (bound[scope] = Object.create(null));
      let parts = key.split(/ (?!$)/).map((k) => normalizeKeyName(k, platform));
      for (let i = 1; i < parts.length; i++) {
        let prefix = parts.slice(0, i).join(" ");
        checkPrefix(prefix, true);
        if (!scopeObj[prefix])
          scopeObj[prefix] = {
            preventDefault: true,
            commands: [(view) => {
              let ourObj = storedPrefix = {view, prefix, scope};
              setTimeout(() => {
                if (storedPrefix == ourObj)
                  storedPrefix = null;
              }, PrefixTimeout);
              return true;
            }]
          };
      }
      let full = parts.join(" ");
      checkPrefix(full, false);
      let binding = scopeObj[full] || (scopeObj[full] = {preventDefault: false, commands: []});
      binding.commands.push(command2);
      if (preventDefault)
        binding.preventDefault = true;
    };
    for (let b of bindings) {
      let name2 = b[platform] || b.key;
      if (!name2)
        continue;
      for (let scope of b.scope ? b.scope.split(" ") : ["editor"]) {
        add2(scope, name2, b.run, b.preventDefault);
        if (b.shift)
          add2(scope, "Shift-" + name2, b.shift, b.preventDefault);
      }
    }
    return bound;
  }
  function runHandlers(map, event, view, scope) {
    let name2 = keyName(event), isChar = name2.length == 1 && name2 != " ";
    let prefix = "", fallthrough = false;
    if (storedPrefix && storedPrefix.view == view && storedPrefix.scope == scope) {
      prefix = storedPrefix.prefix + " ";
      if (fallthrough = modifierCodes.indexOf(event.keyCode) < 0)
        storedPrefix = null;
    }
    let runFor = (binding) => {
      if (binding) {
        for (let cmd2 of binding.commands)
          if (cmd2(view))
            return true;
        if (binding.preventDefault)
          fallthrough = true;
      }
      return false;
    };
    let scopeObj = map[scope], baseName;
    if (scopeObj) {
      if (runFor(scopeObj[prefix + modifiers(name2, event, !isChar)]))
        return true;
      if (isChar && (event.shiftKey || event.altKey || event.metaKey) && (baseName = base[event.keyCode]) && baseName != name2) {
        if (runFor(scopeObj[prefix + modifiers(baseName, event, true)]))
          return true;
      } else if (isChar && event.shiftKey) {
        if (runFor(scopeObj[prefix + modifiers(name2, event, true)]))
          return true;
      }
    }
    return fallthrough;
  }

  // ../view/src/draw-selection.ts
  var CanHidePrimary = !browser_default.ios;
  var selectionConfig = Facet.define({
    combine(configs) {
      return combineConfig(configs, {
        cursorBlinkRate: 1200,
        drawRangeCursor: true
      }, {
        cursorBlinkRate: (a, b) => Math.min(a, b),
        drawRangeCursor: (a, b) => a || b
      });
    }
  });
  function drawSelection(config2 = {}) {
    return [
      selectionConfig.of(config2),
      drawSelectionPlugin,
      hideNativeSelection
    ];
  }
  var Piece = class {
    constructor(left, top2, width, height, className) {
      this.left = left;
      this.top = top2;
      this.width = width;
      this.height = height;
      this.className = className;
    }
    draw() {
      let elt = document.createElement("div");
      elt.className = this.className;
      this.adjust(elt);
      return elt;
    }
    adjust(elt) {
      elt.style.left = this.left + "px";
      elt.style.top = this.top + "px";
      if (this.width >= 0)
        elt.style.width = this.width + "px";
      elt.style.height = this.height + "px";
    }
    eq(p) {
      return this.left == p.left && this.top == p.top && this.width == p.width && this.height == p.height && this.className == p.className;
    }
  };
  var drawSelectionPlugin = ViewPlugin.fromClass(class {
    constructor(view) {
      this.view = view;
      this.rangePieces = [];
      this.cursors = [];
      this.measureReq = {read: this.readPos.bind(this), write: this.drawSel.bind(this)};
      this.selectionLayer = view.scrollDOM.appendChild(document.createElement("div"));
      this.selectionLayer.className = "cm-selectionLayer";
      this.selectionLayer.setAttribute("aria-hidden", "true");
      this.cursorLayer = view.scrollDOM.appendChild(document.createElement("div"));
      this.cursorLayer.className = "cm-cursorLayer";
      this.cursorLayer.setAttribute("aria-hidden", "true");
      view.requestMeasure(this.measureReq);
      this.setBlinkRate();
    }
    setBlinkRate() {
      this.cursorLayer.style.animationDuration = this.view.state.facet(selectionConfig).cursorBlinkRate + "ms";
    }
    update(update) {
      let confChanged = update.startState.facet(selectionConfig) != update.state.facet(selectionConfig);
      if (confChanged || update.selectionSet || update.geometryChanged || update.viewportChanged)
        this.view.requestMeasure(this.measureReq);
      if (update.transactions.some((tr) => tr.scrollIntoView))
        this.cursorLayer.style.animationName = this.cursorLayer.style.animationName == "cm-blink" ? "cm-blink2" : "cm-blink";
      if (confChanged)
        this.setBlinkRate();
    }
    readPos() {
      let {state} = this.view, conf = state.facet(selectionConfig);
      let rangePieces = state.selection.ranges.map((r) => r.empty ? [] : measureRange(this.view, r)).reduce((a, b) => a.concat(b));
      let cursors = [];
      for (let r of state.selection.ranges) {
        let prim = r == state.selection.main;
        if (r.empty ? !prim || CanHidePrimary : conf.drawRangeCursor) {
          let piece = measureCursor(this.view, r, prim);
          if (piece)
            cursors.push(piece);
        }
      }
      return {rangePieces, cursors};
    }
    drawSel({rangePieces, cursors}) {
      if (rangePieces.length != this.rangePieces.length || rangePieces.some((p, i) => !p.eq(this.rangePieces[i]))) {
        this.selectionLayer.textContent = "";
        for (let p of rangePieces)
          this.selectionLayer.appendChild(p.draw());
        this.rangePieces = rangePieces;
      }
      if (cursors.length != this.cursors.length || cursors.some((c, i) => !c.eq(this.cursors[i]))) {
        let oldCursors = this.cursorLayer.children;
        if (oldCursors.length !== cursors.length) {
          this.cursorLayer.textContent = "";
          for (const c of cursors)
            this.cursorLayer.appendChild(c.draw());
        } else {
          cursors.forEach((c, idx) => c.adjust(oldCursors[idx]));
        }
        this.cursors = cursors;
      }
    }
    destroy() {
      this.selectionLayer.remove();
      this.cursorLayer.remove();
    }
  });
  var themeSpec = {
    ".cm-line": {
      "& ::selection": {backgroundColor: "transparent !important"},
      "&::selection": {backgroundColor: "transparent !important"}
    }
  };
  if (CanHidePrimary)
    themeSpec[".cm-line"].caretColor = "transparent !important";
  var hideNativeSelection = Prec.override(EditorView.theme(themeSpec));
  function getBase(view) {
    let rect = view.scrollDOM.getBoundingClientRect();
    let left = view.textDirection == Direction.LTR ? rect.left : rect.right - view.scrollDOM.clientWidth;
    return {left: left - view.scrollDOM.scrollLeft, top: rect.top - view.scrollDOM.scrollTop};
  }
  function wrappedLine(view, pos, inside2) {
    let range = EditorSelection.cursor(pos);
    return {
      from: Math.max(inside2.from, view.moveToLineBoundary(range, false, true).from),
      to: Math.min(inside2.to, view.moveToLineBoundary(range, true, true).from)
    };
  }
  function measureRange(view, range) {
    if (range.to <= view.viewport.from || range.from >= view.viewport.to)
      return [];
    let from = Math.max(range.from, view.viewport.from), to = Math.min(range.to, view.viewport.to);
    let ltr = view.textDirection == Direction.LTR;
    let content2 = view.contentDOM, contentRect = content2.getBoundingClientRect(), base2 = getBase(view);
    let lineStyle = window.getComputedStyle(content2.firstChild);
    let leftSide = contentRect.left + parseInt(lineStyle.paddingLeft);
    let rightSide = contentRect.right - parseInt(lineStyle.paddingRight);
    let visualStart = view.visualLineAt(from);
    let visualEnd = view.visualLineAt(to);
    if (view.lineWrapping) {
      visualStart = wrappedLine(view, from, visualStart);
      visualEnd = wrappedLine(view, to, visualEnd);
    }
    if (visualStart.from == visualEnd.from) {
      return pieces(drawForLine(range.from, range.to, visualStart));
    } else {
      let top2 = drawForLine(range.from, null, visualStart);
      let bottom = drawForLine(null, range.to, visualEnd);
      let between = [];
      if (visualStart.to < visualEnd.from - 1)
        between.push(piece(leftSide, top2.bottom, rightSide, bottom.top));
      else if (top2.bottom < bottom.top && bottom.top - top2.bottom < 4)
        top2.bottom = bottom.top = (top2.bottom + bottom.top) / 2;
      return pieces(top2).concat(between).concat(pieces(bottom));
    }
    function piece(left, top2, right, bottom) {
      return new Piece(left - base2.left, top2 - base2.top, right - left, bottom - top2, "cm-selectionBackground");
    }
    function pieces({top: top2, bottom, horizontal}) {
      let pieces2 = [];
      for (let i = 0; i < horizontal.length; i += 2)
        pieces2.push(piece(horizontal[i], top2, horizontal[i + 1], bottom));
      return pieces2;
    }
    function drawForLine(from2, to2, line) {
      let top2 = 1e9, bottom = -1e9, horizontal = [];
      function addSpan(from3, fromOpen, to3, toOpen, dir) {
        let fromCoords = view.coordsAtPos(from3, from3 == line.to ? -1 : 1);
        let toCoords = view.coordsAtPos(to3, to3 == line.from ? 1 : -1);
        top2 = Math.min(fromCoords.top, toCoords.top, top2);
        bottom = Math.max(fromCoords.bottom, toCoords.bottom, bottom);
        if (dir == Direction.LTR)
          horizontal.push(ltr && fromOpen ? leftSide : fromCoords.left, ltr && toOpen ? rightSide : toCoords.right);
        else
          horizontal.push(!ltr && toOpen ? leftSide : toCoords.left, !ltr && fromOpen ? rightSide : fromCoords.right);
      }
      let start = from2 ?? line.from, end = to2 ?? line.to;
      for (let r of view.visibleRanges)
        if (r.to > start && r.from < end) {
          for (let pos = Math.max(r.from, start), endPos = Math.min(r.to, end); ; ) {
            let docLine = view.state.doc.lineAt(pos);
            for (let span of view.bidiSpans(docLine)) {
              let spanFrom = span.from + docLine.from, spanTo = span.to + docLine.from;
              if (spanFrom >= endPos)
                break;
              if (spanTo > pos)
                addSpan(Math.max(spanFrom, pos), from2 == null && spanFrom <= start, Math.min(spanTo, endPos), to2 == null && spanTo >= end, span.dir);
            }
            pos = docLine.to + 1;
            if (pos >= endPos)
              break;
          }
        }
      if (horizontal.length == 0)
        addSpan(start, from2 == null, end, to2 == null, view.textDirection);
      return {top: top2, bottom, horizontal};
    }
  }
  function measureCursor(view, cursor, primary) {
    let pos = view.coordsAtPos(cursor.head, cursor.assoc || 1);
    if (!pos)
      return null;
    let base2 = getBase(view);
    return new Piece(pos.left - base2.left, pos.top - base2.top, -1, pos.bottom - pos.top, primary ? "cm-cursor cm-cursor-primary" : "cm-cursor cm-cursor-secondary");
  }

  // ../view/src/matchdecorator.ts
  function iterMatches(doc2, re, from, to, f) {
    re.lastIndex = 0;
    for (let cursor = doc2.iterRange(from, to), pos = from, m; !cursor.next().done; pos += cursor.value.length) {
      if (!cursor.lineBreak)
        while (m = re.exec(cursor.value))
          f(pos + m.index, pos + m.index + m[0].length, m);
    }
  }
  var MatchDecorator = class {
    constructor(config2) {
      let {regexp, decoration, boundary} = config2;
      if (!regexp.global)
        throw new RangeError("The regular expression given to MatchDecorator should have its 'g' flag set");
      this.regexp = regexp;
      this.getDeco = typeof decoration == "function" ? decoration : () => decoration;
      this.boundary = boundary;
    }
    createDeco(view) {
      let build = new RangeSetBuilder();
      for (let {from, to} of view.visibleRanges)
        iterMatches(view.state.doc, this.regexp, from, to, (a, b, m) => build.add(a, b, this.getDeco(m, view, a)));
      return build.finish();
    }
    updateDeco(update, deco) {
      let changeFrom = 1e9, changeTo = -1;
      if (update.docChanged)
        update.changes.iterChanges((_f, _t, from, to) => {
          if (to > update.view.viewport.from && from < update.view.viewport.to) {
            changeFrom = Math.min(from, changeFrom);
            changeTo = Math.max(to, changeTo);
          }
        });
      if (update.viewportChanged || changeTo - changeFrom > 1e3)
        return this.createDeco(update.view);
      if (changeTo > -1)
        return this.updateRange(update.view, deco.map(update.changes), changeFrom, changeTo);
      return deco;
    }
    updateRange(view, deco, updateFrom, updateTo) {
      for (let r of view.visibleRanges) {
        let from = Math.max(r.from, updateFrom), to = Math.min(r.to, updateTo);
        if (to > from) {
          let fromLine = view.state.doc.lineAt(from), toLine = fromLine.to < to ? view.state.doc.lineAt(to) : fromLine;
          let start = Math.max(r.from, fromLine.from), end = Math.min(r.to, toLine.to);
          if (this.boundary) {
            for (; from > fromLine.from; from--)
              if (this.boundary.test(fromLine.text[from - 1 - fromLine.from])) {
                start = from;
                break;
              }
            for (; to < toLine.to; to++)
              if (this.boundary.test(toLine.text[to - toLine.from])) {
                end = to;
                break;
              }
          }
          let ranges = [], m;
          if (fromLine == toLine) {
            this.regexp.lastIndex = start - fromLine.from;
            while ((m = this.regexp.exec(fromLine.text)) && m.index < end - fromLine.from) {
              let pos = m.index + fromLine.from;
              ranges.push(this.getDeco(m, view, pos).range(pos, pos + m[0].length));
            }
          } else {
            iterMatches(view.state.doc, this.regexp, start, end, (from2, to2, m2) => ranges.push(this.getDeco(m2, view, from2).range(from2, to2)));
          }
          deco = deco.update({filterFrom: start, filterTo: end, filter: () => false, add: ranges});
        }
      }
      return deco;
    }
  };

  // ../view/src/special-chars.ts
  var UnicodeRegexpSupport = /x/.unicode != null ? "gu" : "g";
  var Specials = new RegExp("[\0-\b\n-\x7F-\x9F\xAD\u061C\u200B\u200E\u200F\u2028\u2029\uFEFF\uFFF9-\uFFFC]", UnicodeRegexpSupport);
  var Names = {
    0: "null",
    7: "bell",
    8: "backspace",
    10: "newline",
    11: "vertical tab",
    13: "carriage return",
    27: "escape",
    8203: "zero width space",
    8204: "zero width non-joiner",
    8205: "zero width joiner",
    8206: "left-to-right mark",
    8207: "right-to-left mark",
    8232: "line separator",
    8233: "paragraph separator",
    65279: "zero width no-break space",
    65532: "object replacement"
  };
  var _supportsTabSize = null;
  function supportsTabSize() {
    if (_supportsTabSize == null && typeof document != "undefined" && document.body) {
      let styles = document.body.style;
      _supportsTabSize = (styles.tabSize ?? styles.MozTabSize) != null;
    }
    return _supportsTabSize || false;
  }
  var specialCharConfig = Facet.define({
    combine(configs) {
      let config2 = combineConfig(configs, {
        render: null,
        specialChars: Specials,
        addSpecialChars: null
      });
      if (config2.replaceTabs = !supportsTabSize())
        config2.specialChars = new RegExp("	|" + config2.specialChars.source, UnicodeRegexpSupport);
      if (config2.addSpecialChars)
        config2.specialChars = new RegExp(config2.specialChars.source + "|" + config2.addSpecialChars.source, UnicodeRegexpSupport);
      return config2;
    }
  });
  function highlightSpecialChars(config2 = {}) {
    return [specialCharConfig.of(config2), specialCharPlugin()];
  }
  var _plugin = null;
  function specialCharPlugin() {
    return _plugin || (_plugin = ViewPlugin.fromClass(class {
      constructor(view) {
        this.view = view;
        this.decorations = Decoration.none;
        this.decorationCache = Object.create(null);
        this.decorator = this.makeDecorator(view.state.facet(specialCharConfig));
        this.decorations = this.decorator.createDeco(view);
      }
      makeDecorator(conf) {
        return new MatchDecorator({
          regexp: conf.specialChars,
          decoration: (m, view, pos) => {
            let {doc: doc2} = view.state;
            let code = codePointAt(m[0], 0);
            if (code == 9) {
              let line = doc2.lineAt(pos);
              let size = view.state.tabSize, col = countColumn(doc2.sliceString(line.from, pos), 0, size);
              return Decoration.replace({widget: new TabWidget((size - col % size) * this.view.defaultCharacterWidth)});
            }
            return this.decorationCache[code] || (this.decorationCache[code] = Decoration.replace({widget: new SpecialCharWidget(conf, code)}));
          },
          boundary: conf.replaceTabs ? void 0 : /[^]/
        });
      }
      update(update) {
        let conf = update.state.facet(specialCharConfig);
        if (update.startState.facet(specialCharConfig) != conf) {
          this.decorator = this.makeDecorator(conf);
          this.decorations = this.decorator.createDeco(update.view);
        } else {
          this.decorations = this.decorator.updateDeco(update, this.decorations);
        }
      }
    }, {
      decorations: (v) => v.decorations
    }));
  }
  var DefaultPlaceholder = "\u2022";
  function placeholder(code) {
    if (code >= 32)
      return DefaultPlaceholder;
    if (code == 10)
      return "\u2424";
    return String.fromCharCode(9216 + code);
  }
  var SpecialCharWidget = class extends WidgetType {
    constructor(options, code) {
      super();
      this.options = options;
      this.code = code;
    }
    eq(other) {
      return other.code == this.code;
    }
    toDOM(view) {
      let ph = placeholder(this.code);
      let desc = view.state.phrase("Control character") + " " + (Names[this.code] || "0x" + this.code.toString(16));
      let custom = this.options.render && this.options.render(this.code, desc, ph);
      if (custom)
        return custom;
      let span = document.createElement("span");
      span.textContent = ph;
      span.title = desc;
      span.setAttribute("aria-label", desc);
      span.className = "cm-specialChar";
      return span;
    }
    ignoreEvent() {
      return false;
    }
  };
  var TabWidget = class extends WidgetType {
    constructor(width) {
      super();
      this.width = width;
    }
    eq(other) {
      return other.width == this.width;
    }
    toDOM() {
      let span = document.createElement("span");
      span.textContent = "	";
      span.className = "cm-tab";
      span.style.width = this.width + "px";
      return span;
    }
    ignoreEvent() {
      return false;
    }
  };

  // ../view/src/active-line.ts
  function highlightActiveLine() {
    return activeLineHighlighter;
  }
  var lineDeco = Decoration.line({attributes: {class: "cm-activeLine"}});
  var activeLineHighlighter = ViewPlugin.fromClass(class {
    constructor(view) {
      this.decorations = this.getDeco(view);
    }
    update(update) {
      if (update.docChanged || update.selectionSet)
        this.decorations = this.getDeco(update.view);
    }
    getDeco(view) {
      let lastLineStart = -1, deco = [];
      for (let r of view.state.selection.ranges) {
        if (!r.empty)
          return Decoration.none;
        let line = view.visualLineAt(r.head);
        if (line.from > lastLineStart) {
          deco.push(lineDeco.range(line.from));
          lastLineStart = line.from;
        }
      }
      return Decoration.set(deco);
    }
  }, {
    decorations: (v) => v.decorations
  });

  // ../node_modules/lezer-tree/dist/tree.es.js
  var DefaultBufferLength = 1024;
  var nextPropID = 0;
  var CachedNode = new WeakMap();
  var NodeProp = class {
    constructor({deserialize} = {}) {
      this.id = nextPropID++;
      this.deserialize = deserialize || (() => {
        throw new Error("This node type doesn't define a deserialize function");
      });
    }
    static string() {
      return new NodeProp({deserialize: (str) => str});
    }
    static number() {
      return new NodeProp({deserialize: Number});
    }
    static flag() {
      return new NodeProp({deserialize: () => true});
    }
    set(propObj, value) {
      propObj[this.id] = value;
      return propObj;
    }
    add(match) {
      if (typeof match != "function")
        match = NodeType.match(match);
      return (type) => {
        let result = match(type);
        return result === void 0 ? null : [this, result];
      };
    }
  };
  NodeProp.closedBy = new NodeProp({deserialize: (str) => str.split(" ")});
  NodeProp.openedBy = new NodeProp({deserialize: (str) => str.split(" ")});
  NodeProp.group = new NodeProp({deserialize: (str) => str.split(" ")});
  var noProps = Object.create(null);
  var NodeType = class {
    constructor(name2, props, id, flags = 0) {
      this.name = name2;
      this.props = props;
      this.id = id;
      this.flags = flags;
    }
    static define(spec) {
      let props = spec.props && spec.props.length ? Object.create(null) : noProps;
      let flags = (spec.top ? 1 : 0) | (spec.skipped ? 2 : 0) | (spec.error ? 4 : 0) | (spec.name == null ? 8 : 0);
      let type = new NodeType(spec.name || "", props, spec.id, flags);
      if (spec.props)
        for (let src of spec.props) {
          if (!Array.isArray(src))
            src = src(type);
          if (src)
            src[0].set(props, src[1]);
        }
      return type;
    }
    prop(prop) {
      return this.props[prop.id];
    }
    get isTop() {
      return (this.flags & 1) > 0;
    }
    get isSkipped() {
      return (this.flags & 2) > 0;
    }
    get isError() {
      return (this.flags & 4) > 0;
    }
    get isAnonymous() {
      return (this.flags & 8) > 0;
    }
    is(name2) {
      if (typeof name2 == "string") {
        if (this.name == name2)
          return true;
        let group = this.prop(NodeProp.group);
        return group ? group.indexOf(name2) > -1 : false;
      }
      return this.id == name2;
    }
    static match(map) {
      let direct = Object.create(null);
      for (let prop in map)
        for (let name2 of prop.split(" "))
          direct[name2] = map[prop];
      return (node) => {
        for (let groups = node.prop(NodeProp.group), i = -1; i < (groups ? groups.length : 0); i++) {
          let found = direct[i < 0 ? node.name : groups[i]];
          if (found)
            return found;
        }
      };
    }
  };
  NodeType.none = new NodeType("", Object.create(null), 0, 8);
  var NodeSet = class {
    constructor(types2) {
      this.types = types2;
      for (let i = 0; i < types2.length; i++)
        if (types2[i].id != i)
          throw new RangeError("Node type ids should correspond to array positions when creating a node set");
    }
    extend(...props) {
      let newTypes = [];
      for (let type of this.types) {
        let newProps = null;
        for (let source of props) {
          let add2 = source(type);
          if (add2) {
            if (!newProps)
              newProps = Object.assign({}, type.props);
            add2[0].set(newProps, add2[1]);
          }
        }
        newTypes.push(newProps ? new NodeType(type.name, newProps, type.id, type.flags) : type);
      }
      return new NodeSet(newTypes);
    }
  };
  var Tree2 = class {
    constructor(type, children, positions, length) {
      this.type = type;
      this.children = children;
      this.positions = positions;
      this.length = length;
    }
    toString() {
      let children = this.children.map((c) => c.toString()).join();
      return !this.type.name ? children : (/\W/.test(this.type.name) && !this.type.isError ? JSON.stringify(this.type.name) : this.type.name) + (children.length ? "(" + children + ")" : "");
    }
    cursor(pos, side = 0) {
      let scope = pos != null && CachedNode.get(this) || this.topNode;
      let cursor = new TreeCursor(scope);
      if (pos != null) {
        cursor.moveTo(pos, side);
        CachedNode.set(this, cursor._tree);
      }
      return cursor;
    }
    fullCursor() {
      return new TreeCursor(this.topNode, true);
    }
    get topNode() {
      return new TreeNode(this, 0, 0, null);
    }
    resolve(pos, side = 0) {
      return this.cursor(pos, side).node;
    }
    iterate(spec) {
      let {enter, leave, from = 0, to = this.length} = spec;
      for (let c = this.cursor(); ; ) {
        let mustLeave = false;
        if (c.from <= to && c.to >= from && (c.type.isAnonymous || enter(c.type, c.from, c.to) !== false)) {
          if (c.firstChild())
            continue;
          if (!c.type.isAnonymous)
            mustLeave = true;
        }
        for (; ; ) {
          if (mustLeave && leave)
            leave(c.type, c.from, c.to);
          mustLeave = c.type.isAnonymous;
          if (c.nextSibling())
            break;
          if (!c.parent())
            return;
          mustLeave = true;
        }
      }
    }
    balance(maxBufferLength = DefaultBufferLength) {
      return this.children.length <= BalanceBranchFactor ? this : balanceRange(this.type, NodeType.none, this.children, this.positions, 0, this.children.length, 0, maxBufferLength, this.length, 0);
    }
    static build(data) {
      return buildTree(data);
    }
  };
  Tree2.empty = new Tree2(NodeType.none, [], [], 0);
  function withHash(tree, hash) {
    if (hash)
      tree.contextHash = hash;
    return tree;
  }
  var TreeBuffer = class {
    constructor(buffer, length, set, type = NodeType.none) {
      this.buffer = buffer;
      this.length = length;
      this.set = set;
      this.type = type;
    }
    toString() {
      let result = [];
      for (let index = 0; index < this.buffer.length; ) {
        result.push(this.childString(index));
        index = this.buffer[index + 3];
      }
      return result.join(",");
    }
    childString(index) {
      let id = this.buffer[index], endIndex = this.buffer[index + 3];
      let type = this.set.types[id], result = type.name;
      if (/\W/.test(result) && !type.isError)
        result = JSON.stringify(result);
      index += 4;
      if (endIndex == index)
        return result;
      let children = [];
      while (index < endIndex) {
        children.push(this.childString(index));
        index = this.buffer[index + 3];
      }
      return result + "(" + children.join(",") + ")";
    }
    findChild(startIndex, endIndex, dir, after) {
      let {buffer} = this, pick = -1;
      for (let i = startIndex; i != endIndex; i = buffer[i + 3]) {
        if (after != -1e8) {
          let start = buffer[i + 1], end = buffer[i + 2];
          if (dir > 0) {
            if (end > after)
              pick = i;
            if (end > after)
              break;
          } else {
            if (start < after)
              pick = i;
            if (end >= after)
              break;
          }
        } else {
          pick = i;
          if (dir > 0)
            break;
        }
      }
      return pick;
    }
  };
  var TreeNode = class {
    constructor(node, from, index, _parent) {
      this.node = node;
      this.from = from;
      this.index = index;
      this._parent = _parent;
    }
    get type() {
      return this.node.type;
    }
    get name() {
      return this.node.type.name;
    }
    get to() {
      return this.from + this.node.length;
    }
    nextChild(i, dir, after, full = false) {
      for (let parent = this; ; ) {
        for (let {children, positions} = parent.node, e = dir > 0 ? children.length : -1; i != e; i += dir) {
          let next = children[i], start = positions[i] + parent.from;
          if (after != -1e8 && (dir < 0 ? start >= after : start + next.length <= after))
            continue;
          if (next instanceof TreeBuffer) {
            let index = next.findChild(0, next.buffer.length, dir, after == -1e8 ? -1e8 : after - start);
            if (index > -1)
              return new BufferNode(new BufferContext(parent, next, i, start), null, index);
          } else if (full || (!next.type.isAnonymous || hasChild(next))) {
            let inner = new TreeNode(next, start, i, parent);
            return full || !inner.type.isAnonymous ? inner : inner.nextChild(dir < 0 ? next.children.length - 1 : 0, dir, after);
          }
        }
        if (full || !parent.type.isAnonymous)
          return null;
        i = parent.index + dir;
        parent = parent._parent;
        if (!parent)
          return null;
      }
    }
    get firstChild() {
      return this.nextChild(0, 1, -1e8);
    }
    get lastChild() {
      return this.nextChild(this.node.children.length - 1, -1, -1e8);
    }
    childAfter(pos) {
      return this.nextChild(0, 1, pos);
    }
    childBefore(pos) {
      return this.nextChild(this.node.children.length - 1, -1, pos);
    }
    nextSignificantParent() {
      let val = this;
      while (val.type.isAnonymous && val._parent)
        val = val._parent;
      return val;
    }
    get parent() {
      return this._parent ? this._parent.nextSignificantParent() : null;
    }
    get nextSibling() {
      return this._parent ? this._parent.nextChild(this.index + 1, 1, -1) : null;
    }
    get prevSibling() {
      return this._parent ? this._parent.nextChild(this.index - 1, -1, -1) : null;
    }
    get cursor() {
      return new TreeCursor(this);
    }
    resolve(pos, side = 0) {
      return this.cursor.moveTo(pos, side).node;
    }
    getChild(type, before = null, after = null) {
      let r = getChildren(this, type, before, after);
      return r.length ? r[0] : null;
    }
    getChildren(type, before = null, after = null) {
      return getChildren(this, type, before, after);
    }
    toString() {
      return this.node.toString();
    }
  };
  function getChildren(node, type, before, after) {
    let cur2 = node.cursor, result = [];
    if (!cur2.firstChild())
      return result;
    if (before != null) {
      while (!cur2.type.is(before))
        if (!cur2.nextSibling())
          return result;
    }
    for (; ; ) {
      if (after != null && cur2.type.is(after))
        return result;
      if (cur2.type.is(type))
        result.push(cur2.node);
      if (!cur2.nextSibling())
        return after == null ? result : [];
    }
  }
  var BufferContext = class {
    constructor(parent, buffer, index, start) {
      this.parent = parent;
      this.buffer = buffer;
      this.index = index;
      this.start = start;
    }
  };
  var BufferNode = class {
    constructor(context, _parent, index) {
      this.context = context;
      this._parent = _parent;
      this.index = index;
      this.type = context.buffer.set.types[context.buffer.buffer[index]];
    }
    get name() {
      return this.type.name;
    }
    get from() {
      return this.context.start + this.context.buffer.buffer[this.index + 1];
    }
    get to() {
      return this.context.start + this.context.buffer.buffer[this.index + 2];
    }
    child(dir, after) {
      let {buffer} = this.context;
      let index = buffer.findChild(this.index + 4, buffer.buffer[this.index + 3], dir, after == -1e8 ? -1e8 : after - this.context.start);
      return index < 0 ? null : new BufferNode(this.context, this, index);
    }
    get firstChild() {
      return this.child(1, -1e8);
    }
    get lastChild() {
      return this.child(-1, -1e8);
    }
    childAfter(pos) {
      return this.child(1, pos);
    }
    childBefore(pos) {
      return this.child(-1, pos);
    }
    get parent() {
      return this._parent || this.context.parent.nextSignificantParent();
    }
    externalSibling(dir) {
      return this._parent ? null : this.context.parent.nextChild(this.context.index + dir, dir, -1);
    }
    get nextSibling() {
      let {buffer} = this.context;
      let after = buffer.buffer[this.index + 3];
      if (after < (this._parent ? buffer.buffer[this._parent.index + 3] : buffer.buffer.length))
        return new BufferNode(this.context, this._parent, after);
      return this.externalSibling(1);
    }
    get prevSibling() {
      let {buffer} = this.context;
      let parentStart = this._parent ? this._parent.index + 4 : 0;
      if (this.index == parentStart)
        return this.externalSibling(-1);
      return new BufferNode(this.context, this._parent, buffer.findChild(parentStart, this.index, -1, -1e8));
    }
    get cursor() {
      return new TreeCursor(this);
    }
    resolve(pos, side = 0) {
      return this.cursor.moveTo(pos, side).node;
    }
    toString() {
      return this.context.buffer.childString(this.index);
    }
    getChild(type, before = null, after = null) {
      let r = getChildren(this, type, before, after);
      return r.length ? r[0] : null;
    }
    getChildren(type, before = null, after = null) {
      return getChildren(this, type, before, after);
    }
  };
  var TreeCursor = class {
    constructor(node, full = false) {
      this.full = full;
      this.buffer = null;
      this.stack = [];
      this.index = 0;
      this.bufferNode = null;
      if (node instanceof TreeNode) {
        this.yieldNode(node);
      } else {
        this._tree = node.context.parent;
        this.buffer = node.context;
        for (let n = node._parent; n; n = n._parent)
          this.stack.unshift(n.index);
        this.bufferNode = node;
        this.yieldBuf(node.index);
      }
    }
    get name() {
      return this.type.name;
    }
    yieldNode(node) {
      if (!node)
        return false;
      this._tree = node;
      this.type = node.type;
      this.from = node.from;
      this.to = node.to;
      return true;
    }
    yieldBuf(index, type) {
      this.index = index;
      let {start, buffer} = this.buffer;
      this.type = type || buffer.set.types[buffer.buffer[index]];
      this.from = start + buffer.buffer[index + 1];
      this.to = start + buffer.buffer[index + 2];
      return true;
    }
    yield(node) {
      if (!node)
        return false;
      if (node instanceof TreeNode) {
        this.buffer = null;
        return this.yieldNode(node);
      }
      this.buffer = node.context;
      return this.yieldBuf(node.index, node.type);
    }
    toString() {
      return this.buffer ? this.buffer.buffer.childString(this.index) : this._tree.toString();
    }
    enter(dir, after) {
      if (!this.buffer)
        return this.yield(this._tree.nextChild(dir < 0 ? this._tree.node.children.length - 1 : 0, dir, after, this.full));
      let {buffer} = this.buffer;
      let index = buffer.findChild(this.index + 4, buffer.buffer[this.index + 3], dir, after == -1e8 ? -1e8 : after - this.buffer.start);
      if (index < 0)
        return false;
      this.stack.push(this.index);
      return this.yieldBuf(index);
    }
    firstChild() {
      return this.enter(1, -1e8);
    }
    lastChild() {
      return this.enter(-1, -1e8);
    }
    childAfter(pos) {
      return this.enter(1, pos);
    }
    childBefore(pos) {
      return this.enter(-1, pos);
    }
    parent() {
      if (!this.buffer)
        return this.yieldNode(this.full ? this._tree._parent : this._tree.parent);
      if (this.stack.length)
        return this.yieldBuf(this.stack.pop());
      let parent = this.full ? this.buffer.parent : this.buffer.parent.nextSignificantParent();
      this.buffer = null;
      return this.yieldNode(parent);
    }
    sibling(dir) {
      if (!this.buffer)
        return !this._tree._parent ? false : this.yield(this._tree._parent.nextChild(this._tree.index + dir, dir, -1e8, this.full));
      let {buffer} = this.buffer, d = this.stack.length - 1;
      if (dir < 0) {
        let parentStart = d < 0 ? 0 : this.stack[d] + 4;
        if (this.index != parentStart)
          return this.yieldBuf(buffer.findChild(parentStart, this.index, -1, -1e8));
      } else {
        let after = buffer.buffer[this.index + 3];
        if (after < (d < 0 ? buffer.buffer.length : buffer.buffer[this.stack[d] + 3]))
          return this.yieldBuf(after);
      }
      return d < 0 ? this.yield(this.buffer.parent.nextChild(this.buffer.index + dir, dir, -1e8, this.full)) : false;
    }
    nextSibling() {
      return this.sibling(1);
    }
    prevSibling() {
      return this.sibling(-1);
    }
    atLastNode(dir) {
      let index, parent, {buffer} = this;
      if (buffer) {
        if (dir > 0) {
          if (this.index < buffer.buffer.buffer.length)
            return false;
        } else {
          for (let i = 0; i < this.index; i++)
            if (buffer.buffer.buffer[i + 3] < this.index)
              return false;
        }
        ({index, parent} = buffer);
      } else {
        ({index, _parent: parent} = this._tree);
      }
      for (; parent; {index, _parent: parent} = parent) {
        for (let i = index + dir, e = dir < 0 ? -1 : parent.node.children.length; i != e; i += dir) {
          let child = parent.node.children[i];
          if (this.full || !child.type.isAnonymous || child instanceof TreeBuffer || hasChild(child))
            return false;
        }
      }
      return true;
    }
    move(dir) {
      if (this.enter(dir, -1e8))
        return true;
      for (; ; ) {
        if (this.sibling(dir))
          return true;
        if (this.atLastNode(dir) || !this.parent())
          return false;
      }
    }
    next() {
      return this.move(1);
    }
    prev() {
      return this.move(-1);
    }
    moveTo(pos, side = 0) {
      while (this.from == this.to || (side < 1 ? this.from >= pos : this.from > pos) || (side > -1 ? this.to <= pos : this.to < pos))
        if (!this.parent())
          break;
      for (; ; ) {
        if (side < 0 ? !this.childBefore(pos) : !this.childAfter(pos))
          break;
        if (this.from == this.to || (side < 1 ? this.from >= pos : this.from > pos) || (side > -1 ? this.to <= pos : this.to < pos)) {
          this.parent();
          break;
        }
      }
      return this;
    }
    get node() {
      if (!this.buffer)
        return this._tree;
      let cache = this.bufferNode, result = null, depth2 = 0;
      if (cache && cache.context == this.buffer) {
        scan:
          for (let index = this.index, d = this.stack.length; d >= 0; ) {
            for (let c = cache; c; c = c._parent)
              if (c.index == index) {
                if (index == this.index)
                  return c;
                result = c;
                depth2 = d + 1;
                break scan;
              }
            index = this.stack[--d];
          }
      }
      for (let i = depth2; i < this.stack.length; i++)
        result = new BufferNode(this.buffer, result, this.stack[i]);
      return this.bufferNode = new BufferNode(this.buffer, result, this.index);
    }
    get tree() {
      return this.buffer ? null : this._tree.node;
    }
  };
  function hasChild(tree) {
    return tree.children.some((ch) => !ch.type.isAnonymous || ch instanceof TreeBuffer || hasChild(ch));
  }
  var FlatBufferCursor = class {
    constructor(buffer, index) {
      this.buffer = buffer;
      this.index = index;
    }
    get id() {
      return this.buffer[this.index - 4];
    }
    get start() {
      return this.buffer[this.index - 3];
    }
    get end() {
      return this.buffer[this.index - 2];
    }
    get size() {
      return this.buffer[this.index - 1];
    }
    get pos() {
      return this.index;
    }
    next() {
      this.index -= 4;
    }
    fork() {
      return new FlatBufferCursor(this.buffer, this.index);
    }
  };
  var BalanceBranchFactor = 8;
  function buildTree(data) {
    var _a;
    let {buffer, nodeSet, topID = 0, maxBufferLength = DefaultBufferLength, reused = [], minRepeatType = nodeSet.types.length} = data;
    let cursor = Array.isArray(buffer) ? new FlatBufferCursor(buffer, buffer.length) : buffer;
    let types2 = nodeSet.types;
    let contextHash = 0;
    function takeNode(parentStart, minPos, children2, positions2, inRepeat) {
      let {id, start, end, size} = cursor;
      let startPos = start - parentStart;
      if (size < 0) {
        if (size == -1) {
          children2.push(reused[id]);
          positions2.push(startPos);
        } else {
          contextHash = id;
        }
        cursor.next();
        return;
      }
      let type = types2[id], node, buffer2;
      if (end - start <= maxBufferLength && (buffer2 = findBufferSize(cursor.pos - minPos, inRepeat))) {
        let data2 = new Uint16Array(buffer2.size - buffer2.skip);
        let endPos = cursor.pos - buffer2.size, index = data2.length;
        while (cursor.pos > endPos)
          index = copyToBuffer(buffer2.start, data2, index, inRepeat);
        node = new TreeBuffer(data2, end - buffer2.start, nodeSet, inRepeat < 0 ? NodeType.none : types2[inRepeat]);
        startPos = buffer2.start - parentStart;
      } else {
        let endPos = cursor.pos - size;
        cursor.next();
        let localChildren = [], localPositions = [];
        let localInRepeat = id >= minRepeatType ? id : -1;
        while (cursor.pos > endPos) {
          if (cursor.id == localInRepeat)
            cursor.next();
          else
            takeNode(start, endPos, localChildren, localPositions, localInRepeat);
        }
        localChildren.reverse();
        localPositions.reverse();
        if (localInRepeat > -1 && localChildren.length > BalanceBranchFactor)
          node = balanceRange(type, type, localChildren, localPositions, 0, localChildren.length, 0, maxBufferLength, end - start, contextHash);
        else
          node = withHash(new Tree2(type, localChildren, localPositions, end - start), contextHash);
      }
      children2.push(node);
      positions2.push(startPos);
    }
    function findBufferSize(maxSize, inRepeat) {
      let fork = cursor.fork();
      let size = 0, start = 0, skip = 0, minStart = fork.end - maxBufferLength;
      let result = {size: 0, start: 0, skip: 0};
      scan:
        for (let minPos = fork.pos - maxSize; fork.pos > minPos; ) {
          if (fork.id == inRepeat) {
            result.size = size;
            result.start = start;
            result.skip = skip;
            skip += 4;
            size += 4;
            fork.next();
            continue;
          }
          let nodeSize = fork.size, startPos = fork.pos - nodeSize;
          if (nodeSize < 0 || startPos < minPos || fork.start < minStart)
            break;
          let localSkipped = fork.id >= minRepeatType ? 4 : 0;
          let nodeStart2 = fork.start;
          fork.next();
          while (fork.pos > startPos) {
            if (fork.size < 0)
              break scan;
            if (fork.id >= minRepeatType)
              localSkipped += 4;
            fork.next();
          }
          start = nodeStart2;
          size += nodeSize;
          skip += localSkipped;
        }
      if (inRepeat < 0 || size == maxSize) {
        result.size = size;
        result.start = start;
        result.skip = skip;
      }
      return result.size > 4 ? result : void 0;
    }
    function copyToBuffer(bufferStart, buffer2, index, inRepeat) {
      let {id, start, end, size} = cursor;
      cursor.next();
      if (id == inRepeat)
        return index;
      let startIndex = index;
      if (size > 4) {
        let endPos = cursor.pos - (size - 4);
        while (cursor.pos > endPos)
          index = copyToBuffer(bufferStart, buffer2, index, inRepeat);
      }
      if (id < minRepeatType) {
        buffer2[--index] = startIndex;
        buffer2[--index] = end - bufferStart;
        buffer2[--index] = start - bufferStart;
        buffer2[--index] = id;
      }
      return index;
    }
    let children = [], positions = [];
    while (cursor.pos > 0)
      takeNode(data.start || 0, 0, children, positions, -1);
    let length = (_a = data.length) !== null && _a !== void 0 ? _a : children.length ? positions[0] + children[0].length : 0;
    return new Tree2(types2[topID], children.reverse(), positions.reverse(), length);
  }
  function balanceRange(outerType, innerType, children, positions, from, to, start, maxBufferLength, length, contextHash) {
    let localChildren = [], localPositions = [];
    if (length <= maxBufferLength) {
      for (let i = from; i < to; i++) {
        localChildren.push(children[i]);
        localPositions.push(positions[i] - start);
      }
    } else {
      let maxChild = Math.max(maxBufferLength, Math.ceil(length * 1.5 / BalanceBranchFactor));
      for (let i = from; i < to; ) {
        let groupFrom = i, groupStart = positions[i];
        i++;
        for (; i < to; i++) {
          let nextEnd = positions[i] + children[i].length;
          if (nextEnd - groupStart > maxChild)
            break;
        }
        if (i == groupFrom + 1) {
          let only = children[groupFrom];
          if (only instanceof Tree2 && only.type == innerType && only.length > maxChild << 1) {
            for (let j = 0; j < only.children.length; j++) {
              localChildren.push(only.children[j]);
              localPositions.push(only.positions[j] + groupStart - start);
            }
            continue;
          }
          localChildren.push(only);
        } else if (i == groupFrom + 1) {
          localChildren.push(children[groupFrom]);
        } else {
          let inner = balanceRange(innerType, innerType, children, positions, groupFrom, i, groupStart, maxBufferLength, positions[i - 1] + children[i - 1].length - groupStart, contextHash);
          if (innerType != NodeType.none && !containsType(inner.children, innerType))
            inner = withHash(new Tree2(NodeType.none, inner.children, inner.positions, inner.length), contextHash);
          localChildren.push(inner);
        }
        localPositions.push(groupStart - start);
      }
    }
    return withHash(new Tree2(outerType, localChildren, localPositions, length), contextHash);
  }
  function containsType(nodes, type) {
    for (let elt of nodes)
      if (elt.type == type)
        return true;
    return false;
  }
  var TreeFragment = class {
    constructor(from, to, tree, offset, open) {
      this.from = from;
      this.to = to;
      this.tree = tree;
      this.offset = offset;
      this.open = open;
    }
    get openStart() {
      return (this.open & 1) > 0;
    }
    get openEnd() {
      return (this.open & 2) > 0;
    }
    static applyChanges(fragments, changes, minGap = 128) {
      if (!changes.length)
        return fragments;
      let result = [];
      let fI = 1, nextF = fragments.length ? fragments[0] : null;
      let cI = 0, pos = 0, off = 0;
      for (; ; ) {
        let nextC = cI < changes.length ? changes[cI++] : null;
        let nextPos = nextC ? nextC.fromA : 1e9;
        if (nextPos - pos >= minGap)
          while (nextF && nextF.from < nextPos) {
            let cut = nextF;
            if (pos >= cut.from || nextPos <= cut.to || off) {
              let fFrom = Math.max(cut.from, pos) - off, fTo = Math.min(cut.to, nextPos) - off;
              cut = fFrom >= fTo ? null : new TreeFragment(fFrom, fTo, cut.tree, cut.offset + off, (cI > 0 ? 1 : 0) | (nextC ? 2 : 0));
            }
            if (cut)
              result.push(cut);
            if (nextF.to > nextPos)
              break;
            nextF = fI < fragments.length ? fragments[fI++] : null;
          }
        if (!nextC)
          break;
        pos = nextC.toA;
        off = nextC.toA - nextC.toB;
      }
      return result;
    }
    static addTree(tree, fragments = [], partial = false) {
      let result = [new TreeFragment(0, tree.length, tree, 0, partial ? 2 : 0)];
      for (let f of fragments)
        if (f.to > tree.length)
          result.push(f);
      return result;
    }
  };
  function stringInput(input) {
    return new StringInput(input);
  }
  var StringInput = class {
    constructor(string2, length = string2.length) {
      this.string = string2;
      this.length = length;
    }
    get(pos) {
      return pos < 0 || pos >= this.length ? -1 : this.string.charCodeAt(pos);
    }
    lineAfter(pos) {
      if (pos < 0)
        return "";
      let end = this.string.indexOf("\n", pos);
      return this.string.slice(pos, end < 0 ? this.length : Math.min(end, this.length));
    }
    read(from, to) {
      return this.string.slice(from, Math.min(this.length, to));
    }
    clip(at) {
      return new StringInput(this.string, at);
    }
  };

  // ../language/src/language.ts
  var languageDataProp = new NodeProp();
  function defineLanguageFacet(baseData) {
    return Facet.define({
      combine: baseData ? (values) => values.concat(baseData) : void 0
    });
  }
  var Language = class {
    constructor(data, parser2, topNode, extraExtensions = []) {
      this.data = data;
      this.topNode = topNode;
      if (!EditorState.prototype.hasOwnProperty("tree"))
        Object.defineProperty(EditorState.prototype, "tree", {get() {
          return syntaxTree(this);
        }});
      this.parser = parser2;
      this.extension = [
        language.of(this),
        EditorState.languageData.of((state, pos) => state.facet(languageDataFacetAt(state, pos)))
      ].concat(extraExtensions);
    }
    isActiveAt(state, pos) {
      return languageDataFacetAt(state, pos) == this.data;
    }
    findRegions(state) {
      let lang = state.facet(language);
      if (lang?.data == this.data)
        return [{from: 0, to: state.doc.length}];
      if (!lang || !lang.allowsNesting)
        return [];
      let result = [];
      syntaxTree(state).iterate({
        enter: (type, from, to) => {
          if (type.isTop && type.prop(languageDataProp) == this.data) {
            result.push({from, to});
            return false;
          }
          return void 0;
        }
      });
      return result;
    }
    get allowsNesting() {
      return true;
    }
    parseString(code) {
      let doc2 = Text.of(code.split("\n"));
      let parse = this.parser.startParse(new DocInput(doc2), 0, new EditorParseContext(this.parser, EditorState.create({doc: doc2}), [], Tree2.empty, {from: 0, to: code.length}, [], null));
      let tree;
      while (!(tree = parse.advance())) {
      }
      return tree;
    }
  };
  Language.setState = StateEffect.define();
  function languageDataFacetAt(state, pos) {
    let topLang = state.facet(language);
    if (!topLang)
      return null;
    if (!topLang.allowsNesting)
      return topLang.data;
    let tree = syntaxTree(state);
    let target = tree.resolve(pos, -1);
    while (target) {
      let facet = target.type.prop(languageDataProp);
      if (facet)
        return facet;
      target = target.parent;
    }
    return topLang.data;
  }
  var LezerLanguage = class extends Language {
    constructor(data, parser2) {
      super(data, parser2, parser2.topNode);
      this.parser = parser2;
    }
    static define(spec) {
      let data = defineLanguageFacet(spec.languageData);
      return new LezerLanguage(data, spec.parser.configure({
        props: [languageDataProp.add((type) => type.isTop ? data : void 0)]
      }));
    }
    configure(options) {
      return new LezerLanguage(this.data, this.parser.configure(options));
    }
    get allowsNesting() {
      return this.parser.hasNested;
    }
  };
  function syntaxTree(state) {
    let field = state.field(Language.state, false);
    return field ? field.tree : Tree2.empty;
  }
  var DocInput = class {
    constructor(doc2, length = doc2.length) {
      this.doc = doc2;
      this.length = length;
      this.cursorPos = 0;
      this.string = "";
      this.prevString = "";
      this.cursor = doc2.iter();
    }
    syncTo(pos) {
      if (pos < this.cursorPos) {
        this.cursor = this.doc.iter();
        this.cursorPos = 0;
      }
      this.prevString = pos == this.cursorPos ? this.string : "";
      this.string = this.cursor.next(pos - this.cursorPos).value;
      this.cursorPos = pos + this.string.length;
      return this.cursorPos - this.string.length;
    }
    get(pos) {
      if (pos >= this.length)
        return -1;
      let stringStart = this.cursorPos - this.string.length;
      if (pos < stringStart || pos >= this.cursorPos) {
        if (pos < stringStart && pos >= stringStart - this.prevString.length)
          return this.prevString.charCodeAt(pos - (stringStart - this.prevString.length));
        stringStart = this.syncTo(pos);
      }
      return this.string.charCodeAt(pos - stringStart);
    }
    lineAfter(pos) {
      if (pos >= this.length || pos < 0)
        return "";
      let stringStart = this.cursorPos - this.string.length;
      if (pos < stringStart || pos >= this.cursorPos)
        stringStart = this.syncTo(pos);
      return this.cursor.lineBreak ? "" : this.string.slice(pos - stringStart, Math.min(this.length - stringStart, this.string.length));
    }
    read(from, to) {
      let stringStart = this.cursorPos - this.string.length;
      if (from < stringStart || to >= this.cursorPos)
        return this.doc.sliceString(from, to);
      else
        return this.string.slice(from - stringStart, to - stringStart);
    }
    clip(at) {
      return new DocInput(this.doc, at);
    }
  };
  var Work;
  (function(Work2) {
    Work2[Work2["Apply"] = 25] = "Apply";
    Work2[Work2["MinSlice"] = 25] = "MinSlice";
    Work2[Work2["Slice"] = 100] = "Slice";
    Work2[Work2["Pause"] = 500] = "Pause";
    Work2[Work2["ChunkBudget"] = 3e3] = "ChunkBudget";
    Work2[Work2["ChunkTime"] = 3e4] = "ChunkTime";
    Work2[Work2["ChangeBonus"] = 50] = "ChangeBonus";
    Work2[Work2["MaxParseAhead"] = 1e6] = "MaxParseAhead";
  })(Work || (Work = {}));
  var _EditorParseContext = class {
    constructor(parser2, state, fragments = [], tree, viewport, skipped, scheduleOn) {
      this.parser = parser2;
      this.state = state;
      this.fragments = fragments;
      this.tree = tree;
      this.viewport = viewport;
      this.skipped = skipped;
      this.scheduleOn = scheduleOn;
      this.parse = null;
      this.tempSkipped = [];
    }
    work(time, upto) {
      if (this.tree != Tree2.empty && (upto == null ? this.tree.length == this.state.doc.length : this.tree.length >= upto)) {
        this.takeTree();
        return true;
      }
      if (!this.parse)
        this.parse = this.parser.startParse(new DocInput(this.state.doc), 0, this);
      let endTime = Date.now() + time;
      for (; ; ) {
        let done = this.parse.advance();
        if (done) {
          this.fragments = this.withoutTempSkipped(TreeFragment.addTree(done));
          this.parse = null;
          this.tree = done;
          return true;
        } else if (upto != null && this.parse.pos >= upto) {
          this.takeTree();
          return true;
        }
        if (Date.now() > endTime)
          return false;
      }
    }
    takeTree() {
      if (this.parse && this.parse.pos > this.tree.length) {
        this.tree = this.parse.forceFinish();
        this.fragments = this.withoutTempSkipped(TreeFragment.addTree(this.tree, this.fragments, true));
      }
    }
    withoutTempSkipped(fragments) {
      for (let r; r = this.tempSkipped.pop(); )
        fragments = cutFragments(fragments, r.from, r.to);
      return fragments;
    }
    changes(changes, newState) {
      let {fragments, tree, viewport, skipped} = this;
      this.takeTree();
      if (!changes.empty) {
        let ranges = [];
        changes.iterChangedRanges((fromA, toA, fromB, toB) => ranges.push({fromA, toA, fromB, toB}));
        fragments = TreeFragment.applyChanges(fragments, ranges);
        tree = Tree2.empty;
        viewport = {from: changes.mapPos(viewport.from, -1), to: changes.mapPos(viewport.to, 1)};
        if (this.skipped.length) {
          skipped = [];
          for (let r of this.skipped) {
            let from = changes.mapPos(r.from, 1), to = changes.mapPos(r.to, -1);
            if (from < to)
              skipped.push({from, to});
          }
        }
      }
      return new _EditorParseContext(this.parser, newState, fragments, tree, viewport, skipped, this.scheduleOn);
    }
    updateViewport(viewport) {
      this.viewport = viewport;
      let startLen = this.skipped.length;
      for (let i = 0; i < this.skipped.length; i++) {
        let {from, to} = this.skipped[i];
        if (from < viewport.to && to > viewport.from) {
          this.fragments = cutFragments(this.fragments, from, to);
          this.skipped.splice(i--, 1);
        }
      }
      return this.skipped.length < startLen;
    }
    reset() {
      if (this.parse) {
        this.takeTree();
        this.parse = null;
      }
    }
    skipUntilInView(from, to) {
      this.skipped.push({from, to});
    }
    static getSkippingParser(until) {
      return {
        startParse(input, startPos, context) {
          return {
            pos: startPos,
            advance() {
              let ecx = context;
              ecx.tempSkipped.push({from: startPos, to: input.length});
              if (until)
                ecx.scheduleOn = ecx.scheduleOn ? Promise.all([ecx.scheduleOn, until]) : until;
              this.pos = input.length;
              return new Tree2(NodeType.none, [], [], input.length - startPos);
            },
            forceFinish() {
              return this.advance();
            }
          };
        }
      };
    }
    movedPast(pos) {
      return this.tree.length < pos && this.parse && this.parse.pos >= pos;
    }
  };
  var EditorParseContext = _EditorParseContext;
  EditorParseContext.skippingParser = _EditorParseContext.getSkippingParser();
  function cutFragments(fragments, from, to) {
    return TreeFragment.applyChanges(fragments, [{fromA: from, toA: to, fromB: from, toB: to}]);
  }
  var LanguageState = class {
    constructor(context) {
      this.context = context;
      this.tree = context.tree;
    }
    apply(tr) {
      if (!tr.docChanged)
        return this;
      let newCx = this.context.changes(tr.changes, tr.state);
      let upto = this.context.tree.length == tr.startState.doc.length ? void 0 : Math.max(tr.changes.mapPos(this.context.tree.length), newCx.viewport.to);
      if (!newCx.work(25, upto))
        newCx.takeTree();
      return new LanguageState(newCx);
    }
    static init(state) {
      let parseState = new EditorParseContext(state.facet(language).parser, state, [], Tree2.empty, {from: 0, to: state.doc.length}, [], null);
      if (!parseState.work(25))
        parseState.takeTree();
      return new LanguageState(parseState);
    }
  };
  Language.state = StateField.define({
    create: LanguageState.init,
    update(value, tr) {
      for (let e of tr.effects)
        if (e.is(Language.setState))
          return e.value;
      if (tr.startState.facet(language) != tr.state.facet(language))
        return LanguageState.init(tr.state);
      return value.apply(tr);
    }
  });
  var requestIdle = typeof window != "undefined" && window.requestIdleCallback || ((callback, {timeout}) => setTimeout(callback, timeout));
  var cancelIdle = typeof window != "undefined" && window.cancelIdleCallback || clearTimeout;
  var parseWorker = ViewPlugin.fromClass(class ParseWorker {
    constructor(view) {
      this.view = view;
      this.working = -1;
      this.chunkEnd = -1;
      this.chunkBudget = -1;
      this.work = this.work.bind(this);
      this.scheduleWork();
    }
    update(update) {
      let cx = this.view.state.field(Language.state).context;
      if (update.viewportChanged) {
        if (cx.updateViewport(update.view.viewport))
          cx.reset();
        if (this.view.viewport.to > cx.tree.length)
          this.scheduleWork();
      }
      if (update.docChanged) {
        if (this.view.hasFocus)
          this.chunkBudget += 50;
        this.scheduleWork();
      }
      this.checkAsyncSchedule(cx);
    }
    scheduleWork(force = false) {
      if (this.working > -1)
        return;
      let {state} = this.view, field = state.field(Language.state);
      if (!force && field.tree.length >= state.doc.length)
        return;
      this.working = requestIdle(this.work, {timeout: 500});
    }
    work(deadline) {
      this.working = -1;
      let now = Date.now();
      if (this.chunkEnd < now && (this.chunkEnd < 0 || this.view.hasFocus)) {
        this.chunkEnd = now + 3e4;
        this.chunkBudget = 3e3;
      }
      if (this.chunkBudget <= 0)
        return;
      let {state, viewport: {to: vpTo}} = this.view, field = state.field(Language.state);
      if (field.tree.length >= vpTo + 1e6)
        return;
      let time = Math.min(this.chunkBudget, deadline ? Math.max(25, deadline.timeRemaining()) : 100);
      let done = field.context.work(time, vpTo + 1e6);
      this.chunkBudget -= Date.now() - now;
      if (done || this.chunkBudget <= 0 || field.context.movedPast(vpTo)) {
        field.context.takeTree();
        this.view.dispatch({effects: Language.setState.of(new LanguageState(field.context))});
      }
      if (!done && this.chunkBudget > 0)
        this.scheduleWork();
      this.checkAsyncSchedule(field.context);
    }
    checkAsyncSchedule(cx) {
      if (cx.scheduleOn) {
        cx.scheduleOn.then(() => this.scheduleWork(true));
        cx.scheduleOn = null;
      }
    }
    destroy() {
      if (this.working >= 0)
        cancelIdle(this.working);
    }
  }, {
    eventHandlers: {focus() {
      this.scheduleWork();
    }}
  });
  var language = Facet.define({
    combine(languages) {
      return languages.length ? languages[0] : null;
    },
    enables: [Language.state, parseWorker]
  });
  var LanguageSupport = class {
    constructor(language2, support = []) {
      this.language = language2;
      this.support = support;
      this.extension = [language2, support];
    }
  };

  // ../language/src/indent.ts
  var indentService = Facet.define();
  var indentUnit = Facet.define({
    combine: (values) => {
      if (!values.length)
        return "  ";
      if (!/^(?: +|\t+)$/.test(values[0]))
        throw new Error("Invalid indent unit: " + JSON.stringify(values[0]));
      return values[0];
    }
  });
  function getIndentUnit(state) {
    let unit = state.facet(indentUnit);
    return unit.charCodeAt(0) == 9 ? state.tabSize * unit.length : unit.length;
  }
  function indentString(state, cols) {
    let result = "", ts = state.tabSize;
    if (state.facet(indentUnit).charCodeAt(0) == 9)
      while (cols >= ts) {
        result += "	";
        cols -= ts;
      }
    for (let i = 0; i < cols; i++)
      result += " ";
    return result;
  }
  function getIndentation(context, pos) {
    if (context instanceof EditorState)
      context = new IndentContext(context);
    for (let service of context.state.facet(indentService)) {
      let result = service(context, pos);
      if (result != null)
        return result;
    }
    let tree = syntaxTree(context.state);
    return tree ? syntaxIndentation(context, tree, pos) : null;
  }
  var IndentContext = class {
    constructor(state, options = {}) {
      this.state = state;
      this.options = options;
      this.unit = getIndentUnit(state);
    }
    textAfterPos(pos) {
      let sim = this.options?.simulateBreak;
      if (pos == sim && this.options?.simulateDoubleBreak)
        return "";
      return this.state.sliceDoc(pos, Math.min(pos + 100, sim != null && sim > pos ? sim : 1e9, this.state.doc.lineAt(pos).to));
    }
    column(pos) {
      let line = this.state.doc.lineAt(pos), text = line.text.slice(0, pos - line.from);
      let result = this.countColumn(text, pos - line.from);
      let override = this.options?.overrideIndentation ? this.options.overrideIndentation(line.from) : -1;
      if (override > -1)
        result += override - this.countColumn(text, text.search(/\S/));
      return result;
    }
    countColumn(line, pos) {
      return countColumn(pos < 0 ? line : line.slice(0, pos), 0, this.state.tabSize);
    }
    lineIndent(line) {
      let override = this.options?.overrideIndentation;
      if (override) {
        let overriden = override(line.from);
        if (overriden > -1)
          return overriden;
      }
      return this.countColumn(line.text, line.text.search(/\S/));
    }
  };
  var indentNodeProp = new NodeProp();
  function syntaxIndentation(cx, ast, pos) {
    let tree = ast.resolve(pos);
    for (let scan = tree, scanPos = pos; ; ) {
      let last = scan.childBefore(scanPos);
      if (!last)
        break;
      if (last.type.isError && last.from == last.to) {
        tree = scan;
        scanPos = last.from;
      } else {
        scan = last;
        scanPos = scan.to + 1;
      }
    }
    return indentFrom(tree, pos, cx);
  }
  function ignoreClosed(cx) {
    return cx.pos == cx.options?.simulateBreak && cx.options?.simulateDoubleBreak;
  }
  function indentStrategy(tree) {
    let strategy = tree.type.prop(indentNodeProp);
    if (strategy)
      return strategy;
    let first = tree.firstChild, close;
    if (first && (close = first.type.prop(NodeProp.closedBy))) {
      let last = tree.lastChild, closed = last && close.indexOf(last.name) > -1;
      return (cx) => delimitedStrategy(cx, true, 1, void 0, closed && !ignoreClosed(cx) ? last.from : void 0);
    }
    return tree.parent == null ? topIndent : null;
  }
  function indentFrom(node, pos, base2) {
    for (; node; node = node.parent) {
      let strategy = indentStrategy(node);
      if (strategy)
        return strategy(new TreeIndentContext(base2, pos, node));
    }
    return null;
  }
  function topIndent() {
    return 0;
  }
  var TreeIndentContext = class extends IndentContext {
    constructor(base2, pos, node) {
      super(base2.state, base2.options);
      this.base = base2;
      this.pos = pos;
      this.node = node;
    }
    get textAfter() {
      return this.textAfterPos(this.pos);
    }
    get baseIndent() {
      let line = this.state.doc.lineAt(this.node.from);
      for (; ; ) {
        let atBreak = this.node.resolve(line.from);
        while (atBreak.parent && atBreak.parent.from == atBreak.from)
          atBreak = atBreak.parent;
        if (isParent(atBreak, this.node))
          break;
        line = this.state.doc.lineAt(atBreak.from);
      }
      return this.lineIndent(line);
    }
    continue() {
      let parent = this.node.parent;
      return parent ? indentFrom(parent, this.pos, this.base) : 0;
    }
  };
  function isParent(parent, of) {
    for (let cur2 = of; cur2; cur2 = cur2.parent)
      if (parent == cur2)
        return true;
    return false;
  }
  function bracketedAligned(context) {
    let tree = context.node;
    let openToken = tree.childAfter(tree.from), last = tree.lastChild;
    if (!openToken)
      return null;
    let sim = context.options?.simulateBreak;
    let openLine = context.state.doc.lineAt(openToken.from);
    let lineEnd = sim == null || sim <= openLine.from ? openLine.to : Math.min(openLine.to, sim);
    for (let pos = openToken.to; ; ) {
      let next = tree.childAfter(pos);
      if (!next || next == last)
        return null;
      if (!next.type.isSkipped)
        return next.from < lineEnd ? openToken : null;
      pos = next.to;
    }
  }
  function delimitedIndent({closing: closing2, align = true, units = 1}) {
    return (context) => delimitedStrategy(context, align, units, closing2);
  }
  function delimitedStrategy(context, align, units, closing2, closedAt) {
    let after = context.textAfter, space2 = after.match(/^\s*/)[0].length;
    let closed = closing2 && after.slice(space2, space2 + closing2.length) == closing2 || closedAt == context.pos + space2;
    let aligned = align ? bracketedAligned(context) : null;
    if (aligned)
      return closed ? context.column(aligned.from) : context.column(aligned.to);
    return context.baseIndent + (closed ? 0 : context.unit * units);
  }
  var flatIndent = (context) => context.baseIndent;
  function continuedIndent({except, units = 1} = {}) {
    return (context) => {
      let matchExcept = except && except.test(context.textAfter);
      return context.baseIndent + (matchExcept ? 0 : units * context.unit);
    };
  }
  var DontIndentBeyond = 200;
  function indentOnInput() {
    return EditorState.transactionFilter.of((tr) => {
      if (!tr.docChanged || tr.annotation(Transaction.userEvent) != "input")
        return tr;
      let rules = tr.startState.languageDataAt("indentOnInput", tr.startState.selection.main.head);
      if (!rules.length)
        return tr;
      let doc2 = tr.newDoc, {head} = tr.newSelection.main, line = doc2.lineAt(head);
      if (head > line.from + DontIndentBeyond)
        return tr;
      let lineStart = doc2.sliceString(line.from, head);
      if (!rules.some((r) => r.test(lineStart)))
        return tr;
      let {state} = tr, last = -1, changes = [];
      for (let {head: head2} of state.selection.ranges) {
        let line2 = state.doc.lineAt(head2);
        if (line2.from == last)
          continue;
        last = line2.from;
        let indent = getIndentation(state, line2.from);
        if (indent == null)
          continue;
        let cur2 = /^\s*/.exec(line2.text)[0];
        let norm = indentString(state, indent);
        if (cur2 != norm)
          changes.push({from: line2.from, to: line2.from + cur2.length, insert: norm});
      }
      return changes.length ? [tr, {changes}] : tr;
    });
  }

  // ../language/src/fold.ts
  var foldService = Facet.define();
  var foldNodeProp = new NodeProp();
  function foldInside(node) {
    let first = node.firstChild, last = node.lastChild;
    return first && first.to < last.from ? {from: first.to, to: last.type.isError ? node.to : last.from} : null;
  }
  function syntaxFolding(state, start, end) {
    let tree = syntaxTree(state);
    if (tree.length == 0)
      return null;
    let inner = tree.resolve(end);
    let found = null;
    for (let cur2 = inner; cur2; cur2 = cur2.parent) {
      if (cur2.to <= end || cur2.from > end)
        continue;
      if (found && cur2.from < start)
        break;
      let prop = cur2.type.prop(foldNodeProp);
      if (prop) {
        let value = prop(cur2, state);
        if (value && value.from <= end && value.from >= start && value.to > end)
          found = value;
      }
    }
    return found;
  }
  function foldable(state, lineStart, lineEnd) {
    for (let service of state.facet(foldService)) {
      let result = service(state, lineStart, lineEnd);
      if (result)
        return result;
    }
    return syntaxFolding(state, lineStart, lineEnd);
  }

  // ../matchbrackets/src/matchbrackets.ts
  var baseTheme2 = EditorView.baseTheme({
    ".cm-matchingBracket": {color: "#0b0"},
    ".cm-nonmatchingBracket": {color: "#a22"}
  });
  var DefaultScanDist = 1e4;
  var DefaultBrackets = "()[]{}";
  var bracketMatchingConfig = Facet.define({
    combine(configs) {
      return combineConfig(configs, {
        afterCursor: true,
        brackets: DefaultBrackets,
        maxScanDistance: DefaultScanDist
      });
    }
  });
  var matchingMark = Decoration.mark({class: "cm-matchingBracket"});
  var nonmatchingMark = Decoration.mark({class: "cm-nonmatchingBracket"});
  var bracketMatchingState = StateField.define({
    create() {
      return Decoration.none;
    },
    update(deco, tr) {
      if (!tr.docChanged && !tr.selection)
        return deco;
      let decorations2 = [];
      let config2 = tr.state.facet(bracketMatchingConfig);
      for (let range of tr.state.selection.ranges) {
        if (!range.empty)
          continue;
        let match = matchBrackets(tr.state, range.head, -1, config2) || range.head > 0 && matchBrackets(tr.state, range.head - 1, 1, config2) || config2.afterCursor && (matchBrackets(tr.state, range.head, 1, config2) || range.head < tr.state.doc.length && matchBrackets(tr.state, range.head + 1, -1, config2));
        if (!match)
          continue;
        let mark = match.matched ? matchingMark : nonmatchingMark;
        decorations2.push(mark.range(match.start.from, match.start.to));
        if (match.end)
          decorations2.push(mark.range(match.end.from, match.end.to));
      }
      return Decoration.set(decorations2, true);
    },
    provide: (f) => EditorView.decorations.from(f)
  });
  var bracketMatchingUnique = [
    bracketMatchingState,
    baseTheme2
  ];
  function bracketMatching(config2 = {}) {
    return [bracketMatchingConfig.of(config2), bracketMatchingUnique];
  }
  function matchingNodes(node, dir, brackets) {
    let byProp = node.prop(dir < 0 ? NodeProp.openedBy : NodeProp.closedBy);
    if (byProp)
      return byProp;
    if (node.name.length == 1) {
      let index = brackets.indexOf(node.name);
      if (index > -1 && index % 2 == (dir < 0 ? 1 : 0))
        return [brackets[index + dir]];
    }
    return null;
  }
  function matchBrackets(state, pos, dir, config2 = {}) {
    let maxScanDistance = config2.maxScanDistance || DefaultScanDist, brackets = config2.brackets || DefaultBrackets;
    let tree = syntaxTree(state), sub = tree.resolve(pos, dir), matches;
    if (matches = matchingNodes(sub.type, dir, brackets))
      return matchMarkedBrackets(state, pos, dir, sub, matches, brackets);
    else
      return matchPlainBrackets(state, pos, dir, tree, sub.type, maxScanDistance, brackets);
  }
  function matchMarkedBrackets(_state, _pos, dir, token, matching, brackets) {
    let parent = token.parent, firstToken = {from: token.from, to: token.to};
    let depth2 = 0, cursor = parent?.cursor;
    if (cursor && (dir < 0 ? cursor.childBefore(token.from) : cursor.childAfter(token.to)))
      do {
        if (dir < 0 ? cursor.to <= token.from : cursor.from >= token.to) {
          if (depth2 == 0 && matching.indexOf(cursor.type.name) > -1) {
            return {start: firstToken, end: {from: cursor.from, to: cursor.to}, matched: true};
          } else if (matchingNodes(cursor.type, dir, brackets)) {
            depth2++;
          } else if (matchingNodes(cursor.type, -dir, brackets)) {
            depth2--;
            if (depth2 == 0)
              return {start: firstToken, end: {from: cursor.from, to: cursor.to}, matched: false};
          }
        }
      } while (dir < 0 ? cursor.prevSibling() : cursor.nextSibling());
    return {start: firstToken, matched: false};
  }
  function matchPlainBrackets(state, pos, dir, tree, tokenType, maxScanDistance, brackets) {
    let startCh = dir < 0 ? state.sliceDoc(pos - 1, pos) : state.sliceDoc(pos, pos + 1);
    let bracket2 = brackets.indexOf(startCh);
    if (bracket2 < 0 || bracket2 % 2 == 0 != dir > 0)
      return null;
    let startToken = {from: dir < 0 ? pos - 1 : pos, to: dir > 0 ? pos + 1 : pos};
    let iter = state.doc.iterRange(pos, dir > 0 ? state.doc.length : 0), depth2 = 0;
    for (let distance = 0; !iter.next().done && distance <= maxScanDistance; ) {
      let text = iter.value;
      if (dir < 0)
        distance += text.length;
      let basePos = pos + distance * dir;
      for (let pos2 = dir > 0 ? 0 : text.length - 1, end = dir > 0 ? text.length : -1; pos2 != end; pos2 += dir) {
        let found = brackets.indexOf(text[pos2]);
        if (found < 0 || tree.resolve(basePos + pos2, 1).type != tokenType)
          continue;
        if (found % 2 == 0 == dir > 0) {
          depth2++;
        } else if (depth2 == 1) {
          return {start: startToken, end: {from: basePos + pos2, to: basePos + pos2 + 1}, matched: found >> 1 == bracket2 >> 1};
        } else {
          depth2--;
        }
      }
      if (dir > 0)
        distance += text.length;
    }
    return iter.done ? {start: startToken, matched: false} : null;
  }

  // ../commands/src/commands.ts
  function updateSel(sel, by) {
    return EditorSelection.create(sel.ranges.map(by), sel.mainIndex);
  }
  function setSel(state, selection) {
    return state.update({selection, scrollIntoView: true, annotations: Transaction.userEvent.of("keyboardselection")});
  }
  function moveSel({state, dispatch}, how) {
    let selection = updateSel(state.selection, how);
    if (selection.eq(state.selection))
      return false;
    dispatch(setSel(state, selection));
    return true;
  }
  function rangeEnd(range, forward) {
    return EditorSelection.cursor(forward ? range.to : range.from);
  }
  function cursorByChar(view, forward) {
    return moveSel(view, (range) => range.empty ? view.moveByChar(range, forward) : rangeEnd(range, forward));
  }
  var cursorCharLeft = (view) => cursorByChar(view, view.textDirection != Direction.LTR);
  var cursorCharRight = (view) => cursorByChar(view, view.textDirection == Direction.LTR);
  function cursorByGroup(view, forward) {
    return moveSel(view, (range) => range.empty ? view.moveByGroup(range, forward) : rangeEnd(range, forward));
  }
  var cursorGroupLeft = (view) => cursorByGroup(view, view.textDirection != Direction.LTR);
  var cursorGroupRight = (view) => cursorByGroup(view, view.textDirection == Direction.LTR);
  var cursorGroupForward = (view) => cursorByGroup(view, true);
  var cursorGroupBackward = (view) => cursorByGroup(view, false);
  function interestingNode(state, node, bracketProp) {
    if (node.type.prop(bracketProp))
      return true;
    let len = node.to - node.from;
    return len && (len > 2 || /[^\s,.;:]/.test(state.sliceDoc(node.from, node.to))) || node.firstChild;
  }
  function moveBySyntax(state, start, forward) {
    let pos = syntaxTree(state).resolve(start.head);
    let bracketProp = forward ? NodeProp.closedBy : NodeProp.openedBy;
    for (let at = start.head; ; ) {
      let next = forward ? pos.childAfter(at) : pos.childBefore(at);
      if (!next)
        break;
      if (interestingNode(state, next, bracketProp))
        pos = next;
      else
        at = forward ? next.to : next.from;
    }
    let bracket2 = pos.type.prop(bracketProp), match, newPos;
    if (bracket2 && (match = forward ? matchBrackets(state, pos.from, 1) : matchBrackets(state, pos.to, -1)) && match.matched)
      newPos = forward ? match.end.to : match.end.from;
    else
      newPos = forward ? pos.to : pos.from;
    return EditorSelection.cursor(newPos, forward ? -1 : 1);
  }
  var cursorSyntaxLeft = (view) => moveSel(view, (range) => moveBySyntax(view.state, range, view.textDirection != Direction.LTR));
  var cursorSyntaxRight = (view) => moveSel(view, (range) => moveBySyntax(view.state, range, view.textDirection == Direction.LTR));
  function cursorByLine(view, forward) {
    return moveSel(view, (range) => range.empty ? view.moveVertically(range, forward) : rangeEnd(range, forward));
  }
  var cursorLineUp = (view) => cursorByLine(view, false);
  var cursorLineDown = (view) => cursorByLine(view, true);
  function cursorByPage(view, forward) {
    return moveSel(view, (range) => range.empty ? view.moveVertically(range, forward, view.dom.clientHeight) : rangeEnd(range, forward));
  }
  var cursorPageUp = (view) => cursorByPage(view, false);
  var cursorPageDown = (view) => cursorByPage(view, true);
  function moveByLineBoundary(view, start, forward) {
    let line = view.visualLineAt(start.head), moved = view.moveToLineBoundary(start, forward);
    if (moved.head == start.head && moved.head != (forward ? line.to : line.from))
      moved = view.moveToLineBoundary(start, forward, false);
    if (!forward && moved.head == line.from && line.length) {
      let space2 = /^\s*/.exec(view.state.sliceDoc(line.from, Math.min(line.from + 100, line.to)))[0].length;
      if (space2 && start.head != line.from + space2)
        moved = EditorSelection.cursor(line.from + space2);
    }
    return moved;
  }
  var cursorLineBoundaryForward = (view) => moveSel(view, (range) => moveByLineBoundary(view, range, true));
  var cursorLineBoundaryBackward = (view) => moveSel(view, (range) => moveByLineBoundary(view, range, false));
  var cursorLineStart = (view) => moveSel(view, (range) => EditorSelection.cursor(view.visualLineAt(range.head).from, 1));
  var cursorLineEnd = (view) => moveSel(view, (range) => EditorSelection.cursor(view.visualLineAt(range.head).to, -1));
  function toMatchingBracket(state, dispatch, extend2) {
    let found = false, selection = updateSel(state.selection, (range) => {
      let matching = matchBrackets(state, range.head, -1) || matchBrackets(state, range.head, 1) || range.head > 0 && matchBrackets(state, range.head - 1, 1) || range.head < state.doc.length && matchBrackets(state, range.head + 1, -1);
      if (!matching || !matching.end)
        return range;
      found = true;
      let head = matching.start.from == range.head ? matching.end.to : matching.end.from;
      return extend2 ? EditorSelection.range(range.anchor, head) : EditorSelection.cursor(head);
    });
    if (!found)
      return false;
    dispatch(setSel(state, selection));
    return true;
  }
  var cursorMatchingBracket = ({state, dispatch}) => toMatchingBracket(state, dispatch, false);
  function extendSel(view, how) {
    let selection = updateSel(view.state.selection, (range) => {
      let head = how(range);
      return EditorSelection.range(range.anchor, head.head, head.goalColumn);
    });
    if (selection.eq(view.state.selection))
      return false;
    view.dispatch(setSel(view.state, selection));
    return true;
  }
  function selectByChar(view, forward) {
    return extendSel(view, (range) => view.moveByChar(range, forward));
  }
  var selectCharLeft = (view) => selectByChar(view, view.textDirection != Direction.LTR);
  var selectCharRight = (view) => selectByChar(view, view.textDirection == Direction.LTR);
  function selectByGroup(view, forward) {
    return extendSel(view, (range) => view.moveByGroup(range, forward));
  }
  var selectGroupLeft = (view) => selectByGroup(view, view.textDirection != Direction.LTR);
  var selectGroupRight = (view) => selectByGroup(view, view.textDirection == Direction.LTR);
  var selectGroupForward = (view) => selectByGroup(view, true);
  var selectGroupBackward = (view) => selectByGroup(view, false);
  var selectSyntaxLeft = (view) => extendSel(view, (range) => moveBySyntax(view.state, range, view.textDirection != Direction.LTR));
  var selectSyntaxRight = (view) => extendSel(view, (range) => moveBySyntax(view.state, range, view.textDirection == Direction.LTR));
  function selectByLine(view, forward) {
    return extendSel(view, (range) => view.moveVertically(range, forward));
  }
  var selectLineUp = (view) => selectByLine(view, false);
  var selectLineDown = (view) => selectByLine(view, true);
  function selectByPage(view, forward) {
    return extendSel(view, (range) => view.moveVertically(range, forward, view.dom.clientHeight));
  }
  var selectPageUp = (view) => selectByPage(view, false);
  var selectPageDown = (view) => selectByPage(view, true);
  var selectLineBoundaryForward = (view) => extendSel(view, (range) => moveByLineBoundary(view, range, true));
  var selectLineBoundaryBackward = (view) => extendSel(view, (range) => moveByLineBoundary(view, range, false));
  var selectLineStart = (view) => extendSel(view, (range) => EditorSelection.cursor(view.visualLineAt(range.head).from));
  var selectLineEnd = (view) => extendSel(view, (range) => EditorSelection.cursor(view.visualLineAt(range.head).to));
  var cursorDocStart = ({state, dispatch}) => {
    dispatch(setSel(state, {anchor: 0}));
    return true;
  };
  var cursorDocEnd = ({state, dispatch}) => {
    dispatch(setSel(state, {anchor: state.doc.length}));
    return true;
  };
  var selectDocStart = ({state, dispatch}) => {
    dispatch(setSel(state, {anchor: state.selection.main.anchor, head: 0}));
    return true;
  };
  var selectDocEnd = ({state, dispatch}) => {
    dispatch(setSel(state, {anchor: state.selection.main.anchor, head: state.doc.length}));
    return true;
  };
  var selectAll = ({state, dispatch}) => {
    dispatch(state.update({selection: {anchor: 0, head: state.doc.length}, annotations: Transaction.userEvent.of("keyboardselection")}));
    return true;
  };
  var selectLine = ({state, dispatch}) => {
    let ranges = selectedLineBlocks(state).map(({from, to}) => EditorSelection.range(from, Math.min(to + 1, state.doc.length)));
    dispatch(state.update({selection: EditorSelection.create(ranges), annotations: Transaction.userEvent.of("keyboardselection")}));
    return true;
  };
  var selectParentSyntax = ({state, dispatch}) => {
    let selection = updateSel(state.selection, (range) => {
      let context = syntaxTree(state).resolve(range.head, 1);
      while (!(context.from < range.from && context.to >= range.to || context.to > range.to && context.from <= range.from || !context.parent?.parent))
        context = context.parent;
      return EditorSelection.range(context.to, context.from);
    });
    dispatch(setSel(state, selection));
    return true;
  };
  var simplifySelection = ({state, dispatch}) => {
    let cur2 = state.selection, selection = null;
    if (cur2.ranges.length > 1)
      selection = EditorSelection.create([cur2.main]);
    else if (!cur2.main.empty)
      selection = EditorSelection.create([EditorSelection.cursor(cur2.main.head)]);
    if (!selection)
      return false;
    dispatch(setSel(state, selection));
    return true;
  };
  function deleteBy({state, dispatch}, by) {
    let changes = state.changeByRange((range) => {
      let {from, to} = range;
      if (from == to) {
        let towards = by(from);
        from = Math.min(from, towards);
        to = Math.max(to, towards);
      }
      return from == to ? {range} : {changes: {from, to}, range: EditorSelection.cursor(from)};
    });
    if (changes.changes.empty)
      return false;
    dispatch(state.update(changes, {scrollIntoView: true, annotations: Transaction.userEvent.of("delete")}));
    return true;
  }
  var deleteByChar = (target, forward, codePoint) => deleteBy(target, (pos) => {
    let {state} = target, line = state.doc.lineAt(pos), before;
    if (!forward && pos > line.from && pos < line.from + 200 && !/[^ \t]/.test(before = line.text.slice(0, pos - line.from))) {
      if (before[before.length - 1] == "	")
        return pos - 1;
      let col = countColumn(before, 0, state.tabSize), drop = col % getIndentUnit(state) || getIndentUnit(state);
      for (let i = 0; i < drop && before[before.length - 1 - i] == " "; i++)
        pos--;
      return pos;
    }
    let targetPos;
    if (codePoint) {
      let next = line.text.slice(pos - line.from + (forward ? 0 : -2), pos - line.from + (forward ? 2 : 0));
      let size = next ? codePointSize(codePointAt(next, 0)) : 1;
      targetPos = forward ? Math.min(state.doc.length, pos + size) : Math.max(0, pos - size);
    } else {
      targetPos = findClusterBreak(line.text, pos - line.from, forward) + line.from;
    }
    if (targetPos == pos && line.number != (forward ? state.doc.lines : 1))
      targetPos += forward ? 1 : -1;
    return targetPos;
  });
  var deleteCodePointBackward = (view) => deleteByChar(view, false, true);
  var deleteCharBackward = (view) => deleteByChar(view, false, false);
  var deleteCharForward = (view) => deleteByChar(view, true, false);
  var deleteByGroup = (target, forward) => deleteBy(target, (start) => {
    let pos = start, {state} = target, line = state.doc.lineAt(pos);
    let categorize = state.charCategorizer(pos);
    for (let cat = null; ; ) {
      if (pos == (forward ? line.to : line.from)) {
        if (pos == start && line.number != (forward ? state.doc.lines : 1))
          pos += forward ? 1 : -1;
        break;
      }
      let next = findClusterBreak(line.text, pos - line.from, forward) + line.from;
      let nextChar2 = line.text.slice(Math.min(pos, next) - line.from, Math.max(pos, next) - line.from);
      let nextCat = categorize(nextChar2);
      if (cat != null && nextCat != cat)
        break;
      if (nextChar2 != " " || pos != start)
        cat = nextCat;
      pos = next;
    }
    return pos;
  });
  var deleteGroupBackward = (target) => deleteByGroup(target, false);
  var deleteGroupForward = (target) => deleteByGroup(target, true);
  var deleteToLineEnd = (view) => deleteBy(view, (pos) => {
    let lineEnd = view.visualLineAt(pos).to;
    if (pos < lineEnd)
      return lineEnd;
    return Math.min(view.state.doc.length, pos + 1);
  });
  var deleteToLineStart = (view) => deleteBy(view, (pos) => {
    let lineStart = view.visualLineAt(pos).from;
    if (pos > lineStart)
      return lineStart;
    return Math.max(0, pos - 1);
  });
  var splitLine = ({state, dispatch}) => {
    let changes = state.changeByRange((range) => {
      return {
        changes: {from: range.from, to: range.to, insert: Text.of(["", ""])},
        range: EditorSelection.cursor(range.from)
      };
    });
    dispatch(state.update(changes, {scrollIntoView: true, annotations: Transaction.userEvent.of("input")}));
    return true;
  };
  var transposeChars = ({state, dispatch}) => {
    let changes = state.changeByRange((range) => {
      if (!range.empty || range.from == 0 || range.from == state.doc.length)
        return {range};
      let pos = range.from, line = state.doc.lineAt(pos);
      let from = pos == line.from ? pos - 1 : findClusterBreak(line.text, pos - line.from, false) + line.from;
      let to = pos == line.to ? pos + 1 : findClusterBreak(line.text, pos - line.from, true) + line.from;
      return {
        changes: {from, to, insert: state.doc.slice(pos, to).append(state.doc.slice(from, pos))},
        range: EditorSelection.cursor(to)
      };
    });
    if (changes.changes.empty)
      return false;
    dispatch(state.update(changes, {scrollIntoView: true}));
    return true;
  };
  function selectedLineBlocks(state) {
    let blocks = [], upto = -1;
    for (let range of state.selection.ranges) {
      let startLine = state.doc.lineAt(range.from), endLine = state.doc.lineAt(range.to);
      if (upto == startLine.number)
        blocks[blocks.length - 1].to = endLine.to;
      else
        blocks.push({from: startLine.from, to: endLine.to});
      upto = endLine.number;
    }
    return blocks;
  }
  function moveLine(state, dispatch, forward) {
    let changes = [];
    for (let block of selectedLineBlocks(state)) {
      if (forward ? block.to == state.doc.length : block.from == 0)
        continue;
      let nextLine = state.doc.lineAt(forward ? block.to + 1 : block.from - 1);
      if (forward)
        changes.push({from: block.to, to: nextLine.to}, {from: block.from, insert: nextLine.text + state.lineBreak});
      else
        changes.push({from: nextLine.from, to: block.from}, {from: block.to, insert: state.lineBreak + nextLine.text});
    }
    if (!changes.length)
      return false;
    dispatch(state.update({changes, scrollIntoView: true}));
    return true;
  }
  var moveLineUp = ({state, dispatch}) => moveLine(state, dispatch, false);
  var moveLineDown = ({state, dispatch}) => moveLine(state, dispatch, true);
  function copyLine(state, dispatch, forward) {
    let changes = [];
    for (let block of selectedLineBlocks(state)) {
      if (forward)
        changes.push({from: block.from, insert: state.doc.slice(block.from, block.to) + state.lineBreak});
      else
        changes.push({from: block.to, insert: state.lineBreak + state.doc.slice(block.from, block.to)});
    }
    dispatch(state.update({changes, scrollIntoView: true}));
    return true;
  }
  var copyLineUp = ({state, dispatch}) => copyLine(state, dispatch, false);
  var copyLineDown = ({state, dispatch}) => copyLine(state, dispatch, true);
  var deleteLine = (view) => {
    let {state} = view, changes = state.changes(selectedLineBlocks(state).map(({from, to}) => {
      if (from > 0)
        from--;
      else if (to < state.doc.length)
        to++;
      return {from, to};
    }));
    let selection = updateSel(state.selection, (range) => view.moveVertically(range, true)).map(changes);
    view.dispatch({changes, selection, scrollIntoView: true});
    return true;
  };
  function isBetweenBrackets(state, pos) {
    if (/\(\)|\[\]|\{\}/.test(state.sliceDoc(pos - 1, pos + 1)))
      return {from: pos, to: pos};
    let context = syntaxTree(state).resolve(pos);
    let before = context.childBefore(pos), after = context.childAfter(pos), closedBy;
    if (before && after && before.to <= pos && after.from >= pos && (closedBy = before.type.prop(NodeProp.closedBy)) && closedBy.indexOf(after.name) > -1 && state.doc.lineAt(before.to).from == state.doc.lineAt(after.from).from)
      return {from: before.to, to: after.from};
    return null;
  }
  var insertNewlineAndIndent = ({state, dispatch}) => {
    let changes = state.changeByRange(({from, to}) => {
      let explode = from == to && isBetweenBrackets(state, from);
      let cx = new IndentContext(state, {simulateBreak: from, simulateDoubleBreak: !!explode});
      let indent = getIndentation(cx, from);
      if (indent == null)
        indent = /^\s*/.exec(state.doc.lineAt(from).text)[0].length;
      let line = state.doc.lineAt(from);
      while (to < line.to && /\s/.test(line.text.slice(to - line.from, to + 1 - line.from)))
        to++;
      if (explode)
        ({from, to} = explode);
      else if (from > line.from && from < line.from + 100 && !/\S/.test(line.text.slice(0, from)))
        from = line.from;
      let insert2 = ["", indentString(state, indent)];
      if (explode)
        insert2.push(indentString(state, cx.lineIndent(line)));
      return {
        changes: {from, to, insert: Text.of(insert2)},
        range: EditorSelection.cursor(from + 1 + insert2[1].length)
      };
    });
    dispatch(state.update(changes, {scrollIntoView: true}));
    return true;
  };
  function changeBySelectedLine(state, f) {
    let atLine = -1;
    return state.changeByRange((range) => {
      let changes = [];
      for (let pos = range.from; pos <= range.to; ) {
        let line = state.doc.lineAt(pos);
        if (line.number > atLine && (range.empty || range.to > line.from)) {
          f(line, changes, range);
          atLine = line.number;
        }
        pos = line.to + 1;
      }
      let changeSet = state.changes(changes);
      return {
        changes,
        range: EditorSelection.range(changeSet.mapPos(range.anchor, 1), changeSet.mapPos(range.head, 1))
      };
    });
  }
  var indentSelection = ({state, dispatch}) => {
    let updated = Object.create(null);
    let context = new IndentContext(state, {overrideIndentation: (start) => {
      let found = updated[start];
      return found == null ? -1 : found;
    }});
    let changes = changeBySelectedLine(state, (line, changes2, range) => {
      let indent = getIndentation(context, line.from);
      if (indent == null)
        return;
      let cur2 = /^\s*/.exec(line.text)[0];
      let norm = indentString(state, indent);
      if (cur2 != norm || range.from < line.from + cur2.length) {
        updated[line.from] = indent;
        changes2.push({from: line.from, to: line.from + cur2.length, insert: norm});
      }
    });
    if (!changes.changes.empty)
      dispatch(state.update(changes));
    return true;
  };
  var indentMore = ({state, dispatch}) => {
    dispatch(state.update(changeBySelectedLine(state, (line, changes) => {
      changes.push({from: line.from, insert: state.facet(indentUnit)});
    })));
    return true;
  };
  var indentLess = ({state, dispatch}) => {
    dispatch(state.update(changeBySelectedLine(state, (line, changes) => {
      let space2 = /^\s*/.exec(line.text)[0];
      if (!space2)
        return;
      let col = countColumn(space2, 0, state.tabSize), keep = 0;
      let insert2 = indentString(state, Math.max(0, col - getIndentUnit(state)));
      while (keep < space2.length && keep < insert2.length && space2.charCodeAt(keep) == insert2.charCodeAt(keep))
        keep++;
      changes.push({from: line.from + keep, to: line.from + space2.length, insert: insert2.slice(keep)});
    })));
    return true;
  };
  var emacsStyleKeymap = [
    {key: "Ctrl-b", run: cursorCharLeft, shift: selectCharLeft, preventDefault: true},
    {key: "Ctrl-f", run: cursorCharRight, shift: selectCharRight},
    {key: "Ctrl-p", run: cursorLineUp, shift: selectLineUp},
    {key: "Ctrl-n", run: cursorLineDown, shift: selectLineDown},
    {key: "Ctrl-a", run: cursorLineStart, shift: selectLineStart},
    {key: "Ctrl-e", run: cursorLineEnd, shift: selectLineEnd},
    {key: "Ctrl-d", run: deleteCharForward},
    {key: "Ctrl-h", run: deleteCharBackward},
    {key: "Ctrl-k", run: deleteToLineEnd},
    {key: "Alt-d", run: deleteGroupForward},
    {key: "Ctrl-Alt-h", run: deleteGroupBackward},
    {key: "Ctrl-o", run: splitLine},
    {key: "Ctrl-t", run: transposeChars},
    {key: "Alt-f", run: cursorGroupForward, shift: selectGroupForward},
    {key: "Alt-b", run: cursorGroupBackward, shift: selectGroupBackward},
    {key: "Alt-<", run: cursorDocStart},
    {key: "Alt->", run: cursorDocEnd},
    {key: "Ctrl-v", run: cursorPageDown},
    {key: "Alt-v", run: cursorPageUp}
  ];
  var standardKeymap = [
    {key: "ArrowLeft", run: cursorCharLeft, shift: selectCharLeft},
    {key: "Mod-ArrowLeft", mac: "Alt-ArrowLeft", run: cursorGroupLeft, shift: selectGroupLeft},
    {mac: "Cmd-ArrowLeft", run: cursorLineStart, shift: selectLineStart},
    {key: "ArrowRight", run: cursorCharRight, shift: selectCharRight},
    {key: "Mod-ArrowRight", mac: "Alt-ArrowRight", run: cursorGroupRight, shift: selectGroupRight},
    {mac: "Cmd-ArrowRight", run: cursorLineEnd, shift: selectLineEnd},
    {key: "ArrowUp", run: cursorLineUp, shift: selectLineUp},
    {mac: "Cmd-ArrowUp", run: cursorDocStart, shift: selectDocStart},
    {mac: "Ctrl-ArrowUp", run: cursorPageUp, shift: selectPageUp},
    {key: "ArrowDown", run: cursorLineDown, shift: selectLineDown},
    {mac: "Cmd-ArrowDown", run: cursorDocEnd, shift: selectDocEnd},
    {mac: "Ctrl-ArrowDown", run: cursorPageDown, shift: selectPageDown},
    {key: "PageUp", run: cursorPageUp, shift: selectPageUp},
    {key: "PageDown", run: cursorPageDown, shift: selectPageDown},
    {key: "Home", run: cursorLineBoundaryBackward, shift: selectLineBoundaryBackward},
    {key: "Mod-Home", run: cursorDocStart, shift: selectDocStart},
    {key: "End", run: cursorLineBoundaryForward, shift: selectLineBoundaryForward},
    {key: "Mod-End", run: cursorDocEnd, shift: selectDocEnd},
    {key: "Enter", run: insertNewlineAndIndent},
    {key: "Mod-a", run: selectAll},
    {key: "Backspace", run: deleteCodePointBackward, shift: deleteCodePointBackward},
    {key: "Delete", run: deleteCharForward, shift: deleteCharForward},
    {key: "Mod-Backspace", mac: "Alt-Backspace", run: deleteGroupBackward},
    {key: "Mod-Delete", mac: "Alt-Delete", run: deleteGroupForward},
    {mac: "Mod-Backspace", run: deleteToLineStart},
    {mac: "Mod-Delete", run: deleteToLineEnd}
  ].concat(emacsStyleKeymap.map((b) => ({mac: b.key, run: b.run, shift: b.shift})));
  var defaultKeymap = [
    {key: "Alt-ArrowLeft", mac: "Ctrl-ArrowLeft", run: cursorSyntaxLeft, shift: selectSyntaxLeft},
    {key: "Alt-ArrowRight", mac: "Ctrl-ArrowRight", run: cursorSyntaxRight, shift: selectSyntaxRight},
    {key: "Alt-ArrowUp", run: moveLineUp},
    {key: "Shift-Alt-ArrowUp", run: copyLineUp},
    {key: "Alt-ArrowDown", run: moveLineDown},
    {key: "Shift-Alt-ArrowDown", run: copyLineDown},
    {key: "Escape", run: simplifySelection},
    {key: "Alt-l", run: selectLine},
    {key: "Mod-i", run: selectParentSyntax, preventDefault: true},
    {key: "Mod-[", run: indentLess},
    {key: "Mod-]", run: indentMore},
    {key: "Mod-Alt-\\", run: indentSelection},
    {key: "Shift-Mod-k", run: deleteLine},
    {key: "Shift-Mod-\\", run: cursorMatchingBracket}
  ].concat(standardKeymap);

  // ../node_modules/lezer/dist/index.es.js
  var Stack = class {
    constructor(p, stack, state, reducePos, pos, score2, buffer, bufferBase, curContext, parent) {
      this.p = p;
      this.stack = stack;
      this.state = state;
      this.reducePos = reducePos;
      this.pos = pos;
      this.score = score2;
      this.buffer = buffer;
      this.bufferBase = bufferBase;
      this.curContext = curContext;
      this.parent = parent;
    }
    toString() {
      return `[${this.stack.filter((_, i) => i % 3 == 0).concat(this.state)}]@${this.pos}${this.score ? "!" + this.score : ""}`;
    }
    static start(p, state, pos = 0) {
      let cx = p.parser.context;
      return new Stack(p, [], state, pos, pos, 0, [], 0, cx ? new StackContext(cx, cx.start) : null, null);
    }
    get context() {
      return this.curContext ? this.curContext.context : null;
    }
    pushState(state, start) {
      this.stack.push(this.state, start, this.bufferBase + this.buffer.length);
      this.state = state;
    }
    reduce(action) {
      let depth2 = action >> 19, type = action & 65535;
      let {parser: parser2} = this.p;
      let dPrec = parser2.dynamicPrecedence(type);
      if (dPrec)
        this.score += dPrec;
      if (depth2 == 0) {
        if (type < parser2.minRepeatTerm)
          this.storeNode(type, this.reducePos, this.reducePos, 4, true);
        this.pushState(parser2.getGoto(this.state, type, true), this.reducePos);
        this.reduceContext(type);
        return;
      }
      let base2 = this.stack.length - (depth2 - 1) * 3 - (action & 262144 ? 6 : 0);
      let start = this.stack[base2 - 2];
      let bufferBase = this.stack[base2 - 1], count = this.bufferBase + this.buffer.length - bufferBase;
      if (type < parser2.minRepeatTerm || action & 131072) {
        let pos = parser2.stateFlag(this.state, 1) ? this.pos : this.reducePos;
        this.storeNode(type, start, pos, count + 4, true);
      }
      if (action & 262144) {
        this.state = this.stack[base2];
      } else {
        let baseStateID = this.stack[base2 - 3];
        this.state = parser2.getGoto(baseStateID, type, true);
      }
      while (this.stack.length > base2)
        this.stack.pop();
      this.reduceContext(type);
    }
    storeNode(term, start, end, size = 4, isReduce = false) {
      if (term == 0) {
        let cur2 = this, top2 = this.buffer.length;
        if (top2 == 0 && cur2.parent) {
          top2 = cur2.bufferBase - cur2.parent.bufferBase;
          cur2 = cur2.parent;
        }
        if (top2 > 0 && cur2.buffer[top2 - 4] == 0 && cur2.buffer[top2 - 1] > -1) {
          if (start == end)
            return;
          if (cur2.buffer[top2 - 2] >= start) {
            cur2.buffer[top2 - 2] = end;
            return;
          }
        }
      }
      if (!isReduce || this.pos == end) {
        this.buffer.push(term, start, end, size);
      } else {
        let index = this.buffer.length;
        if (index > 0 && this.buffer[index - 4] != 0)
          while (index > 0 && this.buffer[index - 2] > end) {
            this.buffer[index] = this.buffer[index - 4];
            this.buffer[index + 1] = this.buffer[index - 3];
            this.buffer[index + 2] = this.buffer[index - 2];
            this.buffer[index + 3] = this.buffer[index - 1];
            index -= 4;
            if (size > 4)
              size -= 4;
          }
        this.buffer[index] = term;
        this.buffer[index + 1] = start;
        this.buffer[index + 2] = end;
        this.buffer[index + 3] = size;
      }
    }
    shift(action, next, nextEnd) {
      if (action & 131072) {
        this.pushState(action & 65535, this.pos);
      } else if ((action & 262144) == 0) {
        let start = this.pos, nextState = action, {parser: parser2} = this.p;
        if (nextEnd > this.pos || next <= parser2.maxNode) {
          this.pos = nextEnd;
          if (!parser2.stateFlag(nextState, 1))
            this.reducePos = nextEnd;
        }
        this.pushState(nextState, start);
        if (next <= parser2.maxNode)
          this.buffer.push(next, start, nextEnd, 4);
        this.shiftContext(next);
      } else {
        if (next <= this.p.parser.maxNode)
          this.buffer.push(next, this.pos, nextEnd, 4);
        this.pos = nextEnd;
      }
    }
    apply(action, next, nextEnd) {
      if (action & 65536)
        this.reduce(action);
      else
        this.shift(action, next, nextEnd);
    }
    useNode(value, next) {
      let index = this.p.reused.length - 1;
      if (index < 0 || this.p.reused[index] != value) {
        this.p.reused.push(value);
        index++;
      }
      let start = this.pos;
      this.reducePos = this.pos = start + value.length;
      this.pushState(next, start);
      this.buffer.push(index, start, this.reducePos, -1);
      if (this.curContext)
        this.updateContext(this.curContext.tracker.reuse(this.curContext.context, value, this.p.input, this));
    }
    split() {
      let parent = this;
      let off = parent.buffer.length;
      while (off > 0 && parent.buffer[off - 2] > parent.reducePos)
        off -= 4;
      let buffer = parent.buffer.slice(off), base2 = parent.bufferBase + off;
      while (parent && base2 == parent.bufferBase)
        parent = parent.parent;
      return new Stack(this.p, this.stack.slice(), this.state, this.reducePos, this.pos, this.score, buffer, base2, this.curContext, parent);
    }
    recoverByDelete(next, nextEnd) {
      let isNode = next <= this.p.parser.maxNode;
      if (isNode)
        this.storeNode(next, this.pos, nextEnd);
      this.storeNode(0, this.pos, nextEnd, isNode ? 8 : 4);
      this.pos = this.reducePos = nextEnd;
      this.score -= 200;
    }
    canShift(term) {
      for (let sim = new SimulatedStack(this); ; ) {
        let action = this.p.parser.stateSlot(sim.top, 4) || this.p.parser.hasAction(sim.top, term);
        if ((action & 65536) == 0)
          return true;
        if (action == 0)
          return false;
        sim.reduce(action);
      }
    }
    get ruleStart() {
      for (let state = this.state, base2 = this.stack.length; ; ) {
        let force = this.p.parser.stateSlot(state, 5);
        if (!(force & 65536))
          return 0;
        base2 -= 3 * (force >> 19);
        if ((force & 65535) < this.p.parser.minRepeatTerm)
          return this.stack[base2 + 1];
        state = this.stack[base2];
      }
    }
    startOf(types2, before) {
      let state = this.state, frame = this.stack.length, {parser: parser2} = this.p;
      for (; ; ) {
        let force = parser2.stateSlot(state, 5);
        let depth2 = force >> 19, term = force & 65535;
        if (types2.indexOf(term) > -1) {
          let base2 = frame - 3 * (force >> 19), pos = this.stack[base2 + 1];
          if (before == null || before > pos)
            return pos;
        }
        if (frame == 0)
          return null;
        if (depth2 == 0) {
          frame -= 3;
          state = this.stack[frame];
        } else {
          frame -= 3 * (depth2 - 1);
          state = parser2.getGoto(this.stack[frame - 3], term, true);
        }
      }
    }
    recoverByInsert(next) {
      if (this.stack.length >= 300)
        return [];
      let nextStates = this.p.parser.nextStates(this.state);
      if (nextStates.length > 4 << 1 || this.stack.length >= 120) {
        let best = [];
        for (let i = 0, s; i < nextStates.length; i += 2) {
          if ((s = nextStates[i + 1]) != this.state && this.p.parser.hasAction(s, next))
            best.push(nextStates[i], s);
        }
        if (this.stack.length < 120)
          for (let i = 0; best.length < 4 << 1 && i < nextStates.length; i += 2) {
            let s = nextStates[i + 1];
            if (!best.some((v, i2) => i2 & 1 && v == s))
              best.push(nextStates[i], s);
          }
        nextStates = best;
      }
      let result = [];
      for (let i = 0; i < nextStates.length && result.length < 4; i += 2) {
        let s = nextStates[i + 1];
        if (s == this.state)
          continue;
        let stack = this.split();
        stack.storeNode(0, stack.pos, stack.pos, 4, true);
        stack.pushState(s, this.pos);
        stack.shiftContext(nextStates[i]);
        stack.score -= 200;
        result.push(stack);
      }
      return result;
    }
    forceReduce() {
      let reduce = this.p.parser.stateSlot(this.state, 5);
      if ((reduce & 65536) == 0)
        return false;
      if (!this.p.parser.validAction(this.state, reduce)) {
        this.storeNode(0, this.reducePos, this.reducePos, 4, true);
        this.score -= 100;
      }
      this.reduce(reduce);
      return true;
    }
    forceAll() {
      while (!this.p.parser.stateFlag(this.state, 2) && this.forceReduce()) {
      }
      return this;
    }
    get deadEnd() {
      if (this.stack.length != 3)
        return false;
      let {parser: parser2} = this.p;
      return parser2.data[parser2.stateSlot(this.state, 1)] == 65535 && !parser2.stateSlot(this.state, 4);
    }
    restart() {
      this.state = this.stack[0];
      this.stack.length = 0;
    }
    sameState(other) {
      if (this.state != other.state || this.stack.length != other.stack.length)
        return false;
      for (let i = 0; i < this.stack.length; i += 3)
        if (this.stack[i] != other.stack[i])
          return false;
      return true;
    }
    get parser() {
      return this.p.parser;
    }
    dialectEnabled(dialectID) {
      return this.p.parser.dialect.flags[dialectID];
    }
    shiftContext(term) {
      if (this.curContext)
        this.updateContext(this.curContext.tracker.shift(this.curContext.context, term, this.p.input, this));
    }
    reduceContext(term) {
      if (this.curContext)
        this.updateContext(this.curContext.tracker.reduce(this.curContext.context, term, this.p.input, this));
    }
    emitContext() {
      let cx = this.curContext;
      if (!cx.tracker.strict)
        return;
      let last = this.buffer.length - 1;
      if (last < 0 || this.buffer[last] != -2)
        this.buffer.push(cx.hash, this.reducePos, this.reducePos, -2);
    }
    updateContext(context) {
      if (context != this.curContext.context) {
        let newCx = new StackContext(this.curContext.tracker, context);
        if (newCx.hash != this.curContext.hash)
          this.emitContext();
        this.curContext = newCx;
      }
    }
  };
  var StackContext = class {
    constructor(tracker, context) {
      this.tracker = tracker;
      this.context = context;
      this.hash = tracker.hash(context);
    }
  };
  var Recover;
  (function(Recover2) {
    Recover2[Recover2["Token"] = 200] = "Token";
    Recover2[Recover2["Reduce"] = 100] = "Reduce";
    Recover2[Recover2["MaxNext"] = 4] = "MaxNext";
    Recover2[Recover2["MaxInsertStackDepth"] = 300] = "MaxInsertStackDepth";
    Recover2[Recover2["DampenInsertStackDepth"] = 120] = "DampenInsertStackDepth";
  })(Recover || (Recover = {}));
  var SimulatedStack = class {
    constructor(stack) {
      this.stack = stack;
      this.top = stack.state;
      this.rest = stack.stack;
      this.offset = this.rest.length;
    }
    reduce(action) {
      let term = action & 65535, depth2 = action >> 19;
      if (depth2 == 0) {
        if (this.rest == this.stack.stack)
          this.rest = this.rest.slice();
        this.rest.push(this.top, 0, 0);
        this.offset += 3;
      } else {
        this.offset -= (depth2 - 1) * 3;
      }
      let goto = this.stack.p.parser.getGoto(this.rest[this.offset - 3], term, true);
      this.top = goto;
    }
  };
  var StackBufferCursor = class {
    constructor(stack, pos, index) {
      this.stack = stack;
      this.pos = pos;
      this.index = index;
      this.buffer = stack.buffer;
      if (this.index == 0)
        this.maybeNext();
    }
    static create(stack) {
      return new StackBufferCursor(stack, stack.bufferBase + stack.buffer.length, stack.buffer.length);
    }
    maybeNext() {
      let next = this.stack.parent;
      if (next != null) {
        this.index = this.stack.bufferBase - next.bufferBase;
        this.stack = next;
        this.buffer = next.buffer;
      }
    }
    get id() {
      return this.buffer[this.index - 4];
    }
    get start() {
      return this.buffer[this.index - 3];
    }
    get end() {
      return this.buffer[this.index - 2];
    }
    get size() {
      return this.buffer[this.index - 1];
    }
    next() {
      this.index -= 4;
      this.pos -= 4;
      if (this.index == 0)
        this.maybeNext();
    }
    fork() {
      return new StackBufferCursor(this.stack, this.pos, this.index);
    }
  };
  var Token = class {
    constructor() {
      this.start = -1;
      this.value = -1;
      this.end = -1;
    }
    accept(value, end) {
      this.value = value;
      this.end = end;
    }
  };
  var TokenGroup = class {
    constructor(data, id) {
      this.data = data;
      this.id = id;
    }
    token(input, token, stack) {
      readToken(this.data, input, token, stack, this.id);
    }
  };
  TokenGroup.prototype.contextual = TokenGroup.prototype.fallback = TokenGroup.prototype.extend = false;
  var ExternalTokenizer = class {
    constructor(token, options = {}) {
      this.token = token;
      this.contextual = !!options.contextual;
      this.fallback = !!options.fallback;
      this.extend = !!options.extend;
    }
  };
  function readToken(data, input, token, stack, group) {
    let state = 0, groupMask = 1 << group, dialect = stack.p.parser.dialect;
    scan:
      for (let pos = token.start; ; ) {
        if ((groupMask & data[state]) == 0)
          break;
        let accEnd = data[state + 1];
        for (let i = state + 3; i < accEnd; i += 2)
          if ((data[i + 1] & groupMask) > 0) {
            let term = data[i];
            if (dialect.allows(term) && (token.value == -1 || token.value == term || stack.p.parser.overrides(term, token.value))) {
              token.accept(term, pos);
              break;
            }
          }
        let next = input.get(pos++);
        for (let low = 0, high = data[state + 2]; low < high; ) {
          let mid = low + high >> 1;
          let index = accEnd + mid + (mid << 1);
          let from = data[index], to = data[index + 1];
          if (next < from)
            high = mid;
          else if (next >= to)
            low = mid + 1;
          else {
            state = data[index + 2];
            continue scan;
          }
        }
        break;
      }
  }
  function decodeArray(input, Type = Uint16Array) {
    if (typeof input != "string")
      return input;
    let array = null;
    for (let pos = 0, out = 0; pos < input.length; ) {
      let value = 0;
      for (; ; ) {
        let next = input.charCodeAt(pos++), stop = false;
        if (next == 126) {
          value = 65535;
          break;
        }
        if (next >= 92)
          next--;
        if (next >= 34)
          next--;
        let digit = next - 32;
        if (digit >= 46) {
          digit -= 46;
          stop = true;
        }
        value += digit;
        if (stop)
          break;
        value *= 46;
      }
      if (array)
        array[out++] = value;
      else
        array = new Type(value);
    }
    return array;
  }
  var verbose = typeof process != "undefined" && /\bparse\b/.test(process.env.LOG);
  var stackIDs = null;
  function cutAt(tree, pos, side) {
    let cursor = tree.cursor(pos);
    for (; ; ) {
      if (!(side < 0 ? cursor.childBefore(pos) : cursor.childAfter(pos)))
        for (; ; ) {
          if ((side < 0 ? cursor.to <= pos : cursor.from >= pos) && !cursor.type.isError)
            return side < 0 ? Math.max(0, Math.min(cursor.to - 1, pos - 5)) : Math.min(tree.length, Math.max(cursor.from + 1, pos + 5));
          if (side < 0 ? cursor.prevSibling() : cursor.nextSibling())
            break;
          if (!cursor.parent())
            return side < 0 ? 0 : tree.length;
        }
    }
  }
  var FragmentCursor = class {
    constructor(fragments) {
      this.fragments = fragments;
      this.i = 0;
      this.fragment = null;
      this.safeFrom = -1;
      this.safeTo = -1;
      this.trees = [];
      this.start = [];
      this.index = [];
      this.nextFragment();
    }
    nextFragment() {
      let fr = this.fragment = this.i == this.fragments.length ? null : this.fragments[this.i++];
      if (fr) {
        this.safeFrom = fr.openStart ? cutAt(fr.tree, fr.from + fr.offset, 1) - fr.offset : fr.from;
        this.safeTo = fr.openEnd ? cutAt(fr.tree, fr.to + fr.offset, -1) - fr.offset : fr.to;
        while (this.trees.length) {
          this.trees.pop();
          this.start.pop();
          this.index.pop();
        }
        this.trees.push(fr.tree);
        this.start.push(-fr.offset);
        this.index.push(0);
        this.nextStart = this.safeFrom;
      } else {
        this.nextStart = 1e9;
      }
    }
    nodeAt(pos) {
      if (pos < this.nextStart)
        return null;
      while (this.fragment && this.safeTo <= pos)
        this.nextFragment();
      if (!this.fragment)
        return null;
      for (; ; ) {
        let last = this.trees.length - 1;
        if (last < 0) {
          this.nextFragment();
          return null;
        }
        let top2 = this.trees[last], index = this.index[last];
        if (index == top2.children.length) {
          this.trees.pop();
          this.start.pop();
          this.index.pop();
          continue;
        }
        let next = top2.children[index];
        let start = this.start[last] + top2.positions[index];
        if (start > pos) {
          this.nextStart = start;
          return null;
        } else if (start == pos && start + next.length <= this.safeTo) {
          return start == pos && start >= this.safeFrom ? next : null;
        }
        if (next instanceof TreeBuffer) {
          this.index[last]++;
          this.nextStart = start + next.length;
        } else {
          this.index[last]++;
          if (start + next.length >= pos) {
            this.trees.push(next);
            this.start.push(start);
            this.index.push(0);
          }
        }
      }
    }
  };
  var CachedToken = class extends Token {
    constructor() {
      super(...arguments);
      this.extended = -1;
      this.mask = 0;
      this.context = 0;
    }
    clear(start) {
      this.start = start;
      this.value = this.extended = -1;
    }
  };
  var dummyToken = new Token();
  var TokenCache = class {
    constructor(parser2) {
      this.tokens = [];
      this.mainToken = dummyToken;
      this.actions = [];
      this.tokens = parser2.tokenizers.map((_) => new CachedToken());
    }
    getActions(stack, input) {
      let actionIndex = 0;
      let main = null;
      let {parser: parser2} = stack.p, {tokenizers} = parser2;
      let mask = parser2.stateSlot(stack.state, 3);
      let context = stack.curContext ? stack.curContext.hash : 0;
      for (let i = 0; i < tokenizers.length; i++) {
        if ((1 << i & mask) == 0)
          continue;
        let tokenizer = tokenizers[i], token = this.tokens[i];
        if (main && !tokenizer.fallback)
          continue;
        if (tokenizer.contextual || token.start != stack.pos || token.mask != mask || token.context != context) {
          this.updateCachedToken(token, tokenizer, stack, input);
          token.mask = mask;
          token.context = context;
        }
        if (token.value != 0) {
          let startIndex = actionIndex;
          if (token.extended > -1)
            actionIndex = this.addActions(stack, token.extended, token.end, actionIndex);
          actionIndex = this.addActions(stack, token.value, token.end, actionIndex);
          if (!tokenizer.extend) {
            main = token;
            if (actionIndex > startIndex)
              break;
          }
        }
      }
      while (this.actions.length > actionIndex)
        this.actions.pop();
      if (!main) {
        main = dummyToken;
        main.start = stack.pos;
        if (stack.pos == input.length)
          main.accept(stack.p.parser.eofTerm, stack.pos);
        else
          main.accept(0, stack.pos + 1);
      }
      this.mainToken = main;
      return this.actions;
    }
    updateCachedToken(token, tokenizer, stack, input) {
      token.clear(stack.pos);
      tokenizer.token(input, token, stack);
      if (token.value > -1) {
        let {parser: parser2} = stack.p;
        for (let i = 0; i < parser2.specialized.length; i++)
          if (parser2.specialized[i] == token.value) {
            let result = parser2.specializers[i](input.read(token.start, token.end), stack);
            if (result >= 0 && stack.p.parser.dialect.allows(result >> 1)) {
              if ((result & 1) == 0)
                token.value = result >> 1;
              else
                token.extended = result >> 1;
              break;
            }
          }
      } else if (stack.pos == input.length) {
        token.accept(stack.p.parser.eofTerm, stack.pos);
      } else {
        token.accept(0, stack.pos + 1);
      }
    }
    putAction(action, token, end, index) {
      for (let i = 0; i < index; i += 3)
        if (this.actions[i] == action)
          return index;
      this.actions[index++] = action;
      this.actions[index++] = token;
      this.actions[index++] = end;
      return index;
    }
    addActions(stack, token, end, index) {
      let {state} = stack, {parser: parser2} = stack.p, {data} = parser2;
      for (let set = 0; set < 2; set++) {
        for (let i = parser2.stateSlot(state, set ? 2 : 1); ; i += 3) {
          if (data[i] == 65535) {
            if (data[i + 1] == 1) {
              i = pair(data, i + 2);
            } else {
              if (index == 0 && data[i + 1] == 2)
                index = this.putAction(pair(data, i + 1), token, end, index);
              break;
            }
          }
          if (data[i] == token)
            index = this.putAction(pair(data, i + 1), token, end, index);
        }
      }
      return index;
    }
  };
  var Rec;
  (function(Rec2) {
    Rec2[Rec2["Distance"] = 5] = "Distance";
    Rec2[Rec2["MaxRemainingPerStep"] = 3] = "MaxRemainingPerStep";
    Rec2[Rec2["MinBufferLengthPrune"] = 200] = "MinBufferLengthPrune";
    Rec2[Rec2["ForceReduceLimit"] = 10] = "ForceReduceLimit";
  })(Rec || (Rec = {}));
  var Parse = class {
    constructor(parser2, input, startPos, context) {
      this.parser = parser2;
      this.input = input;
      this.startPos = startPos;
      this.context = context;
      this.pos = 0;
      this.recovering = 0;
      this.nextStackID = 9812;
      this.nested = null;
      this.nestEnd = 0;
      this.nestWrap = null;
      this.reused = [];
      this.tokens = new TokenCache(parser2);
      this.topTerm = parser2.top[1];
      this.stacks = [Stack.start(this, parser2.top[0], this.startPos)];
      let fragments = context === null || context === void 0 ? void 0 : context.fragments;
      this.fragments = fragments && fragments.length ? new FragmentCursor(fragments) : null;
    }
    advance() {
      if (this.nested) {
        let result = this.nested.advance();
        this.pos = this.nested.pos;
        if (result) {
          this.finishNested(this.stacks[0], result);
          this.nested = null;
        }
        return null;
      }
      let stacks = this.stacks, pos = this.pos;
      let newStacks = this.stacks = [];
      let stopped, stoppedTokens;
      let maybeNest;
      for (let i = 0; i < stacks.length; i++) {
        let stack = stacks[i], nest;
        for (; ; ) {
          if (stack.pos > pos) {
            newStacks.push(stack);
          } else if (nest = this.checkNest(stack)) {
            if (!maybeNest || maybeNest.stack.score < stack.score)
              maybeNest = nest;
          } else if (this.advanceStack(stack, newStacks, stacks)) {
            continue;
          } else {
            if (!stopped) {
              stopped = [];
              stoppedTokens = [];
            }
            stopped.push(stack);
            let tok = this.tokens.mainToken;
            stoppedTokens.push(tok.value, tok.end);
          }
          break;
        }
      }
      if (maybeNest) {
        this.startNested(maybeNest);
        return null;
      }
      if (!newStacks.length) {
        let finished = stopped && findFinished(stopped);
        if (finished)
          return this.stackToTree(finished);
        if (this.parser.strict) {
          if (verbose && stopped)
            console.log("Stuck with token " + this.parser.getName(this.tokens.mainToken.value));
          throw new SyntaxError("No parse at " + pos);
        }
        if (!this.recovering)
          this.recovering = 5;
      }
      if (this.recovering && stopped) {
        let finished = this.runRecovery(stopped, stoppedTokens, newStacks);
        if (finished)
          return this.stackToTree(finished.forceAll());
      }
      if (this.recovering) {
        let maxRemaining = this.recovering == 1 ? 1 : this.recovering * 3;
        if (newStacks.length > maxRemaining) {
          newStacks.sort((a, b) => b.score - a.score);
          while (newStacks.length > maxRemaining)
            newStacks.pop();
        }
        if (newStacks.some((s) => s.reducePos > pos))
          this.recovering--;
      } else if (newStacks.length > 1) {
        outer:
          for (let i = 0; i < newStacks.length - 1; i++) {
            let stack = newStacks[i];
            for (let j = i + 1; j < newStacks.length; j++) {
              let other = newStacks[j];
              if (stack.sameState(other) || stack.buffer.length > 200 && other.buffer.length > 200) {
                if ((stack.score - other.score || stack.buffer.length - other.buffer.length) > 0) {
                  newStacks.splice(j--, 1);
                } else {
                  newStacks.splice(i--, 1);
                  continue outer;
                }
              }
            }
          }
      }
      this.pos = newStacks[0].pos;
      for (let i = 1; i < newStacks.length; i++)
        if (newStacks[i].pos < this.pos)
          this.pos = newStacks[i].pos;
      return null;
    }
    advanceStack(stack, stacks, split) {
      let start = stack.pos, {input, parser: parser2} = this;
      let base2 = verbose ? this.stackID(stack) + " -> " : "";
      if (this.fragments) {
        let strictCx = stack.curContext && stack.curContext.tracker.strict, cxHash = strictCx ? stack.curContext.hash : 0;
        for (let cached = this.fragments.nodeAt(start); cached; ) {
          let match = this.parser.nodeSet.types[cached.type.id] == cached.type ? parser2.getGoto(stack.state, cached.type.id) : -1;
          if (match > -1 && cached.length && (!strictCx || (cached.contextHash || 0) == cxHash)) {
            stack.useNode(cached, match);
            if (verbose)
              console.log(base2 + this.stackID(stack) + ` (via reuse of ${parser2.getName(cached.type.id)})`);
            return true;
          }
          if (!(cached instanceof Tree2) || cached.children.length == 0 || cached.positions[0] > 0)
            break;
          let inner = cached.children[0];
          if (inner instanceof Tree2)
            cached = inner;
          else
            break;
        }
      }
      let defaultReduce = parser2.stateSlot(stack.state, 4);
      if (defaultReduce > 0) {
        stack.reduce(defaultReduce);
        if (verbose)
          console.log(base2 + this.stackID(stack) + ` (via always-reduce ${parser2.getName(defaultReduce & 65535)})`);
        return true;
      }
      let actions = this.tokens.getActions(stack, input);
      for (let i = 0; i < actions.length; ) {
        let action = actions[i++], term = actions[i++], end = actions[i++];
        let last = i == actions.length || !split;
        let localStack = last ? stack : stack.split();
        localStack.apply(action, term, end);
        if (verbose)
          console.log(base2 + this.stackID(localStack) + ` (via ${(action & 65536) == 0 ? "shift" : `reduce of ${parser2.getName(action & 65535)}`} for ${parser2.getName(term)} @ ${start}${localStack == stack ? "" : ", split"})`);
        if (last)
          return true;
        else if (localStack.pos > start)
          stacks.push(localStack);
        else
          split.push(localStack);
      }
      return false;
    }
    advanceFully(stack, newStacks) {
      let pos = stack.pos;
      for (; ; ) {
        let nest = this.checkNest(stack);
        if (nest)
          return nest;
        if (!this.advanceStack(stack, null, null))
          return false;
        if (stack.pos > pos) {
          pushStackDedup(stack, newStacks);
          return true;
        }
      }
    }
    runRecovery(stacks, tokens, newStacks) {
      let finished = null, restarted = false;
      let maybeNest;
      for (let i = 0; i < stacks.length; i++) {
        let stack = stacks[i], token = tokens[i << 1], tokenEnd = tokens[(i << 1) + 1];
        let base2 = verbose ? this.stackID(stack) + " -> " : "";
        if (stack.deadEnd) {
          if (restarted)
            continue;
          restarted = true;
          stack.restart();
          if (verbose)
            console.log(base2 + this.stackID(stack) + " (restarted)");
          let done = this.advanceFully(stack, newStacks);
          if (done) {
            if (done !== true)
              maybeNest = done;
            continue;
          }
        }
        let force = stack.split(), forceBase = base2;
        for (let j = 0; force.forceReduce() && j < 10; j++) {
          if (verbose)
            console.log(forceBase + this.stackID(force) + " (via force-reduce)");
          let done = this.advanceFully(force, newStacks);
          if (done) {
            if (done !== true)
              maybeNest = done;
            break;
          }
          if (verbose)
            forceBase = this.stackID(force) + " -> ";
        }
        for (let insert2 of stack.recoverByInsert(token)) {
          if (verbose)
            console.log(base2 + this.stackID(insert2) + " (via recover-insert)");
          this.advanceFully(insert2, newStacks);
        }
        if (this.input.length > stack.pos) {
          if (tokenEnd == stack.pos) {
            tokenEnd++;
            token = 0;
          }
          stack.recoverByDelete(token, tokenEnd);
          if (verbose)
            console.log(base2 + this.stackID(stack) + ` (via recover-delete ${this.parser.getName(token)})`);
          pushStackDedup(stack, newStacks);
        } else if (!finished || finished.score < stack.score) {
          finished = stack;
        }
      }
      if (finished)
        return finished;
      if (maybeNest) {
        for (let s of this.stacks)
          if (s.score > maybeNest.stack.score) {
            maybeNest = void 0;
            break;
          }
      }
      if (maybeNest)
        this.startNested(maybeNest);
      return null;
    }
    forceFinish() {
      let stack = this.stacks[0].split();
      if (this.nested)
        this.finishNested(stack, this.nested.forceFinish());
      return this.stackToTree(stack.forceAll());
    }
    stackToTree(stack, pos = stack.pos) {
      if (this.parser.context)
        stack.emitContext();
      return Tree2.build({
        buffer: StackBufferCursor.create(stack),
        nodeSet: this.parser.nodeSet,
        topID: this.topTerm,
        maxBufferLength: this.parser.bufferLength,
        reused: this.reused,
        start: this.startPos,
        length: pos - this.startPos,
        minRepeatType: this.parser.minRepeatTerm
      });
    }
    checkNest(stack) {
      let info = this.parser.findNested(stack.state);
      if (!info)
        return null;
      let spec = info.value;
      if (typeof spec == "function")
        spec = spec(this.input, stack);
      return spec ? {stack, info, spec} : null;
    }
    startNested(nest) {
      let {stack, info, spec} = nest;
      this.stacks = [stack];
      this.nestEnd = this.scanForNestEnd(stack, info.end, spec.filterEnd);
      this.nestWrap = typeof spec.wrapType == "number" ? this.parser.nodeSet.types[spec.wrapType] : spec.wrapType || null;
      if (spec.startParse) {
        this.nested = spec.startParse(this.input.clip(this.nestEnd), stack.pos, this.context);
      } else {
        this.finishNested(stack);
      }
    }
    scanForNestEnd(stack, endToken, filter) {
      for (let pos = stack.pos; pos < this.input.length; pos++) {
        dummyToken.start = pos;
        dummyToken.value = -1;
        endToken.token(this.input, dummyToken, stack);
        if (dummyToken.value > -1 && (!filter || filter(this.input.read(pos, dummyToken.end))))
          return pos;
      }
      return this.input.length;
    }
    finishNested(stack, tree) {
      if (this.nestWrap)
        tree = new Tree2(this.nestWrap, tree ? [tree] : [], tree ? [0] : [], this.nestEnd - stack.pos);
      else if (!tree)
        tree = new Tree2(NodeType.none, [], [], this.nestEnd - stack.pos);
      let info = this.parser.findNested(stack.state);
      stack.useNode(tree, this.parser.getGoto(stack.state, info.placeholder, true));
      if (verbose)
        console.log(this.stackID(stack) + ` (via unnest)`);
    }
    stackID(stack) {
      let id = (stackIDs || (stackIDs = new WeakMap())).get(stack);
      if (!id)
        stackIDs.set(stack, id = String.fromCodePoint(this.nextStackID++));
      return id + stack;
    }
  };
  function pushStackDedup(stack, newStacks) {
    for (let i = 0; i < newStacks.length; i++) {
      let other = newStacks[i];
      if (other.pos == stack.pos && other.sameState(stack)) {
        if (newStacks[i].score < stack.score)
          newStacks[i] = stack;
        return;
      }
    }
    newStacks.push(stack);
  }
  var Dialect = class {
    constructor(source, flags, disabled) {
      this.source = source;
      this.flags = flags;
      this.disabled = disabled;
    }
    allows(term) {
      return !this.disabled || this.disabled[term] == 0;
    }
  };
  var Parser = class {
    constructor(spec) {
      this.bufferLength = DefaultBufferLength;
      this.strict = false;
      this.cachedDialect = null;
      if (spec.version != 13)
        throw new RangeError(`Parser version (${spec.version}) doesn't match runtime version (${13})`);
      let tokenArray = decodeArray(spec.tokenData);
      let nodeNames = spec.nodeNames.split(" ");
      this.minRepeatTerm = nodeNames.length;
      this.context = spec.context;
      for (let i = 0; i < spec.repeatNodeCount; i++)
        nodeNames.push("");
      let nodeProps = [];
      for (let i = 0; i < nodeNames.length; i++)
        nodeProps.push([]);
      function setProp(nodeID, prop, value) {
        nodeProps[nodeID].push([prop, prop.deserialize(String(value))]);
      }
      if (spec.nodeProps)
        for (let propSpec of spec.nodeProps) {
          let prop = propSpec[0];
          for (let i = 1; i < propSpec.length; ) {
            let next = propSpec[i++];
            if (next >= 0) {
              setProp(next, prop, propSpec[i++]);
            } else {
              let value = propSpec[i + -next];
              for (let j = -next; j > 0; j--)
                setProp(propSpec[i++], prop, value);
              i++;
            }
          }
        }
      this.specialized = new Uint16Array(spec.specialized ? spec.specialized.length : 0);
      this.specializers = [];
      if (spec.specialized)
        for (let i = 0; i < spec.specialized.length; i++) {
          this.specialized[i] = spec.specialized[i].term;
          this.specializers[i] = spec.specialized[i].get;
        }
      this.states = decodeArray(spec.states, Uint32Array);
      this.data = decodeArray(spec.stateData);
      this.goto = decodeArray(spec.goto);
      let topTerms = Object.keys(spec.topRules).map((r) => spec.topRules[r][1]);
      this.nodeSet = new NodeSet(nodeNames.map((name2, i) => NodeType.define({
        name: i >= this.minRepeatTerm ? void 0 : name2,
        id: i,
        props: nodeProps[i],
        top: topTerms.indexOf(i) > -1,
        error: i == 0,
        skipped: spec.skippedNodes && spec.skippedNodes.indexOf(i) > -1
      })));
      this.maxTerm = spec.maxTerm;
      this.tokenizers = spec.tokenizers.map((value) => typeof value == "number" ? new TokenGroup(tokenArray, value) : value);
      this.topRules = spec.topRules;
      this.nested = (spec.nested || []).map(([name2, value, endToken, placeholder2]) => {
        return {name: name2, value, end: new TokenGroup(decodeArray(endToken), 0), placeholder: placeholder2};
      });
      this.dialects = spec.dialects || {};
      this.dynamicPrecedences = spec.dynamicPrecedences || null;
      this.tokenPrecTable = spec.tokenPrec;
      this.termNames = spec.termNames || null;
      this.maxNode = this.nodeSet.types.length - 1;
      this.dialect = this.parseDialect();
      this.top = this.topRules[Object.keys(this.topRules)[0]];
    }
    parse(input, startPos = 0, context = {}) {
      if (typeof input == "string")
        input = stringInput(input);
      let cx = new Parse(this, input, startPos, context);
      for (; ; ) {
        let done = cx.advance();
        if (done)
          return done;
      }
    }
    startParse(input, startPos = 0, context = {}) {
      if (typeof input == "string")
        input = stringInput(input);
      return new Parse(this, input, startPos, context);
    }
    getGoto(state, term, loose = false) {
      let table = this.goto;
      if (term >= table[0])
        return -1;
      for (let pos = table[term + 1]; ; ) {
        let groupTag = table[pos++], last = groupTag & 1;
        let target = table[pos++];
        if (last && loose)
          return target;
        for (let end = pos + (groupTag >> 1); pos < end; pos++)
          if (table[pos] == state)
            return target;
        if (last)
          return -1;
      }
    }
    hasAction(state, terminal) {
      let data = this.data;
      for (let set = 0; set < 2; set++) {
        for (let i = this.stateSlot(state, set ? 2 : 1), next; ; i += 3) {
          if ((next = data[i]) == 65535) {
            if (data[i + 1] == 1)
              next = data[i = pair(data, i + 2)];
            else if (data[i + 1] == 2)
              return pair(data, i + 2);
            else
              break;
          }
          if (next == terminal || next == 0)
            return pair(data, i + 1);
        }
      }
      return 0;
    }
    stateSlot(state, slot) {
      return this.states[state * 6 + slot];
    }
    stateFlag(state, flag) {
      return (this.stateSlot(state, 0) & flag) > 0;
    }
    findNested(state) {
      let flags = this.stateSlot(state, 0);
      return flags & 4 ? this.nested[flags >> 10] : null;
    }
    validAction(state, action) {
      if (action == this.stateSlot(state, 4))
        return true;
      for (let i = this.stateSlot(state, 1); ; i += 3) {
        if (this.data[i] == 65535) {
          if (this.data[i + 1] == 1)
            i = pair(this.data, i + 2);
          else
            return false;
        }
        if (action == pair(this.data, i + 1))
          return true;
      }
    }
    nextStates(state) {
      let result = [];
      for (let i = this.stateSlot(state, 1); ; i += 3) {
        if (this.data[i] == 65535) {
          if (this.data[i + 1] == 1)
            i = pair(this.data, i + 2);
          else
            break;
        }
        if ((this.data[i + 2] & 65536 >> 16) == 0) {
          let value = this.data[i + 1];
          if (!result.some((v, i2) => i2 & 1 && v == value))
            result.push(this.data[i], value);
        }
      }
      return result;
    }
    overrides(token, prev) {
      let iPrev = findOffset(this.data, this.tokenPrecTable, prev);
      return iPrev < 0 || findOffset(this.data, this.tokenPrecTable, token) < iPrev;
    }
    configure(config2) {
      let copy = Object.assign(Object.create(Parser.prototype), this);
      if (config2.props)
        copy.nodeSet = this.nodeSet.extend(...config2.props);
      if (config2.top) {
        let info = this.topRules[config2.top];
        if (!info)
          throw new RangeError(`Invalid top rule name ${config2.top}`);
        copy.top = info;
      }
      if (config2.tokenizers)
        copy.tokenizers = this.tokenizers.map((t2) => {
          let found = config2.tokenizers.find((r) => r.from == t2);
          return found ? found.to : t2;
        });
      if (config2.dialect)
        copy.dialect = this.parseDialect(config2.dialect);
      if (config2.nested)
        copy.nested = this.nested.map((obj) => {
          if (!Object.prototype.hasOwnProperty.call(config2.nested, obj.name))
            return obj;
          return {name: obj.name, value: config2.nested[obj.name], end: obj.end, placeholder: obj.placeholder};
        });
      if (config2.strict != null)
        copy.strict = config2.strict;
      if (config2.bufferLength != null)
        copy.bufferLength = config2.bufferLength;
      return copy;
    }
    getName(term) {
      return this.termNames ? this.termNames[term] : String(term <= this.maxNode && this.nodeSet.types[term].name || term);
    }
    get eofTerm() {
      return this.maxNode + 1;
    }
    get hasNested() {
      return this.nested.length > 0;
    }
    get topNode() {
      return this.nodeSet.types[this.top[1]];
    }
    dynamicPrecedence(term) {
      let prec2 = this.dynamicPrecedences;
      return prec2 == null ? 0 : prec2[term] || 0;
    }
    parseDialect(dialect) {
      if (this.cachedDialect && this.cachedDialect.source == dialect)
        return this.cachedDialect;
      let values = Object.keys(this.dialects), flags = values.map(() => false);
      if (dialect)
        for (let part of dialect.split(" ")) {
          let id = values.indexOf(part);
          if (id >= 0)
            flags[id] = true;
        }
      let disabled = null;
      for (let i = 0; i < values.length; i++)
        if (!flags[i]) {
          for (let j = this.dialects[values[i]], id; (id = this.data[j++]) != 65535; )
            (disabled || (disabled = new Uint8Array(this.maxTerm + 1)))[id] = 1;
        }
      return this.cachedDialect = new Dialect(dialect, flags, disabled);
    }
    static deserialize(spec) {
      return new Parser(spec);
    }
  };
  function pair(data, off) {
    return data[off] | data[off + 1] << 16;
  }
  function findOffset(data, start, term) {
    for (let i = start, next; (next = data[i]) != 65535; i++)
      if (next == term)
        return i - start;
    return -1;
  }
  function findFinished(stacks) {
    let best = null;
    for (let stack of stacks) {
      if (stack.pos == stack.p.input.length && stack.p.parser.stateFlag(stack.state, 2) && (!best || best.score < stack.score))
        best = stack;
    }
    return best;
  }

  // ../node_modules/lezer-javascript/dist/index.es.js
  var noSemi = 269;
  var incdec = 1;
  var incdecPrefix = 2;
  var templateContent = 270;
  var templateDollarBrace = 271;
  var templateEnd = 272;
  var insertSemi = 273;
  var TSExtends = 3;
  var Dialect_ts = 1;
  var newline = [10, 13, 8232, 8233];
  var space = [9, 11, 12, 32, 133, 160, 5760, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200, 8201, 8202, 8239, 8287, 12288];
  var braceR = 125;
  var braceL = 123;
  var semicolon = 59;
  var slash = 47;
  var star = 42;
  var plus = 43;
  var minus = 45;
  var dollar = 36;
  var backtick = 96;
  var backslash = 92;
  function newlineBefore(input, pos) {
    for (let i = pos - 1; i >= 0; i--) {
      let prev = input.get(i);
      if (newline.indexOf(prev) > -1)
        return true;
      if (space.indexOf(prev) < 0)
        break;
    }
    return false;
  }
  var insertSemicolon = new ExternalTokenizer((input, token, stack) => {
    let pos = token.start, next = input.get(pos);
    if ((next == braceR || next == -1 || newlineBefore(input, pos)) && stack.canShift(insertSemi))
      token.accept(insertSemi, token.start);
  }, {contextual: true, fallback: true});
  var noSemicolon = new ExternalTokenizer((input, token, stack) => {
    let pos = token.start, next = input.get(pos++);
    if (space.indexOf(next) > -1 || newline.indexOf(next) > -1)
      return;
    if (next == slash) {
      let after = input.get(pos++);
      if (after == slash || after == star)
        return;
    }
    if (next != braceR && next != semicolon && next != -1 && !newlineBefore(input, token.start) && stack.canShift(noSemi))
      token.accept(noSemi, token.start);
  }, {contextual: true});
  var incdecToken = new ExternalTokenizer((input, token, stack) => {
    let pos = token.start, next = input.get(pos);
    if ((next == plus || next == minus) && next == input.get(pos + 1)) {
      let mayPostfix = !newlineBefore(input, token.start) && stack.canShift(incdec);
      token.accept(mayPostfix ? incdec : incdecPrefix, pos + 2);
    }
  }, {contextual: true});
  var template = new ExternalTokenizer((input, token) => {
    let pos = token.start, afterDollar = false;
    for (; ; ) {
      let next = input.get(pos++);
      if (next < 0) {
        if (pos - 1 > token.start)
          token.accept(templateContent, pos - 1);
        break;
      } else if (next == backtick) {
        if (pos == token.start + 1)
          token.accept(templateEnd, pos);
        else
          token.accept(templateContent, pos - 1);
        break;
      } else if (next == braceL && afterDollar) {
        if (pos == token.start + 2)
          token.accept(templateDollarBrace, pos);
        else
          token.accept(templateContent, pos - 2);
        break;
      } else if (next == 10 && pos > token.start + 1) {
        token.accept(templateContent, pos);
        break;
      } else if (next == backslash && pos != input.length) {
        pos++;
      }
      afterDollar = next == dollar;
    }
  });
  function tsExtends(value, stack) {
    return value == "extends" && stack.dialectEnabled(Dialect_ts) ? TSExtends : -1;
  }
  var spec_identifier = {__proto__: null, export: 16, as: 21, from: 25, default: 30, async: 35, function: 36, this: 46, true: 54, false: 54, void: 58, typeof: 62, null: 76, super: 78, new: 112, await: 129, yield: 131, delete: 132, class: 142, extends: 144, public: 181, private: 181, protected: 181, readonly: 183, in: 202, instanceof: 204, import: 236, keyof: 287, unique: 291, infer: 297, is: 331, abstract: 351, implements: 353, type: 355, let: 358, var: 360, const: 362, interface: 369, enum: 373, namespace: 379, module: 381, declare: 385, global: 389, for: 410, of: 419, while: 422, with: 426, do: 430, if: 434, else: 436, switch: 440, case: 446, try: 452, catch: 454, finally: 456, return: 460, throw: 464, break: 468, continue: 472, debugger: 476};
  var spec_word = {__proto__: null, async: 99, get: 101, set: 103, public: 151, private: 151, protected: 151, static: 153, abstract: 155, readonly: 159, new: 335};
  var spec_LessThan = {__proto__: null, "<": 119};
  var parser = Parser.deserialize({
    version: 13,
    states: "$8xO]QYOOO&zQ!LdO'#CgO'ROSO'#DRO)ZQYO'#DWO)kQYO'#DcO)rQYO'#DmO-iQYO'#DsOOQO'#ET'#ETO-|QWO'#ESO.RQWO'#ESO.ZQ!LdO'#IgO2dQ!LdO'#IhO3QQWO'#EpO3VQpO'#FVOOQ!LS'#Ex'#ExO3_O!bO'#ExO3mQWO'#F^O4wQWO'#F]OOQ!LS'#Ih'#IhOOQ!LS'#Ig'#IgOOQQ'#JR'#JRO4|QWO'#HeO5RQ!LYO'#HfOOQQ'#I['#I[OOQQ'#Hg'#HgQ]QYOOO)rQYO'#DeO5ZQWO'#GQO5`Q#tO'#ClO5nQWO'#ERO5yQ#tO'#EwO6eQWO'#GQO6jQWO'#GUO6uQWO'#GUO7TQWO'#GYO7TQWO'#GZO7TQWO'#G]O5ZQWO'#G`O7tQWO'#GcO9SQWO'#CcO9dQWO'#GpO9lQWO'#GvO9lQWO'#GxO]QYO'#GzO9lQWO'#G|O9lQWO'#HPO9qQWO'#HVO9vQ!LZO'#HZO)rQYO'#H]O:RQ!LZO'#H_O:^Q!LZO'#HaO5RQ!LYO'#HcO)rQYO'#IjOOOS'#Hh'#HhO:iOSO,59mOOQ!LS,59m,59mO<zQbO'#CgO=UQYO'#HiO=cQWO'#IlO?bQbO'#IlO'^QYO'#IlO?iQWO,59rO@PQ&jO'#D]O@xQWO'#ETOAVQWO'#IvOAbQWO'#IuOAjQWO,5:qOAoQWO'#ItOAvQWO'#DtO5`Q#tO'#EROBUQWO'#EROBaQ`O'#EwOOQ!LS,59},59}OBiQYO,59}ODgQ!LdO,5:XOETQWO,5:_OEnQ!LYO'#IsO6jQWO'#IrOEuQWO'#IrOE}QWO,5:pOFSQWO'#IrOFbQYO,5:nOH_QWO'#EPOIfQWO,5:nOJrQWO'#DgOJyQYO'#DlOKTQ&jO,5:wO)rQYO,5:wOOQQ'#Eh'#EhOOQQ'#Ej'#EjO)rQYO,5:xO)rQYO,5:xO)rQYO,5:xO)rQYO,5:xO)rQYO,5:xO)rQYO,5:xO)rQYO,5:xO)rQYO,5:xO)rQYO,5:xO)rQYO,5:xO)rQYO,5:xOOQQ'#En'#EnOKYQYO,5;XOOQ!LS,5;^,5;^OOQ!LS,5;_,5;_OMVQWO,5;_OOQ!LS,5;`,5;`O)rQYO'#HsOM[Q!LYO,5;yOH_QWO,5:xO)rQYO,5;[ONXQpO'#IzOMvQpO'#IzON`QpO'#IzONqQpO,5;gOOQO,5;q,5;qO!!|QYO'#FXOOOO'#Hr'#HrO3_O!bO,5;dO!#TQpO'#FZOOQ!LS,5;d,5;dO!#qQ,UO'#CqOOQ!LS'#Ct'#CtO!$UQWO'#CtO!$lQ#tO,5;vO!$sQWO,5;xO!%|QWO'#FhO!&ZQWO'#FiO!&`QWO'#FmO!'bQ&jO'#FqO!(TQ,UO'#IeOOQ!LS'#Ie'#IeO!(_QWO'#IdO!(mQWO'#IcOOQ!LS'#Cr'#CrOOQ!LS'#Cx'#CxO!(uQWO'#CzOIkQWO'#F`OIkQWO'#FbO!(zQWO'#FdOIaQWO'#FeO!)PQWO'#FkOIkQWO'#FpO!)UQWO'#EUO!)mQWO,5;wO]QYO,5>POOQQ'#I_'#I_OOQQ,5>Q,5>QOOQQ-E;e-E;eO!+iQ!LdO,5:POOQ!LQ'#Co'#CoO!,YQ#tO,5<lOOQO'#Ce'#CeO!,kQWO'#CpO!,sQ!LYO'#I`O4wQWO'#I`O9qQWO,59WO!-RQpO,59WO!-ZQ#tO,59WO5`Q#tO,59WO!-fQWO,5:nO!-nQWO'#GoO!-vQWO'#JVO!.OQYO,5;aOKTQ&jO,5;cO!/{QWO,5=YO!0QQWO,5=YO!0VQWO,5=YO5RQ!LYO,5=YO5ZQWO,5<lO!0eQWO'#EVO!0vQ&jO'#EWOOQ!LQ'#It'#ItO!1XQ!LYO'#JSO5RQ!LYO,5<pO7TQWO,5<wOOQO'#Cq'#CqO!1dQpO,5<tO!1lQ#tO,5<uO!1wQWO,5<wO!1|Q`O,5<zO9qQWO'#GeO5ZQWO'#GgO!2UQWO'#GgO5`Q#tO'#GjO!2ZQWO'#GjOOQQ,5<},5<}O!2`QWO'#GkO!2hQWO'#ClO!2mQWO,58}O!2wQWO,58}O!4vQYO,58}OOQQ,58},58}O!5TQ!LYO,58}O)rQYO,58}O!5`QYO'#GrOOQQ'#Gs'#GsOOQQ'#Gt'#GtO]QYO,5=[O!5pQWO,5=[O)rQYO'#DsO]QYO,5=bO]QYO,5=dO!5uQWO,5=fO]QYO,5=hO!5zQWO,5=kO!6PQYO,5=qOOQQ,5=u,5=uO)rQYO,5=uO5RQ!LYO,5=wOOQQ,5=y,5=yO!9}QWO,5=yOOQQ,5={,5={O!9}QWO,5={OOQQ,5=},5=}O!:SQ`O,5?UOOOS-E;f-E;fOOQ!LS1G/X1G/XO!:XQbO,5>TO)rQYO,5>TOOQO-E;g-E;gO!:cQWO,5?WO!:kQbO,5?WO!:rQWO,5?aOOQ!LS1G/^1G/^O!:zQpO'#DPOOQO'#In'#InO)rQYO'#InO!;iQpO'#InO!<WQpO'#D^O!<iQ&jO'#D^O!>qQYO'#D^O!>xQWO'#ImO!?QQWO,59wO!?VQWO'#EXO!?eQWO'#IwO!?mQWO,5:rO!@TQ&jO'#D^O)rQYO,5?bO!@_QWO'#HnO!:rQWO,5?aOOQ!LQ1G0]1G0]O!AeQ&jO'#DwOOQ!LS,5:`,5:`O)rQYO,5:`OH_QWO,5:`O!AlQWO,5:`O9qQWO,5:mO!-RQpO,5:mO!-ZQ#tO,5:mO5`Q#tO,5:mOOQ!LS1G/i1G/iOOQ!LS1G/y1G/yOOQ!LQ'#EO'#EOO)rQYO,5?_O!AwQ!LYO,5?_O!BYQ!LYO,5?_O!BaQWO,5?^O!BiQWO'#HpO!BaQWO,5?^OOQ!LQ1G0[1G0[O6jQWO,5?^OOQ!LS1G0Y1G0YO!CTQ!LbO,5:kOOQ!LS'#Fg'#FgO!CqQ!LdO'#IeOFbQYO1G0YO!EpQ#tO'#IoO!EzQWO,5:RO!FPQbO'#IpO)rQYO'#IpO!FZQWO,5:WOOQ!LS'#DP'#DPOOQ!LS1G0c1G0cO!F`QWO1G0cO!HqQ!LdO1G0dO!HxQ!LdO1G0dO!K]Q!LdO1G0dO!KdQ!LdO1G0dO!MkQ!LdO1G0dO!NOQ!LdO1G0dO#!oQ!LdO1G0dO#!vQ!LdO1G0dO#%ZQ!LdO1G0dO#%bQ!LdO1G0dO#'VQ!LdO1G0dO#*PQ7^O'#CgO#+zQ7^O1G0sO#-xQ7^O'#IhOOQ!LS1G0y1G0yO#.SQ!LdO,5>_OOQ!LS-E;q-E;qO#.sQ!LdO1G0dO#0uQ!LdO1G0vO#1fQpO,5;iO#1kQpO,5;jO#1pQpO'#FQO#2UQWO'#FPOOQO'#I{'#I{OOQO'#Hq'#HqO#2ZQpO1G1ROOQ!LS1G1R1G1ROOQO1G1[1G1[O#2iQ7^O'#IgO#4cQWO,5;sO! PQYO,5;sOOOO-E;p-E;pOOQ!LS1G1O1G1OOOQ!LS,5;u,5;uO#4hQpO,5;uOOQ!LS,59`,59`O)rQYO1G1bOKTQ&jO'#HuO#4mQWO,5<ZOOQ!LS,5<W,5<WOOQO'#F{'#F{OIkQWO,5<fOOQO'#F}'#F}OIkQWO,5<hOIkQWO,5<jOOQO1G1d1G1dO#4xQ`O'#CoO#5]Q`O,5<SO#5dQWO'#JOO5ZQWO'#JOO#5rQWO,5<UOIkQWO,5<TO#5wQ`O'#FgO#6UQ`O'#JPO#6`QWO'#JPOH_QWO'#JPO#6eQWO,5<XOOQ!LQ'#Db'#DbO#6jQWO'#FjO#6uQpO'#FrO!']Q&jO'#FrO!']Q&jO'#FtO#7WQWO'#FuO!)PQWO'#FxOOQO'#Hw'#HwO#7]Q&jO,5<]OOQ!LS,5<],5<]O#7dQ&jO'#FrO#7rQ&jO'#FsO#7zQ&jO'#FsOOQ!LS,5<k,5<kOIkQWO,5?OOIkQWO,5?OO#8PQWO'#HxO#8[QWO,5>}OOQ!LS'#Cg'#CgO#9OQ#tO,59fOOQ!LS,59f,59fO#9qQ#tO,5;zO#:dQ#tO,5;|O#:nQWO,5<OOOQ!LS,5<P,5<PO#:sQWO,5<VO#:xQ#tO,5<[OFbQYO1G1cO#;YQWO1G1cOOQQ1G3k1G3kOOQ!LS1G/k1G/kOMVQWO1G/kOOQQ1G2W1G2WOH_QWO1G2WO)rQYO1G2WOH_QWO1G2WO#;_QWO1G2WO#;mQWO,59[O#<sQWO'#EPOOQ!LQ,5>z,5>zO#<}Q!LYO,5>zOOQQ1G.r1G.rO9qQWO1G.rO!-RQpO1G.rO!-ZQ#tO1G.rO#=]QWO1G0YO#=bQWO'#CgO#=mQWO'#JWO#=uQWO,5=ZO#=zQWO'#JWO#>PQWO'#IQO#>_QWO,5?qO#@ZQbO1G0{OOQ!LS1G0}1G0}O5ZQWO1G2tO#@bQWO1G2tO#@gQWO1G2tO#@lQWO1G2tOOQQ1G2t1G2tO#@qQ#tO1G2WO6jQWO'#IuO6jQWO'#EXO6jQWO'#HzO#ASQ!LYO,5?nOOQQ1G2[1G2[O!1wQWO1G2cOH_QWO1G2`O#A_QWO1G2`OOQQ1G2a1G2aOH_QWO1G2aO#AdQWO1G2aO#AlQ&jO'#G_OOQQ1G2c1G2cO!']Q&jO'#H|O!1|Q`O1G2fOOQQ1G2f1G2fOOQQ,5=P,5=PO#AtQ#tO,5=RO5ZQWO,5=RO#7WQWO,5=UO4wQWO,5=UO!-RQpO,5=UO!-ZQ#tO,5=UO5`Q#tO,5=UO#BVQWO'#JUO#BbQWO,5=VOOQQ1G.i1G.iO#BgQ!LYO1G.iO#BrQWO1G.iO!(uQWO1G.iO5RQ!LYO1G.iO#BwQbO,5?sO#CRQWO,5?sO#C^QYO,5=^O#CeQWO,5=^O6jQWO,5?sOOQQ1G2v1G2vO]QYO1G2vOOQQ1G2|1G2|OOQQ1G3O1G3OO9lQWO1G3QO#CjQYO1G3SO#GbQYO'#HROOQQ1G3V1G3VO9qQWO1G3]O#GoQWO1G3]O5RQ!LYO1G3aOOQQ1G3c1G3cOOQ!LQ'#Fn'#FnO5RQ!LYO1G3eO5RQ!LYO1G3gOOOS1G4p1G4pO#IkQ!LdO,5;yO#JOQbO1G3oO#JYQWO1G4rO#JbQWO1G4{O#JjQWO,5?YO! PQYO,5:sO6jQWO,5:sO9qQWO,59xO! PQYO,59xO!-RQpO,59xO#LcQ7^O,59xOOQO,5:s,5:sO#LmQ&jO'#HjO#MTQWO,5?XOOQ!LS1G/c1G/cO#M]Q&jO'#HoO#MqQWO,5?cOOQ!LQ1G0^1G0^O!<iQ&jO,59xO#MyQbO1G4|OOQO,5>Y,5>YO6jQWO,5>YOOQO-E;l-E;lO#NTQ!LrO'#D|O!']Q&jO'#DxOOQO'#Hm'#HmO#NoQ&jO,5:cOOQ!LS,5:c,5:cO#NvQ&jO'#DxO$ UQ&jO'#D|O$ jQ&jO'#D|O!']Q&jO'#D|O$ tQWO1G/zO$ yQ`O1G/zOOQ!LS1G/z1G/zO)rQYO1G/zOH_QWO1G/zOOQ!LS1G0X1G0XO9qQWO1G0XO!-RQpO1G0XO!-ZQ#tO1G0XO$!QQ!LdO1G4yO)rQYO1G4yO$!bQ!LYO1G4yO$!sQWO1G4xO6jQWO,5>[OOQO,5>[,5>[O$!{QWO,5>[OOQO-E;n-E;nO$!sQWO1G4xOOQ!LS,5;y,5;yO$#ZQ!LdO,59fO$%YQ!LdO,5;zO$'[Q!LdO,5;|O$)^Q!LdO,5<[OOQ!LS7+%t7+%tO$+fQWO'#HkO$+pQWO,5?ZOOQ!LS1G/m1G/mO$+xQYO'#HlO$,VQWO,5?[O$,_QbO,5?[OOQ!LS1G/r1G/rOOQ!LS7+%}7+%}O$,iQ7^O,5:XO)rQYO7+&_O$,sQ7^O,5:POOQO1G1T1G1TOOQO1G1U1G1UO$,zQMhO,5;lO! PQYO,5;kOOQO-E;o-E;oOOQ!LS7+&m7+&mOOQO7+&v7+&vOOOO1G1_1G1_O$-VQWO1G1_OOQ!LS1G1a1G1aO$-[Q!LdO7+&|OOQ!LS,5>a,5>aO$-{QWO,5>aOOQ!LS1G1u1G1uP$.QQWO'#HuPOQ!LS-E;s-E;sO$.qQ#tO1G2QO$/dQ#tO1G2SO$/nQ#tO1G2UOOQ!LS1G1n1G1nO$/uQWO'#HtO$0TQWO,5?jO$0TQWO,5?jO$0]QWO,5?jO$0hQWO,5?jOOQO1G1p1G1pO$0vQ#tO1G1oO$1WQWO'#HvO$1hQWO,5?kOH_QWO,5?kO$1pQ`O,5?kOOQ!LS1G1s1G1sO5RQ!LYO,5<^O5RQ!LYO,5<_O$1zQWO,5<_O#7RQWO,5<_O!-RQpO,5<^O$2PQWO,5<`O5RQ!LYO,5<aO$1zQWO,5<dOOQO-E;u-E;uOOQ!LS1G1w1G1wO!']Q&jO,5<^O$2XQWO,5<_O!']Q&jO,5<`O!']Q&jO,5<_O$2dQ#tO1G4jO$2nQ#tO1G4jOOQO,5>d,5>dOOQO-E;v-E;vOKTQ&jO,59hO)rQYO,59hO$2{QWO1G1jOIkQWO1G1qOOQ!LS7+&}7+&}OFbQYO7+&}OOQ!LS7+%V7+%VO$3QQ`O'#JQO$ tQWO7+'rO$3[QWO7+'rO$3dQ`O7+'rOOQQ7+'r7+'rOH_QWO7+'rO)rQYO7+'rOH_QWO7+'rOOQO1G.v1G.vO$3nQ!LbO'#CgO$4OQ!LbO,5<bO$4mQWO,5<bOOQ!LQ1G4f1G4fOOQQ7+$^7+$^O9qQWO7+$^O!-RQpO7+$^OFbQYO7+%tO$4rQWO'#IPO$4}QWO,5?rOOQO1G2u1G2uO5ZQWO,5?rOOQO,5>l,5>lOOQO-E<O-E<OOOQ!LS7+&g7+&gO$5VQWO7+(`O5RQ!LYO7+(`O5ZQWO7+(`O$5[QWO7+(`O$5aQWO7+'rOOQ!LQ,5>f,5>fOOQ!LQ-E;x-E;xOOQQ7+'}7+'}O$5oQ!LbO7+'zOH_QWO7+'zO$5yQ`O7+'{OOQQ7+'{7+'{OH_QWO7+'{O$6QQWO'#JTO$6]QWO,5<yOOQO,5>h,5>hOOQO-E;z-E;zOOQQ7+(Q7+(QO$7SQ&jO'#GhOOQQ1G2m1G2mOH_QWO1G2mO)rQYO1G2mOH_QWO1G2mO$7ZQWO1G2mO$7iQ#tO1G2mO5RQ!LYO1G2pO#7WQWO1G2pO4wQWO1G2pO!-RQpO1G2pO!-ZQ#tO1G2pO$7zQWO'#IOO$8VQWO,5?pO$8_Q&jO,5?pOOQ!LQ1G2q1G2qOOQQ7+$T7+$TO$8dQWO7+$TO5RQ!LYO7+$TO$8iQWO7+$TO)rQYO1G5_O)rQYO1G5`O$8nQYO1G2xO$8uQWO1G2xO$8zQYO1G2xO$9RQ!LYO1G5_OOQQ7+(b7+(bO5RQ!LYO7+(lO]QYO7+(nOOQQ'#JZ'#JZOOQQ'#IR'#IRO$9]QYO,5=mOOQQ,5=m,5=mO)rQYO'#HSO$9jQWO'#HUOOQQ7+(w7+(wO$9oQYO7+(wO6jQWO7+(wOOQQ7+({7+({OOQQ7+)P7+)POOQQ7+)R7+)ROOQO1G4t1G4tO$=jQ7^O1G0_O$=tQWO1G0_OOQO1G/d1G/dO$>PQ7^O1G/dO9qQWO1G/dO! PQYO'#D^OOQO,5>U,5>UOOQO-E;h-E;hOOQO,5>Z,5>ZOOQO-E;m-E;mO!-RQpO1G/dOOQO1G3t1G3tO9qQWO,5:dOOQO,5:h,5:hO!.OQYO,5:hO$>ZQ!LYO,5:hO$>fQ!LYO,5:hO!-RQpO,5:dOOQO-E;k-E;kOOQ!LS1G/}1G/}O!']Q&jO,5:dO$>tQ!LrO,5:hO$?`Q&jO,5:dO!']Q&jO,5:hO$?nQ&jO,5:hO$@SQ!LYO,5:hOOQ!LS7+%f7+%fO$ tQWO7+%fO$ yQ`O7+%fOOQ!LS7+%s7+%sO9qQWO7+%sO!-RQpO7+%sO$@hQ!LdO7+*eO)rQYO7+*eOOQO1G3v1G3vO6jQWO1G3vO$@xQWO7+*dO$AQQ!LdO1G2QO$CSQ!LdO1G2SO$EUQ!LdO1G1oO$G^Q#tO,5>VOOQO-E;i-E;iO$GhQbO,5>WO)rQYO,5>WOOQO-E;j-E;jO$GrQWO1G4vO$ItQ7^O1G0dO$KoQ7^O1G0dO$MjQ7^O1G0dO$MqQ7^O1G0dO% `Q7^O1G0dO% sQ7^O1G0dO%#zQ7^O1G0dO%$RQ7^O1G0dO%%|Q7^O1G0dO%&TQ7^O1G0dO%'xQ7^O1G0dO%(VQ!LdO<<IyO%(vQ7^O1G0dO%*fQ7^O'#IeO%,cQ7^O1G0vO! PQYO'#FSOOQO'#I|'#I|OOQO1G1W1G1WO%,jQWO1G1VO%,oQ7^O,5>_OOOO7+&y7+&yOOQ!LS1G3{1G3{OIkQWO7+'pO%,|QWO,5>`O5ZQWO,5>`OOQO-E;r-E;rO%-[QWO1G5UO%-[QWO1G5UO%-dQWO1G5UO%-oQ`O,5>bO%-yQWO,5>bOH_QWO,5>bOOQO-E;t-E;tO%.OQ`O1G5VO%.YQWO1G5VOOQO1G1x1G1xOOQO1G1y1G1yO5RQ!LYO1G1yO$1zQWO1G1yO5RQ!LYO1G1xO%.bQWO1G1zOH_QWO1G1zOOQO1G1{1G1{O5RQ!LYO1G2OO!-RQpO1G1xO#7RQWO1G1yO%.gQWO1G1zO%.oQWO1G1yOIkQWO7+*UOOQ!LS1G/S1G/SO%.zQWO1G/SOOQ!LS7+'U7+'UO%/PQ#tO7+']OOQ!LS<<Ji<<JiOH_QWO'#HyO%/aQWO,5?lOOQQ<<K^<<K^OH_QWO<<K^O$ tQWO<<K^O%/iQWO<<K^O%/qQ`O<<K^OH_QWO1G1|OOQQ<<Gx<<GxO9qQWO<<GxOOQ!LS<<I`<<I`OOQO,5>k,5>kO%/{QWO,5>kOOQO-E;}-E;}O%0QQWO1G5^O%0YQWO<<KzOOQQ<<Kz<<KzO%0_QWO<<KzO5RQ!LYO<<KzO)rQYO<<K^OH_QWO<<K^OOQQ<<Kf<<KfO$5oQ!LbO<<KfOOQQ<<Kg<<KgO$5yQ`O<<KgO%0dQ&jO'#H{O%0oQWO,5?oO! PQYO,5?oOOQQ1G2e1G2eO#NTQ!LrO'#D|O!']Q&jO'#GiOOQO'#H}'#H}O%0wQ&jO,5=SOOQQ,5=S,5=SO#7rQ&jO'#D|O%1OQ&jO'#D|O%1dQ&jO'#D|O%1nQ&jO'#GiO%1|QWO7+(XO%2RQWO7+(XO%2ZQ`O7+(XOOQQ7+(X7+(XOH_QWO7+(XO)rQYO7+(XOH_QWO7+(XO%2eQWO7+(XOOQQ7+([7+([O5RQ!LYO7+([O#7WQWO7+([O4wQWO7+([O!-RQpO7+([O%2sQWO,5>jOOQO-E;|-E;|OOQO'#Gl'#GlO%3OQWO1G5[O5RQ!LYO<<GoOOQQ<<Go<<GoO%3WQWO<<GoO%3]QWO7+*yO%3bQWO7+*zOOQQ7+(d7+(dO%3gQWO7+(dO%3lQYO7+(dO%3sQWO7+(dO)rQYO7+*yO)rQYO7+*zOOQQ<<LW<<LWOOQQ<<LY<<LYOOQQ-E<P-E<POOQQ1G3X1G3XO%3xQWO,5=nOOQQ,5=p,5=pO9qQWO<<LcO%3}QWO<<LcO! PQYO7+%yOOQO7+%O7+%OO%4SQ7^O1G4|O9qQWO7+%OOOQO1G0O1G0OO%4^Q!LdO1G0SOOQO1G0S1G0SO!.OQYO1G0SO%4hQ!LYO1G0SO9qQWO1G0OO!-RQpO1G0OO%4sQ!LYO1G0SO!']Q&jO1G0OO%5RQ!LYO1G0SO%5gQ!LrO1G0SO%5qQ&jO1G0OO!']Q&jO1G0SOOQ!LS<<IQ<<IQOOQ!LS<<I_<<I_O9qQWO<<I_O%6PQ!LdO<<NPOOQO7+)b7+)bO%6aQ!LdO7+']O%8iQbO1G3rO%8sQ7^O,5;yO%8}Q7^O,59fO%:zQ7^O,5;zO%<wQ7^O,5;|O%>tQ7^O,5<[O%@dQ7^O7+&|O%@kQWO,5;nOOQO7+&q7+&qO%@pQ#tO<<K[OOQO1G3z1G3zO%AQQWO1G3zO%A]QWO1G3zO%AkQWO7+*pO%AkQWO7+*pOH_QWO1G3|O%AsQ`O1G3|O%A}QWO7+*qOOQO7+'e7+'eO5RQ!LYO7+'eOOQO7+'d7+'dO$1zQWO7+'fO%BVQ`O7+'fOOQO7+'j7+'jO5RQ!LYO7+'dO$1zQWO7+'eO%B^QWO7+'fOH_QWO7+'fO#7RQWO7+'eO%BcQ#tO<<MpOOQ!LS7+$n7+$nO%BmQ`O,5>eOOQO-E;w-E;wO$ tQWOAN@xOOQQAN@xAN@xOH_QWOAN@xO%BwQ!LbO7+'hOOQQAN=dAN=dO5ZQWO1G4VO%CUQWO7+*xO5RQ!LYOANAfO%C^QWOANAfOOQQANAfANAfO%CcQWOAN@xO%CkQ`OAN@xOOQQANAQANAQOOQQANARANARO%CuQWO,5>gOOQO-E;y-E;yO%DQQ7^O1G5ZO#7WQWO,5=TO4wQWO,5=TO!-RQpO,5=TOOQO-E;{-E;{OOQQ1G2n1G2nO$>tQ!LrO,5:hO!']Q&jO,5=TO%D[Q&jO,5=TO%DjQ&jO,5:hOOQQ<<Ks<<KsOH_QWO<<KsO%1|QWO<<KsO%EOQWO<<KsO%EWQ`O<<KsO)rQYO<<KsOH_QWO<<KsOOQQ<<Kv<<KvO5RQ!LYO<<KvO#7WQWO<<KvO4wQWO<<KvO%EbQ&jO1G4UO%EgQWO7+*vOOQQAN=ZAN=ZO5RQ!LYOAN=ZOOQQ<<Ne<<NeOOQQ<<Nf<<NfOOQQ<<LO<<LOO%EoQWO<<LOO%EtQYO<<LOO%E{QWO<<NeO%FQQWO<<NfOOQQ1G3Y1G3YOOQQANA}ANA}O9qQWOANA}O%FVQ7^O<<IeOOQO<<Hj<<HjOOQO7+%n7+%nO%4^Q!LdO7+%nO!.OQYO7+%nOOQO7+%j7+%jO9qQWO7+%jO%FaQ!LYO7+%nO!-RQpO7+%jO%FlQ!LYO7+%nO!']Q&jO7+%jO%FzQ!LYO7+%nOOQ!LSAN>yAN>yO%G`Q!LdO<<K[O%IhQ7^O<<IyO%IoQ7^O1G1oO%K_Q7^O1G2QO%M[Q7^O1G2SOOQO1G1Y1G1YOOQO7+)f7+)fO& XQWO7+)fO& dQWO<<N[O& lQ`O7+)hOOQO<<KP<<KPO5RQ!LYO<<KQO$1zQWO<<KQOOQO<<KO<<KOO5RQ!LYO<<KPO& vQ`O<<KQO$1zQWO<<KPOOQQG26dG26dO$ tQWOG26dOOQO7+)q7+)qOOQQG27QG27QO5RQ!LYOG27QOH_QWOG26dO! PQYO1G4RO& }QWO7+*uO5RQ!LYO1G2oO#7WQWO1G2oO4wQWO1G2oO!-RQpO1G2oO!']Q&jO1G2oO%5gQ!LrO1G0SO&!VQ&jO1G2oO%1|QWOANA_OOQQANA_ANA_OH_QWOANA_O&!eQWOANA_O&!mQ`OANA_OOQQANAbANAbO5RQ!LYOANAbO#7WQWOANAbOOQO'#Gm'#GmOOQO7+)p7+)pOOQQG22uG22uOOQQANAjANAjO&!wQWOANAjOOQQANDPANDPOOQQANDQANDQO&!|QYOG27iOOQO<<IY<<IYO%4^Q!LdO<<IYOOQO<<IU<<IUO!.OQYO<<IYO9qQWO<<IUO&&wQ!LYO<<IYO!-RQpO<<IUO&'SQ!LYO<<IYO&'bQ7^O7+']OOQO<<MQ<<MQOOQOAN@lAN@lO5RQ!LYOAN@lOOQOAN@kAN@kO$1zQWOAN@lO5RQ!LYOAN@kOOQQLD,OLD,OOOQQLD,lLD,lO$ tQWOLD,OO&)QQ7^O7+)mOOQO7+(Z7+(ZO5RQ!LYO7+(ZO#7WQWO7+(ZO4wQWO7+(ZO!-RQpO7+(ZO!']Q&jO7+(ZOOQQG26yG26yO%1|QWOG26yOH_QWOG26yOOQQG26|G26|O5RQ!LYOG26|OOQQG27UG27UO9qQWOLD-TOOQOAN>tAN>tO%4^Q!LdOAN>tOOQOAN>pAN>pO!.OQYOAN>tO9qQWOAN>pO&)[Q!LYOAN>tO&)gQ7^O<<K[OOQOG26WG26WO5RQ!LYOG26WOOQOG26VG26VOOQQ!$( j!$( jOOQO<<Ku<<KuO5RQ!LYO<<KuO#7WQWO<<KuO4wQWO<<KuO!-RQpO<<KuOOQQLD,eLD,eO%1|QWOLD,eOOQQLD,hLD,hOOQQ!$(!o!$(!oOOQOG24`G24`O%4^Q!LdOG24`OOQOG24[G24[O!.OQYOG24`OOQOLD+rLD+rOOQOANAaANAaO5RQ!LYOANAaO#7WQWOANAaO4wQWOANAaOOQQ!$(!P!$(!POOQOLD)zLD)zO%4^Q!LdOLD)zOOQOG26{G26{O5RQ!LYOG26{O#7WQWOG26{OOQO!$'Mf!$'MfOOQOLD,gLD,gO5RQ!LYOLD,gOOQO!$(!R!$(!ROKYQYO'#DmO&+VQ!LdO'#IgO&+jQ!LdO'#IgOKYQYO'#DeO&+qQ!LdO'#CgO&,[QbO'#CgO&,lQYO,5:nOFbQYO,5:nOKYQYO,5:xOKYQYO,5:xOKYQYO,5:xOKYQYO,5:xOKYQYO,5:xOKYQYO,5:xOKYQYO,5:xOKYQYO,5:xOKYQYO,5:xOKYQYO,5:xOKYQYO,5:xO! PQYO'#HsO&.iQWO,5;yO&.qQWO,5:xOKYQYO,5;[O!(uQWO'#CzO!(uQWO'#CzOH_QWO'#F`O&.qQWO'#F`OH_QWO'#FbO&.qQWO'#FbOH_QWO'#FpO&.qQWO'#FpO! PQYO,5?bO&,lQYO1G0YOFbQYO1G0YO&/xQ7^O'#CgO&0SQ7^O'#IgO&0^Q7^O'#IgOKYQYO1G1bOH_QWO,5<fO&.qQWO,5<fOH_QWO,5<hO&.qQWO,5<hOH_QWO,5<TO&.qQWO,5<TO&,lQYO1G1cOFbQYO1G1cO&,lQYO1G1cO&,lQYO1G0YOKYQYO7+&_OH_QWO1G1qO&.qQWO1G1qO&,lQYO7+&}OFbQYO7+&}O&,lQYO7+&}O&,lQYO7+%tOFbQYO7+%tO&,lQYO7+%tOH_QWO7+'pO&.qQWO7+'pO&0eQWO'#ESO&0jQWO'#ESO&0oQWO'#ESO&0wQWO'#ESO&1PQWO'#EpO!.OQYO'#DeO!.OQYO'#DmO&1UQWO'#IvO&1aQWO'#ItO&1lQWO,5:nO&1qQWO,5:nO!.OQYO,5:xO!.OQYO,5:xO!.OQYO,5:xO!.OQYO,5:xO!.OQYO,5:xO!.OQYO,5:xO!.OQYO,5:xO!.OQYO,5:xO!.OQYO,5:xO!.OQYO,5:xO!.OQYO,5:xO!.OQYO,5;[O&1vQ#tO,5;vO&1}QWO'#FiO&2SQWO'#FiO&2XQWO,5;wO&2aQWO,5;wO&2iQWO,5;wO&2qQ!LdO,5:PO&3OQWO,5:nO&3TQWO,5:nO&3]QWO,5:nO&3eQWO,5:nO&5aQ!LdO1G0dO&5nQ!LdO1G0dO&7uQ!LdO1G0dO&7|Q!LdO1G0dO&9}Q!LdO1G0dO&:UQ!LdO1G0dO&<VQ!LdO1G0dO&<^Q!LdO1G0dO&>_Q!LdO1G0dO&>fQ!LdO1G0dO&>mQ7^O1G0sO&>tQ!LdO1G0vO!.OQYO1G1bO&?RQWO,5<VO&?WQWO,5<VO&?]QWO1G1cO&?bQWO1G1cO&?gQWO1G1cO&?lQWO1G0YO&?qQWO1G0YO&?vQWO1G0YO!.OQYO7+&_O&?{Q!LdO7+&|O&@YQ#tO1G2UO&@aQ#tO1G2UO&@hQ!LdO<<IyO&,lQYO,5:nO&BiQ!LdO'#IhO&B|QWO'#EpO3mQWO'#F^O4wQWO'#F]O4wQWO'#F]O4wQWO'#F]OBUQWO'#EROBUQWO'#EROBUQWO'#EROKYQYO,5;XO&CRQ#tO,5;vO!)PQWO'#FkO!)PQWO'#FkO&CYQ7^O1G0sOIkQWO,5<jOIkQWO,5<jO! PQYO'#DmO! PQYO'#DeO! PQYO,5:xO! PQYO,5:xO! PQYO,5:xO! PQYO,5:xO! PQYO,5:xO! PQYO,5:xO! PQYO,5:xO! PQYO,5:xO! PQYO,5:xO! PQYO,5:xO! PQYO,5:xO! PQYO,5;[O! PQYO1G1bO! PQYO7+&_O&CaQWO'#ESO&CfQWO'#ESO&CnQWO'#EpO&CsQ#tO,5;vO&CzQ7^O1G0sO3mQWO'#F^OKYQYO,5;XO&DRQ7^O'#IhO&DcQ7^O,5:PO&DpQ7^O1G0dO&FqQ7^O1G0dO&FxQ7^O1G0dO&HmQ7^O1G0dO&IQQ7^O1G0dO&K_Q7^O1G0dO&KfQ7^O1G0dO&MgQ7^O1G0dO&MnQ7^O1G0dO' cQ7^O1G0dO' vQ7^O1G0vO'!TQ7^O7+&|O'!bQ7^O<<IyO3mQWO'#F^OKYQYO,5;X",
    stateData: "'#b~O&}OSSOSTOS~OPTOQTOWwO]bO^gOamOblOgbOiTOjbOkbOmTOoTOtROvbOwbOxbO!OSO!YjO!_UO!bTO!cTO!dTO!eTO!fTO!ikO#jnO#n]O$uoO$wrO$ypO$zpO${qO%OsO%QtO%TuO%UuO%WvO%exO%kyO%mzO%o{O%q|O%t}O%z!OO&O!PO&Q!QO&S!RO&U!SO&W!TO'PPO']QO'q`O~OPZXYZX^ZXiZXqZXrZXtZX|ZX![ZX!]ZX!_ZX!eZX!tZX#OcX#RZX#SZX#TZX#UZX#VZX#WZX#XZX#YZX#ZZX#]ZX#_ZX#`ZX#eZX&{ZX']ZX'eZX'lZX'mZX~O!W$bX~P$tO&x!VO&y!UO&z!XO~OPTOQTO]bOa!hOb!gOgbOiTOjbOkbOmTOoTOtROvbOwbOxbO!O!`O!YjO!_UO!bTO!cTO!dTO!eTO!fTO!i!fO#j!iO#n]O'P!YO']QO'q`O~O{!^O|!ZOy'`Py'iP~P'^O}!jO~P]OPTOQTO]bOa!hOb!gOgbOiTOjbOkbOmTOoTOtROvbOwbOxbO!O!`O!YjO!_UO!bTO!cTO!dTO!eTO!fTO!i!fO#j!iO#n]O'P8ZO']QO'q`O~OPTOQTO]bOa!hOb!gOgbOiTOjbOkbOmTOoTOtROvbOwbOxbO!O!`O!YjO!_UO!bTO!cTO!dTO!eTO!fTO!i!fO#j!iO#n]O']QO'q`O~O{!oO!|!rO!}!oO'P8[O!^'fP~P+oO#O!sO~O!W!tO#O!sO~OP#ZOY#aOi#OOq!xOr!xOt!yO|#_O![#QO!]!vO!_!wO!e#ZO#R!|O#S!}O#T!}O#U!}O#V#PO#W#QO#X#QO#Y#QO#Z#RO#]#TO#_#VO#`#WO']QO'e#XO'l!zO'm!{O^'ZX&{'ZX!^'ZXy'ZX!O'ZX$v'ZX!W'ZX~O!t#bO#e#bOP'[XY'[X^'[Xi'[Xq'[Xr'[Xt'[X|'[X!['[X!]'[X!_'[X!e'[X#R'[X#S'[X#T'[X#U'[X#V'[X#W'[X#Y'[X#Z'[X#]'[X#_'[X#`'[X']'[X'e'[X'l'[X'm'[X~O#X'[X&{'[Xy'[X!^'[X'_'[X!O'[X$v'[X!W'[X~P0gO!t#bO~O#p#cO#w#gO~O!O#hO#n]O#z#iO#|#kO~O]#nOg#zOi#oOj#nOk#nOm#{Oo#|Ot#tO!O#uO!Y$RO!_#rO!}$SO#j$PO$T#}O$V$OO$Y$QO'P#mO'T'VP~O!_$TO~O!W$VO~O^$WO&{$WO~O'P$[O~O!_$TO'P$[O'Q$^O'U$_O~Ob$eO!_$TO'P$[O~O]$nOq$jO!O$gO!_$iO$w$mO'P$[O'Q$^O['yP~O!i$oO~Ot$pO!O$qO'P$[O~Ot$pO!O$qO%Q$uO'P$[O~O'P$vO~O$wrO$ypO$zpO${qO%OsO%QtO%TuO%UuO~Oa%POb%OO!i$|O$u$}O%Y${O~P7YOa%SOblO!O%RO!ikO$uoO$ypO$zpO${qO%OsO%QtO%TuO%UuO%WvO~O_%VO!t%YO$w%TO'Q$^O~P8XO!_%ZO!b%_O~O!_%`O~O!OSO~O^$WO&w%hO&{$WO~O^$WO&w%kO&{$WO~O^$WO&w%mO&{$WO~O&x!VO&y!UO&z%qO~OPZXYZXiZXqZXrZXtZX|ZX|cX![ZX!]ZX!_ZX!eZX!tZX!tcX#OcX#RZX#SZX#TZX#UZX#VZX#WZX#XZX#YZX#ZZX#]ZX#_ZX#`ZX#eZX']ZX'eZX'lZX'mZX~OyZXycX~P:tO{%sOy&]X|&]X~P)rO|!ZOy'`X~OP#ZOY#aOi#OOq!xOr!xOt!yO|!ZO![#QO!]!vO!_!wO!e#ZO#R!|O#S!}O#T!}O#U!}O#V#PO#W#QO#X#QO#Y#QO#Z#RO#]#TO#_#VO#`#WO']QO'e#XO'l!zO'm!{O~Oy'`X~P=kOy%xO~Ot%{O!R&VO!S&OO!T&OO'Q$^O~O]%|Oj%|O{&PO'Y%yO}'aP}'kP~P?nOy'hX|'hX!W'hX!^'hX'e'hX~O!t'hX#O!wX}'hX~P@gO!t&WOy'jX|'jX~O|&XOy'iX~Oy&ZO~O!t#bO~P@gOR&_O!O&[O!j&^O'P$[O~Ob&dO!_$TO'P$[O~Oq$jO!_$iO~O}&eO~P]Oq!xOr!xOt!yO!]!vO!_!wO']QOP!aaY!aai!aa|!aa![!aa!e!aa#R!aa#S!aa#T!aa#U!aa#V!aa#W!aa#X!aa#Y!aa#Z!aa#]!aa#_!aa#`!aa'e!aa'l!aa'm!aa~O^!aa&{!aay!aa!^!aa'_!aa!O!aa$v!aa!W!aa~PBpO!^&fO~O!W!tO!t&hO'e&gO|'gX^'gX&{'gX~O!^'gX~PEYO|&lO!^'fX~O!^&nO~Ot$pO!O$qO!}&oO'P$[O~OPTOQTO]bOa!hOb!gOgbOiTOjbOkbOmTOoTOtROvbOwbOxbO!OSO!YjO!_UO!bTO!cTO!dTO!eTO!fTO!i!fO#j!iO#n]O'P8ZO']QO'q`O~O]#nOg#zOi#oOj#nOk#nOm#{Oo8nOt#tO!O#uO!Y;OO!_#rO!}8tO#j$PO$T8pO$V8rO$Y$QO'P&rO~O#O&tO~O]#nOg#zOi#oOj#nOk#nOm#{Oo#|Ot#tO!O#uO!Y$RO!_#rO!}$SO#j$PO$T#}O$V$OO$Y$QO'P&rO~O'T'cP~PIkO{&xO!^'dP~P)rO'Y&zO~OP8VOQ8VO]bOa:yOb!gOgbOi8VOjbOkbOm8VOo8VOtROvbOwbOxbO!O!`O!Y8YO!_UO!b8VO!c8VO!d8VO!e8VO!f8VO!i!fO#j!iO#n]O'P'YO']QO'q:uO~O!_!wO~O|#_O^$Ra&{$Ra!^$Ray$Ra!O$Ra$v$Ra!W$Ra~O!W'bO!O'nX#m'nX#p'nX#w'nX~Oq'cO~PMvOq'cO!O'nX#m'nX#p'nX#w'nX~O!O'eO#m'iO#p'dO#w'jO~OP;TOQ;TO]bOa:{Ob!gOgbOi;TOjbOkbOm;TOo;TOtROvbOwbOxbO!O!`O!Y;UO!_UO!b;TO!c;TO!d;TO!e;TO!f;TO!i!fO#j!iO#n]O'P'YO']QO'q;{O~O{'mO~P! PO#p#cO#w'pO~Oq$ZXt$ZX!]$ZX'e$ZX'l$ZX'm$ZX~OReX|eX!teX'TeX'T$ZX~P!#]Oj'rO~Oq'tOt'uO'e#XO'l'wO'm'yO~O'T'sO~P!$ZO'T'|O~O]#nOg#zOi#oOj#nOk#nOm#{Oo8nOt#tO!O#uO!Y;OO!_#rO!}8tO#j$PO$T8pO$V8rO$Y$QO~O{(QO'P'}O!^'rP~P!$xO#O(SO~O{(WO'P(TOy'sP~P!$xO^(aOi(fOt(^O!R(dO!S(]O!T(]O!_(ZO!q(eO$m(`O'Q$^O'Y(YO~O}(cO~P!&mO!]!vOq'XXt'XX'e'XX'l'XX'm'XX|'XX!t'XX~O'T'XX#c'XX~P!'iOR(iO!t(hO|'WX'T'WX~O|(jO'T'VX~O'P(lO~O!_(qO~O!_(ZO~Ot$pO{!oO!O$qO!|!rO!}!oO'P$[O!^'fP~O!W!tO#O(uO~OP#ZOY#aOi#OOq!xOr!xOt!yO![#QO!]!vO!_!wO!e#ZO#R!|O#S!}O#T!}O#U!}O#V#PO#W#QO#X#QO#Y#QO#Z#RO#]#TO#_#VO#`#WO']QO'e#XO'l!zO'm!{O~O^!Xa|!Xa&{!Xay!Xa!^!Xa'_!Xa!O!Xa$v!Xa!W!Xa~P!)uOR(}O!O&[O!j(|O$v({O'U$_O~O'P$vO'T'VP~O!W)QO!O'SX^'SX&{'SX~O!_$TO'U$_O~O!_$TO'P$[O'U$_O~O!W!tO#O&tO~O'P)YO}'zP~O|)^O['yX~OP9jOQ9jO]bOa:zOb!gOgbOi9jOjbOkbOm9jOo9jOtROvbOwbOxbO!O!`O!Y9iO!_UO!b9jO!c9jO!d9jO!e9jO!f9jO!i!fO#j!iO#n]O'P8ZO']QO'q;jO~OY)bO~O[)cO~O!O$gO'P$[O'Q$^O['yP~Ot$pO{)hO!O$qO'P$[Oy'iP~O]&SOj&SO{)iO'Y&zO}'kP~O|)jO^'vX&{'vX~O!t)nO'U$_O~OR)qO!O#uO'U$_O~O!O)sO~Oq)uO!OSO~O!i)zO~Ob*PO~O'P(lO}'xP~Ob$eO~O$wrO'P$vO~P8XOY*VO[*UO~OPTOQTO]bOamOblOgbOiTOjbOkbOmTOoTOtROvbOwbOxbO!YjO!_UO!bTO!cTO!dTO!eTO!fTO!ikO#n]O$uoO']QO'q`O~O!O!`O#j!iO'P8ZO~P!3PO[*UO^$WO&{$WO~O^*ZO$y*]O$z*]O${*]O~P)rO!_%ZO~O%k*bO~O!O*dO~O%{*gO%|*fOP%yaQ%yaW%ya]%ya^%yaa%yab%yag%yai%yaj%yak%yam%yao%yat%yav%yaw%yax%ya!O%ya!Y%ya!_%ya!b%ya!c%ya!d%ya!e%ya!f%ya!i%ya#j%ya#n%ya$u%ya$w%ya$y%ya$z%ya${%ya%O%ya%Q%ya%T%ya%U%ya%W%ya%e%ya%k%ya%m%ya%o%ya%q%ya%t%ya%z%ya&O%ya&Q%ya&S%ya&U%ya&W%ya&v%ya'P%ya']%ya'q%ya}%ya%r%ya_%ya%w%ya~O'P*jO~O'_*mO~Oy&]a|&]a~P!)uO|!ZOy'`a~Oy'`a~P=kO|&XOy'ia~O|sX|!UX}sX}!UX!WsX!W!UX!_!UX!tsX'U!UX~O!W*tO!t*sO|!{X|'bX}!{X}'bX!W'bX!_'bX'U'bX~O!W*vO!_$TO'U$_O|!QX}!QX~O]%zOj%zOt%{O'Y(YO~OP;TOQ;TO]bOa:{Ob!gOgbOi;TOjbOkbOm;TOo;TOtROvbOwbOxbO!O!`O!Y;UO!_UO!b;TO!c;TO!d;TO!e;TO!f;TO!i!fO#j!iO#n]O']QO'q;{O~O'P8yO~P!<wO|*zO}'aX~O}*|O~O!W*tO!t*sO|!{X}!{X~O|*}O}'kX~O}+PO~O]%zOj%zOt%{O'Q$^O'Y(YO~O!S+QO!T+QO~P!?rOt$pO{+TO!O$qO'P$[Oy&bX|&bX~O^+XO!R+[O!S+WO!T+WO!m+^O!n+]O!o+]O!q+_O'Q$^O'Y(YO~O}+ZO~P!@sOR+dO!O&[O!j+cO~O!t+jO|'ga!^'ga^'ga&{'ga~O!W!tO~P!AwO|&lO!^'fa~Ot$pO{+mO!O$qO!|+oO!}+mO'P$[O|&dX!^&dX~O#O!sa|!sa!^!sa!t!sa!O!sa^!sa&{!say!sa~P!$ZO#O'XXP'XXY'XX^'XXi'XXr'XX!['XX!_'XX!e'XX#R'XX#S'XX#T'XX#U'XX#V'XX#W'XX#X'XX#Y'XX#Z'XX#]'XX#_'XX#`'XX&{'XX']'XX!^'XXy'XX!O'XX$v'XX'_'XX!W'XX~P!'iO|+xO'T'cX~P!$ZO'T+zO~O|+{O!^'dX~P!)uO!^,OO~Oy,PO~OP#ZOq!xOr!xOt!yO!]!vO!_!wO!e#ZO']QOY#Qi^#Qii#Qi|#Qi![#Qi#S#Qi#T#Qi#U#Qi#V#Qi#W#Qi#X#Qi#Y#Qi#Z#Qi#]#Qi#_#Qi#`#Qi&{#Qi'e#Qi'l#Qi'm#Qiy#Qi!^#Qi'_#Qi!O#Qi$v#Qi!W#Qi~O#R#Qi~P!FeO#R!|O~P!FeOP#ZOq!xOr!xOt!yO!]!vO!_!wO!e#ZO#R!|O#S!}O#T!}O#U!}O']QOY#Qi^#Qi|#Qi![#Qi#V#Qi#W#Qi#X#Qi#Y#Qi#Z#Qi#]#Qi#_#Qi#`#Qi&{#Qi'e#Qi'l#Qi'm#Qiy#Qi!^#Qi'_#Qi!O#Qi$v#Qi!W#Qi~Oi#Qi~P!IPOi#OO~P!IPOP#ZOi#OOq!xOr!xOt!yO!]!vO!_!wO!e#ZO#R!|O#S!}O#T!}O#U!}O#V#PO']QO^#Qi|#Qi#Z#Qi#]#Qi#_#Qi#`#Qi&{#Qi'e#Qi'l#Qi'm#Qiy#Qi!^#Qi'_#Qi!O#Qi$v#Qi!W#Qi~OY#Qi![#Qi#W#Qi#X#Qi#Y#Qi~P!KkOY#aO![#QO#W#QO#X#QO#Y#QO~P!KkOP#ZOY#aOi#OOq!xOr!xOt!yO![#QO!]!vO!_!wO!e#ZO#R!|O#S!}O#T!}O#U!}O#V#PO#W#QO#X#QO#Y#QO#Z#RO']QO^#Qi|#Qi#]#Qi#_#Qi#`#Qi&{#Qi'e#Qi'm#Qiy#Qi!^#Qi'_#Qi!O#Qi$v#Qi!W#Qi~O'l#Qi~P!NcO'l!zO~P!NcOP#ZOY#aOi#OOq!xOr!xOt!yO![#QO!]!vO!_!wO!e#ZO#R!|O#S!}O#T!}O#U!}O#V#PO#W#QO#X#QO#Y#QO#Z#RO#]#TO']QO'l!zO^#Qi|#Qi#_#Qi#`#Qi&{#Qi'e#Qiy#Qi!^#Qi'_#Qi!O#Qi$v#Qi!W#Qi~O'm#Qi~P#!}O'm!{O~P#!}OP#ZOY#aOi#OOq!xOr!xOt!yO![#QO!]!vO!_!wO!e#ZO#R!|O#S!}O#T!}O#U!}O#V#PO#W#QO#X#QO#Y#QO#Z#RO#]#TO#_#VO']QO'l!zO'm!{O~O^#Qi|#Qi#`#Qi&{#Qi'e#Qiy#Qi!^#Qi'_#Qi!O#Qi$v#Qi!W#Qi~P#%iOPZXYZXiZXqZXrZXtZX![ZX!]ZX!_ZX!eZX!tZX#OcX#RZX#SZX#TZX#UZX#VZX#WZX#XZX#YZX#ZZX#]ZX#_ZX#`ZX#eZX']ZX'eZX'lZX'mZX|ZX}ZX~O#cZX~P#'|OP#ZOY8lOi8aOq!xOr!xOt!yO![8cO!]!vO!_!wO!e#ZO#R8_O#S8`O#T8`O#U8`O#V8bO#W8cO#X8cO#Y8cO#Z8dO#]8fO#_8hO#`8iO']QO'e#XO'l!zO'm!{O~O#c,RO~P#*WOP'[XY'[Xi'[Xq'[Xr'[Xt'[X!['[X!]'[X!_'[X!e'[X#R'[X#S'[X#T'[X#U'[X#V'[X#W'[X#X'[X#Y'[X#Z'[X#]'[X#_'[X#`'[X#c'[X']'[X'e'[X'l'[X'm'[X~O!t8mO#e8mO~P#,RO^&ga|&ga&{&ga!^&ga'_&gay&ga!O&ga$v&ga!W&ga~P!)uOP#QiY#Qi^#Qii#Qir#Qi|#Qi![#Qi!]#Qi!_#Qi!e#Qi#R#Qi#S#Qi#T#Qi#U#Qi#V#Qi#W#Qi#X#Qi#Y#Qi#Z#Qi#]#Qi#_#Qi#`#Qi&{#Qi']#Qiy#Qi!^#Qi'_#Qi!O#Qi$v#Qi!W#Qi~P!$ZO^#di|#di&{#diy#di!^#di'_#di!O#di$v#di!W#di~P!)uO#p,TO~O#p,UO~O!W'bO!t,VO!O#tX#m#tX#p#tX#w#tX~O{,WO~O!O'eO#m,YO#p'dO#w,ZO~OP#ZOY8lOi;XOq!xOr!xOt!yO|8jO![;ZO!]!vO!_!wO!e#ZO#R;VO#S;WO#T;WO#U;WO#V;YO#W;ZO#X;ZO#Y;ZO#Z;[O#];^O#_;`O#`;aO']QO'e#XO'l!zO'm!{O}'ZX~O},[O~O#w,^O~O],aOj,aOy,bO~O|cX!WcX!^cX!^$ZX'ecX~P!#]O!^,hO~P!$ZO|,iO!W!tO'e&gO!^'rX~O!^,nO~Oy$ZX|$ZX!W$bX~P!#]O|,pOy'sX~P!$ZO!W,rO~Oy,tO~O{(QO'P$[O!^'rP~Oi,xO!W!tO!_$TO'U$_O'e&gO~O!W)QO~O}-OO~P!&mO!S-PO!T-PO'Q$^O'Y(YO~Ot-RO'Y(YO~O!q-SO~O'P$vO|&lX'T&lX~O|(jO'T'Va~Oq-XOr-XOt-YO'ena'lna'mna|na!tna~O'Tna#cna~P#8dOq'tOt'uO'e$Sa'l$Sa'm$Sa|$Sa!t$Sa~O'T$Sa#c$Sa~P#9YOq'tOt'uO'e$Ua'l$Ua'm$Ua|$Ua!t$Ua~O'T$Ua#c$Ua~P#9{O]-ZO~O#O-[O~O'T$da|$da#c$da!t$da~P!$ZO#O-^O~OR-gO!O&[O!j-fO$v-eO~O'T-hO~O]#nOi#oOj#nOk#nOm#{Oo8nOt#tO!O#uO!Y;OO!_#rO!}8tO#j$PO$T8pO$V8rO$Y$QO~Og-jO'P-iO~P#;rO!W)QO!O'Sa^'Sa&{'Sa~O#O-pO~OYZX|cX}cX~O|-qO}'zX~O}-sO~OY-tO~O!O$gO'P$[O[&tX|&tX~O|)^O['ya~OP#ZOY#aOi9qOq!xOr!xOt!yO![9sO!]!vO!_!wO!e#ZO#R9oO#S9pO#T9pO#U9pO#V9rO#W9sO#X9sO#Y9sO#Z9tO#]9vO#_9xO#`9yO']QO'e#XO'l!zO'm!{O~O!^-wO~P#>gO]-yO~OY-zO~O[-{O~OR-gO!O&[O!j-fO$v-eO'U$_O~O|)jO^'va&{'va~O!t.RO~OR.UO!O#uO~O'Y&zO}'wP~OR.`O!O.[O!j._O$v.^O'U$_O~OY.jO|.hO}'xX~O}.kO~O[.mO^$WO&{$WO~O].nO~O#X.pO%i.qO~P0gO!t#bO#X.pO%i.qO~O^.rO~P)rO^.tO~O%r.xOP%piQ%piW%pi]%pi^%pia%pib%pig%pii%pij%pik%pim%pio%pit%piv%piw%pix%pi!O%pi!Y%pi!_%pi!b%pi!c%pi!d%pi!e%pi!f%pi!i%pi#j%pi#n%pi$u%pi$w%pi$y%pi$z%pi${%pi%O%pi%Q%pi%T%pi%U%pi%W%pi%e%pi%k%pi%m%pi%o%pi%q%pi%t%pi%z%pi&O%pi&Q%pi&S%pi&U%pi&W%pi&v%pi'P%pi']%pi'q%pi}%pi_%pi%w%pi~O_/OO}.|O%w.}O~P]O!OSO!_/RO~OP$RaY$Rai$Raq$Rar$Rat$Ra![$Ra!]$Ra!_$Ra!e$Ra#R$Ra#S$Ra#T$Ra#U$Ra#V$Ra#W$Ra#X$Ra#Y$Ra#Z$Ra#]$Ra#_$Ra#`$Ra']$Ra'e$Ra'l$Ra'm$Ra~O|#_O'_$Ra!^$Ra^$Ra&{$Ra~P#GwOy&]i|&]i~P!)uO|!ZOy'`i~O|&XOy'ii~Oy/VO~OP#ZOY8lOi;XOq!xOr!xOt!yO![;ZO!]!vO!_!wO!e#ZO#R;VO#S;WO#T;WO#U;WO#V;YO#W;ZO#X;ZO#Y;ZO#Z;[O#];^O#_;`O#`;aO']QO'e#XO'l!zO'm!{O~O|!Qa}!Qa~P#JoO]%zOj%zO{/]O'Y(YO|&^X}&^X~P?nO|*zO}'aa~O]&SOj&SO{)iO'Y&zO|&cX}&cX~O|*}O}'ka~Oy'ji|'ji~P!)uO^$WO!W!tO!_$TO!e/hO!t/fO&{$WO'U$_O'e&gO~O}/kO~P!@sO!S/lO!T/lO'Q$^O'Y(YO~O!R/nO!S/lO!T/lO!q/oO'Q$^O'Y(YO~O!n/pO!o/pO~P$ UO!O&[O~O!O&[O~P!$ZO|'gi!^'gi^'gi&{'gi~P!)uO!t/yO|'gi!^'gi^'gi&{'gi~O|&lO!^'fi~Ot$pO!O$qO!}/{O'P$[O~O#OnaPnaYna^naina![na!]na!_na!ena#Rna#Sna#Tna#Una#Vna#Wna#Xna#Yna#Zna#]na#_na#`na&{na']na!^nayna!Ona$vna'_na!Wna~P#8dO#O$SaP$SaY$Sa^$Sai$Sar$Sa![$Sa!]$Sa!_$Sa!e$Sa#R$Sa#S$Sa#T$Sa#U$Sa#V$Sa#W$Sa#X$Sa#Y$Sa#Z$Sa#]$Sa#_$Sa#`$Sa&{$Sa']$Sa!^$Say$Sa!O$Sa$v$Sa'_$Sa!W$Sa~P#9YO#O$UaP$UaY$Ua^$Uai$Uar$Ua![$Ua!]$Ua!_$Ua!e$Ua#R$Ua#S$Ua#T$Ua#U$Ua#V$Ua#W$Ua#X$Ua#Y$Ua#Z$Ua#]$Ua#_$Ua#`$Ua&{$Ua']$Ua!^$Uay$Ua!O$Ua$v$Ua'_$Ua!W$Ua~P#9{O#O$daP$daY$da^$dai$dar$da|$da![$da!]$da!_$da!e$da#R$da#S$da#T$da#U$da#V$da#W$da#X$da#Y$da#Z$da#]$da#_$da#`$da&{$da']$da!^$day$da!O$da!t$da$v$da'_$da!W$da~P!$ZO|&_X'T&_X~PIkO|+xO'T'ca~O{0TO|&`X!^&`X~P)rO|+{O!^'da~O|+{O!^'da~P!)uO#c!aa}!aa~PBpO#c!Xa~P#*WO!O0gO#n]O#u0hO~O}0lO~O^$Oq|$Oq&{$Oqy$Oq!^$Oq'_$Oq!O$Oq$v$Oq!W$Oq~P!)uOy0mO~O],aOj,aO~Oq'tOt'uO'm'yO'e$ni'l$ni|$ni!t$ni~O'T$ni#c$ni~P$.YOq'tOt'uO'e$pi'l$pi'm$pi|$pi!t$pi~O'T$pi#c$pi~P$.{O#c0nO~P!$ZO{0pO'P$[O|&hX!^&hX~O|,iO!^'ra~O|,iO!W!tO!^'ra~O|,iO!W!tO'e&gO!^'ra~O'T$]i|$]i#c$]i!t$]i~P!$ZO{0wO'P(TOy&jX|&jX~P!$xO|,pOy'sa~O|,pOy'sa~P!$ZO!W!tO~O!W!tO#X1RO~Oi1VO!W!tO'e&gO~O|'Wi'T'Wi~P!$ZO!t1YO|'Wi'T'Wi~P!$ZO!^1]O~O|1`O!O'tX~P!$ZO!O&[O$v1cO~O!O&[O$v1cO~P!$ZO!O$ZX$kZX^$ZX&{$ZX~P!#]O$k1gOqfXtfX!OfX'efX'lfX'mfX^fX&{fX~O$k1gO~O'P)YO|&sX}&sX~O|-qO}'za~O[1oO~O]1rO~OR1tO!O&[O!j1sO$v1cO~O^$WO&{$WO~P!$ZO!O#uO~P!$ZO|1yO!t1{O}'wX~O}1|O~Ot(^O!R2VO!S2OO!T2OO!m2UO!n2TO!o2TO!q2SO'Q$^O'Y(YO~O}2RO~P$6bOR2^O!O.[O!j2]O$v2[O~OR2^O!O.[O!j2]O$v2[O'U$_O~O'P(lO|&rX}&rX~O|.hO}'xa~O'Y2gO~O]2iO~O[2kO~O!^2nO~P)rO^2pO~O^2pO~P)rO#X2rO%i2sO~PEYO_/OO}2wO%w.}O~P]O!W2yO~O%|2zOP%yqQ%yqW%yq]%yq^%yqa%yqb%yqg%yqi%yqj%yqk%yqm%yqo%yqt%yqv%yqw%yqx%yq!O%yq!Y%yq!_%yq!b%yq!c%yq!d%yq!e%yq!f%yq!i%yq#j%yq#n%yq$u%yq$w%yq$y%yq$z%yq${%yq%O%yq%Q%yq%T%yq%U%yq%W%yq%e%yq%k%yq%m%yq%o%yq%q%yq%t%yq%z%yq&O%yq&Q%yq&S%yq&U%yq&W%yq&v%yq'P%yq']%yq'q%yq}%yq%r%yq_%yq%w%yq~O|!{i}!{i~P#JoO!t2|O|!{i}!{i~O|!Qi}!Qi~P#JoO^$WO!t3TO&{$WO~O^$WO!W!tO!t3TO&{$WO~O^$WO!W!tO!_$TO!e3XO!t3TO&{$WO'U$_O'e&gO~O!S3YO!T3YO'Q$^O'Y(YO~O!R3]O!S3YO!T3YO!q3^O'Q$^O'Y(YO~O^$WO!W!tO!e3XO!t3TO&{$WO'e&gO~O|'gq!^'gq^'gq&{'gq~P!)uO|&lO!^'fq~O#O$niP$niY$ni^$nii$nir$ni![$ni!]$ni!_$ni!e$ni#R$ni#S$ni#T$ni#U$ni#V$ni#W$ni#X$ni#Y$ni#Z$ni#]$ni#_$ni#`$ni&{$ni']$ni!^$niy$ni!O$ni$v$ni'_$ni!W$ni~P$.YO#O$piP$piY$pi^$pii$pir$pi![$pi!]$pi!_$pi!e$pi#R$pi#S$pi#T$pi#U$pi#V$pi#W$pi#X$pi#Y$pi#Z$pi#]$pi#_$pi#`$pi&{$pi']$pi!^$piy$pi!O$pi$v$pi'_$pi!W$pi~P$.{O#O$]iP$]iY$]i^$]ii$]ir$]i|$]i![$]i!]$]i!_$]i!e$]i#R$]i#S$]i#T$]i#U$]i#V$]i#W$]i#X$]i#Y$]i#Z$]i#]$]i#_$]i#`$]i&{$]i']$]i!^$]iy$]i!O$]i!t$]i$v$]i'_$]i!W$]i~P!$ZO|&_a'T&_a~P!$ZO|&`a!^&`a~P!)uO|+{O!^'di~OP#ZOq!xOr!xOt!yO!]!vO!_!wO!e#ZO']QOY#Qii#Qi![#Qi#S#Qi#T#Qi#U#Qi#V#Qi#W#Qi#X#Qi#Y#Qi#Z#Qi#]#Qi#_#Qi#`#Qi#c#Qi'e#Qi'l#Qi'm#Qi|#Qi}#Qi~O#R#Qi~P$GzOP#ZOq!xOr!xOt!yO!]!vO!_!wO!e#ZO']QOY#Qii#Qi![#Qi#S#Qi#T#Qi#U#Qi#V#Qi#W#Qi#X#Qi#Y#Qi#Z#Qi#]#Qi#_#Qi#`#Qi#c#Qi'e#Qi'l#Qi'm#Qi~O#R8_O~P$I{OP#ZOq!xOr!xOt!yO!]!vO!_!wO!e#ZO#R8_O#S8`O#T8`O#U8`O']QOY#Qi![#Qi#V#Qi#W#Qi#X#Qi#Y#Qi#Z#Qi#]#Qi#_#Qi#`#Qi#c#Qi'e#Qi'l#Qi'm#Qi~Oi#Qi~P$KvOi8aO~P$KvOP#ZOi8aOq!xOr!xOt!yO!]!vO!_!wO!e#ZO#R8_O#S8`O#T8`O#U8`O#V8bO']QO#Z#Qi#]#Qi#_#Qi#`#Qi#c#Qi'e#Qi'l#Qi'm#Qi~OY#Qi![#Qi#W#Qi#X#Qi#Y#Qi~P$MxOY8lO![8cO#W8cO#X8cO#Y8cO~P$MxOP#ZOY8lOi8aOq!xOr!xOt!yO![8cO!]!vO!_!wO!e#ZO#R8_O#S8`O#T8`O#U8`O#V8bO#W8cO#X8cO#Y8cO#Z8dO']QO#]#Qi#_#Qi#`#Qi#c#Qi'e#Qi'm#Qi~O'l#Qi~P%!WO'l!zO~P%!WOP#ZOY8lOi8aOq!xOr!xOt!yO![8cO!]!vO!_!wO!e#ZO#R8_O#S8`O#T8`O#U8`O#V8bO#W8cO#X8cO#Y8cO#Z8dO#]8fO']QO'l!zO#_#Qi#`#Qi#c#Qi'e#Qi~O'm#Qi~P%$YO'm!{O~P%$YOP#ZOY8lOi8aOq!xOr!xOt!yO![8cO!]!vO!_!wO!e#ZO#R8_O#S8`O#T8`O#U8`O#V8bO#W8cO#X8cO#Y8cO#Z8dO#]8fO#_8hO']QO'l!zO'm!{O~O#`#Qi#c#Qi'e#Qi~P%&[O^#ay|#ay&{#ayy#ay!^#ay'_#ay!O#ay$v#ay!W#ay~P!)uOP#QiY#Qii#Qir#Qi![#Qi!]#Qi!_#Qi!e#Qi#R#Qi#S#Qi#T#Qi#U#Qi#V#Qi#W#Qi#X#Qi#Y#Qi#Z#Qi#]#Qi#_#Qi#`#Qi#c#Qi']#Qi|#Qi}#Qi~P!$ZO!]!vOP'XXY'XXi'XXq'XXr'XXt'XX!['XX!_'XX!e'XX#R'XX#S'XX#T'XX#U'XX#V'XX#W'XX#X'XX#Y'XX#Z'XX#]'XX#_'XX#`'XX#c'XX']'XX'e'XX'l'XX'm'XX|'XX}'XX~O#c#di~P#*WO}3mO~O|&ga}&ga#c&ga~P#JoO!W!tO'e&gO|&ha!^&ha~O|,iO!^'ri~O|,iO!W!tO!^'ri~Oy&ja|&ja~P!$ZO!W3tO~O|,pOy'si~P!$ZO|,pOy'si~Oy3zO~O!W!tO#X4QO~Oi4RO!W!tO'e&gO~Oy4TO~O'T$_q|$_q#c$_q!t$_q~P!$ZO|1`O!O'ta~O!O&[O$v4YO~O!O&[O$v4YO~P!$ZOY4]O~O|-qO}'zi~O]4_O~O[4`O~O'Y&zO|&oX}&oX~O|1yO}'wa~O}4mO~P$6bO!R4pO!S4oO!T4oO!q/oO'Q$^O'Y(YO~O!n4qO!o4qO~P%1OO!S4oO!T4oO'Q$^O'Y(YO~O!O.[O~O!O.[O$v4sO~O!O.[O$v4sO~P!$ZOR4xO!O.[O!j4wO$v4sO~OY4}O|&ra}&ra~O|.hO}'xi~O]5QO~O!^5RO~O!^5SO~O!^5TO~O!^5TO~P)rO^5VO~O!W5YO~O!^5[O~O|'ji}'ji~P#JoO^$WO&{$WO~P#>gO^$WO!t5aO&{$WO~O^$WO!W!tO!t5aO&{$WO~O^$WO!W!tO!e5fO!t5aO&{$WO'e&gO~O!_$TO'U$_O~P%5RO!S5gO!T5gO'Q$^O'Y(YO~O|'gy!^'gy^'gy&{'gy~P!)uO#O$_qP$_qY$_q^$_qi$_qr$_q|$_q![$_q!]$_q!_$_q!e$_q#R$_q#S$_q#T$_q#U$_q#V$_q#W$_q#X$_q#Y$_q#Z$_q#]$_q#_$_q#`$_q&{$_q']$_q!^$_qy$_q!O$_q!t$_q$v$_q'_$_q!W$_q~P!$ZO|&`i!^&`i~P!)uO|8jO#c$Ra~P#GwOq-XOr-XOt-YOPnaYnaina![na!]na!_na!ena#Rna#Sna#Tna#Una#Vna#Wna#Xna#Yna#Zna#]na#_na#`na#cna']na'ena'lna'mna|na}na~Oq'tOt'uOP$SaY$Sai$Sar$Sa![$Sa!]$Sa!_$Sa!e$Sa#R$Sa#S$Sa#T$Sa#U$Sa#V$Sa#W$Sa#X$Sa#Y$Sa#Z$Sa#]$Sa#_$Sa#`$Sa#c$Sa']$Sa'e$Sa'l$Sa'm$Sa|$Sa}$Sa~Oq'tOt'uOP$UaY$Uai$Uar$Ua![$Ua!]$Ua!_$Ua!e$Ua#R$Ua#S$Ua#T$Ua#U$Ua#V$Ua#W$Ua#X$Ua#Y$Ua#Z$Ua#]$Ua#_$Ua#`$Ua#c$Ua']$Ua'e$Ua'l$Ua'm$Ua|$Ua}$Ua~OP$daY$dai$dar$da![$da!]$da!_$da!e$da#R$da#S$da#T$da#U$da#V$da#W$da#X$da#Y$da#Z$da#]$da#_$da#`$da#c$da']$da|$da}$da~P!$ZO#c$Oq~P#*WO}5oO~O'T$ry|$ry#c$ry!t$ry~P!$ZO!W!tO|&hi!^&hi~O!W!tO'e&gO|&hi!^&hi~O|,iO!^'rq~Oy&ji|&ji~P!$ZO|,pOy'sq~Oy5vO~P!$ZOy5vO~O|'Wy'T'Wy~P!$ZO|&ma!O&ma~P!$ZO!O$jq^$jq&{$jq~P!$ZO|-qO}'zq~O]6PO~O!O&[O$v6QO~O!O&[O$v6QO~P!$ZO!t6RO|&oa}&oa~O|1yO}'wi~P#JoO!S6XO!T6XO'Q$^O'Y(YO~O!R6ZO!S6XO!T6XO!q3^O'Q$^O'Y(YO~O!O.[O$v6^O~O!O.[O$v6^O~P!$ZO'Y6dO~O|.hO}'xq~O!^6gO~O!^6gO~P)rO!^6iO~O!^6jO~O|!{y}!{y~P#JoO^$WO!t6oO&{$WO~O^$WO!W!tO!t6oO&{$WO~O^$WO!W!tO!e6sO!t6oO&{$WO'e&gO~O#O$ryP$ryY$ry^$ryi$ryr$ry|$ry![$ry!]$ry!_$ry!e$ry#R$ry#S$ry#T$ry#U$ry#V$ry#W$ry#X$ry#Y$ry#Z$ry#]$ry#_$ry#`$ry&{$ry']$ry!^$ryy$ry!O$ry!t$ry$v$ry'_$ry!W$ry~P!$ZO#c#ay~P#*WOP$]iY$]ii$]ir$]i![$]i!]$]i!_$]i!e$]i#R$]i#S$]i#T$]i#U$]i#V$]i#W$]i#X$]i#Y$]i#Z$]i#]$]i#_$]i#`$]i#c$]i']$]i|$]i}$]i~P!$ZOq'tOt'uO'm'yOP$niY$nii$nir$ni![$ni!]$ni!_$ni!e$ni#R$ni#S$ni#T$ni#U$ni#V$ni#W$ni#X$ni#Y$ni#Z$ni#]$ni#_$ni#`$ni#c$ni']$ni'e$ni'l$ni|$ni}$ni~Oq'tOt'uOP$piY$pii$pir$pi![$pi!]$pi!_$pi!e$pi#R$pi#S$pi#T$pi#U$pi#V$pi#W$pi#X$pi#Y$pi#Z$pi#]$pi#_$pi#`$pi#c$pi']$pi'e$pi'l$pi'm$pi|$pi}$pi~O!W!tO|&hq!^&hq~O|,iO!^'ry~Oy&jq|&jq~P!$ZOy6yO~P!$ZO|1yO}'wq~O!S7UO!T7UO'Q$^O'Y(YO~O!O.[O$v7XO~O!O.[O$v7XO~P!$ZO!^7[O~O%|7]OP%y!ZQ%y!ZW%y!Z]%y!Z^%y!Za%y!Zb%y!Zg%y!Zi%y!Zj%y!Zk%y!Zm%y!Zo%y!Zt%y!Zv%y!Zw%y!Zx%y!Z!O%y!Z!Y%y!Z!_%y!Z!b%y!Z!c%y!Z!d%y!Z!e%y!Z!f%y!Z!i%y!Z#j%y!Z#n%y!Z$u%y!Z$w%y!Z$y%y!Z$z%y!Z${%y!Z%O%y!Z%Q%y!Z%T%y!Z%U%y!Z%W%y!Z%e%y!Z%k%y!Z%m%y!Z%o%y!Z%q%y!Z%t%y!Z%z%y!Z&O%y!Z&Q%y!Z&S%y!Z&U%y!Z&W%y!Z&v%y!Z'P%y!Z']%y!Z'q%y!Z}%y!Z%r%y!Z_%y!Z%w%y!Z~O^$WO!t7aO&{$WO~O^$WO!W!tO!t7aO&{$WO~OP$_qY$_qi$_qr$_q![$_q!]$_q!_$_q!e$_q#R$_q#S$_q#T$_q#U$_q#V$_q#W$_q#X$_q#Y$_q#Z$_q#]$_q#_$_q#`$_q#c$_q']$_q|$_q}$_q~P!$ZO|&oq}&oq~P#JoO^$WO!t7uO&{$WO~OP$ryY$ryi$ryr$ry![$ry!]$ry!_$ry!e$ry#R$ry#S$ry#T$ry#U$ry#V$ry#W$ry#X$ry#Y$ry#Z$ry#]$ry#_$ry#`$ry#c$ry']$ry|$ry}$ry~P!$ZO|#_O'_'ZX!^'ZX^'ZX&{'ZX~P!)uO'_'ZX~P.ZO'_ZXyZX!^ZX%iZX!OZX$vZX!WZX~P$tO!WcX!^ZX!^cX'ecX~P:tOP;TOQ;TO]bOa:{Ob!gOgbOi;TOjbOkbOm;TOo;TOtROvbOwbOxbO!OSO!Y;UO!_UO!b;TO!c;TO!d;TO!e;TO!f;TO!i!fO#j!iO#n]O'P'YO']QO'q;{O~O|8jO}$Ra~O]#nOg#zOi#oOj#nOk#nOm#{Oo8oOt#tO!O#uO!Y;PO!_#rO!}8uO#j$PO$T8qO$V8sO$Y$QO'P&rO~O}ZX}cX~P:tO|8jO#c'ZX~P#JoO#c'ZX~P#2iO#O8]O~O#O8^O~O!W!tO#O8]O~O!W!tO#O8^O~O!t8mO~O!t8vO|'jX}'jX~O!t;bO|'hX}'hX~O#O8wO~O#O8xO~O'T8|O~P!$ZO#O9RO~O#O9SO~O!W!tO#O9TO~O!W!tO#O9UO~O!W!tO#O9VO~O!^!Xa^!Xa&{!Xa~P#>gO#O9WO~O!W!tO#O8wO~O!W!tO#O8xO~O!W!tO#O9WO~OP#ZOq!xOr!xOt!yO!]!vO!_!wO!e#ZO#R9oO']QOY#Qii#Qi![#Qi!^#Qi#V#Qi#W#Qi#X#Qi#Y#Qi#Z#Qi#]#Qi#_#Qi#`#Qi'e#Qi'l#Qi'm#Qi^#Qi&{#Qi~O#S#Qi#T#Qi#U#Qi~P&3mO#S9pO#T9pO#U9pO~P&3mOP#ZOi9qOq!xOr!xOt!yO!]!vO!_!wO!e#ZO#R9oO#S9pO#T9pO#U9pO']QOY#Qi![#Qi!^#Qi#W#Qi#X#Qi#Y#Qi#Z#Qi#]#Qi#_#Qi#`#Qi'e#Qi'l#Qi'm#Qi^#Qi&{#Qi~O#V#Qi~P&5{O#V9rO~P&5{OP#ZOY#aOi9qOq!xOr!xOt!yO![9sO!]!vO!_!wO!e#ZO#R9oO#S9pO#T9pO#U9pO#V9rO#W9sO#X9sO#Y9sO']QO!^#Qi#]#Qi#_#Qi#`#Qi'e#Qi'l#Qi'm#Qi^#Qi&{#Qi~O#Z#Qi~P&8TO#Z9tO~P&8TOP#ZOY#aOi9qOq!xOr!xOt!yO![9sO!]!vO!_!wO!e#ZO#R9oO#S9pO#T9pO#U9pO#V9rO#W9sO#X9sO#Y9sO#Z9tO']QO'l!zO!^#Qi#_#Qi#`#Qi'e#Qi'm#Qi^#Qi&{#Qi~O#]#Qi~P&:]O#]9vO~P&:]OP#ZOY#aOi9qOq!xOr!xOt!yO![9sO!]!vO!_!wO!e#ZO#R9oO#S9pO#T9pO#U9pO#V9rO#W9sO#X9sO#Y9sO#Z9tO#]9vO']QO'l!zO'm!{O!^#Qi#`#Qi'e#Qi^#Qi&{#Qi~O#_#Qi~P&<eO#_9xO~P&<eO#c9XO~P#*WO!^#di^#di&{#di~P#>gO#O9YO~O#O9ZO~O#O9[O~O#O9]O~O#O9^O~O#O9_O~O#O9`O~O#O9aO~O!^$Oq^$Oq&{$Oq~P#>gO#c9bO~P!$ZO#c9cO~P!$ZO!^#ay^#ay&{#ay~P#>gOP'[XY'[Xi'[Xq'[Xr'[Xt'[X!['[X!]'[X!_'[X!e'[X#R'[X#S'[X#T'[X#U'[X#V'[X#W'[X#X'[X#Y'[X#Z'[X#]'[X#_'[X#`'[X']'[X'e'[X'l'[X'm'[X~O!t9zO#e9zO!^'[X^'[X&{'[X~P&@uO!t9zO~O'T:dO~P!$ZO#c:mO~P#*WO#O:rO~O!W!tO#O:rO~O!t;bO~O'T;cO~P!$ZO#c;dO~P#*WO!t;bO#e;bO|'[X}'[X~P#,RO|!Xa}!Xa#c!Xa~P#JoO#R;VO~P$GzOP#ZOq!xOr!xOt!yO!]!vO!_!wO!e#ZO#R;VO#S;WO#T;WO#U;WO']QOY#Qi|#Qi}#Qi![#Qi#V#Qi#W#Qi#X#Qi#Y#Qi#Z#Qi#]#Qi#_#Qi#`#Qi'e#Qi'l#Qi'm#Qi#c#Qi~Oi#Qi~P&DwOi;XO~P&DwOP#ZOi;XOq!xOr!xOt!yO!]!vO!_!wO!e#ZO#R;VO#S;WO#T;WO#U;WO#V;YO']QO|#Qi}#Qi#Z#Qi#]#Qi#_#Qi#`#Qi'e#Qi'l#Qi'm#Qi#c#Qi~OY#Qi![#Qi#W#Qi#X#Qi#Y#Qi~P&GPOY8lO![;ZO#W;ZO#X;ZO#Y;ZO~P&GPOP#ZOY8lOi;XOq!xOr!xOt!yO![;ZO!]!vO!_!wO!e#ZO#R;VO#S;WO#T;WO#U;WO#V;YO#W;ZO#X;ZO#Y;ZO#Z;[O']QO|#Qi}#Qi#]#Qi#_#Qi#`#Qi'e#Qi'm#Qi#c#Qi~O'l#Qi~P&IeO'l!zO~P&IeOP#ZOY8lOi;XOq!xOr!xOt!yO![;ZO!]!vO!_!wO!e#ZO#R;VO#S;WO#T;WO#U;WO#V;YO#W;ZO#X;ZO#Y;ZO#Z;[O#];^O']QO'l!zO|#Qi}#Qi#_#Qi#`#Qi'e#Qi#c#Qi~O'm#Qi~P&KmO'm!{O~P&KmOP#ZOY8lOi;XOq!xOr!xOt!yO![;ZO!]!vO!_!wO!e#ZO#R;VO#S;WO#T;WO#U;WO#V;YO#W;ZO#X;ZO#Y;ZO#Z;[O#];^O#_;`O']QO'l!zO'm!{O~O|#Qi}#Qi#`#Qi'e#Qi#c#Qi~P&MuO|#di}#di#c#di~P#JoO|$Oq}$Oq#c$Oq~P#JoO|#ay}#ay#c#ay~P#JoO#n~!]!m!o!|!}'q$T$V$Y$k$u$v$w%O%Q%T%U%W%Y~TS#n'q#p'Y'P&}#Sx~",
    goto: "$!x(OPPPPPPP(PP(aP)|PPPP._PP.t4x6k7QP7QPPP7QP7QP8oPP8tP9]PPPP?RPPPP?RBoPPPBuDxP?RPGgPPPPIv?RPPPPPLW?RPP!!T!#QPPP!#UP!#^!$_P?R?R!'x!+y!1w!1w!6WPPP!6_?RPPPPPPPPP!:TP!;uPP?R!=_P?RP?R?R?R?RP?R!?zPP!CoP!G`!Gh!Gl!GlP!ClP!Gp!GpP!KaP!Ke?R?R!Kk# _7QP7QP7Q7QP#!v7Q7Q#$l7Q7Q7Q#&o7Q7Q#']#)W#)W#)[#)W#)dP#)WP7Q#*`7Q#+k7Q7Q._PPP#,yPPP#-c#-cP#-cP#-x#-cPP#.OP#-uP#-u#.b!#Y#-u#/P#/V#/Y(P#/](PP#/d#/d#/dP(PP(PP(PP(PPP(PP#/j#/mP#/m(PPPP(PP(PP(PP(PP(PP(P(P#/q#/{#0R#0a#0g#0m#0w#0}#1X#1_#1m#1s#1y#2a#2v#4Z#4i#4o#4u#4{#5R#5]#5c#5i#5s#5}#6TPPPPPPPP#6ZPP#6}#:{PP#<`#<i#<sP#AS#DVP#K}P#LR#LU#LX#Ld#LgP#Lj#Ln#M]#NQ#NU#NhPP#Nl#Nr#NvP#Ny#N}$ Q$ p$!W$!]$!`$!c$!i$!l$!p$!tmgOSi{!k$V%^%a%b%d*_*d.x.{Q$dlQ$knQ%UwS&O!`*zQ&c!gS(]#u(bQ)W$eQ)d$mQ*O%OQ+Q&VS+W&[+YQ+h&dQ-P(dQ.g*PU/l+[+]+^S2O.[2QS3Y/n/pU4o2T2U2VQ5g3]S6X4p4qR7U6Z$hZORSTUij{!Q!U!Z!^!k!s!w!y!|!}#O#P#Q#R#S#T#U#V#W#_#b$V%V%Y%^%`%a%b%d%h%s%{&W&^&h&t&x's(u(|*Z*_*d+c+j+{,R-Y-^-f-p._.p.q.r.t.x.{.}/y0T1s2]2p2r2s4w5V8^8x9U9]9`x'[#Y8V8Y8_8`8a8b8c8d8e8f8g8h8i8m8|9X:|;k;|Q(m#|Q)]$gQ*Q%RQ*X%ZQ+s8nQ-k)QQ.o*VQ1l-qQ2e.hQ3g8o!O:s$i/f3T5a6o7a7u9i9j9o9p9q9r9s9t9u9v9w9x9y9z:d:m!q;l#h&P'm*s*v,W/]0g1{2|6R8]8j8v8w9T9V9W9[9^9_9a:r;T;U;V;W;X;Y;Z;[;];^;_;`;a;b;c;dpdOSiw{!k$V%T%^%a%b%d*_*d.x.{R*S%V(WVOSTijm{!Q!U!Z!h!k!s!w!y!|!}#O#P#Q#R#S#T#U#V#W#Y#_#b#h$V$i%V%Y%Z%^%`%a%b%d%h%s%{&W&^&h&t&x'm's(u(|*Z*_*d*s*v+c+j+{,R,W-Y-^-f-p._.p.q.r.t.x.{.}/]/f/y0T0g1s1{2]2p2r2s2|3T4w5V5a6R6o7a7u8V8Y8]8^8_8`8a8b8c8d8e8f8g8h8i8j8m8v8w8x8|9T9U9V9W9X9[9]9^9_9`9a9i9j9o9p9q9r9s9t9u9v9w9x9y9z:d:m:r:y:z:{:|;T;U;V;W;X;Y;Z;[;];^;_;`;a;b;c;d;k;|W!aRU!^&PQ$]kQ$clS$hn$mv$rpq!o!r$T$p&X&l&o)h)i)j*]*t+T+m+o/R/{Q$zuQ&`!fQ&b!gS(P#r(ZS)V$d$eQ)Z$gQ)g$oQ)y$|Q)}%OS+g&c&dQ,m(QQ-o)WQ-u)^Q-x)bQ.b)zS.f*O*PQ/w+hQ0o,iQ1k-qQ1n-tQ1q-zQ2d.gQ3q0pR5}4]!W$al!g$c$d$e%}&b&c&d([)V)W*w+V+g+h,y-o/b/i/m/w1U3W3[5e6rQ)O$]Q)o$wQ)r$xQ)|%OQ-|)gQ.a)yU.e)}*O*PQ2_.bS2c.f.gQ4j1}Q4|2dS6V4k4nS7S6W6YQ7l7TR7z7m[#x`$_(j:u;j;{S$wr%TQ$xsQ$ytR)m$u$X#w`!t!v#a#r#t#}$O$S&_'x'z'{(S(W(h(i({(})Q)n)q+d+x,p,r-[-e-g.R.U.^.`0n0w1R1Y1`1c1g1t2[2^3t4Q4Y4s4x6Q6^7X8l8p8q8r8s8t8u8}9O9P9Q9R9S9Y9Z9b9c:u;R;S;j;{V(n#|8n8oU&S!`$q*}Q&{!xQ)a$jQ,`'tQ.V)sQ1Z-XR4f1y(UbORSTUij{!Q!U!Z!^!k!s!w!y!|!}#O#P#Q#R#S#T#U#V#W#Y#_#b#h$V$i%V%Y%Z%^%`%a%b%d%h%s%{&P&W&^&h&t&x'm's(u(|*Z*_*d*s*v+c+j+{,R,W-Y-^-f-p._.p.q.r.t.x.{.}/]/f/y0T0g1s1{2]2p2r2s2|3T4w5V5a6R6o7a7u8V8Y8]8^8_8`8a8b8c8d8e8f8g8h8i8j8m8v8w8x8|9T9U9V9W9X9[9]9^9_9`9a9i9j9o9p9q9r9s9t9u9v9w9x9y9z:d:m:r:|;T;U;V;W;X;Y;Z;[;];^;_;`;a;b;c;d;k;|%]#^Y!]!l$Z%r%v&w&}'O'P'Q'R'S'T'U'V'W'X'Z'^'a'k)`*o*x+R+i+},Q,S,_/W/Z/x0S0W0X0Y0Z0[0]0^0_0`0a0b0c0f0k3O3R3b3e3k4h5]5`5k6m7O7_7s7}8W8X8z8{:R:W:X:Y:Z:[:]:^:_:`:a:b:c:n:q;Q;i;m;n;o;p;q;r;s;t;u;v;w;x;y;z(VbORSTUij{!Q!U!Z!^!k!s!w!y!|!}#O#P#Q#R#S#T#U#V#W#Y#_#b#h$V$i%V%Y%Z%^%`%a%b%d%h%s%{&P&W&^&h&t&x'm's(u(|*Z*_*d*s*v+c+j+{,R,W-Y-^-f-p._.p.q.r.t.x.{.}/]/f/y0T0g1s1{2]2p2r2s2|3T4w5V5a6R6o7a7u8V8Y8]8^8_8`8a8b8c8d8e8f8g8h8i8j8m8v8w8x8|9T9U9V9W9X9[9]9^9_9`9a9i9j9o9p9q9r9s9t9u9v9w9x9y9z:d:m:r:|;T;U;V;W;X;Y;Z;[;];^;_;`;a;b;c;d;k;|Q&Q!`R/^*zY%z!`&O&V*z+QS([#u(bS+V&[+YS,y(](dQ,z(^Q-Q(eQ.X)uS/i+W+[S/m+]+^S/q+_2SQ1U-PQ1W-RQ1X-SS1}.[2QS3W/l/nQ3Z/oQ3[/pS4k2O2VS4n2T2US5e3Y3]Q5h3^S6W4o4pQ6Y4qQ6r5gS7T6X6ZR7m7UlgOSi{!k$V%^%a%b%d*_*d.x.{Q%f!OW&p!s8]8^:rQ)T$bQ)w$zQ)x${Q+e&aW+w&t8w8x9WW-](u9T9U9VQ-m)UQ.Z)vQ/P*fQ/Q*gQ/Y*uQ/u+fW1_-^9[9]9^Q1h-nW1j-p9_9`9aQ2}/[Q3Q/dQ3`/vQ4[1iQ5Z2zQ5^3PQ5b3VQ5i3aQ6k5[Q6n5cQ7`6pQ7q7]R7t7b%S#]Y!]!l%r%v&w&}'O'P'Q'R'S'T'U'V'W'X'Z'^'a'k)`*o*x+R+i+},Q,_/W/Z/x0S0W0X0Y0Z0[0]0^0_0`0a0b0c0f0k3O3R3b3e3k4h5]5`5k6m7O7_7s7}8W8X8z8{:W:X:Y:Z:[:]:^:_:`:a:b:c:n:q;Q;i;n;o;p;q;r;s;t;u;v;w;x;y;zU(g#v&s0eX(y$Z,S:R;m%S#[Y!]!l%r%v&w&}'O'P'Q'R'S'T'U'V'W'X'Z'^'a'k)`*o*x+R+i+},Q,_/W/Z/x0S0W0X0Y0Z0[0]0^0_0`0a0b0c0f0k3O3R3b3e3k4h5]5`5k6m7O7_7s7}8W8X8z8{:W:X:Y:Z:[:]:^:_:`:a:b:c:n:q;Q;i;n;o;p;q;r;s;t;u;v;w;x;y;zQ']#]W(x$Z,S:R;mR-_(y(UbORSTUij{!Q!U!Z!^!k!s!w!y!|!}#O#P#Q#R#S#T#U#V#W#Y#_#b#h$V$i%V%Y%Z%^%`%a%b%d%h%s%{&P&W&^&h&t&x'm's(u(|*Z*_*d*s*v+c+j+{,R,W-Y-^-f-p._.p.q.r.t.x.{.}/]/f/y0T0g1s1{2]2p2r2s2|3T4w5V5a6R6o7a7u8V8Y8]8^8_8`8a8b8c8d8e8f8g8h8i8j8m8v8w8x8|9T9U9V9W9X9[9]9^9_9`9a9i9j9o9p9q9r9s9t9u9v9w9x9y9z:d:m:r:|;T;U;V;W;X;Y;Z;[;];^;_;`;a;b;c;d;k;|Q%ayQ%bzQ%d|Q%e}R.w*bQ&]!fQ(z$]Q+b&`S-d)O)gS/r+`+aW1b-a-b-c-|S3_/s/tU4X1d1e1fU5{4W4b4cQ6{5|R7h6}T+X&[+YS+X&[+YT2P.[2QS&j!n.uQ,l(PQ,w([S/h+V1}Q0t,mS1O,x-QU3X/m/q4nQ3p0oS4O1V1XU5f3Z3[6YQ5q3qQ5z4RR6s5hQ!uXS&i!n.uQ(v$UQ)R$`Q)X$fQ+k&jQ,k(PQ,v([Q,{(_Q-l)SQ.c){S/g+V1}S0s,l,mS0},w-QQ1Q,zQ1T,|Q2a.dW3U/h/m/q4nQ3o0oQ3s0tS3x1O1XQ4P1WQ4z2bW5d3X3Z3[6YS5p3p3qQ5u3zQ5x4OQ6T4iQ6b4{S6q5f5hQ6u5qQ6w5vQ6z5zQ7Q6UQ7Z6cQ7c6sQ7f6yQ7j7RQ7x7kQ8P7yQ8T8QQ9m9fQ9n9gQ:S;fQ:g:OQ:h:PQ:i:QQ:j:TQ:k:UR:l:V$jWORSTUij{!Q!U!Z!^!k!s!w!y!|!}#O#P#Q#R#S#T#U#V#W#_#b$V%V%Y%Z%^%`%a%b%d%h%s%{&W&^&h&t&x's(u(|*Z*_*d+c+j+{,R-Y-^-f-p._.p.q.r.t.x.{.}/y0T1s2]2p2r2s4w5V8^8x9U9]9`S!um!hx9d#Y8V8Y8_8`8a8b8c8d8e8f8g8h8i8m8|9X:|;k;|!O9e$i/f3T5a6o7a7u9i9j9o9p9q9r9s9t9u9v9w9x9y9z:d:mQ9m:yQ9n:zQ:S:{!q;e#h&P'm*s*v,W/]0g1{2|6R8]8j8v8w9T9V9W9[9^9_9a:r;T;U;V;W;X;Y;Z;[;];^;_;`;a;b;c;d$jXORSTUij{!Q!U!Z!^!k!s!w!y!|!}#O#P#Q#R#S#T#U#V#W#_#b$V%V%Y%Z%^%`%a%b%d%h%s%{&W&^&h&t&x's(u(|*Z*_*d+c+j+{,R-Y-^-f-p._.p.q.r.t.x.{.}/y0T1s2]2p2r2s4w5V8^8x9U9]9`Q$Ua!W$`l!g$c$d$e%}&b&c&d([)V)W*w+V+g+h,y-o/b/i/m/w1U3W3[5e6rS$fm!hQ)S$aQ){%OW.d)|)}*O*PU2b.e.f.gQ4i1}S4{2c2dU6U4j4k4nQ6c4|U7R6V6W6YS7k7S7TS7y7l7mQ8Q7zx9f#Y8V8Y8_8`8a8b8c8d8e8f8g8h8i8m8|9X:|;k;|!O9g$i/f3T5a6o7a7u9i9j9o9p9q9r9s9t9u9v9w9x9y9z:d:mQ:O:vQ:P:wQ:Q:xQ:T:yQ:U:zQ:V:{!q;f#h&P'm*s*v,W/]0g1{2|6R8]8j8v8w9T9V9W9[9^9_9a:r;T;U;V;W;X;Y;Z;[;];^;_;`;a;b;c;d$b[OSTij{!Q!U!Z!k!s!w!y!|!}#O#P#Q#R#S#T#U#V#W#_#b$V%V%Y%^%`%a%b%d%h%s%{&W&^&h&t&x's(u(|*Z*_*d+c+j+{,R-Y-^-f-p._.p.q.r.t.x.{.}/y0T1s2]2p2r2s4w5V8^8x9U9]9`U!eRU!^v$rpq!o!r$T$p&X&l&o)h)i)j*]*t+T+m+o/R/{Q*Y%Zx9h#Y8V8Y8_8`8a8b8c8d8e8f8g8h8i8m8|9X:|;k;|Q9l&P!O:t$i/f3T5a6o7a7u9i9j9o9p9q9r9s9t9u9v9w9x9y9z:d:m!o;g#h'm*s*v,W/]0g1{2|6R8]8j8v8w9T9V9W9[9^9_9a:r;T;U;V;W;X;Y;Z;[;];^;_;`;a;b;c;dS&T!`$qR/`*}$hZORSTUij{!Q!U!Z!^!k!s!w!y!|!}#O#P#Q#R#S#T#U#V#W#_#b$V%V%Y%^%`%a%b%d%h%s%{&W&^&h&t&x's(u(|*Z*_*d+c+j+{,R-Y-^-f-p._.p.q.r.t.x.{.}/y0T1s2]2p2r2s4w5V8^8x9U9]9`x'[#Y8V8Y8_8`8a8b8c8d8e8f8g8h8i8m8|9X:|;k;|Q*X%Z!O:s$i/f3T5a6o7a7u9i9j9o9p9q9r9s9t9u9v9w9x9y9z:d:m!q;l#h&P'm*s*v,W/]0g1{2|6R8]8j8v8w9T9V9W9[9^9_9a:r;T;U;V;W;X;Y;Z;[;];^;_;`;a;b;c;d!Q#SY!]$Z%r%v&w'U'V'W'X'^'a*o+R+i+},_/x0S0c3b3e8W8Xh8e'Z,S0_0`0a0b0f3k5k:b;Q;in9u)`3R5`6m7_7s7}:R:^:_:`:a:c:n:qw;]'k*x/W/Z0k3O4h5]7O8z8{;m;t;u;v;w;x;y;z|#UY!]$Z%r%v&w'W'X'^'a*o+R+i+},_/x0S0c3b3e8W8Xd8g'Z,S0a0b0f3k5k:b;Q;ij9w)`3R5`6m7_7s7}:R:`:a:c:n:qs;_'k*x/W/Z0k3O4h5]7O8z8{;m;v;w;x;y;zx#YY!]$Z%r%v&w'^'a*o+R+i+},_/x0S0c3b3e8W8Xp'{#p&u(t,g,o-T-U0Q1^3n4S9{:o:p:};h`:|'Z,S0f3k5k:b;Q;i!^;R&q'`(O(U+a+v,s-`-c.Q.S/t0P0u0y1f1v1x2Y3d3u3{4U4Z4c4v5j5s5y6`Y;S0d3j5l6t7df;k)`3R5`6m7_7s7}:R:c:n:qo;|'k*x/W/Z0k3O4h5]7O8z8{;m;x;y;z(UbORSTUij{!Q!U!Z!^!k!s!w!y!|!}#O#P#Q#R#S#T#U#V#W#Y#_#b#h$V$i%V%Y%Z%^%`%a%b%d%h%s%{&P&W&^&h&t&x'm's(u(|*Z*_*d*s*v+c+j+{,R,W-Y-^-f-p._.p.q.r.t.x.{.}/]/f/y0T0g1s1{2]2p2r2s2|3T4w5V5a6R6o7a7u8V8Y8]8^8_8`8a8b8c8d8e8f8g8h8i8j8m8v8w8x8|9T9U9V9W9X9[9]9^9_9`9a9i9j9o9p9q9r9s9t9u9v9w9x9y9z:d:m:r:|;T;U;V;W;X;Y;Z;[;];^;_;`;a;b;c;d;k;|S#i_#jR0h,V(]^ORSTU_ij{!Q!U!Z!^!k!s!w!y!|!}#O#P#Q#R#S#T#U#V#W#Y#_#b#h#j$V$i%V%Y%Z%^%`%a%b%d%h%s%{&P&W&^&h&t&x'm's(u(|*Z*_*d*s*v+c+j+{,R,V,W-Y-^-f-p._.p.q.r.t.x.{.}/]/f/y0T0g1s1{2]2p2r2s2|3T4w5V5a6R6o7a7u8V8Y8]8^8_8`8a8b8c8d8e8f8g8h8i8j8m8v8w8x8|9T9U9V9W9X9[9]9^9_9`9a9i9j9o9p9q9r9s9t9u9v9w9x9y9z:d:m:r:|;T;U;V;W;X;Y;Z;[;];^;_;`;a;b;c;d;k;|S#d]#kT'd#f'hT#e]#kT'f#f'h(]_ORSTU_ij{!Q!U!Z!^!k!s!w!y!|!}#O#P#Q#R#S#T#U#V#W#Y#_#b#h#j$V$i%V%Y%Z%^%`%a%b%d%h%s%{&P&W&^&h&t&x'm's(u(|*Z*_*d*s*v+c+j+{,R,V,W-Y-^-f-p._.p.q.r.t.x.{.}/]/f/y0T0g1s1{2]2p2r2s2|3T4w5V5a6R6o7a7u8V8Y8]8^8_8`8a8b8c8d8e8f8g8h8i8j8m8v8w8x8|9T9U9V9W9X9[9]9^9_9`9a9i9j9o9p9q9r9s9t9u9v9w9x9y9z:d:m:r:|;T;U;V;W;X;Y;Z;[;];^;_;`;a;b;c;d;k;|T#i_#jQ#l_R'o#j$jaORSTUij{!Q!U!Z!^!k!s!w!y!|!}#O#P#Q#R#S#T#U#V#W#_#b$V%V%Y%Z%^%`%a%b%d%h%s%{&W&^&h&t&x's(u(|*Z*_*d+c+j+{,R-Y-^-f-p._.p.q.r.t.x.{.}/y0T1s2]2p2r2s4w5V8^8x9U9]9`x:v#Y8V8Y8_8`8a8b8c8d8e8f8g8h8i8m8|9X:|;k;|!O:w$i/f3T5a6o7a7u9i9j9o9p9q9r9s9t9u9v9w9x9y9z:d:m!q:x#h&P'm*s*v,W/]0g1{2|6R8]8j8v8w9T9V9W9[9^9_9a:r;T;U;V;W;X;Y;Z;[;];^;_;`;a;b;c;d#{cOSUi{!Q!U!k!s!y#h$V%V%Y%Z%^%`%a%b%d%h%{&^&t'm(u(|*Z*_*d+c,W-Y-^-f-p._.p.q.r.t.x.{.}0g1s2]2p2r2s4w5V8]8^8w8x9T9U9V9W9[9]9^9_9`9a:rx#v`!v#}$O$S'x'z'{(S(h(i+x-[0n1Y:u;R;S;j;{!z&s!t#a#r#t&_(W({(})Q)n)q+d,p,r-e-g.R.U.^.`0w1R1`1c1g1t2[2^3t4Q4Y4s4x6Q6^7X8p8r8t8}9P9R9Y9bQ(r$Qc0e8l8q8s8u9O9Q9S9Z9cx#s`!v#}$O$S'x'z'{(S(h(i+x-[0n1Y:u;R;S;j;{S(_#u(bQ(s$RQ,|(`!z9|!t#a#r#t&_(W({(})Q)n)q+d,p,r-e-g.R.U.^.`0w1R1`1c1g1t2[2^3t4Q4Y4s4x6Q6^7X8p8r8t8}9P9R9Y9bb9}8l8q8s8u9O9Q9S9Z9cQ:e;OR:f;PleOSi{!k$V%^%a%b%d*_*d.x.{Q(V#tQ*k%kQ*l%mR0v,p$W#w`!t!v#a#r#t#}$O$S&_'x'z'{(S(W(h(i({(})Q)n)q+d+x,p,r-[-e-g.R.U.^.`0n0w1R1Y1`1c1g1t2[2^3t4Q4Y4s4x6Q6^7X8l8p8q8r8s8t8u8}9O9P9Q9R9S9Y9Z9b9c:u;R;S;j;{Q)p$xQ.T)rQ1w.SR4e1xT(a#u(bS(a#u(bT2P.[2QQ)R$`Q,{(_Q-l)SQ.c){Q2a.dQ4z2bQ6T4iQ6b4{Q7Q6UQ7Z6cQ7j7RQ7x7kQ8P7yR8T8Qp'x#p&u(t,g,o-T-U0Q1^3n4S9{:o:p:};h!^8}&q'`(O(U+a+v,s-`-c.Q.S/t0P0u0y1f1v1x2Y3d3u3{4U4Z4c4v5j5s5y6`Z9O0d3j5l6t7dr'z#p&u(t,e,g,o-T-U0Q1^3n4S9{:o:p:};h!`9P&q'`(O(U+a+v,s-`-c.Q.S/t/}0P0u0y1f1v1x2Y3d3u3{4U4Z4c4v5j5s5y6`]9Q0d3j5l5m6t7dpdOSiw{!k$V%T%^%a%b%d*_*d.x.{Q%QvR*Z%ZpdOSiw{!k$V%T%^%a%b%d*_*d.x.{R%QvQ)t$yR.P)mqdOSiw{!k$V%T%^%a%b%d*_*d.x.{Q.])yS2Z.a.bW4r2W2X2Y2_U6]4t4u4vU7V6[6_6`Q7n7WR7{7oQ%XwR*T%TR2h.jR6e4}S$hn$mR-u)^Q%^xR*_%_R*e%eT.y*d.{QiOQ!kST$Yi!kQ!WQR%p!WQ![RU%t![%u*pQ%u!]R*p%vQ*{&QR/_*{Q+y&uR0R+yQ+|&wS0U+|0VR0V+}Q+Y&[R/j+YQ&Y!cQ*q%wT+U&Y*qQ+O&TR/a+OQ&m!pQ+l&kU+p&m+l/|R/|+qQ'h#fR,X'hQ#j_R'n#jQ#`YW'_#`*n3f8kQ*n8WS+r8X8{Q3f8zR8k'kQ,j(PW0q,j0r3r5rU0r,k,l,mS3r0s0tR5r3s#s'v#p&q&u'`(O(U(o(p(t+a+t+u+v,e,f,g,o,s-T-U-`-c.Q.S/t/}0O0P0Q0d0u0y1^1f1v1x2Y3d3h3i3j3n3u3{4S4U4Z4c4v5j5l5m5n5s5y6`6t7d9{:o:p:};hQ,q(UU0x,q0z3vQ0z,sR3v0yQ(b#uR,}(bQ(k#yR-W(kQ1a-`R4V1aQ)k$sR.O)kQ1z.VS4g1z6SR6S4hQ)v$zR.Y)vQ2Q.[R4l2QQ.i*QS2f.i5OR5O2hQ-r)ZS1m-r4^R4^1nQ)_$hR-v)_Q.{*dR2v.{WhOSi!kQ%c{Q(w$VQ*^%^Q*`%aQ*a%bQ*c%dQ.v*_S.y*d.{R2u.xQ$XfQ%g!PQ%j!RQ%l!SQ%n!TQ)f$nQ)l$tQ*S%XQ*i%iS.l*T*WQ/S*hQ/T*kQ/U*lS/e+V1}Q0{,uQ0|,vQ1S,{Q1p-yQ1u.QQ2`.cQ2j.nQ2t.wY3S/g/h/m/q4nQ3w0}Q3y1PQ3|1TQ4a1rQ4d1vQ4y2aQ5P2i[5_3R3U3X3Z3[6YQ5t3xQ5w3}Q6O4_Q6a4zQ6f5QW6l5`5d5f5hQ6v5uQ6x5xQ6|6PQ7P6TQ7Y6bU7^6m6q6sQ7e6wQ7g6zQ7i7QQ7p7ZS7r7_7cQ7v7fQ7w7jQ7|7sQ8O7xQ8R7}Q8S8PR8U8TQ$blQ&a!gU)U$c$d$eQ*u%}U+f&b&c&dQ,u([S-n)V)WQ/[*wQ/d+VS/v+g+hQ1P,yQ1i-oQ3P/bS3V/i/mQ3a/wQ3}1US5c3W3[Q6p5eR7b6rW#q`:u;j;{R)P$_Y#y`$_:u;j;{R-V(jQ#p`S&q!t)QQ&u!vQ'`#aQ(O#rQ(U#tQ(o#}Q(p$OQ(t$SQ+a&_Q+t8pQ+u8rQ+v8tQ,e'xQ,f'zQ,g'{Q,o(SQ,s(WQ-T(hQ-U(id-`({-e.^1c2[4Y4s6Q6^7XQ-c(}Q.Q)nQ.S)qQ/t+dQ/}8}Q0O9PQ0P9RQ0Q+xQ0d8lQ0u,pQ0y,rQ1^-[Q1f-gQ1v.RQ1x.UQ2Y.`Q3d9YQ3h8qQ3i8sQ3j8uQ3n0nQ3u0wQ3{1RQ4S1YQ4U1`Q4Z1gQ4c1tQ4v2^Q5j9bQ5l9SQ5m9OQ5n9QQ5s3tQ5y4QQ6`4xQ6t9ZQ7d9cQ9{:uQ:o;RQ:p;SQ:};jR;h;{lfOSi{!k$V%^%a%b%d*_*d.x.{S!mU%`Q%i!QQ%o!UW&p!s8]8^:rQ&|!yQ'l#hS*W%V%YQ*[%ZQ*h%hQ*r%{Q+`&^W+w&t8w8x9WQ,]'mW-](u9T9U9VQ-b(|Q.s*ZQ/s+cQ0j,WQ1[-YW1_-^9[9]9^Q1e-fW1j-p9_9`9aQ2X._Q2l.pQ2m.qQ2o.rQ2q.tQ2x.}Q3l0gQ4b1sQ4u2]Q5U2pQ5W2rQ5X2sQ6_4wR6h5V!vYOSUi{!Q!k!y$V%V%Y%Z%^%`%a%b%d%h%{&^(|*Z*_*d+c-Y-f._.p.q.r.t.x.{.}1s2]2p2r2s4w5VQ!]RS!lT9jQ$ZjQ%r!ZQ%v!^Q&w!wS&}!|9oQ'O!}Q'P#OQ'Q#PQ'R#QQ'S#RQ'T#SQ'U#TQ'V#UQ'W#VQ'X#WQ'Z#YQ'^#_Q'a#bW'k#h'm,W0gQ)`$iQ*o%sS*x&P/]Q+R&WQ+i&hQ+}&xS,Q8V;TQ,S8YQ,_'sQ/W*sQ/Z*vQ/x+jQ0S+{S0W8_;VQ0X8`Q0Y8aQ0Z8bQ0[8cQ0]8dQ0^8eQ0_8fQ0`8gQ0a8hQ0b8iQ0c,RQ0f8mQ0k8jQ3O8vQ3R/fQ3b/yQ3e0TQ3k8|Q4h1{Q5]2|Q5`3TQ5k9XQ6m5aQ7O6RQ7_6oQ7s7aQ7}7u[8W!U8^8x9U9]9`Y8X!s&t(u-^-pY8z8]8w9T9[9_Y8{9V9W9^9a:rQ:R9iQ:W9pQ:X9qQ:Y9rQ:Z9sQ:[9tQ:]9uQ:^9vQ:_9wQ:`9xQ:a9yQ:b:|Q:c9zQ:n:dQ:q:mQ;Q;kQ;i;|Q;m;UQ;n;WQ;o;XQ;p;YQ;q;ZQ;r;[Q;s;]Q;t;^Q;u;_Q;v;`Q;w;aQ;x;bQ;y;cR;z;dT!VQ!WR!_RR&R!`S%}!`*zS*w&O&VR/b+QR&v!vR&y!wT!qU$TS!pU$TU$spq*]S&k!o!rQ+n&lQ+q&oQ-})jS/z+m+oR3c/{[!bR!^$p&X)h+Th!nUpq!o!r$T&l&o)j+m+o/{Q.u*]Q/X*tQ2{/RT9k&P)iT!dR$pS!cR$pS%w!^)hS*y&P)iQ+S&XR/c+TT&U!`$qQ#f]R'q#kT'g#f'hR0i,VT(R#r(ZR(X#tQ-a({Q1d-eQ2W.^Q4W1cQ4t2[Q5|4YQ6[4sQ6}6QQ7W6^R7o7XlgOSi{!k$V%^%a%b%d*_*d.x.{Q%WwR*S%TV$tpq*]R.W)sR*R%RQ$lnR)e$mR)[$gT%[x%_T%]x%_T.z*d.{",
    nodeNames: "\u26A0 ArithOp ArithOp extends LineComment BlockComment Script ExportDeclaration export Star as VariableName from String ; default FunctionDeclaration async function VariableDefinition TypeParamList TypeDefinition ThisType this LiteralType ArithOp Number BooleanLiteral VoidType void TypeofType typeof MemberExpression . ?. PropertyName [ TemplateString null super RegExp ] ArrayExpression Spread , } { ObjectExpression Property async get set PropertyNameDefinition Block : NewExpression new TypeArgList CompareOp < ) ( ArgList UnaryExpression await yield delete LogicOp BitOp ParenthesizedExpression ClassExpression class extends ClassBody MethodDeclaration Privacy static abstract PropertyDeclaration readonly Optional TypeAnnotation Equals FunctionExpression ArrowFunction ParamList ParamList ArrayPattern ObjectPattern PatternProperty Privacy readonly Arrow MemberExpression BinaryExpression ArithOp ArithOp ArithOp ArithOp BitOp CompareOp in instanceof CompareOp BitOp BitOp BitOp LogicOp LogicOp ConditionalExpression LogicOp LogicOp AssignmentExpression UpdateOp PostfixExpression CallExpression TaggedTemplatExpression DynamicImport import ImportMeta JSXElement JSXSelfCloseEndTag JSXStartTag JSXSelfClosingTag JSXIdentifier JSXNamespacedName JSXMemberExpression JSXSpreadAttribute JSXAttribute JSXAttributeValue JSXEscape JSXEndTag JSXOpenTag JSXFragmentTag JSXText JSXEscape JSXStartCloseTag JSXCloseTag PrefixCast ArrowFunction TypeParamList SequenceExpression KeyofType keyof UniqueType unique ImportType InferredType infer TypeName ParenthesizedType FunctionSignature ParamList NewSignature IndexedType TupleType Label ArrayType ReadonlyType ObjectType MethodType PropertyType IndexSignature CallSignature TypePredicate is NewSignature new UnionType LogicOp IntersectionType LogicOp ConditionalType ParameterizedType ClassDeclaration abstract implements type VariableDeclaration let var const TypeAliasDeclaration InterfaceDeclaration interface EnumDeclaration enum EnumBody NamespaceDeclaration namespace module AmbientDeclaration declare GlobalDeclaration global ClassDeclaration ClassBody MethodDeclaration AmbientFunctionDeclaration ExportGroup VariableName VariableName ImportDeclaration ImportGroup ForStatement for ForSpec ForInSpec ForOfSpec of WhileStatement while WithStatement with DoStatement do IfStatement if else SwitchStatement switch SwitchBody CaseLabel case DefaultLabel TryStatement try catch finally ReturnStatement return ThrowStatement throw BreakStatement break ContinueStatement continue DebuggerStatement debugger LabeledStatement ExpressionStatement",
    maxTerm: 321,
    nodeProps: [
      [NodeProp.group, -26, 7, 14, 16, 53, 174, 178, 182, 183, 185, 188, 191, 202, 204, 210, 212, 214, 216, 219, 225, 229, 231, 233, 235, 237, 239, 240, "Statement", -30, 11, 13, 23, 26, 27, 37, 38, 39, 40, 42, 47, 55, 63, 69, 70, 83, 84, 93, 94, 109, 112, 114, 115, 116, 117, 119, 120, 138, 139, 141, "Expression", -21, 22, 24, 28, 30, 142, 144, 146, 147, 149, 150, 151, 153, 154, 155, 157, 158, 159, 168, 170, 172, 173, "Type", -2, 74, 78, "ClassItem"],
      [NodeProp.closedBy, 36, "]", 46, "}", 61, ")", 122, "JSXSelfCloseEndTag JSXEndTag", 136, "JSXEndTag"],
      [NodeProp.openedBy, 41, "[", 45, "{", 60, "(", 121, "JSXStartTag", 131, "JSXStartTag JSXStartCloseTag"]
    ],
    skippedNodes: [0, 4, 5],
    repeatNodeCount: 27,
    tokenData: "!Ck~R!ZOX$tX^%S^p$tpq%Sqr&rrs'zst$ttu/wuv2Xvw2|wx3zxy:byz:rz{;S{|<S|}<g}!O<S!O!P<w!P!QAT!Q!R!0Z!R![!2j![!]!8Y!]!^!8l!^!_!8|!_!`!9y!`!a!;U!a!b!<{!b!c$t!c!}/w!}#O!>^#O#P$t#P#Q!>n#Q#R!?O#R#S/w#S#T!?c#T#o/w#o#p!?s#p#q!?x#q#r!@`#r#s!@r#s#y$t#y#z%S#z$f$t$f$g%S$g#BY/w#BY#BZ!AS#BZ$IS/w$IS$I_!AS$I_$I|/w$I|$JO!AS$JO$JT/w$JT$JU!AS$JU$KV/w$KV$KW!AS$KW&FU/w&FU&FV!AS&FV~/wW$yR#zWO!^$t!_#o$t#p~$t,T%Zg#zW&}+{OX$tX^%S^p$tpq%Sq!^$t!_#o$t#p#y$t#y#z%S#z$f$t$f$g%S$g#BY$t#BY#BZ%S#BZ$IS$t$IS$I_%S$I_$I|$t$I|$JO%S$JO$JT$t$JT$JU%S$JU$KV$t$KV$KW%S$KW&FU$t&FU&FV%S&FV~$t$T&yS#zW!e#{O!^$t!_!`'V!`#o$t#p~$t$O'^S#Z#v#zWO!^$t!_!`'j!`#o$t#p~$t$O'qR#Z#v#zWO!^$t!_#o$t#p~$t'u(RZ#zW]!ROY'zYZ(tZr'zrs*Rs!^'z!^!_*e!_#O'z#O#P,q#P#o'z#o#p*e#p~'z&r(yV#zWOr(trs)`s!^(t!^!_)p!_#o(t#o#p)p#p~(t&r)gR#u&j#zWO!^$t!_#o$t#p~$t&j)sROr)prs)|s~)p&j*RO#u&j'u*[R#u&j#zW]!RO!^$t!_#o$t#p~$t'm*jV]!ROY*eYZ)pZr*ers+Ps#O*e#O#P+W#P~*e'm+WO#u&j]!R'm+ZROr*ers+ds~*e'm+kU#u&j]!ROY+}Zr+}rs,fs#O+}#O#P,k#P~+}!R,SU]!ROY+}Zr+}rs,fs#O+}#O#P,k#P~+}!R,kO]!R!R,nPO~+}'u,vV#zWOr'zrs-]s!^'z!^!_*e!_#o'z#o#p*e#p~'z'u-fZ#u&j#zW]!ROY.XYZ$tZr.Xrs/Rs!^.X!^!_+}!_#O.X#O#P/c#P#o.X#o#p+}#p~.X!Z.`Z#zW]!ROY.XYZ$tZr.Xrs/Rs!^.X!^!_+}!_#O.X#O#P/c#P#o.X#o#p+}#p~.X!Z/YR#zW]!RO!^$t!_#o$t#p~$t!Z/hT#zWO!^.X!^!_+}!_#o.X#o#p+}#p~.X&i0S_#zW#pS'Yp'P%kOt$ttu/wu}$t}!O1R!O!Q$t!Q![/w![!^$t!_!c$t!c!}/w!}#R$t#R#S/w#S#T$t#T#o/w#p$g$t$g~/w[1Y_#zW#pSOt$ttu1Ru}$t}!O1R!O!Q$t!Q![1R![!^$t!_!c$t!c!}1R!}#R$t#R#S1R#S#T$t#T#o1R#p$g$t$g~1R$O2`S#T#v#zWO!^$t!_!`2l!`#o$t#p~$t$O2sR#zW#e#vO!^$t!_#o$t#p~$t%r3TU'm%j#zWOv$tvw3gw!^$t!_!`2l!`#o$t#p~$t$O3nS#zW#_#vO!^$t!_!`2l!`#o$t#p~$t'u4RZ#zW]!ROY3zYZ4tZw3zwx*Rx!^3z!^!_5l!_#O3z#O#P7l#P#o3z#o#p5l#p~3z&r4yV#zWOw4twx)`x!^4t!^!_5`!_#o4t#o#p5`#p~4t&j5cROw5`wx)|x~5`'m5qV]!ROY5lYZ5`Zw5lwx+Px#O5l#O#P6W#P~5l'm6ZROw5lwx6dx~5l'm6kU#u&j]!ROY6}Zw6}wx,fx#O6}#O#P7f#P~6}!R7SU]!ROY6}Zw6}wx,fx#O6}#O#P7f#P~6}!R7iPO~6}'u7qV#zWOw3zwx8Wx!^3z!^!_5l!_#o3z#o#p5l#p~3z'u8aZ#u&j#zW]!ROY9SYZ$tZw9Swx/Rx!^9S!^!_6}!_#O9S#O#P9|#P#o9S#o#p6}#p~9S!Z9ZZ#zW]!ROY9SYZ$tZw9Swx/Rx!^9S!^!_6}!_#O9S#O#P9|#P#o9S#o#p6}#p~9S!Z:RT#zWO!^9S!^!_6}!_#o9S#o#p6}#p~9S%V:iR!_$}#zWO!^$t!_#o$t#p~$tZ:yR!^R#zWO!^$t!_#o$t#p~$t%R;]U'Q!R#U#v#zWOz$tz{;o{!^$t!_!`2l!`#o$t#p~$t$O;vS#R#v#zWO!^$t!_!`2l!`#o$t#p~$t$u<ZSi$m#zWO!^$t!_!`2l!`#o$t#p~$t&i<nR|&a#zWO!^$t!_#o$t#p~$t&i=OVq%n#zWO!O$t!O!P=e!P!Q$t!Q![>Z![!^$t!_#o$t#p~$ty=jT#zWO!O$t!O!P=y!P!^$t!_#o$t#p~$ty>QR{q#zWO!^$t!_#o$t#p~$ty>bZ#zWjqO!Q$t!Q![>Z![!^$t!_!g$t!g!h?T!h#R$t#R#S>Z#S#X$t#X#Y?T#Y#o$t#p~$ty?YZ#zWO{$t{|?{|}$t}!O?{!O!Q$t!Q![@g![!^$t!_#R$t#R#S@g#S#o$t#p~$ty@QV#zWO!Q$t!Q![@g![!^$t!_#R$t#R#S@g#S#o$t#p~$ty@nV#zWjqO!Q$t!Q![@g![!^$t!_#R$t#R#S@g#S#o$t#p~$t,TA[`#zW#S#vOYB^YZ$tZzB^z{HT{!PB^!P!Q!*|!Q!^B^!^!_Da!_!`!+u!`!a!,t!a!}B^!}#O!-s#O#P!/o#P#oB^#o#pDa#p~B^XBe[#zWxPOYB^YZ$tZ!PB^!P!QCZ!Q!^B^!^!_Da!_!}B^!}#OFY#O#PGi#P#oB^#o#pDa#p~B^XCb_#zWxPO!^$t!_#Z$t#Z#[CZ#[#]$t#]#^CZ#^#a$t#a#bCZ#b#g$t#g#hCZ#h#i$t#i#jCZ#j#m$t#m#nCZ#n#o$t#p~$tPDfVxPOYDaZ!PDa!P!QD{!Q!}Da!}#OEd#O#PFP#P~DaPEQUxP#Z#[D{#]#^D{#a#bD{#g#hD{#i#jD{#m#nD{PEgTOYEdZ#OEd#O#PEv#P#QDa#Q~EdPEyQOYEdZ~EdPFSQOYDaZ~DaXF_Y#zWOYFYYZ$tZ!^FY!^!_Ed!_#OFY#O#PF}#P#QB^#Q#oFY#o#pEd#p~FYXGSV#zWOYFYYZ$tZ!^FY!^!_Ed!_#oFY#o#pEd#p~FYXGnV#zWOYB^YZ$tZ!^B^!^!_Da!_#oB^#o#pDa#p~B^,TH[^#zWxPOYHTYZIWZzHTz{Ki{!PHT!P!Q!)j!Q!^HT!^!_Mt!_!}HT!}#O!%e#O#P!(x#P#oHT#o#pMt#p~HT,TI]V#zWOzIWz{Ir{!^IW!^!_Jt!_#oIW#o#pJt#p~IW,TIwX#zWOzIWz{Ir{!PIW!P!QJd!Q!^IW!^!_Jt!_#oIW#o#pJt#p~IW,TJkR#zWT+{O!^$t!_#o$t#p~$t+{JwROzJtz{KQ{~Jt+{KTTOzJtz{KQ{!PJt!P!QKd!Q~Jt+{KiOT+{,TKp^#zWxPOYHTYZIWZzHTz{Ki{!PHT!P!QLl!Q!^HT!^!_Mt!_!}HT!}#O!%e#O#P!(x#P#oHT#o#pMt#p~HT,TLu_#zWT+{xPO!^$t!_#Z$t#Z#[CZ#[#]$t#]#^CZ#^#a$t#a#bCZ#b#g$t#g#hCZ#h#i$t#i#jCZ#j#m$t#m#nCZ#n#o$t#p~$t+{MyYxPOYMtYZJtZzMtz{Ni{!PMt!P!Q!$a!Q!}Mt!}#O! w#O#P!#}#P~Mt+{NnYxPOYMtYZJtZzMtz{Ni{!PMt!P!Q! ^!Q!}Mt!}#O! w#O#P!#}#P~Mt+{! eUT+{xP#Z#[D{#]#^D{#a#bD{#g#hD{#i#jD{#m#nD{+{! zWOY! wYZJtZz! wz{!!d{#O! w#O#P!#k#P#QMt#Q~! w+{!!gYOY! wYZJtZz! wz{!!d{!P! w!P!Q!#V!Q#O! w#O#P!#k#P#QMt#Q~! w+{!#[TT+{OYEdZ#OEd#O#PEv#P#QDa#Q~Ed+{!#nTOY! wYZJtZz! wz{!!d{~! w+{!$QTOYMtYZJtZzMtz{Ni{~Mt+{!$f_xPOzJtz{KQ{#ZJt#Z#[!$a#[#]Jt#]#^!$a#^#aJt#a#b!$a#b#gJt#g#h!$a#h#iJt#i#j!$a#j#mJt#m#n!$a#n~Jt,T!%j[#zWOY!%eYZIWZz!%ez{!&`{!^!%e!^!_! w!_#O!%e#O#P!(W#P#QHT#Q#o!%e#o#p! w#p~!%e,T!&e^#zWOY!%eYZIWZz!%ez{!&`{!P!%e!P!Q!'a!Q!^!%e!^!_! w!_#O!%e#O#P!(W#P#QHT#Q#o!%e#o#p! w#p~!%e,T!'hY#zWT+{OYFYYZ$tZ!^FY!^!_Ed!_#OFY#O#PF}#P#QB^#Q#oFY#o#pEd#p~FY,T!(]X#zWOY!%eYZIWZz!%ez{!&`{!^!%e!^!_! w!_#o!%e#o#p! w#p~!%e,T!(}X#zWOYHTYZIWZzHTz{Ki{!^HT!^!_Mt!_#oHT#o#pMt#p~HT,T!)qc#zWxPOzIWz{Ir{!^IW!^!_Jt!_#ZIW#Z#[!)j#[#]IW#]#^!)j#^#aIW#a#b!)j#b#gIW#g#h!)j#h#iIW#i#j!)j#j#mIW#m#n!)j#n#oIW#o#pJt#p~IW,T!+TV#zWS+{OY!*|YZ$tZ!^!*|!^!_!+j!_#o!*|#o#p!+j#p~!*|+{!+oQS+{OY!+jZ~!+j$P!,O[#zW#e#vxPOYB^YZ$tZ!PB^!P!QCZ!Q!^B^!^!_Da!_!}B^!}#OFY#O#PGi#P#oB^#o#pDa#p~B^]!,}[#mS#zWxPOYB^YZ$tZ!PB^!P!QCZ!Q!^B^!^!_Da!_!}B^!}#OFY#O#PGi#P#oB^#o#pDa#p~B^X!-xY#zWOY!-sYZ$tZ!^!-s!^!_!.h!_#O!-s#O#P!/T#P#QB^#Q#o!-s#o#p!.h#p~!-sP!.kTOY!.hZ#O!.h#O#P!.z#P#QDa#Q~!.hP!.}QOY!.hZ~!.hX!/YV#zWOY!-sYZ$tZ!^!-s!^!_!.h!_#o!-s#o#p!.h#p~!-sX!/tV#zWOYB^YZ$tZ!^B^!^!_Da!_#oB^#o#pDa#p~B^y!0bd#zWjqO!O$t!O!P!1p!P!Q$t!Q![!2j![!^$t!_!g$t!g!h?T!h#R$t#R#S!2j#S#U$t#U#V!4Q#V#X$t#X#Y?T#Y#b$t#b#c!3p#c#d!5`#d#l$t#l#m!6h#m#o$t#p~$ty!1wZ#zWjqO!Q$t!Q![!1p![!^$t!_!g$t!g!h?T!h#R$t#R#S!1p#S#X$t#X#Y?T#Y#o$t#p~$ty!2q_#zWjqO!O$t!O!P!1p!P!Q$t!Q![!2j![!^$t!_!g$t!g!h?T!h#R$t#R#S!2j#S#X$t#X#Y?T#Y#b$t#b#c!3p#c#o$t#p~$ty!3wR#zWjqO!^$t!_#o$t#p~$ty!4VW#zWO!Q$t!Q!R!4o!R!S!4o!S!^$t!_#R$t#R#S!4o#S#o$t#p~$ty!4vW#zWjqO!Q$t!Q!R!4o!R!S!4o!S!^$t!_#R$t#R#S!4o#S#o$t#p~$ty!5eV#zWO!Q$t!Q!Y!5z!Y!^$t!_#R$t#R#S!5z#S#o$t#p~$ty!6RV#zWjqO!Q$t!Q!Y!5z!Y!^$t!_#R$t#R#S!5z#S#o$t#p~$ty!6mZ#zWO!Q$t!Q![!7`![!^$t!_!c$t!c!i!7`!i#R$t#R#S!7`#S#T$t#T#Z!7`#Z#o$t#p~$ty!7gZ#zWjqO!Q$t!Q![!7`![!^$t!_!c$t!c!i!7`!i#R$t#R#S!7`#S#T$t#T#Z!7`#Z#o$t#p~$t%w!8cR!WV#zW#c%hO!^$t!_#o$t#p~$t!P!8sR^w#zWO!^$t!_#o$t#p~$t+c!9XR'Ud![%Y#n&s'qP!P!Q!9b!^!_!9g!_!`!9tW!9gO#|W#v!9lP#V#v!_!`!9o#v!9tO#e#v#v!9yO#W#v%w!:QT!t%o#zWO!^$t!_!`!:a!`!a!:t!a#o$t#p~$t$O!:hS#Z#v#zWO!^$t!_!`'j!`#o$t#p~$t$P!:{R#O#w#zWO!^$t!_#o$t#p~$t%w!;aT'T!s#W#v#wS#zWO!^$t!_!`!;p!`!a!<Q!a#o$t#p~$t$O!;wR#W#v#zWO!^$t!_#o$t#p~$t$O!<XT#V#v#zWO!^$t!_!`2l!`!a!<h!a#o$t#p~$t$O!<oS#V#v#zWO!^$t!_!`2l!`#o$t#p~$t%w!=SV'e%o#zWO!O$t!O!P!=i!P!^$t!_!a$t!a!b!=y!b#o$t#p~$t$`!=pRr$W#zWO!^$t!_#o$t#p~$t$O!>QS#zW#`#vO!^$t!_!`2l!`#o$t#p~$t&e!>eRt&]#zWO!^$t!_#o$t#p~$tZ!>uRyR#zWO!^$t!_#o$t#p~$t$O!?VS#]#v#zWO!^$t!_!`2l!`#o$t#p~$t$P!?jR#zW']#wO!^$t!_#o$t#p~$t~!?xO!O~%r!@PT'l%j#zWO!^$t!_!`2l!`#o$t#p#q!=y#q~$t$u!@iR}$k#zW'_QO!^$t!_#o$t#p~$tX!@yR!fP#zWO!^$t!_#o$t#p~$t,T!Aar#zW#pS'Yp'P%k&}+{OX$tX^%S^p$tpq%Sqt$ttu/wu}$t}!O1R!O!Q$t!Q![/w![!^$t!_!c$t!c!}/w!}#R$t#R#S/w#S#T$t#T#o/w#p#y$t#y#z%S#z$f$t$f$g%S$g#BY/w#BY#BZ!AS#BZ$IS/w$IS$I_!AS$I_$I|/w$I|$JO!AS$JO$JT/w$JT$JU!AS$JU$KV/w$KV$KW!AS$KW&FU/w&FU&FV!AS&FV~/w",
    tokenizers: [noSemicolon, incdecToken, template, 0, 1, 2, 3, 4, 5, 6, 7, 8, insertSemicolon],
    topRules: {"Script": [0, 6]},
    dialects: {jsx: 12773, ts: 12775},
    dynamicPrecedences: {"139": 1, "166": 1},
    specialized: [{term: 277, get: (value, stack) => tsExtends(value, stack) << 1 | 1}, {term: 277, get: (value) => spec_identifier[value] || -1}, {term: 286, get: (value) => spec_word[value] || -1}, {term: 58, get: (value) => spec_LessThan[value] || -1}],
    tokenPrec: 12795
  });

  // ../highlight/src/highlight.ts
  var nextTagID = 0;
  var Tag = class {
    constructor(set, base2, modified) {
      this.set = set;
      this.base = base2;
      this.modified = modified;
      this.id = nextTagID++;
    }
    static define(parent) {
      if (parent?.base)
        throw new Error("Can not derive from a modified tag");
      let tag = new Tag([], null, []);
      tag.set.push(tag);
      if (parent)
        for (let t2 of parent.set)
          tag.set.push(t2);
      return tag;
    }
    static defineModifier() {
      let mod = new Modifier();
      return (tag) => {
        if (tag.modified.indexOf(mod) > -1)
          return tag;
        return Modifier.get(tag.base || tag, tag.modified.concat(mod).sort((a, b) => a.id - b.id));
      };
    }
  };
  var nextModifierID = 0;
  var Modifier = class {
    constructor() {
      this.instances = [];
      this.id = nextModifierID++;
    }
    static get(base2, mods) {
      if (!mods.length)
        return base2;
      let exists = mods[0].instances.find((t2) => t2.base == base2 && sameArray2(mods, t2.modified));
      if (exists)
        return exists;
      let set = [], tag = new Tag(set, base2, mods);
      for (let m of mods)
        m.instances.push(tag);
      let configs = permute(mods);
      for (let parent of base2.set)
        for (let config2 of configs)
          set.push(Modifier.get(parent, config2));
      return tag;
    }
  };
  function sameArray2(a, b) {
    return a.length == b.length && a.every((x, i) => x == b[i]);
  }
  function permute(array) {
    let result = [array];
    for (let i = 0; i < array.length; i++) {
      for (let a of permute(array.slice(0, i).concat(array.slice(i + 1))))
        result.push(a);
    }
    return result;
  }
  function styleTags(spec) {
    let byName = Object.create(null);
    for (let prop in spec) {
      let tags2 = spec[prop];
      if (!Array.isArray(tags2))
        tags2 = [tags2];
      for (let part of prop.split(" "))
        if (part) {
          let pieces = [], mode = Mode.Normal, rest = part;
          for (let pos = 0; ; ) {
            if (rest == "..." && pos > 0 && pos + 3 == part.length) {
              mode = Mode.Inherit;
              break;
            }
            let m = /^"(?:[^"\\]|\\.)*?"|[^\/!]+/.exec(rest);
            if (!m)
              throw new RangeError("Invalid path: " + part);
            pieces.push(m[0] == "*" ? null : m[0][0] == '"' ? JSON.parse(m[0]) : m[0]);
            pos += m[0].length;
            if (pos == part.length)
              break;
            let next = part[pos++];
            if (pos == part.length && next == "!") {
              mode = Mode.Opaque;
              break;
            }
            if (next != "/")
              throw new RangeError("Invalid path: " + part);
            rest = part.slice(pos);
          }
          let last = pieces.length - 1, inner = pieces[last];
          if (!inner)
            throw new RangeError("Invalid path: " + part);
          let rule = new Rule(tags2, mode, last > 0 ? pieces.slice(0, last) : null);
          byName[inner] = rule.sort(byName[inner]);
        }
    }
    return ruleNodeProp.add(byName);
  }
  var ruleNodeProp = new NodeProp();
  var highlightStyle = Facet.define({
    combine(stylings) {
      return stylings.length ? HighlightStyle.combinedMatch(stylings) : null;
    }
  });
  var fallbackHighlightStyle = Facet.define({
    combine(values) {
      return values.length ? values[0].match : null;
    }
  });
  function getHighlightStyle(state) {
    return state.facet(highlightStyle) || state.facet(fallbackHighlightStyle);
  }
  var Mode;
  (function(Mode2) {
    Mode2[Mode2["Opaque"] = 0] = "Opaque";
    Mode2[Mode2["Inherit"] = 1] = "Inherit";
    Mode2[Mode2["Normal"] = 2] = "Normal";
  })(Mode || (Mode = {}));
  var Rule = class {
    constructor(tags2, mode, context, next) {
      this.tags = tags2;
      this.mode = mode;
      this.context = context;
      this.next = next;
    }
    sort(other) {
      if (!other || other.depth < this.depth) {
        this.next = other;
        return this;
      }
      other.next = this.sort(other.next);
      return other;
    }
    get depth() {
      return this.context ? this.context.length : 0;
    }
  };
  var HighlightStyle = class {
    constructor(spec, options) {
      this.map = Object.create(null);
      let modSpec;
      function def(spec2) {
        let cls = StyleModule.newName();
        (modSpec || (modSpec = Object.create(null)))["." + cls] = spec2;
        return cls;
      }
      this.all = typeof options.all == "string" ? options.all : options.all ? def(options.all) : null;
      for (let style of spec) {
        let cls = (style.class || def(Object.assign({}, style, {tag: null}))) + (this.all ? " " + this.all : "");
        let tags2 = style.tag;
        if (!Array.isArray(tags2))
          this.map[tags2.id] = cls;
        else
          for (let tag of tags2)
            this.map[tag.id] = cls;
      }
      this.module = modSpec ? new StyleModule(modSpec) : null;
      this.scope = options.scope || null;
      this.match = this.match.bind(this);
      let ext = [treeHighlighter];
      if (this.module)
        ext.push(EditorView.styleModule.of(this.module));
      this.extension = ext.concat(highlightStyle.of(this));
      this.fallback = ext.concat(fallbackHighlightStyle.of(this));
    }
    match(tag, scope) {
      if (this.scope && scope != this.scope)
        return null;
      for (let t2 of tag.set) {
        let match = this.map[t2.id];
        if (match !== void 0) {
          if (t2 != tag)
            this.map[tag.id] = match;
          return match;
        }
      }
      return this.map[tag.id] = this.all;
    }
    static combinedMatch(styles) {
      if (styles.length == 1)
        return styles[0].match;
      let cache = styles.some((s) => s.scope) ? void 0 : Object.create(null);
      return (tag, scope) => {
        let cached = cache && cache[tag.id];
        if (cached !== void 0)
          return cached;
        let result = null;
        for (let style of styles) {
          let value = style.match(tag, scope);
          if (value)
            result = result ? result + " " + value : value;
        }
        if (cache)
          cache[tag.id] = result;
        return result;
      };
    }
    static define(specs, options) {
      return new HighlightStyle(specs, options || {});
    }
    static get(state, tag, scope) {
      let style = getHighlightStyle(state);
      return style && style(tag, scope || NodeType.none);
    }
  };
  var TreeHighlighter = class {
    constructor(view) {
      this.markCache = Object.create(null);
      this.tree = syntaxTree(view.state);
      this.decorations = this.buildDeco(view, getHighlightStyle(view.state));
    }
    update(update) {
      let tree = syntaxTree(update.state), style = getHighlightStyle(update.state);
      let styleChange = style != update.startState.facet(highlightStyle);
      if (tree.length < update.view.viewport.to && !styleChange) {
        this.decorations = this.decorations.map(update.changes);
      } else if (tree != this.tree || update.viewportChanged || styleChange) {
        this.tree = tree;
        this.decorations = this.buildDeco(update.view, style);
      }
    }
    buildDeco(view, match) {
      if (!match || !this.tree.length)
        return Decoration.none;
      let builder = new RangeSetBuilder();
      for (let {from, to} of view.visibleRanges) {
        highlightTreeRange(this.tree, from, to, match, (from2, to2, style) => {
          builder.add(from2, to2, this.markCache[style] || (this.markCache[style] = Decoration.mark({class: style})));
        });
      }
      return builder.finish();
    }
  };
  var treeHighlighter = Prec.fallback(ViewPlugin.fromClass(TreeHighlighter, {
    decorations: (v) => v.decorations
  }));
  var nodeStack = [""];
  function highlightTreeRange(tree, from, to, style, span) {
    let spanStart = from, spanClass = "";
    let cursor = tree.topNode.cursor;
    function flush(at, newClass) {
      if (spanClass)
        span(spanStart, at, spanClass);
      spanStart = at;
      spanClass = newClass;
    }
    function node(inheritedClass, depth2, scope) {
      let {type, from: start, to: end} = cursor;
      if (start >= to || end <= from)
        return;
      nodeStack[depth2] = type.name;
      if (type.isTop)
        scope = type;
      let cls = inheritedClass;
      let rule = type.prop(ruleNodeProp), opaque = false;
      while (rule) {
        if (!rule.context || matchContext(rule.context, nodeStack, depth2)) {
          for (let tag of rule.tags) {
            let st = style(tag, scope);
            if (st) {
              if (cls)
                cls += " ";
              cls += st;
              if (rule.mode == 1)
                inheritedClass += (inheritedClass ? " " : "") + st;
              else if (rule.mode == 0)
                opaque = true;
            }
          }
          break;
        }
        rule = rule.next;
      }
      let upto = start;
      if (!opaque && cursor.firstChild()) {
        do {
          if (cursor.from > upto && spanClass != cls)
            flush(upto, cls);
          upto = cursor.to;
          node(inheritedClass, depth2 + 1, scope);
        } while (cursor.nextSibling());
        cursor.parent();
      }
      if (end > upto && spanClass != cls)
        flush(upto, cls);
    }
    node("", 0, tree.type);
    flush(to, "");
  }
  function matchContext(context, stack, depth2) {
    if (context.length > depth2 - 1)
      return false;
    for (let d = depth2 - 1, i = context.length - 1; i >= 0; i--, d--) {
      let check = context[i];
      if (check && check != stack[d])
        return false;
    }
    return true;
  }
  var t = Tag.define;
  var comment = t();
  var name = t();
  var typeName = t(name);
  var literal = t();
  var string = t(literal);
  var number = t(literal);
  var content = t();
  var heading = t(content);
  var keyword = t();
  var operator = t();
  var punctuation = t();
  var bracket = t(punctuation);
  var meta = t();
  var tags = {
    comment,
    lineComment: t(comment),
    blockComment: t(comment),
    docComment: t(comment),
    name,
    variableName: t(name),
    typeName,
    tagName: t(typeName),
    propertyName: t(name),
    className: t(name),
    labelName: t(name),
    namespace: t(name),
    macroName: t(name),
    literal,
    string,
    docString: t(string),
    character: t(string),
    number,
    integer: t(number),
    float: t(number),
    bool: t(literal),
    regexp: t(literal),
    escape: t(literal),
    color: t(literal),
    url: t(literal),
    keyword,
    self: t(keyword),
    null: t(keyword),
    atom: t(keyword),
    unit: t(keyword),
    modifier: t(keyword),
    operatorKeyword: t(keyword),
    controlKeyword: t(keyword),
    definitionKeyword: t(keyword),
    operator,
    derefOperator: t(operator),
    arithmeticOperator: t(operator),
    logicOperator: t(operator),
    bitwiseOperator: t(operator),
    compareOperator: t(operator),
    updateOperator: t(operator),
    definitionOperator: t(operator),
    typeOperator: t(operator),
    controlOperator: t(operator),
    punctuation,
    separator: t(punctuation),
    bracket,
    angleBracket: t(bracket),
    squareBracket: t(bracket),
    paren: t(bracket),
    brace: t(bracket),
    content,
    heading,
    heading1: t(heading),
    heading2: t(heading),
    heading3: t(heading),
    heading4: t(heading),
    heading5: t(heading),
    heading6: t(heading),
    contentSeparator: t(content),
    list: t(content),
    quote: t(content),
    emphasis: t(content),
    strong: t(content),
    link: t(content),
    monospace: t(content),
    inserted: t(),
    deleted: t(),
    changed: t(),
    invalid: t(),
    meta,
    documentMeta: t(meta),
    annotation: t(meta),
    processingInstruction: t(meta),
    definition: Tag.defineModifier(),
    constant: Tag.defineModifier(),
    function: Tag.defineModifier(),
    standard: Tag.defineModifier(),
    local: Tag.defineModifier(),
    special: Tag.defineModifier()
  };
  var defaultHighlightStyle = HighlightStyle.define([
    {
      tag: tags.link,
      textDecoration: "underline"
    },
    {
      tag: tags.heading,
      textDecoration: "underline",
      fontWeight: "bold"
    },
    {
      tag: tags.emphasis,
      fontStyle: "italic"
    },
    {
      tag: tags.strong,
      fontWeight: "bold"
    },
    {
      tag: tags.keyword,
      color: "#708"
    },
    {
      tag: [tags.atom, tags.bool, tags.url, tags.contentSeparator, tags.labelName],
      color: "#219"
    },
    {
      tag: [tags.literal, tags.inserted],
      color: "#164"
    },
    {
      tag: [tags.string, tags.deleted],
      color: "#a11"
    },
    {
      tag: [tags.regexp, tags.escape, tags.special(tags.string)],
      color: "#e40"
    },
    {
      tag: tags.definition(tags.variableName),
      color: "#00f"
    },
    {
      tag: tags.local(tags.variableName),
      color: "#30a"
    },
    {
      tag: [tags.typeName, tags.namespace],
      color: "#085"
    },
    {
      tag: tags.className,
      color: "#167"
    },
    {
      tag: [tags.special(tags.variableName), tags.macroName],
      color: "#256"
    },
    {
      tag: tags.definition(tags.propertyName),
      color: "#00c"
    },
    {
      tag: tags.comment,
      color: "#940"
    },
    {
      tag: tags.meta,
      color: "#7a757a"
    },
    {
      tag: tags.invalid,
      color: "#f00"
    }
  ]);
  var classHighlightStyle = HighlightStyle.define([
    {tag: tags.link, class: "cmt-link"},
    {tag: tags.heading, class: "cmt-heading"},
    {tag: tags.emphasis, class: "cmt-emphasis"},
    {tag: tags.strong, class: "cmt-strong"},
    {tag: tags.keyword, class: "cmt-keyword"},
    {tag: tags.atom, class: "cmt-atom"},
    {tag: tags.bool, class: "cmt-bool"},
    {tag: tags.url, class: "cmt-url"},
    {tag: tags.labelName, class: "cmt-labelName"},
    {tag: tags.inserted, class: "cmt-inserted"},
    {tag: tags.deleted, class: "cmt-deleted"},
    {tag: tags.literal, class: "cmt-literal"},
    {tag: tags.string, class: "cmt-string"},
    {tag: tags.number, class: "cmt-number"},
    {tag: [tags.regexp, tags.escape, tags.special(tags.string)], class: "cmt-string2"},
    {tag: tags.variableName, class: "cmt-variableName"},
    {tag: tags.local(tags.variableName), class: "cmt-variableName cmt-local"},
    {tag: tags.definition(tags.variableName), class: "cmt-variableName cmt-definition"},
    {tag: tags.special(tags.variableName), class: "cmt-variableName2"},
    {tag: tags.typeName, class: "cmt-typeName"},
    {tag: tags.namespace, class: "cmt-namespace"},
    {tag: tags.macroName, class: "cmt-macroName"},
    {tag: tags.propertyName, class: "cmt-propertyName"},
    {tag: tags.operator, class: "cmt-operator"},
    {tag: tags.comment, class: "cmt-comment"},
    {tag: tags.meta, class: "cmt-meta"},
    {tag: tags.invalid, class: "cmt-invalid"},
    {tag: tags.punctuation, class: "cmt-punctuation"}
  ]);

  // ../tooltip/src/tooltip.ts
  var ios = typeof navigator != "undefined" && !/Edge\/(\d+)/.exec(navigator.userAgent) && /Apple Computer/.test(navigator.vendor) && (/Mobile\/\w+/.test(navigator.userAgent) || navigator.maxTouchPoints > 2);
  var Outside = "-10000px";
  var tooltipPlugin = ViewPlugin.fromClass(class {
    constructor(view) {
      this.view = view;
      this.inView = true;
      this.measureReq = {read: this.readMeasure.bind(this), write: this.writeMeasure.bind(this), key: this};
      this.input = view.state.facet(showTooltip);
      this.tooltips = this.input.filter((t2) => t2);
      this.tooltipViews = this.tooltips.map((tp) => this.createTooltip(tp));
    }
    update(update) {
      let input = update.state.facet(showTooltip);
      if (input == this.input) {
        for (let t2 of this.tooltipViews)
          if (t2.update)
            t2.update(update);
      } else {
        let tooltips = input.filter((x) => x);
        let views = [];
        for (let i = 0; i < tooltips.length; i++) {
          let tip = tooltips[i], known = -1;
          if (!tip)
            continue;
          for (let i2 = 0; i2 < this.tooltips.length; i2++) {
            let other = this.tooltips[i2];
            if (other && other.create == tip.create)
              known = i2;
          }
          if (known < 0) {
            views[i] = this.createTooltip(tip);
          } else {
            let tooltipView = views[i] = this.tooltipViews[known];
            if (tooltipView.update)
              tooltipView.update(update);
          }
        }
        for (let t2 of this.tooltipViews)
          if (views.indexOf(t2) < 0)
            t2.dom.remove();
        this.input = input;
        this.tooltips = tooltips;
        this.tooltipViews = views;
        this.maybeMeasure();
      }
    }
    createTooltip(tooltip) {
      let tooltipView = tooltip.create(this.view);
      tooltipView.dom.classList.add("cm-tooltip");
      if (tooltip.class)
        tooltipView.dom.classList.add(tooltip.class);
      tooltipView.dom.style.top = Outside;
      this.view.dom.appendChild(tooltipView.dom);
      if (tooltipView.mount)
        tooltipView.mount(this.view);
      return tooltipView;
    }
    destroy() {
      for (let {dom} of this.tooltipViews)
        dom.remove();
    }
    readMeasure() {
      return {
        editor: this.view.dom.getBoundingClientRect(),
        pos: this.tooltips.map((t2) => this.view.coordsAtPos(t2.pos)),
        size: this.tooltipViews.map(({dom}) => dom.getBoundingClientRect()),
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight
      };
    }
    writeMeasure(measured) {
      let {editor} = measured;
      let others = [];
      for (let i = 0; i < this.tooltips.length; i++) {
        let tooltip = this.tooltips[i], tView = this.tooltipViews[i], {dom} = tView;
        let pos = measured.pos[i], size = measured.size[i];
        if (!pos || pos.bottom <= editor.top || pos.top >= editor.bottom || pos.right <= editor.left || pos.left >= editor.right) {
          dom.style.top = Outside;
          continue;
        }
        let width = size.right - size.left, height = size.bottom - size.top;
        let left = this.view.textDirection == Direction.LTR ? Math.min(pos.left, measured.innerWidth - width) : Math.max(0, pos.left - width);
        let above = !!tooltip.above;
        if (!tooltip.strictSide && (above ? pos.top - (size.bottom - size.top) < 0 : pos.bottom + (size.bottom - size.top) > measured.innerHeight))
          above = !above;
        let top2 = above ? pos.top - height : pos.bottom, right = left + width;
        for (let r of others)
          if (r.left < right && r.right > left && r.top < top2 + height && r.bottom > top2)
            top2 = above ? r.top - height : r.bottom;
        if (ios) {
          dom.style.top = top2 - editor.top + "px";
          dom.style.left = left - editor.left + "px";
          dom.style.position = "absolute";
        } else {
          dom.style.top = top2 + "px";
          dom.style.left = left + "px";
        }
        others.push({left, top: top2, right, bottom: top2 + height});
        dom.classList.toggle("cm-tooltip-above", above);
        dom.classList.toggle("cm-tooltip-below", !above);
        if (tView.positioned)
          tView.positioned();
      }
    }
    maybeMeasure() {
      if (this.tooltips.length) {
        if (this.view.inView || this.inView)
          this.view.requestMeasure(this.measureReq);
        this.inView = this.view.inView;
      }
    }
  }, {
    eventHandlers: {
      scroll() {
        this.maybeMeasure();
      }
    }
  });
  var baseTheme3 = EditorView.baseTheme({
    ".cm-tooltip": {
      position: "fixed",
      zIndex: 100
    },
    "&light .cm-tooltip": {
      border: "1px solid #ddd",
      backgroundColor: "#f5f5f5"
    },
    "&dark .cm-tooltip": {
      backgroundColor: "#333338",
      color: "white"
    }
  });
  var showTooltip = Facet.define({
    enables: [tooltipPlugin, baseTheme3]
  });

  // ../autocomplete/src/completion.ts
  var CompletionContext = class {
    constructor(state, pos, explicit) {
      this.state = state;
      this.pos = pos;
      this.explicit = explicit;
      this.abortListeners = [];
    }
    tokenBefore(types2) {
      let token = syntaxTree(this.state).resolve(this.pos, -1);
      while (token && types2.indexOf(token.name) < 0)
        token = token.parent;
      return token ? {
        from: token.from,
        to: this.pos,
        text: this.state.sliceDoc(token.from, this.pos),
        type: token.type
      } : null;
    }
    matchBefore(expr) {
      let line = this.state.doc.lineAt(this.pos);
      let start = Math.max(line.from, this.pos - 250);
      let str = line.text.slice(start - line.from, this.pos - line.from);
      let found = str.search(ensureAnchor(expr, false));
      return found < 0 ? null : {from: start + found, to: this.pos, text: str.slice(found)};
    }
    get aborted() {
      return this.abortListeners == null;
    }
    addEventListener(type, listener) {
      if (type == "abort" && this.abortListeners)
        this.abortListeners.push(listener);
    }
  };
  function toSet(chars) {
    let flat = Object.keys(chars).join("");
    let words = /\w/.test(flat);
    if (words)
      flat = flat.replace(/\w/g, "");
    return `[${words ? "\\w" : ""}${flat.replace(/[^\w\s]/g, "\\$&")}]`;
  }
  function prefixMatch(options) {
    let first = Object.create(null), rest = Object.create(null);
    for (let {label} of options) {
      first[label[0]] = true;
      for (let i = 1; i < label.length; i++)
        rest[label[i]] = true;
    }
    let source = toSet(first) + toSet(rest) + "*$";
    return [new RegExp("^" + source), new RegExp(source)];
  }
  function completeFromList(list) {
    let options = list.map((o) => typeof o == "string" ? {label: o} : o);
    let [span, match] = options.every((o) => /^\w+$/.test(o.label)) ? [/\w*$/, /\w+$/] : prefixMatch(options);
    return (context) => {
      let token = context.matchBefore(match);
      return token || context.explicit ? {from: token ? token.from : context.pos, options, span} : null;
    };
  }
  function ifNotIn(nodes, source) {
    return (context) => {
      for (let pos = syntaxTree(context.state).resolve(context.pos, -1); pos; pos = pos.parent)
        if (nodes.indexOf(pos.name) > -1)
          return null;
      return source(context);
    };
  }
  var Option = class {
    constructor(completion, source, match) {
      this.completion = completion;
      this.source = source;
      this.match = match;
    }
  };
  function cur(state) {
    return state.selection.main.head;
  }
  function ensureAnchor(expr, start) {
    let {source} = expr;
    let addStart = start && source[0] != "^", addEnd = source[source.length - 1] != "$";
    if (!addStart && !addEnd)
      return expr;
    return new RegExp(`${addStart ? "^" : ""}(?:${source})${addEnd ? "$" : ""}`, expr.flags ?? (expr.ignoreCase ? "i" : ""));
  }
  function applyCompletion(view, option) {
    let apply = option.completion.apply || option.completion.label;
    let result = option.source;
    if (typeof apply == "string") {
      view.dispatch({
        changes: {from: result.from, to: result.to, insert: apply},
        selection: {anchor: result.from + apply.length}
      });
    } else {
      apply(view, option.completion, result.from, result.to);
    }
  }
  var SourceCache = new WeakMap();
  function asSource(source) {
    if (!Array.isArray(source))
      return source;
    let known = SourceCache.get(source);
    if (!known)
      SourceCache.set(source, known = completeFromList(source));
    return known;
  }

  // ../autocomplete/src/filter.ts
  var Penalty;
  (function(Penalty2) {
    Penalty2[Penalty2["Gap"] = -1100] = "Gap";
    Penalty2[Penalty2["NotStart"] = -700] = "NotStart";
    Penalty2[Penalty2["CaseFold"] = -200] = "CaseFold";
    Penalty2[Penalty2["ByWord"] = -100] = "ByWord";
  })(Penalty || (Penalty = {}));
  var Tp;
  (function(Tp2) {
    Tp2[Tp2["NonWord"] = 0] = "NonWord";
    Tp2[Tp2["Upper"] = 1] = "Upper";
    Tp2[Tp2["Lower"] = 2] = "Lower";
  })(Tp || (Tp = {}));
  var FuzzyMatcher = class {
    constructor(pattern) {
      this.pattern = pattern;
      this.chars = [];
      this.folded = [];
      this.any = [];
      this.precise = [];
      this.byWord = [];
      for (let p = 0; p < pattern.length; ) {
        let char = codePointAt(pattern, p), size = codePointSize(char);
        this.chars.push(char);
        let part = pattern.slice(p, p + size), upper = part.toUpperCase();
        this.folded.push(codePointAt(upper == part ? part.toLowerCase() : upper, 0));
        p += size;
      }
      this.astral = pattern.length != this.chars.length;
    }
    match(word) {
      if (this.pattern.length == 0)
        return [0];
      if (word.length < this.pattern.length)
        return null;
      let {chars, folded, any, precise, byWord} = this;
      if (chars.length == 1) {
        let first = codePointAt(word, 0);
        return first == chars[0] ? [0, 0, codePointSize(first)] : first == folded[0] ? [-200, 0, codePointSize(first)] : null;
      }
      let direct = word.indexOf(this.pattern);
      if (direct == 0)
        return [0, 0, this.pattern.length];
      let len = chars.length, anyTo = 0;
      if (direct < 0) {
        for (let i = 0, e = Math.min(word.length, 200); i < e && anyTo < len; ) {
          let next = codePointAt(word, i);
          if (next == chars[anyTo] || next == folded[anyTo])
            any[anyTo++] = i;
          i += codePointSize(next);
        }
        if (anyTo < len)
          return null;
      }
      let preciseTo = 0;
      let byWordTo = 0, byWordFolded = false;
      let adjacentTo = 0, adjacentStart = -1, adjacentEnd = -1;
      let hasLower = /[a-z]/.test(word);
      for (let i = 0, e = Math.min(word.length, 200), prevType = 0; i < e && byWordTo < len; ) {
        let next = codePointAt(word, i);
        if (direct < 0) {
          if (preciseTo < len && next == chars[preciseTo])
            precise[preciseTo++] = i;
          if (adjacentTo < len) {
            if (next == chars[adjacentTo] || next == folded[adjacentTo]) {
              if (adjacentTo == 0)
                adjacentStart = i;
              adjacentEnd = i;
              adjacentTo++;
            } else {
              adjacentTo = 0;
            }
          }
        }
        let ch, type = next < 255 ? next >= 48 && next <= 57 || next >= 97 && next <= 122 ? 2 : next >= 65 && next <= 90 ? 1 : 0 : (ch = fromCodePoint(next)) != ch.toLowerCase() ? 1 : ch != ch.toUpperCase() ? 2 : 0;
        if ((type == 1 && hasLower || prevType == 0 && type != 0) && (chars[byWordTo] == next || folded[byWordTo] == next && (byWordFolded = true)))
          byWord[byWordTo++] = i;
        prevType = type;
        i += codePointSize(next);
      }
      if (byWordTo == len && byWord[0] == 0)
        return this.result(-100 + (byWordFolded ? -200 : 0), byWord, word);
      if (adjacentTo == len && adjacentStart == 0)
        return [-200, 0, adjacentEnd];
      if (direct > -1)
        return [-700, direct, direct + this.pattern.length];
      if (adjacentTo == len)
        return [-200 + -700, adjacentStart, adjacentEnd];
      if (byWordTo == len)
        return this.result(-100 + (byWordFolded ? -200 : 0) + -700, byWord, word);
      return chars.length == 2 ? null : this.result((any[0] ? -700 : 0) + -200 + -1100, any, word);
    }
    result(score2, positions, word) {
      let result = [score2], i = 1;
      for (let pos of positions) {
        let to = pos + (this.astral ? codePointSize(codePointAt(word, pos)) : 1);
        if (i > 1 && result[i - 1] == pos)
          result[i - 1] = to;
        else {
          result[i++] = pos;
          result[i++] = to;
        }
      }
      return result;
    }
  };

  // ../autocomplete/src/config.ts
  var completionConfig = Facet.define({
    combine(configs) {
      return combineConfig(configs, {
        activateOnTyping: true,
        override: null,
        maxRenderedOptions: 100,
        defaultKeymap: true
      }, {
        defaultKeymap: (a, b) => a && b
      });
    }
  });

  // ../autocomplete/src/theme.ts
  var MaxInfoWidth = 300;
  var baseTheme4 = EditorView.baseTheme({
    ".cm-tooltip.cm-tooltip-autocomplete": {
      "& > ul": {
        fontFamily: "monospace",
        whiteSpace: "nowrap",
        overflow: "auto",
        maxWidth_fallback: "700px",
        maxWidth: "min(700px, 95vw)",
        maxHeight: "10em",
        listStyle: "none",
        margin: 0,
        padding: 0,
        "& > li": {
          cursor: "pointer",
          padding: "1px 1em 1px 3px",
          lineHeight: 1.2
        },
        "& > li[aria-selected]": {
          background_fallback: "#bdf",
          backgroundColor: "Highlight",
          color_fallback: "white",
          color: "HighlightText"
        }
      }
    },
    ".cm-completionListIncompleteTop:before, .cm-completionListIncompleteBottom:after": {
      content: '"\xB7\xB7\xB7"',
      opacity: 0.5,
      display: "block",
      textAlign: "center"
    },
    ".cm-tooltip.cm-completionInfo": {
      position: "absolute",
      padding: "3px 9px",
      width: "max-content",
      maxWidth: MaxInfoWidth + "px"
    },
    ".cm-completionInfo.cm-completionInfo-left": {right: "100%"},
    ".cm-completionInfo.cm-completionInfo-right": {left: "100%"},
    "&light .cm-snippetField": {backgroundColor: "#00000022"},
    "&dark .cm-snippetField": {backgroundColor: "#ffffff22"},
    ".cm-snippetFieldPosition": {
      verticalAlign: "text-top",
      width: 0,
      height: "1.15em",
      margin: "0 -0.7px -.7em",
      borderLeft: "1.4px dotted #888"
    },
    ".cm-completionMatchedText": {
      textDecoration: "underline"
    },
    ".cm-completionDetail": {
      marginLeft: "0.5em",
      fontStyle: "italic"
    },
    ".cm-completionIcon": {
      fontSize: "90%",
      width: ".8em",
      display: "inline-block",
      textAlign: "center",
      paddingRight: ".6em",
      opacity: "0.6"
    },
    ".cm-completionIcon-function, .cm-completionIcon-method": {
      "&:after": {content: "'\u0192'"}
    },
    ".cm-completionIcon-class": {
      "&:after": {content: "'\u25CB'"}
    },
    ".cm-completionIcon-interface": {
      "&:after": {content: "'\u25CC'"}
    },
    ".cm-completionIcon-variable": {
      "&:after": {content: "'\u{1D465}'"}
    },
    ".cm-completionIcon-constant": {
      "&:after": {content: "'\u{1D436}'"}
    },
    ".cm-completionIcon-type": {
      "&:after": {content: "'\u{1D461}'"}
    },
    ".cm-completionIcon-enum": {
      "&:after": {content: "'\u222A'"}
    },
    ".cm-completionIcon-property": {
      "&:after": {content: "'\u25A1'"}
    },
    ".cm-completionIcon-keyword": {
      "&:after": {content: "'\u{1F511}\uFE0E'"}
    },
    ".cm-completionIcon-namespace": {
      "&:after": {content: "'\u25A2'"}
    },
    ".cm-completionIcon-text": {
      "&:after": {content: "'abc'", fontSize: "50%", verticalAlign: "middle"}
    }
  });

  // ../autocomplete/src/tooltip.ts
  function createListBox(options, id, range) {
    const ul = document.createElement("ul");
    ul.id = id;
    ul.setAttribute("role", "listbox");
    ul.setAttribute("aria-expanded", "true");
    for (let i = range.from; i < range.to; i++) {
      let {completion, match} = options[i];
      const li = ul.appendChild(document.createElement("li"));
      li.id = id + "-" + i;
      let icon = li.appendChild(document.createElement("div"));
      icon.classList.add("cm-completionIcon");
      if (completion.type)
        icon.classList.add("cm-completionIcon-" + completion.type);
      icon.setAttribute("aria-hidden", "true");
      let labelElt = li.appendChild(document.createElement("span"));
      labelElt.className = "cm-completionLabel";
      let {label, detail} = completion, off = 0;
      for (let j = 1; j < match.length; ) {
        let from = match[j++], to = match[j++];
        if (from > off)
          labelElt.appendChild(document.createTextNode(label.slice(off, from)));
        let span = labelElt.appendChild(document.createElement("span"));
        span.appendChild(document.createTextNode(label.slice(from, to)));
        span.className = "cm-completionMatchedText";
        off = to;
      }
      if (off < label.length)
        labelElt.appendChild(document.createTextNode(label.slice(off)));
      if (detail) {
        let detailElt = li.appendChild(document.createElement("span"));
        detailElt.className = "cm-completionDetail";
        detailElt.textContent = detail;
      }
      li.setAttribute("role", "option");
    }
    if (range.from)
      ul.classList.add("cm-completionListIncompleteTop");
    if (range.to < options.length)
      ul.classList.add("cm-completionListIncompleteBottom");
    return ul;
  }
  function createInfoDialog(option, view) {
    let dom = document.createElement("div");
    dom.className = "cm-tooltip cm-completionInfo";
    let {info} = option.completion;
    if (typeof info == "string") {
      dom.textContent = info;
    } else {
      let content2 = info(option.completion);
      if (content2.then)
        content2.then((node) => dom.appendChild(node), (e) => logException(view.state, e, "completion info"));
      else
        dom.appendChild(content2);
    }
    return dom;
  }
  function rangeAroundSelected(total, selected, max) {
    if (total <= max)
      return {from: 0, to: total};
    if (selected <= total >> 1) {
      let off2 = Math.floor(selected / max);
      return {from: off2 * max, to: (off2 + 1) * max};
    }
    let off = Math.floor((total - selected) / max);
    return {from: total - (off + 1) * max, to: total - off * max};
  }
  var CompletionTooltip = class {
    constructor(view, stateField) {
      this.view = view;
      this.stateField = stateField;
      this.info = null;
      this.placeInfo = {
        read: () => this.measureInfo(),
        write: (pos) => this.positionInfo(pos),
        key: this
      };
      let cState = view.state.field(stateField);
      let {options, selected} = cState.open;
      let config2 = view.state.facet(completionConfig);
      this.range = rangeAroundSelected(options.length, selected, config2.maxRenderedOptions);
      this.dom = document.createElement("div");
      this.dom.className = "cm-tooltip-autocomplete";
      this.dom.addEventListener("mousedown", (e) => {
        for (let dom = e.target, match; dom && dom != this.dom; dom = dom.parentNode) {
          if (dom.nodeName == "LI" && (match = /-(\d+)$/.exec(dom.id)) && +match[1] < options.length) {
            applyCompletion(view, options[+match[1]]);
            e.preventDefault();
            return;
          }
        }
      });
      this.list = this.dom.appendChild(createListBox(options, cState.id, this.range));
      this.list.addEventListener("scroll", () => {
        if (this.info)
          this.view.requestMeasure(this.placeInfo);
      });
    }
    mount() {
      this.updateSel();
    }
    update(update) {
      if (update.state.field(this.stateField) != update.startState.field(this.stateField))
        this.updateSel();
    }
    positioned() {
      if (this.info)
        this.view.requestMeasure(this.placeInfo);
    }
    updateSel() {
      let cState = this.view.state.field(this.stateField), open = cState.open;
      if (open.selected < this.range.from || open.selected >= this.range.to) {
        this.range = rangeAroundSelected(open.options.length, open.selected, this.view.state.facet(completionConfig).maxRenderedOptions);
        this.list.remove();
        this.list = this.dom.appendChild(createListBox(open.options, cState.id, this.range));
        this.list.addEventListener("scroll", () => {
          if (this.info)
            this.view.requestMeasure(this.placeInfo);
        });
      }
      if (this.updateSelectedOption(open.selected)) {
        if (this.info) {
          this.info.remove();
          this.info = null;
        }
        let option = open.options[open.selected];
        if (option.completion.info) {
          this.info = this.dom.appendChild(createInfoDialog(option, this.view));
          this.view.requestMeasure(this.placeInfo);
        }
      }
    }
    updateSelectedOption(selected) {
      let set = null;
      for (let opt = this.list.firstChild, i = this.range.from; opt; opt = opt.nextSibling, i++) {
        if (i == selected) {
          if (!opt.hasAttribute("aria-selected")) {
            opt.setAttribute("aria-selected", "true");
            set = opt;
          }
        } else {
          if (opt.hasAttribute("aria-selected"))
            opt.removeAttribute("aria-selected");
        }
      }
      if (set)
        scrollIntoView(this.list, set);
      return set;
    }
    measureInfo() {
      let sel = this.dom.querySelector("[aria-selected]");
      if (!sel)
        return null;
      let rect = this.dom.getBoundingClientRect();
      let top2 = sel.getBoundingClientRect().top - rect.top;
      if (top2 < 0 || top2 > this.list.clientHeight - 10)
        return null;
      let left = this.view.textDirection == Direction.RTL;
      let spaceLeft = rect.left, spaceRight = innerWidth - rect.right;
      if (left && spaceLeft < Math.min(MaxInfoWidth, spaceRight))
        left = false;
      else if (!left && spaceRight < Math.min(MaxInfoWidth, spaceLeft))
        left = true;
      return {top: top2, left};
    }
    positionInfo(pos) {
      if (this.info && pos) {
        this.info.style.top = pos.top + "px";
        this.info.classList.toggle("cm-completionInfo-left", pos.left);
        this.info.classList.toggle("cm-completionInfo-right", !pos.left);
      }
    }
  };
  function completionTooltip(stateField) {
    return (view) => new CompletionTooltip(view, stateField);
  }
  function scrollIntoView(container, element) {
    let parent = container.getBoundingClientRect();
    let self = element.getBoundingClientRect();
    if (self.top < parent.top)
      container.scrollTop -= parent.top - self.top;
    else if (self.bottom > parent.bottom)
      container.scrollTop += self.bottom - parent.bottom;
  }

  // ../autocomplete/src/state.ts
  var MaxOptions = 300;
  function score(option) {
    return (option.boost || 0) * 100 + (option.apply ? 10 : 0) + (option.info ? 5 : 0) + (option.type ? 1 : 0);
  }
  function sortOptions(active, state) {
    let options = [];
    for (let a of active)
      if (a.hasResult()) {
        let matcher = new FuzzyMatcher(state.sliceDoc(a.from, a.to)), match;
        for (let option of a.result.options)
          if (match = matcher.match(option.label)) {
            if (option.boost != null)
              match[0] += option.boost;
            options.push(new Option(option, a, match));
          }
      }
    options.sort(cmpOption);
    let result = [], prev = null;
    for (let opt of options.sort(cmpOption)) {
      if (result.length == MaxOptions)
        break;
      if (!prev || prev.label != opt.completion.label || prev.detail != opt.completion.detail)
        result.push(opt);
      else if (score(opt.completion) > score(prev))
        result[result.length - 1] = opt;
      prev = opt.completion;
    }
    return result;
  }
  var CompletionDialog = class {
    constructor(options, attrs, tooltip, timestamp, selected) {
      this.options = options;
      this.attrs = attrs;
      this.tooltip = tooltip;
      this.timestamp = timestamp;
      this.selected = selected;
    }
    setSelected(selected, id) {
      return selected == this.selected || selected >= this.options.length ? this : new CompletionDialog(this.options, makeAttrs(id, selected), this.tooltip, this.timestamp, selected);
    }
    static build(active, state, id, prev) {
      let options = sortOptions(active, state);
      if (!options.length)
        return null;
      let selected = 0;
      if (prev && prev.selected) {
        let selectedValue = prev.options[prev.selected].completion;
        for (let i = 0; i < options.length && !selected; i++) {
          if (options[i].completion == selectedValue)
            selected = i;
        }
      }
      return new CompletionDialog(options, makeAttrs(id, selected), {
        pos: active.reduce((a, b) => b.hasResult() ? Math.min(a, b.from) : a, 1e8),
        create: completionTooltip(completionState)
      }, prev ? prev.timestamp : Date.now(), selected);
    }
    map(changes) {
      return new CompletionDialog(this.options, this.attrs, {...this.tooltip, pos: changes.mapPos(this.tooltip.pos)}, this.timestamp, this.selected);
    }
  };
  var CompletionState = class {
    constructor(active, id, open) {
      this.active = active;
      this.id = id;
      this.open = open;
    }
    static start() {
      return new CompletionState(none6, "cm-ac-" + Math.floor(Math.random() * 2e6).toString(36), null);
    }
    update(tr) {
      let {state} = tr, conf = state.facet(completionConfig);
      let sources = conf.override || state.languageDataAt("autocomplete", cur(state)).map(asSource);
      let active = sources.map((source) => {
        let value = this.active.find((s) => s.source == source) || new ActiveSource(source, State.Inactive, false);
        return value.update(tr, conf);
      });
      if (active.length == this.active.length && active.every((a, i) => a == this.active[i]))
        active = this.active;
      let open = tr.selection || active.some((a) => a.hasResult() && tr.changes.touchesRange(a.from, a.to)) || !sameResults(active, this.active) ? CompletionDialog.build(active, state, this.id, this.open) : this.open && tr.docChanged ? this.open.map(tr.changes) : this.open;
      if (!open && active.every((a) => a.state != State.Pending) && active.some((a) => a.hasResult()))
        active = active.map((a) => a.hasResult() ? new ActiveSource(a.source, State.Inactive, false) : a);
      for (let effect of tr.effects)
        if (effect.is(setSelectedEffect))
          open = open && open.setSelected(effect.value, this.id);
      return active == this.active && open == this.open ? this : new CompletionState(active, this.id, open);
    }
    get tooltip() {
      return this.open ? this.open.tooltip : null;
    }
    get attrs() {
      return this.open ? this.open.attrs : baseAttrs;
    }
  };
  function sameResults(a, b) {
    if (a == b)
      return true;
    for (let iA = 0, iB = 0; ; ) {
      while (iA < a.length && !a[iA].hasResult)
        iA++;
      while (iB < b.length && !b[iB].hasResult)
        iB++;
      let endA = iA == a.length, endB = iB == b.length;
      if (endA || endB)
        return endA == endB;
      if (a[iA++].result != b[iB++].result)
        return false;
    }
  }
  function makeAttrs(id, selected) {
    return {
      "aria-autocomplete": "list",
      "aria-activedescendant": id + "-" + selected,
      "aria-owns": id
    };
  }
  var baseAttrs = {"aria-autocomplete": "list"};
  var none6 = [];
  function cmpOption(a, b) {
    let dScore = b.match[0] - a.match[0];
    if (dScore)
      return dScore;
    let lA = a.completion.label, lB = b.completion.label;
    return lA < lB ? -1 : lA == lB ? 0 : 1;
  }
  var State;
  (function(State2) {
    State2[State2["Inactive"] = 0] = "Inactive";
    State2[State2["Pending"] = 1] = "Pending";
    State2[State2["Result"] = 2] = "Result";
  })(State || (State = {}));
  var ActiveSource = class {
    constructor(source, state, explicit) {
      this.source = source;
      this.state = state;
      this.explicit = explicit;
    }
    hasResult() {
      return false;
    }
    update(tr, conf) {
      let event = tr.annotation(Transaction.userEvent), value = this;
      if (event == "input" || event == "delete")
        value = value.handleUserEvent(tr, event, conf);
      else if (tr.docChanged)
        value = value.handleChange(tr);
      else if (tr.selection && value.state != 0)
        value = new ActiveSource(value.source, 0, false);
      for (let effect of tr.effects) {
        if (effect.is(startCompletionEffect))
          value = new ActiveSource(value.source, 1, effect.value);
        else if (effect.is(closeCompletionEffect))
          value = new ActiveSource(value.source, 0, false);
        else if (effect.is(setActiveEffect)) {
          for (let active of effect.value)
            if (active.source == value.source)
              value = active;
        }
      }
      return value;
    }
    handleUserEvent(_tr, type, conf) {
      return type == "delete" || !conf.activateOnTyping ? this : new ActiveSource(this.source, 1, false);
    }
    handleChange(tr) {
      return tr.changes.touchesRange(cur(tr.startState)) ? new ActiveSource(this.source, 0, false) : this;
    }
  };
  var ActiveResult = class extends ActiveSource {
    constructor(source, explicit, result, from, to, span) {
      super(source, 2, explicit);
      this.result = result;
      this.from = from;
      this.to = to;
      this.span = span;
    }
    hasResult() {
      return true;
    }
    handleUserEvent(tr, type, conf) {
      let from = tr.changes.mapPos(this.from), to = tr.changes.mapPos(this.to, 1);
      let pos = cur(tr.state);
      if ((this.explicit ? pos < from : pos <= from) || pos > to)
        return new ActiveSource(this.source, type == "input" && conf.activateOnTyping ? 1 : 0, false);
      if (this.span && (from == to || this.span.test(tr.state.sliceDoc(from, to))))
        return new ActiveResult(this.source, this.explicit, this.result, from, to, this.span);
      return new ActiveSource(this.source, 1, this.explicit);
    }
    handleChange(tr) {
      return tr.changes.touchesRange(this.from, this.to) ? new ActiveSource(this.source, 0, false) : new ActiveResult(this.source, this.explicit, this.result, tr.changes.mapPos(this.from), tr.changes.mapPos(this.to, 1), this.span);
    }
    map(mapping) {
      return new ActiveResult(this.source, this.explicit, this.result, mapping.mapPos(this.from), mapping.mapPos(this.to, 1), this.span);
    }
  };
  var startCompletionEffect = StateEffect.define();
  var closeCompletionEffect = StateEffect.define();
  var setActiveEffect = StateEffect.define({
    map(sources, mapping) {
      return sources.map((s) => s.hasResult() && !mapping.empty ? s.map(mapping) : s);
    }
  });
  var setSelectedEffect = StateEffect.define();
  var completionState = StateField.define({
    create() {
      return CompletionState.start();
    },
    update(value, tr) {
      return value.update(tr);
    },
    provide: (f) => [
      showTooltip.from(f, (val) => val.tooltip),
      EditorView.contentAttributes.from(f, (state) => state.attrs)
    ]
  });

  // ../autocomplete/src/view.ts
  var CompletionInteractMargin = 75;
  function moveCompletionSelection(forward, by = "option") {
    return (view) => {
      let cState = view.state.field(completionState, false);
      if (!cState || !cState.open || Date.now() - cState.open.timestamp < CompletionInteractMargin)
        return false;
      let step = 1, tooltip;
      if (by == "page" && (tooltip = view.dom.querySelector(".cm-tooltip-autocomplete")))
        step = Math.max(2, Math.floor(tooltip.offsetHeight / tooltip.firstChild.offsetHeight));
      let selected = cState.open.selected + step * (forward ? 1 : -1), {length} = cState.open.options;
      if (selected < 0)
        selected = by == "page" ? 0 : length - 1;
      else if (selected >= length)
        selected = by == "page" ? length - 1 : 0;
      view.dispatch({effects: setSelectedEffect.of(selected)});
      return true;
    };
  }
  var acceptCompletion = (view) => {
    let cState = view.state.field(completionState, false);
    if (!cState || !cState.open || Date.now() - cState.open.timestamp < CompletionInteractMargin)
      return false;
    applyCompletion(view, cState.open.options[cState.open.selected]);
    return true;
  };
  var startCompletion = (view) => {
    let cState = view.state.field(completionState, false);
    if (!cState)
      return false;
    view.dispatch({effects: startCompletionEffect.of(true)});
    return true;
  };
  var closeCompletion = (view) => {
    let cState = view.state.field(completionState, false);
    if (!cState || !cState.active.some((a) => a.state != State.Inactive))
      return false;
    view.dispatch({effects: closeCompletionEffect.of(null)});
    return true;
  };
  var RunningQuery = class {
    constructor(source, context) {
      this.source = source;
      this.context = context;
      this.time = Date.now();
      this.updates = [];
      this.done = void 0;
    }
  };
  var DebounceTime = 50;
  var MaxUpdateCount = 50;
  var MinAbortTime = 1e3;
  var CompositionState;
  (function(CompositionState2) {
    CompositionState2[CompositionState2["None"] = 0] = "None";
    CompositionState2[CompositionState2["Started"] = 1] = "Started";
    CompositionState2[CompositionState2["Changed"] = 2] = "Changed";
    CompositionState2[CompositionState2["ChangedAndMoved"] = 3] = "ChangedAndMoved";
  })(CompositionState || (CompositionState = {}));
  var completionPlugin = ViewPlugin.fromClass(class {
    constructor(view) {
      this.view = view;
      this.debounceUpdate = -1;
      this.running = [];
      this.debounceAccept = -1;
      this.composing = 0;
      for (let active of view.state.field(completionState).active)
        if (active.state == State.Pending)
          this.startQuery(active);
    }
    update(update) {
      let cState = update.state.field(completionState);
      if (!update.selectionSet && !update.docChanged && update.startState.field(completionState) == cState)
        return;
      let doesReset = update.transactions.some((tr) => {
        let event = tr.annotation(Transaction.userEvent);
        return (tr.selection || tr.docChanged) && event != "input" && event != "delete";
      });
      for (let i = 0; i < this.running.length; i++) {
        let query = this.running[i];
        if (doesReset || query.updates.length + update.transactions.length > MaxUpdateCount && query.time - Date.now() > MinAbortTime) {
          for (let handler of query.context.abortListeners) {
            try {
              handler();
            } catch (e) {
              logException(this.view.state, e);
            }
          }
          query.context.abortListeners = null;
          this.running.splice(i--, 1);
        } else {
          query.updates.push(...update.transactions);
        }
      }
      if (this.debounceUpdate > -1)
        clearTimeout(this.debounceUpdate);
      this.debounceUpdate = cState.active.some((a) => a.state == State.Pending && !this.running.some((q) => q.source == a.source)) ? setTimeout(() => this.startUpdate(), DebounceTime) : -1;
      if (this.composing != 0)
        for (let tr of update.transactions) {
          if (tr.annotation(Transaction.userEvent) == "input")
            this.composing = 2;
          else if (this.composing == 2 && tr.selection)
            this.composing = 3;
        }
    }
    startUpdate() {
      this.debounceUpdate = -1;
      let {state} = this.view, cState = state.field(completionState);
      for (let active of cState.active) {
        if (active.state == State.Pending && !this.running.some((r) => r.source == active.source))
          this.startQuery(active);
      }
    }
    startQuery(active) {
      let {state} = this.view, pos = cur(state);
      let context = new CompletionContext(state, pos, active.explicit);
      let pending = new RunningQuery(active.source, context);
      this.running.push(pending);
      Promise.resolve(active.source(context)).then((result) => {
        if (!pending.context.aborted) {
          pending.done = result || null;
          this.scheduleAccept();
        }
      }, (err) => {
        this.view.dispatch({effects: closeCompletionEffect.of(null)});
        logException(this.view.state, err);
      });
    }
    scheduleAccept() {
      if (this.running.every((q) => q.done !== void 0))
        this.accept();
      else if (this.debounceAccept < 0)
        this.debounceAccept = setTimeout(() => this.accept(), DebounceTime);
    }
    accept() {
      if (this.debounceAccept > -1)
        clearTimeout(this.debounceAccept);
      this.debounceAccept = -1;
      let updated = [];
      let conf = this.view.state.facet(completionConfig);
      for (let i = 0; i < this.running.length; i++) {
        let query = this.running[i];
        if (query.done === void 0)
          continue;
        this.running.splice(i--, 1);
        if (query.done) {
          let active = new ActiveResult(query.source, query.context.explicit, query.done, query.done.from, query.done.to ?? cur(query.updates.length ? query.updates[0].startState : this.view.state), query.done.span ? ensureAnchor(query.done.span, true) : null);
          for (let tr of query.updates)
            active = active.update(tr, conf);
          if (active.hasResult()) {
            updated.push(active);
            continue;
          }
        }
        let current = this.view.state.field(completionState).active.find((a) => a.source == query.source);
        if (current && current.state == State.Pending) {
          if (query.done == null) {
            let active = new ActiveSource(query.source, State.Inactive, false);
            for (let tr of query.updates)
              active = active.update(tr, conf);
            if (active.state != State.Pending)
              updated.push(active);
          } else {
            this.startQuery(current);
          }
        }
      }
      if (updated.length)
        this.view.dispatch({effects: setActiveEffect.of(updated)});
    }
  }, {
    eventHandlers: {
      compositionstart() {
        this.composing = 1;
      },
      compositionend() {
        if (this.composing == 3) {
          setTimeout(() => this.view.dispatch({effects: startCompletionEffect.of(false)}), 20);
        }
        this.composing = 0;
      }
    }
  });

  // ../autocomplete/src/snippet.ts
  var FieldPos = class {
    constructor(field, line, from, to) {
      this.field = field;
      this.line = line;
      this.from = from;
      this.to = to;
    }
  };
  var FieldRange = class {
    constructor(field, from, to) {
      this.field = field;
      this.from = from;
      this.to = to;
    }
    map(changes) {
      return new FieldRange(this.field, changes.mapPos(this.from, -1), changes.mapPos(this.to, 1));
    }
  };
  var Snippet = class {
    constructor(lines, fieldPositions) {
      this.lines = lines;
      this.fieldPositions = fieldPositions;
    }
    instantiate(state, pos) {
      let text = [], lineStart = [pos];
      let lineObj = state.doc.lineAt(pos), baseIndent = /^\s*/.exec(lineObj.text)[0];
      for (let line of this.lines) {
        if (text.length) {
          let indent = baseIndent, tabs = /^\t*/.exec(line)[0].length;
          for (let i = 0; i < tabs; i++)
            indent += state.facet(indentUnit);
          lineStart.push(pos + indent.length - tabs);
          line = indent + line.slice(tabs);
        }
        text.push(line);
        pos += line.length + 1;
      }
      let ranges = this.fieldPositions.map((pos2) => new FieldRange(pos2.field, lineStart[pos2.line] + pos2.from, lineStart[pos2.line] + pos2.to));
      return {text, ranges};
    }
    static parse(template2) {
      let fields = [];
      let lines = [], positions = [], m;
      for (let line of template2.split(/\r\n?|\n/)) {
        while (m = /[#$]\{(?:(\d+)(?::([^}]*))?|([^}]*))\}/.exec(line)) {
          let seq = m[1] ? +m[1] : null, name2 = m[2] || m[3], found = -1;
          for (let i = 0; i < fields.length; i++) {
            if (name2 ? fields[i].name == name2 : seq != null && fields[i].seq == seq)
              found = i;
          }
          if (found < 0) {
            let i = 0;
            while (i < fields.length && (seq == null || fields[i].seq != null && fields[i].seq < seq))
              i++;
            fields.splice(i, 0, {seq, name: name2 || null});
            found = i;
          }
          positions.push(new FieldPos(found, lines.length, m.index, m.index + name2.length));
          line = line.slice(0, m.index) + name2 + line.slice(m.index + m[0].length);
        }
        lines.push(line);
      }
      return new Snippet(lines, positions);
    }
  };
  var fieldMarker = Decoration.widget({widget: new class extends WidgetType {
    toDOM() {
      let span = document.createElement("span");
      span.className = "cm-snippetFieldPosition";
      return span;
    }
    ignoreEvent() {
      return false;
    }
  }()});
  var fieldRange = Decoration.mark({class: "cm-snippetField"});
  var ActiveSnippet = class {
    constructor(ranges, active) {
      this.ranges = ranges;
      this.active = active;
      this.deco = Decoration.set(ranges.map((r) => (r.from == r.to ? fieldMarker : fieldRange).range(r.from, r.to)));
    }
    map(changes) {
      return new ActiveSnippet(this.ranges.map((r) => r.map(changes)), this.active);
    }
    selectionInsideField(sel) {
      return sel.ranges.every((range) => this.ranges.some((r) => r.field == this.active && r.from <= range.from && r.to >= range.to));
    }
  };
  var setActive = StateEffect.define({
    map(value, changes) {
      return value && value.map(changes);
    }
  });
  var moveToField = StateEffect.define();
  var snippetState = StateField.define({
    create() {
      return null;
    },
    update(value, tr) {
      for (let effect of tr.effects) {
        if (effect.is(setActive))
          return effect.value;
        if (effect.is(moveToField) && value)
          return new ActiveSnippet(value.ranges, effect.value);
      }
      if (value && tr.docChanged)
        value = value.map(tr.changes);
      if (value && tr.selection && !value.selectionInsideField(tr.selection))
        value = null;
      return value;
    },
    provide: (f) => EditorView.decorations.from(f, (val) => val ? val.deco : Decoration.none)
  });
  function fieldSelection(ranges, field) {
    return EditorSelection.create(ranges.filter((r) => r.field == field).map((r) => EditorSelection.range(r.from, r.to)));
  }
  function snippet(template2) {
    let snippet2 = Snippet.parse(template2);
    return (editor, _completion, from, to) => {
      let {text, ranges} = snippet2.instantiate(editor.state, from);
      let spec = {changes: {from, to, insert: Text.of(text)}};
      if (ranges.length)
        spec.selection = fieldSelection(ranges, 0);
      if (ranges.length > 1) {
        let effects = spec.effects = [setActive.of(new ActiveSnippet(ranges, 0))];
        if (editor.state.field(snippetState, false) === void 0)
          effects.push(StateEffect.appendConfig.of([snippetState, addSnippetKeymap, snippetPointerHandler, baseTheme4]));
      }
      editor.dispatch(editor.state.update(spec));
    };
  }
  function moveField(dir) {
    return ({state, dispatch}) => {
      let active = state.field(snippetState, false);
      if (!active || dir < 0 && active.active == 0)
        return false;
      let next = active.active + dir, last = dir > 0 && !active.ranges.some((r) => r.field == next + dir);
      dispatch(state.update({
        selection: fieldSelection(active.ranges, next),
        effects: setActive.of(last ? null : new ActiveSnippet(active.ranges, next))
      }));
      return true;
    };
  }
  var clearSnippet = ({state, dispatch}) => {
    let active = state.field(snippetState, false);
    if (!active)
      return false;
    dispatch(state.update({effects: setActive.of(null)}));
    return true;
  };
  var nextSnippetField = moveField(1);
  var prevSnippetField = moveField(-1);
  var defaultSnippetKeymap = [
    {key: "Tab", run: nextSnippetField, shift: prevSnippetField},
    {key: "Escape", run: clearSnippet}
  ];
  var snippetKeymap = Facet.define({
    combine(maps) {
      return maps.length ? maps[0] : defaultSnippetKeymap;
    }
  });
  var addSnippetKeymap = Prec.override(keymap.compute([snippetKeymap], (state) => state.facet(snippetKeymap)));
  function snippetCompletion(template2, completion) {
    return {...completion, apply: snippet(template2)};
  }
  var snippetPointerHandler = EditorView.domEventHandlers({
    mousedown(event, view) {
      let active = view.state.field(snippetState, false), pos;
      if (!active || (pos = view.posAtCoords({x: event.clientX, y: event.clientY})) == null)
        return false;
      let match = active.ranges.find((r) => r.from <= pos && r.to >= pos);
      if (!match || match.field == active.active)
        return false;
      view.dispatch({
        selection: fieldSelection(active.ranges, match.field),
        effects: setActive.of(active.ranges.some((r) => r.field > match.field) ? new ActiveSnippet(active.ranges, match.field) : null)
      });
      return true;
    }
  });

  // ../autocomplete/src/index.ts
  var completionKeymap = [
    {key: "Ctrl-Space", run: startCompletion},
    {key: "Escape", run: closeCompletion},
    {key: "ArrowDown", run: moveCompletionSelection(true)},
    {key: "ArrowUp", run: moveCompletionSelection(false)},
    {key: "PageDown", run: moveCompletionSelection(true, "page")},
    {key: "PageUp", run: moveCompletionSelection(false, "page")},
    {key: "Enter", run: acceptCompletion}
  ];
  var completionKeymapExt = Prec.override(keymap.computeN([completionConfig], (state) => state.facet(completionConfig).defaultKeymap ? [completionKeymap] : []));

  // ../lang-javascript/src/snippets.ts
  var snippets = [
    snippetCompletion("function ${name}(${params}) {\n	${}\n}", {
      label: "function",
      detail: "definition",
      type: "keyword"
    }),
    snippetCompletion("for (let ${index} = 0; ${index} < ${bound}; ${index}++) {\n	${}\n}", {
      label: "for",
      detail: "loop",
      type: "keyword"
    }),
    snippetCompletion("for (let ${name} of ${collection}) {\n	${}\n}", {
      label: "for",
      detail: "of loop",
      type: "keyword"
    }),
    snippetCompletion("try {\n	${}\n} catch (${error}) {\n	${}\n}", {
      label: "try",
      detail: "block",
      type: "keyword"
    }),
    snippetCompletion("class ${name} {\n	constructor(${params}) {\n		${}\n	}\n}", {
      label: "class",
      detail: "definition",
      type: "keyword"
    }),
    snippetCompletion('import {${names}} from "${module}"\n${}', {
      label: "import",
      detail: "named",
      type: "keyword"
    }),
    snippetCompletion('import ${name} from "${module}"\n${}', {
      label: "import",
      detail: "default",
      type: "keyword"
    })
  ];

  // ../lang-javascript/src/javascript.ts
  var javascriptLanguage = LezerLanguage.define({
    parser: parser.configure({
      props: [
        indentNodeProp.add({
          IfStatement: continuedIndent({except: /^\s*({|else\b)/}),
          TryStatement: continuedIndent({except: /^\s*({|catch|finally)\b/}),
          LabeledStatement: flatIndent,
          SwitchBody: (context) => {
            let after = context.textAfter, closed = /^\s*\}/.test(after), isCase = /^\s*(case|default)\b/.test(after);
            return context.baseIndent + (closed ? 0 : isCase ? 1 : 2) * context.unit;
          },
          Block: delimitedIndent({closing: "}"}),
          ArrowFunction: (cx) => cx.baseIndent + cx.unit,
          "TemplateString BlockComment": () => -1,
          "Statement Property": continuedIndent({except: /^{/}),
          JSXElement(context) {
            let closed = /^\s*<\//.test(context.textAfter);
            return context.lineIndent(context.state.doc.lineAt(context.node.from)) + (closed ? 0 : context.unit);
          },
          JSXEscape(context) {
            let closed = /\s*\}/.test(context.textAfter);
            return context.lineIndent(context.state.doc.lineAt(context.node.from)) + (closed ? 0 : context.unit);
          },
          "JSXOpenTag JSXSelfClosingTag"(context) {
            return context.column(context.node.from) + context.unit;
          }
        }),
        foldNodeProp.add({
          "Block ClassBody SwitchBody EnumBody ObjectExpression ArrayExpression": foldInside,
          BlockComment(tree) {
            return {from: tree.from + 2, to: tree.to - 2};
          }
        }),
        styleTags({
          "get set async static": tags.modifier,
          "for while do if else switch try catch finally return throw break continue default case": tags.controlKeyword,
          "in of await yield void typeof delete instanceof": tags.operatorKeyword,
          "export import let var const function class extends": tags.definitionKeyword,
          "with debugger from as new": tags.keyword,
          TemplateString: tags.special(tags.string),
          Super: tags.atom,
          BooleanLiteral: tags.bool,
          this: tags.self,
          null: tags.null,
          Star: tags.modifier,
          VariableName: tags.variableName,
          "CallExpression/VariableName": tags.function(tags.variableName),
          VariableDefinition: tags.definition(tags.variableName),
          Label: tags.labelName,
          PropertyName: tags.propertyName,
          "CallExpression/MemberExpression/PropertyName": tags.function(tags.propertyName),
          "FunctionDeclaration/VariableDefinition": tags.function(tags.definition(tags.variableName)),
          "ClassDeclaration/VariableDefinition": tags.definition(tags.className),
          PropertyNameDefinition: tags.definition(tags.propertyName),
          UpdateOp: tags.updateOperator,
          LineComment: tags.lineComment,
          BlockComment: tags.blockComment,
          Number: tags.number,
          String: tags.string,
          ArithOp: tags.arithmeticOperator,
          LogicOp: tags.logicOperator,
          BitOp: tags.bitwiseOperator,
          CompareOp: tags.compareOperator,
          RegExp: tags.regexp,
          Equals: tags.definitionOperator,
          "Arrow : Spread": tags.punctuation,
          "( )": tags.paren,
          "[ ]": tags.squareBracket,
          "{ }": tags.brace,
          ".": tags.derefOperator,
          ", ;": tags.separator,
          TypeName: tags.typeName,
          TypeDefinition: tags.definition(tags.typeName),
          "type enum interface implements namespace module declare": tags.definitionKeyword,
          "abstract global privacy readonly": tags.modifier,
          "is keyof unique infer": tags.operatorKeyword,
          JSXAttributeValue: tags.string,
          JSXText: tags.content,
          "JSXStartTag JSXStartCloseTag JSXSelfCloseEndTag JSXEndTag": tags.angleBracket,
          "JSXIdentifier JSXNameSpacedName": tags.tagName,
          "JSXAttribute/JSXIdentifier JSXAttribute/JSXNameSpacedName": tags.propertyName
        })
      ]
    }),
    languageData: {
      closeBrackets: {brackets: ["(", "[", "{", "'", '"', "`"]},
      commentTokens: {line: "//", block: {open: "/*", close: "*/"}},
      indentOnInput: /^\s*(?:case |default:|\{|\}|<\/)$/,
      wordChars: "$"
    }
  });
  var typescriptLanguage = javascriptLanguage.configure({dialect: "ts"});
  var jsxLanguage = javascriptLanguage.configure({dialect: "jsx"});
  var tsxLanguage = javascriptLanguage.configure({dialect: "jsx ts"});
  function javascript(config2 = {}) {
    let lang = config2.jsx ? config2.typescript ? tsxLanguage : jsxLanguage : config2.typescript ? typescriptLanguage : javascriptLanguage;
    return new LanguageSupport(lang, javascriptLanguage.data.of({
      autocomplete: ifNotIn(["LineComment", "BlockComment", "String"], completeFromList(snippets))
    }));
  }

  // ../history/src/history.ts
  var BranchName;
  (function(BranchName2) {
    BranchName2[BranchName2["Done"] = 0] = "Done";
    BranchName2[BranchName2["Undone"] = 1] = "Undone";
  })(BranchName || (BranchName = {}));
  var fromHistory = Annotation.define();
  var isolateHistory = Annotation.define();
  var invertedEffects = Facet.define();
  var historyConfig = Facet.define({
    combine(configs) {
      return combineConfig(configs, {
        minDepth: 100,
        newGroupDelay: 500
      }, {minDepth: Math.max, newGroupDelay: Math.min});
    }
  });
  var historyField_ = StateField.define({
    create() {
      return HistoryState.empty;
    },
    update(state, tr) {
      let config2 = tr.state.facet(historyConfig);
      let fromHist = tr.annotation(fromHistory);
      if (fromHist) {
        let item = HistEvent.fromTransaction(tr), from = fromHist.side;
        let other = from == 0 ? state.undone : state.done;
        if (item)
          other = updateBranch(other, other.length, config2.minDepth, item);
        else
          other = addSelection(other, tr.startState.selection);
        return new HistoryState(from == 0 ? fromHist.rest : other, from == 0 ? other : fromHist.rest);
      }
      let isolate = tr.annotation(isolateHistory);
      if (isolate == "full" || isolate == "before")
        state = state.isolate();
      if (tr.annotation(Transaction.addToHistory) === false)
        return !tr.changes.empty ? state.addMapping(tr.changes.desc) : state;
      let event = HistEvent.fromTransaction(tr);
      let time = tr.annotation(Transaction.time), userEvent = tr.annotation(Transaction.userEvent);
      if (event)
        state = state.addChanges(event, time, userEvent, config2.newGroupDelay, config2.minDepth);
      else if (tr.selection)
        state = state.addSelection(tr.startState.selection, time, userEvent, config2.newGroupDelay);
      if (isolate == "full" || isolate == "after")
        state = state.isolate();
      return state;
    },
    toJSON(value) {
      return {done: value.done.map((e) => e.toJSON()), undone: value.undone.map((e) => e.toJSON())};
    },
    fromJSON(json) {
      return new HistoryState(json.done.map(HistEvent.fromJSON), json.undone.map(HistEvent.fromJSON));
    }
  });
  function history(config2 = {}) {
    return [
      historyField_,
      historyConfig.of(config2),
      EditorView.domEventHandlers({
        beforeinput(e, view) {
          if (e.inputType == "historyUndo")
            return undo(view);
          if (e.inputType == "historyRedo")
            return redo(view);
          return false;
        }
      })
    ];
  }
  function cmd(side, selection) {
    return function({state, dispatch}) {
      let historyState = state.field(historyField_, false);
      if (!historyState)
        return false;
      let tr = historyState.pop(side, state, selection);
      if (!tr)
        return false;
      dispatch(tr);
      return true;
    };
  }
  var undo = cmd(0, false);
  var redo = cmd(1, false);
  var undoSelection = cmd(0, true);
  var redoSelection = cmd(1, true);
  function depth(side) {
    return function(state) {
      let histState = state.field(historyField_, false);
      if (!histState)
        return 0;
      let branch = side == 0 ? histState.done : histState.undone;
      return branch.length - (branch.length && !branch[0].changes ? 1 : 0);
    };
  }
  var undoDepth = depth(0);
  var redoDepth = depth(1);
  var HistEvent = class {
    constructor(changes, effects, mapped, startSelection, selectionsAfter) {
      this.changes = changes;
      this.effects = effects;
      this.mapped = mapped;
      this.startSelection = startSelection;
      this.selectionsAfter = selectionsAfter;
    }
    setSelAfter(after) {
      return new HistEvent(this.changes, this.effects, this.mapped, this.startSelection, after);
    }
    toJSON() {
      return {
        changes: this.changes?.toJSON(),
        mapped: this.mapped?.toJSON(),
        startSelection: this.startSelection?.toJSON(),
        selectionsAfter: this.selectionsAfter.map((s) => s.toJSON())
      };
    }
    static fromJSON(json) {
      return new HistEvent(json.changes && ChangeSet.fromJSON(json.changes), [], json.mapped && ChangeDesc.fromJSON(json.mapped), json.startSelection && EditorSelection.fromJSON(json.startSelection), json.selectionsAfter.map(EditorSelection.fromJSON));
    }
    static fromTransaction(tr) {
      let effects = none7;
      for (let invert of tr.startState.facet(invertedEffects)) {
        let result = invert(tr);
        if (result.length)
          effects = effects.concat(result);
      }
      if (!effects.length && tr.changes.empty)
        return null;
      return new HistEvent(tr.changes.invert(tr.startState.doc), effects, void 0, tr.startState.selection, none7);
    }
    static selection(selections) {
      return new HistEvent(void 0, none7, void 0, void 0, selections);
    }
  };
  function updateBranch(branch, to, maxLen, newEvent) {
    let start = to + 1 > maxLen + 20 ? to - maxLen - 1 : 0;
    let newBranch = branch.slice(start, to);
    newBranch.push(newEvent);
    return newBranch;
  }
  function isAdjacent(a, b) {
    let ranges = [], isAdjacent2 = false;
    a.iterChangedRanges((f, t2) => ranges.push(f, t2));
    b.iterChangedRanges((_f, _t, f, t2) => {
      for (let i = 0; i < ranges.length; ) {
        let from = ranges[i++], to = ranges[i++];
        if (t2 >= from && f <= to)
          isAdjacent2 = true;
      }
    });
    return isAdjacent2;
  }
  function eqSelectionShape(a, b) {
    return a.ranges.length == b.ranges.length && a.ranges.filter((r, i) => r.empty != b.ranges[i].empty).length === 0;
  }
  function conc(a, b) {
    return !a.length ? b : !b.length ? a : a.concat(b);
  }
  var none7 = [];
  var MaxSelectionsPerEvent = 200;
  function addSelection(branch, selection) {
    if (!branch.length) {
      return [HistEvent.selection([selection])];
    } else {
      let lastEvent = branch[branch.length - 1];
      let sels = lastEvent.selectionsAfter.slice(Math.max(0, lastEvent.selectionsAfter.length - MaxSelectionsPerEvent));
      if (sels.length && sels[sels.length - 1].eq(selection))
        return branch;
      sels.push(selection);
      return updateBranch(branch, branch.length - 1, 1e9, lastEvent.setSelAfter(sels));
    }
  }
  function popSelection(branch) {
    let last = branch[branch.length - 1];
    let newBranch = branch.slice();
    newBranch[branch.length - 1] = last.setSelAfter(last.selectionsAfter.slice(0, last.selectionsAfter.length - 1));
    return newBranch;
  }
  function addMappingToBranch(branch, mapping) {
    if (!branch.length)
      return branch;
    let length = branch.length, selections = none7;
    while (length) {
      let event = mapEvent(branch[length - 1], mapping, selections);
      if (event.changes && !event.changes.empty || event.effects.length) {
        let result = branch.slice(0, length);
        result[length - 1] = event;
        return result;
      } else {
        mapping = event.mapped;
        length--;
        selections = event.selectionsAfter;
      }
    }
    return selections.length ? [HistEvent.selection(selections)] : none7;
  }
  function mapEvent(event, mapping, extraSelections) {
    let selections = conc(event.selectionsAfter.length ? event.selectionsAfter.map((s) => s.map(mapping)) : none7, extraSelections);
    if (!event.changes)
      return HistEvent.selection(selections);
    let mappedChanges = event.changes.map(mapping), before = mapping.mapDesc(event.changes, true);
    let fullMapping = event.mapped ? event.mapped.composeDesc(before) : before;
    return new HistEvent(mappedChanges, StateEffect.mapEffects(event.effects, mapping), fullMapping, event.startSelection.map(before), selections);
  }
  var _HistoryState = class {
    constructor(done, undone, prevTime = 0, prevUserEvent = void 0) {
      this.done = done;
      this.undone = undone;
      this.prevTime = prevTime;
      this.prevUserEvent = prevUserEvent;
    }
    isolate() {
      return this.prevTime ? new _HistoryState(this.done, this.undone) : this;
    }
    addChanges(event, time, userEvent, newGroupDelay, maxLen) {
      let done = this.done, lastEvent = done[done.length - 1];
      if (lastEvent && lastEvent.changes && time - this.prevTime < newGroupDelay && !lastEvent.selectionsAfter.length && !lastEvent.changes.empty && event.changes && isAdjacent(lastEvent.changes, event.changes)) {
        done = updateBranch(done, done.length - 1, maxLen, new HistEvent(event.changes.compose(lastEvent.changes), conc(event.effects, lastEvent.effects), lastEvent.mapped, lastEvent.startSelection, none7));
      } else {
        done = updateBranch(done, done.length, maxLen, event);
      }
      return new _HistoryState(done, none7, time, userEvent);
    }
    addSelection(selection, time, userEvent, newGroupDelay) {
      let last = this.done.length ? this.done[this.done.length - 1].selectionsAfter : none7;
      if (last.length > 0 && time - this.prevTime < newGroupDelay && userEvent == "keyboardselection" && this.prevUserEvent == userEvent && eqSelectionShape(last[last.length - 1], selection))
        return this;
      return new _HistoryState(addSelection(this.done, selection), this.undone, time, userEvent);
    }
    addMapping(mapping) {
      return new _HistoryState(addMappingToBranch(this.done, mapping), addMappingToBranch(this.undone, mapping), this.prevTime, this.prevUserEvent);
    }
    pop(side, state, selection) {
      let branch = side == 0 ? this.done : this.undone;
      if (branch.length == 0)
        return null;
      let event = branch[branch.length - 1];
      if (selection && event.selectionsAfter.length) {
        return state.update({
          selection: event.selectionsAfter[event.selectionsAfter.length - 1],
          annotations: fromHistory.of({side, rest: popSelection(branch)})
        });
      } else if (!event.changes) {
        return null;
      } else {
        let rest = branch.length == 1 ? none7 : branch.slice(0, branch.length - 1);
        if (event.mapped)
          rest = addMappingToBranch(rest, event.mapped);
        return state.update({
          changes: event.changes,
          selection: event.startSelection,
          effects: event.effects,
          annotations: fromHistory.of({side, rest}),
          filter: false
        });
      }
    }
  };
  var HistoryState = _HistoryState;
  HistoryState.empty = new _HistoryState(none7, none7);
  var historyKeymap = [
    {key: "Mod-z", run: undo, preventDefault: true},
    {key: "Mod-y", mac: "Mod-Shift-z", run: redo, preventDefault: true},
    {key: "Mod-u", run: undoSelection, preventDefault: true},
    {key: "Alt-u", mac: "Mod-Shift-u", run: redoSelection, preventDefault: true}
  ];

  // ../gutter/src/index.ts
  var GutterMarker = class extends RangeValue {
    compare(other) {
      return this == other || this.constructor == other.constructor && this.eq(other);
    }
    toDOM(_view) {
      return null;
    }
    at(pos) {
      return this.range(pos);
    }
  };
  GutterMarker.prototype.elementClass = "";
  GutterMarker.prototype.mapMode = MapMode.TrackBefore;
  var defaults = {
    class: "",
    renderEmptyElements: false,
    elementStyle: "",
    markers: () => RangeSet.empty,
    lineMarker: () => null,
    initialSpacer: null,
    updateSpacer: null,
    domEventHandlers: {}
  };
  var activeGutters = Facet.define();
  function gutter(config2) {
    return [gutters(), activeGutters.of({...defaults, ...config2})];
  }
  var baseTheme5 = EditorView.baseTheme({
    ".cm-gutters": {
      display: "flex",
      height: "100%",
      boxSizing: "border-box",
      left: 0,
      zIndex: 200
    },
    "&light .cm-gutters": {
      backgroundColor: "#f5f5f5",
      color: "#999",
      borderRight: "1px solid #ddd"
    },
    "&dark .cm-gutters": {
      backgroundColor: "#333338",
      color: "#ccc"
    },
    ".cm-gutter": {
      display: "flex !important",
      flexDirection: "column",
      flexShrink: 0,
      boxSizing: "border-box",
      height: "100%",
      overflow: "hidden"
    },
    ".cm-gutterElement": {
      boxSizing: "border-box"
    },
    ".cm-lineNumbers .cm-gutterElement": {
      padding: "0 3px 0 5px",
      minWidth: "20px",
      textAlign: "right",
      whiteSpace: "nowrap"
    }
  });
  var unfixGutters = Facet.define({
    combine: (values) => values.some((x) => x)
  });
  function gutters(config2) {
    let result = [
      gutterView,
      baseTheme5
    ];
    if (config2 && config2.fixed === false)
      result.push(unfixGutters.of(true));
    return result;
  }
  var gutterView = ViewPlugin.fromClass(class {
    constructor(view) {
      this.view = view;
      this.dom = document.createElement("div");
      this.dom.className = "cm-gutters";
      this.dom.setAttribute("aria-hidden", "true");
      this.gutters = view.state.facet(activeGutters).map((conf) => new SingleGutterView(view, conf));
      for (let gutter2 of this.gutters)
        this.dom.appendChild(gutter2.dom);
      this.fixed = !view.state.facet(unfixGutters);
      if (this.fixed) {
        this.dom.style.position = "sticky";
      }
      view.scrollDOM.insertBefore(this.dom, view.contentDOM);
    }
    update(update) {
      if (!this.updateGutters(update))
        return;
      let contexts = this.gutters.map((gutter2) => new UpdateContext(gutter2, this.view.viewport));
      this.view.viewportLines((line) => {
        let text;
        if (Array.isArray(line.type)) {
          for (let b of line.type)
            if (b.type == BlockType.Text) {
              text = b;
              break;
            }
        } else {
          text = line.type == BlockType.Text ? line : void 0;
        }
        if (!text)
          return;
        for (let cx of contexts)
          cx.line(this.view, text);
      }, 0);
      for (let cx of contexts)
        cx.finish();
      this.dom.style.minHeight = this.view.contentHeight + "px";
      if (update.state.facet(unfixGutters) != !this.fixed) {
        this.fixed = !this.fixed;
        this.dom.style.position = this.fixed ? "sticky" : "";
      }
    }
    updateGutters(update) {
      let prev = update.startState.facet(activeGutters), cur2 = update.state.facet(activeGutters);
      let change = update.docChanged || update.heightChanged || update.viewportChanged;
      if (prev == cur2) {
        for (let gutter2 of this.gutters)
          if (gutter2.update(update))
            change = true;
      } else {
        change = true;
        let gutters2 = [];
        for (let conf of cur2) {
          let known = prev.indexOf(conf);
          if (known < 0) {
            gutters2.push(new SingleGutterView(this.view, conf));
          } else {
            this.gutters[known].update(update);
            gutters2.push(this.gutters[known]);
          }
        }
        for (let g of this.gutters)
          g.dom.remove();
        for (let g of gutters2)
          this.dom.appendChild(g.dom);
        this.gutters = gutters2;
      }
      return change;
    }
    destroy() {
      this.dom.remove();
    }
  }, {
    provide: PluginField.scrollMargins.from((value) => {
      if (value.gutters.length == 0 || !value.fixed)
        return null;
      return value.view.textDirection == Direction.LTR ? {left: value.dom.offsetWidth} : {right: value.dom.offsetWidth};
    })
  });
  function asArray2(val) {
    return Array.isArray(val) ? val : [val];
  }
  var UpdateContext = class {
    constructor(gutter2, viewport) {
      this.gutter = gutter2;
      this.localMarkers = [];
      this.i = 0;
      this.height = 0;
      this.cursor = RangeSet.iter(gutter2.markers, viewport.from);
    }
    line(view, line) {
      if (this.localMarkers.length)
        this.localMarkers = [];
      while (this.cursor.value && this.cursor.from <= line.from) {
        if (this.cursor.from == line.from)
          this.localMarkers.push(this.cursor.value);
        this.cursor.next();
      }
      let forLine = this.gutter.config.lineMarker(view, line, this.localMarkers);
      if (forLine)
        this.localMarkers.unshift(forLine);
      let gutter2 = this.gutter;
      if (this.localMarkers.length == 0 && !gutter2.config.renderEmptyElements)
        return;
      let above = line.top - this.height;
      if (this.i == gutter2.elements.length) {
        let newElt = new GutterElement(view, line.height, above, this.localMarkers);
        gutter2.elements.push(newElt);
        gutter2.dom.appendChild(newElt.dom);
      } else {
        let markers = this.localMarkers, elt = gutter2.elements[this.i];
        if (sameMarkers(markers, elt.markers)) {
          markers = elt.markers;
          this.localMarkers.length = 0;
        }
        elt.update(view, line.height, above, markers);
      }
      this.height = line.bottom;
      this.i++;
    }
    finish() {
      let gutter2 = this.gutter;
      while (gutter2.elements.length > this.i)
        gutter2.dom.removeChild(gutter2.elements.pop().dom);
    }
  };
  var SingleGutterView = class {
    constructor(view, config2) {
      this.view = view;
      this.config = config2;
      this.elements = [];
      this.spacer = null;
      this.dom = document.createElement("div");
      this.dom.className = "cm-gutter" + (this.config.class ? " " + this.config.class : "");
      for (let prop in config2.domEventHandlers) {
        this.dom.addEventListener(prop, (event) => {
          let line = view.visualLineAtHeight(event.clientY, view.contentDOM.getBoundingClientRect().top);
          if (config2.domEventHandlers[prop](view, line, event))
            event.preventDefault();
        });
      }
      this.markers = asArray2(config2.markers(view));
      if (config2.initialSpacer) {
        this.spacer = new GutterElement(view, 0, 0, [config2.initialSpacer(view)]);
        this.dom.appendChild(this.spacer.dom);
        this.spacer.dom.style.cssText += "visibility: hidden; pointer-events: none";
      }
    }
    update(update) {
      let prevMarkers = this.markers;
      this.markers = asArray2(this.config.markers(update.view));
      if (this.spacer && this.config.updateSpacer) {
        let updated = this.config.updateSpacer(this.spacer.markers[0], update);
        if (updated != this.spacer.markers[0])
          this.spacer.update(update.view, 0, 0, [updated]);
      }
      return this.markers != prevMarkers;
    }
  };
  var GutterElement = class {
    constructor(view, height, above, markers) {
      this.height = -1;
      this.above = 0;
      this.dom = document.createElement("div");
      this.update(view, height, above, markers);
    }
    update(view, height, above, markers) {
      if (this.height != height)
        this.dom.style.height = (this.height = height) + "px";
      if (this.above != above)
        this.dom.style.marginTop = (this.above = above) ? above + "px" : "";
      if (this.markers != markers) {
        this.markers = markers;
        for (let ch; ch = this.dom.lastChild; )
          ch.remove();
        let cls = "cm-gutterElement";
        for (let m of markers) {
          let dom = m.toDOM(view);
          if (dom)
            this.dom.appendChild(dom);
          let c = m.elementClass;
          if (c)
            cls += " " + c;
        }
        this.dom.className = cls;
      }
    }
  };
  function sameMarkers(a, b) {
    if (a.length != b.length)
      return false;
    for (let i = 0; i < a.length; i++)
      if (!a[i].compare(b[i]))
        return false;
    return true;
  }
  var lineNumberMarkers = Facet.define();
  var lineNumberConfig = Facet.define({
    combine(values) {
      return combineConfig(values, {formatNumber: String, domEventHandlers: {}}, {
        domEventHandlers(a, b) {
          let result = Object.assign({}, a);
          for (let event in b) {
            let exists = result[event], add2 = b[event];
            result[event] = exists ? (view, line, event2) => exists(view, line, event2) || add2(view, line, event2) : add2;
          }
          return result;
        }
      });
    }
  });
  var NumberMarker = class extends GutterMarker {
    constructor(number2) {
      super();
      this.number = number2;
    }
    eq(other) {
      return this.number == other.number;
    }
    toDOM() {
      return document.createTextNode(this.number);
    }
  };
  function formatNumber(view, number2) {
    return view.state.facet(lineNumberConfig).formatNumber(number2, view.state);
  }
  var lineNumberGutter = gutter({
    class: "cm-lineNumbers",
    markers(view) {
      return view.state.facet(lineNumberMarkers);
    },
    lineMarker(view, line, others) {
      if (others.length)
        return null;
      return new NumberMarker(formatNumber(view, view.state.doc.lineAt(line.from).number));
    },
    initialSpacer(view) {
      return new NumberMarker(formatNumber(view, maxLineNumber(view.state.doc.lines)));
    },
    updateSpacer(spacer, update) {
      let max = formatNumber(update.view, maxLineNumber(update.view.state.doc.lines));
      return max == spacer.number ? spacer : new NumberMarker(max);
    }
  });
  function lineNumbers(config2 = {}) {
    return [
      lineNumberConfig.of(config2),
      lineNumberGutter
    ];
  }
  function maxLineNumber(lines) {
    let last = 9;
    while (last < lines)
      last = last * 10 + 9;
    return last;
  }

  // ../fold/src/fold.ts
  function mapRange(range, mapping) {
    let from = mapping.mapPos(range.from, 1), to = mapping.mapPos(range.to, -1);
    return from >= to ? void 0 : {from, to};
  }
  var foldEffect = StateEffect.define({map: mapRange});
  var unfoldEffect = StateEffect.define({map: mapRange});
  var foldState = StateField.define({
    create() {
      return Decoration.none;
    },
    update(folded, tr) {
      folded = folded.map(tr.changes);
      for (let e of tr.effects) {
        if (e.is(foldEffect) && !foldExists(folded, e.value.from, e.value.to))
          folded = folded.update({add: [foldWidget.range(e.value.from, e.value.to)]});
        else if (e.is(unfoldEffect)) {
          folded = folded.update({
            filter: (from, to) => e.value.from != from || e.value.to != to,
            filterFrom: e.value.from,
            filterTo: e.value.to
          });
        }
      }
      if (tr.selection) {
        let onSelection = false, {head} = tr.selection.main;
        folded.between(head, head, (a, b) => {
          if (a < head && b > head)
            onSelection = true;
        });
        if (onSelection)
          folded = folded.update({
            filterFrom: head,
            filterTo: head,
            filter: (a, b) => b <= head || a >= head
          });
      }
      return folded;
    },
    provide: (f) => EditorView.decorations.compute([f], (s) => s.field(f))
  });
  function foldInside2(state, from, to) {
    let found = null;
    state.field(foldState, false)?.between(from, to, (from2, to2) => {
      if (!found || found.from > from2)
        found = {from: from2, to: to2};
    });
    return found;
  }
  function foldExists(folded, from, to) {
    let found = false;
    folded.between(from, from, (a, b) => {
      if (a == from && b == to)
        found = true;
    });
    return found;
  }
  function maybeEnable(state, other) {
    return state.field(foldState, false) ? other : other.concat(StateEffect.appendConfig.of(codeFolding()));
  }
  var foldRange = (view) => (from, to) => {
    let {state} = view, effects = [];
    for (let pos = from; pos < to; ) {
      let line = view.visualLineAt(pos), range = foldable(state, line.from, line.to);
      if (range)
        effects.push(foldEffect.of(range));
      pos = (range ? view.visualLineAt(range.to) : line).to + 1;
    }
    if (effects.length)
      view.dispatch({effects: maybeEnable(view.state, effects)});
    return !!effects.length;
  };
  var defaultConfig = {
    placeholderDOM: null,
    placeholderText: "\u2026"
  };
  var foldConfig = Facet.define({
    combine(values) {
      return combineConfig(values, defaultConfig);
    }
  });
  function codeFolding(config2) {
    let result = [foldState, baseTheme6];
    if (config2)
      result.push(foldConfig.of(config2));
    return result;
  }
  var foldWidget = Decoration.replace({widget: new class extends WidgetType {
    ignoreEvents() {
      return false;
    }
    toDOM(view) {
      let {state} = view, conf = state.facet(foldConfig);
      if (conf.placeholderDOM)
        return conf.placeholderDOM();
      let element = document.createElement("span");
      element.textContent = conf.placeholderText;
      element.setAttribute("aria-label", state.phrase("folded code"));
      element.title = state.phrase("unfold");
      element.className = "cm-foldPlaceholder";
      element.onclick = (event) => {
        let line = view.visualLineAt(view.posAtDOM(event.target));
        let folded = foldInside2(view.state, line.from, line.to);
        if (folded)
          view.dispatch({effects: unfoldEffect.of(folded)});
        event.preventDefault();
      };
      return element;
    }
  }()});
  var foldGutterDefaults = {
    openText: "\u2304",
    closedText: "\u203A"
  };
  var FoldMarker = class extends GutterMarker {
    constructor(config2, open) {
      super();
      this.config = config2;
      this.open = open;
    }
    eq(other) {
      return this.config == other.config && this.open == other.open;
    }
    toDOM(view) {
      let span = document.createElement("span");
      span.textContent = this.open ? this.config.openText : this.config.closedText;
      span.title = view.state.phrase(this.open ? "Fold line" : "Unfold line");
      return span;
    }
  };
  function foldGutter(config2 = {}) {
    let fullConfig = {...foldGutterDefaults, ...config2};
    let canFold = new FoldMarker(fullConfig, true), canUnfold = new FoldMarker(fullConfig, false);
    let markers = ViewPlugin.fromClass(class {
      constructor(view) {
        this.from = view.viewport.from;
        this.markers = RangeSet.of(this.buildMarkers(view));
      }
      update(update) {
        let firstChange = -1;
        update.changes.iterChangedRanges((from) => {
          if (firstChange < 0)
            firstChange = from;
        });
        let changed = update.startState.facet(language) != update.state.facet(language) || update.startState.field(foldState, false) != update.state.field(foldState, false);
        if (!changed && update.docChanged && update.view.viewport.from == this.from && firstChange > this.from) {
          let start = update.view.visualLineAt(firstChange).from;
          this.markers = this.markers.update({
            filter: () => false,
            filterFrom: start,
            add: this.buildMarkers(update.view, start)
          });
        } else if (changed || update.docChanged || update.viewportChanged) {
          this.from = update.view.viewport.from;
          this.markers = RangeSet.of(this.buildMarkers(update.view));
        }
      }
      buildMarkers(view, from = 0) {
        let ranges = [];
        view.viewportLines((line) => {
          if (line.from >= from) {
            let mark = foldInside2(view.state, line.from, line.to) ? canUnfold : foldable(view.state, line.from, line.to) ? canFold : null;
            if (mark)
              ranges.push(mark.range(line.from));
          }
        });
        return ranges;
      }
    });
    return [
      markers,
      gutter({
        class: "cm-foldGutter",
        markers(view) {
          return view.plugin(markers)?.markers || RangeSet.empty;
        },
        initialSpacer() {
          return new FoldMarker(fullConfig, false);
        },
        domEventHandlers: {
          click: (view, line) => {
            let folded = foldInside2(view.state, line.from, line.to);
            if (folded) {
              view.dispatch({effects: unfoldEffect.of(folded)});
              return true;
            }
            let range = foldable(view.state, line.from, line.to);
            if (range) {
              view.dispatch({effects: foldEffect.of(range)});
              return true;
            }
            return false;
          }
        }
      }),
      codeFolding()
    ];
  }
  var baseTheme6 = EditorView.baseTheme({
    ".cm-foldPlaceholder": {
      backgroundColor: "#eee",
      border: "1px solid #ddd",
      color: "#888",
      borderRadius: ".2em",
      margin: "0 1px",
      padding: "0 1px",
      cursor: "pointer"
    },
    ".cm-foldGutter .cm-gutterElement": {
      padding: "0 1px",
      cursor: "pointer"
    }
  });

  // ../closebrackets/src/closebrackets.ts
  var defaults2 = {
    brackets: ["(", "[", "{", "'", '"'],
    before: `)]}'":;>`
  };
  var closeBracketEffect = StateEffect.define({
    map(value, mapping) {
      let mapped = mapping.mapPos(value, -1, MapMode.TrackAfter);
      return mapped == null ? void 0 : mapped;
    }
  });
  var skipBracketEffect = StateEffect.define({
    map(value, mapping) {
      return mapping.mapPos(value);
    }
  });
  var closedBracket = new class extends RangeValue {
  }();
  closedBracket.startSide = 1;
  closedBracket.endSide = -1;
  var bracketState = StateField.define({
    create() {
      return RangeSet.empty;
    },
    update(value, tr) {
      if (tr.selection) {
        let lineStart = tr.state.doc.lineAt(tr.selection.main.head).from;
        let prevLineStart = tr.startState.doc.lineAt(tr.startState.selection.main.head).from;
        if (lineStart != tr.changes.mapPos(prevLineStart, -1))
          value = RangeSet.empty;
      }
      value = value.map(tr.changes);
      for (let effect of tr.effects) {
        if (effect.is(closeBracketEffect))
          value = value.update({add: [closedBracket.range(effect.value, effect.value + 1)]});
        else if (effect.is(skipBracketEffect))
          value = value.update({filter: (from) => from != effect.value});
      }
      return value;
    }
  });
  function closeBrackets() {
    return [EditorView.inputHandler.of(handleInput), bracketState];
  }
  var definedClosing = "()[]{}<>";
  function closing(ch) {
    for (let i = 0; i < definedClosing.length; i += 2)
      if (definedClosing.charCodeAt(i) == ch)
        return definedClosing.charAt(i + 1);
    return fromCodePoint(ch < 128 ? ch : ch + 1);
  }
  function config(state, pos) {
    return state.languageDataAt("closeBrackets", pos)[0] || defaults2;
  }
  function handleInput(view, from, to, insert2) {
    if (view.composing)
      return false;
    let sel = view.state.selection.main;
    if (insert2.length > 2 || insert2.length == 2 && codePointSize(codePointAt(insert2, 0)) == 1 || from != sel.from || to != sel.to)
      return false;
    let tr = insertBracket(view.state, insert2);
    if (!tr)
      return false;
    view.dispatch(tr);
    return true;
  }
  var deleteBracketPair = ({state, dispatch}) => {
    let conf = config(state, state.selection.main.head);
    let tokens = conf.brackets || defaults2.brackets;
    let dont = null, changes = state.changeByRange((range) => {
      if (range.empty) {
        let before = prevChar(state.doc, range.head);
        for (let token of tokens) {
          if (token == before && nextChar(state.doc, range.head) == closing(codePointAt(token, 0)))
            return {
              changes: {from: range.head - token.length, to: range.head + token.length},
              range: EditorSelection.cursor(range.head - token.length),
              annotations: Transaction.userEvent.of("delete")
            };
        }
      }
      return {range: dont = range};
    });
    if (!dont)
      dispatch(state.update(changes, {scrollIntoView: true}));
    return !dont;
  };
  var closeBracketsKeymap = [
    {key: "Backspace", run: deleteBracketPair}
  ];
  function insertBracket(state, bracket2) {
    let conf = config(state, state.selection.main.head);
    let tokens = conf.brackets || defaults2.brackets;
    for (let tok of tokens) {
      let closed = closing(codePointAt(tok, 0));
      if (bracket2 == tok)
        return closed == tok ? handleSame(state, tok, tokens.indexOf(tok + tok + tok) > -1) : handleOpen(state, tok, closed, conf.before || defaults2.before);
      if (bracket2 == closed && closedBracketAt(state, state.selection.main.from))
        return handleClose(state, tok, closed);
    }
    return null;
  }
  function closedBracketAt(state, pos) {
    let found = false;
    state.field(bracketState).between(0, state.doc.length, (from) => {
      if (from == pos)
        found = true;
    });
    return found;
  }
  function nextChar(doc2, pos) {
    let next = doc2.sliceString(pos, pos + 2);
    return next.slice(0, codePointSize(codePointAt(next, 0)));
  }
  function prevChar(doc2, pos) {
    let prev = doc2.sliceString(pos - 2, pos);
    return codePointSize(codePointAt(prev, 0)) == prev.length ? prev : prev.slice(1);
  }
  function handleOpen(state, open, close, closeBefore) {
    let dont = null, changes = state.changeByRange((range) => {
      if (!range.empty)
        return {
          changes: [{insert: open, from: range.from}, {insert: close, from: range.to}],
          effects: closeBracketEffect.of(range.to + open.length),
          range: EditorSelection.range(range.anchor + open.length, range.head + open.length)
        };
      let next = nextChar(state.doc, range.head);
      if (!next || /\s/.test(next) || closeBefore.indexOf(next) > -1)
        return {
          changes: {insert: open + close, from: range.head},
          effects: closeBracketEffect.of(range.head + open.length),
          range: EditorSelection.cursor(range.head + open.length)
        };
      return {range: dont = range};
    });
    return dont ? null : state.update(changes, {
      scrollIntoView: true,
      annotations: Transaction.userEvent.of("input")
    });
  }
  function handleClose(state, _open, close) {
    let dont = null, moved = state.selection.ranges.map((range) => {
      if (range.empty && nextChar(state.doc, range.head) == close)
        return EditorSelection.cursor(range.head + close.length);
      return dont = range;
    });
    return dont ? null : state.update({
      selection: EditorSelection.create(moved, state.selection.mainIndex),
      scrollIntoView: true,
      effects: state.selection.ranges.map(({from}) => skipBracketEffect.of(from))
    });
  }
  function handleSame(state, token, allowTriple) {
    let dont = null, changes = state.changeByRange((range) => {
      if (!range.empty)
        return {
          changes: [{insert: token, from: range.from}, {insert: token, from: range.to}],
          effects: closeBracketEffect.of(range.to + token.length),
          range: EditorSelection.range(range.anchor + token.length, range.head + token.length)
        };
      let pos = range.head, next = nextChar(state.doc, pos);
      if (next == token) {
        if (nodeStart(state, pos)) {
          return {
            changes: {insert: token + token, from: pos},
            effects: closeBracketEffect.of(pos + token.length),
            range: EditorSelection.cursor(pos + token.length)
          };
        } else if (closedBracketAt(state, pos)) {
          let isTriple = allowTriple && state.sliceDoc(pos, pos + token.length * 3) == token + token + token;
          return {
            range: EditorSelection.cursor(pos + token.length * (isTriple ? 3 : 1)),
            effects: skipBracketEffect.of(pos)
          };
        }
      } else if (allowTriple && state.sliceDoc(pos - 2 * token.length, pos) == token + token && nodeStart(state, pos - 2 * token.length)) {
        return {
          changes: {insert: token + token + token + token, from: pos},
          effects: closeBracketEffect.of(pos + token.length),
          range: EditorSelection.cursor(pos + token.length)
        };
      } else if (state.charCategorizer(pos)(next) != CharCategory.Word) {
        let prev = state.sliceDoc(pos - 1, pos);
        if (prev != token && state.charCategorizer(pos)(prev) != CharCategory.Word)
          return {
            changes: {insert: token + token, from: pos},
            effects: closeBracketEffect.of(pos + token.length),
            range: EditorSelection.cursor(pos + token.length)
          };
      }
      return {range: dont = range};
    });
    return dont ? null : state.update(changes, {
      scrollIntoView: true,
      annotations: Transaction.userEvent.of("input")
    });
  }
  function nodeStart(state, pos) {
    let tree = syntaxTree(state).resolve(pos + 1);
    return tree.parent && tree.from == pos;
  }

  // ../panel/src/panel.ts
  var panelConfig = Facet.define({
    combine(configs) {
      let topContainer, bottomContainer;
      for (let c of configs) {
        topContainer = topContainer || c.topContainer;
        bottomContainer = bottomContainer || c.bottomContainer;
      }
      return {topContainer, bottomContainer};
    }
  });
  function getPanel(view, panel) {
    let plugin = view.plugin(panelPlugin);
    let index = plugin ? plugin.specs.indexOf(panel) : -1;
    return index > -1 ? plugin.panels[index] : null;
  }
  var panelPlugin = ViewPlugin.fromClass(class {
    constructor(view) {
      this.input = view.state.facet(showPanel);
      this.specs = this.input.filter((s) => s);
      this.panels = this.specs.map((spec) => spec(view));
      let conf = view.state.facet(panelConfig);
      this.top = new PanelGroup(view, true, conf.topContainer);
      this.bottom = new PanelGroup(view, false, conf.bottomContainer);
      this.top.sync(this.panels.filter((p) => p.top));
      this.bottom.sync(this.panels.filter((p) => !p.top));
      for (let p of this.panels) {
        p.dom.classList.add("cm-panel");
        if (p.class)
          p.dom.classList.add(p.class);
        if (p.mount)
          p.mount();
      }
    }
    update(update) {
      let conf = update.state.facet(panelConfig);
      if (this.top.container != conf.topContainer) {
        this.top.sync([]);
        this.top = new PanelGroup(update.view, true, conf.topContainer);
      }
      if (this.bottom.container != conf.bottomContainer) {
        this.bottom.sync([]);
        this.bottom = new PanelGroup(update.view, false, conf.bottomContainer);
      }
      this.top.syncClasses();
      this.bottom.syncClasses();
      let input = update.state.facet(showPanel);
      if (input != this.input) {
        let specs = input.filter((x) => x);
        let panels = [], top2 = [], bottom = [], mount = [];
        for (let spec of specs) {
          let known = this.specs.indexOf(spec), panel;
          if (known < 0) {
            panel = spec(update.view);
            mount.push(panel);
          } else {
            panel = this.panels[known];
            if (panel.update)
              panel.update(update);
          }
          panels.push(panel);
          (panel.top ? top2 : bottom).push(panel);
        }
        this.specs = specs;
        this.panels = panels;
        this.top.sync(top2);
        this.bottom.sync(bottom);
        for (let p of mount) {
          p.dom.classList.add("cm-panel");
          if (p.class)
            p.dom.classList.add(p.class);
          if (p.mount)
            p.mount();
        }
      } else {
        for (let p of this.panels)
          if (p.update)
            p.update(update);
      }
    }
    destroy() {
      this.top.sync([]);
      this.bottom.sync([]);
    }
  }, {
    provide: PluginField.scrollMargins.from((value) => ({top: value.top.scrollMargin(), bottom: value.bottom.scrollMargin()}))
  });
  var PanelGroup = class {
    constructor(view, top2, container) {
      this.view = view;
      this.top = top2;
      this.container = container;
      this.dom = void 0;
      this.classes = "";
      this.panels = [];
      this.syncClasses();
    }
    sync(panels) {
      this.panels = panels;
      this.syncDOM();
    }
    syncDOM() {
      if (this.panels.length == 0) {
        if (this.dom) {
          this.dom.remove();
          this.dom = void 0;
        }
        return;
      }
      if (!this.dom) {
        this.dom = document.createElement("div");
        this.dom.className = this.top ? "cm-panels cm-panels-top" : "cm-panels cm-panels-bottom";
        this.dom.style[this.top ? "top" : "bottom"] = "0";
        let parent = this.container || this.view.dom;
        parent.insertBefore(this.dom, this.top ? parent.firstChild : null);
      }
      let curDOM = this.dom.firstChild;
      for (let panel of this.panels) {
        if (panel.dom.parentNode == this.dom) {
          while (curDOM != panel.dom)
            curDOM = rm2(curDOM);
          curDOM = curDOM.nextSibling;
        } else {
          this.dom.insertBefore(panel.dom, curDOM);
        }
      }
      while (curDOM)
        curDOM = rm2(curDOM);
    }
    scrollMargin() {
      return !this.dom || this.container ? 0 : Math.max(0, this.top ? this.dom.getBoundingClientRect().bottom - this.view.scrollDOM.getBoundingClientRect().top : this.view.scrollDOM.getBoundingClientRect().bottom - this.dom.getBoundingClientRect().top);
    }
    syncClasses() {
      if (!this.container || this.classes == this.view.themeClasses)
        return;
      for (let cls of this.classes.split(" "))
        if (cls)
          this.container.classList.remove(cls);
      for (let cls of (this.classes = this.view.themeClasses).split(" "))
        if (cls)
          this.container.classList.add(cls);
    }
  };
  function rm2(node) {
    let next = node.nextSibling;
    node.remove();
    return next;
  }
  var baseTheme7 = EditorView.baseTheme({
    ".cm-panels": {
      boxSizing: "border-box",
      position: "sticky",
      left: 0,
      right: 0
    },
    "&light .cm-panels": {
      backgroundColor: "#f5f5f5",
      color: "black"
    },
    "&light .cm-panels-top": {
      borderBottom: "1px solid #ddd"
    },
    "&light .cm-panels-bottom": {
      borderTop: "1px solid #ddd"
    },
    "&dark .cm-panels": {
      backgroundColor: "#333338",
      color: "white"
    }
  });
  var showPanel = Facet.define({
    enables: [panelPlugin, baseTheme7]
  });

  // ../node_modules/crelt/index.es.js
  function crelt() {
    var elt = arguments[0];
    if (typeof elt == "string")
      elt = document.createElement(elt);
    var i = 1, next = arguments[1];
    if (next && typeof next == "object" && next.nodeType == null && !Array.isArray(next)) {
      for (var name2 in next)
        if (Object.prototype.hasOwnProperty.call(next, name2)) {
          var value = next[name2];
          if (typeof value == "string")
            elt.setAttribute(name2, value);
          else if (value != null)
            elt[name2] = value;
        }
      i++;
    }
    for (; i < arguments.length; i++)
      add(elt, arguments[i]);
    return elt;
  }
  function add(elt, child) {
    if (typeof child == "string") {
      elt.appendChild(document.createTextNode(child));
    } else if (child == null) {
    } else if (child.nodeType != null) {
      elt.appendChild(child);
    } else if (Array.isArray(child)) {
      for (var i = 0; i < child.length; i++)
        add(elt, child[i]);
    } else {
      throw new RangeError("Unsupported child node: " + child);
    }
  }

  // ../search/src/cursor.ts
  var basicNormalize = typeof String.prototype.normalize == "function" ? (x) => x.normalize("NFKD") : (x) => x;
  var SearchCursor = class {
    constructor(text, query, from = 0, to = text.length, normalize) {
      this.value = {from: 0, to: 0};
      this.done = false;
      this.matches = [];
      this.buffer = "";
      this.bufferPos = 0;
      this.iter = text.iterRange(from, to);
      this.bufferStart = from;
      this.normalize = normalize ? (x) => normalize(basicNormalize(x)) : basicNormalize;
      this.query = this.normalize(query);
    }
    peek() {
      if (this.bufferPos == this.buffer.length) {
        this.bufferStart += this.buffer.length;
        this.iter.next();
        if (this.iter.done)
          return -1;
        this.bufferPos = 0;
        this.buffer = this.iter.value;
      }
      return codePointAt(this.buffer, this.bufferPos);
    }
    next() {
      while (this.matches.length)
        this.matches.pop();
      return this.nextOverlapping();
    }
    nextOverlapping() {
      for (; ; ) {
        let next = this.peek();
        if (next < 0) {
          this.done = true;
          return this;
        }
        let str = fromCodePoint(next), start = this.bufferStart + this.bufferPos;
        this.bufferPos += codePointSize(next);
        let norm = this.normalize(str);
        for (let i = 0, pos = start; ; i++) {
          let code = norm.charCodeAt(i);
          let match = this.match(code, pos);
          if (match) {
            this.value = match;
            return this;
          }
          if (i == norm.length - 1)
            break;
          if (pos == start && i < str.length && str.charCodeAt(i) == code)
            pos++;
        }
      }
    }
    match(code, pos) {
      let match = null;
      for (let i = 0; i < this.matches.length; i += 2) {
        let index = this.matches[i], keep = false;
        if (this.query.charCodeAt(index) == code) {
          if (index == this.query.length - 1) {
            match = {from: this.matches[i + 1], to: pos + 1};
          } else {
            this.matches[i]++;
            keep = true;
          }
        }
        if (!keep) {
          this.matches.splice(i, 2);
          i -= 2;
        }
      }
      if (this.query.charCodeAt(0) == code) {
        if (this.query.length == 1)
          match = {from: pos, to: pos + 1};
        else
          this.matches.push(1, pos);
      }
      return match;
    }
  };

  // ../search/src/regexp.ts
  var empty = {from: -1, to: -1, match: /.*/.exec("")};
  var baseFlags = "gm" + (/x/.unicode == null ? "" : "u");
  var RegExpCursor = class {
    constructor(text, query, options, from = 0, to = text.length) {
      this.to = to;
      this.curLine = "";
      this.done = false;
      this.value = empty;
      if (/\\[sWDnr]|\n|\r|\[\^/.test(query))
        return new MultilineRegExpCursor(text, query, options, from, to);
      this.re = new RegExp(query, baseFlags + (options?.ignoreCase ? "i" : ""));
      this.iter = text.iter();
      let startLine = text.lineAt(from);
      this.curLineStart = startLine.from;
      this.matchPos = from;
      this.getLine(this.curLineStart);
    }
    getLine(skip) {
      this.iter.next(skip);
      if (this.iter.lineBreak) {
        this.curLine = "";
      } else {
        this.curLine = this.iter.value;
        if (this.curLineStart + this.curLine.length > this.to)
          this.curLine = this.curLine.slice(0, this.to - this.curLineStart);
        this.iter.next();
      }
    }
    nextLine() {
      this.curLineStart = this.curLineStart + this.curLine.length + 1;
      if (this.curLineStart > this.to)
        this.curLine = "";
      else
        this.getLine(0);
    }
    next() {
      for (let off = this.matchPos - this.curLineStart; ; ) {
        this.re.lastIndex = off;
        let match = this.matchPos <= this.to && this.re.exec(this.curLine);
        if (match) {
          let from = this.curLineStart + match.index, to = from + match[0].length;
          this.matchPos = to + (from == to ? 1 : 0);
          if (from == this.curLine.length)
            this.nextLine();
          if (from < to || from > this.value.to) {
            this.value = {from, to, match};
            return this;
          }
          off = this.matchPos - this.curLineStart;
        } else if (this.curLineStart + this.curLine.length < this.to) {
          this.nextLine();
          off = 0;
        } else {
          this.done = true;
          return this;
        }
      }
    }
  };
  var flattened = new WeakMap();
  var FlattenedDoc = class {
    constructor(from, text) {
      this.from = from;
      this.text = text;
    }
    get to() {
      return this.from + this.text.length;
    }
    static get(doc2, from, to) {
      let cached = flattened.get(doc2);
      if (!cached || cached.from >= to || cached.to <= from) {
        let flat = new FlattenedDoc(from, doc2.sliceString(from, to));
        flattened.set(doc2, flat);
        return flat;
      }
      if (cached.from == from && cached.to == to)
        return cached;
      let {text, from: cachedFrom} = cached;
      if (cachedFrom > from) {
        text = doc2.sliceString(from, cachedFrom) + text;
        cachedFrom = from;
      }
      if (cached.to < to)
        text += doc2.sliceString(cached.to, to);
      flattened.set(doc2, new FlattenedDoc(cachedFrom, text));
      return new FlattenedDoc(from, text.slice(from - cachedFrom, to - cachedFrom));
    }
  };
  var Chunk2;
  (function(Chunk3) {
    Chunk3[Chunk3["Base"] = 5e3] = "Base";
  })(Chunk2 || (Chunk2 = {}));
  var MultilineRegExpCursor = class {
    constructor(text, query, options, from, to) {
      this.text = text;
      this.to = to;
      this.done = false;
      this.value = empty;
      this.matchPos = from;
      this.re = new RegExp(query, baseFlags + (options?.ignoreCase ? "i" : ""));
      this.flat = FlattenedDoc.get(text, from, this.chunkEnd(from + 5e3));
    }
    chunkEnd(pos) {
      return pos >= this.to ? this.to : this.text.lineAt(pos).to;
    }
    next() {
      for (; ; ) {
        let off = this.re.lastIndex = this.matchPos - this.flat.from;
        let match = this.re.exec(this.flat.text);
        if (match && !match[0] && match.index == off) {
          this.re.lastIndex = off + 1;
          match = this.re.exec(this.flat.text);
        }
        if (match && this.flat.to < this.to && match.index + match[0].length > this.flat.text.length - 10)
          match = null;
        if (match) {
          let from = this.flat.from + match.index, to = from + match[0].length;
          this.value = {from, to, match};
          this.matchPos = to + (from == to ? 1 : 0);
          return this;
        } else {
          if (this.flat.to == this.to) {
            this.done = true;
            return this;
          }
          this.flat = FlattenedDoc.get(this.text, this.flat.from, this.chunkEnd(this.flat.from + this.flat.text.length * 2));
        }
      }
    }
  };
  function validRegExp(source) {
    try {
      new RegExp(source, baseFlags);
      return true;
    } catch {
      return false;
    }
  }

  // ../search/src/selection-match.ts
  var defaultHighlightOptions = {
    highlightWordAroundCursor: false,
    minSelectionLength: 1,
    maxMatches: 100
  };
  var highlightConfig = Facet.define({
    combine(options) {
      return combineConfig(options, defaultHighlightOptions, {
        highlightWordAroundCursor: (a, b) => a || b,
        minSelectionLength: Math.min,
        maxMatches: Math.min
      });
    }
  });
  function highlightSelectionMatches(options) {
    let ext = [defaultTheme, matchHighlighter];
    if (options)
      ext.push(highlightConfig.of(options));
    return ext;
  }
  var matchDeco = Decoration.mark({class: "cm-selectionMatch"});
  var mainMatchDeco = Decoration.mark({class: "cm-selectionMatch cm-selectionMatch-main"});
  var matchHighlighter = ViewPlugin.fromClass(class {
    constructor(view) {
      this.decorations = this.getDeco(view);
    }
    update(update) {
      if (update.selectionSet || update.docChanged || update.viewportChanged)
        this.decorations = this.getDeco(update.view);
    }
    getDeco(view) {
      let conf = view.state.facet(highlightConfig);
      let {state} = view, sel = state.selection;
      if (sel.ranges.length > 1)
        return Decoration.none;
      let range = sel.main, query, check = null;
      if (range.empty) {
        if (!conf.highlightWordAroundCursor)
          return Decoration.none;
        let word = state.wordAt(range.head);
        if (!word)
          return Decoration.none;
        check = state.charCategorizer(range.head);
        query = state.sliceDoc(word.from, word.to);
      } else {
        let len = range.to - range.from;
        if (len < conf.minSelectionLength || len > 200)
          return Decoration.none;
        query = state.sliceDoc(range.from, range.to).trim();
        if (!query)
          return Decoration.none;
      }
      let deco = [];
      for (let part of view.visibleRanges) {
        let cursor = new SearchCursor(state.doc, query, part.from, part.to);
        while (!cursor.nextOverlapping().done) {
          let {from, to} = cursor.value;
          if (!check || (from == 0 || check(state.sliceDoc(from - 1, from)) != CharCategory.Word) && (to == state.doc.length || check(state.sliceDoc(to, to + 1)) != CharCategory.Word)) {
            if (check && from <= range.from && to >= range.to)
              deco.push(mainMatchDeco.range(from, to));
            else if (from >= range.to || to <= range.from)
              deco.push(matchDeco.range(from, to));
            if (deco.length > conf.maxMatches)
              return Decoration.none;
          }
        }
      }
      return Decoration.set(deco);
    }
  }, {
    decorations: (v) => v.decorations
  });
  var defaultTheme = EditorView.baseTheme({
    ".cm-selectionMatch": {backgroundColor: "#99ff7780"},
    ".cm-searchMatch .cm-selectionMatch": {backgroundColor: "transparent"}
  });
  var selectWord = ({state, dispatch}) => {
    let {selection} = state;
    let newSel = EditorSelection.create(selection.ranges.map((range) => state.wordAt(range.head) || EditorSelection.cursor(range.head)), selection.mainIndex);
    if (newSel.eq(selection))
      return false;
    dispatch(state.update({selection: newSel}));
    return true;
  };
  function findNextOccurrence(state, query) {
    let {ranges} = state.selection;
    let ahead = new SearchCursor(state.doc, query, ranges[ranges.length - 1].to).next();
    if (!ahead.done)
      return ahead.value;
    let cursor = new SearchCursor(state.doc, query, 0, Math.max(0, ranges[ranges.length - 1].from - 1));
    while (!cursor.next().done) {
      if (!ranges.some((r) => r.from === cursor.value.from))
        return cursor.value;
    }
    return null;
  }
  var selectNextOccurrence = ({state, dispatch}) => {
    let {ranges} = state.selection;
    if (ranges.some((sel) => sel.from === sel.to))
      return selectWord({state, dispatch});
    let searchedText = state.sliceDoc(ranges[0].from, ranges[0].to);
    if (state.selection.ranges.some((r) => state.sliceDoc(r.from, r.to) != searchedText))
      return false;
    let range = findNextOccurrence(state, searchedText);
    if (!range)
      return false;
    dispatch(state.update({
      selection: state.selection.addRange(EditorSelection.range(range.from, range.to)),
      scrollIntoView: true
    }));
    return true;
  };

  // ../search/src/search.ts
  var Query = class {
    constructor(search, replace, caseInsensitive) {
      this.search = search;
      this.replace = replace;
      this.caseInsensitive = caseInsensitive;
    }
    eq(other) {
      return this.search == other.search && this.replace == other.replace && this.caseInsensitive == other.caseInsensitive && this.constructor == other.constructor;
    }
  };
  var FindPrev;
  (function(FindPrev2) {
    FindPrev2[FindPrev2["ChunkSize"] = 1e4] = "ChunkSize";
  })(FindPrev || (FindPrev = {}));
  var StringQuery = class extends Query {
    constructor(search, replace, caseInsensitive) {
      super(search, replace, caseInsensitive);
      this.unquoted = search.replace(/\\([nrt\\])/g, (_, ch) => ch == "n" ? "\n" : ch == "r" ? "\r" : ch == "t" ? "	" : "\\");
    }
    cursor(doc2, from = 0, to = doc2.length) {
      return new SearchCursor(doc2, this.unquoted, from, to, this.caseInsensitive ? (x) => x.toLowerCase() : void 0);
    }
    nextMatch(doc2, curFrom, curTo) {
      let cursor = this.cursor(doc2, curTo).nextOverlapping();
      if (cursor.done)
        cursor = this.cursor(doc2, 0, curFrom).nextOverlapping();
      return cursor.done ? null : cursor.value;
    }
    prevMatchInRange(doc2, from, to) {
      for (let pos = to; ; ) {
        let start = Math.max(from, pos - 1e4 - this.unquoted.length);
        let cursor = this.cursor(doc2, start, pos), range = null;
        while (!cursor.nextOverlapping().done)
          range = cursor.value;
        if (range)
          return range;
        if (start == from)
          return null;
        pos -= 1e4;
      }
    }
    prevMatch(doc2, curFrom, curTo) {
      return this.prevMatchInRange(doc2, 0, curFrom) || this.prevMatchInRange(doc2, curTo, doc2.length);
    }
    getReplacement(_result) {
      return this.replace;
    }
    matchAll(doc2, limit) {
      let cursor = this.cursor(doc2), ranges = [];
      while (!cursor.next().done) {
        if (ranges.length >= limit)
          return null;
        ranges.push(cursor.value);
      }
      return ranges;
    }
    highlight(doc2, from, to, add2) {
      let cursor = this.cursor(doc2, Math.max(0, from - this.unquoted.length), Math.min(to + this.unquoted.length, doc2.length));
      while (!cursor.next().done)
        add2(cursor.value.from, cursor.value.to);
    }
    get valid() {
      return !!this.search;
    }
  };
  var RegExp2;
  (function(RegExp3) {
    RegExp3[RegExp3["HighlightMargin"] = 250] = "HighlightMargin";
  })(RegExp2 || (RegExp2 = {}));
  var RegExpQuery = class extends Query {
    constructor(search, replace, caseInsensitive) {
      super(search, replace, caseInsensitive);
      this.valid = !!search && validRegExp(search);
    }
    cursor(doc2, from = 0, to = doc2.length) {
      return new RegExpCursor(doc2, this.search, this.caseInsensitive ? {ignoreCase: true} : void 0, from, to);
    }
    nextMatch(doc2, curFrom, curTo) {
      let cursor = this.cursor(doc2, curTo).next();
      if (cursor.done)
        cursor = this.cursor(doc2, 0, curFrom).next();
      return cursor.done ? null : cursor.value;
    }
    prevMatchInRange(doc2, from, to) {
      for (let size = 1; ; size++) {
        let start = Math.max(from, to - size * 1e4);
        let cursor = this.cursor(doc2, start, to), range = null;
        while (!cursor.next().done)
          range = cursor.value;
        if (range && (start == from || range.from > start + 10))
          return range;
        if (start == from)
          return null;
      }
    }
    prevMatch(doc2, curFrom, curTo) {
      return this.prevMatchInRange(doc2, 0, curFrom) || this.prevMatchInRange(doc2, curTo, doc2.length);
    }
    getReplacement(result) {
      return this.replace.replace(/\$([$&\d+])/g, (m, i) => i == "$" ? "$" : i == "&" ? result.match[0] : i != "0" && +i < result.match.length ? result.match[i] : m);
    }
    matchAll(doc2, limit) {
      let cursor = this.cursor(doc2), ranges = [];
      while (!cursor.next().done) {
        if (ranges.length >= limit)
          return null;
        ranges.push(cursor.value);
      }
      return ranges;
    }
    highlight(doc2, from, to, add2) {
      let cursor = this.cursor(doc2, Math.max(0, from - 250), Math.min(to + 250, doc2.length));
      while (!cursor.next().done)
        add2(cursor.value.from, cursor.value.to);
    }
  };
  var setQuery = StateEffect.define();
  var togglePanel = StateEffect.define();
  var searchState = StateField.define({
    create() {
      return new SearchState(new StringQuery("", "", false), null);
    },
    update(value, tr) {
      for (let effect of tr.effects) {
        if (effect.is(setQuery))
          value = new SearchState(effect.value, value.panel);
        else if (effect.is(togglePanel))
          value = new SearchState(value.query, effect.value ? createSearchPanel : null);
      }
      return value;
    },
    provide: (f) => showPanel.from(f, (val) => val.panel)
  });
  var SearchState = class {
    constructor(query, panel) {
      this.query = query;
      this.panel = panel;
    }
  };
  var matchMark = Decoration.mark({class: "cm-searchMatch"});
  var selectedMatchMark = Decoration.mark({class: "cm-searchMatch cm-searchMatch-selected"});
  var searchHighlighter = ViewPlugin.fromClass(class {
    constructor(view) {
      this.view = view;
      this.decorations = this.highlight(view.state.field(searchState));
    }
    update(update) {
      let state = update.state.field(searchState);
      if (state != update.startState.field(searchState) || update.docChanged || update.selectionSet)
        this.decorations = this.highlight(state);
    }
    highlight({query, panel}) {
      if (!panel || !query.valid)
        return Decoration.none;
      let {view} = this;
      let builder = new RangeSetBuilder();
      for (let i = 0, ranges = view.visibleRanges, l = ranges.length; i < l; i++) {
        let {from, to} = ranges[i];
        while (i < l - 1 && to > ranges[i + 1].from - 2 * 250)
          to = ranges[++i].to;
        query.highlight(view.state.doc, from, to, (from2, to2) => {
          let selected = view.state.selection.ranges.some((r) => r.from == from2 && r.to == to2);
          builder.add(from2, to2, selected ? selectedMatchMark : matchMark);
        });
      }
      return builder.finish();
    }
  }, {
    decorations: (v) => v.decorations
  });
  function searchCommand(f) {
    return (view) => {
      let state = view.state.field(searchState, false);
      return state && state.query.valid ? f(view, state) : openSearchPanel(view);
    };
  }
  var findNext = searchCommand((view, {query}) => {
    let {from, to} = view.state.selection.main;
    let next = query.nextMatch(view.state.doc, from, to);
    if (!next || next.from == from && next.to == to)
      return false;
    view.dispatch({
      selection: {anchor: next.from, head: next.to},
      scrollIntoView: true,
      effects: announceMatch(view, next)
    });
    return true;
  });
  var findPrevious = searchCommand((view, {query}) => {
    let {state} = view, {from, to} = state.selection.main;
    let range = query.prevMatch(state.doc, from, to);
    if (!range)
      return false;
    view.dispatch({
      selection: {anchor: range.from, head: range.to},
      scrollIntoView: true,
      effects: announceMatch(view, range)
    });
    return true;
  });
  var selectMatches = searchCommand((view, {query}) => {
    let ranges = query.matchAll(view.state.doc, 1e3);
    if (!ranges || !ranges.length)
      return false;
    view.dispatch({
      selection: EditorSelection.create(ranges.map((r) => EditorSelection.range(r.from, r.to)))
    });
    return true;
  });
  var replaceNext = searchCommand((view, {query}) => {
    let {state} = view, {from, to} = state.selection.main;
    let next = query.nextMatch(state.doc, from, from);
    if (!next)
      return false;
    let changes = [], selection, replacement;
    if (next.from == from && next.to == to) {
      replacement = state.toText(query.getReplacement(next));
      changes.push({from: next.from, to: next.to, insert: replacement});
      next = query.nextMatch(state.doc, next.from, next.to);
    }
    if (next) {
      let off = changes.length == 0 || changes[0].from >= next.to ? 0 : next.to - next.from - replacement.length;
      selection = {anchor: next.from - off, head: next.to - off};
    }
    view.dispatch({
      changes,
      selection,
      scrollIntoView: !!selection,
      effects: next ? announceMatch(view, next) : void 0
    });
    return true;
  });
  var replaceAll = searchCommand((view, {query}) => {
    let changes = query.matchAll(view.state.doc, 1e9).map((match) => {
      let {from, to} = match;
      return {from, to, insert: query.getReplacement(match)};
    });
    if (!changes.length)
      return false;
    view.dispatch({changes});
    return true;
  });
  function createSearchPanel(view) {
    let {query} = view.state.field(searchState);
    return {
      dom: buildPanel({
        view,
        query,
        updateQuery(q) {
          if (!query.eq(q)) {
            query = q;
            view.dispatch({effects: setQuery.of(query)});
          }
        }
      }),
      mount() {
        ;
        this.dom.querySelector("[name=search]").select();
      },
      pos: 80
    };
  }
  var openSearchPanel = (view) => {
    let state = view.state.field(searchState, false);
    if (state && state.panel) {
      let panel = getPanel(view, createSearchPanel);
      if (!panel)
        return false;
      panel.dom.querySelector("[name=search]").focus();
    } else {
      view.dispatch({effects: [togglePanel.of(true), ...state ? [] : [StateEffect.appendConfig.of(searchExtensions)]]});
    }
    return true;
  };
  var closeSearchPanel = (view) => {
    let state = view.state.field(searchState, false);
    if (!state || !state.panel)
      return false;
    let panel = getPanel(view, createSearchPanel);
    if (panel && panel.dom.contains(view.root.activeElement))
      view.focus();
    view.dispatch({effects: togglePanel.of(false)});
    return true;
  };
  function buildPanel(conf) {
    function phrase(phrase2) {
      return conf.view.state.phrase(phrase2);
    }
    let searchField = crelt("input", {
      value: conf.query.search,
      placeholder: phrase("Find"),
      "aria-label": phrase("Find"),
      class: "cm-textfield",
      name: "search",
      onchange: update,
      onkeyup: update
    });
    let replaceField = crelt("input", {
      value: conf.query.replace,
      placeholder: phrase("Replace"),
      "aria-label": phrase("Replace"),
      class: "cm-textfield",
      name: "replace",
      onchange: update,
      onkeyup: update
    });
    let caseField = crelt("input", {
      type: "checkbox",
      name: "case",
      checked: !conf.query.caseInsensitive,
      onchange: update
    });
    let reField = crelt("input", {
      type: "checkbox",
      name: "re",
      checked: conf.query instanceof RegExpQuery,
      onchange: update
    });
    function update() {
      conf.updateQuery(new (reField.checked ? RegExpQuery : StringQuery)(searchField.value, replaceField.value, !caseField.checked));
    }
    function keydown(e) {
      if (runScopeHandlers(conf.view, e, "search-panel")) {
        e.preventDefault();
      } else if (e.keyCode == 13 && e.target == searchField) {
        e.preventDefault();
        (e.shiftKey ? findPrevious : findNext)(conf.view);
      } else if (e.keyCode == 13 && e.target == replaceField) {
        e.preventDefault();
        replaceNext(conf.view);
      }
    }
    function button(name2, onclick, content2) {
      return crelt("button", {class: "cm-button", name: name2, onclick}, content2);
    }
    let panel = crelt("div", {onkeydown: keydown, class: "cm-search"}, [
      searchField,
      button("next", () => findNext(conf.view), [phrase("next")]),
      button("prev", () => findPrevious(conf.view), [phrase("previous")]),
      button("select", () => selectMatches(conf.view), [phrase("all")]),
      crelt("label", null, [caseField, phrase("match case")]),
      crelt("label", null, [reField, phrase("regexp")]),
      crelt("br"),
      replaceField,
      button("replace", () => replaceNext(conf.view), [phrase("replace")]),
      button("replaceAll", () => replaceAll(conf.view), [phrase("replace all")]),
      crelt("button", {name: "close", onclick: () => closeSearchPanel(conf.view), "aria-label": phrase("close")}, ["\xD7"])
    ]);
    return panel;
  }
  var AnnounceMargin = 30;
  var Break = /[\s\.,:;?!]/;
  function announceMatch(view, {from, to}) {
    let lineStart = view.state.doc.lineAt(from).from, lineEnd = view.state.doc.lineAt(to).to;
    let start = Math.max(lineStart, from - AnnounceMargin), end = Math.min(lineEnd, to + AnnounceMargin);
    let text = view.state.sliceDoc(start, end);
    if (start != lineStart) {
      for (let i = 0; i < AnnounceMargin; i++)
        if (!Break.test(text[i + 1]) && Break.test(text[i])) {
          text = text.slice(i);
          break;
        }
    }
    if (end != lineEnd) {
      for (let i = text.length - 1; i > text.length - AnnounceMargin; i--)
        if (!Break.test(text[i - 1]) && Break.test(text[i])) {
          text = text.slice(0, i);
          break;
        }
    }
    return EditorView.announce.of(`${view.state.phrase("current match")}. ${text} ${view.state.phrase("on line")} ${view.state.doc.lineAt(from).number}`);
  }
  var baseTheme8 = EditorView.baseTheme({
    ".cm-panel.cm-search": {
      padding: "2px 6px 4px",
      position: "relative",
      "& [name=close]": {
        position: "absolute",
        top: "0",
        right: "4px",
        backgroundColor: "inherit",
        border: "none",
        font: "inherit",
        padding: 0,
        margin: 0
      },
      "& input, & button, & label": {
        margin: ".2em .6em .2em 0"
      },
      "& input[type=checkbox]": {
        marginRight: ".2em"
      },
      "& label": {
        fontSize: "80%"
      }
    },
    "&light .cm-searchMatch": {backgroundColor: "#ffff0054"},
    "&dark .cm-searchMatch": {backgroundColor: "#00ffff8a"},
    "&light .cm-searchMatch-selected": {backgroundColor: "#ff6a0054"},
    "&dark .cm-searchMatch-selected": {backgroundColor: "#ff00ff8a"}
  });
  var searchExtensions = [
    searchState,
    Prec.override(searchHighlighter),
    baseTheme8
  ];

  // ../comment/src/comment.ts
  var toggleComment = (target) => {
    let config2 = getConfig(target.state);
    return config2.line ? toggleLineComment(target) : config2.block ? toggleBlockComment(target) : false;
  };
  function command(f, option) {
    return ({state, dispatch}) => {
      let tr = f(option, state.selection.ranges, state);
      if (!tr)
        return false;
      dispatch(state.update(tr));
      return true;
    };
  }
  var CommentOption;
  (function(CommentOption2) {
    CommentOption2[CommentOption2["Toggle"] = 0] = "Toggle";
    CommentOption2[CommentOption2["Comment"] = 1] = "Comment";
    CommentOption2[CommentOption2["Uncomment"] = 2] = "Uncomment";
  })(CommentOption || (CommentOption = {}));
  var toggleLineComment = command(changeLineComment, CommentOption.Toggle);
  var lineComment = command(changeLineComment, CommentOption.Comment);
  var lineUncomment = command(changeLineComment, CommentOption.Uncomment);
  var toggleBlockComment = command(changeBlockComment, CommentOption.Toggle);
  var blockComment = command(changeBlockComment, CommentOption.Comment);
  var blockUncomment = command(changeBlockComment, CommentOption.Uncomment);
  var commentKeymap = [
    {key: "Mod-/", run: toggleComment},
    {key: "Alt-A", run: toggleBlockComment}
  ];

  function getConfig(state, pos = state.selection.main.head) {
    let data = state.languageDataAt("commentTokens", pos);
    return data.length ? data[0] : {};
  }
  var SearchMargin = 50;
  function findBlockComment(state, {open, close}, from, to) {
    let textBefore = state.sliceDoc(from - SearchMargin, from);
    let textAfter = state.sliceDoc(to, to + SearchMargin);
    let spaceBefore = /\s*$/.exec(textBefore)[0].length, spaceAfter = /^\s*/.exec(textAfter)[0].length;
    let beforeOff = textBefore.length - spaceBefore;
    if (textBefore.slice(beforeOff - open.length, beforeOff) == open && textAfter.slice(spaceAfter, spaceAfter + close.length) == close) {
      return {
        open: {pos: from - spaceBefore, margin: spaceBefore && 1},
        close: {pos: to + spaceAfter, margin: spaceAfter && 1}
      };
    }
    let startText, endText;
    if (to - from <= 2 * SearchMargin) {
      startText = endText = state.sliceDoc(from, to);
    } else {
      startText = state.sliceDoc(from, from + SearchMargin);
      endText = state.sliceDoc(to - SearchMargin, to);
    }
    let startSpace = /^\s*/.exec(startText)[0].length, endSpace = /\s*$/.exec(endText)[0].length;
    let endOff = endText.length - endSpace - close.length;
    if (startText.slice(startSpace, startSpace + open.length) == open && endText.slice(endOff, endOff + close.length) == close) {
      return {
        open: {
          pos: from + startSpace + open.length,
          margin: /\s/.test(startText.charAt(startSpace + open.length)) ? 1 : 0
        },
        close: {
          pos: to - endSpace - close.length,
          margin: /\s/.test(endText.charAt(endOff - 1)) ? 1 : 0
        }
      };
    }
    return null;
  }
  function changeBlockComment(option, ranges, state) {
    let tokens = ranges.map((r) => getConfig(state, r.from).block);
    if (!tokens.every((c) => c))
      return null;
    let comments = ranges.map((r, i) => findBlockComment(state, tokens[i], r.from, r.to));
    if (option != 2 && !comments.every((c) => c)) {
      let index = 0;
      return state.changeByRange((range) => {
        let {open, close} = tokens[index++];
        if (comments[index])
          return {range};
        let shift2 = open.length + 1;
        return {
          changes: [{from: range.from, insert: open + " "}, {from: range.to, insert: " " + close}],
          range: EditorSelection.range(range.anchor + shift2, range.head + shift2)
        };
      });
    } else if (option != 1 && comments.some((c) => c)) {
      let changes = [];
      for (let i = 0, comment2; i < comments.length; i++)
        if (comment2 = comments[i]) {
          let token = tokens[i], {open, close} = comment2;
          changes.push({from: open.pos - token.open.length, to: open.pos + open.margin}, {from: close.pos - close.margin, to: close.pos + token.close.length});
        }
      return {changes};
    }
    return null;
  }
  function changeLineComment(option, ranges, state) {
    let lines = [];
    let prevLine = -1;
    for (let {from, to} of ranges) {
      let startI = lines.length, minIndent = 1e9;
      for (let pos = from; pos <= to; ) {
        let line = state.doc.lineAt(pos);
        if (line.from > prevLine && (from == to || to > line.from)) {
          prevLine = line.from;
          let token = getConfig(state, pos).line;
          if (!token)
            continue;
          let indent = /^\s*/.exec(line.text)[0].length;
          let comment2 = line.text.slice(indent, indent + token.length) == token ? indent : -1;
          if (indent < line.text.length && indent < minIndent)
            minIndent = indent;
          lines.push({line, comment: comment2, token, indent, single: false});
        }
        pos = line.to + 1;
      }
      if (minIndent < 1e9) {
        for (let i = startI; i < lines.length; i++)
          if (lines[i].indent < lines[i].line.text.length)
            lines[i].indent = minIndent;
      }
      if (lines.length == startI + 1)
        lines[startI].single = true;
    }
    if (option != 1 && lines.some((l) => l.comment >= 0)) {
      let changes = [];
      for (let {line, comment: comment2, token} of lines)
        if (comment2 >= 0) {
          let from = line.from + comment2, to = from + token.length;
          if (line.text[to - line.from] == " ")
            to++;
          changes.push({from, to});
        }
      return {changes};
    } else if (option != 2 && lines.some((l) => l.comment < 0)) {
      let changes = [];
      for (let {line, comment: comment2, token, indent, single} of lines)
        if (comment2 != indent && (single || /\S/.test(line.text)))
          changes.push({from: line.from + indent, insert: token + " "});
      let changeSet = state.changes(changes);
      return {changes: changeSet, selection: state.selection.map(changeSet, 1)};
    }
    return null;
  }

  // ../rectangular-selection/src/rectangular-selection.ts
  var MaxOff = 2e3;
  function rectangleFor(state, a, b) {
    let startLine = Math.min(a.line, b.line), endLine = Math.max(a.line, b.line);
    let ranges = [];
    if (a.off > MaxOff || b.off > MaxOff || a.col < 0 || b.col < 0) {
      let startOff = Math.min(a.off, b.off), endOff = Math.max(a.off, b.off);
      for (let i = startLine; i <= endLine; i++) {
        let line = state.doc.line(i);
        if (line.length <= endOff)
          ranges.push(EditorSelection.range(line.from + startOff, line.to + endOff));
      }
    } else {
      let startCol = Math.min(a.col, b.col), endCol = Math.max(a.col, b.col);
      for (let i = startLine; i <= endLine; i++) {
        let line = state.doc.line(i), str = line.length > MaxOff ? line.text.slice(0, 2 * endCol) : line.text;
        let start = findColumn(str, 0, startCol, state.tabSize), end = findColumn(str, 0, endCol, state.tabSize);
        if (!start.leftOver)
          ranges.push(EditorSelection.range(line.from + start.offset, line.from + end.offset));
      }
    }
    return ranges;
  }
  function absoluteColumn(view, x) {
    let ref = view.coordsAtPos(view.viewport.from);
    return ref ? Math.round(Math.abs((ref.left - x) / view.defaultCharacterWidth)) : -1;
  }
  function getPos(view, event) {
    let offset = view.posAtCoords({x: event.clientX, y: event.clientY});
    if (offset == null)
      return null;
    let line = view.state.doc.lineAt(offset), off = offset - line.from;
    let col = off > MaxOff ? -1 : off == line.length ? absoluteColumn(view, event.clientX) : countColumn(line.text.slice(0, offset - line.from), 0, view.state.tabSize);
    return {line: line.number, col, off};
  }
  function rectangleSelectionStyle(view, event) {
    let start = getPos(view, event), startSel = view.state.selection;
    if (!start)
      return null;
    return {
      update(update) {
        if (update.docChanged) {
          let newStart = update.changes.mapPos(update.startState.doc.line(start.line).from);
          let newLine = update.state.doc.lineAt(newStart);
          start = {line: newLine.number, col: start.col, off: Math.min(start.off, newLine.length)};
          startSel = startSel.map(update.changes);
        }
      },
      get(event2, _extend, multiple) {
        let cur2 = getPos(view, event2);
        if (!cur2)
          return startSel;
        let ranges = rectangleFor(view.state, start, cur2);
        if (!ranges.length)
          return startSel;
        if (multiple)
          return EditorSelection.create(ranges.concat(startSel.ranges));
        else
          return EditorSelection.create(ranges);
      }
    };
  }
  function rectangularSelection(options) {
    let filter = options?.eventFilter || ((e) => e.altKey && e.button == 0);
    return EditorView.mouseSelectionStyle.of((view, event) => filter(event) ? rectangleSelectionStyle(view, event) : null);
  }

  // demo.ts
  var tabBinding = {key: "Tab", run: indentMore, shift: indentLess};
  var cmdD = {key: "Mod-d", run: selectNextOccurrence, preventDefault: true};
  var km = keymap.of([
    ...closeBracketsKeymap,
    ...defaultKeymap,
    ...historyKeymap,
    ...commentKeymap,
    tabBinding,
    cmdD
  ]);
  var setup = [
    lineNumbers(),
    highlightSpecialChars(),
    history(),
    foldGutter(),
    drawSelection(),
    EditorState.allowMultipleSelections.of(true),
    indentOnInput(),
    defaultHighlightStyle.fallback,
    bracketMatching(),
    closeBrackets(),
    rectangularSelection(),
    highlightActiveLine(),
    highlightSelectionMatches(),
    km
  ];
  var CodeMirror = class extends HTMLElement {
    constructor() {
      super();
      this.state = void 0;
      this.view = void 0;
      this.foldRange = void 0;
    }
    connectedCallback() {
      const initState = EditorState.create({
        doc: ``,
        extensions: [
          setup,
          javascript()
        ]
      });
      this.view = new EditorView({state: initState, parent: this});
      this.foldRange = foldRange(this.view);
    }
  };
  window.customElements.define("codemirror-js", CodeMirror);
})();