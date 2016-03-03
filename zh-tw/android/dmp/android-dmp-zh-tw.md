---
layout:         "android"
title:          "Android - DMP"
lead:           ""
description:    ""
keywords:       "dmp"
permalink:       /zh-tw/android/dmp/
lang:           "zh-tw"
---

# 需求
---


## Permission
請先加入以下 permission 在您的 `AndroidManifest.xml`

```java
<uses-permission android:name="android.permission.INTERNET"/>
```

# 加入實作
---
## import java
請加入以下 import 進您的 `MainActivity`

```java
import com.vpadn.dmp.VpadnAnalytics;
```

## 設定 License Key
接下來，再將以下 code加入 MainActivity

```java
private static final String licenseKey = "申請之licenseKey";
private static VpadnAnalytics analytics;
VpadnAnalytics.Tracker tracker;
```

```java
@Override
 protected void onCreate(Bundle savedInstanceState) {
	analytics = VpadnAnalytics.getInstance(MainActivity.this, licenseKey);
	tracker = analytics.newTracker();
}
```

> **Note:** 請將 code 中的 "申請之licenseKey" 置換成註冊申請的專屬碼


## 選擇方式回傳資料
#### tracker.sendLaunchEvent()
此段功能請建立在 app 起始介面，使您的使用者開啟時可以回報開啟的資料

#### tracker.sendEvent()
此段功能可讓您回傳相關資料以利分析，請看以下例子，按下按鈕後觸發：

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
您可將相關資料，舉上述例子，先將商品名稱 ("name", 您要回傳的參數) 等資料建立物件

同樣的，sendEvent 也可以回傳 app 使用者當下的頁面為何
例如，先建立一個物件，儲存使用者當下以及前一個頁面，請參考以下:

```java
public void onClick(View v) {
	JSONObject payloadJsonObj = new JSONObject();
	try {
		payloadJsonObj.put("current", "前一頁面網址");
		payloadJsonObj.put("pervious", "當前頁面網址");
	} catch (JSONException e) {
		e.printStackTrace();
	}
	tracker.sendEvent("page_view", payloadJsonObj, "yourCustomName");
}
```
一樣利用 sendEvent() 回傳

> **Note:**<br>
>1. 請置換範例 code 中的 yourCustomName 為您的自創名 <br>
>2. 其他相關回傳資料請參考事件說明


# Download
---
|DMP 1.0.0|
:----:
|[Download](http://m.vpadn.com/sdk/vpadn-dmp-obf1.0.0-1507221044-4b374f5.jar)|
