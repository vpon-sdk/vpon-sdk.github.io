---
layout:         "android"
title:          "Android - 串接說明"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       zh-tw/android/integration-guide/
lang:           "zh-tw"
---

# Vpon SDK 基本使用
----
若您曾使用過舊版SDK，請先閱讀: [升級最新 SDK 所需修改](../../android/latest-news/update-to-SDK4_5_1+/)

1. 請先從註冊網址檢查您的 Ad Network 平台: <br>
Taiwan 平台為 <http://tw.pub.vpon.com/> <br>
China  平台為 <http://cn.pub.vpon.com/>

2. 如果您申請的是 Taiwan 的平台，請使用： <br>
`vponBanner = new VpadnBanner(this, bannerId, VpadnAdSize.SMART_BANNER,
“TW”);`

3. 如果您申請的是 China 的平台，請使用： <br>
`vponBanner = new VpadnBanner(this, bannerId, VpadnAdSize.SMART_BANNER,
“CN”);`
<br>


# 系統需求
-----------
Vpon 廣告 Android 版的 SDK 需至少搭配 Android 2.1.X 或更新版本使用。請確認您所使用的是最新版的 Android SDK，並依據 Android v4.X 或更新版本進行編譯 (將 default.properties 中的 target 設為 android-17)。

# 導入 SDK
----------

Vpon 提供以下兩種串接廣告 SDK 的方式：

* [精簡 (搭配 Maven)](#maven)<br>
* [手動 (手動下載並串接)](#manual-sdk)<br>
<br>

## 精簡 (搭配 Maven) {#maven}

在 Android Studio 專案層級的 `build.gradle` 中，如下方所示在 allprojects 的 repositories 加入在以下連結中的 Maven Repository

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

加入上述連結後，即可在 app 層級下的 `build.gradle` 中加入 Vpon SDK 指定版本的編譯相依性( 此處以 SDK 4.6.0為例 )

```javascript
dependencies {
    ...
    compile 'com.vpon:vpadnSDK:4.6.0'
}
```

> 若要更新 SDK，可將上述改為 compile ``'com.vpon:vpadnSDK:4.6.+'``，可獲取 SDK 版本號 4.6 中最新的版本。

<br>

## 手動 (手動下載並串接) {#manual-sdk}

要手動在應用程式中加入 Vpon 廣告，您必須完成三個步驟：

1. 在 Android Studio/Eclipse 專案中加入 Vpon SDK JAR
2. 在 AndroidManifest.xml 中宣告 com.vpadn.widget.VpadnActivity
3. 在資訊清單中設定必要的 permissions。


### Eclipse
1. 在 Eclipse 中的應用程式專案上按一下滑鼠右鍵，並選擇 `Properties`。
<img src = "{{site.imgurl}}/A-sdk330-01.png" alt="elcipse-img1" class="width-400">

2. 選取 `Java Build Path` (Java 建構路徑) 和 `Libraries` (程式庫) 分頁，然後按一下 `Add External JARs...` (新增外部 JAR...)，加入 Vpon 廣告 JAR。
![]({{site.imgurl}}/A-sdk330-02.png)

### Android Studio
1. 在 Android 中的應用程式專案找到 `libs` (途徑：`project_name` -> `app` -> `libs`)
![]({{site.imgurl}}/ProjectLibFolder.jpg)


2. 滑鼠右鍵點選 `libs` 後，左鍵點選 [Reveal in Finder]
![]({{site.imgurl}}/DropJarFileToLibFolder.jpg)


3. 將下載下來的 JAR 檔複製到 `libs` 資料夾 (也可以直接拖移 Vpon JAR 至專案的 `libs`)
![]({{site.imgurl}}/MainInterface.jpg)



4. 回到 Android 專案，`libs` 會多出一個 Vpon 的 JAR 檔案，對它按下右鍵選則 [Add as library]。也請到 app 下的 build.gradle 確認，如範例顯示，將會有一行 compile files('libs/vpon_SDK_version_name.jar') 表示 JAR 被讀到了
![]({{site.imgurl}}/ModifyBuildGradle.jpg)


# VpadnActivity
---
加入以下設定在您的 AndroidManifest.xml

```xml
<activity
  android:name="com.vpadn.widget.VpadnActivity"
  android:configChanges="orientation|keyboardHidden|navigation|keyboard|screenLayout|uiMode|screenSize|smallestScreenSize"
  android:theme="@android:style/Theme.Translucent"
  android:hardwareAccelerated="true" >
</activity>
```

> **注意**: 上面**每一個**屬性都不能少,其值都需要相同！

<br>

# Permissions
---
加入以下 permission 在您的 AndroidManifest.xml

```java
  <uses-permission android:name="android.permission.INTERNET" />
  <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
  <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
  <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
```
上面五個是必要的 permission，另外建議您可以開啟下面這個 permission，將可以更精準的定位取得地理位置相關的廣告


```java
  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
```

由於Vpon SDK 4 有大量的 Video 廣告，建議您在你放 Banner 的 Activity 內加入硬體加速，如下


```xml
<activity
  android:name="com.vpadn.example.MainActivity"
  android:label="@string/app_name"
  android:configChanges="keyboardHidden|orientation"
  android:hardwareAccelerated="true" >
  <intent-filter>
    <action android:name="android.intent.action.MAIN" />
    <category android:name="android.intent.category.LAUNCHER" />
  </intent-filter>
</activity>
```

# 下載
---
[前往下載](../download)


# 其他訣竅
請參閱[橫幅廣告](../banner)、[插頁廣告](../Interstitial)、[原生廣告](../native)、[中介服務](../mediation)中獲取更多簡介。
