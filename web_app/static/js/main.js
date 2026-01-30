// // let selectedFile = null;

// // // File input change handler
// // document.getElementById('fileInput').addEventListener('change', function(e) {
// //     const file = e.target.files[0];
// //     if (file) {
// //         handleFileSelect(file);
// //     }
// // });

// // // Drag and drop functionality
// // const uploadBox = document.getElementById('uploadBox');

// // uploadBox.addEventListener('dragover', function(e) {
// //     e.preventDefault();
// //     uploadBox.style.background = '#eef1ff';
// // });

// // uploadBox.addEventListener('dragleave', function(e) {
// //     e.preventDefault();
// //     uploadBox.style.background = '#f8f9ff';
// // });

// // uploadBox.addEventListener('drop', function(e) {
// //     e.preventDefault();
// //     uploadBox.style.background = '#f8f9ff';
    
// //     const file = e.dataTransfer.files[0];
// //     if (file && file.type.match('image.*')) {
// //         handleFileSelect(file);
// //     } else {
// //         alert('Please upload a valid image file (PNG, JPG, or JPEG)');
// //     }
// // });

// // function handleFileSelect(file) {
// //     selectedFile = file;
    
// //     // Show preview
// //     const reader = new FileReader();
// //     reader.onload = function(e) {
// //         document.getElementById('imagePreview').src = e.target.result;
// //         document.getElementById('uploadBox').style.display = 'none';
// //         document.getElementById('previewSection').style.display = 'block';
// //         document.getElementById('resultsSection').style.display = 'none';
// //     };
// //     reader.readAsDataURL(file);
// // }

// // function resetUpload() {
// //     selectedFile = null;
// //     document.getElementById('fileInput').value = '';
// //     document.getElementById('uploadBox').style.display = 'block';
// //     document.getElementById('previewSection').style.display = 'none';
// //     document.getElementById('resultsSection').style.display = 'none';
// // }

// // function analyzeImage() {
// //     if (!selectedFile) {
// //         alert('Please select an image first');
// //         return;
// //     }
    
// //     // Show loader
// //     document.getElementById('loader').style.display = 'block';
// //     document.getElementById('resultsSection').style.display = 'none';
    
// //     // Create form data
// //     const formData = new FormData();
// //     formData.append('image', selectedFile);
// //     formData.append('top_k', 3);
    
// //     // Send request
// //     fetch('/predict', {
// //         method: 'POST',
// //         body: formData
// //     })
// //     .then(response => {
// //         console.log('Response status:', response.status);
// //         if (!response.ok) {
// //             throw new Error(`HTTP error! status: ${response.status}`);
// //         }
// //         return response.json();
// //     })
// //     .then(data => {
// //         document.getElementById('loader').style.display = 'none';
// //         console.log('Response data:', data);
        
// //         if (data.error) {
// //             alert('Error: ' + data.error);
// //             return;
// //         }
        
// //         displayResults(data.predictions);
// //     })
// //     .catch(error => {
// //         document.getElementById('loader').style.display = 'none';
// //         console.error('Fetch error:', error);
// //         alert('An error occurred: ' + error.message);
// //     });
// // }

// // function displayResults(predictions) {
// //     const resultsContainer = document.getElementById('resultsContainer');
// //     resultsContainer.innerHTML = '';
    
// //     predictions.forEach((prediction, index) => {
// //         const card = createResultCard(prediction, index + 1);
// //         resultsContainer.appendChild(card);
// //     });
    
// //     document.getElementById('resultsSection').style.display = 'block';
    
// //     // Scroll to results
// //     document.getElementById('resultsSection').scrollIntoView({ 
// //         behavior: 'smooth',
// //         block: 'start'
// //     });
// // }

// // function createResultCard(prediction, rank) {
// //     const card = document.createElement('div');
// //     card.className = 'result-card';
    
// //     const confidenceColor = getConfidenceColor(prediction.confidence);
    
// //     card.innerHTML = `
// //         <div class="result-header">
// //             <div>
// //                 <div style="color: #999; font-size: 0.9em; margin-bottom: 5px;">
// //                     Prediction #${rank}
// //                 </div>
// //                 <div class="disease-name">${prediction.disease}</div>
// //             </div>
// //             <div style="text-align: right;">
// //                 <div class="confidence" style="color: ${confidenceColor}">
// //                     ${prediction.confidence.toFixed(2)}%
// //                 </div>
// //                 <div class="confidence-label">Confidence</div>
// //             </div>
// //         </div>
        
