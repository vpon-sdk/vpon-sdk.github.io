---
layout:         "android"
title:          "Android - 原生广告 "
lead:           "Android - Native"
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-cn/android/native/
lang:           "zh-cn"
---
# 概要
--------
原生广告不同于以往横幅广告、插页广告会直接提供可立即呈现的广告内容，原生广告 API 提供了标题、图像等广告内容的组合，您可以透过这些属性的编排打造出最理想的原生广告风格。原生广告更打破以往对于广告的刻板印象，以最自然的方式呈现，提供更符合需求的广告体验。

<img src="{{site.imgurl}}/Native_Android.png" alt="" class="width-300"/>

# 完成串接准备
---
在开始串接广告之前，请确认您已经将 Vpon SDK 导入您的 Xcode 专案中。若您尚未完成，请先参考[串接说明]完成相关设定。

# 開始串接原生廣告
--------
在应用程式中建立原生广告需要执行以下五个步骤：

1. 汇入 com.vpon.ads.*
2. 宣告 VponNativeAd 物件并指定 License Key
3. 建立 VponAdrequest 物件，并请求广告
4. 建立原生广告 Layout
5. 建置原生广告
6. 实作 VponAdListener / VponNativeAd.OnNativeAdLoadedListener

建议您在应用程式的 Activity 内进行上述步骤。

## 宣告 VponNativeAd，并请求广告
---
```java
import com.vpon.ads.*;

public class MainActivity extends AppCompatActivity {
    private FrameLayout adContainer;
    private VponNativeAd vponNativeAd;
    private String nativeAdId = "License Key";
    // nativeAdId: Vpon License Key to get ad, please replace with your own one
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        adContainer = findViewById(R.id.ad_container); 

        vponNativeAd = new VponNativeAd(this, nativeAdId);
        VponAdLoader vponAdLoader = new VponAdLoader.Builder().build();

        VponAdRequest.Builder builder = new VponAdRequest.Builder();
        builder.addTestDevice("your device advertising id");
        // Set your test device's GAID here if you're trying to get Vpon test ad
        vponAdLoader.loadAd(builder.build());
        // Set ad request and load ad
    }
}
```

>**Note:** 如果您想要指定更多投放条件，请参考[进阶设定](../advanced)

