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

Vpon 提供以下两种串接广告 SDK的方式：

* [精简 (使用 CocoaPods)](#cocoapods)
* [手动 (手动下载并串接)](#manual-sdk)

## 精简 (使用 CocoaPods) {#cocoapods}

> **Notice**：CocoaPods 负责管理 Xcode 专案的程式库相依性，开发者可以利用此方式快速的串接 SDK。如果您还未在开发用的装置上安装 CocoaPods，请参阅 [CocoaPods 安装指南](https://cocoapods.org/)。

### 1. 建立 Podfile

1.1 使用终端机，并将路径移至 Xcode 专案的目录中，执行 `pod init` 进行初始化。初始化后，会在该目录下产生档案 `Podfile`。<br>
1.2 开启 Podfile，将设定开发平台版本的叙述取消注解，填入对应的 iOS 版本<br>
1.3 在 target 中加入欲导入的 SDK 版本，以`有无指定 SDK 版本`来区分：

* 无指定版本，自动下载最新版本`(建议使用)`：填入 `pod 'VpadnSDK'`
* 有指定版本(以 SDK {{site.i_version}} 为例)：填入`pod 'VpadnSDK', '~>{{site.i_version}}'`

![]({{site.imgurl}}/cocoapods_1.png)

### 2. 执行 pod install

修改完 PodFile 后，`请关闭专案 (.xcodeproj)`，将终端机路径移至与 Podfile 相同的目录中，执行 `pod install`。
安装完成后，专案资料夹中多了新的专案档 (.xcworkspace)，点击专案档(.xcworkspace)即可重新开启专案，专案中应会包含 Pods 专案及 Pods/VpadnSDK 目录。

![]({{site.imgurl}}/cocoapods_2.png)

> **Notice**：若要更新至最新的 SDK，请将终端机路径移至 Podfile 相同的目录中，执行 `pod repo update` 撷取最新的 Pods，再执行 `pod install` 重新安装 SDK。

## 手动 (手动下载并串接) {#manual-sdk}

Vpon 提供以下两种手动串接的广告 SDK，请择一使用即可：

* [Framework SDK](#framework-sdk)
* [Fundamental SDK](#fundamental-sdk)

Framewrok 及 Fundamental SDK 提供一样的功能，主要的差别在于对 iOS 版本需求较高的 Framework SDK 串接较简单、轻便。

在开始进行手动串接前，请先[由此下载最新版本的 Vpon SDK](../download)。

### Framework SDK

我们建议您使用 Framework SDK，因为 Framework SDK 是一包 dynamic library，它会动态抓取 framework reference, headers 还有 Fundamental SDK 内的程式码，对您的广告串接而言：维护容易、步骤少、容量也小。

#### 1. 导入 Framework SDK

首先，对专案按下右键，选择 `Add Files to your_project`
<img src="{{site.imgurl}}/ios_framework_1.png" alt="" class="width-300" />

接着，将 `VpadnSDKAdKit.framework` 加至专案中
![]({{site.imgurl}}/ios_framework_2.png)

请至专案设定选项中的 `General` 标签下确认 `Linked Frameworks and Libraries` 内是否已加入此 framework
![]({{site.imgurl}}/ios_framework_7.png)

再切换到专案设定选项中的 `Build Settings`标签，在 `Other Linker Flags`输入`-ObjC`
![]({{site.imgurl}}/ios_framework_6.png)

最后，在专案程式码中加入 “@import VpadnSDKAdKit” 导入 SDK

```objc
@import VpadnSDKAdKit
```
![]({{site.imgurl}}/ios_framework_5.png)


### Fundamental SDK
解压缩后的 SDK 包含 Objective-C 标头、一个执行期间程式库。要在应用程式中加入 Vpon 广告，您必须完成三个步骤：

1. 在专案中加入 `ios-vpadn-sdk.a`， `VpadnBanner.h` 与 `VpadnInterstitial.h`
2. 加入相关所需的 framework
3. 修改 Build Settings 中的设定

> **Note**：上述三项缺一不可，请务必完成！

#### 1. 新增 SDK lib
1.1 解压缩后的 SDK 包含一个 .a 档、及两个标头档。对 Xcode 中的专案按一下滑鼠右键，然后选取 [Add Files to your_project...] (在 "your_project" 中新增档案)。
![IOS-add-file_vpadn.png]
1.2 接着在 SDK 中选取 `libAdOn.a`, `VpadnBanner.h` 与 `VpadnInterstitial.h`
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

在 `Build Settings` 内 `Other Linker Flags` 请填入 `-all_load` 与 `-ObjC`，并把 `Summary` 下的 `AdSupport` 设为 `Optional`

# App Transport Security
---
iOS10 更新了安全条款 App Transport Security (ATS)，请参考 [iOS9 ATS] 来修改部份设定

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