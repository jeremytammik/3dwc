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
#RestSharp

Towards a CompHound #MongoDB Table View #Mongoose #3dwebcoder #revitapi #javascript #nodejs #adsk #bim #aec

We are already more than halfway through the Cloud Accelerator in Prague.
&ndash; Steps towards the CompHound Mongo database table view
&ndash; Express, ES6, React and more crash courses and best practices
&ndash; A real scalable server side mongo database table view
&ndash; CompHound road map...

-->


### Towards a CompHound Mongo Database Table View

We are already more than halfway through the
[Cloud Accelerator in Prague](http://through-the-interface.typepad.com/through_the_interface/2015/09/at-the-cloud-accelerator-in-prague.html).

Happily, Kean Walmsley already
[talked about that](http://through-the-interface.typepad.com/through_the_interface/2015/09/at-the-cloud-accelerator-in-prague.html),
so no need for me to add anything more beyond pointing to my
[Cloud Accelerator Prague photo album](https://www.flickr.com/photos/jeremytammik/sets/72157656369939043):

<center>
<a data-flickr-embed="true"
  href="https://www.flickr.com/photos/jeremytammik/albums/72157656369939043"
  title="Autodesk Cloud Accelerator Prague">
    <img src="https://farm6.staticflickr.com/5818/21435184406_b8b8b659c9_z.jpg"
      width="640" height="480" alt="Autodesk Cloud Accelerator Prague" />
</a>
<script async src="https://embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>

</center>

Instead, I'll discuss what I've been up to during the last 36 hours &ndash; almost non-stop, by the way:

- [Steps towards the CompHound Mongo database table view](#2)
- [Express, ES6, React and more crash courses and best practices](#3)
- [A real scalable server side mongo database table view](#4)
- [CompHound road map](#5)
<!--- - [Coming steps towards the CompHound Mongo database table view](#10) -->



#### <a name="2"></a>Steps Towards the CompHound Mongo Database Table View

I finally started moving forward with my
[CompHound component tracker](http://the3dwebcoder.typepad.com/blog/2015/09/comphound-restsharp-mongoose-put-and-post.html#2) project
for my upcoming conference presentations at
[RTC Europe](http://www.rtcevents.com/rtc2015eu) in Budapest end of October and
[Autodesk University](http://au.autodesk.com) in Las Vegas in December.

This project lives in its own
[CompHound organisation GitHub repository collection](https://github.com/comphound).

I laboured away really hard for the last 36 hours at creating a mongo database table view for it.

My initial attempts turned out be totally misdirected.

Miraculously enough, running into this dead end was also totally illuminating.

I worked all through the night until I finally understood, went to bed a six in the morning, got up again and had a nice walk in the sun at 8:30, coffee in the sun and now back to the office to write this...

The task I struggled with so hard is simply implementing a table view for the comphound database.

I first thought I would use some kind of intelligent component, e.g., based on [React](https://facebook.github.io/react).

I also selected and explored several different react data grid and table libraries, e.g.:

- [griddle-react](/a/src/web/react/griddle/testgriddle.html)
- [react-datagrid](https://github.com/zippyui/react-datagrid)
- [fixed-data-table](http://facebook.github.io/fixed-data-table) <!--- https://github.com/facebook/fixed-data-table -->

I finally gave up on react and implemented my own much simpler initial custom table view solution using [handlebars](http://handlebarsjs.com).

I then spent the rest of the night exploring ways to add sorting and filtering functionality to the basic HTML table element it generates using either pure old JavaScript or jQuery, e.g.:

- [Cut and paste HTML table filter script](http://www.javascriptkit.com/script/script2/tablefilter.shtml) by Max Guglielmi
- [Table sorting, filtering, etc.](http://www.javascripttoolbox.com/lib/table/index.php) by Matt Kruse
- [pbTable](http://pieroblunda.github.io/pb-table) by [Piero Blunda](http://pieroblunda.github.io)

I created the following series of releases of the corresponding [CompHoundWeb](https://github.com/CompHound/CompHoundWeb) implementations during the night:

- [0.0.3](https://github.com/CompHound/CompHoundWeb/releases/tag/0.0.3) &ndash; implemented instance view in HTML using handlebars
- [0.0.4](https://github.com/CompHound/CompHoundWeb/releases/tag/0.0.4) &ndash; added separate public css file to handlebars rendered view
- [0.0.5](https://github.com/CompHound/CompHoundWeb/releases/tag/0.0.5) &ndash; implemented static table sort and filter using old-fashioned js
- [0.0.6](https://github.com/CompHound/CompHoundWeb/releases/tag/0.0.6) &ndash; switched from dumb old javascript to jquery table sort and filter using [pb-table](https://github.com/pieroblunda/pb-table).



#### <a name="3"></a>Express, ES6, React and More Crash Courses and Best Practices

During my struggles with this, I happened to run into Sahat Yalkabov's very nice tutorial explaining how to
[create a character voting app using React, Node.js, MongoDB and Socket.IO](http://sahatyalkabov.com/create-a-character-voting-app-using-react-nodejs-mongodb-and-socketio).

Besides being well written and beautifully formatted, it also presents a large number of best practices setting up the various components:

1. [New Express Project](http://sahatyalkabov.com/create-a-character-voting-app-using-react-nodejs-mongodb-and-socketio#step-1-new-express-project)
2. [Build System](http://sahatyalkabov.com/create-a-character-voting-app-using-react-nodejs-mongodb-and-socketio#step-2-build-system)
3. [Project Structure](http://sahatyalkabov.com/create-a-character-voting-app-using-react-nodejs-mongodb-and-socketio#step-3-project-structure)
4. [ES6 Crash Course](http://sahatyalkabov.com/create-a-character-voting-app-using-react-nodejs-mongodb-and-socketio#step-4-es6-crash-course)
5. [React Crash Course](http://sahatyalkabov.com/create-a-character-voting-app-using-react-nodejs-mongodb-and-socketio#step-5-react-crash-course)
6. [Flux Architecture Crash Course](http://sahatyalkabov.com/create-a-character-voting-app-using-react-nodejs-mongodb-and-socketio#step-6-flux-architecture-crash-course)
7. [React Routes (Client-Side)](http://sahatyalkabov.com/create-a-character-voting-app-using-react-nodejs-mongodb-and-socketio#step-7-react-routes-client-side)
8. [React Routes (Server-Side)](http://sahatyalkabov.com/create-a-character-voting-app-using-react-nodejs-mongodb-and-socketio#step-8-react-routes-server-side)
9. [Footer and Navbar Components](http://sahatyalkabov.com/create-a-character-voting-app-using-react-nodejs-mongodb-and-socketio#step-9-footer-and-navbar-components)
10. [Socket.IO - Real-time User Count](http://sahatyalkabov.com/create-a-character-voting-app-using-react-nodejs-mongodb-and-socketio#step-10-socket-io-real-time-user-count)
11. [Add Character Component](http://sahatyalkabov.com/create-a-character-voting-app-using-react-nodejs-mongodb-and-socketio#step-11-add-character-component)
12. [Database Schema](http://sahatyalkabov.com/create-a-character-voting-app-using-react-nodejs-mongodb-and-socketio#step-12-database-schema)
13. [Express API Routes (1 of 2)](http://sahatyalkabov.com/create-a-character-voting-app-using-react-nodejs-mongodb-and-socketio#step-13-express-api-routes-1-of-2)
15. [Home Component](http://sahatyalkabov.com/create-a-character-voting-app-using-react-nodejs-mongodb-and-socketio#step-15-home-component)
14. [Express API Routes (2 of 2)](http://sahatyalkabov.com/create-a-character-voting-app-using-react-nodejs-mongodb-and-socketio#step-14-express-api-routes-2-of-2)
16. [Character (Profile) Component](http://sahatyalkabov.com/create-a-character-voting-app-using-react-nodejs-mongodb-and-socketio#step-16-character-profile-component)
17. [Top 100 Component](http://sahatyalkabov.com/create-a-character-voting-app-using-react-nodejs-mongodb-and-socketio#step-17-top-100-component)
18. [Stats Component](http://sahatyalkabov.com/create-a-character-voting-app-using-react-nodejs-mongodb-and-socketio#step-18-stats-component)
19. [Deployment](http://sahatyalkabov.com/create-a-character-voting-app-using-react-nodejs-mongodb-and-socketio#step-19-deployment)
20. [Additional Resources](http://sahatyalkabov.com/create-a-character-voting-app-using-react-nodejs-mongodb-and-socketio#step-20-additional-resources)

Before that, I also had a look though Christopher Buecheler's
[dead-simple step-by-step guide for front-end developers to getting up and running with node.js, express, jade, and mongodb](http://cwbuecheler.com/web/tutorials/2013/node-express-mongo) and
Stéphane Derosiaux'
[journey through the creation of an app with Node, MongoDB, React, Gulp](http://ctheu.com/2015/02/09/a-journey-through-the-creation-of-an-app-with-node-mongodb-react-gulp).
While they are not as in-depth, experienced or professional as Sahat's tutorial, they still both provide helpful quick reads.

By the way, Stéphane is also a great fan of the
[Atom editor](https://atom.io), cf.
*[tired of Notepad++? Use Atom!](http://ctheu.com/2015/02/03/youre-tired-of-notepad-use-atom)*,
so I had a quick look at that as well and was quite favourably impressed.

Finally, I also found the overview of
[21 react DataTable samples](http://react.rocks/tag/DataTable) very
helpful, which led me to take a deeper look at
[reactable](http://glittershark.github.io/reactable).

As said, I ended up ditching it all for a simple handlebars template, only to realise later still that what I really need is a server-side database selection tool to avoid dumping the entire database contents to the client before even starting to browse.


#### <a name="4"></a>A Real Scalable Server Side Mongo Database Table View

Working during the night through the slow hotel WiFi Internet connection, every attempt to retrieve the ca. thousand records from the mongolab-hosted remote test database took a significant amount of time, up to a minute or two.

The database is intended to manage an unlimited number of component instances from an unlimited number of projects of unlimited size, so the solution needs to be able to manage millions of entries.

Obviously, all the approaches described above are completely unfeasible.

I cannot believe that I did not realise that until I actually finished a rough initial solution.

Apparently, I was unable to take a step back and **think** until **after** successfully completing the hack.

The only solution for this is a dynamic server-side approach.

A realistic solution absolutely must strongly limit the number of entries to retrieve from the database and only extract the number required to populate the current view.

Once that was clear, I found a couple of new directions and samples to explore:

- [mongoose-datatable library and test project](https://github.com/eherve/mongoose-datatable) &ndash; server side data table request support for mongoose
- [Using mongoose-datatables with jQuery, NodeJS and MongoDb](http://blog.dephyned.com/web-development/using-jquery-datatables-with-nodejs-and-mongodb-using-mongoose-datatables) &ndash; article on using mongoose-datatable
- [mongoose-datatable demo](https://github.com/lepazmino/mongoose-datatable-demo) &ndash; working demo of npm module mongoose-datatable

Summary:

- Sorry for describing my convoluted path here in such detail...
- Thinking about tables, filters, sorting, all on the client side...
- Looked at React and other powerful table widgets...
- Simplified to JavaScript modification of a table populated by Handlebars...
- Implemented more sophisticated and modern table pimping using jquery...
- Realised that I really cannot do this client-side at all, since the database might have millions of entries...
- All these releases in between...
- Now moving to mongoose-datatable server-side.



#### <a name="5"></a>CompHound Road Map

The next steps on the
[CompHound project](https://github.com/comphound) will
include:

- Implementing the mongoose-datatable data table view
- Adding the [View and Data API](https://developer.autodesk.com/) viewing component
- Posting the server live to Heroku
- Rerouting the nice new [comphound.net](http://comphound.net) domain to it

The current versions discussed above are the
[CompHoundWeb 0.0.6](https://github.com/CompHound/CompHoundWeb/releases/tag/0.0.6) node.js mongodb web server,
[CompHoundRvt 2016.0.0.1](https://github.com/CompHound/CompHoundRvt/releases/tag/2016.0.0.1) C# REST API client populating it, and
the (placeholder) landing page
[CompHound.github.io 0.0.1](https://github.com/CompHound/CompHound.github.io/releases/tag/0.0.1).

I was originally hoping to finish it all off this week, which is starting to seem a bit illusory...


<!---

<center>
<img src="img/.png" alt="" width="600"/>
</center>

<pre class="prettyprint">
</pre>

run mongod

run /a/src/web/mongo/mongoose-datatable/test/app.js

http://localhost:8042/

/a/src/web/mongo/mongoose-datatable-demo/
-->