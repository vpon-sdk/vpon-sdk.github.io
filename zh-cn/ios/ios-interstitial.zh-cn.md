---
layout: "ios"
title: "iOS - 插页广告"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-cn/ios/interstitial/
lang: "zh-cn"
---
## 完成串接指示
---
若您尚未完成串接广告形式前的串接说明，请先前往[串接说明]完成相关设定

## 最新消息
---
iOS10 更新了安全条款 App Transport Security (ATS)，请参考[这篇]来修改部份设定

# 总览
---
插页式广告是互动式多媒体 HTML5 或「网路应用程式」，在应用程式的正常转换点显示 (例如启动、影片播放前或游戏关卡载入时)。网路应用程式使用上就像在应用程式内浏览一样，只有简单的关闭按钮，而没有任何导览列，因为导览配置就包含在内容本身。这类广告由于内容更丰富、更吸引人，因此製作起来更昂贵，而曝光机会却有限。

![]({{site.imgurl}}/Interstitial.png)

# Vpadn Interstitial Ad
---
Interstitial Ad 的内容更加丰富精彩，因为它是需要更多不同实例化、载入和显示步骤的 Object，而不是 View。
不过，它的用法与 Vpadn Banner 非常类似：

1. 汇入 lib档与标头档
2. 宣告物件
3. 建立物件，并指定 Vpon interstitial banner Id (不能与横幅广告所用 banner Id 重複)

> **Note**: 再次提醒您，最好在应用程式的 ViewController 内执行上述步骤。

```objc
@implementation ViewController

- (void)viewDidLoad
{
    vpadnInterstitial = [[VpadnInterstitial alloc] init];
    vpadnInterstitial.strBannerId = @"";    // 填入您的Interstitial BannerId
    vpadnInterstitial.platform = @"TW";     // 台湾地区请填TW 大陆则填CN
    vpadnInterstitial.delegate = self;
    [vpadnInterstitial getInterstitial:[self getTestIdentifiers]];
}
@end
```

不过，目前没有任何项目可加入 ViewController，而且您必须等到这个请求成功后才能尝试显示广告，
这点请格外注意。最简单的做法是当 onVpadnInterstitialAdReceived 收到通知时 则执行 `[vpadnInterstitial show]`。
`但是为了维持良好的使用者体验，我们较建议可先抓取插页，待特定时机再将其显示，尽量避免抓取后立即显示。`

若想进一步瞭解 protocol 相关详情，请参阅[进阶设定]。

# 测试广告
---

```objc
// 请新增此function到您的程式内 如果为测试用 则在下方填入UUID，即可看到测试广告。
-(NSArray*)getTestIdentifiers
{
  return [NSArray arrayWithObjects:
    // add your test UUID
    @"your_UUID",
    nil];
}
```

# 下载 Sample code
---
[前往下载][1]
<br>


[串接说明]: ../integration-guide/
[进阶设定]: ../advanced/
[1]: ../download/
[这篇]: {{site.baseurl}}/zh-cn/ios/latest-news/ios9ats/
