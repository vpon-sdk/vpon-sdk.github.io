---
layout:         "android"
title:          "Android - Out-stream Video Ad"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       android/outstream/
lang:           "en"
---
# Overview
---
Vpon provide Out-stream Video Ad which served outside of a stream video. To optimize ad display performance, Out-stream Video Ad will show as native content and typically without sound to minimize the impact of user experience.

# Prerequisites
---
Before you start to integrate Out-stream Video Ad, please make sure you already finished the items below:

1. Import Vpon SDK to your project. If you haven't done yet, please refer to our [Integration Guide]({{site.baseurl}}/ios/integration-guide/) to finish your setting.
2. Contact [Vpon PDMKT Team] to set up your account and get your License Key.


# Start To Implement Out-stream Video Ad
---
Vpon provide 3 kinds of interface for Out-stream Video Ad, you can choose the one that match your requirement:

1. [ScrollView]
2. [ListView]
3. [RecyclerView]

## Show Out-stream Video Ad in A ScrollView {#scrollview}
---
To set up an Out-stream Video Ad in a ScrollView of the application, please follow the steps below:

1. Import com.vpon.ads.*
2. Declare an VpadnInReadAd instance
3. Create layout for ad display
4. Set up VpadnInReadAd instance and indicate a License Key
5. Request for an Out-stream Video Ad
6. Implement events for video ad
7. Implement VpadnAdListener

Please refer to the sample code below to finish your Out-stream Video Ad setting:

### Import Vpon SDK And Declare VpadnInReadAd

```java
import com.vpadn.ads.*;

public class MainActivity extends Activity {

    // Declare VpadnInReadAd instance
    private VpadnInReadAd inReadAd;

    // Please replace License Key with the one you received from Vpon
    private String licenseKey = "License Key" ;
    ...
}
```

### Create Layout For Ad Display
---
Please add a container for ad display in the ScrollView of your application, or you can refer to the sample code below to finish your setting:

```xml
<TextView
        android:id="@+id/hello"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent"/>
    <ScrollView
        android:id="@+id/scrollView"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        app:layout_constraintTop_toBottomOf="@+id/hello"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintBottom_toBottomOf="parent">
        <LinearLayout
            android:id="@+id/content_container"
            android:orientation="vertical"
            android:layout_width="match_parent"
            android:layout_height="wrap_content">
            <TextView
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:text="@string/news"/>
            <!-- Add Container -->
            <FrameLayout
                android:id="@+id/adContent"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"/>
            <TextView
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:text="@string/news"/>
        </LinearLayout>

    </ScrollView>
```

### Set Up VpadnInReadAd Instance And Indicate A License Key

```java
public class MainActivity extends Activity {
    protected void onCreate(Bundle savedInstanceState) {
        ...
        // Set up VpadnInReadAd instance and indicate a License Key
        inReadAd = new VpadnInReadAd(getActivity(), license Key);

        // Ad request
        VpadnAdRequest adRequest = new VpadnAdRequest();
        adRequest.setAdContainer(frameLayout);

        inReadAd.setAdListener(new MyAdListener());

        // Load ad
        inReadAd.loadAd(adRequest);
        ...
    }
}
```

## Show Out-stream Video Ad In A ListView {#listview}
---
To set up an Out-stream Video Ad in a ListView of the application, please follow the steps below:

1. Import com.vpon.ads.*
2. Declare an VpadnInReadAd instance
3. Implement ListView Adapter
4. Set up VpadnInReadAd instance and indicate a License Key
5. Request for an Out-stream Video Ad
6. Implement events for video ad
7. Implement VpadnAdListener

Please refer to the sample code below to finish your Out-stream Video Ad setting:

### Import Vpon SDK And Declare VpadnInReadAd

```java
import com.vpadn.ads.*;

public class MainActivity extends Activity {

    // Declare VpadnInReadAd instance
    private VpadnInReadAd inReadAd;

    // Please replace License Key with the one you received from Vpon
    private String licenseKey = "License Key" ;

    // Please modify the value to indicate the position that will show ad
    public static final int AD_POSITION = 15;
    ...
}
```

### Implement ListView Adapter
---
Please refer to the sample below to finish your ListView Adapter to show Out-stream Video Ad on your ListView.

