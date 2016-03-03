---
layout:         "android"
title:          "Android - AdMob"
lead:           "android mediation"
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       android/mediation/admob/
lang:           "en"
---
# Google AdMob mediation
--------
Google Admob Mediation document, please refer to [here].

# Google Ad Network Mediation
-----

1. Log in Google AdMob.
 Please log in to your [AdMob account][a]
![][1]

2. `Monetise` -> `+ Monetise new app`
![][2]

3. Select an app: <br>
  (1) Put your app name.<br>
  (2) Select `platform`. <br>
  (3) Click `Add app`. <br>
![][3]

4. Select ad format and name ad unit: <br>
(1) Choose "banner" or "interstitial" ad type. <br>
(2) Setting. <br>
(3) Ad unit name (ex. Vpon_Banner).  <br>
(4) Save it. <br>
![][4]

5. Get an Ad unit ID, then click Done.
![][5]

6. Edit mediation
![][6]

7. New ad network
![][7]

8. Set Vpon into mediation list：    <br>
(1) Find the Vpon Network tag in Available ad netwroks <br>
(2) Vpon Ad ID: put the Vpon’s Banner ID that you get from vpon’s back office.  <br>
(3) Zone: Choose the region, which you want to request ads from Vpon Platform.  <br>

(If the user of your app is from China, you need to fill with `cn` in this column; otherwise, you need to fill with `tw`.)

![][8]


# Integrate Vpon AdNetwork
You just need to import two jars into lib folder of your project, which are `admob-adapter-****.jar` and `vpadn-sdk-***-***-***.jar`.
<img src = "{{site.imgurl}}/AdMobLibJarFiles.jpg" class="width-300">



# Requirement
-----
1. Make sure you have the latest copy of the [Android SDK] and that you're compiling against at least Android v3.2 (set target in project.properties to android-13).
2. The Google Mobile Ads SDK for Android requires a run-time of Android 2.3 or later (set android:minSdkVersion to at least 9 in your AndroidManifest.xml). This means you can develop with the latest version of the Android SDK and your app will still run on an earlier Android version (2.3 minimum).

# Import SDK
---
Incorporating Google Mobile Ads into your app is a straightforward process:

1. Add and reference the Google Play services library project in your Eclipse workspace.
2. Add a meta-data tag in AndroidManifest.xml.
3. Declare com.google.android.gms.ads.AdActivity in the manifest.
4. Set up network permissions in the manifest.

## Google Play Services library
See the [Android instructions] for how to set up the Google Play services SDK.


### Eclipse
---
a. Right click on your app project in Eclipse and select `Properties`.

<img class="width-400" src="{{site.imgurl}}/GooglePlay_Properties.png">

b.Select Android and then click `Add....` Find the google-play-services_lib project and select OK to add the Google Play services library.

![][11]

c. The project now references the Google Play services library.

![][12]

### Android Studio
---
1. Open `build.gradle` under `app`.
> **Note**: There are two `build.gradle`s in Android Studio.

2. Add build rule in dependencies to getch latest `play-services`.

```groovy
apply plugin: 'com.android.application'
    ...

    dependencies {
      compile 'com.google.android.gms:play-services:+'
    }
```
Then, save and go to toolbar for **Sync Project with Gradle Files**

## Add a meta-data tag
Google Play services requires you to add the following meta-data tag within the element in your app's AndroidManifest.xml:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
          package="com.company"
          android:versionCode="1" android:versionName="1.0">
 <application android:icon="@drawable/icon" android:label="@string/app_name"
               android:debuggable="true">
  <span style="color:#ff0000"><meta-data android:name="com.google.android.gms.version"
             android:value="@integer/google_play_services_version"/></span>
   <activity android:label="@string/app_name" android:name="BannerExample">
     <intent-filter>
       <action android:name="android.intent.action.MAIN"/>
       <category android:name="android.intent.category.LAUNCHER"/>
     </intent-filter>
   </activity>
 </application>
</manifest>
```

## Declare AdActivity
---
The Mobile Ads SDK requires that com.google.android.gms.ads.AdActivity be declared in your app's AndroidManifest.xml:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
          package="com.company"
          android:versionCode="1" android:versionName="1.0">
 <application android:icon="@drawable/icon" android:label="@string/app_name"
               android:debuggable="true">
   <meta-data android:name="com.google.android.gms.version"
               android:value="@integer/google_play_services_version"/>
   <activity android:label="@string/app_name" android:name="BannerExample">
     <intent-filter>
       <action android:name="android.intent.action.MAIN"/>
       <category android:name="android.intent.category.LAUNCHER"/>
     </intent-filter>
   </activity>
   <span style="color:#ff0000">
     <activity android:name="om.google.android.gms.ads.AdActivity"
       android:configChanges="keyboard|keyboardHidden|orientation|screenLayout|uiMode|screenSize|smallestScreenSize"/></span>
 </application>
</manifest>
```
## Permissions
---
Making ad requests requires these permissions to be declared in the manifest:<br>
`'INTERNET"` is required, used to access the Internet to make ad requests. While<br>
`'ACCESS_NETWORK_STATE"` is optional,u sed to check if an internet connection is available prior to making an ad request.。<br>

