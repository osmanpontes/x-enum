jest.dontMock('../xenum');
jest.dontMock('../xenum-element');

var Xenum = require('../xenum');

describe('Xenum', function () {

  it('can receive string params', function () {
    var e = new Xenum('AAA', 'BBB');

    expect(+e.AAA).toBe(1);
    expect(+e.BBB).toBe(2);

    expect(e.AAA.toString()).toBe('AAA');
    expect(e.BBB.toString()).toBe('BBB');
  });

  it('can receive one string', function () {
    var e = new Xenum('AAA');

    expect(+e.AAA).toBe(1);

    expect(e.AAA.toString()).toBe('AAA');
  });

  it('can receive an array', function () {
    var e = new Xenum(['AAA', 'BBB']);

    expect(+e.AAA).toBe(1);
    expect(+e.BBB).toBe(2);

    expect(e.AAA.toString()).toBe('AAA');
    expect(e.BBB.toString()).toBe('BBB');
  });

  it('can receive objects with number', function () {
    var e = new Xenum(
      {AAA: 3},
      {BBB: 7}
    );

    expect(+e.AAA).toBe(3);
    expect(+e.BBB).toBe(7);

    expect(e.AAA.toString()).toBe('AAA');
    expect(e.BBB.toString()).toBe('BBB');
  });

  it('can receive objects with string', function () {
    var e = new Xenum(
      {AAA: 'A A A'},
      {BBB: 'B B B'}
    );

    expect(+e.AAA).toBe(1);
    expect(+e.BBB).toBe(2);

    expect(e.AAA.toString()).toBe('A A A');
    expect(e.BBB.toString()).toBe('B B B');
  });

  it('can receive objects with objects', function () {
    var e = new Xenum(
      {AAA: {something: 5}},
      {BBB: {something: 10}}
    );

    expect(+e.AAA).toBe(1);
    expect(+e.BBB).toBe(2);

    expect(e.AAA.toString()).toBe('AAA');
    expect(e.BBB.toString()).toBe('BBB');

    expect(e.AAA.something).toBe(5);
    expect(e.BBB.something).toBe(10);
  });

  it('can receive objects with array of number, string and object', function () {
    var e = new Xenum(
      {AAA: [4, 'A A A', {something: 5}]},
      {BBB: ['B B B', 7, {something: 10}]},
      {CCC: ['C C C', {something: 13}, 11]},
      {DDD: [{something: 19}, 17, 'D D D']}
    );

    expect(+e.AAA).toBe(4);
    expect(+e.BBB).toBe(7);
    expect(+e.CCC).toBe(11);
    expect(+e.DDD).toBe(17);

    expect(e.AAA.toString()).toBe('A A A');
    expect(e.BBB.toString()).toBe('B B B');
    expect(e.CCC.toString()).toBe('C C C');
    expect(e.DDD.toString()).toBe('D D D');

    expect(e.AAA.something).toBe(5);
    expect(e.BBB.something).toBe(10);
    expect(e.CCC.something).toBe(13);
    expect(e.DDD.something).toBe(19);
  });

  it('can receive one object describing one element', function () {
    var e = new Xenum({
      AAA: [4, 'A A A', {something: 5}]
    });

    expect(+e.AAA).toBe(4);
    expect(e.AAA.toString()).toBe('A A A');
    expect(e.AAA.something).toBe(5);
  });

  it('can receive one object with all elements', function () {
    var e = new Xenum({
      AAA: [4, 'A A A', {something: 5}],
      BBB: ['B B B', 7, {something: 10}],
      CCC: ['C C C', {something: 13}, 11],
      DDD: [{something: 19}, 17, 'D D D']
    });

    expect(+e.AAA).toBe(4);
    expect(+e.BBB).toBe(7);
    expect(+e.CCC).toBe(11);
    expect(+e.DDD).toBe(17);

    expect(e.AAA.toString()).toBe('A A A');
    expect(e.BBB.toString()).toBe('B B B');
    expect(e.CCC.toString()).toBe('C C C');
    expect(e.DDD.toString()).toBe('D D D');

    expect(e.AAA.something).toBe(5);
    expect(e.BBB.something).toBe(10);
    expect(e.CCC.something).toBe(13);
    expect(e.DDD.something).toBe(19);
  });
});
