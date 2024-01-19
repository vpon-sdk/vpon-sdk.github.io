---
layout: android
title: "Android - 插頁廣告"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-tw/android/interstitial/
lang: zh-tw
---
# 概要
---
插頁式廣告是互動式多媒體 HTML5 或「網路應用程式」，在應用程式的正常轉換點顯示 (例如啟動、影片播放前或遊戲關卡載入時)。網路應用程式使用上就像在應用程式內瀏覽一樣，只有簡單的關閉按鈕，而沒有任何導覽列，因為導覽配置就包含在內容本身。這類廣告由於內容更豐富、更吸引人，因此製作起來更昂貴，而曝光機會相對有限。

![]({{site.imgurl}}/Interstitial.png)

# 完成串接準備
---
在開始串接廣告之前，請確認您已經將 Vpon SDK 導入您的專案中。若您尚未完成，請先參考[串接說明]完成相關設定。

# 開始串接插頁廣告
---
請參考以下說明，完成插頁廣告：

1. 匯入 com.vpon.ads.*
2. 宣告 VponInterstitialAd，並指定 License Key
3. 建立 VponAdRequest，並請求廣告
4. 展示廣告
5. 實作 VponInterstitialAdLoadCallback / VponFullScreenContentCallback

建議您在應用程式的 Activity 內進行上述步驟。

## 宣告 VponInterstitialAd，並請求廣告
---
```java
import com.vpon.ads.*;

public class MainActivity extends AppCompatActivity {

    private String interstitialId = "License Key";
    // interstitialId: Vpon License Key to get ad, please replace with your own one

    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


        VponAdRequest.Builder builder = new VponAdRequest.Builder();
        builder.addTestDevice("your device advertising id");
        // Set your test device's GAID here if you're trying to get Vpon test ad
        VponInterstitialAd.loadAd(this, interstitialId, builder.build());
        // Set ad request and load ad
    }
```

>**Note:**
>
>* 在 Activity 的生命週期中，一個 VponInterstitialAd 物件可以重複請求顯示多個插頁廣告，因此只需建立一個實例物件即可
>* 請特別注意，截止目前步驟，尚沒有任何項目可以加入檢視階層，您必須等到請求成功後才可以嘗試展示廣告
>* 如果您想要指定更多投放條件，請參考[進階設定](../advanced)


## 展示廣告
---
為了維持良好的使用者體驗，請避免取得插頁廣告後就立刻將廣告展示出來。我們建議您可以先拉取插頁廣告，在特定時機展示廣告。舉例來說：您可以實作 VponInterstitialAdLoadCallback 來監聽廣告請求的事件，在 onAdLoaded 事件被觸發後，再將廣告顯示出來，請參考以下範例：

```java
public class MainActivity extends AppCompatActivity {

@Override
public void onAdLoaded(VponInterstitialAd ad) {
        // Show Interstitial Ad
        ad.show();
}
```

>**Note:** 您可以在呼叫 show() 之後，再使用 VponInterstitialAd.loadAd() 請求新廣告



## 實作 VponInterstitialAdLoadCallback 與 VponFullScreenContentCallback
---
```java
VponFullScreenContentCallback fullScreenContentCallback = new VponFullScreenContentCallback(){
    @Override
    public void onAdClicked() {
        // Invoked while ad has been clicked
    }
    @Override
    public void onAdDismissedFullScreenContent() {
        // Invoked while ad has been closed
    }
    @Override
    public void onAdFailedToShowFullScreenContent(int errorCode) {
        // Invoked if received ad fail, check this callback to indicates what type of failure occurred
    }
    @Override
    public void onAdImpression() {
        // Invoked while ad has been determined as impression
    }
    @Override
    public void onAdShowedFullScreenContent() {
        // Invoked while ad has been shown
    }
};

VponInterstitialAdLoadCallback adLoadCallback = new VponInterstitialAdLoadCallback(){
    @Override
    public void onAdLoaded(VponInterstitialAd ad) {
        ad.setFullScreenContentCallback(fullScreenContentCallback);
        // Show Interstitial Ad
        ad.show();
    }

    @Override
    public void onAdFailedToLoad(@NonNull VponAdRequest.VponErrorCode adError) {
        // Invoked if received ad fail, check this callback to indicates what type of failure occurred
    }
};
```


# Tips
---

* <span style="line-height:2.5em">**我們不建議您在程式開啓時直接拉取插頁廣告並立即顯示**<br></span>
為了避免拖慢程式開啓時的執行速度，我們建議您可以先請求廣告，但不立即顯示廣告，等待特定事件(e.g. 使用者過關、停留在某個畫面超過特定時間、按下某個 button 或離開 app 之前...)發生再呼叫 show() 顯示廣告。
* <span style="line-height:2em"> **請避免在發出廣告請求前，就要求顯示廣告** <br> </span>
* <span style="line-height:2em"> **請務必參考[串接說明]，在 AndroidManifest.xml 中加入 VponAdActivity**</span>


### 確認廣告曝光是否成功發送
請注意，Vpon SDK 不允許廣告以以下方式呈現，致使廣告在畫面上可能不可見：

* 將 AdView 設為 Invisible
* 將 AdView 的 Alpha 值設為 < 100%
* AdView 被其它 View(s) 遮蓋住

當廣告露出在頁面上並達到曝光標準後，會印出以下的 Log 代表有送出廣告曝光：

```
I/VPON: [::Impression::]  response.code : 200
```


### Sample Code
如果您想看到完整的串接實例，請參考我們的 [Sample Code]



[串接說明]: {{site.baseurl}}/zh-tw/android/integration-guide/
[Sample Code]: {{site.baseurl}}/zh-tw/android/download
[進階設定]: {{site.baseurl}}/zh-tw/android/advanced