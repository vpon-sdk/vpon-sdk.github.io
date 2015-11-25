---
layout:      "android"
title:       "Android - 插页广告"
lead:        "Interstitia ad"
description:
keywords:    'Keywords for this page, in the meta data'
permalink:    zh-cn/android/interstitial/
lang:         "zh-cn"
---

## 完成串接指示
---
若您尚未完成串接广告形式前的串接说明，请先前往[串接说明]完成相关设定

# 总览
---
插页式广告是互动式多媒体 HTML5 或「网路应用程式」，在应用程式的正常转换点显示 (例如启动、影片播放前或游戏关卡载入时)。网路应用程式使用上就像在应用程式内浏览一样，只有简单的关闭按钮，而没有任何导览列，因为导览配置就包含在内容本身。这类广告由于内容更丰富、更吸引人，因此製作起来更昂贵，而曝光机会却有限。

![]({{site.imgurl}}/Interstitial.png)

# Vpon 插页广告
---
插页广告的内容更加丰富精彩，因为它是需要更多不同实例化、载入和显示步骤的 Object，而不是 View。

不过，它的用法与 Banner 非常类似：

* 汇入 `com.vpadn.ads.*`
* 宣告例项
* 建立例项，并指定 Vpon 发佈商编号 (bannerId)

(不能与横幅广告所用发佈商编号重複)

再次提醒您，最好在应用程式的 Activity 内执行上述步骤。

```java
public class MainActivity extends Activity implements VpadnAdListener {
  //TODO: 您向Vpon申请的interstitial banner Id (提醒您 跟一般的横幅广告banner ID是不同的)
  private String interstitialBannerId = "xxxxxxxxxxxxxxxx";
  private VpadnInterstitialAd interstitialAd;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    // Create interstitial instance
    interstitialAd = new VpadnInterstitialAd(this, interstitialBannerId, "TW");
    //加入listener
    interstitialAd.setAdListener(this);
    // 建立广告请求
    VpadnAdRequest request = new VpadnAdRequest();
    //开始抓interstitial ad
    interstitialAd.loadAd(request);
  }

  @Override
  protected void onDestroy() {
    super.onDestroy();
    // 千万记得离开时需要呼叫 destroy
    if (interstitialAd != null) {
      interstitialAd.destroy();
      interstitialAd = null;
    }
  }
```

不过，目前没有任何项目可加入检视阶层，而且您必须等到这个请求成功后才能尝试显示广告，这点请格外注意。最简单的做法是执行 AdListener (「InterstitialAd」也是一种广告)，或是直接使用布林属性 isReady。

一旦 load Ad 成功，广告就可以显示了：

```java
  @Override
  public void onVpadnReceiveAd(VpadnAd ad) {
    if (ad == this.interstitialAd) {
      //show interstitial ad 或可以延后在show
      interstitialAd.show();
    }
  }
```

接着，插页式广告会佔据整个画面，直到使用者点击关闭；这时控制权才会交还给应用程式。[进阶设定]中 Vpadn AdListener 小节列出了多种实用的回呼方式，供您参考。

# Download Sample Code
---
[Go to Download Page]

# 注意事项
---
> 1. <span style="line-height:2.5em">**我们不建议您在程式开啓时直接拉取 interstitial ad 并立即显示**<br></span>
如此将会拖慢程式开啓时的执行速度。因此我们建议您可以先 load interstitial 但不显示，等待特定事件(e.g. 使用者过关、停留在某个画面超过特定时间、按下某个 button 或离开 app 之前...)发生再显示。
> 2. <span style="line-height:2em"> **请避免没有 load 就要求显示广告** <br> </span>
`android:configChanges=“orientation|screenSize”`若您没在 activity 裡没有加上这句，请避免在 onCreate 时做 load interstitial 并立即显示插页广告。



[串接说明]: ../integration-guide
[Go to Download Page]:{{site.baseurl}}/zh-cn/android/download
[进阶设定]: {{site.baseurl}}/zh-cn/android/advanced
