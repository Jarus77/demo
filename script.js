// Project Configuration - This is where all the "AI magic" lives
const PROJECT_CONFIG = {
    "drawing_id": "footing_demo_v1",
    "image": "footing_layout.png",
    "schedule": {
        "F1": {
            "A": 1800, "B": 1800, "d1": 250, "d2": 150, "P": 300,
            "RA": {"dia": 12, "spacing": 150},
            "RB": {"dia": 12, "spacing": 150}
        },
        "F2": {
            "A": 1500, "B": 1500, "d1": 200, "d2": 100, "P": 250,
            "RA": {"dia": 12, "spacing": 170},
            "RB": {"dia": 12, "spacing": 170}
        }
    },
    "counts": {"F1": 16, "F2": 4},
    "covers": {"clear": 50},
    "steel": {"unit_weight_per_m": {"12": 0.889}},
    "assumptions": {
        "bend_style": "double_90",
        "bend_deduction_per_90": "2*phi",
        "A_dir_bend": "2*(d1 - 2*cover)",
        "B_dir_bend": "2*(d1 - 2*cover - phi)"
    },
    "overlays": [
        {"type": "bbox", "label": "F1", "x": 312, "y": 145, "w": 92, "h": 92, "conf": 0.97},
        {"type": "bbox", "label": "F2", "x": 1012, "y": 510, "w": 92, "h": 92, "conf": 0.95},
        {"type": "bbox", "label": "F1", "x": 512, "y": 145, "w": 92, "h": 92, "conf": 0.96},
        {"type": "bbox", "label": "F1", "x": 712, "y": 145, "w": 92, "h": 92, "conf": 0.98},
        {"type": "bbox", "label": "F1", "x": 912, "y": 145, "w": 92, "h": 92, "conf": 0.94},
        {"type": "bbox", "label": "F1", "x": 312, "y": 245, "w": 92, "h": 92, "conf": 0.97},
        {"type": "bbox", "label": "F1", "x": 512, "y": 245, "w": 92, "h": 92, "conf": 0.96},
        {"type": "bbox", "label": "F1", "x": 712, "y": 245, "w": 92, "h": 92, "conf": 0.95},
        {"type": "bbox", "label": "F1", "x": 912, "y": 245, "w": 92, "h": 92, "conf": 0.97},
        {"type": "bbox", "label": "F1", "x": 312, "y": 345, "w": 92, "h": 92, "conf": 0.96},
        {"type": "bbox", "label": "F1", "x": 512, "y": 345, "w": 92, "h": 92, "conf": 0.98},
        {"type": "bbox", "label": "F1", "x": 712, "y": 345, "w": 92, "h": 92, "conf": 0.95},
        {"type": "bbox", "label": "F1", "x": 912, "y": 345, "w": 92, "h": 92, "conf": 0.97},
        {"type": "bbox", "label": "F1", "x": 312, "y": 445, "w": 92, "h": 92, "conf": 0.96},
        {"type": "bbox", "label": "F1", "x": 512, "y": 445, "w": 92, "h": 92, "conf": 0.97},
        {"type": "bbox", "label": "F1", "x": 712, "y": 445, "w": 92, "h": 92, "conf": 0.95},
        {"type": "bbox", "label": "F1", "x": 912, "y": 445, "w": 92, "h": 92, "conf": 0.96},
        {"type": "bbox", "label": "F2", "x": 1112, "y": 510, "w": 92, "h": 92, "conf": 0.94},
        {"type": "bbox", "label": "F2", "x": 1212, "y": 510, "w": 92, "h": 92, "conf": 0.95},
        {"type": "bbox", "label": "F2", "x": 1312, "y": 510, "w": 92, "h": 92, "conf": 0.93}
    ],
    "grid_lines": [
        {"type": "horizontal", "y": 100, "label": "A"},
        {"type": "horizontal", "y": 200, "label": "B"},
        {"type": "horizontal", "y": 300, "label": "C"},
        {"type": "horizontal", "y": 400, "label": "D"},
        {"type": "horizontal", "y": 500, "label": "E"},
        {"type": "horizontal", "y": 600, "label": "F"},
        {"type": "vertical", "x": 300, "label": "1"},
        {"type": "vertical", "x": 400, "label": "2"},
        {"type": "vertical", "x": 500, "label": "3"},
        {"type": "vertical", "x": 600, "label": "4"},
        {"type": "vertical", "x": 700, "label": "5"},
        {"type": "vertical", "x": 800, "label": "6"},
        {"type": "vertical", "x": 900, "label": "7"},
        {"type": "vertical", "x": 1000, "label": "8"},
        {"type": "vertical", "x": 1100, "label": "9"},
        {"type": "vertical", "x": 1200, "label": "10"},
        {"type": "vertical", "x": 1300, "label": "11"},
        {"type": "vertical", "x": 1400, "label": "12"}
    ]
};

