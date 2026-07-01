# Code Reading Pipeline Checklist

ใช้ก่อนเขียน architecture chapter — **ห้ามข้ามขั้น**

## Step 1: README.md
- [ ] อ่านแล้ว — เข้าใจเป้าหมายโปรเจกต์
- [ ] Stars, language, license → `[✓]` จาก GitHub
- [ ] บันทึกข้อจำกัดที่พบ

## Step 2: Package / Config Files
- [ ] `package.json` / `pyproject.toml` / `Cargo.toml` — รู้ stack
- [ ] `tsconfig.json` / `turbo.json` — รู้ build system
- [ ] Dependencies list — รู้ libraries หลัก

## Step 3: Entrypoint
- [ ] `main.ts` / `cli.ts` / `index.ts` — เข้าใจจุดเริ่ม
- [ ] Routing / module registration — รู้ว่า component ไหน load ตอน start

## Step 4: Core Modules
- [ ] Source folder structure — รู้จักทุก module
- [ ] Core logic files — ฟังก์ชัน/class หลัก
- [ ] Data models / schemas

## Step 5: Adapters / Integrations
- [ ] API handlers / routes
- [ ] Database connections
- [ ] MCP / Plugin systems
- [ ] External service integrations

## Step 6: Tests / Examples
- [ ] Test structure — unit / integration / e2e?
- [ ] Example code — intended usage
- [ ] หรือ `[!] ไม่พบ tests`

## Step 7: Docs / Issues / Releases
- [ ] AGENTS.md / CONTRIBUTING.md
- [ ] Recent issues — รู้ปัญหา current
- [ ] Release notes — รู้ version history
- [ ] หรือ `[!] ไม่พบ`

### Final Check
- [ ] ทุกขั้นมีหลักฐาน `[✓]` หรือ `[!]`
- [ ] ไม่มี architecture claim ที่มาจาก README อย่างเดียว
- [ ] หัวข้อ "จุดที่มือใหม่มักเข้าใจผิด" มีข้อมูลจากขั้นที่ 6-7
