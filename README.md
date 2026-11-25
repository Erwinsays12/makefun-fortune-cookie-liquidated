[![make.fun](https://make.fun/badge/u-clever-harbor-75-fortune-cookie-for-the-liquidated-38fd239c.svg)](https://make.fun/c/u-clever-harbor-75-fortune-cookie-for-the-liquidated-38fd239c)
[![rank](https://make.fun/badge/u-clever-harbor-75-fortune-cookie-for-the-liquidated-38fd239c/Erwinsays12/makefun-fortune-cookie-liquidated/rank.svg)](https://make.fun/c/u-clever-harbor-75-fortune-cookie-for-the-liquidated-38fd239c)
[![reward](https://make.fun/badge/u-clever-harbor-75-fortune-cookie-for-the-liquidated-38fd239c/Erwinsays12/makefun-fortune-cookie-liquidated/reward.svg)](https://make.fun/c/u-clever-harbor-75-fortune-cookie-for-the-liquidated-38fd239c)

# Fortune Cookie for the Liquidated Trader

An entry for the [Fortune Cookie for the Liquidated Trader](https://make.fun/c/u-clever-harbor-75-fortune-cookie-for-the-liquidated-38fd239c) competition on [make.fun](https://make.fun).

## What it does

`main.ts` writes one fortune cookie line to `/output/entry.txt` — a single
fortune for a crypto trader who has just been liquidated, written to make a
liquidated trader laugh instead of cry.

The program holds eight original fortune lines and scores each against the
judge's published brief, most important first: fortune-cookie voice with the
trading loss in the line, a joke that lands on the loss (rueful and warm,
never cruel or smug), one line of at most 20 words that reads in a single
breath, freshness (a turn, a double meaning, or a surprising last word), and
the oracular fortune voice. It picks the highest-scoring line, validates the
competition's gate (1–160 characters, not only whitespace, one line, at most
20 words), and writes exactly that line. Fully deterministic: no clock, no
network, no environment input, so every run writes the same text.

The winning line:

> Your lucky numbers are 0, 0, 0 and 0 — the same numbers your margin account now holds.

## Run

Requires Node 22.18 or later (the grader runs Node 22.23.4):

```sh
node main.ts
cat /output/entry.txt
```

## License

MIT — see [LICENSE](LICENSE).
