#!/usr/bin/env python3
"""Generates the TKUMA / תקומה logo files in assets/brand/.
The mark is original artwork: a rising sun behind a gate facade inspired by
Second Temple architecture, standing on three courses of foundation stone.
Text is converted to outlines from Frank Ruhl Libre (SIL OFL 1.1), so the
files render the same everywhere without loading a font.
Run: python3 scripts/brand/make-logos.py  (needs fonttools + brotli)"""
import math, os
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
FONTS = os.path.join(ROOT, 'assets', 'fonts')
OUT = os.path.join(ROOT, 'assets', 'brand')

NAVY, GOLD, CREAM = '#13213F', '#B97D14', '#FBF8F3'
GOLD_D, CREAM_D, NAVY_D = '#E8B44E', '#F5F1EA', '#0B1427'

_fonts = {}
def font(sub, wght):
    k = (sub, wght)
    if k not in _fonts:
        f = TTFont(os.path.join(FONTS, f'frank-ruhl-libre-{sub}-wght-normal.woff2'))
        _fonts[k] = instantiateVariableFont(f, {'wght': wght})
    return _fonts[k]

def text_path(txt, sub, wght, size, x, y, anchor='middle', rtl=False, track=0):
    """Returns (svg path d, width). Simple layout: no shaping needed for these strings.
    Characters missing from the chosen subset (space, period) come from the Latin subset."""
    chars = list(reversed(txt)) if rtl else list(txt)
    glyphs = []
    for ch in chars:
        for sb in (sub, 'latin'):
            f = font(sb, wght); cm = f.getBestCmap()
            if ord(ch) in cm:
                s = size / f['head'].unitsPerEm; gs = f.getGlyphSet(); n = cm[ord(ch)]
                glyphs.append((gs, n, gs[n].width * s, s)); break
    w = sum(g[2] for g in glyphs) + track * (len(glyphs) - 1)
    x0 = x - w / 2 if anchor == 'middle' else (x - w if anchor == 'end' else x)
    cmds, cx = [], x0
    for gs, n, a, s in glyphs:
        pen = SVGPathPen(gs, lambda v: f'{v:.2f}'.rstrip('0').rstrip('.'))
        gs[n].draw(TransformPen(pen, (s, 0, 0, -s, cx, y)))
        cmds.append(pen.getCommands()); cx += a + track
    return ' '.join(c for c in cmds if c), w

def mark(ink, sun, door=None, x=0, y=0, k=1.0, rays=True, stones=3):
    """64x64 mark. ink = facade/stones colour, sun = sun/rays colour."""
    door = door or sun
    g = []
    # rising sun: half disc on the horizon (y=44)
    g.append(f'<path d="M10 44A22 22 0 0 1 54 44Z" fill="{sun}"/>')
    if rays:
        for a in (162, 135, 108, 90, 72, 45, 18):
            r = math.radians(a); r1, r2 = (25.5, 30.5) if a % 45 else (25.5, 29)
            g.append(f'<line x1="{32+r1*math.cos(r):.2f}" y1="{44-r1*math.sin(r):.2f}" x2="{32+r2*math.cos(r):.2f}" y2="{44-r2*math.sin(r):.2f}" stroke="{sun}" stroke-width="2.4" stroke-linecap="round"/>')
    # facade: wings, tall porch, crenellated crown, arched gate of light
    # wings with their cornices, the tall porch with a broad cornice, a rectangular gate
    facade = ('M16 44V34.5h-0.8V32.5h8.3V26.5h-1.8V23.5h20.6v3h-1.8v6h8.3v2h-0.8V44Z')
    g.append(f'<path d="{facade}" fill="{ink}"/>')
    g.append(f'<path d="M29.4 44V31h5.2v13Z" fill="{door}"/>')
    g.append(f'<path d="M26 29h12" stroke="{door}" stroke-width="1.1"/>')
    # three courses of foundation stone: ancient roots, a future being built
    for i, (a, b) in enumerate([(8, 56), (15, 49), (22, 42)][:stones]):
        yy = 49 + i * 5
        g.append(f'<line x1="{a}" y1="{yy}" x2="{b}" y2="{yy}" stroke="{ink}" stroke-width="3" stroke-linecap="round"/>')
    return f'<g transform="translate({x} {y}) scale({k})">' + ''.join(g) + '</g>'

