document.addEventListener('DOMContentLoaded', function() {
    // Range slider functionality
    const rangeSlider = document.querySelector('.range-slider');
    const rangeTrack = document.querySelector('.range-slider-track');
    const minHandle = document.querySelector('[data-handle="min"]');
    const maxHandle = document.querySelector('[data-handle="max"]');
    const minInput = document.getElementById('min-price');
    const maxInput = document.getElementById('max-price');

    if (rangeSlider && rangeTrack && minHandle && maxHandle && minInput && maxInput) {
        const min = 5;
        const max = 200;
        const range = max - min;

        // Initialize positions
        updateHandlePositions();

        // Update handle positions based on input values
        function updateHandlePositions() {
            const minVal = parseInt(minInput.value);
            const maxVal = parseInt(maxInput.value);
            
            const minPos = ((minVal - min) / range) * 100;
            const maxPos = ((maxVal - min) / range) * 100;
            
            minHandle.style.left = `${minPos}%`;
            maxHandle.style.left = `${maxPos}%`;
            
            rangeTrack.style.left = `${minPos}%`;
            rangeTrack.style.width = `${maxPos - minPos}%`;
        }

        // Handle drag functionality
        let isDragging = false;
        let currentHandle = null;

        function startDrag(e, handle) {
            isDragging = true;
            currentHandle = handle;
            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', stopDrag);
            document.addEventListener('touchmove', drag);
            document.addEventListener('touchend', stopDrag);
            e.preventDefault();
        }

        function drag(e) {
            if (!isDragging) return;
            
            const sliderRect = rangeSlider.getBoundingClientRect();
            const sliderWidth = sliderRect.width;
            
            let clientX;
            if (e.type === 'touchmove') {
                clientX = e.touches[0].clientX;
            } else {
                clientX = e.clientX;
            }
            
            let position = (clientX - sliderRect.left) / sliderWidth;
            position = Math.max(0, Math.min(1, position));
            
            const value = Math.round(min + position * range);
            
            if (currentHandle === minHandle) {
                if (value < parseInt(maxInput.value)) {
                    minInput.value = value;
                }
            } else {
                if (value > parseInt(minInput.value)) {
                    maxInput.value = value;
                }
            }
            
            updateHandlePositions();
        }

        function stopDrag() {
            isDragging = false;
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', stopDrag);
            document.removeEventListener('touchmove', drag);
            document.removeEventListener('touchend', stopDrag);
        }

        minHandle.addEventListener('mousedown', (e) => startDrag(e, minHandle));
        maxHandle.addEventListener('mousedown', (e) => startDrag(e, maxHandle));
        minHandle.addEventListener('touchstart', (e) => startDrag(e, minHandle));
        maxHandle.addEventListener('touchstart', (e) => startDrag(e, maxHandle));

        // Update on input change
        minInput.addEventListener('change', function() {
            let value = parseInt(this.value);
            value = Math.max(min, Math.min(parseInt(maxInput.value) - 1, value));
            this.value = value;
            updateHandlePositions();
        });

        maxInput.addEventListener('change', function() {
            let value = parseInt(this.value);
            value = Math.max(parseInt(minInput.value) + 1, Math.min(max, value));
            this.value = value;
            updateHandlePositions();
        });
    }

    // Filter accordion functionality
    const filterGroups = document.querySelectorAll('.filter-group');
    
    filterGroups.forEach(group => {
        const title = group.querySelector('.filter-group-title');
        const options = group.querySelector('.filter-options');
        
        // Add toggle functionality
        title.addEventListener('click', () => {
            options.classList.toggle('filter-options-hidden');
            title.classList.toggle('filter-group-title-collapsed');
        });
    });

    // Favorite button functionality
    const favoriteButtons = document.querySelectorAll('.btn-icon');
    
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = '#ef4444';
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                icon.style.color = '';
            }
        });
    });

    // Mobile filters toggle
    const mobileFiltersBtn = document.querySelector('.mobile-filters-btn');
    const filtersSidebar = document.querySelector('.filters-sidebar');
    
    if (mobileFiltersBtn && filtersSidebar) {
        mobileFiltersBtn.addEventListener('click', function() {
            filtersSidebar.classList.toggle('filters-sidebar-active');
        });
    }
});
