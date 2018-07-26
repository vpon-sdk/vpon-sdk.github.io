---
layout:         "web"
title:          "Web - 插頁廣告"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-tw/web/interstitial/
lang:           "zh-tw"
---

# 總覽
---
Vpon Mobile Web SDK 提供`插頁廣告`，插頁式廣告是互動式多媒體 HTML5 或「網路應用程式」，在應用程式的正常轉換點顯示 (例如啟動、影片播放前或遊戲關卡載入時)。網路應用程式使用上就像在應用程式內瀏覽一樣，只有簡單的關閉按鈕，而沒有任何導覽列，因為導覽配置就包含在內容本身。<br>

> **Note**:
>此廣告僅支援<strong>`行動裝置`</strong>，使用者透過 PC 瀏覽該網站則廣告不會顯示！
<br>


# 嵌入廣告程式碼
---
在行動網頁的 <body> 中填入 \<vpon\> tag，與橫幅廣告不同點在於當 \<vpon\> tag 中的屬性 `vpon_ad_format` 為 `mi`時，會請求插頁式廣告。<br><br>
在網頁 <body> 內欲顯示廣告的位置加上以下程式碼：

```html
  <body>
...
      <vpon vpon_ad_test="1"
            vpon_ad_licensy_key="Your Interstitial ID"
            vpon_ad_format="mi"
            debug="true"></vpon>
...
      <script type="text/javascript" src="//m.vpon.com/sdk/vpadn-sdk.js"> </script>
...
  </body>
```

> **Note**:
>
>* Vpon Web SDK 支援 `HTTP` & `HTTPS`，在將 SDK 檔案引入時請如範例所示使用 `//m.vpon.com/sdk/vpadn-sdk.js` 讓瀏覽器在載入頁面時可依照當前頁面自動判斷並引用適當資源，每個頁面只需引入一次，必須加在 </body> 前。
>
>* 同一網頁最多嵌入 `1` 個插頁廣告 (如範例所示)，每個版位請使用不同的版位 ID。
>
>* 倘若嵌入在 iframe 內，必須確保該 iframe 是滿版的蓋在網頁上，包含寬高皆為 100 % 等等，以及點擊關閉時需處理將該 iframe 收起等事宜。
>
>* 存檔後，重新讀取網頁，您就可以在有 \<vpon\> tag 的位置看到 `測試廣告` 被拉取。
>
>* 如要將網站正式上線，請將 vpon_ad_test 的參數改為 `"0"` 以拉取正式廣告。

<br>

## Callback {#callback}
---
Vpon Mobile Web SDK 提供沒有廣告回傳時的 Callback Function，讓您能在沒有廣告回傳時，仍可以有效利用流量。

```html
<body>
...
  <vpon vpon_ad_test="0"
        vpon_ad_licensy_key="Your Interstitial ID"
        vpon_ad_format="mi"
        debug="true"
        ad_request_callback="vponCallBackMethod"></vpon>
...
  <script type="text/javascript"  src="//m.vpon.com/sdk/vpadn-sdk.js"> </script>
...
  <script>
        function vponCallBackMethod(adStatus) {
          if (adStatus != 0) {
            // 沒有廣告回傳，執行其它操作
          } else {
            // 有廣告回傳
          }
        }
  </script>
...
</body>
```
<br>

## Advanced Setup
---

名稱                  |        描述                      | 必要  |  範例
:--------------------:|:---------------------------------------:|:----------:|:------------------------:
vpon\_ad\_licensy\_key| 版位 ID                               |  Y           | <font color="red">輸入 Vpon License Key</font>
vpon\_ad\_format      | 插頁廣告格式<br>mi                      |   Y          | "mi"
vpon\_ad\_test        | 是否拉取測試廣告                        | N            | 1(是)/0(否)<br>預設為 "1"
debug                 | 是否在 console 顯示 debug 資訊          |  N           | true/false<br>預設為 "false"
openTab               | 是否開啓新tab 顯示 廣告內容               |N            | true/false<br>預設為 "true"
ad\_request\_callback | 沒有廣告回傳時的 Callback Function       | N           | 請參考 [Callback]

<br>

# 結果
---
<img src="{{site.imgurl}}/Web-Interstitial-1.png" alt="" class="width-300"/>

<br>

# 使用 DFP 中介服務
---
本段專為 DFP 使用者而設，主要說明 DoubleClick 聯播網搭配 Web API 的方式。<br>
DoubleClick for Publishers : <https://www.google.com/dfp/>

