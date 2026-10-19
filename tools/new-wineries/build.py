"""Merge the new listings into the site's data files. Run once: python3 -I tools/new-wineries/build.py"""
import json, re, urllib.parse, datetime, pathlib
ROOT = pathlib.Path(__file__).resolve().parents[2]
ns = {}; exec((ROOT/'tools/new-wineries/listings.py').read_text(), ns); L = ns['L']
cand = json.loads((ROOT/'tools/new-wineries/candidates.json').read_text())
PICKS = {  # indexes into candidates.json, chosen by eye: grounds, patios, buildings; no people-focused shots
 'alpha-omega-winery':[0,5,4,3,7], 'v-sattui-winery':[1,0,2], 'clif-family-winery':[2,3,4],
 'outer-space-wines':[3,2,4,7], 'merryvale-vineyards':[0,2,4], 'black-stallion-estate-winery':[4,6,0,1,3],
 'landmark-vineyards':[1,2,0,4,7], 'bricoleur-vineyards':[7,9,11,8], 'benessere-vineyards':[0,3,5,2],
 'rombauer-vineyards':[2,3,6,8], 'seavey-vineyard':[0,1,2,5], 'mayo-family-winery':[1,0,3,6],
 'roche-winery':[2,3,6,8], 'dutcher-crossing-winery':[1,0,2,6], 'wilson-winery':[0,3,1,5],
 'breathless-wines':[2,5,4,8], 'west-wines':[3,0,2,6], 'stuhlmuller-vineyards':[5,0,4,3],
 'merriam-vineyards':[1,2,0,7], 'thomas-george-estates':[1,0,4,7], 'bobdog-wines':[1,5,6,2],
 'matanzas-creek-winery':[2,0,3,8], 'balletto-vineyards':[4,3,5,0], 'martinelli-winery':[0,2,1,6],
 'taft-street-winery':[3,0,2,6],
}
FEES = {'clif-family-winery':'$50', 'outer-space-wines':'$30–40'}
dpath = ROOT/'lib/api-client-react/src/wineries-data.json'
data = json.loads(dpath.read_text())
have = {w['slug'] for w in data}
nid = max(w['id'] for w in data) + 1
now = datetime.datetime(2026,10,19,15,30).isoformat()
ta_lines = []
for w in L:
    if w['slug'] in have: continue
    imgs = [re.sub(r'/l\.jpg$', '/o.jpg', cand[w['slug']][i][1]) for i in PICKS[w['slug']]]
    alias, rating, count = w['yelp']
    data.append({
      'id': nid, 'name': w['name'], 'slug': w['slug'], 'description': w['desc'], 'address': w['address'],
      'region': w['region'], 'phone': w['phone'], 'website': w['website'], 'imageUrl': imgs[0],
      'latitude': w['lat'], 'longitude': w['lng'], 'dogFriendly': True, 'sustainable': w['sustainable'],
      'familyFriendly': w['family'], 'napaGreenCertified': False, 'organicCertified': False,
      'amenities': w['amen'], 'tastingFee': FEES.get(w['slug']), 'hours': w['hours'], 'featured': False,
      'listingTier': 'free', 'rating': rating, 'reviewCount': count, 'createdAt': now, 'dogPolicy': w['dog'],
      'yelpUrl': f'https://www.yelp.com/biz/{alias}', 'featuredRank': None, 'galleryImages': imgs,
      'lastRefreshedAt': now, 'bookingUrl': None, 'venueType': w['venue'],
    })
    town = w['address'].split(',')[-2].strip()
    q = urllib.parse.quote(f"{w['name']} {town}")
    ta_lines.append(f'  "{w["slug"]}": {{ url: "https://www.tripadvisor.com/Search?q={q}" }},')
    nid += 1
dpath.write_text(json.dumps(data, ensure_ascii=False, indent=1))
tp = ROOT/'artifacts/napa-directory/src/components/tripadvisor-data.ts'
t = tp.read_text()
if ta_lines and 'Added Oct 2026' not in t:
    t = t.rstrip().rstrip('};').rstrip() + '\n  // Added Oct 2026: link to Tripadvisor search; ratings not confirmed yet.\n' + '\n'.join(ta_lines) + '\n};\n'
    tp.write_text(t)
print(len(data), 'wineries;', len(ta_lines), 'added')
