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

加入 Maven Repository 後，開啟 App 層級下的 `build.gradle` 加入 Vpon SDK 指定版本的編譯相依性 (此處以 SDK 4.7.0為例)

```javascript
dependencies {
    ...
    implementation 'com.vpon:vpadnSDK:4.7.0'
}
```

> **Note**：若要更新 SDK，可改為 implementation ``'com.vpon:vpadnSDK:4.7.+'``，即可獲取 SDK 版本號 4.7 中最新的版本

## 手動 (手動下載並串接) {#manual-sdk}
---
要手動在應用程式中加入 Vpon SDK，您需要完成以下步驟：

1. [由此下載最新版本的 Vpon SDK](../download)
2. 在 Android Studio / Eclipse 專案中加入 Vpon SDK


### Eclipse
1. 在 Eclipse 中的應用程式專案上按一下滑鼠右鍵，並選擇 `Properties`。
<img src = "{{site.imgurl}}/A-sdk330-01.png" alt="elcipse-img1" class="width-400">

2. 選取 `Java Build Path` (Java 建構路徑) 和 `Libraries` (程式庫) 分頁，然後按一下 `Add External JARs...` (新增外部 JAR...)，加入 Vpon SDK JAR。
![]({{site.imgurl}}/A-sdk330-02.png)

### Android Studio
1. 在 Android 中的應用程式專案找到 `libs` (路徑：`project_name` -> `app` -> `libs`)
![]({{site.imgurl}}/ProjectLibFolder.jpg)


2. 滑鼠右鍵點選 `libs` 後，左鍵點選 [Reveal in Finder]
![]({{site.imgurl}}/DropJarFileToLibFolder.jpg)


3. 將下載下來的 JAR 檔複製到 `libs` 資料夾 (也可以直接將 JAR 檔拖移至專案的 `libs`)
![]({{site.imgurl}}/MainInterface.jpg)


4. 回到 Android 專案，`libs` 會多出一個 Vpon 的 JAR 檔，右鍵點擊 JAR 檔並選擇 [Add as library]。再到 App 下的 build.gradle 進行確認，如範例所示，如果 JAR 檔被讀到了，將顯示 implementation ('libs/vpon_SDK_version_name.jar')
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
請在您的 AndroidManifest.xml 加入以下內容：

```xml
  <uses-permission android:name="android.permission.INTERNET"/>
  <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
  <uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>
  <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
```
以上五個為必要的 permission。另外建議您可以額外開啟以下 permission，提供更精準的定位訊息來取得與地理位置相關的廣告

```xml
  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
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

# Proguard Configuration
---
如果您的 App 本身需要經過 Proguard 混淆，請增加下面的設定：<br>
-dontwarn c.\*\* <br>
-dontwarn com.vpon.\*\* <br>
-dontwarn vpadn.\*\* <br>
-keep class c.\*\*{ \*; } <br>
-keep class com.vpon.\*\* { \*; } <br>
-keep class vpon.\*\* { \*; } <br>
-keep class com.vpadn.\*\* { \*; } <br>
-keep class vpadn.\*\* { \*; } <br>

# Tips
---
關於更多廣告形式的呈現，請參考：

* [橫幅廣告][1]
* [插頁廣告][2]
* [原生廣告][3]
* [中介服務][4]


[註冊帳號]: {{ site.baseurl }}/zh-tw/android/registration/
[1]:{{ site.baseurl }}/zh-tw/android/banner/
[2]:{{ site.baseurl }}/zh-tw/android/interstitial/
[3]:{{ site.baseurl }}/zh-tw/android/native/
[4]:{{ site.baseurl }}/zh-tw/android/mediation/