## DFP 產生廣告代碼
---
1. 點選 「廣告空間」
2. 點選 「新增廣告單元」
3. 選擇 Out-of-page 為廣告大小
4. 點選 「產生廣告代碼」
5. 選擇 「Google發佈商廣告代碼」
6. 勾選 「啟用單一請求」、「啟用同步要求」、「非頁內廣告」
7. 將產生的「文件標頭」放在網頁的 HEAD 元素中，將「文件內文」放在您要顯示這個廣告單元的網頁內文中。

<img src="{{site.imgurl}}/DFP_IS_01.png" alt="" class="width-600" />
<img src="{{site.imgurl}}/DFP_IS_02.png" alt="" class="width-600" />
<img src="{{site.imgurl}}/DFP_IS_03.png" alt="" class="width-600" />
<img src="{{site.imgurl}}/DFP_IS_04.png" alt="" class="width-600" />

## 設定委刊單、委刊項及廣告素材
---
如要透過「DFP 廣告管理系統標準版」放送新的廣告活動，請先建立新委刊單。建好委刊單後，您還必須建立委刊項、新增廣告素材以及核准委刊單，委刊單廣告才能放送。針對保留的委刊項類型 (贊助和標準)，在委刊單獲得核准以前，DFP 不會保留廣告空間。

### 建立委刊單
若要在執行廣告空間預測之前建立委刊單，請按照下列指示進行：

1. 在「DFP 廣告管理系統標準版」帳戶中，按一下 `委刊單` 標籤。
2. 按一下 `新增委刊單`。
3. 在適當欄位中輸入您的委刊單資訊。不可與聯播網中其他的委刊單名稱重複。
4. 輸入委刊項資訊。
5. 按一下 `檢查廣告空間`，確認委刊單擁有足夠的曝光供應量。
6. 按一下 `儲存`。建好委刊單之後，您必須先予以核准，委刊項才能放送。

### 委刊項資訊
如何建立委刊項：

1. 在 DFP 廣告管理系統標準版帳戶中，按一下 `委刊單` 標籤。
2. 建立新委刊單，或按一下表格中的現有委刊單。
3. 按一下 `新增委刊項`
4. 輸入委刊項名稱，不得與聯播網中其他委刊項的名稱重複。
5. 輸入您想要上傳廣告素材的廣告空間大小。
6. (選用程序) 輸入任何有助於委刊項投放作業的相關註釋。
7. 輸入委刊項類型、日期、數量和費用。
8. (選用程序) 在 `調整放送` 下方進行放送設定。
9. 選取您的目標廣告空間。
10. (選用程序) 輸入其他指定條件，指定特定目標對象。 如果您未將委刊項指定給任何廣告單元或刊登位置，系統會將委刊項設成在全聯播網隨機放送。這表示委刊項可在您網站上的任何廣告單元中放送
11. 按一下 `儲存`

### 上傳廣告素材
1. 按一下要新增廣告素材的委刊項。您也可以視需求建立新委刊項。
2. 按一下 [新增廣告素材]。所有與委刊項相關聯的廣告素材和廣告單元尺寸，都會列在左欄中。您可以將廣告素材上傳至清單中任何大小的廣告單元。
3. 您可以將多個廣告素材拖曳到委刊項，或一次只加入一個廣告素材

#### 只加入一個廣告素材
選取廣告素材類型: 選取`所有`中的`第三方`
<img src="{{site.imgurl}}/DFP_IS_05.png" alt="" class="width-600" />

#### 基本廣告素材設定
程式碼片段請填入:

```html
<vpon vpon_ad_test="1"
       vpon_ad_licensy_key="Your License Key"
       vpon_ad_format="mi"
       debug="true"></vpon>
<script type="text/javascript"  src="//m.vpon.com/sdk/vpadn-sdk.js"> </script>
<script>
//%%CLICK_URL_UNESC%%
//%%VIEW_URL_UNESC%%
</script>
```
> **Note**:
>
>* vpon_ad_test="1" 爲開啓測試廣告， vpon_ad_test="0"爲拉取正式廣告。
>
>* 請記得加入 `//%%CLICK_URL_UNESC%%` 與 `//%%VIEW_URL_UNESC%%`
>
>* 請勿勾選 「放送到 Safeframe」。
>

範例：
<img src="{{site.imgurl}}/DFP_IS_06.png" alt="" class="width-600" />

# FAQ
---

## 仍然看不到廣告？
請確認以下項目：

* 請試著用行動裝置上的瀏覽器開啟網站。
* 先清除瀏覽器快取並刪除 Cookie，然後重新連線到網站。

## 仍然無法解決？
請將 debug 模式打開，重新連線網站，將 "Vpadn-" 開頭的訊息截取下來並且聯繫 [Vpon FAE]

[Callback]: {{site.baseurl}}/zh-tw/web/interstitial/#callback
[Vpon FAE]: mailto:fae@vpon.com
