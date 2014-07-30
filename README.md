lesson_framework
================

The Lesson Framework currently is in *beta*.

###Identifying correct Lesson###

The landing page for each lesson would use the data attribute on the #content div.

    <section id="content" data-lesson="html-101"></section>

###Lesson Files###

Store lesson files under /lessons/

    - Lessons should include an index.html file and a sections.json file.

Sections.json is the navigation config file in json format.

To include a gist into a lesson file, follow this format.

    <p id="intro-html" class="gist-code" data-gist="rhinocoders/c528d28e11536692ea16"></p>
    id = sections.json labelName attribute
    data-gist = gist id when you share / embed a gist from github.
