---
layout:         "android"
title:          "Android - App Privacy Details"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       android/app-privacy-details/
lang:           "en"
---

# Overview
---
According to [Google Play Policy Annoucement], Google Play requires that Developers disclose certain information usage regarding to the App since July 20, 2022. This guideline explains the Vpon SDK’s data collection and usage for a reference to answer the question in App Store Connect.

Please note that this is a general guideline for the data that Vpon SDK might collect. The precise data collection and usage will depend on your specific implemenation (e.g. [custom ad request parameters]) of the Vpon SDK.

# Data Collection And Usage
---

## Location

| <b>Type of Data</b> | <b>Description</b> | <b>Data Collected</b> | <b> Data Shared | <b>Data Usage</b> |
|:--------------------|:-------------------|:----------------------|:----------------|:------------------|
| Approximate location | User or device physical location to an area greater than or equal to 3 square kilometers, such as the city a user is in, or location provided by Android’s ACCESS_COARSE_LOCATION permission. | Y <br> Data encrypted in transit <br> Data is not processed ephemerally | Y | Advertising or marketing (with user consent)  |
| Precise location | User or device physical location within an area less than 3 square kilometers, such as location provided by Android’s ACCESS_FINE_LOCATION permission. | Y <br> Data encrypted in transit <br> Data is not processed ephemerally | Y | Advertising or marketing (with user consent)  |

> **Note:** Accroding to [Google Play Ad Policy],location permissions may only be requested to implement current features or services within your app, and may not request device location permissions solely for the use of ads.
>
> Please fill this field depend on your App.

## Personal info

| <b>Type of Data</b> | <b>Description</b> | <b>Data Collected</b> | <b> Data Shared | <b>Data Usage</b> |
|:--------------------|:-------------------|:----------------------|:----------------|:------------------|
| Name | How a user refers to themselves, such as their first or last name, or nickname. | N | N | |
| Email address | A user’s email address. | N | N | |
| User IDs | Identifiers that relate to an identifiable person. For example, an account ID, account number, or account name. | N | N | |
| Address | A user’s address, such as a mailing or home address. | N | N | |
| Phone Number | A user’s phone number. | N | N | |
| Race and ethnicity | Information about a user’s race or ethnicity. | N | N | |
| Political or religious beliefs | Information about a user’s political or religious beliefs. | N | N | |
| Sexual orientation | Information about a user’s sexual orientation. | N | N | |
| Other info | Any other personal information such as date of birth, gender identity, veteran status, etc. | N | N | |

## Financial info

| <b>Type of Data</b> | <b>Description</b> | <b>Data Collected</b> | <b> Data Shared | <b>Data Usage</b> |
|:--------------------|:-------------------|:----------------------|:----------------|:------------------|
| User payment info | Information about a user’s financial accounts such as credit card number. | N | N | |
| Purchase history | Information about purchases or transactions a user has made. | N | N | |
| Credit score | Information about a user’s credit score. | N | N | |
| Other financial info | Any other financial information such as user salary or debts. | N | N | |

## Health and fitness

| <b>Type of Data</b> | <b>Description</b> | <b>Data Collected</b> | <b> Data Shared | <b>Data Usage</b> |
|:--------------------|:-------------------|:----------------------|:----------------|:------------------|
| Health info | Information about a user's health, such as medical records or symptoms. | N | N | |
| Fitness info | Information about a user's fitness, such as exercise or other physical activity. | N | N | |

## Messages

| <b>Type of Data</b> | <b>Description</b> | <b>Data Collected</b> | <b> Data Shared | <b>Data Usage</b> |
|:--------------------|:-------------------|:----------------------|:----------------|:------------------|
| Emails | A user’s emails including the email subject line, sender, recipients, and the content of the email. | N | N | |
| SMS or MMS | A user’s text messages including the sender, recipients, and the content of the message. | N | N | |
| Other in-app messages | Any other types of messages. For example, instant messages or chat content. | N | N | |

## Photos and videos

| <b>Type of Data</b> | <b>Description</b> | <b>Data Collected</b> | <b> Data Shared | <b>Data Usage</b> |
|:--------------------|:-------------------|:----------------------|:----------------|:------------------|
| Photos | A user’s photos. | Y <br> Data is not processed ephemerally | N | Advertising or marketing (with user consent)  |
| Videos | A user’s videos. | Y <br> Data is not processed ephemerally | N | Advertising or marketing (with user consent)  |

