/* Every word on the page, taken from botanicoir.com (homepage first; inner pages where noted). Copy is verbatim
   except that dashes are rewritten as commas or "to" (house style). Every href is a live URL checked against the
   site's sitemaps by scripts/check-links.mjs. News comes from lib/news.json (scripts/news.mjs). */
import newsItems from "@/lib/news.json";

export const site = "https://www.botanicoir.com";
const u = (path: string) => `${site}${path}`;

export type Link = { label: string; href: string };

export const contact = {
  phone: { label: "+44 (0) 203 176 2051", href: "tel:+442031762051" },
  email: { label: "info@botanicoir.com", href: "mailto:info@botanicoir.com" },
  page: u("/contact/"),
};

/* Header and menu: the live main navigation, in its order. "Medicinal cannabis" goes to Botanicoir's sister site. */
export const products = {
  label: "Products",
  groups: [
    { label: "Salad & Vegetables", href: u("/product-category/salad-vegetables/"), links: [
      { label: "Tomato", href: u("/product/tomato/") }, { label: "Pepper", href: u("/product/pepper/") },
      { label: "Cucumber", href: u("/product/cucumber/") }, { label: "Aubergine", href: u("/product/aubergine/") }] },
    { label: "Soft Fruit", href: u("/product-category/soft-fruit/"), links: [
      { label: "Strawberry", href: u("/product/strawberry/") }, { label: "Raspberry", href: u("/product/raspberry/") },
      { label: "Blueberry", href: u("/product/blueberry/") }, { label: "Blackberry", href: u("/product/blackberry/") }] },
    { label: "Format", links: [
      { label: "Grow Bags", href: u("/products/coir-grow-bags/") }, { label: "Naked Slabs", href: u("/products/coir-slabs/") },
      { label: "Open Top Containers", href: u("/products/open-top-containers/") }, { label: "Blocks", href: u("/products/coco-coir-blocks/") },
      { label: "Grow Cubes", href: u("/products/coir-grow-cubes/") }, { label: "Bulk", href: u("/product/bulk/") }] },
    { label: "Treatment", links: [
      { label: "Washed and Buffered", href: u("/products/buffered-coco-coir/") }, { label: "Super Washed", href: u("/products/super-washed-coco-coir/") },
      { label: "Washed", href: u("/products/washed-coir/") }, { label: "Unwashed", href: u("/products/unwashed-coir/") }] },
    { label: "Application", links: [
      { label: "Hydroponics", href: u("/products/coco-coir-hydroponics/") }, { label: "Microgreens", href: u("/products/coconut-coir-microgreens/") },
      { label: "Vertical Farming", href: u("/products/coconut-coir-vertical-farming/") }, { label: "Propagation", href: u("/products/propagation/") },
      { label: "Medicinal cannabis", href: "https://www.medicoir.com/" }] },
  ] as { label: string; href?: string; links: Link[] }[],
};

export const about: Link[] = [
  { label: "Beyond Sustainable", href: u("/beyond-sustainable/") },
  { label: "Our Story", href: u("/timeline/") },
  { label: "FAQs", href: u("/faqs/") },
  { label: "20 Years", href: u("/20-years/") },
  { label: "News", href: u("/news-events/") },
  { label: "Contact", href: u("/contact/") },
];

export const languages: Link[] = [
  { label: "English", href: u("/") }, { label: "French", href: u("/fr/") }, { label: "German", href: u("/de/") },
  { label: "Dutch", href: u("/nl/") }, { label: "Spanish", href: u("/es/") }, { label: "Polish", href: u("/pl/") },
  { label: "Chinese", href: u("/zh/") },
];

export const sections: Link[] = [
  { label: "About us", href: "#about" },
  { label: "Growing together", href: "#stories" },
  { label: "Our products", href: "#products" },
  { label: "20 years", href: "#years" },
  { label: "Beyond Sustainable", href: "#sustainable" },
  { label: "News & Events", href: "#news" },
  { label: "Contact", href: "#contact" },
];

/* Hero. The headline is the 20 Years page's own strapline; the side block is the homepage's anniversary heading and
   its "70 countries" line. The film is cut from the homepage's anniversary film (scripts/film.sh). */
export const hero = {
  title: ["Delivering today,", "cultivating tomorrow."],
  side: ["Over 20 Years", "Growing Together"],
  text: "Trusted by the commercial horticulture industry in over 70 countries worldwide.",
  cta: { label: "Explore products", href: "#products" },
  film: { src: "/media/hero.mp4", mobile: "/media/hero-mobile.mp4", poster: "/media/hero-poster.jpg" },
  foot: "Producers of Quality Cocopeat",
};

