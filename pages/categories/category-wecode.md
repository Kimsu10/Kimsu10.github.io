---
title: "wecode"
layout: archive
permalink: categories/wecode
author_profile: true
sidebar_main: true
---

{% assign posts = site.categories.wecode %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}
