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

#adskdevnetwrk
#expressjs
#RestSharp
#Autodesk #IoT #SeeControl #cloud
#python #markdown #asciidoc
#gcal #caldav #googleapi
#milanojs
#prague
#au2015 #autocad #inventor #ah8 #cubeathens #developers
#aws #handlebars
#JsFiddle #Reactjs
#autodesku #rtceur
#Reactjs
#MongoDB
#mongolab
#Heroku
#restapi #nodejs #adsk
#javascript
#au2015 #autodesku #rtceur #SVG #javascript

akn_include

Team Meeting and Deploy to Heroku Button #3dwebcoder #revitapi #3dweb #a360 #3dwebaccel @adskForge #Heroku

I am in London for an internal meeting with my European ADN DevTech colleagues today.
As you might guess from the pictures, we are in Broad Court, right next to Bow Street and beside the nice bronze statue Young Dancer by Enzo Plazotta.
During the meeting, Cyrille mentioned the possibility to add a 'deploy to Heroku' button to a GitHub repository readme to automate the installation and testing a cloud-based app.
I use Heroku to run all my cloud-based apps, so I decided to test that right away...

-->


### Team Meeting and Deploy to Heroku Button

I am in London for an internal meeting with my European ADN DevTech colleagues today:

<center>
<a data-flickr-embed="true"  href="https://www.flickr.com/photos/jeremytammik/albums/72157663346443223" title="European ADN Team Meeting"><img src="https://farm2.staticflickr.com/1544/25349932560_c97148600b_n.jpg" width="320" height="240" alt="European ADN Team Meeting"></a><script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>
</center>

As you might guess from the pictures, we are in Broad Court, right next to [Bow Street](https://en.wikipedia.org/wiki/Bow_Street) and beside the nice bronze statue *Young Dancer* by Enzo Plazotta.

By a happy chance, we are also celebrating Adam's birthday today.

Congratulations, Adam!

During the meeting, Cyrille mentioned the possibility to add a 'deploy to Heroku' button to a GitHub repository readme to automate the installation and testing a cloud-based app.

I use Heroku to run all my cloud-based apps, as I explained describing
the [CompHound deployment to Heroku](http://the3dwebcoder.typepad.com/blog/2015/09/comphound-heroku-deployment-and-urban-farming.html#4),
so I decided to test that right away.

In fact, it is extremely easy, as explained in the Heroku documentation
on [creating a 'Deploy to Heroku' button](https://devcenter.heroku.com/articles/heroku-button).

Here is the code I added to the [fireratingdb](https://github.com/jeremytammik/firerating) `README.md` to do so:

<pre class="prettyprint">
Here is a button to immediately and fully automatically deploy and run this app on your Heroku account for you, creating a new free account for you on the fly if needed:

&lt;a href="https://www.heroku.com/deploy/?template=https://github.com/jeremytammik/firerating"&gt;
  &lt;img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy"&gt;
&lt;/a&gt;
</pre>

I added, committed and pushed the updated readme to the GitHub repository, and the new button appears like this:

<center>
<img src="img/deploy_to_heroku_button.png" alt="'Deploy to Heroku' button" width="224">
</center>

This takes you through all the steps fully automatically with no manual intervention required, except possibly to enter your account details and credentials.

Pretty cool.

I plan add that to my other cloud-based app GitHub repos as well.

It will be interesting to see what other topics crop up here...
our [agenda](http://thebuildingcoder.typepad.com/blog/2016/03/trial-period-floating-license-entitlement-api-and-sketchup-grevit.html#4) is
long and time is short.
