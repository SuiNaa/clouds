import {
   world,
   system,
   ItemStack,
   Dimension,
   StructureManager,
   StructureAnimationMode,
   StructureMirrorAxis,
   StructureRotation,
   EquipmentSlot,
   GameMode,
   Player,
   BlockPermutation
} from "@minecraft/server";
import {
   ActionFormData,
   ModalFormData,
   MessageFormData
} from "@minecraft/server-ui";
const playerUndoStacks = new Map();
const FREE_MODE_ID = "eerf".split("")
   .reverse().join("");
const PAID_MODE_ID = "paid";
const REQUIRED_BLOCK_MODE_ID =
   "required";
const XP_LEVEL_MODE_ID = "level_px"
   .split("").reverse().join("");
const SMALL_VOLUME_THRESHOLD = 0xac720 ^
   0xac75d;
const MEDIUM_VOLUME_THRESHOLD =
   0xea4e6 ^ 0xea9c9;
const LARGE_VOLUME_THRESHOLD = 0xa3723 ^
   0xa0a2a;
const PAID_MODE_ITEM_ID_PROP =
   "bony_struct_cfg:paidItemId";
const COST_SMALL_PROP =
   "bony_struct_cfg:costSmall";
const COST_MEDIUM_PROP =
   "muideMtsoc:gfc_tcurts_ynob".split(
      "").reverse().join("");
const COST_LARGE_PROP =
   "bony_struct_cfg:costLarge";
const DEFAULT_PAID_ITEM_ID =
   "minecraft:emerald";
const DEFAULT_COST_SMALL = 0xa074a ^
   0xa074f;
const DEFAULT_COST_MEDIUM = 0x6b0b5 ^
   0x6b0bf;
const DEFAULT_COST_LARGE = 0xaad82 ^
   0xaad96;
const paymentItemOptions = new Map([
   ["綠寶石", // "Emerald" → 綠寶石
      "minecraft:emerald"],
   ["鑽石", // "Diamond" → 鑽石
      "minecraft:diamond"],
   ['鐵錠', // 'Iron Ingot' → 鐵錠
      "minecraft:iron_ingot"
   ],
   ['金錠', // 'Gold Ingot' → 金錠
      "minecraft:gold_ingot"
   ],
   ['地獄合金錠', // 'Netherite Ingot' → 地獄合金錠
      "togni_etirehten:tfarcenim"
      .split("").reverse().join(
         "")
   ]
]);
const paymentItemDisplayNames = [...
   paymentItemOptions['keys']()
];
const paymentItemIds = [...
   paymentItemOptions["values"]()
];
const MAX_REQUIRED_TYPES = 0x3176a ^
   0x31760;
const REQ_PERC_SMALL_PROP =
   "llamScrePqer:gfc_tcurts_ynob".split(
      "").reverse().join("");
const REQ_PERC_MEDIUM_PROP =
   "bony_struct_cfg:reqPercMedium";
const REQ_PERC_LARGE_PROP =
   "bony_struct_cfg:reqPercLarge";
const REQ_PERC_HUGE_PROP =
   "bony_struct_cfg:reqPercHuge";
const DEFAULT_REQ_PERC_SMALL = 0x607db ^
   0x607bf;
const DEFAULT_REQ_PERC_MEDIUM =
   0x4253f ^ 0x42565;
const DEFAULT_REQ_PERC_LARGE = 0xc6f5b ^
   0xc6f10;
const DEFAULT_REQ_PERC_HUGE = 0xd911f ^
   0xd912d;
const XP_LEVEL_COST_SMALL_PROP =
   "bony_struct_cfg:xpLevelCostSmall";
const XP_LEVEL_COST_MEDIUM_PROP =
   "bony_struct_cfg:xpLevelCostMedium";
const XP_LEVEL_COST_LARGE_PROP =
   "bony_struct_cfg:xpLevelCostLarge";
const XP_LEVEL_COST_HUGE_PROP =
   "bony_struct_cfg:xpLevelCostHuge";
const DEFAULT_XP_LEVEL_COST_SMALL =
   0x89b7f ^ 0x89b7e;
const DEFAULT_XP_LEVEL_COST_MEDIUM =
   0xe033b ^ 0xe0338;
const DEFAULT_XP_LEVEL_COST_LARGE =
   0x1cc86 ^ 0x1cc81;
const DEFAULT_XP_LEVEL_COST_HUGE =
   0x5d2f3 ^ 0x5d2fc;
const MAX_STRUCTURES = 0x2d3b6 ^
0x2d384;
const MIN_SPACING = 0x8778b ^ 0x8778a;
const MAX_SPACING = 0x3b376 ^ 0x3b344;
const PLACE_INTERVAL = 0xed222 ^
0xed227;
const OUTLINE_INTERVAL = 0xcfe73 ^
   0xcfe79;
const structureDefaults = {
   "mystructure:as_1": -(0x32621 ^
      0x32624),
   "mystructure:mh_2": -(0x4a6c2 ^
      0x4a6c0),
   "mystructure:mh_3": -(0x69873 ^
      0x69870),
   'mystructure:mh_4': -(0x400bf ^
      0x400bc),
   "mystructure:mh_5": -(0x69495 ^
      0x69494),
   "mystructure:mh_6": -(0x1adc7 ^
      0x1adce),
   "mystructure:mh_7": -(0x596e5 ^
      0x596e7),
   'mystructure:mh_8': -(0x93392 ^
      0x93393),
   'mystructure:mh_9': -(0x95756 ^
      0x95754),
   "mystructure:mh_10": -(0x25686 ^
      0x25684),
   'mystructure:mh_11': -(0x73139 ^
      0x7313b),
   "mystructure:mh_12": -(0x9eb9a ^
      0x9eb98),
   'mystructure:mh_13': -(0x9f49c ^
      0x9f49e),
   "mystructure:mh_14": -(0x1ea06 ^
      0x1ea07),
   "mystructure:mh_15": -(0x9a2a5 ^
      0x9a2a7),
   "mystructure:mh_16": -(0x357a2 ^
      0x357a3),
   'mystructure:mh_17': -(0xbd263 ^
      0xbd261),
   "mystructure:mh_18": -(0xb5b05 ^
      0xb5b04),
   "mystructure:mh_19": -(0x49197 ^
      0x49195),
   "mystructure:mh_20": -(0xd0ff9 ^
      0xd0ffb),
   'mystructure:mh_21': -(0x3fa8b ^
      0x3fa8a),
   'mystructure:mh_22': -(0x81085 ^
      0x81084),
   "mystructure:mh_23": -(0x52aef ^
      0x52aee),
   "mystructure:mh_24": -(0xcd32c ^
      0xcd32d),
   "mystructure:mh_25": -(0xe6b51 ^
      0xe6b50),
   'mystructure:mh_26': -(0xbf790 ^
      0xbf791),
   "mystructure:md_1": 0x1,
   "mystructure:md_3": 0x1,
   "mystructure:md_5": -(0xc02f0 ^
      0xc02f1),
   "mystructure:md_6": -(0x4abb1 ^
      0x4abb0),
   "mystructure:md_7": -(0xb2407 ^
      0xb2406),
   "mystructure:md_10": -(0x2cd6e ^
      0x2cd6d),
   "mystructure:md_11": -(0x4a281 ^
      0x4a28b),
   'mystructure:md_12': -(0xce810 ^
      0xce812),
   'mystructure:md_13': -(0x7149f ^
      0x7149e),
   "mystructure:md_14": -(0x9ceb6 ^
      0x9ceb7),
   'mystructure:md_15': -(0x626f8 ^
      0x626f9),
   'mystructure:md_16': -(0x5021a ^
      0x5021b),
   "mystructure:md_17": -(0x73297 ^
      0x73296),
   "mystructure:md_18": -(0x5b692 ^
      0x5b693),
   "mystructure:md_19": -(0xbeb65 ^
      0xbeb64),
   "mystructure:md_20": -(0x50b6c ^
      0x50b6d),
   'mystructure:cb_1': -(0x62bbf ^
      0x62bbe),
   'mystructure:vf': 0x0,
   "mystructure:gf": 0x0,
   'mystructure:Pf': 0x0,
   'mystructure:mf': 0x0,
   'mystructure:cts_farm': 0x0,
   "mystructure:chicken_farm": 0x0,
   'mystructure:auto_smelter': 0x0,
   "mystructure:auto_cooker": 0x0,
   "mystructure:cb_0": 0x0,
   "mystructure:cb_2": 0x0,
   "mystructure:as_0": 0x0,
   ...Object['fromEntries'](Array[
      "from"]({
         'length': 0xa
      }, (_0xd4f308,
      _0x1e30e2) => [
         "_eert:erutcurtsym"
         .split("").reverse()
         .join("") + (_0x1e30e2 +
            (0x1bfbc ^ 0x1bfbd))[
            'toString']()[
            'padStart'](0xa7055 ^
            0xa7057, "0"),
         0x8af76 ^ 0x8af76
      ])),
   ...Object['fromEntries'](Array[
      "from"]({
         'length': 0x9
      }, (_0x303f6d,
      _0x34dbee) => [
         "mystructure:tree_mr" + (
            _0x34dbee + (0xdef72 ^
               0xdef73)),
         0x87050 ^ 0x87050
      ])),
   "mystructure:tree_ct1": 0x0,
   'mystructure:tree_ct2': 0x0,
   'mystructure:tree_ct3': 0x0,
   "mystructure:tree_ct4": 0x0,
   "mystructure:tree_ct5": 0x0,
   'mystructure:tree_oak': 0x0,
   'mystructure:tree_orange': 0x0,
   'mystructure:tree_pink': 0x0,
   "mystructure:tree_white": 0x0,
   'mystructure:rs_charmender': 0x0,
   "mystructure:rs_chikorita": 0x0,
   "mystructure:rs_blooper": 0x0,
   "mystructure:cow": 0x0
};

function getPlayerUndoStack(_0x5684bf) {
   if (!playerUndoStacks["has"](
         _0x5684bf['id'])) {
      playerUndoStacks["set"](_0x5684bf[
         'id'], []);
   }
   return playerUndoStacks["get"](
      _0x5684bf["id"]);
}

function clearPlayerUndoStack(
_0x27f15b) {
   if (playerUndoStacks["has"](
         _0x27f15b["id"])) {
      playerUndoStacks['delete'](
         _0x27f15b["id"]);
   }
}

function analyzeStructure(_0x5e4059) {
   try {
      const _0x13964b = world[
         "structureManager"]["get"](
         _0x5e4059);
      if (!_0x13964b) {
         console["warn"](
            '[analyzeStructure]\x20Structure\x20not\x20found:\x20' +
            _0x5e4059);
         return null;
      }
      const _0x1bed97 = new Map();
      const {
         x: _0x161e1c,
         y: _0x443466,
         z: _0x34c8a1
      } = _0x13964b["size"];
      for (let _0x4d254f = 0x6d17f ^
            0x6d17f; _0x4d254f <
         _0x161e1c; _0x4d254f++) {
         for (let _0x2b4876 = 0xc57d6 ^
               0xc57d6; _0x2b4876 <
            _0x443466; _0x2b4876++) {
            for (let _0x4f2af7 =
                  0x627c3 ^
                  0x627c3; _0x4f2af7 <
               _0x34c8a1; _0x4f2af7++) {
               try {
                  const _0x4489bc =
                     _0x13964b[
                        "getBlockPermutation"
                        ]({
                        "x": _0x4d254f,
                        "y": _0x2b4876,
                        "z": _0x4f2af7
                     });
                  if (_0x4489bc) {
                     const _0x22e3c8 =
                        _0x4489bc[
                           'type'][
                        "id"];
                     if (_0x22e3c8 !==
                        "ria:tfarcenim"
                        .split("")
                        .reverse().join(
                           "") &&
                        _0x22e3c8 !==
                        "minecraft:structure_void"
                        ) {
                        _0x1bed97['set']
                           (_0x22e3c8, (
                              _0x1bed97[
                                 "get"
                                 ](
                                 _0x22e3c8
                                 ) ||
                              0x2ca7f ^
                              0x2ca7f
                              ) + (
                              0x49364 ^
                              0x49365
                              ));
                     }
                  }
               } catch (_0x1497f0) {}
            }
         }
      }
      return _0x1bed97;
   } catch (_0x313024) {
      console['error'](
         '[analyzeStructure]\x20Error\x20analyzing\x20' +
         _0x5e4059 + ':\x20' +
         _0x313024 + '\x0a' +
         _0x313024["stack"]);
      return null;
   }
}

function checkPlayerPaymentItem(
   _0xf69c76, _0x5602ce, _0x34f778,
   _0x3bcbe7) {
   if (_0x34f778 <= (0x2c733 ^ 0x2c733))
      return !![];
   _0x3bcbe7 = 0x38644 ^ 0x38644;
   const _0x54854f = _0xf69c76[
      "getComponent"](
      "yrotnevni:tfarcenim".split("")
      .reverse().join(""))?.[
      "container"
   ];
   if (!_0x54854f) {
      console["warn"](
         '[checkPlayerPaymentItem]\x20Could\x20not\x20get\x20inventory\x20for\x20' +
         _0xf69c76['name']);
      return ![];
   }
   for (let _0x2ac839 = 0xe3fe0 ^
         0xe3fe0; _0x2ac839 < _0x54854f[
         'size']; _0x2ac839++) {
      const _0x118589 = _0x54854f[
         "getItem"](_0x2ac839);
      if (_0x118589?.["typeId"] ===
         _0x5602ce) {
         _0x3bcbe7 += _0x118589[
            "amount"];
         if (_0x3bcbe7 >= _0x34f778) {
            return !![];
         }
      }
   }
   return ![];
}

function removePlayerPaymentItem(
   _0x17e455, _0x4e8d98, _0x2f1f0f) {
   if (_0x2f1f0f <= (0x2af95 ^ 0x2af95))
      return !![];
   let _0x5927cf = _0x2f1f0f;
   const _0xcdf4b3 = _0x17e455[
      "getComponent"](
      "yrotnevni:tfarcenim".split("")
      .reverse().join(""))?.[
      "container"
   ];
   if (!_0xcdf4b3) {
      console["warn"](
         '[removePlayerPaymentItem]\x20Could\x20not\x20get\x20inventory\x20for\x20' +
         _0x17e455['name']);
      return ![];
   }
   if (!checkPlayerPaymentItem(
         _0x17e455, _0x4e8d98, _0x2f1f0f
         )) {
      _0x17e455['sendMessage'](
         '§c錯誤: 沒有足夠的' +
         _0x4e8d98["replace"](
            "minecraft:", '') +
         '\x20found\x20during\x20removal\x20attempt.'
         );
      return ![];
   }
   for (let _0x5bde0f = 0x60e8b ^
         0x60e8b; _0x5bde0f < _0xcdf4b3[
         'size']; _0x5bde0f++) {
      const _0x15d2e6 = _0xcdf4b3[
         "getItem"](_0x5bde0f);
      if (_0x15d2e6?.["typeId"] ===
         _0x4e8d98) {
         if (_0x15d2e6["amount"] <=
            _0x5927cf) {
            _0x5927cf -= _0x15d2e6[
               'amount'];
            _0xcdf4b3['setItem'](
               _0x5bde0f, undefined);
         } else {
            _0x15d2e6['amount'] -=
               _0x5927cf;
            _0xcdf4b3["setItem"](
               _0x5bde0f, _0x15d2e6);
            _0x5927cf = 0x584d2 ^
               0x584d2;
         }
         if (_0x5927cf <= (0x220c1 ^
               0x220c1)) {
            return !![];
         }
      }
   }
   if (_0x5927cf > (0x5b126 ^
      0x5b126)) {
      _0x17e455["sendMessage"](
         '§c錯誤: 無法移除所有 ' +
         _0x2f1f0f + '\x20' +
         _0x4e8d98["replace"](
            "minecraft:", '') +
         '.\x20' + _0x5927cf +
         '\x20missing.');
      console["warn"](
         '[removePlayerPaymentItem]\x20Discrepancy\x20for\x20' +
         _0x17e455["name"] +
         '.\x20Needed\x20' +
         _0x2f1f0f + '\x20of\x20' +
         _0x4e8d98 + ',\x20' +
         _0x5927cf +
         '\x20could\x20not\x20be\x20removed.'
         );
      return ![];
   }
   return !![];
}

function givePlayerPaymentItem(
   _0x5a2029, _0x337fb7, _0x4e99b9) {
   if (_0x4e99b9 <= (0x2fed3 ^
      0x2fed3) || !_0x337fb7) return;
   const _0x2e5a89 = _0x5a2029[
      "getComponent"](
      "minecraft:inventory")?.[
      "reniatnoc".split("").reverse()
      .join("")
   ];
   if (!_0x2e5a89) {
      console["warn"](
         '[givePlayerPaymentItem]\x20Could\x20not\x20get\x20inventory\x20for\x20' +
         _0x5a2029['name']);
      return;
   }
   try {
      const _0x3afd29 = new ItemStack(
         _0x337fb7, _0x4e99b9);
      const _0x7c7145 = _0x2e5a89[
         "addItem"](_0x3afd29);
      if (_0x7c7145) {
         _0x5a2029["dimension"][
            'spawnItem'
         ](_0x7c7145, _0x5a2029[
            'location']);
         _0x5a2029['sendMessage'](
            '§eInventory\x20full,\x20' +
            _0x7c7145['amount'] +
            '\x20' + _0x337fb7[
               "replace"](
               "minecraft:", '') +
            ' 已掉落在你的腳邊。'
            );
      }
   } catch (_0x182006) {
      console["error"](
         '[givePlayerPaymentItem]\x20Failed\x20to\x20create/give\x20ItemStack\x20' +
         _0x337fb7 + '\x20for\x20' +
         _0x5a2029["name"] +
         ':\x20' + _0x182006);
      _0x5a2029["sendMessage"](
         '§c錯誤 給予' +
         _0x337fb7["replace"](
            "minecraft:", '') + ".");
   }
}

function getPlayerItemCount(_0x23418e,
   _0x520b2a, _0x3aeec4) {
   _0x3aeec4 = 0x4e4ae ^ 0x4e4ae;
   const _0x16c645 = _0x23418e[
      "getComponent"](
      "minecraft:inventory")?.[
      "container"
   ];
   if (!_0x16c645 || typeof _0x16c645[
         "size"] !== "rebmun".split("")
      .reverse().join("")) {
      return 0xe1a71 ^ 0xe1a71;
   }
   for (let _0x91aea2 = 0xc25d2 ^
         0xc25d2; _0x91aea2 < _0x16c645[
         'size']; _0x91aea2++) {
      try {
         const _0x13d37c = _0x16c645[
            "getItem"](_0x91aea2);
         if (_0x13d37c?.["dIepyt".split(
                  "").reverse().join(
               "")] === _0x520b2a) {
            _0x3aeec4 += _0x13d37c[
               "amount"];
         }
      } catch (_0x599708) {}
   }
   return _0x3aeec4;
}