```java
// ListAdapter must extends from BaseAdpater
public class MyListAdapter extends BaseAdapter {
    private static final String LT = "MyListAdapter";

    static class ViewHolder {
        public TextView title;
        }

    @Override
    public int getCount() { return 50; }

    @Override
    public Object getItem(int position) { return position; }

    @Override
    public long getItemId(int position) { return position; }

    @Override
    public View getView(int position, View convertView, ViewGroup viewGroup) {
        ViewHolder holder;
        if (convertView == null && viewGroup.getContext() != null) {
            convertView = LayoutInflater.from(viewGroup.getContext())
                    .inflate(R.layout.list_item, viewGroup, false);
            holder = new ViewHolder();
            holder.title = convertView.findViewById(R.id.item_label);
            convertView.setTag(holder);
        } else {
            holder = (ViewHolder) convertView.getTag();
        }

        Log.d(LT, "viewHolder is null ? "+(holder == null));
        if(position == BaseFragment.AD_POSITION -1){
            holder.title.setText("AD shows below");
        }else if(position == BaseFragment.AD_POSITION){
            holder.title.setText("AD shows above");
        }else{
            holder.title.setText("Hello Vpon(" + (position + 1) + ")");
        }
        Log.d(LT, "convertView.LayoutParam is null ? "+(convertView.getLayoutParams() == null));
        convertView.setBackgroundColor(Color.YELLOW);
        convertView.getLayoutParams().height = 100;
        convertView.setLayoutParams(convertView.getLayoutParams());
        return convertView;
    }
}
```

### Set Up VpadnInReadAd Instance And Indicate A License Key

```java
protected void onCreate(Bundle savedInstanceState) {
    ...
    // 設置 ListView
    ListView listView = view.findViewById(R.id.listView);
    MyListAdapter adapter = new MyListAdapter();
    listView.setAdapter(adapter);

    // Set up VpadnInReadAd instance and indicate a License Key
    inReadAd = new VpadnInReadAd(getActivity(), license Key);

    // Ad request
    VpadnAdRequest adRequest = new VpadnAdRequest();
    adRequest.setAdContainer(frameLayout);

    inReadAd.setAdListener(new MyAdListener());

    // Load ad
    inReadAd.loadAd(adRequest);
    ...
}
```

## Show Out-stream Video Ad in A RecyclerView {#recyclerview}
---
To set up an Out-stream Video Ad in a RecyclerView of the application, please follow the steps below:

1. Import com.vpon.ads.*
2. Declare an VpadnInReadAd instance
3. Implement RecyclerView Adapter
4. Set up VpadnInReadAd instance and indicate a License Key
5. Request for an Out-stream Video Ad
6. Implement events for video ad
7. Implement VpadnAdListener

Please refer to the sample code below to finish your Out-stream Video Ad setting:

### Import Vpon SDK And Declare VpadnInReadAd

```java
import com.vpadn.ads.*;
import com.vpon.vpon_inread.fragment.adapter.MyRecyclerAdapter;

public class MainActivity extends Activity {

    // Declare VpadnInReadAd instance
    private VpadnInReadAd inReadAd;

    // Please replace License Key with the one you received from Vpon
    private String licenseKey = "License Key" ;

    // Please modify the value to indicate the position that will show ad
    public static final int AD_POSITION = 15;
    ...
}
```

### Implement RecyclerView Adapter
---
To show Out-stream Video Ad in your RecyclerView, please replace android.support.v7.widget.RecyclerView.Adapter with `com.vpon.adapter.AbsRecyclerAdapter` and refer to the sample below to finish your RecyclerView Adapter.


```java
import com.vpon.adapter.AbsRecyclerAdapter;

// Please replace android.support.v7.widget.RecyclerView.Adapter with `com.vpon.adapter.AbsRecyclerAdapter`
// Recycler must extends from AbsRecyclerAdapter
public class MyRecyclerAdapter extends AbsRecyclerAdapter<MyRecyclerAdapter.ViewHolder> {
    private List<String> letters;

    public MyRecyclerAdapter(List<String> letters) {
        this.letters = letters;
    }

    class ViewHolder extends RecyclerView.ViewHolder {
        TextView textView;
        ViewHolder(@NonNull View convertView) {
            super(convertView);
            textView = convertView.findViewById(R.id.item_label);
        }
    }

    @Override
    protected void bindWrapViewHolder(@NonNull ViewHolder viewHolder, int position) {
        TextView tv = viewHolder.textView;

        if(position == BaseFragment.AD_POSITION -1){
            tv.setText("AD shows below");
        }else if(position == BaseFragment.AD_POSITION){
            tv.setText("AD shows above");
        }else{
            tv.setText(letters.get(position));
        }
    }

    @Override
    protected ViewHolder onWrapViewHolder(@NonNull ViewGroup viewGroup, int viewType) {
        View v = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.list_item, viewGroup, false);
        return new ViewHolder(v);
    }

    @Override
    protected int getWrapItemCount() {
        return letters.size();
    }
}
```

Please refer to the chart below to finish your Recyclerview.Adapter:

