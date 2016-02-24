jest.dontMock('../x-enum');
jest.dontMock('../x-enum-element');

var XEnum = require('../x-enum');

describe('XEnum', function () {

  it('can receive string params', function () {
    var e = new XEnum('AAA', 'BBB');

    expect(+e.AAA).toBe(1);
    expect(+e.BBB).toBe(2);

    expect(e.AAA.toString()).toBe('AAA');
    expect(e.BBB.toString()).toBe('BBB');
  });

  it('can receive one string', function () {
    var e = new XEnum('AAA');

    expect(+e.AAA).toBe(1);

    expect(e.AAA.toString()).toBe('AAA');
  });

  it('can receive an array', function () {
    var e = new XEnum(['AAA', 'BBB']);

    expect(+e.AAA).toBe(1);
    expect(+e.BBB).toBe(2);

    expect(e.AAA.toString()).toBe('AAA');
    expect(e.BBB.toString()).toBe('BBB');
  });

  it('can receive objects with number', function () {
    var e = new XEnum(
      {AAA: 3},
      {BBB: 7}
    );

    expect(+e.AAA).toBe(3);
    expect(+e.BBB).toBe(7);

    expect(e.AAA.toString()).toBe('AAA');
    expect(e.BBB.toString()).toBe('BBB');
  });

  it('can receive objects with string', function () {
    var e = new XEnum(
      {AAA: 'A A A'},
      {BBB: 'B B B'}
    );

    expect(+e.AAA).toBe(1);
    expect(+e.BBB).toBe(2);

    expect(e.AAA.toString()).toBe('A A A');
    expect(e.BBB.toString()).toBe('B B B');
  });

  it('can receive objects with objects', function () {
    var e = new XEnum(
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
    var e = new XEnum(
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
    var e = new XEnum({
      AAA: [4, 'A A A', {something: 5}]
    });

    expect(+e.AAA).toBe(4);
    expect(e.AAA.toString()).toBe('A A A');
    expect(e.AAA.something).toBe(5);
  });

  it('can receive one object with all elements', function () {
    var e = new XEnum({
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

  it('know if it contains some element', function () {
    var e = new XEnum({AAA: 1, BBB: 2});
    var e2 = new XEnum({AAA: 1, BBB: 2});

    expect(e.contains(e.AAA)).toBeTruthy();
    expect(e.contains(e.BBB)).toBeTruthy();

    expect(e.contains(e2.AAA)).not.toBeTruthy();
    expect(e.contains(e2.BBB)).not.toBeTruthy();
  });

  it('can parse number, string or XEnumElement', function () {
    var e = new XEnum({AAA: [1, 'A A A']});

    expect(e.parse(1)).toBe(e.AAA);
    expect(e.parse('A A A')).toBe(e.AAA);
    expect(e.parse(e.AAA)).toBe(e.AAA);
  });

  it('can get XEnumElements in a list', function () {
    var e = new XEnum({AAA: 2, BBB: 1});

    var expected = [e.BBB, e.AAA];

    var list = e.getList().sort(function (o1, o2) {
      return o1 - o2;
    });

    var orderedList = e.getOrderedList();

    expect(list).toEqual(expected);
    expect(list[0]).toBe(expected[0]);
    expect(list[1]).toBe(expected[1]);

    expect(orderedList).toEqual(expected);
    expect(orderedList[0]).toBe(expected[0]);
    expect(orderedList[1]).toBe(expected[1]);
  });
});
