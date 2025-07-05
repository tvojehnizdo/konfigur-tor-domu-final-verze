window.addEventListener('DOMContentLoaded', () => {
  const dispositionCards = document.getElementById('disposition-cards');
  const areaInput = document.getElementById('area');
  const deliverySelect = document.getElementById('delivery');
  const shapeSelect = document.getElementById('shape');
  const roofSelect = document.getElementById('roof');
  const floorsSelect = document.getElementById('floors');
  const equipmentCheckboxes = document.querySelectorAll('.equipment');
  const priceEl = document.getElementById('price');
  const summaryEl = document.getElementById('summary');
  const visualizationImg = document.getElementById('visualization-img');

  function calculatePrice() {
    const area = parseFloat(areaInput.value) || 0;
    const floors = parseInt(floorsSelect.value, 10) || 1;
    let price = area * 30000 * floors;

    if (deliverySelect.value === 'turnkey') {
      price *= 1.2;
    }

    if (shapeSelect.value === 'rectangle') {
      price *= 1.05;
    }
    if (roofSelect.value === 'gable') {
      price *= 1.1;
    }

    equipmentCheckboxes.forEach(cb => {
      if (cb.checked) {
        price += 50000;
      }
    });

    return Math.round(price);
  }

  function updateVisualization() {
    const shape = shapeSelect.value;
    const roof = roofSelect.value;
    const floors = floorsSelect.value;
    visualizationImg.src = `images/${shape}-${roof}-${floors}.png`;
  }

  function updateSummary() {
    const disposition = document.querySelector('input[name="disposition"]:checked').value;
    const equipment = Array.from(equipmentCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value)
      .join(', ') || 'žádné';

    summaryEl.textContent =
      `Dispozice: ${disposition}, ` +
      `Plocha: ${areaInput.value} m², ` +
      `Dodání: ${deliverySelect.value}, ` +
      `Tvar: ${shapeSelect.value}, ` +
      `Střecha: ${roofSelect.value}, ` +
      `Podlaží: ${floorsSelect.value}, ` +
      `Vybavení: ${equipment}`;
  }

  function update() {
    const price = calculatePrice();
    priceEl.textContent = `Cena: ${price.toLocaleString('cs-CZ')} Kč`;
    updateVisualization();
    updateSummary();
  }

  const elements = [
    dispositionCards,
    areaInput,
    deliverySelect,
    shapeSelect,
    roofSelect,
    floorsSelect,
    ...equipmentCheckboxes
  ];
  elements.forEach(el => el.addEventListener('change', update));
  areaInput.addEventListener('input', update);

  document.getElementById('config-form').addEventListener('submit', e => {
    e.preventDefault();
  });

  update();
});
