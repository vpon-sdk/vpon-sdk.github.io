---
layout: "ios"
title: "iOS 中介服務 - Smaato"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-tw/ios/mediation/smaato/
lang: "zh-tw"
---

# 概要
---
在開始進行 MoPub 設定之前，請務必確認您的專案中已包含以下三個檔案：

1. Smaato SDK
2. Vpon SDK
3. Vpon Smaato SOMAMediationPlugin

並參考[串接說明]初始化 Vpon iOS SDK。

>**Note:** 您可以[由此下載][9] Vpon SDK 及 Vpon Smaato SOMAMediationPlugin。

# Smaato 設定
---
Smaato 後台設定請參考下列步驟：

## Step1: 新增 App
註冊 Smaato 的 Publisher 帳號後，選擇 "New App" 來新增 App
![][1]

## Step2: 新增廣告
輸入 App 訊息，並在 "Define Adspaces" 選擇要新增的廣告類型
![][2]

## Step3: 新增 Vpon AD Network
選擇 "Networks" 選項並點擊 "New Network"
![][3]

## Step4: Custom SDK Network
選擇 "Add Custom SDK Network"，再選擇 "Save & Add Line Item"
![][4]
![][5]

## Step5: 填入標題名稱
填入辨識用的 Line Item 名稱，方便您管理增加的委刊項
![][6]

## Step6: 填寫委刊項內容
填入委刊項的優先級、流量配置及起迄時間，再輸入 Custom Plugin 的 Class Name、Method Name、Custom Data，以向 Vpon 請求廣告為例，請參考圖示填寫
![][7]

## Step7: 設定廣告定向
在 Inventory 的分類下，選擇加入要與 Vpon AD Network 對應的 App，點擊項目旁的 "Add" 即可加入
![][8]

## Step8: 保存 Line Item 設定
最後，點擊 "Save" 保存您對此 Line Item 的設定


  [1]: {{site.imgurl}}/Smaato_001.png
  [2]: {{site.imgurl}}/Smaato_002.png
  [3]: {{site.imgurl}}/Smaato_003.png
  [4]: {{site.imgurl}}/Smaato_004.png
  [5]: {{site.imgurl}}/Smaato_005.png
  [6]: {{site.imgurl}}/Smaato_006.png
  [7]: {{site.imgurl}}/Smaato_007.png
  [8]: {{site.imgurl}}/Smaato_008.png

[串接說明]: ../../integration-guide/#initial-sdk
[9]: {{site.baseurl}}/zh-tw/ios/download