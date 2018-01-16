# JavaScript RisingStar 2017 DeathStar

Demo url: [http://risingstars_demo.frankxu.me/](http://risingstars_demo.frankxu.me/)

## How to develop?

* Clone the repo
* Install the dependencies: `npm install`
* Install the parceljs: `npm install -g parcel-bundler`
* Run parceljs: `parcel serve src/index.html`
* Open Browser URL: `http://localhost:1234/`


## How to build production?
* `parcel build src/index.html -d build --public-url .`
* `cd build`
* `python3 -m http.server`
