/* catbot 共通ヘッダ — 全ページにTOPと同一のマガジンヘッダ（固定バー＋ドロワー）を注入する。
   子ページ（_page_meta_tags 経由で catbot-ui.css/この JS を読む全ページ）で実行される。
   TOP（affiliate_site.html）は既に .header-wrap を持つため二重注入しない。 */
(function () {
  "use strict";
  if (document.querySelector(".header-wrap")) return; // TOPは既存ヘッダを尊重

  // サイトルートへの相対パスを catbot-ui.css の href から導出（ページ深さに追随）。
  var link = document.querySelector('link[href$="assets/catbot-ui.css"]');
  var rel = link ? link.getAttribute("href").replace(/assets\/catbot-ui\.css$/, "") : "";

  // 既存の簡易ヘッダバー（B型: ブランド＋トップリンク）を撤去して重複を防ぐ。
  var candidates = document.querySelectorAll("header.bar, div.bar");
  for (var i = 0; i < candidates.length; i++) {
    var b = candidates[i];
    if (b.tagName === "HEADER" || b.querySelector("a.brand, a.top-link, .bar-inner")) {
      b.parentNode && b.parentNode.removeChild(b);
    }
  }

  var NAV = [
    ["articles/", "猫のお悩み記事"],
    ["needs/", "困りごとから探す"],
    ["seasonal/", "季節のケア"],
    ["quiz/", "うちの子診断"],
    ["consult-first/", "体調の相談先"],
    ["choose/", "猫用品から選ぶ"],
    ["buying-check/", "買う前チェック"],
    ["about/", "運営者情報・広告について"],
    ["privacy/", "プライバシーポリシー"],
    ["contact/", "お問い合わせ"]
  ];
  var links = NAV.map(function (n) {
    return '<a href="' + rel + n[0] + '">' + n[1] + "</a>";
  }).join("");

  var wrap = document.createElement("div");
  wrap.className = "header-wrap";
  wrap.innerHTML =
    '<header class="topbar">' +
    '<a class="brand-mark" href="' + rel + '" aria-label="トップへ"></a>' +
    '<span class="brand-copy"><strong>ふわふわ猫マガジン</strong><small>猫と暮らす、毎日のヒント</small></span>' +
    '<button class="menu-btn" id="menuBtn" type="button" aria-label="メニューを開く" aria-expanded="false" aria-controls="siteDrawer">☰</button>' +
    "</header>" +
    '<nav class="drawer" id="siteDrawer" aria-label="サイトメニュー">' + links + "</nav>";

  document.body.insertBefore(wrap, document.body.firstChild);
  document.body.classList.add("has-shared-header");

  // --- シーンバナー: その場所での「猫の様子」の絵をヘッダ直下に差し込む ---
  // ページはサブパス公開(GitHub Pages)でも動くよう、末尾セグメントだけで判定する。
  var depth = (rel.match(/\.\.\//g) || []).length;
  var segs = location.pathname.split("/").filter(function (s) {
    return s && s !== "index.html";
  }).slice(-depth);
  var SCENE1 = {
    "articles":      ["top1a_05.webp", "リビングでくつろぐ猫"],
    "choose":        ["ai_choose_hero-960.webp", "棚を見上げて選ぶ猫"],
    "needs":         ["ai_scene_needs.webp", "困りごとに首をかしげる猫"],
    "seasonal":      ["ai_scene_seasonal.webp", "窓辺で季節を感じる猫"],
    "buying-check":  ["ai_scene_check.webp", "箱をたしかめる猫"],
    "consult-first": ["ai_scene_consult.webp", "毛布にくるまれて休む猫"],
    "vet-note":      ["ai_scene_consult.webp", "やさしく休む猫"],
    "cat-first":     ["ai_scene_ranking.webp", "小さな表彰台にすわる猫"],
    "fit-reset":     ["ai_scene_rest.webp", "ベッドで満足そうに眠る猫"],
    "aftercare":     ["ai_cat_care_scene-960.webp", "毎日のケアを受ける猫"],
    "routine":       ["ai_cat_care_scene-960.webp", "ブラッシングされる猫"],
    "start":         ["top1a_05.webp", "日だまりでくつろぐ猫"],
    "quiz":          ["top1a_01.webp", "診断を待つ猫", "icon"],
    "first-target":  ["top1a_07.webp", "おもちゃで遊ぶ猫", "icon"],
    "profile":       ["", ""],  // 既に旅路イラストがあるため重複させない
    "policy":        ["ai_brand_mark.webp", "マガジンの看板猫", "icon"],
    "about":         ["ai_brand_mark.webp", "マガジンの看板猫", "icon"],
    "privacy":       ["ai_brand_mark.webp", "マガジンの看板猫", "icon"],
    "contact":       ["ai_brand_mark.webp", "マガジンの看板猫", "icon"],
    "link-transparency": ["ai_brand_mark.webp", "マガジンの看板猫", "icon"]
  };
  // 記事画像は正方形素材のため、頭が切れないアイコン型で出す
  var ARTICLE_ART = {
    "cat-not-drinking-water":  ["top1a_06.webp", "水を飲む猫", "icon"],
    "cat-scratching-furniture":["top1a_04.webp", "爪とぎをする猫", "icon"],
    "cat-home-alone":          ["top1a_02.webp", "カメラのそばの猫", "icon"],
    "cat-shedding-care":       ["top1a_08.webp", "ブラッシングされる猫", "icon"],
    "cat-not-enough-play":     ["top1a_07.webp", "おもちゃで遊ぶ猫", "icon"]
  };
  var scene = null;
  if (depth === 1 && SCENE1[segs[0]]) {
    scene = SCENE1[segs[0]];
  } else if (depth >= 2 && segs[0] === "articles") {
    scene = ARTICLE_ART[segs[1]] || ["top1a_05.webp", "リビングでくつろぐ猫"];
  } else if (depth >= 2 && (segs[0] === "guides" || segs[0] === "products")) {
    scene = ["ai_category_" + segs[1] + ".webp", "その場面の猫の様子", "icon"];
  } else if (depth >= 2 && segs[0] === "matches") {
    scene = ["ai_choose_hero-960.webp", "棚を見上げて選ぶ猫"];
  } else if (depth >= 2 && segs[0] === "quiz") {
    scene = ["top1a_01.webp", "診断を待つ猫", "icon"];
  }
  if (scene && scene[0]) {
    var banner = document.createElement("div");
    banner.className = "scene-banner" + (scene[2] === "icon" ? " icon" : "");
    var img = document.createElement("img");
    img.src = rel + "assets/" + scene[0];
    img.alt = scene[1];
    img.loading = "lazy";
    img.onerror = function () { banner.parentNode && banner.parentNode.removeChild(banner); };
    banner.appendChild(img);
    wrap.parentNode.insertBefore(banner, wrap.nextSibling);
  }

  // 開閉挙動（TOPと同一）
  var btn = wrap.querySelector("#menuBtn");
  var dr = wrap.querySelector("#siteDrawer");
  function close() {
    dr.classList.remove("open");
    btn.classList.remove("open");
    btn.setAttribute("aria-expanded", "false");
  }
  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    var open = dr.classList.toggle("open");
    btn.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  document.addEventListener("click", function (e) {
    if (dr.classList.contains("open") && !dr.contains(e.target) && e.target !== btn) close();
  });
  dr.addEventListener("click", function (e) {
    if (e.target.closest("a")) close();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });
})();
