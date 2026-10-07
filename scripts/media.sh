#!/bin/sh
# Downloads every homepage image from botanicoir.com into _scrape/media-raw (originals, not WordPress thumbnails), then
# scripts/images.py makes the web copies. Sources are listed by homepage section.
set -e
cd "$(dirname "$0")/.."
UA="Mozilla/5.0 (Macintosh) Chrome/130"
U=https://www.botanicoir.com/wp-content/uploads
R=_scrape/media-raw; mkdir -p "$R" public/media public/brand
get() { [ -s "$R/$2" ] || curl -sfL -A "$UA" "$1" -o "$R/$2"; }

# Hero slider (4 slides) and the Our Story banner
get $U/2020/06/1-dryer-banner.jpg slide-dryer.jpg
get $U/2020/06/2-strawberry-banner.jpg slide-strawberry.jpg
get $U/2020/06/5-tunnels-banner.jpg slide-tunnels.jpg
get $U/2020/06/6-staff-banner.jpg slide-staff.jpg
get $U/2019/06/team-photo-2026-2.jpg team.jpg
# Our Products: the homepage's four category tiles, plus the category pages' own photographs
get $U/2019/08/salad-vegetables-300x206-300x206.png tile-salad.png
get $U/2019/08/soft-fruits-300x206-300x206.png tile-fruit.png
get $U/2019/08/propagation-300x206-300x206.png tile-propagation.png
get $U/2019/08/bulk-coir-300x206-300x206.png tile-bulk.png
get $U/2020/05/cucumber.jpg cat-salad.jpg
get $U/2020/05/blueberry.jpg cat-fruit.jpg
get $U/2020/05/propagation-banner.jpg cat-propagation.jpg
get $U/2020/05/bulk-top-banner-photo.jpg cat-bulk.jpg
# 20 years: founders portrait and the anniversary mark
get $U/2024/12/botanicoir-founders.jpg founders.jpg
get $U/2026/03/botanicoir-over20years-300.png over20.png
# Milestones (20 Years page)
for f in botanicoir-founders-slide.jpg Orphanage.jpg tomotoes-spain.jpg botanicoir-first-grow-bag.jpg Kalum-Mark-Agrovista-Botanicoir.jpg botanicoir-sri-lanka-office.jpg precision-plus.jpg Botanicoir-Growers-Visit.jpg Sandy-and-Kalum-New-Forest-Fruits-Botanicoir.jpg 2015-waste-water.jpg Botanicoir-Mechanical-Coir-Dryer.jpg 2017-Precision-Plus-Ultra-product-new.jpg Botanicoir-India-Coir-Facility.jpg Botanicoir-Biodegradable-Grow-Bag.jpg Legro-and-Botanicoir.jpg Hospital-wing.jpg Precision-Start-Botanicoir-Grow-Cube-Results.jpg Botanicoir-20-Years-Logo-2.jpg; do get $U/2024/12/$f ms-$f; done
# Beyond Sustainable
get $U/2026/05/naomi.jpg naomi.jpg
get $U/2026/05/coir-waste-product.jpg coir-waste.jpg
# News: the four newest posts on /news-events/
get $U/2026/09/DSC_0261-copy.jpg news-water.jpg
get $U/2026/05/Kris-Sak-Botanicoir-.png news-choosing.png
get $U/2026/08/e038ed88-fcbc-4bfb-b9e3-9002f951a4f5.jpg news-pea.jpg
get $U/2026/07/PRODUCE-HIGHLIGHT.png news-beyond.png
# Certifications (footer strip on the live homepage)
get $U/2021/01/SGS_ISO_9001_UKAS.jpg cert-iso9001.jpg
get $U/2021/01/SGS_ISO_14001_UKAS.jpg cert-iso14001.jpg
get $U/2020/07/omri-listed.png cert-omri.png
get $U/2019/06/leaf.png cert-leaf.png
get $U/2019/08/soil-association.png cert-soil.png
get $U/2021/09/Sedex-member-mark.png cert-sedex.png
get $U/2020/12/IBO_logo-website.jpg cert-ibo.jpg
# Brand
[ -s public/brand/logo-source.svg ] || curl -sfL -A "$UA" https://www.botanicoir.com/wp-content/themes/botanicoir/images/botanicoir-logo.svg -o public/brand/logo-source.svg
for f in "$R"/*; do printf "%s %s\n" "$(sips -g pixelWidth -g pixelHeight "$f" | awk '/pixel/{printf "%s ", $2}')" "$(basename "$f")"; done
