---
layout:         "android"
title:          "Android - 开屏广告 "
lead:           "Android - Splash"
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-cn/android/splash/
lang:           "zh-cn"
---
## 完成串接指示
---
若您尚未完成串接广告形式前的串接说明，请先前往[串接说明]完成相关设定

# 概要
--------
在原先等待应用程式开启的时间，以开屏广告来作为完美的转场效果，除了以自然且立即的方式呈现适合的广告内容以提升使用者体验，也可在此处结合应用程式商标，让使用者产生印象并留下深刻记忆。

<img class="width-400" src="{{site.imgurl}}/Splash_Android.png" alt="successful result example">

在应用程式中建立原生广告需要执行以下六个步骤：

1. 汇入 Vpon SDK
2. 于应用程式建立 Activity 命名为 SplashActivity ，并于 manifest 设定为 LAUNCHER 页面并且为 PORTRAIT
3. 于 SplashActivity 实作 VpadnAdSplashListener 监听器并覆写所有监听器
4. 使用 RelativeLayout 设计 Splash View layout
5. 建立 VpadnSplashAd 物件并设监听器，呼叫 loadAd method
6. 应用程式重启即可显示开屏

# 开始撰写 Splash Ad
--------
首先汇入 SDK。如果是使用横幅、插页、原生广告的应用程式，Mainfest 的相关设定请参考[串接说明]。如欲加入开屏广告请在 Mainfest 参考以下设定

```java
import com.vpadn.ads.*;
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

## 建立 VpadnSplash 物件并请求广告
--------
在 SplashActivity 实作中初始化 VpadnSplashAd 物件，完成指定 License Key 及 splashView 后，并设置监听器即可请求广告。

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

## 开屏广告 Callback
--------
完成请求开屏广告后，下述五个函数可回传目前广告的各式状态，包含：

1. 请求成功并显示
2. 请求失败
3. 广告被点击
4. 即将离开应用程式
5. 广告允许被关闭

当广告`请求成功并显示`会透过 `onVpadnSplashReceived` 通知；请求失败会透过 `onVpadnFailedToReceiveAd` 通知。
广告会自动加载在指定的 splashView 上，应用程式无需做额外的处理。此外每则广告皆独立的显示时间，当显示时间到达标准会透过 `onVpadnSplashAllowToDismiss` 通知允许关闭广告。

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

# 解构 VpadnSplashAd 物件
--------
关闭开屏广告时，需于系统 OnDestroy 顺带呼叫 `vpadnSplashAd.onDestroy()`。

# 下载范例
--------
[前往下载][1]

[串接说明]: {{site.baseurl}}/zh-cn/android/integration-guide/
[说明]: {{site.baseurl}}/zh-cn/android/registration/
[1]: {{site.baseurl}}/zh-cn/android/download/
[请参阅]: {{site.baseurl}}/zh-cn/android/mediation/mopub/
