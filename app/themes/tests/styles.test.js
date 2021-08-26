import styles from '../styles';

describe('styles', () => {
  it('should create text ellipsis', () => {
    expect(styles.textEllipsis()).toEqual([
      'white-space:nowrap;overflow:hidden;width:',
      '200px',
      ';text-overflow:ellipsis;'
    ]);
  });

  it('should set height to 4rem', () => {
    expect(styles.height()).toEqual(['height:', '4', 'rem;']);
  });
  it('should configure flex with row', () => {
    expect(styles.configureFlex('row')).toEqual([
      'display:flex;flex:1;flex-direction:row;',
      ' flex-direction:',
      'row',
      ';justify-content:',
      'center',
      ';align-items:',
      'center',
      ';align-content:',
      'center',
      ';flex-basis:',
      '0',
      ';flex-grow:',
      '1',
      ';flex-shrink:',
      '0',
      ';'
    ]);
  });

  it('should configure flex with column', () => {
    expect(styles.configureFlex('column')).toEqual([
      'display:flex;flex:1;flex-direction:column;',
      ' flex-direction:',
      'column',
      ';justify-content:',
      'center',
      ';align-items:',
      'center',
      ';align-content:',
      'center',
      ';flex-basis:',
      '0',
      ';flex-grow:',
      '1',
      ';flex-shrink:',
      '0',
      ';'
    ]);
  });

  it('should set boxshadow', () => {
    expect(styles.boxShadow()).toEqual(['box-shadow:', '0', 'px ', '0', 'px ', '0', 'px ', '0', 'px ', '#ccc', ';']);
  });
  it('should set primarybackground color', () => {
    expect(styles.primaryBackgroundColor()).toEqual(['background-color:', '#fcedda', ';']);
  });
  it('should set zindex', () => {
    expect(styles.zIndex()).toEqual(['z-index:', '1', ';']);
  });
  it('should set borderRadius', () => {
    expect(styles.borderRadius()).toEqual(['border-radius:', 'undefinedpx', ';']);
  });
  it('should set borderRadiusBottom', () => {
    expect(styles.borderRadiusBottom()).toEqual([
      'border-bottom-left-radius:',
      '0',
      'px;border-bottom-right-radius:',
      '0',
      'px;'
    ]);
  });
  it('should set margin top', () => {
    expect(styles.margin.top()).toEqual(['margin-top:', '0', 'rem;']);
  });
  it('should set margin left', () => {
    expect(styles.margin.left()).toEqual(['margin-left:', '0', 'rem;']);
  });
  it('should set margin right', () => {
    expect(styles.margin.right()).toEqual(['margin-right:', '0', 'rem;']);
  });
  it('should set margin bottom', () => {
    expect(styles.margin.bottom()).toEqual(['margin-bottom:', '0', 'rem;']);
  });
  it('should set borderWithRadius', () => {
    expect(styles.borderWithRadius()).toEqual([
      'border:',
      '1',
      'px ',
      'solid',
      ' ',
      '#ccc',
      ';',
      'border-radius:',
      '0px',
      ';'
    ]);
  });
  it('should set borderRadiusTop', () => {
    expect(styles.borderRadiusTop()).toEqual([
      'border-top-left-radius:',
      '0',
      'px;border-top-right-radius:',
      '0',
      'px;'
    ]);
  });
  it('should set margin vertical', () => {
    expect(styles.margin.vertical()).toEqual(['margin-top:', '0', 'rem;margin-bottom:', '0', 'rem;']);
  });
  it('should set margin horizontal', () => {
    expect(styles.margin.horizontal()).toEqual(['margin-left:', '0', 'rem;margin-right:', '0', 'rem;']);
  });
  it('should set borderRadius', () => {
    expect(styles.borderRadius('5')).toEqual(['border-radius:', '5;', ';']);
  });
});
