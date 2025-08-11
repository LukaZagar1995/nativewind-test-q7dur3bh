# NativeWind Reproduction test

This Stackblitz is a simple environment to replicate and debug NativeWind in the browser

## Creating a reproduction

### Running your code

1. Open `nativewind.test.tsx`
2. Find the line `await render(<View testID={testID} className="text-red-500" />)` and edit with your desired className
3. Run `npm start` to run your test, or `npm run dev` for it to watch for changes

### Sharing your code

1. Save your changes by pressing `Fork` (located in the top-left)
2. Share your test with the NativeWind team by using the link generated when you press `Share` (located next to the `Fork` button)

## Customizations

- You can edit `tailwind.config.js` to customize your theme
- You can edit `global.css` to edit the CSS

The tests are run with [@testing-library/react-native](https://callstack.github.io/react-native-testing-library/). You can use it's APIs to simulate press events or rerender your componenets

## FAQs

### My Tailwind CSS class is not being detected

The stackblitz tries to automatically detect the classes but it is not perfect. To force Tailwind CSS to process your classes, you can edit your `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
  // Add the classes you need to the safelist
  safelist: [
    'bg-red-500',
    'text-3xl',
    'lg:text-4xl',
  ]
}
```

### How do I simulate press events and other interactive styles?

Use the [@testing-library/react-native `fireEvent` API](https://callstack.github.io/react-native-testing-library/docs/api/events/fire-event)


### How do I test animated styles?

Use `getAnimatedStyle` from `react-native-reanimated` and the Jest timer API to advance time

```tsx
import { getAnimatedStyle } from 'react-native-reanimated'

test('my test', () => {
  await render(<View testID={testID} className="animate-spin" />);

  const component = screen.getByTestId(testID);

  expect(getAnimatedStyle(component)).toStrictEqual({
    transform: [{ rotate: "0deg" }],
  });

  jest.advanceTimersByTime(500);
  
  expect(getAnimatedStyle(component)).toStrictEqual({
    transform: [{ rotate: "180deg" }],
  });
})
```