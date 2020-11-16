---
layout:         "android"
title:          "Android - addFriendlyObstruction"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-cn/android/addfriendlyobstruction/
lang:            "zh-cn"
---
# 概览
---

为了确保每次的广告展示都有让广告素材确实露出，且符合 Interactive Advertising Bureau (IAB) 及 Media Rating Council (MRC) 提出的广告可视率标准，一般而言，Vpon SDK 不允许App 任何的view 以任何形式覆盖在 Vpon adview 之上。

考量到 App layout 设计所需，App 可能必须要透过透明或不可见的 view(s) 完成版面的设置。因此，Vpon 根据 OM (Open Measurement) SDK Framework 推出 addFriendlyObstruction 的新介面，在无法避免的状况下，您可以透过 addFriendlyObstruction 的介面，将`实作上必须存在且在视觉上不会影响广告展示的 view (alpha = 0, Hidden)` 设为 Friendly Obstruction。

本文将引导您完成 addFriendlyObstruction 的实作，请依您串接 SDK 的方式选择对应的说明。

* [直接串接 Vpon SDK 的设定方式]
* [透过 AdMob Mediation 的设定方式]
* [透过 MoPub Mediation 的设定方式]


## 直接串接 Vpon SDK 的设定方式 {#vponsdk}
---

* 本介面适用于 `Vpon SDK v5.1.7` 及以上版本

当 adview 因为被其它 view(s) 覆盖住而造成无法成功送出 Impression 时，您会看到类似以下的 Log 提示您覆盖住广告的 view(s)：

```
W/VPON: [::AbsExposureListener::] 8a80854b6a90b5bc016ad81c2a136532: Visible ratio (0.00%) is not reach. Because:
{
OnScreen(100.00%) - Overlap(100.00%, androidx.appcompat.widget.AppCompatImageView{e98b07c V.ED..... ........ -833,138-1917,2888 #7f080113 app:id/obstruction} = 0.00%
}
```

请先根据以上 Log，确认覆盖住广告的 view(s) 是否可以进行调整，如果确实无法修改，请确认该 view 在视觉上不会影响广告展示 (alpha = 0, Hidden)，再参考以下范例，在建立 VpadnRequest 物件时，将该 view 设为Friendly Obstruction：


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

            VponBanner vponBanner = new VponBanner(context, bannerId, adSize);
            View obstructionView = findViewById(R.id.obstruction_view);

            VponAdRequest.Builder builder = new VponAdRequest.Builder();
            builder.addFriendlyObstruction(obstructionView, VponAdRequest.FriendlyObstructionPurpose.OTHER, "for demo");
            // obstructionView: insert the obstruction view that will be set as Friendly Obstruction
            // description: limit at 50 characters and characters contain only `A-z`,`0-9` or a space

            vponBanner.loadAd(builder.build());
            // Set ad request and load ad

            mainLayout.addView(vponBanner);
  	}
}

