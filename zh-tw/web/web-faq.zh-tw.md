---
layout:         "web"
title:          "常見問題"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-tw/web/faq/
lang:           "zh-tw"
---

# Genera
---

### 廣告沒有成功展示時的狀況判斷
---

當您的應用程式或網站向 Vpon 發出廣告請求而沒有廣告展示時，您可以從回應的 Log 中初步判斷廣告沒有回傳的原因。

您可以在您的 IDE 或是瀏覽器的開發者工具中，看到類似以下的 Log：<br>
(以瀏覽器開發者工具為例)

```
Vpadn-Status-Code -> -2
Vpadn-Status-Desc -> banner position with ad format not consistent
Vpadn-Status -> INVALID_REQUEST
```

請參考以下訊息排除基本問題：

* SERVER_ERROR：廣告請求失敗，表示 Vpon Ad Server 無法回應您的廣告請求，請盡速與 [Vpon FAE] 聯繫
* NO_FILL：廣告請求成功，但由於當下的廣告檔期安排，暫無廣告回傳，建議可以稍候再進行測試，或是使用測試廣告以確保每次廣告請求都有廣告回傳
* INVALID_REQUEST：廣告請求失敗，表示廣告請求中傳入的參數有誤，請檢查是否使用了對應正確平台、版位的 Vpon License Key 來進行廣告請求

如果您仍無法確認沒有廣告展示的原因，請將以上的 Log 提供給 [Vpon FAE]，我們會協助您確認沒有廣告顯示的原因。


# Android
---

### 導入 Vpon SDK 時發現需要提供多種 Privacy Permission，請問是否所有的 Permission 都需要加入呢？
---

否，請參考 [Android SDK 權限說明]，除了必須加入的 Permission 外，您可以依實際狀況選擇是否加入額外的 Permission。

然多樣化的權限有助於增加使用者體驗的廣告投放，請在不影響使用者個人隱私且不違背平台 (Google Play / Apple Store) 的廣告政策下，斟酌加入相關權限。

<br>

### 為什麼開發測試時可以看到廣告，App 上架後就看不到了？有時還會看到類似以下的 Log
---

```
...
W/System.err: java.lang.ClassNotFoundException: c.Device
W/System.err:     at java.lang.Class.classForName(Native Method)
W/System.err:     at java.lang.Class.forName(Class.java:453)
W/System.err:     at java.lang.Class.forName(Class.java:378)
W/System.err:     at vpadn.ec.a(SourceFile:102)
W/System.err:     at vpadn.ec.a(SourceFile:78)
W/System.err:     at vpadn.ed.a(SourceFile:359)
W/System.err:     at vpadn.ed.a(SourceFile:317)
W/System.err:     at b.i.exec(SourceFile:46)
W/System.err:     at android.os.MessageQueue.nativePollOnce(Native Method)
W/System.err:     at android.os.MessageQueue.next(MessageQueue.java:325)
W/System.err:     at android.os.Looper.loop(Looper.java:142)
W/System.err:     at android.os.HandlerThread.run(HandlerThread.java:65)
W/System.err: Caused by: java.lang.ClassNotFoundException: Didn't find class "c.Device" on path: ......
W/System.err:     at dalvik.system.BaseDexClassLoader.findClass(BaseDexClassLoader.java:125)
W/System.err:     at java.lang.ClassLoader.loadClass(ClassLoader.java:379)
W/System.err:     at java.lang.ClassLoader.loadClass(ClassLoader.java:312)
W/System.err:     ... 12 more
I/System.out: Error adding plugin c.Device.
...
```

請確認是否有按照 [Vpon Proguard Configuration] 中的描述，確實在您的 Proguard Config 中加上正確的設定。

<br>

### 導入 SDK 時，發生錯誤
---

若您在導入 Vpon SDK 或展示廣告時發生錯誤，可以參考以下訊息排除問題。

#### Retrofit Library

