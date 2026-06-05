import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface SongData {
  songTitle: string;
  artistName?: string;
  genre: string;
  mood: string;
  lyrics?: string;
}

interface MarketingResults {
  tiktokIdeas: string[];
  captions: string[];
  hooks: string[];
  promotionPlan: string;
}

const genreTemplates: Record<string, string[]> = {
  afrobeats: [
    "Dance challenge with the signature Afrobeats step",
    "Transition video: casual outfit to stage-ready look",
    "Behind-the-scenes of recording the groove",
    "React to fans attempting the dance challenge",
    "Amapiano vs Afrobeats mashup teaser",
    "Studio session with live percussion",
    "Call-and-response lyric highlight",
    "Day in the life in Lagos / Accra / Joburg",
    "Freestyle over the instrumental",
    "Crowd reaction at a live show",
    "Outfit check before the music video shoot",
    "Cooking your favorite dish while the song plays",
    "Car ride with the song blasting",
    "Green screen with iconic African landmarks",
    "Duet with a dancer doing the viral step",
    "POV: When the beat drops at the club",
    "Before-and-after hearing the song",
    "Unboxing physical CD or vinyl",
    "Making the album art on your phone",
    "Shoutout to producers and collaborators",
  ],
  amapiano: [
    "Amapiano dance challenge tutorial",
    "Transition from calm to full groove mode",
    "DJ set snippet with the track",
    "Vibes at the crib with friends dancing",
    "Beat breakdown showing the log drum",
    "Studio session with the piano keys",
    "Before-and-after the bass kicks in",
    "POV: When the log drum hits at the function",
    "Car ride with windows down and track up",
    "Suno step tutorial with the song",
    "Green screen at a South African street party",
    "Making the beat from scratch",
    "Dance crew performance to the chorus",
    "Crowd reaction at a gig",
    "Producer reacting to the final master",
    "Vocal take behind the mic",
    "Slow-mo dance moment at sunset",
    "Friends attempting the challenge and failing",
    "Playlist placement celebration",
    "Studio to stage montage",
  ],
  trap: [
    "Hard beat drop reaction video",
    "Studio flex with the 808s",
    "Before-and-after putting the chain on",
    "Car test with the subs",
    "Lyric breakdown with text overlay",
    "POV: When the 808 hits",
    "Freestyle over your own instrumental",
    "Night drive with the track",
    "Studio session montage",
    "Reaction to first 100K streams",
    "Green screen in the trap house aesthetic",
    "Outfit check to the beat",
    "Making the beat on FL Studio",
    "Call-and-response with fans",
    "Live performance clip",
    "Beat switch-up moment",
    "Behind-the-scenes of the music video",
    "Fan lyric video submissions",
    "Producer tag drop moment",
    "Studio late night vibes",
  ],
  drill: [
    "Slide challenge with the crew",
    "Hard beat drop reaction",
    "Behind-the-scenes of the video shoot",
    "Lyric breakdown with the instrumental",
    "POV: When the bass slides in",
    "Freestyle in the ends",
    "Car ride with the track on full",
    "Studio session with the producer",
    "Before-and-after the beat drops",
    "Green screen on the block",
    "Outfit check drill edition",
    "Dance challenge with the signature move",
    "Live performance clip from a show",
    "Reaction to comments on the track",
    "Making the beat from scratch",
    "Shoutout to the producing team",
    "Fan remix or cover reaction",
    "Snippet of the next drop",
    "Day in the life drill edition",
    "Crew walkthrough to the track",
  ],
  pop: [
    "Choreography reveal and tutorial",
    "Behind-the-scenes of the music video",
    "Acoustic version snippet",
    "Outfit transformation to match the vibe",
    "Day in the life vlog",
    "POV: When the chorus hits",
    "Lyric reveal with aesthetic visuals",
    "Studio session magic moment",
    "Fan reaction compilation",
    "Green screen with dreamy aesthetics",
    "Making of the album artwork",
    "Vocal warm-up before recording",
    "Collaboration announcement teaser",
    "Sound check before a show",
    "Emotional story behind the lyrics",
    "Playlist placement celebration",
    "Cover art reveal countdown",
    "Live performance clip",
    "Q&A with the song playing",
    "Thank-you message for streaming milestone",
  ],
  rnb: [
    "Smooth vocal take snippet",
    "Late night vibes with the track",
    "Behind-the-scenes in the studio",
    "Lyric video with aesthetic visuals",
    "POV: Late night drive with this on",
    "Harmony layering breakdown",
    "Outfit check R&B edition",
    "Vocal warm-up routine",
    "Day in the life slow vibes",
    "Green screen moody aesthetic",
    "Intimate live performance clip",
    "Story behind the lyrics",
    "Fan covers and reactions",
    "Studio setup tour",
    "Acoustic version snippet",
    "Collaboration teaser",
    "Album packaging reveal",
    "Release day celebration",
    "Stream milestone thank you",
    "Snippet of next single",
  ],
};

const defaultIdeas = [
  "Key moment from the music video",
  "Lyric highlight with visuals",
  "Performance snippet",
  "Behind-the-scenes studio moment",
  "Artist reaction to success",
  "Fan interaction moment",
  "Song creation story",
  "Personal story behind the track",
  "Collaboration announcement",
  "Snippet of next release",
  "Energy dance moment",
  "Emotion-driven scene",
  "Audio visual effect showcase",
  "Live performance clip",
  "Aesthetic matching the mood",
  "Producer showcase moment",
  "Band jam session",
  "Fan cover reaction",
  "Chart milestone celebration",
  "Album launch countdown",
];

