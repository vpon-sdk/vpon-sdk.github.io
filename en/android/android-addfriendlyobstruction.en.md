---
layout:         "android"
title:          "Android - addFriendlyObstruction"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       android/addfriendlyobstruction/
lang:           "en"
---

# Overview
---

To make sure the ad display successfully and meet the Advertising Viewability Standards created by Interactive Advertising Bureau (IAB) and Media Rating Council (MRC), Vpon SDK would not allow any views in the app cover the adview.

Since that it might be necessary for Publishers to construct their App layout via some transparent or invisible view(s), Vpon SDK release a new interface addFriendlyObstruction that base on OM (Open Measurement) SDK Framework. In some inevitable scenario, you can set up `the view(s) which is necessary for the App but but won't coever the ad visually (the attribute of the cover view should be alpha = 0, Hidden)` as Friendly Obstruction.

Please select the instruction base on the way you integrate Vpon SDK to finish the implementation of addFriendlyObstruction.

* [Integrate Vpon SDK Directly]
* [Integrate Vpon SDK Via AdMob]
* [Integrate Vpon SDK Via MoPub]


## Integrate Vpon SDK Directly {#vponsdk}
---

* Available in `Vpon SDK v5.1.7` and above

When the ad can't send impression successfully after displayed since that the adview is cover by other view(s), you might see the log as below. This log will tell you the view(s) info which covered the adview.

```
W/VPON: [::AbsExposureListener::] 8a80854b6a90b5bc016ad81c2a136532: Visible ratio (0.00%) is not reach. Because:
{
OnScreen(100.00%) - Overlap(100.00%, androidx.appcompat.widget.AppCompatImageView{e98b07c V.ED..... ........ -833,138-1917,2888 #7f080113 app:id/obstruction} = 0.00%
}
```

Please check the log above to see if the cover view(s) can be adjusted. If not, please make sure that the adview won't be covered by the view visually (the attribute of the cover view should be alpha = 0, Hidden) and follow the instruction below to set the view as Friendly Obstruction when you create VpadnRequest.


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

Please help to check if below log printed after you implement addFriendlyObstruction and the ad display on the screen:

```
I/VPON: [::Impression::]  response.code : 200
```


## Integrate Vpon SDK Via AdMob {#admob}
---

* Available in `Vpon SDK v5.1.7` and above
* Available in `Vpon AdMob Adapter v2.0.2` and above

When the ad can't send impression successfully after displayed since that the adview is cover by other view(s), you might see the log as below. This log will tell you the view(s) info which covered the adview.

```
W/VPON: [::AbsExposureListener::] 8a80854b6a90b5bc016ad81c2a136532: Visible ratio (0.00%) is not reach. Because:
{
OnScreen(100.00%) - Overlap(100.00%, androidx.appcompat.widget.AppCompatImageView{e98b07c V.ED..... ........ -833,138-1917,2888 #7f080113 app:id/obstruction} = 0.00%
}
```

Please check the log above to see if the cover view(s) can be adjusted. If not, please make sure that the adview won't be covered by the view visually (the attribute of the cover view should be alpha = 0, Hidden) and follow the instruction below to set the view as Friendly Obstruction.


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
>* You `MUST` finish the implementation before loadAd()
>* Please replace "VponLicenseKey" with the Vpon License Key you set on AdMob Mediation


Please help to check if below log printed after you implement addFriendlyObstruction and the ad display on the screen:

```
I/VPON: [::Impression::]  response.code : 200
```


## Integrate Vpon SDK Via MoPub {#mopub}
---

* Available in `Vpon SDK v5.1.7` and above
* Available in `MoPub SDK v5.13.0` and above
* Available in `Vpon MoPub Adapter v1.3.0` and above


When the ad can't send impression successfully after displayed since that the adview is cover by other view(s), you might see the log as below. This log will tell you the view(s) info which covered the adview.

```
W/VPON: [::AbsExposureListener::] 8a80854b6a90b5bc016ad81c2a136532: Visible ratio (0.00%) is not reach. Because:
{
OnScreen(100.00%) - Overlap(100.00%, androidx.appcompat.widget.AppCompatImageView{e98b07c V.ED..... ........ -833,138-1917,2888 #7f080113 app:id/obstruction} = 0.00%
}
```

Please check the log above to see if the cover view(s) can be adjusted. If not, please make sure that the adview won't be covered by the view visually (the attribute of the cover view should be alpha = 0, Hidden) and follow the instruction below to set the view as Friendly Obstruction. For Banner Ads,

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

For Native Ads,

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
>* You `MUST` finish the implementation before loadAd()
>* Please replace "VponLicenseKey" with the Vpon License Key you set on AdMob Mediation


Please help to check if below log printed after you implement addFriendlyObstruction and the ad display on the screen:

```
I/VPON: [::Impression::]  response.code : 200
```




---
[Integrate Vpon SDK Directly]: {{ site.baseurl }}/android/addfriendlyobstruction/#vponsdk
[Integrate Vpon Native Ad via AdMob]: {{ site.baseurl }}/android/mediation/admob/#customevent
[Integrate Vpon SDK Via AdMob]: {{ site.baseurl }}/android/addfriendlyobstruction/#admob
[Integrate Vpon SDK Via MoPub]: {{ site.baseurl }}/android/addfriendlyobstruction/#mopub