```
E/AndroidRuntime: FATAL EXCEPTION: AsyncTask #1
    java.lang.RuntimeException: An error occurred while executing doInBackground()
        at android.os.AsyncTask$3.done(AsyncTask.java:353)
        ...
     Caused by: java.lang.NoClassDefFoundError: Failed resolution of: Lretrofit2/Retrofit$Builder;
        at vpadn.bt.a(RestUtil.java:161)
        at vpadn.af$c.a(VponNativeAdController.java:1747)
        ...
     Caused by: java.lang.ClassNotFoundException: Didn't find class "retrofit2.Retrofit$Builder" on path:...
        at dalvik.system.BaseDexClassLoader.findClass(BaseDexClassLoader.java:125)
        at java.lang.ClassLoader.loadClass(ClassLoader.java:379)
        at java.lang.ClassLoader.loadClass(ClassLoader.java:312)
        ...
        Suppressed: java.io.IOException: No original dex files found for dex location /data/app/com.lilylee.vpon.vponnative-djN4vBXtkLUW-YF0pezrHQ==/split_lib_resources_apk.apk
        at dalvik.system.DexFile.openDexFileNative(Native Method)
        at dalvik.system.DexFile.openDexFile(DexFile.java:353)
        at dalvik.system.DexFile.<init>(DexFile.java:100)
        ...
```

由於 Vpon SDK 在 4.8.0 後開始引入第三方 Library － Retrofit，請務必參考 [3rd-party Library 導入說明]，在導入 Vpon SDK 時，也導入 Retrofit Library。


#### min SDK version

```
Manifest merger failed : uses-sdk:minSdkVersion 15 cannot be smaller than version 17 declared in library [com.vpon:vpadnSDK:4.9.1] 
vpadnSDK-4.9.1.aar/bc33461699d404214699093ae210c1ba/AndroidManifest.xml as the library might be using APIs not available in 15
    Suggestion: use a compatible library with a minSdk of at most 15,
        or increase this project's minSdk version to at least 17,
        or use tools:overrideLibrary="com.vpon.sdk" to force usage (may lead to runtime failures)
```

由於 Vpon SDK 目前支援的 minSdkVersion 為 Android 4.3 (API Level 18) 以上的版本，若您在導入 SDK 時發生這樣的錯誤，請先確認您的 App 的 minSdkVersion 是否符合系統需求。


<!-- #### VpadnActivity

```
E/VPADN: [::VponInterstitialAdController::]  Don't add com.vpadn.widget.VpadnActivity to your AndroidManifest.xml
```

如果您要使用 Vpon 的插頁廣告的話，請務必按照 [Vpon 串接說明文件]，在您的 AndroidManifest.xml 中加入 VpadnAdcitiy。 -->

<br>

### Vpon 支援 AdMob (Google Ad Manager) Native Ad Mediation 嗎？
---

Vpon 目前以自訂事件的方式支援 AdMob (Google Ad Manager) Native Ad Mediation，請參考我們的 [Android 中介服務說明文件]，完成在 AdMob 後台的設定。

<br>

### 廣告請求回應為 NO_FILL，還有什麼方法可以進行測試？
---

Vpon 提供測試廣告，請參考 [Android 測試廣告]呼叫測試廣告，以便測試。



# iOS
---

### Vpon 支援 AdMob (Google Ad Manager) Native Ad Mediation 嗎？
---

Vpon 目前以自訂事件的方式支援 AdMob (Google Ad Manager) Native Ad Mediation，請參考我們的 [iOS 中介服務說明文件]，完成在 AdMob 後台的設定。


要透過 Google Mobile Ad SDK 進行 Native Ad 的串接，請務必確認您使用的是以下版本的 SDK，並搭配 Custom Event 的設定，以免影響您的收益。

* Google Mobile Ad SDK 4.47.0 以上
* Vpon iOS SDK 4.9.1 以上
* Vpon AdMob Adapter 1.1.3 以上


