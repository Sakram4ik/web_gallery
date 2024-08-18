$(document).ready(function() {
    const showcaseId = $('header h1').text().split(' ')[1]; // Отримуємо номер вітрини з заголовка

    // Завантаження даних з локального сховища
    loadProductData(showcaseId);

    // Оновлення зображення
    $('#updateForm').on('submit', function(event) {
        event.preventDefault();
        const imageUrl = $('#imageUrl').val();
        $('#productImage').attr('src', imageUrl);
        saveProductData(showcaseId);
    });

    // Збереження даних при зміні тексту
    $('#productTitle, #productDescription').on('input', function() {
        saveProductData(showcaseId);
    });

    // Збереження даних у локальному сховищі
    function saveProductData(id) {
        const productData = {
            imageUrl: $('#productImage').attr('src'),
            title: $('#productTitle').text(),
            description: $('#productDescription').text()
        };
        localStorage.setItem(`productData_${id}`, JSON.stringify(productData));
    }

    // Завантаження даних з локального сховища
    function loadProductData(id) {
        const productData = JSON.parse(localStorage.getItem(`productData_${id}`)) || {
            imageUrl: 'https://via.placeholder.com/300',
            title: 'Назва продукту',
            description: 'Опис продукту'
        };
        $('#productImage').attr('src', productData.imageUrl);
        $('#productTitle').text(productData.title);
        $('#productDescription').text(productData.description);
    }
});