## 建立原生广告 Layout {#createNativeUI}
--------
当撷取到原生广告资料之前，您需要建置原生广告 Layout。关于原生广告呈现元件规范请参照 [Native Ad Spec](#nativeAdSpec) ：

您也可以参考以下 Sample 完成 Layout 的设计：

### main_activity.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <FrameLayout
        android:id="@+id/ad_container"
        android:layout_height="wrap_content"
        android:layout_width="match_parent"/>
</RelativeLayout>
```

### native_ad_layout_template.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/ad_container"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:background="@android:color/white"
    android:paddingTop="10dp"
    android:paddingBottom="10dp">

    <ImageView
        android:id="@+id/ad_app_icon"
        android:layout_width="50dp"
        android:layout_height="50dp"
        android:layout_marginStart="10dp"
        android:contentDescription="Ad icon"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        tools:ignore="HardcodedText"
        tools:src="@mipmap/ic_launcher" />

    <TextView
        android:id="@+id/ad_headline"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginStart="5dp"
        android:ellipsize="end"
        android:lines="1"
        android:textColor="@android:color/black"
        android:textSize="18sp"
        app:layout_constraintLeft_toRightOf="@+id/ad_app_icon"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="@+id/ad_app_icon"
        tools:text="This is HeadLine" />

    <TextView
        android:id="@+id/ad_body"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:textColor="@android:color/black"
        android:textSize="15sp"
        app:layout_constraintBottom_toBottomOf="@+id/ad_app_icon"
        app:layout_constraintLeft_toLeftOf="@+id/ad_headline"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/ad_headline"
        tools:text="This is body" />

    <com.vpon.ads.VponMediaView
        android:id="@+id/ad_media_view"
        android:layout_width="match_parent"
        android:layout_height="210dp"
        android:layout_marginTop="5dp"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/ad_app_icon"
        tools:background="?android:attr/fingerprintAuthDrawable"
        tools:layout_height="157dp"
        tools:layout_width="0dp" >
    </com.vpon.ads.VponMediaView>
    
    
    <Button
        android:id="@+id/ad_call_to_action"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="end"
        android:text="Call to Action"
        android:textSize="12sp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/ad_media_view" />
</androidx.constraintlayout.widget.ConstraintLayout>
```

## 建置原生广告
---
完成原生广告请求后，您可以透过 VponAdListener 监听广告请求的状态，在 `onNativeAdLoaded` 之后，将回传的素材建构成自定义的原生广告样式，并在完成设定后注册检视元件来绑定点击事件。

```java
import com.vpon.ads.*;

public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {

        LayoutInflater.from(this).inflate(R.layout.layout_native_ad_template, adContainer, true);
        // Inflate your custom ad layout

        vponAdLoader.forNativeAd(new VponNativeAd.OnNativeAdLoadedListener() {
            @Override
            public void onNativeAdLoaded(VponNativeAd nativeAd) {
                setNativeAdDatas(nativeAd, adContainer);
                // Set ad datas to your custom ad layout
                //TODO set native ad datas to view, registerViewForInteraction
                //TODO VpadnNativeAd.Rating is change to VponNativeAd.NativeAdData.Rating
                //TODO VponMediaView.setNativeAd(vponNativeAd, localNativeAdData)
            }
        });

        VponAdRequest.Builder builder = new VponAdRequest.Builder();
        vponAdLoader.loadAd(builder.build());
        // Set ad request and load ad
    }
    
    private void setNativeAdDatas(VponNativeAd nativeAd, View adContainer) {
        ImageView nativeAdIcon = adContainer.findViewById(R.id.ad_app_icon);
        TextView nativeAdTitle = adContainer.findViewById(R.id.ad_headline);
        TextView nativeAdBody = adContainer.findViewById(R.id.ad_body);
        VponMediaView nativeMediaView = adContainer.findViewById(R.id.ad_media_view);
        Button nativeAdCallToAction = adContainer.findViewById(R.id.ad_call_to_action);

        VponAdLoader.downloadAndDisplayImage(nativeAd.getIcon(), nativeAdIcon);
        // Use VponNativeAd.downloadAndDisplayImage to display icon in your custom ad layout

        nativeAdTitle.setText(nativeAd.getTitle());
        if (nativeAd.getBody() != null) {
            nativeAdBody.setText(nativeAd.getBody());
        } else {
            nativeAdBody.setVisibility(View.INVISIBLE);
        }

        nativeMediaView.setNativeAd(nativeAd);

        if (nativeAd.getCallToAction() != null) {
            nativeAdCallToAction.setText(nativeAd.getCallToAction());
        } else {
            nativeAdCallToAction.setVisibility(View.INVISIBLE);
        }

        vponNativeAd.registerViewForInteraction(adContainer);
        // Register your view for click interaction
    }
}
```

## 实作 AdListener
---
```java
vponNativeAd.setAdListener(new VponAdListener() {

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
    if (vponNativeAd != null) {
        vponNativeAd.destroy();
        vponNativeAd = null;
    }
}
```

<!-- # 原生广告管理器
--------
Vpon SDK 提供原生广告管理器 (Native Ads Manager)。当您想在知时间内在应用程式同一个页面下的数个位置显示原生广告，原生广告管理器可以协助您一次请求并管理多笔原生广告。

关于原生广告管理器的使用方式，请直接参考 [Sample Code]。 -->

# Native Ad Spec {#nativeAdSpec}
--------
下表为 Vpon 提供的原生广告元件列表，`红字`部份表示您必须显示的原生广告元件，其中 CoverImage 与 Icon 必须至少显示其中一个。

Properties   |   Description
:-----------:|:-----------:|
<font color="red">AdLabel</font>      | 让使用者了解此为广告 (例如： 赞助、广告 等等)
:-----------:|:-----------:|
<font color="red">Title</font>  | 最少需显示8个中文字, 放不下时须显示`...`
:-----------:|:-----------:|
CoverImage   | 1200 x 627px (可等比例缩放，不可变形，不可裁切)
:-----------:|:-----------:|
Icon         | 128 x 128px (可等比例缩放，不可变形，不可裁切)
:-----------:|:-----------:|
CallToAction | 需要完整显示
:-----------:|:-----------:|
BodyText     | 最少显示20个中文字，或不要显示
:-----------:|:-----------:|


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

### 适用于 Vpon SDK v4.9 的串接方法
如果您想了解 Vpon SDK v4.9.1 或以下版本的串接方法，请参考[原生广告](../native-under5)

### 中介服务
透过中介服务，您的应用程式就能放送众多广告来源的广告，详细请见说明：

* [使用 AdMob]
* [使用 MoPub]


[串接说明]: {{site.baseurl}}/zh-cn/android/integration-guide/
[Sample Code]:../../android/download/
[使用 AdMob]: {{ site.baseurl }}/zh-cn/android/mediation/admob/#customevent
[使用 MoPub]: {{ site.baseurl }}/zh-cn/android/mediation/mopub
[使用 Smaato]: {{ site.baseurl }}/zh-cn/android/native/mediation/smaato
