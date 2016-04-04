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

FireRatingCloud REST API Batch Upload #3dwebcoder #revitapi #3dweb @adskForge #adsk #RestSharp #nodejs

Before getting technical, let me mention that I had a great time with Markus and Wolfgang on ski tours climbing a couple of mountains around the Gemmipass last weekend.
Back to the technical stuff, I implemented a batch upload functionality for the FireRatingCloud C# .NET Revit API add-in REST API MongoDB client over a month ago, in Madrid, during the BIM Programming workshop, together with Jose Ignacio Montes of Avatar BIM.
Jose noted that uploading the data for all doors in a large building model to the cloud database consumed a significant amount of time, whereas downloading the modified data for the same doors is almost instantaneous...

-->


### FireRatingCloud REST API Batch Upload

Before getting technical, let me mention that I had a great time with Markus and Wolfgang on [ski tours climbing a couple of mountains around the Gemmipass](https://flic.kr/s/aHskwMCnYo) last weekend:

<center>
<a data-flickr-embed="true"  href="https://www.flickr.com/photos/jeremytammik/albums/72157666107801002" title="Ski tours round Gemmipass"><img src="https://farm2.staticflickr.com/1619/25975834236_86ceacb927_n.jpg" width="320" height="240" alt="Ski tours round Gemmipass"></a><script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>
</center>

Back to the technical stuff.

I implemented a batch upload functionality for
the [FireRatingCloud C# .NET Revit API add-in REST API MongoDB client](https://github.com/jeremytammik/FireRatingCloud) over
a month ago, in Madrid, during
the [BIM Programming workshop](http://thebuildingcoder.typepad.com/blog/2016/01/bim-programming-madrid-and-spanish-connectivity.html),
together with Jose Ignacio Montes of [Avatar BIM](http://avatarbim.com), who shared his solution
for [modelling small details](http://thebuildingcoder.typepad.com/blog/2016/02/modelling-small-details.html) in Revit.

Jose had noted that uploading the data for all doors in a large building model to the cloud database consumed a significant amount of time, whereas downloading the modified data for the same doors is almost instantaneous.

This is completely obvious, once you come to think of it, since the original upload functionality uses an individual EST API call for each door element, whereas the download uses one single batch call for the entire set.

There is a god reason for the individual calls to upload the data: I wished to create new database records for doors not yet represented in the database, and update the existing records for all others.

I spent quite a
while [implementing and optimising my `upsert` method](http://the3dwebcoder.typepad.com/blog/2015/09/mongodb-upsert.html) to
achieve just that.

Unfortunately, I do not see any possibility to implement a batch upsert functionality to MongoDB.

On the other hand, making thousands of individual REST API calls for a large Revit model is a completely ridiculous thought.

Here is the list of enhancement made since I last discussed this project, with the corresponding GitHub project releases:

- [2016.0.0.15](https://github.com/jeremytammik/FireRatingCloud/releases/tag/2016.0.0.15) &ndash; beginning to set up for [madrid bim programming conference](http://www.bimprogramming.com)
- [2016.0.0.16](https://github.com/jeremytammik/FireRatingCloud/releases/tag/2016.0.0.16) &ndash; split Commands.cs into three separate modules
- [2016.0.0.17](https://github.com/jeremytammik/FireRatingCloud/releases/tag/2016.0.0.17) &ndash; added error message in case of node.js web server not running
- [2016.0.0.18](https://github.com/jeremytammik/FireRatingCloud/releases/tag/2016.0.0.18) &ndash; implemented import of tag aka mark and added GET and PUT benchmarking timer
- [2016.0.0.19](https://github.com/jeremytammik/FireRatingCloud/releases/tag/2016.0.0.19) &ndash; split all Revit independent utils into separate module
- [2016.0.0.20](https://github.com/jeremytammik/FireRatingCloud/releases/tag/2016.0.0.20) &ndash; integrated FireRatingClient
- [2016.0.0.21](https://github.com/jeremytammik/FireRatingCloud/releases/tag/2016.0.0.21) &ndash; implemented batch upload using C# Delete + PostBatch calling fireratingdb deleteAllForProject + insertBatch
- [2016.0.0.22](https://github.com/jeremytammik/FireRatingCloud/releases/tag/2016.0.0.22) &ndash; batch upload worked fine locally but not on web server so switched back to one by one upload
- [2016.0.0.23](https://github.com/jeremytammik/FireRatingCloud/releases/tag/2016.0.0.23) &ndash; batch upload works fine on mongolab too, implemented separate upload commands for batch versus one by one

In case you are wondering about the new `FireRatingClient` module, suffice to say it is a very cool simple little Windows forms executable to demonstrate ubiquitous BIM data access and editing with immediate upload back to the cloud and back to the original BIM model.

More on that anon.

I am off to my [Vipassana meditation retreat](http://thebuildingcoder.typepad.com/blog/2016/03/vipassana-meditation-and-idling-versus-external-events.html) now, so more on all this when I return.