/* The homepage's introduction, unchanged, beside a photograph from the Beyond Sustainable page. */
export const intro = {
  lead: "We’re a family-run company with 20 years’ experience of manufacturing top-quality coir products, trusted by the commercial horticulture industry in over 70 countries worldwide.",
  text: "With roots in Sri Lanka and India, we’re dedicated to delivering superior coir products and exceptional service, while safeguarding our planet for future generations.",
  cta: { label: "Speak to our team", href: u("/contact/") },
  image: { src: "/media/coir-waste.webp", alt: "Botanicoir team members sorting coconut husks at a facility in Sri Lanka", w: 1400, h: 932 },
};

/* The four homepage slides, each with the story it links to. The heading is the Our Story page's philosophy. */
export const stories = {
  title: "Trust, transparency, innovation and partnership are the heart of everything that we do.",
  text: "Our philosophy is simple: Providing products of the highest quality to our customers and working hand in hand with them to innovate and grow together.",
  cta: { label: "Our story", href: u("/timeline/") },
  items: [
    { title: "Future proofing coir deliveries", tag: "Dryer", href: u("/future-proofing-coir-supplies-for-growers/"), image: "/media/story-dryer.webp", alt: "Botanicoir’s mechanical coir dryer in Sri Lanka" },
    { title: "High quality coir for increased yields", tag: "Strawberry", href: u("/careful-substrate-selection-brings-increased-yields/"), image: "/media/story-strawberry.webp", alt: "Ripe strawberries growing from coir grow bags on a table-top system" },
    { title: "Working hand in hand with growers", tag: "Tunnels", href: u("/product/strawberry/"), image: "/media/story-tunnels.webp", alt: "Aerial view of a grower’s polytunnels in the English countryside" },
    { title: "Looking after our people and our planet", tag: "Staff", href: u("/planet-people/"), image: "/media/story-staff.webp", alt: "Members of the Botanicoir production team in Sri Lanka" },
  ],
};

/* Our Products: the homepage's four categories with their own illustrations, plus the category pages' photographs and
   crops. The "find by" lists are the live menu's Format, Treatment and Application groups. */
export const catalogue = {
  title: "Our Products",
  text: ["We develop our coir growing media to suit their growing application.", "Please choose a category that suits your needs to find the right product."],
  items: [
    { title: "Salad & Vegetables", href: u("/product-category/salad-vegetables/"), icon: "/media/icon-salad.webp", image: "/media/cat-salad.webp", alt: "Cucumbers growing in a glasshouse", crops: ["Tomato", "Pepper", "Cucumber", "Aubergine"] },
    { title: "Soft Fruit", href: u("/product-category/soft-fruit/"), icon: "/media/icon-fruit.webp", image: "/media/cat-fruit.webp", alt: "Blueberries ripening on the bush", crops: ["Strawberry", "Raspberry", "Blueberry", "Blackberry"] },
    { title: "Propagation", href: u("/product/propagation/"), icon: "/media/icon-propagation.webp", image: "/media/cat-propagation.webp", alt: "A young plant rooted in a Botanicoir coir grow cube", crops: ["Grow Cubes", "Blocks"] },
    { title: "Bulk Coir", href: u("/product/bulk/"), icon: "/media/icon-bulk.webp", image: "/media/cat-bulk.webp", alt: "Piles of processed coir at a Botanicoir facility", crops: ["Bulk"] },
  ],
};

/* 20 years: the homepage block, the founders' thanks and every milestone from the 20 Years page. The homepage's
   YouTube film opens in an overlay on this page. */
