---
layout: "ios"
title: "iOS - 開始使用"
lead: "快速上手 - 串接 SDK 與顯示廣告"
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-tw/ios/
lang: "zh-tw"
---
# 快速上手 - 串接 SDK 與顯示廣告


## Step1: 檢查系統需求
---
Vpon SDK 目前最低支援以下版本的作業系統，在開始串接 Vpon SDK 前，請確保您的 App 符合以下條件：

* iOS：`iOS 8.0 以上 & Xcode 9.0 以上`

## Step2: 成為 Vpon 開發商夥伴
---
請先[註冊帳號][2]成為 Vpon 開發商夥伴，您將會透過開發商帳號管理您在串接廣告時所使用的 License Key 及廣告收益

## Step3: 串接 SDK
---
請遵循[串接說明][3]完成各種 SDK 串接，包括權限以及其他設定

## Step4: 串接廣告
---

| [橫幅廣告][4] |[插頁廣告][5] |[原生廣告][7]| [Out-stream 影音廣告][8]| [中介服務][6]|


## Tips
---
所有 iOS 相關資訊都在左排列表中，右排為文章的目錄，若想跳轉其他裝置平台或語言，請點選網站右上角的目標語言與平台。若您有任何技術問題，請不吝聯絡 [FAE 團隊](mailto:fae@vpon.com)

> **Note**：
>
> 1. 串接完畢後，請自行檢查是否有印出VponLog:didImpression，以確認有成功回傳資訊到Vpon Server
>
> 2. iOS9 更新了安全條款 App Transport Security (ATS)，請參考 [iOS9 ATS] 來修改部份設定



[1]:{{ site.baseurl }}/zh-tw/ios/download/
[2]:{{ site.baseurl }}/zh-tw/ios/registration/
[3]:{{ site.baseurl }}/zh-tw/ios/integration-guide/
[4]:{{ site.baseurl }}/zh-tw/ios/banner/
[5]:{{ site.baseurl }}/zh-tw/ios/interstitial/
[6]:{{ site.baseurl }}/zh-tw/ios/mediation/
[iOS9 ATS]: {{site.baseurl}}/zh-tw/ios/latest-news/ios9ats/
[7]:{{ site.baseurl }}/zh-tw/ios/native/
[8]:{{ site.baseurl }}/zh-tw/ios/outstream/