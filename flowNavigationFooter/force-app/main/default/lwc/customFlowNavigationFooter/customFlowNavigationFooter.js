import { LightningElement, api } from 'lwc';
import { FlowNavigationNextEvent, FlowNavigationBackEvent, FlowNavigationPauseEvent, FlowNavigationFinishEvent } from 'lightning/flowSupport';

export default class CustomFlowNavigationFooter extends LightningElement {
  @api showNextButton = false;
  @api nextButtonLabel = 'Next';
  @api nextButtonAlignment = 'Right';
  @api nextButtonBackgroundColor = '#0070d2';
  @api nextButtonTextColor = 'white';
  @api showPreviousButton = false;
  @api previousButtonLabel = 'Previous';
  @api previousButtonAlignment = 'Left';
  @api previousButtonBackgroundColor = '#0070d2';
  @api previousButtonTextColor = 'white';
  @api showBypassButton = false;
  @api bypassButtonLabel = 'Skip';
  @api bypassButtonBackgroundColor = 'white';
  @api bypassButtonTextColor = '#0070d2';
  @api finishButtonLabel = 'Finish';
  @api availableActions = [];
  @api isLoaded = false;
  @api disableNextButton = false;
  @api disablePrevButton = false;
  @api disableSkipButton = false;

  get previousBtnAllignClass() {
    return this.previousButtonAlignment.toLowerCase() == 'left'
      ? `mr-auto`
      : this.previousButtonAlignment.toLowerCase() == 'center'
        ? `ml-auto mr-auto`
        : ``;
  }

  get nextBtnAllignClass() {
    return this.nextButtonAlignment.toLowerCase() == 'right'
      ? `ml-auto`
      : this.nextButtonAlignment.toLowerCase() == 'center'
        ? `ml-auto mr-auto`
        : ``;
  }

  async connectedCallback() {
    if (this.availableActions.find((action) => action === 'FINISH')) {
      this.showNextButton = true;
      this.nextButtonLabel = this.finishButtonLabel;
    }
    this.isLoaded = !this.isLoaded;
    this.disableNextButton = !(this.availableActions.find((action) => action === 'FINISH') || this.availableActions.find((action) => action === 'NEXT'));
    this.disablePrevButton = !this.availableActions.find((action) => action === 'BACK');
    this.disableSkipButton = !this.availableActions.find((action) => action === 'PAUSE');

  }

  isFirstRender = true;
  renderedCallback() {
    if (!this.isFirstRender) {
      return;
    }
    this.isFirstRender = false;

    const nextBtnEle = this.template.querySelector('button.next');
    if (nextBtnEle && this.disableNextButton) {
      nextBtnEle.disabled = this.disableNextButton;
    }
    const prevBtnEle = this.template.querySelector('button.previous');
    if (prevBtnEle && this.disablePrevButton) {
      prevBtnEle.disabled = this.disablePrevButton;
    }
    const skipBtnEle = this.template.querySelector('button.bypass');
    if (skipBtnEle && this.disableSkipButton) {
      skipBtnEle.disabled = this.disablePrevButton;
    }

    document.documentElement.style.setProperty(
      '--nextButtonBackgroundColor',
      this.nextButtonBackgroundColor
    );
    document.documentElement.style.setProperty(
      '--nextButtonTextColor',
      this.nextButtonTextColor
    );
    document.documentElement.style.setProperty(
      '--previousButtonBackgroundColor',
      this.previousButtonBackgroundColor
    );
    document.documentElement.style.setProperty(
      '--previousButtonTextColor',
      this.previousButtonTextColor
    );
    document.documentElement.style.setProperty(
      '--bypassButtonBackgroundColor',
      this.bypassButtonBackgroundColor
    );
    document.documentElement.style.setProperty(
      '--bypassButtonTextColor',
      this.bypassButtonTextColor
    );
  }

  next() {
    if (this.availableActions.find((action) => action === 'FINISH')) {
      const navigateNextEvent = new FlowNavigationFinishEvent();
      this.dispatchEvent(navigateNextEvent);
    }
    // check if NEXT is allowed on this screen
    else if (this.availableActions.find((action) => action === 'NEXT')) {
      // navigate to the next screen
      const navigateNextEvent = new FlowNavigationNextEvent();
      this.dispatchEvent(navigateNextEvent);
    }
  }

  prev() {
    // check if PREVIOUS is allowed on this screen
    if (this.availableActions.find((action) => action === 'BACK')) {
      // navigate to the prev screen
      const navigatePreviousEvent = new FlowNavigationBackEvent();
      this.dispatchEvent(navigatePreviousEvent);
    }
  }

  skip() {
    // check if PAUSE is allowed on this screen
    console.log('this.availableActions.find((action)', this.availableActions);
    if (this.availableActions.find((action) => action === 'PAUSE')) {
      // resume flow to the continue
      const navigatePauseEvent = new FlowNavigationPauseEvent();
      this.dispatchEvent(navigatePauseEvent);
    }
  }
}
