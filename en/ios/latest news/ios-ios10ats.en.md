---
layout: "ios"
title: "Latest news - iOS10 ATS"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /ios/latest-news/ios10ats/
lang: "en"
---
# iOS10 ATS
---

## Overview
Starting January 2017, Apple is requiring all apps submitted to the App Store to have ATS enabled. To comply with these requirements, the following settings must be used to ensure the Vpon SDK continues to work as expected.
By editting your "info.plist" as the following settings, it will enable ATS in the app on `iOS 10`.

## info.plist
To ensure ads continue to serve on iOS9 devices for developers transitioning to HTTPS, the recommended short term fix is to add an exception that allows HTTP requests to succeed and non-secure content to load successfully.

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
Links for reference ：

- [Transport Security (ATS)]
- [Ads Developer Blog]


[Transport Security (ATS)]: <https://developer.apple.com/library/prerelease/ios/technotes/App-Transport-Security-Technote/>|App
[Ads Developer Blog]: <http://googleadsdeveloper.blogspot.tw/2015/08/handling-app-transport-security-in-ios-9.html>|Google
