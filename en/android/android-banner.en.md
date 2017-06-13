---
layout:         "android"
title:          "Android - Banner Ad"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       android/banner/
lang:           "en"
---
## Finished Integration Guide
---
If you haven't finished the previous integration guide, please check all the [settings here](../integration-guide/).

# Coding for showing Banner
---
  Android apps are composed of View objects, Java instances the user sees as text areas, buttons and other controls. VpadnBanner is simply another View subclass displaying small HTML5 ads that respond to user touch.

  Like any view, an VpadnBanner may be created either purely in code or largely in XML.

  The five lines of code it takes to add a Vpon banner:

1. Import `com.vpadn.ads.*`
2. Declare an VpadnBanner instance
3. Create it, specifying a unit ID—your VpadnBanner Banner ID
4. Add the view to the UI
5. Load it with an ad

```java
  import com.vpadn.ads.*
  public class MainActivity extends Activity {
  	private RelativeLayout adBannerLayout;
  	private VpadnBanner vponBanner = null;
  	//Vpon TODO:  Banner ID
  	private String bannerId = CHANGE ME ;

         @Override
  	protected void onCreate(Bundle savedInstanceState) {
  		super.onCreate(savedInstanceState);
  		setContentView(R.layout.activity_main);
  		//get your layout view for Vpon banner
  		adBannerLayout = (RelativeLayout) findViewById(R.id.adLayout);
  		//create VpadnBanner instance
                  vponBanner = new VpadnBanner(this, bannerId, VpadnAdSize.SMART_BANNER, "TW");
  		VpadnAdRequest adRequest = new VpadnAdRequest();
  		//set auto refresh to get banner
  		adRequest.setEnableAutoRefresh(true);
                  //load vpon banner
  		vponBanner.loadAd(adRequest);
                  //add vpon banner to your layout view
  		adBannerLayout.addView(vponBanner);
  	}

  	@Override
  	protected void onDestroy() {
  		super.onDestroy();
  		if (vponBanner != null) {
  			//remember to call destroy method
  			vponBanner.destroy();
  			vponBanner = null;
  		}
  	}
    }
```
  <br>

# Create your banner in XML
---
``` xml
  <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
      xmlns:vpadn="http://schemas.android.com/apk/lib/com.vpadn.ads"
      android:id="@+id/mainLayout"
      android:layout_width="fill_parent"
      android:layout_height="fill_parent"
      android:orientation="vertical" >

  <RelativeLayout
          android:id="@+id/adLayout"
          android:layout_width="fill_parent"
          android:layout_height="wrap_content" >

          <com.vpadn.ads.VpadnBanner
              android:id="@+id/vpadnBannerXML"
              android:layout_width="wrap_content"
              android:layout_height="wrap_content"
              vpadn:adSize="SMART_BANNER"
              vpadn:autoFresh="true"
              vpadn:bannerId= CHANGE_ME
              vpadn:loadAdOnCreate="true"
              vpadn:platform="TW" />
      </RelativeLayout>
  </LinearLayout>
```
<br>
  As usual you must replace CHANGE ME with your Vpon Banner ID.
  You can use the following code to get the Test Banner If your banner ID has not been vetted.
<br>

```java
      VpadnAdRequest adRequest =  new VpadnAdRequest();
      HashSet<String> testDeviceImeiSet = new HashSet<String>();
      testDeviceImeiSet.add("your device advertising id");
      //TODO: put Android device advertising id
      adRequest.setTestDevices(testDeviceImeiSet);
      vponBanner.loadAd(adRequest);
```
  You can get advertising ID by following methods:
  1. Search "advertising_id" from eclipse's log.
  2. Get your Advertising ID by clicking Ads in Google Settings from your phone directly.


# Vpon Banner Size
---
Vpon Banner supports three tablet-only banner sizes in addition to the 320x50 shown on phones:

|      Size (WxH)            | Description    |  VponAdSize Constant            |
  :------------------------: | :-------------:| :-----------------------------:
  320x50                     | Standard Banner| VpadnAdSize.BANNER
  300x250                    |IAB Medium Recangle| VpadnAdSize.IAB\_MRECT
  468x60                     |IAB Full-Size Banner| VpadnAdSize.IAB\_BANNER
  728x90                     | IAB Leaderboard|  VpadnAdSize.IAB\_LEADERBOARD
  device width x auto height | Smart Banner    |  VpadnAdSize.SMART\_BANNER

  We recommend that you can use the smart banner constant. (Vpon Banner Don't support VpadnAdSize.IAB_WIDE_SKYSCRAPER)


# Banner auto-refresh
----
You need to use the following sample code to enable auto refresh banner.

```java
   VpadnAdRequest adRequest = new VpadnAdRequest();
   //set auto-refresh
   adRequest.setEnableAutoRefresh(true);
   adShowBanner.loadAd(adRequest);
```


# Download Sample code
---
[Go to download page][1]
<br>

# Results
---
Now run your demo app and you would see a banner at the top of the screen:
<img class="width-400" src="{{site.imgurl}}/A-sdk330-03.png" alt="successful result example">

# Other tips
> Please refer to [Interstitial Ads](../Interstitial)、[Native Ads](../native)、[Mediation](../mediation)、[Advanced Setting](../advanced) for more information.



[1]:{{ site.baseurl }}/android/download/
