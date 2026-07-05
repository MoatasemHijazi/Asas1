const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// تحديد مجلد public ليحتوي على ملفات الواجهة (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// توجيه الزائر للصفحة الرئيسية
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// تشغيل الخادم
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});