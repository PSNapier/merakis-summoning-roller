/* jshint esversion: 6 */

// populate dropdowns
let buildList = {
  shorthair: ['SH american','SH egyptian','SH european','SH oriental','SH persian'],
  longhair: ['LH american','LH egyptian','LH european','LH oriental','LH persian'],
  hairless: ['sphynx','cornish-rex','devon-rex','selkirk-rex'],
  wildcat: ['caracal','lynx','ocelot','serval','sand-cat'],
  hybrid: ['desert','jungle','plains','tundra'],
  primal: ['clouded-leopard','cheetah','leopard','lion','tiger']
};

let mutationList = ['manx tail','bob tail','ring tail','curl ears','fold ears','polydactyl toes','albinism','melanism','chimerism','vitiligo','mosaic','horns'];

let elementList = {
  basic: ['fire','water','earth','air'],
  primal: ['light','shadow','bloom','blight','voltage','stardust']
};

for (let i = 0; i < 4; i++) {
  let genoID = 'summoner' + (i + 1) + 'Geno';
  let buildID = 'summoner' + (i + 1) + 'Build';
  let mutationsID = 'summoner' + (i + 1) + 'Mutations';
  let elementID = 'summoner' + (i + 1) + 'Element';

  document.getElementById(genoID).setAttribute('onchange','tinctureOfWealthListSetup();');
  document.getElementById(buildID).setAttribute('onchange','tinctureOfWealthListSetup();');
  document.getElementById(elementID).setAttribute('onchange','tinctureOfWealthListSetup();');

  populate(buildID, buildList, 'optGroup');
  populate(mutationsID, mutationList, 'pillSelect');
  populate(elementID, elementList, 'optGroup');
}

// NOTE: tinctureOfWealth item was a very late addition. This is a messy way to implement it but I just did what I thought was going to be fastest. Maybe it's fine? Blek...
// tinctureOfWealth object setup
// markings list
window.commonList = [['dilute','Dd'],['smokey','Sm'],['shell','Sh'],['classic tabby','CTb'],['mackerel tabby','MTb'],['spotted tabby','STb']];
window.uncommonList = [['caramel','Cc'],['silver','Ss'],['ticked tabby','TTb'],['rosette tabby','RTb'],['braided tabby','BTb'],['flecking','Fl'],['points','Pp'],['sable','Sbl'],['ghost','Gh'],['charcoal','Ch']];
window.mishapList = [['casket','Ckt'],['snowflakes','Snfl'],['jellybeans','Jb'],['tar','Tr']];
window.mysticList = [['shadowtouched','Stch'],['prism','Pr'],['plasma','Pl'],['hypnotic tabby','HTb'],['arcane','Arc'],['mottled','Mtl'],['starlight','Slt']];

let tinctureOfWealthList = {};
function tinctureOfWealthListSetup() {
  summonerSetup();

  // coat & markings check
  let genos = [];

  function addSummonerGeno(geno) {
    if (geno !== false) {
      genos.push(geno);
    }
  }

  addSummonerGeno(summoner.s1.geno);
  addSummonerGeno(summoner.s2.geno);
  addSummonerGeno(summoner.s3.geno);
  addSummonerGeno(summoner.s4.geno);
  genos = genos.join(' ');
  // console.log(genos);

  function getCoats() {
    let output = [];

    if (genos.search(/\b(EE|Ee)\/(aa)\/(nn)\/(RR|Rr)\b/) !== -1) {
      output.push('tortoiseshell');
    }
    if (genos.search(/\b(EE|Ee)\/(aa)\/(nn)\/(rr)\b/) !== -1) {
      output.push('black');
    }
    if (genos.search(/\b(ee)\/(AA|Aa)\/(nn)\/(rr)\b/) !== -1) {
      output.push('chocolate');
    }
    if (genos.search(/\b(ee)\/(aa)\/(NN|Nn)\/(rr)\b/) !== -1) {
      output.push('cinnamon');
    }
    if (genos.search(/\b(ee)\/(aa)\/(nn)\/(RR|Rr)\b/) !== -1) {
      output.push('red');
    }

    // console.log(output);
    return output;
  }

  function getMarkings() {
    let output = [];

    function markingLogic(gene) {
      let dom = gene[1].toUpperCase();
      let rec = gene[1];

      let regex = '\\b(' + dom + '|' + rec + ')\\b';
      regex = new RegExp(regex, '');

      if (genos.search(regex) !== -1) {
        output.push(gene[0]);
      }
    }

    for (let i = 0; i < commonList.length; i++) {
      markingLogic(commonList[i]);
    }
    for (let i = 0; i < uncommonList.length; i++) {
      markingLogic(uncommonList[i]);
    }
    for (let i = 0; i < mishapList.length; i++) {
      markingLogic(mishapList[i]);
    }
    for (let i = 0; i < mysticList.length; i++) {
      markingLogic(mysticList[i]);
    }

    return output;
  }

  tinctureOfWealthList = {
    builds: [summoner.s1.build, summoner.s2.build, summoner.s3.build, summoner.s4.build].filter(Boolean),
    elements: [summoner.s1.element, summoner.s2.element, summoner.s3.element, summoner.s4.element].filter(Boolean),
    coats: getCoats(),
    markings: getMarkings(),
    mutations: summoner.s1.mutations.concat(summoner.s2.mutations.concat(summoner.s3.mutations.concat( summoner.s4.mutations))).filter(Boolean)
  };
  // console.log(tinctureOfWealthList);

  for (let i = 1; i <= 3; i++) {
    let id = 'tinctureOfWealth' + i;
    document.getElementById(id).innerHTML = '<option value="none">none</option>';
    populate(id, tinctureOfWealthList, 'optGroup');
  }
}

for (let i = 1; i <= 3; i++) {
  let idAvatars = 'avatars' + i;
  let idEssences = 'essences' + i;
  populate(idAvatars, buildList, 'optGroup');
  populate(idEssences, elementList, 'optGroup');
}


function disabledToggle(id) {
  /*
  let element = document.getElementById(id);

  if (element.value !== false) {
    if (element.disabled) {
      element.disabled = false;
    }

    if (!element.disabled) {
      element.disabled = true;
    }
  }
  */
}


function toggle1() {
  toggleDisplay('summoner1MutationsToggle','summoner1Mutations');
}
function toggle2() {
  toggleDisplay('summoner2MutationsToggle','summoner2Mutations');
}
function toggle3() {
  toggleDisplay('summoner3MutationsToggle','summoner3Mutations');
}
function toggle4() {
  toggleDisplay('summoner4MutationsToggle','summoner4Mutations');
}

// clear outputs function
function clear() {
  document.getElementById('warning').innerHTML = '';
  document.getElementById('kit1').innerHTML = '';
  document.getElementById('kit2').innerHTML = '';
  document.getElementById('kit3').innerHTML = '';
  document.getElementById('kit4').innerHTML = '';
  document.getElementById('kit5').innerHTML = '';
  document.getElementById('kit6').innerHTML = '';
  document.getElementById('kit7').innerHTML = '';
  document.getElementById('kit8').innerHTML = '';
  document.getElementById('kit9').innerHTML = '';
  document.getElementById('kit10').innerHTML = '';
}

// summoner object setup
let summoner = {};
function summonerSetup() {
  summoner = {
    master: getCleaner('master'),
    s1: {
      geno: getCleaner('summoner1Geno'),
      mutations: getPillSelect('summoner1Mutations'),
      build: getCleaner('summoner1Build'),
      element: getCleaner('summoner1Element')
    },
    s2: {
      geno: getCleaner('summoner2Geno'),
      mutations: getPillSelect('summoner2Mutations'),
      build: getCleaner('summoner2Build'),
      element: getCleaner('summoner2Element')
    },
    s3: {
      geno: getCleaner('summoner3Geno'),
      mutations: getPillSelect('summoner3Mutations'),
      build: getCleaner('summoner3Build'),
      element: getCleaner('summoner3Element')
    },
    s4: {
      geno: getCleaner('summoner4Geno'),
      mutations: getPillSelect('summoner4Mutations'),
      build: getCleaner('summoner4Build'),
      element: getCleaner('summoner4Element')
    }
  };
  // console.log(summoner);
}

// multi item cleanup
function getTinctureOfWealth() {
  let output = [getCleaner('tinctureOfWealth1'), getCleaner('tinctureOfWealth2'), getCleaner('tinctureOfWealth3')].join();
  if (output === 'none,none,none') {
    return '';
  } else {
    return output;
  }
}

function getAvatars() {
  let output = [getCleaner('avatars1'), getCleaner('avatars2'), getCleaner('avatars3')];
  return output;
}

function getEssences() {
  let output = [getCleaner('essences1'), getCleaner('essences2'), getCleaner('essences3')];
  return output;
}

// item object setup
let item = {};
function itemSetup() {
  item = {
    lockOfHair: getCleaner('lockOfHair'),
    protectiveBalm: getCleaner('protectiveBalm'),
    nurturingRune: getCleaner('nurturingRune'),
    tinctureOfWealth: getTinctureOfWealth(),
    avatars: getAvatars(),
    essences: getEssences(),
    augmentationCharm: getCleaner('augmentationCharm'),
    masculineCharm: getCleaner('masculineCharm'),
    feminineCharm: getCleaner('feminineCharm'),
    mutationCharm: getCleaner('mutationCharm'),
    darkCharm: getCleaner('darkCharm'),
    lightCharm: getCleaner('lightCharm')
  };
  // console.log(item);
}

// kit object setup
let kit = {};
function kitSetup() {
  kit = {
    sex: '',
    level: '',
    build: '',
    element: '',
    geno: [],
    pheno: [],
    mutation: []
  };
}

