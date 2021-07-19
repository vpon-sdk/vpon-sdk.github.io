---
layout: android
title: "Android - 插頁廣告"
lead: "適用於 SDK v4.9 及以下版本的插頁廣告串接說明"
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-tw/android/interstitial-under5/
lang: zh-tw
---
# 概要
---
插頁式廣告是互動式多媒體 HTML5 或「網路應用程式」，在應用程式的正常轉換點顯示 (例如啟動、影片播放前或遊戲關卡載入時)。網路應用程式使用上就像在應用程式內瀏覽一樣，只有簡單的關閉按鈕，而沒有任何導覽列，因為導覽配置就包含在內容本身。這類廣告由於內容更豐富、更吸引人，因此製作起來更昂貴，而曝光機會相對有限。

![]({{site.imgurl}}/Interstitial.png)

>**Note:** 此為適用於 `Vpon SDK v4.9.3 及以下版本`的串接方式，如果您串接的 SDK 版本為 v5.0.2 或以上版本，請參考[最新版本的原生廣告串接說明](../interstitial)

# 完成串接準備
---
在開始串接廣告之前，請確認您已經將 Vpon SDK 導入您的專案中。若您尚未完成，請先參考[串接說明]完成相關設定。

# 開始串接插頁廣告
---
<!-- 插頁廣告的內容更加豐富精彩，因為它是需要更多不同實例化、載入和顯示步驟的 Object，而不是 View。 -->
請參考以下說明，完成插頁廣告：

1. 匯入 `com.vpadn.ads.*`
2. 宣告 `VpadnInterstitialAd`
3. 建立 VpadnInterstitialAd 物件，並指定 License Key
4. 拉取廣告
5. 展示廣告
6. 實作 VpadnAdListener

建議您在應用程式的 Activity 內進行上述步驟。

## Import Vpon SDK 並宣告插頁廣告物件
---
```java
import com.vpadn.ads.*;

public class MainActivity extends Activity implements VpadnAdListener {
    // Declare VpadnInterstitialAd instance
  	private VpadnInterstitialAd interstitialAd;

  	// Please fill in with your License Key
  	private String interstitialBannerId = "License Key";
        ...
}
```

## 建立插頁廣告物件，並指定 License Key
---
```java
public class MainActivity extends Activity implements VpadnAdListener {
  ...
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    // Create VpadnInterstitialAd instance
    interstitialAd = new VpadnInterstitialAd(this, interstitialBannerId, "TW");
    interstitialAd.setAdListener(this);
    VpadnAdRequest request = new VpadnAdRequest();
    // Start to load Interstitial Ad
    interstitialAd.loadAd(request);
  }

  @Override
  protected void onDestroy() {
    super.onDestroy();
    if (interstitialAd != null) {
      interstitialAd.destroy();
      interstitialAd = null;
    }
  }
```

不過，目前沒有任何項目可以加入檢視階層，您必須等到這個請求成功後才能嘗試顯示廣告，這點請格外注意。

## 展示廣告
---
為了維持良好的使用者體驗，請避免取得插頁廣告後就立刻將廣告展示出來。我們建議您可以先拉取插頁廣告，在特定時機展示廣告。舉例來說：您可以實作 VpadnAdListener 來監聽廣告請求的事件，在 onVpadnReceiveAd 事件被觸發後，再將廣告顯示出來，請參考以下範例：

```java
public class MainActivity extends Activity implements VpadnAdListener {
  ...

    @Override
    public void onVpadnReceiveAd(VpadnAd ad) {
      if (ad == this.interstitialAd) {
        // Show Interstitial Ad
        interstitialAd.show();
      }
    }
    ...
}
```

插頁廣告展示後，將會佔據整個畫面，直到使用者點擊關閉後，控制權才會交還給應用程式。

## 測試廣告
---
如果你的 License Key 還未通過審核的話，您可以使用下列的方式取得測試廣告：

```java
public class MainActivity extends Activity implements VpadnAdListener {
        ...
        VpadnAdRequest adRequest =  new VpadnAdRequest();

        HashSet<String> testDeviceImeiSet = new HashSet<String>();
        // Add Android device advertising id
        testDeviceImeiSet.add("your device advertising id");
        adRequest.setTestDevices(testDeviceImeiSet);

        interstitialAd.loadAd(request);
        ...
}
```

### Advertising ID
---
您可以使用下列方式取得 device 上的 Advertising ID：

1. 于 log 中搜寻 "advertising_id" (4.8.3 版后，请搜寻 "advertisingId")
2. 直接操作手機：設定 → Google → 廣告 → 您的廣告 ID (Advertising ID)


## 實作 VpadnAdListener
---
```java
public class MainActivity extends Activity implements VpadnAdListener {
        @Override
        public void onVpadnReceiveAd(VpadnAd ad){
                Log.d("Interstitial", "VpadnReceiveAd");
        }

        @Override
        public void onVpadnFailedToReceiveAd(VpadnAd ad, VpadnAdRequest.VpadnErrorCode errCode){
                Log.d("Interstitial", "fail to receive ad (" + errCode + ")");
        }

        @Override
        public void onVpadnPresentScreen(VpadnAd ad){
                Log.d("Interstitial", "VpadnPresentScreen");
        }

        @Override
        public void onVpadnDismissScreen(VpadnAd ad){
                Log.d("Interstitial", "vpadnDismissScreen");
        }

        @Override
        public void onVpadnLeaveApplication(VpadnAd ad){
                Log.d("Interstitial", "VpadnLeaveApplication");
        }
}
```

# Tips
---

* <span style="line-height:2.5em">**我們不建議您在程式開啓時直接拉取插頁廣告並立即顯示**<br></span>
為了避免拖慢程式開啓時的執行速度，我們建議您可以先 loadAd()，但不立即顯示廣告，等待特定事件(e.g. 使用者過關、停留在某個畫面超過特定時間、按下某個 button 或離開 app 之前...)發生再呼叫 show() 顯示廣告。
* <span style="line-height:2em"> **請避免沒有 loadAd() 就要求顯示廣告** <br> </span>
請務必參考[串接說明]，在 AndroidManifest.xml 中加入 VpadnActivity。如果您沒有在 VpadnActivity 中加上 `android:configChanges=“orientation|screenSize”`，請避免在 onCreate 時 loadAd() 並立即顯示插頁廣告。

### Sample Code
如果您想看到完整的串接實例，請參考我們的 [Sample Code]

### 其它廣告形式
如果您想了解其它廣告形式的串接，請參考以下內容：

* [橫幅廣告](../banner)
* [原生廣告](../native)
* [Out-stream 影音廣告](../outstream)
* [中介服務](../mediation)
* [進階設定](../advanced)


[串接說明]: {{site.baseurl}}/zh-tw/android/integration-guide/
[Sample Code]: {{site.baseurl}}/zh-tw/android/download
[進階設定]: {{site.baseurl}}/zh-tw/android/advanced