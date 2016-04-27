---
layout:         "android"
title:          "升級至 SDK 4.5.1+ "
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       zh-cn/android/latest-news/update-to-SDK4_5_1+/
lang:           "zh-cn"

---

# 升級至 SDK 4.5.1+
本文件中说明了 SDK版本从 4.5.0升级至 4.5.1+的缘由，开发者可由此文件的教学了解目前您正在使用的 SDK版本。透过文件中的说明与连结可将原先的版本升级至最新版(v4.5.1+)。

# 为何要升级 SDK至 4.5.1+？

1. 最新版的 SDK(4.5.1+)让开发者拥有更多样化显示的环境，相关的介面改善可提供更优良的使用者体验。

2. 经过与 Google讨论了使用者相关的资讯安全问题，最新版的 SDK修正了可能潜在的安全漏洞，确保可提供给使用者一个无论在个人资料安全性与实际应用上都拥有良好品质的 SDK。

# 如何确认目前使用的 SDK版本？
以下提供两种方式让使用者可得知目前使用的 SDK版本：

1. 原始档案从 Vpon Document上下载后，档案名称即显示了该 SDK的版本。举例来说，SDK 4.5.1 Android 版本的档名为 `vpadn-sdk-obf451-31406102-1604131557-ca97036.jar`，其中 `obf451`即显示了此版本为4.5.1。

2. 另一种方式为使用者可以检视已串接 Vpon SDK的app在执行时产生的 log资料，搜寻关键字 `doGetSdkParams`后可找到相关资讯，其中有一个参数 `sdk`显示的即为目前串接的 SDK版本。
<img src="{{site.imgurl}}/Update to 4_5_1.png" >

# 如何升级至 SDK 4.5.1+？
使用者可以利用以下的连结下载新版的 SDK 4.5.1:
[Android SDK4.5.1+][1] <br>
将下载后的档案覆盖原有的.jar档即可完成，使用者可再透过先前列出的方式确认目前使用的版本是否已更新为最新版 SDK 4.5.1+。


[1]:{{ site.baseurl }}/android/download/