function rollSex() {
  if (item.feminineCharm && !item.masculineCharm) {
    if (rng(100) <= 90) {
      kit.sex = 'female';
    } else {
      kit.sex = 'male';
    }
  } else if (item.masculineCharm && !item.feminineCharm) {
    if (rng(100) <= 90) {
      kit.sex = 'male';
    } else {
      kit.sex = 'female';
    }
  } else {
    kit.sex = randomizer(['female','male']);
  }
}

function rollLevel() {
  if (summoner.master) {
    kit.level = 'apprentice';
  } else {
    kit.level = 'novice';
  }
}

function rollBuild() {
  // tincture of Wealth
  if (item.tinctureOfWealth.search(/sh american|sh egyptian|sh european|sh oriental|sh persian|lh american|lh egyptian|lh european|lh oriental|lh persian|sphynx|cornish-rex|devon-rex|selkirk-rex|caracal|lynx|ocelot|serval|sand-cat|desert|jungle|plains|tundra|clouded-leopard|cheetah|leopard|lion|tiger/) !== -1) {
    if (!towToggle || rng(100) <= 10) {
      kit.build = item.tinctureOfWealth.match(/sh american|sh egyptian|sh european|sh oriental|sh persian|lh american|lh egyptian|lh european|lh oriental|lh persian|sphynx|cornish-rex|devon-rex|selkirk-rex|caracal|lynx|ocelot|serval|sand-cat|desert|jungle|plains|tundra|clouded-leopard|cheetah|leopard|lion|tiger/)[0];
      return;
    }
  }

  // summoner setup
  let shorthairs = [];
  let longhairs = [];
  let sphynxes = [];
  let rexes = [];
  let wildcats = [];
  let hybrids = [];
  let primals = [];

  function addSummonerBuild(build) {
    if (build !== false) {
      if (build.search(/\b(sh american|sh egyptian|sh european|sh oriental|sh persian)\b/i) !== -1) {
        shorthairs.push(build);
      }
      if (build.search(/\b(lh american|lh egyptian|lh european|lh oriental|lh persian)\b/i) !== -1) {
        longhairs.push(build);
      }
      if (build.search(/\b(sphynx)\b/i) !== -1) {
        sphynxes.push(build);
      }
      if (build.search(/\b(cornish-rex|devon-rex|selkirk-rex)\b/i) !== -1) {
        rexes.push(build);
      }
      if (build.search(/\b(caracal|lynx|ocelot|serval|sand-cat)\b/i) !== -1) {
        wildcats.push(build);
      }
      if (build.search(/\b(desert|jungle|plains|tundra)\b/i) !== -1) {
        hybrids.push(build);
      }
      if (build.search(/\b(clouded-leopard|cheetah|leopard|lion|tiger)\b/i) !== -1) {
        primals.push(build);
      }
    }
  }

  addSummonerBuild(summoner.s1.build);
  addSummonerBuild(summoner.s2.build);
  addSummonerBuild(summoner.s3.build);
  addSummonerBuild(summoner.s4.build);
  if (shorthairs.length + longhairs.length + sphynxes.length + rexes.length + wildcats.length + hybrids.length + primals.length <= 3) {
    for (let i = 0; i < item.avatars.length; i++) {
      addSummonerBuild(item.avatars[i]);
    }
  }
  // console.log(shorthairs, longhairs, sphynxes, rexes, wildcats, hybrids, primals);

  // exit if no builds
  if (shorthairs.length === 0 && longhairs.length === 0 && sphynxes.length === 0 && rexes.length === 0 && wildcats.length === 0 && hybrids.length === 0 && primals.length === 0) {
    return;
  }

  // same build group
  if (shorthairs.length !== 0 && longhairs.length === 0 && sphynxes.length === 0 && rexes.length === 0 && wildcats.length === 0 && hybrids.length === 0 && primals.length === 0) {
    if (item.lockOfHair && rng(100) <= 25) {
      kit.build = randomizer(shorthairs).replace(/\bsh\b/i, 'lh');
      console.log(kit.build);
    } else if (item.protectiveBalm && rng(100) <= 25) {
      kit.build = 'sphynx';
    } else {
      kit.build = randomizer(shorthairs);
    }
  }
  if (shorthairs.length === 0 && longhairs.length !== 0 && sphynxes.length === 0 && rexes.length === 0 && wildcats.length === 0 && hybrids.length === 0 && primals.length === 0) {
    kit.build = randomizer(longhairs);
  }
  if (shorthairs.length === 0 && longhairs.length === 0 && sphynxes.length !== 0 && rexes.length === 0 && wildcats.length === 0 && hybrids.length === 0 && primals.length === 0) {
    kit.build = randomizer(sphynxes);
  }
  if (shorthairs.length === 0 && longhairs.length === 0 && sphynxes.length === 0 && rexes.length !== 0 && wildcats.length === 0 && hybrids.length === 0 && primals.length === 0) {
    kit.build = randomizer(rexes);
  }
  if (shorthairs.length === 0 && longhairs.length === 0 && sphynxes.length === 0 && rexes.length === 0 && wildcats.length !== 0 && hybrids.length === 0 && primals.length === 0) {
    kit.build = randomizer(wildcats);
  }
  if (shorthairs.length === 0 && longhairs.length === 0 && sphynxes.length === 0 && rexes.length === 0 && wildcats.length === 0 && hybrids.length !== 0 && primals.length === 0) {
    kit.build = randomizer(hybrids);
  }
  if (shorthairs.length === 0 && longhairs.length === 0 && sphynxes.length === 0 && rexes.length === 0 && wildcats.length === 0 && hybrids.length === 0 && primals.length !== 0) {
    kit.build = randomizer(primals);
  }

  // shorthair x sphynx
  if (shorthairs.length !== 0 && longhairs.length === 0 && sphynxes.length !== 0 && rexes.length === 0 && wildcats.length === 0 && hybrids.length === 0 && primals.length === 0) {
    kit.build = randomizer(shorthairs);

    if (!item.lockOfHair) {
      let bonus = item.protectiveBalm ? 25:0;

      if (sphynxes.length === 1 && rng(100) <= 30 + bonus || sphynxes.length === 2 && rng(100) <= 40 + bonus || sphynxes.length === 3 && rng(100) <= 50 + bonus) {
        if (shorthairs.join(' ').search(/\bpersian\b/) !== -1) {
          kit.build = 'selkirk-rex';
        }
        if (shorthairs.join(' ').search(/\boriental\b/) !== -1) {
          kit.build = 'cornish-rex';
        }
        if (shorthairs.join(' ').search(/\b(american|egyptian|european)\b/) !== -1) {
          kit.build = 'devon-rex';
        }
      }
    }
  }

  // longhair x shorthair
  if (shorthairs.length !== 0 && longhairs.length !== 0 && sphynxes.length === 0 && rexes.length === 0 && wildcats.length === 0 && hybrids.length === 0 && primals.length === 0) {
    kit.build = randomizer(shorthairs.concat(longhairs)).replace(/\blh\b/i, 'sh');

    if (rng(100) <= longhairs.length * 20 || item.lockOfHair && rng(100) <= 25) {
      kit.build = kit.build.replace(/\bsh\b/i, 'lh');
    }
  }

  // longhair x sphynx
  if (shorthairs.length === 0 && longhairs.length !== 0 && sphynxes.length !== 0 && rexes.length === 0 && wildcats.length === 0 && hybrids.length === 0 && primals.length === 0) {
    kit.build = randomizer(sphynxes.concat(longhairs)).replace(/\bsphynx\b/, 'sh american').replace(/\blh\b/i, 'sh');
  }

  // longhair x shorthair x sphynx
  if (shorthairs.length !== 0 && longhairs.length !== 0 && sphynxes.length !== 0 && rexes.length === 0 && wildcats.length === 0 && hybrids.length === 0 && primals.length === 0) {
    kit.build = randomizer(sphynxes.concat(shorthairs.concat(longhairs))).replace(/\bsphynx\b/, 'sh american').replace(/\blh\b/i, 'sh');

    if (item.protectiveBalm && rng(100) <= 25) {
      if (shorthairs.concat(longhairs).join(' ').search(/\bpersian\b/) !== -1) {
          kit.build = 'selkirk-rex';
      }
      if (shorthairs.concat(longhairs).join(' ').search(/\boriental\b/) !== -1) {
        kit.build = 'cornish-rex';
      }
      if (shorthairs.concat(longhairs).join(' ').search(/\b(american|egyptian|european)\b/) !== -1) {
        kit.build = 'devon-rex';
      }
    }
    if (item.lockOfHair && rng(100) <= 25) {
      kit.build = kit.build.replace(/\bsh\b/i, 'lh');
    }
  }

  // longhair x rex
  if (shorthairs.length === 0 && longhairs.length !== 0 && sphynxes.length === 0 && rexes.length !== 0 && wildcats.length === 0 && hybrids.length === 0 && primals.length === 0) {
    kit.build = randomizer(longhairs.concat(rexes)).replace(/\blh\b/i, 'sh').replace(/\bdevon-rex\b/i, 'sh american').replace(/\bcornish-rex\b/i, 'sh oriental').replace(/\bselkirk-rex\b/i, 'sh persian');

    if (rng(100) <= longhairs.length * 15 || item.lockOfHair && rng(100) <= 25) {
      kit.build = kit.build.replace(/\bsh\b/i, 'lh');
    }
  }

  // longhair x shorthair x rex
  if (shorthairs.length !== 0 && longhairs.length !== 0 && sphynxes.length === 0 && rexes.length !== 0 && wildcats.length === 0 && hybrids.length === 0 && primals.length === 0) {
    kit.build = randomizer(shorthairs.concat(longhairs.concat(rexes))).replace(/\blh\b/i, 'sh').replace(/\bdevon-rex\b/i, 'sh american').replace(/\bcornish-rex\b/i, 'sh oriental').replace(/\bselkirk-rex\b/i, 'sh persian');

    if (rng(100) <= longhairs.length * 20 || item.lockOfHair && rng(100) <= 25) {
      kit.build = kit.build.replace(/\bsh\b/i, 'lh');
    }
  }

  // longhair x sphynx x rex
  if (shorthairs.length === 0 && longhairs.length !== 0 && sphynxes.length !== 0 && rexes.length !== 0 && wildcats.length === 0 && hybrids.length === 0 && primals.length === 0) {
    kit.build = randomizer(longhairs.concat(sphynxes.concat(rexes))).replace(/\blh\b/i, 'sh').replace(/\b(sphynx|devon-rex)\b/i, 'sh american').replace(/\bcornish-rex\b/i, 'sh oriental').replace(/\bselkirk-rex\b/i, 'sh persian');
  }

  // longhair x shorthair x sphynx x rex
  if (shorthairs.length !== 0 && longhairs.length !== 0 && sphynxes.length !== 0 && rexes.length !== 0 && wildcats.length === 0 && hybrids.length === 0 && primals.length === 0) {
    kit.build = randomizer(shorthairs.concat(longhairs.concat(sphynxes.concat(rexes)))).replace(/\blh\b/i, 'sh').replace(/\b(sphynx|devon-rex)\b/i, 'sh american').replace(/\bcornish-rex\b/i, 'sh oriental').replace(/\bselkirk-rex\b/i, 'sh persian');
  }

  // sphynx x rex
  if (shorthairs.length === 0 && longhairs.length === 0 && sphynxes.length !== 0 && rexes.length !== 0 && wildcats.length === 0 && hybrids.length === 0 && primals.length === 0) {
    kit.build = randomizer(sphynxes.concat(rexes)).replace(/\bsphynx\b/g, 'devon-rex');

    if (item.protectiveBalm && rng(100) <= 25) {
      kit.build = 'sphynx';
    }
  }

  // (sphynx x) rex x shorthair
  if (shorthairs.length !== 0 && longhairs.length === 0 && sphynxes.length === 0 && rexes.length !== 0 && wildcats.length === 0 && hybrids.length === 0 && primals.length === 0 || shorthairs.length !== 0 && longhairs.length === 0 && sphynxes.length !== 0 && rexes.length !== 0 && wildcats.length === 0 && hybrids.length === 0 && primals.length === 0) {
    let bonus = 0;
    if (sphynxes.length !== -1 || item.protectiveBalm) {
      bonus += 25;
    }

    //selkirk-rex
    // selkirk-rex x american
    if (shorthairs.join(' ').search(/\bamerican\b/i) !== -1 && rexes.join(' ').search(/\bselkirk-rex\b/i) !== -1) {
      if (rexes.count('selkirk-rex') === 1) {
        if (rng(100) <= 10 + bonus) {
          kit.build = randomizer(['devon-rex','selkirk-rex']);
        } else {
          kit.build = randomizer(['sh american','sh persian']);
        }
      }
      if (rexes.count('selkirk-rex') === 2) {
        if (rng(100) <= 15 + bonus) {
          kit.build = randomizer(['devon-rex','selkirk-rex']);
        } else {
          kit.build = randomizer(['sh american','sh persian']);
        }
      }
      if (rexes.count('selkirk-rex') === 3) {
        if (rng(100) <= 20 + bonus) {
          kit.build = randomizer(['devon-rex','selkirk-rex']);
        } else {
          kit.build = randomizer(['sh american','sh persian']);
        }
      }
    }

    // selkirk-rex x egyptian
    if (shorthairs.join(' ').search(/\begyptian\b/i) !== -1 && rexes.join(' ').search(/\bselkirk-rex\b/i) !== -1) {
      if (rexes.count('selkirk-rex') === 1) {
        if (rng(100) <= 10 + bonus) {
          kit.build = randomizer(['devon-rex','selkirk-rex']);
        } else {
          kit.build = randomizer(['sh egyptian','sh persian']);
        }
      }
      if (rexes.count('selkirk-rex') === 2) {
        if (rng(100) <= 15 + bonus) {
          kit.build = randomizer(['devon-rex','selkirk-rex']);
        } else {
          kit.build = randomizer(['sh egyptian','sh persian']);
        }
      }
      if (rexes.count('selkirk-rex') === 3) {
        if (rng(100) <= 20 + bonus) {
          kit.build = randomizer(['devon-rex','selkirk-rex']);
        } else {
          kit.build = randomizer(['sh egyptian','sh persian']);
        }
      }
    }

    // selkirk-rex x european
    if (shorthairs.join(' ').search(/\beuropean\b/i) !== -1 && rexes.join(' ').search(/\bselkirk-rex\b/i) !== -1) {
      if (rexes.count('selkirk-rex') === 1) {
        if (rng(100) <= 10 + bonus) {
          kit.build = randomizer(['devon-rex','selkirk-rex']);
        } else {
          kit.build = randomizer(['sh european','sh persian']);
        }
      }
      if (rexes.count('selkirk-rex') === 2) {
        if (rng(100) <= 15 + bonus) {
          kit.build = randomizer(['devon-rex','selkirk-rex']);
        } else {
          kit.build = randomizer(['sh european','sh persian']);
        }
      }
      if (rexes.count('selkirk-rex') === 3) {
        if (rng(100) <= 20 + bonus) {
          kit.build = randomizer(['devon-rex','selkirk-rex']);
        } else {
          kit.build = randomizer(['sh european','sh persian']);
        }
      }
    }

    // selkirk-rex x oriental
    if (shorthairs.join(' ').search(/\boriental\b/i) !== -1 && rexes.join(' ').search(/\bselkirk-rex\b/i) !== -1) {
      if (rexes.count('selkirk-rex') === 1) {
        if (rng(100) <= 10 + bonus) {
          kit.build = randomizer(['cornish-rex','selkirk-rex']);
        } else {
          kit.build = randomizer(['sh oriental','sh persian']);
        }
      }
      if (rexes.count('selkirk-rex') === 2) {
        if (rng(100) <= 15 + bonus) {
          kit.build = randomizer(['cornish-rex','selkirk-rex']);
        } else {
          kit.build = randomizer(['sh oriental','sh persian']);
        }
      }
      if (rexes.count('selkirk-rex') === 3) {
        if (rng(100) <= 20 + bonus) {
          kit.build = randomizer(['cornish-rex','selkirk-rex']);
        } else {
          kit.build = randomizer(['sh oriental','sh persian']);
        }
      }
    }

    // selkirk-rex x persian
    if (shorthairs.join(' ').search(/\bpersian\b/i) !== -1 && rexes.join(' ').search(/\bselkirk-rex\b/i) !== -1) {
      if (rexes.count('selkirk-rex') === 1) {
        if (rng(100) <= 20 + bonus) {
          kit.build = 'selkirk-rex';
        } else {
          kit.build = 'sh persian';
        }
      }
      if (rexes.count('selkirk-rex') === 2) {
        if (rng(100) <= 30 + bonus) {
          kit.build = 'selkirk-rex';
        } else {
          kit.build = 'sh persian';
        }
      }
      if (rexes.count('selkirk-rex') === 3) {
        if (rng(100) <= 40 + bonus) {
          kit.build = 'selkirk-rex';
        } else {
          kit.build = 'sh persian';
        }
      }
    }

    // cornish-rex
    // cornish-rex x american
    if (shorthairs.join(' ').search(/\bamerican\b/i) !== -1 && rexes.join(' ').search(/\bcornish-rex\b/i) !== -1) {
      if (rexes.count('cornish-rex') === 1) {
        if (rng(100) <= 10 + bonus) {
          kit.build = randomizer(['devon-rex','cornish-rex']);
        } else {
          kit.build = randomizer(['sh american','sh oriental']);
        }
      }
      if (rexes.count('cornish-rex') === 2) {
        if (rng(100) <= 15 + bonus) {
          kit.build = randomizer(['devon-rex','cornish-rex']);
        } else {
          kit.build = randomizer(['sh american','sh oriental']);
        }
      }
      if (rexes.count('cornish-rex') === 3) {
        if (rng(100) <= 20 + bonus) {
          kit.build = randomizer(['devon-rex','cornish-rex']);
        } else {
          kit.build = randomizer(['sh american','sh oriental']);
        }
      }
    }

    // cornish-rex x egyptian
    if (shorthairs.join(' ').search(/\begyptian\b/i) !== -1 && rexes.join(' ').search(/\bcornish-rex\b/i) !== -1) {
      if (rexes.count('cornish-rex') === 1) {
        if (rng(100) <= 10 + bonus) {
          kit.build = randomizer(['devon-rex','cornish-rex']);
        } else {
          kit.build = randomizer(['sh egyptian','sh oriental']);
        }
      }
      if (rexes.count('cornish-rex') === 2) {
        if (rng(100) <= 15 + bonus) {
          kit.build = randomizer(['devon-rex','cornish-rex']);
        } else {
          kit.build = randomizer(['sh egyptian','sh oriental']);
        }
      }
      if (rexes.count('cornish-rex') === 3) {
        if (rng(100) <= 20 + bonus) {
          kit.build = randomizer(['devon-rex','cornish-rex']);
        } else {
          kit.build = randomizer(['sh egyptian','sh oriental']);
        }
      }
    }

    // cornish-rex x european
    if (shorthairs.join(' ').search(/\beuropean\b/i) !== -1 && rexes.join(' ').search(/\bcornish-rex\b/i) !== -1) {
      if (rexes.count('cornish-rex') === 1) {
        if (rng(100) <= 10 + bonus) {
          kit.build = randomizer(['devon-rex','cornish-rex']);
        } else {
          kit.build = randomizer(['sh european','sh oriental']);
        }
      }
      if (rexes.count('cornish-rex') === 2) {
        if (rng(100) <= 15 + bonus) {
          kit.build = randomizer(['devon-rex','cornish-rex']);
        } else {
          kit.build = randomizer(['sh european','sh oriental']);
        }
      }
      if (rexes.count('cornish-rex') === 3) {
        if (rng(100) <= 20 + bonus) {
          kit.build = randomizer(['devon-rex','cornish-rex']);
        } else {
          kit.build = randomizer(['sh european','sh oriental']);
        }
      }
    }

    // cornish-rex x oriental
    if (shorthairs.join(' ').search(/\boriental\b/i) !== -1 && rexes.join(' ').search(/\bcornish-rex\b/i) !== -1) {
      if (rexes.count('cornish-rex') === 1) {
        if (rng(100) <= 20 + bonus) {
          kit.build = 'cornish-rex';
        } else {
          kit.build = 'sh oriental';
        }
      }
      if (rexes.count('cornish-rex') === 2) {
        if (rng(100) <= 30 + bonus) {
          kit.build = 'cornish-rex';
        } else {
          kit.build = 'sh oriental';
        }
      }
      if (rexes.count('cornish-rex') === 3) {
        if (rng(100) <= 40 + bonus) {
          kit.build = 'cornish-rex';
        } else {
          kit.build = 'sh oriental';
        }
      }
    }

    // cornish-rex x persian
    if (shorthairs.join(' ').search(/\bpersian\b/i) !== -1 && rexes.join(' ').search(/\bcornish-rex\b/i) !== -1) {
      if (rexes.count('cornish-rex') === 1) {
        if (rng(100) <= 10 + bonus) {
          kit.build = randomizer(['selkirk-rex','cornish-rex']);
        } else {
          kit.build = randomizer(['sh persian','sh oriental']);
        }
      }
      if (rexes.count('cornish-rex') === 2) {
        if (rng(100) <= 15 + bonus) {
          kit.build = randomizer(['selkirk-rex','cornish-rex']);
        } else {
          kit.build = randomizer(['sh persian','sh oriental']);
        }
      }
      if (rexes.count('cornish-rex') === 3) {
        if (rng(100) <= 20 + bonus) {
          kit.build = randomizer(['selkirk-rex','cornish-rex']);
        } else {
          kit.build = randomizer(['sh persian','sh oriental']);
        }
      }
    }

    // devon-rex
    // devon-rex x american
    if (shorthairs.join(' ').search(/\bamerican\b/i) !== -1 && rexes.join(' ').search(/\bdevon-rex\b/i) !== -1) {
      if (rexes.count('devon-rex') === 1) {
        if (rng(100) <= 20 + bonus) {
          kit.build = 'devon-rex';
        } else {
          kit.build = 'sh american';
        }
      }
      if (rexes.count('devon-rex') === 2) {
        if (rng(100) <= 30 + bonus) {
          kit.build = 'devon-rex';
        } else {
          kit.build = 'sh american';
        }
      }
      if (rexes.count('devon-rex') === 3) {
        if (rng(100) <= 40 + bonus) {
          kit.build = 'devon-rex';
        } else {
          kit.build = 'sh american';
        }
      }
    }

    // devon-rex x egyptian
    if (shorthairs.join(' ').search(/\begyptian\b/i) !== -1 && rexes.join(' ').search(/\bdevon-rex\b/i) !== -1) {
      if (rexes.count('devon-rex') === 1) {
        if (rng(100) <= 20 + bonus) {
          kit.build = 'devon-rex';
        } else {
          kit.build = 'sh egyptian';
        }
      }
      if (rexes.count('devon-rex') === 2) {
        if (rng(100) <= 30 + bonus) {
          kit.build = 'devon-rex';
        } else {
          kit.build = 'sh egyptian';
        }
      }
      if (rexes.count('devon-rex') === 3) {
        if (rng(100) <= 40 + bonus) {
          kit.build = 'sh devon-rex';
        } else {
          kit.build = 'sh egyptian';
        }
      }
    }

    // devon-rex x european
    if (shorthairs.join(' ').search(/\beuropean\b/i) !== -1 && rexes.join(' ').search(/\bdevon-rex\b/i) !== -1) {
      if (rexes.count('devon-rex') === 1) {
        if (rng(100) <= 20 + bonus) {
          kit.build = 'devon-rex';
        } else {
          kit.build = 'sh european';
        }
      }
      if (rexes.count('devon-rex') === 2) {
        if (rng(100) <= 30 + bonus) {
          kit.build = 'devon-rex';
        } else {
          kit.build = 'sh european';
        }
      }
      if (rexes.count('devon-rex') === 3) {
        if (rng(100) <= 40 + bonus) {
          kit.build = 'sh devon-rex';
        } else {
          kit.build = 'sh european';
        }
      }
    }

    // devon-rex x oriental
    if (shorthairs.join(' ').search(/\boriental\b/i) !== -1 && rexes.join(' ').search(/\bdevon-rex\b/i) !== -1) {
      if (rexes.count('devon-rex') === 1) {
        if (rng(100) <= 10 + bonus) {
          kit.build = randomizer(['devon-rex','cornish-rex']);
        } else {
          kit.build = randomizer(['sh american','sh oriental']);
        }
      }
      if (rexes.count('devon-rex') === 2) {
        if (rng(100) <= 15 + bonus) {
          kit.build = randomizer(['devon-rex','cornish-rex']);
        } else {
          kit.build = randomizer(['sh american','sh oriental']);
        }
      }
      if (rexes.count('devon-rex') === 3) {
        if (rng(100) <= 20 + bonus) {
          kit.build = randomizer(['devon-rex','cornish-rex']);
        } else {
          kit.build = randomizer(['sh american','sh oriental']);
        }
      }
    }

    // devon-rex x persian
    if (shorthairs.join(' ').search(/\bpersian\b/i) !== -1 && rexes.join(' ').search(/\bdevon-rex\b/i) !== -1) {
      if (rexes.count('devon-rex') === 1) {
        if (rng(100) <= 10 + bonus) {
          kit.build = randomizer(['devon-rex','selkirk-rex']);
        } else {
          kit.build = randomizer(['sh american','sh persian']);
        }
      }
      if (rexes.count('devon-rex') === 2) {
        if (rng(100) <= 15 + bonus) {
          kit.build = randomizer(['devon-rex','selkirk-rex']);
        } else {
          kit.build = randomizer(['sh american','sh persian']);
        }
      }
      if (rexes.count('devon-rex') === 3) {
        if (rng(100) <= 20 + bonus) {
          kit.build = randomizer(['devon-rex','selkirk-rex']);
        } else {
          kit.build = randomizer(['sh american','sh persian']);
        }
      }
    }
  }

  // wildcat x shorthair || wildcat x sphynx || wildcat x sphynx (x shorthair/longhair) || wildcat x sphynx x rex || wildcat x shorthair x sphynx x rex || wildcat x longhair x sphynx x rex
  if (shorthairs.length !== 0 && longhairs.length === 0 && sphynxes.length === 0 && rexes.length === 0 && wildcats.length !== 0 && hybrids.length === 0 && primals.length === 0 || shorthairs.length === 0 && longhairs.length === 0 && sphynxes.length !== 0 && rexes.length === 0 && wildcats.length !== 0 && hybrids.length === 0 && primals.length === 0 || shorthairs.length !== 0 && longhairs.length === 0 && sphynxes.length !== 0 && rexes.length === 0 && wildcats.length !== 0 && hybrids.length === 0 && primals.length === 0 || shorthairs.length === 0 && longhairs.length !== 0 && sphynxes.length !== 0 && rexes.length === 0 && wildcats.length !== 0 && hybrids.length === 0 && primals.length === 0 || shorthairs.length === 0 && longhairs.length === 0 && sphynxes.length !== 0 && rexes.length !== 0 && wildcats.length !== 0 && hybrids.length === 0 && primals.length === 0 || shorthairs.length !== 0 && longhairs.length === 0 && sphynxes.length !== 0 && rexes.length !== 0 && wildcats.length !== 0 && hybrids.length === 0 && primals.length === 0 || shorthairs.length === 0 && longhairs.length !== 0 && sphynxes.length !== 0 && rexes.length !== 0 && wildcats.length !== 0 && hybrids.length === 0 && primals.length === 0) {
    kit.build = randomizer(wildcats).replace(/\b(caracal|serval)\b/g, 'plains').replace(/\blynx\b/g, 'tundra').replace(/\bocelot\b/g, 'jungle').replace(/\bsand-cat\b/g, 'desert');
  }

  // wildcat x longhair
  if (shorthairs.length === 0 && longhairs.length !== 0 && sphynxes.length === 0 && rexes.length === 0 && wildcats.length !== 0 && hybrids.length === 0 && primals.length === 0) {
    kit.build = randomizer(wildcats).replace(/\b(caracal|serval)\b/g, 'plains').replace(/\blynx\b/g, 'tundra').replace(/\bocelot\b/g, 'jungle').replace(/\bsand-cat\b/g, 'desert');

    if (rng(100) <= longhairs.length * 20 || item.lockOfHair && rng(100) <= 25) {
      kit.build = 'cashmere ' + kit.build;
    }
  }

  // wildcat x shorthair x longhair
  if (shorthairs.length !== 0 && longhairs.length !== 0 && sphynxes.length === 0 && rexes.length === 0 && wildcats.length !== 0 && hybrids.length === 0 && primals.length === 0) {
    kit.build = randomizer(wildcats).replace(/\b(caracal|serval)\b/g, 'plains').replace(/\blynx\b/g, 'tundra').replace(/\bocelot\b/g, 'jungle').replace(/\bsand-cat\b/g, 'desert');

    if (rng(100) <= longhairs.length * 10 || item.lockOfHair && rng(100) <= 25) {
      kit.build = 'cashmere ' + kit.build;
    }
  }

  // wildcat x shorthair x longhair x sphynx || wildcat x rex (x shorthair/longhair) || wildcat x rex x shorthair x longhair
  if (shorthairs.length !== 0 && longhairs.length !== 0 && sphynxes.length !== 0 && rexes.length === 0 && wildcats.length !== 0 && hybrids.length === 0 && primals.length === 0 || shorthairs.length === 0 && longhairs.length === 0 && sphynxes.length === 0 && rexes.length !== 0 && wildcats.length !== 0 && hybrids.length === 0 && primals.length === 0 || shorthairs.length !== 0 && longhairs.length === 0 && sphynxes.length === 0 && rexes.length !== 0 && wildcats.length !== 0 && hybrids.length === 0 && primals.length === 0 || shorthairs.length === 0 && longhairs.length !== 0 && sphynxes.length === 0 && rexes.length !== 0 && wildcats.length !== 0 && hybrids.length === 0 && primals.length === 0 || shorthairs.length !== 0 && longhairs.length !== 0 && sphynxes.length === 0 && rexes.length !== 0 && wildcats.length !== 0 && hybrids.length === 0 && primals.length === 0) {
    kit.build = randomizer(wildcats).replace(/\b(caracal|serval)\b/g, 'plains').replace(/\blynx\b/g, 'tundra').replace(/\bocelot\b/g, 'jungle').replace(/\bsand-cat\b/g, 'desert');

    if (item.lockOfHair && rng(100) <= 25) {
      kit.build = 'cashmere ' + kit.build;
    }
  }

  // hybrid x shorthair
  if (shorthairs.length !== 0 && longhairs.length === 0 && sphynxes.length === 0 && rexes.length === 0 && wildcats.length === 0 && hybrids.length !== 0 && primals.length === 0) {
    kit.build = randomizer(hybrids);

    if (item.lockOfHair && rng(100) <= 25) {
      kit.build = 'cashmere ' + kit.build;
    }
  }

  // hybrid (x shorthair) x longhair || hybrid (x sphynx/shorthair) x rex
  if (shorthairs.length === 0 && longhairs.length !== 0 && sphynxes.length === 0 && rexes.length === 0 && wildcats.length === 0 && hybrids.length !== 0 && primals.length === 0 || shorthairs.length !== 0 && longhairs.length !== 0 && sphynxes.length === 0 && rexes.length === 0 && wildcats.length === 0 && hybrids.length !== 0 && primals.length === 0 || shorthairs.length === 0 && longhairs.length === 0 && sphynxes.length === 0 && rexes.length !== 0 && wildcats.length === 0 && hybrids.length !== 0 && primals.length === 0 || shorthairs.length === 0 && longhairs.length === 0 && sphynxes.length !== 0 && rexes.length !== 0 && wildcats.length === 0 && hybrids.length !== 0 && primals.length === 0 || shorthairs.length !== 0 && longhairs.length === 0 && sphynxes.length === 0 && rexes.length !== 0 && wildcats.length === 0 && hybrids.length !== 0 && primals.length === 0 || shorthairs.length !== 0 && longhairs.length !== 0 && sphynxes.length === 0 && rexes.length !== 0 && wildcats.length === 0 && hybrids.length !== 0 && primals.length === 0) {
    kit.build = randomizer(hybrids);

    if (rng(100) <= longhairs.length * 20 || item.lockOfHair && rng(100) <= 25) {
      kit.build = 'cashmere ' + kit.build;
    }
  }

  // hybrid x sphynx || hybrid (x shorthair/longhair) x sphynx || hybrid x shorthair x longhair x sphynx
  if (shorthairs.length === 0 && longhairs.length === 0 && sphynxes.length !== 0 && rexes.length === 0 && wildcats.length === 0 && hybrids.length !== 0 && primals.length === 0 || shorthairs.length !== 0 && longhairs.length === 0 && sphynxes.length !== 0 && rexes.length === 0 && wildcats.length === 0 && hybrids.length !== 0 && primals.length === 0 || shorthairs.length === 0 && longhairs.length !== 0 && sphynxes.length !== 0 && rexes.length === 0 && wildcats.length === 0 && hybrids.length !== 0 && primals.length === 0 || shorthairs.length !== 0 && longhairs.length !== 0 && sphynxes.length !== 0 && rexes.length === 0 && wildcats.length === 0 && hybrids.length !== 0 && primals.length === 0) {
    kit.build = randomizer(hybrids);
  }

  // hybrid x longhair x rex
  if (shorthairs.length === 0 && longhairs.length !== 0 && sphynxes.length === 0 && rexes.length !== 0 && wildcats.length === 0 && hybrids.length !== 0 && primals.length === 0) {
    kit.build = randomizer(hybrids);

    if (rng(100) <= longhairs.length * 15 || item.lockOfHair && rng(100) <= 25) {
      kit.build = 'cashmere ' + kit.build;
    }
  }

  // hybrid x shorthair x longhair x rex
  if (shorthairs.length !== 0 && longhairs.length !== 0 && sphynxes.length === 0 && rexes.length !== 0 && wildcats.length === 0 && hybrids.length !== 0 && primals.length === 0) {
    kit.build = randomizer(hybrids);

    if (rng(100) <= longhairs.length * 20 || item.lockOfHair && rng(100) <= 25) {
      kit.build = 'cashmere ' + kit.build;
    }
  }

  // hybrid x wildcat
  if (shorthairs.length === 0 && longhairs.length === 0 && sphynxes.length === 0 && rexes.length === 0 && wildcats.length !== 0 && hybrids.length !== 0 && primals.length === 0) {
    kit.build = randomizer(wildcats.concat(hybrids)).replace(/\b(caracal|serval)\b/g, 'plains').replace(/\blynx\b/g, 'tundra').replace(/\bocelot\b/g, 'jungle').replace(/\bsand-cat\b/g, 'desert');
  }
}

