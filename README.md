# Water Footprint for Web

This is a source for the [web site](http://evgenii.com/water-footprint/en/) that shows the amount of water needed to produce a range of agricultural products.

## Build HTML from data files

The data files for the water footprint of agriculcural products for different languages are localed in the `_data` directory.

Run this Ruby script to rebuild the HTML files localted in `_includes/list` from the data:

```Ruby
./_scripts/build_html_from_data.rb
```

## Credit

Data used in this app is released under the Creative Commons Attribution Non-commercial License and is derived from the following publications:

1. Mekonnen, M.M. and Hoekstra, A.Y. (2011) The green, blue and grey water footprint of crops and derived crop products, Hydrology and Earth System Sciences, 15, 1577-1600. Download PDF

1. Mekonnen, M.M. and Hoekstra, A.Y. (2012) A global assessment of the water footprint of farm animal products, Ecosystems, 15, 401-415. Download PDF


## License

The Water Footprint is distributed under [Creative Commons Attribution Non-commercial License](/LICENSE).

