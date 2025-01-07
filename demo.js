window.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('progress-container');

  const progressBar = document.createElement('progress-bar');
  container.appendChild(progressBar);
  progressBar.setValue(30);

  const inputValue = document.getElementById('inputValue');
  const inputAnimate = document.getElementById('inputAnimate');
  const inputHide = document.getElementById('inputHide');

  inputValue.addEventListener('input', () => {
    let val = Number(inputValue.value) || 0;
    if (val < 0) val = 0;
    if (val > 100) val = 100;
    inputValue.value = val;
    progressBar.setValue(val);
  });

  inputAnimate.addEventListener('change', () => {
    progressBar.setAnimated(inputAnimate.checked);
  });

  inputHide.addEventListener('change', () => {
    progressBar.setHidden(inputHide.checked);
  });
});
