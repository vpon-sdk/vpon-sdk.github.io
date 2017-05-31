---
layout: "ios"
title: "iOS - 插頁廣告"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-tw/ios/interstitial/
lang: "zh-tw"
---
## 完成串接指示
---
若您尚未完成串接廣告形式前的串接說明，請先前往[串接說明]完成相關設定

## 最新消息
---
iOS10 更新了安全條款 App Transport Security (ATS)，請參考[這篇]來修改部份設定

# 總覽
---
插頁式廣告是互動式多媒體 HTML5 或「網路應用程式」，在應用程式的正常轉換點顯示 (例如啟動、影片播放前或遊戲關卡載入時)。網路應用程式使用上就像在應用程式內瀏覽一樣，只有簡單的關閉按鈕，而沒有任何導覽列，因為導覽配置就包含在內容本身。這類廣告由於內容更豐富、更吸引人，因此製作起來更昂貴，而曝光機會卻有限。

![]({{site.imgurl}}/Interstitial.png)

# Vpadn Interstitial Ad
---
Interstitial Ad 的內容更加豐富精彩，因為它是需要更多不同實例化、載入和顯示步驟的 Object，而不是 View。
不過，它的用法與 Vpadn Banner 非常類似：

1. 匯入 lib 檔與標頭檔
2. 宣告物件
3. 建立物件，並指定 Vpon interstitial banner Id (不能與橫幅廣告所用 banner Id 重複)

> **Note**: 再次提醒您，最好在應用程式的 ViewController 內執行上述步驟。


```objc
@implementation ViewController

- (void)viewDidLoad
{
    vpadnInterstitial = [[VpadnInterstitial alloc] init];
    vpadnInterstitial.strBannerId = @"";    // 填入您的Interstitial BannerId
    vpadnInterstitial.platform = @"TW";     // 台灣地區請填TW 大陸則填CN
    vpadnInterstitial.delegate = self;
    [vpadnInterstitial getInterstitial:[self getTestIdentifiers]];
}
@end
```

不過，目前沒有任何項目可加入 ViewController，而且您必須等到這個請求成功後才能嘗試顯示廣告，
這點請格外注意。最簡單的做法是當 onVpadnInterstitialAdReceived 收到通知時 則執行 `[vpadnInterstitial show]`。
`但是為了維持良好的使用者體驗，我們較建議可先抓取插頁，待特定時機再將其顯示，盡量避免抓取後立即顯示。`

若想進一步瞭解 protocol 相關詳情，請參閱[進階設定]。

# 測試廣告
---

```objc
// 請新增此function到您的程式內 如果為測試用 則在下方填入UUID，即可看到測試廣告。
-(NSArray*)getTestIdentifiers
{
  return [NSArray arrayWithObjects:
    // add your test UUID
    @"your_UUID",
    nil];
}
```

# 下載 Sample code
---
[前往下載][1]
<br>


[串接說明]: ../integration-guide/
[進階設定]: ../advanced/
[1]: ../download/
[這篇]: {{site.baseurl}}/zh-tw/ios/latest-news/ios9ats/