```xml
 <?xml version="1.0" encoding="utf-8"?>
 <manifest xmlns:android="http://schemas.android.com/apk/res/android"
          package="com.company"
          android:versionCode="1" android:versionName="1.0">
  <application android:icon="@drawable/icon" android:label="@string/app_name"
               android:debuggable="true">
    <meta-data android:name="com.google.android.gms.version"
               android:value="@integer/google_play_services_version"/>
    <activity android:label="@string/app_name" android:name="BannerExample">
      <intent-filter>
        <action android:name="android.intent.action.MAIN"/>
        <category android:name="android.intent.category.LAUNCHER"/>
      </intent-filter>
    </activity>
    <activity android:name="com.google.android.gms.ads.AdActivity"
              android:configChanges="keyboard|keyboardHidden|orientation|screenLayout|uiMode|screenSize|smallestScreenSize"/>
  </application>
  <span style="color:#ff0000"><uses-permission android:name="android.permission.INTERNET"/>
  <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/></span>
 </manifest>
```

# Banner Ad
---
To display banners in your Android app, simply add a com.google.android.gms.ads.AdView to your UI.


The five lines of code it takes to add a banner:

* Import `com.google.android.gms.ads.*`
* Declare an AdView instance
* Create it, specifying the ad unit ID
* Add the view to the UI
* Load it with an ad

The easiest place to do all this is in your app's Activity.

```Java
  import com.google.android.gms.ads.*;

  public class BannerExample extends Activity {
  private AdView adView;

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.main);

    // Create the adView.
    adView = new AdView(this);
    adView.setAdUnitId(MY_AD_UNIT_ID);
    adView.setAdSize(AdSize.BANNER);

    // Lookup your LinearLayout assuming it's been given
    // the attribute android:id="@+id/mainLayout".
    LinearLayout layout = (LinearLayout)findViewById(R.id.mainLayout);

    // Add the adView to it.
    layout.addView(adView);

    // Initiate a generic request.
    AdRequest adRequest = new AdRequest.Builder().build();

    // Load the adView with the ad request.
    adView.loadAd(adRequest);
  }

  @Override
  public void onPause() {
    adView.pause();
    super.onPause();
  }

  @Override
  public void onResume() {
    super.onResume();
    adView.resume();
  }

  @Override
  public void onDestroy() {
    adView.destroy();
    super.onDestroy();
   }
 }
```
For more about banner: [here][13]

# Interstitial Ad
---
Usage is nevertheless very similar to AdView:

* Import `com.google.android.gms.ads.*`
* Declare the instance
* Create it, specifying an AdMob Ad Unit ID distinct from any used for banners

Once again, the easiest place to do this is somewhere in your app's Activity.

```Java
 import com.google.android.gms.ads.*;
 public class BannerExample extends Activity {

  private InterstitialAd interstitial;

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.main);

    // Create the interstitial.
    interstitial = new InterstitialAd(this);
    interstitial.setAdUnitId(MY_AD_UNIT_ID);

    // Create ad request.
    AdRequest adRequest = new AdRequest.Builder().build();

    // Begin loading your interstitial.
    interstitial.loadAd(adRequest);

  }
// Invoke displayInterstitial() when you are ready to display an interstitial.
  public void displayInterstitial() {
    if (interstitial.isLoaded()) {
      interstitial.show();
     }
   }
 }
```

# Download Sample Code
--------------------
[Download Sample Code]

  [here]: https://developers.google.com/admob/android/quick-start
  [a]: https://www.google.com/admob/
  [1]:  {{site.imgurl}}/AdMobScreenshotEnglishAndroid1.jpg
  [2]:  {{site.imgurl}}/Admob2_eng.png
  [3]:  {{site.imgurl}}/Admob3_eng.png
  [4]:  {{site.imgurl}}/Admob4-Android_eng.png
  [5]:  {{site.imgurl}}/Admob5-Android_eng.png
  [6]:  {{site.imgurl}}/AdMobScreenshotEnglishAndroid6.jpg
  [7]:  {{site.imgurl}}/Admob7-Android_eng.png
  [8]:  {{site.imgurl}}/AdMobDefaultAdNetWork.jpg
  [9]:  {{site.imgurl}}/AdMobLibJarFiles.jpg
  [10]: {{site.imgurl}}/GooglePlay_Properties.png
  [11]: {{site.imgurl}}/GooglePlay_Addlib.png
  [12]: {{site.imgurl}}/GooglePlay_Addlib2.png
  [Download Sample Code]: {{site.baseurl}}/android/download/#admob
  [Android SDK]: https://developer.android.com/sdk/index.html
  [Android instructions]: https://developer.android.com/google/play-services/setup.html
  [13]: https://developers.google.com/admob/android/banner
