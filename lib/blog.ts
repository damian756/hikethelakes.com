export interface BlogAuthor {
  name: string;
  bio: string;
  jobTitle: string;
  url: string;
  schemaId: string;
}

export interface BlogCategory {
  slug: string;
  label: string;
  description: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  categorySlug: string;
  date: string;
  readingTime: string;
  /** Path relative to /public, e.g. '/images/courses/hillside.jpg' */
  image?: string;
  content: ContentBlock[];
}

export type ContentBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'callout'; text: string }
  | { type: 'hr' };

// ── Author ────────────────────────────────────────────────────────────────────

export const DAMIAN: BlogAuthor = {
  name: 'Damian Roche',
  jobTitle: 'Founder, Churchtown Media & HikeTheLakes.com',
  bio: "Damian has been walking the Lake District fells for decades. Ex-army, self-taught in SEO, and based in Southport. He's fished the tarns, walked Helvellyn more times than he can count, and built HikeTheLakes because he couldn't find a guide that was honest about conditions and effort. He founded Churchtown Media and runs the Lakes Network.",
  url: 'https://www.churchtownmedia.co.uk/about',
  schemaId: 'https://www.churchtownmedia.co.uk/about#founder',
};

// ── Categories ────────────────────────────────────────────────────────────────

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    slug: 'fell-guides',
    label: 'Fell Guides',
    description: 'Route notes, conditions, and honest accounts of walking the Wainwright fells: what to expect, what to bring, and what the books do not tell you.',
  },
  {
    slug: 'wainwrights',
    label: 'Wainwrights',
    description: 'The 214 fells, the bagging culture, the completionist obsession. Practical guides written by someone who has actually done the routes.',
  },
  {
    slug: 'conditions',
    label: 'Conditions & Weather',
    description: 'Fell conditions, seasonal walking advice, and what changes in the Lake District when the weather turns.',
  },
  {
    slug: 'fishing',
    label: 'Fishing',
    description: 'Tarn and lake fishing in the Lake District: where to go, what to expect, and how still water fishing differs from the coast.',
  },
  {
    slug: 'practical',
    label: 'Practical Guides',
    description: 'Kit, navigation, accommodation, and everything else you need to plan a Lakes trip properly.',
  },
];

export function getCategoryBySlug(slug: string): BlogCategory | undefined {
  return BLOG_CATEGORIES.find((c) => c.slug === slug);
}

// ── Posts ─────────────────────────────────────────────────────────────────────

