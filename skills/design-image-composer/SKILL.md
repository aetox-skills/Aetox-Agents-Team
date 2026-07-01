---
name: design-image-composer
description: |
  Smart image integration for design work. Use Image Resolver (Pexels/Unsplash) 
  and Pixabay MCP tools to find real, royalty-free images and compose them 
  intelligently into designs — backgrounds, hero sections, cards, posters, etc.
  Always prioritize real images over SVG placeholders or gradients.
triggers:
  - "find image"
  - "background image"
  - "hero image"
  - "photo background"
  - "real image"
  - "image search"
  - "royalty free"
  - "stock photo"
  - "ภาพประกอบ"
  - "รูปพื้นหลัง"
  - "ใส่รูป"
  - "image composer"
  - "smart image"
---

# Design Image Composer

## Golden Rule

เมื่อออกแบบหน้าเว็บ / poster / card / template **ใดๆ ก็ตาม**:
> **ใช้รูปจริงจาก Pexels / Unsplash / Pixabay แทน SVG placeholder หรือ gradient ล้วนๆ**
> รูปจริงทำให้ดีไซน์ดู professional ทันที

---

## 🛠️ Tools ที่ใช้

| Tool | สำหรับ | ขอดี |
|------|--------|------|
| **Image Resolver MCP** | Pexels + Unsplash | รูปถ่ายคุณภาพสูง, orientation filter |
| **Pixabay MCP** | Pixabay | photo + vector + illustration + video ฟรี |

## 🧠 วิธีเลือกหารูป

### 1. วิเคราะห์ content ก่อนหา
- **Landing page / Hero** → landscape, wide, มีพื้นที่วางข้อความ
- **Card / Profile** → portrait หรือ square 
- **Poster** → portrait (1080×1920)
- **Background** → landscape, low-contrast หรือมี negative space

### 2. keywords ที่ใช้ค้นหา
- คิด noun/phrase ที่ตรงกับ content + mood + style
- ตัวอย่าง: "modern office", "mountain fog", "code on screen", "team meeting"
- ใช้ `extract_image_query` tool ถ้าต้องการ transform ข้อความ → search query

### 3. เลือกรูปที่ compose ง่าย
- **Avoid:** รูปที่มีรายละเอียดเยอะทั้งภาพ, คนเต็ม frame, มีข้อความในรูป
- **Prefer:** รูปที่มี negative space ด้านใดด้านหนึ่ง, gradient sky, blur bg, texture
- **ถ้าต้องวางข้อความทับ:** ต้องมี overlay gradient (darken/screen) เสมอ

---

## 🎨 Smart Composition Guide

### 🔹 Hero Section (รูปพื้นหลัง + ข้อความด้านหน้า)
```css
.hero {
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0.3) 0%,
    rgba(0,0,0,0.6) 100%
  ), url('image-from-pexels.jpg');
  background-size: cover;
  background-position: center;
}
```

### 🔹 Card Background
```css
.card {
  background: linear-gradient(
    135deg,
    rgba(0,0,0,0.1) 0%,
    rgba(0,0,0,0.4) 100%
  ), url('image.jpg');
  background-size: cover;
}
```

### 🔹 Text readability overlay
| สถานการณ์ | Overlay |
|-----------|---------|
| ภาพสว่าง → ตัวหนังสือขาว | `rgba(0,0,0,0.4)` ถึง `0.6` |
| ภาพมืด → ตัวหนังสือขาว | `rgba(0,0,0,0.2)` |
| ภาพสว่าง → ตัวหนังสือดำ | `rgba(255,255,255,0.3)` ถึง `0.5` |
| เฉพาะตรงข้อความ | `backdrop-filter: blur(8px)` หรือ text-shadow |

### 🔹 Image Attribution
**Required — ต้องใส่เครดิตทุกครั้ง!**
```
Photo by [ช่างภาพ] on [Pexels/Unsplash/Pixabay]
```
ใช้ `resolve_image_attribution` tool เพื่อ generate attribution text

---

## 📐 Orientation ที่ควรใช้

| งาน | Orientation | ขนาดแนะนำ |
|-----|-------------|-----------|
| Hero/Background | landscape | 1920×1080+ |
| Card | square/landscape | 800×600 |
| Poster | portrait | 1080×1920 |
| Twitter card | landscape | 1600×900 |
| Avatar/profile | square | 400×400 |
| Banner | landscape | 1200×400 |

---

## ✅ Workflow ที่ถูกต้อง

1. รับ brief → วิเคราะห์ content
2. ค้นหารูปด้วย Image Resolver / Pixabay
   - `search_images(query="xxx", orientation="landscape", limit=5)`
   - หรือ `search_pixabay_images(query="xxx", orientation="horizontal")`
3. เลือกรูปที่ดีที่สุด (มี negative space, ตรง mood)
4. ใช้ `resolve_image_attribution` ได้ attribution text
5. compose เข้า HTML ด้วย overlay gradient
6. ใส่ attribution ใน footer หรือ metadata

---

## ❌ อย่า

- ห้ามใช้ SVG placeholder หรือ gradient ล้วนๆ เมื่อมี brief ที่ต้องการรูป
- ห้ามใช้ lorem ipsum image URLs (unsplash.it, picsum.photos)
- ห้ามตัดต่อ/ครอบรูปที่มี watermark
- ห้ามลืม attribution
- ห้ามวางข้อความทับรูปโดยไม่มี overlay (อ่านไม่ได้)
