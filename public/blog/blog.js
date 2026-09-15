(function () {
  function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  var canvas = document.getElementById('ridge');
  if (!canvas) return;

  var accent = canvas.dataset.accent || '#2b4bf2';
  var seed = parseInt(canvas.dataset.seed || '42', 10);
  var layers = ['#9db8fa', '#4c6ef5', accent, '#0e1e66'];

  function draw() {
    var rect = canvas.getBoundingClientRect();
    if (rect.width === 0) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var px = 7;
    var cols = Math.ceil(rect.width / px);
    var rows = Math.ceil(rect.height / px);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    var ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var rand = mulberry32(seed);

    // pixel sun
    var sunC = Math.floor(cols * 0.82);
    var sunR = Math.floor(rows * 0.22);
    for (var dy = -3; dy <= 3; dy++) {
      for (var dx = -3; dx <= 3; dx++) {
        if (dx * dx + dy * dy <= 10) {
          ctx.fillStyle = accent;
          ctx.fillRect((sunC + dx) * px, (sunR + dy) * px, px, px);
        }
      }
    }

    // faint stars
    for (var i = 0; i < Math.floor(cols * 0.3); i++) {
      var c = Math.floor(rand() * cols);
      var r = Math.floor(rand() * rows * 0.4);
      ctx.fillStyle = 'rgba(19, 19, 17, 0.12)';
      ctx.fillRect(c * px, r * px, px, px);
    }

    // ridges
    var ridges = layers.map(function (_, li) {
      var arr = [];
      var h = 0.2 + li * 0.17;
      for (var c2 = 0; c2 <= cols; c2++) {
        h += (rand() - 0.5) * (0.05 + li * 0.03);
        h = Math.max(0.15 + li * 0.12, Math.min(0.92, h));
        arr.push(h);
      }
      return arr;
    });

    for (var c3 = 0; c3 < cols; c3++) {
      for (var li2 = 0; li2 < layers.length; li2++) {
        var shore = ridges[li2][c3] * rows;
        for (var r2 = Math.floor(shore); r2 < rows; r2++) {
          var depth = (r2 - shore) / (rows - shore || 1);
          if (rand() > 0.2 + depth * 0.72) continue;
          ctx.fillStyle = layers[li2];
          ctx.fillRect(c3 * px, r2 * px, px, px);
        }
      }
    }

    // pink sparks
    for (var j = 0; j < Math.floor(cols * 0.5); j++) {
      var c4 = Math.floor(rand() * cols);
      var r3 = Math.floor(rand() * rows * 0.55);
      if (rand() > 0.45) {
        ctx.fillStyle = '#e879b9';
        ctx.fillRect(c4 * px, r3 * px, px, px);
      }
    }
  }

  draw();
  if ('ResizeObserver' in window) {
    var ro = new ResizeObserver(draw);
    ro.observe(canvas);
  } else {
    window.addEventListener('resize', draw);
  }
})();