const moodVibes: Record<string, string[]> = {
  love: ["Feeling the love", "Heart eyes", "In my feels", "Love language"],
  hype: ["LETS GOOOO", "FIRE", "Turnt up", "ENERGY"],
  emotional: ["This one hits deep", "In my feelings", "Real talk", "No cap"],
  party: ["Turn it UP", "Vibes on ten", "Function mode", "Lit"],
  sad: ["This one hurts", "Real ones know", "Heartbreak hour", "Late night thoughts"],
  inspirational: ["Grind mode", "Manifesting", "No limits", "Dream chasing"],
};

function generateTiktokIdeas(data: SongData): string[] {
  const genreLower = data.genre.toLowerCase().replace(/[^a-z]/g, "");
  const templates = genreTemplates[genreLower] || defaultIdeas;
  return templates.map(
    (idea) => `${idea} — ${data.mood} vibe, "${data.songTitle}" focus`
  );
}

function generateCaptions(data: SongData): string[] {
  const moodLower = data.mood.toLowerCase();
  const vibes = moodVibes[moodLower] || ["Check this out", "New sound"];
  const g = data.genre;
  const t = data.songTitle;
  const a = data.artistName;

  return [
    `${vibes[0]} — "${t}" OUT NOW 🎵 #NewMusic #${g}`,
    `Just dropped. ${a ? `By ${a}. ` : ""}#NewTrack #${g} #Music`,
    `${vibes[1]} on this one 🔥 #${g}Music #NowPlaying`,
    `Link in bio 🎧 #MusicRelease #${g}`,
    `Who else vibing? 🎶 #NewMusic #${g}`,
    `${vibes[2]} track alert 🚨 #MusicNew #${g}`,
    `Production on a different level #${g} #NewMusic`,
    `This is the one ⭐ #${g}Music #NewTrack`,
    `Stream now — everywhere 🎵 #${g} #Music`,
    `${vibes[3]} — Made to hit different #${g} #NewRelease`,
    `Your new obsession 🎧 #StreamNow #${g}`,
    `Not your average ${g} track 😤 #NewMusic`,
    `Trust the process 🎯 #${g}Music #NewRelease`,
    `Vibe with me for 3 minutes 🎶 #Music #${g}`,
    `Changed the game with this one 🎵 #HotNew #${g}`,
    `Come thru and enjoy 🔥 #MusicNewRelease #${g}`,
    `Fresh out the studio 🎧 #NewMusic #${g}`,
    `Certified banger incoming 🚀 #${g}Music`,
    `Saving this forever 💯 #NewMusic #${g}`,
    `First listen reaction? 🎵 #FeedbackWanted #NewTrack`,
  ];
}

function generateHooks(data: SongData): string[] {
  const t = data.songTitle;
  const g = data.genre;
  const m = data.mood;
  const a = data.artistName || "This artist";

  return [
    `"${t}" just changed the game`,
    `If you love ${g}, this is MANDATORY`,
    `Wait for the drop on "${t}"`,
    `This ${m} vibe is UNREAL`,
    `${a} did NOT come to play`,
    `"${t}" hits different`,
    `The best ${g} track you'll hear today`,
    `This beat is FIRE — ${t}`,
    `You NEED to hear the hook`,
    `Mark this as your new favorite`,
  ];
}

function generatePromotionPlan(data: SongData): string {
  const t = data.songTitle;
  const a = data.artistName || "the artist";
  const g = data.genre;
  const m = data.mood;

  return `Day 1 — Release Day
- Drop "${t}" on all platforms at midnight
- Post announcement across Instagram, Twitter/X, TikTok, and Facebook
- Share behind-the-scenes clip of the making of "${t}"
- Send track to DJ contacts and playlist curators

Day 2 — Social Blitz
- Launch a TikTok challenge with the ${m} vibe of "${t}"
- Post 3 Instagram Reels using different hooks from the track
- ${g} community engagement: reply to every comment and DM
- Share Spotify/Apple Music link in stories with swipe-up

Day 3 — Content Wave
- Release a lyric video or visualizer on YouTube
- Post behind-the-scenes studio footage
- Share fan reactions and early reviews
- Pitch to ${g} blogs and music press

Day 4 — Influencer Push
- Send track to 10-15 ${g} influencers and content creators
- Share a TikTok duet with a dancer or creator
- Post a "making the beat" or vocal session video
- Engage with ${g} Reddit communities and Facebook groups

Day 5 — Visual Drop
- Release the official music video or performance video
- Post carousel of behind-the-scenes photos on Instagram
- Share short-form clips from the video across all platforms
- Create a Spotify Canvas with the video highlight

Day 6 — Live Connection
- Go live on Instagram or TikTok performing "${t}" acoustically
- Share the story behind the lyrics and ${m} mood
- Host a Q&A about the creative process
- Post a "day in the life of ${a}" vlog

Day 7 — Momentum & Next Steps
- Share streaming milestone updates (first week numbers)
- Announce the next release date or upcoming show
- Create a recap video of the week's best moments
- Thank fans and tease what's coming next from ${a}`;
}

function generateContent(data: SongData): MarketingResults {
  return {
    tiktokIdeas: generateTiktokIdeas(data),
    captions: generateCaptions(data),
    hooks: generateHooks(data),
    promotionPlan: generatePromotionPlan(data),
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data: SongData = await req.json();

    if (!data.songTitle || !data.genre || !data.mood) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: songTitle, genre, mood",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const results = generateContent(data);

    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
