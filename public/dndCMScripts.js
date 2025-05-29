
document.addEventListener('DOMContentLoaded', () => {
    loadFromMongo();
});

async function saveToMongo() {

    const profCheckBoxes = {
        acrobaticsProf: document.getElementById("acrobaticsProf"),
        animalHandlingProf: document.getElementById("animalHandlingProf"),
        arcanaProf: document.getElementById("arcanaProf"),
        athleticsProf: document.getElementById("athleticsProf"),
        deceptionProf: document.getElementById("deceptionProf"),
        historyProf: document.getElementById("historyProf"),
        insightProf: document.getElementById("insightProf"),
        intimidationProf: document.getElementById("intimidationProf"),
        investigationProf: document.getElementById("investigationProf"),
        medicineProf: document.getElementById("medicineProf"),
        natureProf: document.getElementById("natureProf"),
        perceptionProf: document.getElementById("perceptionProf"),
        performanceProf: document.getElementById("performanceProf"),
        persuasionProf: document.getElementById("persuasionProf"),
        religionProf: document.getElementById("religionProf"),
        sleightOfHandProf: document.getElementById("sleightOfHandProf"),
        stealthProf: document.getElementById("stealthProf"),
        survivalProf: document.getElementById("survivalProf"),
    }

    Object.keys(profCheckBoxes).forEach(key => {
        const checkbox = tagCheckBoxes[key];
        tagCheckBoxes[key] = checkbox.checked ? "True" : "False"; // replace element with value depending on if
    }); //                                                           checkbox was checked our not

    //console.log(tagCheckBoxes) // check that values are updated

    stats = {
        characterName: document.getElementById('characterName').value,
        XPEarned: document.getElementById('xp').value || 0,
        XPNextLevel: document.getElementById('xpToNext').value || 0,
        Origin: document.getElementById('race').value || 0,
        Level: document.getElementById('level').value || 0,

        Strength: document.getElementById('strength').value || 0,
        Constitution: document.getElementById('constitution').value || 0,
        Charisma: document.getElementById('charisma').value || 0,
        Intelligence: document.getElementById('intelligence').value || 0,
        Dexterity: document.getElementById('dexterity').value || 0,
        Wisdom: document.getElementById('wisdom').value || 0,

        Acrobatics: document.getElementById('acrobatics').value || 0,
        AnimalHandling: document.getElementById('animalHandling').value || 0,
        Arcana: document.getElementById('arcana').value || 0,
        Athletics: document.getElementById('athletics').value || 0,
        Deception: document.getElementById('deception').value || 0,
        History: document.getElementById('history').value || 0,
        Insight: document.getElementById('insight').value || 0,
        Intimidation: document.getElementById('intimidation').value || 0,
        Investigation: document.getElementById('investigation').value || 0,
        Medicine: document.getElementById('medicine').value || 0,
        Nature: document.getElementById('nature').value || 0,
        Perception: document.getElementById('perception').value || 0,
        Performance: document.getElementById('performance').value || 0,
        Persuasion: document.getElementById('persuasion').value || 0,
        Religion: document.getElementById('religion').value || 0,
        SleightOfHand: document.getElementById('sleightOfHand').value || 0,
        Stealth: document.getElementById('stealth').value || 0,
        Survival: document.getElementById('survival').value || 0,

        profAcrobatics: profCheckBoxes.acrobaticsProf,
        profAnimalHandling: profCheckBoxes.animalHandlingProf,
        profArcana: profCheckBoxes.arcanaProf,
        profAthletics: profCheckBoxes.athleticsProf,
        profDeception: profCheckBoxes.deceptionProf,
        profHistory: profCheckBoxes.historyProf,
        profInsight: profCheckBoxes.insightProf,
        profIntimidation: profCheckBoxes.intimidationProf,
        profInvestigation: profCheckBoxes.investigationProf,
        profMedicine: profCheckBoxes.medicineProf,
        profNature: profCheckBoxes.natureProf,
        profPerception: profCheckBoxes.perceptionProf,
        profPerformance: profCheckBoxes.performanceProf,
        profPersuasion: profCheckBoxes.persuasionProf,
        profReligion: profCheckBoxes.religionProf,
        profSleightOfHand: profCheckBoxes.sleightOfHandProf,
        profStealth: profCheckBoxes.stealthProf,
        profSurvival: profCheckBoxes.survivalProf,

        armorProficiencies: document.querySelector('textarea[name="armorProficiencies"]').value || "",
        weaponProficiencies: document.querySelector('textarea[name="weaponProficiencies"]').value || "",
        toolProficiencies: document.querySelector('textarea[name="toolProficiencies"]').value || "",
        languages: document.querySelector('textarea[name="languages"]').value || "",
          
        currentHP: parseInt(document.querySelector('input[name="currentHP"]').value) || 0,
        maxHP: parseInt(document.querySelector('input[name="maxHP"]').value) || 0,
        ac: parseInt(document.querySelector('input[name="ac"]').value) || 0,
        initiative: parseInt(document.querySelector('input[name="initiative"]').value) || 0,
        speed: document.querySelector('input[name="speed"]').value || "",
        size: document.querySelector('select[name="size"]').value || "",
        passivePerception: parseInt(document.querySelector('input[name="passivePerception"]').value) || 0, //remove since this will be generated after the relevant skills are loaded (wisdom stat)

        resistances: document.querySelector('input[name="resistances"]').value || "",
        immunities: document.querySelector('input[name="immunities"]').value || "",
        vulnerabilities: document.querySelector('input[name="vulnerabilities"]').value || "",
        conditions: document.querySelector('textarea[name="conditions"]').value || "",


        //fields for inventory
        currentCarryWeight: document.getElementById('current-carry-weight').value || 0,
        maxCarryWeight: document.getElementById('max-carry-weight').value || 0
    };

    //collect from ammo table
    collectWeapons(stats);
    collectAmmo(stats);
    collectGear(stats);
    collectPerks(stats);

    console.log(stats);

    //STATS.PUSH IS NOT A FUNCTION!

    // Log the array to verify the results
    //console.log(ammoData);

    try {
        const response = await fetch('/saveStats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-csrf-token': document.querySelector('input[name="_csrf"]').value
            },
            body: JSON.stringify({ stats }),
            credentials: 'same-origin'
        });
    
        if (response.ok) {
            const result = await response.json(); // optional
            console.log("Stats saved:", result);
            alert('Stats saved successfully.');
        } else {
            const error = await response.json();
            console.error("Server error response:", error);
            alert('Error saving stats; server rejected the request.');
        }
    } catch (error) {
        console.error("Fetch failed:", error);
        alert('Error saving stats; could not reach "/saveStats"');
    }
}

