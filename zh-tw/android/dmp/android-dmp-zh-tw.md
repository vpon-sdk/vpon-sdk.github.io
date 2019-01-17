---
layout:         "android"
title:          "Android - DMP"
lead:           ""
description:    ""
keywords:       "dmp"
permalink:       /zh-tw/android/dmp/
lang:           "zh-tw"
---

# 串接準備
---
Vpon DMP SDK 目前最低支援以下版本的作業系統，在開始串接 Vpon SDK 前，請確保您的 App 符合以下條件：

* Android：`Android 4.3 以上`

### 匯入 Vpon DMP SDK
請先[下載 Vpon DMP SDK]({{site.dnldurl}}/vpon-analytics-obf1.2.2-release-20190117.aar)，並將 SDK 加到您的 Android Studio 專案中。

再到 App 層級下的 build.gradle，將 dependencies 的部份修改如下：

```xml
dependencies {
    ...
    implementation fileTree(include: ['*.jar', '*.aar'], dir: 'libs')
}
```

### Permission
請在您的 `AndroidManifest.xml` 中加入以下 Permission：

```xml
<!-- Required permission -->
<uses-permission android:name="android.permission.INTERNET"/>

<!-- Optional permissions -->
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
<uses-permission android:name="android.permission.READ_PHONE_STATE"/>
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>
<uses-permission android:name="android.permission.GET_ACCOUNTS"/>
<uses-permission android:name="android.permission.READ_CALL_LOG"/>
```

### Proguard Configuration
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
```

# 開始串接 Vpon DMP SDK
---
請參考以下說明，完成 Vpom DMP SDK 串接。

### Import Vpon DMP SDK

```java
import com.vpadn.dmp.VpadnAnalytics;
```

### 宣告 VpadnAnalytics 物件，並指定 License Key

```java
public class MainActivity extends Activity {

	private static final String licenseKey = "License Key";
	private static VpadnAnalytics analytics;
	VpadnAnalytics.Tracker tracker;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		analytics = VpadnAnalytics.getInstance(MainActivity.this, licenseKey);
		tracker = analytics.newTracker();
	}
}
```

> **Note**：請將 License Key 替換成您專屬的 License Key。


### 回傳資料
Vpon DMP SDK 提供兩種回傳資料的方法：

#### tracker.sendLaunchEvent()
在使用者開啟 App 時，回報開啟的事件。請將此方法建立在 App 的起始頁面。

#### tracker.sendEvent()
根據使用者行為觸發回傳資料的事件，請參考以下範例，建立物件儲存商品名稱 ("name", 您要回傳的參數) 等資料，在 onClick() 事件後觸發：

```java
public void onClick(View v) {
	JSONObject payloadJsonObj = new JSONObject();
	try {
		payloadJsonObj.put("id", "payloadJsonObj");
		payloadJsonObj.put("name", "V領布蕾絲拼接針織外套");
		payloadJsonObj.put("price", 100);
		payloadJsonObj.put("color", "牛藍");
		payloadJsonObj.put("size", "XL");
		payloadJsonObj.put("tags", "OrangeBear,上衣類,針織衫,人造絲纖維");
		payloadJsonObj.put("currency", "NTD");
		} catch (JSONException e) {
		e.printStackTrace();
	        }
	tracker.sendEvent("item_view", payloadJsonObj);
        }
}
```

此外，tracker.sendEvent() 也可以回傳 App 使用者當下的頁面。您可以先建立一個物件，儲存使用者當下以及前一個頁面，請參考以下範例：

```java
public void onClick(View v) {
	JSONObject payloadJsonObj = new JSONObject();
	try {
		payloadJsonObj.put("pervious", "前一頁面網址");
		payloadJsonObj.put("current", "當前頁面網址");
	} catch (JSONException e) {
		e.printStackTrace();
	}
	tracker.sendEvent("page_view", payloadJsonObj, "yourCustomName");
}
```

> **Note**：請將範例中的 yourCustomName 改為您自定義的名稱

# Sample Code
---
如果您想看到完整的串接實例，請參考我們的 [Sample Code](https://github.com/vpon-sdk/Vpon-Android-Analytics)


# Download
---

|DMP 1.2.2|
|:-------:|
|[Download]({{site.dnldurl}}/vpon-analytics-obf1.2.2-release-20190117.aar)|
