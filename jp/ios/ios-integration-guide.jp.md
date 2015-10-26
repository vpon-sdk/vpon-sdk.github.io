---
layout:         "ios"
title:          "iOS - インテグレーションガイド"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       jp/ios/integration-guide/
lang:            "jp"
---
# VPON SDK 4 基本編
---
1. まず下記URLから登録済みネットワークプラットフォームを確認してください:<br>
台湾: http://tw.pub.vpon.com/<br>
中国: http://cn.pub.vpon.com/<br>

2. 台湾のプラットフォームを利用する場合、以下をご利用ください。
`vpadnAd.platform = @"TW"`;

3. 中国のプラットフォームを利用する場合、以下をご利用ください。
`vpadnAd.platform = @"CN"`;

4.   iOS8にアップデート後、ログに `didImpression` が確認できない場合、原因としてデフォルト設定でウィンドウの幅 x 高さが存在しない可能性が考えられます。setFrame関数をマニュアルで呼び出して調整する必要があります。`didImpression` が正しく実装されているかご確認ください。

# 概要
---
VPONバナー広告は、小さなエリアを利用し、ユーザーにクリックさせることで、ウェブサイトもしくはアプリのダウンロードページなどの情報豊富なフルスクリーンページへ遷移させます。ここではあなたのアプリへバナー広告を配信する方法をご案内します。
iOS アプリでバナー広告を表示させるためには、XcodeプロジェクトにSDKを導入し、ユーザインターフ ェースに VpadnBanner を追加するだけです。

# 要件
---
* iOS 5.x 以降のバージョン
* XCode 4.4 以降のバー ジョン

を組み合わせて使用する必要があります。

# SDK の導入
---
解凍した SDK には、Objective-C ヘッダー、実行期間のライブラリー、READMEテキストが含まれています。アプリにVPON広告を導入するためには、次の3つのステップを完了させてください。

1. プロジェクトに `libAdOn.a` , `VpadnBanner.h` および `VpadnInterstitial.h` を追加します。
2. 必要なフレームワークを追加します。
3. Build Settings 内の Other Linker Flagsに `-all_load` と` -Obj-C` を追加し、また Summary の下で AdSupport を Optional に設定します。


> **Note**: **All three** these steps are necessary!

## SDK lib の追加
解凍した SDK には、lib ファイル 1 つ・ヘッダーファイル 2つが含まれています。

1. Xcode 内のプロジェクト内で右クリックし、 [Add Files to "Vpadn_BannerInter_x5"...]を選択し"Vpadn_BannerInter_x5" 内でファイルを新規作成します。
![IOS-add-file_vpadn.png]

2. 次に、 SDK 内で `libAdOn.a` , `VpadnBanner.h` および `VpadnInterstitial.h` を選択します。
![IOS-add-lib&header_vpadn]

3. SDK lib は、以下のフレームワーク を参照できます。
SDK 4.2.8 バージョンをお使いになる場合、AddressBookとAddressBookUIは使用しないでください。 <br  >
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

これらのフレームワークを追加する場合、 プロジェクト[Vpadn_BannerInter_x5]をダブルクリックし、[Build Phases] タブ下の [Link Binary With Libraries]プルダウンメニューを開いてから、画面に表示される `+` ボタンで iOS SDK内のアーキテクチャを追加します。
![IOS-add-frameworks_vpadn]


# サンプルコードのダウンロード
---
SDK 4 lib ファイルは、Sample codeフォルダ内にあります。
[Go to download page]({{site.baseurl}}/android/download)

# App Transport Security
---
アップルは最近、iOS9 に App Transport Security (ATS)という新しいセキュリティシステ ムを導入しました。最新の Xcode 7 を使用して、 iOS9 プロジェクトを作成または移行し ている場合は、[このリンク](latest-news/ios9ats))先を参考に修正を行ってください。

# ヒント
---
より詳細な情報は、[バナー広告](../banner)、[ンタースティシャル広告](../interstitial)、[メディエーション](../mediation)をご確認 ください。


[IOS-add-lib&header_vpadn]: {{site.imgurl}}/IOS-add-lib&header_vpadn.png
[IOS-add-file_vpadn.png]: {{site.imgurl}}/IOS-add-file_vpadn.png
[IOS-add-frameworks_vpadn]: {{site.imgurl}}/IOS-add-frameworks_vpadn.png
[このリンク]: {{site.baseurl}}/ios/latest-news/ios9ats/