<br>

### 可以利用 Webview 串接 Vpon Web SDK 嗎？
---

您可以透過 Webview 串接 Vpon Web SDK，在串接時，請務必確認以下項目：

* 請在 Vpon 開發者後台申請一組平台為`行動版網頁`的 License Key
* 請確保 Webview 內的廣告被點擊後，會跳轉至瀏覽器並完整顯示 Landing Page

若您是使用 `WKWebView` 來展示廣告，為確保廣告被點擊後會跳轉至瀏覽器並完整顯示 Landing Page，請務必實作 `WKUIDelegate`。

```objc
// WKUIDelegate Sample Code

(WKWebView *)webView:(WKWebView *)webView createWebViewWithConfiguration:(WKWebViewConfiguration *)configuration forNavigationAction:(WKNavigationAction *)navigationAction windowFeatures:(WKWindowFeatures *)windowFeatures {
    if (navigationAction.request.URL) {
        NSURL *url = navigationAction.request.URL;
        NSString *urlPath = url.absoluteString;
        if ([urlPath rangeOfString:@"https://"].location != NSNotFound ||
            [urlPath rangeOfString:@"http://"].location != NSNotFound) {
                [[UIApplication sharedApplication] openURL:url options:@{} completionHandler:^(BOOL success) {
                }];
            }
        }
    return nil;
}
```

<br>

### 廣告請求回應為 NO_FILL，還有什麼方法可以進行測試？
---

Vpon 提供測試廣告，請參考 [iOS 測試廣告]呼叫測試廣告，以便測試。



# Web
---

### 廣告請求回應為 NO_FILL，還有什麼方法可以進行測試？
---

Vpon 提供測試廣告，請參考以下範例，將 vpon_ad_test 的參數設置為 `1`，即可取測試廣告。

```html
<vpon vpon_ad_test="1"
          vpon_ad_licensy_key="License Key"
          vpon_ad_format="320x50_mb"
          debug="true"></vpon>
<script type="text/javascript"  src="//m.vpon.com/sdk/vpadn-sdk.js"> </script>
```

<br>

### Vpon Mobile Web 廣告有提供 Passback 嗎？
---

Vpon 提供沒有廣告回傳時的 Callback Function，請參考 [Web SDK Callback Function]，在沒有廣告時使用您指定的 Passback。

```html
<vpon vpon_ad_test="0"
        vpon_ad_licensy_key="License Key"
        vpon_ad_format="320x50_mb"
        debug="true"
        ad_request_callback="vponCallBackMethod"></vpon>
  <script type="text/javascript"  src="//m.vpon.com/sdk/vpadn-sdk.js"> </script>
  <script>
        function vponCallBackMethod(adStatus) {
          if (adStatus != 0) {
            // 沒有廣告回傳，執行其它操作
          } else {
            // 有廣告回傳
          }
        }
  </script>
```



[Android SDK 權限說明]: {{site.baseurl}}/zh-tw/android/integration-guide/#加入-permission
[Vpon Proguard Configuration]: {{site.baseurl}}/zh-tw/android/integration-guide/#proguard-configuration
[3rd-party Library 導入說明]: {{site.baseurl}}/zh-tw/android/integration-guide/#3rd-party-library
[Android 中介服務說明文件]: {{site.baseurl}}/zh-tw/android/mediation/admob/#customevent
[Android 測試廣告]: {{site.baseurl}}/zh-tw/android/banner/#測試廣告
[iOS 中介服務說明文件]: {{site.baseurl}}/zh-tw/ios/mediation/admob/#customevent
[iOS 測試廣告]: {{site.baseurl}}/zh-tw/ios/banner/#測試廣告
[Web SDK Callback Function]: {{site.baseurl}}/zh-tw/web/original-banner/#callback
[Vpon FAE]: mailto:fae@vpon.com