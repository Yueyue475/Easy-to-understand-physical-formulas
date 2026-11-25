/* ==========================================================================
   物理公式重演 · 组件库 PH
   无依赖、ES5 语法、IIFE 包裹，file:// 直接可用。
   只操作 DOM / Canvas / localStorage，不发请求、不加载模块。
   ========================================================================== */
(function (global) {
  'use strict';

  var doc = global.document;

  /* ---------- 课程数据 ---------- */

  var LESSONS = [
    { id: '1-1', stage: 1, file: '01-行星为什么这样运行.html', title: '行星为什么这样运行？', minutes: 10 },
    { id: '1-2', stage: 1, file: '02-天上的规律和地上的规律是同一套吗.html', title: '天上的规律和地上的规律是同一套吗？', minutes: 11 },
    { id: '1-3', stage: 1, file: '03-物体为什么会停下.html', title: '物体为什么会停下？', minutes: 10 },
    { id: '2-1', stage: 2, file: '04-能不能不追踪每一步受力.html', title: '能不能不追踪每一步受力？', minutes: 12 },
    { id: '2-2', stage: 2, file: '05-只靠能量和动量能推出什么.html', title: '只靠能量和动量能推出什么？', minutes: 12 },
    { id: '3-1', stage: 3, file: '06-热是物质还是运动.html', title: '热是物质还是运动？', minutes: 10 },
    { id: '3-2', stage: 3, file: '07-为什么蒸汽机能做功.html', title: '为什么蒸汽机能做功？', minutes: 11 },
    { id: '3-3', stage: 3, file: '08-热量为什么只从热流向冷.html', title: '热量为什么只从热流向冷？', minutes: 12 },
    { id: '3-4', stage: 3, file: '09-一堆乱撞的粒子怎么变出温度和压强.html', title: '一堆乱撞的粒子怎么变出温度和压强？', minutes: 12 },
    { id: '4-1', stage: 4, file: '10-电流旁边的磁针为什么会动.html', title: '电流旁边的磁针为什么会动？', minutes: 9 },
    { id: '4-2', stage: 4, file: '11-力能不能不靠接触传递.html', title: '力能不能不靠接触传递？', minutes: 10 },
    { id: '4-3', stage: 4, file: '12-光会不会就是电磁波.html', title: '光会不会就是电磁波？', minutes: 11 },
    { id: '4-4', stage: 4, file: '13-光靠什么介质传播.html', title: '光靠什么介质传播？', minutes: 11 },
    { id: '5-1', stage: 5, file: '14-为什么测不到以太风.html', title: '怎么测都测不到“以太风”？', minutes: 11 },
    { id: '5-2', stage: 5, file: '15-追着光跑会看到什么.html', title: '追着光跑会看到什么？', minutes: 12 },
    { id: '5-3', stage: 5, file: '16-热物体发的光为什么只看温度.html', title: '热物体发的光为什么只看温度？', minutes: 12 },
    { id: '5-4', stage: 5, file: '17-原子为什么是稳定的.html', title: '原子为什么是稳定的？', minutes: 12 },
    { id: '5-5', stage: 5, file: '18-电子到底像波还是像粒子.html', title: '电子到底像波还是像粒子？', minutes: 11 },
    { id: '6-1', stage: 6, file: '19-相对论加量子会算出什么怪东西.html', title: '相对论加量子，会算出什么怪东西？', minutes: 12 },
    { id: '6-2', stage: 6, file: '20-场本身能被量子化吗.html', title: '场本身能被量子化吗？', minutes: 11 },
    { id: '6-3', stage: 6, file: '21-弱作用为什么不遵守左右对称.html', title: '弱作用为什么“违反”左右对称？', minutes: 11 },
    { id: '7-1', stage: 7, file: '22-为什么低温下电阻突然变零.html', title: '为什么低温下电阻突然变零？', minutes: 12 },
    { id: '7-2', stage: 7, file: '23-为什么电阻会出现精确台阶.html', title: '为什么电阻会出现精确台阶？', minutes: 12 },
    { id: '7-3', stage: 7, file: '24-为什么不该导电的表面却导电.html', title: '为什么“不该导电”的表面却导电？', minutes: 12 },
    { id: '8-1', stage: 8, file: '25-宇宙为什么在膨胀.html', title: '宇宙为什么在膨胀？', minutes: 10 },
    { id: '8-2', stage: 8, file: '26-恒星里的元素怎么造出来.html', title: '恒星里的元素怎么造出来？', minutes: 11 },
    { id: '8-3', stage: 8, file: '27-黑洞中心与宇宙开端为什么打架.html', title: '黑洞中心与宇宙开端，两个理论为什么打架？', minutes: 12 }
  ];

  var STAGES = [
    { n: 1, name: '天体与地面', sub: '17世纪前—17世纪', color: '#4ea8ff' },
    { n: 2, name: '如何描述运动', sub: '17—18世纪', color: '#35e0c8' },
    { n: 3, name: '热、火与“无生命的能量”', sub: '18—19世纪', color: '#ff8a3d' },
    { n: 4, name: '电、磁、光是不是一回事？', sub: '19世纪', color: '#7ea8ff' },
    { n: 5, name: '以太、原子、辐射——三家同时起火', sub: '19世纪末—20世纪初', color: '#ff6b9d' },
    { n: 6, name: '把量子和相对论缝合起来', sub: '20世纪30—70年代', color: '#a98bff' },
    { n: 7, name: '一堆粒子凑在一起，为什么会“变出新东西”', sub: '20世纪至今', color: '#3ddc97' },
    { n: 8, name: '宇宙本身成为一个实验室', sub: '20世纪至今', color: '#ffcd54' }
  ];

  /* ---------- 小工具 ---------- */

  function resolve(target) {
    if (!target) return null;
    if (typeof target === 'string') {
      return doc.getElementById(target) || doc.querySelector(target);
    }
    return target;
  }

  function make(tag, cls) {
    var node = doc.createElement(tag);
    if (cls) node.className = cls;
    return node;
  }

  function each(list, fn) {
    if (!list) return;
    for (var i = 0; i < list.length; i++) fn(list[i], i);
  }

  function on(node, evt, fn, opts) {
    if (!node || !node.addEventListener) return;
    node.addEventListener(evt, fn, opts || false);
  }

  function makeBtn(text, cls) {
    var b = make('button', 'btn' + (cls ? ' ' + cls : ''));
    b.type = 'button';
    b.textContent = text;
    return b;
  }

  function findLesson(id) {
    for (var i = 0; i < LESSONS.length; i++) {
      if (LESSONS[i].id === id) return LESSONS[i];
    }
    return null;
  }

  function findStage(n) {
    for (var i = 0; i < STAGES.length; i++) {
      if (STAGES[i].n === n) return STAGES[i];
    }
    return null;
  }

  function lessonIndex(id) {
    for (var i = 0; i < LESSONS.length; i++) {
      if (LESSONS[i].id === id) return i;
    }
    return -1;
  }

  /* ---------- 阶段徽标 ---------- */

  function stage(badge) {
    var id = doc.body ? doc.body.getAttribute('data-lesson') : null;
    var lesson = findLesson(id);
    if (!lesson) return;
    var st = findStage(lesson.stage);
    var color = st ? st.color : '#4ea8ff';
    doc.documentElement.style.setProperty('--stage', color);
    if (badge) {
      badge.textContent = '阶段 ' + lesson.stage + ' · ' + (st ? st.name : '');
    }
  }

  /* ---------- 课间导航 ---------- */

  function navCard(lesson, root, dir) {
    var node;
    if (lesson) {
      node = make('a', 'nav-link ' + dir);
      node.href = root + lesson.file;
      var kicker = make('span', 'nav-kicker');
      kicker.textContent = (dir === 'prev' ? '上一课' : '下一课') + ' · ' + lesson.id;
      var title = make('span', 'nav-title');
      title.textContent = lesson.title;
      node.appendChild(kicker);
      node.appendChild(title);
    } else {
      node = make('span', 'nav-link ' + dir);
      node.style.visibility = 'hidden';
      node.setAttribute('aria-hidden', 'true');
      var k = make('span', 'nav-kicker');
      k.textContent = dir === 'prev' ? '上一课' : '下一课';
      var t = make('span', 'nav-title');
      t.textContent = '—';
      node.appendChild(k);
      node.appendChild(t);
    }
    return node;
  }

  function nav() {
    var root = (doc.body && doc.body.getAttribute('data-root')) || '../';
    var id = doc.body ? doc.body.getAttribute('data-lesson') : null;
    var idx = lessonIndex(id);

    var top = doc.querySelector('.lesson-nav-top');
    if (top) {
      top.innerHTML = '';
      var back = make('a', 'nav-link');
      back.href = root + 'index.html';
      back.innerHTML = '<span aria-hidden="true">←</span> 返回目录';
      top.appendChild(back);
    }

    var bottom = doc.querySelector('.lesson-nav-bottom');
    if (!bottom || idx < 0) return;
    bottom.innerHTML = '';
    bottom.appendChild(navCard(idx > 0 ? LESSONS[idx - 1] : null, root, 'prev'));
    bottom.appendChild(navCard(idx < LESSONS.length - 1 ? LESSONS[idx + 1] : null, root, 'next'));
  }

  /* ---------- 分步推导 ---------- */

  function steps(host) {
    if (!host || host.getAttribute('data-steps-ready') === '1') return;
    var found = host.querySelectorAll('[data-step]');
    if (!found.length) return;
    host.setAttribute('data-steps-ready', '1');

    var nodes = [];
    each(found, function (n) { nodes.push(n); });

    var current = 0;
    var expanded = String(host.getAttribute('data-start')) === 'all';

    var meter = make('div', 'steps-meter');
    var dots = [];
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].classList.add('step');
      if (!nodes[i].querySelector('.step-num')) {
        var num = make('span', 'step-num');
        num.textContent = String(i + 1);
        nodes[i].insertBefore(num, nodes[i].firstChild);
      }
      var dot = make('span', 'dot');
      meter.appendChild(dot);
      dots.push(dot);
    }

    var bar = make('div', 'steps-bar');
    var nextBtn = makeBtn('下一步', 'primary');
    var allBtn = makeBtn('全部展开');
    var resetBtn = makeBtn('重来', 'ghost');
    bar.appendChild(nextBtn);
    bar.appendChild(allBtn);
    bar.appendChild(resetBtn);

    function render() {
      for (var k = 0; k < nodes.length; k++) {
        var show = expanded || k === current;
        nodes[k].style.display = show ? '' : 'none';
        dots[k].className = (expanded || k === current) ? 'dot active' : 'dot';
      }
      nextBtn.disabled = expanded || current >= nodes.length - 1;
      allBtn.disabled = expanded;
    }

    function next() {
      if (expanded) return;
      if (current < nodes.length - 1) current += 1;
      render();
    }

    on(nextBtn, 'click', next);
    on(allBtn, 'click', function () { expanded = true; render(); });
    on(resetBtn, 'click', function () { expanded = false; current = 0; render(); });

    on(doc, 'keydown', function (e) {
      var tag = e.target && e.target.tagName ? e.target.tagName.toUpperCase() : '';
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || tag === 'BUTTON' || tag === 'A') return;
      if (expanded) return;
      if (e.key === 'ArrowRight' || e.keyCode === 39) {
        if (current < nodes.length - 1) {
          e.preventDefault();
          next();
        }
      }
    });

    host.appendChild(meter);
    host.appendChild(bar);
    render();
  }

  /* ---------- 滑块 ---------- */

  var uid = 0;

  function slider(opts) {
    opts = opts || {};
    var mount = resolve(opts.mount);

    var min = opts.min != null ? Number(opts.min) : 0;
    var max = opts.max != null ? Number(opts.max) : 100;
    var step = opts.step != null ? Number(opts.step) : 1;

    var wrap = make('div', 'slider');
    var head = make('div', 'slider-head');
    var id = 'ph-slider-' + (++uid);

    var lab = make('label', 'slider-label');
    lab.htmlFor = id;
    lab.textContent = opts.label || '数值';

    var val = make('span', 'slider-val');
    head.appendChild(lab);
    head.appendChild(val);
    wrap.appendChild(head);

    var input = make('input');
    input.type = 'range';
    input.id = id;
    input.min = String(min);
    input.max = String(max);
    input.step = String(step);
    wrap.appendChild(input);

    var value = opts.value != null ? Number(opts.value) : min;
    if (isNaN(value) || value < min) value = min;
    if (value > max) value = max;
    input.value = String(value);

    function fmt(v) {
      return opts.fmt ? opts.fmt(v) : String(v);
    }

    function paint() {
      val.textContent = fmt(value) + (opts.unit ? ' ' + opts.unit : '');
    }

    function apply(raw, silent) {
      var v = Number(raw);
      if (isNaN(v)) v = min;
      if (v < min) v = min;
      if (v > max) v = max;
      input.value = String(v);
      value = Number(input.value);
      paint();
      if (!silent && typeof opts.onInput === 'function') opts.onInput(value);
    }

    paint();
    on(input, 'input', function () { apply(input.value, false); });

    var api = {
      el: wrap,
      set: function (v) { apply(v, false); }
    };
    Object.defineProperty(api, 'value', { get: function () { return value; } });

    if (mount) mount.appendChild(wrap);
    return api;
  }

  /* ---------- 动画循环 ---------- */

  var raf = global.requestAnimationFrame || function (cb) {
    return global.setTimeout(function () { cb(Date.now()); }, 16);
  };
  var caf = global.cancelAnimationFrame || function (handle) {
    global.clearTimeout(handle);
  };

  function anim(fn, opts) {
    opts = opts || {};
    var mount = resolve(opts.mount);
    var speed = opts.speed || 1;
    var t = 0;
    var last = 0;
    var handle = null;
    var running = false;

    var reduced = false;
    try {
      reduced = !!(global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches);
    } catch (e) {
      reduced = false;
    }

    var btn = null;
    if (mount) {
      btn = makeBtn('▶ 播放', 'anim-btn');
      mount.appendChild(btn);
    }

    function paintBtn() {
      if (!btn) return;
      btn.textContent = running ? '❚❚ 暂停' : '▶ 播放';
      btn.setAttribute('aria-pressed', running ? 'true' : 'false');
    }

    function tick(ts) {
      if (!running) return;
      var now = ts || Date.now();
      if (!last) last = now;
      var dt = (now - last) / 1000;
      last = now;
      if (dt < 0) dt = 0;
      if (dt > 0.12) dt = 0.12;
      t += dt * speed;
      fn(t, dt);
      handle = raf(tick);
    }

    function start() {
      if (running) return;
      running = true;
      last = 0;
      paintBtn();
      handle = raf(tick);
    }

    function stop() {
      running = false;
      if (handle) caf(handle);
      handle = null;
      paintBtn();
    }

    function toggle() {
      if (running) stop();
      else start();
    }

    var api = {
      start: start,
      stop: stop,
      toggle: toggle,
      frame: function () { fn(t, 0); }
    };
    Object.defineProperty(api, 'isRunning', { get: function () { return running; } });

    if (btn) {
      on(btn, 'click', function () { toggle(); });
      paintBtn();
    }

    if (reduced) {
      fn(0, 0);              /* 减少动态：只画静态首帧，不自动播放 */
    } else if (opts.autoplay !== false) {
      start();
    }

    return api;
  }

  /* ---------- Canvas ---------- */

  function canvas(idOrEl) {
    var c = typeof idOrEl === 'string' ? doc.getElementById(idOrEl) : idOrEl;
    if (!c || typeof c.getContext !== 'function') return null;
    var ctx = c.getContext('2d');
    if (!ctx) return null;

    if (!c.style.display) c.style.display = 'block';
    if (!c.style.width) c.style.width = '100%';
    if (!c.style.height) {
      c.style.height = (c.getAttribute('data-height') || '320') + 'px';
    }

    var w = 0;
    var h = 0;
    var cbs = [];

    function fit() {
      var rect = c.getBoundingClientRect();
      var dpr = global.devicePixelRatio || 1;
      w = Math.max(1, Math.round(rect.width || c.clientWidth || 300));
      h = Math.max(1, Math.round(rect.height || c.clientHeight || 320));
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      for (var i = 0; i < cbs.length; i++) cbs[i](w, h);
    }

    var api = {
      canvas: c,
      ctx: ctx,
      clear: function () { ctx.clearRect(0, 0, w, h); },
      fit: fit,
      onResize: function (cb) {
        if (typeof cb === 'function') {
          cbs.push(cb);
          cb(w, h);
        }
      }
    };
    Object.defineProperty(api, 'w', { get: function () { return w; } });
    Object.defineProperty(api, 'h', { get: function () { return h; } });

    fit();

    if (global.ResizeObserver) {
      var ro = new global.ResizeObserver(function () { fit(); });
      ro.observe(c);
    } else {
      on(global, 'resize', fit);
    }

    return api;
  }

  /* ---------- 自测 ---------- */

  function quiz(mount, questions) {
    mount = resolve(mount);
    if (!mount || !questions || !questions.length) return;

    mount.classList.add('quiz');
    mount.innerHTML = '';

    var total = questions.length;
    var solved = 0;

    var list = make('div', 'quiz-list');
    var score = make('div', 'quiz-score');

    function paintScore() {
      score.innerHTML = '本课自测 <b>' + solved + '/' + total + '</b>';
    }

    for (var qi = 0; qi < questions.length; qi++) {
      (function (item, index) {
        var q = make('div', 'quiz-q');
        var text = make('p', 'quiz-question');
        text.textContent = (index + 1) + '. ' + item.q;
        q.appendChild(text);

        var opts = make('div', 'quiz-options');
        var answered = false;
        var correctIdx = -1;
        var i;

        for (i = 0; i < item.options.length; i++) {
          if (item.options[i] && item.options[i].correct) { correctIdx = i; break; }
        }
        if (item.answer != null) correctIdx = Number(item.answer);
        if (correctIdx < 0) correctIdx = 0;

        var buttons = [];
        for (i = 0; i < item.options.length; i++) {
          (function (opt, idx) {
            opt = opt || {};
            var b = make('button', 'quiz-opt');
            b.type = 'button';

            var mark = make('span', 'opt-mark');
            mark.textContent = String.fromCharCode(65 + idx);

            var body = make('span', 'opt-body');
            var label = make('span', 'opt-text');
            label.textContent = opt.text || '';
            body.appendChild(label);

            var why = make('span', 'opt-why');
            why.textContent = opt.why || '';
            why.style.display = 'none';
            body.appendChild(why);

            b.appendChild(mark);
            b.appendChild(body);
            opts.appendChild(b);
            buttons.push(b);
          })(item.options[i], i);
        }

        function answer(choice) {
          if (answered) return;
          answered = true;
          var chosenOk = choice === correctIdx;

          for (var j = 0; j < buttons.length; j++) {
            buttons[j].disabled = true;
            var whyEl = buttons[j].querySelector('.opt-why');
            var whyText = item.options[j] && item.options[j].why ? item.options[j].why : '';
            if (j === correctIdx) {
              buttons[j].className = 'quiz-opt correct';
              whyEl.style.display = '';
              whyEl.textContent = (chosenOk ? '✓ 解对了：' : '✓ 正解：') + whyText;
            } else if (j === choice) {
              buttons[j].className = 'quiz-opt wrong';
              whyEl.style.display = '';
              whyEl.textContent = '✗ ' + whyText;
            } else {
              buttons[j].className = 'quiz-opt';
            }
          }

          if (chosenOk) {
            solved += 1;
            paintScore();
          }
        }

        for (i = 0; i < buttons.length; i++) {
          (function (btn, idx) {
            on(btn, 'click', function () { answer(idx); });
          })(buttons[i], i);
        }

        q.appendChild(opts);
        list.appendChild(q);
      })(questions[qi], qi);
    }

    mount.appendChild(list);
    mount.appendChild(score);
    paintScore();
  }

  /* ---------- 阅读进度 ---------- */

  var STORE_KEY = 'ph-progress-v1';
  var memory = [];

  function readDone() {
    try {
      var raw = global.localStorage.getItem(STORE_KEY);
      if (!raw) return memory.slice();
      var arr = JSON.parse(raw);
      if (Object.prototype.toString.call(arr) === '[object Array]') return arr;
      return memory.slice();
    } catch (e) {
      return memory.slice();
    }
  }

  function writeDone(arr) {
    memory = arr.slice();
    try {
      global.localStorage.setItem(STORE_KEY, JSON.stringify(arr));
    } catch (e) {
      /* localStorage 不可用时仅保留内存记录 */
    }
  }

  function isDone(id) {
    if (!id) return false;
    return readDone().indexOf(id) >= 0;
  }

  function progress() {
    var arr = readDone();
    var done = 0;
    for (var i = 0; i < LESSONS.length; i++) {
      if (arr.indexOf(LESSONS[i].id) >= 0) done += 1;
    }
    var total = LESSONS.length;
    return {
      done: done,
      total: total,
      pct: total ? Math.round(done / total * 100) : 0
    };
  }

  function markDone(id) {
    if (!id) return;
    var arr = readDone();
    if (arr.indexOf(id) < 0) {
      arr.push(id);
      writeDone(arr);
      if (global.CustomEvent && doc.dispatchEvent) {
        try {
          doc.dispatchEvent(new global.CustomEvent('ph:progress', { detail: progress() }));
        } catch (e) { /* 老浏览器忽略事件 */ }
      }
    }
  }

  function trackRead() {
    var id = doc.body ? doc.body.getAttribute('data-lesson') : null;
    if (!id) return;

    var buttons = doc.querySelectorAll('[data-mark-read]');

    function paint() {
      var done = isDone(id);
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].textContent = done ? '✓ 已读' : '标记已读';
        if (done) buttons[i].classList.add('is-done');
        else buttons[i].classList.remove('is-done');
      }
    }

    function mark() {
      markDone(id);
      paint();
    }

    each(buttons, function (b) { on(b, 'click', mark); });
    paint();

    if (isDone(id)) return;

    var pending = false;
    on(global, 'scroll', function () {
      if (pending) return;
      pending = true;
      global.setTimeout(function () {
        pending = false;
        if (isDone(id)) return;
        var de = doc.documentElement;
        var max = de.scrollHeight - global.innerHeight;
        var y = global.pageYOffset || de.scrollTop || 0;
        if (max > 0 && y / max >= 0.85) mark();
      }, 150);
    });
  }

  /* ---------- 自动化钩子 ---------- */

  function whenReady(fn) {
    if (doc.readyState === 'loading') {
      doc.addEventListener('DOMContentLoaded', fn);
    } else {
      global.setTimeout(fn, 0);
    }
  }

  whenReady(function () {
    /* 放到本轮事件之后，确保页面自己的初始化脚本已经跑完 */
    global.setTimeout(function () {
      doc.documentElement.setAttribute('data-app-ready', '1');
    }, 0);
  });

  /* ---------- 导出 ---------- */

  global.PH = {
    LESSONS: LESSONS,
    STAGES: STAGES,
    stage: stage,
    nav: nav,
    steps: steps,
    slider: slider,
    anim: anim,
    canvas: canvas,
    quiz: quiz,
    markDone: markDone,
    isDone: isDone,
    progress: progress,
    trackRead: trackRead
  };

})(window);