function checkPlayerItems(_0x12130d,
   _0x3d6f9a) {
   if (!_0x3d6f9a || _0x3d6f9a[
      'size'] === (0x21a93 ^ 0x21a93))
      return !![];
   const _0x4f719e = _0x12130d[
      "getComponent"](
      "minecraft:inventory")?.[
      "reniatnoc".split("").reverse()
      .join("")
   ];
   if (!_0x4f719e) return ![];
   const _0x3c188c = new Map();
   for (let _0x4e7e88 = 0xf2eea ^
         0xf2eea; _0x4e7e88 < _0x4f719e[
         "size"]; _0x4e7e88++) {
      try {
         const _0x54ffe0 = _0x4f719e[
            'getItem'](_0x4e7e88);
         if (_0x54ffe0 && _0x3d6f9a[
               "has"](_0x54ffe0[
               'typeId'])) {
            _0x3c188c["set"](_0x54ffe0[
                  'typeId'], (
                  _0x3c188c['get'](
                     _0x54ffe0[
                        'typeId']) ||
                  0xcfa26 ^ 0xcfa26
                  ) + _0x54ffe0[
                  "amount"]);
         }
      } catch (_0x4e6ed9) {}
   }
   for (const [_0x19f3c8,
      _0xb88b32] of _0x3d6f9a) {
      if ((_0x3c188c["get"](
            _0x19f3c8) || 0xbdc5a ^
            0xbdc5a) < _0xb88b32) {
         return ![];
      }
   }
   return !![];
}

function removePlayerItems(_0x4f621b,
   _0xc3f145) {
   if (!_0xc3f145 || _0xc3f145[
      "size"] === (0xb13d3 ^ 0xb13d3))
      return !![];
   const _0x444569 = _0x4f621b[
      'getComponent'](
      "yrotnevni:tfarcenim".split("")
      .reverse().join(""))?.[
      "container"
   ];
   if (!_0x444569) return ![];
   const _0x5393f1 = new Map(_0xc3f145);
   for (let _0x225990 = 0x2e33d ^
         0x2e33d; _0x225990 < _0x444569[
         "size"]; _0x225990++) {
      const _0x290d1a = _0x444569[
         'getItem'](_0x225990);
      const _0x3fde00 = _0x290d1a?.[
         "dIepyt".split("").reverse()
         .join("")
      ];
      if (_0x290d1a && _0x5393f1["has"](
            _0x3fde00)) {
         const _0x488b99 = _0x5393f1[
            "get"](_0x3fde00);
         if (_0x488b99 <= (0xb64f7 ^
               0xb64f7)) continue;
         if (_0x290d1a["amount"] <=
            _0x488b99) {
            _0x5393f1['set'](_0x3fde00,
               _0x488b99 - _0x290d1a[
                  'amount']);
            _0x444569['setItem'](
               _0x225990, undefined);
         } else {
            _0x290d1a["amount"] -=
               _0x488b99;
            _0x5393f1["set"](_0x3fde00,
               0xb737a ^ 0xb737a);
            _0x444569['setItem'](
               _0x225990, _0x290d1a);
         }
      }
   }
   for (const _0x1a89f2 of _0x5393f1[
         "values"]()) {
      if (_0x1a89f2 > (0x3d3fb ^
            0x3d3fb)) {
         _0x4f621b["sendMessage"](
            '§c錯誤: 無法移除所有需要的物品。背包可能在移除過程中發生變動。'
            );
         console["warn"](
            '[removePlayerItems]\x20Discrepancy\x20for\x20' +
            _0x4f621b['name'] +
            '.\x20Remaining\x20items\x20to\x20remove:',
            _0x5393f1);
         return ![];
      }
   }
   return !![];
}

function givePlayerItems(_0x33d5ae,
   _0x1f8444, _0x2b0acc, _0x3d168c) {
   if (!_0x1f8444 || _0x1f8444[
      'size'] === (0xe1d7d ^ 0xe1d7d))
      return;
   const _0x377896 = _0x33d5ae[
      "getComponent"](
      "yrotnevni:tfarcenim".split("")
      .reverse().join(""))?.[
      "container"
   ];
   if (!_0x377896) return;
   _0x2b0acc = 0x1c9ae ^ 0x1c9ae;
   _0x3d168c = 0xe0e5b ^ 0xe0e5b;
   for (const [_0x21e399,
      _0x592b19] of _0x1f8444) {
      if (_0x592b19 <= (0x412f0 ^
            0x412f0)) continue;
      try {
         const _0x3ede90 =
            new ItemStack(_0x21e399,
               _0x592b19);
         const _0x5a8fc1 = _0x377896[
            "addItem"](_0x3ede90);
         if (_0x5a8fc1) {
            _0x33d5ae["dimension"][
               "spawnItem"
            ](_0x5a8fc1, _0x33d5ae[
               'location']);
            _0x2b0acc += _0x5a8fc1[
               "amount"];
            _0x3d168c++;
         }
      } catch (_0x1fc6ea) {
         console['warn'](
            '[givePlayerItems]\x20Could\x20not\x20create\x20or\x20give\x20item\x20' +
            _0x21e399 +
            '\x20for\x20' +
            _0x33d5ae["name"] +
            ':\x20' + _0x1fc6ea);
         _0x33d5ae["sendMessage"](
            '§c警告: 無法退還物品 \'' +
            _0x21e399 + '\x27.');
      }
   }
   if (_0x2b0acc > (0x8f7f2 ^
      0x8f7f2)) {
      _0x33d5ae["sendMessage"](
          '§e背包已滿' +
         _0x2b0acc +
         '\x20items\x20(' +
         _0x3d168c +
         '\x20types)\x20dropped\x20at\x20your\x20feet.'
         );
   }
}

function checkPlayerLevels(_0x21a007,
   _0x9655ea) {
   if (_0x9655ea <= (0xe50e7 ^ 0xe50e7))
      return !![];
   try {
      return _0x21a007['level'] >=
         _0x9655ea;
   } catch (_0x4d2e4d) {
      console['warn'](
         '[checkPlayerLevels]\x20Error\x20getting\x20level\x20for\x20' +
         _0x21a007["name"] +
         ':\x20' + _0x4d2e4d);
      return ![];
   }
}

function removePlayerLevels(_0x401e95,
   _0x4bb888) {
   if (_0x4bb888 <= (0xb2b25 ^ 0xb2b25))
      return !![];
   try {
      if (_0x401e95["level"] <
         _0x4bb888) {
         _0x401e95['sendMessage'](
            '§c錯誤: 沒有足夠的等級。擁有 ' +
            _0x401e95["level"] +
            ',\x20need\x20' +
            _0x4bb888 + ".");
         return ![];
      }
      _0x401e95["addLevels"](-
      _0x4bb888);
      return !![];
   } catch (_0x4e60fa) {
      console["error"](
         '[removePlayerLevels]\x20Error\x20removing\x20' +
         _0x4bb888 +
         '\x20levels\x20from\x20' +
         _0x401e95["name"] +
         ':\x20' + _0x4e60fa);
      _0x401e95['sendMessage'](
         '§c嘗試移除等級時發生錯誤。'
         );
      return ![];
   }
}

function givePlayerLevels(_0xf504d2,
   _0x4f10d7) {
   if (_0x4f10d7 <= (0x28609 ^ 0x28609))
      return;
   try {
      _0xf504d2["addLevels"](_0x4f10d7);
   } catch (_0x487882) {
      console["error"](
         '[givePlayerLevels]\x20Error\x20giving\x20' +
         _0x4f10d7 +
         '\x20levels\x20to\x20' +
         _0xf504d2["name"] +
         ':\x20' + _0x487882);
      _0xf504d2["sendMessage"](
         '§c嘗試退還等級時發生錯誤。'
         );
   }
}

function getXpLevelModeCost(_0x553d6a,
   _0x26004d) {
   if (!_0x26004d || typeof _0x26004d[
         "x"] !== "number" ||
      typeof _0x26004d["y"] !== "rebmun"
      .split("").reverse().join("") ||
      typeof _0x26004d["z"] !== "rebmun"
      .split("").reverse().join("")) {
      console["warn"](
         '[getXpLevelModeCost]\x20Invalid\x20structure\x20size\x20provided.'
         );
      return null;
   }
   const _0x538d8a = _0x26004d["x"] *
      _0x26004d["y"] * _0x26004d["z"];
   const _0x12f5e2 = _0x553d6a[
         "getDynamicProperty"](
         XP_LEVEL_COST_SMALL_PROP) ??
      DEFAULT_XP_LEVEL_COST_SMALL;
   const _0xae100c = _0x553d6a[
         'getDynamicProperty'](
         XP_LEVEL_COST_MEDIUM_PROP) ??
      DEFAULT_XP_LEVEL_COST_MEDIUM;
   const _0x351d35 = _0x553d6a[
         "getDynamicProperty"](
         XP_LEVEL_COST_LARGE_PROP) ??
      DEFAULT_XP_LEVEL_COST_LARGE;
   const _0x5f38c6 = _0x553d6a[
         'getDynamicProperty'](
         XP_LEVEL_COST_HUGE_PROP) ??
      DEFAULT_XP_LEVEL_COST_HUGE;
   if (_0x538d8a <=
      SMALL_VOLUME_THRESHOLD) {
      return _0x12f5e2;
   } else if (_0x538d8a <=
      MEDIUM_VOLUME_THRESHOLD) {
      return _0xae100c;
   } else if (_0x538d8a <=
      LARGE_VOLUME_THRESHOLD) {
      return _0x351d35;
   } else {
      return _0x5f38c6;
   }
}

function saveCurrentState(_0x327ef8,
   _0x31a78f, _0x3a4ef3, _0x5b8c98,
   _0xcfbcec, _0x60cc07) {
   const _0x3bb22e = {
      "x": _0x31a78f["x"] +
         _0x3a4ef3["x"] - (0x7b070 ^
            0x7b071),
      "y": _0x31a78f["y"] +
         _0x3a4ef3["y"] - (0xaa392 ^
            0xaa393),
      "z": _0x31a78f["z"] +
         _0x3a4ef3["z"] - (0xaac22 ^
            0xaac23)
   };
   const _0x297ab0 =
      getAllBlocksBetween(_0x31a78f,
         _0x3bb22e, _0x327ef8[
            "dimension"]);
   return {
      "blocks": _0x297ab0,
      'placementMode': _0x5b8c98,
      "cost": _0xcfbcec,
      "requiredBlocksMap": _0x5b8c98 ===
         REQUIRED_BLOCK_MODE_ID &&
         _0x60cc07 instanceof Map ?
         _0x60cc07 : null,
      "timestamp": Date["now"]()
   };
}

function undoLastPlacement(_0x2e3d55) {
   const _0x24d28b = getPlayerUndoStack(
      _0x2e3d55);
   if (_0x24d28b["length"] === (
         0xb62d7 ^ 0xb62d7)) {
      _0x2e3d55['sendMessage'](
         '§eNothing\x20to\x20undo!');
      mainMenu(_0x2e3d55);
      return;
   }
   const _0x2d9611 = _0x24d28b['pop']();
   try {
      _0x2e3d55["sendMessage"](
         '§eUndoing\x20last\x20placement...'
         );
      for (const _0x5e4126 of _0x2d9611[
            "blocks"]) {
         try {
            const _0x20728f = _0x2e3d55[
               'dimension'][
               'getBlock'
            ](_0x5e4126["location"]);
            if (_0x20728f) {
               _0x20728f[
                  "setPermutation"](
                  _0x5e4126[
                     'permutation']);
            }
         } catch (_0x34a228) {
            console["warn"](
               '[Undo]\x20Error\x20restoring\x20block\x20at\x20' +
               JSON["stringify"](
                  _0x5e4126[
                     "location"]) +
               ':\x20' + _0x34a228);
         }
      }
      let _0x503638 =
         '§aLast\x20placement\x20undone.';
      if (_0x2e3d55['getGameMode']() !==
         GameMode['creative'] &&
         _0x2d9611["cost"]) {
         if (_0x2d9611[
            "placementMode"] ===
            PAID_MODE_ID && _0x2d9611[
               "cost"]['type'] ===
            PAID_MODE_ID && _0x2d9611[
               "cost"]["itemId"] &&
            _0x2d9611["cost"][
            "amount"] > (0xba7bb ^
               0xba7bb)) {
            givePlayerPaymentItem(
               _0x2e3d55, _0x2d9611[
                  'cost']["itemId"],
               _0x2d9611["cost"][
                  "amount"
               ]);
            let _0x17b65e = _0x2d9611[
               'cost']["itemId"][
               'replace'
            ](":tfarcenim".split("")
               .reverse().join(""),
               '');
            paymentItemOptions[
               "forEach"]((_0x262772,
               _0xbdbb0b) => {
               if (_0x262772 ===
                  _0x2d9611[
                     'cost'][
                     'itemId'
                  ]) _0x17b65e =
                  _0xbdbb0b;
            });
            _0x503638 += '\x20§e' +
               _0x2d9611["cost"][
                  "amount"
               ] + '\x20' + _0x17b65e +
               '(s)§a\x20refunded.';
         } else if (_0x2d9611[
               'placementMode'] ===
            REQUIRED_BLOCK_MODE_ID &&
            _0x2d9611["cost"][
            "type"] ===
            REQUIRED_BLOCK_MODE_ID &&
            _0x2d9611[
               'requiredBlocksMap'
               ] instanceof Map &&
            _0x2d9611[
               'requiredBlocksMap'][
               "size"
            ] > (0x3edf9 ^ 0x3edf9)) {
            givePlayerItems(_0x2e3d55,
               _0x2d9611[
                  "requiredBlocksMap"
                  ]);
            _0x503638 +=
               '\x20§bRequired\x20blocks§a\x20refunded.';
         } else if (_0x2d9611[
               'placementMode'] ===
            XP_LEVEL_MODE_ID &&
            _0x2d9611['cost'][
            "type"] ===
            XP_LEVEL_MODE_ID &&
            _0x2d9611["cost"][
            "amount"] > (0x82e64 ^
               0x82e64)) {
            givePlayerLevels(_0x2e3d55,
               _0x2d9611['cost'][
                  'amount'
               ]);
            const _0x8d23f = _0x2d9611[
                  "cost"]['amount'] ===
               (0x39bd6 ^ 0x39bd7) ?
               "level".split("")
               .reverse().join("") :
               "levels";
            _0x503638 += '\x20§2' +
               _0x2d9611['cost'][
                  "amount"
               ] + '\x20' + _0x8d23f +
               '§a\x20refunded.';
         }
      }
      _0x2e3d55["sendMessage"](
         _0x503638);
   } catch (_0x18caee) {
      _0x2e3d55["sendMessage"](
         '§cError\x20during\x20undo:\x20' +
         _0x18caee["message"]);
      console["error"](
         '[Undo]\x20Error\x20for\x20' +
         _0x2e3d55["name"] +
         ':\x20' + _0x18caee['stack']
         );
   }
   system["run"](() => mainMenu(
      _0x2e3d55));
}

function getPlayerDirection(_0x2d82ad) {
   if (Math["abs"](_0x2d82ad["x"]) >
      Math["abs"](_0x2d82ad["z"])) {
      return _0x2d82ad["x"] > (0x2b334 ^
            0x2b334) ? "tsaE".split("")
         .reverse().join("") : "West";
   } else {
      return _0x2d82ad["z"] > (0xccf5d ^
            0xccf5d) ? "htuoS".split("")
         .reverse().join("") : "North";
   }
}

function getAllBlocksBetween(_0x46b25d,
   _0x110d02, _0x17e1b4) {
   const _0x339ddc = [];
   const _0x3ccc21 = {
      "x": Math['min'](_0x46b25d[
         "x"], _0x110d02["x"]),
      "y": Math["min"](_0x46b25d[
         "y"], _0x110d02["y"]),
      "z": Math["min"](_0x46b25d[
         "z"], _0x110d02["z"])
   };
   const _0x5380e0 = {
      "x": Math['max'](_0x46b25d[
         "x"], _0x110d02["x"]),
      "y": Math['max'](_0x46b25d[
         "y"], _0x110d02["y"]),
      "z": Math['max'](_0x46b25d[
         "z"], _0x110d02["z"])
   };
   for (let _0xa4f21d = _0x3ccc21[
      "x"]; _0xa4f21d <= _0x5380e0[
      "x"]; _0xa4f21d++) {
      for (let _0x3cde4a = _0x3ccc21[
            "y"]; _0x3cde4a <=
         _0x5380e0["y"]; _0x3cde4a++) {
         for (let _0x28d3c8 = _0x3ccc21[
               "z"]; _0x28d3c8 <=
            _0x5380e0["z"]; _0x28d3c8++
            ) {
            try {
               const _0x13d733 = {
                  "x": _0xa4f21d,
                  "y": _0x3cde4a,
                  "z": _0x28d3c8
               };
               const _0x3f5cd4 =
                  _0x17e1b4['getBlock'](
                     _0x13d733);
               if (_0x3f5cd4) {
                  _0x339ddc['push']({
                     'location': _0x13d733,
                     "permutation": _0x3f5cd4[
                        'permutation'
                        ]
                  });
               }
            } catch (_0xeef18d) {}
         }
      }
   }
   return _0x339ddc;
}

function calculatePlacementLocation(
   _0x340030, _0x3642be, _0x92a9d8,
   _0x17f546 = 0x7a4cb ^ 0x7a4cb) {
   const _0x31fa1c = {
      "x": Math["floor"](_0x340030[
         "x"]),
      "y": Math["floor"](_0x340030[
         "y"]) + (0x81db6 ^
         0x81db7) + _0x17f546,
      "z": Math["floor"](_0x340030[
         "z"])
   };
   switch (_0x92a9d8) {
      case "tsaE".split("").reverse()
      .join(""):
         _0x31fa1c["z"] -= Math['floor']
            (_0x3642be["z"] / (0x3551b ^
               0x35519));
         break;
      case "tseW".split("").reverse()
      .join(""):
         _0x31fa1c["x"] -= _0x3642be[
            "x"] - (0xdacbd ^
            0xdacbc);
         _0x31fa1c["z"] -= Math["floor"]
            (_0x3642be["z"] / (0x290a8 ^
               0x290aa));
         break;
      case "htuoS".split("").reverse()
      .join(""):
         _0x31fa1c["x"] -= Math['floor']
            (_0x3642be["x"] / (0xcc744 ^
               0xcc746));
         break;
      case "North":
         _0x31fa1c["x"] -= Math['floor']
            (_0x3642be["x"] / (0xb1331 ^
               0xb1333));
         _0x31fa1c["z"] -= _0x3642be[
            "z"] - (0x81065 ^
            0x81064);
         break;
   }
   return _0x31fa1c;
}

