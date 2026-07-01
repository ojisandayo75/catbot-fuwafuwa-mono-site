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
