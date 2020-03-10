---
layout:         "android"
title:          "Android - Advanced"
lead:           "Optimizing your ads performance from advanced skills here."
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       android/advanced/
lang:           "en"
---

# Custom Ad Request Parameters
---
Add the optional parameters below when setting up VpadnAdRequest to make Vpon deliver more ads precisely.


```java
VponAdRequest.Builder builder = new VponAdRequest.Builder();

builder.setAutoRefresh(boolean);
// Only available for Banner Ad, will auto refresh ad if set true
builder.addTestDevice(String);
// Set your test device's GAID here if you're trying to get Vpon test ad

builder.setGender(VponAdRequest.Gender.UNSPECIFIED);
// Set user's gender if available
builder.setBirthday(Date);
// Set user's birthday if available
builder.setLocation(Location);
// Set user's location if available

builder.setMaxAdContentRating(String);
// To set up the maximum content rating filter
builder.setTagForUnderAgeOfConsent(-1);
// To set up if the ads will be displayed only to the specific ages of audience
builder.tagForChildDirectedTreatment(-1);
// To set up if the ads will be displayed to childern specific

builder.addKeyword(String);
builder.addKeywords(Set<String>);
```

>**Note:** Please refer to the reference below for the description of specific custom parameters

## MaxAdContentRating

|Constant|Description|
|:------|:---------|
|T| For teenager|
|PG| For parent guardian|
|MA| For mature adult|
|G| For general, any one, include child age under|

## TagForUnderAgeOfConsent

|Constant|Description|
|:------|:---------|
|1|TAG_FOR_UNDER_AGE_OF_CONSENT_TRUE|
|0|TAG_FOR_UNDER_AGE_OF_CONSENT_FALSE|
|-1|(Default Value)<br>TAG_FOR_UNDER_AGE_OF_CONSENT_UNSPECIFIED|

## TagForChildDirectedTreatment

|Constant|Description|
|:------|:---------|
|1|TAG_FOR_CHILD_DIRECTED_TREATMENT_TRUE|
|0|TAG_FOR_CHILD_DIRECTED_TREATMENT_FALSE|
|-1|(Default Value)<br>TAG_FOR_CHILD_DIRECTED_TREATMENT_UNSPECIFIED|


<!-- # Corona User
---
1. Please refer to [Vpon Web SDK Integration Guide]({{site.baseurl}}/web/) to prepare a HTML file with ad request
2. Load the HTML file in WebView, for example, webView:request("localfile.html", system.ResourceDirectory)

> **Note:** To know more about Corona, please refer to [Corona Document](http://docs.coronalabs.com/api/library/native/newWebView.html) -->

[Register as a Vpon Publisher]: {{ site.baseurl }}/android/registration/