function saveStructureInfo(_0xbb522f,
   _0x588cc1, _0x582520, _0xdee5cf,
   _0x58182a, _0x3b6074, _0x570026,
   _0x4d3d1b) {
   try {
      const _0x1c7912 = world[
         "structureManager"]["get"](
         _0x588cc1);
      if (!_0x1c7912) {
         _0xbb522f['sendMessage'](
            '§cError:\x20Structure\x20\x27' +
            _0x588cc1 +
            '\x27\x20not\x20found\x20during\x20save.'
            );
         return;
      }
      let _0x21636a = "None";
      if (_0x58182a ===
         StructureAnimationMode[
            "Blocks"]) {
         _0x21636a = "BlockByBlock";
      } else if (_0x58182a ===
         StructureAnimationMode[
            'Layers']) {
         _0x21636a = "LayerByLayer";
      }
      const _0x3e428e = {
         'id': _0x588cc1,
         'adjustment': _0x582520,
         "size": {
            "x": _0x1c7912["size"][
               "x"
            ],
            "y": _0x1c7912["size"][
               "y"
            ],
            "z": _0x1c7912['size'][
               "z"
            ]
         },
         'mirror': _0xdee5cf,
         "animationMode": _0x21636a,
         "animationSeconds": Number(
               _0x3b6074) ||
            0x5f31f ^ 0x5f31f,
         "includeBlocks": _0x570026,
         "includeEntities": _0x4d3d1b
      };
      const _0x42c138 = JSON[
         'stringify'](_0x3e428e);
      _0xbb522f['setDynamicProperty'](
         "erutcurtSdetceles".split(
            "").reverse().join(""),
         _0x42c138);
      _0xbb522f['setDynamicProperty'](
         "lastSelectedStructure",
         _0x42c138);
      _0xbb522f['sendMessage'](
         '§aSelected:\x20§b' +
         _0x588cc1['replace'](
            ":erutcurtsym".split("")
            .reverse().join(""), ''
            ) +
         '§a\x20with\x20custom\x20options\x20saved.'
         );
   } catch (_0x5ef4ea) {
      _0xbb522f["sendMessage"](
         '§cError\x20saving\x20structure\x20info:\x20' +
         _0x5ef4ea["message"]);
      console["error"](
         '[saveStructureInfo]\x20Error\x20saving\x20info\x20for\x20' +
         _0x588cc1 + '\x20for\x20' +
         _0xbb522f['name'] +
         ':\x20' + _0x5ef4ea['stack']
         );
   }
}

function getPaidModeCost(_0x4fdc3e,
   _0x1efb9f) {
   if (!_0x1efb9f || typeof _0x1efb9f[
         "x"] !== "rebmun".split("")
      .reverse().join("")) {
      console["warn"](
         '[getPaidModeCost]\x20Invalid\x20size\x20provided.'
         );
      return null;
   }
   const _0x2121ec = _0x1efb9f["x"] *
      _0x1efb9f["y"] * _0x1efb9f["z"];
   const _0x1723c0 = _0x4fdc3e[
         "getDynamicProperty"](
         PAID_MODE_ITEM_ID_PROP) ??
      DEFAULT_PAID_ITEM_ID;
   const _0xa456 = _0x4fdc3e[
         "getDynamicProperty"](
         COST_SMALL_PROP) ??
      DEFAULT_COST_SMALL;
   const _0x472e65 = _0x4fdc3e[
         "getDynamicProperty"](
         COST_MEDIUM_PROP) ??
      DEFAULT_COST_MEDIUM;
   const _0x46c237 = _0x4fdc3e[
         "getDynamicProperty"](
         COST_LARGE_PROP) ??
      DEFAULT_COST_LARGE;
   let _0x3d6b9a = _0x2121ec <=
      SMALL_VOLUME_THRESHOLD ? _0xa456 :
      _0x2121ec <=
      MEDIUM_VOLUME_THRESHOLD ?
      _0x472e65 : _0x46c237;
   let _0x2d5f3e = _0x1723c0['replace'](
      "minecraft:", '');
   paymentItemOptions["forEach"]((
      _0x2ae102, _0x231aff) => {
      if (_0x2ae102 === _0x1723c0)
         _0x2d5f3e = _0x231aff;
   });
   return {
      "itemId": _0x1723c0,
      "amount": _0x3d6b9a,
      'itemName': _0x2d5f3e
   };
}

function getRequiredModePercentage(
   _0x16a076, _0x466a35) {
   if (!_0x466a35 || typeof _0x466a35[
         "x"] !== "number") {
      console["warn"](
         '[getRequiredModePercentage]\x20Invalid\x20size\x20provided.'
         );
      return DEFAULT_REQ_PERC_SMALL;
   }
   const _0x161631 = _0x466a35["x"] *
      _0x466a35["y"] * _0x466a35["z"];
   const _0x42c949 = _0x16a076[
         "getDynamicProperty"](
         REQ_PERC_SMALL_PROP) ??
      DEFAULT_REQ_PERC_SMALL;
   const _0x4bdf4a = _0x16a076[
         "getDynamicProperty"](
         REQ_PERC_MEDIUM_PROP) ??
      DEFAULT_REQ_PERC_MEDIUM;
   const _0x1093f6 = _0x16a076[
         'getDynamicProperty'](
         REQ_PERC_LARGE_PROP) ??
      DEFAULT_REQ_PERC_LARGE;
   const _0x297822 = _0x16a076[
         "getDynamicProperty"](
         REQ_PERC_HUGE_PROP) ??
      DEFAULT_REQ_PERC_HUGE;
   if (_0x161631 <=
      SMALL_VOLUME_THRESHOLD)
   return _0x42c949;
   else if (_0x161631 <=
      MEDIUM_VOLUME_THRESHOLD)
   return _0x4bdf4a;
   else if (_0x161631 <=
      LARGE_VOLUME_THRESHOLD)
   return _0x1093f6;
   else return _0x297822;
}
async function placeSelectedStructure(
   _0x2315b4, _0x5686e0) {
   let _0x5a0084 = _0x2315b4[
         "getDynamicProperty"](
         "erutcurtSdetceles".split(
            "").reverse().join("")
         ) || _0x2315b4[
         'getDynamicProperty'](
         "lastSelectedStructure");
   if (!_0x5a0084) {
      _0x2315b4['sendMessage'](
         '§cNo\x20structure\x20selected.\x20Please\x20choose\x20one\x20first.'
         );
      mainMenu(_0x2315b4);
      return;
   }
   if (!_0x2315b4[
         'getDynamicProperty'](
         "selectedStructure")) {
      _0x2315b4["sendMessage"](
         '§eUsing\x20last\x20selected\x20structure.'
         );
   }
   try {
      _0x5686e0 = JSON['parse'](
         _0x5a0084);
      if (!_0x5686e0 || !_0x5686e0[
            "id"] || !_0x5686e0[
            'size']) {
         throw new Error(
            'Stored\x20structure\x20info\x20is\x20invalid.'
            );
      }
   } catch (_0x25c6f9) {
      _0x2315b4['sendMessage'](
         '§cError\x20reading\x20structure\x20info.\x20Please\x20reselect.'
         );
      console["error"](
         '[placeSelectedStructure]\x20Parse\x20error:\x20' +
         _0x25c6f9 +
         '.\x20String:\x20' +
         _0x5a0084);
      _0x2315b4['setDynamicProperty']
         ("selectedStructure",
            undefined);
      _0x2315b4["setDynamicProperty"]
         ("lastSelectedStructure",
            undefined);
      mainMenu(_0x2315b4);
      return;
   }
   const _0x286bc5 = _0x2315b4[
         "getDynamicProperty"](
         "structurePlacementMode") ||
      FREE_MODE_ID;
   let _0x1f5483 = null;
   let _0x5244cb = null;
   if (_0x2315b4["getGameMode"]() !==
      GameMode["creative"]) {
      if (_0x286bc5 ===
         PAID_MODE_ID) {
         const _0x3778ba =
            getPaidModeCost(
               _0x2315b4, _0x5686e0[
                  'size']);
         if (!_0x3778ba) {
            _0x2315b4['sendMessage'](
               '§cCould\x20not\x20determine\x20structure\x20cost.'
               );
            mainMenu(_0x2315b4);
            return;
         }
         _0x1f5483 = {
            "type": PAID_MODE_ID,
            "itemId": _0x3778ba[
               'itemId'],
            'amount': _0x3778ba[
               "amount"]
         };
         if (!checkPlayerPaymentItem(
               _0x2315b4, _0x3778ba[
                  'itemId'],
               _0x3778ba["amount"]
               )) {
            _0x2315b4['sendMessage'](
               '§cYou\x20need\x20' +
               _0x3778ba[
               'amount'] +
               '\x20' + _0x3778ba[
                  "itemName"] +
               ".)s(".split("")
               .reverse().join("")
               );
            mainMenu(_0x2315b4);
            return;
         }
         _0x2315b4["sendMessage"](
             '§e放置花費: ' +
            _0x3778ba["amount"] +
            '\x20' + _0x3778ba[
               "itemName"] +
            "(s).");
      } else if (_0x286bc5 ===
         REQUIRED_BLOCK_MODE_ID) {
         _0x2315b4['sendMessage'](
            '§e分析結構需求中...'
            );
         let _0x2ca095 = null;
         try {
            _0x2ca095 =
               analyzeStructure(
                  _0x5686e0['id']);
         } catch (_0x33ac1e) {}
         if (_0x2ca095 === null || !(
               _0x2ca095 instanceof Map
               )) {
            _0x2315b4['sendMessage'](
               '§cCould\x20not\x20analyze\x20structure\x20\x27' +
               _0x5686e0['id'] +
               '\x27.');
            mainMenu(_0x2315b4);
            return;
         }
         if (_0x2ca095["size"] === (
               0x6e234 ^ 0x6e234)) {
            _0x2315b4["sendMessage"](
               '§aStructure\x20requires\x20no\x20blocks.\x20Placing\x20for\x20free.'
               );
            _0x1f5483 = null;
            _0x5244cb = null;
         } else {
            const _0x36a3a1 =
               getRequiredModePercentage(
                  _0x2315b4,
                  _0x5686e0["size"]);
            _0x2315b4["sendMessage"](
               '§e(Applying\x20' +
               _0x36a3a1 +
               '%\x20requirement\x20for\x20this\x20size)'
               );
            _0x5244cb = new Map();
            let _0x2c046c =
               '§6Top\x20' +
               MAX_REQUIRED_TYPES +
               '\x20Required\x20Blocks\x20(' +
               _0x36a3a1 +
               '%):\x0a§7(Others\x20ignored)\x0a';
            let _0x31411c = !![];
            const _0x567f7d = [...
               _0x2ca095[
                  'entries']()
            ]['sort'](([,
                     _0x2fb549
                  ], [,
                  _0x586b10]) =>
               _0x586b10 -
               _0x2fb549);
            const _0x3310ac =
               new Set(_0x567f7d[
                  "slice"](
                  0x60049 ^
                  0x60049,
                  MAX_REQUIRED_TYPES
                  )['map'](([
                  _0x3c6735
               ]) => _0x3c6735));
            let _0x291b70 = 0xccd9b ^
               0xccd9b;
            const _0x35b081 =
               0xb06bc ^ 0xb06b3;
            let _0x4d3c79 = 0xdc8fe ^
               0xdc8fe;
            for (const [_0x1e53b7,
                  _0xd88515
               ] of _0x567f7d) {
               const _0x58d53e =
                  Number(_0xd88515);
               if (isNaN(_0x58d53e))
                  continue;
               if (_0x3310ac['has'](
                     _0x1e53b7)) {
                  const _0x29d0dd =
                     Math['ceil'](
                        _0x58d53e * (
                           _0x36a3a1 /
                           (0xaaadf ^
                              0xaaabb
                              )));
                  if (_0x29d0dd > (
                        0xe4faf ^
                        0xe4faf)) {
                     _0x5244cb["set"]
                        (_0x1e53b7,
                           _0x29d0dd
                           );
                     const
                        _0x2f14cb =
                        getPlayerItemCount(
                           _0x2315b4,
                           _0x1e53b7
                           );
                     const
                        _0x237aed =
                        _0x2f14cb >=
                        _0x29d0dd;
                     if (!_0x237aed)
                        _0x31411c = ![];
                     const
                        _0x54e875 =
                        _0x237aed ?
                        "a\xA7"
                        .split("")
                        .reverse()
                        .join("") :
                        "§c";
                     const
                        _0xd76dc9 =
                        '' +
                        _0x54e875 +
                        _0x2f14cb +
                        "§7/§a" +
                        _0x29d0dd;
                     if (_0x291b70 <
                        _0x35b081) {
                        let _0x3a6eb2 =
                           _0x1e53b7[
                              "replace"
                              ](
                              "minecraft:",
                              '');
                        _0x3a6eb2 =
                           _0x3a6eb2[
                              "length"
                              ] > (
                              0x7a561 ^
                              0x7a575
                              ) ?
                           _0x3a6eb2[
                              'substring'
                              ](
                              0x465fd ^
                              0x465fd,
                              0x84771 ^
                              0x84763
                              ) +
                           "..."
                           .split("")
                           .reverse()
                           .join(
                           "") :
                           _0x3a6eb2;
                        _0x2c046c +=
                           '§7-\x20' +
                           _0x3a6eb2 +
                           ':\x20' +
                           _0xd76dc9 +
                           '\x0a';
                        _0x291b70++;
                     } else if (
                        _0x291b70 ===
                        _0x35b081) {
                        _0x2c046c +=
                           '§7...\x20(Top\x20' +
                           MAX_REQUIRED_TYPES +
                           '\x20listed)\x0a';
                        _0x291b70++;
                     }
                  }
               } else {
                  _0x4d3c79++;
               }
            }
            if (_0x4d3c79 > (
                  0x8bd5f ^ 0x8bd5f
                  ) && _0x291b70 <=
               _0x35b081) {
               _0x2c046c +=
                  '§7+\x20' +
                  _0x4d3c79 +
                  '\x20other\x20block\x20types\x20(not\x20required).\x0a';
            }
            if (_0x5244cb["size"] ===
               (0xb47bb ^ 0xb47bb)) {
               _0x2315b4[
                  "sendMessage"](
                  '§aTop\x20blocks\x20require\x200\x20items\x20at\x20' +
                  _0x36a3a1 +
                  '%.\x20Placing\x20for\x20free.'
                  );
               _0x1f5483 = null;
               _0x5244cb = null;
            } else {
               const _0x50a847 =
                  _0x31411c ?
                  ")tneiciffuS(a\xA7"
                  .split("")
                  .reverse().join(
                  "") :
                  "§c(Insufficient)";
               const _0x15b044 =
                  _0x2c046c + (
                     '\x0a§eStatus:\x20' +
                     _0x50a847 +
                     '\x0a§ePlace\x20this\x20structure?'
                     );
               const _0x2bb11d =
                  new MessageFormData()[
                     'title'](
                     'Confirm:\x20' +
                     _0x5686e0["id"][
                        "replace"
                     ]("mystructure:",
                        ''))['body'](
                     _0x15b044)[
                     "button1"](
                     "§cCancel")[
                     'button2'](
                     "§aConfirm");
               const _0x30c2a9 =
                  await _0x2bb11d[
                     "show"](
                     _0x2315b4);
               if (_0x30c2a9[
                     "canceled"] ||
                  _0x30c2a9[
                     'selection'] ===
                  (0x95e6b ^ 0x95e6b)
                  ) {
                  _0x2315b4[
                     'sendMessage'
                     ](
                     '§ePlacement\x20cancelled.'
                     );
                  mainMenu(
                  _0x2315b4);
                  return;
               }
               _0x2315b4[
                  "sendMessage"](
                  '§e驗證背包中...'
                  );
               if (!checkPlayerItems(
                     _0x2315b4,
                     _0x5244cb)) {
                  _0x2315b4[
                     "sendMessage"
                     ](
                     '§cRequired\x20blocks\x20missing\x20(' +
                     _0x36a3a1 +
                     ".)%".split(
                        "")
                     .reverse()
                     .join(""));
                  mainMenu(
                  _0x2315b4);
                  return;
               }
               _0x1f5483 = {
                  'type': REQUIRED_BLOCK_MODE_ID,
                  'costMap': _0x5244cb
               };
               _0x2315b4[
                  "sendMessage"](
                  '§a需求滿足。放置中...'
                  );
            }
         }
      } else if (_0x286bc5 ===
         XP_LEVEL_MODE_ID) {
         const _0x883308 =
            getXpLevelModeCost(
               _0x2315b4, _0x5686e0[
                  'size']);
         if (_0x883308 === null) {
            _0x2315b4["sendMessage"](
               '§cCould\x20not\x20determine\x20level\x20cost.'
               );
            mainMenu(_0x2315b4);
            return;
         }
         if (_0x883308 <= (0xeb67a ^
               0xeb67a)) {
            _0x2315b4['sendMessage'](
               '§aStructure\x20costs\x200\x20levels.\x20Placing\x20for\x20free.'
               );
            _0x1f5483 = null;
         } else {
            _0x1f5483 = {
               'type': XP_LEVEL_MODE_ID,
               "amount": _0x883308
            };
            if (!checkPlayerLevels(
                  _0x2315b4,
                  _0x883308)) {
               _0x2315b4[
                  "sendMessage"](
                  '§cYou\x20need\x20' +
                  _0x883308 +
                  '\x20levels.\x20You\x20have\x20' +
                  _0x2315b4[
                     "level"] +
                  ".");
               mainMenu(_0x2315b4);
               return;
            }
            const _0x51d4e4 =
               _0x883308 === (
                  0xc8450 ^ 0xc8451
                  ) ? "level" :
               "slevel".split("")
               .reverse().join("");
            _0x2315b4['sendMessage'](
                '§e放置花費: ' +
               _0x883308 +
               '\x20' +
               _0x51d4e4 + ".");
         }
      }
   }
   placeStructureInternal(_0x2315b4,
      _0x5686e0, _0x286bc5,
      _0x1f5483, _0x286bc5 ===
      REQUIRED_BLOCK_MODE_ID ?
      _0x5244cb : null);
   _0x2315b4['setDynamicProperty'](
      "selectedStructure",
      undefined);
}

