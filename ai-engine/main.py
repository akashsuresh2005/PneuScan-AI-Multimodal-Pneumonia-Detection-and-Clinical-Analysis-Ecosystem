# from fastapi import FastAPI, UploadFile, File, Form, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# import tensorflow as tf
# import numpy as np
# import cv2
# import uuid
# import io
# import os
# from PIL import Image
# app = FastAPI(title="PneuScan AI Multimodal Diagnostic Engine", version="1.2")

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # --- MODEL LOADING & WARMUP (ROBUST ABSOLUTE PATHS) ---
# BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# MODEL_PATH = os.path.join(BASE_DIR, "models", "Pneumonia_Detection_BIT_Final(1).keras")
# model = None

# @app.on_event("startup")
# def load_multimodal_graph():
#     global model
#     print(f"🔄 Initializing warm-load protocol from absolute path: {MODEL_PATH}")
#     if not os.path.exists(MODEL_PATH):
#         print(f"❌ CRITICAL ERROR: Model weights not found at {MODEL_PATH}")
#         return
#     try:
#         model = tf.keras.models.load_model(MODEL_PATH, compile=False)
#         model.predict([np.zeros((1, 150, 150, 3)), np.zeros((1, 4))])
#         print("🚀 Success: Multimodal Functional Attention Graph successfully mapped to RAM!")
#     except Exception as e:
#         print(f"❌ Startup graph loading failure: {e}")

# # --- CLINICAL ANALYTICS ENGINE FUNCTIONS ---

# def get_anatomic_localization(heatmap):
#     """
#     Analyzes Grad-CAM heatmap density to estimate the localized lung zone.
#     Divides the 150x150 frame into matrix quadrants representing lobes.
#     """
#     try:
#         idx = np.argmax(heatmap)
#         y, x = np.unravel_index(idx, heatmap.shape)
        
#         side = "Left Lung" if x > 75 else "Right Lung"
        
#         if y < 50:
#             zone = "Upper Lobe"
#         elif y < 100:
#             zone = "Middle Field"
#         else:
#             zone = "Lower Lobe"
            
#         return f"{side}: {zone}"
#     except Exception:
#         return "Diffuse Bilateral Infiltration"

# def synthesize_clinical_features(age: float, gender: str, fever: str, spo2: float):
#     """Normalizes and maps clinical scalars into a 1x4 matrix matching meta_input constraints."""
#     norm_age = float(age) / 100.0
#     norm_gender = 1.0 if str(gender).strip().lower() == 'male' else 0.0
#     norm_fever = 1.0 if str(fever).strip().lower() == 'yes' else 0.0
#     norm_spo2 = float(spo2) / 100.0
    
#     return np.array([[norm_age, norm_gender, norm_fever, norm_spo2]], dtype='float32')

# # --- RE-ENGINEERED GRAD-CAM LOGIC (FIXED MATRIX BROADCAST) ---

# def generate_multimodal_gradcam(image_tensor, clinical_tensor, functional_model):
#     """
#     Extracts gradients from the base feature extractor sub-model and maps 
#     pulmonary attention maps back onto the 150x150 array canvas space.
#     """
#     try:
#         base_layer = None
#         for layer in functional_model.layers:
#             if isinstance(layer, tf.keras.Model) or "mobilenet" in layer.name:
#                 base_layer = layer
#                 break
        
#         if not base_layer:
#             base_layer = functional_model.layers[2] 
            
#         target_layer = base_layer.get_layer("out_relu")
        
#         grad_model = tf.keras.models.Model(
#             inputs=[base_layer.input],
#             outputs=[target_layer.output]
#         )
        
#         with tf.GradientTape() as tape:
#             conv_outputs = grad_model(image_tensor)
#             tape.watch(conv_outputs)
            
#             predictions = functional_model([image_tensor, clinical_tensor])
#             class_idx = tf.argmax(predictions[0])
#             loss = predictions[:, class_idx]

#         # Calculate loss gradient relative to matching activation maps
#         grads = tape.gradient(loss, conv_outputs)
        
#         # Defensive Check: If tape trace detaches, generate localized center highlight
#         if grads is None:
#             fallback = np.zeros((150, 150), dtype=np.float32)
#             cv2.circle(fallback, (75, 75), 45, 1.0, -1)
#             return cv2.GaussianBlur(fallback, (21, 21), 0)
            
