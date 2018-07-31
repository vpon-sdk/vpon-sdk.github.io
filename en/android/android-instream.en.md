---
layout:         "android"
title:          "Android - In-stream Video Ad"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       android/instream/
lang:           "en"
---

# Overview
---
Vpon provide In-stream Video Ad which can help to maximum your monetization with your video traffic.

# Prerequisites
---
Before you begin to integrate Vpon In-stream Video Ad, you'll need the following:

1. Contact [Vpon BD] to set up your account and get your license id.<br>
2. Provide your own VAST / VPAID complicant video player. (Strongly recommneded that your video player is integrated with [Google IMA SDK].)<br>
3. Get an ad request URL from Vpon.

# Start to integrate
---
We suggest that you can manage your in-stream video ads request wtih DFP

:

1. Create a video Tag
2. Create a line item for In-stream Video Ads in your DFP and set a creative for this. Paste the video tag into the creative.


## Create A Video Tag
---
To integrate Vpon In-stream Video Ad, you might got a request URL from Vpon. Set up your unique video tag with following parameters.

>* Note: Several of these parameters need to be URL Encoded.

| Parameter    | Required     | <center>Description</center> | <center>Example</center>     |
|:------------:|:------------:|:-----------------------------|:-----------------------------|
| id           | Y            | Unique ID of placement       | |
| size         | Y            | Requested video ads size     | 320x50                       |
| ua           | Recommended  | User agent associate with the device requsting an ad.| |




[Vpon BD]: mailto:bd@vpon.com
[Google IMA SDK]: https://developers.google.com/interactive-media-ads/docs/sdks/android/