function placeStructureInternal(
   _0x248a9e, _0x1a9a75, _0x279bff,
   _0x1a95f2, _0x35f6ae) {
   let _0x2d6346 = null;
   try {
      const _0x55bd4b = _0x1a9a75["id"];
      const _0x4e5681 = _0x1a9a75[
         "adjustment"];
      const _0x2cb8be = _0x1a9a75[
         "size"];
      if (!_0x2cb8be) throw new Error(
         'Structure\x20size\x20missing\x20for\x20' +
         _0x55bd4b);
      const _0x37d283 = _0x248a9e[
         'getViewDirection']();
      const _0x4b09f5 =
         getPlayerDirection(_0x37d283);
      let _0x24e2ce = StructureRotation[
         "None"];
      let _0x117d67 = {
         ..._0x2cb8be
      };
      switch (_0x4b09f5) {
         case "tseW".split("").reverse()
         .join(""):
            _0x24e2ce =
               StructureRotation[
                  'Rotate180'];
            break;
         case "htuoS".split("")
         .reverse().join(""):
            _0x24e2ce =
               StructureRotation[
                  "Rotate90"];
            _0x117d67 = {
               "x": _0x2cb8be["z"],
               "y": _0x2cb8be["y"],
               "z": _0x2cb8be["x"]
            };
            break;
         case "North":
            _0x24e2ce =
               StructureRotation[
                  "Rotate270"];
            _0x117d67 = {
               "x": _0x2cb8be["z"],
               "y": _0x2cb8be["y"],
               "z": _0x2cb8be["x"]
            };
            break;
      }
      const _0x54f931 = _0x248a9e[
            "getBlockFromViewDirection"]
         ({
            'maxDistance': 0x64,
            'includeLiquidBlocks':
            ![],
            'includePassableBlocks':
               ![]
         });
      if (!_0x54f931) throw new Error(
         'No\x20valid\x20block\x20in\x20sight\x20for\x20placement\x20target.'
         );
      const _0x39ebd3 =
         calculatePlacementLocation(
            _0x54f931["block"][
               "location"
            ], _0x117d67, _0x4b09f5,
            _0x4e5681);
      _0x2d6346 = saveCurrentState(
         _0x248a9e, _0x39ebd3,
         _0x117d67, _0x279bff,
         _0x1a95f2, _0x35f6ae);
      getPlayerUndoStack(_0x248a9e)[
         "push"](_0x2d6346);
      let _0x2ff860 = !![];
      if (_0x248a9e["getGameMode"]() !==
         GameMode["creative"] &&
         _0x1a95f2) {
         _0x2ff860 = ![];
         if (_0x1a95f2["type"] ===
            PAID_MODE_ID && _0x1a95f2[
               'itemId'] && _0x1a95f2[
               'amount'] > (0x2f051 ^
               0x2f051)) {
            const {
               itemId: _0x4c9b90,
               amount: _0x222d70
            } = _0x1a95f2;
            let _0x26de22 = _0x4c9b90[
               "replace"](
               "minecraft:", '');
            paymentItemOptions[
               "forEach"]((_0x1311a9,
               _0x51c180) => {
               if (_0x1311a9 ===
                  _0x4c9b90)
                  _0x26de22 =
                  _0x51c180;
            });
            if (removePlayerPaymentItem(
                  _0x248a9e, _0x4c9b90,
                  _0x222d70)) {
               _0x248a9e["sendMessage"](
                   '§a花費了 ' +
                  _0x222d70 +
                  '\x20' +
                  _0x26de22 + "(s).");
               _0x2ff860 = !![];
            } else {
               getPlayerUndoStack(
                  _0x248a9e)['pop']();
               throw new Error(
                  'Failed\x20to\x20deduct\x20' +
                  _0x222d70 +
                  '\x20' +
                  _0x26de22 + "(s).");
            }
         } else if (_0x1a95f2[
            "type"] ===
            REQUIRED_BLOCK_MODE_ID &&
            _0x1a95f2[
            "costMap"] instanceof Map &&
            _0x1a95f2["costMap"][
            'size'] > (0x85391 ^
               0x85391)) {
            if (removePlayerItems(
                  _0x248a9e, _0x1a95f2[
                     'costMap'])) {
               _0x248a9e["sendMessage"](
                  '§a使用了需求方塊。'
                  );
               _0x2ff860 = !![];
            } else {
               getPlayerUndoStack(
                  _0x248a9e)["pop"]();
               throw new Error(
                  'Failed\x20to\x20remove\x20required\x20blocks.'
                  );
            }
         } else if (_0x1a95f2[
            'type'] ===
            XP_LEVEL_MODE_ID &&
            _0x1a95f2["amount"] > (
               0x4e1fe ^ 0x4e1fe)) {
            const {
               amount: _0x3e763f
            } = _0x1a95f2;
            if (removePlayerLevels(
                  _0x248a9e, _0x3e763f
                  )) {
               const _0x7a3db6 =
                  _0x3e763f === (
                     0x9554a ^ 0x9554b
                     ) ? "level".split(
                     "").reverse().join(
                     "") : "levels";
               _0x248a9e["sendMessage"](
                  '§aSpent\x20' +
                  _0x3e763f +
                  '\x20' +
                  _0x7a3db6 + ".");
               _0x2ff860 = !![];
            } else {
               getPlayerUndoStack(
                  _0x248a9e)['pop']();
               throw new Error(
                  'Failed\x20to\x20deduct\x20' +
                  _0x3e763f +
                  '\x20levels.');
            }
         } else if (_0x1a95f2['type']) {
            getPlayerUndoStack(
               _0x248a9e)["pop"]();
            throw new Error(
               'Invalid\x20cost\x20information\x20format\x20during\x20deduction\x20attempt.'
               );
         } else {
            _0x2ff860 = !![];
         }
      }
      if (!_0x2ff860) {
         throw new Error(
            'Cost\x20deduction\x20reported\x20failure\x20before\x20placement\x20attempt.'
            );
      }
      let _0x6d16d8 =
         StructureAnimationMode['None'];
      if (_0x1a9a75["animationMode"] ===
         "kcolByBkcolB".split("")
         .reverse().join("")) {
         _0x6d16d8 =
            StructureAnimationMode[
               "Blocks"];
      } else if (_0x1a9a75[
            'animationMode'] ===
         "reyaLyBreyaL".split("")
         .reverse().join("")) {
         _0x6d16d8 =
            StructureAnimationMode[
               'Layers'];
      }
      const _0x24994f = Number(
            _0x1a9a75[
               "animationSeconds"]) ||
         0x842c5 ^ 0x842c5;
      const _0x2f73de = {
         "rotation": _0x24e2ce,
         "mirror": _0x1a9a75[
               "mirror"] ??
            StructureMirrorAxis[
               "None"],
         "animationMode": _0x6d16d8,
         "animationSeconds": _0x24994f,
         "includeBlocks": _0x1a9a75[
               'includeBlocks'] ?? !
            ![],
         "includeEntities": _0x1a9a75[
               "includeEntities"] ??
            !![]
      };
      world["structureManager"]['place']
         (_0x55bd4b, _0x248a9e[
               "dimension"], _0x39ebd3,
            _0x2f73de);
      _0x248a9e['playSound'](
         "random.levelup");
      _0x248a9e["sendMessage"](
          '§a已放置 ' + _0x55bd4b[
            'replace'](
            "mystructure:", ''));
   } catch (_0xba93c3) {
      _0x248a9e["sendMessage"](
         '§cPlacement\x20Error:\x20' +
         _0xba93c3["message"]);
      const _0x4ebb6a =
         getPlayerUndoStack(_0x248a9e);
      if (_0x4ebb6a['length'] > (
            0x1da2b ^ 0x1da2b) &&
         _0x4ebb6a[_0x4ebb6a["length"] -
            (0x42a27 ^ 0x42a26)] ===
         _0x2d6346) {
         const _0x13e2e3 = _0x4ebb6a[
            'pop']();
         _0x248a9e["sendMessage"](
            '§e(Undo\x20state\x20removed\x20due\x20to\x20placement\x20error)'
            );
         if (_0x13e2e3 && _0x13e2e3[
               'cost'] && _0x248a9e[
               "getGameMode"]() !==
            GameMode['creative']) {
            if (_0x13e2e3[
                  'placementMode'] ===
               PAID_MODE_ID &&
               _0x13e2e3["cost"][
               'type'] === PAID_MODE_ID
               ) {
               givePlayerPaymentItem(
                  _0x248a9e,
                  _0x13e2e3["cost"][
                     'itemId'
                  ], _0x13e2e3[
                     "cost"][
                     "amount"]);
               let _0x24d937 =
                  _0x13e2e3["cost"][
                     'itemId'
                  ]["replace"](
                     ":tfarcenim".split(
                        "").reverse()
                     .join(""), '');
               paymentItemOptions[
                  "forEach"]((
                  _0x440f8b,
                  _0x4a0272) => {
                  if (
                     _0x440f8b ===
                     _0x13e2e3[
                        'cost'][
                        "itemId"
                     ])
                     _0x24d937 =
                     _0x4a0272;
               });
               _0x248a9e["sendMessage"](
                  '§e(Refunded\x20' +
                  _0x13e2e3['cost'][
                     "amount"
                  ] + '\x20' +
                  _0x24d937 +
                  '(s)\x20due\x20to\x20error)'
                  );
            } else if (_0x13e2e3[
                  "placementMode"] ===
               REQUIRED_BLOCK_MODE_ID &&
               _0x13e2e3['cost'][
               "type"] ===
               REQUIRED_BLOCK_MODE_ID &&
               _0x13e2e3[
                  "requiredBlocksMap"
                  ] instanceof Map) {
               givePlayerItems(
                  _0x248a9e,
                  _0x13e2e3[
                     "requiredBlocksMap"
                     ]);
               _0x248a9e["sendMessage"](
                  '§e(Refunded\x20required\x20blocks\x20due\x20to\x20error)'
                  );
            } else if (_0x13e2e3[
                  'placementMode'] ===
               XP_LEVEL_MODE_ID &&
               _0x13e2e3['cost'][
               'type'] ===
               XP_LEVEL_MODE_ID &&
               _0x13e2e3["cost"][
                  'amount'
               ] > (0x64ecb ^ 0x64ecb)
               ) {
               givePlayerLevels(
                  _0x248a9e,
                  _0x13e2e3["cost"][
                     "amount"
                  ]);
               const _0x443243 =
                  _0x13e2e3["cost"][
                     'amount'
                  ] === (0x96b2e ^
                     0x96b2f) ?
                  "level" : "levels";
               _0x248a9e['sendMessage'](
                  '§e(Refunded\x20' +
                  _0x13e2e3["cost"][
                     'amount'
                  ] + '\x20' +
                  _0x443243 +
                  '\x20due\x20to\x20error)'
                  );
            }
         }
      } else if (_0x4ebb6a["length"] > (
            0x4465e ^ 0x4465e) &&
         _0x2d6346) {
         console["warn"](
            '[placeStructureInternal\x20Error]\x20Undo\x20stack\x20state\x20mismatch\x20during\x20error\x20handling.'
            );
      }
      console['error'](
         '[placeStructureInternal]\x20Placement\x20Error\x20for\x20player\x20' +
         _0x248a9e["name"] +
         ':\x20' + _0xba93c3["stack"]
         );
   }
}
async function placeMultipleStructures(
   _0x579030, _0x332865, _0xb4908b,
   _0x584414, _0x2df3bb) {
   const _0xbc504d = _0x579030[
         "getDynamicProperty"](
         "erutcurtSdetceles".split(
            "").reverse().join("")
         ) || _0x579030[
         'getDynamicProperty'](
         "erutcurtSdetceleStsal"
         .split("").reverse().join(
            ""));
   if (!_0xbc504d) {
      _0x579030["sendMessage"](
         '§cNo\x20structure\x20selected\x20for\x20multi-place.'
         );
      return;
   }
   try {
      _0xb4908b = JSON["parse"](
         _0xbc504d);
   } catch (_0x4557fb) {
      _0x579030["sendMessage"](
         '§cError\x20reading\x20structure\x20info.'
         );
      return;
   }
   const _0x4d0dcb = _0x579030[
         'getDynamicProperty'](
         "structurePlacementMode") ||
      FREE_MODE_ID;
   const _0x4c1a7a = _0xb4908b["id"];
   const _0x20112b = _0xb4908b[
         "adjustment"] || 0x50f61 ^
      0x50f61;
   let _0xaad19f = null;
   let _0x2a752d = null;
   let _0x508be7 = null;
   let _0x1b2b11 = ![];
   if (_0x579030["getGameMode"]() !==
      GameMode["creative"]) {
      if (_0x4d0dcb ===
         PAID_MODE_ID) {
         const _0x453a61 =
            getPaidModeCost(
               _0x579030, _0xb4908b[
                  "size"]);
         if (!_0x453a61) {
            _0x579030['sendMessage'](
               '§cCould\x20not\x20get\x20item\x20cost.'
               );
            return;
         }
         const _0x346221 = _0x453a61[
            'amount'] * _0x332865[
            "count"];
         const _0x564276 = _0x453a61[
            "itemId"];
         const _0x2f505b = _0x453a61[
            "itemName"];
         _0xaad19f = {
            "type": PAID_MODE_ID,
            "itemId": _0x564276,
            'amount': _0x346221
         };
         _0x2a752d = {
            "type": PAID_MODE_ID,
            "itemId": _0x453a61[
               "itemId"],
            "amount": _0x453a61[
               "amount"]
         };
         if (!checkPlayerPaymentItem(
               _0x579030, _0x564276,
               _0x346221)) {
            _0x579030['sendMessage'](
               '§cNeed\x20' +
               _0x346221 +
               '\x20' +
               _0x2f505b +
               '(s)\x20total.');
            _0x1b2b11 = !![];
         } else {
            _0x579030['sendMessage'](
               '§e總花費: ' +
               _0x346221 +
               '\x20' +
               _0x2f505b +
               '(s).\x20Taking\x20payment...'
               );
            if (!
               removePlayerPaymentItem(
                  _0x579030,
                  _0x564276,
                  _0x346221)) {
               _0x1b2b11 = !![];
            } else {
               _0x579030[
                  "sendMessage"](
                  "§aPaid.");
            }
         }
      } else if (_0x4d0dcb ===
         REQUIRED_BLOCK_MODE_ID) {
         _0x579030["sendMessage"](
            '§eAnalyzing\x20batch\x20requirements...'
            );
         let _0x5210db = null;
         try {
            _0x5210db =
               analyzeStructure(
                  _0x4c1a7a);
         } catch (_0x41a27b) {}
         if (!_0x1b2b11 && (
               _0x5210db === null ||
               !(
                  _0x5210db instanceof Map)
               )) {
            _0x1b2b11 = !![];
         } else if (!_0x1b2b11) {
            if (_0x5210db &&
               _0x5210db["size"] > (
                  0x9e449 ^ 0x9e449)
               ) {
               const _0x356488 =
                  getRequiredModePercentage(
                     _0x579030,
                     _0xb4908b[
                        "size"]);
               _0x579030[
                  'sendMessage'](
                  "(e\xA7".split(
                     "").reverse()
                  .join("") +
                  _0x356488 +
                  '%\x20required\x20per\x20structure)'
                  );
               const _0x19f08d =
                  new Map();
               _0x508be7 = new Map();
               const _0x448007 = [...
                  _0x5210db[
                     'entries']()
               ]["sort"](([,
                     _0x1f39bc
                  ], [,
                     _0xad8227
                  ]) =>
                  _0xad8227 -
                  _0x1f39bc);
               const _0x1bf0d4 =
                  new Set(_0x448007[
                     'slice'](
                     0xf3f84 ^
                     0xf3f84,
                     MAX_REQUIRED_TYPES
                     )["map"](([
                        _0x1e1ca0
                     ]) =>
                     _0x1e1ca0));
               for (const [_0x114551,
                     _0x19f132
                  ] of _0x448007) {
                  if (_0x1bf0d4[
                        'has'](
                        _0x114551)) {
                     const
                        _0x44449a =
                        Number(
                           _0x19f132
                           );
                     if (isNaN(
                           _0x44449a
                           ))
                        continue;
                     const
                        _0x42d6c2 =
                        Math['ceil'](
                           _0x44449a *
                           (_0x356488 /
                              (0xbd419 ^
                                 0xbd47d
                                 )));
                     if (_0x42d6c2 >
                        (0x31b7c ^
                           0x31b7c)
                        ) {
                        _0x508be7[
                           "set"](
                           _0x114551,
                           _0x42d6c2
                           );
                        _0x19f08d[
                           'set'](
                           _0x114551,
                           _0x42d6c2 *
                           _0x332865[
                              "count"
                              ]);
                     }
                  }
               }
               _0x2a752d = {
                  "type": REQUIRED_BLOCK_MODE_ID,
                  "costMap": _0x508be7[
                        'size'] >
                     (0x2e768 ^
                        0x2e768) ?
                     _0x508be7 :
                     null
               };
               _0xaad19f = {
                  "type": REQUIRED_BLOCK_MODE_ID,
                  "costMap": _0x19f08d[
                        "size"] >
                     (0x663f0 ^
                        0x663f0) ?
                     _0x19f08d :
                     null
               };
               if (_0x19f08d[
                  "size"] === (
                     0x7cb58 ^
                     0x7cb58)) {
                  _0x579030[
                     'sendMessage'
                     ](
                     '§aTop\x20blocks\x20need\x200\x20items\x20at\x20' +
                     _0x356488 +
                     '%.\x20Placing\x20batch\x20for\x20free.'
                     );
               } else {
                  _0x579030[
                     'sendMessage'
                     ](
                     '§eVerifying\x20total\x20required\x20blocks...'
                     );
                  if (!
                     checkPlayerItems(
                        _0x579030,
                        _0x19f08d)) {
                     _0x579030[
                        'sendMessage'
                        ](
                        '§cMissing\x20required\x20blocks\x20for\x20' +
                        _0x332865[
                           "count"
                           ] +
                        '\x20structures.'
                        );
                     _0x1b2b11 = !
                  ![];
                  } else {
                     _0x579030[
                        "sendMessage"
                        ](
                        '§eRemoving\x20required\x20blocks...'
                        );
                     if (!
                        removePlayerItems(
                           _0x579030,
                           _0x19f08d)
                        ) {
                        _0x1b2b11 = !
                           ![];
                     } else {
                        _0x579030[
                           "sendMessage"
                           ](
                           '§aBatch\x20requirements\x20met.'
                           );
                     }
                  }
               }
            } else {
               _0x579030[
                  'sendMessage'](
                  '§aStructure\x20requires\x20no\x20blocks.\x20Placing\x20batch\x20for\x20free.'
                  );
               _0xaad19f = null;
               _0x2a752d = null;
               _0x508be7 = null;
            }
         }
      } else if (_0x4d0dcb ===
         XP_LEVEL_MODE_ID) {
         const _0x52095d =
            getXpLevelModeCost(
               _0x579030, _0xb4908b[
                  'size']);
         if (_0x52095d === null) {
            _0x579030["sendMessage"](
               '§cCould\x20not\x20get\x20level\x20cost.'
               );
            return;
         }
         if (_0x52095d <= (0x5e73c ^
               0x5e73c)) {
            _0x579030["sendMessage"](
               '§aStructures\x20cost\x200\x20levels.\x20Placing\x20batch\x20for\x20free.'
               );
            _0xaad19f = null;
            _0x2a752d = null;
         } else {
            const _0x5096b6 =
               _0x52095d * _0x332865[
                  "count"];
            _0xaad19f = {
               'type': XP_LEVEL_MODE_ID,
               "amount": _0x5096b6
            };
            _0x2a752d = {
               "type": XP_LEVEL_MODE_ID,
               "amount": _0x52095d
            };
            if (!checkPlayerLevels(
                  _0x579030,
                  _0x5096b6)) {
               _0x579030[
                  "sendMessage"](
                  '§cNeed\x20' +
                  _0x5096b6 +
                  '\x20levels\x20total.\x20Have\x20' +
                  _0x579030[
                     "level"] +
                  ".");
               _0x1b2b11 = !![];
            } else {
               const _0x147019 =
                  _0x5096b6 === (
                     0x54047 ^
                     0x54046) ?
                  "level" : "slevel"
                  .split("")
                  .reverse().join(
                  "");
               _0x579030[
                  "sendMessage"](
                  '§e總花費: ' +
                  _0x5096b6 +
                  '\x20' +
                  _0x147019 +
                  '§e收取費用中...'
                  );
               if (!
                  removePlayerLevels(
                     _0x579030,
                     _0x5096b6)) {
                  _0x1b2b11 = !![];
               } else {
                  _0x579030[
                     'sendMessage'
                     ]("§aPaid.");
               }
            }
         }
      }
   }
   if (_0x1b2b11) {
      _0x579030["sendMessage"](
         '§cMulti-placement\x20aborted\x20due\x20to\x20cost/requirement\x20issues.'
         );
      return;
   }
   const _0x4926a0 = _0x579030[
         'getBlockFromViewDirection']
      ({
         'maxDistance': 0x64,
         'includeLiquidBlocks':
         ![],
         "includePassableBlocks":
            ![]
      });
   if (!_0x4926a0) {
      _0x579030['sendMessage'](
         '§cNo\x20valid\x20target\x20block\x20found\x20for\x20placement\x20center.'
         );
      if (_0x579030["getGameMode"]
      () !== GameMode["creative"] &&
         _0xaad19f) {
         _0x579030['sendMessage'](
            '§e因目標錯誤退還批次費用...'
            );
         if (_0xaad19f['type'] ===
            PAID_MODE_ID &&
            _0xaad19f["itemId"] &&
            _0xaad19f["amount"] > (
               0x2cf3d ^ 0x2cf3d)) {
            givePlayerPaymentItem(
               _0x579030,
               _0xaad19f[
               "itemId"],
               _0xaad19f["amount"]
               );
            let _0x5db3a3 =
               _0xaad19f["itemId"][
                  "replace"
               ]("minecraft:", '');
            paymentItemOptions[
               "forEach"]((
               _0xd19eef,
               _0x1dac0f) => {
               if (
                  _0xd19eef ===
                  _0xaad19f[
                     'itemId'])
                  _0x5db3a3 =
                  _0x1dac0f;
            });
            _0x579030['sendMessage'](
               '§e(Refunded\x20' +
               _0xaad19f[
               "amount"] +
               '\x20' +
               _0x5db3a3 + "))s("
               .split("")
               .reverse().join("")
               );
         } else if (_0xaad19f[
            "type"] ===
            REQUIRED_BLOCK_MODE_ID &&
            _0xaad19f[
            "costMap"] instanceof Map &&
            _0xaad19f['costMap'][
               "size"
            ] > (0x268b0 ^ 0x268b0)
            ) {
            givePlayerItems(
               _0x579030,
               _0xaad19f[
                  'costMap']);
            _0x579030['sendMessage'](
               '§e(Refunded\x20required\x20blocks)'
               );
         } else if (_0xaad19f[
            'type'] ===
            XP_LEVEL_MODE_ID &&
            _0xaad19f["amount"] > (
               0xa593c ^ 0xa593c)) {
            givePlayerLevels(
               _0x579030,
               _0xaad19f["amount"]
               );
            const _0x2ac90a =
               _0xaad19f[
               "amount"] === (
                  0xe27b2 ^ 0xe27b3
                  ) ? "level" :
               "levels";
            _0x579030['sendMessage'](
               '§e(Refunded\x20' +
               _0xaad19f[
               'amount'] +
               '\x20' +
               _0x2ac90a + ")");
         }
      }
      return;
   }
   const _0x354ce8 = _0x4926a0[
      "block"]["location"];
   const _0x1a8401 = _0x579030[
      'dimension'];
   _0x584414 = 0x890aa ^ 0x890aa;
   const _0x3b0769 = [];
   const _0x36f4c6 = _0x332865[
      'spacing'] * _0x332865[
      "spacing"];
   _0x2df3bb = 0x3b6ae ^ 0x3b6ae;
   const _0x75290f = _0x332865[
      'count'] * (0xc7c7b ^
      0xc7d8f);
   let _0x1adc92 = null;
   const _0x5c58d4 = () => {
      if (_0x584414 >= _0x332865[
            'count']) {
         _0x579030["sendMessage"](
            '§a已完成放置 ' +
            _0x584414 +
            ' 結構.');
         return;
      }
      if (_0x2df3bb >=
         _0x75290f) {
         _0x579030["sendMessage"](
            '§eStopped\x20multi-place\x20after\x20' +
            _0x2df3bb +
            '\x20attempts\x20(placed\x20' +
            _0x584414 + "/" +
            _0x332865[
            'count'] + ").");
         return;
      }
      let _0x32ae43 = ![];
      let _0x3cac1e = null;
      const _0x65b775 = 0xadb37 ^
         0xadb05;
      let _0x33d8fa = 0x49431 ^
         0x49431;
      while (!_0x32ae43 &&
         _0x33d8fa < _0x65b775 &&
         _0x2df3bb < _0x75290f) {
         _0x33d8fa++;
         _0x2df3bb++;
         const _0x57a4d9 = Math[
            "random"]() * Math[
            "PI"] * (0xc4019 ^
            0xc401b);
         const _0x43bada = Math[
               "random"]() *
            _0x332865['spacing'] *
            (0x46ca6 ^ 0x46ca4);
         const _0x464bf9 =
            _0x354ce8["x"] + Math[
               "cos"](_0x57a4d9) *
            _0x43bada;
         const _0x1f449a =
            _0x354ce8["z"] + Math[
               'sin'](_0x57a4d9) *
            _0x43bada;
         const _0x13d04c = Math[
            'floor'](_0x464bf9);
         const _0x4fe98f = Math[
            'floor'](_0x1f449a);
         try {
            const _0x293a0a =
               _0x1a8401[
                  "getTopmostBlock"
                  ]({
                     "x": _0x13d04c,
                     "z": _0x4fe98f
                  }, 0xdeb46 ^
                  0xdea06);
            if (_0x293a0a) {
               const _0x43b9ce = {
                  "x": _0x13d04c,
                  "y": _0x293a0a[
                        "location"
                        ][
                     "y"] + (
                        0x1e622 ^
                        0x1e623
                        ) +
                     _0x20112b,
                  "z": _0x4fe98f
               };
               const _0x5d3109 =
                  _0x3b0769[
                     "some"](
                     _0x12dc87 =>
                     Math["pow"](
                        _0x12dc87[
                           "x"] -
                        _0x43b9ce[
                           "x"],
                        0xa79e4 ^
                        0xa79e6) +
                     Math["pow"](
                        _0x12dc87[
                           "z"] -
                        _0x43b9ce[
                           "z"],
                        0x6daba ^
                        0x6dab8) <
                     _0x36f4c6);
               if (!_0x5d3109) {
                  _0x3cac1e =
                     _0x43b9ce;
                  _0x32ae43 = !
               ![];
               }
            }
         } catch (_0x51b664) {}
      }
      if (!_0x32ae43) {
         const _0x2e7bf2 =
            _0x36f4c6 * 0.25;
         for (let _0x55f7af =
               0xa9799 ^
               0xa9799; _0x55f7af <
            _0x65b775 && !
            _0x32ae43 &&
            _0x2df3bb <
            _0x75290f; _0x55f7af++
            ) {
            _0x2df3bb++;
            const _0x5108af =
               Math["random"]() *
               Math['PI'] * (
                  0x9d65d ^
                  0x9d65f);
            const _0x23da17 =
               Math["random"]() *
               _0x332865[
                  'spacing'];
            const _0x285746 =
               _0x354ce8["x"] +
               Math["cos"](
                  _0x5108af) *
               _0x23da17;
            const _0x46c15d =
               _0x354ce8["z"] +
               Math["sin"](
                  _0x5108af) *
               _0x23da17;
            const _0x183051 =
               Math["floor"](
                  _0x285746);
            const _0x144121 =
               Math["floor"](
                  _0x46c15d);
            try {
               const _0x12bf3a =
                  _0x1a8401[
                     "getTopmostBlock"
                     ]({
                        "x": _0x183051,
                        "z": _0x144121
                     }, 0xcac3d ^
                     0xcad7d);
               if (_0x12bf3a) {
                  const
                     _0x2f3333 = {
                        "x": _0x183051,
                        "y": _0x12bf3a[
                              'location'
                              ][
                              "y"
                           ] + (
                              0xe68e5 ^
                              0xe68e4
                              ) +
                           _0x20112b,
                        "z": _0x144121
                     };
                  const
                     _0x89d35a =
                     _0x3b0769[
                        "some"](
                        _0x39b63f =>
                        Math[
                           "pow"](
                           _0x39b63f[
                              "x"
                              ] -
                           _0x2f3333[
                              "x"
                              ],
                           0xac1cf ^
                           0xac1cd
                           ) +
                        Math[
                           "pow"](
                           _0x39b63f[
                              "z"
                              ] -
                           _0x2f3333[
                              "z"
                              ],
                           0x5a59e ^
                           0x5a59c
                           ) <
                        _0x2e7bf2
                        );
                  if (!
                     _0x89d35a) {
                     _0x3cac1e =
                        _0x2f3333;
                     _0x32ae43 = !
                        ![];
                  }
               }
            } catch (_0x267a16) {}
         }
      }
      if (!_0x32ae43) {
         for (let _0x99b8d3 =
               0x4a337 ^
               0x4a337; _0x99b8d3 <
            _0x65b775 && !
            _0x32ae43 &&
            _0x2df3bb <
            _0x75290f; _0x99b8d3++
            ) {
            _0x2df3bb++;
            const _0x30d465 =
               Math['random']() *
               Math['PI'] * (
                  0x3325c ^
                  0x3325e);
            const _0x1c0f3c =
               Math["random"]() *
               _0x332865[
                  'spacing'];
            const _0x3954c2 =
               _0x354ce8["x"] +
               Math["cos"](
                  _0x30d465) *
               _0x1c0f3c;
            const _0x43dfaa =
               _0x354ce8["z"] +
               Math["sin"](
                  _0x30d465) *
               _0x1c0f3c;
            const _0x286ad4 =
               Math["floor"](
                  _0x3954c2);
            const _0x215a8e =
               Math['floor'](
                  _0x43dfaa);
            try {
               const _0x862968 =
                  _0x1a8401[
                     'getTopmostBlock'
                     ]({
                        "x": _0x286ad4,
                        "z": _0x215a8e
                     }, 0x326f7 ^
                     0x327b7);
               if (_0x862968) {
                  _0x3cac1e = {
                     "x": _0x286ad4,
                     "y": _0x862968[
                           "location"
                           ][
                           "y"
                        ] + (
                           0x3d4e6 ^
                           0x3d4e7
                           ) +
                        _0x20112b,
                     "z": _0x215a8e
                  };
                  _0x32ae43 = !
               ![];
               }
            } catch (_0x2bccc7) {}
         }
      }
      if (!_0x32ae43) {
         _0x579030["sendMessage"](
            '§eCould\x20not\x20find\x20valid\x20location\x20for\x20structure\x20' +
            (_0x584414 + (
               0x1ff0e ^
               0x1ff0f)) +
            '.\x20Skipping.');
         _0x2df3bb += _0x65b775;
         if (_0x2df3bb <
            _0x75290f &&
            _0x584414 < _0x332865[
               "count"]) {
            system["runTimeout"](
               _0x5c58d4,
               0xaf55d ^
               0xaf55c);
         } else {
            _0x579030[
               'sendMessage'](
               '§aFinished\x20multi-place\x20attempts.'
               );
         }
         return;
      }
      let _0x507909 =
         StructureRotation[
         'None'];
      if (_0x332865[
            "randomRotation"]) {
         const _0x331333 = [
            StructureRotation[
               'None'],
            StructureRotation[
               "Rotate90"],
            StructureRotation[
               "Rotate180"],
            StructureRotation[
               'Rotate270']
         ];
         _0x507909 = _0x331333[
            Math['floor'](Math[
                  'random']() *
               _0x331333[
                  "length"])];
      }
      try {
         let _0x1dcb08 = {
            ..._0xb4908b[
               "size"]
         };
         if (_0x507909 ===
            StructureRotation[
               "Rotate90"] ||
            _0x507909 ===
            StructureRotation[
               'Rotate270']) {
            _0x1dcb08 = {
               "x": _0xb4908b[
                  "size"][
                  "z"
               ],
               "y": _0xb4908b[
                  "size"][
                  "y"
               ],
               "z": _0xb4908b[
                  "size"][
                  "x"
               ]
            };
         }
         _0x1adc92 =
            saveCurrentState(
               _0x579030,
               _0x3cac1e,
               _0x1dcb08,
               _0x4d0dcb,
               _0x2a752d,
               _0x4d0dcb ===
               REQUIRED_BLOCK_MODE_ID ?
               _0x508be7 : null);
         getPlayerUndoStack(
            _0x579030)["push"](
            _0x1adc92);
         let _0x3ff225 =
            StructureAnimationMode[
               'None'];
         if (_0xb4908b[
               "animationMode"
               ] ===
            "BlockByBlock")
            _0x3ff225 =
            StructureAnimationMode[
               'Blocks'];
         else if (_0xb4908b[
               "animationMode"
               ] ===
            "reyaLyBreyaL".split(
               "").reverse().join(
               "")) _0x3ff225 =
            StructureAnimationMode[
               "Layers"];
         const _0x35d7bc = Number(
               _0xb4908b[
                  "animationSeconds"
                  ]) || 0x8f4b0 ^
            0x8f4b0;
         const _0xf9d548 = {
            'rotation': _0x507909,
            "mirror": _0xb4908b[
                  "mirror"] ??
               StructureMirrorAxis[
                  "None"],
            'animationMode': _0x3ff225,
            "animationSeconds": _0x35d7bc,
            'includeBlocks': _0xb4908b[
               "includeBlocks"
               ] ?? !![],
            "includeEntities": _0xb4908b[
               "includeEntities"
               ] ?? !![]
         };
         world["structureManager"]
            ["place"](_0x4c1a7a,
               _0x1a8401,
               _0x3cac1e,
               _0xf9d548);
         _0x3b0769["push"]({
            "x": _0x3cac1e[
               "x"],
            "z": _0x3cac1e[
               "z"]
         });
         _0x584414++;
         if (_0x584414 % (
               0x3aafb ^ 0x3aafe
               ) === (0xcd447 ^
               0xcd447) ||
            _0x584414 ===
            _0x332865["count"]) {
            _0x579030[
               'sendMessage'](
                '§a已放置 ' +
               _0x584414 +
               "/" + _0x332865[
                  "count"] +
               ' 結構'
               );
         }
         if (_0x584414 <
            _0x332865['count']) {
            system["runTimeout"](
               _0x5c58d4,
               PLACE_INTERVAL);
         }
      } catch (_0x5bfdcc) {
         _0x579030['sendMessage'](
            '§cError\x20placing\x20structure\x20' +
            (_0x584414 + (
               0xec856 ^
               0xec857)) +
            ':\x20' +
            _0x5bfdcc[
               'message']);
         console["error"](
            '[Multi-Place]\x20Error\x20placing\x20structure\x20' +
            (_0x584414 + (
               0x90fd6 ^
               0x90fd7)) +
            '\x20for\x20' +
            _0x579030["name"] +
            ':\x20' +
            _0x5bfdcc["stack"]);
         const _0x21b44e =
            getPlayerUndoStack(
               _0x579030);
         if (_0x21b44e['length'] >
            (0xcbb3f ^ 0xcbb3f) &&
            _0x21b44e[_0x21b44e[
               'length'] - (
               0xe4497 ^
               0xe4496)] ===
            _0x1adc92) {
            _0x21b44e["pop"]();
            _0x579030[
               "sendMessage"](
               '§e(Undo\x20state\x20for\x20failed\x20structure\x20removed)'
               );
         } else if (_0x21b44e[
               "length"] > (
               0x69e6f ^ 0x69e6f
               ) && _0x1adc92) {
            console["warn"](
               '[Multi-Place\x20Error]\x20Undo\x20stack\x20state\x20mismatch\x20during\x20error\x20handling.'
               );
         }
         _0x2df3bb++;
         if (_0x584414 <
            _0x332865["count"] &&
            _0x2df3bb < _0x75290f
            ) {
            system['runTimeout'](
               _0x5c58d4,
               PLACE_INTERVAL);
         } else {
            _0x579030[
               "sendMessage"](
               '§aFinished\x20multi-place\x20attempts\x20after\x20error.'
               );
         }
      }
   };
   _0x579030["sendMessage"](
      '§eStarting\x20multi-placement\x20of\x20' +
      _0x332865["count"] +
      '\x20structures...');
   system['run'](_0x5c58d4);
}

