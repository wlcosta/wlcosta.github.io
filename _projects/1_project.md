---
layout: page
title: VoxarWild Perception
description: Industry R&D project in partnership with Volkswagen Trucks and Bus and Eyeflow.ai
img: assets/img/looking.png
importance: 1
category: Industry
related_publications: true
---

Vehicle-to-everything (V2X) communication allows vehicles to exchange data with various elements in their environment, including other vehicles (V2V). The goal is to enhance traffic efficiency, improve road safety, and support advanced driver-assistance systems (ADAS) and autonomous driving. However, before vehicles can communicate through this channel, they must first be able to perceive important information from the outside world. The VoxarWild Perception project, funded by [Embrapii](https://embrapii.org.br/en/) in partnership with Volkswagen Trucks and Bus and Eyeflow.ai, aims to collect useful sensor data about the external driving context as well as extract human behavioral cues from pedestrians. This sensed information will then be used to improve prediction systems and enable safer V2X communications.

This one-year project, which was active from 2023 to 2024, led to the development of several proof-of-concept validations, as well as functional prototypes that are available for usage today.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/looking.png" title="looking" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/vwise.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/vwise.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Some publicly available results from this project. From left to right, we have <a href="https://github.com/vita-epfl/looking/tree/main">Looking</a>, which we briefly tested as proof-of-concept but did not follow through due to licensing questions.
</div>

## related publications
<div class="publications">
  {% bibliography -f papers -q @*[key=costa2023survey]* %}
</div>