//Add Item Modal Logic
function openAddItemModal() {
    document.getElementById('addItemModal').style.display = 'block';
}

function closeAddItemModal() {
    document.getElementById('addItemModal').style.display = 'none';
    document.getElementById('searchResults').innerHTML = '';
}

window.onclick = function (event) {
    const modal = document.getElementById('addItemModal');
    if (event.target == modal) {
        closeAddItemModal();
    }
};

document.getElementById('addItemForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const query = this.searchQuery.value;

    fetch(`/search?name=${encodeURIComponent(query)}`)
    .then(async res => {
        const contentType = res.headers.get('content-type');
        
        if (!res.ok) {
            // Handle 404, 500, etc.
            const errorText = await res.text();
            throw new Error(`Server responded with ${res.status}: ${errorText}`);
        }

        if (contentType && contentType.includes('application/json')) {
            return res.json();
        } else {
            const text = await res.text();
            throw new Error(`Expected JSON but got HTML: ${text.slice(0, 200)}...`);
        }
    })
    .then(data => {
        const results = document.getElementById('searchResults');
        if (data.length === 0) {
          results.innerHTML = `<p>No items found.</p>`;
        } else {
          results.innerHTML = data.map(item => `
            <button class="item-button" data-id="${item.id}" data-name="${item.name}" data-rarity="${item.rarity}">
              ${item.name} (${item.rarity})
            </button>
          `).join('');
      
          // Add click handlers after rendering
          document.querySelectorAll('.item-button').forEach(button => {
            button.addEventListener('click', () => {
              const itemId = button.getAttribute('data-id');
              const itemName = button.getAttribute('data-name');
              const itemRarity = button.getAttribute('data-rarity');
              addItemToInventory({ id: itemId, name: itemName, rarity: itemRarity });
            });
          });
        }
    })      
    .catch(err => {
        console.error(err);
        document.getElementById('searchResults').innerHTML = `<p>Error fetching results: ${err.message}</p>`;
    });

});