function mainMenu(_0xe114ae, _0x3921db,
   _0x4eea50) {
   const _0x441982 = _0xe114ae[
      'getDynamicProperty'](
      "lastSelectedStructure");
   const _0xb14769 = _0x441982 ? JSON[
         "parse"](_0x441982)['id'][
         'replace'
      ]("mystructure:", '') :
      "enoN7\xA7".split("").reverse()
      .join("");
   const _0x357ece = _0xe114ae[
         'getDynamicProperty'](
         "structurePlacementMode") ||
      FREE_MODE_ID;
   const _0xc718ff = getPlayerUndoStack(
      _0xe114ae)["length"];
   const _0x136c45 = _0xc718ff > (
         0x5133e ^ 0x5133e) ?
      '撤消\x20(' + _0xc718ff + ")" :
      "Undo";
   const _0x44d764 = _0xc718ff > (
         0x47260 ^ 0x47260) ?
      '§3Removes\x20last\x20placement' :
      '§7Nothing\x20to\x20undo';
   _0x3921db = "eerFa\xA7".split("")
      .reverse().join("");
   _0x4eea50 =
      "gnp.noci_tfig_eerf/iu/serutxet"
      .split("").reverse().join("");
   if (_0x357ece === PAID_MODE_ID) {
      const _0x1ed67e = _0xe114ae[
            "getDynamicProperty"](
            PAID_MODE_ITEM_ID_PROP) ??
         DEFAULT_PAID_ITEM_ID;
      const _0x3bb3d5 = _0xe114ae[
            "getDynamicProperty"](
            COST_SMALL_PROP) ??
         DEFAULT_COST_SMALL;
      let _0x13a80b = _0x1ed67e[
         "replace"]("minecraft:", '');
      _0x4eea50 =
         "textures/items/emerald.png";
      paymentItemOptions["forEach"]((
         _0x143ebd, _0x3528fb
         ) => {
         if (_0x143ebd ===
            _0x1ed67e) {
            _0x13a80b = _0x3528fb;
         }
      });
      _0x3921db = '§6Paid\x20(§e' +
         _0x3bb3d5 + '+\x20' +
         _0x13a80b + "s§6)";
   } else if (_0x357ece ===
      REQUIRED_BLOCK_MODE_ID) {
      const _0x238be1 = _0xe114ae[
            'getDynamicProperty'](
            REQ_PERC_SMALL_PROP) ??
         DEFAULT_REQ_PERC_SMALL;
      _0x3921db = '§bRequired\x20(' +
         _0x238be1 + '%+\x20Top\x20' +
         MAX_REQUIRED_TYPES + ")§r";
      _0x4eea50 =
         "gnp.pot_elbat_gnitfarc/skcolb/serutxet"
         .split("").reverse().join("");
   } else if (_0x357ece ===
      XP_LEVEL_MODE_ID) {
      const _0x2b3b8e = _0xe114ae[
            'getDynamicProperty'](
            XP_LEVEL_COST_SMALL_PROP) ??
         DEFAULT_XP_LEVEL_COST_SMALL;
      const _0x142883 = _0x2b3b8e === (
            0x1fac8 ^ 0x1fac9) ? "level"
         .split("").reverse().join("") :
         "slevel".split("").reverse()
         .join("");
      _0x3921db = '§2XP\x20Mode\x20(' +
         _0x2b3b8e + '+\x20' +
         _0x142883 + ")";
      _0x4eea50 =
         "gnp.elttob_ecneirepxe/smeti/serutxet"
         .split("").reverse().join("");
   }
   const _0x2d006d =
      new ActionFormData()["title"](
         '§e瞬間結構')[
         "body"](
         '§e§lv7.2.3\x20§r\x0a§fLast\x20Selected:\x20§b' +
         _0xb14769 +
         '\x0a§fPlacement\x20Mode:\x20' +
         _0x3921db)['button'](
         '選擇結構',
         "gnp.noitcurtsnoc_epicer_noci/iu/serutxet"
         .split("").reverse().join(""))[
         "button"]( '放置結構',
         "textures/ui/hammer_l.png")[
         "button"]('放置多個',
         "textures/ui/hammer_square.png"
         )['button'](_0x136c45 +
         '\x0a' + _0x44d764,
         "textures/gui/newgui/undo.png"
         )['button']("sgnitteS".split(
            "").reverse().join(""),
         "textures/ui/settings_glyph_color_2x.png"
         )['button']("關閉",
         "textures/ui/redX1.png");
   _0x2d006d["show"](_0xe114ae)['then'](
      _0x307e62 => {
         if (_0x307e62["canceled"])
            return;
         switch (_0x307e62[
               "selection"]) {
            case 0x270e1 ^ 0x270e1:
               structureSelectionMenu
                  (_0xe114ae);
               break;
            case 0x3a4fb ^ 0x3a4fa:
               placeSelectedStructure
                  (_0xe114ae)[
                     'catch'](
                     _0x4db93b =>
                     console["error"]
                     ('[MainMenu]\x20placeSelectedStructure\x20Error:\x20' +
                        _0x4db93b[
                           'stack'])
                     );
               break;
            case 0x7135a ^ 0x71358:
               showMultiPlaceSettings
                  (_0xe114ae);
               break;
            case 0x9e389 ^ 0x9e38a:
               undoLastPlacement(
                  _0xe114ae);
               break;
            case 0x6b37d ^ 0x6b379:
               showSettingsMenu(
                  _0xe114ae);
               break;
            case 0xcdccd ^ 0xcdcc8:
               break;
         }
      })['catch'](_0x1002db => {
      console["error"](
         '[MainMenu]\x20Form\x20Error:\x20' +
         _0x1002db['stack']);
      _0xe114ae['sendMessage'](
         '§cError\x20displaying\x20main\x20menu.'
         );
   });
}

