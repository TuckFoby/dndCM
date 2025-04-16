
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
function openSearchModal() {
    document.getElementById('searchModal').style.display = 'block';
}

function closeSearchModal() {
    document.getElementById('searchModal').style.display = 'none';
    document.getElementById('searchResults').innerHTML = '';
}

window.onclick = function (event) {
    const modal = document.getElementById('searchModal');
    if (event.target == modal) {
        closeSearchModal();
    }
};

document.getElementById('searchForm').addEventListener('submit', function (e) {
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
                <button class="item-button" data-id="${item.id}">
                  ${item.name} (${item.rarity})
                </button>
            `).join('');
        }
    })
    .catch(err => {
        console.error(err);
        document.getElementById('searchResults').innerHTML = `<p>Error fetching results: ${err.message}</p>`;
    });

});

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