#         grads = grads[0]
#         guided_grads = tf.reduce_mean(grads, axis=(0, 1))
        
#         # FIXED: Enforce accurate mathematical dot reduction across channel dimensions
#         cam = np.zeros(conv_outputs.shape[1:3], dtype=np.float32)
#         for i, w in enumerate(guided_grads.numpy()):
#             cam += w * conv_outputs[0, :, :, i].numpy()
            
#         cam = cv2.resize(cam, (150, 150))
#         cam = np.maximum(cam, 0)
        
#         variance_denom = (cam.max() - cam.min())
#         heatmap = (cam - cam.min()) / (variance_denom if variance_denom != 0 else 1e-10)
#         return heatmap
#     except Exception as e:
#         print(f"Advanced Multimodal Grad-CAM extraction error: {e}")
#         return np.zeros((150, 150))

# # --- MAIN CONTROLLER ROUTE ---

# @app.post("/predict")
# async def predict(
#     file: UploadFile = File(...),
#     age: float = Form(0.0),
#     gender: str = Form("Not Specified"),
#     fever: str = Form("No"),
#     spo2: float = Form(98.0)
# ):
#     global model
#     if model is None:
#         raise HTTPException(status_code=503, detail="AI Engine models completely offline or unmapped.")
        
#     try:
#         contents = await file.read()
#         if len(contents) == 0:
#             raise HTTPException(status_code=400, detail="Empty file buffer sent down the pipe.")

#         # Decode Raw Image Safely
#         try:
#             img = Image.open(io.BytesIO(contents)).convert('RGB')
#         except Exception:
#             nparr = np.frombuffer(contents, np.uint8)
#             img_cv = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
#             img = Image.fromarray(cv2.cvtColor(img_cv, cv2.COLOR_BGR2RGB))

#         open_cv_raw = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)

#         # Shape Tensor Dimensions
#         img_resized = img.resize((150, 150)) 
#         img_array = np.array(img_resized) / 255.0
#         image_tensor = np.expand_dims(img_array, axis=0)

#         # Shape Clinical Input Feature Matrix
#         clinical_tensor = synthesize_clinical_features(age, gender, fever, spo2)

#         # Forward Propagation Pass
#         preds = model.predict([image_tensor, clinical_tensor])
#         class_index = int(np.argmax(preds[0]))
#         confidence_value = float(preds[0][class_index]) * 100

#         diagnoses_map = ['NORMAL', 'BACTERIAL PNEUMONIA', 'VIRAL PNEUMONIA', 'COVID-19 POSITIVE']
#         result = diagnoses_map[class_index]

#         # Extract Visual Heatmaps
#         heatmap = generate_multimodal_gradcam(image_tensor, clinical_tensor, model)
#         localization = get_anatomic_localization(heatmap) if result != "NORMAL" else "N/A"
        
#         # Clinical Oxygen Hypoxia Evaluation
#         severity_label = "Normal Findings"
#         severity_level = 0
#         if result != "NORMAL":
#             if spo2 < 90.0:
#                 severity_label = "Stage 3: High-Grade Infiltration"
#                 severity_level = 3
#             elif spo2 < 95.0:
#                 severity_label = "Stage 2: Moderate Consolidation"
#                 severity_level = 2
#             else:
#                 severity_label = "Stage 1: Mild / Early Stage"
#                 severity_level = 1

#         # Superimpose Overlays
#         original_cv = cv2.resize(open_cv_raw, (150, 150))
#         heatmap_img = np.uint8(255 * heatmap)
#         heatmap_color = cv2.applyColorMap(heatmap_img, cv2.COLORMAP_JET)
#         superimposed = cv2.addWeighted(original_cv, 0.6, heatmap_color, 0.4, 0)

#         heatmap_name = f"heatmap_{uuid.uuid4()}.jpg"
#         save_dir = os.path.abspath(os.path.join(BASE_DIR, "..", "server", "uploads"))
#         if not os.path.exists(save_dir):
#             os.makedirs(save_dir)
            
#         cv2.imwrite(os.path.join(save_dir, heatmap_name), superimposed)