function showSettingsMenu(_0x5f1995,
   _0x17fa1e, _0x3805e4) {
   const _0x1bdce1 = _0x5f1995[
         'getDynamicProperty'](
         "structurePlacementMode") ||
      FREE_MODE_ID;
   _0x17fa1e = "eerFa\xA7".split("")
      .reverse().join("");
   _0x3805e4 =
      "gnp.noci_tfig_eerf/iu/serutxet"
      .split("").reverse().join("");
   if (_0x1bdce1 === PAID_MODE_ID) {
      const _0x20effe = _0x5f1995[
            "getDynamicProperty"](
            PAID_MODE_ITEM_ID_PROP) ??
         DEFAULT_PAID_ITEM_ID;
      const _0x2d4010 = _0x5f1995[
            'getDynamicProperty'](
            COST_SMALL_PROP) ??
         DEFAULT_COST_SMALL;
      let _0x371507 = _0x20effe[
         'replace'](":tfarcenim"
         .split("").reverse().join(
            ""), '');
      _0x3805e4 =
         "textures/items/emerald.png";
      paymentItemOptions["forEach"]((
         _0x350983, _0x597831
         ) => {
         if (_0x350983 ===
            _0x20effe) _0x371507 =
            _0x597831;
      });
      _0x17fa1e = '§6Paid\x20(§e' +
         _0x2d4010 + '+\x20' +
         _0x371507 + ")6\xA7s".split("")
         .reverse().join("");
   } else if (_0x1bdce1 ===
      REQUIRED_BLOCK_MODE_ID) {
      const _0x19c6ba = _0x5f1995[
            "getDynamicProperty"](
            REQ_PERC_SMALL_PROP) ??
         DEFAULT_REQ_PERC_SMALL;
      _0x17fa1e = '§bRequired\x20(' +
         _0x19c6ba + '%+\x20Top\x20' +
         MAX_REQUIRED_TYPES + ")§r";
      _0x3805e4 =
         "textures/blocks/crafting_table_top.png";
   } else if (_0x1bdce1 ===
      XP_LEVEL_MODE_ID) {
      const _0x1f1ce1 = _0x5f1995[
            'getDynamicProperty'](
            XP_LEVEL_COST_SMALL_PROP) ??
         DEFAULT_XP_LEVEL_COST_SMALL;
      const _0x21d02c = _0x1f1ce1 === (
            0x442ae ^ 0x442af) ? "level"
         .split("").reverse().join("") :
         "slevel".split("").reverse()
         .join("");
      _0x17fa1e = '§2XP\x20Mode\x20(' +
         _0x1f1ce1 + '+\x20' +
         _0x21d02c + ")";
      _0x3805e4 =
         "textures/items/experience_bottle.png";
   }
   const _0x292eaf =
      new ActionFormData()["title"](
         "Settings")["body"](
        '配置放置選項。'
         )['button'](
         '放置模式: ' +
         _0x17fa1e, _0x3805e4)['button']
      ('清除撤消歷史',
         "textures/ui/trash.png")[
         'button']("kcaB".split("")
         .reverse().join(""),
         "gnp.tfel_worra/iu/serutxet"
         .split("").reverse().join(""));
   _0x292eaf["show"](_0x5f1995)["then"](
      _0x5b46d2 => {
         if (_0x5b46d2["canceled"]) {
            mainMenu(_0x5f1995);
            return;
         }
         switch (_0x5b46d2[
               'selection']) {
            case 0x86e97 ^ 0x86e97:
               if (_0x5f1995[
                     'getGameMode']
               () === GameMode[
                     "creative"]) {
                  showPlacementModeSelection_Buttons
                     (_0x5f1995);
               } else {
                  _0x5f1995[
                     "sendMessage"
                     ](
                     '§cOnly\x20players\x20in\x20creative\x20mode\x20can\x20change\x20placement\x20mode\x20settings.'
                     );
                  showSettingsMenu(
                     _0x5f1995);
               }
               break;
            case 0xb95fe ^ 0xb95ff:
               const _0x696296 =
                  getPlayerUndoStack(
                     _0x5f1995)[
                     "length"];
               if (_0x696296 > (
                     0xbaf17 ^
                     0xbaf17)) {
                  clearPlayerUndoStack
                     (_0x5f1995);
                  _0x5f1995[
                     "sendMessage"
                     ](
                     '§aCleared\x20' +
                     _0x696296 +
                     '\x20items\x20from\x20your\x20undo\x20history.'
                     );
               } else {
                  _0x5f1995[
                     "sendMessage"
                     ](
                     '§eUndo\x20history\x20is\x20already\x20empty.'
                     );
               }
               showSettingsMenu(
                  _0x5f1995);
               break;
            case 0x70db8 ^ 0x70dba:
               mainMenu(_0x5f1995);
               break;
         }
      })['catch'](_0x10253c => {
      console["error"](
         '[showSettingsMenu]\x20Form\x20Error:\x20' +
         _0x10253c['stack']);
      _0x5f1995["sendMessage"](
         '§cAn\x20error\x20occurred\x20displaying\x20the\x20settings\x20form.'
         );
      mainMenu(_0x5f1995);
   });
}

function showPlacementModeSelection_Buttons(
   _0x580d7d, _0x499478) {
   const _0xd2ad4 = _0x580d7d[
         'getDynamicProperty'](
         PAID_MODE_ITEM_ID_PROP) ??
      DEFAULT_PAID_ITEM_ID;
   _0x499478 = "Item";
   paymentItemOptions["forEach"]((
      _0x5c5212, _0x1516a9) => {
      if (_0x5c5212 === _0xd2ad4)
         _0x499478 = _0x1516a9;
   });
   const _0x49ac00 = _0x580d7d[
         'getDynamicProperty'](
         COST_SMALL_PROP) ??
      DEFAULT_COST_SMALL;
   const _0xce8092 = '§7Cost:\x20' +
      _0x49ac00 + '+\x20' + _0x499478 +
      's\x20(Size\x20Based)';
   const _0x29791c = _0x580d7d[
         "getDynamicProperty"](
         REQ_PERC_SMALL_PROP) ??
      DEFAULT_REQ_PERC_SMALL;
   const _0x366a8b = '§7Need\x20' +
      _0x29791c + '%+\x20Top\x20' +
      MAX_REQUIRED_TYPES +
      '\x20Blocks\x20(Size\x20Based)';
   const _0x3518ec = _0x580d7d[
         "getDynamicProperty"](
         XP_LEVEL_COST_SMALL_PROP) ??
      DEFAULT_XP_LEVEL_COST_SMALL;
   const _0xd619c2 = _0x3518ec === (
         0x5dbad ^ 0x5dbac) ? "level" :
      "levels";
   const _0x43b753 = '§7Cost:\x20' +
      _0x3518ec + '+\x20' + _0xd619c2 +
      '\x20(Size\x20Based)';
   const _0x53f7ac =
   new ActionFormData()["title"](
      '選擇放置模式')[
      'body'](
      '選擇結構的放置方式。\x0a(僅限創造模式設定)'
      );
   _0x53f7ac["button"](
      '§a免費模式\x0a§7無需花費或要求。'
      );
   _0x53f7ac["button"](
      '§6付費模式\x0a' +
      _0xce8092,
      "textures/items/emerald.png");
   _0x53f7ac["button"](
      '§bRequired\x20Blocks\x0a' +
      _0x366a8b,
      "gnp.pot_elbat_gnitfarc/skcolb/serutxet"
      .split("").reverse().join(""));
   _0x53f7ac['button'](
      '§2XP\x20Level\x20Mode\x0a' +
      _0x43b753,
      "textures/items/experience_bottle.png"
      );
   _0x53f7ac['button']("lecnaC7\xA7"
      .split("").reverse().join(""),
      "textures/ui/redX1.png");
   _0x53f7ac['show'](_0x580d7d)["then"](
      _0x3c2320 => {
         if (_0x3c2320["canceled"] ||
            _0x3c2320[
            "selection"] === (
               0x59e69 ^ 0x59e6d)) {
            showSettingsMenu(
               _0x580d7d);
            return;
         }
         switch (_0x3c2320[
               'selection']) {
            case 0x625e0 ^ 0x625e0:
               _0x580d7d[
                  "setDynamicProperty"
                  ](
                  "edoMtnemecalPerutcurts"
                  .split("")
                  .reverse().join(
                     ""),
                  FREE_MODE_ID);
               _0x580d7d[
                  'sendMessage'](
                  '§aSettings\x20updated.\x20Mode\x20set\x20to:\x20§aFree'
                  );
               showSettingsMenu(
                  _0x580d7d);
               break;
            case 0x18da8 ^ 0x18da9:
               showPaidModeSettingsForm
                  (_0x580d7d);
               break;
            case 0x97d5f ^ 0x97d5d:
               showRequiredModeSettingsForm
                  (_0x580d7d);
               break;
            case 0xc9f9b ^ 0xc9f98:
               showXpLevelModeSettingsForm
                  (_0x580d7d);
               break;
         }
      })["catch"](_0x5237c7 => {
      console['error'](
         '[showPlacementModeSelection_Buttons]\x20Form\x20Error:\x20' +
         _0x5237c7["stack"]);
      _0x580d7d['sendMessage'](
         '§cAn\x20error\x20occurred\x20displaying\x20the\x20mode\x20selection\x20form.'
         );
      showSettingsMenu(_0x580d7d);
   });
}

function showPaidModeSettingsForm(
   _0x1a6273) {
   const _0x605b53 = _0x1a6273[
         'getDynamicProperty'](
         PAID_MODE_ITEM_ID_PROP) ??
      DEFAULT_PAID_ITEM_ID;
   const _0x4bb459 = _0x1a6273[
         'getDynamicProperty'](
         COST_SMALL_PROP) ??
      DEFAULT_COST_SMALL;
   const _0x4d0ea9 = _0x1a6273[
         'getDynamicProperty'](
         COST_MEDIUM_PROP) ??
      DEFAULT_COST_MEDIUM;
   const _0xd8390c = _0x1a6273[
         "getDynamicProperty"](
         COST_LARGE_PROP) ??
      DEFAULT_COST_LARGE;
   const _0x18b4a6 = paymentItemIds[
      "indexOf"](_0x605b53);
   const _0x212fa4 = Math["max"](
      0xcc71b ^ 0xcc71b, _0x18b4a6);
   const _0x3d9866 =
   new ModalFormData()['title'](
         'Configure\x20Paid\x20Mode')[
         "dropdown"]('Payment\x20Item',
         paymentItemDisplayNames,
         _0x212fa4)["slider"](
         'Cost:\x20Small\x20(<=\x20' +
         SMALL_VOLUME_THRESHOLD +
         '\x20vol)', 0x8f233 ^ 0x8f232,
         0xa9789 ^ 0xa97c9, 0x2b598 ^
         0x2b599, _0x4bb459)['slider'](
         'Cost:\x20Medium\x20(<=\x20' +
         MEDIUM_VOLUME_THRESHOLD +
         '\x20vol)', 0x984d0 ^ 0x984d1,
         0x50bf1 ^ 0x50bb1, 0x73324 ^
         0x73325, _0x4d0ea9)["slider"](
         'Cost:\x20Large/Huge\x20(>\x20' +
         MEDIUM_VOLUME_THRESHOLD +
         '\x20vol)', 0xc7f1c ^ 0xc7f1d,
         0x32da7 ^ 0x32de7, 0x25fd7 ^
         0x25fd6, _0xd8390c)["toggle"](
         'Confirm\x20Settings?', ![]);
   _0x3d9866["show"](_0x1a6273)["then"](
      _0x3df23c => {
         if (_0x3df23c["canceled"]) {
            _0x1a6273["sendMessage"](
               '§ePaid\x20mode\x20configuration\x20cancelled.'
               );
            showPlacementModeSelection_Buttons
               (_0x1a6273);
            return;
         }
         const [_0x9556a8, _0x5772e8,
            _0x55c6ae, _0x4263f2,
            _0x182ca7
         ] = _0x3df23c['formValues'];
         if (!_0x182ca7) {
            _0x1a6273['sendMessage'](
               '§eSettings\x20not\x20saved.\x20Confirmation\x20toggle\x20was\x20off.'
               );
            showPaidModeSettingsForm(
               _0x1a6273);
            return;
         }
         const _0x4c119a =
            paymentItemIds[
            _0x9556a8];
         _0x1a6273[
            "setDynamicProperty"](
            PAID_MODE_ITEM_ID_PROP,
            _0x4c119a);
         _0x1a6273[
            "setDynamicProperty"](
            COST_SMALL_PROP,
            _0x5772e8);
         _0x1a6273[
            "setDynamicProperty"](
            COST_MEDIUM_PROP,
            _0x55c6ae);
         _0x1a6273[
            'setDynamicProperty'](
            COST_LARGE_PROP,
            _0x4263f2);
         _0x1a6273[
            "setDynamicProperty"](
            "structurePlacementMode",
            PAID_MODE_ID);
         const _0x52b42e =
            paymentItemDisplayNames[
               _0x9556a8];
         _0x1a6273["sendMessage"](
            '§aPaid\x20Mode\x20configured:\x20Item:\x20' +
            _0x52b42e +
            ',\x20Costs\x20(S/M/L+):\x20' +
            _0x5772e8 + "/" +
            _0x55c6ae + "/" +
            _0x4263f2 +
            '.\x20Mode\x20set\x20to\x20Paid.'
            );
         showSettingsMenu(_0x1a6273);
      })["catch"](_0x3d643c => {
      console["error"](
         '[showPaidModeSettingsForm]\x20Form\x20Error:\x20' +
         _0x3d643c['stack']);
      _0x1a6273["sendMessage"](
         '§cAn\x20error\x20occurred\x20displaying\x20the\x20paid\x20mode\x20settings\x20form.'
         );
      showSettingsMenu(_0x1a6273);
   });
}

