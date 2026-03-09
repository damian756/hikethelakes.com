#!/usr/bin/env python3
"""Generate missing Wainwright fells from Wikipedia data."""
import re

# Book mapping from Wikipedia "By Book" section - fell name (normalized) -> (book, volume, area)
BOOK_MAP = {
    # Book 1 Eastern
    "arnison crag": (1, "The Eastern Fells", "eastern"),
    "glenridding dodd": (1, "The Eastern Fells", "eastern"),
    "nab scar": (1, "The Eastern Fells", "eastern"),
    "gowbarrow fell": (1, "The Eastern Fells", "eastern"),
    "stone arthur": (1, "The Eastern Fells", "eastern"),
    "little mell fell": (1, "The Eastern Fells", "eastern"),
    "low pike": (1, "The Eastern Fells", "eastern"),
    "high hartsop dodd": (1, "The Eastern Fells", "eastern"),
    "great mell fell": (1, "The Eastern Fells", "eastern"),
    "hartsop above how": (1, "The Eastern Fells", "eastern"),
    "heron pike": (1, "The Eastern Fells", "eastern"),
    "birks": (1, "The Eastern Fells", "eastern"),
    "little hart crag": (1, "The Eastern Fells", "eastern"),
    "middle dodd": (1, "The Eastern Fells", "eastern"),
    "high pike": (1, "The Eastern Fells", "eastern"),  # Scandale
    "sheffield pike": (1, "The Eastern Fells", "eastern"),
    "birkhouse moor": (1, "The Eastern Fells", "eastern"),
    "clough head": (1, "The Eastern Fells", "eastern"),
    "seat sandal": (1, "The Eastern Fells", "eastern"),
    "hart side": (1, "The Eastern Fells", "eastern"),
    "great rigg": (1, "The Eastern Fells", "eastern"),
    "red screes": (1, "The Eastern Fells", "eastern"),
    "watson's dodd": (1, "The Eastern Fells", "eastern"),
    "dove crag": (1, "The Eastern Fells", "eastern"),
    "hart crag": (1, "The Eastern Fells", "eastern"),
    "st sunday crag": (1, "The Eastern Fells", "eastern"),
    "stybarrow dodd": (1, "The Eastern Fells", "eastern"),
    "great dodd": (1, "The Eastern Fells", "eastern"),
    "dollywaggon pike": (1, "The Eastern Fells", "eastern"),
    "white side": (1, "The Eastern Fells", "eastern"),
    "fairfield": (1, "The Eastern Fells", "eastern"),
    "raise": (1, "The Eastern Fells", "eastern"),
    "catstye cam": (1, "The Eastern Fells", "eastern"),
    "nethermost pike": (1, "The Eastern Fells", "eastern"),
    "helvellyn": (1, "The Eastern Fells", "eastern"),
    # Book 2 Far Eastern
    "troutbeck tongue": (2, "The Far Eastern Fells", "far-eastern"),
    "hallin fell": (2, "The Far Eastern Fells", "far-eastern"),
    "steel knotts": (2, "The Far Eastern Fells", "far-eastern"),
    "sour howes": (2, "The Far Eastern Fells", "far-eastern"),
    "wansfell": (2, "The Far Eastern Fells", "far-eastern"),
    "beda fell": (2, "The Far Eastern Fells", "far-eastern"),
    "sallows": (2, "The Far Eastern Fells", "far-eastern"),
    "bonscale pike": (2, "The Far Eastern Fells", "far-eastern"),
    "arthur's pike": (2, "The Far Eastern Fells", "far-eastern"),
    "brock crags": (2, "The Far Eastern Fells", "far-eastern"),
    "angletarn pikes": (2, "The Far Eastern Fells", "far-eastern"),
    "the nab": (2, "The Far Eastern Fells", "far-eastern"),
    "shipman knotts": (2, "The Far Eastern Fells", "far-eastern"),
    "hartsop dodd": (2, "The Far Eastern Fells", "far-eastern"),
    "grey crag": (2, "The Far Eastern Fells", "far-eastern"),
    "selside pike": (2, "The Far Eastern Fells", "far-eastern"),
    "place fell": (2, "The Far Eastern Fells", "far-eastern"),
    "tarn crag": (2, "The Far Eastern Fells", "far-eastern"),  # Sleddale
    "wether hill": (2, "The Far Eastern Fells", "far-eastern"),
    "loadpot hill": (2, "The Far Eastern Fells", "far-eastern"),
    "rest dodd": (2, "The Far Eastern Fells", "far-eastern"),
    "gray crag": (2, "The Far Eastern Fells", "far-eastern"),
    "yoke": (2, "The Far Eastern Fells", "far-eastern"),
    "branstree": (2, "The Far Eastern Fells", "far-eastern"),
    "froswick": (2, "The Far Eastern Fells", "far-eastern"),
    "kentmere pike": (2, "The Far Eastern Fells", "far-eastern"),
    "the knott": (2, "The Far Eastern Fells", "far-eastern"),
    "ill bell": (2, "The Far Eastern Fells", "far-eastern"),
    "mardale ill bell": (2, "The Far Eastern Fells", "far-eastern"),
    "stony cove pike": (2, "The Far Eastern Fells", "far-eastern"),
    "harter fell": (2, "The Far Eastern Fells", "far-eastern"),  # Mardale
    "kidsty pike": (2, "The Far Eastern Fells", "far-eastern"),
    "thornthwaite crag": (2, "The Far Eastern Fells", "far-eastern"),
    "rampsgill head": (2, "The Far Eastern Fells", "far-eastern"),
    "high raise": (2, "The Far Eastern Fells", "far-eastern"),  # High Street
    "high street": (2, "The Far Eastern Fells", "far-eastern"),
    # Book 3 Central
    "loughrigg fell": (3, "The Central Fells", "central"),
    "high rigg": (3, "The Central Fells", "central"),
    "walla crag": (3, "The Central Fells", "central"),
    "silver how": (3, "The Central Fells", "central"),
    "helm crag": (3, "The Central Fells", "central"),
    "grange fell": (3, "The Central Fells", "central"),
    "gibson knott": (3, "The Central Fells", "central"),
    "great crag": (3, "The Central Fells", "central"),
    "raven crag": (3, "The Central Fells", "central"),
    "armboth fell": (3, "The Central Fells", "central"),
    "eagle crag": (3, "The Central Fells", "central"),
    "high tove": (3, "The Central Fells", "central"),
    "calf crag": (3, "The Central Fells", "central"),
    "blea rigg": (3, "The Central Fells", "central"),
    "tarn crag": (3, "The Central Fells", "central"),  # Easedale - conflict with Sleddale
    "steel fell": (3, "The Central Fells", "central"),
    "sergeant's crag": (3, "The Central Fells", "central"),
    "bleaberry fell": (3, "The Central Fells", "central"),
    "high seat": (3, "The Central Fells", "central"),
    "loft crag": (3, "The Central Fells", "central"),
    "pavey ark": (3, "The Central Fells", "central"),
    "pike of stickle": (3, "The Central Fells", "central"),
    "thunacar knott": (3, "The Central Fells", "central"),
    "ullscarf": (3, "The Central Fells", "central"),
    "harrison stickle": (3, "The Central Fells", "central"),
    "sergeant man": (3, "The Central Fells", "central"),
    "high raise": (3, "The Central Fells", "central"),  # Langdale - conflict
    # Book 4 Southern
    "holme fell": (4, "The Southern Fells", "southern"),
    "black fell": (4, "The Southern Fells", "southern"),
    "lingmoor fell": (4, "The Southern Fells", "southern"),
    "green crag": (4, "The Southern Fells", "southern"),
    "whin rigg": (4, "The Southern Fells", "southern"),
    "hard knott": (4, "The Southern Fells", "southern"),
    "rosthwaite fell": (4, "The Southern Fells", "southern"),
    "seathwaite fell": (4, "The Southern Fells", "southern"),
    "illgill head": (4, "The Southern Fells", "southern"),
    "rossett pike": (4, "The Southern Fells", "southern"),
    "harter fell": (4, "The Southern Fells", "southern"),  # Eskdale
    "cold pike": (4, "The Southern Fells", "southern"),
    "pike of blisco": (4, "The Southern Fells", "southern"),
    "slight side": (4, "The Southern Fells", "southern"),
    "wetherlam": (4, "The Southern Fells", "southern"),
    "grey friar": (4, "The Southern Fells", "southern"),
    "dow crag": (4, "The Southern Fells", "southern"),
    "glaramara": (4, "The Southern Fells", "southern"),
    "allen crags": (4, "The Southern Fells", "southern"),
    "great carrs": (4, "The Southern Fells", "southern"),
    "brim fell": (4, "The Southern Fells", "southern"),
    "swirl how": (4, "The Southern Fells", "southern"),
    "the old man of coniston": (4, "The Southern Fells", "southern"),
    "coniston old man": (4, "The Southern Fells", "southern"),
    "lingmell": (4, "The Southern Fells", "southern"),
    "crinkle crags": (4, "The Southern Fells", "southern"),
    "esk pike": (4, "The Southern Fells", "southern"),
    "bowfell": (4, "The Southern Fells", "southern"),
    "great end": (4, "The Southern Fells", "southern"),
    "scafell": (4, "The Southern Fells", "southern"),
    "scafell pike": (4, "The Southern Fells", "southern"),
    # Book 5 Northern
    "latrigg": (5, "The Northern Fells", "northern"),
    "binsey": (5, "The Northern Fells", "northern"),
    "longlands fell": (5, "The Northern Fells", "northern"),
    "dodd": (5, "The Northern Fells", "northern"),
    "souther fell": (5, "The Northern Fells", "northern"),
    "great cockup": (5, "The Northern Fells", "northern"),
    "meal fell": (5, "The Northern Fells", "northern"),
    "brae fell": (5, "The Northern Fells", "northern"),
    "mungrisdale common": (5, "The Northern Fells", "northern"),
    "great sca fell": (5, "The Northern Fells", "northern"),
    "high pike": (5, "The Northern Fells", "northern"),  # Caldbeck
    "carrock fell": (5, "The Northern Fells", "northern"),
    "bakestall": (5, "The Northern Fells", "northern"),
    "bannerdale crags": (5, "The Northern Fells", "northern"),
    "ullock pike": (5, "The Northern Fells", "northern"),
    "great calva": (5, "The Northern Fells", "northern"),
    "bowscale fell": (5, "The Northern Fells", "northern"),
    "knott": (5, "The Northern Fells", "northern"),
    "lonscale fell": (5, "The Northern Fells", "northern"),
    "long side": (5, "The Northern Fells", "northern"),
    "carl side": (5, "The Northern Fells", "northern"),
    "skiddaw little man": (5, "The Northern Fells", "northern"),
    "blencathra": (5, "The Northern Fells", "northern"),
    "skiddaw": (5, "The Northern Fells", "northern"),
    # Book 6 North Western
    "castle crag": (6, "The North Western Fells", "north-western"),
    "rannerdale knotts": (6, "The North Western Fells", "north-western"),
    "sale fell": (6, "The North Western Fells", "north-western"),
    "ling fell": (6, "The North Western Fells", "north-western"),
    "catbells": (6, "The North Western Fells", "north-western"),
    "graystones": (6, "The North Western Fells", "north-western"),
    "barrow": (6, "The North Western Fells", "north-western"),
    "barf": (6, "The North Western Fells", "north-western"),
    "broom fell": (6, "The North Western Fells", "north-western"),
    "whinlatter": (6, "The North Western Fells", "north-western"),
    "lord's seat": (6, "The North Western Fells", "north-western"),
    "knott rigg": (6, "The North Western Fells", "north-western"),
    "outerside": (6, "The North Western Fells", "north-western"),
    "ard crags": (6, "The North Western Fells", "north-western"),
    "maiden moor": (6, "The North Western Fells", "north-western"),
    "causey pike": (6, "The North Western Fells", "north-western"),
    "high spy": (6, "The North Western Fells", "north-western"),
    "whiteless pike": (6, "The North Western Fells", "north-western"),
    "scar crags": (6, "The North Western Fells", "north-western"),
    "whiteside": (6, "The North Western Fells", "north-western"),
    "hindscarth": (6, "The North Western Fells", "north-western"),
    "robinson": (6, "The North Western Fells", "north-western"),
    "dale head": (6, "The North Western Fells", "north-western"),
    "hopegill head": (6, "The North Western Fells", "north-western"),
    "wandope": (6, "The North Western Fells", "north-western"),
    "sail": (6, "The North Western Fells", "north-western"),
    "grisedale pike": (6, "The North Western Fells", "north-western"),
    "crag hill": (6, "The North Western Fells", "north-western"),
    "eel crag": (6, "The North Western Fells", "north-western"),
    "grasmoor": (6, "The North Western Fells", "north-western"),
    # Book 7 Western
    "fellbarrow": (7, "The Western Fells", "western"),
    "buckbarrow": (7, "The Western Fells", "western"),
    "low fell": (7, "The Western Fells", "western"),
    "burnbank fell": (7, "The Western Fells", "western"),
    "grike": (7, "The Western Fells", "western"),
    "hen comb": (7, "The Western Fells", "western"),
    "mellbreak": (7, "The Western Fells", "western"),
    "crag fell": (7, "The Western Fells", "western"),
    "gavel fell": (7, "The Western Fells", "western"),
    "lank rigg": (7, "The Western Fells", "western"),
    "blake fell": (7, "The Western Fells", "western"),
    "middle fell": (7, "The Western Fells", "western"),
    "haystacks": (7, "The Western Fells", "western"),
    "great borne": (7, "The Western Fells", "western"),
    "yewbarrow": (7, "The Western Fells", "western"),
    "starling dodd": (7, "The Western Fells", "western"),
    "base brown": (7, "The Western Fells", "western"),
    "fleetwith pike": (7, "The Western Fells", "western"),
    "seatallan": (7, "The Western Fells", "western"),
    "grey knotts": (7, "The Western Fells", "western"),
    "caw fell": (7, "The Western Fells", "western"),
    "brandreth": (7, "The Western Fells", "western"),
    "high crag": (7, "The Western Fells", "western"),
    "red pike": (7, "The Western Fells", "western"),  # Buttermere
    "haycock": (7, "The Western Fells", "western"),
    "green gable": (7, "The Western Fells", "western"),
    "kirk fell": (7, "The Western Fells", "western"),
    "high stile": (7, "The Western Fells", "western"),
    "steeple": (7, "The Western Fells", "western"),
    "red pike": (7, "The Western Fells", "western"),  # Wasdale
    "scoat fell": (7, "The Western Fells", "western"),
    "pillar": (7, "The Western Fells", "western"),
    "great gable": (7, "The Western Fells", "western"),
}

