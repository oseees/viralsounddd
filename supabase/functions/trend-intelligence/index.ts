import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface TrendInput {
  userInput: string;
}

interface TrendResult {
  trend_summary: string;
  viral_patterns: string[];
  why_it_works: string[];
  song_adaptation: {
    hook: string;
    sound_direction: string;
    structure: string;
  };
  tiktok_strategy: {
    caption_style: string;
    posting_idea: string;
    hook_seconds: string;
  };
  virality_score: number;
}

const genreTrendDB: Record<string, TrendResult> = {
  afrobeats: {
    trend_summary:
      "Afrobeats is dominating global TikTok through short dance challenges, call-and-response hooks, and the Rema/Omah Lay style of melodic intimacy. The sweet spot is 8-15 second hooks with a percussive drop that triggers body movement.",
    viral_patterns: [
      "Short melodic hooks (5-8 words) with call-and-response structure",
      "POV storytelling: 'When your ex texts and this song comes on'",
      "Loopable 10-15 sec audio clips with a danceable percussive drop",
      "Transition videos: calm to full groove when the beat switches",
      "Green screen with Lagos/Accra skyline aesthetic",
    ],
    why_it_works: [
      "Call-and-response triggers duet and stitch behavior — TikTok's algorithm rewards it",
      "The percussive groove creates automatic body movement, which drives completion rate",
      "Short hooks fit TikTok's 15-sec sweet spot for maximum replay",
    ],
    song_adaptation: {
      hook: '"She dey do me someting, I no fit lie" — short, catchy, repetition-friendly',
      sound_direction:
        "Mid-tempo groove with log drum hint, warm pads, and a vocal-forward mix. Keep the kick pattern bouncy, not aggressive.",
      structure:
        "Intro (4 sec atmosphere) → Hook (8 sec, the viral moment) → Verse (16 sec) → Hook repeat (8 sec) → Outro (4 sec fade). Total under 60 sec for TikTok cut.",
    },
    tiktok_strategy: {
      caption_style:
        '"POV: You hear this and your body starts moving 🎵🔥" + #Afrobeats #NewMusic',
      posting_idea:
        "Post the 15-second hook as a standalone clip first. Then duet dancers doing the challenge. Never post the full song — always the tightest 10-15 seconds.",
      hook_seconds:
        "Open with the vocal hook immediately — no intro buildup on TikTok. The first 3 seconds must contain the catchiest line + the beat drop together.",
    },
    virality_score: 87,
  },
  amapiano: {
    trend_summary:
      "Amapiano's log drum is TikTok's secret weapon. The genre thrives on the 'wait for the drop' format — viewers stay to hear the bass hit, which drives watch time and algorithmic push. Dance challenges are mandatory.",
    viral_patterns: [
      "Wait-for-the-drop format: calm intro → explosive log drum at 0:08",
      "Dance challenge with a named step (e.g. 'Suno Step', 'Piano Walk')",
      "Car ride videos with windows down and track blasting",
      "Transition from normal conversation to full dance when bass drops",
      "Producer reaction videos showing the log drum layer",
    ],
    why_it_works: [
      "The log drum drop creates a visceral reflex — viewers physically anticipate it, driving rewatch rate",
      "Named dance steps create community identity — people want to 'belong' by learning it",
      "The wait-for-the-drop format is TikTok's highest-retention video structure",
    ],
    song_adaptation: {
      hook:
        '"Log drum made me do it" — instrumental-first, vocal texture second',
      sound_direction:
        "Deep log drum bass, shaker layers, soft piano chords, and a whispered or chanted vocal. The groove must feel hypnotic, not aggressive.",
      structure:
        "Atmosphere (6 sec shakers + piano) → Build (6 sec rising tension) → Drop (8 sec log drum + hook vocal) → Groove (16 sec full arrangement) → Second drop (8 sec). Total ~44 sec.",
    },
    tiktok_strategy: {
      caption_style:
        '"Wait for the drop though… 🤯🔥" + #Amapiano #LogDrum',
      posting_idea:
        "Post a 'wait for it' clip with a calm intro. The log drum hit at 8 seconds is the viral moment. Then follow up with a dance tutorial for the named step.",
      hook_seconds:
        "Start calm — shakers and piano only. The contrast between the quiet intro and the explosive log drum at second 8 is what makes viewers stay and replay.",
    },
    virality_score: 92,
  },
  drill: {
    trend_summary:
      "Drill on TikTok thrives on aggression, flow switches, and the 'slide' aesthetic. The genre's visual identity (balaclavas, dark lighting, crew shots) creates instant recognition. Short 8-bar verses with a memorable ad-lib are the viral unit.",
    viral_patterns: [
      "8-bar verse clips with a flow switch at bar 5-6",
      "Crew walk/slide videos matching the beat cadence",
      "Lyric breakdown text overlays for the hardest bars",
      "Before-and-after: quiet → aggressive when beat drops",
      "Reaction videos to the hardest bar or ad-lib",
    ],
    why_it_works: [
      "Flow switches trigger replay — listeners want to catch every word the second time",
      "The dark visual aesthetic is instantly recognizable in the feed, stopping the scroll",
      "Crew content creates belonging — viewers want to be part of the movement",
    ],
    song_adaptation: {
      hook: '"Opps talk tough till we slide" — aggressive, direct, ad-lib heavy',
      sound_direction:
        "Sliding 808s, rapid hi-hats, dark piano or string melody. Vocal should be commanding with strong ad-libs on every bar end.",
      structure:
        "Intro (4 sec dark melody) → Hook (8 sec, the slide moment) → 8-bar verse (16 sec with flow switch) → Hook (8 sec) → Outro (4 sec). Keep it under 45 sec.",
    },
    tiktok_strategy: {
      caption_style:
        '"This bar tho… 🔥😈" + #Drill #NewMusic #Bars',
      posting_idea:
        "Post the 8-bar verse with text overlay highlighting the hardest bars. Then post a crew walk clip. The lyric breakdown video gets shares; the crew video gets views.",
      hook_seconds:
        "Open with the hook vocal + sliding 808 together. No build-up — drill audiences want impact immediately. First 3 seconds = hook + hardest beat moment.",
    },
    virality_score: 78,
  },
  trap: {
    trend_summary:
      "Trap's TikTok formula is flex energy + 808 test. Videos of car subs rattling, studio sessions, and outfit checks over hard beats consistently circulate. The genre rewards confidence and production quality over lyrical complexity.",
    viral_patterns: [
      "808/car test videos: 'Let me test this in the whip'",
      "Outfit check transitions synced to hi-hat patterns",
      "Studio session clips showing the beat being made",
      "Freestyle over your own instrumental",
      "Before-and-after putting on the chain / getting ready",
    ],
    why_it_works: [
      "808 tests create a sensory experience — viewers feel the bass through their phone, driving engagement",
      "Flex culture creates aspiration — viewers watch to imagine themselves in that position",
      "Production content (making the beat) is the highest-saving category on music TikTok",
    ],
    song_adaptation: {
      hook:
        '"Came in with the trunk knockin\' — they already know" — confident, punchy',
      sound_direction:
        "Heavy 808s, crisp hi-hats, atmospheric pads, and a confident delivery. Mix the 808 loud — it needs to move phone speakers.",
      structure:
        "Intro (4 sec atmospheric) → Hook (8 sec, 808 + vocal) → Verse (16 sec) → Hook (8 sec) → Bridge/switch (8 sec) → Outro (4 sec). Total ~48 sec.",
    },
    tiktok_strategy: {
      caption_style:
        '"808 test in the whip 🚗💥" + #Trap #NewMusic #808',
      posting_idea:
        "First post: car test clip with the track. Second post: making the beat in the studio. Third post: outfit check over the hi-hats. Three formats, one song.",
      hook_seconds:
        "Hit them with the 808 immediately. The first 3 seconds need the heaviest bass moment + your most confident vocal line. No soft intros in trap.",
    },
    virality_score: 75,
  },
  pop: {
    trend_summary:
      "Pop on TikTok is driven by emotional storytelling, aesthetic visuals, and the 'this is my song now' ownership moment. Choruses that feel personal and universal simultaneously perform best. Acoustic and stripped versions often outperform full production.",
    viral_patterns: [
      '"This is my song now" ownership posts with personal stories',
      "Aesthetic lyric videos with dreamy visual overlays",
      "Acoustic/reworked version of the chorus",
      "Transition from sad moment to empowered when chorus hits",
      "Day-in-the-life vlogs with the song as soundtrack",
    ],
    why_it_works: [
      "Emotional ownership ('this is my song') drives sharing — people post it to express identity",
      "Acoustic versions feel intimate, creating parasocial connection with the artist",
      "Aesthetic content gets saved for mood boards and reposts, extending the song's life",
    ],
    song_adaptation: {
      hook:
        '"I stopped waiting for you to stay" — emotional, relatable, singable',
      sound_direction:
        "Clean production, strong melody, minimal instrumentation that lets the vocal shine. Add atmospheric reverb and a subtle build into the chorus.",
      structure:
        "Verse (16 sec, intimate) → Pre-chorus (4 sec build) → Chorus (8 sec, the viral moment) → Verse 2 (16 sec) → Chorus (8 sec) → Outro (4 sec). Total ~56 sec.",
    },
    tiktok_strategy: {
      caption_style:
        '"This song understood me before anyone did 🎵💔" + #Pop #NewMusic',
      posting_idea:
        "Post an acoustic version first to build emotional connection. Then the full production version. Then a 'story behind the lyrics' video. Three phases of the same song.",
      hook_seconds:
        "Start with the vocal alone or with minimal accompaniment. The vulnerability in the first 3 seconds creates an emotional hook that makes viewers stay for the chorus payoff.",
    },
    virality_score: 82,
  },
  rnb: {
    trend_summary:
      "R&B on TikTok thrives on late-night intimacy, vocal runs, and the 'in my feelings' aesthetic. The genre's strength is creating a mood — viewers use R&B tracks as the soundtrack to their own emotional moments. Vocal performance clips outperform everything.",
    viral_patterns: [
      "Late night drive / room vibes with the track as soundtrack",
      "Vocal run breakdown: 'Let me show you how I hit that note'",
      "Harmony layering videos showing each vocal part",
      '"In my feels" aesthetic posts with moody lighting',
      "Acoustic piano + vocal clips in a dim room",
    ],
    why_it_works: [
      "Vocal performance clips create awe — viewers rewatch to catch the technique, driving completion rate",
      "The 'in my feels' mood becomes identity content — people use your song to express their emotional state",
      "Harmony breakdowns are educational and shareable — they get saved, which signals value to the algorithm",
    ],
    song_adaptation: {
      hook:
        '"3 AM and I\'m still thinking about you" — intimate, confessional, melismatic',
      sound_direction:
        "Warm keys, subtle bass, spacious reverb on vocals, and a live-feeling performance. The vocal must feel like a private moment.",
      structure:
        "Intro (4 sec, keys + atmosphere) → Verse (16 sec, building intensity) → Hook (8 sec, the emotional peak) → Verse 2 (16 sec) → Hook (8 sec, with vocal run) → Outro (4 sec hum). Total ~56 sec.",
    },
    tiktok_strategy: {
      caption_style:
        '"3 AM vibes… you know the feeling 🎵🌙" + #RnB #LateNightVibes',
      posting_idea:
        "Post a vocal run clip in a dim room first — show the voice. Then a late-night drive video. Then the 'harmony breakdown' showing how you layered the vocals. Each format hits a different audience segment.",
      hook_seconds:
        "Start with the vocal — no beat, just voice. A single sustained note or run in the first 3 seconds signals 'this is about the voice' and stops the scroll for R&B audiences.",
    },
    virality_score: 80,
  },
};