// //         <div class="result-section">
// //             <h3>📋 Description</h3>
// //             <p>${prediction.description}</p>
// //         </div>
        
// //         ${prediction.symptoms.length > 0 ? `
// //         <div class="result-section">
// //             <h3>🔍 Common Symptoms</h3>
// //             <ul>
// //                 ${prediction.symptoms.map(s => `<li>${s}</li>`).join('')}
// //             </ul>
// //         </div>
// //         ` : ''}
        
// //         ${prediction.causes.length > 0 ? `
// //         <div class="result-section">
// //             <h3>🧬 Possible Causes</h3>
// //             <ul>
// //                 ${prediction.causes.map(c => `<li>${c}</li>`).join('')}
// //             </ul>
// //         </div>
// //         ` : ''}
        
// //         ${prediction.treatment.length > 0 ? `
// //         <div class="result-section">
// //             <h3>💊 Treatment Options</h3>
// //             <ul>
// //                 ${prediction.treatment.map(t => `<li>${t}</li>`).join('')}
// //             </ul>
// //         </div>
// //         ` : ''}
        
// //         ${prediction.prevention.length > 0 ? `
// //         <div class="result-section">
// //             <h3>🛡️ Prevention</h3>
// //             <ul>
// //                 ${prediction.prevention.map(p => `<li>${p}</li>`).join('')}
// //             </ul>
// //         </div>
// //         ` : ''}
// //     `;
    
// //     return card;
// // }

// // function getConfidenceColor(confidence) {
// //     if (confidence >= 70) return '#28a745';
// //     if (confidence >= 50) return '#ffc107';
// //     return '#dc3545';
// // }





// let selectedFile = null;

// // File input change handler
// document.getElementById('fileInput').addEventListener('change', function (e) {
//     const file = e.target.files[0];
//     if (file) {
//         handleFileSelect(file);
//     }
// });

// // Drag and drop functionality
// const uploadBox = document.getElementById('uploadBox');

// uploadBox.addEventListener('dragover', function (e) {
//     e.preventDefault();
//     uploadBox.style.background = '#eef1ff';
// });

// uploadBox.addEventListener('dragleave', function (e) {
//     e.preventDefault();
//     uploadBox.style.background = '#f8f9ff';
// });

// uploadBox.addEventListener('drop', function (e) {
//     e.preventDefault();
//     uploadBox.style.background = '#f8f9ff';

//     const file = e.dataTransfer.files[0];
//     if (file && file.type.match('image.*')) {
//         handleFileSelect(file);
//     } else {
//         alert('Please upload a valid image file (PNG, JPG, or JPEG)');
//     }
// });

// function handleFileSelect(file) {
//     selectedFile = file;

//     const reader = new FileReader();
//     reader.onload = function (e) {
//         document.getElementById('imagePreview').src = e.target.result;
//         document.getElementById('uploadBox').style.display = 'none';
//         document.getElementById('previewSection').style.display = 'block';
//         document.getElementById('resultsSection').style.display = 'none';
//     };
//     reader.readAsDataURL(file);
// }

// function resetUpload() {
//     selectedFile = null;
//     document.getElementById('fileInput').value = '';
//     document.getElementById('uploadBox').style.display = 'block';
//     document.getElementById('previewSection').style.display = 'none';
//     document.getElementById('resultsSection').style.display = 'none';
// }

// function analyzeImage() {
//     if (!selectedFile) {
//         alert('Please select an image first');
//         return;
//     }

//     document.getElementById('loader').style.display = 'block';
//     document.getElementById('resultsSection').style.display = 'none';

//     const formData = new FormData();
//     formData.append('image', selectedFile);
//     formData.append('top_k', 3);

//     fetch('/predict', {
//         method: 'POST',
//         body: formData
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error("Server error: " + response.status);
//             }
//             return response.json();
//         })
//         .then(data => {
//             document.getElementById('loader').style.display = 'none';

//             if (data.error) {
//                 alert('Error: ' + data.error);
//                 return;
//             }

//             displayResults(data.predictions);
//         })
//         .catch(error => {
//             document.getElementById('loader').style.display = 'none';
//             console.error(error);
//             alert('An error occurred: ' + error.message);
//         });
// }

// function displayResults(predictions) {
//     const resultsContainer = document.getElementById('resultsContainer');
//     resultsContainer.innerHTML = '';

