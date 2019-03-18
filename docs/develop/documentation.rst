Documentation
=============

All documentation is maintained in docs-folder of the Github search tree.

For generating the documentation Sphinx and readthedocs.org is being used.

For more information see:

* sphinx
* readthedocs
* rst: Reflow Structured, the markup language we use

.. rubric:: Basic

For basic modification of the documentation just edit the files in the docs folder, push your changes to github and create a pull request. After merging of the change the documentation will be pulled by readthedocs.org and the new version of the documentaion becomes available on https://dashticz-v2.readthedocs.io

.. rubric:: Advanced

* install Sphinx

* Make changes

* Create a local html version

make html

Check whether you are happy with the result by opening the generated html file in the build folder in your browser.

Clean up the build results
make clean

Push your changes to Github and create the PR.
