---
layout: "ios"
title: "iOS - App Privacy Details"
lead: ""
description: "App Privacy Details on App Store"
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-tw/ios/app-privacy-details
lang: "zh-tw"
---
# 概覽
---
根據 [App privacy details on the App Store]，Apple 要求開發商自 2020 年 12 月 8 日起，需要在 App 的產品介紹頁中告知使用者關於 App 中會收集的資料。本文將說明目前 Vpon SDK 的資料收集及使用狀況，您可以參考本文內容完成在 App Store Connect 上架所需填寫的資料。

請注意，本文僅提供一般情況下 Vpon SDK 所收集及使用的資料狀況，實際的資料收集及使用狀況，應視您在串接 Vpon SDK 時，是否有進行其它自定義串接 (例如[自定義廣告請求參數]) 來調整。

# 資料收集及使用狀況
---

## 聯絡資訊
---

| <b>Data Type</b> | <b>Description</b> | <b>Vpon SDK Collect</b> | <b>Data Usage</b> |
| 姓名 | 包括姓氏或名字 | N | |
| 電子郵件地址 | 包括但不限於雜湊的電子郵件地址 | N | |
| 電話號碼 | 包括但不限於雜湊的電話號碼 | N | |
| 實體地址 | 例如住家地址、實體地址或郵寄地址 | N | |
| 其他使用者聯絡資訊 | 任何其他可用於在 App 之外與用戶聯繫的訊息 | N | |

## 健康與健身
---

| <b>Data Type</b> | <b>Description</b> | <b>Vpon SDK Collect</b> | <b>Data Usage</b> |
| 健康 | 健康和醫療資料 (包括但不限於來自臨床健康記錄 API、HealthKit API、動作障礙 API、健康相關的人類受試者研究的資料、或使用者提供的任何其他健康或醫療資料) | N | |
| 健身 | 健身與運動資料 (包括但不限於動作和健身 API) | N | |

## 財務資訊
---

| <b>Data Type</b> | <b>Description</b> | <b>Vpon SDK Collect</b> | <b>Data Usage</b> |
| 付款資訊 | 例如付款方式、付款卡號或銀行帳戶號碼 (若您的 App 使用了付款服務、付款資訊是在 App 以外之處輸入，且作為開發者的您對該資訊並不具備權限，則系統不會收集此類資料，而您也無須註明其使用方式。) | N | |
| 信用資訊 | 例如信用分數 | N | |
| 其他財務資訊 | 例如薪資、收入、資產、債務或任何其他財務資訊 | N | |

## 位置
---

<table>
    <tr>
        <td><b>Data Type</b></td> 
        <td><b>Description</b></td>
        <td><b>Vpon SDK Collect</b></td>
        <td><b>Data Usage</b></td> 
   </tr>
    <tr>
        <td >精確位置</td>
        <td >描述使用者或裝置地點的資訊 (使用的解析度為等於或大於帶有三位或更多位小數的經緯度)</td>
        <td >Y</td>
        <td rowspan="2"><b>Third-Party Advertising</b> <br> <br>當 App 啟用定位服務且使用者同意提供該項授權時，Vpon SDK 可能會收集精確或粗略位置的資訊</td>
    </tr>
    <tr>
        <td >粗略位置</td> 
        <td >描述使用者或裝置地點的資訊 (使用的解析度為低於帶有三位或更多位小數的經緯度)，例如約略位置的服務</td>
        <td >Y</td> 
    </tr>
</table>

## 敏感資訊
---

| <b>Data Type</b> | <b>Description</b> | <b>Vpon SDK Collect</b> | <b>Data Usage</b> |
| 敏感資訊 | 例如種族或族裔資料、性傾向、懷孕或分娩資訊、殘疾、宗教或哲學信仰、工會會員身份、政治觀點、遺傳資訊或生物辨識資料 | N | |

## 聯絡人
---

| <b>Data Type</b> | <b>Description</b> | <b>Vpon SDK Collect</b> | <b>Data Usage</b> |
| 聯絡人 | 聯絡人清單、地址簿或其他社交聯繫清單 | N | |