const playerInventory = {}; // Key: item ID, Value: { id, name, rarity, count }

function addItemToInventory(item) {
  const existing = playerInventory[item.id];

  if (existing) {
    // Increment count
    existing.count += 1;

    // Update count in DOM
    const countSpan = document.querySelector(`#item-count-${item.id}`);
    if (countSpan) {
      countSpan.textContent = `×${existing.count}`;
    }
  } else {
    // First time adding this item
    playerInventory[item.id] = { ...item, count: 1 };

    const container = document.getElementById('inventoryList');
    const li = document.createElement('li');
    li.className = 'feature-item';
    li.id = `inventory-item-${item.id}`;
    li.innerHTML = `
      <div class="feature-card" style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <strong>${item.name}</strong> <em>(${item.rarity})</em>
        </div>
        <span id="item-count-${item.id}" style="font-weight: bold;">×1</span>
      </div>
    `;
    container.appendChild(li);
  }
}

  
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    event.target.classList.add('active');
}

//Add Feature Modal Logic
function openFeatureModal() {
    document.getElementById('featureModal').style.display = 'block';
  }

  function closeFeatureModal() {
    document.getElementById('featureModal').style.display = 'none';
  }

  function submitFeature(event) {
    event.preventDefault();
    const form = document.getElementById('featureForm');
    const type = form.featureType.value;
    const name = form.featureName.value;
    const desc = form.featureDescription.value;
  
    const targetListId = {
      Class: 'classFeaturesList',
      Species: 'speciesTraitsList',
      Feat: 'featsList'
    }[type];
  
    const list = document.getElementById(targetListId);
    if (list) {
        const li = document.createElement('li');
        li.className = 'feature-item';
        li.innerHTML = `
        <div class="feature-card">
          <button class="delete-feature" onclick="this.closest('li').remove()">✖</button>
          <strong>${name}</strong><br>
          <span>${desc}</span>
        </div>
        `;
        list.appendChild(li);
    } else {
      alert(`No list found for feature type: ${type}`);
    }
  
    closeFeatureModal();
    form.reset();
}

//Add Background Modal Logic
function openBackgroundFeatureModal() {
    document.getElementById("backgroundFeatureModal").style.display = "block";
  }

  function closeBackgroundFeatureModal() {
    document.getElementById("backgroundFeatureModal").style.display = "none";
  }

  function submitBackgroundFeature(event) {
    event.preventDefault();
    const name = event.target.backgroundFeatureName.value;
    const desc = event.target.backgroundFeatureDesc.value;
    const ul = document.getElementById("backgroundFeatureList");

    const li = document.createElement("li");
    li.className = "feature-item";
    li.innerHTML = `
    <div class="feature-card">
      <button class="delete-feature" onclick="this.closest('li').remove()">✖</button>
      <strong>${name}</strong><br>
      <span>${desc}</span>
    </div>
    `;
    ul.appendChild(li);
    closeBackgroundFeatureModal();
    event.target.reset();
}

function openPersonalityModal() {
    document.getElementById("personalityModal").style.display = "block";
}

function closePersonalityModal() {
    document.getElementById("personalityModal").style.display = "none";
}

function submitPersonalityTrait(event) {
    event.preventDefault();
    const name = event.target.personalityTraitName.value;
    const text = event.target.personalityTrait.value;
    const ul = document.getElementById("personalityTraitList");

    const li = document.createElement("li");
    li.className = "feature-item";
    li.innerHTML = `
    <div class="feature-card">
      <button class="delete-feature" onclick="this.closest('li').remove()">✖</button>
      <strong>${name}</strong><br>
      <span>${text}</span>
    </div>
    `;
    ul.appendChild(li);
    closePersonalityModal();
    event.target.reset();
}