// Global variables
let currentConfig = PROJECT_CONFIG;
let currentImage = null;

// DOM Elements
const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('file-input');
const loadSampleBtn = document.getElementById('load-sample');
const uploadSection = document.getElementById('upload-section');
const analysisSection = document.getElementById('analysis-section');
const explainabilityToggle = document.getElementById('explainability-toggle');
const auditToggle = document.getElementById('audit-toggle');
const explainabilityPanel = document.getElementById('explainability-panel');
const auditPanel = document.getElementById('audit-panel');
const closeExplainability = document.getElementById('close-explainability');
const closeAudit = document.getElementById('close-audit');
const steelRateInput = document.getElementById('steel-rate');
const coverValueInput = document.getElementById('cover-value');
const exportBBSBtn = document.getElementById('export-bbs');
const exportDrawingBtn = document.getElementById('export-drawing');

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    setupDragAndDrop();
});

function setupEventListeners() {
    // File input change
    fileInput.addEventListener('change', handleFileSelect);
    
    // Sample button
    loadSampleBtn.addEventListener('click', loadSampleImage);
    
    // Toggle buttons
    explainabilityToggle.addEventListener('click', toggleExplainability);
    auditToggle.addEventListener('click', toggleAudit);
    
    // Close buttons
    closeExplainability.addEventListener('click', () => explainabilityPanel.style.display = 'none');
    closeAudit.addEventListener('click', () => auditPanel.style.display = 'none');
    
    // What-if controls
    steelRateInput.addEventListener('input', updateCalculations);
    coverValueInput.addEventListener('input', updateCalculations);
    
    // Export buttons
    exportBBSBtn.addEventListener('click', exportBBS);
    exportDrawingBtn.addEventListener('click', exportDrawing);
    
    // Click outside panels to close
    document.addEventListener('click', function(e) {
        if (!explainabilityPanel.contains(e.target) && !explainabilityToggle.contains(e.target)) {
            explainabilityPanel.style.display = 'none';
        }
        if (!auditPanel.contains(e.target) && !auditToggle.contains(e.target)) {
            auditPanel.style.display = 'none';
        }
    });
}

function setupDragAndDrop() {
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    });
    
    uploadArea.addEventListener('click', function() {
        fileInput.click();
    });
}

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        handleFile(file);
    }
}

function handleFile(file) {
    if (!file.type.startsWith('image/')) {
        showError('Please select an image file.');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        currentImage = e.target.result;
        processImage();
    };
    reader.readAsDataURL(file);
}

function loadSampleImage() {
    // For demo purposes, we'll create a sample image
    createSampleImage();
}

function createSampleImage() {
    // Create a canvas to draw a sample footing layout
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = 800;
    canvas.height = 600;
    
    // Background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Grid lines
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    
    // Vertical lines
    for (let x = 100; x < canvas.width; x += 100) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = 100; y < canvas.height; y += 100) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
    
    // Grid labels
    ctx.fillStyle = '#64748b';
    ctx.font = '12px Arial';
    
    // Vertical labels (1-8)
    for (let i = 1; i <= 8; i++) {
        ctx.fillText(i.toString(), 50 + (i-1) * 100, 30);
    }
    
    // Horizontal labels (A-F)
    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
    for (let i = 0; i < 6; i++) {
        ctx.fillText(letters[i], 30, 50 + i * 100);
    }
    
    // F1 Footings (16 total)
    ctx.fillStyle = '#3b82f6';
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            const x = 150 + col * 100;
            const y = 150 + row * 100;
            ctx.fillRect(x, y, 60, 60);
            ctx.fillStyle = 'white';
            ctx.fillText('F1', x + 20, y + 35);
            ctx.fillStyle = '#3b82f6';
        }
    }
    
    // F2 Footings (4 total)
    ctx.fillStyle = '#10b981';
    for (let i = 0; i < 4; i++) {
        const x = 650 + i * 100;
        const y = 450;
        ctx.fillRect(x, y, 60, 60);
        ctx.fillStyle = 'white';
        ctx.fillText('F2', x + 20, y + 35);
        ctx.fillStyle = '#10b981';
    }
    
    // Title
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 24px Arial';
    ctx.fillText('Sample Footing Layout', 250, 50);
    
    // Convert to data URL
    currentImage = canvas.toDataURL('image/png');
    processImage();
}

