# Catbot Affiliate Site Upload README

このZIPは公開サイト本体です。静的ホスティングの公開ルートへ、このZIPの中身を置いてください。

## 重要

- 公開するZIP: `dist/catbot-affiliate-site.zip`
- 公開しないZIP: `dist/catbot-affiliate-launch-handoff.zip`
- `launch-handoff` は手順書と作業台入りの受け渡し用です。公開サイト本体としては使いません。

## 公開後に確認するURL

- `/`
- `/shop-data.json`
- `/generated-assets.json`
- `/visuals/`
- `/status.json`
- `/link-opportunities.json`
- `/click-review.json`
- `/clicks/`
- `/link-plan.json`
- `/link-plan/`
- `/link-health.json`
- `/health/`
- `/decision-guide.json`
- `/choose/`
- `/first-target.json`
- `/first-target/`
- `/trends-signal.json`
- `/trends/`
- `/needs-index.json`
- `/needs/`
- `/buying-check.json`
- `/buying-check/`
- `/aftercare-plan.json`
- `/aftercare/`
- `/seasonal-care.json`
- `/seasonal/`
- `/consult-first.json`
- `/consult-first/`
- `/cat-quiz.json`
- `/quiz/`
- `/owner-next.json`
- `/owner-next/`
- `/x-kit.json`
- `/x-kit/`
- `/revenue-plan.json`
- `/revenue/`
- `/share-copy.json`
- `/daily-brief.json`
- `/start/`
- `/daily/`
- `/ops-summary.json`
- `/assets/ai_hero_generated.webp`
- `/assets/ai_social_card.jpg`
- `/products/toys/p2/`
- `/sitemap-routes.json`

## 公開URLを登録したあと

公開URLが決まったら、ローカルで次を実行して canonical / sitemap / OGP を公開URL入りに作り直します。

```powershell
.\affiliate_site_ops.bat profile-url "https://公開URL/" --package --smoke-test
```

もしもURLも同時に用意できた場合は、次の1コマンドで公開URL登録と最初のリンク投入をまとめます。

```powershell
.\affiliate_site_ops.bat finish-launch --% "https://もしもURL" "https://公開URL/"
```

## 公開後の初回監視

公開URLを登録して、作り直したZIPをもう一度アップロードしたら、外から読めるかを確認してログに残します。

```powershell
.\affiliate_site_ops.bat verify-public-url "https://公開URL/"
.\affiliate_site_ops.bat monitor-public-url "https://公開URL/"
```

`monitor-public-url` は `public_url_monitor.jsonl` に履歴を残し、`CATBOT_PUBLIC_MONITOR_REPORT.md` も更新します。
`verify-public-url` は公開先の自動更新メタデータも見て、ローカルの最新エクスポートより古いZIPが公開されたままなら失敗にします。

## 現在の状態

- Generated: 2026-06-26T15:55:08
- Public URL: https://ojisandayo75.github.io/catbot-fuwafuwa-mono-site/
- Ready affiliate links: 0 / 9
- Follower milestone ETA: 2026-07-09
- Next affiliate target: toys/p2 電動猫じゃらし
- Sitemap planned routes: see `sitemap-routes.json`

## 最後の確認

```powershell
.\affiliate_site_ops.bat launch-check
```

`launch-check` がREADYになったら、Xプロフィールのwebsite欄に公開URLを入れます。
