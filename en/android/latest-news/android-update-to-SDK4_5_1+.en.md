---
layout:         "android"
title:          "Update to SDK 4.5.1+ "
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /android/latest-news/update-to-SDK4_5_1+/
lang:           "en"

---

# Update to 4.5.1+
This news is to show why we suggest you to update the SDK from the previous one to the latest one (4.5.1+). In here, developer can determine what version of SDK are used. By releasing the latest version, developer can update the SDK.

# Why update to 4.5.1+?

1. The latest SDK(4.5.1+) provides publishers a more display-optional environment and better user experience. Some similar modifications could enhance the user experience.

2. After a security discussion with Google, we fixed a potential security problem to protect and make sure user’s network security. Publishers will have a higher-quality SDK in every application.

# How to determine the current SDK version?
There are two ways to detertmine the SDK version in the following:

1. The original file downloaded from Vpon SDK Document shows its version on its name. For instance, the SDK v4.5.1 for Android platform is named `vpadn-sdk-obf451-31406102-1604131557-ca97036.jar` ,  among which `obf451` is the hint to the version 4.5.1.

2. Another way is publishers could see the log messages while running apps which integrated Vpon SDK. Search the key word `doGetSdkParams`  in the log message. There is parameter called `sdk` in VPADN. It shows the current SDK version.
<img src="{{site.imgurl}}/Update to 4_5_1.png" >


# How to update to SDK 4.5.1+?
Publishers can download the SDK packages in the following link:
[Android SDK4.5.1+][1] <br>
Overwrite the current SDK with the latest one(4.5.1+), publishers can determine whether the SDK are updated or not by the ways list above.



[1]:{{ site.baseurl }}/android/download/
