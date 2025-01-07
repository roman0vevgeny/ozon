class ProgressBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('progress-wrapper');

    const svgNS = 'http://www.w3.org/2000/svg';
    this.svg = document.createElementNS(svgNS, 'svg');
    this.svg.setAttribute('viewBox', '0 0 120 120');
    this.svg.classList.add('progress-svg');

    this.baseCircle = document.createElementNS(svgNS, 'circle');
    this.baseCircle.setAttribute('cx', '60');
    this.baseCircle.setAttribute('cy', '60');
    this.baseCircle.setAttribute('r', '54.9');
    this.baseCircle.classList.add('progress-base');

    this.progressCircle = document.createElementNS(svgNS, 'circle');
    this.progressCircle.setAttribute('cx', '60');
    this.progressCircle.setAttribute('cy', '60');
    this.progressCircle.setAttribute('r', '54.9');
    this.progressCircle.classList.add('progress-circle');

    this.svg.appendChild(this.baseCircle);
    this.svg.appendChild(this.progressCircle);
    this.wrapper.appendChild(this.svg);

    const styleEl = document.createElement('style');
    styleEl.textContent = `
      :host {
        display: flex;
      }

      .progress-wrapper {
        display: flex;
        position: relative;
      }

      .progress-svg {
        width: 120px;
        height: 120px;
        transform: rotate(-90deg);
        max-width: 100%; 
        box-sizing: border-box;
      }

      .progress-base {
        fill: none;
        stroke: #eeeeee;
        stroke-width: 10;
      }

      .progress-circle {
        fill: none;
        stroke: #2164f3;
        stroke-width: 10;
        stroke-dasharray: 345;
        stroke-dashoffset: 345;
        transition: stroke-dashoffset 0.35s;
        transform-origin: center;
        transform-box: fill-box;
      }

      .progress-circle.animated {
        animation: spin 3s linear infinite;
      }

      @keyframes spin {
        100% {
          transform: rotate(360deg);
        }
      }

      :host(.progress-hidden) {
        visibility: hidden;
      }
    `;

    this.shadowRoot.append(styleEl, this.wrapper);

    this._value = 0;
    this._animated = false;
    this._hidden = false;
  }

  connectedCallback() {
    this._updateProgress();
    this._updateAnimation();
    this._updateVisibility();
  }

  setValue(val) {
    const clamped = Math.max(0, Math.min(100, Number(val) || 0));
    this._value = clamped;
    this._updateProgress();
  }
  getValue() {
    return this._value;
  }

  setAnimated(isAnimated) {
    this._animated = Boolean(isAnimated);
    this._updateAnimation();
  }
  isAnimated() {
    return this._animated;
  }

  setHidden(isHidden) {
    this._hidden = Boolean(isHidden);
    this._updateVisibility();
  }
  isHidden() {
    return this._hidden;
  }

  _updateProgress() {
    const dashOffset = 345 - (345 * this._value) / 100;
    this.progressCircle.style.strokeDashoffset = dashOffset;
  }

  _updateAnimation() {
    if (this._animated) {
      this.progressCircle.classList.add('animated');
    } else {
      this.progressCircle.classList.remove('animated');
    }
  }

  _updateVisibility() {
    if (this._hidden) {
      this.classList.add('progress-hidden');
    } else {
      this.classList.remove('progress-hidden');
    }
  }
}

customElements.define('progress-bar', ProgressBar);
