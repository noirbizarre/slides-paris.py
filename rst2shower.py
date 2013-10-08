#!/usr/bin/env python
# -*- coding: utf-8 -*-
from __future__ import unicode_literals, print_function

import sys

from docutils.core import publish_string
from lxml import etree as ET, html
from rst2html5 import HTML5Writer


def ok():
    if sys.stdout.isatty():
        print('\x1b[32m✔\x1b[0m'.encode('utf8'))
    else:
        print('✔'.encode('utf8'))


def add_class(el, clazz):
    classes = el.get('class')
    if classes:
        classes = set(classes.split(' '))
        classes.add(clazz)
        el.set('class', ' '.join(classes))
    else:
        el.set('class', clazz)


def add_css(el, url):
    ET.SubElement(el, 'link', attrib={
        'rel': 'stylesheet',
        'href': url,
    })


source = 'slides.rst'
destination = 'dist/index.html'

print("Rendering {0} to raw HTML5...".format(source), end='')
raw_html5 = publish_string(open(source).read(), writer=HTML5Writer())
ok()

print("Transforming raw HTML5 to shower slides", end='')
doc = html.fromstring(raw_html5.decode('utf-8'), 'utf-8')
doc.set('lang', 'fr')

head = doc.find('head')
ET.SubElement(head, 'meta', attrib={
    'name': 'viewport',
    'content': 'width=792, user-scalable=no',
})
ET.SubElement(head, 'meta', attrib={
    'http-equiv': 'x-ua-compatible',
    'content': 'ie=edge',
})
add_css(head, 'css/paris.py.css')
# add_css(head, 'css/solarized-dark.css')
# add_css(head, 'css/theme.css')

body = doc.find('body')
body.set('class', 'list')

# Transform sections into shower slides
for section in body.iter('section'):
    # Transform sections into slides
    add_class(section, 'slide')
    # merge id from anchor
    anchor = section.getprevious()
    section.set('id', anchor.get('id'))
    section.getparent().remove(anchor)
    # Wrap content into div
    children = list(section)
    ET.SubElement(section, 'div').extend(children)

# Transform incremental lists
for ul_or_ol in body.cssselect('.incremental'):
    for li in ul_or_ol.iterchildren():
        add_class(li, 'next')
    ul_or_ol.attrib.pop('class')

for code in body.cssselect('pre code'):
    add_class(code, 'highlight')

# Create header
header = ET.Element('header', attrib={'class': 'caption'})
for el in body.iterchildren():
    if el.tag == 'section':
        break
    header.append(el)
body.insert(0, header)

# Progress pbar
progress = ET.SubElement(body, 'div', attrib={'class': 'progress'})
ET.SubElement(progress, 'div')

# Shower script
ET.SubElement(body, 'script', attrib={'src': 'js/paris.py.js'})
ok()

print("Saving rendered slides to {0}...".format(destination), end='')
with open(destination, 'wb') as out:
    out.write(html.tostring(doc, encoding='utf-8', pretty_print=True, doctype='<!DOCTYPE html>'))
ok()
