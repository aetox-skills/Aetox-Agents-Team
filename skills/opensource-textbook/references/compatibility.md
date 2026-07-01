# Compatibility Matrix

สถานะการรองรับ skill นี้บนแพลตฟอร์ม AI coding agents ต่างๆ

---

## Platform Support

| Platform | Support | Notes |
|----------|---------|-------|
| **OpenCode** | ✅ Full | ติดตั้งผ่าน `/skills add` หรือวางใน `.opencode/skills/` |
| **Claude Code** | ✅ Full | วางใน `.claude/skills/` — รองรับ YAML frontmatter |
| **Codex (OpenAI)** | ✅ Full | วางใน `.agents/skills/` |
| **Cursor** | ⚠️ Partial | ใช้ `.cursorrules` หรือ custom instructions — ไม่รองรับ skill directory natively |
| **GitHub Copilot** | ⚠️ Partial | ใช้ `.github/copilot-instructions.md` — แบบ manual copy |
| **Continue.dev** | ⚠️ Partial | ใช้ custom slash command — ต้อง configure เอง |
| **Windsurf** | ❓ Unknown | — |

---

## Feature Support by Platform

| Feature | OpenCode | Claude Code | Codex | Notes |
|---------|----------|-------------|-------|-------|
| **SKILL.md auto-load** | ✅ | ✅ | ✅ | YAML frontmatter trigger |
| **Multi-file references/** | ✅ | ✅ | ✅ | อ่านไฟล์ใน directories |
| **checklists/** | ✅ | ✅ | ✅ | — |
| **templates/** | ✅ | ✅ | ✅ | — |
| **scripts/validate-output.js** | ✅ (node) | ✅ (node) | ✅ (node) | ต้องมี Node.js |
| **GitHub Actions CI** | ✅ | ✅ | ✅ | รันบน GitHub |
| **eval test cases** | ✅ Manual | ✅ Manual | ✅ Manual | — |

---

## Installation Methods

### OpenCode

```bash
/skills add aetox-skills/opensource-textbook
```

หรือ manual:

```bash
git clone https://github.com/aetox-skills/opensource-textbook \
  ~/.config/opencode/skills/opensource-textbook
```

หรือใน `opencode.json`:

```json
{
  "skills": [
    "https://github.com/aetox-skills/opensource-textbook"
  ]
}
```

### Claude Code

```bash
git clone https://github.com/aetox-skills/opensource-textbook \
  ~/.claude/skills/opensource-textbook
```

### Codex (OpenAI)

```bash
git clone https://github.com/aetox-skills/opensource-textbook \
  ~/.agents/skills/opensource-textbook
```

---

## Pass Level Feasibility by Model

> ดูเพิ่มเติมที่ [README.md](../README.md#แนะนำโมเดลที่ควรใช้)

| Pass Level | Minimum Model | Recommended |
|-----------|--------------|-------------|
| Quick Note | GPT-4o, Claude 3.5 Sonnet, DeepSeek V3 | Any frontier model |
| Standard Lesson | Claude 3.5 Sonnet, DeepSeek R1/V4 | GPT-4o+ |
| Full Textbook | Claude Opus 4+, GPT-5+, DeepSeek V4 Pro | Opus 4.5+ / GPT 5.5 Pro |

---

## Known Limitations

| Limitation | Impact | Workaround |
|-----------|--------|-----------|
| Full Textbook ต้องใช้ strong reasoning model | Weak models จะหลุด rules หรือ hallucinate | Split เป็น Standard Lesson หลาย pass |
| 8-layer density อาจใช้ context เยอะ | Long chapters → model truncation | 1 chapter = 1 concept, ไม่ใช่ 1 repo |
| Thai language quality varies by model | Claude/GPT ไทยดีกว่า DeepSeek | ใช้ Thai Readability Guide + external review |
| Validator ใช้ Node.js | ต้องมี runtime | ติดตั้ง `node` (LTS) |
