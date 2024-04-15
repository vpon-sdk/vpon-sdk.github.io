---
layout:         "web"
title:          "Seller Reporting API"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       web/seller-reporting-api/
lang:           "en"
---

# Request for Use
---

If you have any demand on Reporting API, please make a request to [Vpon PDMKT Team] with your registered account in Vpon Publisher Console to get your API access Token.

# How To Use API
---

## Request

Vpon Seller Reporting API allow you to query data in 3 months, please refer below guideline to use the API:


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

## Parameters

| Parameter | Sample   | Description |
|:----------|:---------|:------------|
| from      | 20240101 | The start date for the report request can only retrieve data up to 3 months ago. If a date more than 3 months ago is entered, the data returned will still be up to three months old. |
| to        | 20240201 | The end date for the report request can only retrieve data up to the day before the request date. |
| token_str | sample   | API Token provide by Vpon BD. |

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
| date      | Date of the report |
| app_name  | App name registered in Vpon Publisher Console |
| banner_name | Placement name registered in Vpon Publisher Console |
| os        | App running OS |
| placement_type | Ad Type of the placement |
| subtype | Ad Subtype of the placement |
| request | Ad equest number |
| response | Ad filled number |
| impression | Ad impression number |
| click | Ad click number |
| revenue | Revenue of the placement |
| currency | Currency of the revenue |
| banner_id | License key of the placement |

> **Note:** If there is any discrepancy between the data obtained and what is displayed on the Vpon Publisher Console, please refer to the data displayed on the Vpon Developer Console.

[Vpon PDMKT Team]: mailto:partner.service@vpon.com