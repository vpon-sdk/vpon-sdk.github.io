---
layout:         "android"
title:          "Android - 串接说明"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       zh-cn/android/integration-guide/
lang:           "zh-cn"
---

# 串接准备
---
在开始串接 SDK 前，请确认您已经拥有 Vpon 开发商帐号，并已经取得您的 License ID。如果您还没完成注册，请先[注册帐号]。

取得 Vpon 开发商帐号后，请参考以下说明完成 Vpon Android SDK 的串接：

1. 导入 SDK 到您的专案中
2. 在 AndroidManifest.xml 中宣告 com.vpadn.widget.VpadnActivity
3. 在 AndroidManifest.xml 中设定必要的 Permission

# 导入 SDK
----------
Vpon 提供以下两种串接广告 SDK 的方式：

* [精简 (搭配 Maven)](#maven)
* [手动 (手动下载并串接)](#manual-sdk)

> **Note**：若您曾使用过旧版 SDK，请先阅读：[如何升级 SDK 版本](../../android/latest-news/update-to-SDK4_5_1+/)

## 精简 (搭配 Maven) {#maven}
---
> **Note**：Maven 是一个项目管理及项目自动建构的工具，如果您还没在开发用的装置中安装过 Maven，请参考 [Maven 安装指南](https://maven.apache.org/)。

开启 Android Studio Project 层级的 `build.gradle` 档案，在下方所示在 allprojects 的 repositories 加入 Maven Repository

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

加入 Maven Repository 后，即可在 App 层级下的 `build.gradle` 加入 Vpon SDK 指定版本的编译相依性( 此处以 SDK 4.7.0为例 )

```javascript
dependencies {
    ...
    compile 'com.vpon:vpadnSDK:4.7.0'
}
```

> **Note**：若要更新 SDK，可改为 implementation ``'com.vpon:vpadnSDK:4.7.+'``，即可获取 SDK 版本号 4.7 中最新的版本。

## 手动 (手动下载并串接) {#manual-sdk}

要手动在应用程式中加入 Vpon SDK，您必须完成以下步骤：

1. [由此下载最新版本的 Vpon SDK](../download)
2. 在 Android Studio / Eclipse 专案中加入 Vpon SDK

### Eclipse
1. 在 Eclipse 中的应用程式专案上按一下滑鼠右键，并选择 `Properties`。
<img src = "{{site.imgurl}}/A-sdk330-01.png" alt="elcipse-img1" class="width-400">

2. 选取 `Java Build Path` (Java 建构路径) 和 `Libraries` (程式库) 分页，然后按一下 `Add External JARs...` (新增外部 JAR...)，加入 Vpon 广告 JAR。
![]({{site.imgurl}}/A-sdk330-02.png)

### Android Studio
1. 在 Android 中的应用程式专案找到 `libs` (途径：`project_name` -> `app` -> `libs`)
![]({{site.imgurl}}/ProjectLibFolder.jpg)

2. 滑鼠右键点选 `libs` 后，左键点选 [Reveal in Finder]
![]({{site.imgurl}}/DropJarFileToLibFolder.jpg)

3. 将下载下来的 JAR 档复制到 `libs` 资料夹 (也可以直接拖移 Vpon JAR 至专案的 `libs`)
![]({{site.imgurl}}/MainInterface.jpg)

4. 回到 Android 专案，`libs` 会多出一个 Vpon 的 JAR 档案，对它按下右键选则 [Add as library]。也请到 app 下的 build.gradle 确认，如范例显示，将会有一行 compile files('libs/vpon_SDK_version_name.jar') 表示 JAR 被读到了
![]({{site.imgurl}}/ModifyBuildGradle2.jpg)

# 宣告 VpadnActivity
---
请在您的 AndroidManifest.xml 加入以下内容：

```xml
<activity
  android:name="com.vpadn.widget.VpadnActivity"
  android:configChanges="orientation|keyboardHidden|navigation|keyboard|screenLayout|uiMode|screenSize|smallestScreenSize"
  android:theme="@android:style/Theme.Translucent"
  android:hardwareAccelerated="true">
</activity>
```

> **Note**： 上面**每一个**属性都不能少,其值都需要相同！

<br>

# 加入 Permissions
---
请在您的 AndroidManifest.xml 加入以下内容：

```xml
  <uses-permission android:name="android.permission.INTERNET"/>
  <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
  <uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>
  <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
```
以上五个为必要的 permission，另外建议您可以额外开启以下 permission，提供更精准的定位讯息来取得地理位置相关的广告


```xml
  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
```

此外，由于 Vpon SDK 4 开始支援影音形式的广告，建议您在放广告的 Activity 中加入硬体加速，请参考如下：


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

# Tips
---
关于更多广告形式的呈现，请参考：

* [横幅广告][1]
* [插页广告][2]
* [原生广告][3]
* [中介服务][4]

[注册帐号]: {{ site.baseurl }}/zh-cn/android/registration/
[1]:{{ site.baseurl }}/zh-cn/android/banner/
[2]:{{ site.baseurl }}/zh-cn/android/interstitial/
[3]:{{ site.baseurl }}/zh-cn/android/native/
[4]:{{ site.baseurl }}/zh-cn/android/mediation/