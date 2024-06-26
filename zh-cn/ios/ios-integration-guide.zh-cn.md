---
layout: "ios"
title: "iOS - 串接说明"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-cn/ios/integration-guide/
lang: "zh-cn"
---
# 串接准备
---
在开始串接 SDK 前，请确认您已经拥有 Vpon 开发商帐号，并已经取得您的 License Key。如果您还没完成注册，请先[注册帐号]。

取得 Vpon 开发商帐号后，只要在您的 Xcode 专案中导入 SDK，并在程式码中加入相关指令即可。

# 导入 SDK
---
您可以使用 Cocoapods 来导入 Vpon SDK。

CocoaPods 负责管理 Xcode 专案的程式库相依性，开发者可以利用此方式快速的串接 SDK。如果您还未在开发用的装置上安装 CocoaPods，请参阅 [CocoaPods 安装指南](https://cocoapods.org/)。

### 1. 建立 Podfile

1.1 使用 Terminal，并将路径移至 Xcode 专案的目录中，执行 `pod init` 进行初始化。初始化后，会在该目录下产生档案 `Podfile`。<br>
1.2 开启 Podfile，将设定开发平台版本的叙述取消注解，填入对应的 iOS 版本<br>
1.3 在 target 中加入欲导入的 SDK 版本，以`有无指定 SDK 版本`来区分：

* 无指定版本，自动下载最新版本`(建议使用)`：填入 `pod 'VpadnSDK'`
* 有指定版本(以 SDK {{site.i_version}} 为例)：填入`pod 'VpadnSDK', '~>{{site.i_version}}'`

![]({{site.imgurl}}/cocoapods_1.png)

### 2. 执行 pod install

修改完 PodFile 后，`请关闭专案 (.xcodeproj)`，将终端机路径移至与 Podfile 相同的目录中，执行 `pod install`。
安装完成后，专案资料夹中多了新的专案档 (.xcworkspace)，点击专案档(.xcworkspace)即可重新开启专案，专案中应会包含 Pods 专案及 Pods/VpadnSDK 目录。

![]({{site.imgurl}}/cocoapods_3.png)

> **Note**：若要更新至最新的 SDK，请将终端机路径移至 Podfile 相同的目录中，执行 `pod repo update` 撷取最新的 Pods，再执行 `pod install` 重新安装 SDK。

<!-- ## 手动 (手动下载并串接) {#manual-sdk}

在开始进行手动串接前，请先[由此下载最新版本的 Vpon SDK](../download)。

### 导入 Framework SDK

首先，对专案按下右键，选择 `Add Files to your_project`
<img src="{{site.imgurl}}/ios_framework_8.png" alt="" class="width-300" />

接着，将 `VpadnSDKAdKit.xframework` 加至专案中
![]({{site.imgurl}}/ios_framework_9.png)

请至专案设定选项中的 `General` 标签下确认 `Linked Frameworks and Libraries` 内是否已加入此 framework
![]({{site.imgurl}}/ios_framework_10.png)

再切换到专案设定选项中的 `Build Settings`标签，在 `Other Linker Flags`输入`-ObjC`
![]({{site.imgurl}}/ios_framework_6.png)

最后，在专案程式码中加入 “@import VpadnSDKAdKit” 导入 SDK

```objc
@import VpadnSDKAdKit
```
![]({{site.imgurl}}/ios_framework_5.png) -->


<!-- ### Fundamental SDK

**Note:** Vpon 将从 SDK v5.3.1 后停止支援 Fundamental SDK，如果您仍在使用 Fundamental SDK，我们建议您尽快改为使用 Framework SDK。

解压缩后的 SDK 包含 Objective-C 标头、一个执行期间程式库。要在应用程式中加入 Vpon 广告，您必须完成三个步骤：

1. 在专案中加入 `ios-vpadn-sdk.a` 及 Header 档
2. 加入相关所需的 framework
3. 修改 Build Settings 中的设定

> **Note**：上述三项缺一不可，请务必完成！

#### 1. 新增 SDK lib
1.1 解压缩后的 SDK 包含一个 .a 档、及数个标头档。对 Xcode 中的专案按一下滑鼠右键，然后选取 [Add Files to your_project...] (在 "your_project" 中新增档案)。
![IOS-add-file_vpadn.png]
1.2 接着在 SDK 中选取 `libAdOn.a`, `VpadnBanner.h` 与 `VpadnInterstitial.h` 等档案
<img src="{{site.imgurl}}/IOS-add-lib&header_vpadn.png" alt="" class="width-300"/>

### 2. 新增 Framework
SDK lib 会参照 iOS 的 framework，因此您必须加入必要的 framework。<br>

`AdSupport`, <br>
`AssetsLibrary`, <br>
`AudioToolbox`, <br>
`AVFoundation`, <br>
`CoreFoundation`, <br>
`CoreGraphics`, <br>
`CoreLocation`, <br>
`CoreMedia`, <br>
`CoreMotion`, <br>
`CoreTelephony`, <br>
`EventKit`, <br>
`Foundation`, <br>
`MediaPlayer`, <br>
`MessageUI`, <br>
`MobileCoreServices`, <br>
`QuartzCore`, <br>
`Security`, <br>
`StoreKit`, <br>
`SystemConfiguration`, <br>
`UIKit`

欲加入这些 Framework，请先点击您的专案，开启 `Build Phases` 标签下的 `Link Binary With Libraries` 选单，点 `+` 加入 iOS SDK 中的架构。
![IOS-add-frameworks_vpadn]

#### 3. 修改 Building Settings 中的设定

在 `Build Settings` 内 `Other Linker Flags` 请填入 `-all_load` 与 `-ObjC`，并把 `Summary` 下的 `AdSupport` 设为 `Optional` -->


# 初始化 SDK {#initial-sdk}
---
请务必参考以下指示初始化 SDK。

### Objective-C

```objc
// Using Vpon SDK v560 and above
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

    // Vpon SDK initialization
    VponAdConfiguration *config = VponAdConfiguration.shared;
    config.logLevel = VponLogLevelDefault;
    [config initializeSdk];

    return YES;
}

// Using Vpon SDK v560 below
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

    // Vpon SDK initialization
    VpadnAdConfiguration *config = [VpadnAdConfiguration sharedInstance];
    config.logLevel = VpadnLogLevelDefault;
    [config initializeSdk];

    return YES;
}
```

### Swift

若您是使用 Swift，请在您的 AppDelegate.swift 中，加入以下程式码：

```swift
// Using Vpon SDK v560 and above
 func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions:      
    [UIApplicationLaunchOptionsKey: Any]?) -> Bool {

        // Vpon SDK initialization
        let config = VponAdConfiguration.shared
        config.logLevel = .default
        config.initializeSdk()

        return true
    }

// Using Vpon SDK v560 below
 func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions:      
    [UIApplicationLaunchOptionsKey: Any]?) -> Bool {

        // Vpon SDK initialization
        let config = VpadnAdConfiguration.sharedInstance()
        config.logLevel = .default
        config.initializeSdk()

        return true
    }
```

>**Note:**
>
>* 为配合第三方追踪要求，Vpon SDK 会在初始化时，将 App 的 Audio Session Category 设为`AVAudioSessionCategoryPlayBack / OptionsWithMixWithOthers` (当有音乐要播放时，App 将以混音形式播放音乐，且不会受实体音量键的影响)。您可以在初始化后，重新指定及启用 Audio Session Category。如果您不希望 Vpon SDK 更动 Audio Session Category，请参考[进阶设定]进行对应调整。
>
>* 自 v5.6.0 起，Vpon SDK 将逐步停止支援已弃用的 v5.5.0 以下的 SDK 方法，请依照本站文件指引完成 SDK 串接，且不要使用未在文件中描述如何使用的介面，以免发生错误


# Usage Description
---

Vpon SDK 支援多种表现形式广告的呈现，为了展示特定类型广告，以下为 Vpon SDK 中可能使用到的权限：
    
```xml
<key>NSCalendarsUsageDescription</key>
<key>NSCameraUsageDescription</key>
<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<key>NSLocationUsageDescription</key>
<key>NSLocationWhenInUseUsageDescription</key>
<key>NSPhotoLibraryUsageDescription</key>
```

>**Note:** 当您完成 Vpon SDK 的串接并将 App 送审 App Store 时，可能会需要针对上述权限功能的使用增加对应的描述，以 Calendar 为例，可以描述为：App 中有内容需要记录在行事历上


<!-- # App Transport Security
---
iOS9 更新了安全条款 App Transport Security (ATS)，请参考 [iOS9 ATS] 来修改部份设定 -->

# Tips
---
关于更多广告形式的呈现，请参考：

* [横幅广告][1]
* [插页广告][2]
* [原生广告][3]
* [中介服务][4]


[IOS-add-file_vpadn.png]: {{site.imgurl}}/IOS-add-file_vpadn.png
[IOS-add-frameworks_vpadn]: {{site.imgurl}}/IOS-add-frameworks_vpadn.png
[iOS9 ATS]: {{site.baseurl}}/zh-cn/ios/latest-news/ios9ats/
[Adapter or Custom Events]: {{site.baseurl}}/zh-cn/ios/download/#adapter-download
[Sample Codes]: {{site.baseurl}}/zh-cn/ios/download/#sample-code-download

[注册帐号]: {{ site.baseurl }}/zh-cn/ios/registration/
[1]:{{ site.baseurl }}/zh-cn/ios/banner/
[2]:{{ site.baseurl }}/zh-cn/ios/interstitial/
[3]:{{ site.baseurl }}/zh-cn/ios/native/
[4]:{{ site.baseurl }}/zh-cn/ios/mediation/
[5]:{{ site.baseurl }}/zh-cn/ios/outstream/
[进阶设定]:{{ site.baseurl }}/zh-cn/ios/advanced/#audio