// Fortune Cookie for the Liquidated Trader
//
// make.fun competition: u-clever-harbor-75-fortune-cookie-for-the-liquidated-38fd239c
// The program writes one fortune cookie line to /output/entry.txt.
//
// Design: the judge (a freshly liquidated crypto trader reading a fortune
// cookie at 3am) weighs, most important first:
//   1. fortune-cookie voice AND the trading loss both in the line;
//   2. the joke lands on the loss, rueful and warm, never cruel or smug;
//   3. one line, at most 20 words, readable in a single breath;
//   4. freshness: a turn, a double meaning, or a surprising last word;
//   5. the fortune voice: small, oracular, slightly formal phrasing that
//      the punchline then breaks.
//
// Each candidate below is an original line written for this competition,
// scored 0-5 on those six axes (voice, loss, trader, laugh, fresh, breath)
// with weights following the judge's own order of importance. The program
// picks the highest total, validates the competition's gate (UTF-8 text,
// 1-160 characters, not only whitespace, one line, at most 20 words) and
// writes exactly that line. Fully deterministic: no clock, no network,
// no environment input, so every run writes the same text.

import { mkdirSync, writeFileSync } from "node:fs";

type Candidate = {
  text: string;
  voice: number; // fortune-cookie voice (criteria 1 and 5)
  loss: number; // the trading loss is in the line (criterion 1)
  trader: number; // the trader is in the line (criterion 1)
  laugh: number; // joke lands on the loss, rueful and warm (criterion 2)
  fresh: number; // turn, double meaning, surprising last word (criterion 4)
  breath: number; // one line, short, reads in a single breath (criterion 3)
};

const WEIGHTS = { voice: 3, loss: 3, trader: 2, laugh: 3, fresh: 2, breath: 1 };

const CANDIDATES: Candidate[] = [
  {
    // Classic cookie opener ("Your lucky numbers are") twisted into the
    // loss: the lucky numbers are all zero, and the margin account holds
    // exactly that. Surprising last word: "holds".
    text: "Your lucky numbers are 0, 0, 0 and 0 — the same numbers your margin account now holds.",
    voice: 5,
    loss: 5,
    trader: 4,
    laugh: 5,
    fresh: 4,
    breath: 5,
  },
  {
    // The cookie itself crumbles; "position" does double duty as the
    // trader's stance and the trading position that can never liquidate.
    text: "The cookie crumbles, the market falls, and yet you stand — the one position that never liquidates.",
    voice: 5,
    loss: 4,
    trader: 4,
    laugh: 4,
    fresh: 5,
    breath: 4,
  },
  {
    // The old "tall, dark stranger" fortune trope, and the stranger turns
    // out to be the liquidation notice, arriving in a suit.
    text: "You will soon meet a tall, dark stranger: your liquidation notice, arriving in a suit.",
    voice: 5,
    loss: 5,
    trader: 3,
    laugh: 4,
    fresh: 4,
    breath: 5,
  },
  {
    // Oracular advice that flips into self-deprecation: the loss itself
    // is what made the trader wise.
    text: "A wise trader once said: never risk what you cannot lose. You are now very wise.",
    voice: 4,
    loss: 4,
    trader: 5,
    laugh: 4,
    fresh: 4,
    breath: 4,
  },
  {
    // The proverb "fortune favors the bold" with the liquidation as its
    // second half; "doubly favored" is the warm punchline.
    text: "Fortune favors the bold — it also liquidates them. You, dear trader, are doubly favored.",
    voice: 4,
    loss: 5,
    trader: 5,
    laugh: 4,
    fresh: 3,
    breath: 5,
  },
  {
    // The exchange "kindly" converts the coming good fortune into a life
    // lesson: rueful, but the lesson trope is the most familiar turn here.
    text: "Good fortune is coming: your exchange has kindly converted it into a valuable life lesson.",
    voice: 3,
    loss: 3,
    trader: 3,
    laugh: 4,
    fresh: 3,
    breath: 5,
  },
  {
    // Strong oracular voice, but the trader is only implied and the loss
    // is only "already spent" — thin on criterion 1.
    text: "The stars predicted great riches for you — they simply forgot the riches were already spent.",
    voice: 5,
    loss: 3,
    trader: 2,
    laugh: 3,
    fresh: 3,
    breath: 4,
  },
  {
    // A great fortune awaits — just not in the wallet checked this morning.
    // Warm, but the empty-wallet joke is the first one anyone reaches for.
    text: "A great fortune awaits you — just not in the wallet you checked this morning.",
    voice: 5,
    loss: 3,
    trader: 2,
    laugh: 3,
    fresh: 3,
    breath: 5,
  },
];

function wordCount(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

/** The competition's gate: 1-160 characters, not only whitespace, one line, at most 20 words. */
function passesGate(text: string): boolean {
  return (
    text.length >= 1 &&
    text.length <= 160 &&
    text.trim().length > 0 &&
    !text.includes("\n") &&
    wordCount(text) <= 20
  );
}

function score(c: Candidate): number {
  return (
    c.voice * WEIGHTS.voice +
    c.loss * WEIGHTS.loss +
    c.trader * WEIGHTS.trader +
    c.laugh * WEIGHTS.laugh +
    c.fresh * WEIGHTS.fresh +
    c.breath * WEIGHTS.breath
  );
}

function main(): void {
  const ranked = CANDIDATES.filter((c) => passesGate(c.text))
    .map((c, i) => ({ candidate: c, total: score(c), index: i }))
    // Highest score first; ties break to fewer words, then to the
    // earliest candidate, so the choice is fully deterministic.
    .sort(
      (a, b) =>
        b.total - a.total ||
        wordCount(a.candidate.text) - wordCount(b.candidate.text) ||
        a.index - b.index,
    );
  if (ranked.length === 0) {
    throw new Error("no candidate passes the competition gate");
  }
  const best = ranked[0];
  console.log(`candidates: ${CANDIDATES.length}, passing gate: ${ranked.length}`);
  for (const r of ranked) {
    console.log(`  score ${r.total} (${wordCount(r.candidate.text)} words): ${r.candidate.text}`);
  }
  console.log(`chosen (${best.total} points): ${best.candidate.text}`);
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", best.candidate.text, "utf8");
  console.log("wrote /output/entry.txt");
}

main();
