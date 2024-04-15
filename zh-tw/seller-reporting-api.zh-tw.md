---
layout:         "web"
title:          "Seller Reporting API 使用說明"
lead:           ""
description:    ""
keywords:       "Seller Reporting API 使用說明"
permalink:       zh-tw/seller-reporting-api/
lang:           "zh-tw"
---

# 提出使用需求
---

若您有 Reporting API 的使用需求，請向 [Vpon PDMKT Team] 提出使用需求，並附上您在 Vpon 開發商後台註冊的帳號，以便提供相應使用的 API Token。

# API 使用說明
---

## 請求方式

Vpon Seller Reporting API 提供三個月內的資料查詢，請見以下 API 使用說明：

API Endpoint
```
https://seller-report.vpon.com
```

Request URL
```
GET /api/banner_report	
```

Request Parameter
```
?from={YYYYMMDD}&to={YYYYMMDD}&token_str:{str}
```

Sample
```
https://seller-report.vpon.com/api/banner_report?from=20240101&to=20240201&token_str=8a80818234847dc90134898eaf312345
```

## 請求參數說明

| Parameter | Sample   | Description |
|:----------|:---------|:------------|
| from      | 20240101 | 請求報告的起始日，最多回應三個月前的數據；若填入大於三個月的日期，仍僅會回傳最多到三個月前的數據 |
| to        | 20240201 | 請求報告的結束日，最多回應請求當日前一日的數據 |
| token_str | sample   | API Token，將由 Vpon BD 提供 |

## 回應範例

```json
[
    { 
        "date": "2024-04-01",
        "appName": "[Vpon] 開發商測試用ID_iOS",
        "os": "iOS",
        "request": 1,
        "response": 0,
        "impression": 0,
        "click": 0,
        "revenue": 0.0,
        "currency": "TWD",
        "banner_name": "Vpon_testing_IS_iOS",
        "banner_id": "8a80854b6a90b5bc016ad81a98cf652e",
        "placement_type": "Interstitial",
        "subtype": "full_page"
    }
]
```

## 回應參數說明

| Parameter | Description |
|:----------|:------------|
| date      | 報告日期 |
| app_name  | 開發商後台所註冊的 App 名稱 |
| banner_name | 開發商後台所註冊的版位名稱 |
| os        | App 運行的 OS |
| placement_type | 版位類型 |
| subtype | 版位子類型 |
| request | 廣告請求數 |
| response | 廣告填充數 |
| impression | 廣告有效曝光數 |
| click | 廣告有效點擊數 |
| revenue | 收益 |
| currency | 收益幣值 |
| banner_id | 該版位的 License Key |

> **Note:** 若取得數據與 Vpon 開發商後台所展示的有所差異，請依 Vpon 開發商後台所展示的數據為主。


[Vpon PDMKT Team]: mailto:partner.service@vpon.com