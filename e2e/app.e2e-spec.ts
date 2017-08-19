import { PnlgerenciadorPage } from './app.po';

describe('pnlgerenciador App', function() {
  let page: PnlgerenciadorPage;

  beforeEach(() => {
    page = new PnlgerenciadorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
