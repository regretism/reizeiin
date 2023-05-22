const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

// ����������� � ���� ������ MongoDB
mongoose.connect('mongodb://localhost/food_diary', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// ����������� ����� ������ �������� �������
const diaryEntrySchema = new mongoose.Schema({
    meal: String,
    calories: Number,
});

// ����������� ������ ������ �������� �������
const DiaryEntry = mongoose.model('DiaryEntry', diaryEntrySchema);

app.use(express.json());

// ���������� POST-������� ��� ���������� ����� ������
app.post('/api/diary', (req, res) => {
    const { meal, calories } = req.body;

    const newEntry = new DiaryEntry({
        meal,
        calories,
    });

    newEntry.save((err) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(200).send('Entry saved successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});