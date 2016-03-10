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

Optimal API Documentation Workflow #3dwebcoder #revitapi #3dweb @adskForge #markdown #asciidoc #DocBook #adsk

I am still in London for our internal European ADN DevTech meeting, returning back to Switzerland at lunchtime today, with the next ski tour coming up tomorrow &nbsp; :-) &nbsp;
Just before we arrived, I received an interesting and somewhat different question from Cyrille that I am happy to dive into, research and share with you
&ndash; I need to reformat production release notes in a consistent way to our customers and am researching an optimal and future-proof documentation and communication workflow to generate and share API documentation for the View and Data API and other web services. Any suggestions? ...

-->


### Optimal API Documentation Workflow

I am still in London for our internal European ADN DevTech meeting, returning back to Switzerland at lunchtime today, with the next ski tour coming up tomorrow &nbsp; :-)

<center>
<a data-flickr-embed="true"  href="https://www.flickr.com/photos/jeremytammik/albums/72157663346443223" title="European ADN Team Meeting"><img src="https://farm2.staticflickr.com/1544/25349932560_c97148600b_n.jpg" width="320" height="240" alt="European ADN Team Meeting"></a><script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>
</center>

Just before we arrived, I received an interesting and somewhat different question from Cyrille that I am happy to dive into, research and share with you:

**Question:** I need to reformat production release notes in a consistent way to our customers and am researching an optimal and future-proof documentation and communication workflow to generate and share API documentation for
the [View and Data API](https://developer.autodesk.com/api/view-and-data-api) and
other [Forge web services](https://developer.autodesk.com).
Any suggestions?

**Answer:** One toolset that I used for something similar in the past included the Microsoft [Sandcastle documentation compiler](https://sandcastle.codeplex.com), described in the thread on
an [optimal solution for documentation of .NET](https://social.msdn.microsoft.com/Forums/en-US/132104fc-c875-4a75-9862-19d7d53a5e87/optimal-solution-for-documentation).
The workflow is XML-based and also supports XSLT, i.e., XSL transformations, enabling any custom output format to be generated.
Sandcastle is now no longer developed, with no alternatives in sight, according to the StackOverflow thread
on [good alternatives to Sandcastle](http://stackoverflow.com/questions/8866598/good-alternatives-to-sandcastle-to-generate-msdn-style-documentation).

A more up-to-date approach is described in this blog post
on [documentation of a REST API with Swagger and AsciiDoc](http://www.robwin.eu/documentation-of-a-rest-api-with-swagger-and-asciidoc), addressing questions such as

- How to create an up-to-date documentation which combines your specification and hand-written documentation?
- How to create a HTML and PDF format of your documentation?
- How to add up-to-date real-life examples to your documentation?

AsciiDoc is preferable to Markdown as it has more features. AsciiDoc is a text document format for writing documentation, articles, books, ebooks, slideshows, web pages and blogs. AsciiDoc files can be converted to HTML, PDF and EPUB. AsciiDoc and Markdown are well suited for describing public APIs.

I actually already looked at [AsciiDoc and Markdown](http://the3dwebcoder.typepad.com/blog/2015/08/hackergarten-chromium-and-markdown.html#4) when
initially starting to use the latter to write all my blog posts for both [The Building Coder](http://thebuildingcoder.typepad.com) and [The 3d Web coder](http://the3dwebcoder.typepad.com). I am writing this sentence for you at this very moment using a pure text editor and Markdown.

For the ultimate answer, as so often, lets turn to StackOverflow again, e.g.
for [the best way to generate a REST API documentation](http://stackoverflow.com/questions/3937052/whats-the-best-way-to-generate-a-rest-apis-documentation).

According to [Roy T. Fielding](http://roy.gbiv.com/untangled/about), in his article on [REST APIs must be hypertext-driven](http://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven), self-descriptiveness is one of the benefits of REST:

> A REST API should spend almost all of its descriptive effort in defining the media type(s) used for representing resources and driving application state, or in defining extended relation names and/or hypertext-enabled mark-up for existing standard media types.

The thread goes on to mention [Sphinx](http://www.sphinx-doc.org) and the [reStructuredText](http://docutils.sourceforge.net/rst.html) markup syntax, part of the [Docutils](http://docutils.sourceforge.net/index.html) documentation utilities, a set of tools for processing plaintext documentation into useful formats, such as HTML, XML, and LaTeX.
Sphinx uses reStructuredText as its markup language, and many of its strengths come from the power and straightforwardness of reStructuredText and the Docutils parsing and translating suite.

After that excursion into various toolsets, I turned to the mother of all documentation workflows, [DocBook](https://en.wikipedia.org/wiki/DocBook):

> DocBook is a semantic markup language for technical documentation. It was originally intended for writing technical documents related to computer hardware and software but it can be used for any other sort of documentation.

> As a semantic language, DocBook enables its users to create document content in a presentation-neutral form that captures the logical structure of the content; that content can then be published in a variety of formats, including HTML, XHTML, EPUB, PDF, man pages, Web help and HTML Help, without ... any changes to the source ... a document written in DocBook format becomes easily portable into other formats. It solves the problem of reformatting by ... using XML tags.

DocBook needs sort of a backend.
This can be LaTeX but there are other possibilities like
the [Apache FOP](https://en.wikipedia.org/wiki/Formatting_Objects_Processor) Formatting Objects Processor or
the commercial [Antenna House](https://www.antennahouse.com) formatter.

Again, from StackOverflow
on [LaTeX vs. DocBook](http://stackoverflow.com/questions/796201/latex-vs-docbook):

> DocBook isn't a typesetting mechanism. DocBook is all about separating presentation from content. DocBook only deals with content; it's used to create an abstract representation of a book, article, etc.

To wrap up, let's ponder
the Wikipedia [list of document markup languages](https://en.wikipedia.org/wiki/List_of_document_markup_languages)
and [comparison of document markup languages](https://en.wikipedia.org/wiki/Comparison_of_document_markup_languages).

Obviously, all depends on what exact inputs and outputs will be delivered to and required from the system.

So please specify those in a little bit more detail and we will narrow down this exploration a bit.
