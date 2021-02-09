---
layout:         "android"
title:          "Android - VDA SDK"
lead:           ""
description:    "dmp"
keywords:       ""
permalink:       android/dmp/
lang:           "en"
---

# Prerequisites
---
VDA SDK support:

* Android：`Android 5.0 or later`

Before you start to integrate Vpon SDK, make sure your app is compatible.


### Import SDK
You can [download VDA SDK here][1] and import the SDK file into your Android Studio project.

Open build.gradle in App-level, modify dependencies as below:

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
Please add the Permissions below in your `AndroidManifest.xml`

(Required) Please add below premissions for DMP SDK:

```xml
<!-- Required permissions -->
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>
<uses-permission android:name="android.permission.CHANGE_WIFI_STATE"/>
```

(Optional) Please add below permissions for additional data collection and analysis:

```xml
<!-- Optional permissions -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
<uses-permission android:name="android.permission.READ_PHONE_STATE"/>
```


# Start To Implement VDA SDK
---
Please follow the steps below to integrate VDA SDK in your application.

### Import VDA SDK

```java
import com.vpon.sdk.VpdataAnalytics;
```

### Declare VpadnAnalytics and Indicate A License Key and Custom ID

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

> **Note**：Set vpdataAnalytics.setDebugMode(true); as `false` before you launch the App.



### Send Message
VDA SDK provide below method to send messages as below:

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
	tracker.sendEvent("page_view", payloadJsonObj);
}
```


# Debug Mode
---
Config debug mode with setDebugMode when initilizing VDA SDK to enable or disable debug log when you implement the SDK.


```java

VpdataAnalytics vpdataAnalytics = VpdataAnalytics.INSTANCE;

vpdataAnalytics.setDebugMode(true);
// Set true to enable Debug Mode, remember to disable this setting before app release!
// Must be set before vpdataAnalytics.initialize()

vpdataAn



# Sample Code
Please refer to our [Sample Code](https://github.com/vpon-sdk/Vpon-Android-Analytics) for a complete integration sample.

# Download
---

|VDA 2.0.0|
|:-------:|
|[Download][1]|

# Change Log
---
For VDA SDK change Log, please refer to [VDA SDK Change Log]({{ site.baseurl }}/android/dmp/changelog)

[1]: {{site.dnldurl}}/vpon-data-sdk-v200-release.aar