function processImage() {
    // Show loading state
    uploadSection.style.display = 'none';
    analysisSection.style.display = 'grid';
    
    // Start the magical analysis sequence
    startAnalysisSequence();
}

function startAnalysisSequence() {
    const footingImage = document.getElementById('footing-image');
    const scanningAnimation = document.getElementById('scanning-animation');
    
    // Set the image
    footingImage.src = currentImage;
    
    // Wait for image to load, then start scanning
    footingImage.onload = function() {
        setTimeout(() => {
            // Start scanning animation
            scanningAnimation.classList.add('active');
            
            // After scanning, show overlays
            setTimeout(() => {
                scanningAnimation.classList.remove('active');
                showOverlays();
                populateBBS();
                updateCalculations();
            }, 2000);
        }, 500);
    };
}

function showOverlays() {
    const overlayContainer = document.getElementById('overlay-container');
    overlayContainer.innerHTML = '';
    
    // Add bounding boxes
    currentConfig.overlays.forEach((overlay, index) => {
        setTimeout(() => {
            const bbox = document.createElement('div');
            bbox.className = 'bbox-overlay';
            bbox.style.left = overlay.x + 'px';
            bbox.style.top = overlay.y + 'px';
            bbox.style.width = overlay.w + 'px';
            bbox.style.height = overlay.h + 'px';
            bbox.setAttribute('data-label', overlay.label);
            
            // Add confidence indicator
            const confIndicator = document.createElement('div');
            confIndicator.className = 'confidence-indicator';
            confIndicator.textContent = overlay.conf.toFixed(2);
            bbox.appendChild(confIndicator);
            
            overlayContainer.appendChild(bbox);
        }, index * 100); // Stagger the appearance
    });
    
    // Add grid lines
    setTimeout(() => {
        currentConfig.grid_lines.forEach((line, index) => {
            const gridLine = document.createElement('div');
            gridLine.className = `grid-line ${line.type}`;
            
            if (line.type === 'horizontal') {
                gridLine.style.top = line.y + 'px';
            } else {
                gridLine.style.left = line.x + 'px';
            }
            
            overlayContainer.appendChild(gridLine);
        });
    }, currentConfig.overlays.length * 100 + 500);
}

function populateBBS() {
    const tbody = document.getElementById('bbs-tbody');
    tbody.innerHTML = '';
    
    // F1 A-direction
    const f1ARow = createBBSRow('F1 A-dir (RA)', 12, 1.952, 0.889, 12 * 1.952 * 0.889);
    tbody.appendChild(f1ARow);
    
    // F1 B-direction
    const f1BRow = createBBSRow('F1 B-dir (RB)', 12, 1.928, 0.889, 12 * 1.928 * 0.889);
    tbody.appendChild(f1BRow);
    
    // F2 A-direction
    const f2ARow = createBBSRow('F2 A-dir (RA)', 9, 1.652, 0.889, 9 * 1.652 * 0.889);
    tbody.appendChild(f2ARow);
    
    // F2 B-direction
    const f2BRow = createBBSRow('F2 B-dir (RB)', 9, 1.628, 0.889, 9 * 1.628 * 0.889);
    tbody.appendChild(f2BRow);
    
    // Update summary
    updateSummary();
}

