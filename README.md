# ng-flash-card
This is an application that will give you web based flash cards using angularjs.
This application also relies on bootstrap css, so be sure to include that in your project.

##Project setup
Install nodejs
Make sure npm is in your path
Install bower:
```
npm install -g bower
```
Install grunt:
```
npm install -g grunt
```

check out this repository and cd to it
```
git clone https://github.com/narcolepticsnowman/ng-flash-card.git
cd ng-flash-card
```

Then run these two commands
```
npm install
bower install
```

If you make changes run grunt in the same directory.
Doing so will recompile all of the files under the dist directory.

You can also use grunt watch to have dist automatically recompiled while you're making changes.


##Using it
First, be sure you have angularJs and bootstrap css included on your html document.
Then include the ngFlashCard.js or ngFlashCard.min.js file as a script tag somewhere in your html document
To put a flashCard set on the page use something like the following:
```
<div flash-card-set card-groups="exampleCardGroups"></div>
```
card-groups should be an object with the following structure:
```
[
    {"name": "example1", "cards": [
            {"front": "hello", "back": "world"},
            {"front": "foo", "back": "bar"}
        ]
    },
    {"name": "example-two", "cards": [
                {"front": "cat", "back": "dog"},
                {"front": "apple", "back": "orange"}
            ]
    }
]
```

You can see an example on the index.html file under the sample folder.

##Making it your own
There are several classes on the html template that can be used to change the appearance of the flash cards.
All classes are prefixed with ngFlashCard-
You can can also modify ngFlashCard.css to fit your needs.
