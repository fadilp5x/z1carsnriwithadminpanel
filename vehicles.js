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
            
            // Generate WhatsApp URL
            const whatsappMessage = encodeURIComponent(`Hi Z1Cars, I am interested in renting the ${vehicle.name} (${vehicle.year}). Please share availability and pricing.`);
            const whatsappUrl = `https://wa.me/919645177177?text=${whatsappMessage}`;
            
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
                    </div>
                    <div class="vehicle-actions">
                        <a href="${whatsappUrl}" target="_blank" class="whatsapp-cta">
                            <svg class="whatsapp-icon" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                            </svg>
                            WhatsApp
                        </a>
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
            
            // Generate WhatsApp URL
            const whatsappMessage = encodeURIComponent(`Hi Z1Cars, I am interested in renting the ${vehicle.name} (${vehicle.year}). Please share availability and pricing.`);
            const whatsappUrl = `https://wa.me/919645177177?text=${whatsappMessage}`;
            
            card.innerHTML = `
                <div class="vehicle-image">
                    <img src="${vehicle.image}" alt="${vehicle.name}">
                </div>
                <div class="vehicle-details">
                    <h3>${vehicle.name}</h3>
                    <p>The perfect blend of luxury and comfort for Kerala's diverse terrains</p>
                    <div class="vehicle-price">
                        <div class="price">₹${rateValue.toLocaleString()} <span>/day</span></div>
                    </div>
                    <div class="vehicle-actions">
                        <a href="${whatsappUrl}" target="_blank" class="whatsapp-cta">
                            <svg class="whatsapp-icon" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.M157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                            </svg>
                            WhatsApp
                        </a>
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