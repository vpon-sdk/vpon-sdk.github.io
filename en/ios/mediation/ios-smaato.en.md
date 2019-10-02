---
layout: "ios"
title: "iOS - Smaato"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /ios/mediation/smaato/
lang: "en"
---

# General
---
Please make sure you've added following files in your project:

1. Smaato SDK
2. Vpon SDK
3. Vpon Smaato SOMAMediationPlugin

And please refer to our [Integration Guide] to initial Vpon iOS SDK before you start setting.

# Smaato Settings
---
To setup Smaato, you need to complete the following steps:

## Step1: Add your App
Create your Smaato publisher account first, then click "New App" to add you app.
![][1]

## Step2: Add an AD unit
Insert your app information in App Details and create the ad units in Define Adspaces.
![][2]

## Step3: Add Vpon AD Network
Go to "Networks" tab and click "New Network".
![][3]

## Step4: Custom SDK Network
Click "Add Custom SDK Network"，and click "Save & Add Line Item"
![][4]
![][5]

## Step5: Name your Line Item
To make your line item manageable, fill in a legibility name for it.
![][6]

## Step6: Setting your Line Item
Define the Priority, Traffic Allocation and the period of the campaign of the line item first. Then you have to insert the Class Name of the Custom Plugin and the Method Name you use. If you plan to request ads from Vpon, please refer to the picture below to fill the blanks.
![][7]

## Step7: Setting you Line Item Target
Set up the app in the Inventory tab for Vpon AD Network.
![][8]

## Step8: Finish and save your Line Item Setting
Click "Save" to save the line item setting.


  [1]: {{site.imgurl}}/Smaato_001.png
  [2]: {{site.imgurl}}/Smaato_011.png
  [3]: {{site.imgurl}}/Smaato_003.png
  [4]: {{site.imgurl}}/Smaato_004.png
  [5]: {{site.imgurl}}/Smaato_005.png
  [6]: {{site.imgurl}}/Smaato_006.png
  [7]: {{site.imgurl}}/Smaato_012.png
  [8]: {{site.imgurl}}/Smaato_014.png
[Integration Guide]: ../../integration-guide/#initial-sdk