## Audio files

| <b>Type of Data</b> | <b>Description</b> | <b>Data Collected</b> | <b> Data Shared | <b>Data Usage</b> |
|:--------------------|:-------------------|:----------------------|:----------------|:------------------|
| Voice or sound recordings | A user’s voice such as a voicemail or a sound recording. | N | N | |
| Music files | A user’s music files. | N | N | |
| Other audio files | Any other user-created or user-provided audio files. | N | N | |

## Files and docs

| <b>Type of Data</b> | <b>Description</b> | <b>Data Collected</b> | <b> Data Shared | <b>Data Usage</b> |
|:--------------------|:-------------------|:----------------------|:----------------|:------------------|
| Files and docs | A user’s files or documents, or information about their files or documents such as file names. | N | N | |

## Calendar

| <b>Type of Data</b> | <b>Description</b> | <b>Data Collected</b> | <b> Data Shared | <b>Data Usage</b> |
|:--------------------|:-------------------|:----------------------|:----------------|:------------------|
| Calendar events | Information from a user’s calendar such as events, event notes, and attendees. | N | N | |

## Contacts

| <b>Type of Data</b> | <b>Description</b> | <b>Data Collected</b> | <b> Data Shared | <b>Data Usage</b> |
|:--------------------|:-------------------|:----------------------|:----------------|:------------------|
| Contacts | Information about the user’s contacts such as contact names, message history, and social graph information like usernames, contact recency, contact frequency, interaction duration and call history. | N | N | |

## App activity

| <b>Type of Data</b> | <b>Description</b> | <b>Data Collected</b> | <b> Data Shared | <b>Data Usage</b> |
|:--------------------|:-------------------|:----------------------|:----------------|:------------------|
| App interactions | Information about how a user interacts with the app. For example, the number of times they visit a page or sections they tap on. | N | N | |
| In-app search history | Information about what a user has searched for in your app. | N | N | |
| Installed apps | Information about the apps installed on a user's device. | Y <br> Data encrypted in transit <br> Data is not processed ephemerally | Y | Advertising or marketing (with user consent)  |
| Other user-generated content | Any other user-generated content not listed here, or in any other section. For example, user bios, notes, or open-ended responses. | N | N | |
| Other actions | Any other user activity or actions in-app not listed here such as gameplay, likes, and dialog options. | N | N | |

## Web browsing

| <b>Type of Data</b> | <b>Description</b> | <b>Data Collected</b> | <b> Data Shared | <b>Data Usage</b> |
|:--------------------|:-------------------|:----------------------|:----------------|:------------------|
| Web browsing history | Information about the websites a user has visited. | N | N | |

## App info and performance

| <b>Type of Data</b> | <b>Description</b> | <b>Data Collected</b> | <b> Data Shared | <b>Data Usage</b> |
|:--------------------|:-------------------|:----------------------|:----------------|:------------------|
| Crash logs | Crash log data from your app. For example, the number of times your app has crashed, stack traces, or other information directly related to a crash. | N | N | |
| Diagnostics | Information about the performance of your app. For example battery life, loading time, latency, framerate, or any technical diagnostics. | N | N | |
| Other app performance data | Any other app performance data not listed here. | N | N | |

## Device or other IDs

| <b>Type of Data</b> | <b>Description</b> | <b>Data Collected</b> | <b> Data Shared | <b>Data Usage</b> |
|:--------------------|:-------------------|:----------------------|:----------------|:------------------|
| Device or other IDs | Identifiers that relate to an individual device, browser or app. For example, an IMEI number, MAC address, Widevine Device ID, Firebase installation ID, or advertising identifier. | Y <br> Data encrypted in transit <br> Data is not processed ephemerally | Y | Advertising or marketing (with user consent)  |


[Google Play Policy Annoucement]: https://support.google.com/googleplay/android-developer/answer/10787469
[custom ad request parameters]: https://wiki.vpon.com/android/advanced/
[Google Play Ad Policy]: https://support.google.com/googleplay/android-developer/answer/9857753?hl=en&sjid=3342757706590474119-AP