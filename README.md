Hi, reader!

Please run (assuming you got *node* and *npm* installed (https://nodejs.org/en/))

`npm i` to install dependencies

`gulp` to run the local server, assuming you have *gulp* globally installed (`npm i gulp -g`) otherwise use (`node node_modules/gulp/bin/gulp`)

`npm test` to run a test setup

Please note there are some usages of ES2015 code standard syntax which is babelified (https://babeljs.io/) during the build proccess.
After gulp was run at least once, 'build' is produced which contains the JS and css not minified bundles.