function rollElement() {
  // tincture of Wealth
  if (item.tinctureOfWealth.search(/fire|water|earth|air|light|shadow|bloom|blight|voltage|stardust/) !== -1) {
    if (!towToggle || rng(100) <= 10) {
      kit.element = item.tinctureOfWealth.match(/fire|water|earth|air|light|shadow|bloom|blight|voltage|stardust/)[0];
      return;
    }
  }

  // summoner setup
  let elementsBasic = [];
  let elementsPrimal = [];

  function addSummonerElement(element) {
    if (element !== false) {
      if (element.search(/\b(fire|water|earth|air)\b/i) !== -1) {
        elementsBasic.push(element);
      }
      if (element.search(/\b(light|shadow|bloom|blight|voltage|stardust)\b/i) !== -1) {
        elementsPrimal.push(element);
      }
    }
  }

  addSummonerElement(summoner.s1.element);
  addSummonerElement(summoner.s2.element);
  addSummonerElement(summoner.s3.element);
  addSummonerElement(summoner.s4.element);
  if (elementsBasic.length + elementsPrimal.length <= 3) {
    for (let i = 0; i < item.essences.length; i++) {
      addSummonerElement(item.essences[i]);
    }
  }
  // console.log(elements);

  // exit if no elements
  if (elementsBasic.length === 0 && elementsPrimal.length === 0) {
    return;
  }

  // same element group
  if (elementsBasic.length !== 0 && elementsPrimal.length === 0) {
    kit.element = randomizer(elementsBasic);
  }
  if (elementsBasic.length === 0 && elementsPrimal.length !== 0) {
    kit.element = randomizer(elementsPrimal);
  }

  // basic x primal
  if (elementsBasic.length === 1 && elementsPrimal.length === 1) {
    kit.element = rngList([[80,randomizer(elementsBasic)],[100,randomizer(elementsPrimal)]], 100);
  }
  if (elementsBasic.length === 1 && elementsPrimal.length === 2) {
    kit.element = rngList([[70,randomizer(elementsBasic)],[100,randomizer(elementsPrimal)]], 100);
  }
  if (elementsBasic.length === 1 && elementsPrimal.length === 3) {
    kit.element = rngList([[60,randomizer(elementsBasic)],[100,randomizer(elementsPrimal)]], 100);
  }
  if (elementsBasic.length === 2 && elementsPrimal.length === 1) {
    kit.element = rngList([[90,randomizer(elementsBasic)],[100,randomizer(elementsPrimal)]], 100);
  }
  if (elementsBasic.length === 3 && elementsPrimal.length === 1) {
    kit.element = rngList([[98,randomizer(elementsBasic)],[100,randomizer(elementsPrimal)]], 100);
  }
  if (elementsBasic.length === 2 && elementsPrimal.length === 2) {
    kit.element = rngList([[85,randomizer(elementsBasic)],[100,randomizer(elementsPrimal)]], 100);
  }
}

