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

.. class:: incremental

* install_requires
* tests_require
* extras_require

.. class:: next

.. code-block:: python

    extras_require = {
        'tests':  ['factory-boy']
    }

.. class:: next

.. code-block:: bash

    $ pip install my-project[tests]


**DRY**: Réutiliser les requirements de pip
===========================================

.. class:: condensed

.. code-block:: python

    RE_REQUIREMENT = re.compile(r'^\s*-r\s*(?P<filename>.*)$')

    def pip(filename):
        requirements = []
        for line in open(join('requirements', filename)).readlines():
            match = RE_REQUIREMENT.match(line)
            if match:
                requirements.extend(pip(match.group('filename')))
            else:
                requirements.append(line)
        return requirements

    setup(
        # ...
        install_requires=pip('install.pip'),
        tests_require=pip('test.pip'),
        extras_require = {
            'tests':  pip('test.pip'),
        },
    )


Versionning
===========

.. class:: incremental

* respect des normes (PEP 386, semver...)

  * 3 chiffres: {major}.{minor}.{patch}
  * suffix en dehors des releases: {major}.{minor}.{patch}.dev

* Automatisez la release !

  * script shell
  * Bump'R (ou autre)


Description et changelog
========================

Soyez **DRY**, réutiliser vos fichiers:

.. class:: incremental

* README.rst
* CHANGELOG.rst
* CONTRIBUTING.rst
* AUTHORS.rst

Filtrage et concatenation du RST
================================

.. class:: condensed

.. code-block:: python

    PYPI_RST_FILTERS = (
        (r'\.\.\s? code-block::\s*(\w|\+)+',  '::'),
        (r'.*travis-ci\.org/.*', ''),
        (r'.*pypip\.in/.*', ''),
        (r'.*crate\.io/.*', ''),
        (r'.*coveralls\.io/.*', ''),
    )

    def rst(filename):
        content = open(filename).read()
        for regex, replacement in PYPI_RST_FILTERS:
            content = re.sub(regex, replacement, content)
        return content

    long_description = '\n'.join((
        rst('README.rst'),
        rst('CHANGELOG.rst'),
        ''
    ))


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

.. code-block:: bash

    $ python setup.py develop


Prévisualisez
=============

.. code-block:: bash

    $ python setup.py --long-description | rst2html
    $ python setup.py sdist


Publiez
=======

.. code-block:: bash

    # Enregistrer le module sur PyPI
    $ python setup.py register
    # Publier sur PyPI
    $ python setup.py sdist upload
    # Créer un version avec un suffix
    $ python setup.py -q egg_info -b ".1234" sdist


Un peu de lecture
=================

* `Documentation officielle de setuptools <https://pythonhosted.org/setuptools/>`_
* `The Hitchhiker's Guide to Packaging <http://guide.python-distribute.org/>`_
* `PEP 386 <http://www.python.org/dev/peps/pep-0386/>`_ (numéro de version)
* `PEP 396 <http://www.python.org/dev/peps/pep-0396/>`_ (version d'un module)
* `PEP 345 <http://www.python.org/dev/peps/pep-0345/>`_ (métadonnées)
* `PEP 426 <http://www.python.org/dev/peps/pep-0426/>`_ (métadonnées 2.0)
