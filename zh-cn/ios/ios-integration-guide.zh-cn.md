---
layout: "ios"
title: "iOS - 串接说明"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-cn/ios/integration-guide/
lang: "zh-cn"
---
# Vpon SDK 基本使用
---
1. 请先从注册网址检查您的Ad Network平台<br>
Taiwan平台为: <http://tw.pub.vpon.com/><br>
China平台为: <http://cn.pub.vpon.com/><br>

2. 如果您申请的是Taiwan的平台，请使用:`vpadnAd.platform = @"TW"`;

3. 如果您申请的是China的平台，请使用:`vpadnAd.platform = @"CN"`;

4. 在 iOS8 之后如果没有看到 `didImpression`， 可能是因为 window 没有预设大小的关系，需要手动去setFrame设定大小。串接**横幅广告**时会进行`遮蔽侦测`，该侦测可能会导致部分广告被遮蔽而使广告无法通过遮蔽侦测，进而无法显示`didImpression`，请注意！看到 `didImpression`的log才是正确的串接完成。

# 总览
---
若要在 iOS 应用程式中显示 Vpon 广告，只要在您的 Xcode 专案中导入 SDK，然后在使用者介面中加入相关指令就行了。

# 需求条件
---
Vpon 广告 iOS 版的 SDK 需搭配 iOS 5.x 或更新版本 以及 XCode 4.4 或更新版本。

# 导入 SDK
---

Vpon 提供以下两种串接广告 SDK的方式：

* [精简 (使用 CocoaPods)](#cocoapods)<br>
* [手动 (手动下载并串接)](#manual-sdk)<br>
<br>

## 精简 (使用 CocoaPods) {#cocoapods}

> * CocoaPods 负责管理 Xcode 专案的程式库相依性，开发者可以利用此方式快速的串接 SDK。如果机器上未安装 CocoaPods，请参阅 CocoaPods [安装指南](https://cocoapods.org/)。
> * 提醒您，使用 CocoaPods 串接 SDK 只对 `iOS 7.0` 以上有效。

1.建立 Podfile

使用终端机至新建立的专案档相同的目录中，执行 `pod init` 来进行初始化，在该目录下产生档案 `PodFile`。
开启 PodFile 档，将设定开发平台版本的叙述取消注解，填入对应的 iOS 版本。

并在 target 中加入欲使用的 SDK 版本，以`有无指定 SDK 版本`来区分：

* 无指定版本，自动下载最新版本`(建议使用)`：填入 `pod 'VpadnSDK'`
* 有指定版本(以 SDK 4.6.0 为例)：填入`pod 'VpadnSDK', '~>4.6.0'`

![]({{site.imgurl}}/cocoapods_1.png)

2.执行 pod install

修改完 PodFile 后，`请关闭专案档 (.xcodeproj)`，在终端机 (在与 Podfile 相同的目录中) 上执行 `pod install`。
安装完成后，专案资料夹中多了新的专案档 (.xcworkspace)，专案中应会包含 Pods 专案，并含 Pods/VpadnSDK 目录。

![]({{site.imgurl}}/cocoapods_2.png)

> 若要更新至最新的 SDK，执行终端机 (在与 Podfile 相同的目录中) 上的 `pod update`。这个指令会自动撷取最新的 pods，在应用程式中提供参考。

<br>

## 手动 (手动下载并串接) {#manual-sdk}

Vpon 提供以下两种手动串接广告的 SDK，择一即可:<br>

* [Framework SDK (iOS 7.0+)](#framework-sdk)<br>
* [Fundamental SDK (iOS 5.0+)](#fundamental-sdk)

这两个 SDK 其实提供的功能一样，差别在于，iOS 版本需求较高的 Framework SDK 的串接较简单、轻便

### Framework SDK

若您的 app 使用客群是 iOS 7 以上，我们建议您使用 Framework SDK。

Framework SDK 是一包 dynamic library，它会动态抓取 framework reference, headers 还有 Fundamental SDK 内的程式码，因此对您的广告串接而言：步骤少、容量也小。

#### 导入 Framework SDK

首先，对专案按下右键，选择 `Add Files to your_project`
<img src="{{site.imgurl}}/ios_framework_1.png" alt="" class="width-300" />

接着，加入 `VpadnSDKAdKit.framework` 至专案中
![]({{site.imgurl}}/ios_framework_2.png)

记得，至专案设定选项中的 `General` 下方确认一下 `Linked Frameworks and Libraries` 内是否已加入此 framework
![]({{site.imgurl}}/ios_framework_7.png)

至专案设定选项中的 `Build Settings`下的 `Other Linker Flags`输入`-ObjC`
![]({{site.imgurl}}/ios_framework_6.png)

最后，至专案中透过 “@import VpadnSDKAdKit” 引入 SDK

```objc
@import VpadnSDKAdKit
```
![]({{site.imgurl}}/ios_framework_5.png)

> **Note:** <br>
> 再次提醒您 Framework SDK **只对 iOS 7.0 以上的装置有用**。
> 若您的 app 还支援 7.0 以下的装置，请勿使用此 framework，而是使用 [Fundamental SDK](#fundamental-sdk)。



### Fundamental SDK
解压缩后的 SDK 包含Objective-C 标头、一个执行期间程式库 要在应用程式中加入 Vpon 广告，您必须完成三个步骤：

1. 在专案中加入 `libAdOn.a`， `VpadnBanner.h` 与 `VpadnInterstitial.h`
2. 加入相关所需的 framework
3. 在 `Build Settings` 内 `Other Linker Flags` 请填入 `-all_load` 与 `-ObjC`，并把 `Summary` 下把 `AdSupport` 设为 `Optional`

> **Note**: 上述三项缺一不可，请务必完成！

#### 新增 SDK lib
1. 解压缩后的 SDK 包含一个 lib 档、及两个标头档。 对 Xcode 中的专案按一下滑鼠右键，然后选取 [Add Files to "Vpadn_BannerInter_x5"...] (在 "Vpadn_BannerInter_x5" 中新增档案)。
![IOS-add-file_vpadn.png]
2. 接着在 SDK 中选取 `libAdOn.a`, `VpadnBanner.h` 与 `VpadnInterstitial.h`
<img src="{{site.imgurl}}/IOS-add-lib&header_vpadn.png" alt="" class="width-300"/>

### 新增 Framework
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

欲加入这些 Framework，请对 Vpadn_BannerInter_x5 这个专案名称按两下滑鼠，开启 `Build Phases` 分页下的 `Link Binary With Libraries` 下拉式选单，然后用画面上出现的 `+` 按钮加入 iOS SDK 中的架构。
![IOS-add-frameworks_vpadn]



# 下载
---
[前往下载](../download)


# App Transport Security
---
iOS10 更新了安全条款 App Transport Security (ATS)，请参考[这篇]来修改部份设定

# 其他诀窍
请参阅[横幅广告](../banner)、[插页广告](../Interstitial)、[中介服务](../mediation)中获取更多简介。


[IOS-add-file_vpadn.png]: {{site.imgurl}}/IOS-add-file_vpadn.png
[IOS-add-frameworks_vpadn]: {{site.imgurl}}/IOS-add-frameworks_vpadn.png
[这篇]: {{site.baseurl}}/zh-cn/ios/latest-news/ios10ats/
