# Storybook Superlink Component Library

A modern React component library built with Storybook, TypeScript, and Vite. This library provides a collection of reusable UI components that can be easily integrated into any React project.

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Yarn package manager

### Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd storybook-superlink
```

2. Install dependencies:
```bash
yarn install
```

3. Start Storybook:
```bash
yarn storybook
```

This will start the Storybook development server at `http://localhost:6006` where you can view and interact with all components.

## 📁 Project Structure

```
storybook-superlink/
├── src/
│   ├── components/     # React components
│   ├── docs/          # MDX documentation files
│   ├── stories/       # Component stories
│   └── index.ts       # Component exports
├── .storybook/        # Storybook configuration
└── public/            # Static assets
```

## 🛠️ Development

### Component Structure

Each component should follow this structure:
```
src/
├── components/
│   └── ComponentName/
│       ├── ComponentName.tsx
│       ├── ComponentName.module.css
│       ├── ComponentName.test.tsx
└── stories/
    └── ComponentName.stories.tsx
```

### Styling Approach

- Use CSS Modules for component-specific styles
- Implement variants using Class Variance Authority (CVA)
- Example of a component with variants:
```typescript
import { cva } from 'class-variance-authority';
import styles from './Button.module.css';

const buttonVariants = cva(styles.base, {
  variants: {
    variant: {
      primary: styles.primary,
      secondary: styles.secondary,
    },
    size: {
      small: styles.small,
      medium: styles.medium,
      large: styles.large,
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'medium',
  },
});

export const Button = ({ variant, size, ...props }) => {
  return (
    <button className={buttonVariants({ variant, size })} {...props} />
  );
};
```

### Adding New Components

1. Create your component in `src/components/ComponentName/`
2. Add corresponding stories in `src/stories/`
3. Add documentation in `src/docs/` using MDX
4. Export the component in `src/index.ts`

### Dependencies Management

- All dependencies should be added as devDependencies since this is a component library
- Use the following command to add new dependencies:
```bash
yarn add -D package-name
```

### Best Practices

- Use functional React components
- Write TypeScript interfaces for all props
- Include proper documentation
- Add unit tests for components
- Follow the established folder structure

## 📦 Using Components in Other Projects

To use these components in another project:

1. Install the package:
```bash
yarn add storybook-superlink
```

2. Import components:
```typescript
import { ComponentName } from 'storybook-superlink';
```

## 🧪 Testing

Run tests using:
```bash
yarn test
```

## 📝 Documentation

All component documentation is available in Storybook. Run `yarn storybook` to view the interactive documentation.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.