# Section fallback: 34A=5, 34B=use BOOK_MAP, 34C=1 or 2, 34D=4
SECTION_TO_BOOK = {"34A": 5, "34B": None, "34C": 1, "34D": 4}
SECTION_TO_AREA = {"34A": "northern", "34B": None, "34C": "eastern", "34D": "southern"}

VOLUMES = {
    1: "The Eastern Fells",
    2: "The Far Eastern Fells",
    3: "The Central Fells",
    4: "The Southern Fells",
    5: "The Northern Fells",
    6: "The North Western Fells",
    7: "The Western Fells",
}

# Wikipedia table data: (name, section, height, grid_ref)
# Parsed from the file - rank 1-214
WAINWRIGHTS_DATA = [
    (1, "Scafell Pike", "34B", 978, "NY 215 072"),
    (2, "Scafell", "34B", 964, "NY 206 064"),
    (3, "Helvellyn", "34C", 950, "NY 342 151"),
    (4, "Skiddaw", "34A", 931, "NY 260 290"),
    (5, "Great End", "34B", 910, "NY 226 083"),
    (6, "Bowfell", "34B", 903, "NY 244 064"),
    (7, "Great Gable", "34B", 899, "NY 211 103"),
    (8, "Pillar", "34B", 892, "NY 171 121"),
    (9, "Nethermost Pike", "34C", 891, "NY 343 142"),
    (10, "Catstye Cam", "34C", 890, "NY 348 158"),
    (11, "Esk Pike", "34B", 885, "NY 236 075"),
    (12, "Raise", "34C", 883, "NY 342 174"),
    (13, "Fairfield", "34C", 873, "NY 358 117"),
    (14, "Blencathra (Hallsfell Top)", "34A", 868, "NY 323 277"),
    (15, "Skiddaw Little Man", "34A", 865, "NY 266 277"),
    (16, "White Side", "34C", 863, "NY 337 166"),
    (17, "Crinkle Crags (Long Top)", "34B", 859, "NY 248 048"),
    (18, "Dollywaggon Pike", "34C", 858, "NY 346 130"),
    (19, "Great Dodd", "34C", 857, "NY 342 205"),
    (20, "Grasmoor", "34B", 852, "NY 174 203"),
    (21, "Stybarrow Dodd", "34C", 843, "NY 343 189"),
    (22, "Scoat Fell", "34B", 841, "NY 159 113"),
    (23, "St Sunday Crag", "34C", 841, "NY 369 133"),
    (24, "Crag Hill [Eel Crag]", "34B", 839, "NY 192 203"),
    (25, "High Street", "34C", 828, "NY 440 110"),
    (26, "Red Pike (Wasdale)", "34B", 826, "NY 165 106"),
    (27, "Hart Crag", "34C", 822, "NY 369 112"),
    (28, "Steeple", "34B", 819, "NY 157 116"),
    (29, "Lingmell", "34B", 807, "NY 209 081"),
    (30, "High Stile", "34B", 806, "NY 167 147"),
    (31, "The Old Man of Coniston", "34D", 802, "SD 272 978"),
    (32, "Swirl How", "34D", 802, "NY 272 005"),
    (33, "Kirk Fell", "34B", 802, "NY 194 104"),
    (34, "High Raise (High Street)", "34C", 802, "NY 448 134"),
    (35, "Green Gable", "34B", 801, "NY 214 107"),
    (36, "Haycock", "34B", 797, "NY 144 107"),
    (37, "Brim Fell", "34D", 796, "SD 270 985"),
    (38, "Rampsgill Head", "34C", 792, "NY 443 128"),
    (39, "Dove Crag", "34C", 792, "NY 374 104"),
    (40, "Grisedale Pike", "34B", 791, "NY 198 225"),
    (41, "Watson's Dodd", "34C", 789, "NY 335 195"),
    (42, "Allen Crags", "34B", 785, "NY 236 085"),
    (43, "Great Carrs", "34D", 785, "NY 270 009"),
    (44, "Thornthwaite Crag", "34C", 784, "NY 431 100"),
    (45, "Glaramara", "34B", 783, "NY 245 104"),
    (46, "Kidsty Pike", "34C", 780, "NY 447 125"),
    (47, "Harter Fell (Mardale)", "34C", 779, "NY 459 093"),
    (48, "Dow Crag", "34D", 778, "SD 262 977"),
    (49, "Red Screes", "34C", 776, "NY 396 087"),
    (50, "Sail", "34B", 773, "NY 198 202"),
    (51, "Grey Friar", "34D", 773, "NY 260 003"),
    (52, "Wandope", "34B", 772, "NY 188 197"),
    (53, "Hopegill Head", "34B", 770, "NY 185 221"),
    (54, "Great Rigg", "34C", 766, "NY 355 104"),
    (55, "Stony Cove Pike", "34C", 763, "NY 417 100"),
    (56, "Wetherlam", "34D", 763, "NY 288 011"),
    (57, "High Raise [Langdale]", "34B", 762, "NY 280 095"),
    (58, "Slight Side", "34B", 762, "NY 209 050"),
    (59, "Mardale Ill Bell", "34C", 760, "NY 447 101"),
    (60, "Ill Bell", "34C", 757, "NY 436 077"),
    (61, "Hart Side", "34C", 756, "NY 359 197"),
    (62, "Red Pike (Buttermere)", "34B", 755, "NY 160 154"),
    (63, "Dale Head", "34B", 753, "NY 222 153"),
    (64, "Carl Side", "34A", 746, "NY 254 280"),
    (65, "High Crag (Buttermere)", "34B", 744, "NY 180 139"),
    (66, "The Knott (High Street)", "34C", 739, "NY 437 126"),
    (67, "Robinson", "34B", 737, "NY 201 168"),
    (68, "Seat Sandal", "34C", 737, "NY 344 115"),
    (69, "Harrison Stickle", "34B", 736, "NY 281 074"),
    (70, "Sergeant Man", "34B", 736, "NY 286 088"),
    (71, "Long Side", "34A", 734, "NY 248 284"),
    (72, "Kentmere Pike", "34C", 730, "NY 465 077"),
    (73, "Hindscarth", "34B", 727, "NY 215 165"),
    (74, "Ullscarf", "34B", 726, "NY 291 121"),
    (75, "Clough Head", "34C", 726, "NY 333 225"),
    (76, "Thunacar Knott", "34B", 723, "NY 279 079"),
    (77, "Froswick", "34C", 720, "NY 435 085"),
    (78, "Birkhouse Moor", "34C", 718, "NY 363 159"),
    (79, "Lonscale Fell", "34A", 715, "NY 285 271"),
    (80, "Brandreth", "34B", 715, "NY 214 119"),
    (81, "Branstree", "34C", 713, "NY 478 099"),
    (82, "Knott", "34A", 710, "NY 296 329"),
    (83, "Pike of Stickle", "34B", 709, "NY 273 073"),
    (84, "Whiteside [West Top]", "34B", 707, "NY 170 219"),
    (85, "Yoke", "34C", 706, "NY 437 067"),
    (86, "Pike of Blisco", "34B", 705, "NY 271 042"),
    (87, "Bowscale Fell", "34A", 702, "NY 333 305"),
    (88, "Cold Pike", "34B", 701, "NY 262 036"),
    (89, "Pavey Ark", "34B", 700, "NY 284 079"),
    (90, "Gray Crag", "34C", 699, "NY 427 117"),
    (91, "Grey Knotts", "34B", 697, "NY 217 125"),
    (92, "Caw Fell", "34B", 697, "NY 132 109"),
    (93, "Rest Dodd", "34C", 696, "NY 432 136"),
    (94, "Seatallan", "34B", 692, "NY 140 084"),
    (95, "Ullock Pike", "34A", 690, "NY 244 287"),
    (96, "Great Calva", "34A", 690, "NY 290 311"),
    (97, "Bannerdale Crags", "34A", 683, "NY 335 290"),
    (98, "Loft Crag", "34B", 680, "NY 277 071"),
    (99, "Sheffield Pike", "34C", 675, "NY 369 181"),
    (100, "Bakestall", "34A", 673, "NY 266 308"),
    (101, "Scar Crags", "34B", 672, "NY 208 206"),
    (102, "Loadpot Hill", "34C", 672, "NY 456 180"),
    (103, "Wether Hill", "34C", 671, "NY 455 167"),
    (104, "Tarn Crag (Sleddale)", "34C", 664, "NY 488 078"),
    (105, "Carrock Fell", "34A", 663, "NY 341 336"),
    (106, "Whiteless Pike", "34B", 660, "NY 180 189"),
    (107, "High Pike (Caldbeck)", "34A", 658, "NY 318 350"),
    (108, "Place Fell", "34C", 657, "NY 405 169"),
    (109, "High Pike (Scandale)", "34C", 656, "NY 374 088"),
    (110, "Selside Pike", "34C", 655, "NY 490 111"),
    (111, "Middle Dodd", "34C", 654, "NY 397 095"),
    (112, "Harter Fell (Eskdale)", "34D", 654, "SD 218 997"),
    (113, "High Spy", "34B", 653, "NY 234 162"),
    (114, "Great Sca Fell", "34A", 651, "NY 291 339"),
    (115, "Rossett Pike", "34B", 651, "NY 249 075"),
    (116, "Fleetwith Pike", "34B", 649, "NY 205 141"),
    (117, "Base Brown", "34B", 646, "NY 225 114"),
    (118, "Grey Crag [Sleddale]", "34C", 638, "NY 497 072"),
    (119, "Causey Pike", "34B", 637, "NY 218 208"),
    (120, "Little Hart Crag", "34C", 637, "NY 387 100"),
    (121, "Starling Dodd", "34B", 633, "NY 142 157"),
    (122, "Mungrisdale Common", "34A", 633, "NY 310 292"),
    (123, "Yewbarrow", "34B", 627, "NY 173 084"),
    (124, "Birks", "34C", 622, "NY 380 143"),
    (125, "Hartsop Dodd", "34C", 618, "NY 411 118"),
    (126, "Great Borne", "34B", 616, "NY 123 163"),
    (127, "Heron Pike", "34C", 612, "NY 355 083"),
    (128, "Illgill Head", "34B", 609, "NY 168 049"),
    (129, "High Seat", "34B", 608, "NY 287 180"),
    (130, "Seathwaite Fell", "34B", 601, "NY 229 101"),
    (131, "Haystacks (Buttermere)", "34B", 597, "NY 193 131"),
    (132, "Bleaberry Fell", "34B", 590, "NY 285 195"),
    (133, "Shipman Knotts", "34C", 587, "NY 472 062"),
    (134, "Brae Fell", "34A", 586, "NY 288 351"),
    (135, "Middle Fell", "34B", 582, "NY 150 072"),
    (136, "Ard Crags", "34B", 581, "NY 206 197"),
    (137, "Hartsop Above How", "34C", 581, "NY 383 120"),
    (138, "The Nab", "34C", 576, "NY 434 151"),
    (139, "Maiden Moor", "34B", 575, "NY 236 181"),
    (140, "Blake Fell", "34B", 573, "NY 110 196"),
    (141, "Sergeant's Crag", "34B", 571, "NY 273 113"),
    (142, "Outerside", "34B", 568, "NY 211 214"),
    (143, "Angletarn Pikes", "34C", 567, "NY 413 148"),
    (144, "Brock Crags", "34C", 561, "NY 416 136"),
    (145, "Knott Rigg", "34B", 556, "NY 197 188"),
    (146, "Steel Fell", "34B", 553, "NY 319 111"),
    (147, "Lord's Seat", "34A", 552, "NY 204 265"),
    (148, "Rosthwaite Fell", "34B", 551, "NY 258 124"),
    (149, "Meal Fell", "34A", 550, "NY 283 337"),
    (150, "Tarn Crag (Easedale)", "34B", 549, "NY 303 093"),
    (151, "Hard Knott", "34B", 549, "NY 231 023"),
    (152, "Blea Rigg", "34B", 541, "NY 301 078"),
    (153, "Lank Rigg", "34B", 541, "NY 091 119"),
    (154, "Calf Crag", "34B", 537, "NY 301 104"),
    (155, "Whin Rigg", "34B", 537, "NY 151 035"),
    (156, "Great Mell Fell", "34C", 537, "NY 396 253"),
    (157, "Arthur's Pike", "34C", 533, "NY 460 206"),
    (158, "Great Cockup", "34A", 526, "NY 273 333"),
    (159, "Gavel Fell", "34B", 526, "NY 116 183"),
    (160, "Eagle Crag", "34B", 525, "NY 275 121"),
    (161, "Bonscale Pike", "34C", 524, "NY 453 200"),
    (162, "Crag Fell", "34B", 523, "NY 097 143"),
    (163, "Souther Fell", "34A", 522, "NY 354 291"),
    (164, "High Hartsop Dodd", "34C", 519, "NY 393 107"),
    (165, "Whinlatter", "34A", 517, "NY 191 251"),
    (166, "Sallows", "34C", 516, "NY 436 039"),
    (167, "High Tove", "34B", 515, "NY 289 165"),
    (168, "Mellbreak", "34B", 512, "NY 148 186"),
    (169, "Broom Fell", "34A", 511, "NY 194 271"),
    (170, "Hen Comb", "34B", 509, "NY 132 181"),
    (171, "Beda Fell", "34C", 509, "NY 428 171"),
    (172, "Low Pike", "34C", 508, "NY 373 078"),
    (173, "Little Mell Fell", "34C", 505, "NY 423 240"),
    (174, "Stone Arthur", "34C", 504, "NY 347 092"),
    (175, "Dodd (Skiddaw)", "34A", 502, "NY 244 273"),
    (176, "Green Crag", "34D", 489, "SD 200 982"),
    (177, "Grike", "34B", 488, "NY 084 140"),
    (178, "Baystones [Wansfell]", "34C", 487, "NY 403 051"),
    (179, "Longlands Fell", "34A", 483, "NY 275 354"),
    (180, "Sour Howes", "34C", 483, "NY 427 032"),
    (181, "Gowbarrow Fell", "34C", 481, "NY 407 218"),
    (182, "Burnbank Fell", "34B", 475, "NY 110 209"),
    (183, "Armboth Fell", "34B", 475, "NY 295 157"),
    (184, "Lingmoor Fell", "34B", 470, "NY 302 046"),
    (185, "Barf", "34A", 469, "NY 214 267"),
    (186, "Raven Crag", "34B", 461, "NY 303 187"),
    (187, "Barrow", "34B", 455, "NY 227 218"),
    (188, "Graystones", "34A", 452, "NY 176 266"),
    (189, "Catbells", "34B", 451, "NY 244 198"),
    (190, "Nab Scar", "34C", 450, "NY 355 072"),
    (191, "Great Crag", "34B", 449, "NY 270 146"),
    (192, "Binsey", "34A", 447, "NY 225 355"),
    (193, "Glenridding Dodd", "34C", 442, "NY 380 175"),
    (194, "Arnison Crag", "34C", 433, "NY 393 149"),
    (195, "Steel Knotts", "34C", 432, "NY 440 181"),
    (196, "Low Fell", "34B", 423, "NY 137 226"),
    (197, "Buckbarrow", "34B", 423, "NY 135 061"),
    (198, "Gibson Knott", "34B", 420, "NY 316 100"),
    (199, "Fellbarrow (Mosser Fell)", "34B", 416, "NY 132 242"),
    (200, "Grange Fell", "34B", 416, "NY 264 162"),
    (201, "Helm Crag", "34B", 405, "NY 326 093"),
    (202, "Silver How", "34B", 395, "NY 324 066"),
    (203, "Hallin Fell", "34C", 388, "NY 433 198"),
    (204, "Walla Crag", "34B", 379, "NY 276 212"),
    (205, "Ling Fell", "34A", 373, "NY 179 285"),
    (206, "Latrigg", "34A", 368, "NY 279 247"),
    (207, "Troutbeck Tongue", "34C", 364, "NY 422 064"),
    (208, "Sale Fell", "34A", 359, "NY 194 296"),
    (209, "High Rigg", "34C", 357, "NY 308 219"),
    (210, "Rannerdale Knotts", "34B", 355, "NY 167 182"),
    (211, "Loughrigg Fell", "34B", 335, "NY 346 051"),
    (212, "Black Fell", "34D", 323, "NY 340 015"),
    (213, "Holme Fell", "34D", 317, "NY 315 006"),
    (214, "Castle Crag", "34B", 290, "NY 249 159"),
]