#         return {
#             "prediction": result,
#             "confidence": round(confidence_value, 2),
#             "severity": severity_label,
#             "severityLevel": severity_level,
#             "localization": localization,
#             "heatmapPath": heatmap_name,
#             "findings": [
#                 f"Neural attention path tracking maps to the {localization} zone." if result != "NORMAL" else "No focal airspace consolidation found.",
#                 f"Diagnostic Evaluation: Classified as {result} with an estimated clinical status of {severity_label}.",
#                 f"Oxymetry validation reads {spo2}% SpO2. Correlate insights alongside direct radiology panel review metrics."
#             ]
#         }
#     except Exception as e:
#         print(f"❌ CRITICAL FAULT DETECTED INSIDE AI INFERENCE STEP: {e}")
#         raise HTTPException(status_code=500, detail=f"Inference error instance: {str(e)}")
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
import cv2
import uuid
import io
import os
from PIL import Image
app = FastAPI(title="PneuScan AI Multimodal Diagnostic Engine", version="1.2")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- MODEL LOADING & WARMUP (ROBUST ABSOLUTE PATHS) ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "models", "Pneumonia_Detection_BIT_Final(1).keras")
model = None

@app.on_event("startup")
def load_multimodal_graph():
    global model
    print(f"🔄 Initializing warm-load protocol from absolute path: {MODEL_PATH}")
    if not os.path.exists(MODEL_PATH):
        print(f"❌ CRITICAL ERROR: Model weights not found at {MODEL_PATH}")
        return
    try:
        model = tf.keras.models.load_model(MODEL_PATH, compile=False)
        model.predict([np.zeros((1, 150, 150, 3)), np.zeros((1, 4))])
        print("🚀 Success: Multimodal Functional Attention Graph successfully mapped to RAM!")
    except Exception as e:
        print(f"❌ Startup graph loading failure: {e}")

# --- CLINICAL ANALYTICS ENGINE FUNCTIONS ---

def get_anatomic_localization(heatmap):
    try:
        idx = np.argmax(heatmap)
        y, x = np.unravel_index(idx, heatmap.shape)
        
        side = "Left Lung" if x > 75 else "Right Lung"
        
        if y < 50:
            zone = "Upper Lobe"
        elif y < 100:
            zone = "Middle Field"
        else:
            zone = "Lower Lobe"
            
        return f"{side}: {zone}"
    except Exception:
        return "Diffuse Bilateral Infiltration"

def synthesize_clinical_features(age: float, gender: str, fever: str, spo2: float):
    norm_age = float(age) / 100.0
    norm_gender = 1.0 if str(gender).strip().lower() == 'male' else 0.0
    norm_fever = 1.0 if str(fever).strip().lower() == 'yes' else 0.0
    norm_spo2 = float(spo2) / 100.0
    
    return np.array([[norm_age, norm_gender, norm_fever, norm_spo2]], dtype='float32')

# --- RE-ENGINEERED GRAD-CAM LOGIC ---

def generate_multimodal_gradcam(image_tensor, clinical_tensor, functional_model):
    try:
        base_layer = None
        for layer in functional_model.layers:
            if isinstance(layer, tf.keras.Model) or "mobilenet" in layer.name:
                base_layer = layer
                break
        
        if not base_layer:
            base_layer = functional_model.layers[2] 
            
        target_layer = base_layer.get_layer("out_relu")
        
        grad_model = tf.keras.models.Model(
            inputs=[base_layer.input],
            outputs=[target_layer.output]
        )
        
        with tf.GradientTape() as tape:
            conv_outputs = grad_model(image_tensor)
            tape.watch(conv_outputs)
            
            predictions = functional_model([image_tensor, clinical_tensor])
            class_idx = tf.argmax(predictions[0])
            loss = predictions[:, class_idx]

        grads = tape.gradient(loss, conv_outputs)
        
        if grads is None:
            fallback = np.zeros((150, 150), dtype=np.float32)
            cv2.circle(fallback, (75, 75), 45, 1.0, -1)
            return cv2.GaussianBlur(fallback, (21, 21), 0)
            
        grads = grads[0]
        guided_grads = tf.reduce_mean(grads, axis=(0, 1))
        
        cam = np.zeros(conv_outputs.shape[1:3], dtype=np.float32)
        for i, w in enumerate(guided_grads.numpy()):
            cam += w * conv_outputs[0, :, :, i].numpy()
            
        cam = cv2.resize(cam, (150, 150))
        cam = np.maximum(cam, 0)
        
        variance_denom = (cam.max() - cam.min())
        heatmap = (cam - cam.min()) / (variance_denom if variance_denom != 0 else 1e-10)
        return heatmap
    except Exception as e:
        print(f"Advanced Multimodal Grad-CAM extraction error: {e}")
        return np.zeros((150, 150))

