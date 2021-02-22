---
layout:         "android"
title:          "Android - VDA SDK"
lead:           ""
description:    ""
keywords:       "dmp"
permalink:       /zh-tw/android/dmp/
lang:           "zh-tw"
---

# 串接準備
---
VDA SDK 目前最低支援以下版本的作業系統，在開始串接 Vpon SDK 前，請確保您的 App 符合以下條件：

* Android：`Android 5.0 以上`

### 匯入 VDA SDK
請先[下載 VDA SDK][1]，並將 SDK 加到您的 Android Studio 專案中。

再到 App 層級下的 build.gradle，將 dependencies 的部份修改如下：

```xml
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar', '*.aar'])
    ...
    implementation 'com.google.android.gms:play-services-ads-identifier:17.0.0'

    //coroutines
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-core:1.3.9'
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.3.9'
}
```

### Permission
請在您的 `AndroidManifest.xml` 中加入所需的 Permissions。

以下為必須加入的 Permissions：

```xml
<!-- Required permissions -->
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>
<uses-permission android:name="android.permission.CHANGE_WIFI_STATE"/>
```

請依據資料收集及分析的目標，選擇性加入以下 Permissions：

```xml
<!-- Optional permissions -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
<uses-permission android:name="android.permission.READ_PHONE_STATE"/>
```


# 開始串接 VDA SDK
---
請參考以下說明，完成 Vpon Data SDK 串接。

### Import VDA SDK

```java
import com.vpon.sdk.VpdataAnalytics;
```

### 宣告 VpdataAnalytics 物件，並指定 License Key 與 Custom Id

```java
public class MainActivity extends Activity {

    // TODO set your licenseKey & customerId
    private String licenseKey = "mock_license_key";
    private String customerId = "mock_custom_id";

    private VpdataAnalytics vpdataAnalytics;

    private VpdataAnalytics.Tracker tracker = null;

    private final int PERMISSION_REQUEST_CODE = 2001;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Request optional permission
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            requestPermissions(new String[]{ACCESS_FINE_LOCATION, ACCESS_COARSE_LOCATION, READ_PHONE_STATE}, PERMISSION_REQUEST_CODE);
        }

        vpdataAnalytics = VpdataAnalytics.INSTANCE;

        // Set true to enable debug mode, set false before app release
        // Set up before vpdataAnalytics.initialize
        vpdataAnalytics.setDebugMode(true);

        vpdataAnalytics.initialize(this, licenseKey, customerId);

        // Construct a Tracker for sending event
        tracker = new VpdataAnalytics.Tracker();
    }
}

```

> **Note**：在 App 發佈前，請務必將 vpdataAnalytics.setDebugMode(true); 改為 `false`


### 回傳資料
VDA SDK 提供以下回傳資料的方法：


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
	tracker.sendEvent("page_view", payloadJsonObj);
}
```

# Debug Mode
---
您可以在初始化 VDA SDK 時，透過設定 setDebugMode 來啟用或停用 Debug Log，請見以下範例：


```java

VpdataAnalytics vpdataAnalytics = VpdataAnalytics.INSTANCE;

vpdataAnalytics.setDebugMode(true);
// Set true to enable Debug Mode, remember to disable this setting before app release!
// Must be set before vpdataAnalytics.initialize()

vpdataAnalytics.initialize(this, licenseKey, customerId);
```


# Sample Code
---
如果您想看到完整的串接實例，請參考我們的 [Sample Code](https://github.com/vpon-sdk/Vpon-Android-Analytics)


# Download
---

|VDA 2.0.0|
|:-------:|
|[Download][1]|

# Change Log
---
關於 VDA SDK 的更新記錄，請參考 [VDA SDK Change Log]({{ site.baseurl }}/zh-tw/android/dmp/changelog)


[1]: {{site.dnldurl}}/vpon-data-sdk-v200-release.aar