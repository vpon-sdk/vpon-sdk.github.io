---
layout:         "ios"
title:          "iOS 中介服務 - AdMob"
lead:           ""
description:
keywords:       'Keywords for this page, in the meta data'
permalink:      /zh-tw/ios/mediation/admob/
lang:           "zh-tw"
---
# 概要
---
在開始進行 AdMob 設定之前，請務必確認您的專案中已包含以下三個檔案：

1. Google Mobile Ads SDK
2. Vpon SDK
3. Vpon AdMob Adapter

並參考[串接說明]初始化 Vpon iOS SDK。

>**Note:** 您可以[由此下載][2] Vpon SDK 及 Vpon AdMob Adapter。



# 廣告單元設定
---

## 新增應用程式
首先，請登入您的 [AdMob][1] 後台，根據應用程式平台來新增應用程式，並取得應用程式 ID

<img src="{{site.imgurl}}/AdMob_001.png" alt="" class=""/>

## 新增廣告單元
新增應用程式後，請選擇要新增的廣告單元格式，並取得廣告單元 ID
<img src="{{site.imgurl}}/AdMob_002.png" alt="" class=""/>

請將應用程式 ID 及廣告單元 ID 加到您的應用程式專案中，以取得廣告

# 中介服務設定
---

## 中介服務群組
切換到中介服務標籤，選擇建立中介服務群組
<img src="{{site.imgurl}}/AdMob_003.png" alt="" class=""/>

根據您的應用程式平台及廣告格式建立中介服務群組
<img src="{{site.imgurl}}/AdMob_004.png" alt="" class=""/>

選擇要加入廣告單元
<img src="{{site.imgurl}}/AdMob_005.png" alt="" class=""/>
<img src="{{site.imgurl}}/AdMob_006.png" alt="" class=""/>

## 廣告聯播網設定
如果您要串接的是橫幅廣告或插頁廣告，請選擇新增廣告聯播網將 Vpon 新增為您的廣告聯播網
<img src="{{site.imgurl}}/AdMob_007.png" alt="" class=""/>

選擇 Vpon
<img src="{{site.imgurl}}/AdMob_008.png" alt="" class=""/>

請在 Vpon Ad ID 的欄位中，填入您申請的 Vpon License Key，並在 Zone 的欄位中，填入 "TW"
<img src="{{site.imgurl}}/AdMob_009.png" alt="" class=""/>


## 自訂事件設定 {#customevent}
如果您要串接的是原生廣告，請選擇新增自訂事件將 Vpon 新增為您的廣告聯播網
<img src="{{site.imgurl}}/AdMob_010.png" alt="" class=""/>

請在 Class Name 的欄位中，填入 CustomEvent 的 Class Name，iOS 為 `GADVpadnNativeAdCustomEvent`，並在 Parameter 中填入您申請的 Vpon License Key
<img src="{{site.imgurl}}/AdMob_011.png" alt="" class=""/>


# Tips
---

### Sample Code
如果您想看到完整的串接實例，請參考我們的 [Sample Code]


[串接說明]:http://wiki.vpon.com/zh-tw/ios/integration-guide/#initial-sdk
[1]:https://apps.admob.com
[Sample Code]: {{site.baseurl}}/zh-tw/ios/download
[2]: {{site.baseurl}}/zh-tw/ios/download