EXISTING_SLUGS = {
    "scafell-pike", "helvellyn", "skiddaw", "blencathra", "great-gable",
    "bowfell", "crinkle-crags", "high-street", "pike-o-stickle", "harrison-stickle",
    "fairfield", "coniston-old-man", "catbells", "grisedale-pike", "causey-pike",
    "red-pike-buttermere", "dale-head", "wetherlam", "ill-bell", "place-fell"
}


def to_slug(name):
    """Convert name to kebab-case slug, handling parentheticals."""
    # Known normalizations for slugs that match existing entries
    name_lower = name.lower()
    if 'old man of coniston' in name_lower or 'coniston old man' in name_lower:
        return 'coniston-old-man'
    if 'pike of stickle' in name_lower or "pike o'stickle" in name_lower:
        return 'pike-o-stickle'
    if 'crinkle crags' in name_lower and 'long top' in name_lower:
        return 'crinkle-crags'
    if 'blencathra' in name_lower and 'hallsfell' in name_lower:
        return 'blencathra'
    # Remove bracketed parts like [Eel Crag], [West Top], [Langdale]
    clean = re.sub(r'\s*\[[^\]]*\]', '', name)
    # Handle parentheticals: "Red Pike (Wasdale)" -> "red-pike-wasdale"
    clean = clean.replace('(', ' ').replace(')', '')
    # Normalize
    clean = clean.strip().lower()
    clean = re.sub(r'[^\w\s-]', '', clean)
    clean = re.sub(r'\s+', '-', clean)
    clean = re.sub(r'-+', '-', clean).strip('-')
    return clean


