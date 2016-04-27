---
layout: "ios"
title: "最新消息 - iOS9 ATS"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-tw/ios/latest-news/ios9ats/
lang: "zh-tw"
---
# iOS9 ATS
---

## 概覽
Apple 將在 iOS9 加上新的安全條款—[Transport Security
(ATS)]，要求所有版本 iOS9 以上裝置的 app 只能使用 HTTPS
傳輸。若您現在使用 Xcode 7 並企圖瞄準該客群，請將您的 info.plist
做修改以符合規範。


## info.plist
您可以在 info.plist 中加入例外，允許 HTTPS 外的連結

    <key>NSAppTransportSecurity</key>
    <dict>
        <key>NSAllowsArbitraryLoads</key>
        <true/>
    </dict>


## 參考
相關資料請參考 ：

- [Transport Security (ATS)]
- [Ads Developer Blog]


[Transport Security (ATS)]: <https://developer.apple.com/library/prerelease/ios/technotes/App-Transport-Security-Technote/>|App
[Ads Developer Blog]: <http://googleadsdeveloper.blogspot.tw/2015/08/handling-app-transport-security-in-ios-9.html>|Google
