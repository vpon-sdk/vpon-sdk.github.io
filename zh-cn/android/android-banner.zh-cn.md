---
layout:         "android"
title:          "Android - 横幅广告 "
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-cn/android/banner/
lang:           "zh-cn"
---
# 概要
---
Vpon 横幅广告 (banner) 是利用画面的一小部分展示广告来吸引使用者点击，广告被点击后即可打开全萤幕呈现更丰富的浏览内容，例如网站或应用程式商店网页。

<img class="width-300" src="{{site.imgurl}}/Android_Banner.png" alt="successful result example">

# 完成串接准备
---
在开始串接广告之前，请确认您已经将 Vpon SDK 导入您的 Xcode 专案中。若您尚未完成，请先参考[串接说明]完成相关设定。

# 开始串接横幅广告
---
Android 应用程式由 View 物件所组成，也就是以文字区域和按钮等控制项的形式向使用者呈现的 Java 执行个体。VpadnBanner 是一种 View 子类别，用来显示由使用者点击触发的小型 HTML5 广告。

和所有的 View 一樣，VpadnBanner 可以使用 Java 撰写，也可以用 XML 编写。以下为所需步骤：

1. 汇入 com.vpon.ads.*
2. 宣告 VponBanner，并指定 License Key
3. 建立 VponAdRequest，并请求广告
4. 实作 AdListener

建议您在应用程式的 Activity 内进行上述步骤。

## 在 MainActivity 中编写横幅广告
---
请参考以下步骤，在您的 MainActivity 中完成横幅广告。

### 宣告 VponBanner，并请求广告
---
```java
import com.vpon.ads.*;

public class MainActivity extends AppCompatActivity {
        
        private RelativeLayout mainLayout;
        private VponBanner vponBanner;
        private String bannerId = "License Key" ;
        // bannerId: Vpon License Key to get ad, please replace with your own one

        @Override
  	    protected void onCreate(Bundle savedInstanceState) {
            setContentView(R.layout.activity_main);
            mainLayout = findViewById(R.id.main_layout);

            VponBanner vponBanner = new VponBanner(context);
            vponBanner.setLicenseKey(bannerId);
            vponBanner.setAdSize(adSize);
            // adSize: The Banner Ad size that will be displayed

            VponAdRequest.Builder builder = new VponAdRequest.Builder();
            builder.setAutoRefresh(true);
            // Only available for Banner Ad, will auto refresh ad if set true
            builder.addTestDevice("your device advertising id");
            // Set your test device's GAID here if you're trying to get Vpon test ad
            vponBanner.loadAd(builder.build());
            // Set ad request and load ad

            mainLayout.addView(vponBanner);
  	}
}
```
>**Note:** 如果您想要指定更多投放条件，请参考[进阶设定](../advanced)


# 在 layout 中编写横幅广告
---
您也可以直接在 layout 中定义横幅广告：

``` xml
  <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
      xmlns:vpadn="http://schemas.android.com/apk/lib/com.vpadn.ads"
      android:id="@+id/mainLayout"
      android:layout_width="match_parent"
      android:layout_height="match_parent"
      android:orientation="vertical" >

      <RelativeLayout
          android:id="@+id/adLayout"
          android:layout_width="match_parent"
          android:layout_height="wrap_content" >

          <!-- Implement Vpon Banner Ad As Below -->
          <com.vpon.ads.VponBanner
            xmlns:ads="http://schemas.android.com/apk/res-auto"
            android:id="@+id/banner"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            vpon:adSize="BANNER"
            vpon:bannerId= "License Key"/>
  </LinearLayout>
```

> **Note**：请记得将上面的 ads:bannerId 改为您的 License Key



## 实作 AdListener
---
```java
vponBanner.setAdListener(new VponAdListener() {

    @Override
    public void onAdLoaded() {
        // Invoked if receive ad successfully
    }
    
    @Override
    public void onAdFailedToLoad(int errorCode) {
        // Invoked if received ad fail, check this callback to indicates what type of failure occurred
    }

    @Override
    public void onAdOpened() {
        // Invoked if the ad was clicked
    }

    @Override
    public void onAdLeftApplication() {
        // Invoked if user leave the app and the current app was backgrounded
    }
});
```

## 广告生命周期
---

为使广告正常运作，并在适当的时机释放资源，我们建议可以在 Activity 生命周期中加入以下程式码：

```java
@Override
protected void onDestroy() {
    super.onDestroy();
    if (vponBanner != null) {
        vponBanner.destroy();
        vponBanner = null;
    }
}
```


# 横幅广告尺吋
---
除了支援标准横幅广告的尺吋外，Vpon Android SDK 还支援下列几种尺吋的横幅广告：

|      Size (WxH)            | Description    |  VponAdSize Constant            |
  :------------------------: | :-------------:| :-----------------------------:
  320x50                     | Standard Banner| VponAdSize.BANNER
  320x100                    | Large Banner   | VponAdSize.LARGE\_BANNER
  300x250                    |IAB Medium Rectangle| VponAdSize.IAB\_MRECT
  320x480                    | Large Rectangle Banner| VponAdSize.LARGE\_RECTANGLE
  468x60                     |IAB Full-Size Banner| VponAdSize.IAB\_BANNER
  728x90                     | IAB Leaderboard|  VponAdSize.IAB\_LEADERBOARD


<!-- 320x100                    | 大型横幅广告     | VponAdSize.LARGE_BANNER -->

>**Note:** Smart Banner 在不同解析度的手机上会产生不同的展示效果，如果您希望展示标准横幅广告，我们建议您直接使用 `VponAdSize.BANNER`




# Tips
---

### 确认广告曝光是否成功发送
请注意，Vpon SDK 不允许广告以以下方式呈现，致使广告在画面上可能不可见：

* 将 AdView 设为 Invisible
* 将 AdView 的 Alpha 值设为 < 100%
* AdView 被其它 View(s) 遮盖住

当广告露出在页面上并达到曝光标准后，会印出以下的 Log 代表有送出广告曝光：


```
I/VPON: [::Impression::]  response.code : 200
```


### Sample Code
如果您想看到完整的串接实例，请参考我们的 [Sample Code]

### 适用于 Vpon SDK v5.5 的串接方法
如果您想了解 Vpon SDK v5.5 或以下版本的串接方法，请参考[横幅广告](../banner-under550)

[串接说明]: ../integration-guide/
[Sample Code]:../../android/download/