function openAppearanceModal() {
    document.getElementById("appearanceModal").style.display = "block";
}

function closeAppearanceModal() {
    document.getElementById("appearanceModal").style.display = "none";
}

function submitAppearanceDetail(event) {
    event.preventDefault();
    const name = event.target.appearanceDetailName.value;
    const text = event.target.appearanceDetail.value;
    const ul = document.getElementById("appearanceDetailList");

    const li = document.createElement("li");
    li.className = "feature-item";
    li.innerHTML = `
    <div class="feature-card">
      <button class="delete-feature" onclick="this.closest('li').remove()">✖</button>
      <strong>${name}</strong><br>
      <span>${text}</span>
    </div>
    `;
    ul.appendChild(li);
    closeAppearanceModal();
    event.target.reset();
}

//Notes Modal Logic
function openNotesModal() {
    document.getElementById("notesModal").style.display = "block";
  }

  function closeNotesModal() {
    document.getElementById("notesModal").style.display = "none";
  }

  function submitNote(event) {
    event.preventDefault();
    const form = event.target;
    const type = form.noteType.value;
    const content = form.noteContent.value;

    const listId = `notes${type}`;
    const ul = document.getElementById(listId);

    const li = document.createElement("li");
    li.className = "feature-item";
    li.innerHTML = `
      <div class="feature-card">
        <button class="delete-feature" onclick="this.closest('li').remove()">✖</button>
        ${content}
      </div>
    `;
    ul.appendChild(li);

    closeNotesModal();
    form.reset();
}

//Add Spell Modal Logic

const SPELL_LEVEL_ORDER = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function openSpellModal() {
  document.getElementById("spellModal").style.display = "block";
}

function closeSpellModal() {
  document.getElementById("spellModal").style.display = "none";
}

let editingSpellElement = null;

function submitSpell(event) {
  event.preventDefault();
  const form = event.target;

  const name = form.spellName.value.trim();
  const level = parseInt(form.spellLevel.value);
  const desc = form.spellDescription.value.trim();
  const castingType = form.castingType.value;
  const school = form.school.value;
  const components = Array.from(form.querySelectorAll('input[name="components"]:checked')).map(cb => cb.value);
  const isPrepared = form.isPrepared.checked;
  const activationCost = form.activationCost.value;
  const actionType = form.actionType.value;
  const scalingDice = form.scalingDice.value;
  const scalingDiceCount = form.scalingDiceCount.value;
  const attackAttribute = form.attackAttribute?.value || "";
  const numberOfAttacks = form.numberOfAttacks?.value || "";
  const sourceOfSpell = form.sourceOfSpell?.value || "";
  const useLimit = form.useLimit?.value || "";
  const useCount = form.useCount?.value || "";
  

  const spellData = {
    name,
    level,
    desc,
    castingType,
    school,
    components,
    isPrepared,
    activationCost,
    actionType,
    scalingDice,
    scalingDiceCount,
    attackAttribute,
    numberOfAttacks,
    useLimit,
    useCount
  };

  // Remove existing spell card if editing
  if (editingSpellElement) {
    editingSpellElement.remove();
    editingSpellElement = null;
  }

  // Create spell card
  const li = document.createElement("li");
  li.className = "feature-item";
  li.dataset.spell = JSON.stringify(spellData);
  li.innerHTML = `
    <div class="feature-card">
      <button class="edit-feature" onclick="editSpell(this)">✏️</button>
      <strong>${name}</strong><br>
      <span>${desc}</span>
    </div>
  `;

  const sectionId = `spellsLevel${level}`;
  let section = document.getElementById(sectionId);

  // Create section if needed (excluding level 0 which is always present)
  if (!section && level > 0) {
    const container = document.getElementById('spellSections');
    const newSection = document.createElement('div');
    newSection.className = 'section';
    newSection.dataset.level = level;
    newSection.innerHTML = `
      <h3>Level ${level} Spells</h3>
      <ul id="${sectionId}" class="feature-list"></ul>
    `;

    // Insert in correct level order
    const existingSections = Array.from(container.children);
    const insertBefore = existingSections.find(sec => parseInt(sec.dataset.level) > level);
    if (insertBefore) {
      container.insertBefore(newSection, insertBefore);
    } else {
      container.appendChild(newSection);
    }

    section = document.getElementById(sectionId);
  }

  // Add spell to section
  section.appendChild(li);

  // Reset and close
  form.reset();
  closeSpellModal();
}

