# Water Footprint for Web

This is a source for the [web site](http://evgenii.com/water-footprint/en/) that shows the amount of water needed to produce a range of agricultural products.

Water Footprint is [also available](http://evgenii.com/projects/water-footprint-app-ios-android/) on Android and iOS.

<img src="https://raw.githubusercontent.com/evgenyneu/water-footprint-web/master/_graphics/screenshots/water_footprint_web_screenshot_3.png" alt="Water Footprint for Web" width="360">

## Setting up the project locally


#### 1) Install Jekyll

```
gem install jekyll
```

Note: this requires Ruby and rubygems to be present on your system.

#### 2) Clone the project

```
git clone git@github.com:evgenyneu/water-footprint-web.git
cd water-footprint-web
```

#### 3) Run the web site locally

```
jekyll serve
```

#### 4) Open in the web browser

Open the following URL: [http://127.0.0.1:4000/water-footprint/en/](http://127.0.0.1:4000/water-footprint/en/)


## Build HTML from data files

The data files for the water footprint of agriculcural products for different languages are localed in the `_data` directory.

Run this Ruby script to rebuild the HTML files localted in `_includes/list` from the data:

```Ruby
./_scripts/build_html_from_data.rb
```

## Credit

Data used on Water Footprint web site is released under the Creative Commons Attribution Non-commercial License and is derived from the following publications:

1. Mekonnen, M.M. and Hoekstra, A.Y. (2011) The green, blue and grey water footprint of crops and derived crop products, Hydrology and Earth System Sciences, 15, 1577-1600. Download PDF

1. Mekonnen, M.M. and Hoekstra, A.Y. (2012) A global assessment of the water footprint of farm animal products, Ecosystems, 15, 401-415. Download PDF


## License

The Water Footprint is distributed under [Creative Commons Attribution Non-commercial License](/LICENSE).


## Feedback is welcome

If you have any problems with this code please feel free to submit an issue ticket.
