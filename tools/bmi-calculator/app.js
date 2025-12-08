var bmiCalc = {
    // State
    currentUnit: 'metric',

    // Initialize
    init: function () {
        // Add enter key listener
        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.calculate();
            }
        });
    },

    // Switch unit system
    switchUnit: function (unit) {
        this.currentUnit = unit;

        // Update button states
        document.querySelectorAll('.unit-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-unit="${unit}"]`).classList.add('active');

        // Toggle input sections
        if (unit === 'metric') {
            document.getElementById('metricInputs').style.display = 'block';
            document.getElementById('imperialInputs').style.display = 'none';
        } else {
            document.getElementById('metricInputs').style.display = 'none';
            document.getElementById('imperialInputs').style.display = 'block';
        }

        // Hide results
        document.getElementById('resultCard').style.display = 'none';
    },

    // Calculate BMI
    calculate: function () {
        let weight, height;

        // Get values based on unit system
        if (this.currentUnit === 'metric') {
            weight = parseFloat(document.getElementById('weightKg').value);
            height = parseFloat(document.getElementById('heightCm').value) / 100; // Convert to meters
        } else {
            weight = parseFloat(document.getElementById('weightLbs').value);
            const heightFt = parseFloat(document.getElementById('heightFt').value) || 0;
            const heightIn = parseFloat(document.getElementById('heightIn').value) || 0;

            // Convert to metric
            weight = weight * 0.453592; // lbs to kg
            height = ((heightFt * 12) + heightIn) * 0.0254; // inches to meters
        }

        // Validate inputs
        if (!weight || !height || weight <= 0 || height <= 0) {
            alert('Please enter valid weight and height values.');
            return;
        }

        if (height > 3) {
            alert('Height seems too large. Please check your input.');
            return;
        }

        // Calculate BMI
        const bmi = weight / (height * height);

        // Display results
        this.displayResults(bmi, weight, height);
    },

    // Display results
    displayResults: function (bmi, weight, height) {
        const resultCard = document.getElementById('resultCard');
        const scoreValue = document.getElementById('scoreValue');
        const scoreCategory = document.getElementById('scoreCategory');
        const scaleMarker = document.getElementById('scaleMarker');
        const healthInfo = document.getElementById('healthInfo');
        const idealWeight = document.getElementById('idealWeight');

        // Format BMI
        const bmiValue = bmi.toFixed(1);
        scoreValue.textContent = bmiValue;

        // Determine category
        const category = this.getCategory(bmi);
        scoreCategory.textContent = category.name;
        scoreCategory.className = `score-category ${category.class}`;

        // Position scale marker (BMI 15-40 range)
        const markerPosition = Math.min(Math.max((bmi - 15) / 25 * 100, 0), 100);
        scaleMarker.style.left = `${markerPosition}%`;

        // Health info
        healthInfo.innerHTML = `
            <h3><i class="fas fa-info-circle"></i> What This Means</h3>
            <p>${category.description}</p>
        `;

        // Calculate ideal weight range (BMI 18.5-24.9)
        const minIdealWeight = 18.5 * height * height;
        const maxIdealWeight = 24.9 * height * height;

        let weightDisplay, weightUnit;
        if (this.currentUnit === 'metric') {
            weightDisplay = `${minIdealWeight.toFixed(1)} - ${maxIdealWeight.toFixed(1)}`;
            weightUnit = 'kg';
        } else {
            // Convert to lbs
            const minLbs = minIdealWeight / 0.453592;
            const maxLbs = maxIdealWeight / 0.453592;
            weightDisplay = `${minLbs.toFixed(1)} - ${maxLbs.toFixed(1)}`;
            weightUnit = 'lbs';
        }

        idealWeight.innerHTML = `
            <h3><i class="fas fa-bullseye"></i> Healthy Weight Range</h3>
            <p>For your height, a healthy weight is approximately <strong>${weightDisplay} ${weightUnit}</strong> (BMI 18.5-24.9)</p>
        `;

        // Show result card with animation
        resultCard.style.display = 'block';
        resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    },

    // Get BMI category
    getCategory: function (bmi) {
        if (bmi < 18.5) {
            return {
                name: 'Underweight',
                class: 'underweight',
                description: 'Your BMI indicates you are underweight. Consider consulting a healthcare provider for personalized advice on reaching a healthy weight through proper nutrition and exercise.'
            };
        } else if (bmi >= 18.5 && bmi < 25) {
            return {
                name: 'Normal Weight',
                class: 'normal',
                description: 'Great! Your BMI is in the healthy range. Maintain your current lifestyle with a balanced diet and regular physical activity to stay healthy.'
            };
        } else if (bmi >= 25 && bmi < 30) {
            return {
                name: 'Overweight',
                class: 'overweight',
                description: 'Your BMI indicates you are overweight. Consider adopting a healthier lifestyle with balanced nutrition and regular exercise. Consult a healthcare provider for personalized guidance.'
            };
        } else {
            return {
                name: 'Obese',
                class: 'obese',
                description: 'Your BMI indicates obesity. It\'s important to consult with a healthcare provider for personalized advice on weight management, nutrition, and exercise to improve your health.'
            };
        }
    }
};

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', function () {
    bmiCalc.init();
});
