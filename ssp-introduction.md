---
layout:         "default"
title:          "Integration with SSP"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /ssp/
lang:           "en"
---


# Overview
---
This article will give you basic knowlegde to integrate with Vpon SSP.

# Setup
---
If you have recieved the SSP Mobile Web interstitial placement tag, please follow the guide below. If not, please contact our [BD](mailto: bd.tw@vpon.com) for placement tag.

## Placement Tag
Please insert the code below into your websites.

``` html
<div id="your_placement_tag" type="int"></div>
<script type="text/javascript" src="//m.vpadn.com/ssp/vat.js"></script>
<script>vat.addPlacement('your_placement_tag');vat.load();</script>
```

<!-- >**Note:**
> 1. vat.load() should has only 1 in a page.
> 2. `<div>` with `id="your_placement_tag"` must put earlier than Vpon scripts.
> 3. Usage of `vat` must go after reading `vat.js`. -->
<blockquote>
<strong>Note:</strong>
<ol>
<li>vat.load() should has only 1 in a page.</li>
<li><code>&lt;div&gt;</code> with <code>id="your_placement_tag"</code> must put earlier than Vpon scripts.</li>
<li>Usage of <code>vat</code> must go after reading <code>vat.js</code>.</li>
<li>To customize ad layout, you are allow to use another <code>&lt;block&gt;</code> <code>&lt;/block&gt;</code> to wrap the tag, and given the block css style.</li>
</ol>
</blockquote>

## Test ads
### test attribute
To fetch test ads, please add `test` attribute into your `<div>`. For example:<br>

```html
<div id="your_placement_tag" type="int" test="1"></div>
```

* Normal ads when `test='0'`. (Default: test="0")
* Test ads when `test='1'`.

<img src="{{site.imgurl}}/SSP_Test_AD1.jpg" class="width-300">




# APIs for Publishers
---
Method Name	| Description	| Usage
:-------------: | :------------:|:-------------: |
addPlacement |	Add Placement (Ready for Request)	| vat.addPlacement(placement_id)
load |	Invoke the ad request and display all ads.(Executing fetchAds and showPlacement) |	vat.load()
fetchAds|Perform an asynchronous ad request for specific ad|	vat.fetchAds(placement_id)
showPlacement|	Display specified ads in the anchor locations.|	vat.showPlacement(placement_id)
addCallback	| Callback depends on the type (load)     | vat.addCallback(placement_id, "load", fn(empty))
addVariable	| A key-value pair to add to ad requests for the ad tag |	vat.addVariable('gender', 'male')

## Callback
You can add callbacks to ad displays by using `addCallback`. For example:

```html
<div id="your_placement_tag" type="int"></div>
<script type="text/javascript" src="//m.vpadn.com/ssp/vat.js"></script>
<script>
  function vponCallback(adEmpty) {
    if (adEmpty) {
      // do something
    }
  }
  vat.addPlacement('your_placement_tag');
  vat.addCallback('your_placement_tag', 'load', vponCallback);
  vat.load();
</script>
```

As the name implies, the method `addCallback` takes three parameters to add a callback to specific actions, *placement tag*, *method name*, and your *callback*.

In the example above, this generates a callback calling function `vponCallback` after `load` and decides whether ad empty by a placeholder with 1 for no ads and 0 for ad existed.


# Result
---
You will see the integration result as below:
<img src="{{site.imgurl}}/SSP_Test_AD2.jpg" class="width-300">
