import fs from 'node:fs';
import { View } from 'react-native';
import { screen, render, enableCompilerLogging } from 'nativewind/test';
import config from './tailwind.config';

// This tells NativeWind log information to the console
enableCompilerLogging(true);

// This is used to identify your component
const testID = 'nativewind';
// Load your CSS as text
const css = fs.readFileSync('./global.css', 'utf-8');

test('should render your className as props', async () => {
  // Render your component using your custom CSS and tailwind config
  await render(<View testID={testID} className="text-red-500" />, {
    css,
    config,
  });

  // Assert that the component was rendered with the correct props
  expect(screen.getByTestId(testID).props).toStrictEqual({
    testID,
    children: undefined,
    style: {
      color: 'rgba(239, 68, 68, 1)',
    },
  });
});