function rollGeno() {
  // summoner setup
  let genos = [];
  let genosPresent = 0;

  function addSummonerGeno(geno) {
    if (geno !== false) {
      genos.push(geno);
      genosPresent++;
    }
  }

  addSummonerGeno(summoner.s1.geno);
  addSummonerGeno(summoner.s2.geno);
  addSummonerGeno(summoner.s3.geno);
  addSummonerGeno(summoner.s4.geno);

  let genosBase = genos.join(' ');
  let genosMarkings = genos.join('/').split('/');
  // console.log(genosBase, genosMarkings);

  // base genes
  // 0 summoners
  if (genosPresent === 0) {
    return;
  }

  // 1 summoner
  if (genosPresent === 1) {
    kit.geno = genos[0].match(/(EE|Ee|ee)\/(AA|Aa|aa)\/(NN|Nn|nn)\/(RR|Rr|rr)/) !== null ? genos[0].match(/(EE|Ee|ee)\/(AA|Aa|aa)\/(NN|Nn|nn)\/(RR|Rr|rr)/)[0].split('/'):['ee','aa','nn','rr'];
    kit.geno.push('ww');
  }

  // 2-4 summoners
  let baseList = [[40,'e'],[30,'a'],[20,'n'],[40,'r'],[30,'w']];

  function baseLogic(passNum, gene) {
    let dom = gene.toUpperCase();
    let rec = gene.toLowerCase();

    let regexDom = '\\b' + dom + dom + '\\b';
    regexDom = new RegExp(regexDom, 'g');
    let regexRec = '\\b' + dom + rec + '\\b';
    regexRec = new RegExp(regexRec, 'g');

    // let count = genosBase.count(dom);
    let count = 0;
    count += (genosBase.match(regexDom) || []).length * 2;
    count += (genosBase.match(regexRec) || []).length;
    console.log(count);

    let tempGeno = [rec,rec];

    for (let i = 0; i < count; i++) {
      let x = rng(100);
      if (x <= passNum) {
        if (tempGeno[0] === rec) {
          tempGeno[0] = dom;
        } else {
          tempGeno[1] = dom;
        }
      }
    }

    kit.geno.push(tempGeno.join(''));
  }

  function rollBase() {
    for (let i = 0; i < baseList.length; i++) {
      baseLogic(baseList[i][0], baseList[i][1]);
    }
  }

  function dominanceOverride() {
    if (kit.geno[0].search(/(EE|Ee)/) !== -1) {
      kit.geno[1] = 'aa';
      kit.geno[2] = 'nn';
    }
    if (kit.geno[1].search(/(AA|Aa)/) !== -1) {
      kit.geno[0] = 'ee';
      kit.geno[2] = 'nn';
    }
    if (kit.geno[2].search(/(NN|Nn)/) !== -1) {
      kit.geno[0] = 'ee';
      kit.geno[1] = 'aa';
    }
    if (kit.sex === 'male' && kit.geno[0].search(/(EE|Ee)/) !== -1 && kit.geno[3].search(/(RR|Rr)/) !== -1) {
      kit.geno[0] = 'ee';
    } else if (kit.sex === 'male') {
      kit.geno[3] = 'rr';
    }
  }

  function itemOverride() {
    if (item.darkCharm) {
      if (genosBase.search(/\b(EE|Ee)\b/) !== -1) {
        kit.geno = ['Ee','aa','nn','rr'];
      } else if (genosBase.search(/\b(AA|Aa)\b/) !== -1) {
        kit.geno = ['ee','Aa','nn','rr'];
      } else if (genosBase.search(/\b(NN|Nn)\b/) !== -1) {
        kit.geno = ['ee','aa','Nn','rr'];
      } else if (genosBase.search(/\b(RR|Rr)\b/) !== -1) {
        kit.geno = ['ee','aa','nn','Rr'];
      }
      baseLogic(baseList[4][0], baseList[4][1]);
    }

    if (item.lightCharm) {
      if (genosBase.search(/\b(RR|Rr)\b/) !== -1) {
        kit.geno = ['ee','aa','nn','Rr'];
      } else if (genosBase.search(/\b(NN|Nn)\b/) !== -1) {
        kit.geno = ['ee','aa','Nn','rr'];
      } else if (genosBase.search(/\b(AA|Aa)\b/) !== -1) {
        kit.geno = ['ee','Aa','nn','rr'];
      } else if (genosBase.search(/\b(EE|Ee)\b/) !== -1) {
        kit.geno = ['Ee','aa','nn','rr'];
      }
      baseLogic(baseList[4][0], baseList[4][1]);
    }

    if (item.tinctureOfWealth.search(/tortoiseshell|black|chocolate|cinnamon|red/) !== -1) {
      if (!towToggle || rng(100) <= 10) {
        if (item.tinctureOfWealth.search('tortoiseshell') !== -1) {
          kit.sex = 'female';
          kit.geno = ['Ee','aa','nn','Rr'];
        }
        if (item.tinctureOfWealth.search('black') !== -1) {
          kit.geno = ['Ee','aa','nn','rr'];
        }
        if (item.tinctureOfWealth.search('chocolate') !== -1) {
          kit.geno = ['ee','Aa','nn','rr'];
        }
        if (item.tinctureOfWealth.search('cinnamon') !== -1) {
          kit.geno = ['ee','aa','Nn','rr'];
        }
        if (item.tinctureOfWealth.search('red') !== -1) {
          kit.geno = ['ee','aa','nn','Rr'];
        }
      }
    }
  }

  function loopOverride() {
    let loopOverrideList = [];

    if (genosBase.search(/\b(EE|Ee)\b/) !== -1) {
      loopOverrideList.push(['Ee','aa','nn','rr']);
    }
    if (genosBase.search(/\b(AA|Aa)\b/) !== -1) {
      loopOverrideList.push(['ee','Aa','nn','rr']);
    }
    if (genosBase.search(/\b(NN|Nn)\b/) !== -1) {
      loopOverrideList.push(['ee','aa','Nn','rr']);
    }
    if (genosBase.search(/\b(RR|Rr)\b/) !== -1) {
      loopOverrideList.push(['ee','aa','nn','Rr']);
    }

    kit.geno = (randomizer(loopOverrideList));
  }

  if (genosPresent >= 2) {
    while (kit.geno.join(' ').search(/\b(EE|Ee|AA|Aa|NN|Nn|RR|Rr)\b/) === -1) {
      kit.geno = [];
      rollBase();
      dominanceOverride();
      itemOverride();
    }

    // NOTE: while loop timing out, workaround
    if (kit.geno.join(' ').search(/\b(EE|Ee|AA|Aa|NN|Nn|RR|Rr)\b/) === -1) {
      loopOverride();
      itemOverride();
    }
  }

  function markingLogic(gene, domPassNum, recPassNum) {
    let dom = gene[1].toUpperCase();
    let rec = gene[1];

    let regex = '\\b(' + gene[0] + ')\\b';
    regex = new RegExp(regex, '');

    if (item.tinctureOfWealth.search(regex) !== -1 && !towToggle || item.tinctureOfWealth.search(regex) !== -1 && rng(100) <= 10) {
      kit.geno.push(rec);
    } else {
      let countDom = genosMarkings.count(dom);
      let countRec = genosMarkings.count(rec);
      // console.log(countDom, countRec);

      let tempGeno = 0;

      for (let i = 0; i < countDom; i++) {
        if (rng(100) <= domPassNum) {
          tempGeno++;
        }
      }
      for (let i = 0; i < countRec; i++) {
        if (rng(100) <= recPassNum) {
          tempGeno++;
        }
      }

      if (tempGeno === 1) {
        kit.geno.push(rec);
      }
      if (tempGeno > 1) {
        kit.geno.push(dom);
      }
    }
  }

  for (let i = 0; i < commonList.length; i++) {
    markingLogic(commonList[i], 50, 40);
  }
  for (let i = 0; i < uncommonList.length; i++) {
    markingLogic(uncommonList[i], 40, 30);
  }
  for (let i = 0; i < mishapList.length; i++) {
    markingLogic(mishapList[i], 30, 20);
  }
  for (let i = 0; i < mysticList.length; i++) {
    markingLogic(mysticList[i], 20, 10);
  }

  // tabby dominance
  if (genosMarkings.join(' ').search(/\b(ctb)\b/i) !== -1) {
    kit.geno = kit.geno.join(' ').replace(/\b(mtb|stb|ttb|rtb|btb|htb)\b/gi, '').split(' ');
  } else if (genosMarkings.join(' ').search(/\b(mtb)\b/i) !== -1) {
    kit.geno = kit.geno.join(' ').replace(/\b(stb|ttb|rtb|btb|htb)\b/gi, '').split(' ');
  } else if (genosMarkings.join(' ').search(/\b(stb)\b/i) !== -1) {
    kit.geno = kit.geno.join(' ').replace(/\b(ttb|rtb|btb|htb)\b/gi, '').split(' ');
  } else if (genosMarkings.join(' ').search(/\b(ttb)\b/i) !== -1) {
    kit.geno = kit.geno.join(' ').replace(/\b(rtb|btb|htb)\b/gi, '').split(' ');
  } else if (genosMarkings.join(' ').search(/\b(rtb)\b/i) !== -1) {
    kit.geno = kit.geno.join(' ').replace(/\b(btb|htb)\b/gi, '').split(' ');
  } else if (genosMarkings.join(' ').search(/\b(btb)\b/i) !== -1) {
    kit.geno = kit.geno.join(' ').replace(/\b(htb)\b/gi, '').split(' ');
  }
}

