function changeEventListener(selector, attributeName) {
  let element = $(selector);
  element.addEventListener('change', (e) => {
    if (selectedShape) {
      setSVGAttribute(selectedShape, attributeName, element.value);
    }
  });
}

function pickedColorEventListener() {
  changeEventListener('#color-picker', 'fill');
}

function filledCheckEventListener() {
  let pickedColor = document.getElementById('color-picker');
  let filledCheck = document.getElementById('fill-status');
  filledCheck.addEventListener('change', (e) => {
    // If selected shape xa vaney change the property
    if (selectedShape) {
      if (filledCheck.checked) {
        selectedShape.setAttributeNS(null, 'fill', pickedColor.value);
      } else {
        selectedShape.setAttributeNS(null, 'fill', 'none');
      }
    }
  });
}

function lineColorEventListener() {
  changeEventListener('#stroke-color-picker', 'stroke');
}

function lineWidthEventListener() {
  changeEventListener('#line-width', 'stroke-width');
}

function lineCheckEventListener() {
  let lineStatus = document.getElementById('line-status');
  lineStatus.addEventListener('change', (e) => {
    if (selectedShape) {
      if (lineStatus.checked) {
        selectedShape.setAttributeNS(null, 'stroke', lineColor.value);
      } else {
        selectedShape.setAttributeNS(null, 'stroke', 'none');
      }
    }
  });
}

function fillColorEventListener() {
  pickedColorEventListener();
  filledCheckEventListener();
}

function lineEventListener() {
  lineColorEventListener();
  lineCheckEventListener();
  lineWidthEventListener();
}

function rotateEventListener() {
  let rotation = document.getElementById('rotate');
  rotation.addEventListener('change', (e) => {
    if (selectedShape) {
      let translate = selectedShape.getAttributeNS(null, 'translate');
      let rotate = rotation.value;

      let newTransformation = `translate(${translate}) rotate(${rotate})`;

      selectedShape.setAttributeNS(null, 'translate', translate);
      selectedShape.setAttributeNS(null, 'rotate', rotate);

      selectedShape.setAttributeNS(null, 'transform', newTransformation);
    }
  });
}

function widthEventListener() {
  // Width Changed
  let w = document.getElementById('width');
  w.addEventListener('change', (e) => {
    if (selectedShape) {
      // Scaling applies to actual paths only
      let widthValue = w.value;
      selectedShape.querySelectorAll('.svg-shape').forEach((path, index) => {
        let [_, heightValue] = path.getAttributeNS(null, 'scale').split(' ');

        let { x, y } = path.getBBox();
        path.setAttributeNS(null, 'scale', `${widthValue} ${heightValue}`);
        path.setAttributeNS(
          null,
          'transform',
          `scale(${widthValue} ${heightValue}) translate(${-x} ${-y})`
        );
      });
      resetControls();
    }
  });
}

function heightEventListener() {
  // Height Changed
  let h = document.getElementById('height');
  h.addEventListener('change', (e) => {
    if (selectedShape) {
      // Scaling applies to actual paths only
      let heightValue = h.value;
      selectedShape.querySelectorAll('.svg-shape').forEach((path, index) => {
        let [widthValue, _] = path.getAttributeNS(null, 'scale').split(' ');
        let { x, y } = path.getBBox();
        path.setAttributeNS(null, 'scale', `${widthValue} ${heightValue}`);
        path.setAttributeNS(
          null,
          'transform',
          `scale(${widthValue} ${heightValue}) translate(${-x} ${-y})`
        );
      });
      resetControls();
    }
  });
}

function leftEventListener() {
  let rotation = document.getElementById('rotate');
  // Left Changed
  let left = document.getElementById('left');
  left.addEventListener('change', (e) => {
    if (selectedShape) {
      let [x, y] = selectedShape.getAttributeNS(null, 'translate').split(' ');

      let translate = `${left.value} ${y}`;
      let rotate = rotation.value;

      let newTransformation = `translate(${translate}) rotate(${rotate})`;

      selectedShape.setAttributeNS(null, 'translate', translate);
      selectedShape.setAttributeNS(null, 'rotate', rotate);

      selectedShape.setAttributeNS(null, 'transform', newTransformation);
    }
  });
}

