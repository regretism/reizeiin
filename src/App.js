import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';

const FoodDiary = () => {
    const [selectedProduct, setSelectedProduct] = useState('');
    const [mealType, setMealType] = useState('breakfast');
    const [weight, setWeight] = useState(100);
    const [diaryEntries, setDiaryEntries] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [totalCalories, setTotalCalories] = useState(0);
    const [totalProteins, setTotalProteins] = useState(0);
    const [totalFats, setTotalFats] = useState(0);
    const [totalCarbs, setTotalCarbs] = useState(0);
    const [dailyLimit, setDailyLimit] = useState(2000);
    const [exceededLimit, setExceededLimit] = useState(false);
    const [exceededProteins, setExceededProteins] = useState(false);
    const [exceededFats, setExceededFats] = useState(false);
    const [exceededCarbs, setExceededCarbs] = useState(false);

    const products = [
        { name: 'Apple', calories: 48, proteins: 0.4 , fats: 0.0 , carbs: 11.3 },
        { name: 'Banana', calories: 87, proteins: 1.5 , fats: 0.0 , carbs: 21.8 },
        { name: 'Pear', calories: 41, proteins: 0.4, fats: 0.0 , carbs: 10.7 },
        { name: 'Peach', calories: 42, proteins: 3.0 , fats: 0.0, carbs: 68.5},
        { name: 'Chicken', calories: 161, proteins: 20.8 , fats: 8.8, carbs: 0.6 },
        { name: 'Turkey', calories: 192, proteins: 21.6, fats: 12, carbs: 0.8},
        { name: 'Beef', calories: 191, proteins: 18.9, fats: 12.4 , carbs: 0.0 },
        { name: 'Pork', calories: 318, proteins: 16.4, fats: 27.8, carbs:0.0 },
        { name: 'Sausage', calories: 260, proteins: 12.3 , fats: 25.3, carbs: 0.0 },
        { name: 'Potato', calories: 80, proteins: 2.05 , fats: 0.09, carbs: 17.49 },
        { name: 'Fried Potato', calories: 198, proteins: 3 , fats: 12.52, carbs:35.11 },
        { name: 'Eggplant', calories: 22, proteins: 1.2 , fats: 0.1, carbs: 4.5},
        { name: 'Carrot', calories: 29, proteins: 1.3 , fats: 0.1, carbs: 6.9 },
        { name: 'Onion', calories: 41, proteins: 1.4, fats: 0, carbs: 10.3 },
        { name: 'Tomato', calories: 19, proteins: 1.1 , fats: 0.2, carbs: 3.7},
        { name: 'Cucumber', calories: 15, proteins: 0.8 , fats: 0.1, carbs: 2.8 },
        { name: 'Egg', calories: 78, proteins: 12.7, fats: 10.9 , carbs: 0.7 },
        { name: 'Milk ', calories: 53, proteins: 2.8, fats: 2.5, carbs: 4.7},
        { name: 'Cheese', calories: 350, proteins: 26, fats: 26.8, carbs: 0 },
        { name: 'Yoghurt', calories: 65, proteins: 4.3, fats: 2, carbs: 6.2},
        { name: 'Oatmeal', calories: 93, proteins: 12.3 , fats: 6.1 , carbs: 59.5 },
        { name: 'Cornflakes', calories: 372, proteins: 8.3 , fats: 1.2, carbs: 75 },
        { name: 'Juice', calories: 40, proteins: 0 , fats: 0, carbs: 10},
        { name: 'Tea', calories: 41, proteins: 0.6 , fats: 0.2, carbs: 9 },
        { name: 'Soda', calories: 24, proteins: 0, fats: 0, carbs: 10},
        { name: 'Coffee', calories: 56, proteins: 0.7 , fats: 1, carbs: 11.2},
        { name: 'Butter', calories: 747, proteins: 0.7, fats: 82, carbs: 0.7},
        { name: 'Chocolate', calories: 552, proteins: 6.9, fats: 35.7, carbs: 52.4},
        { name: 'Marmalade', calories: 289, proteins: 4.3, fats: 0.1, carbs: 77.7},
        { name: 'Cookie', calories: 440, proteins: 7.5, fats: 11.8, carbs: 74.9},
        { name: 'Waffles', calories: 425, proteins: 3.2, fats: 2.8, carbs: 80.9},
        { name: 'Omelette', calories: 184, proteins: 9.6 , fats: 15.4, carbs: 1.9},
        { name: 'Borsch', calories: 36, proteins: 1.1, fats: 2.2 , carbs: 6.7},
        { name: 'Spaghetti', calories: 344, proteins: 10.4 , fats: 1.1 , carbs: 71.5},
        { name: 'Rice', calories: 344, proteins: 6.7 , fats: 0.7, carbs: 78.9},
    ];
    useEffect(() => {
        calculateTotalCalories();
        calculateTotalProteins();
        calculateTotalFats();
        calculateTotalCarbs();
    }, [diaryEntries, selectedDate]);

    useEffect(() => {
        checkDailyLimits();
    }, [totalCalories, totalProteins, totalFats, totalCarbs]);

    const handleProductChange = (event) => {
        setSelectedProduct(event.target.value);
    };

    const handleMealTypeChange = (event) => {
        setMealType(event.target.value);
    };

    const handleWeightChange = (event) => {
        setWeight(parseInt(event.target.value));
    };

    const handleAddEntry = () => {
        if (selectedProduct && weight > 0) {
            const selectedProductInfo = products.find(
                (product) => product.name === selectedProduct
            );

            if (selectedProductInfo) {
                const calories = (selectedProductInfo.calories * weight) / 100;
                const proteins = (selectedProductInfo.proteins * weight) / 100;
                const fats = (selectedProductInfo.fats * weight) / 100;
                const carbs = (selectedProductInfo.carbs * weight) / 100;

                const newEntry = {
                    id: Date.now(),
                    calories: calories.toFixed(2),
                    proteins: proteins.toFixed(2),
                    fats: fats.toFixed(2),
                    carbs: carbs.toFixed(2),
                    mealType,
                    product: selectedProduct,
                    date: selectedDate.toDateString()
                };

                setDiaryEntries([...diaryEntries, newEntry]);
                setSelectedProduct('');
                setWeight(100);
            }
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleDeleteEntry = (id) => {
        const updatedEntries = diaryEntries.filter((entry) => entry.id !== id);
        setDiaryEntries(updatedEntries);
    };

    const checkDailyLimits = () => {
        if (totalCalories > dailyLimit) {
            setExceededLimit(true);
        } else {
            setExceededLimit(false);
        }

        if (totalProteins > 100) {
            setExceededProteins(true);
        } else {
            setExceededProteins(false);
        }

        if (totalFats > 50) {
            setExceededFats(true);
        } else {
            setExceededFats(false);
        }

        if (totalCarbs > 120) {
            setExceededCarbs(true);
        } else {
            setExceededCarbs(false);
        }
    };

    const calculateTotalCalories = () => {
        const entriesForSelectedDate = diaryEntries.filter(
            (entry) => entry.date === selectedDate.toDateString()
        );

        const total = entriesForSelectedDate.reduce(
            (acc, entry) => acc + parseFloat(entry.calories),
            0
        );

        setTotalCalories(total.toFixed(2));
    };

    const calculateTotalProteins = () => {
        const entriesForSelectedDate = diaryEntries.filter(
            (entry) => entry.date === selectedDate.toDateString()
        );

        const total = entriesForSelectedDate.reduce(
            (acc, entry) => acc + parseFloat(entry.proteins),
            0
        );

        setTotalProteins(total.toFixed(2));
    };

    const calculateTotalFats = () => {
        const entriesForSelectedDate = diaryEntries.filter(
            (entry) => entry.date === selectedDate.toDateString()
        );

        const total = entriesForSelectedDate.reduce(
            (acc, entry) => acc + parseFloat(entry.fats),
            0
        );

        setTotalFats(total.toFixed(2));
    };

    const calculateTotalCarbs = () => {
        const entriesForSelectedDate = diaryEntries.filter(
            (entry) => entry.date === selectedDate.toDateString()
        );

        const total = entriesForSelectedDate.reduce(
            (acc, entry) => acc + parseFloat(entry.carbs),
            0
        );

        setTotalCarbs(total.toFixed(2));
    };

    const filteredEntries = diaryEntries.filter(
        (entry) => entry.date === selectedDate.toDateString()
    );

    return (
        <div className="food-diary-container">
            <h1 className="heading">Food Diary</h1>
            <div className="form-group">
                <label htmlFor="product" className="label">
                    Product:
                </label>
                <select
                    id="product"
                    value={selectedProduct}
                    onChange={handleProductChange}
                    className="select"
                >
                    <option value="">Select a product</option>
                    {products.map((product, index) => (
                        <option key={index} value={product.name}>
                            {product.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="mealType" className="label">
                    Meal Type:
                </label>
                <select
                    id="mealType"
                    value={mealType}
                    onChange={handleMealTypeChange}
                    className="select"
                >
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="weight" className="label">
                    Weight (g):
                </label>
                <input
                    id="weight"
                    type="number"
                    value={weight}
                    onChange={handleWeightChange}
                    className="input"
                />
            </div>
            <div className="form-group">
                <label htmlFor="date" className="label">
                    Select Date:
                </label>
                <Calendar onChange={handleDateChange} value={selectedDate} className="calendar" />
            </div>
            <button onClick={handleAddEntry} className="button">Add Entry</button>
            <h2 className="sub-heading">Diary Entries for {selectedDate.toDateString()}:</h2>
            {filteredEntries.length === 0 ? (
                <p className="no-entries">No entries for this date.</p>
            ) : (
                <ul className="entries-list">
                    {filteredEntries.map((entry) => (
                        <li key={entry.id} className="entry-item">
                            <strong>{entry.calories}</strong> calories ({entry.mealType}) - {entry.product}
                            <button style={{ backgroundColor: '#f44336', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: '10px' }} onClick={() => handleDeleteEntry(entry.id)}onClick={() => handleDeleteEntry(entry.id)} className="delete-button">Delete</button>
                        </li>
                    ))}
                </ul>
            )}
            <h2 className="sub-heading">Total Nutrition for {selectedDate.toDateString()}:</h2>
            <p className="total-calories">Total Calories: {totalCalories} calories</p>
            <p className="total-nutrition">Total Proteins: {totalProteins} g</p>
            <p className="total-nutrition">Total Fats: {totalFats} g</p>
            <p className="total-nutrition">Total Carbs: {totalCarbs} g</p>
            {exceededLimit && (
                <p style={{ color: 'red', fontSize: '20px', fontWeight: 'bold' }} className="exceeded-limit">
                    Daily calorie limit exceeded! Limit: {dailyLimit} calories
                </p>
            )}
            {exceededProteins && (
                <p style={{ color: 'red', fontSize: '20px', fontWeight: 'bold' }} className="exceeded-limit">
                    Daily protein limit exceeded! Limit: 100g
                </p>
            )}
            {exceededFats && (
                <p style={{ color: 'red', fontSize: '20px', fontWeight: 'bold' }} className="exceeded-limit">
                    Daily fat limit exceeded! Limit: 50g
                </p>
            )}
            {exceededCarbs && (
                <p style={{ color: 'red', fontSize: '20px', fontWeight: 'bold' }} className="exceeded-limit">
                    Daily carbohydrate limit exceeded! Limit: 120g
                </p>
            )}
        </div>
    );
};

export default FoodDiary;
