---
layout: "ios"
title: "iOS -  开始使用"
lead: "快速上手 - 串接 SDK 与显示广告"
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-cn/ios/
lang: "zh-cn"
---
# 快速上手 - 串接 SDK 与显示广告

## Step1: 检查系统需求
---
Vpon SDK 目前最低支援以下版本的作业系统，在开始串接 Vpon SDK 前，请确保您的 App 符合以下条件：

* iOS：`iOS 8.0 以上 & Xcode 9.0 以上`

## Step2: 成为 Vpon 开发商伙伴
---
请先[注册帐号][2]成为 Vpon 开发商伙伴，您将会透过开发商帐号管理您在串接广告时所使用的 License Key 及广告收益

## Step3: 串接 SDK
---
请遵循[串接说明][3]完成各种 SDK 串接，包含权限以及其他设定

## Step4: 串接广告
---

| [横幅广告][4]  |[插页广告][5] |[原生广告][7]| [中介服务][6]|


## Tips
---
所有 iOS 相关资讯都在左排列表中，右排为文章的目录，若想跳转其他装置平台或语言，请点选网站右上角的目标语言与平台。若您有任何技术问题，请不吝联络 [FAE 团队](mailto:fae@vpon.com)

> **Note**：
>
> 1. 串接完毕后，请自行检查是否有印出VponLog:didImpression，以确认有成功回传资讯到Vpon Server
>
> 2. iOS10 更新了安全条款 App Transport Security (ATS)，请参考 [iOS9 ATS] 来修改部份设定



[1]:{{ site.baseurl }}/zh-cn/ios/download/
[2]:{{ site.baseurl }}/zh-cn/ios/registration/
[3]:{{ site.baseurl }}/zh-cn/ios/integration-guide/
[4]:{{ site.baseurl }}/zh-cn/ios/banner/
[5]:{{ site.baseurl }}/zh-cn/ios/interstitial/
[6]:{{ site.baseurl }}/zh-cn/ios/mediation/
[iOS9 ATS]: {{site.baseurl}}/zh-cn/ios/latest-news/ios9ats/
[7]:{{ site.baseurl }}/zh-cn/ios/native/
