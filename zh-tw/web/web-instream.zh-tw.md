---
layout:         "web"
title:          "Web - In-stream 影音廣告"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-tw/web/instream/
lang:           "zh-tw"
---
# 概要
---
Vpon 提供 In-stream 影音廣告，只要您的 App 中有支援 VAST / VPAID 格式的影音播放器，即可透過 Vpon In-stream 影音廣告進行流量變現。

# 完成串接準備 {#prerequisites}
---
在開始串接 Vpon In-stream 影音廣告前，需要進行以下準備：

1. 聯繫 [Vpon BD] 完成帳號設定，並取得您的 License Key
2. 準備一個支援 VAST / VPAID 格式的影音播放器 <br>
   (我們建議您可以使用 [Google IMA SDK] 來建立您的影音播放器)
3. 聯繫 [Vpon BD]，取得廣告請求 URL

# 開始串接
---
串接 Vpon In-stream 影音廣告不需要再額外使用其它的 Vpon SDK。如果您選擇使用 [Google IMA SDK] 來建立您的影音播放器，我們建議您使用 Google Ad Manager 來管理您的廣告請求。

以下說明將會引導您完成在 Google Ad Manager 上的 In-stream 影音廣告設定。在您[完成串接準備]後，需要在您的 Google Ad Manager 完成以下設定：

1. 新增影音廣告單元
2. 新增影音廣告委刊項
3. 新增影音廣告素材

> **Note**：此外，您也可以使用 `S2S` 的方式直接向 Vpon 請求 In-stream 影音廣告。關於 S2S 的串接方式，請參考 [Advanced Setting]。

## 新增影音廣告單元
---
首先，您需要在您的 Google Ad Manager 後台新增影音廣告單元。

請由 [廣告空間]→[廣告單元] 並選擇新增廣告單元。請先輸入不重覆的廣告單元名稱，點擊下圖紅框處的`影片(VAST) 大小`，展開影音廣告單元的選項，依照您需要的廣告單元大小選擇尺吋。
<img src="{{site.imgurl}}/instream_01.png" alt="" class="width-600"/>
建立廣告單元後，需要生成一組用來請求廣告的廣告代碼。點擊`產生廣告代碼`
<img src="{{site.imgurl}}/instream_02.png" alt="" class="width-600"/>
選擇`影片廣告的 Google 發佈商廣告代碼`
<img src="{{site.imgurl}}/instream_03.png" alt="" class="width-600"/>
選取代碼選項。如果您的影片是直播形式的話，請勾選「啟用即時流量控制」
<img src="{{site.imgurl}}/instream_04.png" alt="" class="width-600"/>
完成廣告代碼參數的編輯。內容描述網址為必填項目，請輸入您放置影音播放器的頁面網址
<img src="{{site.imgurl}}/instream_05.png" alt="" class="width-600"/>
選擇「繼續」，即會產生廣告代碼。請將廣告代碼加入您的 App Project 中，您將使用這組廣告代碼來請求 In-stream 影音廣告
<img src="{{site.imgurl}}/instream_06.png" alt="" class="width-600"/>

## 新增影音廣告委刊項
---
取得廣告代碼後，您需要新增廣告委刊項，並將影音廣告單元加入委刊項中。

請由 [廣告放送]→[訂單] 建立訂單，輸入訂單名稱、廣告客戶
<img src="{{site.imgurl}}/instream_07.png" alt="" class="width-600"/>
接著進行委刊項的設定，輸入委刊項名稱，廣告空間大小請選擇`影片 VAST`，並依廣告單元大小選擇廣告空間大小
<img src="{{site.imgurl}}/instream_08.png" alt="" class="width-600"/>
您需要針對委刊項進行廣告活動起始時間的設定，請依您的需求完成設定。此外，您也可以選擇性的調整您需要的廣告放送方式
<img src="{{site.imgurl}}/instream_09.png" alt="" class="width-600"/>
最後您需要指定廣告目標，系統會依照您在前面設定過的廣告空間大小篩選出符合要求的廣告單元，請選擇您要放送廣告的廣告單元
<img src="{{site.imgurl}}/instream_10.png" alt="" class="width-600"/>
完成後，請儲存您的設定。建立訂單及委刊項後，您需要`核准`訂單並在委刊項中加入廣告素材，廣告才會開始放送
<img src="{{site.imgurl}}/instream_11.png" alt="" class="width-600"/>

## 新增影音廣告素材
---
完成委刊項設定後，您需要在委刊項中加入廣告素材。請由您的影音廣告委刊項點擊新增廣告素材集，您可以選擇新增新的廣告素材集，或是使用現有廣告素材集
<img src="{{site.imgurl}}/instream_12.png" alt="" class="width-600"/>
選擇新的廣告素材集，輸入廣告素材集名稱後，選擇廣告素材集類型為`轉向`
<img src="{{site.imgurl}}/instream_13.png" alt="" class="width-600"/>
請在 VAST 廣告代碼網址的欄位填入 Vpon 提供您的廣告請求網址，並輸入您希望取得的廣告素材長度，例：30、60。當包含 Vpon 廣告素材集的委刊項被選中後，將會向這個網址請求符合條件的廣告。
<img src="{{site.imgurl}}/instream_14.png" alt="" class="width-600"/>
完成以上設定後，儲存您的設定即可。

# Advanced Setting {#s2s}
---
除了透過 Google Ad Manager 的方式來串接 In-stream 影音廣告外，Vpon 也提供以 S2S 方式來串接。只要[完成串接準備]，並參考 [Vpon In-stream Video Ad Guideline] 的參數說明完成您的廣告請求網址，便可以直接向 Vpon 請求 In-stream 影音廣告了。



[Vpon BD]: mailto:bd@vpon.com
[Google IMA SDK]: https://developers.google.com/interactive-media-ads/docs/sdks/html5/
[完成串接準備]: {{site.baseurl}}/zh-tw/web/instream/#prerequisites
[Advanced Setting]: {{site.baseurl}}/zh-tw/web/instream/#s2s
[Vpon In-stream Video Ad Guideline]: {{site.dnldurl}}/Vpon_In_stream_Video_Ad_Guideline.pdf