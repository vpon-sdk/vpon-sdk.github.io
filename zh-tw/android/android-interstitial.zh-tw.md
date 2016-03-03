---
layout: android
title: "Android - 插頁廣告"
lead: "Interstitia ad"
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-tw/android/interstitial/
lang: zh-tw
---
## 完成串接指示
---
若您尚未完成串接廣告形式前的串接說明，請先前往[串接說明]完成相關設定

# 總覽
---
插頁式廣告是互動式多媒體 HTML5 或「網路應用程式」，在應用程式的正常轉換點顯示 (例如啟動、影片播放前或遊戲關卡載入時)。網路應用程式使用上就像在應用程式內瀏覽一樣，只有簡單的關閉按鈕，而沒有任何導覽列，因為導覽配置就包含在內容本身。這類廣告由於內容更豐富、更吸引人，因此製作起來更昂貴，而曝光機會卻有限。

![]({{site.imgurl}}/Interstitial.png)

# Vpon 插頁廣告
---
插頁廣告的內容更加豐富精彩，因為它是需要更多不同實例化、載入和顯示步驟的 Object，而不是 View。

不過，它的用法與 Banner 非常類似：

* 匯入 `com.vpadn.ads.*`
* 宣告例項
* 建立例項，並指定 Vpon 發佈商編號 (bannerId)

(不能與橫幅廣告所用發佈商編號重複)

再次提醒您，最好在應用程式的 Activity 內執行上述步驟。

```java
public class MainActivity extends Activity implements VpadnAdListener {
  //TODO: 您向 Vpon 申請的 interstitial banner Id (提醒您: 跟一般的橫幅廣告 banner ID 是不同的)
  private String interstitialBannerId = "xxxxxxxxxxxxxxxx";
  private VpadnInterstitialAd interstitialAd;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    // Create interstitial instance
    interstitialAd = new VpadnInterstitialAd(this, interstitialBannerId, "TW");
    // 加入listener
    interstitialAd.setAdListener(this);
    // 建立廣告請求
    VpadnAdRequest request = new VpadnAdRequest();
    // 開始抓interstitial ad
    interstitialAd.loadAd(request);
  }

  @Override
  protected void onDestroy() {
    super.onDestroy();
    // 千萬記得離開時需要呼叫 destroy
    if (interstitialAd != null) {
      interstitialAd.destroy();
      interstitialAd = null;
    }
  }
```

不過，目前沒有任何項目可加入檢視階層，而且您必須等到這個請求成功後才能嘗試顯示廣告，這點請格外注意。最簡單的做法是執行 AdListener (「InterstitialAd」也是一種廣告)，或是直接使用布林屬性 isReady。

一旦 load Ad 成功，廣告就可以顯示了：

```java
  @Override
  public void onVpadnReceiveAd(VpadnAd ad) {
    if (ad == this.interstitialAd) {
      //show interstitial ad 或可以延後在show
      interstitialAd.show();
    }
  }
```

接著，插頁式廣告會佔據整個畫面，直到使用者點擊關閉；這時控制權才會交還給應用程式。[進階設定]中 Vpadn AdListener 小節列出了多種實用的回呼方式，供您參考。

# Download Sample Code
---
[Go to Download Page]

# 注意事項
---
> 1. <span style="line-height:2.5em">**我們不建議您在程式開啓時直接拉取 interstitial ad 並立即顯示**<br></span>
如此將會拖慢程式開啓時的執行速度。因此我們建議您可以先 load interstitial 但不顯示，等待特定事件(e.g. 使用者過關、停留在某個畫面超過特定時間、按下某個 button 或離開 app 之前...)發生再顯示。
> 2. <span style="line-height:2em"> **請避免沒有 load 就要求顯示廣告** <br> </span>
`android:configChanges=“orientation|screenSize”`若您沒在 activity 裡沒有加上這句，請避免在 onCreate 時做 load interstitial 並立即顯示插頁廣告。



[串接說明]: {{site.baseurl}}/zh-tw/android/integration-guide/
[Go to Download Page]:{{site.baseurl}}/zh-tw/android/download
[進階設定]: {{site.baseurl}}/zh-tw/android/advanced
