---
layout:         "android"
title:          "Android - 串接说明"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       zh-cn/android/integration-guide/
lang:           "zh-cn"
---

# Vpon SDK 基本使用
----
若您曾使用过旧版SDK，请先阅读: [升级最新 SDK 所需修改](../../latest-news/update-to-SDK4_2_x/)

1. 请先从注册网址检查您的 Ad Network 平台: <br>
Taiwan 平台为 <http://tw.pub.vpon.com/> <br>
China  平台为 <http://cn.pub.vpon.com/>

2. 如果您申请的是 Taiwan 的平台，请使用： <br>
`vponBanner = new VpadnBanner(this, bannerId, VpadnAdSize.SMART_BANNER,
“TW”);`

3. 如果您申请的是 China 的平台，请使用： <br>
`vponBanner = new VpadnBanner(this, bannerId, VpadnAdSize.SMART_BANNER,
“CN”);`
<br>


# 系统需求
-----------
Vpon 广告 Android 版的 SDK 需至少搭配 Android 2.1.X 或更新版本使用。请确认您所使用的是最新版的 Android SDK，并依据 Android v4.X 或更新版本进行编译 (将 default.properties 中的 target 设为 android-17)。

# 导入 SDK
----------
要在应用程式中加入 Vpon 广告，您必须完成三个步骤：

1. 在 Android Studio/Eclipse 专案中加入 Vpon SDK 4 JAR
2. 在 AndroidManifest.xml 中宣告 com.vpadn.widget.VpadnActivity
3. 在资讯清单中设定必要的 permissions。


## Eclipse
1. 在 Eclipse 中的应用程式专案上按一下滑鼠右键，并选择 `Properties`。
<img src = "{{site.imgurl}}/A-sdk330-01.png" alt="elcipse-img1" class="width-400">

2. 选取 `Java Build Path` (Java 建构路径) 和 `Libraries` (程式库) 分页，然后按一下 `Add External JARs...` (新增外部 JAR...)，加入 Vpon 广告 JAR。
![]({{site.imgurl}}/A-sdk330-02.png)

## Android Studio
1. 在 Android 中的应用程式专案找到 `libs` (途径：`project_name` -> `app` -> `libs`)
![]({{site.imgurl}}/ProjectLibFolder.jpg)


2. 滑鼠右键点选 `libs` 后，左键点选 [Reveal in Finder]
![]({{site.imgurl}}/DropJarFileToLibFolder.jpg)


3. 将下载下来的 JAR 档複製到 `libs` 资料夹 (也可以直接拖移 Vpon JAR 至专案的 `libs`)
![]({{site.imgurl}}/MainInterface.jpg)



4. 回到 Android 专案，`libs` 会多出一个 Vpon 的 JAR 档案，对它按下右键选则 [Add as library]。也请到 app 下的 build.gradle 确认，如范例显示，将会有一行 compile files('libs/vpon_SDK_version_name.jar') 表示 JAR 被读到了
![]({{site.imgurl}}/ModifyBuildGradle.jpg)


# VpadnActivity
---
加入以下设定在您的 AndroidManifest.xml

```xml
<activity
  android:name="com.vpadn.widget.VpadnActivity"
  android:configChanges="orientation|keyboardHidden|navigation|keyboard|screenLayout|uiMode|screenSize|smallestScreenSize"
  android:theme="@android:style/Theme.Translucent"
  android:hardwareAccelerated="true" >
</activity>
```
> **注意**: 上面**每一个**属性都不能少,其值都需要相同！

<br>

# Permissions
---
加入以下 permission 在您的 AndroidManifest.xml

```java
  <uses-permission android:name="android.permission.INTERNET" />
  <uses-permission android:name="android.permission.READ_PHONE_STATE"/>
  <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
  <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
  <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
```
上面六个是必要的 permission，另外建议您可以开启下面这个 permission，将可以更精准的定位取得地理位置相关的广告


```java
  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
```
另外下面这个 permission 可以提高辨识使用者身分的能力，让广告能更精准的被投放，进而为您带入更多的营收


```java
  <uses-permission android:name="android.permission.GET_ACCOUNTS"/>
```

由于 Vpon SDK 4 有大量的 Video 广告，建议您在你放 Banner 的 Activity 内加入硬体加速，如下


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

# 下载
---
[前往下载]({{site.baseurl}}/android/download)


# 其他诀窍
请参阅[横幅广告](../banner)、[插页广告](../Interstitial)、[中介服务](../mediation)中获取更多简介。
