---
layout: "ios"
title: "最新消息 - iOS9 ATS"
lead: ""
description: 
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-cn/ios/latest-news/ios9ats/
lang: "zh-cn"
---
# iOS9 ATS
---
## 概览
Apple 将在 iOS9 加上新的安全条款—[Transport Security
(ATS)]，要求所有版本 iOS9 以上装置的 app 只能使用 HTTPS
传输。若您现在使用 Xcode 7 并企图瞄准该客群，请将您的 info.plist
做修改以符合规范。


## info.plist
您可以在 info.plist 中加入例外，允许 HTTPS 外的连结

    <key>NSAppTransportSecurity</key>
    <dict>
        <key>NSAllowsArbitraryLoads</key>
        <true/>
    </dict>


## 参考
相关资料请参考 ：

- [Transport Security (ATS)]
- [Ads Developer Blog]


[Transport Security (ATS)]: https://developer.apple.com/library/prerelease/ios/technotes/App-Transport-Security-Technote/|App
[Ads Developer Blog]: http://googleadsdeveloper.blogspot.tw/2015/08/handling-app-transport-security-in-ios-9.html|Google
