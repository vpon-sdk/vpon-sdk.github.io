---
layout:         "android"
title:          "Android - ATS"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /android/ats/
lang:            "en"
---

# ATS SDK Integration Guidelines
---

Please integration ATS SDK using following guidelines, the SDK will send tracking information back to Vpon upon app launches.

# Download
---
You may download the ATS SDK from "for apps to Google Play store" or "upload app to other stores."

* [Download (for apps to Google Play store)][1]
* [Download (to other stores)][2]


# Integration Steps
---
## 1. Import libraries
Import VponAts.jar into your app project under “libs” folder.

## 2. Grant Permission
In order to present you with better analytics information, the SDK needs following additional permissions to be added to AndroidManifest.xml.

```xml
 <uses-permission android:name="android.permission.READ_PHONE_STATE" />
 <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
 <uses-permission android:name="android.permission.INTERNET" />
 <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
 <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
 ```

## 3. Integrating ATS SDK
Following snippet is a sample of how to integration ATS SDK in your app.
Please remember to put your goal ID in vponAts = new VponAts(this, " change here to your goal ID ", vponAtsListener);

``` java
package com.ats;
import com.vpon.ats.VponAts;
import com.vpon.ats.VponAtsListener;
import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.TextView;
public class ATSActivity extends Activity
{
    /* Called when the activity is first created. */
    VponAts vponAts;
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
      super.onCreate(savedInstanceState);
      setContentView(R.layout.main);
      vponAts = new VponAts(this, " change here to your goal ID ", vponAtsListener);
      if(vponAts != null)
      vponAts.tracker();
    }
    VponAtsListener vponAtsListener = new VponAtsListener() {
       @Override
       public void onVponAtsSuccess(String successMessage) {
           /* handle success */
       }
       @Override
       public void onVponAtsFail(String errorMessage) {
          /* handle fail */
       }
       @Override
       public void onVponAtsWarning(String warningMessage) {
           /* handle warning */
       }
     };
}
```


[1]: http://m.vpon.com/sdk/Android_ATS/vpadn-sdk-ats-obf102-01704102.jar
[2]: http://m.vpon.com/sdk/Android_ATS/vpadn-sdk-ats-obf101-40604102.jar