def get_display_name(name):
    """Get display name, preserving parentheticals like Red Pike (Wasdale)."""
    # Remove bracketed parts for display
    clean = re.sub(r'\s*\[[^\]]*\]', '', name).strip()
    # Keep parentheticals like (Wasdale), (Buttermere), (Mardale), (Eskdale), (Skiddaw), (Sleddale), (Easedale), (High Street), (Caldbeck), (Scandale)
    return clean


def os_grid_to_lat_lon(grid_ref):
    """Convert OS grid ref to approximate lat/lon. NY and SD squares.
    Format: NY 215 072 = easting 321500, northing 507200 (pad 3 digits to 5)."""
    clean = grid_ref.replace(' ', '')
    m = re.match(r'([A-Z]{2})\s*(\d{2,3})\s*(\d{2,3})', grid_ref.replace(' ', ''))
    if not m:
        return 54.4, -3.0
    sq, e_str, n_str = m.group(1), m.group(2), m.group(3)
    e, n = int(e_str), int(n_str)
    # Pad to 5 digits: 215 -> 21500, 072 -> 07200
    if e < 1000:
        e = e * 100
    if n < 1000:
        n = n * 100
    if sq == 'NY':
        easting = 300000 + e
        northing = 500000 + n
        lat = 54.4 + (northing - 500000) / 90000
        lon = -3.0 - (easting - 320000) / 70000
    elif sq == 'SD':
        easting = 200000 + e
        northing = 90000 + n
        lat = 54.35 + (northing - 90000) / 90000
        lon = -3.1 - (easting - 250000) / 70000
    else:
        lat, lon = 54.4, -3.0
    return round(lat, 4), round(lon, 4)


