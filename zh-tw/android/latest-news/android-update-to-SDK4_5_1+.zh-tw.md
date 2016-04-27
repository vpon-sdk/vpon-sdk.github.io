---
layout:         "android"
title:          "升級至 SDK 4.5.1+ "
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       zh-tw/android/latest-news/update-to-SDK4_5_1+/
lang:           "zh-tw"

---

# 升級至 SDK 4.5.1+
本文件中說明了 SDK版本從 4.5.0升級至 4.5.1+的緣由，開發者可由此文件的教學了解目前您正在使用的 SDK版本。透過文件中的說明與連結可將原先的版本升級至最新版(v4.5.1+)。

# 為何要升級 SDK至 4.5.1+？

1. 最新版的 SDK(4.5.1+)讓開發者擁有更多樣化顯示的環境，相關的介面改善可提供更優良的使用者體驗。

2. 經過與 Google討論了使用者相關的資訊安全問題，最新版的 SDK修正了可能潛在的安全漏洞，確保可提供給使用者一個無論在個人資料安全性與實際應用上都擁有良好品質的 SDK。

# 如何確認目前使用的 SDK版本？
以下提供兩種方式讓使用者可得知目前使用的 SDK版本：

1. 原始檔案從 Vpon Document上下載後，檔案名稱即顯示了該 SDK的版本。舉例來說，SDK 4.5.1 Android 版本的檔名為 `vpadn-sdk-obf451-31406102-1604131557-ca97036.jar`，其中 `obf451`即顯示了此版本為4.5.1。

2. 另一種方式為使用者可以檢視已串接 Vpon SDK的app在執行時產生的 log資料，搜尋關鍵字 `doGetSdkParams`後可找到相關資訊，其中有一個參數 `sdk`顯示的即為目前串接的SDK版本。
<img src="{{site.imgurl}}/Update to 4_5_1.png" >

# 如何升級至 SDK 4.5.1+？
使用者可以利用以下的連結下載新版的 SDK 4.5.1:
[Android SDK4.5.1+][1] <br>
將下載後的檔案覆蓋原有的.jar檔即可完成，使用者可再透過先前列出的方式確認目前使用的版本是否已更新為最新版 SDK 4.5.1+。


[1]:{{ site.baseurl }}/android/download/
