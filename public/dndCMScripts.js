
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
                <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
                    <strong>${item.name}</strong><br>
                    <em>Rarity:</em> ${item.rarity} <br>
                    <em>Attunement Required:</em> ${item.attunement_required ? 'Yes' : 'No'} <br>
                    <p>${item.description}</p>
                </div>
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
