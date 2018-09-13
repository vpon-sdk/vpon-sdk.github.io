---
layout:         "android"
title:          "Android - Splash Ad"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       android/splash/
lang:           "en"
---
## Finished Integration Guide
---
If you haven't finished the previous integration guide, please check all the [settings here].

# Overview
--------
While waiting for the open of the app, Splash ad can not only be shown naturally and immediately to prompte user experience, but also impresses user with the great combination of suitable ad content and the app logo.

<img class="width-400" src="{{site.imgurl}}/Splash_Android.png" alt="successful result example">

There are six actions you will need to take to implement this in your app:

1. Import Vpon SDK
2. Create an Activity named `SplashActivity`. Set it as a `LAUNCHER` page with `PORTRAIT` orientation.
3. Implement `VpadnAdSplashListener` in SplashActivity.
4. Design `Splash View layout` with RelativeLayout.
5. Declare a VpadnSplashAd instance and request an ad.
6. Restart the App and a Splash ad will be shown.

# Coding for Showing Splash Ad
--------
First, import Vpon SDK as well as follow the Mainfest setting shown below.<br>
(If you would like to integrate Banner, Interstitial or Native ad in your apps, you will also need to configure your app's manifest file [as follows]({{site.baseurl}}/zh-tw/android/integration-guide/).)

```java
import com.vpadn.ads.*
```

```xml
<activity
  android:name=".SplashActivity"
  android:screenOrientation="portrait"
  android:theme="@style/SplashAppTheme">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
</activity>
```

## Declare VpadnSplashAd Instance & Send Request
--------
Initialize VpadnSplashAd while implementing SplashActivity. After filling your License Key and setting AdListener, let's start to request an Splash Ad. (Please click [here] if you still do not get the License Key)

```java
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_splash);
    RelativeLayout adsParent = (RelativeLayout) findViewById(R.id.splashContainer);
    vpadnSplashAd = new VpadnSplashAd(this, "License Key", adsParent);
    vpadnSplashAd.setAdListener(this);

    /** Request Test Ad Start **/
    VpadnAdRequest adRequest =  new VpadnAdRequest();
    HashSet<String> testDeviceImeiSet = new HashSet<String>();
    testDeviceImeiSet.add("Key in your device's GAID");
    adRequest.setTestDevices(testDeviceImeiSet);
    /** Request Test Ad End
    Skip the above 4 line codes if you want to request an actual ad. Just use vpadnSplashAd.loadAd() **/

    vpadnSplashAd.loadAd(adRequest);
}
```

## Splash Ad Callback
--------
After adding the code to load a Splash ad, the following 5 functions can handle loading failures, and callback the ad status:

1. onVpadnReceiveAd
2. onVpadnFailedToReceiveAd
3. onVpadnClickAd
4. onVpadnLeaveApplication
5. onVpadnAllowToDismissAd

While the Splash ad is received successfully, the callback `onVpadnSplashReceived` will be triggered simultaneously. When it received unsuccessfully, however, the callback `onVpadnFailedToReceiveAd` will be triggered. In addition, the callback `onVpadnSplashAllowToDismiss`, which will be triggered when the display of the ad reaches the standard, will allow you to close the ad.

```java
@Override
public void onVpadnReceiveAd(VpadnAd ad) {
    Log.d(LT, "Call onVpadnReceiveAd");
}

@Override
public void onVpadnFailedToReceiveAd(VpadnAd ad, VpadnAdRequest.VpadnErrorCode errorCode) {
    Log.d(LT, "Call onVpadnFailedToReceiveAd");
    startActivity(new Intent(this, MainActivity.class));
    finish();
}

@Override
public void onVpadnClickAd(VpadnAd ad) {
    Log.e(LT, "Call onVpadnClickAd");
}

@Override
public void onVpadnLeaveApplication(VpadnAd ad) {
    Log.e(LT, "Call onVpadnLeaveApplication");
}

// Note: Will only be notified once !!
@Override
public void onVpadnAllowToDismissAd(VpadnAd ad) {
    Log.d(LT, "Call onVpadnAllowToDismissAd");
    startActivity(new Intent(this, MainActivity.class));
    finish();
}
```

# Destroy VpadnSplashAd instance
--------
Please remember to use `vpadnSplashAd.onDestroy()` in `OnDestroy` to destroy VpadnSplashAd instance when you want to close the Splash Ad.

# Download Sample Code
--------
[Go to Download Page]


[settings here]: {{site.baseurl}}/android/integration-guide/
[Go to Download Page]: {{site.baseurl}}/android/download
[here]: {{site.baseurl}}/android/registration/
