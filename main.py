import tkinter as tk
from tkinter import ttk, messagebox
import pandas as pd
import pickle
import numpy as np

# Load the trained model
with open('house_price_model.pkl', 'rb') as file:
    model = pickle.load(file)

# Function to make prediction
def predict_house_price():
    try:
        # Read inputs from the user
        area = int(entry_area.get())
        bedrooms = int(entry_bedrooms.get())
        new_resale = int(entry_new_resale.get())
        gymnasium = int(entry_gymnasium.get())
        lift = int(entry_lift.get())
        car_parking = int(entry_car_parking.get())
        maintenance_staff = int(entry_maintenance_staff.get())
        security = int(entry_security.get())
        play_area = int(entry_play_area.get())
        clubhouse = int(entry_clubhouse.get())
        intercom = int(entry_intercom.get())
        gardens = int(entry_gardens.get())
        indoor_games = int(entry_indoor_games.get())
        gas_connection = int(entry_gas_connection.get())
        jogging_track = int(entry_jogging_track.get())
        swimming_pool = int(entry_swimming_pool.get())
        location = combo_location.get()

        # Prepare the input data for prediction
        input_data = {
            'Area': [area],
            'No. of Bedrooms': [bedrooms],
            'New/Resale': [new_resale],
            'Gymnasium': [gymnasium],
            'Lift Available': [lift],
            'Car Parking': [car_parking],
            'Maintenance Staff': [maintenance_staff],
            '24x7 Security': [security],
            'Children\'s Play Area': [play_area],
            'Clubhouse': [clubhouse],
            'Intercom': [intercom],
            'Landscaped Gardens': [gardens],
            'Indoor Games': [indoor_games],
            'Gas Connection': [gas_connection],
            'Jogging Track': [jogging_track],
            'Swimming Pool': [swimming_pool]
        }
        
        # Add location columns with zero values
        for col in model.feature_names_in_:
            if 'Location_' in col:
                input_data[col] = [0]
        
        # Set the appropriate location column to 1
        location_col = 'Location_' + location
        if location_col in input_data:
            input_data[location_col] = [1]
        else:
            messagebox.showerror("Error", "Invalid location")
            return

        # Convert the input data to a DataFrame
        input_df = pd.DataFrame(input_data)
        
        # Make a prediction
        prediction = model.predict(input_df)
        
        # Show the prediction result
        result.set(f"The predicted house price is: {prediction[0]:.2f}")
    except Exception as e:
        messagebox.showerror("Error", str(e))

# Create the main window
root = tk.Tk()
root.title("House Price Prediction")

# Create and place labels and entries for inputs
labels = ["Area", "No. of Bedrooms", "New/Resale (1 for New, 0 for Resale)", "Gymnasium (1/0)",
          "Lift Available (1/0)", "Car Parking (1/0)", "Maintenance Staff (1/0)", "24x7 Security (1/0)",
          "Children's Play Area (1/0)", "Clubhouse (1/0)", "Intercom (1/0)", "Landscaped Gardens (1/0)",
          "Indoor Games (1/0)", "Gas Connection (1/0)", "Jogging Track (1/0)", "Swimming Pool (1/0)", "Location"]
entries = []

for i, label in enumerate(labels):
    lbl = ttk.Label(root, text=label)
    lbl.grid(row=i, column=0, padx=10, pady=5)
    if label == "Location":
        combo_location = ttk.Combobox(root, values=[col.replace('Location_', '') for col in model.feature_names_in_ if 'Location_' in col])
        combo_location.grid(row=i, column=1, padx=10, pady=5)
    else:
        entry = ttk.Entry(root)
        entry.grid(row=i, column=1, padx=10, pady=5)
        entries.append(entry)

entry_area, entry_bedrooms, entry_new_resale, entry_gymnasium, entry_lift, entry_car_parking, \
entry_maintenance_staff, entry_security, entry_play_area, entry_clubhouse, entry_intercom, \
entry_gardens, entry_indoor_games, entry_gas_connection, entry_jogging_track, entry_swimming_pool = entries

# Variable to store the result
result = tk.StringVar()

# Create and place the predict button and result label
btn_predict = ttk.Button(root, text="Predict", command=predict_house_price)
btn_predict.grid(row=len(labels), column=0, columnspan=2, pady=10)

lbl_result = ttk.Label(root, textvariable=result)
lbl_result.grid(row=len(labels)+1, column=0, columnspan=2, pady=10)

# Run the main event loop
root.mainloop()
