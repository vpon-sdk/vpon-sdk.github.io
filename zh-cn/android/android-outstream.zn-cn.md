---
layout:         "android"
title:          "Android - Out-stream 影音广告 "
lead:           "Android - Out-stream"
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-cn/android/outstream/
lang:           "zh-cn"
---
# 概要
---
Vpon Out-stream 影音广告提供串流外的影音广告服务，透过将影音广告嵌入应用程式内容之间，以原生方式呈现广告，同时预设为静音播放，基于用户体验的考量，不影响使用者的阅读状态。

# 完成串接指示
---
在开始串接广告之前，请确认您已经完成以下准备：

1. 将 Vpon SDK 导入您的专案中，若您尚未完成，请先参考[串接说明]完成相关设定
2. 联系[Vpon PDMKT Team] 完成帐号设定，并取得您的 License Key

# 开始撰写 Out-stream 影音广告
---
Vpon Out-stream 影音串流广告提供 3 种串流外的影音广告形式，分别为：

1. [ScrollView]
2. [ListView]
3. [RecyclerView]

请依您的需求选择 Out-stream 影音广告的形式。

## 在 ScrollView 中展示 Out-stream 影音广告 {#scrollview}
---
在应用程式中的 ScrollView 建立 Out-stream 影音广告需要执行以下步骤：

1. 汇入 `com.vpadn.ads.*`
2. 宣告 `VpadnInReadAd`
3. 建立广告呈现的 Layout
4. 建立 VpadnInReadAd 物件，并指定 License Key
5. 拉取广告
6. 实作影音广告行为 Event
7. 实作 VpadnAdListener

请参考以下范例，完成 Out-stream 影音广告设定：

### Import Vpon SDK 并宣告 VpadnInReadAd

```java
import com.vpadn.ads.*;

public class MainActivity extends Activity {

    // 宣告 VpadnInReadAd
    private VpadnInReadAd inReadAd;

    // 请将 License Key 换成 Vpon PDMKT Team 提供您的 License Key
    private String licenseKey = "License Key" ;
    ...
}
```

### 建立广告呈现的 Layout

请依照您的应用程式设计，在 ScrollView 中加入欲显示广告的位置，或参考以下范例完成设计：

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
            <!-- 加入广告 Container -->
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

### 建立 VpadnInReadAd，并指定 License Key

```java
protected void onCreate(Bundle savedInstanceState) {
    ...
    // 建立 VpadnInReadAd，并指定 License Key
    inReadAd = new VpadnInReadAd(getActivity(), license Key);

    //建立广告请求
    VpadnAdRequest adRequest = new VpadnAdRequest();
    adRequest.setAdContainer(frameLayout);

    inReadAd.setAdListener(new MyAdListener());

    // 拉取广告
    inReadAd.loadAd(adRequest);
    ...
}
```

## 在 ListView 中展示 Out-stream 影音广告 {#listview}
---
在应用程式中的 ListView 建立 Out-stream 影音广告需要执行以下步骤：

1. 汇入 `com.vpadn.ads.*`
2. 宣告 `VpadnInReadAd`
3. 实作作 ListView Adapter 
4. 建立 VpadnInReadAd 物件，并指定 License Key
5. 拉取广告
6. 实作影音广告行为 Event
7. 实作 VpadnAdListener

请参考以下范例，将 Out-stream 影音广告加到您的 ListView 中：

### Import Vpon SDK 并宣告 VpadnInReadAd

```java
import com.vpadn.ads.*;
import com.vpon.vpon_inread.fragment.adapter.MyListAdapter;

public class MainActivity extends Activity {

    // 宣告 VpadnInReadAd
    private VpadnInReadAd inReadAd;

    // 请将 License Key 换成 Vpon PDMKT Team 提供您的 License Key
    private String licenseKey = "License Key" ;

    // 请替换成欲显示广告的位置
    public static final int AD_POSITION = 15;
    ...
}
```

### 实作 ListView Adapter
欲在 ListView 上展示 Out-stream 影音广告，请务必参考以下说明实作 ListView Adapter：

```java
// ListAdapter 需要继承 BaseAdpater
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

### 建立 VpadnInReadAd，并指定 License Key
```java
public class MainActivity extends Activity {

