Python packaging
################

Best practices et retour d'expérience en 15 minutes


.. class:: cover first

Packaging Python
================

Par `Axel Haustant <http://noirbizarre.info>`_

.. image:: images/python.jpg
    :alt: cover


Packager, Pourquoi ?
====================

.. class:: incremental

* pour distribuer
* pour déployer
* pour archiver

Comment ?
=========

Avec ``setuptools`` !

.. class:: next

C'est du Python donc tout est permis !

.. class:: next

Mais c'est pas une raison pour faire n'importe quoi !


Un setup.py basic
=================

.. code-block:: python

    from setuptools import setup

    setup(
        name='my-project',
        version='0.1',
    )


Paramètres importants
=====================

.. class:: incremental

* name (évidement)
* version
* description

Gestion des dépendances
=======================

TODO, pip, install_requires, tests_require, extra


Versionning
===========

TODO (Bump'R, PEP, semver)

Description et changelog
========================

RST, filtrage...


Documentation
=============

Sphinx, Read the doc...

Console scripts
===============

TODO


Entry Points
============

TODO


Classifiers
===========

Sur PyPI (Python version)

Inclure des données
===================

find_packages
MANIFEST.in
read from stream

MANIFEST.in
===========

* include
* include-recursive
* prune

Développez
==========

Une seule commande pour être prêt:

.. code-block:: console

    $ python setup.py develop


Prévisualisez
=============

.. code-block:: console

    $ python setup.py --long-description | rst2html
    $ python setup.py sdist


Publiez
=======

.. code-block:: console

    $ python setup.py register
    $ python setup.py sdist upload


Un peu de lecture
=================

* `Documentation officielle de setuptools <https://pythonhosted.org/setuptools/>`_
* `The Hitchhiker's Guide to Packaging <http://guide.python-distribute.org/>`_
* `PEP 386 <http://www.python.org/dev/peps/pep-0386/>`_ (numéro de version)
* `PEP 396 <http://www.python.org/dev/peps/pep-0396/>`_ (version d'un module)
* `PEP 345 <http://www.python.org/dev/peps/pep-0345/>`_ (métadonnées)
* `PEP 426 <http://www.python.org/dev/peps/pep-0426/>`_ (métadonnées 2.0)
