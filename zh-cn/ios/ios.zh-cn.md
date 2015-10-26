---
layout: "ios"
title: "iOS - 串接说明"
lead: "快速上手 - 串接SDK与显示广告"
description: 
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-cn/ios/
lang: "zh-cn"
---
# 快速上手 - 串接 SDK 与显示广告
## Step1: 下载SDK
---
请先[下载最新SDK][1]，若尚未加入Vpon开发商，请参照此[说明][2]成为开发商伙伴 <br><br>

## Step2: 串接SDK
---
请遵循[串接说明][3]完成各种SDK串接，包括最低需求、权限以及其他设定<br><br>

## Step3: 串接广告
---
| [横幅广告][4]  |[插页广告][5] |[中介服务][6]|
| :------------:|:-----------:| :--------: |
<br><br>

## 诀窍
---
所有 iOS 相关资讯都在左排列表中，右排为文章的目录，若想跳转其他装置平台或语言，请点选网站右上角的目标语言与平台。若您有任何技术问题，请不吝联络 [FAE 团队](mailto:fae@vpon.com)
<br><br>

> **Note**:

> 1. 串接完毕后，请自行检查是否有印出VponLog:didImpression，以确认有成功回传资讯到Vpon Server
> 2. iOS9 多了安全条款 App Transport Security (ATS)，若您使用 Xcode 7 建立 iOS9 专案，请参考[这篇]来修改部份设定



[1]:{{ site.baseurl }}/zh-cn/ios/download/
[2]:{{ site.baseurl }}/zh-cn/ios/registration/
[3]:{{ site.baseurl }}/zh-cn/ios/integration-guide/
[4]:{{ site.baseurl }}/zh-cn/ios/banner/
[5]:{{ site.baseurl }}/zh-cn/ios/interstitial/
[6]:{{ site.baseurl }}/zh-cn/ios/mediation/
[这篇]: ../latest-news/ios9ats/
