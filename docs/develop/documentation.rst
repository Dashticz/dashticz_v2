Documentation
=============

All documentation is maintained in docs-folder of the Github source tree.

For generating the documentation Sphinx and readthedocs.org is being used.

For more information see:

* sphinx
* readthedocs
* rst: reStructuredText, the markup language we use

.. rubric:: Basic

For basic modification of the documentation just edit the files in the docs folder, push your changes to github and create a pull request. After merging of the change the documentation will be pulled by readthedocs.org and the new version of the documentaion becomes available on https://dashticz-v2.readthedocs.io

.. rubric:: Advanced

#. install Sphinx

#. Make changes::

      cd [dashticz_folder]/docs
      nano mydocumentation.rst

#. Create a local html version::

      cd [dashticz_folder]/docs
      make html

#. Check whether you are happy with the result by opening the generated html file in the build folder in your browser.

#. Clean up the build results::

     make clean

#. Push your changes to Github and create the PR.

Coding styles
-------------

Headers
~~~~~~~

Example::

   Header level 1
   ==============
   
   Header level 2
   ______________
   
   Header level 3
   ~~~~~~~~~~~~~~

These header levels will appear in the table of contents on the left.   

Tables
~~~~~~

Preferred method for defining a parameter table::

    .. list-table:: 
      :header-rows: 1
      :widths: 5, 30
      :class: tight-table
          
      * - Parameter
        - Description
      * - width
        - ``1..12``: The width of the block relative to the column width
      * - title
        - ``'<string>'``: Custom title for the block

Alternative 1::

    .. csv-table:: 
       :header: Parameter, Description
       :widths: 5, 30
       :class: tight-table

       forcerefresh,"| Control the caching-prevention mechanism of the images for a button.
       | ``0`` : Normal caching behavior (=default)
       | ``1``,  ``true`` : Prevent caching by adding t=<timestamp> parameter to the url. Not all webservers will handle this correctly
       | ``2`` : The image is loaded via php, preventing caching. (php must be enabled on your Dashticz server)"

The previous example will not show a horizontal scroll bar.
If you want to have a horizontal scroll bar then remove ``:class: tight-table``
   
Alternative 2::

    ============   ===============================
    Parameter      Description 
    ============   ===============================
    forcerefresh   | Control the caching-prevention mechanism of the images for a button.
                   | ``0`` : Normal caching behavior (=default)
                   | ``1``, ``true`` : Prevent caching by adding t=<timestamp> parameter to the url. Not all webservers will handle this correctly
                   | ``2`` : The image is loaded via php, preventing caching. (php must be enabled on your Dashticz server)
    ============   ===============================