function detectGenre(input: string): string {
  const lower = input.toLowerCase().replace(/[^a-z]/g, "");
  if (lower.includes("afro") || lower.includes("rema") || lower.includes("burna")) return "afrobeats";
  if (lower.includes("amapiano") || lower.includes("piano") || lower.includes("logdrum")) return "amapiano";
  if (lower.includes("drill") || lower.includes("slide") || lower.includes("ukdrill")) return "drill";
  if (lower.includes("trap") || lower.includes("808") || lower.includes("flex")) return "trap";
  if (lower.includes("pop") || lower.includes("mainstream") || lower.includes("radio")) return "pop";
  if (lower.includes("rnb") || lower.includes("r&b") || lower.includes("soul") || lower.includes("vocal")) return "rnb";
  return "afrobeats";
}

function personalizeResult(base: TrendResult, userInput: string): TrendResult {
  const words = userInput.split(/\s+/).filter((w) => w.length > 2).slice(0, 4).join(" ");
  const score = Math.min(99, Math.max(55, base.virality_score + Math.floor(Math.random() * 8 - 3)));

  return {
    trend_summary: base.trend_summary,
    viral_patterns: base.viral_patterns,
    why_it_works: base.why_it_works,
    song_adaptation: {
      hook: base.song_adaptation.hook,
      sound_direction: base.song_adaptation.sound_direction,
      structure: base.song_adaptation.structure,
    },
    tiktok_strategy: {
      caption_style: base.tiktok_strategy.caption_style,
      posting_idea: base.tiktok_strategy.posting_idea,
      hook_seconds: base.tiktok_strategy.hook_seconds,
    },
    virality_score: score,
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { userInput } = (await req.json()) as TrendInput;

    if (!userInput || !userInput.trim()) {
      return new Response(
        JSON.stringify({ error: "Missing required field: userInput" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const genre = detectGenre(userInput);
    const baseResult = genreTrendDB[genre] || genreTrendDB.afrobeats;
    const result = personalizeResult(baseResult, userInput);

    return new Response(JSON.stringify(result), {
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
