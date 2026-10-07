#!/bin/sh
# Cuts the hero loop from the live homepage's anniversary film (YouTube e5mU5AjTRnQ, "Celebrating 20 Years of
# Botanicoir"). The film has burned-in subtitles along the bottom, so every shot is cropped to the top 900 of 1080
# rows. Only b-roll shots are used (no interviews or name captions). Shot boundaries came from ffmpeg scene detection
# (select='gt(scene,0.25)'); each cut is trimmed 0.15s inside its shot so no frame of the neighbouring shot leaks in.
# Needs yt-dlp and ffmpeg. Output: public/media/hero.mp4, hero-mobile.mp4 and hero-poster.jpg.
set -e
cd "$(dirname "$0")/.."
SRC=_scrape/film.mp4
[ -f "$SRC" ] || yt-dlp -q -f "bv*[height<=1080][ext=mp4]+ba[ext=m4a]/b[ext=mp4]" -o "$SRC" "https://www.youtube.com/watch?v=e5mU5AjTRnQ"
TMP=_scrape/clips; mkdir -p "$TMP" public/media; rm -f "$TMP"/c*.mp4 "$TMP"/list.txt
i=0
# start:end, in order: misty palms, drying field walk, aerial coir beds, aerial works, coir machine, coir in hand, strawberry picking
for seg in 82.55:86.45 45.25:47.75 154.25:156.35 149.85:152.45 54.45:57.65 34.95:37.05 93.75:97.65; do
  a=${seg%%:*}; b=${seg##*:}; d=$(echo "$b - $a" | bc)
  ffmpeg -v error -ss "$a" -i "$SRC" -t "$d" -an -vf "crop=1920:900:0:0,scale=1600:-2,fps=25,format=yuv420p" -c:v libx264 -crf 20 -preset slow "$TMP/c$i.mp4" -y
  echo "file 'c$i.mp4'" >> "$TMP/list.txt"; i=$((i+1))
done
ffmpeg -v error -f concat -safe 0 -i "$TMP/list.txt" -c:v libx264 -crf 25 -preset slow -movflags +faststart -an public/media/hero.mp4 -y
ffmpeg -v error -i public/media/hero.mp4 -vf "crop=ih*0.75:ih,scale=720:-2" -c:v libx264 -crf 27 -preset slow -movflags +faststart -an public/media/hero-mobile.mp4 -y
ffmpeg -v error -ss 1 -i public/media/hero.mp4 -frames:v 1 -q:v 3 public/media/hero-poster.jpg -y
ls -la public/media/hero*
