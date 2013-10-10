.. meta::
    :description: Présentation pour le 3e meetup Paris.py
    :author: Axel Haustant

Python packaging
################

Tour d'horizon en 15 minutes



.. class:: cover first

Packaging Python
================

Par `Axel Haustant <http://noirbizarre.info>`_

.. image:: images/python.jpg
    :alt: cover

.. class:: logo-right

.. image:: images/logo-meetup.png
    :alt: logo meetup

.. note::

    * remettre la phrase d'accroche ?
    * taille du logo ?
    * faire apparaitre Paris.py dans le logo



Packaging ?
===========

.. class:: next

**Pourquoi ?**

.. class:: incremental

* pour distribuer
* pour déployer
* pour archiver

.. class:: next

**Comment ?**

.. class:: next

Avec ``setuptools`` !



.. class:: shout

L'essentiel
===========

.. note:: titre à revoir



setup.py
========

.. code-block:: python

    from setuptools import setup

    setup(
        name='my-project',
        version='0.1.0',
        # ...
    )


.. class:: next

C'est du Python donc tout est permis !



Identification
==============

.. class:: incremental

* name (évidement)
* version
* description
* long_description
* classifiers



Versionning
===========

.. class:: incremental

* respect des normes (PEP 386, semver...)

  * 3 chiffres: ``{major}.{minor}.{patch}``
  * suffix pour le dev: ``{major}.{minor}.{patch}.dev``

* Automatisez la release !

  * script shell
  * outil dédié (ex: Bump'R)



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



Gestion des resources
=====================

.. class:: incremental

* ``include_package_data = True``
* `MANIFEST.in <http://docs.python.org/2/distutils/sourcedist.html#the-manifest-in-template>`_
* `pkg_resouces <http://pythonhosted.org/distribute/pkg_resources.html>`_

.. note::

    * Un slide pour chaque  avec des exemples ?



MANIFEST.in
===========

Contrôlez la taille et le contenu de votre livrable

.. class:: next

* include
* include-recursive
* exclude
* exclude-recursive
* prune



Développez
==========

Une seule commande pour être prêt:

.. code-block:: bash

    $ python setup.py develop



Prévisualisez
=============

Contrôlez ce que vous allez publier

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



.. class:: shout

Recettes DRY
============



Réutiliser les metadonnées du module
====================================

Selon la `PEP 396`_, le module doit contenir certaines metadonnées

.. class:: next

.. code-block:: python

    from project import __version__, __description__
    setup(
        name='project'
        version=__version__
        description=__description__
    )

.. note:: la PEP 396 porte uniquement sur __version__


Réutiliser les requirements de pip
==================================

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



Réutiliser les fichiers rst
===========================

.. class:: condensed

.. code-block:: python

    PYPI_RST_FILTERS = (
        (r'\.\.\s? code-block::\s*(\w|\+)+',  '::'), #
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


.. note:: verifier que code-block est toujours d'actualité
    avec la nouvelle version de PyPI et sur Crate.io



.. class:: shout

Entry Points
============


Console scripts
===============

Pas besoin de répertoire ``bin``

.. class:: next

.. code-block:: python

    entry_points={
        'console_scripts': [
            'myexec = project.commands:main',
        ]
    }

.. class:: next

.. code-block:: bash

    $ myexec



Créer ses propres commandes
===========================

.. class:: condensed

.. code-block:: python

    entry_points = {
        'distutils.commands': 'do_it = project.commands:DoSomething',
    },


.. class:: next condensed

.. code-block:: python

    from setuptools import Command

    class DoSomething(Command):
        description = "Do something"
        user_options = []

        def initialize_options(self):
            pass

        def finalize_options(self):
            pass

        def run(self):
            do_something()




Un peu de lecture
=================

* `Documentation officielle de setuptools <https://pythonhosted.org/setuptools/>`_
* `The Hitchhiker's Guide to Packaging <http://guide.python-distribute.org/>`_
* `PEP 386`_ (numéro de version)
* `PEP 396`_ (version d'un module)
* `PEP 345`_ (métadonnées)
* `PEP 426`_ (métadonnées 2.0)


.. class:: shout

Questions
=========


A suivre...
===========

* présentation: http://noirbizarre.github.io/slides-paris.py/
* twitter: `@noirbizarre <https://twitter.com/noirbizarre>`_
* google+: `noirbizarre <https://plus.google.com/118323681296003594129/>`_


.. _`PEP 386`: http://www.python.org/dev/peps/pep-0386/
.. _`PEP 396`: http://www.python.org/dev/peps/pep-0396/
.. _`PEP 345`: http://www.python.org/dev/peps/pep-0345/
.. _`PEP 426`: http://www.python.org/dev/peps/pep-0426/