function createBBSRow(direction, bars, length, unitWeight, weight) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${direction}</td>
        <td>${bars}</td>
        <td>${length.toFixed(3)}</td>
        <td>${unitWeight}</td>
        <td>${weight.toFixed(2)}</td>
    `;
    return row;
}

function updateSummary() {
    document.getElementById('f1-count').textContent = currentConfig.counts.F1;
    document.getElementById('f2-count').textContent = currentConfig.counts.F2;
    
    // Calculate total steel weight
    const f1Weight = (12 * 1.952 * 0.889 + 12 * 1.928 * 0.889) * currentConfig.counts.F1;
    const f2Weight = (9 * 1.652 * 0.889 + 9 * 1.628 * 0.889) * currentConfig.counts.F2;
    const totalWeight = f1Weight + f2Weight;
    
    document.getElementById('total-steel').textContent = `${totalWeight.toFixed(0)} kg`;
    
    // Update cost
    const steelRate = parseFloat(steelRateInput.value);
    const totalCost = totalWeight * steelRate;
    document.getElementById('total-cost').textContent = `₹${totalCost.toLocaleString()}`;
}

function updateCalculations() {
    updateSummary();
    
    // Update confidence with slight random variation
    const confidenceValue = document.getElementById('confidence-value');
    const baseConfidence = 0.97;
    const variation = (Math.random() - 0.5) * 0.05;
    const newConfidence = Math.max(0.93, Math.min(0.98, baseConfidence + variation));
    confidenceValue.textContent = newConfidence.toFixed(2);
}

function toggleExplainability() {
    const isVisible = explainabilityPanel.style.display === 'block';
    explainabilityPanel.style.display = isVisible ? 'none' : 'block';
    
    const toggleText = explainabilityToggle.querySelector('.toggle-text');
    toggleText.textContent = isVisible ? 'Show Steps' : 'Hide Steps';
}

function toggleAudit() {
    const isVisible = auditPanel.style.display === 'block';
    auditPanel.style.display = isVisible ? 'none' : 'block';
    
    const toggleText = auditToggle.querySelector('.toggle-text');
    toggleText.textContent = isVisible ? 'Show Assumptions' : 'Hide Assumptions';
}

function exportBBS() {
    // Create CSV content
    const csvContent = [
        'Direction,Bars/Footing,Cutting Length (m),Unit Weight (kg/m),Weight/Footing (kg)',
        'F1 A-dir (RA),12,1.952,0.889,20.85',
        'F1 B-dir (RB),12,1.928,0.889,20.61',
        'F2 A-dir (RA),9,1.652,0.889,13.23',
        'F2 B-dir (RB),9,1.628,0.889,13.04'
    ].join('\n');
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'footing_bbs.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}

function exportDrawing() {
    // For demo purposes, we'll create a simple annotated version
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Load the current image
    const img = new Image();
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw the original image
        ctx.drawImage(img, 0, 0);
        
        // Add annotations
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 3;
        ctx.font = 'bold 16px Arial';
        ctx.fillStyle = '#667eea';
        
        // Add bounding boxes
        currentConfig.overlays.forEach(overlay => {
            ctx.strokeRect(overlay.x, overlay.y, overlay.w, overlay.h);
            ctx.fillText(overlay.label, overlay.x + 5, overlay.y - 10);
        });
        
        // Add grid labels
        ctx.fillStyle = '#64748b';
        ctx.font = '14px Arial';
        currentConfig.grid_lines.forEach(line => {
            if (line.type === 'horizontal') {
                ctx.fillText(line.label, 10, line.y + 5);
            } else {
                ctx.fillText(line.label, line.x + 5, 20);
            }
        });
        
        // Download the annotated image
        const dataURL = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = dataURL;
        a.download = 'annotated_footing_layout.png';
        a.click();
    };
    
    img.src = currentImage;
}

function showError(message) {
    // Remove existing error messages
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    uploadSection.appendChild(errorDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
}

function showSuccess(message) {
    // Remove existing success messages
    const existingSuccess = document.querySelector('.success-message');
    if (existingSuccess) {
        existingSuccess.remove();
    }
    
    // Create new success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    uploadSection.appendChild(successDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.remove();
        }
    }, 5000);
}

// Add some interactive flourishes
function addInteractiveFlourishes() {
    // Random confidence jitter
    setInterval(() => {
        if (document.getElementById('confidence-value')) {
            updateCalculations();
        }
    }, 3000);
    
    // Add hover effects to bounding boxes
    document.addEventListener('mouseover', function(e) {
        if (e.target.classList.contains('bbox-overlay')) {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.zIndex = '10';
        }
    });
    
    document.addEventListener('mouseout', function(e) {
        if (e.target.classList.contains('bbox-overlay')) {
            e.target.style.transform = 'scale(1)';
            e.target.style.zIndex = '1';
        }
    });
}

// Initialize interactive flourishes
setTimeout(addInteractiveFlourishes, 1000);
