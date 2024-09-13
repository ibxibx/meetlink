// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import { act } from 'react';

configure({ defaultHidden: true });

// Mock getSelection
Object.defineProperty(window, 'getSelection', {
  value: jest.fn(() => ({
    addRange: jest.fn(),
    removeAllRanges: jest.fn(),
    getRangeAt: jest.fn(),
    toString: jest.fn(() => ''),
    collapse: jest.fn(), // Add collapse to mock selection behavior correctly
  })),
  writable: true,
});

// Mock createRange
Object.defineProperty(document, 'createRange', {
  value: jest.fn(() => ({
    setStart: jest.fn(),
    setEnd: jest.fn(),
    collapse: jest.fn(), // Add collapse here as well
    getBoundingClientRect: jest.fn(),
    getClientRects: jest.fn(() => []),
  })),
  writable: true,
});

// Mock the ownerDocument
Object.defineProperty(global.Element.prototype, 'ownerDocument', {
  get() {
    return document;
  },
});

// Mock MutationObserver
global.MutationObserver = class {
  constructor(callback) {}
  disconnect() {}
  observe(element, initObject) {}
};

// Suppress specific console warnings
const MESSAGES_TO_IGNORE = [
  "When testing, code that causes React state updates should be wrapped into act(...):",
  "Error:",
  "The above error occurred",
  "Warning: `ReactDOMTestUtils.act` is deprecated",
  "Warning: The current testing environment is not configured to support act(...)"
];

const originalError = console.error;
console.error = (...args) => {
  if (!MESSAGES_TO_IGNORE.some(msg => args.join(' ').includes(msg))) {
    originalError(...args);
  }
};

// Mock requestAnimationFrame
global.requestAnimationFrame = (callback) => setTimeout(callback, 0);
global.cancelAnimationFrame = (id) => clearTimeout(id);