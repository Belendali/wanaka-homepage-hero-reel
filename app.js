/* =========================================================
   Wanaka Homepage demo
   1) hero video auto-switching (the point of this demo)
   2) repeated content generated from the Figma spec
   ========================================================= */

/* ---------- 1 · Hero video auto-switching ---------------- */
(function heroReel(){
  const videos  = [...document.querySelectorAll('.hero-video')];
  const buttons = [...document.querySelectorAll('#hudRow button')];
  const bar = document.createElement('i');
  document.getElementById('hudTrack').appendChild(bar);

  const FADE       = 900;   // crossfade — must match .hero-video transition
  const FIRST_HOLD = 500;   // sit on the incoming clip's first frame this long
  const MIN_PLAY   = 1800;  // floor, in case a clip is very short
  let index = 0, fadeTimer = null, playTimer = null, nextTimer = null;

  function show(next, {user = false} = {}){
    if (next === index && !user) return;
    const from = videos[index];
    const to   = videos[next];

    // the incoming clip enters frozen on frame 0 — that's what fades in
    to.pause();
    to.currentTime = 0;
    to.classList.add('is-active');
    from.classList.remove('is-active');

    clearTimeout(fadeTimer);
    fadeTimer = setTimeout(() => {
      if (from !== videos[index]) { from.pause(); from.currentTime = 0; }
    }, FADE);

    index = next;
    buttons.forEach((b,i) => b.classList.toggle('is-on', i === index));
    schedule(FADE);
  }

  // fadeIn = how long the incoming clip spends fading up (0 on first load)
  function schedule(fadeIn){
    clearTimeout(playTimer);
    clearTimeout(nextTimer);

    const v = videos[index];
    v.pause();
    v.currentTime = 0;

    const run = () => {
      const dur     = isFinite(v.duration) && v.duration > 0 ? v.duration * 1000 : 8000;
      const freeze  = fadeIn + FIRST_HOLD;             // frame 0 held this long
      const playFor = Math.max(MIN_PLAY, dur - FADE);  // clip ends as it fades out
      const total   = freeze + playFor;

      playTimer = setTimeout(() => v.play().catch(()=>{}), freeze);
      nextTimer = setTimeout(() => show((index + 1) % videos.length), total);

      bar.style.transition = 'none';
      bar.style.width = '0%';
      requestAnimationFrame(() => {
        bar.style.transition = `width ${total}ms linear`;
        bar.style.width = '100%';
      });
    };
    if (v.readyState >= 1) run();
    else v.addEventListener('loadedmetadata', run, {once:true});
  }

  videos.forEach(v => { v.loop = false; v.muted = true; v.pause(); v.currentTime = 0; });
  buttons[0].classList.add('is-on');
  schedule(0);

  buttons.forEach((b,i) => b.addEventListener('click', () => show(i, {user:true})));

  // browsers that block autoplay until a gesture
  document.addEventListener('click', () => videos[index].play().catch(()=>{}), {once:true});
})();


/* ---------- 2 · Remix card rows (2 × 7) ------------------ */
(function remix(){
  const card = () => `
    <div class="rcard">
      <div class="rcard__thumb"><img src="assets/img/card-thumb.png" alt="Welcome to Earth 1"></div>
      <div class="rcard__name">Welcome to Earth 1</div>
      <div class="rcard__meta"><img src="assets/img/avatar-xavi.png" alt=""><span>XAVI</span></div>
    </div>`;
  const html = Array.from({length:7}, card).join('');
  remixRow1.innerHTML = html;
  remixRow2.innerHTML = html;
})();


