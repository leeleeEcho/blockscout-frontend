# AxBlade UI — 颜色设计规范

本文档与 Figma 设计稿 **「4. Colors / 颜色」** 节点同步，作为前端主题与 Token 映射的单一事实来源（设计侧）。

| 项目 | 说明 |
|------|------|
| Figma 文件 | [AxBlade UI Components Guidelines](https://www.figma.com/design/HoWwbVWKSTlmd6K202pmK9/AxBlade-UI-Components-Guidelines?node-id=1-21) |
| 画布节点 | `1:21` — *4. Colors / 颜色* |
| 同步方式 | Figma MCP `get_metadata`（结构与设计稿文案一致） |
| 文档更新 | 设计稿变更时请在本文件更新对应表，并注明修订日期 |

---

## 1. 深色主题（Dark Mode）

### 1.1 Primary Green（主色绿）

| Token 建议名 | 英文标签 | 中文名 | Hex | 用途说明 |
|--------------|----------|--------|-----|----------|
| `color.brand.primary` | Brand Green | 品牌绿 | `#00FFB2` | 主色、强调、按钮、关键元素 |
| `color.brand.secondary` | Secondary | 深翠绿 | `#003B2E` | 次级操作、填色按钮、链接 |
| `color.brand.frame` | Frame | 静谧森林 | `#00664E` | 次级操作、线框按钮、链接 |
| `color.brand.tagText` | Tag Text | 亮白色 | `#F2F2F2` | 标签文字 |

### 1.2 Background Color（背景）

| Token 建议名 | 英文标签 | 中文名 | Hex | 用途说明 |
|--------------|----------|--------|-----|----------|
| `color.bg.page` | BG | 深邃黑 | `#090909` | 页面背景（与早期 Frame 色互换） |
| `color.bg.surface` | Frame | 深灰色 | `#111111` | 板块背景（与早期 BG 色互换） |

### 1.3 Text & Button Color（文字与按钮）

| Token 建议名 | 英文标签 | 中文名 | Hex | 用途说明 |
|--------------|----------|--------|-----|----------|
| `color.text.primary` | Main | 亮白色 | `#F2F2F2` | 主要文字 |
| `color.text.secondary` | Secondary | 暮色灰 | `#97A6A0` | 文本、次要信息 |
| `color.text.highlight` | Highlight | 品牌绿 | `#00FFB2` | 高亮文字、标题 |
| `color.text.onPrimaryButton` | Main button | 深翠绿 | `#003B2E` | 主要按钮文字 |

### 1.4 Neutral Color（中性色）

| Token 建议名 | 英文标签 | 中文名 | Hex / 记法 | 用途说明 |
|--------------|----------|--------|------------|----------|
| `color.border.divider` | Divider | 岩灰绿 | `#414745` | 边框、背景分隔 |
| `color.alpha.white.5` | 5% | 透明白 5% | `#FFFFFF` 5% | 叠加 / 蒙层（实现见下） |
| `color.alpha.white.10` | 10% | 透明白 10% | `#FFFFFF` 10% | 同上 |
| `color.alpha.white.20` | 20% | 透明白 20% | `#FFFFFF` 20% | 同上 |
| `color.alpha.white.30` | 30% | 透明白 30% | `#FFFFFF` 30% | 同上 |
| `color.alpha.white.40` | 40% | 透明白 40% | `#FFFFFF` 40% | 同上 |
| `color.alpha.white.50` | 50% | 透明白 50% | `#FFFFFF` 50% | 同上 |
| `color.alpha.white.75` | 75% | 透明白 75% | `#FFFFFF` 75% | 同上 |

**实现提示（深色蒙层）：** 在 CSS 中可使用 `rgba(255, 255, 255, 0.05)` ～`0.75`；在 Chakra 中可用 `transparentize` / `alpha` 工具函数由 `#FFFFFF` 生成。

### 1.5 Others（语义与扩展）

| Token 建议名 | 英文标签 | 中文名 | Hex | 用途说明 |
|--------------|----------|--------|-----|----------|
| `color.semantic.up` | Up | 上升绿 | `#28E59B` | 上升线、增加 |
| `color.semantic.down` | Down | 下降红 | `#FF6175` | 下降线、错误提示、卖出 |
| `color.semantic.warning` | Warning | 警告黄 | `#E7A71E` | 警告 |
| `color.extended.purple` | Purple | 紫色 | `#9844F2` | 待定（设计稿标注） |

---

## 2. 浅色主题（Light Mode）

### 2.1 Primary Green

| Token 建议名 | 英文标签 | 中文名 | Hex | 用途说明 |
|--------------|----------|--------|-----|----------|
| `color.brand.primary` | Brand Green | 品牌绿 | `#00FFB2` | 主色、强调、按钮、关键元素 |
| `color.brand.secondary` | Secondary | 静谧森林 | `#00664E` | 次级操作、填色按钮、链接 |
| `color.brand.frame` | Frame | 深翠绿 | `#003B2E` | 次级操作、线框按钮、链接 |
| `color.brand.tagText` | Tag Text | 亮白色 | `#F2F2F2` | 标签文字 |

### 2.2 Background Color

| Token 建议名 | 英文标签 | 中文名 | Hex | 用途说明 |
|--------------|----------|--------|-----|----------|
| `color.bg.page` | BG | 亮白色 | `#FCFCFC` | 页面背景（与早期 Frame 色互换） |
| `color.bg.surface` | Frame | 浅灰色 | `#F2F2F2` | 板块背景（与早期 BG 色互换） |

### 2.3 Text & Button Color

| Token 建议名 | 英文标签 | 中文名 | Hex | 用途说明 |
|--------------|----------|--------|-----|----------|
| `color.text.primary` | Main | 深灰色 | `#111111` | 主要文字 |
| `color.text.secondary` | Secondary | 暮色灰 | `#7C8A84` | 文本、次要信息 |
| `color.text.highlight` | Highlight | 静谧森林 | `#00664E` | 高亮文字、标题 |
| `color.text.onPrimaryButton` | Main button | 深翠绿 | `#003B2E` | 主要按钮文字 |

### 2.4 Neutral Color

| Token 建议名 | 英文标签 | 中文名 | Hex / 记法 | 用途说明 |
|--------------|----------|--------|------------|----------|
| `color.border.divider` | Divider | 晓雾白 | `#DEE6E3` | 边框、背景分隔 |
| `color.alpha.black.5` | 5% | 透明黑 5% | `#000000` 5% | 叠加 / 蒙层 |
| `color.alpha.black.10` | 10% | 透明黑 10% | `#000000` 10% | 同上 |
| `color.alpha.black.20` | 20% | 透明黑 20% | `#000000` 20% | 同上 |
| `color.alpha.black.30` | 30% | 透明黑 30% | `#000000` 30% | 同上 |
| `color.alpha.black.40` | 40% | 透明黑 40% | `#000000` 40% | 同上 |
| `color.alpha.black.50` | 50% | 透明黑 50% | `#000000` 50% | 同上 |
| `color.alpha.black.75` | 75% | 透明黑 75% | `#000000` 75% | 同上 |

**实现提示（浅色蒙层）：** 使用 `rgba(0, 0, 0, 0.05)` ～`0.75`。

### 2.5 Others

与深色主题相同：`#28E59B`（上升）、`#FF6175`（下降）、`#E7A71E`（警告）、`#9844F2`（紫色，待定）。

---

## 3. 深浅主题对照摘要

| 语义 | 深色 Hex | 浅色 Hex | 备注 |
|------|----------|----------|------|
| 品牌主绿 | `#00FFB2` | `#00FFB2` | 一致 |
| 页面背景 | `#090909` | `#FCFCFC` | BG / Frame 已与初版规范对调 |
| 板块背景 | `#111111` | `#F2F2F2` | 同上 |
| 主要文字 | `#F2F2F2` | `#111111` | 对调关系 |
| 次要文字 | `#97A6A0` | `#7C8A84` | 浅色稿略深一档 |
| 高亮文字 | `#00FFB2` | `#00664E` | 浅色用森林绿保证对比 |
| 主按钮文字 | `#003B2E` | `#003B2E` | 一致 |
| 分割线 | `#414745` | `#DEE6E3` | 岩灰绿 ↔ 晓雾白 |
| 蒙层基准 | 白 + 透明度 | 黑 + 透明度 | 设计意图对称 |

---

## 4. 超链接文字（页面 / 列表统一）

可点击超链接的默认与悬停颜色与深浅主题对应关系如下（实现上映射为 Chakra 语义色 `text.secondary` / `text.highlight`，`link.primary` 默认等同 `text.secondary`，悬停等同 `text.highlight`）。

| 状态 | 语义 Token | 深色 Hex | 浅色 Hex |
|------|------------|----------|----------|
| Default | `color.text.secondary` | `#97A6A0` | `#7C8A84` |
| Hover | `color.text.highlight` | `#00FFB2` | `#00664E` |

**例外（标题型链接）：** 仅首页 Latest blocks 等卡片第一行中的 **区块高度** 等「标题式」主信息，默认使用 **`text.primary`**，悬停仍用 **`text.highlight`**（Chakra `Link` / Entity 的 **`variant="title"`**）。**交易哈希、地址、批次号等标识类链接** 一律按普通链接规则（`text.secondary` / `text.highlight`），不使用 `title`。

---

## 5. 后续对接前端（Blockscout + Chakra）

1. 将上表 **Token 建议名** 映射到 `toolkit/theme`（或项目既有 semantic tokens），避免在组件中硬编码 Hex。
2. Blockscout 前端以 **暗色为主** 时，优先实现 §1；浅色以 §2 为准。
3. 设计稿若更新变量命名或 Hex，以 Figma 为准修订本文件，并在 Git 提交说明中带上 Figma 版本或截图链接。（§4 超链接已与全局 `Link` / `Button variant="link"` 对齐。）

---

*文档由设计节点元数据整理，若与画布视觉不一致，以 Figma 源文件为准。*
