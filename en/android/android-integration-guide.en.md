---
layout:         "android"
title:          "Android SDK"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       android/integration-guide/
lang:           "en"
---
# Vpon SDK 4 Fundamental
----
If you are using the previous version of vpon SDK, please read this first: [How to update to SDK4.5.1+]({{site.baseurl}}/android/latest-news/update-to-SDK4_5_1+/)

1. Check your ad network from registering url first:<br>
Taiwan is <http://tw.pub.vpon.com/>  
China  is <http://cn.pub.vpon.com/>  

2. If you register Taiwan platform, please use:<br>
`vponBanner = new VpadnBanner(this, bannerId, VpadnAdSize.SMART_BANNER,
“TW”);`


3. If you register China platform, please use:<br>
`vponBanner = new VpadnBanner(this, bannerId, VpadnAdSize.SMART_BANNER,
“CN”);`

# Overview
--------
Vpon banners use a small portion of the screen to entice users to “click
through” to a richer, full-screen experience such as a website or app
store page. This guide shows you how to enable your app to serve a
banner ad.

To display Vpon banners in your Android app, simply import SDK jar file
to your Eclipse project and add a com.vpadn.ads.VpadnBanner to your UI.

# Requirement
-----------
To show Vpon banner needs Android 2.1.x at least.

# Import SDK
----------

Show Vpon banner on your Android App, you must complete three steps:  

1.  Import Vpon SDK JAR into your Android Studio/Eclipse project.
2.  Declare com.vpadn.widget.VpadnActivity in AndroidManifest.xml.
3.  Set necessary permissions.

## Eclipse
---
1. Import Vpon SDK Jar file to your eclipse  project. (copy jar file to
libs folder)  
<img src = "{{site.imgurl}}/A-sdk330-01.png" alt="elcipse-img1" class="width-400">

2. Add com.vpadn.widget.VpadnActivity to your AndroidManifest.xml.
![]({{site.imgurl}}/A-sdk330-02.png)

3. Add required permissons to your AndroidManifest.xml.  
<br>


## Android Studio
---
1. Find `libs` in your Android project (Route：Project Name -&gt; app
-&gt; libs)
![]({{site.imgurl}}/ProjectLibFolder.jpg)


2. Right-click on `libs` and follow with a left-click on `Reveal in Finder`
![]({{site.imgurl}}/DropJarFileToLibFolder.jpg)


3. Move the JAR downloaded to `libs` on finder (You can also grab Vpon JAR into `libs` on IDE)  
![]({{site.imgurl}}/MainInterface.jpg)



4. Go back to your Android project and you will see that the Vpon JAR we just added shows up in [libs]. Make a right-click and choose `Add as library` to link reference. Please check the build.gradle at the same time to make sure there's a sentence " compile files('libs/vpon_SDK_version_name.jar') ". See the photo below.  
![]({{site.imgurl}}/ModifyBuildGradle.jpg)

## VpadnActivity
---
Add com.vpadn.widget.VpadnActivity to your AndroidManifest.xml

```xml
<activity
  android:name="com.vpadn.widget.VpadnActivity"
  android:configChanges="orientation|keyboardHidden|navigation|keyboard|screenLayout|uiMode|screenSize|smallestScreenSize"
  android:theme="@android:style/Theme.Translucent"
  android:hardwareAccelerated="true" >
</activity>
```

> **Note**: **EVERY** attribute is required!

<br>

## Permissions
---
Add following permissions in AndroidManifest.xml

```java
  <uses-permission android:name="android.permission.INTERNET" />
  <uses-permission android:name="android.permission.READ_PHONE_STATE"/>
  <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
  <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
  <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
```
The six permissions above are necessary. In addition, we recommend that you can add the following permission for being able to obtain more accurate banner related location.  

```java
  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
```
Use following permission could make ads to be more accurate delivery,
and bring more revenue.

```java
  <uses-permission android:name="android.permission.GET_ACCOUNTS"/>
```

Since there would be plenty of Video ads displayed on devices, we
recommend you to add hardware acceleration in your main Activity.

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



# Download
---
[Go to download page](../download)

# Other Tips
---
Please refer to [Banner Ad](../banner)、[Interstitial Ad](../Interstitial)、[Mediation](../mediation) for more information.