```

设置完成后，请确认当广告露出在页面上并达到曝光标准后，有印出以下 Log 代表广告有成功曝光：

```
I/VPON: [::Impression::]  response.code : 200
```



## 透过 AdMob Mediation 的设定方式 {#admob}
---

* 本介面适用于 `Vpon SDK v5.1.7` 及以上版本
* 本介面适用于 `Vpon AdMob Adapter v2.0.2` 及以上版本

当 adview 因为被其它 view(s) 覆盖住而造成无法成功送出 Impression 时，您会看到类似以下的 Log 提示您覆盖住广告的 view(s)：

```
W/VPON: [::AbsExposureListener::] 8a80854b6a90b5bc016ad81c2a136532: Visible ratio (0.00%) is not reach. Because:
{
OnScreen(100.00%) - Overlap(100.00%, androidx.appcompat.widget.AppCompatImageView{e98b07c V.ED..... ........ -833,138-1917,2888 #7f080113 app:id/obstruction} = 0.00%
}
```

请先根据以上 Log，确认覆盖住广告的 view(s) 是否可以进行调整，如果确实无法修改，请确认该 view 在视觉上不会影响广告展示 (alpha = 0, Hidden)，再参考以下范例，将该 view 设为 Friendly Obstruction：

```java
import com.vpon.ads.*;

public class MainActivity extends AppCompatActivity {
        
        private RelativeLayout mainLayout;

        @Override
  	    protected void onCreate(Bundle savedInstanceState) {
            setContentView(R.layout.activity_main);
            mainLayout = findViewById(R.id.main_layout);

            List<VponObstructView> vponObstructViews = new ArrayList<>();
            vponObstructViews.add(new VponObstructView(obstructionView, VponAdRequest.FriendlyObstructionPurpose.OTHER, "reason"));
            VpadnAdapter.getVponObstruction().addViews("VponLicenseKey", vponObstructViews);
            // !!! Must implement before load ad !!!
            // obstructionView: insert the obstruction view that will be set as Friendly Obstruction
            // description: limit at 50 characters and characters contain only `A-z`,`0-9` or a space
            // VponLicenseKey: insert Vpon License Key of this ad position

            ...
            mAdView = findViewById(R.id.adView);
            AdRequest adRequest = new AdRequest.Builder().build();
            mAdView.loadAd(adRequest);
            // Load AdMob Ad            
  	}
}
```

>**Note:** 
>* 请务必在向 AdMob 请求广告前完成 Friendly Obstruction 的设置
>* 请将 VponLicenseKey 换成该版位所使用的 VponLicenseKey (与 AdMob 中的设定一致)

设置完成后，请确认当广告露出在页面上并达到曝光标准后，有印出以下的 Log 代表广告有成功曝光：

```
I/VPON: [::Impression::]  response.code : 200
```


## 透过 MoPub Mediation 的设定方式 {#mopub}
---

* 本介面适用于 `Vpon SDK v5.1.7` 及以上版本
* 本介面适用于 `MoPub SDK v5.13.0` 及以上版本
* 本介面适用于 `Vpon MoPub Adapter v1.3.0` 及以上版本

当 adview 因为被其它 view(s) 覆盖住而造成无法成功送出 Impression 时，您会看到类似以下的 Log 提示您覆盖住广告的 view(s)：


```
W/VPON: [::AbsExposureListener::] 8a80854b6a90b5bc016ad81c2a136532: Visible ratio (0.00%) is not reach. Because:
{
OnScreen(100.00%) - Overlap(100.00%, androidx.appcompat.widget.AppCompatImageView{e98b07c V.ED..... ........ -833,138-1917,2888 #7f080113 app:id/obstruction} = 0.00%
}
```

请先根据以上 Log，确认覆盖住广告的 view(s) 是否可以进行调整，如果确实无法修改，请确认该 view 在视觉上不会影响广告展示 (alpha = 0, Hidden)，再参考以下范例，将该 view 设为 Friendly Obstruction。如果您是串接横幅广告，请参考以下范例：

```java
import com.vpon.ads.*;

public class MainActivity extends AppCompatActivity {
        
        private RelativeLayout mainLayout;

        @Override
  	    protected void onCreate(Bundle savedInstanceState) {
            setContentView(R.layout.activity_main);
            mainLayout = findViewById(R.id.main_layout);

            List<VponObstructView> vponObstructViews = new ArrayList<>();
            vponObstructViews.add(new VponObstructView(obstructionView, VponAdRequest.FriendlyObstructionPurpose.OTHER, "reason"));
            VponBannerCustomEvent.getVponObstruction().addViews("VponLicenseKey", vponObstructViews);
            // !!! Must implement before load ad !!!
            // obstructionView: insert the obstruction view that will be set as Friendly Obstruction
            // description: limit at 50 characters and characters contain only `A-z`,`0-9` or a space
            // VponLicenseKey: insert Vpon License Key of this ad position

            moPubView = (MoPubView) findViewById(R.id.adview);
            ...
            moPubView.loadAd();
            // Load AdMob Ad            
  	}
}
```

如果您是串接原生广告，请参考以下范例：

```java
import com.vpon.ads.*;

public class MainActivity extends AppCompatActivity {
        
        private RelativeLayout mainLayout;

        @Override
  	    protected void onCreate(Bundle savedInstanceState) {
            setContentView(R.layout.activity_main);
            mainLayout = findViewById(R.id.main_layout);

            moPubView = (MoPubView) findViewById(R.id.adview);
            moPubView.setAdUnitId("xxxxxxxxxxx");
            moPubView.setAdSize(MoPubAdSize);

            List<VponObstructView> vponObstructViews = new ArrayList<>();
            vponObstructViews.add(new VponObstructView(obstructionView, VponAdRequest.FriendlyObstructionPurpose.OTHER, "reason"));
            VponNativeCustomEvent.getVponObstruction().addViews("VponLicenseKey", vponObstructViews);
            // !!! Must implement before load ad !!!
            // obstructionView: insert the obstruction view that will be set as Friendly Obstruction
            // description: limit at 50 characters and characters contain only `A-z`,`0-9` or a space
            // VponLicenseKey: insert Vpon License Key of this ad position

            moPubView = (MoPubView) findViewById(R.id.adview);
            ...
            moPubView.loadAd();
            // Load AdMob Ad            
  	}
}
```

>**Note:** 
>* 请务必在向 AdMob 请求广告前完成 Friendly Obstruction 的设置
>* 请将 VponLicenseKey 换成该版位所使用的 VponLicenseKey (与 MoPub 中的设定一致)

设置完成后，请确认当广告露出在页面上并达到曝光标准后，有印出以下的 Log 代表广告有成功曝光：

```
I/VPON: [::Impression::]  response.code : 200
```





---
[直接串接 Vpon SDK 的设定方式]: {{ site.baseurl }}/zh-cn/android/addfriendlyobstruction/#vponsdk
[透过 AdMob Mediation 的设定方式]: {{ site.baseurl }}/zh-cn/android/addfriendlyobstruction/#admob
[透过 AdMob 串接 Vpon Native Ad]: {{ site.baseurl }}/zh-cn/android/mediation/admob/#customevent
[透过 MoPub Mediation 的设定方式]: {{ site.baseurl }}/zh-cn/android/addfriendlyobstruction/#mopub