/* ---------- 3 · Feature cards (3 × 3) -------------------- */
(function features(){
  const cards = [
    {t:'Create games from your ideas',  ts:18.8, d:'Turn your imagination into a playable experience. Describe your game idea, and Wanaka builds the foundation for your world.', ds:15.1, img:'feat-1-ideas.png',      iy:185, ih:208},
    {t:'Build worlds in seconds',       ts:19.2, d:'Create beautiful 3D environments from simple descriptions. Generate landscapes, cities, islands, and unique game scenes instantly.', ds:15.1, img:'feat-2-worlds.png',     iy:209, ih:218},
    {t:'Remix endless possibilities',   ts:19.2, d:'Explore a library of game templates and community creations. Start from inspiration and transform it into something new.', ds:15.1, img:'feat-3-remix.png',      iy:185, ih:242},
    {t:'Bring characters to life',      ts:19.2, d:'Create characters and automatically generate animations. Give your heroes movement, personality, and unique behaviors.', ds:15.4, img:'feat-4-characters.png', iy:209, ih:208},
    {t:'Design your game UI',           ts:19.2, d:"Generate menus, HUDs, buttons, and interfaces that match your game's style. Build a complete experience beyond gameplay.", ds:15.5, img:'feat-5-ui.png',        iy:209, ih:218},
    {t:'Create game visuals instantly', ts:19.4, d:"Generate concept art, references, covers, and promotional images to define your game's unique identity.", ds:15.4, img:'feat-6-visuals.png',   iy:185, ih:242},
    {t:'Create while you play',         ts:19.5, d:'Test your game instantly and tell Wanaka what to improve. Adjust gameplay, scenes, and mechanics through conversation.', ds:15.4, img:'feat-7-play.png',      iy:185, ih:242},
    {t:'Your complete game studio',     ts:19.2, d:'Create, edit, test, and publish your games in one place. Everything you need from idea to release.', ds:15.4, img:'feat-8-studio.png',    iy:185, ih:242},
    {t:'Publish your worlds',           ts:19.2, d:'Publish your creation with one link. Friends can jump in and play directly from their browser — no downloads required.', ds:15.1, img:'feat-9-publish.png',   iy:185, ih:242},
  ];
  featureGrid.innerHTML = cards.map((c,i) => {
    const x = (i % 3) * 408, y = Math.floor(i / 3) * 492;
    return `<div class="fcard" style="left:${x}px;top:${y}px">
      <h3 style="font-size:${c.ts}px">${c.t}</h3>
      <p style="font-size:${c.ds}px">${c.d}</p>
      <img src="assets/img/${c.img}" alt="" style="top:${c.iy}px;height:${c.ih}px">
    </div>`;
  }).join('');
})();


/* ---------- 4 · Pricing plans ---------------------------- */
(function pricing(){
  const plans = [
    {mod:'', name:'Free', blurb:'For trying Wanaka and shipping your first game.', price:'$0', per:'forever',
     billed:'No credit card required', credits:['60','credits/ day'], cta:'Current Plan', crown:null, badge:null,
     list:['Chat with agent in Wanaka 1.0 Lite','Generate image × 2','Generate 3D model × 1']},
    {mod:'plan--pro', name:'Pro', blurb:'For creators shipping real games regularly.', price:'$19', per:'/month',
     billed:'Billed monthly', credits:['2,000','credits/ month'], cta:'Upgrade to Pro',
     crown:'assets/svg/icon-crown-pro.svg', badge:{cls:'pill--pro', text:'Most popular'},
     list:['Chat with agent in Wanaka 1.0 Pro','Generate image × 100','Generate 3D model × 40','No watermark on exports','Exclusive feedback channel','More game exposure opportunities']},
    {mod:'plan--max', name:'Max', blurb:'For pros and small teams going commercial.', price:'$49', per:'/month',
     billed:'Billed monthly', credits:['6,000','credits/ month'], cta:'Upgrade to Max',
     crown:'assets/svg/icon-crown-max.svg', badge:{cls:'pill--max', text:'Most Powerful'},
     list:['Chat with agent in Wanaka 1.0 Pro','Generate image × 500','Generate 3D model × 150','No watermark on exports','Exclusive feedback channel','More game exposure opportunities','Opportunities to preview new releases','More personalized features']},
  ];
  document.getElementById('plans').innerHTML = plans.map(p => `
    <div class="plan ${p.mod}">
      ${p.badge ? `<span class="pill ${p.badge.cls} plan__badge">${p.badge.text}</span>` : ''}
      <div class="plan__name">${p.name}</div>
      <div class="plan__blurb">${p.blurb}</div>
      <div class="plan__price"><b>${p.price}</b><span>${p.per}</span></div>
      <div class="plan__billed">${p.billed}</div>
      <div class="plan__credits"><b>${p.credits[0]}</b> <em>${p.credits[1]}</em></div>
      <div class="plan__cta">${p.crown ? `<img src="${p.crown}" alt="">` : ''}${p.cta}</div>
      <div class="plan__list">${p.list.map(l => `<div>${l}</div>`).join('')}</div>
    </div>`).join('');
})();


/* ---------- 5 · FAQ -------------------------------------- */
(function faq(){
  const qs = ['What is Wanaka?','Do I need to know how to code?','What kinds of games can I make?',
              'Where can I play Wanaka games?',"How do I share what I've made?"];
  faqList.innerHTML = qs.map(q => `<div class="faq-item"><span>${q}</span><span>+</span></div>`).join('');
})();


/* ---------- 6 · Fit the 1920px design to the viewport ---- */
(function fit(){
  const page  = document.getElementById('page');
  const stage = document.getElementById('stage');
  const apply = () => {
    const z = document.documentElement.clientWidth / 1920;
    page.style.transform = `scale(${z})`;
    stage.style.height = (7817 * z) + 'px';
  };
  apply();
  window.addEventListener('resize', apply);
})();
