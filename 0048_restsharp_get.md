<head>
<title>The 3D Web Coder</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<link rel="stylesheet" type="text/css" href="3dwc.css"/>
<script src="run_prettify.js" type="text/javascript"></script>
<!--
<script src="https://google-code-prettify.googlecode.com/svn/loader/run_prettify.js" type="text/javascript"></script>
-->
</head>

<!---

#mongolab #heroku #mongoosejs #expressjs
#Autodesk #IoT #SeeControl #cloud #adsk
#3dwebcoder #python #adskdevnetwrk #adsk #markdown #asciidoc
#gcal #caldav #cloud #googleapi #restapi
#milanojs
#3dwebaccel #prague #webgl #3dweb #a360
#au2015 #autocad #inventor #ah8 #cubeathens #developers
#aws #revitapi #jquery #handlebars #heroku
#ViewAndDataAPI
#JsFiddle #Reactjs #3dwebcoder #autodesku #rtceur
akn_include

#RestSharp #Mongoose #3dwebcoder #revitapi #restapi #javascript #mongodb #nodejs

Using #RestSharp for Rest API GET #3dwebcoder #revitapi #restapi #mongolab #heroku #adskdevnetwrk #adsk

I arrived safe and sound in Prague for the Autodesk cloud accelerator. During the trip, I continued to convert my C# REST API client from HttpWebRequest to RestSharp. I implemented the RestSharp PUT call last week; now, let's address the GET call, and remove all traces of the use of HttpWebRequest. The REST GET call implementation...
-->


### Using RestSharp for Rest API GET

I arrived safe and sound in Prague for the Autodesk cloud accelerator.

Before leaving Switzerland, I took a last little jaunt in nature, over Weissenstein and Rueti, with a nice view of the Swiss alps:

<center>
<img src="file:////j/photo/jeremy/2015/2015-09-12_weissenstein_rueti_balmflueh//938_eiger_moench_jungfrau.jpg" alt="Swiss alps" width="400"/>
</center>

During the trip, I continued to convert my
[FireRatingCloud](https://github.com/jeremytammik/FireRatingCloud) C# REST API client from HttpWebRequest to
[RestSharp](http://restsharp.org).

I implemented the
[RestSharp PUT call](http://the3dwebcoder.typepad.com/blog/2015/09/comphound-restsharp-mongoose-put-and-post.html#5) last week;
now, let's address the GET call, and remove all traces of the use of HttpWebRequest.

The REST GET call implementation using RestSharp is almost ridiculously simple:

<pre class="code">
&nbsp; <span class="gray">///</span><span class="green"> </span><span class="gray">&lt;summary&gt;</span>
&nbsp; <span class="gray">///</span><span class="green"> GET JSON document data from </span>
&nbsp; <span class="gray">///</span><span class="green"> the specified mongoDB collection.</span>
&nbsp; <span class="gray">///</span><span class="green"> </span><span class="gray">&lt;/summary&gt;</span>
&nbsp; <span class="blue">public</span> <span class="blue">static</span> <span class="blue">string</span> Get(
&nbsp; &nbsp; <span class="blue">string</span> collection_name_and_id )
&nbsp; {
&nbsp; &nbsp; <span class="blue">var</span> client = <span class="blue">new</span> <span class="teal">RestClient</span>( RestApiBaseUrl );
&nbsp;
&nbsp; &nbsp; <span class="blue">var</span> request = <span class="blue">new</span> <span class="teal">RestRequest</span>( _api_version + <span class="maroon">&quot;/&quot;</span>
&nbsp; &nbsp; &nbsp; + collection_name_and_id, <span class="teal">Method</span>.GET );
&nbsp;
&nbsp; &nbsp; <span class="teal">IRestResponse</span> response = client.Execute( request );
&nbsp;
&nbsp; &nbsp; <span class="blue">var</span> content = response.Content; <span class="green">// raw content as string</span>
&nbsp;
&nbsp; &nbsp; <span class="blue">return</span> content;
&nbsp; }
</pre>

I had no Internet connection during my travel, so I switched back from the mongolab-hosted database to a local repository instead, and the heroku-hosted node.js web server to a local one as well.

The code includes a toggle for each, by setting the `static bool UseLocalServer` in
[FireRatingCloud/Util.cs](https://github.com/jeremytammik/FireRatingCloud/blob/master/FireRatingCloud/Util.cs) for the web server, and the appropriate database URL in
[firerating/server.js](https://github.com/jeremytammik/firerating/blob/master/server.js) like this:

<pre class="prettyprint">
// local database
var mongo_uri = 'mongodb://localhost/firerating';

// mongolab hosted
var mongo_uri = 'mongodb://revit:revit@ds047742.mongolab.com:47742/firerating';
</pre>

I ran into one more little problem starting up the mongo database locally, due to lack of hard disk space after compacting the virtual Windows machine hard drive:

<pre>
C:\Program Files\MongoDB\Server\3.0\bin\mongod.exe

2015-09-13T10:56:51.383+0200 E JOURNAL  [initandlisten] Insufficient free space for journal files
2015-09-13T10:56:51.383+0200 I JOURNAL  [initandlisten] Please make at least 3379MB available in C:\data\db\journal or use --smallfiles
</pre>

Checking the mongo help information about disk space usage, I see a number of promising options available, e.g.

<pre>
  --noprealloc          disable data file preallocation - will often hurt performance
  --nssize arg (=16)    .ns file size (in MB) for new databases
  --quota               limits each database to a certain number of files (8 default)
  --smallfiles          use a smaller default file size
  --nojournal           disable journaling (journaling is on by default for 64 bit)
</pre>

The mongo database was perfectly happy to run locally again with the minimised disk size using:

<pre>
C:\Program Files\MongoDB\Server\3.0\bin &gt; mongod --smallfiles --nojournal
</pre>

The updated versions of
[FireRatingCloud](https://github.com/jeremytammik/FireRatingCloud) are
[release 2016.0.0.9](https://github.com/jeremytammik/FireRatingCloud/releases/tag/2016.0.0.9) implementing
the new Get method and
[2016.0.0.10](https://github.com/jeremytammik/FireRatingCloud/releases/tag/2016.0.0.10) after
removing the obsolete HttpWebRequest QueryOrUpsert method and the .NET references it requires.
