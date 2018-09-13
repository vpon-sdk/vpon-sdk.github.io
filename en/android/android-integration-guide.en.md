---
layout:         "android"
title:          "Android SDK"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       android/integration-guide/
lang:           "en"
---
# Prerequisites
----
Before you start to integrate Vpon SDK, please make sure you already have your own Vpon Publisher Account and get your License Key. [Register as a Vpon Publisher] if you haven't own your Publisher Account.

Once you have your own Publisher Account, follow the instruction below to integrate Vpon Android SDK:

1. Import SDK to your project.
2. Add com.vpadn.widget.VpadnActivity to your AndroidManifest.xml
3. Add required Permission to your AndroidManifest.xml

# Import SDK to your project
---
Vpon provides two ways to integrate our SDK. Choose one of the following two options:

* [Integrate SDK with Maven (Streamlined simple)](#maven)
* [Integrate SDK manually](#manual-sdk)

> **Note**: If you've integrated Vpon SDK before, check [How to update SDK](../../android/latest-news/update-to-SDK4_5_1+/) first.

## Integrate SDK with Maven {#maven}
---
> **Note**: Maven is a build automation tool used primarily for Java projects. If you haven't installed Maven in your device for development, please refer to [Maven Introduction](https://maven.apache.org/).

Add Vpon's Maven repository in `allprojects` section in the project-level `build.gradle` file.

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

Add the dependency with a specified version of Vpon SDK in the app-level `build.gradle` file (Here take SDK 4.7.0 for example).

```javascript
dependencies {
    ...
    implementation 'com.vpon:vpadnSDK:4.7.0'
}
```

> **Note**: You can revise ``'com.vpon:vpadnSDK:4.7.0'`` to ``'com.vpon:vpadnSDK:4.7.+'`` to import the latest SDK in version 4.7.


## Integrate SDK manually {#manual-sdk}
---
Please follow the instruction below to integrate Vpon SDK to your application manually:

1. [Download latest Vpon SDK here](../download)
2. Import Vpon SDK to your Android Studio / Eclipse project

### Eclipse
---
1. Right click on your mouse to show the menu. Choose `Properties`.
<img src = "{{site.imgurl}}/A-sdk330-01.png" alt="elcipse-img1" class="width-400">

2. Click `Java Build Path` and switch to the `Libraries` tag. Click `Add External JARs...` to add Vpon SDK.
![]({{site.imgurl}}/A-sdk330-02.png)

### Android Studio
---
1. Find `libs` in your Android project (Directory：Project Name -> app -> libs)
![]({{site.imgurl}}/ProjectLibFolder.jpg)

2. Right click on `libs` and choose to `Reveal in Finder`
![]({{site.imgurl}}/DropJarFileToLibFolder.jpg)


3. Move the SDK (.jar) to `libs` (You can also grab the file into `libs` in IDE)
![]({{site.imgurl}}/MainInterface.jpg)

4. Go back to your Android project and you will see the SDK (.jar) we just added shows in the [libs] folder. Right click on the SDK (.jar) and choose `Add as library` to link reference. Please check the build.gradle at the same time to make sure there's a sentence "implementation ('libs/vpon_SDK_version_name.jar')" .
![]({{site.imgurl}}/ModifyBuildGradle2.jpg)

# VpadnActivity
---
Add com.vpadn.widget.VpadnActivity to your AndroidManifest.xml.

```xml
<activity
  android:name="com.vpadn.widget.VpadnActivity"
  android:configChanges="orientation|keyboardHidden|navigation|keyboard|screenLayout|uiMode|screenSize|smallestScreenSize"
  android:theme="@android:style/Theme.Translucent"
  android:hardwareAccelerated="true">
</activity>
```

> **Note**: **EVERY** attribute is required!


# Permission
---
Add permissions below to your AndroidManifest.xml.

```xml
  <uses-permission android:name="android.permission.INTERNET"/>
  <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
  <uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>
  <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
```
These are required permissions.

Besides, we recommend that you can add one more permission below additionally to allow Vpon to deliver location-base ads with more accurate location information.

```xml
  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
```

Since we started to support Video ads from Vpon SDK 4, we recommend that you can add the scripts below to your Activity which contain ads to accelerate hardward performance.

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
If your app need obfuscateed before release, please add settings below：<br>
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
For more ad types, please refer to:

* [Banner Ad][1]
* [Interstitial Ad][2]
* [Native][3]
* [Mediation][4]


[Register as a Vpon Publisher]: {{ site.baseurl }}/android/registration/
[1]:{{ site.baseurl }}/android/banner/
[2]:{{ site.baseurl }}/android/interstitial/
[3]:{{ site.baseurl }}/android/native/
[4]:{{ site.baseurl }}/android/mediation/