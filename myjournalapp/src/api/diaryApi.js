const API_URL = 'http://localhost:3000/api/'; // Замените на актуальный URL вашего backend

// Функция для сохранения записи в дневник
export const saveDiaryEntry = async (entryData) => {
  try {
    const response = await fetch(`${API_URL}posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entryData),
    });

    if (!response.ok) {
      throw new Error('Ошибка при сохранении записи в дневник');
    }

    return await response.json(); // Возвращает данные из ответа
  } catch (error) {
    console.error('Ошибка при запросе:', error);
    throw error;
  }
};

// Функция для загрузки изображения
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch(`${API_URL}image/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Ошибка при загрузке изображения');
    }

    return await response.json(); // Возвращаем данные из ответа (например, URL изображения)
  } catch (error) {
    console.error('Ошибка при запросе загрузки изображения:', error);
    throw error;
  }
};
