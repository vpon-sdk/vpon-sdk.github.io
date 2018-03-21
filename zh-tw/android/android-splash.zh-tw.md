---
layout:         "android"
title:          "Android - 開屏廣告 "
lead:           "Android - Splash"
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-tw/android/splash/
lang:           "zh-tw"
---
## 完成串接指示
---
若您尚未完成串接廣告形式前的串接說明，請先前往[串接說明]完成相關設定

# 概要
--------
在原先等待應用程式開啟的時間，以開屏廣告來作為完美的轉場效果，除了以自然且立即的方式呈現適合的廣告內容以提升使用者體驗，也可在此處結合應用程式商標，讓使用者產生印象並留下深刻記憶。

<img class="width-400" src="{{site.imgurl}}/Splash_Android.png" alt="successful result example">

在應用程式中建立原生廣告需要執行以下六個步驟：


1. 匯入 Vpon SDK
2. 於應用程式建立 Activity 命名為 SplashActivity ，並於 manifest 設定為 LAUNCHER 頁面並且為 PORTRAIT
3. 於 SplashActivity 實作 VpadnAdSplashListener 監聽器並覆寫所有監聽器
4. 使用 RelativeLayout 設計 Splash View layout
5. 建立 VpadnSplashAd 物件並設監聽器，呼叫 loadAd method
6. 應用程式重啟即可顯示開屏

# 開始撰寫 Splash Ad
--------
首先匯入 SDK 。如果是使用橫幅、插頁、原生廣告的應用程式，Mainfest 的相關設定請參考[串接說明]。如欲加入開屏廣告請在 Mainfest 參考以下設定

```java
import com.vpadn.ads.*
```


```xml
<activity
  android:name=".SplashActivity"
  android:screenOrientation="portrait"
  android:theme="@style/SplashAppTheme">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
</activity>
```

## 建立 VpadnSplash 物件並請求廣告
--------
在 SplashActivity 實作中初始化 VpadnSplashAd 物件，完成指定 splashID( PlacementID ) 及 splashView 後，並設置監聽器即可請求廣告。

```java
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_splash);
    RelativeLayout adsParent = (RelativeLayout) findViewById(R.id.splashContainer);
    vpadnSplashAd = new VpadnSplashAd(this, "Key in splashID", adsParent);
    vpadnSplashAd.setAdListener(this);

    /** Request Test Ad Start **/
    VpadnAdRequest adRequest =  new VpadnAdRequest();
    HashSet<String> testDeviceImeiSet = new HashSet<String>();
    testDeviceImeiSet.add("Key in your device's GAID");
    adRequest.setTestDevices(testDeviceImeiSet);
    /** Request Test Ad End
    Skip the above 4 line codes if you want to request an actual ad. Just use vpadnSplashAd.loadAd() **/

    vpadnSplashAd.loadAd(adRequest);
}
```

## 開屏廣告 Callback
--------
完成請求開屏廣告後，下述五個函數可回傳目前廣告的各式狀態，包含：

1. 請求成功並顯示
2. 請求失敗
3. 廣告被點擊
4. 即將離開應用程式
5. 廣告允許被關閉

當廣告`請求成功並顯示`會透過 `onVpadnSplashReceived` 通知；請求失敗會透過 `onVpadnFailedToReceiveAd` 通知。
廣告會自動加載在指定的 splashView 上，應用程式無需做額外的處理。此外每則廣告皆獨立的顯示時間，當顯示時間到達標準會透過 `onVpadnSplashAllowToDismiss` 通知允許關閉廣告。

```java
@Override
public void onVpadnReceiveAd(VpadnAd ad) {
    Log.d(LT, "Call onVpadnReceiveAd");
}

@Override
public void onVpadnFailedToReceiveAd(VpadnAd ad, VpadnAdRequest.VpadnErrorCode errorCode) {
    Log.d(LT, "Call onVpadnFailedToReceiveAd");
    startActivity(new Intent(this, MainActivity.class));
    finish();
}

@Override
public void onVpadnClickAd(VpadnAd ad) {
    Log.e(LT, "Call onVpadnClickAd");
}

@Override
public void onVpadnLeaveApplication(VpadnAd ad) {
    Log.e(LT, "Call onVpadnLeaveApplication");
}

// Note: Will only be notified once !!
@Override
public void onVpadnAllowToDismissAd(VpadnAd ad) {
    Log.d(LT, "Call onVpadnAllowToDismissAd");
    startActivity(new Intent(this, MainActivity.class));
    finish();
}
```

# 解構 VpadnSplashAd 物件
--------
關閉開屏廣告時，需於系統 OnDestroy 順帶呼叫 `vpadnSplashAd.onDestroy()`。

# 下載範例
--------
[前往下載][1]


[串接說明]: {{site.baseurl}}/zh-tw/android/integration-guide/
[說明]: {{ site.baseurl }}/zh-tw/android/registration/
[1]: {{ site.baseurl }}/zh-tw/android/download/
[請參閱]: {{ site.baseurl }}/zh-tw/android/mediation/mopub/
