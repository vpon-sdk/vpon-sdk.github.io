---
layout: "ios"
title: "最新消息 - iOS10 ATS"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-cn/ios/latest-news/ios10ats/
lang: "zh-cn"
---
# iOS10 ATS
---

## 概览
从 2017 年 1 月开始， Apple 要求所有要提交到 App Store 的应用程式都必须开启 App Transport Security (ATS)，此设定会要求 iOS9 以上装置的 app 只能使用 HTTPS 传输。
以下的设定可开启 `iOS 10` 中的 ATS，请将您的 info.plist 做修改以符合规范。

## info.plist
您可以在 info.plist 中加入例外，允许 HTTPS 外的连结

    <key>NSAppTransportSecurity</key>
    <dict>
        <key>NSAllowsArbitraryLoads</key>
        <true/>
        <key>NSAllowsArbitraryLoadsForMedia</key>
        <true/>
        <key>NSAllowsArbitraryLoadsInWebContent</key>
        <true/>
    </dict>


## 参考
相关资料请参考 ：

- [Transport Security (ATS)]
- [Ads Developer Blog]


[Transport Security (ATS)]: <https://developer.apple.com/library/prerelease/ios/technotes/App-Transport-Security-Technote/>|App
[Ads Developer Blog]: <http://googleadsdeveloper.blogspot.tw/2015/08/handling-app-transport-security-in-ios-9.html>|Google
