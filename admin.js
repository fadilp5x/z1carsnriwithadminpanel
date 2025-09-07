document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginSection = document.getElementById('login-section');
    const adminSection = document.getElementById('admin-section');
    const loginForm = document.getElementById('login-form');
    const loginNotification = document.getElementById('login-notification');
    const logoutBtn = document.getElementById('logout-btn');
    const adminNotification = document.getElementById('admin-notification');
    const addVehicleBtn = document.getElementById('add-vehicle-btn');
    const vehicleModal = document.getElementById('vehicle-modal');
    const modalTitle = document.getElementById('modal-title');
    const vehicleForm = document.getElementById('vehicle-form');
    const vehicleTableBody = document.getElementById('vehicle-table-body');
    const closeModal = document.querySelector('.close');
    const cancelBtn = document.getElementById('cancel-btn');
    const imageUpload = document.getElementById('image-upload');
    const imagePreview = document.getElementById('image-preview');
    const progressBarFill = document.querySelector('.progress-bar-fill');
    
    // Initialize Supabase
    const supabase = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.key);
    
    // Check if user is already logged in
    checkAuthStatus();
    
    // Login form submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        try {
            showNotification(loginNotification, 'Logging in...', 'info');
            
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });
            
            if (error) {
                throw error;
            }
            
            showNotification(loginNotification, 'Login successful!', 'success');
            
            setTimeout(() => {
                showAdminPanel();
                loadVehicles();
            }, 1000);
            
        } catch (error) {
            console.error('Login error:', error);
            showNotification(loginNotification, `Login failed: ${error.message}`, 'error');
        }
    });
    
    // Logout button
    logoutBtn.addEventListener('click', async () => {
        try {
            await supabase.auth.signOut();
            showLoginForm();
            showNotification(adminNotification, 'Logged out successfully', 'success');
        } catch (error) {
            console.error('Logout error:', error);
            showNotification(adminNotification, `Logout failed: ${error.message}`, 'error');
        }
    });
    
    // Add vehicle button
    addVehicleBtn.addEventListener('click', () => {
        openVehicleModal();
    });
    
    // Close modal
    closeModal.addEventListener('click', () => {
        vehicleModal.style.display = 'none';
    });
    
    cancelBtn.addEventListener('click', () => {
        vehicleModal.style.display = 'none';
    });
    
    // Image upload
    imageUpload.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        try {
            showNotification(adminNotification, 'Uploading image...', 'info');
            
            // Create a unique filename
            const fileName = `${Date.now()}_${file.name}`;
            const filePath = `vehicle-images/${fileName}`;
            
            // Show progress bar
            progressBarFill.style.width = '0%';
            
            // Upload file to Supabase Storage with progress tracking
            const { data, error } = await supabase.storage
                .from('vehicle-images')
                .upload(filePath, file, {
                    onUploadProgress: (progress) => {
                        const percent = (progress.loaded / progress.total) * 100;
                        progressBarFill.style.width = `${percent}%`;
                    }
                });
            
            if (error) throw error;
            
            // Get public URL
            const { data: publicUrlData } = supabase.storage
                .from('vehicle-images')
                .getPublicUrl(filePath);
            
            const publicUrl = publicUrlData.publicUrl;
            
            // Set the image URL in the form
            document.getElementById('vehicle-image').value = publicUrl;
            
            // Show preview
            imagePreview.innerHTML = `<img src="${publicUrl}" alt="Preview">`;
            
            showNotification(adminNotification, 'Image uploaded successfully!', 'success');
            
        } catch (error) {
            console.error('Error uploading image:', error);
            showNotification(adminNotification, `Error uploading image: ${error.message}`, 'error');
        }
    });
    
    // Vehicle form submission
    vehicleForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const vehicleId = document.getElementById('vehicle-id').value;
        const vehicleOrder = document.getElementById('vehicle-order').value || '0';
        const vehicleData = {
            name: document.getElementById('vehicle-name').value,
            year: parseInt(document.getElementById('vehicle-year').value),
            brand: document.getElementById('vehicle-brand').value,
            type: document.getElementById('vehicle-type').value,
            tags: document.getElementById('vehicle-tags').value || 'Available',
            rate: document.getElementById('vehicle-rate').value,
            standardPackage: document.getElementById('vehicle-standard-package').value,
            extraKm: document.getElementById('vehicle-extra-km').value,
            extraHour: document.getElementById('vehicle-extra-hour').value,
            driverBata: document.getElementById('vehicle-driver-bata').value,
            image: document.getElementById('vehicle-image').value,
            order: parseInt(vehicleOrder)
        };
        
        try {
            if (vehicleId) {
                // Update existing vehicle
                const { error } = await supabase
                    .from('vehicles')
                    .update(vehicleData)
                    .eq('id', vehicleId);
                
                if (error) throw error;
                
                showNotification(adminNotification, 'Vehicle updated successfully!', 'success');
            } else {
                // Add new vehicle
                const { error } = await supabase
                    .from('vehicles')
                    .insert([vehicleData]);
                
                if (error) throw error;
                
                showNotification(adminNotification, 'Vehicle added successfully!', 'success');
            }
            
            vehicleModal.style.display = 'none';
            loadVehicles();
            
        } catch (error) {
            console.error('Error saving vehicle:', error);
            showNotification(adminNotification, `Error saving vehicle: ${error.message}`, 'error');
        }
    });
    
    // Functions
    async function checkAuthStatus() {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
            showAdminPanel();
            loadVehicles();
        } else {
            showLoginForm();
        }
    }
    
    function showLoginForm() {
        loginSection.classList.remove('admin-hidden');
        adminSection.classList.add('admin-hidden');
    }
    
    function showAdminPanel() {
        loginSection.classList.add('admin-hidden');
        adminSection.classList.remove('admin-hidden');
    }
    
    function showNotification(element, message, type) {
        element.textContent = message;
        element.className = `notification ${type}`;
        element.style.display = 'block';
        
        if (type === 'success' || type === 'info') {
            setTimeout(() => {
                element.style.display = 'none';
            }, 3000);
        }
    }
    
    function openVehicleModal(vehicleId = null) {
        // Reset form
        vehicleForm.reset();
        document.getElementById('vehicle-id').value = '';
        document.getElementById('vehicle-order').value = '';
        imagePreview.innerHTML = '';
        progressBarFill.style.width = '0%';
        
        if (vehicleId) {
            // Edit mode
            modalTitle.textContent = 'Edit Vehicle';
            
            // Fetch vehicle data
            supabase
                .from('vehicles')
                .select('*')
                .eq('id', vehicleId)
                .single()
                .then(({ data, error }) => {
                    if (error) {
                        console.error('Error fetching vehicle:', error);
                        showNotification(adminNotification, `Error fetching vehicle: ${error.message}`, 'error');
                        return;
                    }
                    
                    if (data) {
                        // Populate form
                        document.getElementById('vehicle-id').value = data.id;
                        document.getElementById('vehicle-name').value = data.name;
                        document.getElementById('vehicle-year').value = data.year;
                        document.getElementById('vehicle-brand').value = data.brand;
                        document.getElementById('vehicle-type').value = data.type;
                        document.getElementById('vehicle-tags').value = data.tags || 'Available';
                        document.getElementById('vehicle-rate').value = data.rate;
                        document.getElementById('vehicle-standard-package').value = data.standardPackage;
                        document.getElementById('vehicle-extra-km').value = data.extraKm;
                        document.getElementById('vehicle-extra-hour').value = data.extraHour;
                        document.getElementById('vehicle-driver-bata').value = data.driverBata;
                        document.getElementById('vehicle-image').value = data.image;
                        document.getElementById('vehicle-order').value = data.order || '0';
                        
                        // Show image preview
                        if (data.image) {
                            imagePreview.innerHTML = `<img src="${data.image}" alt="Preview">`;
                        }
                    }
                });
        } else {
            // Add mode
            modalTitle.textContent = 'Add Vehicle';
            // Set default order to the end of the list
            const orderInput = document.getElementById('vehicle-order');
            const maxOrder = vehicleTableBody.children.length || 0;
            orderInput.value = maxOrder;
        }
        
        vehicleModal.style.display = 'block';
    }
    
    async function loadVehicles() {
        try {
            vehicleTableBody.innerHTML = '<tr><td colspan="8" class="loading">Loading vehicles...</td></tr>';
            
            const { data, error } = await supabase
                .from('vehicles')
                .select('*')
                .order('order', { ascending: true })
                .order('created_at', { ascending: false });
            
            if (error) {
                console.error('Error loading vehicles:', error);
                vehicleTableBody.innerHTML = '<tr><td colspan="8">Error loading vehicles</td></tr>';
                showNotification(adminNotification, `Error loading vehicles: ${error.message}`, 'error');
                return;
            }
            
            if (!data || data.length === 0) {
                vehicleTableBody.innerHTML = '<tr><td colspan="8">No vehicles found</td></tr>';
                return;
            }
            
            vehicleTableBody.innerHTML = '';
            
            data.forEach((vehicle, index) => {
                const row = document.createElement('tr');
                row.dataset.id = vehicle.id;
                
                row.innerHTML = `
                    <td><i class="fas fa-grip-vertical drag-handle"></i></td>
                    <td><img src="${vehicle.image}" alt="${vehicle.name}"></td>
                    <td>${vehicle.name}</td>
                    <td>${vehicle.year}</td>
                    <td>${vehicle.brand}</td>
                    <td>${vehicle.type}</td>
                    <td>${vehicle.rate}</td>
                    <td class="vehicle-actions">
                        <button class="btn btn-primary edit-btn" data-id="${vehicle.id}">Edit</button>
                        <button class="btn btn-danger delete-btn" data-id="${vehicle.id}">Delete</button>
                    </td>
                `;
                
                vehicleTableBody.appendChild(row);
            });
            
            // Initialize sortable for drag and drop
            new Sortable(vehicleTableBody, {
                handle: '.drag-handle',
                animation: 150,
                ghostClass: 'sortable-ghost',
                dragClass: 'sortable-drag',
                onEnd: async function(evt) {
                    // Update order values
                    const rows = vehicleTableBody.children;
                    for (let i = 0; i < rows.length; i++) {
                        const id = rows[i].dataset.id;
                        await supabase
                            .from('vehicles')
                            .update({ order: i })
                            .eq('id', id);
                    }
                    showNotification(adminNotification, 'Vehicle order updated successfully!', 'success');
                }
            });
            
            // Add event listeners to edit and delete buttons
            document.querySelectorAll('.edit-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    openVehicleModal(btn.dataset.id);
                });
            });
            
            document.querySelectorAll('.delete-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    if (confirm('Are you sure you want to delete this vehicle?')) {
                        deleteVehicle(btn.dataset.id);
                    }
                });
            });
            
        } catch (error) {
            console.error('Error loading vehicles:', error);
            vehicleTableBody.innerHTML = '<tr><td colspan="8">Error loading vehicles</td></tr>';
            showNotification(adminNotification, `Error loading vehicles: ${error.message}`, 'error');
        }
    }
    
    async function deleteVehicle(vehicleId) {
        try {
            // First, get the vehicle to check if it has an image
            const { data: vehicle, error: fetchError } = await supabase
                .from('vehicles')
                .select('image')
                .eq('id', vehicleId)
                .single();
            
            if (fetchError) throw fetchError;
            
            // Delete the vehicle from the database
            const { error } = await supabase
                .from('vehicles')
                .delete()
                .eq('id', vehicleId);
            
            if (error) throw error;
            
            // If the vehicle had an image, try to delete it from storage
            if (vehicle && vehicle.image) {
                try {
                    // Extract the file path from the URL
                    const imageUrl = new URL(vehicle.image);
                    const pathParts = imageUrl.pathname.split('/');
                    // Find the index of 'vehicle-images' in the path
                    const vehicleImagesIndex = pathParts.findIndex(part => part === 'vehicle-images');
                    
                    if (vehicleImagesIndex !== -1) {
                        // Construct the file path from 'vehicle-images' onwards
                        const filePath = pathParts.slice(vehicleImagesIndex).join('/');
                        
                        // Delete the image from storage
                        const { error: deleteError } = await supabase.storage
                            .from('vehicle-images')
                            .remove([filePath]);
                        
                        if (deleteError) {
                            console.warn('Could not delete image from storage:', deleteError);
                        }
                    }
                } catch (imageError) {
                    console.warn('Error processing image deletion:', imageError);
                    // Don't throw here as the main operation (deleting the vehicle) succeeded
                }
            }
            
            showNotification(adminNotification, 'Vehicle deleted successfully!', 'success');
            loadVehicles();
        } catch (error) {
            console.error('Error deleting vehicle:', error);
            showNotification(adminNotification, `Error deleting vehicle: ${error.message}`, 'error');
        }
    }
});