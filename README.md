# clever-pages-admin
Pages Admin package for CLEVER V1.

### Introduction
This package allows developers to easily create and manage web site content. You can consider it as the `developer oriented` (and cool) version of Wordpress. No front-end content site is implemented and comes within this package. The content is think to be served through a REST API.

#### Dependencies
This package needs (clever-pages-api)[https://github.com/cleverframework/clever-pages-api] package to be installed within [Clever Framework](https://github.com/cleverframework).

Feel free to create your own API package for Clever Framework and share with us the code if you fancy :-)

### Engineering
This package is built on top of [FLUX](https://facebook.github.io/flux/docs/overview.html) pattern design, [React](https://facebook.github.io/react/) and [Clever Framework](https://github.com/cleverframework).

#### RESTful atomic update
A Page (resource) is associated with other resources like Images, Texts, Buttons and Galleries. Since we want make an `all-in-one` user interface that allows users to make several updates (add content, change page name, etc etc ..) from one unique edit page and saving all of them asynchrony (using a `save` button when the user is ready) the concept of `transaction` seems to us the best way to design our API.

A transaction is a resource as well where you can add to it, delete from it, query to see its current contents, and then finally commit it or delete (i.e. rollback) the transaction.