    protected void onCreate(Bundle savedInstanceState) {
        ...
        // 设置 ListView
        ListView listView = view.findViewById(R.id.listView);
        MyListAdapter adapter = new MyListAdapter();
        listView.setAdapter(adapter);

        // 建立 VpadnInReadAd，并指定 License Key
        inReadAd = new VpadnInReadAd(getActivity(), license Key);

        //建立广告请求
        VpadnAdRequest adRequest = new VpadnAdRequest();
        adRequest.setAdContainer(listView);
        adRequest.setAdPosition(AD_POSITION);

        inReadAd.setAdListener(new MyAdListener());

        // 拉取广告
        inReadAd.loadAd(adRequest);
        ...
    }
}
```

## 在 RecyclerView 中展示 Out-stream 影音广告 {#recyclerview}
---
在应用程式中的 RecyclerView 建立 Out-stream 影音广告需要执行以下步骤：

1. 汇入 `com.vpadn.ads.*`
2. 宣告 `VpadnInReadAd`
3. 实作 RecyclerView Adapter 
4. 建立 VpadnInReadAd 物件，并指定 License Key
5. 拉取广告
6. 实作影音广告行为 Event
7. 实作 VpadnAdListener

请参考以范例，将 Out-stream 影音广告加到您的 RecyclerView 中：

### Import Vpon SDK 并宣告 VpadnInReadAd

```java
import com.vpadn.ads.*;
import com.vpon.vpon_inread.fragment.adapter.MyRecyclerAdapter;

public class MainActivity extends Activity {

    // 宣告 VpadnInReadAd
    private VpadnInReadAd inReadAd;

    // 请将 License Key 换成 Vpon PDMKT Team 提供您的 License Key
    private String licenseKey = "License Key" ;

    // 请替换成欲显示广告的位置
    public static final int AD_POSITION = 15;
    ...
}
```

### 实作 RecyclerView Adapter
欲在 RecyclerView 上展示 Out-stream 影音广告，请务必使用 `com.vpon.adapter.AbsRecyclerAdapter` 替换掉 android.support.v7.widget.RecyclerView.Adapter，并参考以下说明实作 RecyclerView Adapter：

```java
import com.vpon.adapter.AbsRecyclerAdapter;

// 请使用 com.vpon.adapter.AbsRecyclerAdapter 替换掉 android.support.v7.widget.RecyclerView.Adapter 
// Recycler 需要继承 AbsRecyclerAdapter
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
请参考 RecyclerView.Adapter 及 AbsRecyclerAdapter 提供方法对照表进行实作：

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


### 建立 VpadnInReadAd，并指定 License Key
```java
public class MainActivity extends Activity {
    ...
    protected void onCreate(Bundle savedInstanceState) {
        ...
        // 设置 RecyclerView
        RecyclerView mRecyclerView = view.findViewById(R.id.recyclerView);
        mRecyclerView.setHasFixedSize(true);
        RecyclerView.LayoutManager mLayoutManager = new StaggeredGridLayoutManager(1, StaggeredGridLayoutManager.VERTICAL);
        mRecyclerView.setLayoutManager(mLayoutManager);
        List<String> letterList = new ArrayList<>(Arrays.asList(letters));

        MyRecyclerAdapter mAdapter = new MyRecyclerAdapter(letterList);
        mRecyclerView.setAdapter(mAdapter);

        // 建立 VpadnInReadAd，并指定 License Key
        inReadAd = new VpadnInReadAd(getActivity(), license Key);

        //建立广告请求
        VpadnAdRequest adRequest = new VpadnAdRequest();
        adRequest.setAdContainer(recyclerView);
        adRequest.setAdPosition(AD_POSITION);

        inReadAd.setAdListener(new MyAdListener());

        // 拉取广告
        inReadAd.loadAd(adRequest);
        ...
    }
}
```

# 实作影音广告行为 Event
---
请在广告显示的 Activity 或 Fragment 中加入以下程式码以提供广告呈现体验：

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

# 实作 VpadnAdListener
---
完成广告初始化后，请实作以下事件监听广告请求及显示的状态：

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
如果您想看到完整的串接实例，请参考我们的 [Sample Code]

### 其它广告形式
如果您想了解其它广告形式的串接，请参考以下内容：

* [横幅广告](../banner)
* [插页广告](../Interstitial)
* [原生广告](../native)
* [中介服务](../mediation)
* [进阶设定](../advanced)

[串接说明]: ../integration-guide/
[Vpon PDMKT Team]: mailto:partner.service@vpon.com
[ScrollView]: {{site.baseurl}}/zh-cn/android/outstream/#scrollview
[ListView]: {{site.baseurl}}/zh-cn/android/outstream/#listview
[RecyclerView]:  {{site.baseurl}}/zh-cn/android/outstream/#recyclerview
[Sample Code]: ../download/
