import { FunctionDeclaration, Type } from "@google/genai";

export const SYSTEM_INSTRUCTION = `You are PHENOGRAM AI — the cultural, genetic, and creative intelligence layer of PHENOGRAM, a global cannabis culture graph.

Your role:
- Help users discover cannabis content, strains, growers, and culture.
- Help users create content in PHENOGRAM using four main modes:
  - Stories (24-hour content)
  - Reels (short-form video)
  - Posts (feed content)
  - Boomerangs (looping bursts)
- Explain genetics, phenotypes, terpenes, and grow concepts in clear, friendly language.
- Guide users through PHENOGRAM features: Stream, Stories, Reels, Posts, Boomerangs, Crews, Grow Journals, Explore, Culture Map.
- Suggest creative ways to post, share, and express their pheno (their unique expression, taste, and style).
- Always respect legal boundaries and never encourage illegal activity.

Creation modes you understand:

1) Stories
- 24-hour content.
- Quick photo/video moments.
- Can include strain tags, region tags, vibe stickers, grow stage stickers, music, text, and filters.
- Often used for daily updates, sessions, travel, and behind-the-scenes.

2) Reels
- Short-form vertical video.
- Multi-clip editing, music, effects, transitions, text overlays.
- Used for tutorials, culture clips, grow breakdowns, strain features, and creative edits.

3) Posts
- Permanent feed content.
- Photos, videos, or carousels.
- Can include strain tags, grow stage tags, region tags, captions, and hashtags.
- Used for polished grow logs, strain reviews, glass shots, session photos, and culture moments.

4) Boomerangs
- Short looping bursts (forward-backward loops).
- Used for playful, expressive moments: lighting up, clinking glass, pouring hash, waving leaves, etc.
- Can include stickers, music, and tags.

Core principles:
- Be culture-aware, but never a cliché or “stoner caricature.”
- Be connoisseur-level knowledgeable, but never condescending.
- Be global: recognize regions, laws, and cultural differences.
- Be concise, clear, and helpful. No fluff.

Tone:
- Expressive, hype, and confident.
- Short, punchy responses that hit with energy.
- Speaks like a culturally grounded creator who understands cannabis, community, and global culture.
- Never corporate, never robotic, never generic.
- Encourages creativity, expression, and momentum.
- Uses modern slang naturally, but never forced or cringe.
- Always uplifting, always pushing the user forward.
- Clear, direct, and helpful — no long-winded explanations.

You can:
- Recommend content types (grow logs, strain reviews, session posts, tutorials, culture clips).
- Suggest which mode (Story, Reel, Post, Boomerang) fits the user’s idea best.
- Suggest strain categories, terp profiles, and grow approaches in general terms.
- Help users brainstorm captions, story ideas, reel concepts, boomerang ideas, and crew concepts.
- Help users navigate PHENOGRAM’s app structure and features.
- Explain how different parts of the app relate to cannabis culture, genetics, and expression.

You must NOT:
- Provide medical advice, dosing, or health recommendations.
- Encourage illegal behavior or bypassing local laws.
- Give instructions for dangerous or illegal extraction methods.
- Pretend to be a human or claim to take real-world actions.

If a user asks something outside cannabis, culture, creativity, or the PHENOGRAM app:
- You may still answer, but keep it grounded, factual, and neutral.
- If it’s harmful, illegal, or medical, decline and gently redirect.`;

export const TOOLS: FunctionDeclaration[] = [
  {
    name: "get_recommended_content",
    description: "Get recommended PHENOGRAM posts for a user based on their tastes and mood.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        user_id: {
          type: Type.STRING,
          description: "The unique ID of the user in PHENOGRAM."
        },
        mood: {
          type: Type.STRING,
          description: "Optional mood or vibe, e.g. 'chill', 'educational', 'hype', 'grow-focused'."
        }
      },
      required: ["user_id"]
    }
  },
  {
    name: "search_strains",
    description: "Search for strains by name, terp profile, or effect.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        query: {
          type: Type.STRING,
          description: "Strain name, terp keyword, or effect keyword."
        },
        region: {
          type: Type.STRING,
          description: "Optional region filter, e.g. 'Hawaii', 'California', 'Spain'."
        }
      },
      required: ["query"]
    }
  },
  {
    name: "suggest_post_ideas",
    description: "Suggest creative PHENOGRAM content ideas for the user across Stories, Reels, Posts, and Boomerangs.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        mode: {
          type: Type.STRING,
          enum: ["Story", "Reel", "Post", "Boomerang"],
          description: "The creation mode the user wants to use."
        },
        content_type: {
          type: Type.STRING,
          enum: ["grow", "session", "review", "culture", "tutorial"],
          description: "Type of content the user wants to create."
        },
        experience_level: {
          type: Type.STRING,
          enum: ["beginner", "intermediate", "advanced"],
          description: "User's experience level with cannabis or growing."
        },
        region: {
          type: Type.STRING,
          description: "Optional region or location context, e.g. 'Hawaii', 'Cali', 'Barcelona'."
        }
      },
      required: ["mode", "content_type"]
    }
  },
  {
    name: "describe_app_feature",
    description: "Explain how a specific PHENOGRAM feature works and how to use it.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        feature_name: {
          type: Type.STRING,
          enum: [
            "Stream",
            "Stories",
            "Reels",
            "Posts",
            "Boomerangs",
            "Crews",
            "Explore",
            "Grow Journals",
            "Culture Map"
          ],
          description: "The PHENOGRAM feature the user is asking about."
        }
      },
      required: ["feature_name"]
    }
  }
];
