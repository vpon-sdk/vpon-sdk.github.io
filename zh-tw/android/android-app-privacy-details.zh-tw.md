---
layout:         "android"
title:          "Android - App Privacy Details "
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-tw/android/app-privacy-details/
lang:           "zh-tw"
---
# 概要
---

根據 [Google Play 的政策更新]，在 2022 年 7 月 20 日後，上架 App 需說明程式的隱私權與安全性做法。本文將說明目前 Vpon SDK 的資料收集及使用狀況，您可以參考本文內容完成在 Google Play 上架所需填寫的資料。

請注意，本文僅提供一般情況下 Vpon SDK 所收集及使用的資料狀況，實際的資料收集及使用狀況，應視您在串接 Vpon SDK 時，是否有進行其它自定義串接 (例如[自定義廣告請求參數]) 來調整。

# 資料收集及使用狀況
---

| <b>Type of Data</b> | <b>Vpon SDK Collect</b> | <b>Data Usage</b> |
|:--------------------|:------------------------|:------------------|
|PSL_NAME|N| |
|PSL_EMAIL|N| |
|PSL_USER_ACCOUNT|N| |
|PSL_ADDRESS|N| |
|PSL_PHONE|N| |
|PSL_RACE_ETHNICITY|N| |
|PSL_POLITICAL_RELIGIOUS|N| |
|PSL_SEXUAL_ORIENTATION_GENDER_IDENTITY|N| |
|PSL_OTHER_PERSONAL|N| |
|PSL_PURCHASE_HISTORY|N| |
|PSL_CREDIT_SCORE|N| |
|PSL_CREDIT_DEBIT_BANK_ACCOUNT_NUMBER|N| |
|PSL_OTHER|N| |
|PSL_APPROX_LOCATION|Y|PSL_ADVERTISING|
|PSL_PRECISE_LOCATION|Y|PSL_ADVERTISING|
|PSL_WEB_BROWSING_HISTORY|N| |
|PSL_EMAILS|N| |
|PSL_SMS_CALL_LOG|N| |
|PSL_OTHER_MESSAGES|N| |
|PSL_PHOTOS|Y|PSL_ADVERTISING|
|PSL_VIDEOS|Y|PSL_ADVERTISING|
|PSL_AUDIO|N| |
|PSL_MUSIC|N| |
|PSL_OTHER_AUDIO|N| |
|PSL_HEALTH|N| |
|PSL_FITNESS|N| |
|PSL_CONTACTS|N| |
|PSL_CALENDAR|N| |
|PSL_CRASH_LOGS|N| |
|PSL_PERFORMANCE_DIAGNOSTICS|N| |
|PSL_OTHER_PERFORMANCE|N| |
|PSL_FILES_AND_DOCS|N| |
|PSL_USER_INTERACTION|N| |
|PSL_IN_APP_SEARCH_HISTORY|N| |
|PSL_APPS_ON_DEVICE|Y|PSL_ADVERTISING|
|PSL_USER_GENERATED_CONTENT|N| |
|PSL_OTHER_APP_ACTIVITY|N| |
|PSL_DEVICE_ID|Y|PSL_ADVERTISING|


[Google Play 的政策更新]: https://support.google.com/googleplay/android-developer/answer/10787469?hl=zh-Hant#
[自定義廣告請求參數]: https://wiki.vpon.com/zh-tw/android/advanced/