## 使用者內容
---

| <b>Data Type</b> | <b>Description</b> | <b>Vpon SDK Collect</b> | <b>Data Usage</b> |
| 電子郵件或訊息 | 包括主旨行、寄件人、收件人以及電子郵件或訊息的內容 | N | |
| 照片或影片 | 使用者的照片或影片 | Y | <b>Third-Party Advertising</b> <br> <br> 當需要提供多元位廣告體驗 (例如 VR) 時，Vpon SDK 可能會要求使用者授權提供相機及照片的存取權 |
| 音訊資料 | 使用者語音或聲音的錄音資料 | N | |
| 遊戲內容 | 例如使用者在遊戲中所產生的內容 | N | |
| 客戶支援 | 使用者在客戶支援要求期間所產生的資料 | N | |
| 其他使用者內容 | 使用者所產生的任何其他內容 | N | |

## 瀏覽記錄
---

| <b>Data Type</b> | <b>Description</b> | <b>Vpon SDK Collect</b> | <b>Data Usage</b> |
| 瀏覽記錄 | 使用者瀏覽過的 App 以外內容 (如網站) 之相關資訊 | N | |

## 搜尋記錄
---

| <b>Data Type</b> | <b>Description</b> | <b>Vpon SDK Collect</b> | <b>Data Usage</b> |
| 搜尋記錄 | 在 App 中執行過的搜尋之相關資訊 | N | |

## 識別碼
---

| <b>Data Type</b> | <b>Description</b> | <b>Vpon SDK Collect</b> | <b>Data Usage</b> |
| 使用者識別碼 | 例如用戶名稱、帳號名稱、帳號識別碼、指派的使用者識別碼、客戶編號、機率性識別碼、可用於識別特定使用者或帳號的其他使用者層級或帳號層級識別碼 | N | |
| 裝置識別碼 | 例如裝置的廣告識別碼或其他裝置層級的識別碼 | Y | <b>Third-Party Advertising</b> <br> <br> 當使用者提供授權時，Vpon SDK 會收集裝置識別碼，包含 IDFA, IDFV 及 Vpon 識別碼 |

## 購買項目
---

| <b>Data Type</b> | <b>Description</b> | <b>Vpon SDK Collect</b> | <b>Data Usage</b> |
| 購買歷史記錄 | 帳戶或個人的購買項目或購買傾向 | N | |

## 使用狀況資料
---

| <b>Data Type</b> | <b>Description</b> | <b>Vpon SDK Collect</b> | <b>Data Usage</b> |
| 產品互動 | 例如 App 啟動、點擊、按壓、捲動的資訊、音樂聆聽資料、影片瀏覽次數、遊戲儲存地點、影片或歌曲、使用者與 App 互動的其他相關資訊 | N | |
| 廣告資料 | 例如使用者所看過廣告的相關資訊 | Y | <b>Third-Party Advertising</b> <br> <br>Vpon SDK 可能會收集廣告及廣告互動資料，包含瀏覽及點擊等互動 |
| 其他使用狀況資料 | App 中與使用者活動相關的任何其他資料 | N | |

## 診斷
---

| <b>Data Type</b> | <b>Description</b> | <b>Vpon SDK Collect</b> | <b>Data Usage</b> |
| 當機資料 | 例如當機記錄檔 | N | |
| 效能資料 | 例如啟動時間、當機率或耗電量 | N | |
| 其他診斷資料 | 為了 App 相關的技術診斷測量所需而收集的任何其他資料 | N | |

## 其他資料
---

| <b>Data Type</b> | <b>Description</b> | <b>Vpon SDK Collect</b> | <b>Data Usage</b> |
| 其他資料 | 未提及的任何資料類型 | Y | <b>Third-Party Advertising</b> <br> <br> Vpon SDK 可能會收集使用者的裝置型號及網路連線狀況等資料 |


[App privacy details on the App Store]: https://developer.apple.com/app-store/app-privacy-details/
[自定義廣告請求參數]: https://wiki.vpon.com/zh-tw/ios/advanced/#custreq