//     predictions.forEach((prediction, index) => {
//         const card = createResultCard(prediction, index + 1);
//         resultsContainer.appendChild(card);
//     });

//     document.getElementById('resultsSection').style.display = 'block';
//     document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });
// }

// function createResultCard(prediction, rank) {
//     const card = document.createElement('div');
//     card.className = 'result-card';

//     const confidenceColor = getConfidenceColor(prediction.confidence);

//     card.innerHTML = `
//         <div class="result-header">
//             <div>
//                 <div style="color:#999;font-size:0.9em">Prediction #${rank}</div>
//                 <div class="disease-name">${prediction.disease}</div>
//             </div>
//             <div style="text-align:right">
//                 <div class="confidence" style="color:${confidenceColor}">
//                     ${prediction.confidence.toFixed(2)}%
//                 </div>
//             </div>
//         </div>

//         <div class="result-section">
//             <h3>Description</h3>
//             <p>${prediction.description}</p>
//         </div>
//     `;
//     return card;
// }

// function getConfidenceColor(confidence) {
//     if (confidence >= 70) return '#28a745';
//     if (confidence >= 50) return '#ffc107';
//     return '#dc3545';
// }
let selectedFile = null;

document.getElementById('fileInput').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) handleFileSelect(file);
});

const uploadBox = document.getElementById('uploadBox');

uploadBox.addEventListener('dragover', e => {
    e.preventDefault();
    uploadBox.style.background = '#eef1ff';
});

uploadBox.addEventListener('dragleave', e => {
    e.preventDefault();
    uploadBox.style.background = '#f8f9ff';
});

uploadBox.addEventListener('drop', e => {
    e.preventDefault();
    uploadBox.style.background = '#f8f9ff';

    const file = e.dataTransfer.files[0];
    if (file && file.type.match('image.*')) handleFileSelect(file);
    else alert('Upload JPG, PNG, JPEG only');
});

function handleFileSelect(file) {
    selectedFile = file;

    const reader = new FileReader();
    reader.onload = e => {
        document.getElementById('imagePreview').src = e.target.result;
        document.getElementById('uploadBox').style.display = 'none';
        document.getElementById('previewSection').style.display = 'block';
        document.getElementById('resultsSection').style.display = 'none';
    };
    reader.readAsDataURL(file);
}

function resetUpload() {
    selectedFile = null;
    document.getElementById('fileInput').value = '';
    document.getElementById('uploadBox').style.display = 'block';
    document.getElementById('previewSection').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'none';
}

function analyzeImage() {
    if (!selectedFile) {
        alert("Please upload image");
        return;
    }

    document.getElementById('loader').style.display = 'block';
    document.getElementById('resultsSection').style.display = 'none';

    const formData = new FormData();
    formData.append('image', selectedFile);

    fetch('/predict', {
        method: 'POST',
        body: formData
    })
    .then(res => {
        if (!res.ok) throw new Error("Server error: " + res.status);
        return res.json();
    })
    .then(data => {
        document.getElementById('loader').style.display = 'none';

        if (data.error) {
            alert(data.error);
            return;
        }

        displayResults(data.predictions);
    })
    .catch(err => {
        document.getElementById('loader').style.display = 'none';
        console.error(err);
        alert("Backend error. Check Flask terminal.");
    });
}

function displayResults(predictions) {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';

    predictions.forEach((prediction, index) => {
        const card = createResultCard(prediction, index + 1);
        resultsContainer.appendChild(card);
    });

    document.getElementById('resultsSection').style.display = 'block';
    document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });
}

function createResultCard(prediction, rank) {
    const card = document.createElement('div');
    card.className = 'result-card';

    const confidenceColor = getConfidenceColor(prediction.confidence);

    card.innerHTML = `
        <div class="result-header">
            <div>
                <div style="color:#999;font-size:0.9em">Prediction #${rank}</div>
                <div class="disease-name">${prediction.disease}</div>
            </div>
            <div style="text-align:right">
                <div class="confidence" style="color:${confidenceColor}">
                    ${prediction.confidence.toFixed(2)}%
                </div>
            </div>
        </div>

        <div class="result-section">
            <h3>Description</h3>
            <p>${prediction.description}</p>
        </div>
    `;
    return card;
}

function getConfidenceColor(confidence) {
    if (confidence >= 70) return '#28a745';
    if (confidence >= 50) return '#ffc107';
    return '#dc3545';
}
