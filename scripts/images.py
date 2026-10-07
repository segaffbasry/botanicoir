"""Makes the web copies used by the page from _scrape/media-raw (see scripts/media.sh) as WebP, plus two stills from
the anniversary film (the misty palms and the drying field), cropped above its burned-in subtitles.
Photographs keep their natural colour, desaturated slightly (85%) so they sit together; see README "Photography"."""
import pathlib, subprocess
from PIL import Image, ImageEnhance
root = pathlib.Path(__file__).resolve().parent.parent
raw, out = root / "_scrape/media-raw", root / "public/media"

def save(src, name, width, crop=None, sat=0.85, q=80):
    im = Image.open(src).convert("RGBA")
    flat = Image.new("RGB", im.size, "white"); flat.paste(im, mask=im.split()[3]); im = flat  # transparent marks go onto white
    if crop: im = im.crop(crop)
    if im.width > width: im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    if sat != 1: im = ImageEnhance.Color(im).enhance(sat)
    im.save(out / f"{name}.webp", "WEBP", quality=q, method=6)
    print(f"{name}.webp {im.width}x{im.height}")

# Film stills (1920 wide, top 900 rows only)
film = root / "_scrape/film.mp4"
for t, name in [("84.0", "still-palms"), ("46.5", "still-field"), ("150.8", "still-works")]:
    tmp = root / f"_scrape/{name}.png"
    subprocess.run(["ffmpeg", "-v", "error", "-ss", t, "-i", str(film), "-frames:v", "1", "-vf", "crop=1920:900:0:0", str(tmp), "-y"], check=True)
    save(tmp, name, 1920, q=78)

for n in ["dryer", "strawberry", "tunnels", "staff"]: save(raw / f"slide-{n}.jpg", f"story-{n}", 1200)
save(raw / "team.jpg", "team", 1600)
save(raw / "coir-waste.jpg", "coir-waste", 1400)
save(raw / "founders.jpg", "founders", 677)
save(raw / "naomi.jpg", "naomi", 1082)
for n in ["salad", "fruit", "propagation", "bulk"]: save(raw / f"cat-{n}.jpg", f"cat-{n}", 1200)
save(raw / "news-water.jpg", "news-water", 900)
save(raw / "news-choosing.png", "news-choosing", 600)
save(raw / "news-pea.jpg", "news-pea", 900)
save(raw / "news-beyond.png", "news-beyond", 900, sat=1)
for p in sorted(raw.glob("ms-*.jpg")): save(p, p.stem, 779)
# Product illustrations and certification marks: no colour change (they are graphics, not photographs).
for n in ["salad", "fruit", "propagation", "bulk"]: save(raw / f"tile-{n}.png", f"icon-{n}", 300, sat=1, q=90)
for p in sorted(raw.glob("cert-*")): save(p, p.stem, 300, sat=1, q=92)
