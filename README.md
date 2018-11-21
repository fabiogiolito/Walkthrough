# Walkthrough

A Plugin for [Prism.js](http://prismjs.com).

Add comments to your Prism code blocks to create walkthroughs and tutorials. 

**Demo:** https://fabiogiolito.github.io/Walkthrough/

## Usage

Use the data-comments attribute to define and array of objects following the format {"lines":"text"}. Please note that Javascript objects must use double quotes to be valid.

``` html
<pre
  class="language-markup line-numbers"
  data-comments='[
    {"3-8":"A comment highlighting lines 3 to 8."},
    {"4":"Another comment, highlighting line 4."},
    {"":"A comment without line highlighting"},
    …
  ]'
>
  <code>…</code>
</pre>
```

The line definition follows the line-highlight prism plugin. You can set a range (3-6) or specific lines (3,6,9).

Not defining a line shows your comment without the line-highlight.

**Screenshot**

![code block screenshot](https://github.com/fabiogiolito/Walkthrough/raw/master/assets/example_plain.png)

## Instalation

Installing is pretty straightforward. Copy the plugin JS and CSS files from the [plugin folder](https://github.com/fabiogiolito/Walkthrough/tree/master/plugin) into your project and add them to your page after the Prism code.

``` html
<script src="prism/prism.js"></script>
<link rel="stylesheet" href="prism/prism.css">

<script src="plugin/walkthrough.js"></script>
<link rel="stylesheet" href="plugin/walkthrough.css">
```

Make sure you have the Line Highlight plugin installed as it is required for this plugin to work properly. It can be found on PrismJS.com when you download the Prism.js files.

Line numbers, Theme colors, Languages support and more are also part of Prism.js and can be found on PrismJS.com

## Customization

Customizing your code blocks and comments is easy with CSS. Add a custom class to your `pre` element and override the style of any element inside it.

**Screenshot**

![customized code block screenshot](https://github.com/fabiogiolito/Walkthrough/raw/master/assets/example_custom.png)

