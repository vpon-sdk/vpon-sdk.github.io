---
layout:         "android"
title:          "Android - 串接說明"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       zh-tw/android/integration-guide/
lang:           "zh-tw"
---
# 串接準備
---
在開始串接 SDK 前，請確認您已經擁有 Vpon 開發商帳號，並已經取得您的 License Key。如果您還沒完成註冊，請先[註冊帳號]。

取得 Vpon 開發商帳號後，請參考以下說明完成 Vpon Android SDK 的串接：

1. 導入 SDK 到您的專案中
2. 在 AndroidManifest.xml 中宣告 com.vpadn.widget.VpadnActivity
3. 在 AndroidManifest.xml 中設定必要的 Permission

# 導入 SDK
---
Vpon 提供以下兩種串接廣告 SDK 的方式：

* [精簡 (搭配 Maven)](#maven)
* [手動 (手動下載並串接)](#manual-sdk)

> **Note**：若您曾使用過舊版 SDK，請先閱讀: [如何升級 SDK 版本](../../android/latest-news/update-to-SDK4_5_1+/)

## 精簡 (搭配 Maven) {#maven}
---
> **Note**：Maven 是一個項目管理及項目自動建構的工具，如果您還沒在開發用的裝置中安裝過 Maven，請參考 [Maven 安裝指南](https://maven.apache.org/)。

開啟 Android Studio Project 層級的 `build.gradle` 檔案，在下方所示 allprojects 的 repositories 加入 Maven Repository

```javascript
allprojects {
    repositories {
        jcenter()
        maven{
            url 'https://dl.bintray.com/vpon-sdk/maven'
        }
    }
}
```

加入 Maven Repository 後，開啟 App 層級下的 `build.gradle` 加入 Vpon SDK 指定版本的編譯相依性 (此處以 SDK 4.9.0為例)

```javascript
dependencies {
    ...
    implementation 'com.vpon:vpadnSDK:4.9.1'

    // Please add Android support library as below if you are using Vpon SDK 4.8+
    // The version of the dependency will depend on the version of the compile sdk you are using
    implementation 'com.android.support:appcompat-v7:28.0.0'
}
```

> **Note**：若要更新 SDK，可改為 implementation ``'com.vpon:vpadnSDK:4.9.+'``，即可獲取 SDK 版本號 4.9 中最新的版本

## 手動 (手動下載並串接) {#manual-sdk}
---
要手動在應用程式中加入 Vpon SDK，您需要完成以下步驟：

1. [由此下載最新版本的 Vpon SDK](../download)
2. 在 Android Studio 專案中加入 Vpon SDK

### Android Studio
1. 在 Android 中的應用程式專案找到 `libs` (路徑：`project_name` -> `app` -> `libs`)
![]({{site.imgurl}}/ProjectLibFolder.jpg)

2. 滑鼠右鍵點選 `libs` 後，左鍵點選 [Reveal in Finder]
![]({{site.imgurl}}/DropJarFileToLibFolder.jpg)

3. 將下載下來的 jar / aar 檔複製到 `libs` 資料夾 (也可以直接將 jar / aar 檔拖移至專案的 `libs`)
![]({{site.imgurl}}/MainInterface.jpg)

4. 回到 Android 專案，`libs` 會多出一個 Vpon 的 jar / aar 檔，右鍵點擊 jar / aar 檔並選擇 [Add as library]。再到 App 層級下的 build.gradle，將 dependencies 的部份修改如下：

```xml
dependencies {
    ...
    implementation fileTree(include: ['*.jar', '*.aar'], dir: 'libs')
}
```

如下圖所示，如果 jar /aar 檔被讀到了，將顯示在 dependencies 中
![]({{site.imgurl}}/ModifyBuildGradle2.jpg)

# 宣告 VpadnActivity
---
請在您的 AndroidManifest.xml 加入以下內容：

```xml
<activity
  android:name="com.vpadn.widget.VpadnActivity"
  android:configChanges="orientation|keyboardHidden|navigation|keyboard|screenLayout|uiMode|screenSize|smallestScreenSize"
  android:theme="@android:style/Theme.Translucent"
  android:hardwareAccelerated="true">
</activity>
```

> **Note**：上面**每一個**屬性都不能少，其值都需要相同！

# 加入 Permission
---
請在您的 AndroidManifest.xml 加入以下 Permission：

```xml
<!-- Required Permissions -->
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>

<!-- Optional Permissions. Use for optimize ad performance -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>
```

此外，由於 Vpon SDK 4 開始支援影音形式的廣告，建議您在放置廣告的 Activity 中加入硬體加速，請參考如下：

```xml
<activity
  android:name="com.vpadn.example.MainActivity"
  android:label="@string/app_name"
  android:configChanges="keyboardHidden|orientation"
  android:hardwareAccelerated="true">
  <intent-filter>
    <action android:name="android.intent.action.MAIN"/>
    <category android:name="android.intent.category.LAUNCHER"/>
  </intent-filter>
</activity>
```

# 3rd-party Library
---
從 `4.8.0` 版開始，Vpon SDK 引入第三方的 Library － Retrofit，請參考以下方法導入 Retrofit：

1. 手動下載導入：[由此直接下載] Retrofit 的 jar 檔並導入專案中
2. 透過 Maven 導入：在 App 層級下的 build.gradle 的 dependencies 中加入以下內容導入 Retrofit：

```xml
dependencies {
    ...
    implementation 'com.squareup.retrofit2:retrofit:2.4.0'
}
```

# Proguard Configuration
---
如果您的 App 本身需要經過 Proguard 混淆，請增加下面的設定：<br>

```xml
-dontwarn c.**
-dontwarn com.vpon.**
-dontwarn vpadn.**
-keep class c.**{ *; }
-keep class com.vpon.** { *; }
-keep class vpon.** { *; }
-keep class com.vpadn.** { *; }
-keep class vpadn.** { *; }

<!-- ----------- acquired since 4.8.0 start --------- -->
-dontnote retrofit2.Platform
-dontwarn retrofit2.Platform$Java8
-dontwarn okhttp3.internal.platform.*
-keepattributes Exceptions
-keepattributes Signature
-dontwarn okio.**
-dontwarn javax.annotation.**
<!-- ----------- acquired since 4.8.0 end --------- -->
```
 




# Tips
---
關於更多廣告形式的呈現，請參考：

* [橫幅廣告][1]
* [插頁廣告][2]
* [原生廣告][3]
* [Out-stream 影音廣告][5]
* [中介服務][4]


[註冊帳號]: {{ site.baseurl }}/zh-tw/android/registration/
[1]:{{ site.baseurl }}/zh-tw/android/banner/
[2]:{{ site.baseurl }}/zh-tw/android/interstitial/
[3]:{{ site.baseurl }}/zh-tw/android/native/
[4]:{{ site.baseurl }}/zh-tw/android/mediation/
[5]:{{ site.baseurl }}/zh-tw/android/outstream/
[由此直接下載]: https://github.com/square/retrofit