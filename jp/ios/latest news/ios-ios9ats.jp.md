---
layout:         "ios"
title:          "iOS - iOS 9 ATS"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       jp/ios/latest-news/ios9ats/
lang:            "jp"
---
# iOS9 ATS
---
## Overview
アップルが最近、iOS9 に App Transport Security (ATS)という新しいセキュリティシステ ムを導入したことにより、 iOS9 及びこれ以降のバージョンでは、HTTPS リクエストのみ が有効となりました。最新の Xcode 7 を使用して、iOS9 プロジェクトを作成または移行し ている場合は、“info.plist"の修正を行ってください。

## info.plist
HTTPS に移行しているデベロッパー向けに、 iOS9 デバイスに広告を確実に継続して表示 させたい場合、 HTTP リクエストが継続してセキュリティ無しのコンテンツをロードでき るよう、 短期的な修正方法として例外を追加することをお勧めいたします。

    <key>NSAppTransportSecurity</key>
    <dict>
        <key>NSAllowsArbitraryLoads</key>
        <true/>
    </dict>


## 參考
参考リンク：

- [Transport Security (ATS)]
- [Ads Developer Blog]


[Transport Security (ATS)]: https://developer.apple.com/library/prerelease/ios/technotes/App-Transport-Security-Technote/|App
[Ads Developer Blog]: http://googleadsdeveloper.blogspot.tw/2015/08/handling-app-transport-security-in-ios-9.html|Google