export const BLOG_POSTS: BlogPost[] = [
  // ── Fell Guides ─────────────────────────────────────────────────────────────
  {
    slug: 'striding-edge-what-no-one-tells-you',
    title: 'Striding Edge: What No One Tells You Before You Go',
    excerpt: 'Striding Edge gets talked about like it is a near-death experience. It is not. But there are a few things the guidebooks gloss over that are worth knowing before you set off from Glenridding.',
    categorySlug: 'fell-guides',
    date: '03 Mar 2026',
    readingTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    content: [
      { type: 'p', text: "Striding Edge is probably the most talked-about ridge walk in England. People build it up for months before they go. Some treat it like a rite of passage. A few come back slightly disappointed that it was not as terrifying as they expected. Both reactions are reasonable." },
      { type: 'p', text: "I have done it a lot. In summer, in autumn, once in conditions that were borderline stupid, and a few times with people who had never done a ridge before. Here is what I wish someone had told me the first time." },
      { type: 'h2', text: 'The Route From Glenridding' },
      { type: 'p', text: "The standard approach starts from Glenridding village, CA11 0PD. There is a pay and display car park at the eastern end of the village. Get there before 9am on a summer weekend or you will be walking an extra half mile from wherever you end up parking." },
      { type: 'p', text: "From the car park, follow the path through the village and up past Lanty's Tarn towards Birkhouse Moor. This section is straightforward but long. Allow 45 minutes before you get anywhere interesting. Most people underestimate this approach and start the day already feeling behind." },
      { type: 'p', text: "The ridge proper starts when the path narrows and the ground falls away on both sides. You will know when you are on it. It goes west for about a mile to the summit of Helvellyn." },
      { type: 'h2', text: 'What the Ridge Actually Feels Like' },
      { type: 'p', text: "There are two sections that get most people's attention. The first is the initial narrowing about a third of the way along where you have to pick your way along the spine. It is rocky and exposed. If you are not comfortable with heights you will not enjoy this. If you are comfortable with heights, it is genuinely good." },
      { type: 'p', text: "The famous bad step, the steep rocky downclimb about two thirds along, is where people slow down. It is about 3 metres. Not technical, but you need to use your hands and face in. Take your time. There is usually a queue at busy periods. Standing on the ridge waiting for a family of four to negotiate it one by one is part of the experience." },
      { type: 'p', text: "The final section before the summit plateau is steep but on good footing. You come out onto the plateau and suddenly it is flat and wide and feels completely different from the edge you have just crossed." },
      { type: 'h2', text: 'The Bit Most Guides Skip Over' },
      { type: 'p', text: "Swirral Edge. Almost every description of this route focuses entirely on Striding Edge and then mentions Swirral Edge as the descent route in one sentence. It deserves more than that." },
      { type: 'p', text: "Swirral Edge is shorter than Striding Edge but in some ways more demanding, because you are descending it with tired legs and often in a queue. The exposure is similar. The descent off it onto the path back down to Red Tarn is steep and loose in places. Take it steadily and do not rush because someone behind you wants to get past." },
      { type: 'callout', text: "Total route: Glenridding, Birkhouse Moor, Striding Edge, Helvellyn summit, Swirral Edge, Red Tarn, back to Glenridding. Distance roughly 10 miles. Allow 5 to 6 hours plus breaks. It is a full day." },
      { type: 'h2', text: 'Conditions Matter More Than You Think' },
      { type: 'p', text: "In good summer conditions, Striding Edge is a hard walk with some scrambling. In wet conditions, the rock becomes slippery and what was fun becomes genuinely hazardous. In winter with ice, it is a different proposition entirely and should not be attempted without crampons and experience." },
      { type: 'p', text: "Wind is the other factor that catches people out. Helvellyn sits at 950 metres and the ridge is fully exposed. A moderate breeze in the valley can be strong enough on the ridge to make you genuinely unsteady. Check the MWIS forecast the night before, not the Met Office lowland forecast." },
      { type: 'h2', text: 'Practical Notes' },
      { type: 'ul', items: [
        'Start postcode: CA11 0PD (Glenridding village car park)',
        'Arrive before 9am weekends in summer or parking is gone',
        'Full day route: 10 miles, 5 to 6 hours',
        'Boots with ankle support, not trail shoes',
        'Poles help on the Swirral Edge descent',
        'Check MWIS the morning of: helvellyn.mountainweather.co.uk',
        'Cafe in Glenridding village for when you get back down',
      ]},
      { type: 'p', text: "One more thing. The photo opportunity on the ridge looking back east is excellent. Take five minutes to stop and look at it properly. The scrambling will make more sense when you can see what you are actually crossing." },
    ],
  },
  {
    slug: 'scafell-pike-wasdale-honest-account',
    title: 'Scafell Pike via Wasdale: The Honest Account',
    excerpt: 'Three routes up England\'s highest mountain. Wasdale is the shortest. It is also the hardest. Here is what the distance figures do not tell you.',
    categorySlug: 'fell-guides',
    date: '24 Feb 2026',
    readingTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80',
    content: [
      { type: 'p', text: "Scafell Pike has three main ascent routes: Wasdale, Seathwaite in Borrowdale, and Langdale via Rossett Gill. Most people default to Wasdale because it is the shortest. At around 5 miles return with 900 metres of ascent, it looks manageable on paper." },
      { type: 'p', text: "It is manageable. But the Wasdale route is steep and relentlessly rocky. The upper section from Lingmell Col to the summit is more boulder field than path. People who have only walked on lowland paths are sometimes shocked by how rough it is. That is not a reason to avoid it. It is just useful to know." },
      { type: 'h2', text: 'Why Wasdale Over the Alternatives' },
      { type: 'p', text: "The Seathwaite route from Borrowdale is longer but better graded, and the valley approach is beautiful. If you are doing Scafell Pike for the first time, it is the more forgiving choice. The Wasdale route rewards people who want to get to the summit efficiently without a lot of valley walking." },
      { type: 'p', text: "Wasdale Head is also one of the most dramatic settings in the Lakes. The campsite at the head of the valley, the Wasdale Head Inn, the church that is genuinely the size of a large shed. If you are going to base yourself somewhere for a few days, Wasdale is worth considering for that alone." },
      { type: 'h2', text: 'The Route' },
      { type: 'p', text: "Park at Wasdale Head NT car park, CA20 1EX. It is a small car park and fills early. If it is full, there is limited roadside parking further down the valley. The path starts from the back of the farm buildings and is well signed." },
      { type: 'p', text: "The first section climbs steeply up Brown Tongue, a broad grassy ridge between Lingmell Gill and Mosdale Beck. It is relentless but on a clear path. Allow an hour to reach Lingmell Col, the saddle between Lingmell and Scafell Pike." },
      { type: 'p', text: "From the col, the path heads east and the ground changes completely. From here to the summit you are picking a route through a boulder field. There is a path of sorts but it weaves between the rocks. This section is slow going. Do not be alarmed by how little progress you seem to be making." },
      { type: 'h2', text: 'The Summit' },
      { type: 'p', text: "The summit plateau is large and in poor visibility genuinely confusing. There is a trig point and a large cairn. On a clear day the views are exceptional: Scafell directly south, the Scafell massif, the sea to the west, and on very clear days, Snowdonia and the Isle of Man." },
      { type: 'p', text: "In cloud, the summit is a grey boulder field with a cairn and a lot of other people also unsure which way they came from. Navigation here matters. Know your compass bearing back to Lingmell Col before you leave it." },
      { type: 'callout', text: "Route summary: Wasdale Head (CA20 1EX) to summit and back. 5 miles return, 900m ascent. Allow 4 to 5 hours. Grade: strenuous. Boots essential. Poles help on the descent." },
      { type: 'h2', text: 'What to Watch For' },
      { type: 'ul', items: [
        'The car park fills early, especially summer weekends. Aim for 7am or take the valley bus',
        'Brown Tongue is steep from the start, there is no warm-up',
        'The boulder field above Lingmell Col slows everyone down, factor that into your time',
        'In poor visibility, navigation on the summit plateau is genuinely hard',
        'Wind at 978m is colder and stronger than anything in the valley',
        'The Wasdale Head Inn does food. Book ahead if you want a table after',
      ]},
      { type: 'h2', text: 'The Return' },
      { type: 'p', text: "Reverse the route. The descent off the boulder field is slower than the ascent for most people, and by this point legs are tired. Take your time through the rocks. The path down Brown Tongue feels long but is straightforward." },
      { type: 'p', text: "The car park will be busier than when you left it. The Wasdale Head Inn will look extremely appealing. If you have not booked a table, the bar usually has space for drinks. It is a proper old Lakeland pub with no pretensions, which is exactly what you want at the end of a day like that." },
    ],
  },
  {
    slug: 'sharp-edge-blencathra-underrated-ridge',
    title: 'Sharp Edge on Blencathra: The Most Underrated Ridge in the Lakes',
    excerpt: 'Striding Edge gets all the attention. Sharp Edge on Blencathra is narrower, more exposed, and better. Most people who have done both agree.',
    categorySlug: 'fell-guides',
    date: '14 Feb 2026',
    readingTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80',
    content: [
      { type: 'p', text: "Blencathra is one of the best fells in the Northern Lakes and it does not get close to the attention it deserves. Ask most people who have done both Sharp Edge and Striding Edge which is better and the answer is usually Sharp Edge, quietly, as if admitting it might diminish Helvellyn somehow." },
      { type: 'p', text: "It is narrower. The exposure is more continuous. The scrambling is more technical in places. And the approach from Scales makes for a better day than the Glenridding grind. If you have done Striding Edge and want something more challenging on a similar day out, this is the obvious next step." },
      { type: 'h2', text: 'The Approach from Scales' },
      { type: 'p', text: "Park at the small roadside car park at Scales, CA12 4TN, on the A66 east of Threlkeld. It is free and usually has space. From here, follow the path up towards Scales Tarn, the dark corrie lake that sits below Sharp Edge. The approach takes about an hour and is straightforward. The tarn comes into view before the ridge does." },
      { type: 'p', text: "Standing at the tarn and looking up at Sharp Edge for the first time, it looks serious. The ridge rises at an angle and the rock on the crest is visibly narrow. That is an accurate impression." },
      { type: 'h2', text: 'The Ridge Itself' },
      { type: 'p', text: "Sharp Edge is shorter than Striding Edge, around 400 metres, but the scrambling is more sustained. The crest is a sharp fin of rock with steep drops on both sides. Some people straddle it. Most people walk along the edge or just below it on the southern side." },
      { type: 'p', text: "The crux is near the end of the ridge where a step across a gap requires commitment. It is not technical in a climbing sense but it does require you to move confidently on exposed ground. People who are uncomfortable with heights will not enjoy this. People who are comfortable will find it excellent." },
      { type: 'p', text: "In the wet, the rock on Sharp Edge becomes dangerously slippery. More so than Striding Edge because the holds are smaller. If there is any chance of rain, either go early before it arrives or choose a different route up Blencathra." },
      { type: 'h2', text: 'The Summit and Descent' },
      { type: 'p', text: "After Sharp Edge, a steep section of loose ground leads up to the summit plateau. The top of Blencathra sits at 868 metres and the views on a clear day are extensive: the Northern Fells, the Eden Valley east, the Pennines on the horizon." },
      { type: 'p', text: "Descend via Hall's Fell Ridge for the best circular route. Hall's Fell is a direct ridge descent back towards Threlkeld, steep and rocky near the top but on a clear path. It brings you down to the valley and a short road walk back to Scales." },
      { type: 'callout', text: "Route: Scales (CA12 4TN), Scales Tarn, Sharp Edge, Blencathra summit, Hall's Fell Ridge, Threlkeld, road back to Scales. About 7 miles, 720m ascent. Allow 4 to 5 hours." },
      { type: 'h2', text: 'Practical' },
      { type: 'ul', items: [
        'Start: Scales roadside car park, CA12 4TN (free)',
        'Sharp Edge is not suitable in wet conditions',
        'Do not attempt in winter without crampon experience',
        'Descend via Hall\'s Fell Ridge to complete a circular route',
        'The Horse and Farrier in Threlkeld is a good pub for after',
        'Less busy than Helvellyn routes, especially midweek',
      ]},
    ],
  },

  // ── Wainwrights ──────────────────────────────────────────────────────────────
  {
    slug: 'how-to-start-the-wainwrights',
    title: 'How to Start the Wainwrights: A Practical Guide',
    excerpt: 'There are 214 of them. The question is not whether you can do them all, it is where to start. Not with Scafell Pike.',
    categorySlug: 'wainwrights',
    date: '19 Feb 2026',
    readingTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=800&q=80',
    content: [
      { type: 'p', text: "Alfred Wainwright spent 13 years walking and drawing all 214 fells in his Pictorial Guides. People now come from Japan, Germany, the US, and Australia specifically to complete them. The Wainwrights are one of the most popular long-distance challenges in the world, and one of the least talked about outside the people who do them." },
      { type: 'p', text: "If you are thinking about starting, here is the honest version of how to go about it." },
      { type: 'h2', text: 'Do Not Start With Scafell Pike' },
      { type: 'p', text: "Everyone wants to start with the highest. It is the obvious choice and it is the wrong one. Scafell Pike is 978 metres, 5 miles return from Wasdale with 900 metres of ascent on rough ground. If you are not already comfortable on the fells, starting there sets you up for a hard day and possibly puts you off." },
      { type: 'p', text: "Start with something you will enjoy. Catbells above Derwentwater is the classic beginner fell for a reason. 451 metres, easy path, extraordinary views. It takes two hours and leaves you wanting more. That is the right way to start a 214-fell project." },
      { type: 'h2', text: 'The Seven Books' },
      { type: 'p', text: "Wainwright divided the fells into seven books by area. Book One covers the Eastern Fells, including Helvellyn. Book Two the Far Eastern Fells. Book Three the Central Fells. Book Four the Southern Fells, including Scafell Pike. Book Five the Northern Fells. Book Six the North Western Fells. Book Seven the Western Fells." },
      { type: 'p', text: "Most people do not work through them in order. They start in whatever area they know best and fill in gaps over years. Some people adopt a strategy of doing the fells by area to minimise travel. Others just tick whatever they fancy each trip. Both approaches work." },
      { type: 'h2', text: 'Keeping Track' },
      { type: 'p', text: "The original Wainwright books each have a tick list at the back. A lot of people still use these. There are also several apps (Wainwright Walks, Walking Highlands) that let you log completions with GPS evidence. The Wainwright Society maintains an official register and issues completion certificates if that matters to you." },
      { type: 'p', text: "How long does it take? If you do a Lakes trip twice a year and bag 10 fells each time, you are looking at over 10 years. People who live closer and go more often can complete in two or three years. There is no right pace." },
      { type: 'h2', text: 'The Fells That Get Ignored' },
      { type: 'p', text: "About 30 of the 214 fells are what completionists call the awkward ones: low summits in obscure corners, bogs with no view, hills that require a long drive to reach. You will do the good ones naturally. The awkward ones require deliberate planning. Build them into your later trips rather than saving them all for the end." },
      { type: 'callout', text: "Good beginner fells: Catbells (Book 6, CA12 5UE), Loughrigg Fell (Book 3, LA22 9EX), Hallin Fell (Book 2, CA10 2ND), High Rigg (CA12 4RG). All under 500m, all with excellent views." },
      { type: 'h2', text: 'What You Actually Need' },
      { type: 'ul', items: [
        'The Wainwright books (or the app) to know what you are counting',
        'A 1:25,000 OS map for each area, or the OS Maps app',
        'Decent boots, waterproof jacket, navigation skills',
        'A log of completed fells (paper or digital)',
        'The willingness to go on a bad-weather day occasionally',
        'Realistic expectations about the awkward fells at the end',
      ]},
      { type: 'p', text: "The first completion feels significant. People cry, apparently, at the top of the last fell. I have not done mine yet, so I cannot report back on that. But I understand it. These things accumulate meaning over years." },
    ],
  },
  {
    slug: 'far-eastern-fells-why-serious-baggers-go-there',
    title: 'The Far Eastern Fells: Why Serious Baggers End Up Here',
    excerpt: 'Book Two is the quietest corner of the Wainwrights. High Street, Ill Bell, and a Roman road running across the top of England. If you have not been, you are missing something.',
    categorySlug: 'wainwrights',
    date: '05 Feb 2026',
    readingTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80',
    content: [
      { type: 'p', text: "The Far Eastern Fells get fewer visitors than almost any other group in the Wainwrights. This is partly because they are less dramatic than the central and southern fells, and partly because the main access points, Kentmere and Troutbeck, are not as well known as Keswick or Ambleside." },
      { type: 'p', text: "This is their appeal. On a bank holiday weekend when Helvellyn is a parade and Scafell Pike car park is a queue, the High Street ridge can be almost empty. I have walked up Ill Bell on a Saturday in July and not seen another person for three hours." },
      { type: 'h2', text: 'High Street and the Roman Road' },
      { type: 'p', text: "High Street at 828 metres is the highest point in the far eastern group. The name refers to the Roman road that crosses it, one of the highest roads the Romans built in Britain. The broad summit plateau does not look like much but the context is remarkable: you are standing on a road that Roman soldiers marched along nearly two thousand years ago." },
      { type: 'p', text: "The approach from Troutbeck via Thornthwaite Crag and Froswick is the most satisfying route. It takes in several fells in a single day. The Troutbeck car park is at Limefitt Park, LA23 1PA. From there, the path climbs steadily up Troutbeck Tongue before gaining the ridge." },
      { type: 'h2', text: 'Ill Bell, Froswick, Thornthwaite Crag' },
      { type: 'p', text: "The three summits of Ill Bell (757m), Froswick (720m), and Thornthwaite Crag (784m) form a horseshoe around the head of Troutbeck valley. They are three separate Wainwrights, all achievable in a single long day from Troutbeck. Each has its own character. Ill Bell has the best views. Thornthwaite Crag has the impressive beacon, a tall stone pillar on the summit." },
      { type: 'p', text: "The ridge between them is airy and narrow in places without being technical. In good visibility the views east over the Pennines and west towards the Helvellyn range are extensive. In mist, the path is easy to follow." },
      { type: 'h2', text: 'Kentmere Horseshoe' },
      { type: 'p', text: "The Kentmere Horseshoe is arguably the best day walk in the far eastern fells. It takes in Ill Bell, Froswick, Thornthwaite Crag, High Street, Mardale Ill Bell, Harter Fell, and Kentmere Pike in a circuit of about 12 miles. It is a full day, challenging, and requires good navigation in poor visibility." },
      { type: 'p', text: "Start from Kentmere village car park, LA8 9JP. The village is small and quiet. There is no pub, which is a planning consideration. Bring your own food." },
      { type: 'callout', text: "Far Eastern Fells in one day: The Kentmere Horseshoe from Kentmere village (LA8 9JP). 12 miles, 950m ascent. Allow 6 to 7 hours. No pub in Kentmere, bring lunch." },
      { type: 'h2', text: 'Why They Matter for Baggers' },
      { type: 'p', text: "Book Two contains 30 fells. A dedicated weekend can cover 10 to 12 of them if you plan the routes carefully. The combination of relative quiet, good ridge walking, and multiple summit access from a single start point makes this area highly efficient for completionists who are filling in gaps." },
      { type: 'ul', items: [
        'Best base: Ambleside (central) or Troutbeck (closer to the fells)',
        'Key access points: Troutbeck (LA23 1PA), Kentmere (LA8 9JP), Mardale (CA10 2RU)',
        'Quietest area in the Wainwrights, especially midweek',
        'The Kentmere Horseshoe is the best single-day route in the group',
        'High Street rewards anyone interested in Roman history',
      ]},
    ],
  },

  // ── Conditions & Weather ─────────────────────────────────────────────────────
  {
    slug: 'reading-the-fell-forecast-mwis-guide',
    title: 'Reading the Fell Forecast: MWIS, Met Office, and What to Actually Trust',
    excerpt: 'A Met Office forecast of light cloud and 14 degrees means nothing at 900 metres. Here is how to read the forecasts that actually matter.',
    categorySlug: 'conditions',
    date: '28 Jan 2026',
    readingTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
    content: [
      { type: 'p', text: "The number of people who check the Met Office forecast for Keswick before heading up Helvellyn, see 'partly cloudy, 12 degrees', and set off without a waterproof is not small. Valley weather and fell weather are not the same thing. At 900 metres the temperature is roughly 5 degrees colder, the wind can be three times stronger, and cloud that sits above the valley floor puts you in zero visibility." },
      { type: 'p', text: "There are forecasts written specifically for fell conditions. Use those." },
      { type: 'h2', text: 'MWIS: Mountain Weather Information Service' },
      { type: 'p', text: "MWIS (mwis.org.uk) produces daily forecasts for mountain areas across the UK including the Lake District. The forecast is written in plain English and addresses the specific conditions you will encounter at altitude: cloud base, wind speed and direction at summit height, freezing level, visibility." },
      { type: 'p', text: "Read the cloud base figure carefully. If the cloud base is at 600 metres and your target fell is 800 metres, you will be walking in cloud for the upper third of the route. That is not necessarily a reason not to go, but it changes what the day will be." },
      { type: 'p', text: "The wind figure at summit height is the one that catches people out most often. A 30 mph wind at valley level is an annoying breeze. A 30 mph wind at 900 metres with gusts to 50 mph is serious. MWIS publishes both a summit wind speed and a note on whether it is safe to be on exposed ridges. Read it." },
      { type: 'h2', text: 'Met Office Mountain Forecasts' },
      { type: 'p', text: "The Met Office produces mountain-specific forecasts for the Lake District that are more detailed than the general area forecast. Go to metoffice.gov.uk and find the Mountain Forecasts section. These are updated twice daily and include summit temperature, wind, and weather. Slightly more conservative in their wording than MWIS." },
      { type: 'p', text: "The general Met Office area forecast for Cumbria is fine for planning a trip. It is not sufficient for deciding whether to attempt a fell." },
      { type: 'h2', text: 'The Freezing Level' },
      { type: 'p', text: "The freezing level appears in mountain forecasts and is important in autumn, winter, and spring. If the freezing level is at 500 metres and you are going to 900 metres, the upper 400 metres of your route will be at or below zero. Wet rock at below zero is ice. Paths become hard to follow. The consequences of a slip are different." },
      { type: 'p', text: "This is where walking equipment transitions to mountaineering equipment. If the freezing level is at or below your target summit for a significant part of the day, you need crampons and an ice axe and the skills to use them. If you do not have those, pick a lower-level route or go on a different day." },
      { type: 'callout', text: "Quick rule: before any fell walk above 600m, check MWIS (mwis.org.uk) for the Lake District. Look at the cloud base, wind at summit, and freezing level. Make a decision based on those, not the lowland forecast." },
      { type: 'h2', text: 'What Actually Causes Problems' },
      { type: 'ul', items: [
        'Zero visibility in cloud when you do not have a compass or cannot use one',
        'Wind at summit height that has been underestimated from valley conditions',
        'Wet rock on steep descents, particularly on limestone and slate',
        'Temperature drop after dark on late autumn days when days are short',
        'Rain that seems light but soaks you over three hours because you did not bring waterproof trousers',
      ]},
      { type: 'h2', text: 'When to Abort' },
      { type: 'p', text: "The decision to turn back before reaching a summit is one that experienced walkers make frequently without drama. If visibility drops and you are not confident navigating on a compass, go down. If the wind has strengthened beyond what you expected and the ridge feels unstable, go down. The fell will be there next time." },
      { type: 'p', text: "No summit is worth a rescue. The Mountain Rescue teams in the Lakes are excellent, but they are volunteers, and a call-out because someone pressed on in conditions they were not equipped for is avoidable." },
    ],
  },
  {
    slug: 'winter-fell-walking-lake-district',
    title: 'Winter Fell Walking in the Lake District: What Changes',
    excerpt: 'Shorter days, colder temperatures, ice on the paths, and almost no one else up there. Winter in the Lakes is worth it if you prepare properly.',
    categorySlug: 'conditions',
    date: '08 Jan 2026',
    readingTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    content: [
      { type: 'p', text: "I do not avoid the fells in winter. I go more deliberately. The preparation is more involved, the daylight is short, and some routes require skills and equipment that summer walking does not. But a clear December day on a fell above the cloud inversion, the valleys below filled with grey and the summits in sharp winter light, is something you cannot replicate in July." },
      { type: 'p', text: "Here is what actually changes, and what it means for how you plan." },
      { type: 'h2', text: 'Daylight' },
      { type: 'p', text: "In December, sunset in the Lakes is around 3:45pm. A winter day that starts at 8am gives you less than eight hours of daylight. For longer routes that take five or six hours in summer, this matters. You either start earlier, accept you will be navigating in the dark on the descent, or choose shorter routes." },
      { type: 'p', text: "The easy answer is to carry a head torch regardless. The more useful answer is to plan routes that you can complete comfortably in six hours, which in winter often means doing one or two summits rather than a full horseshoe." },
      { type: 'h2', text: 'Ice and Snow' },
      { type: 'p', text: "Ice on fell paths is the main hazard in winter. It forms where water drains over paths and freezes overnight. On steep sections it is genuinely dangerous. Microspikes (lightweight crampon attachments that fit over walking boots) are the practical solution for most winter fell walking. They are cheap, light, and transform icy paths from hazardous to manageable." },
      { type: 'p', text: "On steeper fell terrain with significant snow accumulation, full crampons and an ice axe become necessary. This is mountain terrain and requires a different skill set. If you do not have crampon technique and ice axe arrest, stay below the snow line or stick to lower-level routes." },
      { type: 'h2', text: 'Which Fells Work Well in Winter' },
      { type: 'p', text: "Lower fells with good paths are ideal for winter days: Catbells, Walla Crag above Derwentwater, Loughrigg above Ambleside, Helm Crag in Grasmere. These give you proper views, shorter days without time pressure, and paths that are manageable with microspikes even in icy conditions." },
      { type: 'p', text: "The big fells remain excellent in winter but require more planning and the right equipment. Helvellyn via Striding Edge in full winter condition is a mountaineering route. Blencathra's Sharp Edge with ice is not appropriate without technical skills." },
      { type: 'h2', text: 'What Is Better in Winter' },
      { type: 'p', text: "Almost no one else. A fell that is a queue in August is often quiet enough in January that you can stop on the summit for twenty minutes without another party arriving. The light is different, lower and sharper. Inversions, where cloud fills the valleys below and summits rise above it into clear air, are a winter phenomenon. Snow changes the landscape entirely." },
      { type: 'p', text: "The pubs are also better in winter. A cold descent followed by a proper pub meal near a fire is not available in the same way in July." },
      { type: 'callout', text: "Winter kit essentials beyond the summer basics: microspikes (Kahtoola or YakTrax), full waterproof trousers, extra insulating layer, warm gloves (not just liner gloves), head torch with fresh batteries." },
      { type: 'h2', text: 'Practical Summary' },
      { type: 'ul', items: [
        'Check MWIS for freezing level and summit wind before any winter outing',
        'Start early to maximise daylight (8am latest for most routes)',
        'Carry microspikes on all winter fell walks',
        'Choose routes appropriate to conditions, not what you planned in summer',
        'Tell someone your route and expected return time',
        'The low fells in winter are underrated. Catbells in January is genuinely good.',
      ]},
    ],
  },

  // ── Fishing ──────────────────────────────────────────────────────────────────
  {
    slug: 'tarn-fishing-lake-district',
    title: 'Tarn Fishing in the Lake District: Still Water Is a Different Game',
    excerpt: 'I fish the coast a lot. The tarns are something else. Different pace, different technique, different kind of morning. Here is what I have learned.',
    categorySlug: 'fishing',
    date: '22 Jan 2026',
    readingTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=800&q=80',
    content: [
      { type: 'p', text: "I came to tarn fishing late. Most of my fishing before the Lakes was sea fishing from the Sefton coast, which is its own thing entirely. Still water fishing requires patience of a different kind. You are reading the water, the light, the temperature. There is less action and more observation." },
      { type: 'p', text: "The Lake District tarns are remarkable places. Most are above 300 metres, some above 600. Getting to them is part of the day. What follows is what I have figured out over a few seasons of getting it wrong before getting it right." },
      { type: 'h2', text: 'Licences and Permissions' },
      { type: 'p', text: "You need a rod licence from the Environment Agency (gov.uk/fishing-licences) for all freshwater fishing in England. A 1-day licence is available if you are only going a few times a year. An annual licence makes more sense if you are going regularly." },
      { type: 'p', text: "Beyond the EA licence, many tarns and lakes require a separate fishing permit from the landowner or a fishing club that holds the rights. The National Trust controls much of the land in the Lakes and their fishing permissions vary by water. Check before you go. Turning up with an EA licence and fishing a stretch that requires a club permit is not the right approach." },
      { type: 'h2', text: 'The Best Tarns' },
      { type: 'p', text: "Blea Tarn in Little Langdale (LA22 9PT for the car park) is the one I go back to most. It sits at 180 metres in a quiet valley between Langdale and Wrynose. Perch and pike. Morning fishing before the walkers arrive is the best time. The reflection of Blake Fell in calm water on an early autumn morning is unreasonably good." },
      { type: 'p', text: "Levers Water above Coniston is harder to reach, an hour's walk from the village, but worth it. Trout in clear water at 320 metres. The walk in justifies the day regardless of whether you catch anything." },
      { type: 'p', text: "Angle Tarn above Patterdale (accessible from Boredale Hause) is another good one. The tarn sits in a natural hollow with no road access. Pike and perch. The approach is two miles and 300 metres of ascent. Take the fishing tackle in a daypack." },
      { type: 'h2', text: 'What Works and When' },
      { type: 'p', text: "Early morning is the most productive time, particularly in summer. Fish are active in low light near the surface. By mid-morning in warm weather, they go deeper and fishing becomes harder. Autumn and spring are better overall than summer, partly because of water temperature and partly because of reduced visitor pressure." },
      { type: 'p', text: "For perch, small spinners and worms work well. For pike, larger lures and deadbait. Trout in the tarns are typically fished on the fly, though spinning can work. The visibility of water in the high tarns is often remarkable. You can sometimes see fish and cast to them directly, which changes the game significantly." },
      { type: 'callout', text: "Before you go: EA rod licence (gov.uk/fishing-licences), check permissions for your specific tarn, arrive early, bring a daypack rather than a tackle box if you are walking in." },
      { type: 'h2', text: 'The Practical Side' },
      { type: 'ul', items: [
        'EA rod licence required before you can fish any freshwater in England',
        'Most tarns require an additional permit or club membership',
        'Blea Tarn (LA22 9PT), Levers Water (walk from Coniston), Angle Tarn (from Patterdale)',
        'Early morning produces the most activity, especially in summer',
        'Autumn and spring outperform summer for most species',
        'Pack light. If you are walking in, the tackle goes in the daypack',
        'A flask of something hot makes a cold morning on a tarn considerably better',
      ]},
      { type: 'p', text: "The thing that I did not expect about tarn fishing is how much of it is just being in a quiet place at the right time of day. The fishing is part of it. It is not all of it." },
    ],
  },

  // ── Practical ────────────────────────────────────────────────────────────────
  {
    slug: 'fell-kit-list-what-actually-works',
    title: 'The Fell Kit List That Actually Works',
    excerpt: 'The outdoor industry would like you to spend a lot of money. Some of it is worth spending. Here is the honest version of what you actually need.',
    categorySlug: 'practical',
    date: '15 Jan 2026',
    readingTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80',
    content: [
      { type: 'p', text: "The gear conversation in walking circles goes in circles. Expensive is not always better. Cheap is often a false economy on the specific items where quality matters. This is the list I actually use and why." },
      { type: 'h2', text: 'Boots: Where to Spend' },
      { type: 'p', text: "Good boots are the single most important piece of equipment. They need to be waterproof, have a stiff enough sole that your foot does not flex over uneven ground, and provide ankle support on descents. There is no way around this: cheap boots that are not waterproof will make you miserable. Spend money here." },
      { type: 'p', text: "The trail shoe question comes up constantly. Trail shoes are fine for well-graded paths in dry conditions. For the Lake District fells, which are often wet, rocky, and steep, boots are better. Specifically: anything above 600 metres in uncertain conditions, wear boots." },
      { type: 'p', text: "Brands that hold up: Scarpa, La Sportiva, Salewa, Meindl. You do not need to spend more than £150. The £300 boots are not twice as good as the £150 ones." },
      { type: 'h2', text: 'Waterproofs: The Shell Matters' },
      { type: 'p', text: "A waterproof jacket is not optional in the Lakes. Rain can come in at any time of year with little warning. The jacket needs to be genuinely waterproof, not shower resistant. The difference is significant after 40 minutes in heavy rain." },
      { type: 'p', text: "Gore-Tex or equivalent (eVent, Pertex Shield) is the benchmark. Mid-price options from Berghaus, Rab, and Montane are reliable. The own-brand options from big outdoor retailers are considerably cheaper and often adequate for non-technical walking." },
      { type: 'p', text: "Waterproof trousers are underrated. Most people carry a jacket and skip the trousers. After an hour of heavy rain on a fell path with only a jacket, the wet trouser situation becomes the main problem." },
      { type: 'h2', text: 'Layers' },
      { type: 'p', text: "Three layers: a base layer that wicks moisture away from your skin, a mid-layer for insulation, a shell for wind and rain. The specific items matter less than the system. Cotton base layers are wrong: they hold moisture and get cold. Merino wool or synthetic base layers are right." },
      { type: 'p', text: "The mid-layer question: fleece or down? Fleece works when wet, which matters in the Lakes. Down is more packable and warmer but loses its insulation when wet. For fell walking in variable conditions, a good fleece mid-layer is the more practical choice." },
      { type: 'h2', text: 'Navigation' },
      { type: 'p', text: "A 1:25,000 OS map of the relevant area and the ability to use a compass. This is not optional. Phone GPS fails when batteries run out, which happens faster in cold conditions. It fails when screens crack. It fails when you drop it." },
      { type: 'p', text: "The OS Maps app is useful as a backup and for planning. It is not a replacement for a paper map and compass. If you do not know how to take a bearing and follow it, learn before you go on a higher fell. There are day courses available. The BMC (British Mountaineering Council) has a list of navigation instructors." },
      { type: 'callout', text: "The items that make the biggest practical difference: a decent daypack with a hip belt, a head torch carried regardless of expected return time, and proper waterproof trousers. Most people underinvest in all three." },
      { type: 'h2', text: 'What You Actually Need' },
      { type: 'ul', items: [
        'Waterproof boots with ankle support (Scarpa, La Sportiva, Meindl)',
        'Waterproof jacket: genuinely waterproof, not shower resistant',
        'Waterproof trousers: carry them always',
        'Merino or synthetic base layer (not cotton)',
        'Fleece mid-layer',
        '1:25,000 OS map of the relevant area and a compass',
        'Daypack with a hip belt for loads over about 7kg',
        'Head torch with fresh batteries',
        'Flask of something hot on colder days',
        'First aid kit (basic)',
      ]},
      { type: 'p', text: "What you do not need: a separate GPS unit if you have map and compass skills, an emergency bivvy unless you are going into very remote terrain, trekking poles on every walk (they help on descents but are not essential), and anything that weighs over 50g and has been used less than five times." },
    ],
  },
  {
    slug: 'where-to-stay-fell-walking-keswick-ambleside-wasdale',
    title: 'Where to Stay for Fell Walking: Keswick, Ambleside, or Wasdale',
    excerpt: 'Your base determines which fells are realistic for a day walk. Three honest assessments of the main options.',
    categorySlug: 'practical',
    date: '02 Jan 2026',
    readingTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?auto=format&fit=crop&w=800&q=80',
    content: [
      { type: 'p', text: "Where you stay in the Lake District defines your trip more than most people realise when booking. Keswick and Ambleside are 25 miles apart and access entirely different sets of fells. Wasdale is in a different category entirely. Here is the honest comparison." },
      { type: 'h2', text: 'Keswick: Best for the Northern and North Western Fells' },
      { type: 'p', text: "Keswick is the main town in the northern Lakes. It has the best range of accommodation, the best outdoor gear shops, and a good selection of restaurants and pubs. For fell walkers, it gives straightforward access to Skiddaw, Blencathra, the Newlands Valley fells, and Helvellyn via the A591 south." },
      { type: 'p', text: "The town itself is worth a day. Derwentwater is on its doorstep. The Castlerigg stone circle is a 15-minute walk from the main car park and worth visiting. The market on Saturday morning is good." },
      { type: 'p', text: "For serious fell walkers, the proximity to Skiddaw (start postcode CA12 5UP) and Blencathra (start at Scales, CA12 4TN) without a long drive is the main practical advantage. A two-night stay covering those two fells plus a day on the Newlands horseshoe is a very good short trip." },
      { type: 'h2', text: 'Ambleside: The Central Base' },
      { type: 'p', text: "Ambleside sits roughly in the centre of the Lake District and is the most practical single base if you want to cover a range of fell groups. Helvellyn is 40 minutes by car. The Coniston fells are 20 minutes. The Langdale Pikes are 15 minutes. The central fells, including the Langdale and Borrowdale areas, are all within easy reach." },
      { type: 'p', text: "Ambleside itself is smaller than Keswick and in my view better for it. There are good restaurants, a reliable outdoor gear selection, and the town has its own compact character. The Stock Ghyll waterfall above the town is worth a short detour." },
      { type: 'p', text: "For anyone doing their first Lakes trip and not sure which fells they want to prioritise, Ambleside is the default right answer. It does not optimise for any specific group but gives you access to all of them." },
      { type: 'h2', text: 'Wasdale: If You Are Doing the Southern Fells' },
      { type: 'p', text: "Wasdale is not a town. It is a valley with a campsite, a handful of holiday cottages, and the Wasdale Head Inn. If you are going specifically for Scafell Pike, Great Gable, or the Scafell massif, it puts you at the start of the routes without a 40-minute drive from a larger base." },
      { type: 'p', text: "The trade-off is that there is very little there beyond the fells and the pub. No shops, one pub, limited accommodation options. For two or three days of serious fell walking targeting the highest peaks, it is the right choice. For a mixed trip that includes a town day, it is the wrong one." },
      { type: 'callout', text: "Planning rule: decide which fells you want to do first, then choose the base. Do not do it the other way around. A base in Keswick cannot adequately serve the Scafell area without a long daily drive." },
      { type: 'h2', text: 'Quick Reference' },
      { type: 'ul', items: [
        'Keswick: best for Skiddaw, Blencathra, Northern Fells, Helvellyn from the north',
        'Ambleside: most versatile base, central, access to Langdale, Coniston, Helvellyn from south',
        'Wasdale: specific base for Scafell Pike, Great Gable, Scafell massif. Limited facilities.',
        'Grasmere: quieter alternative to Ambleside, similar access, fewer shops',
        'Glenridding: good if Helvellyn and Striding Edge is your main target',
      ]},
      { type: 'p', text: "Accommodation in the Lakes fills quickly at weekends from Easter to October. Book well ahead if you are going on a summer weekend. Last-minute availability exists midweek and in winter, when the fells are often at their best anyway." },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getPostsByCategory(categorySlug: string): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.categorySlug === categorySlug);
}

function toIso(dateStr: string): string {
  const MONTHS: Record<string, string> = {
    Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
    Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12',
  };
  const [day, mon, year] = dateStr.split(' ');
  return `${year}-${MONTHS[mon] ?? '01'}-${day.padStart(2, '0')}`;
}

export function getIsoDate(post: BlogPost): string {
  return toIso(post.date);
}