// #READ PHENO
function readPheno(input, output) {
  // exit if no geno
  if (input.length === 0) {
    return;
  }

  // setup
  // console.log(input);
  let geno = input.join(' ');

  // exit if invalid geno
  if (geno.search('ee aa nn rr') !== -1) {
    output[0] = 'pheno';
    return;
  }

  // base
  output.push('');
  if (geno.search(/\b(RR|Rr)\b/) !== -1) {
    output[0] = 'red';
  }
  if (geno.search(/\b(NN|Nn)\b/) !== -1) {
    output[0] = 'cinnamon';
  }
  if (geno.search(/\b(AA|Aa)\b/) !== -1) {
    output[0] = 'chocolate';
  }
  if (geno.search(/\b(EE|Ee)\b/) !== -1) {
    output[0] = 'black';
  }

  // tortoiseshell
  if (geno.search(/\b(RR|Rr)\b/) !== -1) {
    if (output[0].search(/\bcinnamon\b/) !== -1) {
      output[0] = 'cinnamon tortoiseshell';
    }
    if (output[0].search(/\bchocolate\b/) !== -1) {
      output[0] = 'chocolate tortoiseshell';
    }
    if (output[0].search(/\bblack\b/) !== -1 && geno.search(/\bCc\b/i) !== -1) {
      output[0] = 'orchid tortoiseshell';
    } else if (output[0].search(/\bblack\b/) !== -1 && geno.search(/\bDd\b/i) !== -1) {
      output[0] = 'blue tortoiseshell';
    } else if (output[0].search(/\bblack\b/) !== -1) {
      output[0] = 'tortoiseshell';
    }
  }

  // markings
  output.push('with');
  let lengthCheck = output.length;

  // silver, smokey & white
  if (geno.search(/\bww\b/) !== -1) {
    // output[1] = 'low white';
  }
  if (geno.search(/\bWw\b/) !== -1 && geno.search(/\b(CTb|MTb|STb|TTb|RTb|BTb|HTb)\b/i) !== -1) {
    output[0] = 'bicolor ' + output[0];
  } else if (geno.search(/\bWw\b/) !== -1) {
    output[0] = 'bicolor ' + output[0];
  }
  if (geno.search(/\bWW\b/) !== -1) {
    output[0] = 'piebald ' + output[0];
  }

  if (geno.search(/\bSm\b/i) !== -1) {
    output[0] = 'smokey ' + output[0];
  }
  if (geno.search(/\bSs\b/i) !== -1) {
    output[0] = 'silver ' + output[0];
  }

  // dilute & caramel
  if (geno.search(/\bCc\b/i) !== -1) {
    if (output[0].search(/\bred\b/) !== 1) {
      output[0] = output[0].replace(/\bred\b/, 'apricot');
    }
    if (output[0].search(/\bcinnamon\b/) !== 1) {
      output[0] = output[0].replace(/\bcinnamon\b/, 'isabella');
    }
    if (output[0].search(/\bchocolate\b/) !== 1) {
      output[0] = output[0].replace(/\bchocolate\b/, 'lavender');
    }
    if (output[0].search(/\bblack\b/) !== 1) {
      output[0] = output[0].replace(/\bblack\b/, 'orchid');
    }
  } else if (geno.search(/\bDd\b/i) !== -1) {
    if (output[0].search(/\bred\b/) !== 1) {
      output[0] = output[0].replace(/\bred\b/, 'cream');
    }
    if (output[0].search(/\bcinnamon\b/) !== 1) {
      output[0] = output[0].replace(/\bcinnamon\b/, 'fawn');
    }
    if (output[0].search(/\bchocolate\b/) !== 1) {
      output[0] = output[0].replace(/\bchocolate\b/, 'lilac');
    }
    if (output[0].search(/\bblack\b/) !== 1) {
      output[0] = output[0].replace(/\bblack\b/, 'blue');
    }
  }

  // tabby
  function tabbyLogic(gene) {
    if (gene[0] === 'classic tabby' || gene[0] === 'mackerel tabby' || gene[0] === 'spotted tabby' || gene[0] === 'ticked tabby' || gene[0] === 'rosette tabby' || gene[0] === 'braided tabby' || gene[0] === 'hypnotic tabby') {
      let dom = gene[1].toUpperCase();
      let rec = gene[1];

      let regex = '\\b(' + dom + '|' + rec + ')\\b';
      regex = new RegExp(regex, '');

      if (geno.search(regex) !== -1) {
        output[0] = output[0] + ' ' + gene[0];
      }
    }
  }

  for (let i = 0; i < commonList.length; i++) {
    tabbyLogic(commonList[i]);
  }
  for (let i = 0; i < uncommonList.length; i++) {
    tabbyLogic(uncommonList[i]);
  }
  for (let i = 0; i < mishapList.length; i++) {
    tabbyLogic(mishapList[i]);
  }
  for (let i = 0; i < mysticList.length; i++) {
    tabbyLogic(mysticList[i]);
  }

  function markingLogic(gene) {
    if (gene[0] !== 'dilute' && gene[0] !== 'smokey' && gene[0] !== 'caramel' && gene[0] !== 'silver' && gene[0] !== 'classic tabby' && gene[0] !== 'mackerel tabby' && gene[0] !== 'spotted tabby' && gene[0] !== 'ticked tabby' && gene[0] !== 'rosetted tabby' && gene[0] !== 'braided tabby' && gene[0] !== 'hypnotic tabby') {
      let dom = gene[1].toUpperCase();
      let rec = gene[1];

      let regex = '\\b(' + dom + '|' + rec + ')\\b';
      regex = new RegExp(regex, '');

      if (geno.search(regex) !== -1) {
        output.push(gene[0]);
      }
    }
  }

  for (let i = 0; i < commonList.length; i++) {
    markingLogic(commonList[i]);
  }
  for (let i = 0; i < uncommonList.length; i++) {
    markingLogic(uncommonList[i]);
  }
  for (let i = 0; i < mishapList.length; i++) {
    markingLogic(mishapList[i]);
  }
  for (let i = 0; i < mysticList.length; i++) {
    markingLogic(mysticList[i]);
  }

  if (geno.search(/\bPp\b/i) !== -1 && geno.search(/\b(CTb|MTb|STb|TTb|RTb|BTb|HTb)\b/i) !== -1) {
    let pos = output.indexOf('points');
    output[pos] = 'lynx points';
  }

  if (lengthCheck === output.length) {
    output.pop();
  }
}

