---
layout: "ios"
title: "最新消息 - iOS10 ATS"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-tw/ios/latest-news/ios10ats/
lang: "zh-tw"
---
# iOS10 ATS
---

## 概覽
從 2017 年 1 月開始， Apple 要求所有要提交到 App Store 的應用程式都必須開啟 App Transport Security (ATS)，此設定會要求 iOS9 以上裝置的 app 只能使用 HTTPS 傳輸。
以下的設定可開啟 `iOS 10` 中的 ATS，請將您的 info.plist 做修改以符合規範。

## info.plist
您可以在 info.plist 中加入例外，允許 HTTPS 外的連結

    <key>NSAppTransportSecurity</key>
    <dict>
        <key>NSAllowsArbitraryLoads</key>
        <true/>
        <key>NSAllowsArbitraryLoadsForMedia</key>
        <true/>
        <key>NSAllowsArbitraryLoadsInWebContent</key>
        <true/>
    </dict>


## 參考
相關資料請參考 ：

- [Transport Security (ATS)]
- [Ads Developer Blog]


[Transport Security (ATS)]: <https://developer.apple.com/library/prerelease/ios/technotes/App-Transport-Security-Technote/>|App
[Ads Developer Blog]: <http://googleadsdeveloper.blogspot.tw/2015/08/handling-app-transport-security-in-ios-9.html>|Google
