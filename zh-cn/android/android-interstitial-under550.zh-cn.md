---
layout:      "android"
title:       "Android - 插页广告"
lead:        ""
description:
keywords:    'Keywords for this page, in the meta data'
permalink:    zh-cn/android/interstitial-under550/
lang:         "zh-cn"
---

# 概要
---
插页式广告是互动式多媒体 HTML5 或「网络应用程式」，在应用程式的正常转换点显示 (例如启动、影片播放前或游戏关卡载入时)。网路应用程式使用上就像在应用程式内浏览一样，只有简单的关闭按钮，而没有任何导览列，因为导览配置就包含在内容本身。这类广告由于内容更丰富、更吸引人，因此製作起来更昂贵，而曝光机会相对有限。

![]({{site.imgurl}}/Interstitial.png)

# 完成串接准备
---
在开始串接广告之前，请确认您已经将 Vpon SDK 导入您的 Xcode 专案中。若您尚未完成，请先参考[串接说明]完成相关设定。


# 开始串接插页广告
---
请参考以下说明，完成插页广告：

1. 汇入 com.vpon.ads.*
2. 宣告 VponInterstitialAd，并指定 License Key
3. 建立 VponAdRequest，并请求广告
4. 展示广告
5. 实作 AdListener

建议您在应用程式的 Activity 内进行上述步骤。

## 宣告 VponInterstitialAd，并请求广告
---
```java
import com.vpon.ads.*;

public class MainActivity extends AppCompatActivity {

    private String interstitialId = "License Key";
    // interstitialId: Vpon License Key to get ad, please replace with your own one

    private VponInterstitialAd vponInterstitialAd;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        vponInterstitialAd = new VponInterstitialAd(this, interstitialId);

        VponAdRequest.Builder builder = new VponAdRequest.Builder();
        builder.addTestDevice("your device advertising id");
        // Set your test device's GAID here if you're trying to get Vpon test ad
        vponInterstitialAd.loadAd(builder.build()); 
        // Set ad request and load ad
    }
```

>**Note:**
>
>* 在 Activity 的生命周期中，一个 VponInterstitialAd 物件可以重复请求显示多个插页广告，因此只需建立一个实例物件即可
>* 请特别注意，截止目前步骤，尚没有任何项目可以加入检视阶层，您必须等到请求成功后才可以尝试展示广告
>* 如果您想要指定更多投放条件，请参考[进阶设定](../advanced)

## 展示广告
---
为了维持良好的用户体验，请避免取得插页广告后就立刻将广告展示出来。我们建议您可以先拉取插页广告，在特定时机展示广告。舉例來說：您可以實作 VpadnAdListener 來監聽廣告請求的事件，在 onVpadnReceiveAd 事件被觸發後，再將廣告顯示出來，請參考以下範例：

```java
public class MainActivity extends AppCompatActivity {

@Override
public void onAdLoaded() {
    if (vponInterstitialAd.isReady()) {
        // Show Interstitial Ad
        vponIntersitialAd.show();
        }
    }
}
```

>**Note:** 您可以在呼叫 show() 之后，再使用 loadAd() 请求新广告


## 实作 AdListener
---
```java
vponIntersitialAd.setAdListener(new VponAdListener() {
    
    @Override
    public void onAdLoaded() {
        // Invoked if receive Interstitial Ad successfully
        if (vponInterstitialAd.isReady()) {
            // Show Interstitial Ad
            vponIntersitialAd.show();
            }
        }

    @Override
    public void onAdFailedToLoad(int errorCode) {
        // Invoked if received ad fail, check this callback to indicates what type of failure occurred
        }

    @Override
    public void onAdOpened() {
        // Invoked if the Interstitial Ad was clicked
        }

    @Override
    public void onAdLeftApplication() {
        // Invoked if user leave the app and the current app was backgrounded
        }

    @Override
    public void onAdClosed() {
        // Invoked if the Interstitial Ad was closed

        vponInterstitialAd.loadAd(new VponAdRequest.Builder().build());
        // Load next ad if needed
        }
});
```

## 广告生命周期
---

为使广告正常运作，并在适当的时机释放资源，我们建议可以在 Activity 生命周期中加入以下程式码：

```java
@Override
protected void onResume() {
    super.onResume();

    if (vponInterstitialAd != null) {
        vponInterstitialAd.resume();
    }
}

@Override
protected void onPause() {
    super.onPause();

    if (vponInterstitialAd != null) {
        vponInterstitialAd.pause();
    }
}

@Override
protected void onDestroy() {
    super.onDestroy();
    if (vponInterstitialAd != null) {
        vponInterstitialAd.destroy();
        vponInterstitialAd = null;
    }
}
```

# Tips
---

* <span style="line-height:2.5em"> **我们不建议您在程式开啓时直接拉取插頁廣告并立即显示**<br></span>
為了避免拖慢程式开啓时的执行速度，我们建议您可以先 loadAd()，但不立即显示廣告，等待特定事件(e.g. 使用者过关、停留在某个画面超过特定时间、按下某个 button 或离开 app 之前...)发生再呼叫 show() 显示廣告。
* <span style="line-height:2em"> **请避免在发出广告请求前，就要求显示广告** <br> </span>
* <span style="line-height:2em"> **请务必参考[串接说明]，在 AndroidManifest.xml 中加入 VponAdActivity**</span>


### 确认广告曝光是否成功发送
当广告露出在页面上并达到曝光标准后，会印出以下的 Log 代表有送出广告曝光：

```
I/VPON: [::Impression::]  response.code : 200
```


### Sample Code
如果您想看到完整的串接实例，请参考我们的 [Sample Code]

### 适用于 Vpon SDK v4.9 的串接方法
如果您想了解 Vpon SDK v4.9.1 或以下版本的串接方法，请参考[插页广告](../interstitial-under5)

[串接说明]: ../integration-guide/
[Sample Code]:../../android/download/