def get_book_and_area(name, section):
    """Get wainwright book and area from name and section."""
    # Normalize name for lookup
    base = name.split('(')[0].strip().lower()
    base = base.replace('[', ' ').replace(']', ' ').split()[0] if '[' in base else base
    base = re.sub(r'\s+', ' ', base).strip()

    # Handle specific names
    name_lower = name.lower()
    if 'high raise' in name_lower and 'langdale' in name_lower:
        return 3, "The Central Fells", "central"
    if 'high raise' in name_lower and 'high street' in name_lower:
        return 2, "The Far Eastern Fells", "far-eastern"
    if 'tarn crag' in name_lower and 'easedale' in name_lower:
        return 3, "The Central Fells", "central"
    if 'tarn crag' in name_lower and 'sleddale' in name_lower:
        return 2, "The Far Eastern Fells", "far-eastern"
    if 'grey crag' in name_lower and 'sleddale' in name_lower:
        return 2, "The Far Eastern Fells", "far-eastern"
    if 'high pike' in name_lower and 'caldbeck' in name_lower:
        return 5, "The Northern Fells", "northern"
    if 'high pike' in name_lower and 'scandale' in name_lower:
        return 1, "The Eastern Fells", "eastern"
    if 'harter fell' in name_lower and 'mardale' in name_lower:
        return 2, "The Far Eastern Fells", "far-eastern"
    if 'harter fell' in name_lower and 'eskdale' in name_lower:
        return 4, "The Southern Fells", "southern"
    if 'red pike' in name_lower and 'wasdale' in name_lower:
        return 7, "The Western Fells", "western"
    if 'red pike' in name_lower and 'buttermere' in name_lower:
        return 7, "The Western Fells", "western"
    if 'crag hill' in name_lower or 'eel crag' in name_lower:
        return 6, "The North Western Fells", "north-western"
    if 'dodd' in name_lower and 'skiddaw' in name_lower:
        return 5, "The Northern Fells", "northern"
    if 'the knott' in name_lower and 'high street' in name_lower:
        return 2, "The Far Eastern Fells", "far-eastern"
    if 'baystones' in name_lower or 'wansfell' in name_lower:
        return 2, "The Far Eastern Fells", "far-eastern"
    if 'high crag' in name_lower and 'buttermere' in name_lower:
        return 7, "The Western Fells", "western"
    if 'whiteside' in name_lower and 'west top' in name_lower:
        return 6, "The North Western Fells", "north-western"
    if 'fellbarrow' in name_lower:
        return 7, "The Western Fells", "western"

    # Try BOOK_MAP with normalized key
    key = re.sub(r'[\[\]\(\)]', ' ', name.lower())
    key = re.sub(r'\s+', ' ', key).strip()
    key = key.split('(')[0].strip()
    for k, v in BOOK_MAP.items():
        if k in key or key in k:
            return v

    # Fallback from section
    if section == "34A":
        return 5, "The Northern Fells", "northern"
    if section == "34C":
        return 1, "The Eastern Fells", "eastern"
    if section == "34D":
        return 4, "The Southern Fells", "southern"
    # 34B - default central
    return 3, "The Central Fells", "central"


