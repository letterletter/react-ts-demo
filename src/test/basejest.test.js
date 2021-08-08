'use strict';


// mock返回值
const myMock = jest.fn();
console.log(myMock());
// > undefined

myMock
  .mockReturnValueOnce(10)
  .mockReturnValueOnce('x')
  .mockReturnValue(true);

console.log(myMock(), myMock(), myMock(), myMock());
// > 10, 'x', true, true

// mock函数断言
const mockFunc = jest.fn();
console.log(mockFunc(1,2), mockFunc('a', 'b'))
// The mock function was called at least once
expect(mockFunc).toBeCalled();

// The mock function was called at least once with the specified args
expect(mockFunc).toBeCalledWith(1, 2);

// The last call to the mock function was called with the specified args
expect(mockFunc).lastCalledWith('a', 'b');

// All calls and the name of the mock is written as a snapshot
expect(mockFunc).toMatchSnapshot();

//时间Mock
beforeAll(() => {
  jest.useFakeTimers();
});

// 或者有多个测试用例使用在每个测试用例执行之前执行
beforeEach(() => {
  jest.useFakeTimers();
});

// 断言方法 toBe， toEqual， Not， toBeNull/Undefined/Defined/Truthy/Falsy


test('zero', () => {
  const z = 0;
  expect(1+3).not.toBe(2)
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});

test('object assignment', () => {
  const data = {one: 1};
  data['two'] = 2;
  expect(data).toEqual({one: 1, two: 2});
});

test('two plus two', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});

test('adding floating point numbers', () => {
  const value = 0.1 + 0.2;
  //expect(value).toBe(0.3);           This won't work because of rounding error
  expect(value).toBeCloseTo(0.3); // This works.
});

//  字符串断言
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});

//  数组断言
const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'beer',
];

test('the shopping list has beer on it', () => {
  expect(shoppingList).toContain('beer');
  expect(new Set(shoppingList)).toContain('beer');
});