function rollMutation() {
  function rollHereditaryMutation() {
    // console.log('hereditary mutation');

    let mutations = [];

    function addSummonerMutation(mutation) {
      if (mutation !== false) {
        for (let i = 0; i < mutation.length; i++) {
          mutations.push(mutation[i]);
        }
      }
    }

    addSummonerMutation(summoner.s1.mutations);
    addSummonerMutation(summoner.s2.mutations);
    addSummonerMutation(summoner.s3.mutations);
    addSummonerMutation(summoner.s4.mutations);
    // console.log(mutations);

    function countLikeMutation(regex) {
      let output = 0;

      for (let i = 0; i < mutations.length; i++) {
        if (mutations[i].search(regex) !== -1) {
          output++;
        }
      }

      return output;
    }

    // FIXME: this was a really silly way to to do this... could probably use my rngList() function to simplify it now
    function mutationPassLogic(mutation, pass) {
      let modifier = 0;

      if (mutation === 'manx tail' || mutation === 'bob tail' || mutation === 'ring tail') {
        modifier = 10;
      } else if (mutation === 'melanism' || mutation === 'mosaic') {
        modifier = -10;
      } else if (mutation === 'horns') {
        modifier = -20;
      }

      if (item.mutationCharm) {
        modifier += 10;
      }

      pass = pass + modifier;
      if (rng(100) <= pass) {
        return mutation;
      } else {
        return '';
      }
    }

    let output = [];

    for (let i = 0; i < mutationList.length; i++) {
      let formatSpace = mutationList[i];
      let formatDash = mutationList[i].replace(/\s/g, '-');
      let formatJoined = mutationList[i].replace(/\s/g, '');
      let mutationRegex = '\\b(' + formatSpace + '|' + formatDash + '|' + formatJoined + ')\\b';
      mutationRegex = new RegExp(mutationRegex, '');
      // console.log(mutationRegex);

      if (countLikeMutation(mutationRegex) === 1) {
        output.push(mutationPassLogic(mutationList[i], 30));
      }
      if (countLikeMutation(mutationRegex) === 2) {
        output.push(mutationPassLogic(mutationList[i], 35));
      }
      if (countLikeMutation(mutationRegex) === 3) {
        output.push(mutationPassLogic(mutationList[i], 40));
      }
      if (countLikeMutation(mutationRegex) === 4) {
        output.push(mutationPassLogic(mutationList[i], 50));
      }
    }

    return output;
  }

  function rollRandomMutation() {
    // console.log('random mutation');

    let mutationList = [[50,'manx tail'],[100,'bob tail'],[150,'ring tail'],[200,'curl ears'],[300,'fold ears'],[400,'polydactyl toes'],[500,'albinism'],[550,'melanism'],[575,'chimerism'],[600,'vitiligo'],[625,'mosaic'],[650,'horns']];

    let output = rngList(mutationList, 650).split();

    return output;
  }

  let rollMutationOutput = [];

  rollMutationOutput = rollHereditaryMutation().filter(Boolean);
  // console.log(rollMutationOutput);
  if (rollMutationOutput.length === 0) {
    let bonusRandomMutation = item.mutationCharm ? 80:0;
    if (rng(1000) <= 20 + bonusRandomMutation) {
      rollMutationOutput = rollRandomMutation().filter(Boolean);
    }
  }

  if (item.tinctureOfWealth.search(/manx tail|bob tail|ring tail|curl ears|fold ears|polydactyl toes|albinism|melanism|chimerism|vitiligo|mosaic|horns/) !== -1) {
    if (!towToggle || rng(100) <= 10) {
      rollMutationOutput.push(item.tinctureOfWealth);
    }
  }

  kit.mutation = rollMutationOutput.length === 0 ? kit.mutation:rollMutationOutput.filter(onlyUnique);

  if (kit.mutation.indexOf('mosaic') !== -1) {
    let pos = kit.mutation.indexOf('mosaic');
    kit.mutation[pos] = 'mosaic (' + rngList([[35,'Black'],[70,'Red'],[90,'Chocolate'],[100,'Cinnamon']], 100) + ')';
  }
}

