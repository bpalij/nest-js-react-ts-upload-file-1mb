import countPercents from './countPercents';

describe('countPercents', () => {
  it('20, 50', () => {
    expect(countPercents({ loaded: 20, total: 50 })).toEqual(40);
  })

  it('15, 20', () => {
    expect(countPercents({ loaded: 15, total: 20 })).toEqual(75);
  })
})