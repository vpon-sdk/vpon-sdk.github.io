---
layout:         "android"
title:          "Android - Vpon SDK Integration Guideline"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       zh-tw/android/guideline
lang:           "zh-tw"
---

# Vpon SDK Integration
---

## Import Vpon SDK
---

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

## Import 3rd-party Library
---

透過 Maven 導入：在 App 層級下的 build.gradle 的 dependencies 中加入以下內容導入 Retrofit

```xml
dependencies {
    implementation 'com.squareup.retrofit2:retrofit:2.6.2'
    implementation 'org.jetbrains.kotlin:kotlin-stdlib:1.6.21'
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.6.4'

    <!-- Import required Google Play Service -->
    implementation 'com.google.android.gms:play-services-ads-identifier:17.0.0'
    <!-- Import required dependency if you are using Vpon SDK v5.3.2 and above -->
    implementation 'com.google.android.gms:play-services-appset:16.0.0'
}
```

## 宣告 VponActivity
---
請在您的 AndroidManifest.xml 加入以下內容：

```xml
<!-- Please add below script if you're using SDK v5.0.2 or above-->
<activity android:name="com.vpon.ads.VponAdActivity"
android:configChanges="orientation|keyboardHidden|navigation|keyboard|screenLayout|uiMode|screenSize|smallestScreenSize"
android:theme="@android:style/Theme.Translucent"
android:hardwareAccelerated="true"/>

```

> **Note**：上面**每一個**屬性都不能少，其值都需要相同！


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
<uses-permission android:name="android.permission.READ_PHONE_STATE"/>
```

## 初始化 SDK
---

```java
// Initial SDK in Application
public class CustomApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();
        VponMobileAds.initialize(getBaseContext());
        VponMobileAds.setRequestConfiguration(
                new RequestConfiguration.Builder()
                        .setNetworkId(RequestConfiguration.NETWORK_ID_SKM)
                        .build()
        );
    }
}
```


# 取得 VponID
---

請使用以下方式取得 VponID:

```java
Context context = getBaseContext();
String vponId = VponMobileAds.getVponID(context);
```

使用以上 API 取得的 VponID 格式將如下：

```
v1_89177a51-1708-46ad-a38a-03a4c37e6f2d.1722917052121
```