function editSpell(button) {
    const li = button.closest('li');
    const data = JSON.parse(li.dataset.spell || "{}");
    editingSpellElement = li;
  
    const form = document.querySelector("#spellModal form");
    form.spellName.value = data.name;
    form.spellLevel.value = data.level;
    form.spellDescription.value = data.desc;
    form.castingType.value = data.castingType;
    form.school.value = data.school;
    form.activationCost.value = data.activationCost;
    form.actionType.value = data.actionType;
    form.scalingDice.value = data.scalingDice;
    form.scalingDiceCount.value = data.scalingDiceCount || "";
    form.attackAttribute.value = data.attackAttribute || "";
    form.numberOfAttacks.value = data.numberOfAttacks || "";
    form.sourceOfSpell.value = data.sourceOfSpell || "";
    form.useLimit.value = data.useLimit || "infinite";
    form.useCount.value = data.useCount || "1";

    // manually trigger the visibility toggles
    toggleCastingTypeFields(); // trigger manually
    toggleUseCountField();     // ensures useCount visibility is also correct
    document.querySelector('select[name="useLimit"]').dispatchEvent(new Event('change'));
  
    // Clear and re-check components
    form.querySelectorAll('input[name="components"]').forEach(cb => {
      cb.checked = data.components?.includes(cb.value);
    });
  
    form.isPrepared.checked = data.isPrepared;

    document.getElementById("deleteSpellButton").style.display = "inline-block"; // Show delete button
  
    openSpellModal();
}

function closeSpellModal() {
    document.getElementById("spellModal").style.display = "none";
    editingSpellElement = null;
    document.getElementById("deleteSpellButton").style.display = "none";
    document.querySelector("#spellModal form").reset();
}

function deleteSpell() {
    if (editingSpellElement) {
      // Remove the spell card from the DOM
      editingSpellElement.remove();
      editingSpellElement = null;
  
      // Hide the delete button
      document.getElementById("deleteSpellButton").style.display = "none";
  
      // Close the modal and reset the form
      closeSpellModal();
    }
}

// hide/shown attack details
document.addEventListener('DOMContentLoaded', () => {
    const actionTypeField = document.querySelector('select[name="actionType"]');
    const attackDetails = document.getElementById('attackDetails');
  
    function toggleAttackFields() {
      const value = actionTypeField.value;
      if (value === "Melee Spell Attack" || value === "Ranged Spell Attack") {
        attackDetails.style.display = 'block';
      } else {
        attackDetails.style.display = 'none';
      }
    }
  
    // Run on change and initial load
    actionTypeField.addEventListener('change', toggleAttackFields);
    toggleAttackFields();
});
  
// toggle visibility of at will spell type
document.addEventListener('DOMContentLoaded', () => {
    const castingTypeField = document.querySelector('select[name="castingType"]');
    const atWillOptions = document.getElementById('atWillOptions');
    const useLimitField = document.querySelector('select[name="useLimit"]');
    const useCountWrapper = document.getElementById('useCountWrapper');
  
    function toggleCastingTypeFields() {
      const type = castingTypeField.value;
      const shouldShow = type === "At Will" || type === "Innate" || type === "Pact Magic";
  
      atWillOptions.style.display = shouldShow ? "block" : "none";
  
      if (shouldShow) {
        toggleUseCountField(); // check if useCount should appear
      } else {
        useCountWrapper.style.display = "none";
      }
    }
  
    window.toggleUseCountField = function () {
      const val = useLimitField.value;
      if (val === "finite" || val === "perDay") {
        useCountWrapper.style.display = "inline-block";
      } else {
        useCountWrapper.style.display = "none";
      }
    };
  
    castingTypeField.addEventListener('change', toggleCastingTypeFields);
    useLimitField.addEventListener('change', toggleUseCountField);
  
    toggleCastingTypeFields(); // run once on page load
});
  
  
  