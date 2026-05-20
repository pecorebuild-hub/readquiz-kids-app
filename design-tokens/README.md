# ReadQuest Design Tokens

Tokens synced from `readquest/theme/tokens.ts`, `typography.ts`, and component shadows.

## Import into Figma

### Option A — Tokens Studio (recommended)

1. Install [Tokens Studio for Figma](https://tokens.studio/)
2. Open file **Irvin-Yakovenko-Testing-Task** → page **UI Kit**
3. Tokens Studio → **Import** → select `readquest.tokens.json`
4. Enable themes **Light** and **Dark**
5. **Create / Update variables** from token sets `color-light` and `color-dark`
6. **Create styles** from `typography` and `effect` token sets

### Option B — Figma Variables (manual)

Use swatches on the **UI Kit** page as reference and map hex values from `color-light` / `color-dark` sets.

## Token sets

| Set | Contents |
|-----|----------|
| `color-light` | Light theme palette + difficulty accents |
| `color-dark` | Dark theme palette |
| `typography` | Linotte headings, Inter body, type scale |
| `spacing` | 4–32px scale |
| `radius` | 8–999 corner radii |
| `effect` | card, bookCover, bubble, tile shadows |

## Source of truth

Code: `readquest/theme/tokens.ts`, `readquest/theme/typography.ts`

When tokens change in code, update `readquest.tokens.json` and re-import in Figma.
