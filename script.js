document.addEventListener('DOMContentLoaded', function() {
    // Load featured vehicles on homepage
    loadFeaturedVehicles();
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