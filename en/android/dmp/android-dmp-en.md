---
layout:         "android"
title:          "Android - DMP SDK"
lead:           ""
description:    "dmp"
keywords:       ""
permalink:       android/dmp/
lang:           "en"
---

# Prerequisites
---
Vpon DMP SDK support:

* Android：`Android 4.3 or later`

Before you start to integrate Vpon SDK, make sure your app is compatible.


### Import SDK
You can [download Vpon DMP SDK here](http://m.vpadn.com/sdk/vpon-analytics-obf1.1.0-release-20190103.aar) and import the SDK file into your Android Studio project.

Open build.gradle in App-level, modify dependencies as below:

```xml
dependencies {
    ...
    implementation fileTree(include: ['*.jar', '*.aar'], dir: 'libs')
}
```

### Permission
Please add the Permission below in your `AndroidManifest.xml`

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
If your app need obfuscateed before release, please add settings below:<br>

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

# Start To Implement Vpon DMP SDK
---
Please follow the steps below to integrate Vpon DMP SDK in your application.

### Import Vpon DMP SDK

```java
import com.vpadn.dmp.VpadnAnalytics;
```

### Declare VpadnAnalytics and Indicate A License Key

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

> **Note:** Please replace the License Key with your own one.


### Send Message
Vpon DMP SDK provide two method to send messages as below:

#### tracker.sendLaunchEvent()
tracker.sendLaunchEvent() can be used when user launch the App. We recommend that you can add this method in the launch page of your application.

#### tracker.sendEvent()
tracker.sendEvent() can be used when a specific event be triggered. Please refer to the sample code below to send a message when onClick() event be triggered:

```java
public void onClick(View v) {
	JSONObject payloadJsonObj = new JSONObject();
	try {
		payloadJsonObj.put("id", "payloadJsonObj");
		payloadJsonObj.put("name", "Coat");
		payloadJsonObj.put("price", 100);
		payloadJsonObj.put("color", "Blue");
		payloadJsonObj.put("size", "XL");
		payloadJsonObj.put("tags", "OrangeBear,fiber");
		payloadJsonObj.put("currency", "NTD");
		} catch (JSONException e) {
		e.printStackTrace();
	        }
	tracker.sendEvent("item_view", payloadJsonObj);
        }
}
```

Besides, you can also save the message about the page that user view currently in an object and use tracker.sendEvent() to send the message:

```java
public void onClick(View v) {
	JSONObject payloadJsonObj = new JSONObject();
	try {
		payloadJsonObj.put("pervious", "URL of Last Page");
		payloadJsonObj.put("current", "URL of Current Page");
	} catch (JSONException e) {
		e.printStackTrace();
	}
	tracker.sendEvent("page_view", payloadJsonObj, "yourCustomName");
}
```

> **Note:** Please replace yourCustomName in the sample code with your custom name.

# Sample Code
Please refer to our [Sample Code](https://github.com/vpon-sdk/Vpon-Android-Analytics) for a complete integration sample.

# Download
---

|DMP 1.1.0|
|:-------:|
|[Download](http://m.vpadn.com/sdk/vpon-analytics-obf1.1.0-release-20190103.aar)|