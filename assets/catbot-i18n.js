/* catbot 言語トグル（JP/EN）— 辞書方式。全ページ共通で読み込む。
   各ページに <script defer src="assets/catbot-i18n.js"> を入れるだけで、
   右上にフローティングのEN/日本語ボタンが出て、辞書に載った日本語テキストを英語へ切替える。 */
(function () {
  "use strict";

  // 日本語 → 英語 辞書（手書き翻訳）。テキストノードのtrim一致で置換。
  var DICT = {
    // --- ブランド / 共通 ---
    "ふわふわ猫の道具箱": "Fuwafuwa Cat Toolbox",
    "猫優先で選ぶ猫用品サイト": "Cat-first cat goods guide",
    "🐾 猫好きさんのためのお店": "🐾 A shop for cat lovers",
    "うちの子のための猫グッズ": "Cat goods for your kitty",
    "トップへ戻る": "Back to top",
    "🏠 トップへ戻る": "🏠 Back to top",
    "トップへ": "Top",
    "もっと見る": "See more",
    // --- ヒーロー ---
    "うちの子にぴったりの": "Find the perfect",
    "猫グッズを、いっしょに選ぼう🐾": "cat goods for your kitty, together 🐾",
    "「買う前チェック」で“合う・合わない”を先に確認。失敗しないお買い物を、やさしくお手伝いします。":
      "Use the “Pre-buy Check” to see “fit / not fit” first. We gently help you shop without regrets.",
    "🐱 猫の様子から選ぶ": "🐱 Choose by your cat",
    "✅ 買う前チェック": "✅ Pre-buy Check",
    "🐾 猫ファースト ・ 押し売りしません": "🐾 Cat-first · No hard selling",
    // --- 使い方3ステップ ---
    "はじめての方へ": "New here?",
    "はじめての方へ — 使い方はこれだけ🐾": "New here? — Here’s all you do 🐾",
    "かんたん3ステップ": "3 easy steps",
    "かんたん6問・30秒": "Easy 6 questions · 30 sec",
    "まず猫の様子を選ぶ": "First, pick your cat’s situation",
    "近い場面を1つ選ぶと、必要なカテゴリと判断をまとめます。":
      "Pick the closest scene and we’ll sum up the right categories and tips.",
    "商品は後で見る": "Products come later",
    "先に困りごとを決めて、合いそうなおすすめだけに絞ります。":
      "Decide the concern first, then narrow to fitting picks.",
    "先に困りごとを決めて、合いそうな候補だけに絞ります。":
      "Decide the concern first, then narrow to fitting picks.",
    "体調の不安は相談を優先": "Health worries? Consult first",
    "食欲・トイレ・呼吸がいつもと違う時は、商品より先に獣医さんへ。":
      "If appetite, litter or breathing seem off, see a vet before buying.",
    "① うちの子の様子を選ぶ": "① Pick your cat’s situation",
    "② 合うか・注意点をチェック": "② Check fit & cautions",
    "③ ぴったりの猫グッズへ": "③ To the perfect cat goods",
    // --- カテゴリ ---
    "🖼️ 画像から選ぶ": "🖼️ Choose by picture",
    "いまの様子に近いものへ": "Go to what fits now",
    "遊び": "Play",
    "じゃらし・けりぐるみ": "Teasers & kicker toys",
    "おやつ": "Treats",
    "おやつ・水分補助": "Treats & hydration",
    "爪とぎ": "Scratching",
    "家具を守る消耗品": "Protect your furniture",
    "水ごはん": "Water & food",
    "飲水・食事リズム": "Drinking & meal rhythm",
    "ケア": "Care",
    "ブラシ・抜け毛対策": "Brushing & shedding",
    "見守り": "Monitoring",
    "留守番・ペットカメラ": "Home-alone & pet cameras",
    // --- 診断CTA ---
    "うちの子は何タイプ?": "What type is your cat?",
    "うちの子ネコ気持ち診断": "Your Cat’s Feelings Quiz",
    "6つの質問で性格タイプとおすすめが分かります。":
      "6 questions reveal your cat’s personality type and picks.",
    "6つの質問で、うちの子の性格タイプと“いまの気持ち”が分かります。ぴったりの猫グッズもご提案🐾":
      "6 questions reveal your cat’s personality type and “current mood”, with matching cat-goods picks 🐾",
    "🐾 6問・約1分": "🐾 6 questions · ~1 min",
    "診断をはじめる →": "Start the quiz →",
    "🐾 診断をはじめる": "🐾 Start the quiz",
    // --- もっと見るメニュー ---
    "🐈 猫別ガイド": "🐈 Guides by cat",
    "🍂 季節のケア": "🍂 Seasonal care",
    "💬 体調の相談先": "💬 Where to consult",
    "📋 運営者情報・広告について": "📋 About us & ads",
    "当サイトは広告(アフィリエイト)を含みます。": "This site contains ads (affiliate links).",
    "商品は猫の安全・続けやすさで選んでいます。": "We choose products for cat safety and ease of use.",
    "🐾 目的のページへ": "🐾 Go to a topic page",
    "気になるところから、それぞれのページでじっくり見られます。":
      "Browse each topic in detail from whatever catches your eye.",
    // --- 主要ページ 見出し/ボタン（共通語彙） ---
    "🐱 うちの子から選ぶ": "🐱 Choose by your cat",
    "🐈 猫の様子から選ぶ": "🐈 Choose by your cat’s situation",
    "🎯 目的から選ぶ": "🎯 Choose by goal",
    "🐾 困りごとから探す": "🐾 Find by concern",
    "困りごとから探す": "Find by concern",
    "✅ 買う前チェック": "✅ Pre-buy Check",
    "買う前チェック": "Pre-buy Check",
    "🛍️ 猫用品": "🛍️ Cat goods",
    "猫用品": "Cat goods",
    "🐱 猫優先ランキング": "🐱 Cat-first ranking",
    "猫優先ランキング": "Cat-first ranking",
    "🎬 人気の猫動画": "🎬 Popular cat videos",
    "人気の猫動画": "Popular cat videos",
    "うちの子診断": "Cat quiz",
    "うちの子プロフィール": "Your cat’s profile",
    "相談を優先する時": "When to consult first",
    "使い始めの見直し": "Re-check after starting",
    "今月の猫ケア": "This month’s cat care",
    "選定方針と広告表記": "Selection policy & ad disclosure",
    "運営者情報": "About us",
    "プライバシーポリシー": "Privacy policy",
    "お問い合わせ": "Contact",
    "リンク方針": "Link policy",
    // --- 診断結果 ---
    "うちの子は…": "Your cat is…",
    "🐾 いまの気持ち": "🐾 Current mood",
    "💡 接し方のヒント：": "💡 How to interact:",
    "🛍️ このタイプにおすすめの猫グッズ": "🛍️ Recommended cat goods for this type",
    "✅ 買う前チェックを見る": "✅ See the Pre-buy Check",
    "𝕏 結果をシェア": "𝕏 Share the result",
    "🔄 もう一度診断": "🔄 Take it again",
    "商品を探す": "Find products",
    "詳しく見る": "Details",
    "おすすめ": "Recommended",
    "今日のおすすめ": "Today’s pick",
    "猫ファースト": "Cat-first",
    "このサイトの約束": "Our promise",
    // --- 主要ページ UI ---
    "Catbot 買う前チェック": "Pre-buy Check",
    "うちの子メモを見ながら確認する": "Check with your cat notes",
    "おやつを安全に選びたい": "Choose treats safely",
    "お手入れ": "Grooming",
    "やめるサイン": "Signs to stop",
    "サイト方針": "Site policy",
    "ペットカメラ": "Pet camera",
    "🐱 かんたん6問・30秒": "🐱 Easy 6 questions · 30 sec",
    "家具で爪とぎしやすい": "Tends to scratch furniture",
    "共通": "Common",
    "共通確認": "Common checks",
    "合わないかも": "Might not fit",
    "合わない理由を確認する": "Check why it might not fit",
    "今あるもので代用できないか": "Can you use what you already have?",
    "今月の猫ケアから見る": "See this month’s cat care",
    "困りごと": "Concern",
    "最初の試し方": "How to try it first",
    "次のおすすめ": "Next pick",
    "商品": "Products",
    "商品より先に猫の状態": "Cat first, products later",
    "商品リンク": "Product link",
    "状態": "Situation",
    "伸びたテーマを確認に変える": "Turn trends into checks",
    "新着": "New",
    "新着情報入口": "What’s new",
    "自動給餌器": "Automatic feeder",
    "循環式水飲み器": "Water fountain",
    "CIAO ちゅーる系おやつ": "CIAO Churu-type treats",
    "けりぐるみ": "Kicker plush",
    "自動猫じゃらし": "Automatic teaser",
    "電動猫じゃらし": "Electric cat teaser",
    // --- 性格6タイプ ---
    "🥰 甘えんぼプリンス／プリンセス": "🥰 Cuddly Prince / Princess",
    "😼 クールハンター": "😼 Cool Hunter",
    "😌 のんびり仙人": "😌 Easygoing Sage",
    "🔍 好奇心エクスプローラー": "🔍 Curious Explorer",
    "🫣 びびり慎重さん": "🫣 Cautious Shy One",
    "📣 かまってアイドル": "📣 Attention-loving Idol",
    "「甘えんぼプリンス／プリンセス」タイプ": "“Cuddly Prince / Princess” type",
    "「クールハンター」タイプ": "“Cool Hunter” type",
    "「のんびり仙人」タイプ": "“Easygoing Sage” type",
    "「好奇心エクスプローラー」タイプ": "“Curious Explorer” type",
    "「びびり慎重さん」タイプ": "“Cautious Shy One” type",
    "「かまってアイドル」タイプ": "“Attention-loving Idol” type",
    // --- 診断 質問・回答 ---
    "おうちにお客さんが来たら？": "When a guest comes over?",
    "すぐ寄っていって甘える": "Runs over to cuddle right away",
    "じっと観察してから近づく": "Observes first, then approaches",
    "サッと隠れてしまう": "Quickly hides",
    "おもちゃで遊ぶときは？": "When playing with toys?",
    "本気で追いかけて狩る": "Chases and hunts seriously",
    "ちょっとで飽きちゃう": "Gets bored quickly",
    "かまってほしくて鳴く": "Meows for attention",
    "ひとりでお留守番は？": "Home alone?",
    "さみしくて鳴いちゃう": "Meows from loneliness",
    "わりと平気で寝てる": "Pretty fine, just sleeps",
    "不安そうにそわそわ": "Restless and anxious",
    "新しい場所や物を見つけたら？": "When it finds a new place or thing?",
    "わくわく探検しにいく": "Excitedly goes exploring",
    "慎重ににおいを確認": "Carefully sniffs to check",
    "とりあえず鳴いてアピール": "Meows to get noticed",
    "なでられるのは？": "About being petted?",
    "大好き！ゴロゴロ甘える": "Loves it! Purrs and cuddles",
    "気分しだいかな": "Depends on the mood",
    "ちょっと苦手…": "Not really into it…",
    "一日のすごし方は？": "How does it spend the day?",
    "よく動いて走り回る": "Active, runs around a lot",
    "ほとんど寝てる": "Sleeps most of the time",
    "いつも人の近くにいたい": "Always wants to be near people",
    "6つの質問で、うちの子の性格タイプと“いまの気持ち”が分かります。ぴったりの猫グッズもご提案🐾":
      "6 questions reveal your cat’s personality type and “current mood”, with matching cat-goods picks 🐾",
    "6つの質問に答えると、うちの子の性格タイプと“いまの気持ち”が分かります。ぴったりの猫グッズもご提案します🐾":
      "Answer 6 questions to find your cat’s personality type and “current mood”. We’ll also suggest matching cat-goods 🐾",
    // --- サイトの約束（共通） ---
    "先に猫の状態を選び、商品名より相性と安全確認を見ます。":
      "Pick your cat’s situation first, and check fit and safety before product names.",
    "合わない条件、やめるサイン、最初の試し方を商品リンクより前に出します。":
      "We show non-fit conditions, signs to stop and how to try first — before any product link.",
    "体調変化、食欲低下、飲水量の急変は用品ではなく獣医相談を優先します。":
      "For changes in health, appetite or water intake, consult a vet rather than buying gear.",
    "商品リンクが入っても、猫に合わないものを無理にすすめない設計にします。":
      "Even with product links, we won’t push anything that doesn’t suit your cat.",
    "※ 診断は遊びです。気になる体調変化は商品より先に獣医師へご相談ください。":
      "* The quiz is just for fun. For any health concerns, please see a vet before buying.",
    // --- 結果ページ UI ---
    "🐾 診断する": "🐾 Take the quiz",
    "🐱 自分の猫も診断する": "🐱 Quiz your own cat",
    "𝕏 シェア": "𝕏 Share",
    "商品を見る": "View product",
    "商品リンク準備中": "Product link coming soon",
    "📝 猫のお悩み記事": "📝 Cat-care articles",
    // --- 性格6タイプ：性格 ---
    "とにかく人が大好きで、いつもそばにいたいタイプ。": "Loves people and always wants to be by your side.",
    "狩りの本能が強い、しなやかな実力派。": "A sleek go-getter with strong hunting instincts.",
    "マイペースで穏やか。まったり過ごす長老タイプ。": "Calm and at their own pace — a laid-back elder type.",
    "なんでも気になる、元気いっぱいの冒険家。": "An energetic adventurer curious about everything.",
    "こわがりで慎重。安心がいちばん大事なタイプ。": "Timid and careful — safety matters most to them.",
    "注目されるのが大好き、にぎやかな人気者。": "Loves attention — a lively crowd-pleaser.",
    // --- 性格6タイプ：気持ち ---
    "ずっとそばにいてほしいの…かまってくれたら安心するにゃ🐾": "I want you near me always… I feel safe when you pet me, nya 🐾",
    "ずっとそばにいてほしいの…かまってくれたら安心するにゃ": "I want you near me always… I feel safe when you pet me, nya.",
    "動くものを狩りたくてウズウズ…本気で遊ばせてにゃ！": "I’m itching to hunt moving things… let me really play, nya!",
    "あくせくしたくないにゃ…静かに過ごさせておくれ。": "I don’t want to rush… let me relax quietly, nya.",
    "あれ何！？ここ探検したい！新しいの見せてにゃ！": "What’s that!? I want to explore here! Show me new things, nya!",
    "ちょっとこわい…安心できる隠れ家がほしいにゃ。": "A bit scared… I’d love a safe hideaway, nya.",
    "もっと見て！もっと遊んで！かまってにゃ〜！": "Look at me more! Play more! Pay attention, nya~!",
    // --- 性格6タイプ：接し方 ---
    "短い間隔でこまめに声かけやスキンシップを。お留守番は見守りで安心をつくってあげましょう。":
      "Give frequent little chats and cuddles. For alone-time, a pet camera brings reassurance.",
    "獲物っぽく動くおもちゃで短時間の本気遊びを。爪とぎでエネルギーを発散させてあげて。":
      "Short, intense play with prey-like toys. Let scratching posts burn off energy.",
    "静かな居場所と、快適なごはん・水まわりを整えて。構いすぎず見守るのが◎。":
      "Provide a quiet spot and comfy food/water areas. Watch over without fussing too much.",
    "上下運動や新しい遊びで刺激を。誤飲しやすい小物はしっかり片付けてあげて。":
      "Offer climbing and new play for stimulation. Tidy away small, swallowable items.",
    "隠れ家や高い場所で安心を。大きな音や来客に配慮して、急かさないであげて。":
      "Hideaways and high spots bring comfort. Mind loud noises and guests; don’t rush them.",
    "こまめな遊びとリアクションを。おやつのごほうびでメリハリをつけてあげて。":
      "Frequent play and reactions. Use treat rewards to add rhythm."
  };

  var KEY = "catbot-lang";
  var store = new WeakMap(); // textNode -> original ja string

  function getLang() {
    try { return localStorage.getItem(KEY) || "ja"; } catch (e) { return "ja"; }
  }
  function setLang(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }

  function translateNode(node, toEn) {
    var raw = node.nodeValue;
    if (!raw) return;
    var key = raw.trim();
    if (!key) return;
    if (toEn) {
      var en = DICT[key];
      if (en !== undefined) {
        if (!store.has(node)) store.set(node, raw);
        node.nodeValue = raw.replace(key, en);
      }
    } else {
      if (store.has(node)) {
        node.nodeValue = store.get(node);
      }
    }
  }

  function walk(root, toEn) {
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var n;
    var nodes = [];
    while ((n = w.nextNode())) nodes.push(n);
    nodes.forEach(function (node) {
      var p = node.parentNode;
      if (p && (p.nodeName === "SCRIPT" || p.nodeName === "STYLE")) return;
      translateNode(node, toEn);
    });
  }

  function apply(lang) {
    var toEn = lang === "en";
    document.documentElement.lang = toEn ? "en" : "ja";
    walk(document.body, toEn);
    // title も辞書にあれば
    var t = (document.title || "").trim();
    if (toEn && DICT[t]) { document.title = DICT[t]; }
    var btn = document.getElementById("catbot-lang-btn");
    if (btn) btn.textContent = toEn ? "日本語" : "EN";
  }

  function makeButton() {
    if (document.getElementById("catbot-lang-btn")) return;
    var b = document.createElement("button");
    b.id = "catbot-lang-btn";
    b.type = "button";
    b.setAttribute("aria-label", "Switch language / 言語切替");
    b.textContent = getLang() === "en" ? "日本語" : "EN";
    var base =
      "z-index:9999;min-height:30px;padding:5px 12px;border-radius:999px;" +
      "border:1px solid #e0cdb6;background:#fff8ef;color:#5a3522;" +
      "font:800 12px/1 'Zen Maru Gothic',system-ui,sans-serif;cursor:pointer;white-space:nowrap;";
    b.addEventListener("click", function () {
      var next = getLang() === "en" ? "ja" : "en";
      setLang(next);
      apply(next);
    });

    // ヘッダー内（メニュー/戻るボタンの隣）に置く。重なりを避ける。
    var anchor =
      document.querySelector(".topbar .menu-btn") ||
      document.querySelector(".menu-btn") ||
      document.querySelector(".bar .top-link, .bar-inner .top-link, .top-link");
    if (anchor && anchor.parentNode) {
      // アンカー(メニュー/戻る)の右寄せautoを解除し、ENにautoを移して [EN][☰] を右に並べる。
      try { anchor.style.marginLeft = "0"; } catch (e) {}
      b.style.cssText = base + "margin-left:auto;margin-right:8px;align-self:center;flex:0 0 auto;";
      anchor.parentNode.insertBefore(b, anchor);
    } else {
      // フォールバック：ヘッダーが無いページは左下に固定（上部メニューと干渉しない）。
      b.style.cssText =
        base +
        "position:fixed;left:12px;bottom:14px;box-shadow:0 6px 16px rgba(64,39,24,.18);";
      document.body.appendChild(b);
    }
  }

  function init() {
    makeButton();
    var lang = getLang();
    if (lang === "en") apply("en");
    // 動的に追加される要素にも対応（EN時のみ）
    var obs = new MutationObserver(function (muts) {
      if (getLang() !== "en") return;
      muts.forEach(function (m) {
        m.addedNodes && m.addedNodes.forEach(function (nd) {
          if (nd.nodeType === 3) translateNode(nd, true);
          else if (nd.nodeType === 1) walk(nd, true);
        });
      });
    });
    obs.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