function topEventListener() {
  let rotation = document.getElementById('rotate');
  // Top Changed

  let top = document.getElementById('top');
  top.addEventListener('change', (e) => {
    if (selectedShape) {
      let [x, y] = selectedShape.getAttributeNS(null, 'translate').split(' ');
      let translate = `${x} ${top.value}`;
      let rotate = rotation.value;

      let newTransformation = `translate(${translate}) rotate(${rotate})`;

      selectedShape.setAttributeNS(null, 'translate', translate);
      selectedShape.setAttributeNS(null, 'rotate', rotate);

      selectedShape.setAttributeNS(null, 'transform', newTransformation);
    }
  });
}

function fontChangeEventListener() {
  // Font Changed
  let font = document.getElementById('fonts');
  font.addEventListener('change', (e) => {
    if (selectedShape) {
      let textArea = selectedShape.querySelector('.shape-text');
      // Remove previously selected class
      let fontClass = textArea.classList[1];
      textArea.classList.remove(fontClass);
      // Add selected class
      let selectedClass = font.options[font.selectedIndex].getAttributeNS(
        null,
        'class'
      );
      textArea.classList.add(selectedClass);
    }
  });
}

function boldButtonEventListener() {
  let boldButton = document.getElementById('bold-btn');
  boldButton.addEventListener('click', (e) => {
    if (selectedShape) {
      let textArea = selectedShape.querySelector('.shape-text');
      boldButton.classList.toggle('btn-active');
      textArea.classList.toggle('text-bold');
    }
  });
}

function italicsButtonEventListener() {
  let italicsButton = document.getElementById('italics-btn');
  italicsButton.addEventListener('click', (e) => {
    if (selectedShape) {
      let textArea = selectedShape.querySelector('.shape-text');
      italicsButton.classList.toggle('btn-active');
      textArea.classList.toggle('text-italics');
    }
  });
}

function underLineButtonEventListener() {
  let underlineButton = document.getElementById('underline-btn');
  underlineButton.addEventListener('click', (e) => {
    if (selectedShape) {
      let textArea = selectedShape.querySelector('.shape-text');
      underlineButton.classList.toggle('btn-active');
      textArea.classList.toggle('text-underline');
    }
  });
}

function fontSizeEventListener() {
  let fontSizeInput = document.getElementById('font-size');
  fontSizeInput.addEventListener('change', (e) => {
    if (selectedShape) {
      let textArea = selectedShape.querySelector('.shape-text');
      textArea.style.fontSize = fontSizeInput.value + 'px';
    }
  });
}

function fontColorEventListener() {
  let fontColorPick = document.getElementById('font-color');
  fontColorPick.addEventListener('change', (e) => {
    if (selectedShape) {
      let textArea = selectedShape.querySelector('.shape-text');
      textArea.style.color = fontColorPick.value;
    }
  });
}

function fontEventListener() {
  fontChangeEventListener();
  boldButtonEventListener();
  italicsButtonEventListener();
  underLineButtonEventListener();
  fontSizeEventListener();
  fontColorEventListener();
}

function addEventListenerRightSideBar() {
  fillColorEventListener(); // Fill color Event Listener
  lineEventListener(); // Stroke EVent Listener

  let opacity = document.getElementById('opacity');
  opacity.addEventListener('change', (e) => {
    if (selectedShape) {
      selectedShape.setAttributeNS(
        null,
        'fill-opacity',
        parseInt(opacity.value) / 100
      );
    }
  });

  rotateEventListener();
  widthEventListener();
  heightEventListener();
  leftEventListener();
  topEventListener();
  fontEventListener();
}
