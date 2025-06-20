import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import torch
from transformers import PatchTSTConfig, PatchTSTForPrediction
from sklearn.preprocessing import StandardScaler
import yfinance as yf
from datetime import datetime, timedelta
import os
import warnings

# Suppress warnings
warnings.filterwarnings("ignore")

# Constants matching training configuration
CONTEXT_LENGTH = 60  # Should match training
PREDICTION_LENGTH = 1  # Single-step prediction
MODEL_PATH = r"D:\Draft\patchtst_model_final.pt"  # Đường dẫn chính xác đến file model


@st.cache_resource
def load_model():
    if not os.path.exists(MODEL_PATH):
        st.error(f"Model file not found at: {MODEL_PATH}")
        return None, None, None
    
    try:
        # Configuration must match training exactly
        config = PatchTSTConfig(
            context_length=CONTEXT_LENGTH,
            prediction_length=PREDICTION_LENGTH,
            patch_len=10,
            stride=10,
            d_model=64,
            num_layers=2,
            num_heads=2,
            dropout=0.1,
            target_dim=1,
        )
        model = PatchTSTForPrediction(config)
        
        # Load model weights
        state_dict = torch.load(MODEL_PATH, map_location='cpu')
        
        # Handle projection layer size mismatch if needed
        if 'head.projection.weight' in state_dict:
            if state_dict['head.projection.weight'].shape[0] != PREDICTION_LENGTH:
                st.warning("Adjusting projection layer weights to match prediction length")
                state_dict['head.projection.weight'] = state_dict['head.projection.weight'].repeat(PREDICTION_LENGTH, 1)
                state_dict['head.projection.bias'] = state_dict['head.projection.bias'].repeat(PREDICTION_LENGTH)
        
        model.load_state_dict(state_dict, strict=False)
        device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        return model.to(device), StandardScaler(), device
    
    except Exception as e:
        st.error(f"Failed to load model: {str(e)}")
        return None, None, None

def predict_autoregressive(model, initial_context, prediction_steps, scaler, device):
    model.eval()
    context = list(initial_context.copy())
    preds = []
    
    for _ in range(prediction_steps):
        input_seq = torch.tensor(context[-CONTEXT_LENGTH:], dtype=torch.float32)
        input_seq = input_seq.reshape(1, CONTEXT_LENGTH, 1).to(device)
        
        with torch.no_grad():
            output = model(past_values=input_seq)
            pred = output.prediction_outputs[0, 0, 0].cpu().item()
        
        preds.append(pred)
        context.append(pred)
    
    preds_array = np.array(preds).reshape(-1, 1)
    return scaler.inverse_transform(preds_array).flatten()

# Streamlit UI
st.set_page_config(page_title="Stock Price Predictor", layout="wide")
st.title("📈 AI Stock Price Prediction")

# Sidebar controls
with st.sidebar:
    st.header("Parameters")
    ticker = st.text_input("Stock Ticker", "AAPL").upper()
    end_date = st.date_input("End Date", datetime.now())
    start_date = st.date_input("Start Date", end_date - timedelta(days=365))
    prediction_days = st.slider("Prediction Days", 1, 30, 7)
    st.markdown("---")
    st.markdown(f"Model Config: Context={CONTEXT_LENGTH} days, Prediction={PREDICTION_LENGTH} step")

# Main content
try:
    # Get stock data
    df = yf.download(ticker, start=start_date, end=end_date, progress=False)
    
    if df.empty:
        st.error("No data found for this stock ticker!")
        st.stop()
    
    prices = df['Close'].values.astype(float)
    dates = df.index
    
    # Load model
    model, scaler, device = load_model()
    
    # Chỉ tiếp tục nếu model được load thành công
    if model is None:
        st.error("Cannot make predictions without model. Please check model file path.")
        st.stop()
    
    # Scale data
    scaler.fit(prices.reshape(-1, 1))
    scaled_prices = scaler.transform(prices.reshape(-1, 1)).flatten()
    context = scaled_prices[-CONTEXT_LENGTH:]
    
    # Make predictions (autoregressive)
    preds = predict_autoregressive(model, context, prediction_days, scaler, device)
    
    # Generate prediction dates
    last_date = dates[-1]
    pred_dates = [last_date + timedelta(days=i) for i in range(1, prediction_days+1)]
    
    # Plot results
    fig, ax = plt.subplots(figsize=(12, 6))
    ax.plot(dates[-CONTEXT_LENGTH:], prices[-CONTEXT_LENGTH:], label='Historical Prices', color='blue')
    ax.plot(pred_dates, preds, label='Predicted Prices', color='red', linestyle='--')
    ax.axvline(last_date, color='gray', linestyle=':')
    ax.set_title(f"{ticker} {prediction_days}-Day Prediction")
    ax.set_xlabel("Date")
    ax.set_ylabel("Price ($)")
    ax.legend()
    ax.grid(True)
    st.pyplot(fig)
    
    # Show prediction table
    st.subheader("Prediction Details")
    pred_df = pd.DataFrame({
        "Date": pred_dates,
        "Predicted Price": preds,
        "Daily Change (%)": np.concatenate([[0], np.diff(preds)/preds[:-1]*100])
    })
    st.dataframe(pred_df.style.format({
        "Predicted Price": "${:.2f}", 
        "Daily Change (%)": "{:.2f}%"
    }))

except Exception as e:
    st.error(f"An error occurred: {str(e)}")