export const years = {
  title: "Over 20 Years Growing Together",
  text: "In 2025, Botanicoir celebrated its 20-year anniversary. Together with our dedicated team, growers from around the world, and agricultural experts, we’re proud to have built a blossoming global network and an industry-leading coir production business that sustainably supports communities worldwide.",
  cta: { label: "Learn about our history", href: u("/20-years/") },
  film: { id: "e5mU5AjTRnQ", label: "Celebrating 20 Years of Botanicoir" },
  quote: "We would like to thank everyone who has been a part of our journey. Here’s to many more years of shared success and continued progress together!",
  by: "Kalum, Samantha and Chaminda Balasuriya, Founders",
  founders: { src: "/media/founders.webp", alt: "Botanicoir founders Kalum, Samantha and Chaminda Balasuriya", w: 677, h: 498 },
  milestonesTitle: "From seed to success: the milestones that define us.",
  milestones: [
    { year: "2005", title: "Botanicoir was founded", text: "Botanicoir was founded in 2005 by family team, Kalum, Samantha and Chaminda Balasuriya.", image: "ms-botanicoir-founders-slide" },
    { year: "2005", title: "Supporting our local community", text: "We became a primary sponsor of local orphanage (2005 to date), originally set up for children who lost their parents after the devastating tsunami of 2004.", image: "ms-Orphanage" },
    { year: "2007", title: "Entering the European market", text: "We first entered into the European tomato market, supplying the largest tomato grower in Spain at the time with coco coir.", image: "ms-tomotoes-spain" },
    { year: "2008", title: "First compressed buffered grow bag sold", text: "We introduced the compressed buffered grow bags into the UK soft fruit market, selling our first product to UK strawberry growers, Richard and Vernon Emery based near the new Forest.", image: "ms-botanicoir-first-grow-bag" },
    { year: "2009", title: "Partnering with Agrovista in the UK", text: "Agrovista joins us as our UK partner, working closely with head of fruit, Mark Davies, and we soon become one of the most popular grower choices for strawberry growbags in the UK.", image: "ms-Kalum-Mark-Agrovista-Botanicoir" },
    { year: "2011", title: "New facilities in Sri Lanka", text: "As demand for coir grew, we proudly opened our new production facility having outgrown the previous space, and offering a more comfortable working environment for our team.", image: "ms-botanicoir-sri-lanka-office" },
    { year: "2012", title: "Precision Plus launched", text: "The launch of Precision Plus grade mix for soft fruit production was launched after years of grower trials, feedback and development. The precise mix is developed with specific grading and buffering techniques and the new bag offered longevity due to its stable structure.", image: "ms-precision-plus" },
    { year: "2014", title: "Our growers visit us in Sri Lanka", text: "Kicking off a long-standing tradition, we invited our first cohort of loyal customers to Sri Lanka to see our facilities.", image: "ms-Botanicoir-Growers-Visit" },
    { year: "2015", title: "Kicking off Precision Plus Ultra trials", text: "Friends and customers, New Forest Fruits, put our Precision Plus Ultra mix into commercial trials, followed by other leading growers in the UK.", image: "ms-Sandy-and-Kalum-New-Forest-Fruits-Botanicoir" },
    { year: "2015", title: "Wastewater treatment plant installed", text: "Botanicoir became the first coir substrate manufacturer to install an advanced wastewater treatment plant in Sri Lanka, addressing environmental damage from calcium nitrate used to remove harmful elements that impact plant growth.", image: "ms-2015-waste-water" },
    { year: "2016", title: "First and only mechanical dryer in the coco coir industry installed", text: "Implementation of the industry first mechanical dryer of its kind, ensuring more consistency of products and on-time delivery.", image: "ms-Botanicoir-Mechanical-Coir-Dryer" },
    { year: "2017", title: "Launched Precision Plus Ultra", text: "Our specialist soft fruit mix, Precision Plus Ultra launches at Fruit Focus with a special visit by Hon. DEFRA minister George Eustice.", image: "ms-2017-Precision-Plus-Ultra-product-new" },
    { year: "2018", title: "Production expands into India", text: "As demand for our coco coir solutions continues to rise, we expand production facilities in south India.", image: "ms-Botanicoir-India-Coir-Facility" },
    { year: "2019", title: "Launched biodegradable plastic bags", text: "We launched our first bio-degradable plastic for grow bags and Open Top Containers, enabling growers to choose a more eco-friendly option.", image: "ms-Botanicoir-Biodegradable-Grow-Bag" },
    { year: "2020", title: "Botanicoir partners with Legro", text: "Botanicoir and Legro proudly join forces, enabling Botanicoir to make the necessary investments to cater to the increasing global demand for compressed coir products and to accelerate new product development.", image: "ms-Legro-and-Botanicoir" },
    { year: "2023", title: "Botanicoir finances new local hospital wing", text: "Botanicoir completes the construction of a brand new hospital waiting room wing at Dankotuwa Hospital.", image: "ms-Hospital-wing" },
    { year: "2024", title: "Launch of Precision Start", text: "Botanicoir launches ‘Precision Start’ to the market, a premium peat-free coir substrate designed to provide the ideal environment for plant propagation.", image: "ms-Precision-Start-Botanicoir-Grow-Cube-Results" },
    { year: "2025", title: "Celebrating 20 years", text: "Celebrating 20 years of innovation, Botanicoir is proud to mark two decades of commitment to quality, sustainability, and excellence in coir substrate production for growers worldwide.", image: "ms-Botanicoir-20-Years-Logo-2" },
  ],
};