function showRequiredModeSettingsForm(
   _0x375853) {
   const _0x4979d6 = _0x375853[
         "getDynamicProperty"](
         REQ_PERC_SMALL_PROP) ??
      DEFAULT_REQ_PERC_SMALL;
   const _0x3046ab = _0x375853[
         "getDynamicProperty"](
         REQ_PERC_MEDIUM_PROP) ??
      DEFAULT_REQ_PERC_MEDIUM;
   const _0x3956cd = _0x375853[
         "getDynamicProperty"](
         REQ_PERC_LARGE_PROP) ??
      DEFAULT_REQ_PERC_LARGE;
   const _0x56ca26 = _0x375853[
         'getDynamicProperty'](
         REQ_PERC_HUGE_PROP) ??
      DEFAULT_REQ_PERC_HUGE;
   const _0xada337 =
   new ModalFormData()["title"](
         'Configure\x20Required\x20Blocks\x20%'
         )["slider"](
         '%\x20Required:\x20Small\x20(<=\x20' +
         SMALL_VOLUME_THRESHOLD +
         '\x20vol)', 0x95ba1 ^ 0x95ba0,
         0x35c9e ^ 0x35cfa, 0xa227c ^
         0xa227d, _0x4979d6)["slider"](
         '%\x20Required:\x20Medium\x20(<=\x20' +
         MEDIUM_VOLUME_THRESHOLD +
         '\x20vol)', 0xea408 ^ 0xea409,
         0xbac39 ^ 0xbac5d, 0x98a44 ^
         0x98a45, _0x3046ab)["slider"](
         '%\x20Required:\x20Large\x20(<=\x20' +
         LARGE_VOLUME_THRESHOLD +
         '\x20vol)', 0x80f08 ^ 0x80f09,
         0xd26e6 ^ 0xd2682, 0x5de44 ^
         0x5de45, _0x3956cd)['slider'](
         '%\x20Required:\x20Huge\x20(>\x20' +
         LARGE_VOLUME_THRESHOLD +
         '\x20vol)', 0xa50a0 ^ 0xa50a1,
         0x266f5 ^ 0x26691, 0xe7e06 ^
         0xe7e07, _0x56ca26)["toggle"](
         'Confirm\x20Settings?', ![]);
   _0xada337["show"](_0x375853)['then'](
      _0x8ceb56 => {
         if (_0x8ceb56["canceled"]) {
            _0x375853["sendMessage"](
               '§eRequired\x20Blocks\x20mode\x20configuration\x20cancelled.'
               );
            showPlacementModeSelection_Buttons
               (_0x375853);
            return;
         }
         const [_0x3cfd93, _0x25b57f,
            _0x5b6903, _0x2d33c1,
            _0xf9d2c5
         ] = _0x8ceb56["formValues"];
         if (!_0xf9d2c5) {
            _0x375853["sendMessage"](
               '§eSettings\x20not\x20saved.\x20Confirmation\x20toggle\x20was\x20off.'
               );
            showRequiredModeSettingsForm
               (_0x375853);
            return;
         }
         _0x375853[
            "setDynamicProperty"](
            REQ_PERC_SMALL_PROP,
            _0x3cfd93);
         _0x375853[
            "setDynamicProperty"](
            REQ_PERC_MEDIUM_PROP,
            _0x25b57f);
         _0x375853[
            'setDynamicProperty'](
            REQ_PERC_LARGE_PROP,
            _0x5b6903);
         _0x375853[
            "setDynamicProperty"](
            REQ_PERC_HUGE_PROP,
            _0x2d33c1);
         _0x375853[
            'setDynamicProperty'](
            "structurePlacementMode",
            REQUIRED_BLOCK_MODE_ID
            );
         _0x375853["sendMessage"](
            '§aRequired\x20Blocks\x20Mode\x20configured:\x20Percentages\x20(S/M/L/H):\x20' +
            _0x3cfd93 + "%/" +
            _0x25b57f + "%/" +
            _0x5b6903 + "%/" +
            _0x2d33c1 +
            '%.\x20Mode\x20set\x20to\x20Required\x20Blocks.'
            );
         showSettingsMenu(_0x375853);
      })['catch'](_0xa915b6 => {
      console['error'](
         '[showRequiredModeSettingsForm]\x20Form\x20Error:\x20' +
         _0xa915b6["stack"]);
      _0x375853['sendMessage'](
         '§cAn\x20error\x20occurred\x20displaying\x20the\x20required\x20blocks\x20settings\x20form.'
         );
      showSettingsMenu(_0x375853);
   });
}

function showXpLevelModeSettingsForm(
   _0x14e5fd) {
   const _0xc95c83 = _0x14e5fd[
         'getDynamicProperty'](
         XP_LEVEL_COST_SMALL_PROP) ??
      DEFAULT_XP_LEVEL_COST_SMALL;
   const _0x3f1988 = _0x14e5fd[
         'getDynamicProperty'](
         XP_LEVEL_COST_MEDIUM_PROP) ??
      DEFAULT_XP_LEVEL_COST_MEDIUM;
   const _0x401a80 = _0x14e5fd[
         "getDynamicProperty"](
         XP_LEVEL_COST_LARGE_PROP) ??
      DEFAULT_XP_LEVEL_COST_LARGE;
   const _0x15962e = _0x14e5fd[
         "getDynamicProperty"](
         XP_LEVEL_COST_HUGE_PROP) ??
      DEFAULT_XP_LEVEL_COST_HUGE;
   const _0x477808 =
   new ModalFormData()['title'](
         'Configure\x20XP\x20Level\x20Costs'
         )["slider"](
         'Levels\x20Cost:\x20Small\x20(<=\x20' +
         SMALL_VOLUME_THRESHOLD +
         '\x20vol)', 0xcf108 ^ 0xcf108,
         0xce86c ^ 0xce85e, 0x248b9 ^
         0x248b8, _0xc95c83)["slider"](
         'Levels\x20Cost:\x20Medium\x20(<=\x20' +
         MEDIUM_VOLUME_THRESHOLD +
         '\x20vol)', 0x85b29 ^ 0x85b29,
         0x88241 ^ 0x88273, 0xb3d7c ^
         0xb3d7d, _0x3f1988)["slider"](
         'Levels\x20Cost:\x20Large\x20(<=\x20' +
         LARGE_VOLUME_THRESHOLD +
         '\x20vol)', 0x3881b ^ 0x3881b,
         0x9cb97 ^ 0x9cba5, 0x4348d ^
         0x4348c, _0x401a80)['slider'](
         'Levels\x20Cost:\x20Huge\x20(>\x20' +
         LARGE_VOLUME_THRESHOLD +
         '\x20vol)', 0x3b2cf ^ 0x3b2cf,
         0xbd772 ^ 0xbd740, 0x7d908 ^
         0x7d909, _0x15962e)['toggle'](
         'Confirm\x20Settings?', ![]);
   _0x477808["show"](_0x14e5fd)["then"](
      _0x41a6e9 => {
         if (_0x41a6e9["canceled"]) {
            _0x14e5fd["sendMessage"](
               '§eXP\x20Level\x20mode\x20configuration\x20cancelled.'
               );
            showPlacementModeSelection_Buttons
               (_0x14e5fd);
            return;
         }
         const [_0x17d650, _0x2a3944,
            _0x24695a, _0x49979e,
            _0xb1cdba
         ] = _0x41a6e9["formValues"];
         if (!_0xb1cdba) {
            _0x14e5fd["sendMessage"](
               '§eSettings\x20not\x20saved.\x20Confirmation\x20toggle\x20was\x20off.'
               );
            showXpLevelModeSettingsForm
               (_0x14e5fd);
            return;
         }
         _0x14e5fd[
            "setDynamicProperty"](
            XP_LEVEL_COST_SMALL_PROP,
            _0x17d650);
         _0x14e5fd[
            "setDynamicProperty"](
            XP_LEVEL_COST_MEDIUM_PROP,
            _0x2a3944);
         _0x14e5fd[
            'setDynamicProperty'](
            XP_LEVEL_COST_LARGE_PROP,
            _0x24695a);
         _0x14e5fd[
            "setDynamicProperty"](
            XP_LEVEL_COST_HUGE_PROP,
            _0x49979e);
         _0x14e5fd[
            "setDynamicProperty"](
            "structurePlacementMode",
            XP_LEVEL_MODE_ID);
         _0x14e5fd['sendMessage'](
            '§aXP\x20Level\x20Mode\x20configured:\x20Costs\x20(S/M/L/H):\x20' +
            _0x17d650 + "/" +
            _0x2a3944 + "/" +
            _0x24695a + "/" +
            _0x49979e +
            '\x20levels.\x20Mode\x20set\x20to\x20XP\x20Level.'
            );
         showSettingsMenu(_0x14e5fd);
      })["catch"](_0x245e2a => {
      console["error"](
         '[showXpLevelModeSettingsForm]\x20Form\x20Error:\x20' +
         _0x245e2a['stack']);
      _0x14e5fd["sendMessage"](
         '§cAn\x20error\x20occurred\x20displaying\x20the\x20XP\x20level\x20settings\x20form.'
         );
      showSettingsMenu(_0x14e5fd);
   });
}

function showMultiPlaceSettings(
   _0x20b422) {
   const _0x4acf54 = _0x20b422[
         "getDynamicProperty"](
         "erutcurtSdetceles".split("")
         .reverse().join("")) ||
      _0x20b422["getDynamicProperty"](
         "lastSelectedStructure");
   if (!_0x4acf54) {
      _0x20b422["sendMessage"](
         '§cNo\x20structure\x20selected.\x20Please\x20choose\x20a\x20structure\x20first.'
         );
      mainMenu(_0x20b422);
      return;
   }
   const _0x368ad3 =
   new ModalFormData()["title"](
         'Multiple\x20Structure\x20Placement'
         )["slider"](
         'Number\x20of\x20structures',
         0xe7bd6 ^ 0xe7bd7,
         MAX_STRUCTURES, 0xe94c6 ^
         0xe94c7, 0x48392 ^ 0x48397)[
         "slider"]('Average\x20spacing',
         MIN_SPACING, MAX_SPACING,
         0x41f4e ^ 0x41f4f, 0xa1b93 ^
         0xa1b99)['toggle'](
         'Random\x20rotation', !![]);
   _0x368ad3['show'](_0x20b422)["then"](
      _0x5edc84 => {
         if (_0x5edc84['canceled']) {
            mainMenu(_0x20b422);
            return;
         }
         const _0x4b9235 = {
            'count': _0x5edc84[
               "formValues"][
               0x7d4b3 ^
               0x7d4b3
            ],
            "spacing": _0x5edc84[
               'formValues'][
               0x233f1 ^
               0x233f0
            ],
            "randomRotation": _0x5edc84[
               'formValues'][
               0x98eb4 ^
               0x98eb6
            ]
         };
         placeMultipleStructures(
            _0x20b422, _0x4b9235)[
            "catch"](
         _0x5d9bda => {
            console["error"](
               '[showMultiPlaceSettings]\x20Error\x20during\x20placeMultipleStructures\x20call:\x20' +
               _0x5d9bda[
                  "stack"]);
            _0x20b422[
               'sendMessage'
               ](
               '§cAn\x20unexpected\x20error\x20occurred\x20during\x20multi-placement.'
               );
         });
      })["catch"](_0x3fd2c4 => {
      console['error'](
         '[showMultiPlaceSettings]\x20Form\x20Error:\x20' +
         _0x3fd2c4["stack"]);
      _0x20b422["sendMessage"](
         '§cAn\x20error\x20occurred\x20displaying\x20the\x20multi-place\x20form.'
         );
      mainMenu(_0x20b422);
   });
}

function structureSelectionMenu(
   _0x214ce8) {
   new ActionFormData()["title"](
      '選擇結構類型')[
      "body"](
      '選擇要瀏覽的結構類別'
      )['button']("sesuoH".split("")
      .reverse().join(""),
      "gnp.noci_emoh_erots/iu/serutxet"
      .split("").reverse().join(""))[
      'button']("smraF".split("")
      .reverse().join(""),
      "textures/items/wheat.png")[
      "button"]("seerT".split("")
      .reverse().join(""),
      "textures/blocks/sapling_oak.png"
      )['button']("Walls",
      "gnp.edis_llaw_enotselbboc/skcolb/serutxet"
      .split("").reverse().join(""))[
      "button"]("modnaR".split("")
      .reverse().join(""),
      "gnp.ecid_modnar/iu/serutxet"
      .split("").reverse().join(""))[
      'button']("後退",
      "textures/ui/arrow_left.png")[
      'show'](_0x214ce8)["then"](
      _0x911438 => {
         if (_0x911438["canceled"]) {
            mainMenu(_0x214ce8);
            return;
         }
         switch (_0x911438[
               'selection']) {
            case 0x1da63 ^ 0x1da63:
               HouseMenu(_0x214ce8);
               break;
            case 0x6d03c ^ 0x6d03d:
               FarmMenu(_0x214ce8);
               break;
            case 0xc5384 ^ 0xc5386:
               TreeMenu(_0x214ce8);
               break;
            case 0x7d034 ^ 0x7d037:
               WallMenu(_0x214ce8);
               break;
            case 0x212a4 ^ 0x212a0:
               RandomMenu(_0x214ce8);
               break;
            case 0xca241 ^ 0xca244:
               mainMenu(_0x214ce8);
               break;
         }
      });
}

function createStructureSelectionForm(
   _0x305127, _0x5548f1, _0x3531c1,
   _0x1f9802) {
   _0x305127["setDynamicProperty"](
      "selectedStructure", undefined);
   const _0x22087d =
   new ModalFormData()["title"](
         _0x5548f1);
   _0x22087d["dropdown"](
      '選擇結構',
      _0x1f9802, 0x71f65 ^ 0x71f65);
   _0x22087d['slider'](
      '垂直調整', -(
         0xb518b ^ 0xb5181),
      0x34697 ^ 0x3469d, 0xd846c ^
      0xd846d, 0x263c5 ^ 0x263c5);
   const _0x3c35e0 = ["None", "X-Axis",
      "sixA-Z".split("").reverse()
      .join(""), "XZ-Axis"
   ];
   _0x22087d["dropdown"]("rorriM".split(
         "").reverse().join(""),
      _0x3c35e0, 0xa4f85 ^ 0xa4f85);
   const _0x43dca1 = ["None",
      'Block\x20By\x20Block',
      'Layer\x20By\x20Layer'
   ];
   _0x22087d["dropdown"](
      'Animation\x20Mode', _0x43dca1,
      0x7e6d6 ^ 0x7e6d6);
   _0x22087d["slider"](
      'Animation\x20Seconds',
      0xdbead ^ 0xdbeac, 0x4cb6c ^
      0x4cb50, 0xde232 ^ 0xde233,
      0xdc4a7 ^ 0xdc4a6);
   _0x22087d['toggle'](
      'Include\x20Blocks?', !![]);
   _0x22087d["toggle"](
      'Include\x20Entities?', !![]);
   _0x22087d["show"](_0x305127)["then"](
      _0x27d45d => {
         if (_0x27d45d["canceled"]) {
            structureSelectionMenu(
               _0x305127);
            return;
         };
         const [_0x5169fa, _0x4af0ab,
            _0x2be63e, _0x25f953,
            _0x46acd8, _0x32e6c3,
            _0x58e785
         ] = _0x27d45d["formValues"];
         const _0x5f029c = _0x3531c1[
            _0x5169fa];
         if (_0x5f029c) {
            const _0x117669 =
               structureDefaults[
                  _0x5f029c] ??
               0xcce62 ^ 0xcce62;
            const _0x41018c =
               _0x4af0ab + _0x117669;
            const _0x275cfe = [
               StructureMirrorAxis[
                  "None"],
               StructureMirrorAxis[
                  "X"],
               StructureMirrorAxis[
                  "Z"],
               StructureMirrorAxis[
                  'XZ']
            ];
            const _0x30b57d =
               _0x275cfe[
               _0x2be63e] ??
               StructureMirrorAxis[
                  "None"];
            let _0x22707d =
               StructureAnimationMode[
                  "None"];
            if (_0x25f953 === (
                  0x3a97e ^ 0x3a97f
                  )) {
               _0x22707d =
                  StructureAnimationMode[
                     'Blocks'];
            } else if (_0x25f953 ===
               (0xa0f68 ^ 0xa0f6a)) {
               _0x22707d =
                  StructureAnimationMode[
                     "Layers"];
            }
            saveStructureInfo(
               _0x305127,
               _0x5f029c,
               _0x41018c,
               _0x30b57d,
               _0x22707d,
               _0x46acd8,
               _0x32e6c3,
               _0x58e785);
            mainMenu(_0x305127);
         } else {
            _0x305127['sendMessage'](
               '§cInvalid\x20structure\x20selected.'
               );
            structureSelectionMenu(
               _0x305127);
         }
      })["catch"](_0x2d0da2 => {
      console["error"](
         '[createStructureSelectionForm]\x20Form\x20Error\x20for\x20' +
         _0x5548f1 + ':\x20' +
         _0x2d0da2["stack"]);
      _0x305127["sendMessage"](
         '§cAn\x20error\x20occurred\x20displaying\x20the\x20structure\x20selection\x20form.'
         );
      structureSelectionMenu(
         _0x305127);
   });
}

function HouseMenu(_0x3fd0e6) {
   new ActionFormData()['title'](
      '§l§fHouse\x20Styles')[
      "button"]("Modern",
      "textures/icons/mh_icon.png")[
      "button"]("laveideM".split("")
      .reverse().join(""),
      "textures/icons/md_icon.png")[
      'button']('Cherry\x20Blossom',
      "gnp.noci_bc/snoci/serutxet"
      .split("").reverse().join(""))[
      "button"]("naisA".split("")
      .reverse().join(""),
      "gnp.noci_sa/snoci/serutxet"
      .split("").reverse().join(""))[
      'button']("Back",
      "textures/ui/arrow_left.png")[
      'show'](_0x3fd0e6)['then'](({
      selection: _0x3df4e8,
      canceled: _0x148dea
   }) => {
      if (_0x148dea) {
         structureSelectionMenu(
            _0x3fd0e6);
         return;
      }
      switch (_0x3df4e8) {
         case 0xb4850 ^ 0xb4850:
            ModernHousesMenu(
               _0x3fd0e6);
            break;
         case 0xdb61d ^ 0xdb61c:
            MedievalHousesMenu(
               _0x3fd0e6);
            break;
         case 0x59bc0 ^ 0x59bc2:
            CherryHousesMenu(
               _0x3fd0e6);
            break;
         case 0x9fa57 ^ 0x9fa54:
            AsianHousesMenu(
               _0x3fd0e6);
            break;
         case 0x3aafb ^ 0x3aaff:
            structureSelectionMenu
               (_0x3fd0e6);
            break;
      }
   });
}

function ModernHousesMenu(_0x3b3188) {
   const _0x253173 = Array["from"]({
         "length": 0x1a
      }, (_0x5bff60, _0x2320c4) =>
      "_hm:erutcurtsym".split("")
      .reverse().join("") + (
         _0x2320c4 + (0xb8352 ^
            0xb8353)));
   const _0x1b1058 = _0x253173['map']((
         _0x161cb2, _0x1772e3) =>
      'Modern\x20' + (_0x1772e3 + (
         0x8ab3d ^ 0x8ab3c)));
   createStructureSelectionForm(
      _0x3b3188,
      '§l§f現代房屋',
      _0x253173, _0x1b1058);
}

function MedievalHousesMenu(_0x296b80) {
   const _0x4f2e4c = Array["from"]({
         "length": 0x14
      }, (_0x2f40bc, _0x4bd859) =>
      "_dm:erutcurtsym".split("")
      .reverse().join("") + (
         _0x4bd859 + (0xbc6b8 ^
            0xbc6b9)));
   const _0x5823e0 = _0x4f2e4c["map"]((
         _0x195d81, _0x269092) =>
      'Medieval\x20' + (_0x269092 + (
         0x842d7 ^ 0x842d6)));
   createStructureSelectionForm(
      _0x296b80,
      '§l§f中世紀房屋',
      _0x4f2e4c, _0x5823e0);
}

function CherryHousesMenu(_0x2e4c72) {
   const _0x4605f2 = ["0_bc:erutcurtsym"
      .split("").reverse().join(""),
      "mystructure:cb_1",
      "mystructure:cb_2",
      "mystructure:cb_3",
      "mystructure:cb_4",
      "mystructure:cb_5"
   ];
   const _0x3931c5 = ['櫻桃\x201',
      '櫻桃\x202', '櫻桃\x203',
      '櫻桃\x204', '櫻桃\x205',
      '櫻桃\x206'
   ];
   createStructureSelectionForm(
      _0x2e4c72,
      '§l§f櫻花\x20朵',
      _0x4605f2, _0x3931c5);
}

