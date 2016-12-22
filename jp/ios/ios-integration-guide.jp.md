---
layout:         "ios"
title:          "iOS - インテグレーションガイド"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       jp/ios/integration-guide/
lang:            "jp"
---
# Vpon SDK 4 基本編
---
1. まず下記URLから登録済みネットワークプラットフォームを確認してください:<br>
台湾: <http://tw.pub.vpon.com/><br>
中国: <http://cn.pub.vpon.com/><br>

2. 台湾のプラットフォームを利用する場合、以下をご利用ください。
`vpadnAd.platform = @"TW"`;

3. 中国のプラットフォームを利用する場合、以下をご利用ください。
`vpadnAd.platform = @"CN"`;

4.   iOS8にアップデート後、ログに `didImpression` が確認できない場合、原因としてデフォルト設定でウィンドウの幅 x 高さが存在しない可能性が考えられます。setFrame関数をマニュアルで呼び出して調整する必要があります。`didImpression` が正しく実装されているかご確認ください。

# 概要
---
Vponバナー広告は、小さなエリアを利用し、ユーザーにクリックさせることで、ウェブサイトもしくはアプリのダウンロードページなどの情報豊富なフルスクリーンページへ遷移させます。ここではあなたのアプリへバナー広告を配信する方法をご案内します。
iOS アプリでバナー広告を表示させるためには、XcodeプロジェクトにSDKを導入し、ユーザインターフ ェースに VpadnBanner を追加するだけです。

# 要件
---
* iOS 5.x 以降のバージョン
* XCode 4.4 以降のバー ジョン

を組み合わせて使用する必要があります。

# SDK の導入
---

Vpon provides two ways to integrate our SDK :

* [Streamlined Simple? , using CocoaPods,](#cocoapods)<br>
* [Manual, using the SDK download.](#manual-sdk)<br>
<br>

## Streamlined, using CocoaPods {#cocoapods}

> * Please follow the CocoaPods’ [install guidance](https://cocoapods.org/) if it is still uninstalled. Publisher can use CocoaPods, which is a dependency manager for Objective-C Cocoa projects, to integrate Vpon SDK simply and automatically.
> * Remind that Integrated SDK by CocoaPods only support devices in iOS version higher than `7.0`.

1.Create the Podfile

Run `pod init` from the terminal, in the same directory as the project file (.xcodeproj). Open the Podfile which just be generated and uncomment the description about the platform version and revise it to the corresponding one.

In the Podfile, publishers also have to add the description in the `target` about what Vpon SDK version they want to integrate. The description depends on `whether the publishers assign the version of SDK` :

* Unassigned , system will download the latest version automatically `(Recommend)` : input `pod 'VpadnSDK'`
* Assigned (Take SDK 4.6.0 for example) : input `pod 'VpadnSDK', '~>4.6.0'`

![]({{site.imgurl}}/cocoapods_1.png)


2.Run pod install

Please close the project (.xcodeproj) and run `pod install` from the terminal in the same directory after revising the Podfile. Once the installation finishes, a new project (.xcworkspace) file will be generated. This project file should include a Pods project with new dependencies for VpadnSDK.

![]({{site.imgurl}}/cocoapods_2.png)

> In the terminal, run `pod update` in the directory where the Podfile is located if you want to update to the latest Vpon SDK.

<br>

## Manual, using the SDK download {#manual-sdk}

Vpon provides two SDKs serving the same functions for our publishers. You should choose either of these 2 to integrate manually.<br>

* [Framework SDK (iOS 7.0+)](#framework-sdk)<br>
* [Fundamental SDK (iOS 5.0+)](#fundamental-sdk)

There is slight difference between these two SDKs, which we will explain in introduction of Framework SDK.

### Framework SDK
---
Framework SDK is a dynamic library, our latest SDK within any necessary references, headers and lib, needs fewer steps, and is lighter than Fundamental SDK.

However, this convenient way is only for apps designed for iOS version higher than 7.0. If you are targeting at users with devices OS version lower than 7.0, you should definitely choose the [fundamental SDK](#fundamental-sdk) instead.

First, right-click your project and choose `Add Files to your_project`
<img src="{{site.imgurl}}/ios_framework_1.png" alt="" class="width-300" />

Second, add `VpadnSDKAdKit.framework` into your project.
![]({{site.imgurl}}/ios_framework_2.png)

Remember to check whether the framework  in `Linked Frameworks and Libraries` under `General` has been added.
![]({{site.imgurl}}/ios_framework_7.png)

Third, find `Other Linker Flags` under `Build Settings` and input `-ObjC`
![]({{site.imgurl}}/ios_framework_6.png)

Finally, import the framework:

```objc
@import VpadnSDKAdKit
```
![]({{site.imgurl}}/ios_framework_5.png)

> **Note:** <br>
> Remind again that Framework SDK only support devices in iOS version higher than 7.0 and do not use this framework if you are targeting at users with devices OS version lower than 7.0.

### Fundamental SDK

解凍した SDK には、Objective-C ヘッダー、実行期間のライブラリー、READMEテキストが含まれています。アプリにVpon広告を導入するためには、次の3つのステップを完了させてください。

1. プロジェクトに `libAdOn.a` , `VpadnBanner.h` および `VpadnInterstitial.h` を追加します。
2. 必要なフレームワークを追加します。
3. Build Settings 内の Other Linker Flagsに `-all_load` と` -Obj-C` を追加し、また Summary の下で AdSupport を Optional に設定します。

> **Note**: **All three** these steps are necessary!

#### SDK lib の追加
解凍した SDK には、lib ファイル 1 つ・ヘッダーファイル 2つが含まれています。

1. Xcode 内のプロジェクト内で右クリックし、 [Add Files to "Vpadn_BannerInter_x5"...]を選択し"Vpadn_BannerInter_x5" 内でファイルを新規作成します。
![IOS-add-file_vpadn.png]

2. 次に、 SDK 内で `libAdOn.a` , `VpadnBanner.h` および `VpadnInterstitial.h` を選択します。
<img src="{{site.imgurl}}/IOS-add-lib&header_vpadn.png" alt="" class="width-300"/>


#### Framework の追加
The SDK library references the a few iOS development frameworks. <br  >

1.Add all the following frameworks.<br>
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
`UIKit`<br>

これらのフレームワークを追加する場合、 プロジェクト[Vpadn_BannerInter_x5]をダブルクリックし、[Build Phases] タブ下の [Link Binary With Libraries]プルダウンメニューを開いてから、画面に表示される `+` ボタンで iOS SDK内のアーキテクチャを追加します。
![IOS-add-frameworks_vpadn]



# サンプルコードのダウンロード
---
SDK 4 lib ファイルは、Sample codeフォルダ内にあります。
[Go to download page](../download)

# App Transport Security
---
Apple recently revised App Transport Security (ATS), to iOS10. Please refer to [this link](latest-news/ios10ats/) for some modification.

# ヒント
---
より詳細な情報は、[バナー広告](../banner)、[ンタースティシャル広告](../interstitial)、[メディエーション](../mediation)をご確認 ください。


[IOS-add-file_vpadn.png]: {{site.imgurl}}/IOS-add-file_vpadn.png
[IOS-add-frameworks_vpadn]: {{site.imgurl}}/IOS-add-frameworks_vpadn.png
[このリンク]: {{site.baseurl}}/ios/latest-news/ios9ats/