/* Beyond Sustainable: the mission, figures and six focus areas from the Beyond Sustainable page (the homepage's
   "Our Story" and "Planet & People" blocks lead there). Every figure is quoted on that page. */
export const sustainable = {
  title: "Our Beyond Sustainable mission",
  text: "Our Beyond Sustainable initiative goes beyond standard stewardship of our planet, we are dedicated to taking one step further and make industry-wide improvements. We aim to demonstrate how the success of businesses should continually feed back into their roots, enriching their local environment and uplifting the communities supporting them.",
  ctas: [
    { label: "Beyond Sustainable", href: u("/beyond-sustainable/") },
    { label: "Download full report", href: u("/wp-content/uploads/2026/07/sustainability-report-2026.pdf") },
  ],
  image: { src: "/media/still-palms.webp", alt: "Coconut palms in morning mist in Sri Lanka, from Botanicoir’s anniversary film", w: 1920, h: 900 },
  facts: [
    { value: 8, suffix: "", label: "Facilities around Sri Lanka and India" },
    { value: 68, suffix: "%", label: "Less water for Precision Plus Ultra buffering, 2023 to 2025" },
    { value: 24.1, suffix: "t", label: "Carbon stored per hectare by coconut trees, on average" },
    { value: 30, suffix: "%", label: "Recycled plastic in our grow bags" },
    { value: 36, suffix: "", label: "New native species in our pollinator garden" },
  ],
  pillars: ["Community Education and Engagement", "Supporting Growers’ Sustainability Standards", "Responsible Resource Management", "Climate Action and Advocacy", "Community and Employee Wellbeing", "Biodiversity Enrichment"],
};

export type NewsItem = { title: string; href: string; date: string; categories: string[]; excerpt: string; image: string };
export const news = {
  title: "News & Events",
  text: "Read through our product advances, growing innovations and industry developments.",
  cta: { label: "All news", href: u("/news-events/") },
  background: { src: "/media/still-field.webp", alt: "" },
  items: newsItems as NewsItem[],
};

/* Contact: the homepage's Contact Us block and newsletter sign-up, with photographs from the slides and milestones. */
export const cta = {
  title: "Speak to our team",
  text: "Sign up to our newsletter and stay up to date with our latest news",
  primary: { label: "Contact us", href: u("/contact/") },
  newsletter: { label: "Sign up to our newsletter", href: u("/#boxzilla-41") },
  tiles: [
    { src: "/media/ms-Botanicoir-Growers-Visit.webp", alt: "Growers visiting Botanicoir in Sri Lanka" },
    { src: "/media/ms-Kalum-Mark-Agrovista-Botanicoir.webp", alt: "Kalum Balasuriya with Mark Davies of Agrovista" },
    { src: "/media/ms-Precision-Start-Botanicoir-Grow-Cube-Results.webp", alt: "Precision Start grow cube results" },
  ],
};

export const socials = [
  { name: "Facebook", icon: "facebook", href: "https://www.facebook.com/Botanicoir-Ltd-749005145303732/?ref=bookmarks" },
  { name: "X (Twitter)", icon: "x", href: "https://twitter.com/botanicoirltd" },
  { name: "Instagram", icon: "instagram", href: "https://www.instagram.com/botanicoirltd/" },
  { name: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/company/botanicoir/" },
] as const;

/* The certification marks from the live homepage footer, in its order. */
export const certifications = [
  { src: "/media/cert-iso9001.webp", alt: "SGS ISO 9001 UKAS certified", w: 130, h: 75 },
  { src: "/media/cert-iso14001.webp", alt: "SGS ISO 14001 UKAS certified", w: 130, h: 75 },
  { src: "/media/cert-omri.webp", alt: "OMRI Listed", w: 106, h: 75 },
  { src: "/media/cert-leaf.webp", alt: "Supporting LEAF, Linking Environment And Farming", w: 149, h: 104 },
  { src: "/media/cert-soil.webp", alt: "Soil Association approved", w: 85, h: 104 },
  { src: "/media/cert-sedex.webp", alt: "Sedex member", w: 134, h: 75 },
  { src: "/media/cert-ibo.webp", alt: "IBO, proudly supporting", w: 82, h: 75 },
];

export const legal = {
  copyright: "© Copyright Botanicoir, 2005 to 2026 All rights reserved",
  links: [
    { label: "Privacy Policy", href: u("/privacy-policy/") },
    { label: "Terms and Conditions", href: u("/terms-and-conditions/") },
    { label: "Terms of Use", href: u("/terms-of-use/") },
  ],
};