function handleChimera() {
  if (kit.mutation.indexOf('chimerism') !== -1) {
    // sex
    let chimeraSex = randomizer(['female','male']);
    // kit.sex += ' || ' + randomizer(['female','male']);

    // build
    let chimeraBuild = rngList([[1,'sphynx'],[50,'sh oriental'],[100,'sh european'],[150,'sh egyptian'],[200,'sh american'],[230,'sh persian'],[280,'lh persian'],[330,'lh oriental'],[360,'lh european'],[390,'lh egyptian'],[420,'lh american'],[440,'devon rex'],[460,'cornish rex'],[480,'selkirk rex']], 480);
    // kit.build += ' || ' + rngList([[1,'sphynx'],[50,'sh oriental'],[100,'sh european'],[150,'sh egyptian'],[200,'sh american'],[230,'sh persian'],[280,'lh persian'],[330,'lh oriental'],[360,'lh european'],[390,'lh egyptian'],[420,'lh american'],[440,'devon rex'],[460,'cornish rex'],[480,'selkirk rex']], 480);

    //element
    // kit.element += ' || ' + randomizer(['air','earth','water','fire']);

    // geno & pheno
    sanitizePheno();
    let mainGeno = kit.geno;
    let mainPheno = kit.pheno;

    kit.geno = [];
    kit.pheno = [];

    if (chimeraSex === 'female') {
      kit.geno.push(rngList([[30,'Ee/aa/nn/Rr'],[40,'Ee/aa/nn/rr'],[80,'ee/aa/nn/Rr'],[90,'ee/Aa/nn/rr'],[100,'ee/aa/Nn/rr']], 100));
    }
    if (chimeraSex === 'male') {
      kit.geno.push(rngList([[1,'Ee/aa/nn/Rr'],[40,'Ee/aa/nn/rr'],[80,'ee/aa/nn/Rr'],[90,'ee/Aa/nn/rr'],[100,'ee/aa/Nn/rr']], 100));
    }
    kit.geno = kit.geno[0].split('/');

    kit.geno.push('ww');

    let x = rng(3);
    for (let i = 0; i < x; i++) {
      kit.geno.push(rngList([[100,'Dd'],[200,'Sh'],[300,'Sm'],[400,'Fl'],[500,'MTb'],[600,'CTb'],[700,'Pp'],[800,'STb'],[850,'Ww'],[900,'TTb'],[930,'WW'],[940,'CC'],[950,'Ss']], 950));
    }

    // tabby dominance
    if (kit.geno.join(' ').search(/\b(ctb)\b/i) !== -1) {
      kit.geno = kit.geno.join(' ').replace(/\b(mtb|stb|ttb|rtb|btb|htb)\b/gi, '').split(' ');
    } else if (kit.geno.join(' ').search(/\b(mtb)\b/i) !== -1) {
      kit.geno = kit.geno.join(' ').replace(/\b(stb|ttb|rtb|btb|htb)\b/gi, '').split(' ');
    } else if (kit.geno.join(' ').search(/\b(stb)\b/i) !== -1) {
      kit.geno = kit.geno.join(' ').replace(/\b(ttb|rtb|btb|htb)\b/gi, '').split(' ');
    } else if (kit.geno.join(' ').search(/\b(ttb)\b/i) !== -1) {
      kit.geno = kit.geno.join(' ').replace(/\b(rtb|btb|htb)\b/gi, '').split(' ');
    } else if (kit.geno.join(' ').search(/\b(rtb)\b/i) !== -1) {
      kit.geno = kit.geno.join(' ').replace(/\b(btb|htb)\b/gi, '').split(' ');
    } else if (kit.geno.join(' ').search(/\b(btb)\b/i) !== -1) {
      kit.geno = kit.geno.join(' ').replace(/\b(htb)\b/gi, '').split(' ');
    }

    // FIXME: Silly way to do this, brain-cells no worky today, good enough
    // fix white
    let tempWhite = 'ww';
    if (kit.geno.indexOf('WW') !== -1) {
      tempWhite = 'WW';
    }
    if (kit.geno.indexOf('Ww') !== -1) {
      tempWhite = 'Ww';
    }

    kit.geno = kit.geno.join(' ').replace(/\b(WW|Ww)\b/g, '').replace(/\s\s/g, ' ').split(' ');
    kit.geno = kit.geno.filter(onlyUnique);
    kit.geno[4] = tempWhite;

    readPheno(kit.geno, kit.pheno);
    sanitizePheno();

    kit.geno = mainGeno.concat(['||'].concat(kit.geno));
    kit.pheno = mainPheno + ' || ' + kit.pheno;

    // mutations
    /*
    if (rng(1000) <= 5) {
      kit.mutation.push('|| ' + randomizer(mutationList));
    }
    */
  } else {
    sanitizePheno();
  }
}

