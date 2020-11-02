---
layout:         "android"
title:          "Android - addFriendlyObstruction"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-tw/android/addfriendlyobstruction/
lang:            "zh-tw"
---

# 概覽
---

為了確保每次的廣告展示都有讓廣告素材確實露出，且符合 Interactive Advertising Bureau (IAB) 及 Media Rating Council (MRC) 提出的廣告可視率標準，一般而言，Vpon SDK 不允許 App 任何的 view 以任何形式覆蓋在 Vpon adview 之上。

考量到 App layout 設計所需，App 可能必須要透過透明或不可見的 view(s) 完成版面的設置。因此，Vpon 根據 OM (Open Measurement) SDK Framework 推出 addFriendlyObstruction 的新介面，在無法避免的狀況下，您可以透過 addFriendlyObstruction 的介面，將`實作上必須存在且在視覺上不會影響廣告展示的 view (alpha = 0, Hidden)` 設為 Friendly Obstruction。

本文將引導您完成 addFriendlyObstruction 的實作，請依您串接 SDK 的方式選擇對應的說明。

* [直接串接 Vpon SDK 的設定方式]
* [透過 AdMob Mediation 的設定方式]
* [透過 MoPub Mediation 的設定方式]


## 直接串接 Vpon SDK 的設定方式 {#vponsdk}
---

* 本介面適用於 `Vpon SDK v5.1.7` 及以上版本

當 adview 因為被其它 view(s) 覆蓋住而造成無法成功送出 Impression 時，您會看到類似以下的 Log 提示您覆蓋住廣告的 view(s)：

```
W/VPON: [::AbsExposureListener::]  <VPON> [ERROR] [AD VIEWABILITY] 8a80854b6a90b5bc016ad81c2a136532: Visible ratio (0.00%) is not reach. Because:
{
OnScreen(100.00%) - Overlap(100.00%, androidx.appcompat.widget.AppCompatImageView{e98b07c V.ED..... ........ -833,138-1917,2888 #7f080113 app:id/obstruction} = 0.00%
}
```

