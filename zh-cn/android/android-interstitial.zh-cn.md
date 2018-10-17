---
layout:      "android"
title:       "Android - 插页广告"
lead:        ""
description:
keywords:    'Keywords for this page, in the meta data'
permalink:    zh-cn/android/interstitial/
lang:         "zh-cn"
---

# 总览
---
插页式广告是互动式多媒体 HTML5 或「网络应用程式」，在应用程式的正常转换点显示 (例如启动、影片播放前或游戏关卡载入时)。网路应用程式使用上就像在应用程式内浏览一样，只有简单的关闭按钮，而没有任何导览列，因为导览配置就包含在内容本身。这类广告由于内容更丰富、更吸引人，因此製作起来更昂贵，而曝光机会相对有限。

![]({{site.imgurl}}/Interstitial.png)

# 完成串接准备
---
在开始串接广告之前，请确认您已经将 Vpon SDK 导入您的 Xcode 专案中。若您尚未完成，请先参考[串接说明]完成相关设定。


# 开始串接插页广告
---
请参考以下说明，完成插页广告：

1. 汇入 `com.vpadn.ads.*`
2. 宣告 `VpadnInterstitialAd`
3. 建立 VpadnInterstitialAd 物件，并指定 License Key
4. 拉取广告
5. 展示广告
6. 实作 VpadnAdListener

建议您在应用程式的 Activity 内进行上述步骤。

## Import Vpon SDK 并宣告插页广告物件
---
```java
import com.vpadn.ads.*;

public class MainActivity extends Activity implements VpadnAdListener {
    // Declare VpadnInterstitialAd instance
  	private VpadnInterstitialAd interstitialAd;

  	// Please fill in with your License Key
  	private String interstitialBannerId = "License Key";
        ...
}
```

## 建立插页广告物件，并指定 License Key
---
```java
public class MainActivity extends Activity implements VpadnAdListener {
  ...
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    // Create VpadnInterstitialAd instance
    interstitialAd = new VpadnInterstitialAd(this, interstitialBannerId, "TW");
    interstitialAd.setAdListener(this);
    VpadnAdRequest request = new VpadnAdRequest();
    // Start to load Interstitial Ad
    interstitialAd.loadAd(request);
  }

  @Override
  protected void onDestroy() {
    super.onDestroy();
    if (interstitialAd != null) {
      interstitialAd.destroy();
      interstitialAd = null;
    }
  }
```

不过，目前没有任何项目可以加入检视阶层，您必须等到这个请求成功后才能尝试显示广告，这点请格外注意。

## 展示广告
---
为了维持良好的用户体验，请避免取得插页广告后就立刻将广告展示出来。我们建议您可以先拉取插页广告，在特定时机展示广告。舉例來說：您可以實作 VpadnAdListener 來監聽廣告請求的事件，在 onVpadnReceiveAd 事件被觸發後，再將廣告顯示出來，請參考以下範例：

```java
public class MainActivity extends Activity implements VpadnAdListener {
  ...

    @Override
    public void onVpadnReceiveAd(VpadnAd ad) {
      if (ad == this.interstitialAd) {
        // Show Interstitial Ad
        interstitialAd.show();
      }
    }
    ...
}
```

插頁廣告展示後，將會佔據整個畫面，直到使用者點擊關閉後，控制權才會交還給應用程式。

# 测试广告
---
如果您的 License Key 还未通过审核的话，您可以使用下列的方式取得测试广告：

```java
public class MainActivity extends Activity implements VpadnAdListener {
        ...
        VpadnAdRequest adRequest =  new VpadnAdRequest();

        HashSet<String> testDeviceImeiSet = new HashSet<String>();
        // Add Android device advertising id
        testDeviceImeiSet.add("your device advertising id");
        adRequest.setTestDevices(testDeviceImeiSet);

        vponBanner.loadAd(adRequest);
        ...
}
```

### Advertising ID
---
您可以使用下列方式取得 device 上的 Advertising ID：

1. 于 log 搜寻"advertising_id"
2. 直接操作手机: 设定 → Google → 广告 → 您的广告 ID (Advertising ID)

## 实作 VpadnAdListener
---
```java
public class MainActivity extends Activity implements VpadnAdListener {
        @Override
        public void onVpadnReceiveAd(VpadnAd ad){
                Log.d("Banner", "VpadnReceiveAd");
        }

        @Override
        public void onVpadnFailedToReceiveAd(VpadnAd ad, VpadnAdRequest.VpadnErrorCode errCode){
                Log.d("Banner", "fail to receive ad (" + errCode + ")");
        }

        @Override
        public void onVpadnPresentScreen(VpadnAd ad){
                Log.d("Banner", "VpadnPresentScreen");
        }

        @Override
        public void onVpadnDismissScreen(VpadnAd ad){
                Log.d("Banner", "vpadnDismissScreen");
        }

        @Override
        public void onVpadnLeaveApplication(VpadnAd ad){
                Log.d("Banner", "VpadnLeaveApplication");
        }
}
```

# Tips
---

* <span style="line-height:2.5em">**我们不建议您在程式开啓时直接拉取插頁廣告并立即显示**<br></span>
為了避免拖慢程式开啓时的执行速度，我们建议您可以先 loadAd()，但不立即显示廣告，等待特定事件(e.g. 使用者过关、停留在某个画面超过特定时间、按下某个 button 或离开 app 之前...)发生再呼叫 show() 显示廣告。

* <span style="line-height:2em"> **请避免没有 loadAd() 就要求显示广告** <br> </span>
請務必參考[串接說明]，在 AndroidManifest.xml 中加入 VpadnActivity。如果您沒有在 VpadnActivity 中加上 `android:configChanges=“orientation|screenSize”`，請避刷在 onCreate 時 loadAd() 並立即顯示插頁廣告。

### Sample Code
如果您想看到完整的串接实例，请参考我们的 [Sample Code]

### 其它广告形式
如果您想了解其它广告形式的串接，请参考以下内容：

* [横幅广告](../banner)
* [原生广告](../native)
* [Out-stream 影音广告](../outstream)
* [中介服务](../mediation)
* [进阶设定](../advanced)

[串接说明]: ../integration-guide/
[Sample Code]:../../android/download/