function AsianHousesMenu(_0x287ce0) {
   const _0x28e6c6 = [
      "mystructure:as_0",
      "mystructure:as_1"
   ];
   const _0x31dca2 = ['Asian\x201',
      'Asian\x202'
   ];
   createStructureSelectionForm(
      _0x287ce0,
      '§l§f 亞洲\x20 棟房屋',
      _0x28e6c6, _0x31dca2);
}

function FarmMenu(_0x98e316) {
   const _0x777c60 = ["fv:erutcurtsym"
      .split("").reverse().join(""),
      "mystructure:gf",
      "mystructure:Pf",
      "fm:erutcurtsym".split("")
      .reverse().join(""),
      "mraf_stc:erutcurtsym".split(
         "").reverse().join(""),
      "mystructure:chicken_farm",
      "mystructure:auto_smelter",
      "mystructure:auto_cooker",
      "mystructure:xp_farm",
      "llams_mraf_repeerc".split("")
      .reverse().join(""),
      "eguh_mraf_repeerc".split("")
      .reverse().join("")
   ];
   const _0x425db4 = ['Iron\x20Farm',
      '金幣\x20農場',
      '南瓜\x20農場',
      '甜瓜\x20農場',
      'Cactus\x20Farm',
      'Chicken\x20Farm',
      'Auto\x20Smelter',
      'Auto\x20Cooker', 'XP\x20Farm',
      'Creeper\x20Farm\x20Small',
      'Creeper\x20Farm\x20Huge'
   ];
   createStructureSelectionForm(
      _0x98e316,
      '§l§f農場\x20&\x20 自動化',
      _0x777c60, _0x425db4);
}

function RandomMenu(_0x314ac0) {
   const _0x1e9328 = [
      "mystructure:rs_charmender",
      "mystructure:rs_chikorita",
      "repoolb_sr:erutcurtsym".split(
         "").reverse().join(""),
      "woc:erutcurtsym".split("")
      .reverse().join("")
   ];
   const _0x329e4a = ["rednemrahC"
      .split("").reverse().join(""),
      "Chikorita", "Blooper", "Cow"
   ];
   createStructureSelectionForm(
      _0x314ac0,
      '§l§fRandom\x20Structures',
      _0x1e9328, _0x329e4a);
}

function WallMenu(_0xff5bc4) {
   new ActionFormData()["title"](
      '§l§fWall\x20Styles')['body'](
      'Choose\x20a\x20style\x20of\x20walls'
      )["button"]('Asian\x20Walls',
      "gnp.noci_sa/snoci/serutxet"
      .split("").reverse().join(""))[
      "button"]('Castle\x20Walls',
      "gnp.enotselbboc/skcolb/serutxet"
      .split("").reverse().join(""))[
      'button']("Back",
      "textures/ui/arrow_left.png")[
      "show"](_0xff5bc4)['then'](
      _0x426e42 => {
         if (_0x426e42["canceled"]) {
            structureSelectionMenu(
               _0xff5bc4);
            return;
         }
         switch (_0x426e42[
               "selection"]) {
            case 0xbca08 ^ 0xbca08:
               AsianWallsMenu(
                  _0xff5bc4);
               break;
            case 0xe9d34 ^ 0xe9d35:
               CastleWallsMenu(
                  _0xff5bc4);
               break;
            case 0x28b90 ^ 0x28b92:
               structureSelectionMenu
                  (_0xff5bc4);
               break;
         }
      });
}

function AsianWallsMenu(_0x1260e0) {
   const _0x50c0d2 = Array["from"]({
         "length": 0xe
      }, (_0x22be8e, _0x15f4ea) =>
      "_wnsa:erutcurtsym".split("")
      .reverse().join("") + (
         _0x15f4ea + (0xedc58 ^
            0xedc59)));
   const _0x333899 = _0x50c0d2["map"]((
         _0x295250, _0x2c13f7) =>
      'Asian\x20Wall\x20' + (
         _0x2c13f7 + (0x53133 ^
            0x53132)));
   createStructureSelectionForm(
      _0x1260e0,
      '§l§fAsian\x20Walls',
      _0x50c0d2, _0x333899);
}

function CastleWallsMenu(_0x30f761) {
   const _0x4f0910 = Array['from']({
         "length": 0xf
      }, (_0x62308d, _0x442b08) =>
      "mystructure:cstlw_" + (
         _0x442b08 + (0xa0407 ^
            0xa0406)));
   const _0x26668b = _0x4f0910["map"]((
         _0x5659be, _0x7b6d39) =>
      'Castle\x20Wall\x20' + (
         _0x7b6d39 + (0x8dc8e ^
            0x8dc8f)));
   createStructureSelectionForm(
      _0x30f761,
      '§l§fCastle\x20Walls',
      _0x4f0910, _0x26668b);
}

function PalmTreesMenu(_0x173ee6) {
   const _0x3b4834 = Array["from"]({
         'length': 0x5
      }, (_0x11f1c3, _0x5726ab) =>
      "mystructure:plm_" + _0x5726ab);
   const _0x2984b4 = Array['from']({
         'length': 0xa
      }, (_0x3939bc, _0x3e2bd3) =>
      "mystructure:plm2_" + _0x3e2bd3
      );
   const _0x3a91d9 = [..._0x3b4834, ...
      _0x2984b4
   ];
   const _0x18be99 = Array["from"]({
         "length": 0x5
      }, (_0x20cbc7, _0x3b3b33) =>
      'Palm\x20Tree\x201st\x20Style\x20' +
      (_0x3b3b33 + (0xe6679 ^
         0xe6678)));
   const _0x16dcee = Array["from"]({
         "length": 0xa
      }, (_0x3f22d9, _0xf450c8) =>
      'Palm\x20Tree\x202nd\x20Style\x20' +
      (_0xf450c8 + (0xdbd72 ^
         0xdbd73)));
   const _0x31297a = [..._0x18be99, ...
      _0x16dcee
   ];
   createStructureSelectionForm(
      _0x173ee6, '§l§fPalm\x20Trees',
      _0x3a91d9, _0x31297a);
}

function TreeMenu(_0x21e1a4) {
   new ActionFormData()["title"](
      'Tree\x20Type')['button'](
      "ralugeR".split("").reverse()
      .join(""),
      "gnp.noci_eert/snoci/serutxet"
      .split("").reverse().join(""))[
      "button"]("moorhsuM".split("")
      .reverse().join(""),
      "gnp.noci_hsum/snoci/serutxet"
      .split("").reverse().join(""))[
      "button"]("rehtO".split("")
      .reverse().join(""),
      "textures/blocks/sapling_cherry.png"
      )['button']('Palm\x20Trees',
      "textures/blocks/sapling_oak.png"
      )["button"]("kcaB".split("")
      .reverse().join(""),
      "gnp.tfel_worra/iu/serutxet"
      .split("").reverse().join(""))[
      'show'](_0x21e1a4)["then"](
      _0x5911cf => {
         if (_0x5911cf["canceled"]) {
            structureSelectionMenu(
               _0x21e1a4);
            return;
         }
         switch (_0x5911cf[
               "selection"]) {
            case 0xd881f ^ 0xd881f:
               RegularTreesMenu(
                  _0x21e1a4);
               break;
            case 0xe869c ^ 0xe869d:
               MushroomTreesMenu(
                  _0x21e1a4);
               break;
            case 0xe917c ^ 0xe917e:
               OtherTreesMenu(
                  _0x21e1a4);
               break;
            case 0xdeba5 ^ 0xdeba6:
               PalmTreesMenu(
                  _0x21e1a4);
               break;
            case 0xc4b7b ^ 0xc4b7f:
               structureSelectionMenu
                  (_0x21e1a4);
               break;
         }
      });
}

function RegularTreesMenu(_0x4c950c) {
   const _0x1c4532 = Array["from"]({
         "length": 0xa
      }, (_0x361166, _0x2bcf97) =>
      "mystructure:tree_" + (
         _0x2bcf97 + (0x8bf8b ^
            0x8bf8a))["toString"]()[
         'padStart'](0x6ce7a ^
         0x6ce78, "0"));
   const _0x53216b = _0x1c4532["map"]((
         _0x1f1998, _0x45e2db) =>
      'Tree\x20' + (_0x45e2db + (
         0x334bd ^ 0x334bc)));
   createStructureSelectionForm(
      _0x4c950c,
      '§l§fRegular\x20Trees',
      _0x1c4532, _0x53216b);
}

function MushroomTreesMenu(_0x406254) {
   const _0x16a9a1 = Array['from']({
         'length': 0x9
      }, (_0x20eac8, _0x39be05) =>
      "rm_eert:erutcurtsym".split("")
      .reverse().join("") + (
         _0x39be05 + (0xc8d78 ^
            0xc8d79)));
   const _0x52a649 = _0x16a9a1["map"]((
         _0x2045a5, _0x4ac46a) =>
      'Mushroom\x20' + (_0x4ac46a + (
         0xaba36 ^ 0xaba37)));
   createStructureSelectionForm(
      _0x406254,
      '§l§fMushroom\x20Trees',
      _0x16a9a1, _0x52a649);
}

function OtherTreesMenu(_0x34738f) {
   const _0x26d641 = [
      "mystructure:tree_ct1",
      "mystructure:tree_ct2",
      "mystructure:tree_ct3",
      "4tc_eert:erutcurtsym".split(
         "").reverse().join(""),
      "5tc_eert:erutcurtsym".split(
         "").reverse().join(""),
      "kao_eert:erutcurtsym".split(
         "").reverse().join(""),
      "egnaro_eert:erutcurtsym"
      .split("").reverse().join(""),
      "knip_eert:erutcurtsym".split(
         "").reverse().join(""),
      "mystructure:tree_white"
   ];
   const _0x2080b3 = ['Cactus\x201',
      'Cactus\x202', 'Cactus\x203',
      'Cactus\x204', 'Cactus\x205',
      'Oak\x20Tree',
      'Orange\x20Tree',
      'Pink\x20Tree', 'White\x20Tree'
   ];
   createStructureSelectionForm(
      _0x34738f,
      '§l§fOther\x20Trees',
      _0x26d641, _0x2080b3);
}

function showStructureOutline(
_0x40b975) {
   const _0x2c0d9d = _0x40b975[
         "getDynamicProperty"](
         "selectedStructure") ||
      _0x40b975["getDynamicProperty"](
         "erutcurtSdetceleStsal".split(
            "").reverse().join(""));
   if (!_0x2c0d9d) return;
   try {
      const _0x14770b = JSON["parse"](
         _0x2c0d9d);
      const _0x35e424 = _0x14770b[
         "size"];
      if (!_0x35e424) return;
      const _0x1649c3 = _0x40b975[
            'getBlockFromViewDirection']
         ({
            'includePassableBlocks':
               ![],
            'maxDistance': 0x64,
            'includeLiquidBlocks':
            ![]
         });
      if (!_0x1649c3) return;
      const _0x342e52 =
         getPlayerDirection(_0x40b975[
            "getViewDirection"]());
      let _0x4d930e = {
         ..._0x35e424
      };
      if (_0x342e52 === "South" ||
         _0x342e52 === "htroN".split("")
         .reverse().join("")) {
         _0x4d930e = {
            "x": _0x35e424["z"],
            "y": _0x35e424["y"],
            "z": _0x35e424["x"]
         };
      }
      const _0x3a1e8d =
         calculatePlacementLocation(
            _0x1649c3["block"][
               "location"
            ], _0x4d930e, _0x342e52,
            _0x14770b["adjustment"]);
      const _0x2abbb5 = _0x51a4dc => {
         try {
            _0x40b975["dimension"][
               'spawnParticle'
            ]("minecraft:balloon_gas_particle",
               _0x51a4dc);
         } catch {}
      };
      for (let _0x438bc4 = 0x93047 ^
            0x93047; _0x438bc4 <= (
            0x9c68c ^ 0x9c68d
            ); _0x438bc4++) {
         for (let _0x48f64f = 0xa4e65 ^
               0xa4e65; _0x48f64f <= (
               0xe5ad1 ^ 0xe5ad0
               ); _0x48f64f++) {
            for (let _0x12217c =
                  0x1d2b2 ^
                  0x1d2b2; _0x12217c <=
               (0xbf7e2 ^
               0xbf7e3); _0x12217c++) {
               const _0x35dccb = {
                  "x": _0x3a1e8d[
                     "x"] +
                     _0x438bc4 *
                     _0x4d930e["x"],
                  "y": _0x3a1e8d[
                     "y"] +
                     _0x48f64f *
                     _0x4d930e["y"],
                  "z": _0x3a1e8d[
                     "z"] +
                     _0x12217c *
                     _0x4d930e["z"]
               };
               _0x2abbb5(_0x35dccb);
            }
         }
      }
      const _0x19f829 = {
         "x": Math['max'](0x2fbbb ^
            0x2fbb9, Math["ceil"](
               _0x4d930e["x"] / (
                  0x219ac ^
                  0x219ae))),
         "y": Math["max"](0xd00b6 ^
            0xd00b4, Math["ceil"](
               _0x4d930e["y"] / (
                  0xc257d ^
                  0xc257f))),
         "z": Math['max'](0x36100 ^
            0x36102, Math["ceil"](
               _0x4d930e["z"] / (
                  0x6274a ^
                  0x62748)))
      };
      for (let _0x49c4eb = 0x64d06 ^
            0x64d07; _0x49c4eb <
         _0x19f829["x"]; _0x49c4eb++) {
         const _0x114886 = _0x3a1e8d[
               "x"] + _0x49c4eb *
            _0x4d930e["x"] / _0x19f829[
               "x"];
         _0x2abbb5({
            "x": _0x114886,
            "y": _0x3a1e8d["y"],
            "z": _0x3a1e8d["z"]
         });
         _0x2abbb5({
            "x": _0x114886,
            "y": _0x3a1e8d["y"] +
               _0x4d930e["y"],
            "z": _0x3a1e8d["z"]
         });
         _0x2abbb5({
            "x": _0x114886,
            "y": _0x3a1e8d["y"],
            "z": _0x3a1e8d["z"] +
               _0x4d930e["z"]
         });
         _0x2abbb5({
            "x": _0x114886,
            "y": _0x3a1e8d["y"] +
               _0x4d930e["y"],
            "z": _0x3a1e8d["z"] +
               _0x4d930e["z"]
         });
      }
      for (let _0x546d9e = 0xda484 ^
            0xda485; _0x546d9e <
         _0x19f829["y"]; _0x546d9e++) {
         const _0x3c1df2 = _0x3a1e8d[
               "y"] + _0x546d9e *
            _0x4d930e["y"] / _0x19f829[
               "y"];
         _0x2abbb5({
            "x": _0x3a1e8d["x"],
            "y": _0x3c1df2,
            "z": _0x3a1e8d["z"]
         });
         _0x2abbb5({
            "x": _0x3a1e8d["x"] +
               _0x4d930e["x"],
            "y": _0x3c1df2,
            "z": _0x3a1e8d["z"]
         });
         _0x2abbb5({
            "x": _0x3a1e8d["x"],
            "y": _0x3c1df2,
            "z": _0x3a1e8d["z"] +
               _0x4d930e["z"]
         });
         _0x2abbb5({
            "x": _0x3a1e8d["x"] +
               _0x4d930e["x"],
            "y": _0x3c1df2,
            "z": _0x3a1e8d["z"] +
               _0x4d930e["z"]
         });
      }
      for (let _0x5bf25d = 0x6bc77 ^
            0x6bc76; _0x5bf25d <
         _0x19f829["z"]; _0x5bf25d++) {
         const _0x462bf0 = _0x3a1e8d[
               "z"] + _0x5bf25d *
            _0x4d930e["z"] / _0x19f829[
               "z"];
         _0x2abbb5({
            "x": _0x3a1e8d["x"],
            "y": _0x3a1e8d["y"],
            "z": _0x462bf0
         });
         _0x2abbb5({
            "x": _0x3a1e8d["x"] +
               _0x4d930e["x"],
            "y": _0x3a1e8d["y"],
            "z": _0x462bf0
         });
         _0x2abbb5({
            "x": _0x3a1e8d["x"],
            "y": _0x3a1e8d["y"] +
               _0x4d930e["y"],
            "z": _0x462bf0
         });
         _0x2abbb5({
            "x": _0x3a1e8d["x"] +
               _0x4d930e["x"],
            "y": _0x3a1e8d["y"] +
               _0x4d930e["y"],
            "z": _0x462bf0
         });
      }
   } catch (_0xfbc078) {}
}
world["afterEvents"]["itemUse"][
   "subscribe"
](_0x46ae92 => {
   const _0x392b9b = _0x46ae92[
      "source"];
   if (!(
         _0x392b9b instanceof Player) ||
      !_0x392b9b?.["dilaVsi"
         .split("").reverse()
         .join("")
      ]()) return;
   if (_0x46ae92['itemStack']?.[
         "typeId"
      ] === "bony:structures") {
      system["run"](() =>
         mainMenu(_0x392b9b));
   }
});
system["runInterval"](() => {
   try {
      for (const _0x150079 of
            world['getAllPlayers']
            ()) {
         if (!_0x150079['isValid']
            ()) continue;
         try {
            const _0x48f8e0 =
               _0x150079[
                  'getComponent'](
                  "elbappiuqe:tfarcenim"
                  .split("")
                  .reverse().join(
                     ""));
            if (_0x48f8e0) {
               const _0x1d97c7 =
                  _0x48f8e0[
                     'getEquipment'
                     ](
                     EquipmentSlot[
                        "Mainhand"
                        ]);
               if (_0x1d97c7?.[
                     "typeId"
                  ] ===
                  "serutcurts:ynob"
                  .split("")
                  .reverse().join(
                     "")) {
                  if (_0x150079[
                        'getDynamicProperty'
                        ](
                        "selectedStructure"
                        ) ||
                     _0x150079[
                        "getDynamicProperty"
                        ](
                        "lastSelectedStructure"
                        )) {
                     showStructureOutline
                        (
                           _0x150079);
                  }
               }
            }
         } catch (_0x5a6236) {
            if (!(_0x5a6236?.[
                     "message"
                  ]?.["includes"](
                     'Player\x20not\x20found'
                     ) ||
                  _0x5a6236?.[
                     "egassem"
                     .split("")
                     .reverse()
                     .join("")
                  ]?.["sedulcni"
                     .split("")
                     .reverse()
                     .join("")
                  ](
                     'Invalid\x20entity')
                  )) {
               console["warn"](
                  '[Outline\x20Interval]\x20Error\x20during\x20check\x20for\x20player\x20' +
                  (_0x150079[
                        "name"
                        ] ??
                     "unknown"
                     ) +
                  ':\x20' +
                  _0x5a6236);
            }
         }
      }
   } catch (_0x3ea75a) {
      console['error'](
         '[Outline\x20Interval]\x20Error:\x20' +
         _0x3ea75a['stack']);
   }
}, OUTLINE_INTERVAL);
world['afterEvents']['playerLeave'][
   "subscribe"
](_0x512ccd => {
   const _0x12bd38 = _0x512ccd[
      'playerId'];
   if (playerUndoStacks['has'](
         _0x12bd38)) {
      playerUndoStacks['delete'](
         _0x12bd38);
   }
});