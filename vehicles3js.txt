document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const vehiclesGrid = document.getElementById('vehicles-grid');
    const searchInput = document.getElementById('search-input');
    const brandFilter = document.getElementById('brand-filter');
    const typeFilter = document.getElementById('type-filter');
    const priceFilter = document.getElementById('price-filter');
    const resetFilters = document.getElementById('reset-filters');
    
    // Fetch vehicles from Supabase
    let vehiclesData = [];
    
    // Function to fetch vehicles from Supabase
    async function fetchVehicles() {
        try {
            vehiclesGrid.innerHTML = '<div class="loading">Loading vehicles...</div>';
            
            const { data, error } = await supabase
                .from('vehicles')
                .select('*')
                .order('order', { ascending: true })
                .order('created_at', { ascending: false });
            
            if (error) {
                console.error('Error fetching vehicles:', error);
                vehiclesGrid.innerHTML = '<div class="error">Error loading vehicles. Please try again later.</div>';
                return;
            }
            
            if (!data || data.length === 0) {
                vehiclesGrid.innerHTML = '<div class="no-vehicles">No vehicles available at the moment.</div>';
                return;
            }
            
            vehiclesData = data;
            
            // Display all vehicles initially
            displayVehicles(vehiclesData);
            
            // Add event listeners for filters
            searchInput.addEventListener('input', filterVehicles);
            brandFilter.addEventListener('change', filterVehicles);
            typeFilter.addEventListener('change', filterVehicles);
            priceFilter.addEventListener('change', filterVehicles);
            resetFilters.addEventListener('click', resetAllFilters);
            
        } catch (error) {
            console.error('Error fetching vehicles:', error);
            vehiclesGrid.innerHTML = '<div class="error">Error loading vehicles. Please try again later.</div>';
        }
    }
    
    // Function to display vehicles
    function displayVehicles(vehicles) {
        if (vehicles.length === 0) {
            vehiclesGrid.innerHTML = '<div class="no-vehicles">No vehicles match your search criteria.</div>';
            return;
        }
        
        vehiclesGrid.innerHTML = '';
        
        vehicles.forEach(vehicle => {
            const rateValue = parseInt(vehicle.rate.replace(/\D/g, ''));
            const card = document.createElement('div');
            card.className = 'vehicle-card';
            
            card.innerHTML = `
                <div class="vehicle-image">
                    <img src="${vehicle.image}" alt="${vehicle.name}">
                    <div class="vehicle-badge">${vehicle.tags || 'Available'}</div>
                </div>
                <div class="vehicle-details">
                    <h3>${vehicle.name}</h3>
                    <p>${vehicle.standardPackage} • ${vehicle.extraKm} extra</p>
                    <div class="vehicle-specs">
                        <div class="spec">
                            <div class="spec-value">${vehicle.year}</div>
                            <div class="spec-label">Year</div>
                        </div>
                        <div class="spec">
                            <div class="spec-value">${vehicle.type}</div>
                            <div class="spec-label">Type</div>
                        </div>
                        <div class="spec">
                            <div class="spec-value">${vehicle.brand}</div>
                            <div class="spec-label">Brand</div>
                        </div>
                    </div>
                    <div class="vehicle-price">
                        <div class="price">₹${rateValue.toLocaleString()} <span>/day</span></div>
                        <a href="book.html?vehicle=${encodeURIComponent(vehicle.name)}" class="vehicle-cta">Book Now</a>
                    </div>
                </div>
            `;
            
            vehiclesGrid.appendChild(card);
        });
    }
    
    // Function to filter vehicles
    function filterVehicles() {
        const searchTerm = searchInput.value.toLowerCase();
        const brandValue = brandFilter.value;
        const typeValue = typeFilter.value;
        const priceValue = priceFilter.value;
        
        const filteredVehicles = vehiclesData.filter(vehicle => {
            // Search filter
            const matchesSearch = searchTerm === '' || 
                                vehicle.name.toLowerCase().includes(searchTerm) || 
                                vehicle.brand.toLowerCase().includes(searchTerm);
            
            // Brand filter
            const matchesBrand = brandValue === '' || vehicle.brand === brandValue;
            
            // Type filter
            const matchesType = typeValue === '' || vehicle.type === typeValue;
            
            // Price filter
            const rateValue = parseInt(vehicle.rate.replace(/\D/g, ''));
            let matchesPrice = true;
            
            if (priceValue !== '') {
                if (priceValue === '0-20000') {
                    matchesPrice = rateValue < 20000;
                } else if (priceValue === '20000-50000') {
                    matchesPrice = rateValue >= 20000 && rateValue < 50000;
                } else if (priceValue === '50000-100000') {
                    matchesPrice = rateValue >= 50000 && rateValue < 100000;
                } else if (priceValue === '100000') {
                    matchesPrice = rateValue >= 100000;
                }
            }
            
            return matchesSearch && matchesBrand && matchesType && matchesPrice;
        });
        
        displayVehicles(filteredVehicles);
    }
    
    // Function to reset all filters
    function resetAllFilters() {
        searchInput.value = '';
        brandFilter.value = '';
        typeFilter.value = '';
        priceFilter.value = '';
        displayVehicles(vehiclesData);
    }
    
    // Fetch vehicles on page load
    fetchVehicles();
});

// Function to load featured vehicles on homepage
async function loadFeaturedVehicles() {
    const featuredContainer = document.getElementById('featured-vehicles');
    
    if (!featuredContainer) return;
    
    try {
        featuredContainer.innerHTML = '<div class="loading">Loading vehicles...</div>';
        
        // Get just a few featured vehicles for the homepage
        const { data, error } = await supabase
            .from('vehicles')
            .select('*')
            .order('order', { ascending: true })
            .order('created_at', { ascending: false })
            .limit(3);
        
        if (error) {
            console.error('Error loading featured vehicles:', error);
            featuredContainer.innerHTML = '<div class="error">Error loading vehicles. Please try again later.</div>';
            return;
        }
        
        if (!data || data.length === 0) {
            featuredContainer.innerHTML = '<div class="no-vehicles">No featured vehicles available at the moment.</div>';
            return;
        }
        
        featuredContainer.innerHTML = '';
        
        data.forEach(vehicle => {
            const rateValue = parseInt(vehicle.rate.replace(/\D/g, ''));
            const card = document.createElement('div');
            card.className = 'vehicle-card';
            
            card.innerHTML = `
                <div class="vehicle-image">
                    <img src="${vehicle.image}" alt="${vehicle.name}">
                </div>
                <div class="vehicle-details">
                    <h3>${vehicle.name}</h3>
                    <p>The perfect blend of luxury and comfort for Kerala's diverse terrains</p>
                    <div class="vehicle-price">
                        <div class="price">₹${rateValue.toLocaleString()} <span>/day</span></div>
                        <a href="book.html?vehicle=${encodeURIComponent(vehicle.name)}" class="vehicle-cta">Book Now</a>
                    </div>
                </div>
            `;
            
            featuredContainer.appendChild(card);
        });
        
    } catch (error) {
        console.error('Error loading featured vehicles:', error);
        featuredContainer.innerHTML = '<div class="error">Error loading vehicles. Please try again later.</div>';
    }
}