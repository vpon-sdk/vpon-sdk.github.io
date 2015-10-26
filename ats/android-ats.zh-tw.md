---
layout:         "android"
title:          "Android - ATS"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-tw/android/ats/
lang:            "zh-tw"
---

# ATS SDK 整合
---
請用以下方式整合 ATS SDK，在每次應用程式載入時，將轉換資訊傳給 Vpon

# 下載
---
請在整合 SDK 前先準備好 SDK，您可點選下載 SDK 包，下載後解壓縮檔案並開始整合步驟

* [下載(上架至 Google Play store)][1]
* [下載(上架至非 Google Play store)][2]


# 整合步驟
---
## 1. 匯入 Libs:
在專案中建立新資料夾，將 `VponAts.jar` 匯入 `libs` 資料夾中

## 2. 授權
在 Vpon ATS SDK 中，需要存取「網路」、「位置」、「手機狀態」，因此需要新增下列的程式碼至 `AndroidManifest.xml`


```xml
 <uses-permission android:name="android.permission.READ_PHONE_STATE" />
 <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
 <uses-permission android:name="android.permission.INTERNET" />
 <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
 <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
 ```

## 3. 新增 VponATS 至您程式碼

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
> **Note:** 請記得在此換上您的 Goal ID

> vponAts = new VponAts(this, "change here to your goal ID ", vponAtsListener);



[1]: http://m.vpon.com/sdk/Android_ATS/vpadn-sdk-ats-obf102-01704102.jar
[2]: http://m.vpon.com/sdk/Android_ATS/vpadn-sdk-ats-obf101-40604102.jar
