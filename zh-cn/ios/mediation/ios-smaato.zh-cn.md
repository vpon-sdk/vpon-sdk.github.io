---
layout: "ios"
title: "iOS 中介服務 - Smaato"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-cn/ios/mediation/smaato/
lang: "zh-cn"
---

# 概要
---
在开始进行 Smaato 设定之前，请务必确认您的专案中已包含以下三个档案：

1. Smaato SDK
2. Vpon SDK
3. Vpon Smaato SOMAMediationPlugin

并参考[串接说明]初始化 Vpon iOS SDK。

>**Note:** 您可以[由此下载][9] Vpon SDK 及 Vpon Smaato SOMAMediationPlugin。

# Smaato 设定
---
Smaato 后台设定请参考下列步骤：

## Step1: 新增 App
注册 Smaato 的 Publisher 帐号后，选择 "New App" 来新增 App
![][1]

## Step2: 新增广告
输入 App 信息，并在 "Define Adspaces" 选择要新增的广告类型
![][2]

## Step3: 新增 Vpon AD Network
选择 "Networks" 选项并点击 "New Network"
![][3]

## Step4: Custom SDK Network
选择 "Add Custom SDK Network"，再选择 "Save & Add Line Item"
![][4]
![][5]

## Step5: 填入标题名称
填入辨识用的 Line Item 名称, 方便您管理增加的委刊项
![][6]

## Step6: 填写委刊项内容
填入委刊项的优先级、流量配置及起迄时间，再输入 Custom Plugin 的 Class Name、Method Name、Custom Data, 以向 Vpon 请求广告为例，请参考图示填写
![][7]

## Step7: 设定广告定向
在 Inventory 的分类下，选择加入要与 Vpon AD Network 对应的 App，点击项目旁的 "Add" 即可加入
![][8]

## Step8: 保存 Line Item 设定
最后，点击 "Save" 保存您对此 Line Item 的设定


  [1]: {{site.imgurl}}/Smaato_001.png
  [2]: {{site.imgurl}}/Smaato_010.png
  [3]: {{site.imgurl}}/Smaato_003.png
  [4]: {{site.imgurl}}/Smaato_004.png
  [5]: {{site.imgurl}}/Smaato_005.png
  [6]: {{site.imgurl}}/Smaato_006.png
  [7]: {{site.imgurl}}/Smaato_009.png
  [8]: {{site.imgurl}}/Smaato_013.png
  [串接说明]: ../../integration-guide/#initial-sdk
[9]: {{site.baseurl}}/zh-cn/ios/download