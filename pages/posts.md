---
layout: default
title: Posts
permalink: /posts
---

# Posts

{% for post in site.posts %}
  <h2><a class="nounderline black" href="{{ post.url }}">{{ post.title }}</a></h2>
  <i class="gray">{{ post.date | date: "%e %B %Y" }}</i>
  {{ post.excerpt }}
  <a href="{{ post.url }}">Read more...</a>
{% endfor %}
