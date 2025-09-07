// This file is for one-time use to import existing vehicle data into Supabase
// Run this in the browser console after logging in to the admin panel

async function importVehicleData() {
    // Vehicle data from the original script
    const vehicleData = [
        {
            name: "Range Rover Defender",
            year: 2025,
            image: "https://i.ibb.co/G4Yy8Gnh/Gemini-Generated-Image-5pfi0x5pfi0x5pfi.png",
            tags: "Available",
            standardPackage: "8hrs, 80Kms",
            extraKm: "80 INR/km",
            extraHour: "1500 INR/hr",
            rate: "70000 INR /Day",
            driverBata: "1000 INR",
            brand: "Range Rover",
            type: "SUV"
        },
        {
            name: "Range Rover Evoque",
            year: 2020,
            image: "https://i.ibb.co/0pRnCd3m/rrevq20myreddynamic003.jpg",
            tags: "Available",
            standardPackage: "8hrs, 100Kms",
            extraKm: "35 INR/km",
            extraHour: "500 INR/hr",
            rate: "15000 INR /Day",
            driverBata: "1000 INR",
            brand: "Range Rover",
            type: "SUV"
        },
        {
            name: "Range Rover Sport",
            year: 2019,
            image: "https://i.ibb.co/B5RRy44K/Gemini-Generated-Image-igh7epigh7epigh7.png",
            tags: "Available",
            standardPackage: "8hrs, 100Kms",
            extraKm: "30 INR/km",
            extraHour: "800 INR/hr",
            rate: "35000 INR /Day",
            driverBata: "1000 INR",
            brand: "Range Rover",
            type: "SUV"
        },
        {
            name: "Porsche Cayenne",
            year: 2019,
            image: "https://i.ibb.co/6JD1XL93/Gemini-Generated-Image-vriz2svriz2svriz.png",
            tags: "Available",
            standardPackage: "8hrs, 100Kms",
            extraKm: "50 INR/km",
            extraHour: "800 INR/hr",
            rate: "35000 INR /Day",
            driverBata: "1000 INR",
            brand: "Porsche",
            type: "SUV"
        },
        {
            name: "BMW X5",
            year: 2022,
            image: "https://i.ibb.co/8nMM7tq7/X5.png",
            tags: "Available",
            standardPackage: "8hrs, 100Kms",
            extraKm: "40 INR/km",
            extraHour: "500 INR/hr",
            rate: "20000 INR /Day",
            driverBata: "1000 INR",
            brand: "BMW",
            type: "SUV"
        },
        {
            name: "BMW X1",
            year: 2021,
            image: "https://i.ibb.co/sJ90x94M/1-2392409-e.webp",
            tags: "Available",
            standardPackage: "8hrs, 100Kms",
            extraKm: "35 INR/km",
            extraHour: "400 INR/hr",
            rate: "12000 INR /Day",
            driverBata: "1000 INR",
            brand: "BMW",
            type: "SUV"
        },
        {
            name: "BMW 730D",
            year: 2018,
            image: "https://i.ibb.co/yFj5t6QY/BMW-740-D.png",
            tags: "Available",
            standardPackage: "8hrs, 100Kms",
            extraKm: "50 INR/km",
            extraHour: "800 INR/hr",
            rate: "35000 INR /Day",
            driverBata: "1000 INR",
            brand: "BMW",
            type: "Sedan"
        },
        {
            name: "BMW 520D",
            year: 2019,
            image: "https://i.ibb.co/Ng7ZMbRC/BMW-320-D.png",
            tags: "Available",
            standardPackage: "8hrs, 100Kms",
            extraKm: "40 INR/km",
            extraHour: "500 INR/hr",
            rate: "15000 INR /Day",
            driverBata: "1000 INR",
            brand: "BMW",
            type: "Sedan"
        },
        {
            name: "Mini Cooper Countryman D",
            year: 2020,
            image: "https://i.ibb.co/35RDRsLy/MINICOOPER-COUNTRYMAN.png",
            tags: "Available",
            standardPackage: "8hrs, 100Kms",
            extraKm: "40 INR/km",
            extraHour: "500 INR/hr",
            rate: "15000 INR /Day",
            driverBata: "1000 INR",
            brand: "BMW",
            type: "Compact"
        },
        {
            name: "Mercedes GLS 350D",
            year: 2014,
            image: "https://i.ibb.co/27Vd4Lzp/Gemini-Generated-Image-ddm03iddm03iddm0.png",
            tags: "Available",
            standardPackage: "8hrs, 100Kms",
            extraKm: "50 INR/km",
            extraHour: "800 INR/hr",
            rate: "30000 INR /Day",
            driverBata: "1000 INR",
            brand: "Mercedes",
            type: "SUV"
        },
        {
            name: "Mercedes GLE 250D",
            year: 2017,
            image: "https://i.ibb.co/KcvXZrMd/GLE-250D.png",
            tags: "Available",
            standardPackage: "8hrs, 100Kms",
            extraKm: "50 INR/km",
            extraHour: "800 INR/hr",
            rate: "30000 INR /Day",
            driverBata: "1000 INR",
            brand: "Mercedes",
            type: "SUV"
        },
        {
            name: "Mercedes E250",
            year: 2016,
            image: "https://i.ibb.co/0jVCLjJG/E250.png",
            tags: "Available",
            standardPackage: "8hrs, 100Kms",
            extraKm: "430 INR/km",
            extraHour: "1720 INR/hr",
            rate: "20000 INR/Day",
            driverBata: "1000 INR",
            brand: "Mercedes",
            type: "Sedan"
        },
        {
            name: "Mercedes GLA200",
            year: 2019,
            image: "https://i.ibb.co/XrjYr04d/GLA200.png",
            tags: "Available",
            standardPackage: "8hrs, 100Kms",
            extraKm: "410 INR/km",
            extraHour: "1650 INR/hr",
            rate: "135000 INR /Day",
            driverBata: "1000 INR",
            brand: "Mercedes",
            type: "SUV"
        },
        {
            name: "Audi Q7",
            year: 2020,
            image: "https://i.ibb.co/F4TPMgrB/Q7.png",
            tags: "Available",
            standardPackage: "8hrs, 100Kms",
            extraKm: "500 INR/km",
            extraHour: "2000 INR/hr",
            rate: "16500 INR /Day",
            driverBata: "1000 INR",
            brand: "Audi",
            type: "SUV"
        },
        {
            name: "Audi Q5",
            year: 2019,
            image: "https://i.ibb.co/jvMG7gqf/Q5.png",
            tags: "Available",
            standardPackage: "8hrs, 100Kms",
            extraKm: "470 INR/km",
            extraHour: "1880 INR/hr",
            rate: "15400 INR /Day",
            driverBata: "1000 INR",
            brand: "Audi",
            type: "SUV"
        },
        {
            name: "Audi Q3",
            year: 2018,
            image: "https://i.ibb.co/H6GN2q7/Q3.png",
            tags: "Available",
            standardPackage: "8hrs, 100Kms",
            extraKm: "450 INR/km",
            extraHour: "1800 INR/hr",
            rate: "14800 INR /Day",
            driverBata: "1000 INR",
            brand: "Audi",
            type: "SUV"
        },
        {
            name: "Audi A6",
            year: 2019,
            image: "https://i.ibb.co/NzMSVKG/A6.png",
            tags: "Available",
            standardPackage: "8hrs, 100Kms",
            extraKm: "460 INR/km",
            extraHour: "1840 INR/hr",
            rate: "15000 INR /Day",
            driverBata: "1000 INR",
            brand: "Audi",
            type: "Sedan"
        },
        {
            name: "Audi A4",
            year: 2018,
            image: "https://i.ibb.co/7t8DK6Gb/A4.png",
            tags: "Available",
            standardPackage: "8hrs, 100Kms",
            extraKm: "440 INR/km",
            extraHour: "1760 INR/hr",
            rate: "14000 INR /Day",
            driverBata: "1000 INR",
            brand: "Audi",
            type: "Sedan"
        },
        {
            name: "Audi A3",
            year: 2017,
            image: "https://i.ibb.co/zW9pqmRX/Audi-A3-Right-Front-Three-Quarter-165478.jpg",
            tags: "Available",
            standardPackage: "8hrs, 100Kms",
            extraKm: "420 INR/km",
            extraHour: "1680 INR/hr",
            rate: "13000 INR /Day",
            driverBata: "1000 INR",
            brand: "Audi",
            type: "Sedan"
        },
        {
            name: "Mahindra Thar (Manual)",
            year: 2022,
            image: "https://i.ibb.co/cK4454sS/Gemini-Generated-Image-4vquxs4vquxs4vqu.png",
            tags: "Available",
            standardPackage: "24hrs, 250Kms",
            extraKm: "30 INR/km",
            extraHour: "500 INR/hr",
            rate: "3000 INR /Day",
            driverBata: "800 INR",
            brand: "Mahindra",
            type: "SUV"
        },
        {
            name: "Mahindra Thar (Automatic)",
            year: 2022,
            image: "https://i.ibb.co/cK4454sS/Gemini-Generated-Image-4vquxs4vquxs4vqu.png",
            tags: "Available",
            standardPackage: "24hrs, 250Kms",
            extraKm: "30 INR/km",
            extraHour: "500 INR/hr",
            rate: "3000 INR /Day",
            driverBata: "800 INR",
            brand: "Mahindra",
            type: "SUV"
        },
        {
            name: "Toyota Fortuner Legender",
            year: 2021,
            image: "https://i.ibb.co/RkRyTfSx/Gemini-Generated-Image-knpaqsknpaqsknpa-1.png",
            tags: "Available",
            standardPackage: "24hrs, 100Kms",
            extraKm: "40 INR/km",
            extraHour: "500 INR/hr",
            rate: "7000 INR/Day",
            driverBata: "900 INR",
            brand: "Toyota",
            type: "SUV"
        },
        {
            name: "Toyota Fortuner Sigma",
            year: 2019,
            image: "https://i.ibb.co/PZ9TD8q8/fortuner-exterior-banner.jpg",
            tags: "Available",
            standardPackage: "24hrs, 100Kms",
            extraKm: "350 INR/km",
            extraHour: "1400 INR/hr",
            rate: "7000 INR/Day",
            driverBata: "900 INR",
            brand: "Toyota",
            type: "SUV"
        },
        {
            name: "Toyota Fortuner Type 3",
            year: 2017,
            image: "https://i.ibb.co/TqBXdpKN/bekasi-indonesia-january-2021-toyota-260nw-2032063829.jpg",
            tags: "Available",
            standardPackage: "24hrs, 100Kms",
            extraKm: "320 INR/km",
            extraHour: "1300 INR/hr",
            rate: "4000 INR /Day",
            driverBata: "900 INR",
            brand: "Toyota",
            type: "SUV"
        },
        {
            name: "Toyota Fortuner Type 2",
            year: 2015,
            image: "https://i.ibb.co/J876ww7/Gemini-Generated-Image-q4zxgiq4zxgiq4zx.png",
            tags: "Available",
            standardPackage: "24hrs, 250Kms",
            extraKm: "35 INR/km",
            extraHour: "500 INR/hr",
            rate: "4000 INR/Day",
            driverBata: "900 INR",
            brand: "Toyota",
            type: "SUV"
        },
        {
            name: "Toyota Fortuner Old Type",
            year: 2012,
            image: "https://i.ibb.co/gLCRcg2f/Gemini-Generated-Image-wyxn1ywyxn1ywyxn.png",
            tags: "Available",
            standardPackage: "24hrs, 250Kms",
            extraKm: "280 INR/km",
            extraHour: "1100 INR/hr",
            rate: "4000 INR INR /Day",
            driverBata: "900 INR",
            brand: "Toyota",
            type: "SUV"
        },
        {
            name: "Toyota Innova Hycross ZXO",
            year: 2023,
            image: "https://i.ibb.co/Xk7jdMCk/front-left-side-47.jpg",
            tags: "Available",
            standardPackage: "24hrs, 250Kms",
            extraKm: "340 INR/km",
            extraHour: "1350 INR/hr",
            rate: "5000 INR /Day",
            driverBata: "900 INR",
            brand: "Toyota",
            type: "SUV"
        },
        {
            name: "Toyota Innova Crysta GXO",
            year: 2020,
            image: "https://i.ibb.co/vxqgQJd7/innova-crysta-exterior-right-front-three-quarter-2.jpg",
            tags: "Available",
            standardPackage: "24hrs, 250Kms",
            extraKm: "320 INR/km",
            extraHour: "1250 INR/hr",
            rate: "5000 INR /Day",
            driverBata: "900 INR",
            brand: "Toyota",
            type: "SUV"
        },
        {
            name: "Maruti Suzuki Grand Vitara",
            year: 2022,
            image: "https://i.ibb.co/G3N52V93/grandvitaraarcticwhite.webp",
            tags: "Available",
            standardPackage: "24hrs, 250Kms",
            extraKm: "250 INR/km",
            extraHour: "1000 INR/hr",
            rate: "3000 INR /Day",
            driverBata: "700 INR",
            brand: "Maruti Suzuki",
            type: "SUV"
        },
        {
            name: "Maruti Suzuki Brezza",
            year: 2021,
            image: "https://i.ibb.co/j9hRFh90/brezzamarutisuzukibrezzarightfrontthreequarter.webp",
            tags: "Available",
            standardPackage: "24hrs, 250Kms",
            extraKm: "220 INR/km",
            extraHour: "900 INR/hr",
            rate: "6000 INR /Day",
            driverBata: "700 INR",
            brand: "Maruti Suzuki",
            type: "SUV"
        },
        {
            name: "Maruti Suzuki Swift",
            year: 2020,
            image: "https://i.ibb.co/PZRNYHyJ/swiftswiftrightfrontthreequarter.webp",
            tags: "Available",
            standardPackage: "24hrs, 250Kms",
            extraKm: " INR/km",
            extraHour: "800 INR/hr",
            rate: "2000 INR /Day",
            driverBata: "700 INR",
            brand: "Maruti Suzuki",
            type: "Compact"
        },
        {
            name: "Maruti Suzuki Dzire",
            year: 2019,
            image: "https://i.ibb.co/n8sv1jXm/89cc3224e5c0ef6bc23aeeeac56213eb.jpg",
            tags: "Available",
            standardPackage: "24hrs, 250Kms",
            extraKm: "190 INR/km",
            extraHour: "750 INR/hr",
            rate: "4000 INR /Day",
            driverBata: "700 INR",
            brand: "Maruti Suzuki",
            type: "Sedan"
        },
        {
            name: "Maruti Suzuki A-Star",
            year: 2018,
            image: "https://i.ibb.co/HTbBvywF/Screenshot-2025-08-31-185512.png",
            tags: "Available",
            standardPackage: "24hrs, 250Kms",
            extraKm: "180 INR/km",
            extraHour: "700 INR/hr",
            rate: "1500 INR /Day",
            driverBata: "700 INR",
            brand: "Maruti Suzuki",
            type: "Compact"
        },
        {
            name: "Honda Amaze",
            year: 2021,
            image: "https://i.ibb.co/bjtVtkSn/hondaamaze2ndgenrightfrontthreequarter.webp",
            tags: "Available",
            standardPackage: "24hrs, 250Kms",
            extraKm: "230 INR/km",
            extraHour: "950 INR/hr",
            rate: "1700 INR/Day",
            driverBata: "700 INR",
            brand: "Honda",
            type: "Sedan"
        }
    ];
    
    try {
        console.log('Starting vehicle import...');
        
        // Insert vehicles in batches to avoid overwhelming the database
        const batchSize = 10;
        for (let i = 0; i < vehicleData.length; i += batchSize) {
            const batch = vehicleData.slice(i, i + batchSize);
            
            const { data, error } = await supabase
                .from('vehicles')
                .insert(batch);
            
            if (error) {
                console.error('Error importing batch:', error);
                throw error;
            }
            
            console.log(`Imported batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(vehicleData.length / batchSize)}`);
        }
        
        console.log('All vehicles imported successfully!');
        alert('All vehicles imported successfully!');
        
    } catch (error) {
        console.error('Error importing vehicles:', error);
        alert('Error importing vehicles: ' + error.message);
    }
}

// To use this function:
// 1. Log in to the admin panel
// 2. Open browser console (F12)
// 3. Paste this entire script and press Enter
// 4. Call importVehicleData() in the console