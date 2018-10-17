---
layout:         "android"
title:          "Android - 进阶设定"
lead:           "帮助您取得更多广告功能与资料收集"
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-cn/android/advanced/
lang:            "zh-cn"
---

# VpadnAdRequest
  -----------------------------
  您可以先自订 `VpadnAdRequest`，再将它传送给 `VpadnBanner.loadAd`，让 Vpon 以更精确的方式指定广告 (com.adshow.ads.VpadnAdRequest)

## 指定接收广告

  您可以使用这些属性来指定要接收测试广告的装置或装置 Set。若要确认 SDK 是否已顺利整合，请加入您的测试装置并执行应用程式，然后按一下所显示的测试广告。


```java
  VpadnAdRequest request = new VpadnAdRequest();
  request.addTestDevice("your test device advertising id");
  //TODO 需要填入您测试机的advertising id
```

## 指定目标

您也可以指定位置和客层相关资讯。不过，为了保护使用者隐私，请只指定您的应用程式中现有的位置和客层资料。


```java
  VpadnAdRequest request = new VpadnAdRequest();
  request.setGender(VpadnAdRequest.Gender.FEMALE);
  request.setBirthday("1977-08-23");
```
  系统会以适当的方法取得使用者的位置


# VpadnAdListener
  ------------------------------

您可以选择在传送给 `VpadnBanner.setAdListener` 的物件中执行 `com.adshow.ads.VpadnAdListener`，藉此追踪请求失败或「点阅」等广告生命週期事件。

```java
   public interface VpadnAdListener {
     void onVpadnReceiveAd(VpadnAd ad);
     void onVpadnFailedToReceiveAd(VpadnAd ad, VpadnAdRequest.VpadnErrorCode errorCode);
     void onVpadnPresentScreen(VpadnAd ad);
     void onVpadnDismissScreen(VpadnAd ad);
     void onVpadnLeaveApplication(VpadnAd ad);
   }
```

这个介面可由您的活动或任何其他物件执行：

```java
  import com.vpadn.ads.*;
  public class VpadnBannerExample extends Activity implements VpadnAdListener {
  //TODO: Implements all interface methods }
}
```

然后传给 `VpadnBanner`：

```java
  vponBanner.setAdListener(this);
```

---
```java
  public void onVpadnReceiveAd(VpadnAd ad)
```
当 VpadnBanner.loadAd 成功时传送。

```java
  public void onFailedToReceiveAd(VpadnAd ad, VpadnAdRequest.VpadnErrorCode error)
```
当 loadAd 失败时传送；失败原因通常是网路连线失败、应用程式设定错误或广告空间不足。

建议您将这些事件记录下来以便侦错：

```java
  @Override public void onFailedToReceiveAd(VpadnAd ad, VpadnAdRequest.VpadnErrorCode errorCode) { Log.d(MY_LOG_TAG, "failed to receive ad (" + errorCode + ")"); }
```

```java
  public void onVpadnPresentScreen(VpadnAd ad)
```
当广告因获得使用者点击，在您的应用程式之前建立了 Activity 并呈现出全萤幕广告使用者介面时呼叫。

```java
  public void onVpadnDismissScreen(VpadnAd ad)
```
当使用者关闭与 onVponPresentScreen 一同显示的全萤幕 Activity，控制权也交还给应用程式时呼叫。

```java
  public void onVpadnLeaveApplication(VpadnAd ad)
```
当 Ad 点击会启动新的应用程式时呼叫。




# Crazy Ad
---
Crazy Ad 是由 Banner 自动展示的全萤幕富媒体广告，展开后呈现约 5~7 秒会自动关闭。

<img src="{{site.imgurl}}/Crazyad.png" alt="" class="width-300" />


## 如何设定 Crazy Ad
---

1. 请先[注册帐号]成为 Vpon 开发商伙伴
2. 登入[开发商后台]申请 License Key
3. 选择是否播放 Crazy Ad

如图：
![CrazyadSetting]


# Corona User
---
如果您的 App 使用 Corona 欲串接 Vpon 广告，我们建议您用 Web SDK 的方式串接，使用方法如下：

1. 请参考 [Vpon Web SDK 串接说明]，准备一个包含 Web SDK 广告请求的 HTML 档案
2. 在 WebView 中读取该 HTML 档案，例如：webView:request(“localfile.html”, system.ResourceDirectory)

> **Note**：更多 Corona SDK 文件可参考: [Corona Document]

[CrazyadSetting]: {{site.imgurl}}/CrazyadSetting.png
[注册帐号]: {{ site.baseurl }}/zh-cn/android/registration/
[开发商后台]: http://console.vpon.com
[Vpon Web SDK 串接说明]: {{site.baseurl}}/zh-cn/web/
[Corona Document]: http://docs.coronalabs.com/api/library/native/newWebView.html