| RecyclerView.Adapter    | `AbsRecyclerAdapter`        |
| :----------------------:|:---------------------------:|
| onCreateViewHolder      | onWrapViewHolder            |
| onBindViewHolder        | bindWrapViewHolder          |
| getItemViewType         | getWrapItemViewType         |
| notifyItemRemoved       | wrapNotifyItemRemoved       |
| notifyItemChanged       | wrapNotifyItemChanged       |
| notifyItemRangeRemoved  | wrapNotifyItemRangeRemoved  |
| notifyItemRangeInserted | wrapNotifyItemRangeInserted |
| notifyItemRangeChanged  | wrapNotifyItemRangeChanged  |
| notifyItemMoved         | wrapNotifyItemMoved         |
| notifyItemInserted      | wrapNotifyItemInserted      |


### Set Up VpadnInReadAd Instance And Indicate A License Key

```java
protected void onCreate(Bundle savedInstanceState) {
    ...
    // Set up RecyclerView
    RecyclerView mRecyclerView = view.findViewById(R.id.recyclerView);
    mRecyclerView.setHasFixedSize(true);
    RecyclerView.LayoutManager mLayoutManager = new StaggeredGridLayoutManager(1, StaggeredGridLayoutManager.VERTICAL);
    mRecyclerView.setLayoutManager(mLayoutManager);
    List<String> letterList = new ArrayList<>(Arrays.asList(letters));

    MyRecyclerAdapter mAdapter = new MyRecyclerAdapter(letterList);
    mRecyclerView.setAdapter(mAdapter);

    // Set up VpadnInReadAd instance and indicate a License Key
    inReadAd = new VpadnInReadAd(getActivity(), license Key);

    // Ad request
    VpadnAdRequest adRequest = new VpadnAdRequest();
    adRequest.setAdContainer(recyclerView);
    adRequest.setAdPosition(AD_POSITION);

    inReadAd.setAdListener(new MyAdListener());

    // Load ad
    inReadAd.loadAd(adRequest);
    ...
}
```

# Implement events for video ad
---
Please add the code snippet as below in your Activity or Fragment to enhance ad performance:

```java
public class MainActivity extends Activity {
    ...
    @Override
    public void onResume() {
        super.onResume();
        android.util.Log.v("Vpon","onResume invoked!!");
        if(inReadAd != null){
            inReadAd.resume();
        }else{
            android.util.Log.v("Vpon", "inReadAd is null");
        }
    }
    
    @Override
    public void onPause() {
        android.util.Log.v("Vpon","onPause invoked!!");
        if(inReadAd != null){
            inReadAd.pause();
        }else{
            android.util.Log.v("Vpon", "inReadAd is null");
        }
        super.onPause();
    }
    
    @Override
    public void onDestroy() {
        android.util.Log.v("Vpon","onDestroy invoked!!");
        if(inReadAd != null){
            inReadAd.destroy();
        }else{
            android.util.Log.v("Vpon", "inReadAd is null");
        }
        super.onDestroy();
    }
}
```

# Implement VpadnAdListener
---
After finishing ad request, implement VpadnAdListener as below to listen ad status.

```java
public class MainActivity extends Activity {
    ...
    @Override
    public void onVpadnReceiveAd(VpadnAd ad) {
        Log.v("Vpon","onVpadnReceiveAd invoked!!");
    }
 
    @Override
    public void onVpadnFailedToReceiveAd(VpadnAd ad, VpadnAdRequest.VpadnErrorCode errorCode) {
        Log.v("Vpon","onVpadnFailedToReceiveAd invoked!!");
    }
 
    @Override
    public void onVpadnPresentScreen(VpadnAd ad) {
        Log.v("Vpon","onVpadnPresentScreen invoked!!");
    }
 
    @Override
    public void onVpadnDismissScreen(VpadnAd ad) {
        Log.v("Vpon","onVpadnDismissScreen invoked!!");
    }
 
    @Override
    public void onVpadnLeaveApplication(VpadnAd ad) {
        Log.v("Vpon","onVpadnLeaveApplication invoked!!");
    }
}
```


# Tips
---

### Sample Code
Please refer to our [Sample Code] for a complete integration sample.

### Other Tips
Please refer to the link below to learn more about other ad types:

* [Banner Ad](../banner)
* [Interstitial Ad](../Interstitial)
* [Native Ad](../native)
* [Mediation](../mediation)
* [Advanced](../advanced)

[串接說明]: ../integration-guide/
[Vpon PDMKT Team]: mailto:partner.service@vpon.com
[ScrollView]: {{site.baseurl}}/android/outstream/#scrollview
[ListView]: {{site.baseurl}}/android/outstream/#listview
[RecyclerView]:  {{site.baseurl}}/android/outstream/#recyclerview
[Sample Code]: ../download/