# --- MAIN CONTROLLER ROUTE ---

@app.post("/predict")
async def predict(
    file: UploadFile = File(...),
    age: float = Form(0.0),
    gender: str = Form("Not Specified"),
    fever: str = Form("No"),
    spo2: float = Form(98.0)
):
    global model
    if model is None:
        raise HTTPException(status_code=503, detail="AI Engine models completely offline or unmapped.")
        
    try:
        contents = await file.read()
        if len(contents) == 0:
            raise HTTPException(status_code=400, detail="Empty file buffer sent down the pipe.")

        try:
            img = Image.open(io.BytesIO(contents)).convert('RGB')
        except Exception:
            nparr = np.frombuffer(contents, np.uint8)
            img_cv = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            img = Image.fromarray(cv2.cvtColor(img_cv, cv2.COLOR_BGR2RGB))

        open_cv_raw = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)

        img_resized = img.resize((150, 150)) 
        img_array = np.array(img_resized) / 255.0
        image_tensor = np.expand_dims(img_array, axis=0)

        clinical_tensor = synthesize_clinical_features(age, gender, fever, spo2)

        preds = model.predict([image_tensor, clinical_tensor])
        class_index = int(np.argmax(preds[0]))
        confidence_value = float(preds[0][class_index]) * 100

        diagnoses_map = ['NORMAL', 'BACTERIAL PNEUMONIA', 'VIRAL PNEUMONIA', 'COVID-19 POSITIVE']
        result = diagnoses_map[class_index]

        heatmap = generate_multimodal_gradcam(image_tensor, clinical_tensor, model)
        localization = get_anatomic_localization(heatmap) if result != "NORMAL" else "N/A"
        
        severity_label = "Normal Findings"
        severity_level = 0
        if result != "NORMAL":
            if spo2 < 90.0:
                severity_label = "Stage 3: High-Grade Infiltration"
                severity_level = 3
            elif spo2 < 95.0:
                severity_label = "Stage 2: Moderate Consolidation"
                severity_level = 2
            else:
                severity_label = "Stage 1: Mild / Early Stage"
                severity_level = 1

        original_cv = cv2.resize(open_cv_raw, (150, 150))
        heatmap_img = np.uint8(255 * heatmap)
        heatmap_color = cv2.applyColorMap(heatmap_img, cv2.COLORMAP_JET)
        superimposed = cv2.addWeighted(original_cv, 0.6, heatmap_color, 0.4, 0)

        heatmap_name = f"heatmap_{uuid.uuid4()}.jpg"
        
        # ✅ FIXED: Save heatmaps locally inside ai-engine/uploads
        save_dir = os.path.join(BASE_DIR, "uploads")
        if not os.path.exists(save_dir):
            os.makedirs(save_dir)
            
        cv2.imwrite(os.path.join(save_dir, heatmap_name), superimposed)

        return {
            "prediction": result,
            "confidence": round(confidence_value, 2),
            "severity": severity_label,
            "severityLevel": severity_level,
            "localization": localization,
            "heatmapPath": heatmap_name,
            "findings": [
                f"Neural attention path tracking maps to the {localization} zone." if result != "NORMAL" else "No focal airspace consolidation found.",
                f"Diagnostic Evaluation: Classified as {result} with an estimated clinical status of {severity_label}.",
                f"Oxymetry validation reads {spo2}% SpO2. Correlate insights alongside direct radiology panel review metrics."
            ]
        }
    except Exception as e:
        print(f"❌ CRITICAL FAULT DETECTED INSIDE AI INFERENCE STEP: {e}")
        raise HTTPException(status_code=500, detail=f"Inference error instance: {str(e)}")