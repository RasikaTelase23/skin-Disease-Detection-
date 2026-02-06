
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import numpy as np
import tensorflow as tf
import config
from src.data_preprocessing import load_and_preprocess_image
from src.utils import load_class_indices, load_disease_info, get_disease_info

class SkinDiseasePredictor:
    def __init__(self, model_path=config.MODEL_PATH, 
                 class_indices_path=config.CLASS_INDICES_PATH,
                 disease_info_path=config.DISEASE_INFO_PATH):
        """
        Initialize the predictor
        """
        self.model_path = model_path
        self.class_indices_path = class_indices_path
        self.disease_info_path = disease_info_path
        
        # Load model
        print("Loading model...")
        self.model = tf.keras.models.load_model(model_path)
        print("Model loaded successfully!")
        
        # Load class indices
        print("Loading class indices...")
        class_indices = load_class_indices(class_indices_path)
        # Reverse the dictionary to get index -> class_name mapping
        self.class_names = {v: k for k, v in class_indices.items()}
        print(f"Loaded {len(self.class_names)} disease classes")
        
        # Load disease information
        print("Loading disease information...")
        self.disease_info = load_disease_info(disease_info_path)
        print("Disease information loaded successfully!")
    
    def predict(self, image_path, top_k=3):
        """
        Predict the disease from an image
        
        Args:
            image_path: Path to the image file
            top_k: Number of top predictions to return
            
        Returns:
            Dictionary with predictions and disease information
        """
        # Load and preprocess image
        img_array = load_and_preprocess_image(
            image_path, 
            config.IMG_HEIGHT, 
            config.IMG_WIDTH
        )
        
        # Make prediction
        predictions = self.model.predict(img_array, verbose=0)
        
        # Get top k predictions
        top_k_indices = np.argsort(predictions[0])[-top_k:][::-1]
        
        results = []
        for idx in top_k_indices:
            disease_name = self.class_names[idx]
            confidence = float(predictions[0][idx]) * 100
            
            # Get disease information
            disease_data = get_disease_info(disease_name, self.disease_info)
            
            results.append({
                'disease': disease_name,
                'confidence': confidence,
                'description': disease_data.get('description', 'N/A'),
                'symptoms': disease_data.get('symptoms', []),
                'causes': disease_data.get('causes', []),
                'treatment': disease_data.get('treatment', []),
                'prevention': disease_data.get('prevention', [])
            })
        
        return results
    
    def print_prediction(self, results):
        """
        Print prediction results in a formatted way
        """
        print("\n" + "=" * 80)
        print("SKIN DISEASE DETECTION RESULTS")
        print("=" * 80)
        
        for i, result in enumerate(results, 1):
            print(f"\n{'#' * 80}")
            print(f"PREDICTION #{i}")
            print(f"{'#' * 80}")
            print(f"\nDisease: {result['disease']}")
            print(f"Confidence: {result['confidence']:.2f}%")
            print(f"\nDescription:")
            print(f"  {result['description']}")
            
            if result['symptoms']:
                print(f"\nSymptoms:")
                for symptom in result['symptoms']:
                    print(f"  • {symptom}")
            
            if result['causes']:
                print(f"\nCauses:")
                for cause in result['causes']:
                    print(f"  • {cause}")
            
            if result['treatment']:
                print(f"\nTreatment Options:")
                for treatment in result['treatment']:
                    print(f"  • {treatment}")
            
            if result['prevention']:
                print(f"\nPrevention:")
                for prevention in result['prevention']:
                    print(f"  • {prevention}")
        
        print("\n" + "=" * 80)
        print("DISCLAIMER: This is an AI prediction and should not replace")
        print("professional medical diagnosis. Please consult a dermatologist")
        print("for accurate diagnosis and treatment.")
        print("=" * 80)

def main():
    """
    Main function for command-line prediction
    """
    import argparse
    
    parser = argparse.ArgumentParser(description='Predict skin disease from image')
    parser.add_argument('image_path', type=str, help='Path to the image file')
    parser.add_argument('--top-k', type=int, default=3, 
                       help='Number of top predictions to show (default: 3)')
    
    args = parser.parse_args()
    
    # Check if image exists
    if not os.path.exists(args.image_path):
        print(f"Error: Image file '{args.image_path}' not found!")
        return
    
    # Create predictor
    predictor = SkinDiseasePredictor()
    
    # Make prediction
    print(f"\nAnalyzing image: {args.image_path}")
    results = predictor.predict(args.image_path, top_k=args.top_k)
    
    # Print results
    predictor.print_prediction(results)

if __name__ == "__main__":
    main()
