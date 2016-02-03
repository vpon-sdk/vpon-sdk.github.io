---
layout:         "android"
title:          "Android - Admob 使用串接"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       zh-cn/android/mediation/admob/
lang:           "zh-cn"
---

# Google AdMob mediation
--------
Google AdMob mediation 请看[这裡]

# Admob Mediation 操作图示
-----

1. 请[登入]
![1]

2. 盈利 -&gt; 透过新应用程式盈利
![][2]

3. 选取应用程式:<br>
  (1) 填入 app name <br>
  (2) 选取平台 <br>
  (3) 点选 “新增应用程式" <br>
![][3]

4. 选取广告格式并对广告单元命名:<br>
 (1) 选择横幅广告或者插页广告 <br>
 (2) 设定  <br>
 (3) 广告单元名称(ex. Vpon\_Banner) <br>
 (4) 储存
![][4]

5. 得到一组广告单元编号，选取完成
![][5]

6. 编辑中介服务
![][6]

7. 新增广告连播网
![][7]

8. 设定Vpon进入您的聚合列表：
(1) 在可用的广告联播网中找到 Vpon
(2) Vpon Ad Id: 填入您在 Vpon 后台申请的版位ID
(3) Zone: 选择您欲请求的广告平台的地区
(例：如果您的 App 是欲给大陆平台使用者使用，则您需在此栏位中填入`cn`，若您 app 是给除了大陆平台以外地区使用者使用则填入`tw`)

![][8]


# 串接 Vpon 进专案
您需将载入两个 Jar 档进入您专案中的 libs 资料夹，分别是：admob-adapter-\*\*\*\*.jar 和 vpadn-sdk-\*\*\*-\*\*\*-\*\*\*.jar.
![][9]



# 需求条件
-----
1. 请确认您已安装最新版的[Android SDK]，并至少在 Android v3.2 (target in project.properties to android-13)下编译。
2. Google Mobile Ads SDK可在Android 2.3以上的版本(在 AndroidManifest.xml 设定 android:minSdkVersion 为至少 9)执行。

# 导入SDK
---
以下的步骤为将Google Mobile Ads SDK 导入您的 App 中:

1. 新增并 reference Google Play Services library到您的 Eclipse/Android Studio workspace.
2. 在 AndroidManifest.xml中新增 meta-data tag.
3. 在 AndroidManifest 中宣告 com.google.android.gms.ads.AdActivity.
4. 在 manifest 中加入 permissions

## Google Play Services library
请先安装设定 Google Play Service SDK: [Android instructions]

### Eclipse
---
a.在您的应用程式专案中按右键并选择 `properties`

![][10]

b.选择 Android -&gt;
`Add...` 寻找 google-play-services\_lib 内容后按下 OK 新增 Google Play Services library.

![][11]

如图示，您的专案已经 reference Google Play Services library.

![][12]

### Android Studio
---
1. 请打开 `app` 模组下的 `build.gradle`
> **Note**: Android Studio 专案下有两个 `build.gradle`，请小心以免搞溷

2. 增加 build rule 在 dependencies 底下，已取得最新版 `play-services`

```groovy
apply plugin: 'com.android.application'
    ...

    dependencies {
      compile 'com.google.android.gms:play-services:+'
    }
```
接着，存挡并至 toolbar 点选 **Sync Project with Gradle Files**

## 新增 meta-data tag
Google Play Service 需要在 AndroidManifest.xml 中加入以下设定:

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

## 宣告 AdActivity
---
Mobile Ads SDK 需要在 AndroidManifest.xml 中宣告 com.google.android.gms.ads.AdActivity

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
加入以下 permission 在您的 AndroidManifest.xml<br>
`'INTERNET"` 此为必要，以开啓网路功能进行传输。<br>
`'ACCESS_NETWORK_STATE"` 此为选择，用来读取使用者当前的网路状态。<br>

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

# Banner 横幅广告
---
要在您的 Android app 中展示横幅广告，只需要简单的新增 com.google.android.gms.ads.AdView 到您的使用者介面。
新增 com.google.android.gms.ads.AdView

利用以下五个步骤新增出一个横幅广告:
• 汇入 com.google.android.gms.ads.*
• 宣告一个 AdView物件
• 建立并指定一个 ad unit ID
• 在使用者介面中新增 view
• 取得banner

最简易的方法为在您的 Activity 中做出所有的步骤.

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
参考更多的 banner 设定: [here][13]


# Interstitial 插页广告
---
和 AdView 的使用方式相似:
• 汇入 `com.google.android.gms.ads.*`
• 宣告物件
• 建立并指定一个和banner不同的 AdMob Ad Unit ID。

同样的，最方便的方式为在您的 Activity 中做以下的步骤。

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

# 下载 Sample Code
--------------------
[Download Sample Code]

  [这裡]: https://developers.google.com/admob/android/quick-start
  [登入]: http://www.google.com/admob/
  [1]:  {{site.imgurl}}/AdMobScreenshotTradChineseAndroid1.png
  [2]:  {{site.imgurl}}/AdMobScreenshotTradChineseAndroid2.png
  [3]:  {{site.imgurl}}/AdMobScreenshotTradChineseAndroid3.png
  [4]:  {{site.imgurl}}/AdMobScreenshotTradChineseAndroid4.png
  [5]:  {{site.imgurl}}/AdMobScreenshotTradChineseAndroid5.png
  [6]:  {{site.imgurl}}/AdMobScreenshotTradChineseAndroid6.png
  [7]:  {{site.imgurl}}/AdMobScreenshotTradChineseAndroid7.png
  [8]:  {{site.imgurl}}/AdMobScreenshotTradChineseAndroid8.png
  [9]:  {{site.imgurl}}/AdMobLibJarFiles.jpg
  [10]: {{site.imgurl}}/GooglePlay_Properties.png
  [11]: {{site.imgurl}}/GooglePlay_Addlib.png
  [12]: {{site.imgurl}}/GooglePlay_Addlib2.png
  [Download Sample Code]: {{site.baseurl}}/zh-cn/android/download/#admob
  [Android SDK]: https://developer.android.com/sdk/index.html
  [Android instructions]: https://developer.android.com/google/play-services/setup.html
  [13]: https://developers.google.com/admob/android/banner