def svg(w, h, body, title, bg=None):
    b = f'<rect width="{w}" height="{h}" fill="{bg}"/>' if bg else ''
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img" aria-label="{title}"><title>{title}</title>{b}{body}</svg>\n'

def write(name, s):
    with open(os.path.join(OUT, name), 'w', encoding='utf-8') as fh: fh.write(s)

TITLE = 'תקומה | TKUMA'
TAG_HE = 'שורשים עתיקים. עתיד נבנה.'
TAG_EN = 'ANCIENT ROOTS. A FUTURE BEING BUILT.'

def horizontal(ink, sun, sub):
    he, wh = text_path('תקומה', 'hebrew', 800, 46, 0, 0, 'start', rtl=True)
    en, we = text_path('TKUMA', 'latin', 600, 15.5, 0, 0, 'start', track=6.2)
    tw = max(wh, we); x = 82; W = x + tw + 6
    he, _ = text_path('תקומה', 'hebrew', 800, 46, x + tw, 46, 'end', rtl=True)
    en, _ = text_path('TKUMA', 'latin', 600, 15.5, x + tw, 70, 'end', track=6.2)
    body = mark(ink, sun, x=0, y=6, k=1.0) + f'<path d="{he}" fill="{ink}"/><path d="{en}" fill="{ink}"/>'
    return svg(round(W), 76, body, TITLE)

def stacked(ink, sun, bg=None, lang='he'):
    W, H = 520, 520
    he, _ = text_path('תקומה', 'hebrew', 800, 112, W / 2, 330, rtl=True)
    en, _ = text_path('TKUMA', 'latin', 600, 34, W / 2, 384, track=16)
    tag, _ = (text_path(TAG_HE, 'hebrew', 500, 26, W / 2, 462, rtl=True) if lang == 'he'
              else text_path(TAG_EN, 'latin', 500, 17, W / 2, 458, track=2.4))
    body = (mark(ink, sun, x=W / 2 - 96, y=12, k=3.0) + f'<path d="{he}" fill="{ink}"/><path d="{en}" fill="{ink}"/>'
            f'<line x1="{W/2-62}" y1="414" x2="{W/2+62}" y2="414" stroke="{sun}" stroke-width="3"/><path d="{tag}" fill="{ink}"/>')
    return svg(W, H, body, TITLE, bg)

def app_icon(size=64, rx=14, rays=True):
    # navy tile, gold sun, cream stones; the facade stays navy so it reads as a silhouette in the light
    return svg(64, 64, f'<rect width="64" height="64" rx="{rx}" fill="{NAVY}"/>' + mark(NAVY, GOLD_D, door=GOLD_D, x=4, y=1, k=0.875, rays=rays, stones=1) if rays else svg_fav().replace(f'stroke="{NAVY}" stroke-width="3"', f'stroke="{CREAM}" stroke-width="3"'), TITLE)

def svg_fav():
    # favicon: no rays, larger sun, so it stays legible at 16px
    return ('<g transform="translate(-6.5 -10) scale(1.2)">' + mark(NAVY, GOLD_D, rays=False, stones=0) + '</g>'
            f'<line x1="10" y1="50" x2="54" y2="50" stroke="{CREAM}" stroke-width="4" stroke-linecap="round"/>')

os.makedirs(OUT, exist_ok=True)
write('mark.svg', svg(64, 64, mark(NAVY, GOLD), TITLE))
write('mark-dark.svg', svg(64, 64, mark(CREAM_D, GOLD_D), TITLE))
write('logo-horizontal.svg', horizontal(NAVY, GOLD, 'hebrew'))
write('logo-horizontal-dark.svg', horizontal(CREAM_D, GOLD_D, 'hebrew'))
write('logo-stacked.svg', stacked(NAVY, GOLD, CREAM))
write('logo-stacked-dark.svg', stacked(CREAM_D, GOLD_D, NAVY_D))
write('logo-stacked-en.svg', stacked(NAVY, GOLD, CREAM, 'en'))
write('app-icon.svg', app_icon())
write('favicon.svg', svg(64, 64, f'<rect width="64" height="64" rx="14" fill="{NAVY}"/>' + svg_fav(), TITLE))
print('wrote', sorted(os.listdir(OUT)))