請先根據以上 Log，確認覆蓋住廣告的 view(s) 是否可以進行調整，如果確實無法修改，請確認該 view 在視覺上不會影響廣告展示 (alpha = 0, Hidden)，再參考以下範例，在建立 VpadnRequest 物件時，將該 view 設為 Friendly Obstruction：


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

            vponBanner.loadAd(builder.build());
            // Set ad request and load ad

            mainLayout.addView(vponBanner);
  	}
}
```

設置完成後，請確認當廣告露出在頁面上並達到曝光標準後，有印出以下的 Log 代表廣告有成功曝光：

```
I/VPON: [::Impression::]  response.code : 200
```

## 透過 AdMob Mediation 的設定方式 {#admob}
---

* 本介面適用於 `Vpon SDK v5.1.7` 及以上版本
* 本介面適用於 `Vpon AdMob Adapter v2.0.2` 及以上版本

當 adview 因為被其它 view(s) 覆蓋住而造成無法成功送出 Impression 時，您會看到類似以下的 Log 提示您覆蓋住廣告的 view(s)：

```
W/VPON: [::AbsExposureListener::]  <VPON> [ERROR] [AD VIEWABILITY] 8a80854b6a90b5bc016ad81c2a136532: Visible ratio (0.00%) is not reach. Because:
{
OnScreen(100.00%) - Overlap(100.00%, androidx.appcompat.widget.AppCompatImageView{e98b07c V.ED..... ........ -833,138-1917,2888 #7f080113 app:id/obstruction} = 0.00%
}
```

請先根據以上 Log，確認覆蓋住廣告的 view(s) 是否可以進行調整，如果確實無法修改，請確認該 view 在視覺上不會影響廣告展示 (alpha = 0, Hidden)，再參考以下範例，將該 view 設為 Friendly Obstruction：

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
            vponObstructViews.add(new VponObstructView(obstructionView2, VponAdRequest.FriendlyObstructionPurpose.OTHER, "reason"));
            VpadnAdapter.getVponObstruction().addViews("VponLicenseKey", vponObstructViews);
            // !!! Must implement before load ad !!!
            // obstructionView: insert the obstruction view that will be set as Friendly Obstruction
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
>* 請務必在請求廣告前完成 Friendly Obstruction 的設置
>* 請將 VponLicenseKey 換成該版位所使用的 VponLicenseKey (與 AdMob 中的設定一致)


設置完成後，請確認當廣告露出在頁面上並達到曝光標準後，有印出以下的 Log 代表廣告有成功曝光：

```
I/VPON: [::Impression::]  response.code : 200
```


## 透過 MoPub Mediation 的設定方式 {#mopub}
---

* 本介面適用於 `Vpon SDK v5.1.7` 及以上版本
* 本介面適用於 `MoPub SDK v5.13.0` 及以上版本
* 本介面適用於 `Vpon MoPub Adapter v1.2.0` 及以上版本

當 adview 因為被其它 view(s) 覆蓋住而造成無法成功送出 Impression 時，您會看到類似以下的 Log 提示您覆蓋住廣告的 view(s)：

```
W/VPON: [::AbsExposureListener::]  <VPON> [ERROR] [AD VIEWABILITY] 8a80854b6a90b5bc016ad81c2a136532: Visible ratio (0.00%) is not reach. Because:
{
OnScreen(100.00%) - Overlap(100.00%, androidx.appcompat.widget.AppCompatImageView{e98b07c V.ED..... ........ -833,138-1917,2888 #7f080113 app:id/obstruction} = 0.00%
}
```

請先根據以上 Log，確認覆蓋住廣告的 view(s) 是否可以進行調整，如果確實無法修改，請確認該 view 在視覺上不會影響廣告展示 (alpha = 0, Hidden)，再參考以下範例，將該 view 設為 Friendly Obstruction。如果您是串接橫幅廣告，請參考以下範例：

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
            vponObstructViews.add(new VponObstructView(obstructionView2, VponAdRequest.FriendlyObstructionPurpose.OTHER, "reason"));
            VponBannerCustomEvent.getVponObstruction().addViews("VponLicenseKey", vponObstructViews);
            // !!! Must implement before load ad !!!
            // obstructionView: insert the obstruction view that will be set as Friendly Obstruction
            // VponLicenseKey: insert Vpon License Key of this ad position

            moPubView = (MoPubView) findViewById(R.id.adview);
            ...
            moPubView.loadAd();
            // Load AdMob Ad            
  	}
}
```

如果您是串接原生廣告，請參考以下範例：

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
            vponObstructViews.add(new VponObstructView(obstructionView2, VponAdRequest.FriendlyObstructionPurpose.OTHER, "reason"));
            VponNativeCustomEvent.getVponObstruction().addViews("VponLicenseKey", vponObstructViews);
            // !!! Must implement before load ad !!!
            // obstructionView: insert the obstruction view that will be set as Friendly Obstruction
            // VponLicenseKey: insert Vpon License Key of this ad position

            moPubView = (MoPubView) findViewById(R.id.adview);
            ...
            moPubView.loadAd();
            // Load AdMob Ad            
  	}
}
```

>**Note:** 
>* 請務必在請求廣告前完成 Friendly Obstruction 的設置
>* 請將 VponLicenseKey 換成該版位所使用的 VponLicenseKey (與 MoPub 中的設定一致)


設置完成後，請確認當廣告露出在頁面上並達到曝光標準後，有印出以下的 Log 代表廣告有成功曝光：

```
I/VPON: [::Impression::]  response.code : 200
```





---
[直接串接 Vpon SDK 的設定方式]: {{ site.baseurl }}/zh-tw/android/addfriendlyobstruction/#vponsdk
[透過 AdMob Mediation 的設定方式]: {{ site.baseurl }}/zh-tw/android/addfriendlyobstruction/#admob
[透過 AdMob 串接 Vpon Native Ad]: {{ site.baseurl }}/zh-tw/android/mediation/admob/#customevent
[透過 MoPub Mediation 的設定方式]: {{ site.baseurl }}/zh-tw/android/addfriendlyobstruction/#mopub