function sanitizePheno() {
  // sanitize pheno
  if (kit.pheno.length === 0) {
    kit.pheno = 'pheno';
  } else {
    if (kit.pheno.indexOf('with') !== -1) {
      let pos = kit.pheno.indexOf('with');
      let phenoCoat = kit.pheno.slice(0,(pos + 1));
      let phenoMarkings = kit.pheno.slice((pos + 1));
      kit.pheno = phenoCoat.join(' ') + ' ' + phenoMarkings.join(', ').replace(/(,\s)(?!.*\1)/, ' and ');
    } else {
      kit.pheno = kit.pheno.join(' ');
    }
    // console.log(kit.pheno);

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    kit.pheno = kit.pheno.replace(/\bWith\b/, 'with').replace(/\bAnd\b/, 'and').replace(/\s\s/g, ' ').trim();
    kit.pheno = capitalizeFirstLetter(kit.pheno);
  }
}

// sanitize outputs
function sanitize() {
  // sanitize sex
  if (kit.sex === '') {
    kit.sex = 'sex';
  } else {
    kit.sex = kit.sex.capitalizeStr();
  }

  // sanitize level
  if (kit.level === '') {
    kit.level = 'level';
  } else {
    kit.level = kit.level.capitalizeStr();
  }

  // sanitize build
  if (kit.build === '') {
    kit.build = 'build';
  } else {
    if (kit.build.search(/desert|jungle|plains|tundra/) !== -1) {
      kit.build = kit.build + ' hybrid';
    }
    kit.build = kit.build.replace(/\bsh\b/gi, 'Shorthair').replace(/\blh\b/gi, 'Longhair').capitalizeStr();
  }

  // sanitize element
  if (kit.element === '') {
    kit.element = 'element';
  } else {
    kit.element = kit.element.capitalizeStr();
  }

  // sanitize geno
  if (kit.geno.length === 0) {
    kit.geno = 'geno';
  } else {
    kit.geno = kit.geno.filter(Boolean).join('/').replace(/\/\|\|\//, ' || ');
  }

  // sanitize mutation
  if (kit.mutation.length !== 0) {
    kit.mutation = kit.mutation.join(', ').capitalizeStr();
  }
}

// roll litterSize
function rollLitterSize() {
  let litterSize = 0;

  // TODO: make it so that summoner counts still work regardless of numbering (e.g. show 3 summoners instead of 2 if summoners 1, 2 and 4 are present)
  if (summoner.s1.geno !== false && summoner.s2.geno !== false && summoner.s3.geno !== false && summoner.s4.geno !== false) {
    litterSize = rngRange(4,6);
  } else if (summoner.s1.geno !== false && summoner.s2.geno !== false && summoner.s3.geno !== false) {
    litterSize = rngRange(3,6);
  } else if (summoner.s1.geno !== false && summoner.s2.geno !== false) {
    litterSize = rngRange(2,4);
  } else if (summoner.s1.geno !== false) {
    litterSize = rngRange(1,2);
  }

  if (item.nurturingRune === true) {
    litterSize += 1;
  }

  if (item.augmentationCharm === true && rng(100) <= 25) {
    let x = rng(100);
    if (x <= 80) {
      litterSize += 2;
    } else if (x <= 100) {
      litterSize += 1;
    }
  }

  // console.log('Litter Size: ' + litterSize);
  return litterSize;
}

// 'Roll' button press
function buttonPress() {
  clear();
  summonerSetup();
  itemSetup();
  window.towToggle = false;

  let litterSize = rollLitterSize();
  for (let i = 0; i < litterSize; i++) {
    // NOTE: would be more performant to seperate summoner-setup and kit rolls so that setup isn't redone every roll

    kitSetup();
    rollSex();
    rollLevel();
    rollBuild();
    rollElement();
    rollGeno();
    readPheno(kit.geno, kit.pheno);
    rollMutation();
    handleChimera();
    sanitize();

    towToggle = true;

    let kitNum = i + 1;
    let id = 'kit' + kitNum;
    let element = document.getElementById(id);


    // formatting example
    // 1. Male, Novice
    // American Shorthair - Fire
    // Ee/aa/nn/rr/ww/Sm/Fl
    // Smokey black with flecking

    element.innerText = kitNum + '. ' + kit.sex + ', ' + kit.level + '\n' + kit.build + ' - ' + kit.element + '\n' + kit.geno + '\n' + kit.pheno;
    if (kit.mutation.length !== 0) {
      element.innerHTML += '\n<b>Mutation: </b>' + kit.mutation;
    }
    element.innerHTML += '<br><br>';
  }

  let idWarning = document.getElementById('warning');

  if (litterSize === 0) {
    idWarning.innerText = 'No summoners present?';
  }

  function checkIllegal(geno) {
    if (geno === false) {
      return false;
    }

    if (geno.search(/\bE(E|e)\b/) !== -1 && geno.search(/\bA(A|a)\b/) !== -1 || geno.search(/\bA(A|a)\b/) !== -1 && geno.search(/\bN(N|n)\b/) !== -1 || geno.search(/\bA(A|a)\b/) !== -1 && geno.search(/\bR(R|r)\b/) !== -1 || geno.search(/\bN(N|n)/) !== -1 && geno.search(/\bR(R|r)\b/) !== -1) {
      return true;
    } else {
      return false;
    }
  }

  if (checkIllegal(summoner.s1.geno) || checkIllegal(summoner.s2.geno) || checkIllegal(summoner.s3.geno) || checkIllegal(summoner.s4.geno))  {
    idWarning.innerText = 'Illegal summoner geno present!\n\n';
  }

  function countPresent() {
    let count = 0;

    let list = [summoner.s1.geno, summoner.s2.geno, summoner.s3.geno, summoner.s4.geno];
    for (let i = 0; i < list.length; i++) {
      if (list[i] !== false) {
        count++;
      }
    }

    count += item.tinctureOfWealth.replace(/false|none/gi, '').split(',').filter(Boolean).length;

    for (let i = 0; i < item.avatars.length; i++) {
      if (item.avatars[i] !== false) {
        count++;
      }
    }

    for (let i = 0; i < item.essences.length; i++) {
      if (item.essences[i] !== false) {
        count++;
      }
    }

    console.log(count);
    return count;
  }

  if (countPresent() > 4) {
    idWarning.innerText = 'Too many summoner/tincture of wealth/avatar/essence inputs present!\n\n';
  }
}