def get_difficulty(height):
    if height < 450:
        return "easy"
    if height < 600:
        return "moderate"
    if height < 800:
        return "challenging"
    return "strenuous"


def get_start_postcode(area, grid_ref):
    """Get area-appropriate start postcode."""
    if "NY" in grid_ref:
        if area in ("northern", "north-western"):
            return "CA12 5JR"  # Keswick
        if area == "western":
            return "CA20 1EX"  # Wasdale
        if area == "southern":
            return "LA22 9JU"  # Langdale
        if area in ("eastern", "far-eastern"):
            return "CA11 0PD"  # Patterdale
        if area == "central":
            return "CA12 5JR"  # Keswick
    if "SD" in grid_ref:
        return "LA21 8EH"  # Coniston
    return "CA12 5JR"


def main():
    missing = []
    for rank, name, section, height, grid_ref in WAINWRIGHTS_DATA:
        slug = to_slug(name)
        if slug in EXISTING_SLUGS:
            continue

        display_name = get_display_name(name)
        lat, lon = os_grid_to_lat_lon(grid_ref)
        book, volume, area = get_book_and_area(name, section)
        difficulty = get_difficulty(height)
        postcode = get_start_postcode(area, grid_ref)

        # Route distance/ascent estimates from height
        if height >= 800:
            dist, ascent, time, route_diff = "6-8 miles", "900m", "6-7 hours", "strenuous"
        elif height >= 600:
            dist, ascent, time, route_diff = "5-6 miles", "700m", "4-6 hours", "challenging"
        elif height >= 450:
            dist, ascent, time, route_diff = "4-5 miles", "500m", "3-5 hours", "moderate"
        else:
            dist, ascent, time, route_diff = "3-4 miles", "400m", "2-4 hours", "easy"

        route_name = "Standard route"
        if area == "western":
            route_name = "Wasdale"
        elif area == "southern":
            route_name = "Langdale" if "NY" in grid_ref else "Coniston"
        elif area in ("eastern", "far-eastern"):
            route_name = "Patterdale"
        elif area in ("northern", "north-western"):
            route_name = "Keswick" if area == "northern" else "Braithwaite"

        fell = f'''  {{
    slug: "{slug}",
    name: "{display_name}",
    height: {height},
    osGridRef: "{grid_ref}",
    latitude: {lat},
    longitude: {lon},
    wainwrightBook: {book},
    wainwrightVolume: "{volume}",
    area: "{area}",
    difficulty: "{difficulty}",
    summitDescription: "A Wainwright fell in the {volume.replace('The ', '')}.",
    walkingDescription: "Standard walking routes available. Check conditions before setting out.",
    routes: [
      {{ name: "{route_name}", distance: "{dist}", ascent: "{ascent}", time: "{time}", difficulty: "{route_diff}", startPostcode: "{postcode}", startDescription: "Nearest car park" }},
    ],
    tips: "Check MWIS before you go.",
    nearbyTarns: [],
    nearbySummits: [],
    nearbyDining: [{{ name: "Nearest pub", type: "Pub", distance: "1 mile" }}],
    featured: false,
  }}'''
        missing.append(fell)

    print(f"// {len(missing)} missing fells generated")
    print(",\n".join(missing))


if __name__ == "__main__":
    main()
