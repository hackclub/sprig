eval(`
  var {
    sin: A,
    cos: B,
    sqrt: C,
    pow: D,
    round: E,
    ceil: F,
    PI: _a
  } = Math;

  G = (x, y, z, X, Y, Z) => {
    var a = B(Y),
        b = B(Z),
        c = B(X),
        d = A(Z),
        e = A(X),
        f = A(Y),
        C = e * f,
        D = c * f;

    return [
      x * a * b + y * (-C * b + c * d) + z * (D * b + e * d),
      -x * a * d + y * (C * d + c * b) + z * (-D * d + e * b),
      -x * f - y * e * a + z * c * a
    ];
  };

  H = (w, h) => {
    var b = [];
    while (h) {
      b.push(new Array(w).fill(0));
      h--;
    }
    return b;
  };

  _b = document.querySelector("canvas").getContext("2d"),
  _c = _a / 2,
  _d = 15,
  _e = _d * 0.55,
  _f = 0,
  _g = 0,
  _h = _c / 3,
  _i = H(F(500 / _e), F(500 / _d)),
  _j = H(F(500 / _e), F(500 / _d));

  draw = _ => {
    let a = 2 * _a;

    while (a > 0) {
      let b = 2 * _a;

      while (b > 0) {
        var [c, d, e] = G(
          (30 * B(b) * B(a) + 2 * B(a) * 30) / 2,
          (30 * B(b) * A(a) + 2 * A(a) * 30) / 2,
          30 * A(b) / 2,
          _f, _g, _h
        );

        var [f, g, h] = G(B(b) * B(a), B(b) * A(a), A(b), _f, _g, _h),
            i = 1 / C(D(120 - c, 2) + D(0 - d, 2) + D(0 - e, 2)),
            j = f * B(_c / 2) * B(_a / 3) + g * B(_c / 2) * A(_a / 3) + h * A(_c / 2),
            k = (d * 350) / (120 - c),
            l = -(e * 350) / (120 - c),
            m = E((250 + k) / _e),
            n = E((250 + l) / _d);

        if (_i[n][m] < i) {
          _i[n][m] = i;
          _j[n][m] = (j + 1) / 2;
        }

        b -= _a * 2 / 60;
      }

      a -= _a * 2 / 150;
    }

    _f += 0.01;
    _g += 0;
    _h += 0.01;

    _b.fillStyle = "black";
    _b.fillRect(0, 0, 500, 500);

    _j.forEach((a, y) =>
      a.forEach((b, x) => {
        _b.font = \`\${_d}px Consolas\`;
        _b.fillStyle = 'white';
        _b.fillText(" .,-~:;!=*#$@"[E(b * 12)], x * _e, y * _d);
        _i[y][x] = 0;
        _j[y][x] = 0;
      })
    );
  };

  setInterval(draw, 50 / 3);
`.replaceAll("\n", "").replaceAll("  ", ""));